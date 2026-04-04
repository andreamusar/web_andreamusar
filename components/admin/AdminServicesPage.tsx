'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, X, Check, Monitor, Users, Apple, Flame } from 'lucide-react'
import { MOCK_SERVICES } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

type Service = typeof MOCK_SERVICES[0]

const typeIcon: Record<string, React.ElementType> = {
  online: Monitor, presencial: Users, nutricion: Apple, challenge: Flame,
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(MOCK_SERVICES)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<Service>>({ name: '', type: 'online', price: 0, currency: 'USD', duration: '', support_level: '', description: '', includes: [], popular: false, active: true })

  const handleEdit = (s: Service) => { setEditingId(s.id); setForm({ ...s }); setShowForm(true) }
  const handleNew = () => { setEditingId(null); setForm({ name: '', type: 'online', price: 0, currency: 'USD', duration: '', support_level: '', description: '', includes: [], popular: false, active: true }); setShowForm(true) }
  const handleSave = () => {
    if (editingId) {
      setServices(prev => prev.map(s => s.id === editingId ? { ...s, ...form } as Service : s))
    } else {
      setServices(prev => [...prev, { ...form as Service, id: Date.now().toString() }])
    }
    setShowForm(false)
  }
  const handleDelete = (id: string) => { setServices(prev => prev.filter(s => s.id !== id)); setDeleteId(null) }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-4xl text-white tracking-wider uppercase">Servicios</h1>
          <p className="text-brand-gray-light text-sm mt-1">{services.length} planes activos</p>
        </div>
        <button id="new-service-btn" onClick={handleNew} className="btn-primary text-xs py-2.5 gap-2">
          <Plus size={16} /> Nuevo Servicio
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {services.map((s, i) => {
          const Icon = typeIcon[s.type] ?? Monitor
          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-brand-charcoal border border-brand-border p-6 flex items-start justify-between gap-4"
            >
              <div className="flex gap-4 flex-1">
                <div className={`w-10 h-10 flex items-center justify-center flex-shrink-0 ${s.popular ? 'bg-brand-orange' : 'bg-brand-charcoal-light border border-brand-border'}`}>
                  <Icon size={18} className={s.popular ? 'text-black' : 'text-brand-orange'} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-heading text-lg text-white tracking-wider">{s.name}</span>
                    {s.popular && <span className="tag text-xs py-0.5 px-2">Popular</span>}
                    {!s.active && <span className="text-xs text-red-400 border border-red-400/30 px-2 py-0.5 uppercase tracking-wider">Inactivo</span>}
                  </div>
                  <div className="text-brand-gray text-xs uppercase tracking-wider mb-2">{s.type} · {s.duration}</div>
                  <p className="text-brand-gray-light text-xs line-clamp-2">{s.description}</p>
                  <div className="mt-3 font-heading text-xl text-brand-orange">
                    {s.currency === 'PEN' ? `S/ ${s.price}` : `$${s.price}`}
                    <span className="text-brand-gray font-sans text-xs ml-1">/ {s.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button id={`edit-service-${s.id}`} onClick={() => handleEdit(s)} className="p-2 text-brand-gray hover:text-white hover:bg-brand-charcoal-light transition-colors">
                  <Edit size={14} />
                </button>
                <button id={`delete-service-${s.id}`} onClick={() => setDeleteId(s.id)} className="p-2 text-brand-gray hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-charcoal border border-brand-border w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-brand-border">
              <h2 className="font-heading text-2xl text-white tracking-wider">{editingId ? 'Editar Servicio' : 'Nuevo Servicio'}</h2>
              <button onClick={() => setShowForm(false)} className="text-brand-gray hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Nombre</label>
                <input className="input-dark" value={form.name ?? ''} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Tipo</label>
                  <select className="select-dark" value={form.type ?? 'online'} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="online">Online</option>
                    <option value="presencial">Presencial</option>
                    <option value="nutricion">Nutricion</option>
                    <option value="challenge">Reto</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Moneda</label>
                  <select className="select-dark" value={form.currency ?? 'USD'} onChange={e => setForm({ ...form, currency: e.target.value })}>
                    <option value="USD">USD ($)</option>
                    <option value="PEN">PEN (S/)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Precio</label>
                  <input type="number" className="input-dark" value={form.price ?? 0} onChange={e => setForm({ ...form, price: Number(e.target.value) })} min="0" />
                </div>
                <div>
                  <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Duración</label>
                  <input className="input-dark" value={form.duration ?? ''} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="ej: 1 mes" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Nivel de Soporte</label>
                <input className="input-dark" value={form.support_level ?? ''} onChange={e => setForm({ ...form, support_level: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Descripción</label>
                <textarea className="input-dark resize-none" rows={3} value={form.description ?? ''} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.popular ?? false} onChange={e => setForm({ ...form, popular: e.target.checked })} className="accent-brand-orange" />
                  <span className="text-white text-sm">Popular</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.active ?? true} onChange={e => setForm({ ...form, active: e.target.checked })} className="accent-brand-orange" />
                  <span className="text-white text-sm">Activo</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-brand-border">
              <button onClick={() => setShowForm(false)} className="btn-outline flex-1 py-2.5 text-xs">Cancelar</button>
              <button onClick={handleSave} className="btn-primary flex-1 py-2.5 text-xs gap-2"><Check size={14} />{editingId ? 'Guardar' : 'Crear'}</button>
            </div>
          </motion.div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-brand-charcoal border border-red-500/30 p-8 max-w-sm w-full text-center">
            <Trash2 size={32} className="text-red-400 mx-auto mb-4" />
            <h3 className="font-heading text-2xl text-white tracking-wider mb-2">¿Eliminar servicio?</h3>
            <p className="text-brand-gray-light text-sm mb-6">Esta accion no se puede deshacer.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-outline flex-1 py-2.5 text-xs">Cancelar</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
