import { Response } from 'express'
import { AuthRequest } from '../../middlewares/auth.middleware'
import * as service from './distributor.service'
import * as sessionService from './sessions.service'

export const getMyOrders = async (req: AuthRequest, res: Response) => {
    try {
        const statusQuery = req.query.status as string | undefined
        const dateQuery = req.query.date as string | undefined
        const page = req.query.page ? Number(req.query.page) : undefined
        const limit = req.query.limit ? Number(req.query.limit) : undefined
        const skip = req.query.skip ? Number(req.query.skip) : undefined
        const take = req.query.take ? Number(req.query.take) : undefined

        const orders = await service.getMyOrders(
            req.user!.id,
            statusQuery,
            dateQuery,
            { page, limit, skip, take }
        )
        res.json(orders)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getMyOrderById = async (req: AuthRequest, res: Response) => {
    try {
        const order = await service.getMyOrderById(
            Number(req.params.id),
            req.user!.id
        )
        res.json(order)
    } catch (error: any) {
        res.status(404).json({ message: error.message })
    }
}

export const deliverOrder = async (req: AuthRequest, res: Response) => {
    try {
        const deliveredItems = req.body.deliveredItems as
            { orderItemId: number; deliveredQuantity: number }[] | undefined
        const notes = req.body.notes as string | undefined

        const order = await service.deliverOrder(
            Number(req.params.id),
            req.user!.id,
            deliveredItems,
            notes
        )
        res.json({ message: 'Pedido entregado correctamente', order })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

// ─── Sesiones de Distribución ──────────────────────────────

export const getActiveSession = async (req: AuthRequest, res: Response) => {
    try {
        const session = await sessionService.getActiveSession(req.user!.id)
        res.json(session)
    } catch (error: any) {
        res.status(404).json({ message: error.message })
    }
}

export const openSession = async (req: AuthRequest, res: Response) => {
    try {
        const session = await sessionService.openSession(req.user!.id)
        res.json({ message: 'Sesión abierta correctamente', session })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const getSessionReport = async (req: AuthRequest, res: Response) => {
    try {
        const report = await sessionService.getSessionReport(req.user!.id)
        res.json(report)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export const closeMySession = async (req: AuthRequest, res: Response) => {
    try {
        const active = await sessionService.getActiveSession(req.user!.id)
        if (!active) {
            return res.status(400).json({ message: 'No tienes una sesión activa' })
        }
        const session = await sessionService.closeSession(active.id, undefined, req.body.notes)
        res.json({ message: 'Sesión cerrada correctamente', session })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}