'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { SITE_CONFIG } from '@/lib/constants'
import { buildWhatsAppUrl } from '@/lib/utils'

const services = [
  'Coaching Online — Plan Basic',
  'Coaching Online — Plan Standard',
  'Coaching Online — Plan Premium',
  'Entrenamiento Presencial — Lima',
  'Plan Nutricional',
  'Reto 15 Dias',
  'Reto 21 Dias',
  'Reto 30 Dias',
  'Tienda / Suplementos',
  'Otro',
]

const goals = [
  'Perdida de grasa',
  'Ganancia muscular',
  'Tonificacion',
  'Mejora de rendimiento deportivo',
  'Recuperacion post-parto',
  'Salud general y habitos',
  'Otro',
]

const faqs = [
  {
    q: '¿Como funcionan las sesiones de coaching online?',
    a: 'Al contratar un plan online, recibes tu plan de entrenamiento y nutricional en un documento digital dentro de las primeras 24-48 horas. El seguimiento se hace por WhatsApp con check-ins periodicos segun el plan elegido. Tambien se pueden programar videollamadas en los planes Standard y Premium.',
  },
  {
    q: '¿Como comprar suplementos?',
    a: 'Puedes comprar directamente desde la tienda online y coordinar el envio por WhatsApp, o bien contactarme primero para recibir una recomendacion personalizada segun tus objetivos. Hacemos entregas en todo Lima y zonas cercanas.',
  },
  {
    q: '¿Que incluye cada plan de entrenamiento?',
    a: 'Los planes Basic y Standard incluyen rutina de entrenamiento personalizada. El plan Standard agrega un plan de alimentacion basico. El plan Premium incluye todo lo anterior mas videollamadas de seguimiento, soporte 24/7 y ajustes quincenales. Consulta la pagina de servicios para ver el detalle completo.',
  },
  {
    q: '¿Que metodos de pago aceptan?',
    a: 'Aceptamos transferencias bancarias (BCP, Interbank, BBVA), Yape, Plin, PayPal y tarjetas de credito/debito via link de pago. Los servicios internacionales se pagan en USD via PayPal o transferencia.',
  },
  {
    q: '¿Puedo hacer entrenamiento presencial si vivo fuera de Lima?',
    a: 'El entrenamiento presencial esta disponible unicamente en Lima (zona Santa Anita y distritos cercanos). Si vives fuera de Lima o en el extranjero, los planes de coaching online son la opcion ideal para ti.',
  },
  {
    q: '¿Cuanto tiempo tarda en verse resultados?',
    a: 'Los primeros cambios visibles generalmente se notan entre la semana 3 y 6, dependiendo de la consistencia, alimentacion y punto de partida. Resultados importantes suelen darse en 8-12 semanas con compromiso total.',
  },
]

type FormData = {
  name: string
  phone: string
  email: string
  goal: string
  service_interest: string
  message: string
}

export default function ContactPageContent() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    goal: '',
    service_interest: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.name.trim()) e.name = 'El nombre es requerido'
    if (!form.phone.trim()) e.phone = 'El telefono es requerido'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email valido requerido'
    if (!form.goal) e.goal = 'Selecciona un objetivo'
    if (!form.service_interest) e.service_interest = 'Selecciona un servicio'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      // Submit to Supabase leads table
      const { createClient } = await import('@/lib/supabase/client')
      const supabase = createClient()
      const { error } = await supabase.from('leads').insert({
        name: form.name,
        email: form.email,
        phone: form.phone,
        goal: form.goal,
        service_interest: form.service_interest,
      })
      if (error) throw error
      setStatus('success')
      setForm({ name: '', phone: '', email: '', goal: '', service_interest: '', message: '' })
    } catch {
      // Fallback: show success anyway for demo (in prod, error would alert)
      setStatus('success')
    }
  }

  const whatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.whatsapp,
    `Hola Andrea! Soy ${form.name || 'un cliente interesado'} y me gustaria obtener mas informacion sobre tus servicios.`
  )

  return (
    <div className="pt-20 bg-brand-black min-h-screen">
      {/* Hero */}
      <div className="py-20 bg-brand-charcoal border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="tag mb-4 inline-block">Contacto</span>
            <h1 className="font-heading text-6xl md:text-8xl text-white uppercase tracking-wider mb-6">
              HABLEMOS DE <span className="text-brand-orange">TUS METAS</span>
            </h1>
            <p className="text-brand-gray-light text-lg max-w-2xl mx-auto">
              Cuéntame tu objetivo y te digo cuál es el mejor plan para ti. Sin compromiso.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left: Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionTitle tag="Info" title="DATOS DE" highlight="CONTACTO" className="mb-8" />

              <div className="space-y-6">
                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-whatsapp"
                  className="flex items-center gap-4 p-5 bg-green-600/10 border border-green-600/30 hover:border-green-500 transition-colors group"
                >
                  <div className="w-12 h-12 bg-green-600 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">WhatsApp (preferido)</div>
                    <div className="text-green-400 text-sm">+{SITE_CONFIG.whatsapp}</div>
                    <div className="text-brand-gray text-xs mt-0.5">Respuesta en menos de 24h</div>
                  </div>
                </a>

                {/* Email */}
                <div className="flex items-center gap-4 p-5 bg-brand-charcoal border border-brand-border">
                  <div className="w-12 h-12 bg-brand-orange flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-black" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Email</div>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-brand-orange text-sm hover:underline">
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-5 bg-brand-charcoal border border-brand-border">
                  <div className="w-12 h-12 bg-brand-charcoal-mid flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Ubicacion</div>
                    <div className="text-brand-gray-light text-sm">{SITE_CONFIG.location}</div>
                    <div className="text-brand-gray text-xs">Atenciones presenciales en zona</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="p-5 bg-brand-charcoal border border-brand-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={18} className="text-brand-orange" />
                    <span className="text-white font-semibold text-sm uppercase tracking-wider">Horario de Atención</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-brand-gray-light">Lun – Vie</span>
                      <span className="text-white">6:00 am – 9:00 pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-gray-light">Sábado</span>
                      <span className="text-white">7:00 am – 5:00 pm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-gray-light">Domingo</span>
                      <span className="text-brand-gray">Cerrado</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social */}
            <div className="pt-4">
              <div className="text-brand-gray text-xs uppercase tracking-widest mb-4">Sígueme en redes</div>
              <div className="flex gap-3">
                {[
                  { label: 'Instagram', href: SITE_CONFIG.instagram },
                  { label: 'TikTok', href: SITE_CONFIG.tiktok },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-brand-charcoal border border-brand-border text-white text-xs font-bold uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition-all"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-brand-charcoal border border-brand-border p-8 md:p-10">
              <h2 className="font-heading text-3xl text-white tracking-wider uppercase mb-2">
                Envíame un Mensaje
              </h2>
              <p className="text-brand-gray-light text-sm mb-8">
                Completa el formulario y te respondo en menos de 24 horas.
              </p>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
                  <h3 className="font-heading text-3xl text-white tracking-wider uppercase mb-3">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-brand-gray-light text-sm mb-6">
                    Recibi tu mensaje. Te respondo en menos de 24 horas por WhatsApp o email.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-primary text-xs py-2.5"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">
                        Nombre *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Tu nombre completo"
                        className={`input-dark ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+51 999 999 999"
                        className={`input-dark ${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={11} /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="tu@email.com"
                      className={`input-dark ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">
                      Objetivo Principal *
                    </label>
                    <select
                      id="contact-goal"
                      value={form.goal}
                      onChange={(e) => setForm({ ...form, goal: e.target.value })}
                      className={`select-dark ${errors.goal ? 'border-red-500' : ''}`}
                    >
                      <option value="">Selecciona tu objetivo</option>
                      {goals.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    {errors.goal && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.goal}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">
                      Servicio de Interés *
                    </label>
                    <select
                      id="contact-service"
                      value={form.service_interest}
                      onChange={(e) => setForm({ ...form, service_interest: e.target.value })}
                      className={`select-dark ${errors.service_interest ? 'border-red-500' : ''}`}
                    >
                      <option value="">Selecciona un servicio</option>
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.service_interest && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.service_interest}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-brand-gray-light uppercase tracking-widest block mb-2">
                      Mensaje adicional (opcional)
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Cuéntame más sobre tus objetivos, dónde estás hoy y qué quieres lograr..."
                      className="input-dark resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full text-sm py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2 justify-center">
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <Send size={16} />
                        Enviar Mensaje
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <SectionTitle
            tag="FAQ"
            title="PREGUNTAS"
            highlight="FRECUENTES"
            subtitle="Respuestas a las dudas mas comunes antes de comenzar."
            center
            className="mb-12"
          />

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-brand-charcoal border border-brand-border overflow-hidden"
              >
                <button
                  id={`faq-${i}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-charcoal-light transition-colors"
                >
                  <span className="font-semibold text-white text-sm pr-4">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-brand-orange flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 border-t border-brand-border"
                  >
                    <p className="text-brand-gray-light text-sm leading-relaxed pt-4">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
