'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle, Award, Users, Target } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'

const credentials = [
  'Certificada en Entrenamiento Personal (NASM)',
  'Especialista en Nutricion Deportiva',
  'Mas de 4 años de experiencia',
  '+500 clientes transformados en Peru',
  'Especialista en transformacion femenina',
  'Experta en musculacion y definicion',
]

const pillars = [
  {
    icon: Target,
    title: 'PLANES PERSONALIZADOS',
    desc: 'Cada plan esta disenado 100% para tu cuerpo, objetivo y ritmo de vida. Sin plantillas genéricas.',
  },
  {
    icon: Users,
    title: 'PARA TODOS',
    desc: 'Principiantes, avanzados, hombres y mujeres. Adapto la intensidad y metodo a tu nivel.',
  },
  {
    icon: Award,
    title: 'RESULTADOS REALES',
    desc: 'No vendo promesas milagrosas. Te doy metodos probados, disciplina guiada y resultados sostenibles.',
  },
]

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="py-24 bg-brand-charcoal relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-brand-orange/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image with text overlay */}
            <div className="relative aspect-[3/4] max-w-sm mx-auto rounded-xl overflow-hidden border border-brand-border/50">
              <Image
                src="/images/about.jpg"
                alt="Andrea Musar"
                fill
                className="object-cover object-center"
              />

              {/* Text overlay at the bottom center */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-12 flex flex-col items-center justify-end text-center z-10">
                <p className="font-heading text-2xl text-white tracking-wider mb-1">ANDREA MUSAR</p>
                <p className="text-brand-orange text-xs sm:text-sm uppercase tracking-widest font-bold">
                  Personal Trainer, <span className="text-brand-gray-light font-normal text-xs">Lima, Peru</span>
                </p>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="absolute -bottom-6 -right-6 bg-brand-orange p-5 shadow-xl shadow-brand-orange/30"
              >
                <div className="font-heading text-3xl text-black leading-none">500+</div>
                <div className="text-black/80 text-xs font-bold uppercase tracking-wider">Clientes</div>
              </motion.div>

              {/* Corner accent */}
              <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-brand-orange" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-brand-orange" style={{ bottom: '-1rem', right: '-1rem' }} />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionTitle
              tag="Sobre Mí"
              title="POR QUÉ ENTRENAR"
              highlight="CONMIGO"
              subtitle="Soy Andrea Musar, entrenadora personal certificada en Lima, Peru, especializada en transformacion corporal real para hombres y mujeres."
            />

            <p className="text-brand-gray-light leading-relaxed mt-6 mb-8">
              Mi mision es simple: ayudarte a alcanzar el cuerpo que quieres con metodos
              cientificos, disciplina y acompanamiento constante. No importa tu punto de
              partida — lo importante es que des el primer paso.
            </p>

            {/* Credentials */}
            <div className="grid grid-cols-1 gap-3 mb-10">
              {credentials.map((cred, i) => (
                <motion.div
                  key={cred}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle size={16} className="text-brand-orange flex-shrink-0" />
                  <span className="text-white text-sm">{cred}</span>
                </motion.div>
              ))}
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 gap-4">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-brand-black/40 border-l-2 border-brand-orange"
                >
                  <pillar.icon size={20} className="text-brand-orange flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-heading text-base text-white tracking-wider mb-1">{pillar.title}</div>
                    <div className="text-brand-gray-light text-sm">{pillar.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
