'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Dumbbell, ShoppingBag, ChevronDown } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const stats = [
  { value: '500+', label: 'Clientes Transformados' },
  { value: '4+', label: 'Años de Experiencia' },
  { value: '98%', label: 'Satisfacción' },
  { value: '3', label: 'Retos Disponibles' },
]

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-black"
    >
      {/* Full-screen Background Image with dark fitness-themed gradient overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <Image 
          src="/images/hero.jpg" 
          alt="Hero Background Placeholder" 
          fill 
          className="object-cover opacity-30 object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-black via-brand-black/90 to-brand-charcoal/80" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(249,115,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="tag">Personal Trainer Lima, Peru</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-8xl text-white uppercase tracking-wide leading-none mb-6"
            >
              TRANSFORMA
              <br />
              TU{' '}
              <span className="text-brand-orange text-glow-orange">CUERPO</span>
              <br />
              AHORA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-brand-gray-light text-lg leading-relaxed mb-10 max-w-lg"
            >
              Coaching personalizado online y presencial en Lima. 
              Planes de entrenamiento, nutricion y suplementacion 
              diseñados para tu cuerpo y tus metas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/servicios"
                id="hero-cta-planes"
                className="btn-primary group text-base"
              >
                <Dumbbell size={18} />
                Ver Planes
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/tienda"
                id="hero-cta-tienda"
                className="btn-outline text-base"
              >
                <ShoppingBag size={18} />
                Comprar Suplementos
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-brand-black bg-brand-charcoal-light flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: `hsl(${i * 40}, 60%, 40%)` }}
                  >
                    {['MG', 'CR', 'LP', 'DP'][i - 1]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-brand-orange text-sm">★★★★★</div>
                <p className="text-brand-gray-light text-xs">+500 clientes transformados</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Hero Photo & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative block mt-12 lg:mt-0"
          >
            {/* Portrait Image of Andrea */}
            <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] max-w-md mx-auto z-10">
              {/* Decorative border behind - perfectly aligned */}
              <div className="absolute -inset-2 border-2 border-brand-orange/30 rounded-2xl -z-10" />
              
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-brand-border/50 bg-brand-charcoal">
                <Image
                  src="/images/hero.jpg"
                  alt="Andrea Musar"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>

            {/* Stats Label moved outside image to avoid overlap */}
            <div className="mt-8 flex justify-center">
              <div className="glass-card p-4 flex items-center gap-4 w-full max-w-md">
                <div className="w-12 h-12 bg-brand-orange flex items-center justify-center flex-shrink-0">
                  <Dumbbell size={24} className="text-black" />
                </div>
                <div>
                  <div className="font-heading text-lg lg:text-xl text-white tracking-wider">ANDREA MUSAR</div>
                  <div className="text-brand-gray-light text-xs lg:text-sm">Personal Trainer Certificada</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-4 gap-4 mt-12 lg:hidden"
        >
          {stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="font-heading text-3xl text-brand-orange">{stat.value}</div>
              <div className="text-brand-gray text-xs uppercase tracking-wider leading-tight mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-gray"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
