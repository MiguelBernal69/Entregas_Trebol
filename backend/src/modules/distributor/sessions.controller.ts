import { Response } from 'express'
import { AuthRequest } from '../../middlewares/auth.middleware'
import * as sessionService from './sessions.service'

// ─── Rutas Admin para sesiones ─────────────────────────────

export const getAllSessions = async (req: AuthRequest, res: Response) => {
    try {
        const { distributorId, status } = req.query
        const sessions = await sessionService.getAllSessions({
            distributorId: distributorId ? Number(distributorId) : undefined,
            status: status as 'activa' | 'cerrada' | undefined
        })
        res.json(sessions)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const getSessionById = async (req: AuthRequest, res: Response) => {
    try {
        const session = await sessionService.getSessionById(Number(req.params.id))
        res.json(session)
    } catch (error: any) {
        res.status(404).json({ message: error.message })
    }
}

export const closeSession = async (req: AuthRequest, res: Response) => {
    try {
        const { notes } = req.body
        const session = await sessionService.closeSession(
            Number(req.params.id),
            req.user!.id,
            notes
        )
        res.json({ message: 'Sesión cerrada correctamente', session })
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}
