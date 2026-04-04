'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Dumbbell } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-brand-charcoal to-brand-black" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-orange/5 rounded-full blur-3xl" />
      </div>

      {/* Big 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-heading text-[20rem] md:text-[30rem] text-white/[0.03] leading-none">
          404
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 bg-brand-orange flex items-center justify-center">
            <Dumbbell size={40} className="text-black" />
          </div>
        </motion.div>

        <span className="tag mb-6 inline-block">Error 404</span>

        <h1 className="font-heading text-6xl md:text-8xl text-white uppercase tracking-wider mb-4 leading-none">
          PÁGINA NO<br />
          <span className="text-brand-orange">ENCONTRADA</span>
        </h1>

        <p className="text-brand-gray-light text-lg mb-10 max-w-md mx-auto">
          Parece que esta page salió a entrenar y no volvió. 
          No te preocupes, volvamos al inicio y seguimos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver al inicio
          </Link>
          <Link href="/contacto" className="btn-outline">
            Contactar a Andrea
          </Link>
        </div>

        <div className="mt-12 flex gap-6 justify-center text-sm text-brand-gray">
          <Link href="/servicios" className="hover:text-brand-orange transition-colors">Servicios</Link>
          <Link href="/tienda" className="hover:text-brand-orange transition-colors">Tienda</Link>
          <Link href="/blog" className="hover:text-brand-orange transition-colors">Blog</Link>
          <Link href="/resultados" className="hover:text-brand-orange transition-colors">Resultados</Link>
        </div>
      </motion.div>
    </div>
  )
}
