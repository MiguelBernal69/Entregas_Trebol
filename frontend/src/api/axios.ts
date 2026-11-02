import axios from 'axios'

// En desarrollo: http://localhost:3000
// En producción: ruta relativa '' para apoyarse en el proxy de Nginx (/api)
const BACKEND_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000')

const api = axios.create({
    baseURL: `${BACKEND_BASE}/api`
})

// Convierte photoUrl (relativa o absoluta) a URL completa del backend
export const getImageUrl = (photoUrl?: string | null): string => {
    if (!photoUrl) return ''
    // Si ya es una URL absoluta, devolverla tal cual
    if (photoUrl.startsWith('http')) return photoUrl
    // Si es ruta relativa, anteponer la base del backend
    const clean = photoUrl.startsWith('/') ? photoUrl.slice(1) : photoUrl
    return `${BACKEND_BASE}/${clean}`
}

// Agrega el token automáticamente a cada request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// Si el token expiró, redirige al login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api