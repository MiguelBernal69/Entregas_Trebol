import type { Order } from '../types'

export type ReceiptPaper = '80mm' | '58mm' | 'a4'

const clover = `<svg width="26" height="28" viewBox="0 0 26 28" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g fill="#000"><circle cx="13" cy="7" r="5"/><circle cx="7" cy="13" r="5"/><circle cx="19" cy="13" r="5"/><rect x="12" y="16" width="2" height="10"/></g></svg>`
export const receiptClovers = `<div class="clovers">${clover}${clover}</div>`

export const receiptCss = `
  .trebol-receipt { box-sizing: border-box; width: 72mm; margin: 0 auto; padding: 1mm 0 0; background: #fff; color: #000; font: 700 14px/1.25 Calibri, 'Segoe UI', Arial, sans-serif; }
  .trebol-receipt * { box-sizing: border-box; }
  .trebol-receipt[data-paper="58mm"] { width: 50mm; font-size: 11px; }
  .trebol-receipt[data-paper="a4"] { width: 72mm; }
  .trebol-receipt .center { text-align: center; }
  .trebol-receipt .brand { font-size: 18px; font-weight: 900; }
  .trebol-receipt .tagline { font-size: 11px; }
  .trebol-receipt .contact { font-size: 12px; }
  .trebol-receipt .rule { border-top: 1px solid #000; margin: 5px 0; }
  .trebol-receipt .details { font-size: 12px; overflow-wrap: anywhere; }
  .trebol-receipt .columns { display: grid; grid-template-columns: 41% 16% 20% 23%; align-items: start; font-size: 13px; }
  .trebol-receipt .columns > span { min-width: 0; }
  .trebol-receipt .columns .name { overflow-wrap: anywhere; }
  .trebol-receipt .columns .qty { text-align: center; white-space: nowrap; }
  .trebol-receipt .columns .price, .trebol-receipt .columns .amount { text-align: right; white-space: nowrap; }
  .trebol-receipt .columns .amount { padding-right: 2ch; }
  .trebol-receipt .table-head { font-weight: 900; border-bottom: 1px solid #000; padding-bottom: 2px; }
  .trebol-receipt .item { padding: 2px 0; }
  .trebol-receipt .bonifications { font-size: 12px; }
  .trebol-receipt .pair { display: flex; justify-content: space-between; gap: 4px; font-size: 12px; }
  .trebol-receipt .pair strong { white-space: nowrap; }
  .trebol-receipt .total { font-size: 15px; font-weight: 900; }
  .trebol-receipt .thanks { text-align: center; font-size: 12px; margin-top: 6px; }
  .trebol-receipt .clovers { display: flex; justify-content: center; gap: 8px; margin-top: 4px; }
  .trebol-receipt .last-rule { border-top: 1px solid #000; margin-top: 4px; }
  .trebol-receipt[data-paper="58mm"] .brand { font-size: 14px; }
  .trebol-receipt[data-paper="58mm"] .tagline { font-size: 9px; }
  .trebol-receipt[data-paper="58mm"] .contact, .trebol-receipt[data-paper="58mm"] .details, .trebol-receipt[data-paper="58mm"] .pair, .trebol-receipt[data-paper="58mm"] .thanks { font-size: 10px; }
  .trebol-receipt[data-paper="58mm"] .columns { grid-template-columns: 40% 17% 20% 23%; font-size: 9px; }
  .trebol-receipt[data-paper="58mm"] .columns .amount { padding-right: 1ch; }
  .trebol-receipt[data-paper="58mm"] .total { font-size: 12px; }
`

export function escapeReceipt(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]!)
}

export function receiptBody(order: Order, paper: ReceiptPaper = '80mm'): string {
  const regular = order.items.filter(item => !item.isBonification)
  const bonus = order.items.filter(item => item.isBonification)
  const subtotal = regular.reduce((sum, item) => sum + item.unitPrice * (item.deliveredQuantity ?? item.quantity), 0)
  const discount = Number(order.discount || 0)
  const total = Math.max(0, subtotal - discount)
  const date = new Date(order.deliveredAt || order.createdAt)
  const dateText = Number.isNaN(date.getTime()) ? '' : `${date.toLocaleDateString('es-BO')} ${date.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })}`
  const seller = order.preventista?.name || order.distributor?.name || 'Distribución'

  return `<div class="trebol-receipt" data-paper="${paper}">
    <div class="center brand">DISTRIBUIDORA TRÉBOL</div>
    <div class="center tagline">Distribuidora y comercio externo</div>
    <div class="center contact">Contacto</div>
    <div class="center contact">73750520-67519917</div>
    <div class="rule"></div>
    <div class="details">
      <div><strong>Pedido #${escapeReceipt(order.id)}</strong></div>
      <div>Vendedor: ${escapeReceipt(seller)}</div>
      ${dateText ? `<div>Fecha entrega: ${escapeReceipt(dateText)}</div>` : ''}
      <div><strong>Cliente: ${escapeReceipt(order.client.name)}</strong></div>
      ${order.client.phone ? `<div>Contacto: ${escapeReceipt(order.client.phone)}</div>` : ''}
      ${order.client.address ? `<div>Dirección: ${escapeReceipt(order.client.address)}</div>` : ''}
    </div>
    <div class="rule"></div>
    <div class="columns table-head"><span class="name">Descripcion</span><span class="qty">CANT</span><span class="price">P.U.</span><span class="amount">total</span></div>
    <div class="rule"></div>
    ${regular.map(item => {
      const qty = item.deliveredQuantity ?? item.quantity
      return `<div class="columns item"><span class="name">${escapeReceipt(item.product.name)}</span><span class="qty">x${escapeReceipt(qty)}</span><span class="price">${item.unitPrice.toFixed(2)}</span><span class="amount">${(item.unitPrice * qty).toFixed(2)}</span></div>`
    }).join('')}
    ${bonus.length ? `<div class="rule"></div><div class="bonifications"><strong>BONIFICACIONES (GRATIS)</strong>${bonus.map(item => `<div class="pair"><span>${escapeReceipt(item.product.name)}</span><strong>x${escapeReceipt(item.quantity)} GRATIS</strong></div>`).join('')}</div>` : ''}
    <div class="rule"></div>
    ${discount > 0 ? `<div class="pair"><span>Subtotal:</span><strong>Bs ${subtotal.toFixed(2)}</strong></div><div class="pair"><span>Descuento:</span><strong>-Bs ${discount.toFixed(2)}</strong></div>` : ''}
    <div class="pair total"><span>TOTAL:</span><strong>Bs ${total.toFixed(2)}</strong></div>
    ${order.notes ? `<div class="rule"></div><div class="details">Obs: ${escapeReceipt(order.notes)}</div>` : ''}
    <div class="rule"></div>
    <div class="thanks">Gracias por su compra</div>
    ${receiptClovers}
    <div class="last-rule"></div>
  </div>`
}

export function receiptDocument(order: Order, paper: ReceiptPaper = '80mm'): string {
  const page = paper === '58mm' ? '58mm auto' : paper === 'a4' ? 'A4 portrait' : '80mm auto'
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Boleta Pedido #${escapeReceipt(order.id)}</title><style>
    @page { size: ${page}; margin: 0; }
    html, body { margin: 0; padding: 0; background: white; }
    ${receiptCss}
  </style></head><body>${receiptBody(order, paper)}</body></html>`
}

export function receiptText(order: Order, paper: ReceiptPaper = '80mm'): string {
  const narrow = paper === '58mm'
  const widths = narrow ? [12, 4, 7, 9] : [21, 5, 8, 10]
  const totalWidth = widths.reduce((sum, width) => sum + width, 0)
  const rule = '-'.repeat(totalWidth)
  const center = (value: string) => value.padStart(Math.floor((totalWidth + value.length) / 2))
  const row = (name: string, qty: string, price: string, amount: string) =>
    name.slice(0, widths[0]).padEnd(widths[0]) +
    qty.padStart(widths[1]) + price.padStart(widths[2]) + amount.padStart(widths[3] - 2) + '  '
  const regular = order.items.filter(item => !item.isBonification)
  const bonus = order.items.filter(item => item.isBonification)
  const subtotal = regular.reduce((sum, item) => sum + item.unitPrice * (item.deliveredQuantity ?? item.quantity), 0)
  const discount = Number(order.discount || 0)
  const date = new Date(order.deliveredAt || order.createdAt)
  const lines = [center('DISTRIBUIDORA TRÉBOL'), center('Distribuidora y comercio externo'), center('Contacto'), center('73750520-67519917'), rule]
  lines.push(`Pedido #${order.id}`)
  lines.push(`Vendedor: ${order.preventista?.name || order.distributor?.name || 'Distribución'}`)
  if (!Number.isNaN(date.getTime())) lines.push(`Fecha entrega: ${date.toLocaleString('es-BO')}`)
  lines.push(`Cliente: ${order.client.name}`)
  if (order.client.phone) lines.push(`Contacto: ${order.client.phone}`)
  if (order.client.address) lines.push(`Dirección: ${order.client.address}`)
  lines.push(rule, row('Descripcion', 'CANT', 'P.U.', 'total'), rule)
  for (const item of regular) {
    const qty = item.deliveredQuantity ?? item.quantity
    const name = item.product.name
    lines.push(row(name, `x${qty}`, item.unitPrice.toFixed(2), (item.unitPrice * qty).toFixed(2)))
    for (let i = widths[0]; i < name.length; i += widths[0]) lines.push(name.slice(i, i + widths[0]))
  }
  if (bonus.length) {
    lines.push(rule, 'BONIFICACIONES (GRATIS)')
    for (const item of bonus) lines.push(`${item.product.name} x${item.quantity} GRATIS`)
  }
  lines.push(rule)
  if (discount > 0) {
    lines.push(`Subtotal: Bs ${subtotal.toFixed(2)}`)
    lines.push(`Descuento: -Bs ${discount.toFixed(2)}`)
  }
  lines.push(`TOTAL: Bs ${Math.max(0, subtotal - discount).toFixed(2)}`)
  if (order.notes) lines.push(`Obs: ${order.notes}`)
  lines.push(rule, center('Gracias por su compra'), center('☘   ☘'), rule)
  return lines.join('\n')
}
