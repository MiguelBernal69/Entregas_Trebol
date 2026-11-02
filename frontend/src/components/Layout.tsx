import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { APP_VERSION } from '../config/version'

interface NavItem {
  to: string
  label: string
  icon: string
}

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const adminNav: NavItem[] = [
    { to: '/admin/dashboard', label: 'Dashboard',  icon: '📊' },
    { to: '/admin/orders',    label: 'Pedidos',     icon: '📦' },
    // { to: '/admin/history',   label: 'Historial',   icon: '📋' },
    { to: '/admin/map',       label: 'Mapa',        icon: '🗺️'  },
    { to: '/admin/regions',   label: 'Zonas',       icon: '📍' },
    { to: '/admin/assign-regions',  label: 'Zonas', icon: '📌' },
    { to: '/admin/users',     label: 'Usuarios',    icon: '👥' },
    { to: '/admin/clients',   label: 'Clientes',    icon: '🏪' }, // ← nuevo
    { to: '/admin/products',  label: 'Productos',   icon: '🥔' },
    { to: '/admin/inventory', label: 'Inventario',  icon: '📈' },
    { to: '/admin/sessions',  label: 'Distribución', icon: '🚛' },
  ]

  const preventistaNav: NavItem[] = [
    { to: '/preventista/clients', label: 'Clientes', icon: '🏪' },
    { to: '/preventista/orders',  label: 'Pedidos',  icon: '📦' },
    { to: '/preventista/report',  label: 'Reportes', icon: '📊' },
    { to: '/admin/regions',       label: 'Zonas',    icon: '📍' },
  ]

  const distribuidorNav: NavItem[] = [
    { to: '/distribuidor/orders', label: 'Mis Entregas y Boletas', icon: '🚚' },
  ]

  const navItems =
    user?.role === 'admin'
      ? adminNav
      : user?.role === 'preventista'
      ? preventistaNav
      : distribuidorNav

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-56 bg-white shadow-md flex flex-col">
        <div className="p-5 border-b">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-800">🥔 Pedidos</div>
            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded-md">
              {APP_VERSION}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">{user?.name}</div>
          <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">
            {user?.role}
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <span>🚪</span>
            <span>Cerrar sesión</span>
          </button>
          <div className="text-center text-[10px] text-gray-400 mt-2 font-medium">
            Lunova Admin {APP_VERSION}
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>

    </div>
  )
}