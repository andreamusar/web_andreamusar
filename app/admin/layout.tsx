'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, Package, Briefcase, ShoppingCart, Users,
  MessageSquare, Flame, LogOut, Zap, Menu, X, ChevronRight
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const adminLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Productos', href: '/admin/productos', icon: Package },
  { label: 'Servicios', href: '/admin/servicios', icon: Briefcase },
  { label: 'Pedidos', href: '/admin/pedidos', icon: ShoppingCart },
  { label: 'Leads', href: '/admin/leads', icon: MessageSquare },
  { label: 'Clientes', href: '/admin/clientes', icon: Users },
  { label: 'Retos', href: '/admin/challenges', icon: Flame },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (pathname === '/admin/login') return <>{children}</>

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-brand-charcoal border-r border-brand-border">
      {/* Logo */}
      <div className="p-6 border-b border-brand-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-orange flex items-center justify-center">
            <Zap size={16} className="text-black" fill="black" />
          </div>
          <div>
            <div className="font-heading text-base text-white tracking-widest">ANDREA MUSAR</div>
            <div className="text-brand-gray text-xs">Panel Admin</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {adminLinks.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-brand-orange text-black'
                  : 'text-white/70 hover:bg-brand-charcoal-light hover:text-white'
              }`}
            >
              <link.icon size={17} />
              {link.label}
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-brand-border">
        <button
          onClick={handleLogout}
          id="admin-logout"
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white/50 hover:text-red-400 transition-colors w-full"
        >
          <LogOut size={17} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-brand-black flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 fixed top-0 left-0 h-screen z-40">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 h-full">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-brand-charcoal/95 backdrop-blur border-b border-brand-border px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-white/70 hover:text-white"
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>
          <div className="font-heading text-lg text-white tracking-widest hidden lg:block">
            {adminLinks.find((l) => l.href === pathname)?.label ?? 'Panel Admin'}
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <Link href="/" target="_blank" className="text-xs text-brand-gray hover:text-white transition-colors uppercase tracking-widest">
              Ver Sitio →
            </Link>
          </div>
        </div>

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
