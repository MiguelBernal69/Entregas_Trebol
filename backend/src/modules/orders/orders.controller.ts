import { Response } from 'express'
import { AuthRequest } from '../../middlewares/auth.middleware'
import * as service from './orders.service'
import { OrderStatus } from '../../generated/prisma'

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const { status, regionId, preventistaId, page, limit, date } = req.query

    // Preventista solo ve sus propios pedidos
    const filters = {
      status: status as OrderStatus | undefined,
      regionId: regionId ? Number(regionId) : undefined,
      date: date as string | undefined,
      preventistaId: req.user?.role === 'preventista'
        ? req.user.id
        : preventistaId ? Number(preventistaId) : undefined
    }

    const pagination = {
      skip: page ? (Number(page) - 1) * (Number(limit) || 30) : undefined,
      take: limit ? Number(limit) : page ? 30 : undefined
    }

    const orders = await service.getAllOrders(filters, pagination)
    res.json(orders)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getDailyReport = async (req: AuthRequest, res: Response) => {
  try {
    const { date, startDate, endDate } = req.query
    const preventistaId = req.user?.role === 'preventista'
      ? req.user.id
      : (req.query.preventistaId ? Number(req.query.preventistaId) : undefined)

    const report = await service.getDailyReport({
      date: date as string | undefined,
      startDate: startDate as string | undefined,
      endDate: endDate as string | undefined,
      preventistaId
    })
    res.json(report)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}



export const getOne = async (req: AuthRequest, res: Response) => {
  try {
    const order = await service.getOrderById(Number(req.params.id))
    res.json(order)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

export const getMap = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await service.getOrdersForMap()
    res.json(orders)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const { clientId, notes, items, discount } = req.body

    if (!clientId || !items) {
      res.status(400).json({ message: 'clientId e items son requeridos' })
      return
    }

    const order = await service.createOrder(
      { 
        clientId: Number(clientId), 
        notes, 
        items,
        discount: discount !== undefined ? Number(discount) : 0
      },
      req.user!.id
    )
    res.status(201).json(order)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const order = await service.updateOrder(
      Number(req.params.id),
      req.body,
      req.user!.id
    )
    res.json(order)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const changeStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body
    const validStatuses: OrderStatus[] = ['pendiente', 'aceptado', 'asignado', 'entregado']

    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: 'Estado inválido' })
      return
    }

    const order = await service.changeOrderStatus(
      Number(req.params.id),
      status,
      req.user!.id
    )
    res.json(order)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const assign = async (req: AuthRequest, res: Response) => {
  try {
    const { orderIds, distributorId } = req.body

    if (!orderIds || !distributorId || !Array.isArray(orderIds)) {
      res.status(400).json({ message: 'orderIds (array) y distributorId son requeridos' })
      return
    }

    const result = await service.assignOrders(orderIds, Number(distributorId), req.user!.id)
    res.json(result)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getMyVisitedToday = async (req: AuthRequest, res: Response) => {
  try {
    const clientIds = await service.getTodayVisitedClientIds(req.user!.id)
    res.json({ clientIds })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}