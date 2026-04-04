'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Flame, X, Check } from 'lucide-react'
import { MOCK_CHALLENGES } from '@/lib/constants'

type Challenge = typeof MOCK_CHALLENGES[0]

export default function AdminChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK_CHALLENGES)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState<Partial<Challenge>>({ name: '', duration_days: 15, price: 0, currency: 'USD', description: '', includes: [], active: true, popular: false })

  const handleEdit = (c: Challenge) => { setEditingId(c.id); setForm({ ...c }); setShowForm(true) }
  const handleNew = () => { setEditingId(null); setForm({ name: '', duration_days: 15, price: 0, currency: 'USD', description: '', includes: [], active: true, popular: false }); setShowForm(true) }
  const handleSave = () => {
    if (editingId) {
      setChallenges(prev => prev.map(c => c.id === editingId ? { ...c, ...form } as Challenge : c))
    } else {
      setChallenges(prev => [...prev, { ...form as Challenge, id: Date.now().toString() }])
    }
    setShowForm(false)
  }
  const handleDelete = (id: string) => { setChallenges(prev => prev.filter(c => c.id !== id)); setDeleteId(null) }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-4xl text-white tracking-wider uppercase">Retos Fitness</h1>
          <p className="text-brand-gray-light text-sm mt-1">{challenges.length} retos configurados</p>
        </div>
        <button id="new-challenge-btn" onClick={handleNew} className="btn-primary text-xs py-2.5 gap-2">
          <Plus size={16} /> Nuevo Reto
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {challenges.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`bg-brand-charcoal border ${c.popular ? 'border-brand-orange' : 'border-brand-border'} p-6`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-brand-orange flex items-center justify-center">
                <div className="text-center">
                  <div className="font-heading text-2xl text-black leading-none">{c.duration_days}</div>
                  <div className="text-black/80 text-xs font-bold">DIAS</div>
                </div>
              </div>
              <div className="flex gap-1">
                <button id={`edit-challenge-${c.id}`} onClick={() => handleEdit(c)} className="p-2 text-brand-gray hover:text-white hover:bg-brand-charcoal-light transition-colors"><Edit size={14} /></button>
                <button id={`delete-challenge-${c.id}`} onClick={() => setDeleteId(c.id)} className="p-2 text-brand-gray hover:text-red-400 hover:bg-red-500/10 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
            <h3 className="font-heading text-xl text-white tracking-wider mb-2">{c.name}</h3>
            <p className="text-brand-gray-light text-xs mb-4">{c.description}</p>
            <div className="flex items-center justify-between">
              <div className="font-heading text-2xl text-brand-orange">${c.price} <span className="text-brand-gray font-sans text-xs">USD</span></div>
              <div className="flex gap-2">
                {c.popular && <span className="tag text-xs py-0.5 px-2">Popular</span>}
                {c.active ? <span className="text-xs text-green-400 border border-green-400/20 px-2 py-0.5">Activo</span>
                  : <span className="text-xs text-red-400 border border-red-400/20 px-2 py-0.5">Inactivo</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-charcoal border border-brand-border w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-brand-border">
              <h2 className="font-heading text-2xl text-white tracking-wider">{editingId ? 'Editar Reto' : 'Nuevo Reto'}</h2>
              <button onClick={() => setShowForm(false)} className="text-brand-gray hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Nombre</label>
                <input className="input-dark" value={form.name ?? ''} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Días</label>
                  <input type="number" className="input-dark" value={form.duration_days ?? 15} onChange={e => setForm({ ...form, duration_days: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Precio</label>
                  <input type="number" className="input-dark" value={form.price ?? 0} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">Moneda</label>
                  <select className="select-dark" value={form.currency ?? 'USD'} onChange={e => setForm({ ...form, currency: e.target.value })}>
                    <option value="USD">USD</option>
                    <option value="PEN">PEN</option>
                  </select>
                </div>
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
            <Flame size={32} className="text-red-400 mx-auto mb-4" />
            <h3 className="font-heading text-2xl text-white tracking-wider mb-2">¿Eliminar reto?</h3>
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
