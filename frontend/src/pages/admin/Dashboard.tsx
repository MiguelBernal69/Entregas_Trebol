import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { getOrders } from '../../api/orders'
import { getClients } from '../../api/clients'
import { getUsers } from '../../api/users'
import type { Order } from '../../types'

interface Stats {
  total: number
  pendiente: number
  aceptado: number
  asignado: number
  entregado: number
  entrega_parcial: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, pendiente: 0, aceptado: 0, asignado: 0, entregado: 0, entrega_parcial: 0 })
  const [totalClients, setTotalClients] = useState(0)
  const [totalUsers, setTotalUsers] = useState(0)
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orders, clients, users] = await Promise.all([
          getOrders(),
          getClients(),
          getUsers()
        ])

        const s: Stats = { total: orders.length, pendiente: 0, aceptado: 0, asignado: 0, entregado: 0, entrega_parcial: 0 }
        orders.forEach((o: Order) => { s[o.status]++ })

        setStats(s)
        setTotalClients(clients.length)
        setTotalUsers(users.length)
        setRecentOrders(orders.slice(0, 5))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statusColor: Record<string, string> = {
    pendiente: 'bg-yellow-100 text-yellow-700',
    aceptado:  'bg-blue-100 text-blue-700',
    asignado:  'bg-purple-100 text-purple-700',
    entregado: 'bg-green-100 text-green-700',
    entrega_parcial: 'bg-orange-100 text-orange-700'
  }

  if (loading) return (
    <Layout>
      <div className="flex items-center justify-center h-64 text-gray-500">Cargando...</div>
    </Layout>
  )

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Resumen general del sistema</p>
        </div>

        {/* Tarjetas de stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Pedidos"   value={stats.total}       icon="📦" color="bg-blue-50   border-blue-200"  />
          <StatCard label="Por entregar"    value={stats.asignado}    icon="🚚" color="bg-purple-50 border-purple-200" />
          <StatCard label="Entregados hoy"  value={stats.entregado + stats.entrega_parcial}   icon="✅" color="bg-green-50  border-green-200"  />
          <StatCard label="Clientes"        value={totalClients}      icon="🏪" color="bg-yellow-50 border-yellow-200" />
        </div>

        {/* Segunda fila */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Pendientes"  value={stats.pendiente} icon="⏳" color="bg-yellow-50 border-yellow-200" />
          <StatCard label="Aceptados"   value={stats.aceptado}  icon="📋" color="bg-blue-50   border-blue-200"   />
          <StatCard label="Asignados"   value={stats.asignado}  icon="👤" color="bg-purple-50 border-purple-200" />
          <StatCard label="Usuarios"    value={totalUsers}      icon="👥" color="bg-gray-50   border-gray-200"   />
        </div>

        {/* Pedidos recientes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-5 border-b">
            <h2 className="font-semibold text-gray-800">Pedidos recientes</h2>
          </div>
          <div className="divide-y">
            {recentOrders.length === 0 && (
              <p className="text-center text-gray-400 py-8">No hay pedidos aún</p>
            )}
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    #{order.id} — {order.client.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {order.preventista.name} · {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColor[order.status]}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Componente interno
function StatCard({ label, value, icon, color }: {
  label: string
  value: number
  icon: string
  color: string
}) {
  return (
    <div className={`bg-white border rounded-2xl p-5 ${color}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-3xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  )
}