'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Package, Briefcase, ShoppingCart, Users, MessageSquare, Flame, TrendingUp, ArrowRight } from 'lucide-react'
import { MOCK_PRODUCTS, MOCK_SERVICES, MOCK_TESTIMONIALS } from '@/lib/constants'

const statCards = [
  { label: 'Productos', value: MOCK_PRODUCTS.length, icon: Package, href: '/admin/productos', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { label: 'Servicios', value: MOCK_SERVICES.length, icon: Briefcase, href: '/admin/servicios', color: 'text-green-400', bg: 'bg-green-500/10' },
  { label: 'Pedidos', value: 0, icon: ShoppingCart, href: '/admin/pedidos', color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { label: 'Clientes', value: 0, icon: Users, href: '/admin/clientes', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Leads', value: 0, icon: MessageSquare, href: '/admin/leads', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { label: 'Retos Activos', value: 3, icon: Flame, href: '/admin/challenges', color: 'text-red-400', bg: 'bg-red-500/10' },
]

const quickLinks = [
  { label: 'Nuevo Producto', href: '/admin/productos', icon: Package },
  { label: 'Nuevo Servicio', href: '/admin/servicios', icon: Briefcase },
  { label: 'Ver Leads', href: '/admin/leads', icon: MessageSquare },
  { label: 'Ver Pedidos', href: '/admin/pedidos', icon: ShoppingCart },
]

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-white tracking-wider uppercase">Dashboard</h1>
        <p className="text-brand-gray-light text-sm mt-1">Bienvenida, Andrea. Aqui tienes el resumen de tu negocio.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              href={stat.href}
              className="block bg-brand-charcoal border border-brand-border p-6 hover:border-brand-orange transition-colors group"
            >
              <div className={`w-10 h-10 ${stat.bg} flex items-center justify-center mb-4`}>
                <stat.icon size={20} className={stat.color} />
              </div>
              <div className="font-heading text-4xl text-white mb-1">{stat.value}</div>
              <div className="text-brand-gray-light text-sm flex items-center justify-between">
                {stat.label}
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-orange" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions + Recent */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick links */}
        <div className="bg-brand-charcoal border border-brand-border p-6">
          <h2 className="font-heading text-xl text-white tracking-wider uppercase mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-brand-orange" />
            Acciones Rapidas
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-4 bg-brand-black border border-brand-border hover:border-brand-orange transition-colors group"
              >
                <link.icon size={18} className="text-brand-orange" />
                <span className="text-white text-sm font-medium group-hover:text-brand-orange transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent products */}
        <div className="bg-brand-charcoal border border-brand-border p-6">
          <h2 className="font-heading text-xl text-white tracking-wider uppercase mb-6">
            Productos Recientes
          </h2>
          <div className="space-y-3">
            {MOCK_PRODUCTS.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center justify-between py-2 border-b border-brand-border last:border-0">
                <div>
                  <div className="text-white text-sm font-medium">{product.name}</div>
                  <div className="text-brand-gray text-xs">{product.brand}</div>
                </div>
                <div className="text-right">
                  <div className="text-brand-orange font-bold text-sm">${product.price}</div>
                  <div className="text-brand-gray text-xs">Stock: {product.stock}</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/admin/productos" className="mt-4 block text-center text-brand-orange text-xs font-bold uppercase tracking-widest hover:text-brand-orange-light transition-colors">
            Ver todos →
          </Link>
        </div>
      </div>
    </div>
  )
}
