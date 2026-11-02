import api from './axios'

export const getUsers = async () => (await api.get('/users')).data
export const createUser = async (data: any) => (await api.post('/users', data)).data
export const updateUser = async (id: number, data: any) => (await api.put(`/users/${id}`, data)).data
export const toggleUser = async (id: number) => (await api.patch(`/users/${id}/toggle`)).data

export const getUserRegions = async (id: number) =>
  (await api.get(`/users/${id}/regions`)).data