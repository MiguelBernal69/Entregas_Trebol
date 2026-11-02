import { Response } from 'express'
import { AuthRequest } from '../../middlewares/auth.middleware'
import * as service from './regions.service'
import pool from '../../config/db'

export const recalculate = async (req: AuthRequest, res: Response) => {
  try {
    const result = await service.recalculateAllRegions()
    res.json(result)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const regions = await service.getAllRegions()
    res.json(regions)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getOne = async (req: AuthRequest, res: Response) => {
  try {
    const region = await service.getRegionById(Number(req.params.id))
    res.json(region)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const { name, color, polygon } = req.body

    if (!name || !polygon) {
      res.status(400).json({ message: 'name y polygon son requeridos' })
      return
    }

    const region = await service.createRegion({ name, color, polygon }, req.user!.id)
    res.status(201).json(region)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const region = await service.updateRegion(Number(req.params.id), req.body)
    res.json(region)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const result = await service.deleteRegion(Number(req.params.id))
    res.json(result)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getOrdersInRegion = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await service.getOrdersByRegion(Number(req.params.id))
    res.json(orders)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const detectRegion = async (req: AuthRequest, res: Response) => {
  try {
    const { latitude, longitude } = req.query

    if (!latitude || !longitude) {
      res.status(400).json({ message: 'latitude y longitude son requeridos' })
      return
    }

    const region = await service.getRegionByPoint(
      Number(latitude),
      Number(longitude)
    )

    res.json(region ?? { message: 'El punto no pertenece a ninguna región' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}   

export const assignRegion = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, regionId } = req.body
    if (!userId || !regionId) {
      res.status(400).json({ message: 'userId y regionId son requeridos' })
      return
    }
    const result = await service.assignRegionToUser(Number(userId), Number(regionId))
    res.json(result)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const removeRegion = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, regionId } = req.body
    await service.removeRegionFromUser(Number(userId), Number(regionId))
    res.json({ message: 'Zona removida' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const assignBulk = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, regionIds } = req.body
    if (!userId || !Array.isArray(regionIds)) {
      res.status(400).json({ message: 'userId y un array regionIds son requeridos' })
      return
    }
    const result = await service.assignRegionsBulk(Number(userId), regionIds.map(Number))
    res.json(result)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getPreventistasInRegion = async (req: AuthRequest, res: Response) => {
  try {
    const result = await service.getPreventistasInRegion(Number(req.params.id))
    res.json(result)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getMyRegions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id
    // Traemos las regiones con polígono GeoJSON para poder dibujarlas en el mapa
    const result = await pool.query(`
      SELECT
        r.id, r.name, r.color,
        ST_AsGeoJSON(r.polygon)::json AS polygon
      FROM "UserRegion" ur
      JOIN "Region" r ON r.id = ur."regionId"
      WHERE ur."userId" = $1
      ORDER BY r.name
    `, [userId])
    res.json(result.rows)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}