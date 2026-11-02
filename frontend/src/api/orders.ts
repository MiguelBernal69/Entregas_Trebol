import api from './axios'

export const getOrders = async (params?: any) => (await api.get('/orders', { params })).data
export const getOrder = async (id: number) => (await api.get(`/orders/${id}`)).data
export const getOrdersMap = async () => (await api.get('/orders/map')).data
export const createOrder = async (data: any) => (await api.post('/orders', data)).data
export const updateOrder = async (id: number, data: any) => (await api.put(`/orders/${id}`, data)).data
export const assignOrders = async (data: any) => (await api.post('/orders/assign', data)).data
export const changeOrderStatus = async (id: number, status: string) =>
  (await api.patch(`/orders/${id}/status`, { status })).data
export const getMyVisitedToday = async (): Promise<number[]> => {
  const res = await api.get('/orders/my-visited-today')
  return res.data.clientIds
}
export const getDailyReport = async (params?: { date?: string; startDate?: string; endDate?: string } | string) => {
  const queryParams = typeof params === 'string' ? { date: params } : params
  return (await api.get('/orders/daily-report', { params: queryParams })).data
}

