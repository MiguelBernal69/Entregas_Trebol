import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth } from '../context/AuthContext'

// Auth
import LoginPage from '../pages/auth/LoginPage'

// Admin
import AdminDashboard from '../pages/admin/Dashboard'
import AdminUsers from '../pages/admin/Users'
import AdminProducts from '../pages/admin/Products'
import AdminOrders from '../pages/admin/Orders'
import AdminMap from '../pages/admin/Map'
import AdminRegions from '../pages/admin/Regions'
import AdminHistory from '../pages/admin/History'
import AdminClients from '../pages/admin/Clients'
import AssignRegions from '../pages/admin/AssignRegions'
import DistributionSessions from '../pages/admin/DistributionSessions'
import AdminInventory from '../pages/admin/InventoryReport'

// Preventista
import PreventistaClients from '../pages/preventista/Clients'
import PreventistaOrders from '../pages/preventista/Orders'
import PreventistaReport from '../pages/preventista/Report'

// Distribuidor
import DistributorOrders from '../pages/distribuidor/Orders'

const RedirectByRole = () => {
  const { user } = useAuth()
  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" replace />
  if (user?.role === 'preventista') return <Navigate to="/preventista/clients" replace />
  if (user?.role === 'distribuidor') return <Navigate to="/distribuidor/orders" replace />
  return <Navigate to="/login" replace />
}

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><RedirectByRole /></ProtectedRoute>} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute roles={['admin']}><AdminProducts /></ProtectedRoute>} />
        <Route path="/admin/inventory" element={<ProtectedRoute roles={['admin']}><AdminInventory /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute roles={['admin']}><AdminOrders /></ProtectedRoute>} />
        <Route path="/admin/map" element={<ProtectedRoute roles={['admin']}><AdminMap /></ProtectedRoute>} />
        <Route path="/admin/regions" element={<ProtectedRoute roles={['admin', 'preventista']}><AdminRegions /></ProtectedRoute>} />
        <Route path="/admin/history" element={<ProtectedRoute roles={['admin']}><AdminHistory /></ProtectedRoute>} />
        <Route path="/admin/clients" element={<ProtectedRoute roles={['admin']}><AdminClients /></ProtectedRoute>} />
        <Route path="/admin/assign-regions" element={<ProtectedRoute roles={['admin']}><AssignRegions /></ProtectedRoute>} />
        <Route path="/admin/sessions" element={<ProtectedRoute roles={['admin']}><DistributionSessions /></ProtectedRoute>} />
        {/* Preventista */}
        <Route path="/preventista/clients" element={<ProtectedRoute roles={['preventista']}><PreventistaClients /></ProtectedRoute>} />
        <Route path="/preventista/orders" element={<ProtectedRoute roles={['preventista']}><PreventistaOrders /></ProtectedRoute>} />
        <Route path="/preventista/report" element={<ProtectedRoute roles={['preventista']}><PreventistaReport /></ProtectedRoute>} />

        {/* Distribuidor */}
        <Route path="/distribuidor/orders" element={<ProtectedRoute roles={['distribuidor']}><DistributorOrders /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}