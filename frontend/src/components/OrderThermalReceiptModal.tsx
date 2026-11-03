import { useState, useRef } from 'react'
import type { Order } from '../types'
import { receiptBody, receiptCss, receiptDocument, receiptText } from './receiptTemplate'

interface OrderThermalReceiptModalProps {
  order: Order | null
  onClose: () => void
}

export default function OrderThermalReceiptModal({ order, onClose }: OrderThermalReceiptModalProps) {
  const [printerMode, setPrinterMode] = useState<'80mm' | '58mm'>('80mm')
  const [copied, setCopied] = useState(false)
  const printAreaRef = useRef<HTMLDivElement>(null)

  if (!order) return null

  const generateReceiptText = (width: '80mm' | '58mm'): string => receiptText(order, width)

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

  const generatePrintHtml = (): string => receiptDocument(order, printerMode)

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
            padding: 2mm 5mm 0 5mm !important;
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
              Compatible con impresora predeterminada (80mm o 58mm)
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
              <span>🖨️ Impresora predeterminada (80mm)</span>
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

        {/* La vista previa usa el mismo formato que se envía a Chrome. */}
        <div className="p-4 overflow-y-auto flex-1 bg-slate-200/60 flex justify-center">
          <style>{receiptCss}</style>
          <div ref={printAreaRef} className="bg-white shadow-md border border-slate-300" dangerouslySetInnerHTML={{ __html: receiptBody(order, printerMode) }} />
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
              <span>Imprimir en {printerMode === '80mm' ? 'impresora predeterminada' : 'Bluetooth'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
