import api from './axios'

export const getDistributorOrders = async (params?: { status?: string; date?: string }) => {
  return (await api.get('/distributor/orders', { params })).data
}

export const getDistributorOrder = async (id: number) => {
  return (await api.get(`/distributor/orders/${id}`)).data
}

export const deliverDistributorOrder = async (
  id: number,
  data: {
    deliveredItems: { orderItemId: number; deliveredQuantity: number }[]
    notes?: string
  }
) => {
  return (await api.patch(`/distributor/orders/${id}/deliver`, data)).data
}

export const getDistributorSession = async () => {
  return (await api.get('/distributor/session')).data
}

export const openDistributorSession = async () => {
  return (await api.post('/distributor/session/open')).data
}

export const closeDistributorSession = async () => {
  return (await api.post('/distributor/session/close')).data
}

export const getDistributorReport = async () => {
  return (await api.get('/distributor/session/report')).data
}
