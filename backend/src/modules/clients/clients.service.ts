import prisma from '../../prisma/client'
import { getRegionByPoint } from '../regions/regions.service'

export const getAllClients = async (userId?: number, userRole?: string) => {
  const role = userRole?.toLowerCase()
  
  // Si es preventista, filtrar por sus zonas asignadas + los que no tienen zona
  if (role === 'preventista' && userId) {
    const userRegions = await prisma.userRegion.findMany({
      where: { userId },
      select: { regionId: true }
    })
    const regionIds = userRegions.map(ur => ur.regionId)

    return prisma.client.findMany({
      where: {
        isActive: true,
        OR: [
          { regionId: { in: regionIds } }, // clientes de sus zonas
          { regionId: null }               // clientes sin zona (VISTOS POR TODOS)
        ]
      },
      include: {
        creator: { select: { id: true, name: true } },
        region: { select: { id: true, name: true, color: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  // Admin y otros roles (como distribuidor si no se especifica) ven todos
  return prisma.client.findMany({
    where: { isActive: true },
    include: {
      creator: { select: { id: true, name: true } },
      region: { select: { id: true, name: true, color: true } }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const getClientById = async (id: number) => {
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      creator: { select: { id: true, name: true } },
      region: { select: { id: true, name: true, color: true } },
      orders: {
        select: { id: true, status: true, createdAt: true },
        orderBy: { createdAt: 'desc' },
        take: 5 // últimos 5 pedidos
      }
    }
  })
  if (!client) throw new Error('Cliente no encontrado')
  return client
}

export const createClient = async (
  data: {
    name: string
    ownerName: string
    phone: string
    address: string
    latitude: number
    longitude: number
    regionId?: number
    photoUrl?: string
  },
  createdBy: number
) => {
  // Autodetección de región si no se provee
  if (data.regionId === undefined) {
    const detected = await getRegionByPoint(data.latitude, data.longitude)
    if (detected) data.regionId = detected.id
  }

  return prisma.client.create({
    data: { ...data, createdBy },
    include: {
      creator: { select: { id: true, name: true } },
      region: { select: { id: true, name: true } }
    }
  })
}

export const updateClient = async (
  id: number,
  data: {
    name?: string
    ownerName?: string
    phone?: string
    address?: string
    latitude?: number
    longitude?: number
    regionId?: number | null
    photoUrl?: string
  }
) => {
  const client = await prisma.client.findUnique({ where: { id } })
  if (!client) throw new Error('Cliente no encontrado')

  // Si cambian las coordenadas y no se provee nueva región explícita, redetectar automáticamente
  if ((data.latitude !== undefined || data.longitude !== undefined) && data.regionId === undefined) {
    const lat = data.latitude ?? client.latitude
    const lng = data.longitude ?? client.longitude
    const detected = await getRegionByPoint(lat, lng)
    data.regionId = detected ? detected.id : null
  }

  // Si cambió la región, actualizar también los pedidos activos del cliente
  if (data.regionId !== undefined && data.regionId !== client.regionId) {
    await prisma.order.updateMany({
      where: {
        clientId: id,
        status: { in: ['pendiente', 'aceptado', 'asignado'] }
      },
      data: { regionId: data.regionId }
    })
  }

  return prisma.client.update({
    where: { id },
    data,
    include: {
      creator: { select: { id: true, name: true } },
      region: { select: { id: true, name: true } }
    }
  })
}

export const deleteClient = async (id: number) => {
  const client = await prisma.client.findUnique({ where: { id } })
  if (!client) throw new Error('Cliente no encontrado')

  // Soft delete — no borra, solo desactiva
  return prisma.client.update({
    where: { id },
    data: { isActive: false }
  })
}
