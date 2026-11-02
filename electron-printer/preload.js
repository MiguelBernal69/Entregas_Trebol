const { contextBridge, ipcRenderer } = require('electron')

// Expone la API de impresión al contexto web (React)
// Disponible como window.electronAPI en la app
contextBridge.exposeInMainWorld('electronAPI', {
  // Imprimir una o varias boletas con corte automático
  printEscpos: (orders) => ipcRenderer.invoke('print-escpos', orders),

  // Listar impresoras USB Epson disponibles
  listPrinters: () => ipcRenderer.invoke('list-printers'),

  // Indica que estamos dentro de Electron (para que React lo detecte)
  isElectron: true,
})
