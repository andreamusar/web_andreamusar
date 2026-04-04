'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { MOCK_TESTIMONIALS } from '@/lib/constants'

export default function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-24 bg-brand-black relative overflow-hidden">
      {/* Background text */}
      <div className="absolute bottom-0 left-0 font-heading text-[15rem] text-white/[0.02] leading-none select-none pointer-events-none uppercase">
        Resultados
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Testimonios"
          title="LO QUE DICEN MIS"
          highlight="CLIENTES"
          subtitle="Historias reales de personas reales que decidieron transformar sus vidas."
          center
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-dark p-6 relative group hover:border-brand-orange transition-colors duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="text-brand-orange/30 mb-4 group-hover:text-brand-orange/50 transition-colors"
                fill="currentColor"
              />

              {/* Stars */}
              <div className="flex text-brand-orange text-sm mb-4">★★★★★</div>

              {/* Quote */}
              <p className="text-white/80 text-sm leading-relaxed italic flex-1 mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Result badge */}
              <div className="inline-block bg-brand-orange/10 border border-brand-orange/30 px-3 py-1.5 mb-6">
                <span className="text-brand-orange text-xs font-bold uppercase tracking-widest">
                  ✓ {testimonial.result}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-brand-border">
                <div className="w-10 h-10 bg-brand-orange/20 border border-brand-orange/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-brand-orange text-sm">
                    {testimonial.client_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{testimonial.client_name}</div>
                  <div className="text-brand-gray text-xs uppercase tracking-wider">{testimonial.goal}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
