import api from './axios'

export const getClients = async () => (await api.get('/clients')).data
export const getClient = async (id: number) => (await api.get(`/clients/${id}`)).data
export const createClient = async (data: FormData) => (await api.post('/clients', data)).data
export const updateClient = async (id: number, data: FormData) => (await api.put(`/clients/${id}`, data)).data
export const deleteClient = async (id: number) => (await api.delete(`/clients/${id}`)).data