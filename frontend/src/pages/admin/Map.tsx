import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import { getOrdersMap } from '../../api/orders'
import { getOrder } from '../../api/orders'
import { getRegions } from '../../api/regions'
import L from 'leaflet'
import type { Order } from '../../types'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

const statusColor: Record<string, string> = {
  pendiente: '#EAB308',
  aceptado:  '#3B82F6',
  asignado:  '#8B5CF6',
  entregado: '#22C55E'
}

const statusLabel: Record<string, string> = {
  pendiente: 'Pendiente',
  aceptado:  'Aceptado',
  asignado:  'Asignado',
  entregado: 'Entregado'
}

const statusBadge: Record<string, string> = {
  pendiente: 'bg-yellow-100 text-yellow-700',
  aceptado:  'bg-blue-100 text-blue-700',
  asignado:  'bg-purple-100 text-purple-700',
  entregado: 'bg-green-100 text-green-700'
}

// Icono tipo pin/flecha por color
const createPinIcon = (color: string) => L.divIcon({
  className: '',
  html: `
    <div style="position:relative; width:28px; height:36px;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="28" height="36">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20S24 21 24 12C24 5.373 18.627 0 12 0z"
          fill="${color}" stroke="white" stroke-width="1.5"/>
        <circle cx="12" cy="12" r="5" fill="white"/>
      </svg>
    </div>
  `,
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -36]
})

export default function AdminMap() {
  const [orders, setOrders] = useState<any[]>([])
  const [regions, setRegions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersData, regionsData] = await Promise.all([getOrdersMap(), getRegions()])
        setOrders(ordersData)
        setRegions(regionsData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleMarkerClick = async (orderId: number) => {
    setSelectedOrder(null)
    setLoadingDetail(true)
    try {
      const data = await getOrder(orderId)
      setSelectedOrder(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingDetail(false)
    }
  }

  const toLeafletCoords = (coords: number[][]): [number, number][] => {
    return coords.map(c => [c[1], c[0]])
  }

  if (loading) return (
    <Layout>
      <div className="flex items-center justify-center h-64 text-gray-500">Cargando mapa...</div>
    </Layout>
  )

  return (
    <Layout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mapa de pedidos</h1>
          <p className="text-gray-500 text-sm mt-1">Haz clic en un marcador para ver el detalle</p>
        </div>

        {/* Leyenda */}
        <div className="flex flex-wrap gap-4 text-sm">
          {Object.entries(statusLabel).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: statusColor[key] }}></div>
              <span className="text-gray-600">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4" style={{ height: '600px' }}>
          {/* Mapa */}
          <div className={`rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all ${selectedOrder ? 'flex-1' : 'w-full'}`}>
            <MapContainer
              center={[-17.3895, -66.1568]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
              />

              {/* Polígonos de regiones */}
              {regions.map((region: any) => {
                if (!region.polygon?.coordinates) return null
                const coords = toLeafletCoords(region.polygon.coordinates[0])
                return (
                  <Polygon
                    key={region.id}
                    positions={coords}
                    pathOptions={{ color: region.color, fillOpacity: 0.15, weight: 2 }}
                  >
                    <Popup>{region.name}</Popup>
                  </Polygon>
                )
              })}

              {/* Marcadores de pedidos */}
              {orders.map((order: any) => {
                if (!order.client?.latitude) return null
                const color = statusColor[order.status] ?? '#6B7280'
                return (
                  <Marker
                    key={order.id}
                    position={[order.client.latitude, order.client.longitude]}
                    icon={createPinIcon(color)}
                    eventHandlers={{ click: () => handleMarkerClick(order.id) }}
                  >
                    <Popup>
                      <div className="text-sm font-medium">
                        #{order.id} — {order.client.name}
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
            </MapContainer>
          </div>

          {/* Panel de detalle */}
          {(selectedOrder || loadingDetail) && (
            <div className="w-80 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-bold text-gray-800">
                  {loadingDetail ? 'Cargando...' : `Pedido #${selectedOrder?.id}`}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg"
                >✕</button>
              </div>

              {loadingDetail ? (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  Cargando detalle...
                </div>
              ) : selectedOrder && (
                <div className="flex-1 overflow-y-auto p-4 space-y-4">

                  {/* Estado */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Estado</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusBadge[selectedOrder.status]}`}>
                      {selectedOrder.status}
                    </span>
                  </div>

                  {/* Cliente */}
                  <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Cliente</p>
                    <p className="font-semibold text-gray-800">{selectedOrder.client.name}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.client.ownerName}</p>
                    <p className="text-sm text-gray-500">📍 {selectedOrder.client.address}</p>
                    <p className="text-sm text-gray-500">📞 {selectedOrder.client.phone}</p>
                  </div>

                  {/* Personas */}
                  <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Responsables</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Preventista</span>
                      <span className="font-medium">{selectedOrder.preventista.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Distribuidor</span>
                      <span className="font-medium">{selectedOrder.distributor?.name ?? '—'}</span>
                    </div>
                  </div>

                  {/* Región */}
                  {selectedOrder.region && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Región</span>
                      <span
                        className="text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{ background: selectedOrder.region.color + '20', color: selectedOrder.region.color }}
                      >
                        {selectedOrder.region.name}
                      </span>
                    </div>
                  )}

                  {/* Notas */}
                  {selectedOrder.notes && (
                    <div className="bg-yellow-50 rounded-xl p-3">
                      <p className="text-xs font-semibold text-yellow-700 mb-1">Notas</p>
                      <p className="text-sm text-yellow-800">{selectedOrder.notes}</p>
                    </div>
                  )}

                  {/* Productos */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Productos</p>
                    <div className="space-y-2">
                      {selectedOrder.items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.product.name}
                            <span className="text-gray-400 ml-1">x{item.quantity}</span>
                          </span>
                          <span className="font-medium">Bs. {(item.unitPrice * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm font-bold border-t pt-2 mt-2">
                        <span>Total</span>
                        <span>Bs. {selectedOrder.items.reduce((s, i) => s + i.unitPrice * i.quantity, 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fecha */}
                  <p className="text-xs text-gray-400 text-center">
                    Creado el {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}