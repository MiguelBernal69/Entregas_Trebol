import { Request, Response } from 'express'
import { loginService, getMeService } from './auth.service'
import { AuthRequest } from '../../middlewares/auth.middleware'

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: 'Email y contraseña requeridos' })
      return
    }
    const result = await loginService(email, password)
    res.json(result)
  } catch (error: any) {
    res.status(401).json({ message: error.message })
  }
}

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getMeService(req.user!.id)
    res.json(user)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}