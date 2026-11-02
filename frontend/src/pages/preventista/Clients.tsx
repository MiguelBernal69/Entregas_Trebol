import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { MapContainer, TileLayer, Marker, Polygon, Tooltip, useMapEvents } from 'react-leaflet'

import { getClients, createClient, updateClient, deleteClient } from '../../api/clients'
import { getProducts } from '../../api/products'
import { createOrder, getMyVisitedToday } from '../../api/orders'
import { getImageUrl } from '../../api/axios'
import { getMyRegions } from '../../api/regions'
import type { Client, Product } from '../../types'
import Pagination from '../../components/Pagination'
import L from 'leaflet'

// Fix for Leaflet default icon issues in Webpack/Vite
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

// Marcador rojo/naranja → cliente pendiente (sin pedido hoy)
const pendingIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Marcador azul → cliente ya visitado hoy
const visitedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// --- Internal Helper Components ---

function LocationPicker({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

function MapPicker({ latitude, longitude, onChange }: {
  latitude: string; 
  longitude: string; 
  onChange: (lat: number, lng: number) => void 
}) {
  const hasPosition = latitude && longitude
  const center: [number, number] = hasPosition
    ? [Number(latitude), Number(longitude)]
    : [-17.3895, -66.1568]

  return (
    <div className="rounded-xl overflow-hidden border border-gray-300" style={{ height: '220px' }}>
      <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationPicker onSelect={onChange} />
        {hasPosition && <Marker position={[Number(latitude), Number(longitude)]} />}
      </MapContainer>
    </div>
  )
}

function Field({ label, value, onChange, required = false, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        required={required}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
    </div>
  )
}

function InfoItem({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-xs text-gray-400 mb-0.5">{icon} {label}</p>
      <p className="font-medium text-gray-800 text-sm">{value}</p>
    </div>
  )
}

interface ItemForm {
  productId: number
  quantity: number
  productName: string
  price: number
  unit: string
}

// --- Main Page Component ---

export default function PreventistaClients() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [clients, setClients] = useState<Client[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // Zonas asignadas al preventista (con polígono para el mapa)
  const [myZones, setMyZones] = useState<{ id: number; name: string; color: string; polygon?: any }[]>([])

  const toLeafletCoords = (coords: number[][]): [number, number][] => {
    return coords.map(c => [c[1], c[0]])
  }

  // Visited clients tracking (mapa)
  const [visitedClientIds, setVisitedClientIds] = useState<Set<number>>(new Set())
  const [showVisited, setShowVisited] = useState(false)

  // Modals state
  const [detail, setDetail] = useState<Client | null>(null)
  const [showClientModal, setShowClientModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)

  // Client form state
  const [editing, setEditing] = useState<Client | null>(null)
  const [photo, setPhoto] = useState<File | null>(null)
  const [clientError, setClientError] = useState('')
  const [savingClient, setSavingClient] = useState(false)
  const [form, setForm] = useState({
    name: '', ownerName: '', phone: '', address: '',
    latitude: '', longitude: ''
  })

  // Order form state
  const [orderClient, setOrderClient] = useState<Client | null>(null)
  const [notes, setNotes] = useState('')
  const [items, setItems] = useState<ItemForm[]>([])
  const [orderError, setOrderError] = useState('')
  const [savingOrder, setSavingOrder] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const [clientsData, productsData] = await Promise.all([
        getClients(), getProducts()
      ])
      setClients(clientsData)
      setProducts(productsData)
    } catch (err) {
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const refreshVisited = async () => {
    try {
      const ids = await getMyVisitedToday()
      setVisitedClientIds(new Set(ids))
    } catch (err) {
      console.error('Error fetching visited clients:', err)
    }
  }

  useEffect(() => {
    fetchData()
    refreshVisited()
    // Cargar las zonas asignadas al preventista
    getMyRegions()
      .then(setMyZones)
      .catch(err => console.error('Error fetching my zones:', err))

    // Refrescar al volver a la pestaña o ventana para detectar nuevo día
    const handleFocus = () => {
      refreshVisited()
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 30

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.ownerName.toLowerCase().includes(search.toLowerCase()) ||
    c.address.toLowerCase().includes(search.toLowerCase())
  )

  const paginatedClients = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // --- Handlers: Client management ---
  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', ownerName: '', phone: '', address: '', latitude: '', longitude: '' })
    setPhoto(null)
    setClientError('')
    setShowClientModal(true)
  }

  const openEdit = (client: Client) => {
    setDetail(null)
    setEditing(client)
    setForm({
      name: client.name, 
      ownerName: client.ownerName,
      phone: client.phone, 
      address: client.address,
      latitude: client.latitude.toString(), 
      longitude: client.longitude.toString()
    })
    setPhoto(null)
    setClientError('')
    setShowClientModal(true)
  }

  const handleClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.latitude || !form.longitude) {
      setClientError('Debes seleccionar la ubicación en el mapa')
      return
    }
    setClientError('')
    setSavingClient(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (photo) fd.append('photo', photo)
      
      if (editing) { 
        await updateClient(editing.id, fd) 
      } else { 
        await createClient(fd) 
      }
      
      setShowClientModal(false)
      fetchData()
    } catch (err: any) {
      setClientError(err.response?.data?.message ?? 'Error al guardar el cliente')
    } finally {
      setSavingClient(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Desactivar este cliente?')) return
    try {
      await deleteClient(id)
      setDetail(null)
      fetchData()
    } catch (err) { 
      console.error('Error deleting client:', err) 
    }
  }

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => setForm(f => ({
        ...f,
        latitude: pos.coords.latitude.toString(),
        longitude: pos.coords.longitude.toString()
      })),
      () => alert('No se pudo obtener tu ubicación actual')
    )
  }

  // --- Handlers: Order management ---
  const openOrder = (client: Client) => {
    setOrderClient(client)
    setNotes('')
    setItems([])
    setOrderError('')
    setDetail(null)
    setShowOrderModal(true)
  }

  const addItemToOrder = (product: Product) => {
    const exists = items.find(i => i.productId === product.id)
    if (exists) {
      setItems(items.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i))
    } else {
      setItems([...items, {
        productId: product.id,
        quantity: 1,
        productName: product.name,
        price: product.price,
        unit: product.unit
      }])
    }
  }

  const removeItemFromOrder = (productId: number) => {
    setItems(items.filter(i => i.productId !== productId))
  }

  const updateItemQty = (productId: number, qty: number) => {
    if (qty < 1) return
    setItems(items.map(i => i.productId === productId ? { ...i, quantity: qty } : i))
  }

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) { 
      setOrderError('Agrega al menos un producto al pedido')
      return 
    }
    setOrderError('')
    setSavingOrder(true)
    try {
      await createOrder({
        clientId: orderClient!.id,
        notes: notes || undefined,
        items: items.map(i => ({ productId: i.productId, quantity: i.quantity }))
      })
      setShowOrderModal(false)
      // Refrescar visitados desde el backend para mantener sincronía
      await refreshVisited()
      setOrderClient(null)
    } catch (err: any) {
      setOrderError(err.response?.data?.message ?? 'Error al crear el pedido')
    } finally {
      setSavingOrder(false)
    }
  }

  const orderTotal = items.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Módulos de Clientes</h1>
            <p className="text-gray-500 text-sm mt-1">
              {filtered.length} clientes encontrados en tus zonas asignadas
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                📋 Lista
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'map' 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🗺️ Mapa
              </button>
            </div>

            <button 
              onClick={openCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              + Nuevo Cliente
            </button>
          </div>
        </div>

        {/* Banner de Zonas Asignadas al Preventista */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm px-5 py-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-base">🗺️</span>
              <span className="text-sm font-bold text-gray-700">Tus zonas de preventa:</span>
            </div>
            {myZones.length === 0 ? (
              <span className="text-xs text-amber-600 font-semibold bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
                ⚠️ Sin zonas asignadas — contacta al administrador
              </span>
            ) : (
              myZones.map(zone => (
                <span
                  key={zone.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: zone.color }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-white/60"
                  />
                  {zone.name}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">🔍</span>
          <input
            type="text"
            placeholder="Buscar por nombre de negocio, dueño o dirección..."
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full border border-gray-200 bg-white rounded-2xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
          />
        </div>

        {/* Main Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 animate-pulse">Cargando información de clientes...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="text-5xl mb-4">🏪</div>
            <h3 className="text-lg font-semibold text-gray-800">No se encontraron clientes</h3>
            <p className="text-gray-500 mt-1">Intenta con otro término de búsqueda o asegúrate de tener zonas asignadas.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {viewMode === 'list' ? (
              /* --- List View (Table) --- */
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium lowercase">
                    <tr>
                      <th className="px-6 py-4">Negocio / Tienda</th>
                      <th className="px-6 py-4">Dueño</th>
                      <th className="px-6 py-4">Contacto</th>
                      <th className="px-6 py-4">Ubicación</th>
                      <th className="px-6 py-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {paginatedClients.map(client => (
                      <tr key={client.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {client.photoUrl ? (
                              <img src={getImageUrl(client.photoUrl)} alt={client.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-gray-100" />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">🏪</div>
                            )}
                            <div>
                              <p className="font-bold text-gray-800">{client.name}</p>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span 
                                  className="w-2 h-2 rounded-full" 
                                  style={{ background: client.region?.color || '#cbd5e1' }} 
                                />
                                <span className="text-xs text-gray-500 font-medium">{client.region?.name || 'Varios / Sin zona'}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{client.ownerName}</td>
                        <td className="px-6 py-4">
                          <p className="text-gray-700 font-medium">{client.phone}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">{client.address}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                             <button 
                              onClick={() => setDetail(client)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                              title="Ver Detalle"
                            >
                              👁️
                            </button>
                            <button 
                              onClick={() => openOrder(client)}
                              className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-bold hover:bg-green-100 transition-all border border-green-200"
                              title="Crear Pedido"
                            >
                              + Pedido
                            </button>
                            <button 
                              onClick={() => openEdit(client)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                              title="Editar"
                            >
                              ✏️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  currentPage={currentPage}
                  totalItems={filtered.length}
                  pageSize={pageSize}
                  onPageChange={setCurrentPage}
                />
              </div>
            ) : (
              /* --- Map View (Geographical) --- */
              <div className="h-[650px] relative">
                {/* ── HUD superior ── */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 px-4 py-2.5">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-xl">
                    <span className="text-sm">✅</span>
                    <span className="text-xs font-black text-green-700">{visitedClientIds.size} Visitados</span>
                  </div>
                  <div className="w-px h-5 bg-gray-200" />
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 rounded-xl">
                    <span className="text-sm">🔴</span>
                    <span className="text-xs font-black text-red-700">{filtered.filter(c => !visitedClientIds.has(c.id)).length} Pendientes</span>
                  </div>
                  <div className="w-px h-5 bg-gray-200" />
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-xl">
                    <span className="text-sm">📋</span>
                    <span className="text-xs font-black text-gray-600">{filtered.length} Total</span>
                  </div>
                  <div className="w-px h-5 bg-gray-200" />
                  {/* Toggle visitados */}
                  <button
                    onClick={() => setShowVisited(v => !v)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      showVisited
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    👁️ {showVisited ? 'Ocultar visitados' : 'Ver visitados'}
                  </button>
                  <div className="w-px h-5 bg-gray-200" />
                  {/* Botón Actualizar Día */}
                  <button
                    onClick={() => {
                      fetchData()
                      refreshVisited()
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all shadow-sm"
                    title="Actualizar clientes y pedidos de hoy"
                  >
                    🔄 Actualizar
                  </button>
                </div>

                <MapContainer
                  center={[-17.3895, -66.1568]}
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                  {/* Polígonos de zonas asignadas al preventista */}
                  {myZones.map(zone => {
                    if (!zone.polygon?.coordinates) return null
                    const coords = toLeafletCoords(zone.polygon.coordinates[0])
                    return (
                      <Polygon
                        key={zone.id}
                        positions={coords}
                        pathOptions={{
                          color: zone.color,
                          fillColor: zone.color,
                          fillOpacity: 0.18,
                          weight: 2,
                          dashArray: '5, 5'
                        }}
                      >
                        <Tooltip sticky direction="center">
                          <span className="font-bold text-xs">{zone.name}</span>
                        </Tooltip>
                      </Polygon>
                    )
                  })}

                  {/* Marcadores pendientes (rojo) — siempre visibles */}
                  {filtered
                    .filter(c => !visitedClientIds.has(c.id))
                    .map(client => (
                      <Marker
                        key={client.id}
                        position={[client.latitude, client.longitude]}
                        icon={pendingIcon}
                        eventHandlers={{ click: () => setDetail(client) }}
                      />
                    ))
                  }

                  {/* Marcadores visitados (azul) — visibles solo con toggle */}
                  {showVisited && filtered
                    .filter(c => visitedClientIds.has(c.id))
                    .map(client => (
                      <Marker
                        key={client.id}
                        position={[client.latitude, client.longitude]}
                        icon={visitedIcon}
                        eventHandlers={{ click: () => setDetail(client) }}
                      />
                    ))
                  }
                </MapContainer>

                {/* Leyenda inferior */}
                <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100 max-w-xs">
                  <p className="text-xs font-black text-gray-800 uppercase tracking-wider mb-2">Leyenda</p>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🔴</span>
                      <span className="text-xs text-gray-600">Pendiente — sin pedido hoy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base">🔵</span>
                      <span className="text-xs text-gray-600">Visitado — pedido registrado hoy</span>
                    </div>
                  </div>

                  {myZones.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-[11px] font-black text-gray-700 uppercase tracking-wider mb-1.5">Tus Zonas Asignadas</p>
                      <div className="flex flex-col gap-1.5">
                        {myZones.map(z => (
                          <div key={z.id} className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-md border inline-block flex-shrink-0"
                              style={{ backgroundColor: z.color + '40', borderColor: z.color }}
                            />
                            <span className="text-xs font-medium text-gray-700 truncate">{z.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- MODAL: Shop Detail --- */}
      {detail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[10000] p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar animate-in fade-in zoom-in duration-200">
            {detail.photoUrl ? (
              <img src={getImageUrl(detail.photoUrl)} alt={detail.name} className="w-full h-56 object-cover shadow-inner" />
            ) : (
              <div className="w-full h-40 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-8xl">🏪</div>
            )}
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-700 uppercase tracking-tighter">Negocio</span>
                    <h2 className="text-2xl font-black text-gray-800 leading-tight">{detail.name}</h2>
                  </div>
                  <p className="text-gray-500 font-medium">{detail.ownerName}</p>
                </div>
                <button 
                  onClick={() => setDetail(null)} 
                  className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 hover:text-gray-800 hover:bg-gray-100 flex items-center justify-center transition-all text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <InfoItem label="Teléfono" value={detail.phone} icon="📞" />
                <InfoItem label="Zona" value={detail.region?.name ?? 'Sin zona'} icon="📌" />
                <div className="col-span-2">
                  <InfoItem label="Dirección Detallada" value={detail.address} icon="📍" />
                </div>
                <div className="col-span-2">
                  <InfoItem label="Ubicación GPS" value={`${detail.latitude.toFixed(6)}, ${detail.longitude.toFixed(6)}`} icon="🌐" />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => openOrder(detail)}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-lg shadow-green-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="text-xl">📦</span> Realizar un Pedido
                </button>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => openEdit(detail)}
                    className="flex-1 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition-all border border-blue-100 flex items-center justify-center gap-2"
                  >
                    ✏️ Editar Perfil
                  </button>
                  <a 
                    href={`https://www.google.com/maps?q=${detail.latitude},${detail.longitude}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 py-3 bg-gray-50 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-all border border-gray-200 flex items-center justify-center gap-2"
                  >
                    🚀 Navegar Maps
                  </a>
                </div>

                <button
                  onClick={() => handleDelete(detail.id)}
                  className="w-full py-3 text-red-500 text-sm font-bold hover:bg-red-50 rounded-xl transition-all"
                >
                  ⚠ Desactivar Cliente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: Create Order --- */}
      {showOrderModal && orderClient && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[10000] p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[95vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
            <div className="p-8 border-b border-gray-50 shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-gray-800">Generar Pedido</h2>
                  <p className="text-blue-600 font-bold text-sm">🏪 {orderClient.name} — {orderClient.ownerName}</p>
                </div>
                <button onClick={() => setShowOrderModal(false)} className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-gray-100 hover:text-gray-800 transition-all">✕</button>
              </div>
            </div>

            <div className="p-8 overflow-y-auto flex-1 space-y-8 custom-scrollbar">
              {/* Special Instructions */}
              <div>
                <label className="block text-sm font-black text-gray-700 mb-3 uppercase tracking-wider">Notas de Entrega</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Instrucciones específicas para el repartidor o detalles del pedido..."
                  className="w-full bg-gray-50 border-none rounded-[1.5rem] px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Product Catalog Selection */}
              <div>
                <label className="block text-sm font-black text-gray-700 mb-4 uppercase tracking-wider">Catálogo de Productos</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map(product => {
                    const item = items.find(i => i.productId === product.id)
                    return (
                      <div key={product.id} className={`p-4 rounded-2xl border-2 transition-all ${item ? 'border-blue-500 bg-blue-50/50' : 'border-gray-100 bg-white hover:border-blue-200'}`}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-bold text-gray-800 leading-tight">{product.name}</p>
                            <p className="text-xs text-blue-600 font-bold mt-1">Bs. {product.price.toFixed(2)} / {product.unit}</p>
                          </div>
                          {item && <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase">En Carrito</span>}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {item ? (
                            <div className="flex items-center bg-white rounded-xl shadow-sm border border-blue-100 w-full overflow-hidden">
                              <button
                                type="button"
                                onClick={() => item.quantity === 1 ? removeItemFromOrder(product.id) : updateItemQty(product.id, item.quantity - 1)}
                                className="flex-1 py-1.5 hover:bg-gray-50 text-gray-600 font-black text-xl"
                              >−</button>
                              <span className="w-10 text-center text-sm font-black text-blue-600">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateItemQty(product.id, item.quantity + 1)}
                                className="flex-1 py-1.5 hover:bg-gray-50 text-blue-600 font-black text-xl"
                              >+</button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => addItemToOrder(product)}
                              className="w-full py-2 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95"
                            >
                              + Añadir
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Cart Summary Card */}
              {items.length > 0 && (
                <div className="bg-gray-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
                  <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                    <span className="text-2xl">🛒</span> Resumen de Carrito
                  </h3>
                  <div className="space-y-4 relative z-10">
                    {items.map(item => (
                      <div key={item.productId} className="flex justify-between items-center text-sm">
                        <span className="text-gray-400 font-medium">{item.productName} <span className="text-blue-400 font-black ml-1">x{item.quantity}</span></span>
                        <span className="font-black">Bs. {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-gray-800 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Importe Total</p>
                        <p className="text-3xl font-black text-blue-400 leading-none mt-1">Bs. {orderTotal.toFixed(2)}</p>
                      </div>
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{items.length} artículos</span>
                    </div>
                  </div>
                </div>
              )}

              {orderError && (
                <div className="bg-red-50 border-2 border-red-100 text-red-600 text-sm font-bold rounded-2xl px-6 py-4 flex items-center gap-3">
                  <span className="text-xl">⚠️</span> {orderError}
                </div>
              )}
            </div>

            <div className="p-8 border-t border-gray-50 shrink-0 bg-gray-50/50">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-100 rounded-2xl transition-all"
                >
                  Descartar
                </button>
                <button
                  onClick={handleOrderSubmit}
                  disabled={savingOrder || items.length === 0}
                  className="flex-[2] bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 disabled:active:scale-100 flex items-center justify-center gap-2"
                >
                  {savingOrder ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Procesando...</>
                  ) : (
                    <>Confirmar Pedido — Bs. {orderTotal.toFixed(2)}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: Create/Edit Client --- */}
      {showClientModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[10000] p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar animate-in slide-in-from-top-8 duration-300">
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-gray-800 leading-tight">
                  {editing ? 'Modificar\nInformación' : 'Registrar\nNueva Tienda'}
                </h2>
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-3xl">
                  {editing ? '✏️' : '🏪'}
                </div>
              </div>

              <form onSubmit={handleClientSubmit} className="space-y-6">
                <Field label="Nombre del Establecimiento" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
                <Field label="Nombre Completo del Responsable" value={form.ownerName} onChange={v => setForm({ ...form, ownerName: v })} required />
                <Field label="Teléfono de Contacto" value={form.phone} onChange={v => setForm({ ...form, phone: v })} required />
                <Field label="Dirección de Referencia" value={form.address} onChange={v => setForm({ ...form, address: v })} required />

                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Geolocalización</label>
                    <button 
                      type="button" 
                      onClick={getUserLocation} 
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5"
                    >
                      <span>📍 Mi Ubicación actual</span>
                    </button>
                  </div>
                  
                  <MapPicker
                    latitude={form.latitude}
                    longitude={form.longitude}
                    onChange={(lat, lng) => setForm(f => ({
                      ...f, latitude: lat.toFixed(6), longitude: lng.toFixed(6)
                    }))}
                  />
                  
                  <p className="text-[10px] font-bold text-gray-400 mt-4 text-center uppercase tracking-widest leading-relaxed">
                    Toca el mapa para fijar el pin de ubicación exacto
                  </p>
                  
                  {form.latitude && form.longitude && (
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="bg-white rounded-xl px-4 py-3 border border-gray-200">
                        <span className="text-[9px] font-black text-gray-400 uppercase block mb-1">Latitud</span>
                        <span className="text-xs font-bold text-gray-700">{form.latitude}</span>
                      </div>
                      <div className="bg-white rounded-xl px-4 py-3 border border-gray-200">
                        <span className="text-[9px] font-black text-gray-400 uppercase block mb-1">Longitud</span>
                        <span className="text-xs font-bold text-gray-700">{form.longitude}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-700 mb-3 uppercase tracking-wider">Evidencia Fotográfica</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <span className="text-3xl mb-2">📸</span>
                      <p className="text-xs font-bold text-gray-500 uppercase">Subir foto de fachada</p>
                      <p className="text-[10px] text-gray-400 mt-1">{photo ? photo.name : 'Formatos: JPG, PNG'}</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={e => setPhoto(e.target.files?.[0] ?? null)} 
                    />
                  </label>
                </div>

                {clientError && (
                  <div className="bg-red-50 border-2 border-red-100 text-red-600 text-sm font-bold rounded-2xl px-6 py-4 flex items-center gap-3">
                    <span>⚠️</span> {clientError}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowClientModal(false)}
                    className="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition-all"
                  >
                    Cerrar
                  </button>
                  <button 
                    type="submit" 
                    disabled={savingClient}
                    className="flex-[2] bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {savingClient ? 'Guardando...' : (editing ? 'Actualizar Datos' : 'Registrar Cliente')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}