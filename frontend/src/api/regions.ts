import api from './axios'

export const getRegions = async () => 
    (await api.get('/regions')).data

export const getRegion = async (id: number) => 
    (await api.get(`/regions/${id}`)).data

export const createRegion = async (data: any) =>
    (await api.post('/regions', data)).data

export const updateRegion = async (id: number, data: any) => 
    (await api.put(`/regions/${id}`, data)).data

export const deleteRegion = async (id: number) => 
    (await api.delete(`/regions/${id}`)).data

export const getOrdersInRegion = async (id: number) => 
    (await api.get(`/regions/${id}/orders`)).data

export const recalculateRegions = async () => 
    (await api.post('/regions/recalculate')).data

export const assignRegion = async (userId: number, regionId: number) =>
  (await api.post('/regions/assign', { userId, regionId })).data

export const removeRegion = async (userId: number, regionId: number) =>
  (await api.delete('/regions/assign', { data: { userId, regionId } })).data

export const assignRegionsBulk = async (userId: number, regionIds: number[]) =>
  (await api.post('/regions/assign-bulk', { userId, regionIds })).data

export const getMyRegions = async (): Promise<{ id: number; name: string; color: string; polygon?: any }[]> =>
  (await api.get('/regions/me')).data
