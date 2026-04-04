'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Flame, Calendar, ArrowRight, Check } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { MOCK_CHALLENGES, SITE_CONFIG } from '@/lib/constants'

export default function ChallengesSection() {
  return (
    <section id="retos" className="py-24 bg-brand-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Retos Fitness"
          title="ACEPTA EL"
          highlight="RETO"
          subtitle="Programas intensivos de 15, 21 y 30 dias diseñados para resultados rapidos y reales."
          center
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {MOCK_CHALLENGES.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex flex-col ${
                challenge.popular
                  ? 'border-2 border-brand-orange glow-orange'
                  : 'border border-brand-border'
              } bg-brand-black transition-all duration-300 hover:-translate-y-2 hover:border-brand-orange`}
            >
              {challenge.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="tag flex items-center gap-1.5 px-4 py-1.5">
                    <Flame size={12} fill="black" />
                    Mas Popular
                  </span>
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Duration badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-brand-orange flex items-center justify-center flex-shrink-0">
                    <div className="text-center">
                      <div className="font-heading text-2xl text-black leading-none">{challenge.duration_days}</div>
                      <div className="text-black/80 text-xs font-bold">DIAS</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl text-white tracking-wider">{challenge.name}</h3>
                    <div className="flex items-center gap-1 text-brand-gray-light text-xs mt-1">
                      <Calendar size={12} />
                      <span>{challenge.duration_days} dias de reto</span>
                    </div>
                  </div>
                </div>

                <p className="text-brand-gray-light text-sm leading-relaxed mb-6">
                  {challenge.description}
                </p>

                {/* Includes */}
                <ul className="space-y-2 flex-1 mb-8">
                  {challenge.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                      <Check size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-heading text-4xl text-white">${challenge.price}</span>
                    <span className="text-brand-gray-light text-sm">USD</span>
                  </div>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Hola Andrea! Quiero unirme al ${challenge.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3.5 font-bold text-sm uppercase tracking-widest transition-all duration-300 group/btn ${
                      challenge.popular
                        ? 'bg-brand-orange text-black hover:bg-brand-orange-dark'
                        : 'border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-black'
                    }`}
                  >
                    Unirme al Reto
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
