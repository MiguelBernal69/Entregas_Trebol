import { useState, useRef, useEffect } from 'react'
import type { Order } from '../types'

// Detección de Electron: si window.electronAPI existe estamos dentro del .exe
declare global {
  interface Window {
    electronAPI?: {
      printEscpos: (orders: Order[]) => Promise<{ ok: boolean; count?: number; error?: string }>
      listPrinters: () => Promise<{ ok: boolean; devices?: unknown[]; error?: string }>
      isElectron: boolean
    }
  }
}
const checkIsElectron = () => typeof window !== 'undefined' && !!window.electronAPI?.isElectron

interface BatchThermalReceiptModalProps {
  orders: Order[]
  title?: string
  onClose: () => void
}

export default function BatchThermalReceiptModal({
  orders: initialOrders,
  title = 'Imprimir Boletas de Carga',
  onClose,
}: BatchThermalReceiptModalProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  useEffect(() => {
    setOrders(initialOrders)
  }, [initialOrders])

  const [printerMode, setPrinterMode] = useState<'80mm' | '58mm' | 'a4'>('80mm')
  const [viewMode, setViewMode] = useState<'individual' | 'all'>('individual')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [printedOrderIds, setPrintedOrderIds] = useState<Set<number>>(new Set())
  const [includeSummary, setIncludeSummary] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isAutoPrinting, setIsAutoPrinting] = useState(false)
  const printAreaRef = useRef<HTMLDivElement>(null)

  const handleRemoveOrder = (orderId: number) => {
    const updated = orders.filter(o => o.id !== orderId)
    if (updated.length === 0) {
      onClose()
      return
    }
    setOrders(updated)
    setPrintedOrderIds(prev => {
      const next = new Set(prev)
      next.delete(orderId)
      return next
    })
    setCurrentIndex(prev => Math.max(0, Math.min(prev, updated.length - 1)))
  }

  if (!orders || orders.length === 0) return null

  const currentOrder = orders[currentIndex] || orders[0]

  // Totales acumulados de la carga
  const totalBultosVenta = orders.reduce(
    (sum, o) => sum + o.items.filter(i => !i.isBonification).reduce((s, i) => s + i.quantity, 0),
    0
  )
  const totalBultosBonif = orders.reduce(
    (sum, o) => sum + o.items.filter(i => i.isBonification).reduce((s, i) => s + i.quantity, 0),
    0
  )
  const totalBultosGeneral = totalBultosVenta + totalBultosBonif

  const totalCobrarGeneral = orders.reduce((sum, o) => {
    const regularItems = o.items.filter(i => !i.isBonification)
    const sub = regularItems.reduce(
      (s, i) => s + i.unitPrice * (i.deliveredQuantity ?? i.quantity),
      0
    )
    return sum + Math.max(0, sub - Number(o.discount || 0))
  }, 0)

  // Resumen consolidado de productos en la carga
  const productSummary: Record<string, { regular: number; bonif: number; unitPrice: number }> = {}
  orders.forEach(o => {
    o.items.forEach(it => {
      const name = it.product.name
      if (!productSummary[name]) {
        productSummary[name] = { regular: 0, bonif: 0, unitPrice: it.unitPrice }
      }
      if (it.isBonification) {
        productSummary[name].bonif += it.quantity
      } else {
        productSummary[name].regular += (it.deliveredQuantity ?? it.quantity)
      }
    })
  })

  // Genera el HTML completo para imprimir una sola boleta de forma aislada
  const getSingleOrderHtml = (order: Order, widthMode: '80mm' | '58mm' | 'a4') => {
    const regularItems = order.items.filter(i => !i.isBonification)
    const bonifItems = order.items.filter(i => i.isBonification)
    const discountVal = Number(order.discount || 0)
    const subtotal = regularItems.reduce(
      (acc, i) => acc + i.unitPrice * (i.deliveredQuantity ?? i.quantity),
      0
    )
    const finalTotal = Math.max(0, subtotal - discountVal)
    const dateToUse = order.deliveredAt ? new Date(order.deliveredAt) : new Date(order.createdAt)
    const dateFormatted = `${dateToUse.toLocaleDateString()} ${dateToUse.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    const widthStr = widthMode === '80mm' ? '80mm' : widthMode === '58mm' ? '58mm' : '100%'

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Boleta Pedido #${order.id}</title>
          <style>
            @page {
              size: ${widthMode === '80mm' ? '80mm auto' : widthMode === '58mm' ? '58mm auto' : 'A4'};
              margin: 0;
            }
            * { box-sizing: border-box; }
            html, body { margin: 0; padding: 0; width: 100%; }
            body {
              font-family: 'Calibri', 'Segoe UI', Arial, sans-serif;
              font-size: 13px;
              font-weight: 700;
              line-height: 1.25;
              margin: 0 auto;
              padding: 1mm 5mm 0 5mm;
              color: #000;
              width: ${widthStr};
              max-width: ${widthStr};
              box-sizing: border-box;
            }
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .border-b { border-bottom: 1px solid #000; margin: 5px 0; }
            .border-b-dashed { border-bottom: 1px dashed #000; margin: 5px 0; }
            .flex { display: flex; justify-content: space-between; align-items: baseline; }
            .bold { font-weight: 900; }
            .items-table { width: 100%; border-collapse: collapse; margin: 4px 0; table-layout: fixed; }
            .items-table th, .items-table td { padding: 1.5px 0; vertical-align: top; font-size: 12px; font-weight: 700; }
            .items-table th { border-bottom: 1px solid #000; font-weight: 900; }
            /* Avance de papel para que la cuchilla de la impresora corte limpio a ~1.2cm del texto */
            .feed-space { height: 8mm; min-height: 8mm; line-height: 8mm; font-size: 1px; }
          </style>
        </head>
        <body>
          <div class="text-center">
            <div style="font-size: 16px; font-weight: 900;">DISTRIBUIDORA LUNOVA</div>
            <div style="font-size: 12px;">contacto: 74347987</div>
            <div class="border-b"></div>
          </div>
          <div style="font-size: 12px;">
            <div class="bold">pedido #${order.id}</div>
            <div><span class="bold">vendedor:</span> ${order.preventista?.name || order.distributor?.name || 'Distribución'}</div>
            <div><span class="bold">fecha entrega:</span> ${dateFormatted}</div>
            <div><span class="bold">cliente:</span> ${order.client.name}</div>
            ${order.client.phone ? `<div><span class="bold">contacto:</span> ${order.client.phone}</div>` : ''}
            ${order.client.address ? `<div><span class="bold">direccion:</span> ${order.client.address}</div>` : ''}
          </div>
          <div class="border-b"></div>
          <table class="items-table">
            <thead>
              <tr>
                <th align="left" style="width: auto;">Descripcion</th>
                <th align="center" style="width: 32px;">CANT</th>
                <th align="right" style="width: 44px;">P.U</th>
                <th align="right" style="width: 48px; padding-right: 2px;">total</th>
              </tr>
            </thead>
            <tbody>
              ${regularItems.map(it => {
                const qty = it.deliveredQuantity ?? it.quantity
                return `
                  <tr>
                    <td style="word-break: break-word;">${it.product.name}</td>
                    <td align="center" class="bold" style="width: 32px;">x${qty}</td>
                    <td align="right" style="width: 44px;">${it.unitPrice.toFixed(2)}</td>
                    <td align="right" class="bold" style="width: 48px; padding-right: 2px;">${(it.unitPrice * qty).toFixed(2)}</td>
                  </tr>
                `
              }).join('')}
            </tbody>
          </table>
          ${bonifItems.length > 0 ? `
            <div class="border-b-dashed"></div>
            <div style="font-size: 11px; font-weight: 900;">🎁 BONIFICACIONES (GRATIS)</div>
            ${bonifItems.map(it => `
              <div class="flex" style="font-size: 12px; padding-right: 2px;">
                <span>[BONIF] ${it.product.name}</span>
                <span class="bold">x${it.quantity} GRATIS</span>
              </div>
            `).join('')}
          ` : ''}
          <div class="border-b"></div>
          ${discountVal > 0 ? `
            <div class="flex" style="font-size: 12px; padding-right: 2px;">
              <span>subtotal:</span>
              <span>Bs. ${subtotal.toFixed(2)}</span>
            </div>
            <div class="flex bold" style="font-size: 12px; padding-right: 2px;">
              <span>descuento:</span>
              <span>-Bs. ${discountVal.toFixed(2)}</span>
            </div>
            <div class="border-b-dashed"></div>
          ` : ''}
          <div class="flex bold" style="font-size: 15px; margin-top: 3px; padding-right: 2px;">
            <span>total:</span>
            <span>Bs. ${finalTotal.toFixed(2)}</span>
          </div>
          ${order.notes ? `
            <div class="border-b-dashed"></div>
            <div style="font-size: 11px;"><span class="bold">obs:</span> ${order.notes}</div>
          ` : ''}
          <div class="border-b"></div>
          <div class="text-center" style="font-size: 12px; margin-top: 6px;">gracias por su compra</div>
          <div style="text-align: center; font-size: 9px; margin-top: 4px; letter-spacing: 3px; color: #333;">- - - - - - - - - - - - - - -</div>
          <div class="feed-space">&nbsp;</div>
        </body>
      </html>
    `
  }

  // Imprime una sola boleta a través de un iframe invisible (garantiza corte de papel al terminar cada trabajo)
  // IMPORTANTE: usamos iframe.srcdoc en lugar de doc.write() porque con doc.write()
  // el evento onload se dispara cuando el iframe se agrega al DOM (vacío), antes de escribir
  // el contenido → imprime en blanco. Con srcdoc, el browser carga el HTML completo
  // y LUEGO dispara onload con el contenido ya renderizado.
  const printSingleOrder = (order: Order): Promise<void> => {
    return new Promise((resolve) => {
      const iframe = document.createElement('iframe')
      iframe.style.position = 'fixed'
      iframe.style.right = '0'
      iframe.style.bottom = '0'
      iframe.style.width = '1px'
      iframe.style.height = '1px'
      iframe.style.border = '0'
      iframe.style.opacity = '0'

      iframe.onload = () => {
        try {
          iframe.contentWindow?.focus()
          iframe.contentWindow?.print()
        } catch (_) {}
        // Marcar como impreso
        setPrintedOrderIds(prev => new Set([...prev, order.id]))
        // Dar tiempo a que Chrome termine de enviar a la impresora antes de quitar el iframe
        setTimeout(() => {
          try { document.body.removeChild(iframe) } catch (_) {}
          resolve()
        }, 1500)
      }

      // srcdoc carga el HTML antes de disparar onload (a diferencia de doc.write)
      iframe.srcdoc = getSingleOrderHtml(order, printerMode)
      document.body.appendChild(iframe)
    })
  }

  // Imprimir la boleta actual y avanzar a la siguiente
  const handlePrintCurrentAndNext = async () => {
    if (checkIsElectron() && window.electronAPI) {
      // ✂️ Impresión ESC/POS real con corte automático
      const result = await window.electronAPI.printEscpos([currentOrder])
      if (!result.ok) {
        alert(`Error de impresión:\n${result.error}`)
        return
      }
    } else {
      await printSingleOrder(currentOrder)
    }
    setPrintedOrderIds(prev => new Set([...prev, currentOrder.id]))
    if (currentIndex < orders.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  // Imprimir todo de forma secuencial una por una con corte
  const handlePrintAllSequentially = async () => {
    if (isAutoPrinting) return
    setIsAutoPrinting(true)

    if (checkIsElectron() && window.electronAPI) {
      // ✂️ Enviar TODOS los pedidos de una vez a la impresora ESC/POS
      const result = await window.electronAPI.printEscpos(orders)
      if (!result.ok) {
        alert(`Error de impresión:\n${result.error}`)
      } else {
        setPrintedOrderIds(new Set(orders.map(o => o.id)))
        setCurrentIndex(orders.length - 1)
      }
    } else {
      for (let i = 0; i < orders.length; i++) {
        setCurrentIndex(i)
        await printSingleOrder(orders[i])
        // Pequeña pausa entre boletas para que la impresora física corte y libere buffer
        await new Promise(r => setTimeout(r, 1200))
      }
    }
    setIsAutoPrinting(false)
  }

  // Generador de texto plano para todas las boletas
  const generateAllReceiptsText = (width: '80mm' | '58mm' | 'a4'): string => {
    const colWidth = width === '58mm' ? 32 : 44
    const divider = '-'.repeat(colWidth)
    const dblDivider = '='.repeat(colWidth)

    const center = (text: string) => {
      if (text.length >= colWidth) return text.substring(0, colWidth)
      const pad = Math.floor((colWidth - text.length) / 2)
      return ' '.repeat(pad) + text
    }

    const row = (left: string, right: string) => {
      const space = colWidth - left.length - right.length
      if (space <= 0) return `${left} ${right}`
      return left + ' '.repeat(space) + right
    }

    const lines: string[] = []

    if (includeSummary) {
      lines.push(dblDivider)
      lines.push(center('HOJA DE RUTA / CARGA TOTAL'))
      lines.push(center('DISTRIBUIDORA LUNOVA'))
      lines.push(center('contacto: 74347987'))
      lines.push(dblDivider)
      lines.push(row('FECHA:', new Date().toLocaleDateString()))
      lines.push(row('HORA:', new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })))
      lines.push(row('TOTAL PEDIDOS:', `${orders.length}`))
      lines.push(row('TOTAL BULTOS/UNDS:', `${totalBultosGeneral}`))
      lines.push(row('TOTAL A COBRAR:', `Bs. ${totalCobrarGeneral.toFixed(2)}`))
      lines.push(divider)
      lines.push('RESUMEN DE PRODUCTOS:')
      lines.push(divider)
      Object.entries(productSummary).forEach(([name, data]) => {
        lines.push(`${data.regular}x ${name}`)
        if (data.bonif > 0) {
          lines.push(`  + ${data.bonif}x [BONIF GRATIS]`)
        }
      })
      lines.push(dblDivider)
      lines.push(center('FIN RESUMEN DE CARGA'))
      lines.push(dblDivider)
      lines.push('\n\n')
    }

    orders.forEach((order) => {
      const regularItems = order.items.filter(i => !i.isBonification)
      const bonifItems = order.items.filter(i => i.isBonification)
      const discountVal = Number(order.discount || 0)
      const subtotal = regularItems.reduce((acc, i) => acc + i.unitPrice * (i.deliveredQuantity ?? i.quantity), 0)
      const finalTotal = Math.max(0, subtotal - discountVal)

      lines.push(center('DISTRIBUIDORA LUNOVA'))
      lines.push(center('contacto: 74347987'))
      lines.push(divider)
      lines.push(`pedido #${order.id}`)
      lines.push(`vendedor: ${order.preventista?.name || order.distributor?.name || 'Distribución'}`)
      const dateToUse = order.deliveredAt ? new Date(order.deliveredAt) : new Date(order.createdAt)
      const dateFormatted = `${dateToUse.toLocaleDateString()} ${dateToUse.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      lines.push(`fecha entrega: ${dateFormatted}`)
      lines.push(`cliente: ${order.client.name}`)
      if (order.client.phone) lines.push(`contacto: ${order.client.phone}`)
      if (order.client.address) lines.push(`direccion: ${order.client.address}`)
      lines.push(divider)

      if (width === '58mm') {
        lines.push('Descripcion         CANT  P.U  total')
      } else {
        lines.push('Descripcion                    CANT   P.U    total')
      }
      lines.push(divider)

      for (const it of regularItems) {
        const qty = it.deliveredQuantity ?? it.quantity
        const cant = `x${qty}`
        const price = it.unitPrice.toFixed(2)
        const subt = (it.unitPrice * qty).toFixed(2)
        const maxLen = width === '58mm' ? 16 : 26

        lines.push(
          `${it.product.name.substring(0, maxLen).padEnd(maxLen)} ${cant.padStart(4)} ${price.padStart(5)} ${subt.padStart(6)}`
        )
      }

      if (bonifItems.length > 0) {
        lines.push(divider)
        lines.push('*** BONIFICACIONES (GRATIS) ***')
        for (const it of bonifItems) {
          lines.push(`[BONIF] ${it.product.name} x${it.quantity} (GRATIS)`)
        }
      }

      lines.push(divider)
      if (discountVal > 0) {
        lines.push(row('subtotal:', `Bs. ${subtotal.toFixed(2)}`))
        lines.push(row('descuento:', `-Bs. ${discountVal.toFixed(2)}`))
        lines.push(divider)
      }

      lines.push(row('total:', `Bs. ${finalTotal.toFixed(2)}`))
      lines.push(divider)
      if (order.notes) {
        lines.push(`obs: ${order.notes}`)
        lines.push(divider)
      }
      lines.push(center('gracias por su compra'))
      lines.push('\n\n\n\n') // Espacio de corte térmico
      lines.push(`- - - - - - - - - - [ CORTE DE PAPEL #${order.id} ] - - - - - - - - - -`)
      lines.push('\n\n')
    })

    return lines.join('\n')
  }

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generateAllReceiptsText(printerMode))
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (_) {}
  }

  const handlePrintAllContinuous = () => {
    window.print()
  }

  // Atajos de teclado: barra espaciadora o Enter imprime la boleta actual y pasa a la siguiente
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentIndex < orders.length - 1) {
        setCurrentIndex(prev => prev + 1)
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, orders.length])

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3 overflow-y-auto">
      {/* Estilos para impresión masiva */}
      <style>{`
        @media print {
          @page {
            size: ${printerMode === '80mm' ? '80mm auto' : printerMode === '58mm' ? '58mm auto' : 'A4 portrait'};
            margin: 0;
          }
          body * {
            visibility: hidden;
          }
          #batch-thermal-container, #batch-thermal-container * {
            visibility: visible;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #batch-thermal-container {
            display: block !important;
            width: ${printerMode === '80mm' ? '80mm' : printerMode === '58mm' ? '58mm' : '100%'} !important;
            padding: ${printerMode === 'a4' ? '10mm' : '4mm'} !important;
            margin: 0 auto !important;
            background: white !important;
            color: black !important;
            font-family: 'Calibri', 'Segoe UI', Arial, sans-serif !important;
            font-size: 13px !important;
            font-weight: bold !important;
            line-height: 1.25 !important;
          }
          .batch-receipt-item {
            page-break-after: always !important;
            break-after: page !important;
            margin-bottom: ${printerMode === 'a4' ? '0' : '20mm'} !important;
            padding-bottom: ${printerMode === 'a4' ? '0' : '15mm'} !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[96vh] border border-gray-100">
        {/* Cabecera del modal */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between no-print">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🖨️</span>
              <h3 className="font-bold text-base">{title}</h3>
              <span className="bg-blue-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold">
                {orders.length} pedidos
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Imprime boleta por boleta cortando individualmente en cada pedido para salir a repartir
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Barra de Modos: Uno a Uno (Cortando) vs Tirada Completa */}
        <div className="bg-slate-100 p-2.5 px-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Modo de Impresión:</span>
            <div className="bg-white p-1 rounded-xl border border-slate-300 flex items-center gap-1 shadow-sm">
              <button
                onClick={() => setViewMode('individual')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'individual'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>✂️</span>
                <span>Uno por Uno (Cortando cada boleta)</span>
              </button>
              <button
                onClick={() => setViewMode('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>📜</span>
                <span>Tirada Continua (Todas juntas)</span>
              </button>
            </div>
          </div>

          {/* Formato de Ancho */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600">Papel:</span>
            <button
              onClick={() => setPrinterMode('80mm')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                printerMode === '80mm'
                  ? 'bg-slate-800 text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              80mm (Epson)
            </button>
            <button
              onClick={() => setPrinterMode('58mm')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                printerMode === '58mm'
                  ? 'bg-slate-800 text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              58mm (POS)
            </button>

            {viewMode === 'all' && (
              <label className="flex items-center gap-1 text-xs text-slate-700 font-semibold cursor-pointer ml-2">
                <input
                  type="checkbox"
                  checked={includeSummary}
                  onChange={e => setIncludeSummary(e.target.checked)}
                  className="rounded text-blue-600 h-3.5 w-3.5"
                />
                <span>Resumen</span>
              </label>
            )}
          </div>
        </div>

        {/* Barra de Navegación Rápida de Pedidos (Estilo Píldoras con Check de Impreso) */}
        {viewMode === 'individual' && (
          <div className="bg-slate-50 p-2.5 px-4 border-b border-slate-200 overflow-x-auto flex items-center gap-1.5 no-print">
            <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap mr-1">
              Pedidos ({printedOrderIds.size}/{orders.length} cortados):
            </span>
            {orders.map((o, idx) => {
              const isCurrent = idx === currentIndex
              const isPrinted = printedOrderIds.has(o.id)
              return (
                <div
                  key={o.id}
                  className={`px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                      : isPrinted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isPrinted ? '✅' : `#${idx + 1}`}</span>
                    <span>#{o.id}</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveOrder(o.id)
                    }}
                    className={`ml-0.5 rounded px-1 transition-colors text-xs font-bold ${
                      isCurrent
                        ? 'text-blue-200 hover:text-white hover:bg-blue-700'
                        : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                    }`}
                    title="Quitar este pedido de la tirada"
                  >
                    ✕
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* Contenido Principal */}
        <div className="p-4 overflow-y-auto flex-1 bg-slate-200/50 flex flex-col items-center">
          {viewMode === 'individual' ? (
            /* Vista Individual: Asistente Boleta por Boleta */
            <div className="w-full max-w-md flex flex-col items-center">
              {/* Tarjeta de Control Superior */}
              <div className="w-full bg-white rounded-xl shadow-sm p-3 mb-3 border border-slate-200 flex items-center justify-between no-print">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 transition-colors"
                >
                  ◀ Anterior
                </button>

                <div className="text-center">
                  <div className="text-xs font-black text-slate-800">
                    Boleta {currentIndex + 1} de {orders.length}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                    {currentOrder.client.name}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleRemoveOrder(currentOrder.id)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors flex items-center gap-1"
                    title="Quitar esta boleta de la lista a imprimir"
                  >
                    <span>🗑️</span>
                    <span>Quitar</span>
                  </button>

                  <button
                    onClick={() => setCurrentIndex(prev => Math.min(orders.length - 1, prev + 1))}
                    disabled={currentIndex === orders.length - 1}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 transition-colors"
                  >
                    Siguiente ▶
                  </button>
                </div>
              </div>

              {/* Botón Principal de Impresión con Corte */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 no-print">
                <button
                  onClick={handlePrintCurrentAndNext}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02]"
                >
                  <span className="text-lg">✂️</span>
                  <span>Imprimir Esta y Cortar</span>
                </button>

                <button
                  onClick={handlePrintAllSequentially}
                  disabled={isAutoPrinting}
                  className={`w-full py-3 px-4 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                    isAutoPrinting
                      ? 'bg-amber-600 animate-pulse'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <span>{isAutoPrinting ? '⏳' : '⚡'}</span>
                  <span>
                    {isAutoPrinting
                      ? `Cortando ${currentIndex + 1} de ${orders.length}...`
                      : `Imprimir Todas Cortando (${orders.length})`}
                  </span>
                </button>
              </div>

              {/* Ticket Visual de la Boleta Actual */}
              <div
                style={{ fontFamily: "'Calibri', 'Segoe UI', Arial, sans-serif" }}
                className={`bg-white shadow-lg p-4 text-black border border-slate-300 transition-all ${
                  printerMode === '80mm' ? 'w-[280px]' : 'w-[200px]'
                } text-[13px] font-semibold leading-snug select-text rounded-sm`}
              >
                <div className="text-center pb-2">
                  <h4 className="font-black text-[15px] tracking-wide">DISTRIBUIDORA LUNOVA</h4>
                  <p className="text-[12px] font-bold text-black mt-0.5">contacto: 74347987</p>
                  <div className="border-b border-black my-1.5" />
                </div>

                <div className="space-y-1 mb-2 font-bold text-[12px]">
                  <div className="font-black text-blue-800">pedido #{currentOrder.id}</div>
                  <div><span className="font-black">vendedor:</span> {currentOrder.preventista?.name || currentOrder.distributor?.name || 'Distribución'}</div>
                  <div>
                    <span className="font-black">fecha:</span>{' '}
                    {(() => {
                      const d = currentOrder.deliveredAt ? new Date(currentOrder.deliveredAt) : new Date(currentOrder.createdAt)
                      return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                    })()}
                  </div>
                  <div><span className="font-black">cliente:</span> {currentOrder.client.name}</div>
                  {currentOrder.client.phone && <div><span className="font-black">contacto:</span> {currentOrder.client.phone}</div>}
                  {currentOrder.client.address && <div><span className="font-black">direccion:</span> {currentOrder.client.address}</div>}
                </div>

                <div className="border-b border-black my-1.5" />

                <div className="flex justify-between font-black text-[12px] pb-1 border-b border-black">
                  <span className="flex-1 min-w-0 pr-1">Descripcion</span>
                  <span className="w-10 text-center">CANT</span>
                  <span className="w-12 text-right">P.U</span>
                  <span className="w-14 text-right">total&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>

                <div className="py-1 space-y-1">
                  {currentOrder.items.filter(i => !i.isBonification).map(item => {
                    const qty = item.deliveredQuantity ?? item.quantity
                    return (
                      <div key={item.id} className="flex items-start gap-1 text-[12px] font-bold">
                        <span className="flex-1 min-w-0 pr-1 break-all leading-tight">{item.product.name}</span>
                        <span className="w-10 shrink-0 text-center font-black">x{qty}</span>
                        <span className="w-12 shrink-0 text-right">{item.unitPrice.toFixed(2)}</span>
                        <span className="w-14 shrink-0 text-right font-black">{(item.unitPrice * qty).toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    )
                  })}
                </div>

                {currentOrder.items.some(i => i.isBonification) && (
                  <div className="my-1 border-t border-dashed border-black pt-1">
                    <div className="text-[11px] font-black tracking-wide text-black">
                      🎁 BONIFICACIONES (GRATIS)
                    </div>
                    <div className="space-y-1 mt-0.5 font-bold">
                      {currentOrder.items.filter(i => i.isBonification).map(item => (
                        <div key={`bon-${item.id}`} className="flex items-start gap-1 text-[12px] text-black">
                          <span className="flex-1 min-w-0 pr-1 break-all leading-tight">[BONIF] {item.product.name}</span>
                          <span className="w-10 shrink-0 text-center font-black">x{item.quantity}</span>
                          <span className="w-12 shrink-0 text-right text-[10px]">0.00</span>
                          <span className="w-14 shrink-0 text-right font-black text-[10px]">GRATIS</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-b border-black my-1.5" />

                {(() => {
                  const regularItems = currentOrder.items.filter(i => !i.isBonification)
                  const subtotal = regularItems.reduce((acc, i) => acc + i.unitPrice * (i.deliveredQuantity ?? i.quantity), 0)
                  const discountVal = Number(currentOrder.discount || 0)
                  const finalTotal = Math.max(0, subtotal - discountVal)
                  return (
                    <div className="space-y-0.5 text-[12px] font-bold">
                      {discountVal > 0 && (
                        <>
                          <div className="flex justify-between text-black">
                            <span>subtotal:</span>
                            <span>Bs. {subtotal.toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </div>
                          <div className="flex justify-between font-black text-black">
                            <span>descuento:</span>
                            <span>-Bs. {discountVal.toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </div>
                          <div className="border-b border-dashed border-black my-1" />
                        </>
                      )}
                      <div className="flex justify-between font-black text-[14px] pt-0.5">
                        <span>total:</span>
                        <span>Bs. {finalTotal.toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    </div>
                  )
                })()}

                {currentOrder.notes && (
                  <div className="mt-2 border-t border-dashed border-black pt-1 text-[11px] text-black font-bold">
                    <span className="font-black">obs:</span> {currentOrder.notes}
                  </div>
                )}

                <div className="border-b border-black my-2" />
                <div className="text-center pb-1 text-[12px] font-bold lowercase">
                  gracias por su compra
                </div>

                <div className="text-center my-3 text-[10px] text-emerald-700 font-black tracking-widest bg-emerald-50 py-1 border border-dashed border-emerald-300 rounded">
                  ✂️ CORTE AUTOMÁTICO DE PAPEL AQUÍ ✂️
                </div>
              </div>
            </div>
          ) : (
            /* Vista Continua de Todo el Lote */
            <div
              id="batch-thermal-container"
              ref={printAreaRef}
              style={{ fontFamily: "'Calibri', 'Segoe UI', Arial, sans-serif" }}
              className={`bg-white shadow-md p-4 transition-all duration-200 ${
                printerMode === '80mm'
                  ? 'w-[280px]'
                  : printerMode === '58mm'
                  ? 'w-[200px]'
                  : 'w-[500px]'
              } text-[13px] font-semibold leading-snug select-text`}
            >
              {includeSummary && (
                <div className="batch-receipt-item pb-4 mb-6 border-b-2 border-dashed border-black">
                  <div className="text-center pb-2">
                    <h4 className="font-black text-[15px] tracking-wide">DISTRIBUIDORA LUNOVA</h4>
                    <p className="text-[12px] font-bold text-black mt-0.5">contacto: 74347987</p>
                    <p className="text-[12px] font-black text-black mt-0.5">
                      === RESUMEN / MANIFIESTO DE RUTA ===
                    </p>
                    <div className="border-b-2 border-dashed border-black my-2" />
                  </div>

                  <div className="space-y-1 mb-2 text-[12px] font-bold">
                    <div className="flex justify-between">
                      <span>FECHA:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HORA IMPRESIÓN:</span>
                      <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex justify-between font-black">
                      <span>TOTAL PEDIDOS:</span>
                      <span>{orders.length}</span>
                    </div>
                    <div className="flex justify-between font-black">
                      <span>TOTAL BULTOS/UNDS:</span>
                      <span>{totalBultosGeneral}</span>
                    </div>
                    <div className="flex justify-between font-black text-[14px] text-black pt-1 border-t border-black">
                      <span>TOTAL A COBRAR:</span>
                      <span>Bs. {totalCobrarGeneral.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-b border-black my-2" />
                  <div className="font-black text-[12px] pb-1">CARGA POR PRODUCTO:</div>
                  <div className="space-y-1 text-[12px]">
                    {Object.entries(productSummary).map(([name, data]) => (
                      <div key={name} className="flex justify-between items-start">
                        <span className="flex-1">
                          <strong>{data.regular}x</strong> {name}
                          {data.bonif > 0 && <span className="text-black"> (+{data.bonif} bonif)</span>}
                        </span>
                        <span className="font-black">{(data.regular + data.bonif)} bultos</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-b-2 border-dashed border-black my-3" />
                  <div className="text-center text-[11px] font-black">
                    - - - - - - INICIO DE BOLETAS INDIVIDUALES - - - - - -
                  </div>
                </div>
              )}

              {orders.map((order) => {
                const regularItems = order.items.filter(i => !i.isBonification)
                const bonifItems = order.items.filter(i => i.isBonification)
                const discountVal = Number(order.discount || 0)
                const subtotal = regularItems.reduce(
                  (acc, i) => acc + i.unitPrice * (i.deliveredQuantity ?? i.quantity),
                  0
                )
                const finalTotal = Math.max(0, subtotal - discountVal)

                return (
                  <div key={order.id} className="batch-receipt-item pb-4 mb-6 relative">
                    <div className="flex justify-between items-center bg-slate-100 px-3 py-1.5 mb-2 rounded border border-slate-200 no-print">
                      <span className="text-[11px] font-bold text-slate-700">Pedido #{order.id} — {order.client.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOrder(order.id)}
                        className="text-[11px] font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                        title="Quitar este pedido de la tirada"
                      >
                        <span>🗑️</span>
                        <span>Quitar boleta</span>
                      </button>
                    </div>
                    <div className="text-center pb-2">
                      <h4 className="font-black text-[15px] tracking-wide">DISTRIBUIDORA LUNOVA</h4>
                      <p className="text-[12px] font-bold text-black mt-0.5">contacto: 74347987</p>
                      <div className="border-b border-black my-1.5" />
                    </div>

                    <div className="space-y-1 mb-2 font-bold text-[12px]">
                      <div className="font-black">pedido #{order.id}</div>
                      <div><span className="font-black">vendedor:</span> {order.preventista?.name || order.distributor?.name || 'Distribución'}</div>
                      <div>
                        <span className="font-black">fecha entrega:</span>{' '}
                        {(() => {
                          const d = order.deliveredAt ? new Date(order.deliveredAt) : new Date(order.createdAt)
                          return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
                        })()}
                      </div>
                      <div><span className="font-black">cliente:</span> {order.client.name}</div>
                      {order.client.phone && <div><span className="font-black">contacto:</span> {order.client.phone}</div>}
                      {order.client.address && <div><span className="font-black">direccion:</span> {order.client.address}</div>}
                    </div>

                    <div className="border-b border-black my-1.5" />

                    <div className="flex justify-between font-black text-[12px] pb-1 border-b border-black">
                      <span className="flex-1 min-w-0 pr-1">Descripcion</span>
                      <span className="w-10 text-center">CANT</span>
                      <span className="w-12 text-right">P.U</span>
                      <span className="w-14 text-right">total&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </div>

                    <div className="py-1 space-y-1">
                      {regularItems.map(item => {
                        const qty = item.deliveredQuantity ?? item.quantity
                        return (
                          <div key={item.id} className="flex items-start gap-1 text-[12px] font-bold">
                            <span className="flex-1 min-w-0 pr-1 break-all leading-tight">{item.product.name}</span>
                            <span className="w-10 shrink-0 text-center font-black">x{qty}</span>
                            <span className="w-12 shrink-0 text-right">{item.unitPrice.toFixed(2)}</span>
                            <span className="w-14 shrink-0 text-right font-black">
                              {(item.unitPrice * qty).toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                          </div>
                        )
                      })}
                    </div>

                    {bonifItems.length > 0 && (
                      <div className="my-1 border-t border-dashed border-black pt-1">
                        <div className="text-[11px] font-black tracking-wide text-black">
                          🎁 BONIFICACIONES (GRATIS)
                        </div>
                        <div className="space-y-1 mt-0.5 font-bold">
                          {bonifItems.map(item => (
                            <div key={`bon-${item.id}`} className="flex items-start gap-1 text-[12px] text-black">
                              <span className="flex-1 min-w-0 pr-1 break-all leading-tight">[BONIF] {item.product.name}</span>
                              <span className="w-10 shrink-0 text-center font-black">x{item.quantity}</span>
                              <span className="w-12 shrink-0 text-right text-[10px]">0.00</span>
                              <span className="w-14 shrink-0 text-right font-black text-[10px]">GRATIS</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="border-b border-black my-1.5" />

                    <div className="space-y-0.5 text-[12px] font-bold">
                      {discountVal > 0 && (
                        <>
                          <div className="flex justify-between text-black">
                            <span>subtotal:</span>
                            <span>Bs. {subtotal.toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </div>
                          <div className="flex justify-between font-black text-black">
                            <span>descuento:</span>
                            <span>-Bs. {discountVal.toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                          </div>
                          <div className="border-b border-dashed border-black my-1" />
                        </>
                      )}
                      <div className="flex justify-between font-black text-[14px] pt-0.5">
                        <span>total:</span>
                        <span>Bs. {finalTotal.toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      </div>
                    </div>

                    {order.notes && (
                      <div className="mt-2 border-t border-dashed border-black pt-1 text-[11px] text-black font-bold">
                        <span className="font-black">obs:</span> {order.notes}
                      </div>
                    )}

                    <div className="border-b border-black my-2" />
                    <div className="text-center pb-1 text-[12px] font-bold lowercase">
                      gracias por su compra
                    </div>

                    <div className="text-center my-3 text-[10px] text-gray-600 font-bold tracking-widest">
                      - - - - - - - ✂️ CORTE TICKET #{order.id} - - - - - - -
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Barra de Acciones Inferior */}
        <div className="bg-white p-3.5 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 no-print">
          <button
            onClick={handleCopyText}
            className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <span>{copied ? '✅' : '📋'}</span>
            <span>{copied ? '¡Texto Copiado!' : 'Copiar todo el texto'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors"
            >
              Cerrar
            </button>

            {viewMode === 'all' && (
              <button
                onClick={handlePrintAllContinuous}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>🖨️</span>
                <span>Imprimir Todo Continuo ({orders.length})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
