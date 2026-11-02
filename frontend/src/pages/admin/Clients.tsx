import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { MapContainer, TileLayer, Marker, useMapEvents, Polygon } from 'react-leaflet'
import { getClients, createClient, updateClient, deleteClient } from '../../api/clients'
import { getRegions } from '../../api/regions'
import { getImageUrl } from '../../api/axios'
import type { Client } from '../../types'
import Pagination from '../../components/Pagination'
import L from 'leaflet'

// Leaflet icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

function LocationPicker({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({ click(e) { onSelect(e.latlng.lat, e.latlng.lng) } })
  return null
}

function MapPicker({ latitude, longitude, onChange, regions }: {
  latitude: string; longitude: string; onChange: (lat: number, lng: number) => void; regions: any[]
}) {
  const hasPosition = latitude && longitude
  const center: [number, number] = hasPosition
    ? [Number(latitude), Number(longitude)]
    : [-17.3895, -66.1568]

  const toLeafletCoords = (coords: number[][]): [number, number][] => {
    return coords.map(c => [c[1], c[0]])
  }

  return (
    <div className="rounded-xl overflow-hidden border border-gray-300" style={{ height: '220px' }}>
      <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationPicker onSelect={onChange} />
        {regions.map(region => {
          if (!region.polygon?.coordinates) return null
          const coords = toLeafletCoords(region.polygon.coordinates[0])
          return (
            <Polygon
              key={region.id}
              positions={coords}
              pathOptions={{ color: region.color, fillColor: region.color, fillOpacity: 0.15, weight: 2 }}
              interactive={false}
            />
          )
        })}
        {hasPosition && <Marker position={[Number(latitude), Number(longitude)]} />}
      </MapContainer>
    </div>
  )
}

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [regions, setRegions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Client | null>(null)
  const [detail, setDetail] = useState<Client | null>(null)
  const [photo, setPhoto] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '', ownerName: '', phone: '', address: '',
    latitude: '', longitude: '', regionId: ''
  })

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 30

  const fetchClients = async () => {
    try {
      const [data, rData] = await Promise.all([getClients(), getRegions()])
      setClients(data)
      setRegions(rData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchClients() }, [])

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.ownerName.toLowerCase().includes(search.toLowerCase()) ||
    c.address.toLowerCase().includes(search.toLowerCase())
  )

  const paginatedClients = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', ownerName: '', phone: '', address: '', latitude: '', longitude: '', regionId: '' })
    setPhoto(null)
    setError('')
    setShowModal(true)
  }

  const openEdit = (client: Client) => {
    setEditing(client)
    setForm({
      name: client.name, ownerName: client.ownerName,
      phone: client.phone, address: client.address,
      latitude: client.latitude.toString(), longitude: client.longitude.toString(),
      regionId: client.regionId?.toString() ?? ''
    })
    setPhoto(null)
    setError('')
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.latitude || !form.longitude) {
      setError('Debes seleccionar la ubicación en el mapa')
      return
    }
    setError('')
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (v !== '') fd.append(k, v)
      })
      if (photo) fd.append('photo', photo)

      if (editing) {
        await updateClient(editing.id, fd)
      } else {
        await createClient(fd)
      }
      setShowModal(false)
      fetchClients()
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Desactivar este cliente?')) return
    try {
      await deleteClient(id)
      setDetail(null)
      fetchClients()
    } catch (err) {
      console.error(err)
    }
  }

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => setForm(f => ({ ...f, latitude: pos.coords.latitude.toString(), longitude: pos.coords.longitude.toString() })),
      () => alert('No se pudo obtener la ubicación')
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
            <p className="text-gray-500 text-sm mt-1">{clients.length} tiendas registradas</p>
          </div>
          <button
            onClick={openCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            + Nuevo cliente
          </button>
        </div>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar por nombre, dueño o dirección..."
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Lista */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="text-center text-gray-400 py-12">Cargando...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No hay clientes</div>
          ) : (
            <>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-5 py-3 text-gray-600 font-medium">Negocio</th>
                    <th className="text-left px-5 py-3 text-gray-600 font-medium">Dueño</th>
                    <th className="text-left px-5 py-3 text-gray-600 font-medium">Teléfono</th>
                    <th className="text-left px-5 py-3 text-gray-600 font-medium">Región</th>
                    <th className="text-left px-5 py-3 text-gray-600 font-medium">Estado</th>
                    <th className="text-left px-5 py-3 text-gray-600 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginatedClients.map(client => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {client.photoUrl ? (
                            <img src={getImageUrl(client.photoUrl)} alt={client.name}
                              className="w-9 h-9 rounded-lg object-cover" />
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-lg">🏪</div>
                          )}
                          <span className="font-medium text-gray-800">{client.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{client.ownerName}</td>
                      <td className="px-5 py-4 text-gray-500">{client.phone}</td>
                      <td className="px-5 py-4">
                        {client.region ? (
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{ background: client.region.color + '20', color: client.region.color }}>
                            {client.region.name}
                          </span>
                        ) : <span className="text-gray-400">—</span>}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${client.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {client.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-5 py-4 flex gap-2">
                        <button
                          onClick={() => setDetail(client)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          Ver detalle
                        </button>
                        <button
                          onClick={() => openEdit(client)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        >
                          Desactivar
                        </button>
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
            </>
          )}
        </div>
      </div>

      {/* Modal detalle */}
      {detail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">

            {/* Foto header */}
            {detail.photoUrl ? (
              <img src={getImageUrl(detail.photoUrl)} alt={detail.name} className="w-full h-48 object-cover rounded-t-2xl" />
            ) : (
              <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-2xl flex items-center justify-center text-6xl">🏪</div>
            )}

            <div className="p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{detail.name}</h2>
                  <p className="text-gray-500 text-sm mt-0.5">{detail.ownerName}</p>
                </div>
                <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <InfoItem label="Teléfono" value={detail.phone} icon="📞" />
                <InfoItem label="Estado" value={detail.isActive ? 'Activo' : 'Inactivo'} icon="🔵" />
                <InfoItem label="Dirección" value={detail.address} icon="📍" />
                <InfoItem label="Región" value={detail.region?.name ?? '—'} icon="🗺️" />
                <InfoItem label="Registrado por" value={detail.creator?.name ?? '—'} icon="👤" />
                <InfoItem
                  label="Coordenadas"
                  value={`${detail.latitude.toFixed(4)}, ${detail.longitude.toFixed(4)}`}
                  icon="🌐"
                />
              </div>

              {/* Ver en mapa */}
              <a
                href={`https://www.google.com/maps?q=${detail.latitude},${detail.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-blue-300 text-blue-600 text-sm font-medium py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
              >
                🗺️ Ver en Google Maps
              </a>

              <div className="flex gap-3">
                <button
                  onClick={() => { setDetail(null); openEdit(detail) }}
                  className="flex-1 bg-blue-50 text-blue-600 text-sm font-medium py-2.5 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(detail.id)}
                  className="flex-1 bg-red-50 text-red-600 text-sm font-medium py-2.5 rounded-xl hover:bg-red-100 transition-colors"
                >
                  Desactivar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal crear/editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-5">
              {editing ? 'Editar cliente' : 'Nuevo cliente'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Nombre del negocio" value={form.name}      onChange={v => setForm({ ...form, name: v })}      required />
              <Field label="Nombre del dueño"   value={form.ownerName} onChange={v => setForm({ ...form, ownerName: v })} required />
              <Field label="Teléfono"           value={form.phone}     onChange={v => setForm({ ...form, phone: v })}     required />
              <Field label="Dirección"          value={form.address}   onChange={v => setForm({ ...form, address: v })}   required />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Región / Zona</label>
                <select
                  value={form.regionId}
                  onChange={e => setForm({ ...form, regionId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sin asignar</option>
                  {regions.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Ubicación del local</label>
                  <button type="button" onClick={getLocation}
                    className="text-xs text-blue-600 hover:underline">
                    📍 Usar mi ubicación
                  </button>
                </div>
                <MapPicker
                  latitude={form.latitude}
                  longitude={form.longitude}
                  regions={regions}
                  onChange={(lat, lng) => setForm(f => ({
                    ...f,
                    latitude: lat.toFixed(6),
                    longitude: lng.toFixed(6)
                  }))}
                />
                <p className="text-xs text-gray-400 mt-1.5 text-center">
                  Haz clic en el mapa para marcar la ubicación exacta
                </p>
                {form.latitude && form.longitude && (
                  <div className="flex gap-2 mt-2">
                    <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600">
                      <span className="text-gray-400">Lat: </span>{form.latitude}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600">
                      <span className="text-gray-400">Lng: </span>{form.longitude}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto del local (opcional)</label>
                <input type="file" accept="image/*"
                  onChange={e => setPhoto(e.target.files?.[0] ?? null)}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600" />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">{error}</div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium py-2.5 rounded-lg">
                  {saving ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

function Field({ label, value, onChange, required = false }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} required={required}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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