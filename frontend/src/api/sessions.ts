import api from './axios'

export const getSessions = async (params?: any) => (await api.get('/sessions', { params })).data
export const getSessionDetail = async (id: number) => (await api.get(`/sessions/${id}`)).data
export const closeSession = async (id: number, notes?: string) =>
  (await api.patch(`/sessions/${id}/close`, { notes })).data
