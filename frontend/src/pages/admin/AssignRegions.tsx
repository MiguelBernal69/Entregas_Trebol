import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { getUsers } from '../../api/users'
import { getRegions, assignRegionsBulk } from '../../api/regions'
import { getUserRegions } from '../../api/users'
import type { User } from '../../types'

interface Region { id: number; name: string; color: string }
interface UserRegion { id: number; region: Region }

export default function AssignRegions() {
  const [preventistas, setPreventistas] = useState<User[]>([])
  const [regions, setRegions] = useState<Region[]>([])
  const [selected, setSelected] = useState<User | null>(null)
  
  // IDs actualmente seleccionados (en DB)
  const [originalIds, setOriginalIds] = useState<number[]>([])
  // IDs seleccionados en la UI (pendientes de guardar)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null)

  const fetchData = async () => {
    try {
      const [users, regs] = await Promise.all([getUsers(), getRegions()])
      setPreventistas(users.filter((u: User) => u.role === 'preventista' && u.isActive))
      setRegions(regs)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const selectUser = async (user: User) => {
    setSelected(user)
    setMessage(null)
    try {
      const data: UserRegion[] = await getUserRegions(user.id)
      const ids = data.map(ur => ur.region.id)
      setOriginalIds(ids)
      setSelectedIds(ids)
    } catch (err) {
      console.error(err)
    }
  }

  const isSelected = (regionId: number) => selectedIds.includes(regionId)

  const handleToggle = (regionId: number) => {
    if (isSelected(regionId)) {
      setSelectedIds(prev => prev.filter(id => id !== regionId))
    } else {
      setSelectedIds(prev => [...prev, regionId])
    }
  }

  const hasChanges = () => {
    if (originalIds.length !== selectedIds.length) return true
    return !originalIds.every(id => selectedIds.includes(id))
  }

  const handleSave = async () => {
    if (!selected) return
    setSaving(true)
    setMessage(null)
    try {
      await assignRegionsBulk(selected.id, selectedIds)
      setOriginalIds([...selectedIds])
      setMessage({ text: 'Zonas actualizadas correctamente', type: 'success' })
    } catch (err) {
      console.error(err)
      setMessage({ text: 'Error al guardar los cambios', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <Layout>
      <div className="space-y-6 max-w-6xl mx-auto pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Asignar Zonas</h1>
            <p className="text-gray-500 font-medium mt-1">
              Gestiona el territorio de ventas para cada preventista
            </p>
          </div>
          
          {selected && hasChanges() && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center gap-3 animate-in fade-in slide-in-from-right-4"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>💾 Guardar Cambios</>
              )}
            </button>
          )}
        </div>

        {message && (
          <div className={`p-4 rounded-2xl font-bold flex items-center gap-3 animate-in fade-in zoom-in ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
          }`}>
            <span>{message.type === 'success' ? '✅' : '⚠️'}</span>
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-bold text-gray-400">Sincronizando datos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Panel de Preventistas */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b bg-gray-50/50">
                  <h2 className="font-black text-gray-800 text-xs uppercase tracking-widest">Preventistas Activos</h2>
                </div>
                <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {preventistas.map(user => (
                    <button
                      key={user.id}
                      onClick={() => selectUser(user)}
                      className={`w-full flex items-center gap-4 px-6 py-5 text-left transition-all ${
                        selected?.id === user.id
                          ? 'bg-blue-50/80 ring-2 ring-inset ring-blue-500/20'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-all ${
                        selected?.id === user.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate font-medium">{user.email}</p>
                      </div>
                      {selected?.id === user.id && <span className="text-blue-600">➡️</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Panel de Zonas */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
                <div className="px-8 py-6 border-b bg-gray-50/50 flex items-center justify-between">
                  <div>
                    <h2 className="font-black text-gray-800 text-sm uppercase tracking-wider">
                      {selected ? `Control de Territorio: ${selected.name}` : 'Gestión de Zonas'}
                    </h2>
                    {selected && hasChanges() && (
                      <p className="text-[10px] text-blue-600 font-black uppercase mt-1 animate-pulse">Tienes cambios sin guardar</p>
                    )}
                  </div>
                  {selected && (
                    <div className="bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="text-xs font-black text-gray-600">
                        {selectedIds.length} Asignadas
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-8 flex-1">
                  {!selected ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-20 grayscale">
                      <span className="text-6xl">🗺️</span>
                      <div className="max-w-xs">
                        <p className="font-black text-gray-800 text-lg">Sin Preventista Seleccionado</p>
                        <p className="text-gray-400 font-medium text-sm mt-2">
                          Elige un miembro del equipo a la izquierda para configurar su radio de acción.
                        </p>
                      </div>
                    </div>
                  ) : regions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-20 grayscale">
                      <span className="text-5xl mb-4">📍</span>
                      <p className="font-bold text-gray-400">No hay zonas geográficas configuradas</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {regions.map(region => {
                        const assigned = isSelected(region.id)
                        const wasAssigned = originalIds.includes(region.id)
                        const isModified = assigned !== wasAssigned

                        return (
                          <button
                            key={region.id}
                            onClick={() => handleToggle(region.id)}
                            disabled={saving}
                            className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all relative group ${
                              assigned
                                ? 'border-blue-500 bg-blue-50/30'
                                : 'border-gray-100 hover:border-gray-200 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={`w-5 h-5 rounded-lg shadow-sm flex-shrink-0 transition-transform group-hover:scale-110 ${assigned ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                                style={{ background: region.color }}
                              />
                              <div className="text-left">
                                <p className={`font-black text-sm mb-0.5 ${assigned ? 'text-blue-900' : 'text-gray-800'}`}>
                                  {region.name}
                                </p>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID: {region.id}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {isModified && (
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                                  assigned ? 'bg-blue-600 text-white' : 'bg-amber-100 text-amber-700'
                                }`}>
                                  {assigned ? 'Borrar' : 'Quitar'}
                                </span>
                              )}
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                assigned ? 'bg-blue-600 text-white rotate-0' : 'bg-gray-50 text-gray-300 -rotate-45'
                              }`}>
                                {assigned ? '✓' : '+'}
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}