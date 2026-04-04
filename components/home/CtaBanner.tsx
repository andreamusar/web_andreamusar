'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section className="py-16 bg-brand-orange relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap size={20} className="text-black" fill="black" />
            <span className="text-black font-bold text-sm uppercase tracking-widest">Empieza Hoy</span>
          </div>
          <h2 className="font-heading text-5xl md:text-6xl text-black uppercase tracking-wider mb-4">
            El mejor momento para empezar<br />fue ayer. El segundo mejor es ahora.
          </h2>
          <p className="text-black/70 text-lg mb-8 font-medium">
            No esperes mas. Tu transformacion comienza con un solo mensaje.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-black text-white font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-brand-charcoal hover:scale-105 group"
            >
              Ver Todos los Planes
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-black text-black font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-black hover:text-white hover:scale-105"
            >
              Contactar Ahora
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
