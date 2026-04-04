'use client'

import { motion } from 'framer-motion'
import { TrendingDown, TrendingUp, Flame } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

const results = [
  {
    client: 'Maria G.',
    goal: 'Perdida de grasa',
    icon: TrendingDown,
    stat: '-12 kg',
    period: '3 meses',
    color: 'from-orange-500/20 to-transparent',
  },
  {
    client: 'Carlos M.',
    goal: 'Ganancia muscular',
    icon: TrendingUp,
    stat: '+8 kg',
    subStat: 'masa muscular',
    period: '4 meses',
    color: 'from-blue-500/20 to-transparent',
  },
  {
    client: 'Lucia R.',
    goal: 'Fuerza y tonificacion',
    icon: Flame,
    stat: 'x2',
    subStat: 'fuerza',
    period: '2 meses',
    color: 'from-green-500/20 to-transparent',
  },
]

const globalStats = [
  { value: '500+', label: 'Clientes Transformados', suffix: '' },
  { value: '12', label: 'Kg promedio perdidos', suffix: 'kg' },
  { value: '98', label: 'Satisfaccion del cliente', suffix: '%' },
  { value: '4+', label: 'Anos de experiencia', suffix: '' },
]

export default function ResultsSection() {
  return (
    <section id="resultados" className="py-24 bg-brand-charcoal relative overflow-hidden">
      {/* Decorative number */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 font-heading text-[20rem] text-white/[0.02] leading-none select-none pointer-events-none">
        500
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Resultados"
          title="TRANSFORMACIONES"
          highlight="REALES"
          subtitle="Numeros reales de clientes reales. Sin Photoshop, sin promesas vacias."
          center
          className="mb-16"
        />

        {/* Global stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {globalStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-brand-black border border-brand-border hover:border-brand-orange transition-colors duration-300"
            >
              <div className="font-heading text-5xl text-brand-orange leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-brand-gray-light text-xs uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Before/After cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {results.map((result, i) => (
            <motion.div
              key={result.client}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-brand-black border border-brand-border overflow-hidden group hover:border-brand-orange transition-colors duration-300"
            >
              {/* Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${result.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Before/After visual */}
              <div className="relative h-48 flex">
                <div className="flex-1 bg-brand-charcoal-light flex items-center justify-center border-r border-brand-border">
                  <div className="text-center">
                    <div className="text-brand-gray text-xs uppercase tracking-widest mb-2">Antes</div>
                    <div className="w-16 h-16 bg-brand-charcoal-mid rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl">😔</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-brand-charcoal flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-brand-orange text-xs uppercase tracking-widest mb-2">Después</div>
                    <div className="w-16 h-16 bg-brand-orange/20 border border-brand-orange/30 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-2xl">💪</span>
                    </div>
                  </div>
                </div>
                {/* VS badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-orange text-black font-bold text-xs flex items-center justify-center z-10">
                  VS
                </div>
              </div>

              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-heading text-xl text-white tracking-wider">{result.client}</div>
                    <div className="text-brand-gray-light text-xs uppercase tracking-widest">{result.goal}</div>
                  </div>
                  <result.icon size={24} className="text-brand-orange" />
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-4xl text-brand-orange">{result.stat}</span>
                  {result.subStat && (
                    <span className="text-brand-gray-light text-sm">{result.subStat}</span>
                  )}
                </div>
                <div className="text-brand-gray text-xs uppercase tracking-widest mt-1">
                  en {result.period}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
