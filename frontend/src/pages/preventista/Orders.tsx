import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import OrderThermalReceiptModal from '../../components/OrderThermalReceiptModal'
import { getOrders, createOrder, updateOrder } from '../../api/orders'
import { getClients } from '../../api/clients'
import { getProducts } from '../../api/products'
import type { Order, Client, Product } from '../../types'

const statusColor: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-700',
  aceptado:  'bg-blue-100 text-blue-700',
  asignado:  'bg-purple-100 text-purple-700',
  entregado: 'bg-green-100 text-green-700'
}

interface ItemForm { productId: number; quantity: number; productName: string; price: number }

export default function PreventistaOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Filtro por fecha: 'today' | 'yesterday' | 'all' | 'YYYY-MM-DD'
  const [dateFilter, setDateFilter] = useState<string>('today')
  const [customDate, setCustomDate] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Order | null>(null)
  const [detail, setDetail] = useState<Order | null>(null)
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [clientId, setClientId] = useState('')
  const [notes, setNotes] = useState('')
  const [discount, setDiscount] = useState<string>('')
  const [applyDiscount, setApplyDiscount] = useState<boolean>(false)
  const [items, setItems] = useState<ItemForm[]>([])

  const fetchData = async (targetDate: string = dateFilter) => {
    try {
      setLoading(true)
      const params: any = {}
      if (targetDate !== 'all') {
        params.date = targetDate
      }
      const [ordersData, clientsData, productsData] = await Promise.all([
        getOrders(params), getClients(), getProducts()
      ])
      setOrders(ordersData)
      setClients(clientsData)
      setProducts(productsData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(dateFilter)
  }, [dateFilter])

  const openCreate = () => {
    setEditing(null)
    setClientId('')
    setNotes('')
    setDiscount('')
    setApplyDiscount(false)
    setItems([])
    setError('')
    setShowModal(true)
  }

  const openEdit = (order: Order) => {
    setEditing(order)
    setClientId(order.clientId.toString())
    setNotes(order.notes ?? '')
    if (order.discount && order.discount > 0) {
      setApplyDiscount(true)
      setDiscount(order.discount.toString())
    } else {
      setApplyDiscount(false)
      setDiscount('')
    }
    setItems(order.items.map(i => ({
      productId: i.productId,
      quantity: i.quantity,
      productName: i.product.name,
      price: i.unitPrice
    })))
    setError('')
    setShowModal(true)
  }

  const addItem = (productId: number) => {
    const product = products.find(p => p.id === productId)
    if (!product) return
    const exists = items.find(i => i.productId === productId)
    if (exists) {
      setItems(items.map(i => i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i))
    } else {
      setItems([...items, { productId, quantity: 1, productName: product.name, price: product.price }])
    }
  }

  const removeItem = (productId: number) => {
    setItems(items.filter(i => i.productId !== productId))
  }

  const updateQty = (productId: number, qty: number) => {
    if (qty < 1) return
    setItems(items.map(i => i.productId === productId ? { ...i, quantity: qty } : i))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) { setError('Agrega al menos un producto'); return }
    setError('')
    setSaving(true)
    try {
      const discountNum = applyDiscount ? (Number(discount) || 0) : 0
      const data = {
        clientId: Number(clientId),
        notes,
        discount: discountNum,
        items: items.map(i => ({ productId: i.productId, quantity: i.quantity }))
      }
      if (editing) {
        await updateOrder(editing.id, data)
      } else {
        await createOrder(data)
      }
      setShowModal(false)
      fetchData()
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const discountVal = applyDiscount ? (Number(discount) || 0) : 0
  const total = Math.max(0, subtotal - discountVal)

  // Filtrado por estado
  const filteredOrders = orders.filter(o => statusFilter === 'all' || o.status === statusFilter)
  const uniqueStores = new Set(orders.map(o => o.clientId)).size
  const totalAmount = orders.reduce((sum, o) => {
    // Solo ítems regulares (excluir bonificaciones) para el total
    const st = o.items.filter(i => !i.isBonification).reduce((s, i) => s + i.unitPrice * i.quantity, 0)
    return sum + Math.max(0, st - (o.discount || 0))
  }, 0)

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header con botón de nuevo pedido y enlace al reporte */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mis Pedidos por Jornada</h1>
            <p className="text-gray-500 text-sm mt-1">
              Visualiza y gestiona los pedidos realizados día a día
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/preventista/report?date=${dateFilter}`}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-2.5 rounded-xl border border-indigo-200 transition-colors flex items-center gap-2"
            >
              <span>📊</span>
              <span>Reporte de Jornada</span>
            </a>
            <button
              onClick={openCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm shadow-blue-200 transition-colors flex items-center gap-1.5"
            >
              <span>+</span>
              <span>Nuevo pedido</span>
            </button>
          </div>
        </div>

        {/* ── Barra de selección de Jornada / Día ── */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Jornada:</span>
            <button
              onClick={() => { setDateFilter('today'); setCustomDate(''); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                dateFilter === 'today'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ☀️ Hoy
            </button>
            <button
              onClick={() => { setDateFilter('yesterday'); setCustomDate(''); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                dateFilter === 'yesterday'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              ⏮️ Ayer
            </button>
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1">
              <span className="text-xs text-gray-500">📅</span>
              <input
                type="date"
                value={customDate}
                onChange={(e) => {
                  setCustomDate(e.target.value)
                  if (e.target.value) setDateFilter(e.target.value)
                }}
                className="bg-transparent text-xs font-medium text-gray-700 focus:outline-none"
              />
            </div>
            <button
              onClick={() => { setDateFilter('all'); setCustomDate(''); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                dateFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📋 Ver Todos
            </button>
          </div>

          <div className="text-xs text-gray-500 font-medium">
            {dateFilter === 'today' && 'Mostrando pedidos de la jornada de HOY'}
            {dateFilter === 'yesterday' && 'Mostrando pedidos de la jornada de AYER'}
            {dateFilter === 'all' && 'Mostrando TODO el histórico'}
            {dateFilter !== 'today' && dateFilter !== 'yesterday' && dateFilter !== 'all' && `Jornada del ${dateFilter}`}
          </div>
        </div>

        {/* ── Tarjetas de métricas rápidas del día ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-semibold mb-1">🏪 Tiendas Atendidas</p>
            <p className="text-2xl font-black text-gray-800">{uniqueStores}</p>
            <p className="text-xs text-gray-500 mt-0.5">con pedido en esta fecha</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-semibold mb-1">📦 Pedidos Registrados</p>
            <p className="text-2xl font-black text-blue-600">{orders.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">en la jornada seleccionada</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-semibold mb-1">💰 Total Preventa</p>
            <p className="text-2xl font-black text-green-600">Bs. {totalAmount.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-0.5">monto acumulado</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-semibold mb-1">🚚 Entregados</p>
            <p className="text-2xl font-black text-purple-600">
              {orders.filter(o => ['entregado', 'entrega_parcial'].includes(o.status)).length}
              <span className="text-xs font-normal text-gray-400 ml-1">/ {orders.length}</span>
            </p>
            <p className="text-xs text-gray-500 mt-0.5">completados por distribuidor</p>
          </div>
        </div>

        {/* ── Filtros por estado ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-black text-gray-500 uppercase tracking-wider mr-1">Filtrar Estado:</span>
          {[
            { id: 'all', label: 'Todos', count: orders.length },
            { id: 'pendiente', label: 'Pendientes', count: orders.filter(o => o.status === 'pendiente').length },
            { id: 'aceptado', label: 'Aceptados', count: orders.filter(o => o.status === 'aceptado').length },
            { id: 'asignado', label: 'Asignados', count: orders.filter(o => o.status === 'asignado').length },
            { id: 'entregado', label: 'Entregados', count: orders.filter(o => ['entregado', 'entrega_parcial'].includes(o.status)).length },
          ].map(st => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                statusFilter === st.id
                  ? 'bg-gray-800 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span>{st.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${statusFilter === st.id ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {st.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Tabla de pedidos ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="text-center text-gray-400 py-12">Cargando pedidos de la jornada...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16 px-4">
              <span className="text-4xl">📭</span>
              <p className="text-gray-700 font-bold mt-3 text-base">No hay pedidos en esta jornada</p>
              <p className="text-gray-400 text-xs mt-1 max-w-sm mx-auto">
                No se registraron pedidos para el filtro seleccionado. Puedes crear un nuevo pedido con el botón superior.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">#</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Cliente</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Productos</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Total</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Estado</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Hora / Fecha</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.map(order => (

                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-800">#{order.id}</td>
                    <td className="px-5 py-4 text-gray-800">{order.client.name}</td>
                    <td className="px-5 py-4 text-gray-500">
                      {order.items.filter(i => !i.isBonification).length} producto(s)
                      {order.items.some(i => i.isBonification) && (
                        <span className="ml-1 text-green-600 text-xs font-medium">+ 🎁{order.items.filter(i => i.isBonification).reduce((s,i) => s+i.quantity, 0)} bon.</span>
                      )}
                    </td>
                    <td className="px-5 py-4 font-medium">
                      {order.discount && order.discount > 0 ? (
                        <div>
                          <span className="font-bold text-gray-900">
                            Bs. {Math.max(0, order.items.filter(i => !i.isBonification).reduce((s, i) => s + i.unitPrice * i.quantity, 0) - order.discount).toFixed(2)}
                          </span>
                          <span className="block text-[11px] text-amber-700 font-semibold">
                            Desc: -Bs. {order.discount.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span>Bs. {order.items.filter(i => !i.isBonification).reduce((s, i) => s + i.unitPrice * i.quantity, 0).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColor[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-gray-700 text-xs">
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-5 py-4 flex items-center gap-1.5">
                      <button
                        onClick={() => setDetail(order)}
                        className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        Ver
                      </button>
                      <button
                        onClick={() => setReceiptOrder(order)}
                        className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center gap-1"
                        title="Imprimir Boleta Epson / Bluetooth"
                      >
                        <span>🖨️</span>
                        <span>Boleta</span>
                      </button>
                      {['pendiente', 'aceptado'].includes(order.status) && (
                        <button
                          onClick={() => openEdit(order)}
                          className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        >
                          Editar
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

      {/* Modal crear/editar pedido */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-5">
              {editing ? 'Editar pedido' : 'Nuevo pedido'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <select
                  value={clientId}
                  onChange={e => setClientId(e.target.value)}
                  required
                  disabled={!!editing}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar cliente</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} — {c.ownerName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Agregar productos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agregar producto</label>
                <select
                  onChange={e => { if (e.target.value) addItem(Number(e.target.value)); e.target.value = '' }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar producto...</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} — Bs. {p.price.toFixed(2)} / {p.unit}</option>
                  ))}
                </select>
              </div>

              {/* Opción de Descuento */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-900 select-none">
                    <input
                      type="checkbox"
                      checked={applyDiscount}
                      onChange={e => {
                        setApplyDiscount(e.target.checked)
                        if (!e.target.checked) setDiscount('')
                      }}
                      className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                    />
                    <span>¿Aplicar descuento a este pedido?</span>
                  </label>
                  {applyDiscount && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      Descuento activo
                    </span>
                  )}
                </div>

                {applyDiscount && (
                  <div className="pt-1 flex items-center gap-3">
                    <span className="text-xs text-gray-700 font-medium">Monto descuento:</span>
                    <div className="relative w-36">
                      <span className="absolute left-2.5 top-2 text-xs font-bold text-gray-400">Bs.</span>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="0.00"
                        value={discount}
                        onChange={e => setDiscount(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 bg-white border border-amber-300 rounded-lg text-sm font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Lista de items */}
              {items.length > 0 && (
                <div className="border rounded-xl overflow-hidden">
                  {items.map(item => (
                    <div key={item.productId} className="flex items-center justify-between px-4 py-3 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.productName}</p>
                        <p className="text-xs text-gray-500">Bs. {item.price.toFixed(2)} c/u</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => updateQty(item.productId, item.quantity - 1)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold">−</button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button type="button" onClick={() => updateQty(item.productId, item.quantity + 1)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold">+</button>
                        <button type="button" onClick={() => removeItem(item.productId)} className="ml-2 text-red-400 hover:text-red-600 text-lg">✕</button>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-3 bg-gray-50 space-y-1">
                    {applyDiscount && discountVal > 0 && (
                      <>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Subtotal productos:</span>
                          <span>Bs. {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs font-semibold text-red-600">
                          <span>Descuento preventista:</span>
                          <span>- Bs. {discountVal.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between font-bold text-sm text-gray-900 pt-1 border-t">
                      <span>{applyDiscount && discountVal > 0 ? 'Total a cobrar' : 'Total'}</span>
                      <span className="text-blue-600 text-base">Bs. {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">{error}</div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium py-2.5 rounded-lg"
                >
                  {saving ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear pedido'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal detalle */}
      {detail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-800">Pedido #{detail.id}</h2>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Cliente</span>
                <span className="font-medium">{detail.client.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estado</span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusColor[detail.status]}`}>{detail.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Dirección</span>
                <span className="font-medium text-right">{detail.client.address}</span>
              </div>
              {detail.notes && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Notas</span>
                  <span className="font-medium">{detail.notes}</span>
                </div>
              )}
              <div className="border-t pt-3 space-y-2">
                {/* Items regulares */}
                {detail.items.filter(i => !i.isBonification).map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-600">{item.product.name} x{item.quantity}</span>
                    <span className="font-medium">Bs. {(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                {/* Bonificaciones */}
                {detail.items.some(i => i.isBonification) && (
                  <>
                    <div className="text-[11px] text-green-700 font-bold mt-1">🎁 Bonificaciones (sin costo)</div>
                    {detail.items.filter(i => i.isBonification).map(item => (
                      <div key={`bon-${item.id}`} className="flex justify-between">
                        <span className="text-green-700 text-sm">{item.product.name} x{item.quantity}</span>
                        <span className="text-green-700 text-sm font-semibold">GRATIS</span>
                      </div>
                    ))}
                  </>
                )}
                {detail.discount && detail.discount > 0 ? (
                  <>
                    <div className="flex justify-between text-xs text-gray-500 border-t pt-2">
                      <span>Subtotal productos</span>
                      <span>Bs. {detail.items.filter(i => !i.isBonification).reduce((s, i) => s + i.unitPrice * i.quantity, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-red-600">
                      <span>Descuento preventista</span>
                      <span>- Bs. {detail.discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base border-t pt-2 text-gray-900">
                      <span>Total a cobrar</span>
                      <span className="text-blue-600">
                        Bs. {Math.max(0, detail.items.filter(i => !i.isBonification).reduce((s, i) => s + i.unitPrice * i.quantity, 0) - detail.discount).toFixed(2)}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between font-bold border-t pt-2">
                    <span>Total</span>
                    <span>Bs. {detail.items.filter(i => !i.isBonification).reduce((s, i) => s + i.unitPrice * i.quantity, 0).toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Botón Imprimir Boleta Epson / Bluetooth */}
              <div className="border-t pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setReceiptOrder(detail)
                    setDetail(null)
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>🖨️</span>
                  <span>Imprimir Boleta (Epson TM-T20III / Bluetooth)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Térmico Epson / Bluetooth */}
      <OrderThermalReceiptModal
        order={receiptOrder}
        onClose={() => setReceiptOrder(null)}
      />
    </Layout>
  )
}