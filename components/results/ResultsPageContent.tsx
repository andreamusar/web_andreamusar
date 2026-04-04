'use client'

import { motion } from 'framer-motion'
import { Quote, TrendingUp } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { MOCK_TESTIMONIALS } from '@/lib/constants'

const stories = [
  {
    name: 'Maria Gutierrez',
    age: 28,
    goal: 'Perdida de grasa y tonificacion',
    story: 'Lleve 2 anos intentando bajar de peso sin resultados reales. Cuando empece con Andrea, todo cambio. El primer mes perdi 4kg, y en 3 meses ya habia transformado por completo mi composicion corporal. Su plan nutricional fue clave — no me privé de nada, aprendi a comer bien. Ahora soy otra persona.',
    result: '-12kg en 3 meses',
    duration: '3 meses',
    service: 'Plan Standard Online',
  },
  {
    name: 'Carlos Mendoza',
    age: 32,
    goal: 'Ganancia de masa muscular',
    story: 'Soy ectomorfo — toda mi vida fui el flaco que no podia ganar musculo. Andrea me diseno un plan especifico para mi biotipo con progresion de cargas y calorías calculadas. En 4 meses gane 8kg de masa muscular real (no grasa). La gente que me conoce no puede creerlo.',
    result: '+8kg masa muscular en 4 meses',
    duration: '4 meses',
    service: 'Plan Premium Online',
  },
  {
    name: 'Ana Varela',
    age: 35,
    goal: 'Recuperacion post-parto',
    story: 'Despues de mi segundo embarazo me sentia muy lejos de mi cuerpo. Con mucha paciencia y un plan adaptado a mi recuperacion, Andrea me ayudo a volver a sentirme yo. Sin prisa, sin presion, con mucho respeto por mis tiempos. Hoy me siento mejor que antes de quedar embarazada.',
    result: 'Recuperacion completa en 4 meses',
    duration: '5 meses',
    service: 'Entrenamiento Presencial',
  },
]

const stats = [
  { value: '500+', label: 'Transformaciones', icon: '🏆' },
  { value: '98%', label: 'Satisfaccion', icon: '⭐' },
  { value: '-12kg', label: 'Promedio perdida', icon: '📉' },
  { value: '+8kg', label: 'Promedio ganancia', icon: '💪' },
]

export default function ResultsPageContent() {
  return (
    <div className="pt-20 bg-brand-black min-h-screen">
      {/* Hero */}
      <div className="py-20 bg-brand-charcoal border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="tag mb-4 inline-block">Resultados</span>
            <h1 className="font-heading text-6xl md:text-8xl text-white uppercase tracking-wider mb-6">
              TRANSFORMACIONES <span className="text-brand-orange">REALES</span>
            </h1>
            <p className="text-brand-gray-light text-lg max-w-2xl mx-auto">
              Sin filtros, sin Photoshop. Resultados de personas reales que confiaron en el metodo de Andrea Musar.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-charcoal border border-brand-border p-6 text-center hover:border-brand-orange transition-colors"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="font-heading text-4xl text-brand-orange">{stat.value}</div>
              <div className="text-brand-gray-light text-xs uppercase tracking-widest mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Before/After section */}
        <SectionTitle
          tag="Antes & Después"
          title="CLIENTES"
          highlight="TRANSFORMADOS"
          subtitle="Resultados de clientes reales trabajando con el metodo Andrea Musar."
          className="mb-12"
        />

        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {MOCK_TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-dark group hover:border-brand-orange transition-colors duration-300"
            >
              {/* Before/After Grid */}
              <div className="grid grid-cols-2 h-40">
                <div className="bg-brand-charcoal-light flex items-center justify-center border-r border-brand-border">
                  <div className="text-center">
                    <div className="text-brand-gray text-xs uppercase tracking-widest mb-2">Antes</div>
                    <div className="text-4xl">😔</div>
                  </div>
                </div>
                <div className="bg-brand-charcoal flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="text-brand-orange text-xs uppercase tracking-widest mb-2">Después</div>
                    <div className="text-4xl">💪</div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <div className="bg-brand-orange text-black text-xs font-bold px-2 py-0.5 uppercase tracking-wider">
                      {testimonial.result.split(' ').slice(0, 2).join(' ')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex text-brand-orange text-xs mb-3">★★★★★</div>
                <p className="text-white/70 text-xs leading-relaxed italic mb-4">
                  &ldquo;{testimonial.quote.substring(0, 120)}...&rdquo;
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                  <div>
                    <div className="text-white text-sm font-semibold">{testimonial.client_name}</div>
                    <div className="text-brand-gray text-xs uppercase tracking-wider">{testimonial.goal}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-brand-orange text-xs font-bold">{testimonial.result}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transformation Stories */}
        <SectionTitle
          tag="Historias"
          title="HISTORIAS DE"
          highlight="TRANSFORMACION"
          subtitle="El proceso completo detrás de los resultados. Las historias reales del camino."
          className="mb-12"
        />

        <div className="space-y-8">
          {stories.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-charcoal border border-brand-border p-8 md:p-10 flex flex-col md:flex-row gap-8"
            >
              {/* Avatar + stats */}
              <div className="flex-shrink-0 text-center md:w-44">
                <div className="w-20 h-20 bg-brand-orange/10 border-2 border-brand-orange/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading text-3xl text-brand-orange">
                    {story.name.charAt(0)}
                  </span>
                </div>
                <div className="font-semibold text-white text-sm mb-1">{story.name}</div>
                <div className="text-brand-gray text-xs mb-3">{story.age} años</div>
                <div className="bg-brand-orange/10 border border-brand-orange/20 px-3 py-2">
                  <div className="text-brand-orange text-xs font-bold uppercase tracking-widest">
                    {story.result}
                  </div>
                </div>
              </div>

              {/* Story */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-4">
                  <Quote size={24} className="text-brand-orange/30 flex-shrink-0 mt-1" fill="currentColor" />
                  <div>
                    <div className="font-heading text-xl text-white tracking-wider mb-1">{story.goal}</div>
                    <div className="flex items-center gap-3 text-xs text-brand-gray-light">
                      <span className="flex items-center gap-1">
                        <TrendingUp size={12} />{story.duration}
                      </span>
                      <span>•</span>
                      <span>{story.service}</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed text-sm italic">
                  &ldquo;{story.story}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
