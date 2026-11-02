import prisma from '../../prisma/client'

export const getAllProducts = async (onlyActive = false) => {
  return prisma.product.findMany({
    where: onlyActive ? { isActive: true } : {},
    orderBy: { name: 'asc' }
  })
}

export const deleteProduct = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { _count: { select: { orderItems: true } } }
  })

  if (!product) throw new Error('Producto no encontrado')

  if (product._count.orderItems > 0) {
    throw new Error('No se puede eliminar un producto que ya tiene pedidos asociados. Considere desactivarlo en su lugar.')
  }

  return prisma.product.delete({ where: { id } })
}

export const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) throw new Error('Producto no encontrado')
  return product
}

export const createProduct = async (data: {
  name: string
  description?: string
  price: number
  unit: string
  category?: string
}) => {
  const exists = await prisma.product.findFirst({ where: { name: data.name } })
  if (exists) throw new Error('Ya existe un producto con ese nombre')

  return prisma.product.create({
    data: {
      ...data,
      category: data.category?.trim() || 'Categoría A'
    }
  })
}

export const updateProduct = async (id: number, data: {
  name?: string
  description?: string
  price?: number
  unit?: string
  category?: string
}) => {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) throw new Error('Producto no encontrado')

  return prisma.product.update({
    where: { id },
    data: {
      ...data,
      ...(data.category && { category: data.category.trim() })
    }
  })
}

export const toggleProduct = async (id: number) => {
  const product = await prisma.product.findUnique({ where: { id } })
  if (!product) throw new Error('Producto no encontrado')

  return prisma.product.update({
    where: { id },
    data: { isActive: !product.isActive },
    select: { id: true, name: true, isActive: true }
  })
}

export const getInventoryStats = async (filters: {
  startDate?: string
  endDate?: string
  category?: string
  preventistaId?: number
  distributorId?: number
}) => {
  const productWhere: any = {}
  if (filters.category && filters.category !== 'all') {
    productWhere.category = filters.category
  }

  const products = await prisma.product.findMany({
    where: productWhere,
    orderBy: { name: 'asc' }
  })

  const orderWhere: any = {}

  if (filters.startDate || filters.endDate) {
    const dateClause: any = {}
    if (filters.startDate) {
      dateClause.gte = new Date(`${filters.startDate}T00:00:00.000-04:00`)
    }
    if (filters.endDate) {
      dateClause.lte = new Date(`${filters.endDate}T23:59:59.999-04:00`)
    }
    orderWhere.createdAt = dateClause
  }

  if (filters.preventistaId) {
    orderWhere.preventistaId = Number(filters.preventistaId)
  }

  if (filters.distributorId) {
    orderWhere.distributorId = Number(filters.distributorId)
  }

  const items = await prisma.orderItem.findMany({
    where: {
      order: orderWhere,
      ...(productWhere.category ? { product: productWhere } : {})
    },
    include: {
      order: {
        select: {
          id: true,
          status: true,
          createdAt: true,
          deliveredAt: true
        }
      }
    }
  })

  const statsMap = new Map<number, {
    product: {
      id: number
      name: string
      unit: string
      price: number
      category: string
      isActive: boolean
    }
    pedidaRegular: number
    vendidaRegular: number
    devueltaRegular: number
    pendienteRegular: number
    pedidaBonif: number
    entregadaBonif: number
    devueltaBonif: number
    pendienteBonif: number
    totalDinero: number
    pedidosCount: Set<number>
  }>()

  for (const p of products) {
    statsMap.set(p.id, {
      product: {
        id: p.id,
        name: p.name,
        unit: p.unit,
        price: p.price,
        category: p.category,
        isActive: p.isActive
      },
      pedidaRegular: 0,
      vendidaRegular: 0,
      devueltaRegular: 0,
      pendienteRegular: 0,
      pedidaBonif: 0,
      entregadaBonif: 0,
      devueltaBonif: 0,
      pendienteBonif: 0,
      totalDinero: 0,
      pedidosCount: new Set<number>()
    })
  }

  for (const item of items) {
    const stat = statsMap.get(item.productId)
    if (!stat) continue

    stat.pedidosCount.add(item.orderId)
    const orderStatus = item.order.status
    const isDelivered = orderStatus === 'entregado' || orderStatus === 'entrega_parcial'
    const isPending = orderStatus === 'pendiente' || orderStatus === 'aceptado' || orderStatus === 'asignado'

    const orderedQty = item.quantity
    const deliveredQty = isDelivered ? (item.deliveredQuantity ?? item.quantity) : 0
    const returnedQty = isDelivered ? Math.max(0, orderedQty - deliveredQty) : 0

    if (item.isBonification) {
      stat.pedidaBonif += orderedQty
      if (isDelivered) {
        stat.entregadaBonif += deliveredQty
        stat.devueltaBonif += returnedQty
      } else if (isPending) {
        stat.pendienteBonif += orderedQty
      }
    } else {
      stat.pedidaRegular += orderedQty
      if (isDelivered) {
        stat.vendidaRegular += deliveredQty
        stat.devueltaRegular += returnedQty
        stat.totalDinero += (deliveredQty * item.unitPrice)
      } else if (isPending) {
        stat.pendienteRegular += orderedQty
      }
    }
  }

  const result = Array.from(statsMap.values()).map(s => ({
    product: s.product,
    pedidaRegular: s.pedidaRegular,
    vendidaRegular: s.vendidaRegular,
    devueltaRegular: s.devueltaRegular,
    pendienteRegular: s.pendienteRegular,
    pedidaBonif: s.pedidaBonif,
    entregadaBonif: s.entregadaBonif,
    devueltaBonif: s.devueltaBonif,
    pendienteBonif: s.pendienteBonif,
    totalDinero: s.totalDinero,
    pedidosCount: s.pedidosCount.size,
    totalBultosMovidos: s.vendidaRegular + s.entregadaBonif + s.devueltaRegular + s.devueltaBonif + s.pendienteRegular + s.pendienteBonif
  }))

  const summary = {
    totalProductos: products.length,
    totalVendidaRegular: result.reduce((acc, r) => acc + r.vendidaRegular, 0),
    totalDevueltaRegular: result.reduce((acc, r) => acc + r.devueltaRegular, 0),
    totalPendienteRegular: result.reduce((acc, r) => acc + r.pendienteRegular, 0),
    totalEntregadaBonif: result.reduce((acc, r) => acc + r.entregadaBonif, 0),
    totalDevueltaBonif: result.reduce((acc, r) => acc + r.devueltaBonif, 0),
    totalPendienteBonif: result.reduce((acc, r) => acc + r.pendienteBonif, 0),
    totalDinero: result.reduce((acc, r) => acc + r.totalDinero, 0),
    totalBultosEntregados: result.reduce((acc, r) => acc + (r.vendidaRegular + r.entregadaBonif), 0)
  }

  return {
    summary,
    products: result
  }
}