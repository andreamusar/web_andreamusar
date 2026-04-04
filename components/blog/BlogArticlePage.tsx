'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, ArrowRight, BookOpen } from 'lucide-react'
import { MOCK_BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

interface BlogArticlePageProps {
  post: typeof MOCK_BLOG_POSTS[0]
}

const SAMPLE_CONTENT: Record<string, string> = {
  '5-errores-mujeres-gym': `
## Error #1: Hacer solo cardio y evitar las pesas

El cardio es importante, pero si tu meta es tonificar y cambiar tu composición corporal, **necesitas levantar pesas**. El entrenamiento de fuerza aumenta tu masa muscular, lo que a su vez acelera tu metabolismo en reposo — incluso mientras duermes.

**Solución:** Combina 3 días de entrenamiento de fuerza con 2 días de cardio moderado por semana.

## Error #2: Comer muy poco

Muchas mujeres piensan que comer menos es igual a adelgazar más rápido. Esto es un error grave. Un déficit calórico extremo lleva a pérdida de músculo, fatiga y efecto rebote.

**Solución:** Calcula tu TDEE y aplica un déficit moderado del 15-20%. Nunca menos de 1,400 kcal si eres activa.

## Error #3: No llevar un registro de progreso

Sin registro, no hay progresión. Si siempre levantas el mismo peso, tu cuerpo deja de adaptarse y los resultados se estancan.

**Solución:** Lleva un diario de entrenamiento. Aumenta el peso o las repeticiones cada semana.

## Error #4: Saltarse el calentamiento

El calentamiento prepara tus músculos, articulaciones y sistema nervioso para el esfuerzo. Saltarlo aumenta el riesgo de lesiones y reduce el rendimiento.

**Solución:** Dedica 8-10 minutos a calentamiento dinámico antes de cada sesión.

## Error #5: Compararse con otras mujeres en redes sociales

Tu progreso es tuyo. Cada cuerpo responde diferente. Compararte con alguien que lleva 3 años entrenando cuando tú llevas 3 meses es injusto y desmotivador.

**Solución:** Compárate solo con quien eras tú hace 1, 3 y 6 meses. Eso es progreso real.

---

¿Cometías alguno de estos errores? Cuéntame por WhatsApp y con gusto te oriento.
  `,
}

export default function BlogArticlePage({ post }: BlogArticlePageProps) {
  const related = MOCK_BLOG_POSTS.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)
  const content = SAMPLE_CONTENT[post.slug] ?? `
## Introduccion

${post.excerpt}

## Contenido Principal

Este articulo esta siendo desarrollado con informacion detallada y scientificamente respaldada para ayudarte a alcanzar tus objetivos fitness en Lima, Peru.

**Mantente atento** a las proximas actualizaciones de contenido en el blog de Andrea Musar, tu personal trainer de confianza en Lima.

## Conclusion

Si tienes dudas o quieres orientacion personalizada, no dudes en contactar a Andrea directamente por WhatsApp. Estamos aqui para ayudarte a transformar tu cuerpo y tu vida.
  `

  return (
    <div className="pt-20 bg-brand-black min-h-screen">
      {/* Hero */}
      <div className="py-16 bg-brand-charcoal border-b border-brand-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-orange transition-colors text-sm mb-6 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Volver al blog
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="tag">
                {BLOG_CATEGORIES.find((c) => c.value === post.category)?.label ?? post.category}
              </span>
              <span className="text-brand-gray text-sm flex items-center gap-1.5">
                <Clock size={12} /> {post.read_time} de lectura
              </span>
              <span className="text-brand-gray text-sm">{formatDate(post.created_at)}</span>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl text-white uppercase tracking-wider leading-none mb-6">
              {post.title}
            </h1>

            <p className="text-brand-gray-light text-lg leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pt-6 border-t border-brand-border">
              <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/30 rounded-full flex items-center justify-center">
                <span className="font-heading text-brand-orange text-lg">AM</span>
              </div>
              <div>
                <div className="font-semibold text-white text-sm">Andrea Musar</div>
                <div className="text-brand-gray text-xs uppercase tracking-wider">Personal Trainer — Lima, Peru</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Article content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {/* Cover image placeholder */}
            <div className="h-64 bg-brand-charcoal border border-brand-border flex items-center justify-center mb-12">
              <BookOpen size={64} className="text-brand-orange/10" />
            </div>

            {/* Article body */}
            <div
              className="prose-fitness"
              style={{
                color: 'rgba(255,255,255,0.8)',
                lineHeight: '1.8',
                fontSize: '1rem',
              }}
            >
              {content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={i} className="font-heading text-3xl text-white tracking-wider uppercase mt-10 mb-4">
                      {line.replace('## ', '')}
                    </h2>
                  )
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <p key={i} className="font-semibold text-white mb-3">
                      {line.replace(/\*\*/g, '')}
                    </p>
                  )
                }
                if (line.startsWith('---')) {
                  return <hr key={i} className="border-brand-border my-8" />
                }
                if (line.trim() === '') return null
                return (
                  <p key={i} className="mb-4 text-white/75 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color:white">$1</strong>') }}
                  />
                )
              })}
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-brand-border">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-brand-gray-light text-sm">¿Te fue util este articulo?</div>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} — Blog de Andrea Musar`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-2.5"
                >
                  Compartir por WhatsApp
                </a>
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* CTA */}
            <div className="bg-brand-orange p-6">
              <div className="font-heading text-2xl text-black uppercase tracking-wider mb-3">
                Entrena con Andrea
              </div>
              <p className="text-black/80 text-sm mb-4">
                Resultados personalizados para tu cuerpo y tus metas.
              </p>
              <Link href="/servicios" className="block bg-black text-white text-center py-3 text-sm font-bold uppercase tracking-widest hover:bg-brand-charcoal transition-colors">
                Ver Planes
              </Link>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="bg-brand-charcoal border border-brand-border p-6">
                <h3 className="font-heading text-xl text-white tracking-wider uppercase mb-6">
                  Articulos Relacionados
                </h3>
                <div className="space-y-4">
                  {related.map((relPost) => (
                    <Link
                      key={relPost.id}
                      href={`/blog/${relPost.slug}`}
                      className="block group"
                    >
                      <div className="text-white/70 text-xs leading-snug group-hover:text-brand-orange transition-colors mb-1">
                        {relPost.title}
                      </div>
                      <div className="flex items-center gap-1 text-brand-orange text-xs font-bold">
                        Leer <ArrowRight size={10} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="bg-brand-charcoal border border-brand-border p-6">
              <h3 className="font-heading text-xl text-white tracking-wider uppercase mb-4">Categorias</h3>
              <div className="flex flex-wrap gap-2">
                {BLOG_CATEGORIES.filter((c) => c.value !== 'all').map((cat) => (
                  <Link
                    key={cat.value}
                    href={`/blog?cat=${cat.value}`}
                    className={`text-xs font-bold px-3 py-1.5 uppercase tracking-wider border transition-colors ${
                      cat.value === post.category
                        ? 'bg-brand-orange text-black border-brand-orange'
                        : 'border-brand-border text-brand-gray-light hover:border-brand-orange hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
