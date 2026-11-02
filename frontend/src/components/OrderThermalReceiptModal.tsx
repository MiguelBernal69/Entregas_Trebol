import { useState, useRef } from 'react'
import type { Order } from '../types'

interface OrderThermalReceiptModalProps {
  order: Order | null
  onClose: () => void
}

export default function OrderThermalReceiptModal({ order, onClose }: OrderThermalReceiptModalProps) {
  const [printerMode, setPrinterMode] = useState<'80mm' | '58mm'>('80mm')
  const [copied, setCopied] = useState(false)
  const printAreaRef = useRef<HTMLDivElement>(null)

  if (!order) return null

  const regularItems = order.items.filter(i => !i.isBonification)
  const bonifItems = order.items.filter(i => i.isBonification)
  const discountVal = Number(order.discount || 0)
  const subtotal = regularItems.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0)
  const finalTotal = Math.max(0, subtotal - discountVal)
  // Texto térmico para Bluetooth / RawBT / Portapapeles
  const generateReceiptText = (width: '80mm' | '58mm'): string => {
    const colWidth = width === '80mm' ? 44 : 32
    const divider = '-'.repeat(colWidth)

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
      lines.push('Descripcion         CANT  P.U  total.')
    } else {
      lines.push('Descripcion                    CANT   P.U    total.')
    }
    lines.push(divider)

    for (const it of regularItems) {
      const cant = `x${it.quantity}`
      const price = it.unitPrice.toFixed(2)
      const subt = (it.unitPrice * it.quantity).toFixed(2)
      const maxLen = width === '58mm' ? 16 : 26

      lines.push(
        `${it.product.name.substring(0, maxLen).padEnd(maxLen)} ${cant.padStart(4)} ${price.padStart(5)} ${subt.padStart(6)}`
      )
    }

    // Solo si el pedido tiene bonificaciones
    if (bonifItems.length > 0) {
      lines.push(divider)
      lines.push('*** BONIFICACIONES (GRATIS) ***')
      for (const it of bonifItems) {
        lines.push(`[BONIF] ${it.product.name} x${it.quantity} (GRATIS) `)
      }
    }

    lines.push(divider)
    // Solo si el pedido tiene descuento
    if (discountVal > 0) {
      lines.push(row('subtotal:', `Bs. ${subtotal.toFixed(2)}.`))
      lines.push(row('descuento:', `-Bs. ${discountVal.toFixed(2)}.`))
      lines.push(divider)
    }

    lines.push(row('total:', `Bs. ${finalTotal.toFixed(2)}.`))
    lines.push(divider)

    if (order.notes) {
      lines.push(`obs: ${order.notes}`)
      lines.push(divider)
    }

    lines.push(center('gracias por su compra'))
    lines.push('')
    lines.push('')
    return lines.join('\n')
  }

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generateReceiptText(printerMode))
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // fallback
    }
  }

  const checkIsElectron = () => typeof window !== 'undefined' && !!window.electronAPI?.isElectron

  // Genera HTML completo y auto-contenido para imprimir en iframe
  const generatePrintHtml = (): string => {
    const dateToUse = order.deliveredAt ? new Date(order.deliveredAt) : new Date(order.createdAt)
    const dateFormatted = `${dateToUse.toLocaleDateString()} ${dateToUse.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

    const itemRows = regularItems.map(it => `
      <tr>
        <td style="word-break:break-word">${it.product.name}</td>
        <td align="center" style="font-weight:900;width:34px">x${it.quantity}</td>
        <td align="right" style="width:46px">${it.unitPrice.toFixed(2)}</td>
        <td align="right" style="font-weight:900;width:52px;padding-right:2px">${(it.unitPrice * it.quantity).toFixed(2)}</td>
      </tr>`).join('')

    const bonifSection = bonifItems.length > 0 ? `
      <div style="border-bottom:1px dashed #000;margin:6px 0"></div>
      <div style="font-size:11px;font-weight:900">🎁 BONIFICACIONES (GRATIS)</div>
      ${bonifItems.map(it => `
        <div style="display:flex;justify-content:space-between;font-size:12px;padding-right:2px">
          <span>[BONIF] ${it.product.name}</span>
          <span style="font-weight:900">x${it.quantity} GRATIS</span>
        </div>`).join('')}` : ''

    const discountSection = discountVal > 0 ? `
      <div style="display:flex;justify-content:space-between;font-size:12px;padding-right:2px">
        <span>subtotal:</span><span>Bs. ${subtotal.toFixed(2)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-weight:900;font-size:12px;padding-right:2px">
        <span>descuento:</span><span>-Bs. ${discountVal.toFixed(2)}</span>
      </div>
      <div style="border-bottom:1px dashed #000;margin:6px 0"></div>` : ''

    return `<!DOCTYPE html><html><head><meta charset="utf-8">
      <style>
        @page { size: ${printerMode === '80mm' ? '80mm' : '58mm'} auto; margin: 0; }
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; width: 100%; }
        body { font-family: 'Calibri','Segoe UI',Arial,sans-serif; font-size:13px; font-weight:700;
               line-height:1.25; margin: 0 auto; padding: 1mm 5mm 0 5mm;
               color:#000; width: ${printerMode === '80mm' ? '80mm' : '58mm'}; max-width: ${printerMode === '80mm' ? '80mm' : '58mm'}; }
        .text-center { text-align:center; }
        .border-b { border-bottom:1px solid #000; margin:5px 0; }
        .bold { font-weight:900; }
        .flex { display:flex; justify-content:space-between; align-items:baseline; }
        .items-table { width:100%; border-collapse:collapse; margin:4px 0; table-layout:fixed; }
        .items-table th,.items-table td { padding:1.5px 0; vertical-align:top; font-size:12px; font-weight:700; }
        .items-table th { border-bottom:1px solid #000; font-weight:900; }
        .feed-space { height: 8mm; min-height: 8mm; line-height: 8mm; font-size: 1px; }
      </style></head><body>
      <div class="text-center">
        <div style="font-size:16px;font-weight:900">DISTRIBUIDORA LUNOVA</div>
        <div style="font-size:12px">contacto: 74347987</div>
        <div class="border-b"></div>
      </div>
      <div style="font-size:12px">
        <div class="bold">pedido #${order.id}</div>
        <div><span class="bold">vendedor:</span> ${order.preventista?.name || order.distributor?.name || 'Distribución'}</div>
        <div><span class="bold">fecha entrega:</span> ${dateFormatted}</div>
        <div><span class="bold">cliente:</span> ${order.client.name}</div>
        ${order.client.phone ? `<div><span class="bold">contacto:</span> ${order.client.phone}</div>` : ''}
        ${order.client.address ? `<div><span class="bold">direccion:</span> ${order.client.address}</div>` : ''}
      </div>
      <div class="border-b"></div>
      <table class="items-table">
        <thead><tr>
          <th align="left" style="width:auto">Descripcion</th>
          <th align="center" style="width:32px">CANT</th>
          <th align="right" style="width:44px">P.U</th>
          <th align="right" style="width:48px;padding-right:2px">total </th>
        </tr></thead>
        <tbody>${itemRows} .</tbody>
      </table>
      ${bonifSection}
      <div class="border-b"></div>
      ${discountSection}
      <div class="flex bold" style="font-size:15px;margin-top:3px;padding-right:2px">
        <span>total:</span><span>Bs. ${finalTotal.toFixed(2)}</span>
      </div>
      ${order.notes ? `<div class="border-b" style="border-style:dashed;margin-top:4px"></div>
        <div style="font-size:11px"><span class="bold">obs:</span> ${order.notes}</div>` : ''}
      <div class="border-b"></div>
      <div class="text-center" style="font-size:12px;margin-top:6px">gracias por su compra</div>
      <div style="text-align:center;font-size:9px;margin-top:4px;letter-spacing:3px;color:#333">- - - - - - - - - - - - - - -</div>
      <div class="feed-space">&nbsp;</div>
    </body></html>`
  }

  const handlePrint = () => {
    if (checkIsElectron() && window.electronAPI) {
      window.electronAPI.printEscpos([order]).then(res => {
        if (!res.ok) alert(`Error de impresión:\n${res.error}`)
      })
      return
    }
    // Chrome: usar iframe con srcdoc para evitar impresión en blanco.
    // window.print() con @media print en JSX puede fallar si Chrome no procesa
    // los estilos inyectados dentro del componente (fuera de <head>).
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
      setTimeout(() => {
        try { document.body.removeChild(iframe) } catch (_) {}
      }, 2000)
    }

    iframe.srcdoc = generatePrintHtml()
    document.body.appendChild(iframe)
  }


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      {/* Estilos para impresión térmica con fuente Calibri y ancho seguro contra cortes */}
      <style>{`
        @media print {
          @page {
            size: ${printerMode === '80mm' ? '80mm auto' : '58mm auto'};
            margin: 0;
          }
          body * {
            visibility: hidden;
          }
          #thermal-print-container, #thermal-print-container * {
            visibility: visible;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #thermal-print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: ${printerMode === '80mm' ? '80mm' : '58mm'} !important;
            max-width: ${printerMode === '80mm' ? '80mm' : '58mm'} !important;
            padding: 7mm 5mm 0 5mm !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
            background: white !important;
            color: black !important;
            font-family: 'Calibri', 'Segoe UI', Arial, sans-serif !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            line-height: 1.25 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[95vh] border border-gray-100">
        {/* Cabecera del modal */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between no-print">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🖨️</span>
              <h3 className="font-bold text-base">Boleta Térmica de Entrega</h3>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Compatible con Epson TM-T20III (80mm) y Bluetooth (58mm)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Selector de Impresora */}
        <div className="bg-slate-100 p-3 flex items-center justify-between gap-2 border-b border-slate-200 no-print">
          <span className="text-xs font-semibold text-slate-600">Formato:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPrinterMode('80mm')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                printerMode === '80mm'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>🖨️ Epson TM-T20III (80mm)</span>
              <span className="text-[10px] bg-blue-700 text-blue-100 px-1.5 py-0.2 rounded-full font-normal">
                POS
              </span>
            </button>
            <button
              onClick={() => setPrinterMode('58mm')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                printerMode === '58mm'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>📱 Bluetooth (58mm)</span>
            </button>
          </div>
        </div>

        {/* Vista Previa del Ticket Térmico */}
        <div className="p-4 overflow-y-auto flex-1 bg-slate-200/60 flex justify-center">
          <div
            id="thermal-print-container"
            ref={printAreaRef}
            style={{ fontFamily: "'Calibri', 'Segoe UI', Arial, sans-serif" }}
            className={`bg-white shadow-md p-4 text-black border border-slate-300 transition-all ${
              printerMode === '80mm' ? 'w-[280px]' : 'w-[200px]'
            } text-[13px] font-semibold leading-snug select-text`}
          >
            {/* Cabecera */}
            <div className="text-center pb-2">
              <h4 className="font-black text-[15px] tracking-wide">DISTRIBUIDORA LUNOVA</h4>
              <p className="text-[12px] font-bold text-black mt-0.5">contacto: 74347987</p>
              <div className="border-b border-black my-1.5" />
            </div>

            {/* Datos del Pedido */}
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

            {/* Encabezado de Productos */}
            <div className="flex justify-between font-black text-[12px] pb-1 border-b border-black">
              <span className="flex-1 min-w-0 pr-1">Descripcion</span>
              <span className="w-8 text-center">CANT</span>
              <span className="w-11 text-right">P.U</span>
              <span className="w-12 text-right pr-0.5">total&nbsp;&nbsp;&nbsp;</span>
            </div>

            {/* Items Regulares */}
            <div className="py-1 space-y-1">
              {regularItems.map(item => (
                <div key={item.id} className="flex items-start gap-1 text-[12px] font-bold">
                  <span className="flex-1 min-w-0 pr-1 break-all leading-tight">{item.product.name} </span>
                  <span className="w-8 shrink-0 text-center font-black">x{item.quantity}</span>
                  <span className="w-11 shrink-0 text-right">{item.unitPrice.toFixed(2)}</span>
                  <span className="w-12 shrink-0 text-right font-black pr-0.5">
                    {(item.unitPrice * item.quantity).toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                </div>
              ))}
            </div>

            {/* Bonificaciones */}
            {bonifItems.length > 0 && (
              <div className="my-1 border-t border-dashed border-black pt-1">
                <div className="text-[11px] font-black tracking-wide text-black">
                  🎁 BONIFICACIONES (GRATIS)
                </div>
                <div className="space-y-1 mt-0.5 font-bold">
                  {bonifItems.map(item => (
                    <div key={`bon-${item.id}`} className="flex items-start gap-1 text-[12px] text-black pr-0.5">
                      <span className="flex-1 min-w-0 pr-1 break-all leading-tight">[BONIF] {item.product.name}</span>
                      <span className="w-8 shrink-0 text-center font-black">x{item.quantity}</span>
                      <span className="w-11 shrink-0 text-right text-[10px]">0.00</span>
                      <span className="w-12 shrink-0 text-right font-black text-[10px]">GRATIS</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-b border-black my-1.5" />

            {/* Totales y Descuentos */}
            <div className="space-y-0.5 text-[12px] font-bold">
              {discountVal > 0 && (
                <>
                  <div className="flex justify-between text-black pr-0.5">
                    <span>subtotal:</span>
                    <span>Bs. {subtotal.toFixed(2)}&nbsp;&nbsp;&nbsp;</span>
                  </div>
                  <div className="flex justify-between font-black text-black pr-0.5">
                    <span>descuento:</span>
                    <span>-Bs. {discountVal.toFixed(2)}&nbsp;&nbsp;&nbsp;</span>
                  </div>
                  <div className="border-b border-dashed border-black my-1" />
                </>
              )}
              <div className="flex justify-between font-black text-[15px] pt-0.5 pr-0.5">
                <span>total:</span>
                <span>Bs. {finalTotal.toFixed(2)}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
            </div>

            {order.notes && (
              <div className="mt-2 border-t border-dashed border-black pt-1 text-[11px] text-black font-bold">
                <span className="font-black">obs:</span> {order.notes}
              </div>
            )}

            <div className="border-t border-black my-2" />

            <div className="text-center pb-1 text-[12px] font-bold lowercase">
              gracias por su compra
            </div>
            {/* Espacio para corte */}
            <div style={{ height: '40mm' }} />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 no-print">
          <button
            onClick={handleCopyText}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-green-600 font-bold">¡Texto Copiado!</span>
              </>
            ) : (
              <>
                <span>📋</span>
                <span>Copiar Texto Térmico</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cerrar
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-2 transition-colors"
            >
              <span>🖨️</span>
              <span>Imprimir en {printerMode === '80mm' ? 'Epson TM-T20III' : 'Bluetooth'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
