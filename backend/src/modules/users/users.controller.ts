import { Response } from 'express'
import { AuthRequest } from '../../middlewares/auth.middleware'
import * as service from './users.service'
import { Role } from '../../generated/prisma'

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const users = await service.getAllUsers()
    res.json(users)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getOne = async (req: AuthRequest, res: Response) => {
  try {
    const user = await service.getUserById(Number(req.params.id))
    res.json(user)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, phone, role } = req.body

    if (!name || !email || !password || !role) {
      res.status(400).json({ message: 'name, email, password y role son requeridos' })
      return
    }

    const validRoles: Role[] = ['admin', 'preventista', 'distribuidor']
    if (!validRoles.includes(role)) {
      res.status(400).json({ message: 'Rol inválido' })
      return
    }

    const user = await service.createUser({ name, email, password, phone, role })
    res.status(201).json(user)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const user = await service.updateUser(Number(req.params.id), req.body)
    res.json(user)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const toggle = async (req: AuthRequest, res: Response) => {
  try {
    const user = await service.toggleUserActive(Number(req.params.id))
    res.json(user)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getUserRegions = async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.getUserRegionsService(Number(req.params.id))
    res.json(data)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}