import { Response, NextFunction } from 'express'
import { AuthRequest } from './auth.middleware'

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'No tienes permiso para esta acción' })
      return
    }
    next()
  }
}