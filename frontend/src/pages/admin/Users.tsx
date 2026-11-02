import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { getUsers, createUser, updateUser, toggleUser } from '../../api/users'
import type { User, Role } from '../../types'

type ModalMode = 'create' | 'edit'

const roleColor: Record<string, string> = {
  admin:        'bg-red-100 text-red-700',
  preventista:  'bg-blue-100 text-blue-700',
  distribuidor: 'bg-green-100 text-green-700'
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [mode, setMode] = useState<ModalMode>('create')
  const [editing, setEditing] = useState<User | null>(null)
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', role: 'preventista' as Role })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const fetchUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  const openCreate = () => {
    setMode('create')
    setEditing(null)
    setForm({ name: '', email: '', password: '', phone: '', role: 'preventista' })
    setError('')
    setShowModal(true)
  }

  const openEdit = (user: User) => {
    setMode('edit')
    setEditing(user)
    setForm({ name: user.name, email: user.email, password: '', phone: user.phone ?? '', role: user.role })
    setError('')
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      if (mode === 'create') {
        await createUser(form)
      } else if (editing) {
        // Solo mandamos password si escribieron una nueva
        const data: any = { name: form.name, email: form.email, phone: form.phone }
        if (form.password) data.password = form.password
        await updateUser(editing.id, data)
      }
      setShowModal(false)
      fetchUsers()
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (id: number) => {
    try {
      await toggleUser(id)
      fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Usuarios</h1>
            <p className="text-gray-500 text-sm mt-1">Gestiona preventistas y distribuidores</p>
          </div>
          <button
            onClick={openCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            + Nuevo usuario
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="text-center text-gray-400 py-12">Cargando...</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Nombre</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Email</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Teléfono</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Rol</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Estado</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-800">{user.name}</td>
                    <td className="px-5 py-4 text-gray-500">{user.email}</td>
                    <td className="px-5 py-4 text-gray-500">{user.phone ?? '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${roleColor[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${user.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {user.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-5 py-4 flex gap-2">
                      <button
                        onClick={() => openEdit(user)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleToggle(user.id)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                          user.isActive
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                      >
                        {user.isActive ? 'Desactivar' : 'Activar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal crear/editar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-bold text-gray-800 mb-5">
              {mode === 'create' ? 'Nuevo usuario' : `Editar — ${editing?.name}`}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Nombre" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
              <Input label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} required />
              <Input
                label={mode === 'edit' ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña'}
                type="password"
                value={form.password}
                onChange={v => setForm({ ...form, password: v })}
                required={mode === 'create'}
              />
              <Input label="Teléfono (opcional)" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />

              {/* Rol solo al crear */}
              {mode === 'create' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                  <select
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value as Role })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="preventista">Preventista</option>
                    <option value="distribuidor">Distribuidor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">{error}</div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setError('') }}
                  className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium py-2.5 rounded-lg"
                >
                  {saving ? 'Guardando...' : mode === 'create' ? 'Crear usuario' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

function Input({ label, value, onChange, type = 'text', required = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean
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