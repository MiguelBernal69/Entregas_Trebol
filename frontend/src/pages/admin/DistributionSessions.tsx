import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { getSessions, getSessionDetail, closeSession } from '../../api/sessions'
import { getUsers } from '../../api/users'
import type { User } from '../../types'

interface Session {
  id: number
  distributorId: number
  status: 'activa' | 'cerrada'
  openedAt: string
  closedAt?: string
  closedByAdminId?: number
  notes?: string
  snapshotData?: any
  liveReport?: any
  distributor: { id: number; name: string }
  closedByAdmin?: { id: number; name: string }
}

export default function DistributionSessions() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [distributors, setDistributors] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<Session | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [filterDistributor, setFilterDistributor] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [closingId, setClosingId] = useState<number | null>(null)
  const [closeNotes, setCloseNotes] = useState('')

  const fetchSessions = async () => {
    try {
      const params: any = {}
      if (filterDistributor) params.distributorId = filterDistributor
      if (filterStatus) params.status = filterStatus

      const [sessionsData, usersData] = await Promise.all([
        getSessions(params),
        getUsers()
      ])
      setSessions(sessionsData)
      setDistributors(usersData.filter((u: User) => u.role === 'distribuidor'))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSessions() }, [filterDistributor, filterStatus])

  const openDetail = async (sessionId: number) => {
    setDetailLoading(true)
    try {
      const data = await getSessionDetail(sessionId)
      setDetail(data)
    } catch (err) {
      console.error(err)
    } finally {
      setDetailLoading(false)
    }
  }

  const handleClose = async (sessionId: number) => {
    try {
      await closeSession(sessionId, closeNotes)
      setClosingId(null)
      setCloseNotes('')
      setDetail(null)
      fetchSessions()
    } catch (err: any) {
      alert(err.response?.data?.message ?? 'Error al cerrar sesión')
    }
  }

  const activeCount = sessions.filter(s => s.status === 'activa').length

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Distribución</h1>
          <p className="text-gray-500 text-sm mt-1">
            Gestiona las sesiones de distribución y cierre de jornadas
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white border border-green-200 rounded-2xl p-5">
            <div className="text-2xl mb-1">🟢</div>
            <div className="text-3xl font-bold text-gray-800">{activeCount}</div>
            <div className="text-sm text-gray-500 mt-1">Sesiones activas</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="text-2xl mb-1">📋</div>
            <div className="text-3xl font-bold text-gray-800">{sessions.length}</div>
            <div className="text-sm text-gray-500 mt-1">Total sesiones</div>
          </div>
          <div className="bg-white border border-purple-200 rounded-2xl p-5 col-span-2 lg:col-span-1">
            <div className="text-2xl mb-1">🚛</div>
            <div className="text-3xl font-bold text-gray-800">{distributors.length}</div>
            <div className="text-sm text-gray-500 mt-1">Distribuidores</div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
          <select
            value={filterDistributor}
            onChange={e => setFilterDistributor(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los distribuidores</option>
            {distributors.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los estados</option>
            <option value="activa">Activa</option>
            <option value="cerrada">Cerrada</option>
          </select>

          {(filterDistributor || filterStatus) && (
            <button
              onClick={() => { setFilterDistributor(''); setFilterStatus('') }}
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              ✕ Limpiar
            </button>
          )}
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="text-center text-gray-400 py-12">Cargando sesiones...</div>
          ) : sessions.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No hay sesiones registradas</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">#</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Distribuidor</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Estado</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Apertura</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Cierre</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sessions.map(session => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-800">#{session.id}</td>
                    <td className="px-4 py-4 text-gray-800">{session.distributor.name}</td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        session.status === 'activa'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {session.status === 'activa' ? '🟢 Activa' : '⚪ Cerrada'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                      {new Date(session.openedAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-gray-500">
                      {session.closedAt ? new Date(session.closedAt).toLocaleString() : '—'}
                    </td>
                    <td className="px-4 py-4 flex gap-2">
                      <button
                        onClick={() => openDetail(session.id)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        Ver reporte
                      </button>
                      {session.status === 'activa' && (
                        <button
                          onClick={() => setClosingId(session.id)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        >
                          Cerrar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal de confirmación de cierre */}
      {closingId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Cerrar Sesión #{closingId}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Al cerrar la sesión se guardará un snapshot del reporte actual.
              El distribuidor podrá abrir una nueva sesión después.
            </p>
            <textarea
              value={closeNotes}
              onChange={e => setCloseNotes(e.target.value)}
              placeholder="Notas del cierre (opcional)..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setClosingId(null); setCloseNotes('') }}
                className="flex-1 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleClose(closingId)}
                className="flex-1 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700"
              >
                Confirmar Cierre
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal detalle del reporte */}
      {detail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Reporte — {detail.distributor.name}
                </h2>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                  detail.status === 'activa' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {detail.status === 'activa' ? '🟢 En curso' : '⚪ Cerrada'}
                </span>
              </div>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            {detailLoading ? (
              <div className="text-center py-8 text-gray-400">Cargando...</div>
            ) : (
              <ReportContent report={detail.status === 'activa' ? detail.liveReport : detail.snapshotData} />
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}

// Componente que muestra el contenido del reporte
function ReportContent({ report }: { report: any }) {
  if (!report) {
    return <p className="text-center text-gray-400 py-8">No hay datos de reporte disponibles</p>
  }

  const resumen = report.resumen || {}
  const productosVendidos = report.productosVendidos || []
  const stockEnCamioneta = report.stockEnCamioneta || []

  return (
    <div className="space-y-6">
      {/* Resumen */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-700">
            Bs. {(resumen.totalRecaudado ?? 0).toFixed(2)}
          </div>
          <div className="text-xs text-green-600 mt-1">Dinero recaudado</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{resumen.puntosEntregados ?? 0}</div>
          <div className="text-xs text-blue-600 mt-1">Puntos entregados</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-700">{resumen.pedidosPendientes ?? 0}</div>
          <div className="text-xs text-orange-600 mt-1">Pendientes</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-700">{resumen.totalPedidos ?? 0}</div>
          <div className="text-xs text-purple-600 mt-1">Total pedidos</div>
        </div>
      </div>

      {/* Tabla de productos vendidos */}
      {productosVendidos.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Productos Vendidos</h3>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 text-gray-600 font-medium">Producto</th>
                <th className="text-center px-3 py-2 text-gray-600 font-medium">Pedido</th>
                <th className="text-center px-3 py-2 text-gray-600 font-medium">Entregado</th>
                <th className="text-center px-3 py-2 text-gray-600 font-medium">Devuelto</th>
                <th className="text-right px-3 py-2 text-gray-600 font-medium">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {productosVendidos.map((p: any, i: number) => (
                <tr key={i}>
                  <td className="px-3 py-2 font-medium text-gray-800">{p.name}</td>
                  <td className="px-3 py-2 text-center">{p.cantidadPedida}</td>
                  <td className="px-3 py-2 text-center text-green-600 font-medium">{p.cantidadEntregada}</td>
                  <td className="px-3 py-2 text-center">
                    {p.cantidadDevuelta > 0 ? (
                      <span className="text-orange-600 font-medium">{p.cantidadDevuelta}</span>
                    ) : (
                      <span className="text-gray-400">0</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right font-medium">Bs. {p.monto.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stock en camioneta */}
      {stockEnCamioneta.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Stock en Camioneta (para devolver)</h3>
          <div className="grid grid-cols-2 gap-2">
            {stockEnCamioneta.map((s: any, i: number) => (
              <div key={i} className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{s.name}</span>
                <span className="text-sm font-bold text-orange-600">x{s.cantidad}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
