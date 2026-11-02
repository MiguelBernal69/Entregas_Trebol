import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/AuthContext'
import { MapContainer, TileLayer, Polygon, Popup, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import '@geoman-io/leaflet-geoman-free'
import { getRegions, createRegion, deleteRegion, recalculateRegions } from '../../api/regions'
import { getClients } from '../../api/clients'
import type { Client } from '../../types'

// Arreglar ícono por defecto de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

// Ícono simple para referencia de clientes
const clientIcon = L.divIcon({
  className: '',
  html: `<div style="width:12px;height:12px;border-radius:50%;background:#D1D5DB;border:2px solid white;box-shadow:0 1px 2px rgba(0,0,0,0.3)"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
})

function GeomanControl({ onDrawFinished }: { onDrawFinished: (layer: any) => void }) {
  const map = useMap()
  
  useEffect(() => {
    map.pm.addControls({
      position: 'topleft',
      drawMarker: false,
      drawCircleMarker: false,
      drawPolyline: false,
      drawRectangle: false,
      drawPolygon: true,
      drawCircle: false,
      drawText: false,
      editMode: false,
      dragMode: false,
      cutPolygon: false,
      removalMode: false,
    })

    // Configurar color de dibujo por defecto
    map.pm.setPathOptions({
      color: '#3B82F6',
      fillColor: '#3B82F6',
      fillOpacity: 0.4,
    })

    const handleCreate = (e: any) => {
      onDrawFinished(e.layer)
    }

    map.on('pm:create', handleCreate)

    return () => {
      map.pm.removeControls()
      map.off('pm:create', handleCreate)
    }
  }, [map, onDrawFinished])

  return null
}

const getRandomUniqueColor = (existingColors: string[]) => {
  const letters = '0123456789ABCDEF'
  let color = ''
  do {
    color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
  } while (existingColors.includes(color))
  return color
}

export default function AdminRegions() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const [regions, setRegions] = useState<any[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  // Modal State
  const [pendingLayer, setPendingLayer] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', color: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [recalculating, setRecalculating] = useState(false)
  const [recalcResult, setRecalcResult] = useState<{ clientesAsignados: number; pedidosActualizados: number } | null>(null)

  const fetchData = async () => {
    try {
      const [rData, cData] = await Promise.all([getRegions(), getClients()])
      setRegions(rData)
      setClients(cData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const toLeafletCoords = (coords: number[][]): [number, number][] => {
    return coords.map(c => [c[1], c[0]])
  }

  const handleDrawFinished = (layer: any) => {
    const existingColors = regions.map(r => r.color)
    const newColor = getRandomUniqueColor(existingColors)
    
    setPendingLayer(layer)
    setForm({ name: '', color: newColor })
    setError('')
    setShowModal(true)
  }

  const handleCancelNewRegion = () => {
    if (pendingLayer) {
      pendingLayer.remove() // Quitar el trazo temporal del mapa
    }
    setPendingLayer(null)
    setShowModal(false)
  }

  const handleSaveRegion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pendingLayer || !form.name) return

    setSaving(true)
    setError('')

    try {
      // Obtener coords Leaflet
      const latlngs = pendingLayer.getLatLngs()[0]
      // Convertir a [lng, lat] para GeoJSON
      const coords = latlngs.map((ll: any) => [ll.lng, ll.lat])
      // Cerrar el polígono
      coords.push([latlngs[0].lng, latlngs[0].lat])

      const polygonGeoJson = {
        type: 'Polygon',
        coordinates: [coords]
      }

      await createRegion({
        name: form.name,
        color: form.color,
        polygon: polygonGeoJson
      })

      pendingLayer.remove() // Quitar el pintado temporal local
      setShowModal(false)
      setPendingLayer(null)
      fetchData() // Recargar para ver el definitivo
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Error al guardar la zona')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta zona? No podrás filtrar pedidos por ella.')) return
    try {
      await deleteRegion(id)
      fetchData()
    } catch (err) {
      console.error(err)
    }
  }

  const handleRecalculate = async () => {
    if (!confirm('¿Volver a calcular qué zona corresponde a cada cliente y pedido activo según los polígonos dibujados?')) return
    setRecalculating(true)
    setRecalcResult(null)
    try {
      const result = await recalculateRegions()
      setRecalcResult(result)
      fetchData()
    } catch (err) {
      console.error(err)
    } finally {
      setRecalculating(false)
    }
  }

  return (
    <Layout>
      <div className="flex h-[calc(100vh-6rem)] gap-6">
        
        {/* Panel lateral - Lista de Zonas */}
        <div className="w-80 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">Zonas</h1>
            <p className="text-sm text-gray-500 mt-1">
              {isAdmin ? "Dibuja polígonos en el mapa para organizar los pedidos." : "Zonas de reparto actuales."}
            </p>
            {isAdmin && (
              <div className="mt-3">
                <button
                  onClick={handleRecalculate}
                  disabled={recalculating}
                  className="w-full text-xs font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-700 disabled:opacity-50 border border-indigo-200 rounded-lg px-3 py-2 transition-colors"
                >
                  {recalculating ? 'Recalculando...' : '🔄 Recalcular zonas'}
                </button>
                {recalcResult && (
                  <p className="text-xs text-green-600 mt-2 text-center">
                    ✅ {recalcResult.clientesAsignados} clientes y {recalcResult.pedidosActualizados} pedidos actualizados
                  </p>
                )}
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {loading ? (
              <p className="text-sm text-gray-400">Cargando Zonas...</p>
            ) : regions.length === 0 ? (
              <div className="text-center py-6 text-gray-400 text-sm">
                Aún no hay zonas. {isAdmin && "Usa la herramienta del mapa."}
              </div>
            ) : (
              regions.map(r => (
                <div key={r.id} className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: r.color }}></div>
                    <span className="font-semibold text-gray-800 text-sm">{r.name}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-gray-400">Creado por {r.creatorName}</span>
                    {isAdmin && (
                      <button 
                        onClick={() => handleDelete(r.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mapa */}
        <div className="flex-1 rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative">
          <MapContainer
            center={[-17.3895, -66.1568]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            
            {isAdmin && <GeomanControl onDrawFinished={handleDrawFinished} />}

            {/* Zonas existentes */}
            {regions.map(region => {
              if (!region.polygon?.coordinates) return null
              const coords = toLeafletCoords(region.polygon.coordinates[0])
              return (
                <Polygon
                  key={region.id}
                  positions={coords}
                  pathOptions={{ color: region.color, fillColor: region.color, fillOpacity: 0.25, weight: 2 }}
                >
                  <Popup>{region.name}</Popup>
                </Polygon>
              )
            })}

            {/* Referencia: Marcadores de Clientes */}
            {clients.map(client => {
              if (!client.latitude || !client.longitude) return null
              return (
                <Marker
                  key={client.id}
                  position={[client.latitude, client.longitude]}
                  icon={clientIcon}
                  interactive={false} // Para que no interrumpan al dibujar
                />
              )
            })}
          </MapContainer>
        </div>

      </div>

      {/* Modal Nueva Zona */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Guardar Zona</h2>
            <form onSubmit={handleSaveRegion} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la zona</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej: Zona Norte"
                  required
                  autoFocus
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color asignado</label>
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-lg border border-gray-200" style={{ backgroundColor: form.color }}></div>
                  <input
                    type="text"
                    value={form.color}
                    readOnly
                    className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500 outline-none"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Este color se asignó de forma automática y única.</p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancelNewRegion}
                  className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50"
                >
                  Descartar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium py-2.5 rounded-lg"
                >
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}
