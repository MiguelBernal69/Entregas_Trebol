const { spawn } = require('node:child_process')
const path = require('node:path')

function printReceiptGdi(printerName, order) {
  return new Promise((resolve, reject) => {
    const child = spawn('powershell.exe', [
      '-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass',
      '-File', path.join(__dirname, 'send-gdi.ps1'), '-PrinterName', printerName,
    ], { windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] })
    let errorOutput = ''
    child.stderr.setEncoding('utf8')
    child.stderr.on('data', chunk => { errorOutput += chunk })
    child.on('error', reject)
    child.on('close', code => code === 0 ? resolve() : reject(new Error(errorOutput.trim() || `Impresión fallida (${code})`)))
    child.stdin.on('error', reject)
    child.stdin.end(Buffer.from(JSON.stringify(order), 'utf8').toString('base64'))
  })
}

module.exports = { printReceiptGdi }
