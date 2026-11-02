import prisma from '../../prisma/client'
import { OrderAction, OrderStatus } from '../../generated/prisma'

// ─── helpers ───────────────────────────────────────────────

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

  const subtotal = order.items
    .filter(i => !i.isBonification)
    .reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  const discount = order.discount || 0
  const total = Math.max(0, subtotal - discount)

  return {
    order: {
      id: order.id,
      status: order.status,
      notes: order.notes,
      discount,
      createdAt: order.createdAt
    },
    client: {
      id: order.client.id,
      name: order.client.name,
      ownerName: order.client.ownerName,
      phone: order.client.phone,
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
      unitPrice: i.unitPrice,
      isBonification: i.isBonification
    })),
    subtotal,
    discount,
    total
  }
}

const saveHistory = async (
  orderId: number,
  changedBy: number,
  action: OrderAction,
  previousStatus: OrderStatus | null,
  newStatus: OrderStatus
) => {
  const snapshot = await buildSnapshot(orderId)

  await prisma.orderHistory.create({
    data: {
      orderId,
      changedBy,
      action,
      previousStatus: previousStatus ?? undefined,
      newStatus,
      snapshotData: snapshot
    }
  })
}

// ─── servicios ─────────────────────────────────────────────

export const getDateRange = (
  dateStr?: string,
  startDateStr?: string,
  endDateStr?: string
): { start: Date; end: Date } | null => {
  // Rango personalizado explícito
  if (startDateStr && endDateStr) {
    const sParts = startDateStr.split('-').map(Number)
    const eParts = endDateStr.split('-').map(Number)
    if (sParts.length === 3 && eParts.length === 3) {
      const start = new Date(sParts[0], sParts[1] - 1, sParts[2], 0, 0, 0, 0)
      const end = new Date(eParts[0], eParts[1] - 1, eParts[2], 23, 59, 59, 999)
      return { start, end }
    }
  }

  if (!dateStr || dateStr === 'all') return null

  const now = new Date()

  if (dateStr === 'this_month') {
    // Desde el 1 del mes actual hasta fin de mes o fin de hoy
    const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
    return { start, end }
  }

  if (dateStr === 'last_month') {
    // Todo el mes anterior
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0)
    const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
    return { start, end }
  }

  if (dateStr === 'this_week') {
    // Últimos 7 días
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6, 0, 0, 0, 0)
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
    return { start, end }
  }

  let targetYear = now.getFullYear()
  let targetMonth = now.getMonth()
  let targetDay = now.getDate()

  if (dateStr === 'yesterday') {
    now.setDate(now.getDate() - 1)
    targetYear = now.getFullYear()
    targetMonth = now.getMonth()
    targetDay = now.getDate()
  } else if (dateStr !== 'today') {
    const parts = dateStr.split('-').map(Number)
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      targetYear = parts[0]
      targetMonth = parts[1] - 1
      targetDay = parts[2]
    }
  }

  const start = new Date(targetYear, targetMonth, targetDay, 0, 0, 0, 0)
  const end = new Date(targetYear, targetMonth, targetDay, 23, 59, 59, 999)
  return { start, end }
}

export const getAllOrders = async (
  filters: {
    status?: OrderStatus
    regionId?: number
    preventistaId?: number
    date?: string
    startDate?: string
    endDate?: string
  },
  pagination?: {
    skip?: number
    take?: number
  }
) => {
  const dateRange = getDateRange(filters.date, filters.startDate, filters.endDate)

  return prisma.order.findMany({
    where: {
      ...(filters.status && { 
        status: filters.status === 'entregado' ? { in: ['entregado', 'entrega_parcial'] } : filters.status 
      }),
      ...(filters.regionId && { regionId: filters.regionId }),
      ...(filters.preventistaId && { preventistaId: filters.preventistaId }),
      ...(dateRange && {
        createdAt: {
          gte: dateRange.start,
          lte: dateRange.end
        }
      })
    },
    include: {
      client: { select: { id: true, name: true, ownerName: true, phone: true, address: true, latitude: true, longitude: true, photoUrl: true } },
      preventista: { select: { id: true, name: true } },
      distributor: { select: { id: true, name: true } },
      region: { select: { id: true, name: true, color: true } },
      items: { include: { product: { select: { id: true, name: true, category: true, unit: true, price: true } } } }
    },
    orderBy: { createdAt: 'desc' },
    skip: pagination?.skip,
    take: pagination?.take
  })
}

export const getDailyReport = async (options: {
  date?: string
  startDate?: string
  endDate?: string
  preventistaId?: number
}) => {
  const dateRange = getDateRange(options.date || 'today', options.startDate, options.endDate)
  const start = dateRange?.start ?? new Date(new Date().setHours(0, 0, 0, 0))
  const end = dateRange?.end ?? new Date(new Date().setHours(23, 59, 59, 999))

  const orders = await prisma.order.findMany({
    where: {
      ...(options.preventistaId && { preventistaId: options.preventistaId }),
      createdAt: {
        gte: start,
        lte: end
      }
    },
    include: {
      client: { select: { id: true, name: true } },
      items: {
        include: {
          product: { select: { id: true, name: true, unit: true, category: true, price: true } }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  const uniqueClients = new Set<number>()
  let totalAmount = 0
  let totalBruto = 0
  let totalDiscount = 0
  let totalProductsUnits = 0
  let totalRegularUnits = 0
  let totalBonificationUnits = 0

  const statusCounts: Record<string, number> = {
    pendiente: 0,
    aceptado: 0,
    asignado: 0,
    entregado: 0,
    entrega_parcial: 0
  }

  const productsMap = new Map<number, {
    productId: number
    name: string
    category: string
    unit: string
    unitPrice: number
    regularQuantity: number
    bonificationQuantity: number
    totalQuantity: number
    totalAmount: number
    orderCount: number
  }>()

  for (const order of orders) {
    uniqueClients.add(order.clientId)
    statusCounts[order.status] = (statusCounts[order.status] || 0) + 1

    const orderSubtotal = order.items.reduce((s, i) => s + (i.isBonification ? 0 : i.quantity * i.unitPrice), 0)
    const orderDiscount = order.discount || 0
    const orderNet = Math.max(0, orderSubtotal - orderDiscount)
    totalBruto += orderSubtotal
    totalDiscount += orderDiscount
    totalAmount += orderNet

    for (const item of order.items) {
      const isBoni = Boolean(item.isBonification)
      const itemSubtotal = isBoni ? 0 : item.quantity * item.unitPrice
      totalProductsUnits += item.quantity
      if (isBoni) {
        totalBonificationUnits += item.quantity
      } else {
        totalRegularUnits += item.quantity
      }

      const existing = productsMap.get(item.productId)
      if (existing) {
        existing.totalQuantity += item.quantity
        if (isBoni) {
          existing.bonificationQuantity += item.quantity
        } else {
          existing.regularQuantity += item.quantity
          if (!existing.unitPrice && item.unitPrice > 0) {
            existing.unitPrice = item.unitPrice
          }
        }
        existing.totalAmount += itemSubtotal
        existing.orderCount += 1
      } else {
        productsMap.set(item.productId, {
          productId: item.productId,
          name: item.product.name,
          category: item.product.category,
          unit: item.product.unit,
          unitPrice: isBoni ? item.product.price : item.unitPrice,
          regularQuantity: isBoni ? 0 : item.quantity,
          bonificationQuantity: isBoni ? item.quantity : 0,
          totalQuantity: item.quantity,
          totalAmount: itemSubtotal,
          orderCount: 1
        })
      }
    }
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  const formattedStart = `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}`
  const formattedEnd = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`

  const bonificationsSummary = Array.from(productsMap.values())
    .filter(p => p.bonificationQuantity > 0)
    .map(p => ({
      productId: p.productId,
      name: p.name,
      category: p.category,
      unit: p.unit,
      bonificationQuantity: p.bonificationQuantity
    }))
    .sort((a, b) => b.bonificationQuantity - a.bonificationQuantity)

  return {
    date: formattedStart,
    startDate: formattedStart,
    endDate: formattedEnd,
    isRange: formattedStart !== formattedEnd,
    summary: {
      totalOrders: orders.length,
      totalStores: uniqueClients.size,
      totalBruto: Math.round(totalBruto * 100) / 100,
      totalDiscount: Math.round(totalDiscount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      totalProductsUnits,
      totalRegularUnits,
      totalBonificationUnits,
      statusCounts
    },
    bonificationsSummary,
    productsSummary: Array.from(productsMap.values()).sort((a, b) => b.totalAmount - a.totalAmount)
  }
}



export const getOrderById = async (id: number) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      client: true,
      preventista: { select: { id: true, name: true } },
      distributor: { select: { id: true, name: true } },
      region: { select: { id: true, name: true } },
      items: { include: { product: true } },
      history: { orderBy: { createdAt: 'asc' } }
    }
  })
  if (!order) throw new Error('Pedido no encontrado')
  return order
}

export const createOrder = async (
  data: {
    clientId: number
    notes?: string
    discount?: number
    items: { productId: number; quantity: number; isBonification?: boolean }[]
  },
  preventistaId: number
) => {
  const regularItems = data.items.filter(i => !i.isBonification)
  if (!regularItems.length) {
    throw new Error('El pedido debe tener al menos un producto regular')
  }

  // Obtener todos los productIds (regulares + bonificaciones)
  const allProductIds = [...new Set(data.items.map(i => i.productId))]
  const products = await prisma.product.findMany({
    where: { id: { in: allProductIds }, isActive: true }
  })

  if (products.length !== allProductIds.length) {
    throw new Error('Uno o más productos no existen o están inactivos')
  }

  const client = await prisma.client.findUnique({ where: { id: data.clientId } })
  if (!client) throw new Error('Cliente no encontrado')

  // Crear pedido + items en una sola transacción
  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        clientId: data.clientId,
        preventistaId,
        regionId: client.regionId,
        notes: data.notes,
        discount: data.discount !== undefined && data.discount > 0 ? Number(data.discount) : 0,
        status: 'aceptado',
        items: {
          create: data.items.map(item => {
            const product = products.find(p => p.id === item.productId)!
            const isBoni = item.isBonification === true
            return {
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: isBoni ? 0 : product.price,  // bonificación = precio 0
              isBonification: isBoni
            }
          })
        }
      }
    })
    return newOrder
  })

  // Historial DESPUÉS de que la transacción terminó
  await saveHistory(order.id, preventistaId, 'created', null, 'aceptado')

  return getOrderById(order.id)
}

export const updateOrder = async (
  id: number,
  data: {
    notes?: string
    discount?: number
    items?: { productId: number; quantity: number; isBonification?: boolean }[]
  },
  userId: number
) => {
  const order = await prisma.order.findUnique({ where: { id } })
  if (!order) throw new Error('Pedido no encontrado')

  if (!['pendiente', 'aceptado'].includes(order.status)) {
    throw new Error('Solo se pueden editar pedidos en estado pendiente o aceptado')
  }

  await prisma.$transaction(async (tx) => {
    const updateData: any = {}
    if (data.notes !== undefined) updateData.notes = data.notes
    if (data.discount !== undefined) updateData.discount = data.discount > 0 ? Number(data.discount) : 0

    if (Object.keys(updateData).length > 0) {
      await tx.order.update({ where: { id }, data: updateData })
    }

    // Si mandan nuevos items, reemplazar todos
    if (data.items && data.items.length > 0) {
      const allProductIds = [...new Set(data.items.map(i => i.productId))]
      const products = await tx.product.findMany({
        where: { id: { in: allProductIds }, isActive: true }
      })

      if (products.length !== allProductIds.length) {
        throw new Error('Uno o más productos no existen o están inactivos')
      }

      // Borrar items anteriores
      await tx.orderItem.deleteMany({ where: { orderId: id } })

      // Crear nuevos items
      await tx.orderItem.createMany({
        data: data.items.map(item => {
          const product = products.find(p => p.id === item.productId)!
          const isBoni = item.isBonification === true
          return {
            orderId: id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: isBoni ? 0 : product.price,
            isBonification: isBoni
          }
        })
      })
    }
  })

  await saveHistory(id, userId, 'updated', order.status, order.status)

  return getOrderById(id)
}

export const changeOrderStatus = async (
  id: number,
  newStatus: OrderStatus,
  userId: number
) => {
  const order = await prisma.order.findUnique({ where: { id } })
  if (!order) throw new Error('Pedido no encontrado')

  const updated = await prisma.order.update({
    where: { id },
    data: {
      status: newStatus,
      ...(['entregado', 'entrega_parcial'].includes(newStatus) && { deliveredAt: new Date() })
    }
  })

  await saveHistory(id, userId, 'status_changed', order.status, newStatus)

  return updated
}

export const assignOrders = async (
  orderIds: number[],
  distributorId: number,
  adminId: number
) => {
  const distributor = await prisma.user.findUnique({ where: { id: distributorId } })
  if (!distributor || distributor.role !== 'distribuidor') {
    throw new Error('Distribuidor no válido')
  }

  // Verificar que todos los pedidos existen y están en estado aceptado
  const orders = await prisma.order.findMany({
    where: { id: { in: orderIds } }
  })

  if (orders.length !== orderIds.length) {
    throw new Error('Uno o más pedidos no existen')
  }

  const notAccepted = orders.filter(o => o.status !== 'aceptado')
  if (notAccepted.length > 0) {
    throw new Error(`Los pedidos ${notAccepted.map(o => o.id).join(', ')} no están en estado aceptado`)
  }

  // Actualizar todos
  await prisma.order.updateMany({
    where: { id: { in: orderIds } },
    data: { distributorId, status: 'asignado' }
  })

  // Historial de cada pedido
  for (const orderId of orderIds) {
    await saveHistory(orderId, adminId, 'assigned', 'aceptado', 'asignado')
  }

  return { assigned: orderIds.length }
}

export const getOrdersForMap = async () => {
  return prisma.order.findMany({
    where: { status: { in: ['aceptado', 'asignado'] } },
    select: {
      id: true,
      status: true,
      regionId: true,
      client: { select: { latitude: true, longitude: true, name: true } }
    }
  })
}

// Retorna los IDs de clientes que YA tienen pedido HOY creado por este preventista
// Se calcula con el huso horario de Bolivia (-04:00) para que cada día a medianoche se resetee automáticamente
export const getTodayVisitedClientIds = async (preventistaId: number): Promise<number[]> => {
  const now = new Date()
  const boliviaTime = new Date(now.getTime() - 4 * 60 * 60 * 1000)
  const yyyy = boliviaTime.getUTCFullYear()
  const mm = String(boliviaTime.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(boliviaTime.getUTCDate()).padStart(2, '0')
  const todayStr = `${yyyy}-${mm}-${dd}`

  const start = new Date(`${todayStr}T00:00:00.000-04:00`)
  const end = new Date(`${todayStr}T23:59:59.999-04:00`)

  const orders = await prisma.order.findMany({
    where: {
      preventistaId,
      createdAt: { gte: start, lte: end }
    },
    select: { clientId: true }
  })

  // Deduplica por si el mismo cliente tiene más de un pedido hoy
  return [...new Set(orders.map(o => o.clientId))]
}
