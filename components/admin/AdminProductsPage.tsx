'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Package, X, Check, Upload } from 'lucide-react'
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

type Product = typeof MOCK_PRODUCTS[0]

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', brand: '', category: 'proteinas', price: 0,
    stock: 0, description: '', status: 'available', usage_tips: '', benefits: [], images: [], slug: ''
  })

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setFormData({ ...product })
    setShowForm(true)
  }

  const handleNew = () => {
    setEditingId(null)
    setFormData({ name: '', brand: '', category: 'proteinas', price: 0, stock: 0, description: '', status: 'available', usage_tips: '', benefits: [], images: [], slug: '' })
    setShowForm(true)
  }

  const handleSave = () => {
    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...formData } as Product : p))
    } else {
      const newProduct: Product = { ...formData as Product, id: Date.now().toString() }
      setProducts(prev => [...prev, newProduct])
    }
    setShowForm(false)
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    setDeleteId(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-4xl text-white tracking-wider uppercase">Productos</h1>
          <p className="text-brand-gray-light text-sm mt-1">{products.length} productos en la tienda</p>
        </div>
        <button id="new-product-btn" onClick={handleNew} className="btn-primary text-xs py-2.5 gap-2">
          <Plus size={16} /> Nuevo Producto
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-brand-charcoal border border-brand-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border bg-brand-black/30">
                <th className="text-left px-6 py-4 text-xs font-bold text-brand-gray uppercase tracking-widest">Producto</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-brand-gray uppercase tracking-widest">Categoría</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-brand-gray uppercase tracking-widest">Precio</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-brand-gray uppercase tracking-widest">Stock</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-brand-gray uppercase tracking-widest">Estado</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-brand-gray uppercase tracking-widest">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-brand-border last:border-0 hover:bg-brand-black/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-charcoal-light flex items-center justify-center flex-shrink-0">
                        <Package size={16} className="text-brand-orange/40" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{product.name}</div>
                        <div className="text-brand-gray text-xs">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="tag-outline text-xs capitalize">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 text-white text-sm font-medium">
                    {formatCurrency(product.price, product.currency)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-bold ${product.stock <= 5 ? 'text-red-400' : 'text-green-400'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 ${product.status === 'available' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {product.status === 'available' ? 'Disponible' : 'No disponible'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        id={`edit-product-${product.id}`}
                        onClick={() => handleEdit(product)}
                        className="p-2 text-brand-gray hover:text-white hover:bg-brand-charcoal-light transition-colors"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        id={`delete-product-${product.id}`}
                        onClick={() => setDeleteId(product.id)}
                        className="p-2 text-brand-gray hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-charcoal border border-brand-border w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-brand-border">
              <h2 className="font-heading text-2xl text-white tracking-wider">
                {editingId ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-brand-gray hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Nombre *</label>
                  <input className="input-dark" value={formData.name ?? ''} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Nombre del producto" />
                </div>
                <div>
                  <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Marca *</label>
                  <input className="input-dark" value={formData.brand ?? ''} onChange={e => setFormData({ ...formData, brand: e.target.value })} placeholder="Marca" />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <div>
                  <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Precio (USD) *</label>
                  <input type="number" className="input-dark" value={formData.price ?? 0} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} min="0" step="0.01" />
                </div>
                <div>
                  <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Stock *</label>
                  <input type="number" className="input-dark" value={formData.stock ?? 0} onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })} min="0" />
                </div>
                <div>
                  <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Estado</label>
                  <select className="select-dark" value={formData.status ?? 'available'} onChange={e => setFormData({ ...formData, status: e.target.value as 'available' | 'unavailable' })}>
                    <option value="available">Disponible</option>
                    <option value="unavailable">No disponible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Categoría</label>
                <select className="select-dark" value={formData.category ?? 'proteinas'} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                  {PRODUCT_CATEGORIES.filter(c => c.value !== 'all').map(c => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Descripción</label>
                <textarea className="input-dark resize-none" rows={3} value={formData.description ?? ''} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Descripción del producto..." />
              </div>

              <div>
                <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Modo de uso</label>
                <textarea className="input-dark resize-none" rows={2} value={formData.usage_tips ?? ''} onChange={e => setFormData({ ...formData, usage_tips: e.target.value })} placeholder="Indicaciones de uso..." />
              </div>

              {/* Image upload placeholder */}
              <div>
                <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Imagen</label>
                <div className="border-2 border-dashed border-brand-border p-8 text-center hover:border-brand-orange transition-colors cursor-pointer">
                  <Upload size={24} className="text-brand-gray mx-auto mb-2" />
                  <p className="text-brand-gray-light text-xs">Haz clic para subir imagen a Supabase Storage</p>
                  <p className="text-brand-gray text-xs mt-1">PNG, JPG, WebP hasta 5MB</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-brand-border">
              <button onClick={() => setShowForm(false)} className="btn-outline py-2.5 text-xs">Cancelar</button>
              <button onClick={handleSave} className="btn-primary py-2.5 text-xs gap-2">
                <Check size={14} />
                {editingId ? 'Guardar cambios' : 'Crear producto'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-brand-charcoal border border-red-500/30 p-8 max-w-sm w-full text-center">
            <Trash2 size={32} className="text-red-400 mx-auto mb-4" />
            <h3 className="font-heading text-2xl text-white tracking-wider mb-2">¿Eliminar producto?</h3>
            <p className="text-brand-gray-light text-sm mb-6">Esta accion no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-outline flex-1 text-xs py-2.5">Cancelar</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
