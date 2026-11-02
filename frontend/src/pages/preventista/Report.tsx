import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import { getDailyReport } from '../../api/orders'

interface ProductSummary {
  productId: number
  name: string
  category: string
  unit: string
  unitPrice: number
  regularQuantity?: number
  bonificationQuantity?: number
  totalQuantity: number
  totalAmount: number
  orderCount: number
}

interface BonificationSummary {
  productId: number
  name: string
  category: string
  unit: string
  bonificationQuantity: number
}

interface ReportData {
  date: string
  startDate: string
  endDate: string
  isRange: boolean
  summary: {
    totalOrders: number
    totalStores: number
    totalBruto?: number
    totalDiscount?: number
    totalAmount: number
    totalProductsUnits: number
    totalRegularUnits?: number
    totalBonificationUnits?: number
    statusCounts: Record<string, number>
  }
  bonificationsSummary?: BonificationSummary[]
  productsSummary: ProductSummary[]
}




export default function PreventistaReport() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPreset = searchParams.get('preset') || 'today'

  const [preset, setPreset] = useState<string>(initialPreset)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchReport = async () => {
    try {
      setLoading(true)
      let data: ReportData
      if (preset === 'custom' && startDate && endDate) {
        data = await getDailyReport({ startDate, endDate })
      } else {
        data = await getDailyReport({ date: preset })
      }
      setReport(data)
    } catch (err) {
      console.error('Error fetching report:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (preset !== 'custom') {
      fetchReport()
      setSearchParams({ preset })
    }
  }, [preset])

  const handleApplyCustomRange = (e: React.FormEvent) => {
    e.preventDefault()
    if (!startDate || !endDate) return
    setPreset('custom')
    fetchReport()
    setSearchParams({ preset: 'custom', start: startDate, end: endDate })
  }

  return (
    <Layout>
      <div className="space-y-6 max-w-5xl mx-auto print:max-w-none print:p-0">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <h1 className="text-2xl font-bold text-gray-800">Reporte de Ventas por Periodo</h1>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Consolidado de productos vendidos, volumen y recaudación total en el rango de fechas seleccionado
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => window.print()}
              className="bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm transition-colors flex items-center gap-2"
            >
              <span>🖨️</span>
              <span>Imprimir / Ticket</span>
            </button>
            <button
              onClick={fetchReport}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold p-2.5 rounded-xl border border-blue-200 transition-colors"
              title="Recargar"
            >
              🔄
            </button>
          </div>
        </div>

        {/* ── Selector de Periodo (Hoy, Semana, Mes o Rango Desde - Hasta) ── */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-gray-500 uppercase tracking-wider">Periodo:</span>
              <button
                onClick={() => setPreset('today')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  preset === 'today'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                ☀️ Hoy
              </button>
              <button
                onClick={() => setPreset('yesterday')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  preset === 'yesterday'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                ⏮️ Ayer
              </button>
              <button
                onClick={() => setPreset('this_week')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  preset === 'this_week'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                📅 Últimos 7 Días
              </button>
              <button
                onClick={() => setPreset('this_month')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  preset === 'this_month'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                🗓️ Este Mes
              </button>
              <button
                onClick={() => setPreset('last_month')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  preset === 'last_month'
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                ⏮️ Mes Anterior
              </button>
            </div>

            <div className="text-xs text-gray-500 font-semibold">
              Periodo: <span className="font-bold text-blue-600">{report?.startDate}</span> al <span className="font-bold text-blue-600">{report?.endDate}</span>
            </div>
          </div>

          {/* Formulario Rango Personalizado: Fecha Desde -> Fecha Hasta */}
          <form onSubmit={handleApplyCustomRange} className="pt-2 border-t border-gray-100 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-gray-500">🗓️ Rango personalizado:</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Desde:</span>
              <input
                type="date"
                required
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1 text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Hasta:</span>
              <input
                type="date"
                required
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1 text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-1 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              Consultar Periodo
            </button>
          </form>
        </div>

        {/* Encabezado exclusivo para impresión */}
        <div className="hidden print:block border-b pb-4 mb-4 text-center">
          <h1 className="text-xl font-bold uppercase tracking-wider">🥔 Reporte de Ventas de Preventa</h1>
          <p className="text-xs text-gray-600 mt-1">Periodo: {report?.startDate} al {report?.endDate}</p>
          <p className="text-[10px] text-gray-400">Fecha de emisión: {new Date().toLocaleString()}</p>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100">
            <span className="text-3xl animate-spin inline-block mb-3">🔄</span>
            <p className="text-sm font-medium">Calculando ventas del periodo...</p>
          </div>
        ) : !report ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 border border-gray-100">
            No hay información disponible para el periodo seleccionado.
          </div>
        ) : (
          <>
            {/* ── Tarjetas de Resumen KPI ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Recaudado (Neto)</p>
                <p className="text-2xl font-black text-green-600 mt-1">Bs. {report.summary.totalAmount.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {report.summary.totalDiscount && report.summary.totalDiscount > 0 
                    ? `Bruto: Bs. ${report.summary.totalBruto?.toFixed(2)}` 
                    : 'monto bruto vendido'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Bolsas / Unidades</p>
                <p className="text-2xl font-black text-amber-700 mt-1">{report.summary.totalProductsUnits}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {report.summary.totalBonificationUnits && report.summary.totalBonificationUnits > 0
                    ? `${report.summary.totalRegularUnits ?? (report.summary.totalProductsUnits - report.summary.totalBonificationUnits)} venta + ${report.summary.totalBonificationUnits} 🎁`
                    : 'volumen total'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Pedidos Totales</p>
                <p className="text-2xl font-black text-blue-600 mt-1">{report.summary.totalOrders}</p>
                <p className="text-xs text-gray-500 mt-0.5">en el rango seleccionado</p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Tiendas Alcanzadas</p>
                <p className="text-2xl font-black text-gray-800 mt-1">{report.summary.totalStores}</p>
                <p className="text-xs text-gray-500 mt-0.5">clientes atendidos</p>
              </div>
            </div>

            {/* ── Banner de Descuentos (si se aplicaron) ── */}
            {report.summary.totalDiscount && report.summary.totalDiscount > 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-amber-100 rounded-xl">🏷️</span>
                  <div>
                    <h3 className="text-sm font-bold text-amber-900">Descuentos Aplicados en el Periodo</h3>
                    <p className="text-xs text-amber-700">
                      Total Bruto: Bs. {report.summary.totalBruto?.toFixed(2)} — Descuentos Otorgados: Bs. {report.summary.totalDiscount.toFixed(2)}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-amber-600 text-white font-black text-sm rounded-xl">
                  - Bs. {report.summary.totalDiscount.toFixed(2)}
                </span>
              </div>
            ) : null}

            {/* ── Banner de Bonificaciones (si se otorgaron) ── */}
            {report.summary.totalBonificationUnits && report.summary.totalBonificationUnits > 0 ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-emerald-100 rounded-xl">🎁</span>
                  <div>
                    <h3 className="text-sm font-bold text-emerald-900">Bonificaciones Entregadas en el Periodo</h3>
                    <p className="text-xs text-emerald-700">
                      {report.summary.totalBonificationUnits} unidades entregadas como regalo comercial (sin costo comercial)
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1.5 bg-emerald-600 text-white font-black text-sm rounded-xl">
                  {report.summary.totalBonificationUnits} unid. gratis
                </span>
              </div>
            ) : null}

            {/* ── Desglose Consolidado de Productos ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-gray-800">
                    🥔 Desglose de Productos Vendidos en el Periodo
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Volumen y recaudación por cada variedad de producto
                  </p>
                </div>
                <span className="text-xs font-black px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
                  {report.summary.totalProductsUnits} unidades en total
                </span>
              </div>

              {report.productsSummary.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  No se registraron ventas en este periodo.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b text-gray-600 font-semibold text-xs">
                      <tr>
                        <th className="text-left px-5 py-3">Producto</th>
                        <th className="text-left px-5 py-3">Categoría</th>
                        <th className="text-left px-5 py-3">Unidad</th>
                        <th className="text-center px-5 py-3">Cantidad Venta</th>
                        <th className="text-right px-5 py-3">Precio Base</th>
                        <th className="text-right px-5 py-3">Subtotal Recaudado</th>
                        <th className="text-center px-5 py-3">% del Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {report.productsSummary.map(prod => {
                        const pct = report.summary.totalAmount > 0
                          ? ((prod.totalAmount / report.summary.totalAmount) * 100).toFixed(1)
                          : '0.0'
                        const boniQty = prod.bonificationQuantity || 0
                        const regularQty = prod.regularQuantity ?? (prod.totalQuantity - boniQty)

                        return (
                          <tr key={prod.productId} className="hover:bg-gray-50/80 transition-colors">
                            <td className="px-5 py-3.5 font-bold text-gray-800">{prod.name}</td>
                            <td className="px-5 py-3.5 text-gray-500 text-xs">{prod.category}</td>
                            <td className="px-5 py-3.5 text-gray-500 text-xs">{prod.unit}</td>
                            <td className="px-5 py-3.5 text-center">
                              <div className="flex flex-col items-center gap-1">
                                <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 font-black rounded-lg text-sm border border-amber-200">
                                  {regularQty} venta
                                </span>
                                {boniQty > 0 ? (
                                  <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-md text-xs border border-emerald-200">
                                    🎁 +{boniQty} bonif.
                                  </span>
                                ) : null}
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-right text-gray-600">Bs. {prod.unitPrice.toFixed(2)}</td>
                            <td className="px-5 py-3.5 text-right font-black text-green-700">
                              Bs. {prod.totalAmount.toFixed(2)}
                            </td>
                            <td className="px-5 py-3.5 text-center text-xs font-semibold text-gray-500">
                              {pct}%
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot className="bg-gray-50 font-bold text-gray-800 border-t">
                      <tr>
                        <td colSpan={3} className="px-5 py-3.5 text-right">Totales del Periodo:</td>
                        <td className="px-5 py-3.5 text-center text-amber-800 font-black text-sm">
                          {report.summary.totalProductsUnits} unidades
                        </td>
                        <td></td>
                        <td className="px-5 py-3.5 text-right text-green-700 font-black text-base">
                          Bs. {report.summary.totalAmount.toFixed(2)}
                        </td>
                        <td className="text-center font-bold text-xs text-gray-600">100%</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>

            {/* ── Desglose Detallado de Bonificaciones (si las hay) ── */}
            {report.bonificationsSummary && report.bonificationsSummary.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden">
                <div className="p-5 border-b border-emerald-100 bg-emerald-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎁</span>
                    <div>
                      <h2 className="text-base font-bold text-emerald-950">
                        Bonificaciones Entregadas (Regalo Sin Costo)
                      </h2>
                      <p className="text-xs text-emerald-700 mt-0.5">
                        Productos obsequiados a clientes según promociones de venta
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-200">
                    {report.summary.totalBonificationUnits} unidades gratis
                  </span>
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {report.bonificationsSummary.map(b => (
                    <div key={b.productId} className="flex items-center justify-between p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-100">
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{b.name}</p>
                        <p className="text-xs text-gray-500">{b.category} • {b.unit}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-xs">
                        🎁 {b.bonificationQuantity} unid
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* ── Resumen para Impresión / Ticket ── */}
            <div className="hidden print:block pt-4 border-t border-gray-300 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-200">
                <span className="font-semibold text-gray-700">Total Pedidos:</span>
                <span className="font-bold">{report.summary.totalOrders} pedidos</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-200">
                <span className="font-semibold text-gray-700">Tiendas Atendidas:</span>
                <span className="font-bold">{report.summary.totalStores} tiendas</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-200">
                <span className="font-semibold text-gray-700">Volumen Total:</span>
                <span className="font-bold text-amber-900">{report.summary.totalProductsUnits} bolsas/unidades</span>
              </div>
              {report.summary.totalBonificationUnits && report.summary.totalBonificationUnits > 0 ? (
                <div className="flex justify-between py-1.5 border-b border-gray-200 text-emerald-800 font-semibold">
                  <span>Bonificaciones Entregadas (Regalo):</span>
                  <span>{report.summary.totalBonificationUnits} unidades gratis</span>
                </div>
              ) : null}
              {report.summary.totalDiscount && report.summary.totalDiscount > 0 ? (
                <>
                  <div className="flex justify-between py-1.5 border-b border-gray-200">
                    <span className="font-semibold text-gray-700">Subtotal Bruto:</span>
                    <span>Bs. {report.summary.totalBruto?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-200 text-red-600 font-semibold">
                    <span>Descuentos Aplicados:</span>
                    <span>- Bs. {report.summary.totalDiscount.toFixed(2)}</span>
                  </div>
                </>
              ) : null}
              <div className="flex justify-between py-2 text-sm font-black border-t-2 border-black mt-2">
                <span>TOTAL RECAUDACIÓN:</span>
                <span className="text-green-700">Bs. {report.summary.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* ── Pie de Firma para impresión ── */}
            <div className="hidden print:block pt-16 mt-8 border-t">
              <div className="flex justify-around text-center">
                <div className="w-56 border-t border-gray-400 pt-2">
                  <p className="text-xs font-bold">Firma Preventista</p>
                  <p className="text-[10px] text-gray-500">Reporte de ventas entregado</p>
                </div>
                <div className="w-56 border-t border-gray-400 pt-2">
                  <p className="text-xs font-bold">Firma Administración</p>
                  <p className="text-[10px] text-gray-500">Recepción conforme</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
