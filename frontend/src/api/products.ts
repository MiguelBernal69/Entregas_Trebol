import api from './axios'

export const getProducts = async () => (await api.get('/products')).data
export const createProduct = async (data: any) => (await api.post('/products', data)).data
export const updateProduct = async (id: number, data: any) => (await api.put(`/products/${id}`, data)).data
export const toggleProduct = async (id: number) => (await api.patch(`/products/${id}/toggle`)).data
export const deleteProduct = async (id: number) => (await api.delete(`/products/${id}`)).data
export const getInventoryStats = async (params?: {
  startDate?: string
  endDate?: string
  category?: string
  preventistaId?: number
  distributorId?: number
}) => (await api.get('/products/inventory-stats', { params })).data

export const getStockBalance = async (params?: {
  startDate?: string
  endDate?: string
  category?: string
}) => (await api.get('/products/stock-balance', { params })).data

export const getProductionEntries = async (params?: {
  productId?: number
  startDate?: string
  endDate?: string
  limit?: number
}) => (await api.get('/products/production', { params })).data

export const createProductionEntry = async (data: {
  productId: number
  quantity: number
  notes?: string
  date?: string
}) => (await api.post('/products/production', data)).data

export const deleteProductionEntry = async (id: number) =>
  (await api.delete(`/products/production/${id}`)).data