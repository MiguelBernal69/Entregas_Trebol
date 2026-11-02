import { Response } from 'express'
import { AuthRequest } from '../../middlewares/auth.middleware'
import * as service from './products.service'
import * as prodService from './production.service'

export const getAll = async (req: AuthRequest, res: Response) => {
  try {
    // Preventistas solo ven productos activos
    const onlyActive = req.user?.role === 'preventista'
    const products = await service.getAllProducts(onlyActive)
    res.json(products)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getInventoryStats = async (req: AuthRequest, res: Response) => {
  try {
    const { startDate, endDate, category, preventistaId, distributorId } = req.query
    const stats = await service.getInventoryStats({
      startDate: startDate as string,
      endDate: endDate as string,
      category: category as string,
      preventistaId: preventistaId ? Number(preventistaId) : undefined,
      distributorId: distributorId ? Number(distributorId) : undefined
    })
    res.json(stats)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

// ─── CONTROLADORES DE PRODUCCIÓN Y STOCK ────────────────────

export const addProduction = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity, notes, date } = req.body
    const entry = await prodService.createProductionEntry({
      productId: Number(productId),
      quantity: Number(quantity),
      notes,
      date,
      userId: req.user?.id
    })
    res.status(201).json(entry)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getProductionList = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, startDate, endDate, limit } = req.query
    const list = await prodService.getProductionEntries({
      productId: productId ? Number(productId) : undefined,
      startDate: startDate as string,
      endDate: endDate as string,
      limit: limit ? Number(limit) : undefined
    })
    res.json(list)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const removeProduction = async (req: AuthRequest, res: Response) => {
  try {
    await prodService.deleteProductionEntry(Number(req.params.id))
    res.json({ message: 'Entrada de producción eliminada correctamente' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const getStockBalance = async (req: AuthRequest, res: Response) => {
  try {
    const { startDate, endDate, category } = req.query
    const balance = await prodService.getWarehouseStockBalance({
      startDate: startDate as string,
      endDate: endDate as string,
      category: category as string
    })
    res.json(balance)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const getOne = async (req: AuthRequest, res: Response) => {
  try {
    const product = await service.getProductById(Number(req.params.id))
    res.json(product)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

export const create = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, unit, category } = req.body

    if (!name || !price || !unit) {
      res.status(400).json({ message: 'name, price y unit son requeridos' })
      return
    }

    const product = await service.createProduct({
      name,
      description,
      price: Number(price),
      unit,
      category
    })
    res.status(201).json(product)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const data: any = { ...req.body }
    if (data.price) data.price = Number(data.price)

    const product = await service.updateProduct(Number(req.params.id), data)
    res.json(product)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const toggle = async (req: AuthRequest, res: Response) => {
  try {
    const product = await service.toggleProduct(Number(req.params.id))
    res.json(product)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    await service.deleteProduct(Number(req.params.id))
    res.json({ message: 'Producto eliminado correctamente' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}