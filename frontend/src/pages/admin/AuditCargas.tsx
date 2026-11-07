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
  const [activeTab, setActiveTab] = useState<'clientes' | 'carga' | 'sin_asignar'>('clientes')
  const [searchClientQuery, setSearchClientQuery] = useState('')
  const [clientStatusFilter, setClientStatusFilter] = useState<'todos' | 'entregado' | 'parcial' | 'pendiente'>('todos')
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
    totalClientes: 0,
    clientesEntregados: 0,
    pedidosEntregados: 0,
    pedidosParciales: 0,
    pedidosPendientes: 0,
    totalBultosVenta: 0,
    totalBultosBonif: 0,
    totalFisicoCargado: 0,
    totalFisicoEntregado: 0,
    totalFisicoDevuelto: 0,
    totalDescuentosPreventista: 0,
    totalDineroAsignado: 0,
    totalDineroCobradoReal: 0,
    totalDineroSistemaAntiguo: 0,
    descuadreBugSistema: 0,
    hayDiscrepancia: false,
  }

  const productosCargados = currentSession?.productosCargados || []
  const sessionOrders = currentSession?.orders || []

  // Filtrado de clientes / pedidos
  const filteredOrders = sessionOrders.filter((ord: any) => {
    const q = searchClientQuery.trim().toLowerCase()
    const matchesSearch = !q ||
      ord.client.name.toLowerCase().includes(q) ||
      (ord.client.address && ord.client.address.toLowerCase().includes(q)) ||
      ord.preventista.name.toLowerCase().includes(q) ||
      `#${ord.id}`.includes(q)

    let matchesStatus = true
    if (clientStatusFilter === 'entregado') matchesStatus = ord.status === 'entregado'
    else if (clientStatusFilter === 'parcial') matchesStatus = ord.status === 'entrega_parcial'
    else if (clientStatusFilter === 'pendiente') matchesStatus = ord.status === 'asignado'

    return matchesSearch && matchesStatus
  })

  const totalBrutoPreventista = resumen.totalDineroAsignado + resumen.totalDescuentosPreventista

  return (
    <Layout>
      <div className="space-y-5 pb-8">
        {/* Encabezado con aviso de ruta privada */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🕵️</span>
              <h1 className="text-xl font-black text-gray-800">
                Auditoría Completa de Preventas y Cargas por Distribuidor
              </h1>
              <span className="text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                Acceso Privado por URL
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Control total: clientes que solicitaron, total cargado al camión, total distribuido y total devuelto por cada jornada.
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
            {/* Selector de Jornadas si hay varias */}
            {sessions.length > 1 && (
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl flex items-center gap-2 overflow-x-auto">
                <span className="text-xs font-black text-slate-500 shrink-0 ml-1">Jornadas Disponibles ({sessions.length}):</span>
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
                      <span>#{s.session.id} — {s.session.distributor.name} ({s.resumenCarga.totalClientes || 0} clientes)</span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* MANIFIESTO PRINCIPAL DE LA JORNADA Y DEL DISTRIBUIDOR */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 rounded-2xl shadow-md space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700 pb-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🚚</span>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                        Distribuidor Responsable de la Carga
                      </div>
                      <h2 className="text-xl font-black text-white">
                        {currentSession.session.distributor.name}
                      </h2>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ml-2 ${
                      currentSession.session.status === 'activa'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      {currentSession.session.status === 'activa' ? '🟢 EN RUTA (ACTIVA)' : '⚪ JORNADA CERRADA'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-2 flex flex-wrap gap-4">
                    <span>Apertura: <strong>{new Date(currentSession.session.openedAt).toLocaleString('es-BO')}</strong></span>
                    <span>Cierre: <strong>{currentSession.session.closedAt ? new Date(currentSession.session.closedAt).toLocaleString('es-BO') : 'En curso'}</strong></span>
                    {currentSession.session.closedByAdmin && (
                      <span>Cierre verificado por: <strong>{currentSession.session.closedByAdmin.name}</strong></span>
                    )}
                  </div>
                </div>

                <div className="bg-slate-800/90 border border-slate-700 px-4 py-3 rounded-xl text-right">
                  <div className="text-xs text-slate-400 font-semibold">Total a Cobrar Asignado</div>
                  <div className="text-2xl font-black text-emerald-400">
                    Bs. {resumen.totalDineroAsignado.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Cobrado real: <strong className="text-emerald-300">Bs. {resumen.totalDineroCobradoReal.toFixed(2)}</strong>
                  </div>
                </div>
              </div>

              {/* 5 CUADROS CLAVE DE RESUMEN EJECUTIVO */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {/* 1. Clientes */}
                <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                    <span>🏪</span> Clientes que pidieron
                  </div>
                  <div className="text-2xl font-black text-white mt-1">
                    {resumen.totalClientes || 0} <span className="text-xs font-normal text-slate-400">tiendas</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
                    {resumen.clientesEntregados || 0} visitadas y entregadas
                  </div>
                </div>

                {/* 2. Total Pedidos */}
                <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                    <span>📋</span> Total Pedidos Preventa
                  </div>
                  <div className="text-2xl font-black text-white mt-1">
                    {resumen.totalPedidos} <span className="text-xs font-normal text-slate-400">pedidos</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1 font-medium">
                    {resumen.pedidosEntregados} compl. • {resumen.pedidosParciales} parc. • {resumen.pedidosPendientes} pend.
                  </div>
                </div>

                {/* 3. Total Cargado al Camión */}
                <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-1.5 text-xs text-blue-400 font-bold">
                    <span>📦</span> Total Cargado al Camión
                  </div>
                  <div className="text-2xl font-black text-blue-400 mt-1">
                    {resumen.totalFisicoCargado} <span className="text-xs font-normal text-slate-300">bultos</span>
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    {resumen.totalBultosVenta} venta + 🎁 {resumen.totalBultosBonif} bonif
                  </div>
                </div>

                {/* 4. Total Distribuido (Entregado) */}
                <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                    <span>✅</span> Total Distribuido
                  </div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    {resumen.totalFisicoEntregado} <span className="text-xs font-normal text-slate-300">bultos</span>
                  </div>
                  <div className="text-[11px] text-emerald-300 mt-1 font-semibold">
                    {resumen.totalFisicoCargado > 0
                      ? `${Math.round((resumen.totalFisicoEntregado / resumen.totalFisicoCargado) * 100)}% de entrega física`
                      : '0%'}
                  </div>
                </div>

                {/* 5. Total Devuelto al Almacén */}
                <div className="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold">
                    <span>↩️</span> Total Devuelto a Bodega
                  </div>
                  <div className="text-2xl font-black text-orange-400 mt-1">
                    {resumen.totalFisicoDevuelto} <span className="text-xs font-normal text-slate-300">bultos</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {resumen.totalFisicoDevuelto > 0 ? 'Regresaron en el camión' : 'Cero devoluciones 🎉'}
                  </div>
                </div>
              </div>

              {/* Barra de Totales de Dinero Solicitado por Preventista */}
              <div className="bg-slate-800/50 border border-slate-700 p-3 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-slate-400">
                    Suma bruta de preventas: <strong className="text-white">Bs. {totalBrutoPreventista.toFixed(2)}</strong>
                  </span>
                  {resumen.totalDescuentosPreventista > 0 && (
                    <span className="text-amber-400">
                      🏷️ Descuentos preventistas: <strong>-Bs. {resumen.totalDescuentosPreventista.toFixed(2)}</strong>
                    </span>
                  )}
                  <span className="text-slate-300">
                    Neto a rendir: <strong className="text-emerald-400">Bs. {resumen.totalDineroAsignado.toFixed(2)}</strong>
                  </span>
                </div>

                <div className="text-slate-300">
                  Efectivo real en caja: <strong className="text-emerald-400 text-sm">Bs. {resumen.totalDineroCobradoReal.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* ALERTA FORENSE: Demostración si hubo error en el sistema antiguo */}
            {resumen.hayDiscrepancia ? (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
                <span className="text-2xl mt-0.5">💡</span>
                <div className="space-y-1">
                  <h3 className="text-sm font-black text-amber-900">
                    DIAGNÓSTICO DEL SISTEMA ANTERIOR: SE DETECTÓ UNA DISCREPANCIA DE BS. {resumen.descuadreBugSistema.toFixed(2)}
                  </h3>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    • <strong>Lo que exigía el sistema anterior:</strong> Bs. {resumen.totalDineroSistemaAntiguo.toFixed(2)} (porque sumaba precios brutos sin restar los descuentos que el preventista prometió a los clientes).<br />
                    • <strong>Lo que el chofer realmente cobró y rindió:</strong> Bs. {resumen.totalDineroCobradoReal.toFixed(2)} (el neto real de las boletas entregadas).<br />
                    👉 <strong>Prueba para el cliente / auditoría:</strong> Al distribuidor <u>NO le faltó dinero</u>. La aparente diferencia de Bs. {resumen.descuadreBugSistema.toFixed(2)} fue originada por el software anterior al no restar los descuentos concedidos en preventa.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-emerald-800 font-semibold">
                <span>✅</span> En esta jornada las cuentas de dinero están cuadradas; no se detectaron discrepancias entre lo cobrado y los recibos.
              </div>
            )}

            {/* Pestañas de Navegación de Detalle */}
            <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
              <button
                onClick={() => setActiveTab('clientes')}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'clientes'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>🏪</span>
                <span>Todos los Clientes que Pidieron ({sessionOrders.length} pedidos)</span>
              </button>

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

            {/* CONTENIDO PESTAÑA 1: TODOS LOS CLIENTES Y SUS PEDIDOS */}
            {activeTab === 'clientes' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden space-y-3">
                {/* Filtro y buscador dentro de los clientes */}
                <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-gray-50/50">
                  <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                    <span className="text-gray-400">🔍</span>
                    <input
                      type="text"
                      placeholder="Buscar por cliente, dirección, preventista o #pedido..."
                      value={searchClientQuery}
                      onChange={e => setSearchClientQuery(e.target.value)}
                      className="border border-gray-300 rounded-xl px-3 py-1.5 text-xs w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                    {searchClientQuery && (
                      <button
                        onClick={() => setSearchClientQuery('')}
                        className="text-xs text-gray-400 hover:text-gray-600 font-bold px-1"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-gray-500 font-semibold mr-1">Estado:</span>
                    {[
                      { id: 'todos', label: 'Todos' },
                      { id: 'entregado', label: '✅ Entregados' },
                      { id: 'parcial', label: '⚠️ Parciales' },
                      { id: 'pendiente', label: '⏳ En camión' },
                    ].map(st => (
                      <button
                        key={st.id}
                        onClick={() => setClientStatusFilter(st.id as any)}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                          clientStatusFilter === st.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lista detallada de clientes y qué se les cargó/entregó */}
                <div className="divide-y divide-gray-100">
                  {filteredOrders.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-xs">
                      No se encontraron clientes con el filtro indicado.
                    </div>
                  ) : (
                    filteredOrders.map((ord: any) => {
                      const isExpanded = expandedOrderId === ord.id
                      const hasDevolucion = ord.status === 'entrega_parcial'

                      return (
                        <div key={ord.id} className="p-4 hover:bg-gray-50/60 transition-colors">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <span className="text-xs font-black bg-slate-100 text-slate-700 px-2 py-1 rounded-lg border border-slate-200 shrink-0">
                                #{ord.id}
                              </span>
                              <div>
                                <div className="font-black text-sm text-gray-900 flex items-center gap-2">
                                  <span>{ord.client.name}</span>
                                  {hasDevolucion && (
                                    <span className="text-[10px] font-bold bg-orange-100 text-orange-800 border border-orange-200 px-1.5 py-0.2 rounded">
                                      Devolución registrada
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                  📍 {ord.client.address || 'Sin dirección registrada'}
                                  {ord.client.phone && <span className="ml-2 font-semibold">📞 {ord.client.phone}</span>}
                                </div>
                                <div className="text-[11px] text-gray-400 mt-0.5">
                                  Preventista: <strong className="text-gray-700">{ord.preventista.name}</strong> • Pedido el {new Date(ord.createdAt).toLocaleDateString('es-BO')}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                ord.status === 'entregado'
                                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                                  : ord.status === 'entrega_parcial'
                                  ? 'bg-orange-100 text-orange-700 border border-orange-300'
                                  : 'bg-blue-100 text-blue-700 border border-blue-300'
                              }`}>
                                {ord.status === 'entregado' ? '✅ ENTREGADO' : ord.status === 'entrega_parcial' ? '⚠️ ENTREGA PARCIAL' : '⏳ EN CAMIÓN'}
                              </span>

                              <div className="text-right">
                                <div className="text-xs text-gray-400">
                                  {ord.discount > 0 && (
                                    <span className="text-amber-700 font-bold mr-1.5">
                                      Desc: -Bs. {ord.discount.toFixed(0)}
                                    </span>
                                  )}
                                  <strong>{ord.bultosTotal} bultos</strong>
                                </div>
                                <div className="text-sm font-black text-gray-900">
                                  Bs. {ord.totalNeto.toFixed(2)}
                                </div>
                                {ord.status !== 'asignado' && (
                                  <div className="text-[11px] text-emerald-700 font-semibold">
                                    Cobrado: Bs. {ord.cobradoReal.toFixed(2)}
                                  </div>
                                )}
                              </div>

                              <button
                                onClick={() => setExpandedOrderId(isExpanded ? null : ord.id)}
                                className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl transition-colors"
                              >
                                {isExpanded ? 'Ocultar ▲' : 'Ver productos ▼'}
                              </button>
                            </div>
                          </div>

                          {/* Detalle desplegable de los productos pedidos por este cliente */}
                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-dashed border-gray-200 bg-slate-50 p-3.5 rounded-xl text-xs space-y-2">
                              <div className="font-bold text-slate-700 flex justify-between items-center">
                                <span>Mercadería cargada para este cliente:</span>
                                <span className="text-slate-400 font-normal">
                                  Hora pedido: {new Date(ord.createdAt).toLocaleTimeString('es-BO')}
                                </span>
                              </div>

                              <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                                {ord.items.map((it: any) => {
                                  const deliv = it.deliveredQuantity !== null ? it.deliveredQuantity : it.quantity
                                  const devuelto = it.quantity - deliv

                                  return (
                                    <div key={it.id} className="p-2.5 flex justify-between items-center">
                                      <div className="flex items-center gap-2">
                                        {it.isBonification ? (
                                          <span className="bg-emerald-100 text-emerald-800 font-black text-[10px] px-1.5 py-0.5 rounded">
                                            🎁 BONIF
                                          </span>
                                        ) : (
                                          <span className="text-gray-400">•</span>
                                        )}
                                        <span className="font-bold text-gray-800">{it.productName}</span>
                                        <span className="text-gray-400">({it.unit})</span>
                                      </div>

                                      <div className="flex items-center gap-4">
                                        <span className="text-gray-700">
                                          Pidió: <strong className="text-blue-700">x{it.quantity}</strong>
                                        </span>

                                        {ord.status !== 'asignado' && (
                                          <span className={devuelto > 0 ? 'text-orange-700 font-bold' : 'text-emerald-700 font-semibold'}>
                                            Entregó: <strong>x{deliv}</strong>
                                            {devuelto > 0 && <span className="text-orange-600 ml-1">(Devolvió {devuelto})</span>}
                                          </span>
                                        )}

                                        <span className="font-black text-gray-800 w-20 text-right">
                                          {it.isBonification ? 'GRATIS' : `Bs. ${(it.unitPrice * deliv).toFixed(2)}`}
                                        </span>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )}

            {/* CONTENIDO PESTAÑA 2: CARGA FÍSICA POR PRODUCTO */}
            {activeTab === 'carga' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-gray-800">
                      Consolidado de Mercadería Física en el Camión
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Suma de todo lo solicitado por los clientes y cargado al distribuidor en esta jornada
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 bg-blue-50 border border-blue-200 px-3 py-1 rounded-xl">
                    Total Físico en Camión: <strong className="text-blue-700 text-sm">{resumen.totalFisicoCargado} bultos</strong>
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b text-xs font-bold text-gray-600 uppercase">
                      <tr>
                        <th className="text-left px-4 py-3">Producto</th>
                        <th className="text-center px-4 py-3">Venta Regular</th>
                        <th className="text-center px-4 py-3">🎁 Bonificación</th>
                        <th className="text-center px-4 py-3 bg-blue-50/60 text-blue-900">TOTAL CARGADO</th>
                        <th className="text-center px-4 py-3 text-emerald-700">Entregado</th>
                        <th className="text-center px-4 py-3 text-orange-700">Devuelto</th>
                        <th className="text-center px-4 py-3">Efectividad</th>
                        <th className="text-right px-4 py-3">Dinero Cobrado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {productosCargados.map((p: any) => {
                        const pct = p.totalCargado > 0 ? Math.round((p.entregado / p.totalCargado) * 100) : 0
                        return (
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
                            <td className="px-4 py-3 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <div className="w-12 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                                </div>
                                <span className="text-[11px] font-bold text-gray-600">{pct}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-gray-800">
                              Bs. {p.montoCobrado.toFixed(2)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot className="bg-slate-50 font-black text-xs text-gray-800 border-t-2 border-gray-200">
                      <tr>
                        <td className="px-4 py-3 uppercase">TOTALES GENERALES:</td>
                        <td className="px-4 py-3 text-center">x{resumen.totalBultosVenta}</td>
                        <td className="px-4 py-3 text-center text-emerald-700">+{resumen.totalBultosBonif}</td>
                        <td className="px-4 py-3 text-center text-blue-800 text-sm">x{resumen.totalFisicoCargado}</td>
                        <td className="px-4 py-3 text-center text-emerald-700">x{resumen.totalFisicoEntregado}</td>
                        <td className="px-4 py-3 text-center text-orange-700">x{resumen.totalFisicoDevuelto}</td>
                        <td className="px-4 py-3 text-center">
                          {resumen.totalFisicoCargado > 0
                            ? `${Math.round((resumen.totalFisicoEntregado / resumen.totalFisicoCargado) * 100)}%`
                            : '0%'}
                        </td>
                        <td className="px-4 py-3 text-right text-emerald-800 text-sm">
                          Bs. {resumen.totalDineroCobradoReal.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}

            {/* CONTENIDO PESTAÑA 3: PEDIDOS SIN CAMIÓN */}
            {activeTab === 'sin_asignar' && pedidosSinAsignar.length > 0 && (
              <div className="bg-red-50/60 border border-red-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚠️</span>
                  <h3 className="font-bold text-sm text-red-900">
                    Pedidos Solicitados por Preventistas que NUNCA fueron Cargados a Ningún Camión
                  </h3>
                </div>
                <p className="text-xs text-red-700">
                  Estos clientes pidieron mercadería que el preventista anotó, pero en bodega no se asignaron a ningún distribuidor:
                </p>

                <div className="bg-white rounded-xl divide-y divide-gray-100 border border-red-100 overflow-hidden">
                  {pedidosSinAsignar.map((o: any) => (
                    <div key={o.id} className="p-3.5 text-xs flex justify-between items-center">
                      <div>
                        <span className="font-black text-gray-800 mr-2">Pedido #{o.id}</span>
                        <span className="font-bold text-gray-800">{o.client.name}</span>
                        <span className="text-gray-400 ml-2">Preventista: {o.preventista.name}</span>
                        {o.client.phone && <span className="text-gray-400 ml-2">Tel: {o.client.phone}</span>}
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
