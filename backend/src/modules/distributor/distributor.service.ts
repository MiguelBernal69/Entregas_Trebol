import prisma from '../../prisma/client'
import { getActiveSession } from './sessions.service'

export const getMyOrders = async (
    distributorId: number,
    statusQuery?: string,
    date?: string,
    pagination?: { page?: number; limit?: number; skip?: number; take?: number }
) => {
    // Verificar si tiene sesión activa
    const session = await getActiveSession(distributorId)
    if (!session) {
        return [] // No tiene carga visible hasta que inicie su día
    }

    // Si no manda query, por defecto traemos asignado y entregado para que pueda sacar stats,
    // o sino lo que mande por query (ej. 'asignado').
    let statusFilter: any = undefined
    
    if (statusQuery) {
        statusFilter = statusQuery
    }

    // Filtro por fecha si se proporciona (YYYY-MM-DD)
    let dateFilter: any = {}
    if (date) {
        // Aseguramos el rango con el offset de Bolivia (-04:00) para evitar desfaces de hora (hacia el día siguiente en UTC)
        const start = new Date(`${date}T00:00:00.000-04:00`)
        const end = new Date(`${date}T23:59:59.999-04:00`)

        dateFilter = {
            OR: [
                { status: 'asignado' }, // Todo lo que tenga en la camioneta pendiente
                { 
                    AND: [
                        { status: { in: ['entregado', 'entrega_parcial'] } },
                        { deliveredAt: { gte: start, lte: end } } // Entregado hoy UTC
                    ]
                }
            ]
        }
    }

    const where: any = {
        distributorId,
        ...dateFilter
    }

    if (statusFilter) {
        // Permitir filtrar por entregado + entrega_parcial juntos
        if (statusFilter === 'entregado') {
            where.status = { in: ['entregado', 'entrega_parcial'] }
        } else {
            where.status = statusFilter
        }
    }

    let skip: number | undefined = undefined
    let take: number | undefined = undefined

    if (pagination) {
        if (pagination.take !== undefined && !isNaN(pagination.take)) {
            take = pagination.take
            skip = pagination.skip !== undefined && !isNaN(pagination.skip) ? pagination.skip : 0
        } else if (pagination.limit !== undefined && !isNaN(pagination.limit)) {
            take = pagination.limit
            if (pagination.page !== undefined && !isNaN(pagination.page) && pagination.page > 0) {
                skip = (pagination.page - 1) * pagination.limit
            } else if (pagination.skip !== undefined && !isNaN(pagination.skip)) {
                skip = pagination.skip
            } else {
                skip = 0
            }
        } else if (pagination.skip !== undefined && !isNaN(pagination.skip)) {
            skip = pagination.skip
        }
    }

    return prisma.order.findMany({
        where,
        include: {
            client: {
                select: {
                    id: true,
                    name: true,
                    ownerName: true,
                    phone: true,
                    address: true,
                    latitude: true,
                    longitude: true,
                    photoUrl: true // Campo necesario para la app móvil
                }
            },
            items: {
                include: {
                    product: { select: { id: true, name: true, unit: true } }
                }
            },
            preventista: { select: { id: true, name: true } },
            region: { select: { id: true, name: true } }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take
    })
}

export const getMyOrderById = async (orderId: number, distributorId: number) => {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            distributorId
        },
        include: {
            client: {
                select: {
                    id: true,
                    name: true,
                    ownerName: true,
                    phone: true,
                    address: true,
                    latitude: true,
                    longitude: true,
                    photoUrl: true
                }
            },
            preventista: { select: { id: true, name: true } },
            items: {
                include: {
                    product: true
                }
            },
            region: {
                select: { id: true, name: true }
            }
        }
    })

    if (!order) throw new Error('Pedido no encontrado o no te pertenece')
    return order
}

export const deliverOrder = async (
    orderId: number,
    distributorId: number,
    deliveredItems?: { orderItemId: number; deliveredQuantity: number }[],
    notes?: string
) => {
    // Verificar que el pedido pertenece a este distribuidor
    const order = await prisma.order.findFirst({
        where: { id: orderId, distributorId, status: 'asignado' },
        include: { items: true }
    })

    if (!order) throw new Error('Pedido no encontrado, no te pertenece o ya fue entregado')

    let isPartial = false

    // Si se envían cantidades específicas, verificar y actualizar cada item
    if (deliveredItems && deliveredItems.length > 0) {
        for (const di of deliveredItems) {
            const item = order.items.find(i => i.id === di.orderItemId)
            if (!item) throw new Error(`Item ${di.orderItemId} no pertenece a este pedido`)
            if (di.deliveredQuantity < 0) throw new Error('La cantidad entregada no puede ser negativa')
            if (di.deliveredQuantity > item.quantity) throw new Error(`La cantidad entregada no puede ser mayor a la pedida (${item.quantity})`)
            
            // Determinar si es parcial
            if (di.deliveredQuantity < item.quantity) {
                isPartial = true
            }
        }
    }

    // Transacción: actualizar items + estado del pedido
    const updated = await prisma.$transaction(async (tx) => {
        // Actualizar deliveredQuantity en cada item si se proporcionaron
        if (deliveredItems && deliveredItems.length > 0) {
            for (const di of deliveredItems) {
                await tx.orderItem.update({
                    where: { id: di.orderItemId },
                    data: { deliveredQuantity: di.deliveredQuantity }
                })
            }
        }

        // Marcar como entregado o entrega_parcial
        return tx.order.update({
            where: { id: orderId },
            data: {
                status: isPartial ? 'entrega_parcial' : 'entregado',
                deliveredAt: new Date(),
                ...(notes && { notes })
            }
        })
    })

    // Guardar historial con snapshot
    const snapshot = await buildSnapshot(orderId)
    await prisma.orderHistory.create({
        data: {
            orderId,
            changedBy: distributorId,
            action: 'delivered',
            previousStatus: 'asignado',
            newStatus: isPartial ? 'entrega_parcial' : 'entregado',
            snapshotData: snapshot
        }
    })

    return updated
}

// Helper para construir snapshot del pedido
const buildSnapshot = async (orderId: number) => {
    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            client: { include: { region: true } },
            preventista: { select: { id: true, name: true } },
            distributor: { select: { id: true, name: true } },
            items: { include: { product: { select: { name: true } } } }
        }
    })

    if (!order) throw new Error('Pedido no encontrado')

    const totalPedido = order.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
    const totalEntregado = order.items.reduce((sum, i) => {
        const qty = i.deliveredQuantity ?? i.quantity
        return sum + i.unitPrice * qty
    }, 0)

    return {
        order: {
            id: order.id,
            status: order.status,
            notes: order.notes,
            deliveredAt: order.deliveredAt,
            createdAt: order.createdAt
        },
        client: {
            id: order.client.id,
            name: order.client.name,
            ownerName: order.client.ownerName,
            address: order.client.address,
            latitude: order.client.latitude,
            longitude: order.client.longitude,
            photoUrl: order.client.photoUrl,
            region: order.client.region?.name ?? null
        },
        preventista: order.preventista,
        distribuidor: order.distributor ?? null,
        items: order.items.map(i => ({
            productName: i.product.name,
            quantity: i.quantity,
            deliveredQuantity: i.deliveredQuantity,
            unitPrice: i.unitPrice
        })),
        totalPedido,
        totalEntregado,
        total: totalEntregado // retrocompatibilidad
    }
}