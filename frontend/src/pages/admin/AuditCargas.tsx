import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { getAuditCargas } from '../../api/orders'
import { getUsers } from '../../api/users'
import type { User } from '../../types'

export default function AuditCargas() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const [distributors, setDistributors] = useState<User[]>([])
  const [filterDistributor, setFilterDistributor] = useState<string>('')
  const [filterDate, setFilterDate] = useState<string>('today')
  const [customStart, setCustomStart] = useState<string>('')
  const [customEnd, setCustomEnd] = useState<string>('')
  const [selectedSessionId, setSelectedSessionId] = useState<number | 'all'>('all')
  const [activeTab, setActiveTab] = useState<'carga' | 'pedidos' | 'sin_asignar'>('carga')
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)

  const fetchUsers = async () => {
    try {
      const users = await getUsers()
      setDistributors(users.filter((u: User) => u.role === 'distribuidor'))
    } catch (_) {}
  }

  const fetchAudit = async () => {
    setLoading(true)
    try {
      const params: any = { date: filterDate }
      if (filterDistributor) params.distributorId = Number(filterDistributor)
      if (filterDate === 'custom') {
        if (customStart) params.startDate = customStart
        if (customEnd) params.endDate = customEnd
      }
      const res = await getAuditCargas(params)
      setData(res)
      if (res.sessions && res.sessions.length > 0) {
        setSelectedSessionId(res.sessions[0].session.id)
      } else {
        setSelectedSessionId('all')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    fetchAudit()
  }, [filterDate, filterDistributor, customStart, customEnd])

  const sessions = data?.sessions || []
  const pedidosSinAsignar = data?.pedidosSinAsignar || []

  // Sesión actualmente enfocada (o la primera si es all)
  const currentSession = selectedSessionId === 'all'
    ? sessions[0]
    : sessions.find((s: any) => s.session.id === selectedSessionId) || sessions[0]

  const resumen = currentSession?.resumenCarga || {
    totalPedidos: 0,
    pedidosEntregados: 0,
    pedidosParciales: 0,
    pedidosPendientes: 0,
    totalBultosVenta: 0,
    totalBultosBonif: 0,
    totalFisicoCargado: 0,
    totalFisicoEntregado: 0,
    totalFisicoDevuelto: 0,
    totalDineroAsignado: 0,
    totalDineroCobradoReal: 0,
    totalDineroSistemaAntiguo: 0,
    descuadreBugSistema: 0,
    hayDiscrepancia: false,
  }

  const productosCargados = currentSession?.productosCargados || []
  const sessionOrders = currentSession?.orders || []

  return (
    <Layout>
      <div className="space-y-5">
        {/* Encabezado con aviso de ruta privada */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🕵️</span>
              <h1 className="text-xl font-black text-gray-800">
                Auditoría Forense de Cargas y Preventas
              </h1>
              <span className="text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                Acceso Privado por URL
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Verifica con exactitud matemática qué se cargó al camión, qué se entregó y si hubo errores en la rendición de cuentas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>🖨️</span> Imprimir Informe
            </button>
            <button
              onClick={fetchAudit}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <span>🔄</span> Actualizar
            </button>
          </div>
        </div>

        {/* Barra de Filtros */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3 items-center">
          {/* Selector de Rango de Fecha */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'today', label: '☀️ Hoy' },
              { id: 'yesterday', label: '⏮️ Ayer' },
              { id: 'this_week', label: '📅 7 días' },
              { id: 'this_month', label: '🗓️ Este mes' },
              { id: 'all', label: '📋 Todas' },
              { id: 'custom', label: '📆 Rango...' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterDate(f.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                  filterDate === f.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filterDate === 'custom' && (
            <div className="flex items-center gap-2 text-xs">
              <input
                type="date"
                value={customStart}
                onChange={e => setCustomStart(e.target.value)}
                className="border border-gray-300 rounded-lg px-2 py-1 text-xs"
              />
              <span>a</span>
              <input
                type="date"
                value={customEnd}
                onChange={e => setCustomEnd(e.target.value)}
                className="border border-gray-300 rounded-lg px-2 py-1 text-xs"
              />
            </div>
          )}

          <div className="h-6 w-[1px] bg-gray-200 hidden sm:block" />

          {/* Filtro Distribuidor */}
          <select
            value={filterDistributor}
            onChange={e => setFilterDistributor(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los distribuidores</option>
            {distributors.map(d => (
              <option key={d.id} value={d.id}>
                🚚 {d.name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 font-semibold shadow-sm border border-gray-100">
            Cargando auditoría forense...
          </div>
        ) : sessions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500 shadow-sm border border-gray-100">
            <div className="text-4xl mb-2">🚚</div>
            <h3 className="text-base font-bold text-gray-700">No se encontraron jornadas en este período</h3>
            <p className="text-xs text-gray-400 mt-1">Prueba seleccionando "Todas" o cambiando el distribuidor.</p>
          </div>
        ) : (
          <>
            {/* Selector de Jornada Activa si hay más de 1 */}
            {sessions.length > 1 && (
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-black text-slate-500 shrink-0 ml-1">Jornadas ({sessions.length}):</span>
                {sessions.map((s: any) => {
                  const isSelected = selectedSessionId === s.session.id
                  return (
                    <button
                      key={s.session.id}
                      onClick={() => setSelectedSessionId(s.session.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{s.session.status === 'activa' ? '🟢' : '⚪'}</span>
                      <span>#{s.session.id} — {s.session.distributor.name}</span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Ficha de la Jornada Seleccionada */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-sm space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚛</span>
                    <h2 className="text-lg font-black text-white">
                      Jornada #{currentSession.session.id} — {currentSession.session.distributor.name}
                    </h2>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      currentSession.session.status === 'activa'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      {currentSession.session.status === 'activa' ? '🟢 EN CURSO' : '⚪ CERRADA'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-4">
                    <span>Inicio: {new Date(currentSession.session.openedAt).toLocaleString('es-BO')}</span>
                    <span>Cierre: {currentSession.session.closedAt ? new Date(currentSession.session.closedAt).toLocaleString('es-BO') : 'En ruta'}</span>
                    {currentSession.session.closedByAdmin && (
                      <span>Cerrada por admin: {currentSession.session.closedByAdmin.name}</span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Total Neto Asignado</div>
                  <div className="text-2xl font-black text-emerald-400">
                    Bs. {resumen.totalDineroAsignado.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Tarjetas de Métricas Rápidas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-semibold">Total Pedidos</div>
                  <div className="text-xl font-black text-white mt-0.5">{resumen.totalPedidos}</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">
                    {resumen.pedidosEntregados} entregados • {resumen.pedidosPendientes} pendientes
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-semibold">Total Físico Cargado</div>
                  <div className="text-xl font-black text-blue-400 mt-0.5">{resumen.totalFisicoCargado} bultos</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {resumen.totalBultosVenta} venta + 🎁 {resumen.totalBultosBonif} bonif
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-semibold">Físico Entregado</div>
                  <div className="text-xl font-black text-emerald-400 mt-0.5">{resumen.totalFisicoEntregado} bultos</div>
                  <div className="text-[11px] text-orange-400 mt-0.5">
                    {resumen.totalFisicoDevuelto > 0 ? `⚠️ ${resumen.totalFisicoDevuelto} devueltos a bodega` : 'Todo entregado'}
                  </div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400 font-semibold">Dinero Cobrado Real</div>
                  <div className="text-xl font-black text-emerald-400 mt-0.5">
                    Bs. {resumen.totalDineroCobradoReal.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {resumen.hayDiscrepancia ? '⚠️ Descuentos detectados' : 'Cuentas cuadradas'}
                  </div>
                </div>
              </div>
            </div>

            {/* ALERTA FORENSE: Demostración si hubo discrepancia por el bug del sistema anterior */}
            {resumen.hayDiscrepancia ? (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                <span className="text-2xl mt-0.5">💡</span>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-amber-900">
                    DIAGNÓSTICO DEL SISTEMA ANTERIOR: SE DETECTÓ UNA DISCREPANCIA DE BS. {resumen.descuadreBugSistema.toFixed(2)}
                  </h3>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    • <strong>Lo que exigía el sistema antiguo:</strong> Bs. {resumen.totalDineroSistemaAntiguo.toFixed(2)} (porque sumaba precios brutos sin restar los descuentos que el preventista prometió al cliente).<br />
                    • <strong>Lo que el chofer realmente cobró y trajo en mano:</strong> Bs. {resumen.totalDineroCobradoReal.toFixed(2)} (el neto real de las boletas).<br />
                    👉 <strong>Conclusión para el cliente:</strong> Al distribuidor <u>NO le faltó dinero</u>. La diferencia de Bs. {resumen.descuadreBugSistema.toFixed(2)} fue generada por el software anterior al no computar los descuentos en el reporte de rendición.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-emerald-800 font-semibold">
                <span>✅</span> En esta jornada no hubo discrepancias por descuentos; el dinero cobrado cuadró con los precios asignados.
              </div>
            )}

            {/* Pestañas de Navegación de Detalle */}
            <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
              <button
                onClick={() => setActiveTab('carga')}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'carga'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>📦</span>
                <span>Carga Física por Producto ({productosCargados.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('pedidos')}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'pedidos'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>📋</span>
                <span>Pedidos Subidos al Camión ({sessionOrders.length})</span>
              </button>

              {pedidosSinAsignar.length > 0 && (
                <button
                  onClick={() => setActiveTab('sin_asignar')}
                  className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                    activeTab === 'sin_asignar'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-red-700 bg-red-50 hover:bg-red-100 border border-red-200'
                  }`}
                >
                  <span>⚠️</span>
                  <span>Sin Camión / Olvidados ({pedidosSinAsignar.length})</span>
                </button>
              )}
            </div>

            {/* CONTENIDO PESTAÑA A: Carga Física por Producto */}
            {activeTab === 'carga' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-gray-800">
                    Consolidado de Mercadería Física en el Camión
                  </h3>
                  <span className="text-xs text-gray-400">
                    Total Físico: <strong>{resumen.totalFisicoCargado} bultos</strong>
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b text-xs font-bold text-gray-600 uppercase">
                      <tr>
                        <th className="text-left px-4 py-3">Producto</th>
                        <th className="text-center px-4 py-3">Venta Regular</th>
                        <th className="text-center px-4 py-3">🎁 Bonificación</th>
                        <th className="text-center px-4 py-3 bg-blue-50/60 text-blue-900">Total Cargado</th>
                        <th className="text-center px-4 py-3 text-emerald-700">Entregado</th>
                        <th className="text-center px-4 py-3 text-orange-700">Devuelto</th>
                        <th className="text-right px-4 py-3">Dinero Cobrado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {productosCargados.map((p: any) => (
                        <tr key={p.productId} className="hover:bg-gray-50/70 transition-colors">
                          <td className="px-4 py-3 font-semibold text-gray-800">
                            {p.name}
                            <span className="text-[11px] text-gray-400 ml-1.5 font-normal">({p.unit})</span>
                          </td>
                          <td className="px-4 py-3 text-center text-gray-700 font-bold">
                            x{p.cargadoVenta}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {p.cargadoBonif > 0 ? (
                              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md font-bold text-xs">
                                🎁 +{p.cargadoBonif}
                              </span>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center bg-blue-50/40 font-black text-blue-700 text-sm">
                            x{p.totalCargado}
                          </td>
                          <td className="px-4 py-3 text-center font-bold text-emerald-600">
                            x{p.entregado}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {p.devuelto > 0 ? (
                              <span className="bg-orange-100 text-orange-800 font-bold text-xs px-2 py-0.5 rounded-md">
                                ⚠️ x{p.devuelto}
                              </span>
                            ) : (
                              <span className="text-gray-300">0</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-gray-800">
                            Bs. {p.montoCobrado.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50 font-black text-xs text-gray-800 border-t-2 border-gray-200">
                      <tr>
                        <td className="px-4 py-3 uppercase">TOTALES:</td>
                        <td className="px-4 py-3 text-center">x{resumen.totalBultosVenta}</td>
                        <td className="px-4 py-3 text-center text-emerald-700">+{resumen.totalBultosBonif}</td>
                        <td className="px-4 py-3 text-center text-blue-800 text-sm">x{resumen.totalFisicoCargado}</td>
                        <td className="px-4 py-3 text-center text-emerald-700">x{resumen.totalFisicoEntregado}</td>
                        <td className="px-4 py-3 text-center text-orange-700">x{resumen.totalFisicoDevuelto}</td>
                        <td className="px-4 py-3 text-right text-emerald-800 text-sm">
                          Bs. {resumen.totalDineroCobradoReal.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* CONTENIDO PESTAÑA B: Pedidos Asignados */}
            {activeTab === 'pedidos' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-bold text-sm text-gray-800">
                    Pedidos Cargados al Camión en esta Jornada
                  </h3>
                  <span className="text-xs text-gray-400">
                    {sessionOrders.length} pedidos
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {sessionOrders.map((ord: any) => {
                    const isExpanded = expandedOrderId === ord.id
                    return (
                      <div key={ord.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-black text-gray-800">#{ord.id}</span>
                            <div>
                              <div className="font-bold text-sm text-gray-800">{ord.client.name}</div>
                              <div className="text-xs text-gray-400">
                                Prev: <strong>{ord.preventista.name}</strong> • Tel: {ord.client.phone || 'Sin tel.'}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              ord.status === 'entregado'
                                ? 'bg-emerald-100 text-emerald-700'
                                : ord.status === 'entrega_parcial'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {ord.status.toUpperCase()}
                            </span>

                            <div className="text-right">
                              <div className="text-xs text-gray-400">
                                {ord.discount > 0 && (
                                  <span className="text-amber-700 font-semibold mr-1.5">
                                    Desc: -Bs. {ord.discount.toFixed(0)}
                                  </span>
                                )}
                                <strong>{ord.bultosTotal} bultos</strong>
                              </div>
                              <div className="text-sm font-black text-gray-800">
                                Bs. {ord.totalNeto.toFixed(2)}
                              </div>
                            </div>

                            <button
                              onClick={() => setExpandedOrderId(isExpanded ? null : ord.id)}
                              className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1.5 rounded-lg"
                            >
                              {isExpanded ? 'Ocultar ▲' : 'Ver productos ▼'}
                            </button>
                          </div>
                        </div>

                        {/* Desglose de productos del pedido al expandir */}
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-dashed border-gray-200 pl-4 space-y-1.5 bg-gray-50 p-3 rounded-xl text-xs">
                            <div className="font-bold text-gray-500 mb-1">Ítems solicitados por el preventista:</div>
                            {ord.items.map((it: any) => (
                              <div key={it.id} className="flex justify-between items-center text-gray-700">
                                <span>
                                  {it.isBonification ? '🎁 [BONIF] ' : '• '}
                                  <strong>x{it.quantity}</strong> {it.productName}
                                  {it.deliveredQuantity !== null && it.deliveredQuantity !== it.quantity && (
                                    <span className="text-orange-600 font-bold ml-1">
                                      (Entregó solo {it.deliveredQuantity})
                                    </span>
                                  )}
                                </span>
                                <span className="font-semibold">
                                  {it.isBonification ? 'GRATIS' : `Bs. ${(it.unitPrice * (it.deliveredQuantity ?? it.quantity)).toFixed(2)}`}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* CONTENIDO PESTAÑA C: Pedidos Sin Asignar */}
            {activeTab === 'sin_asignar' && pedidosSinAsignar.length > 0 && (
              <div className="bg-red-50/60 border border-red-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚠️</span>
                  <h3 className="font-bold text-sm text-red-900">
                    Pedidos Creados por Preventistas que NUNCA fueron Asignados a un Camión
                  </h3>
                </div>
                <p className="text-xs text-red-700">
                  Estos pedidos fueron solicitados por el cliente y registrados por el preventista, pero nadie los cargó a ningún distribuidor:
                </p>

                <div className="bg-white rounded-xl divide-y divide-gray-100 border border-red-100 overflow-hidden">
                  {pedidosSinAsignar.map((o: any) => (
                    <div key={o.id} className="p-3 text-xs flex justify-between items-center">
                      <div>
                        <span className="font-black text-gray-800 mr-2">Pedido #{o.id}</span>
                        <span className="font-bold text-gray-700">{o.client.name}</span>
                        <span className="text-gray-400 ml-2">Prev: {o.preventista.name}</span>
                      </div>
                      <div className="font-black text-red-600">
                        Bs. {o.totalNeto.toFixed(2)} ({o.totalBultos} bultos)
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  )
}

