'use client'

import { motion } from 'framer-motion'
import { Users, Mail, Phone } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const mockClients = [
  { id: '1', name: 'Maria Garcia', email: 'maria@gmail.com', phone: '51987001122', goal: 'Perdida de grasa', created_at: '2023-11-15' },
  { id: '2', name: 'Carlos Mendoza', email: 'carlos@gmail.com', phone: '51987002233', goal: 'Ganancia muscular', created_at: '2023-10-20' },
  { id: '3', name: 'Lucia Ramirez', email: 'lucia@gmail.com', phone: '51987003344', goal: 'Tonificacion y fuerza', created_at: '2023-12-01' },
  { id: '4', name: 'Diego Paredes', email: 'diego@gmail.com', phone: '51987004455', goal: 'Definicion muscular', created_at: '2024-01-05' },
  { id: '5', name: 'Ana Varela', email: 'ana@gmail.com', phone: '51987005566', goal: 'Post-parto y reconexion', created_at: '2023-09-10' },
  { id: '6', name: 'Roberto Salinas', email: 'roberto@gmail.com', phone: '51987006677', goal: 'Rendimiento deportivo', created_at: '2023-08-22' },
]

export default function AdminClientsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-white tracking-wider uppercase">Clientes</h1>
        <p className="text-brand-gray-light text-sm mt-1">{mockClients.length} clientes registrados</p>
      </div>

      <div className="bg-brand-charcoal border border-brand-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border bg-brand-black/30">
                <th className="text-left px-6 py-4 text-xs font-bold text-brand-gray uppercase tracking-widest">Cliente</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-brand-gray uppercase tracking-widest hidden md:table-cell">Email</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-brand-gray uppercase tracking-widest hidden lg:table-cell">Teléfono</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-brand-gray uppercase tracking-widest">Objetivo</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-brand-gray uppercase tracking-widest hidden sm:table-cell">Registro</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-brand-gray uppercase tracking-widest">Contactar</th>
              </tr>
            </thead>
            <tbody>
              {mockClients.map((client, i) => (
                <motion.tr key={client.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                  className="border-b border-brand-border last:border-0 hover:bg-brand-black/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-brand-orange/10 border border-brand-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-heading text-brand-orange text-base">{client.name.charAt(0)}</span>
                      </div>
                      <span className="text-white text-sm font-medium">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-brand-gray-light text-sm hidden md:table-cell">{client.email}</td>
                  <td className="px-6 py-4 text-brand-gray-light text-sm hidden lg:table-cell">{client.phone}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-brand-gray-light">{client.goal}</span>
                  </td>
                  <td className="px-6 py-4 text-brand-gray text-xs hidden sm:table-cell">{formatDate(client.created_at)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`https://wa.me/${client.phone}`} target="_blank" rel="noopener noreferrer"
                        className="p-2 text-green-400 hover:bg-green-500/10 transition-colors" title="WhatsApp"
                      >
                        <Phone size={14} />
                      </a>
                      <a href={`mailto:${client.email}`}
                        className="p-2 text-brand-gray hover:text-white hover:bg-brand-charcoal-light transition-colors" title="Email"
                      >
                        <Mail size={14} />
                      </a>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
