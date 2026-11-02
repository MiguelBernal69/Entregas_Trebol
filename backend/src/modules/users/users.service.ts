import bcrypt from 'bcryptjs'
import prisma from '../../prisma/client'
import { Role } from '../../generated/prisma'

export const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true
    }
  })
  if (!user) throw new Error('Usuario no encontrado')
  return user
}

export const createUser = async (data: {
  name: string
  email: string
  password: string
  phone?: string
  role: Role
}) => {
  const exists = await prisma.user.findUnique({ where: { email: data.email } })
  if (exists) throw new Error('El email ya está registrado')

  const hashed = await bcrypt.hash(data.password, 10)

  return prisma.user.create({
    data: { ...data, password: hashed },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true
    }
  })
}

export const updateUser = async (id: number, data: {
  name?: string
  email?: string
  phone?: string
  password?: string
}) => {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new Error('Usuario no encontrado')

  // Si mandan nueva contraseña la hasheamos
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10)
  }

  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true
    }
  })
}

export const toggleUserActive = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) throw new Error('Usuario no encontrado')

  return prisma.user.update({
    where: { id },
    data: { isActive: !user.isActive },
    select: { id: true, name: true, isActive: true }
  })
}

export const getUserRegionsService = async (userId: number) => {
  return prisma.userRegion.findMany({
    where: { userId },
    include: { region: { select: { id: true, name: true, color: true } } }
  })
}