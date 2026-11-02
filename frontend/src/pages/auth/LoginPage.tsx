import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { login } from '../../api/auth'
import { APP_VERSION } from '../../config/version'

export default function LoginPage() {
  const { login: setAuth, user } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Si ya está logueado redirige
  if (user) {
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />
    if (user.role === 'preventista') return <Navigate to="/preventista/clients" replace />
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await login(email, password)
      setAuth(res.token, res.user)

      if (res.user.role === 'admin') navigate('/admin/dashboard')
      else if (res.user.role === 'preventista') navigate('/preventista/clients')
      else setError('Este panel es solo para admin y preventistas')
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">

        {/* Logo / título */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🥔</div>
          <h1 className="text-2xl font-bold text-gray-800">Sistema de Pedidos</h1>
          <p className="text-gray-500 text-sm mt-1">Ingresa tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@pedidos.com"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg py-2.5 text-sm transition-colors"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="text-center text-xs text-gray-400 mt-4 font-medium">
          Distribuidora Lunova Admin {APP_VERSION}
        </div>
      </div>
    </div>
  )
}