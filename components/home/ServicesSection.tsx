'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Monitor, Users, ShoppingBag, ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

const services = [
  {
    icon: Monitor,
    tag: 'Online',
    title: 'Coaching Online',
    description:
      'Entrena desde cualquier parte del mundo con planes personalizados, seguimiento semanal y soporte constante.',
    features: ['Plan de entrenamiento personalizado', 'Plan nutricional', 'Seguimiento semanal', 'Soporte por WhatsApp'],
    price: 'Desde $99/mes',
    href: '/servicios',
    cta: 'Ver planes',
    highlight: false,
  },
  {
    icon: Users,
    tag: 'Presencial',
    title: 'Entrenamiento Presencial',
    description:
      'Entrena cara a cara con Andrea en Lima, Santa Anita. Correccion de tecnica, motivacion y resultados garantizados.',
    features: ['4 sesiones por mes', 'Evaluacion fisica', 'Correccion de tecnica', 'Plan de entrenamiento'],
    price: 'Desde S/ 200/mes',
    href: '/servicios',
    cta: 'Reservar sesion',
    highlight: true,
  },
  {
    icon: ShoppingBag,
    tag: 'Tienda',
    title: 'Suplementos Deportivos',
    description:
      'Compra los mejores suplementos del mercado con recomendacion personalizada de Andrea para potenciar tus resultados.',
    features: ['Proteinas y BCAA', 'Pre-entrenos', 'Vitaminas y minerales', 'Accesorios de gym'],
    price: 'Envio a todo Lima',
    href: '/tienda',
    cta: 'Ver tienda',
    highlight: false,
  },
]

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-24 bg-brand-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          tag="Servicios"
          title="TODO LO QUE"
          highlight="NECESITAS"
          subtitle="Entrenamiento online, presencial y suplementacion — todo en un mismo lugar, con una sola entrenadora."
          center
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative group flex flex-col ${
                service.highlight
                  ? 'border-2 border-brand-orange'
                  : 'border border-brand-border'
              } bg-brand-charcoal transition-all duration-500 hover:border-brand-orange hover:-translate-y-2`}
            >
              {service.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="tag px-4 py-1.5">Más Popular</span>
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 ${
                    service.highlight ? 'bg-brand-orange' : 'bg-brand-charcoal-light border border-brand-border'
                  }`}>
                    <service.icon size={22} className={service.highlight ? 'text-black' : 'text-brand-orange'} />
                  </div>
                  <div>
                    <span className="tag-outline text-xs mb-2 inline-block">{service.tag}</span>
                    <h3 className="font-heading text-2xl text-white tracking-wider">{service.title}</h3>
                  </div>
                </div>

                <p className="text-brand-gray-light text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8 flex-1">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="mt-auto">
                  <div className="text-brand-orange font-heading text-xl tracking-wider mb-4">
                    {service.price}
                  </div>
                  <Link
                    href={service.href}
                    className={`group/btn flex items-center justify-center gap-2 w-full py-3 font-bold text-sm uppercase tracking-widest transition-all duration-300 ${
                      service.highlight
                        ? 'bg-brand-orange text-black hover:bg-brand-orange-dark'
                        : 'border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-black'
                    }`}
                  >
                    {service.cta}
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
