'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Eye, ChevronDown } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

const mockOrders = [
  { id: 'ORD-001', client: 'Maria Garcia', email: 'maria@example.com', items: [{ name: 'Whey Protein Gold Standard', quantity: 1, price: 89.90 }], total: 89.90, status: 'confirmed' as OrderStatus, created_at: '2024-01-20' },
  { id: 'ORD-002', client: 'Carlos Mendoza', email: 'carlos@example.com', items: [{ name: 'C4 Pre-Workout', quantity: 2, price: 44.90 }, { name: 'Creatina Monohidrato', quantity: 1, price: 24.90 }], total: 114.70, status: 'pending' as OrderStatus, created_at: '2024-01-21' },
  { id: 'ORD-003', client: 'Lucia Ramirez', email: 'lucia@example.com', items: [{ name: 'BCAA 2:1:1', quantity: 1, price: 34.90 }], total: 34.90, status: 'delivered' as OrderStatus, created_at: '2024-01-18' },
]

const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: 'Pendiente', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  confirmed: { label: 'Confirmado', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  shipped: { label: 'Enviado', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  delivered: { label: 'Entregado', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  cancelled: { label: 'Cancelado', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-4xl text-white tracking-wider uppercase">Pedidos</h1>
          <p className="text-brand-gray-light text-sm mt-1">{orders.length} pedidos · Revenue: {formatCurrency(totalRevenue)}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
        {(Object.keys(statusConfig) as OrderStatus[]).map(status => {
          const count = orders.filter(o => o.status === status).length
          const cfg = statusConfig[status]
          return (
            <div key={status} className={`p-4 border text-center ${cfg.color}`}>
              <div className="font-heading text-3xl">{count}</div>
              <div className="text-xs uppercase tracking-widest mt-1">{cfg.label}</div>
            </div>
          )
        })}
      </div>

      {/* Orders */}
      <div className="space-y-3">
        {orders.map((order, i) => (
          <motion.div key={order.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-brand-charcoal border border-brand-border"
          >
            <div className="flex items-center gap-4 p-5">
              <div className="w-10 h-10 bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center flex-shrink-0">
                <ShoppingCart size={16} className="text-brand-orange" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-brand-orange text-sm font-bold">{order.id}</span>
                  <span className="text-white text-sm font-medium">{order.client}</span>
                  <span className="text-brand-gray text-xs">{order.email}</span>
                </div>
                <div className="text-brand-gray text-xs mt-1">{order.created_at} · {order.items.length} producto(s)</div>
              </div>
              <div className="text-right">
                <div className="font-heading text-xl text-white mb-1">{formatCurrency(order.total)}</div>
                <span className={`text-xs font-bold border px-2 py-0.5 uppercase tracking-wider ${statusConfig[order.status].color}`}>
                  {statusConfig[order.status].label}
                </span>
              </div>
              <button onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                className="p-2 text-brand-gray hover:text-white transition-colors"
              >
                <ChevronDown size={18} className={`transition-transform duration-300 ${expandedId === order.id ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Expanded detail */}
            {expandedId === order.id && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-brand-border px-5 pb-5"
              >
                <div className="pt-4 mb-4">
                  <div className="text-xs font-bold text-brand-gray-light uppercase tracking-widest mb-3">Productos</div>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-brand-border last:border-0">
                      <span className="text-white/80 text-sm">{item.name} × {item.quantity}</span>
                      <span className="text-white text-sm font-medium">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3">
                    <span className="text-brand-gray-light text-sm font-bold">Total</span>
                    <span className="text-brand-orange font-heading text-xl">{formatCurrency(order.total)}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-brand-gray-light uppercase tracking-widest mb-2">Cambiar estado</div>
                  <div className="flex gap-2 flex-wrap">
                    {(Object.keys(statusConfig) as OrderStatus[]).map(s => (
                      <button key={s} onClick={() => updateStatus(order.id, s)}
                        className={`text-xs font-bold px-3 py-1.5 uppercase tracking-widest border transition-colors ${order.status === s ? statusConfig[s].color : 'border-brand-border text-brand-gray hover:border-brand-orange hover:text-white'}`}
                      >
                        {statusConfig[s].label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20 text-brand-gray-light">
          <ShoppingCart size={40} className="mx-auto mb-4 opacity-30" />
          <p>No hay pedidos aún.</p>
        </div>
      )}
    </div>
  )
}
