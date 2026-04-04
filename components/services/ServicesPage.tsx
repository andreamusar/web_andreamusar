'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, ArrowRight, Monitor, Users, Flame, Apple } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { MOCK_SERVICES, MOCK_CHALLENGES, SITE_CONFIG } from '@/lib/constants'

const serviceTypeConfig = {
  online: { icon: Monitor, label: 'Online', color: 'text-blue-400' },
  presencial: { icon: Users, label: 'Presencial', color: 'text-green-400' },
  challenge: { icon: Flame, label: 'Reto', color: 'text-brand-orange' },
  nutricion: { icon: Apple, label: 'Nutricion', color: 'text-purple-400' },
}

export default function ServicesPage() {
  const onlineServices = MOCK_SERVICES.filter((s) => s.type === 'online')
  const otherServices = MOCK_SERVICES.filter((s) => s.type !== 'online')

  return (
    <div className="pt-20 bg-brand-black min-h-screen">
      {/* Hero */}
      <div className="py-20 bg-brand-charcoal border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="tag mb-4 inline-block">Servicios</span>
            <h1 className="font-heading text-6xl md:text-8xl text-white uppercase tracking-wider mb-6">
              PLANES <span className="text-brand-orange">&amp;</span> SERVICIOS
            </h1>
            <p className="text-brand-gray-light text-lg max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tus objetivos. Todos los planes incluyen 
              acompañamiento personalizado de Andrea Musar.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Online Coaching */}
        <SectionTitle
          tag="Coaching Online"
          title="PLANES"
          highlight="ONLINE"
          subtitle="Entrena desde cualquier parte del mundo con seguimiento personalizado."
          className="mb-12"
        />

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {onlineServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex flex-col ${
                service.popular
                  ? 'border-2 border-brand-orange'
                  : 'border border-brand-border'
              } bg-brand-charcoal`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="tag px-6 py-1.5">⚡ Mas Elegido</span>
                </div>
              )}
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl text-white tracking-wider mb-2">{service.name}</h3>
                  <p className="text-brand-gray-light text-sm">{service.description}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-brand-border">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-5xl text-white">${service.price}</span>
                    <span className="text-brand-gray-light">{service.currency}/mes</span>
                  </div>
                  <div className="text-brand-gray text-sm mt-1">Duracion: {service.duration}</div>
                </div>

                <div className="mb-6 pb-6 border-b border-brand-border">
                  <div className="text-brand-gray-light text-xs uppercase tracking-widest mb-3">Soporte</div>
                  <div className="text-white text-sm">{service.support_level}</div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <Check size={15} className="text-brand-orange flex-shrink-0 mt-0.5" />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Hola Andrea! Quiero contratar el ${service.name}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-4 font-bold text-sm uppercase tracking-widest transition-all duration-300 group ${
                    service.popular
                      ? 'bg-brand-orange text-black hover:bg-brand-orange-dark'
                      : 'border border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-black'
                  }`}
                >
                  Contratar Plan
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Services */}
        <SectionTitle
          tag="Mas Servicios"
          title="PRESENCIAL &amp;"
          highlight="NUTRICION"
          subtitle="Entrenamiento cara a cara en Lima y planes nutricionales a tu medida."
          className="mb-12"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {otherServices.map((service, i) => {
            const config = serviceTypeConfig[service.type as keyof typeof serviceTypeConfig]
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="border border-brand-border bg-brand-charcoal flex flex-col md:flex-row"
              >
                <div className="flex-1 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <config.icon size={20} className={config.color} />
                    <span className="tag-outline text-xs">{config.label}</span>
                  </div>
                  <h3 className="font-heading text-2xl text-white tracking-wider mb-3">{service.name}</h3>
                  <p className="text-brand-gray-light text-sm mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                        <Check size={13} className="text-brand-orange flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="text-brand-orange font-heading text-xl tracking-wider mb-4">
                    {service.currency === 'PEN' ? `S/ ${service.price}` : `$${service.price}`}/{service.duration}
                  </div>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Hola Andrea! Me interesa el servicio de ${service.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex text-xs"
                  >
                    Consultar Ahora
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Challenges */}
        <SectionTitle
          tag="Retos Fitness"
          title="RETOS DE"
          highlight="TRANSFORMACION"
          subtitle="Programas cortos de alta intensidad para resultados rapidos."
          className="mb-12"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {MOCK_CHALLENGES.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`border ${challenge.popular ? 'border-brand-orange' : 'border-brand-border'} bg-brand-charcoal p-8`}
            >
              <div className="w-16 h-16 bg-brand-orange flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="font-heading text-2xl text-black leading-none">{challenge.duration_days}</div>
                  <div className="text-black/80 text-xs font-bold">DIAS</div>
                </div>
              </div>
              <h3 className="font-heading text-xl text-white tracking-wider mb-3">{challenge.name}</h3>
              <p className="text-brand-gray-light text-sm mb-4">{challenge.description}</p>
              <ul className="space-y-2 mb-6">
                {challenge.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-white/70">
                    <Check size={12} className="text-brand-orange flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="font-heading text-3xl text-white mb-4">${challenge.price} <span className="text-brand-gray text-sm font-sans">USD</span></div>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Hola Andrea! Quiero unirme al ${challenge.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center text-xs py-3"
              >
                Inscribirme al Reto
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
