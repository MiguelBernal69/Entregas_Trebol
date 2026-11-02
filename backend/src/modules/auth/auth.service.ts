import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../prisma/client'

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: { email: { equals: email.trim(), mode: 'insensitive' } }
  })

  if (!user || !user.isActive) throw new Error('Credenciales inválidas')

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Credenciales inválidas')

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  )

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone
    }
  }
}

export const getMeService = async (id: number) => {
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