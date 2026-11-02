import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import OrderThermalReceiptModal from '../../components/OrderThermalReceiptModal'
import BatchThermalReceiptModal from '../../components/BatchThermalReceiptModal'
import {
  getDistributorOrders,
  getDistributorSession,
  openDistributorSession,
  deliverDistributorOrder,
} from '../../api/distributor'
import type { Order } from '../../types'

export default function DistributorOrders() {
  const [session, setSession] = useState<any>(null)
  const [sessionLoading, setSessionLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [deliveredOrders, setDeliveredOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'pendientes' | 'entregados'>('pendientes')
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null)
  const [batchPrintOrders, setBatchPrintOrders] = useState<Order[] | null>(null)
  const [deliverModalOrder, setDeliverModalOrder] = useState<Order | null>(null)
  const [deliveredQuantities, setDeliveredQuantities] = useState<Record<number, number>>({})
  const [deliveryNotes, setDeliveryNotes] = useState('')
  const [submittingDelivery, setSubmittingDelivery] = useState(false)

  const checkSessionAndFetch = async () => {
    setSessionLoading(true)
    try {
      const activeSession = await getDistributorSession()
      setSession(activeSession)
      if (activeSession) {
        await fetchOrders()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSessionLoading(false)
    }
  }

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const today = new Date().toISOString().split('T')[0]
      const [pending, delivered] = await Promise.all([
        getDistributorOrders({ status: 'asignado' }),
        getDistributorOrders({ status: 'entregado', date: today }),
      ])
      setOrders(pending || [])
      setDeliveredOrders(delivered || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkSessionAndFetch()
  }, [])

  const handleOpenSession = async () => {
    try {
      await openDistributorSession()
      await checkSessionAndFetch()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al iniciar jornada')
    }
  }

  const openDeliverModal = (order: Order) => {
    setDeliverModalOrder(order)
    const initialQty: Record<number, number> = {}
    order.items.forEach(item => {
      initialQty[item.id] = item.quantity
    })
    setDeliveredQuantities(initialQty)
    setDeliveryNotes('')
  }

  const handleConfirmDeliver = async () => {
    if (!deliverModalOrder) return
    setSubmittingDelivery(true)
    try {
      const itemsPayload = deliverModalOrder.items.map(item => ({
        orderItemId: item.id,
        deliveredQuantity: deliveredQuantities[item.id] ?? item.quantity,
      }))

      await deliverDistributorOrder(deliverModalOrder.id, {
        deliveredItems: itemsPayload,
        notes: deliveryNotes || undefined,
      })

      const completedOrder = deliverModalOrder
      setDeliverModalOrder(null)
      await fetchOrders()

      // Sugerir imprimir boleta tras entregar
      if (window.confirm('✅ Pedido entregado con éxito. ¿Deseas imprimir la boleta de entrega ahora?')) {
        setReceiptOrder(completedOrder)
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al registrar entrega')
    } finally {
      setSubmittingDelivery(false)
    }
  }

  const totalRecaudadoHoy = deliveredOrders.reduce((sum, order) => {
    const regularItems = order.items.filter(i => !i.isBonification)
    const sub = regularItems.reduce((s, i) => s + i.unitPrice * (i.deliveredQuantity ?? i.quantity), 0)
    return sum + Math.max(0, sub - Number(order.discount || 0))
  }, 0)

  const totalBultosPendientes = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0),
    0
  )

  return (
    <Layout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Cabecera */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-800 flex items-center gap-2">
              <span>🚚</span> Ruta de Distribución y Entregas
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Imprime boletas térmicas de alta nitidez, gestiona tus entregas y revisa bonificaciones
            </p>
          </div>
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl shadow-sm flex items-center gap-2 transition-colors"
          >
            <span className={loading ? 'animate-spin' : ''}>🔄</span>
            <span>Actualizar Ruta</span>
          </button>
        </div>

        {/* Verificación de Sesión */}
        {sessionLoading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100 shadow-sm">
            Verificando sesión activa...
          </div>
        ) : !session ? (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-xl text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto text-3xl mb-4">
              🚛
            </div>
            <h2 className="text-2xl font-black mb-2">¡Bienvenido a tu Jornada!</h2>
            <p className="text-blue-100 max-w-md mx-auto text-sm mb-6">
              Para ver tus pedidos asignados, entregar mercadería e imprimir boletas térmicas, inicia tu jornada de hoy.
            </p>
            <button
              onClick={handleOpenSession}
              className="bg-white text-blue-700 hover:bg-blue-50 font-black px-8 py-3.5 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
            >
              🚀 Iniciar Jornada de Distribución
            </button>
          </div>
        ) : (
          <>
            {/* Tarjetas de Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-amber-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Pendientes</span>
                  <span className="text-xl">⏳</span>
                </div>
                <div className="text-3xl font-black text-gray-800 mt-2">{orders.length}</div>
                <div className="text-xs text-gray-500 mt-1">{totalBultosPendientes} bultos por entregar</div>
              </div>

              <div className="bg-white border border-emerald-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Entregados Hoy</span>
                  <span className="text-xl">✅</span>
                </div>
                <div className="text-3xl font-black text-emerald-700 mt-2">{deliveredOrders.length}</div>
                <div className="text-xs text-gray-500 mt-1">Puntos completados</div>
              </div>

              <div className="bg-white border border-blue-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Recaudado Hoy</span>
                  <span className="text-xl">💰</span>
                </div>
                <div className="text-2xl font-black text-blue-700 mt-2">
                  Bs. {totalRecaudadoHoy.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Cobros en efectivo / saldo</div>
              </div>

              <div className="bg-white border border-purple-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Sesión</span>
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-bold">Activa</span>
                </div>
                <div className="text-sm font-bold text-gray-800 mt-3 truncate">
                  Desde: {new Date(session.openedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="text-xs text-gray-500 mt-1">Ruta en curso</div>
              </div>
            </div>

            {/* Pestañas: Pendientes vs Entregados y Botón Imprimir Todo en Uno */}
            <div className="flex flex-wrap items-center justify-between border-b border-gray-200 gap-3 pb-2">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('pendientes')}
                  className={`pb-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === 'pendientes'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>📦 Pedidos Pendientes</span>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('entregados')}
                  className={`pb-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === 'entregados'
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>✅ Entregados Hoy</span>
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">
                    {deliveredOrders.length}
                  </span>
                </button>
              </div>

              {/* Botón Imprimir Todo en Uno */}
              {activeTab === 'pendientes' && orders.length > 0 && (
                <button
                  onClick={() => setBatchPrintOrders(orders)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                  title="Imprime todas las boletas continuas para salir a repartir"
                >
                  <span className="text-sm">🖨️</span>
                  <span>Imprimir Todo en Uno ({orders.length} boletas)</span>
                </button>
              )}

              {activeTab === 'entregados' && deliveredOrders.length > 0 && (
                <button
                  onClick={() => setBatchPrintOrders(deliveredOrders)}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-black px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                  title="Imprime las boletas de las entregas de hoy"
                >
                  <span className="text-sm">🖨️</span>
                  <span>Imprimir Entregados ({deliveredOrders.length} boletas)</span>
                </button>
              )}
            </div>

            {/* Lista de Pedidos */}
            {activeTab === 'pendientes' ? (
              orders.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100">
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="font-bold text-gray-700 text-base">¡No tienes pedidos pendientes en este momento!</h3>
                  <p className="text-xs text-gray-400 mt-1">Todos los pedidos asignados han sido entregados.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orders.map(order => {
                    const regularItems = order.items.filter(i => !i.isBonification)
                    const bonifItems = order.items.filter(i => i.isBonification)
                    const subtotal = regularItems.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0)
                    const discount = Number(order.discount || 0)
                    const totalCobrar = Math.max(0, subtotal - discount)
                    const totalBultos = order.items.reduce((acc, i) => acc + i.quantity, 0)

                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                      >
                        <div>
                          {/* Encabezado del Pedido */}
                          <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-black text-gray-900 text-base">Pedido #{order.id}</span>
                                <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                                  ASIGNADO
                                </span>
                              </div>
                              <h3 className="font-bold text-gray-800 text-sm mt-1">{order.client.name}</h3>
                              {order.client.ownerName && (
                                <p className="text-xs text-gray-500">Titular: {order.client.ownerName}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-black text-blue-600">
                                Bs. {totalCobrar.toFixed(2)}
                              </div>
                              <div className="text-[11px] text-gray-400 font-semibold">{totalBultos} bultos</div>
                            </div>
                          </div>

                          {/* Datos de Contacto */}
                          <div className="py-2.5 space-y-1 text-xs text-gray-600">
                            {order.client.address && (
                              <div className="flex items-center gap-1.5 truncate">
                                <span>📍</span>
                                <span className="truncate">{order.client.address}</span>
                              </div>
                            )}
                            {order.client.phone && (
                              <div className="flex items-center gap-1.5">
                                <span>📞</span>
                                <a href={`tel:${order.client.phone}`} className="text-blue-600 font-semibold hover:underline">
                                  {order.client.phone}
                                </a>
                              </div>
                            )}
                            {order.preventista?.name && (
                              <div className="flex items-center gap-1.5 text-gray-500">
                                <span>👤 Preventista:</span>
                                <span>{order.preventista.name}</span>
                              </div>
                            )}
                          </div>

                          {/* Items y Bonificaciones */}
                          <div className="bg-gray-50 rounded-xl p-3 my-2 text-xs space-y-1.5 border border-gray-100">
                            <div className="font-bold text-gray-700 pb-1 border-b border-gray-200 flex justify-between">
                              <span>PRODUCTOS ({regularItems.length})</span>
                              <span>TOTAL</span>
                            </div>
                            {regularItems.map(it => (
                              <div key={it.id} className="flex justify-between items-center text-gray-700">
                                <span>
                                  <strong className="text-gray-900">{it.quantity}x</strong> {it.product.name}
                                </span>
                                <span className="font-semibold">Bs. {(it.unitPrice * it.quantity).toFixed(2)}</span>
                              </div>
                            ))}

                            {/* Bonificaciones destacadas */}
                            {bonifItems.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-dashed border-gray-300">
                                <div className="text-[11px] font-black text-emerald-800 flex items-center gap-1 mb-1">
                                  <span>🎁</span> BONIFICACIONES GRATIS:
                                </div>
                                {bonifItems.map(it => (
                                  <div key={it.id} className="flex justify-between items-center text-emerald-900 font-bold">
                                    <span>
                                      <strong>{it.quantity}x</strong> {it.product.name}
                                    </span>
                                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-black">
                                      GRATIS
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {discount > 0 && (
                              <div className="flex justify-between text-red-600 font-bold pt-1 border-t border-gray-200">
                                <span>Descuento preventa:</span>
                                <span>-Bs. {discount.toFixed(2)}</span>
                              </div>
                            )}
                          </div>

                          {order.notes && (
                            <div className="text-xs bg-amber-50 text-amber-800 p-2 rounded-lg border border-amber-200 mb-2 font-medium">
                              <strong>OBS:</strong> {order.notes}
                            </div>
                          )}
                        </div>

                        {/* Botones de Acción */}
                        <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                          <button
                            onClick={() => setReceiptOrder(order)}
                            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                          >
                            <span>🖨️</span>
                            <span>Imprimir Boleta</span>
                          </button>

                          <button
                            onClick={() => openDeliverModal(order)}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                          >
                            <span>✅</span>
                            <span>Entregar</span>
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            ) : deliveredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100">
                Aún no has registrado entregas el día de hoy.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deliveredOrders.map(order => {
                  const regularItems = order.items.filter(i => !i.isBonification)
                  const subtotal = regularItems.reduce(
                    (acc, i) => acc + i.unitPrice * (i.deliveredQuantity ?? i.quantity),
                    0
                  )
                  const discount = Number(order.discount || 0)
                  const totalCobrado = Math.max(0, subtotal - discount)

                  return (
                    <div
                      key={order.id}
                      className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-gray-900 text-base">Pedido #{order.id}</span>
                              <span className="text-[11px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                                ENTREGADO
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mt-1">{order.client.name}</h3>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-black text-emerald-700">
                              Bs. {totalCobrado.toFixed(2)}
                            </div>
                            <div className="text-[10px] text-gray-400">Cobrado con éxito</div>
                          </div>
                        </div>

                        <div className="py-2.5 text-xs text-gray-600 space-y-1">
                          <div>📍 {order.client.address}</div>
                          {order.deliveredAt && (
                            <div>
                              🕒 Entregado a las:{' '}
                              {new Date(order.deliveredAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100">
                        <button
                          onClick={() => setReceiptOrder(order)}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                        >
                          <span>🖨️</span>
                          <span>Reimprimir Boleta Térmica</span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* Modal de Confirmación de Entrega */}
        {deliverModalOrder && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="font-black text-lg text-gray-800">
                  Confirmar Entrega — Pedido #{deliverModalOrder.id}
                </h3>
                <button
                  onClick={() => setDeliverModalOrder(null)}
                  className="text-gray-400 hover:text-gray-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">
                  Verifica las cantidades entregadas al cliente <strong>{deliverModalOrder.client.name}</strong>. Si hubo devolución parcial, edita la cantidad recibida:
                </p>

                <div className="space-y-2 border rounded-xl p-3 bg-gray-50 max-h-60 overflow-y-auto">
                  {deliverModalOrder.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-xs bg-white p-2.5 rounded-lg border">
                      <div className="flex-1">
                        <span className="font-bold text-gray-800">{item.product.name}</span>
                        {item.isBonification && (
                          <span className="ml-1.5 text-[10px] font-black text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded">
                            BONIF GRATIS
                          </span>
                        )}
                        <div className="text-[11px] text-gray-400">
                          Pedido original: {item.quantity} unidades
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <label className="text-[11px] font-bold text-gray-600">Entregado:</label>
                        <input
                          type="number"
                          min="0"
                          max={item.quantity}
                          value={deliveredQuantities[item.id] ?? item.quantity}
                          onChange={e => {
                            const val = Math.max(0, Math.min(item.quantity, Number(e.target.value) || 0))
                            setDeliveredQuantities(prev => ({ ...prev, [item.id]: val }))
                          }}
                          className="w-16 border rounded-md px-2 py-1 text-center font-bold text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Notas u Observaciones de entrega (opcional):
                </label>
                <textarea
                  rows={2}
                  value={deliveryNotes}
                  onChange={e => setDeliveryNotes(e.target.value)}
                  placeholder="Ej: Pagó completo en efectivo, devolvió 1 bolsa por rotura..."
                  className="w-full border border-gray-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeliverModalOrder(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={submittingDelivery}
                  onClick={handleConfirmDeliver}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{submittingDelivery ? 'Guardando...' : 'Confirmar Entrega'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Boleta Térmica Nítida Individual */}
        <OrderThermalReceiptModal
          order={receiptOrder}
          onClose={() => setReceiptOrder(null)}
        />

        {/* Modal de Impresión Todo en Uno (Masiva) */}
        {batchPrintOrders && (
          <BatchThermalReceiptModal
            orders={batchPrintOrders}
            title={
              activeTab === 'pendientes'
                ? `Imprimir Boletas de Carga (${batchPrintOrders.length} pedidos)`
                : `Imprimir Boletas Entregadas (${batchPrintOrders.length} pedidos)`
            }
            onClose={() => setBatchPrintOrders(null)}
          />
        )}
      </div>
    </Layout>
  )
}
