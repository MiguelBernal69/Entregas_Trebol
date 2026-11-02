import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import type { Role } from '../types'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  roles?: Role[]
}

export const ProtectedRoute = ({ children, roles }: Props) => {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div className="flex items-center justify-center h-screen">Cargando...</div>
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/unauthorized" replace />

  return <>{children}</>
}