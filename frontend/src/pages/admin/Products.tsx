import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { getProducts, createProduct, updateProduct, toggleProduct, deleteProduct } from '../../api/products'
import type { Product } from '../../types'

const CATEGORIES = ['Categoría A', 'Categoría B', 'Categoría C', 'Categoría D']

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState({ name: '', description: '', price: '', unit: '', category: 'Categoría A' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('Todas')

  const fetchProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  // Obtener categorías únicas existentes en los productos
  const existingCategories = ['Todas', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))]

  const filteredProducts = activeCategory === 'Todas'
    ? products
    : products.filter(p => p.category === activeCategory)

  const openCreate = () => {
    setEditing(null)
    setForm({ name: '', description: '', price: '', unit: '', category: 'Categoría A' })
    setError('')
    setShowModal(true)
  }

  const openEdit = (product: Product) => {
    setEditing(product)
    setForm({
      name: product.name,
      description: product.description ?? '',
      price: product.price.toString(),
      unit: product.unit,
      category: product.category ?? 'Categoría A',
    })
    setError('')
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const data = { ...form, price: Number(form.price) }
      if (editing) {
        await updateProduct(editing.id, data)
      } else {
        await createProduct(data)
      }
      setShowModal(false)
      fetchProducts()
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleToggle = async (id: number) => {
    try {
      await toggleProduct(id)
      fetchProducts()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Está seguro de que desea eliminar este producto permanentemente?')) return
    try {
      await deleteProduct(id)
      fetchProducts()
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error al eliminar el producto')
    }
  }

  // Badge color por categoría
  const categoryColor: Record<string, string> = {
    'Categoría A': 'bg-blue-100 text-blue-700',
    'Categoría B': 'bg-purple-100 text-purple-700',
    'Categoría C': 'bg-amber-100 text-amber-700',
    'Categoría D': 'bg-green-100 text-green-700',
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Productos</h1>
            <p className="text-gray-500 text-sm mt-1">Catálogo de productos disponibles</p>
          </div>
          <button
            onClick={openCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            + Nuevo producto
          </button>
        </div>

        {/* Filtros por categoría */}
        <div className="flex gap-2 flex-wrap">
          {existingCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {cat}
              {cat !== 'Todas' && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({products.filter(p => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="text-center text-gray-400 py-12">Cargando...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No hay productos en esta categoría</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Nombre</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Descripción</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Precio</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Unidad</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Categoría</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Estado</th>
                  <th className="text-left px-5 py-3 text-gray-600 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-800">{product.name}</td>
                    <td className="px-5 py-4 text-gray-500">{product.description ?? '—'}</td>
                    <td className="px-5 py-4 text-gray-800">Bs. {product.price.toFixed(2)}</td>
                    <td className="px-5 py-4 text-gray-500">{product.unit}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColor[product.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {product.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-5 py-4 flex gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleToggle(product.id)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                          product.isActive
                            ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                      >
                        {product.isActive ? 'Desactivar' : 'Activar'}
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-lg font-bold text-gray-800 mb-5">
              {editing ? 'Editar producto' : 'Nuevo producto'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Nombre" value={form.name} onChange={v => setForm({ ...form, name: v })} required />
              <Field label="Descripción (opcional)" value={form.description} onChange={v => setForm({ ...form, description: v })} />
              <Field label="Precio (Bs.)" type="number" value={form.price} onChange={v => setForm({ ...form, price: v })} required />
              <Field label="Unidad (ej: bolsa, caja, kg)" value={form.unit} onChange={v => setForm({ ...form, unit: v })} required />

              {/* Selector de categoría */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">{error}</div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium py-2.5 rounded-lg"
                >
                  {saving ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

function Field({ label, value, onChange, type = 'text', required = false }: {
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