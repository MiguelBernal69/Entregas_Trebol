import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import OrderThermalReceiptModal from '../../components/OrderThermalReceiptModal'
import BatchThermalReceiptModal from '../../components/BatchThermalReceiptModal'
import { getOrders } from '../../api/orders'
import { getRegions } from '../../api/regions'
import type { Order } from '../../types'

export default function AdminHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [regions, setRegions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<Order | null>(null)
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null)
  const [batchPrintOrders, setBatchPrintOrders] = useState<Order[] | null>(null)

  // Filtros
  const [filterRegion, setFilterRegion] = useState('')
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const fetchData = async () => {
    try {
      const params: any = { status: 'entregado' }
      if (filterRegion) params.regionId = filterRegion
      const [ordersData, regionsData] = await Promise.all([
        getOrders(params),
        getRegions()
      ])
      setOrders(ordersData)
      setRegions(regionsData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [filterRegion])

  const filtered = orders.filter(o => {
    if (search) {
      const q = search.toLowerCase()
      if (
        !o.client.name.toLowerCase().includes(q) &&
        !o.preventista.name.toLowerCase().includes(q) &&
        !(o.distributor?.name.toLowerCase().includes(q))
      ) return false
    }
    if (dateFrom && new Date(o.deliveredAt ?? o.createdAt) < new Date(dateFrom)) return false
    if (dateTo && new Date(o.deliveredAt ?? o.createdAt) > new Date(dateTo + 'T23:59:59')) return false
    return true
  })

  const totalBs = filtered.reduce((sum, o) =>
    sum + o.items.reduce((s, i) => s + i.unitPrice * (i.deliveredQuantity ?? i.quantity), 0), 0
  )

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Historial de entregas</h1>
          <p className="text-gray-500 text-sm mt-1">Pedidos entregados y completados</p>
        </div>

        {/* Resumen */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white border border-green-200 rounded-2xl p-5">
            <div className="text-2xl mb-1"><span>✅</span></div>
            <div className="text-3xl font-bold text-gray-800">{filtered.length}</div>
            <div className="text-sm text-gray-500 mt-1">Pedidos entregados</div>
          </div>
          <div className="bg-white border border-blue-200 rounded-2xl p-5">
            <div className="text-2xl mb-1"><span>💰</span></div>
            <div className="text-3xl font-bold text-gray-800">Bs. {totalBs.toFixed(0)}</div>
            <div className="text-sm text-gray-500 mt-1">Total facturado</div>
          </div>
          <div className="bg-white border border-purple-200 rounded-2xl p-5 col-span-2 lg:col-span-1">
            <div className="text-2xl mb-1"><span>📦</span></div>
            <div className="text-3xl font-bold text-gray-800">
              {filtered.reduce((s, o) => s + o.items.reduce((si, i) => si + (i.deliveredQuantity ?? i.quantity), 0), 0)}
            </div>
            <div className="text-sm text-gray-500 mt-1">Unidades entregadas</div>
          </div>
        </div>

        {/* Filtros y Acción Masiva */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="text"
              placeholder="Buscar cliente, preventista..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
            />

            <select
              value={filterRegion}
              onChange={e => setFilterRegion(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todas las zonas</option>
              {regions.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>

            {(search || filterRegion || dateFrom || dateTo) && (
              <button
                onClick={() => { setSearch(''); setFilterRegion(''); setDateFrom(''); setDateTo('') }}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                <span>✕</span> Limpiar
              </button>
            )}
          </div>

          {filtered.length > 0 && (
            <button
              onClick={() => setBatchPrintOrders(filtered)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:scale-105 ml-auto"
              title="Imprime todas las boletas de las entregas mostradas de forma continua"
            >
              <span>🖨️</span>
              <span>Imprimir Todo en Uno ({filtered.length} boletas)</span>
            </button>
          )}
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="text-center text-gray-400 py-12">Cargando historial...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No hay pedidos entregados con los filtros aplicados</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">#</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Cliente</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Preventista</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Distribuidor</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Zona</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Total</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Estado</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Fecha Entrega</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map(order => {
                  const total = order.items.reduce((s, i) => s + i.unitPrice * (i.deliveredQuantity ?? i.quantity), 0)
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 font-medium text-gray-800">#{order.id}</td>
                      <td className="px-4 py-4 text-gray-800">{order.client.name}</td>
                      <td className="px-4 py-4 text-gray-500">{order.preventista.name}</td>
                      <td className="px-4 py-4 text-gray-500">{order.distributor?.name ?? '—'}</td>
                      <td className="px-4 py-4">
                        {order.region ? (
                          <span
                            className="text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{ background: order.region.color + '22', color: order.region.color }}
                          >
                            {order.region.name}
                          </span>
                        ) : <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-800">Bs. {total.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          order.status === 'entrega_parcial' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {order.status === 'entrega_parcial' ? 'Parcial' : 'Completa'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-500">
                        {order.deliveredAt
                          ? new Date(order.deliveredAt).toLocaleDateString()
                          : new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => setDetail(order)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          Ver
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
          {!loading && filtered.length > 0 && (
            <div className="bg-gray-50 px-4 py-3 border-t text-sm font-bold text-gray-800 flex justify-between">
              <span>{filtered.length} pedido{filtered.length !== 1 ? 's' : ''}</span>
              <span>Total: Bs. {totalBs.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal detalle */}
      {detail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Pedido #{detail.id}</h2>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full mt-1 inline-block ${
                  detail.status === 'entrega_parcial' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                }`}>
                  {detail.status === 'entrega_parcial' ? 'Entrega Parcial' : 'Entregado'}
                </span>
              </div>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-600 text-xl"><span>✕</span></button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Cliente</p>
                  <p className="font-medium">{detail.client.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Preventista</p>
                  <p className="font-medium">{detail.preventista.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Distribuidor</p>
                  <p className="font-medium">{detail.distributor?.name ?? '—'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Zona</p>
                  <p className="font-medium">{detail.region?.name ?? '—'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Dirección</p>
                  <p className="font-medium">{detail.client.address}</p>
                </div>
                {detail.deliveredAt && (
                  <div className="col-span-2">
                    <p className="text-gray-500">Fecha de entrega</p>
                    <p className="font-medium">{new Date(detail.deliveredAt).toLocaleString()}</p>
                  </div>
                )}
                {detail.notes && (
                  <div className="col-span-2">
                    <p className="text-gray-500">Notas</p>
                    <p className="font-medium">{detail.notes}</p>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Productos</p>
                <div className="space-y-2">
                  {detail.items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.name} x{item.quantity}
                        {item.deliveredQuantity !== undefined && item.deliveredQuantity !== null && item.deliveredQuantity < item.quantity && (
                          <span className="text-orange-600 font-medium ml-2">(Entregado: {item.deliveredQuantity})</span>
                        )}
                      </span>
                      <span className="font-medium">Bs. {(item.unitPrice * (item.deliveredQuantity ?? item.quantity)).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-bold border-t pt-2">
                    <span>Total Cobrado</span>
                    <span>Bs. {detail.items.reduce((s, i) => s + i.unitPrice * (i.deliveredQuantity ?? i.quantity), 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Botón Imprimir Boleta Térmica */}
              <div className="border-t pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setReceiptOrder(detail)
                    setDetail(null)
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>🖨️</span>
                  <span>Imprimir Boleta Térmica (Epson / Bluetooth)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Térmico Individual */}
      <OrderThermalReceiptModal
        order={receiptOrder}
        onClose={() => setReceiptOrder(null)}
      />

      {/* Modal Térmico en Lote (Masivo) */}
      {batchPrintOrders && (
        <BatchThermalReceiptModal
          orders={batchPrintOrders}
          title={`Imprimir Boletas de Historial (${batchPrintOrders.length} pedidos)`}
          onClose={() => setBatchPrintOrders(null)}
        />
      )}
    </Layout>
  )
}
