'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Eye, Trash2, ExternalLink } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

const mockLeads = [
  { id: '1', name: 'Roberto Silva', email: 'roberto@gmail.com', phone: '51987654321', goal: 'Ganancia muscular', service_interest: 'Plan Premium Online', created_at: '2024-01-22' },
  { id: '2', name: 'Valeria Torres', email: 'valeria@gmail.com', phone: '51976543210', goal: 'Perdida de grasa', service_interest: 'Plan Standard Online', created_at: '2024-01-21' },
  { id: '3', name: 'Diego Fuentes', email: 'diego@gmail.com', phone: '51965432109', goal: 'Tonificacion', service_interest: 'Entrenamiento Presencial', created_at: '2024-01-20' },
  { id: '4', name: 'Camila Vega', email: 'camila@gmail.com', phone: '51954321098', goal: 'Reto fitness', service_interest: 'Reto 30 Dias', created_at: '2024-01-19' },
]

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState(mockLeads)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = leads.find(l => l.id === selectedId)

  const handleDelete = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-white tracking-wider uppercase">Leads</h1>
        <p className="text-brand-gray-light text-sm mt-1">{leads.length} consultas recibidas</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-3 space-y-3">
          {leads.map((lead, i) => (
            <motion.div key={lead.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
              onClick={() => setSelectedId(lead.id === selectedId ? null : lead.id)}
              className={`bg-brand-charcoal border p-5 cursor-pointer transition-all duration-200 ${selectedId === lead.id ? 'border-brand-orange' : 'border-brand-border hover:border-brand-orange/50'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-heading text-brand-orange text-lg">{lead.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{lead.name}</div>
                    <div className="text-brand-gray text-xs">{lead.email}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="tag-outline text-xs">{lead.service_interest.split(' ').slice(0, 2).join(' ')}</div>
                  <div className="text-brand-gray text-xs mt-1">{formatDate(lead.created_at)}</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-brand-gray-light">
                <span className="text-brand-orange">Objetivo:</span>
                {lead.goal}
              </div>
            </motion.div>
          ))}

          {leads.length === 0 && (
            <div className="text-center py-16 text-brand-gray-light">
              <MessageSquare size={36} className="mx-auto mb-3 opacity-30" />
              <p>No hay leads aún.</p>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          {selected ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-brand-charcoal border border-brand-border p-6 sticky top-24"
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="font-heading text-xl text-white tracking-wider uppercase">Detalle del Lead</h2>
                <button onClick={() => setSelectedId(null)} className="text-brand-gray hover:text-white text-xs">✕</button>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Nombre', value: selected.name },
                  { label: 'Email', value: selected.email },
                  { label: 'Teléfono', value: selected.phone },
                  { label: 'Objetivo', value: selected.goal },
                  { label: 'Servicio de interés', value: selected.service_interest },
                  { label: 'Fecha', value: formatDate(selected.created_at) },
                ].map(({ label, value }) => (
                  <div key={label} className="border-b border-brand-border pb-3">
                    <div className="text-xs font-bold text-brand-gray-light uppercase tracking-widest mb-1">{label}</div>
                    <div className="text-white text-sm">{value}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-6">
                <a
                  href={`https://wa.me/${selected.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${selected.name}! Soy Andrea Musar. Vi tu consulta sobre ${selected.service_interest}.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-green-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-green-700 transition-colors"
                >
                  <ExternalLink size={13} /> Contactar por WhatsApp
                </a>
                <a
                  href={`mailto:${selected.email}?subject=Consulta%20sobre%20${encodeURIComponent(selected.service_interest)}&body=Hola%20${selected.name}!`}
                  className="flex items-center justify-center gap-2 py-3 border border-brand-border text-white/70 text-xs font-bold uppercase tracking-widest hover:border-brand-orange hover:text-white transition-colors"
                >
                  <ExternalLink size={13} /> Enviar Email
                </a>
                <button onClick={() => handleDelete(selected.id)}
                  className="flex items-center justify-center gap-2 py-3 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={13} /> Eliminar lead
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-brand-charcoal border border-brand-border p-8 text-center text-brand-gray-light">
              <Eye size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Selecciona un lead para ver el detalle</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
