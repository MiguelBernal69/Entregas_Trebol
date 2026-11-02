import { Response } from 'express'
import { AuthRequest } from '../../middlewares/auth.middleware'
import * as service from './clients.service'
import fs from 'fs'

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const clients = await service.getAllClients(req.user?.id, req.user?.role)
    res.json(clients)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getOne = async (req: AuthRequest, res: Response) => {
  try {
    const client = await service.getClientById(Number(req.params.id))
    res.json(client)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const { name, ownerName, phone, address, latitude, longitude, regionId } = req.body

    if (!name || !ownerName || !phone || !address || latitude === undefined || longitude === undefined) {
      res.status(400).json({ message: 'Faltan campos requeridos' })
      return
    }

    const lat = Number(latitude)
    const lng = Number(longitude)
    if (isNaN(lat) || isNaN(lng)) {
      res.status(400).json({ message: 'Coordenadas inválidas' })
      return
    }

    // Guardamos ruta relativa para que la app construya la URL con la IP correcta
    const photoUrl = req.file
      ? `uploads/clients/${req.file.filename}`
      : undefined

    let parsedRegionId: number | undefined = undefined
    if (regionId !== undefined && regionId !== '' && regionId !== 'null' && regionId !== null) {
      const num = Number(regionId)
      if (!isNaN(num)) parsedRegionId = num
    }

    const client = await service.createClient(
      {
        name,
        ownerName,
        phone,
        address,
        latitude: lat,
        longitude: lng,
        regionId: parsedRegionId,
        photoUrl
      },
      req.user!.id
    )

    res.status(201).json(client)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const updateData: any = { ...req.body }

    // Si se subió nueva foto, guardamos ruta relativa
    if (req.file) {
      updateData.photoUrl = `uploads/clients/${req.file.filename}`

      // Borrar foto anterior si existe
      const existing = await service.getClientById(Number(req.params.id))
      if (existing.photoUrl) {
        // La ruta relativa puede ser 'uploads/clients/...' o una URL absoluta antigua
        const oldPath = existing.photoUrl.includes('/uploads/')
          ? existing.photoUrl.split('/uploads/')[1]
          : existing.photoUrl.replace('uploads/', '')
        const fullPath = `uploads/${oldPath}`
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath)
      }
    }

    if (updateData.latitude !== undefined) updateData.latitude = Number(updateData.latitude)
    if (updateData.longitude !== undefined) updateData.longitude = Number(updateData.longitude)

    if (updateData.regionId !== undefined) {
      if (updateData.regionId === '' || updateData.regionId === 'null' || updateData.regionId === null) {
        updateData.regionId = null
      } else {
        const num = Number(updateData.regionId)
        updateData.regionId = isNaN(num) ? undefined : num
      }
    }

    const client = await service.updateClient(Number(req.params.id), updateData)
    res.json(client)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    await service.deleteClient(Number(req.params.id))
    res.json({ message: 'Cliente desactivado correctamente' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
