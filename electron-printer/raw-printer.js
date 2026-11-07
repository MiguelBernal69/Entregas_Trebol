const { spawn } = require('node:child_process')
const path = require('node:path')
const { app } = require('electron')

const WIDTH = 42

function plain(value) {
  return String(value ?? '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7e]/g, ' ')
    .replace(/\s+/g, ' ').trim()
}

function wrap(value, width = WIDTH) {
  const words = plain(value).split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    if (line && line.length + word.length + 1 > width) {
      lines.push(line)
      line = ''
    }
    if (word.length > width) {
      if (line) lines.push(line)
      for (let i = 0; i < word.length; i += width) lines.push(word.slice(i, i + width))
    } else {
      line = line ? `${line} ${word}` : word
    }
  }
  if (line) lines.push(line)
  return lines
}

function pair(left, right) {
  const a = plain(left)
  const b = plain(right)
  if (a.length + b.length >= WIDTH) return [...wrap(a, WIDTH), b.padStart(WIDTH)]
  return [a + ' '.repeat(WIDTH - a.length - b.length) + b]
}

function center(value) {
  const text = plain(value)
  return text.padStart(Math.floor((WIDTH + text.length) / 2))
}

function receiptBytes(order) {
  if (!order || !Array.isArray(order.items) || !order.client) throw new Error('Pedido incompleto para imprimir')
  const regular = order.items.filter(item => !item.isBonification)
  const bonus = order.items.filter(item => item.isBonification)
  const subtotal = regular.reduce((sum, item) => sum + Number(item.unitPrice) * Number(item.deliveredQuantity ?? item.quantity), 0)
  const discount = Number(order.discount || 0)
  const date = new Date(order.deliveredAt || order.createdAt)
  const lines = []
  const add = value => lines.push(...wrap(value))
  const separator = '-'.repeat(WIDTH)

  lines.push(center('DISTRIBUIDORA TREBOL'), center('Distribución y comercio externo'), center('Contacto'), center('73750520-67519917'), separator)
  add(`Pedido #${order.id}`)
  add(`Vendedor: ${order.preventista?.name || order.distributor?.name || 'Distribucion'}`)
  if (!Number.isNaN(date.getTime())) add(`Fecha: ${date.toLocaleString('es-BO')}`)
  add(`Cliente: ${order.client.name}`)
  if (order.client.phone) add(`Contacto: ${order.client.phone}`)
  if (order.client.address) add(`Direccion: ${order.client.address}`)
  lines.push(separator)

  for (const item of regular) {
    const quantity = Number(item.deliveredQuantity ?? item.quantity)
    add(item.product?.name || 'Producto')
    lines.push(...pair(`  ${quantity} x Bs ${Number(item.unitPrice).toFixed(2)}`, `Bs ${(quantity * Number(item.unitPrice)).toFixed(2)}`))
  }
  if (bonus.length) {
    lines.push(separator, 'BONIFICACIONES')
    for (const item of bonus) add(`${item.product?.name || 'Producto'} x${item.quantity} GRATIS`)
  }
  lines.push(separator)
  if (discount > 0) {
    lines.push(...pair('Subtotal:', `Bs ${subtotal.toFixed(2)}`))
    lines.push(...pair('Descuento:', `-Bs ${discount.toFixed(2)}`))
  }
  lines.push(...pair('TOTAL:', `Bs ${Math.max(0, subtotal - discount).toFixed(2)}`))
  if (order.notes) add(`Obs: ${order.notes}`)
  lines.push(separator, center('Gracias por su compra'))

  // Fuente A y negrita: más legible que la fuente pequeña predeterminada.
  // Un punto extra entre caracteres aprovecha el ancho del rollo de 80 mm.
  // ESC d imprime el búfer y avanza antes del corte; evita que el pie
  // aparezca al comenzar la boleta siguiente.
  return Buffer.concat([
    Buffer.from([0x1b, 0x40, 0x1b, 0x4d, 0x00, 0x1b, 0x45, 0x01, 0x1b, 0x20, 0x01, 0x1b, 0x33, 0x20]),
    Buffer.from(`${lines.join('\n')}\n`, 'ascii'),
    Buffer.from([0x1b, 0x64, 0x03]),
    Buffer.from([0x1d, 0x56, 0x00]),
  ])
}

function sendRaw(printerName, bytes) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(app.isPackaged ? process.resourcesPath : __dirname, 'send-raw.ps1')
    const child = spawn('powershell.exe', [
      '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass',
      '-File', scriptPath, '-PrinterName', printerName,
    ], { windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] })
    let errorOutput = ''
    child.stderr.setEncoding('utf8')
    child.stderr.on('data', chunk => { errorOutput += chunk })
    child.on('error', reject)
    child.on('close', code => code === 0 ? resolve() : reject(new Error(errorOutput.trim() || `Impresión fallida (${code})`)))
    child.stdin.on('error', reject)
    child.stdin.end(bytes.toString('base64'))
  })
}

module.exports = { receiptBytes, sendRaw }
