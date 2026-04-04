'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowRight, BookOpen, Mail } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { MOCK_BLOG_POSTS, BLOG_CATEGORIES } from '@/lib/constants'
import { formatDate } from '@/lib/utils'

const categoryColors: Record<string, string> = {
  entrenamiento: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  nutricion: 'bg-green-500/10 text-green-400 border-green-500/20',
  suplementacion: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  rutinas: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  transformacion: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
  mujeres: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
}

export default function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = MOCK_BLOG_POSTS.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  )

  const [featured, ...rest] = filtered

  return (
    <div className="pt-20 bg-brand-black min-h-screen">
      {/* Hero */}
      <div className="py-20 bg-brand-charcoal border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="tag mb-4 inline-block">Blog</span>
            <h1 className="font-heading text-6xl md:text-8xl text-white uppercase tracking-wider mb-6">
              FITNESS <span className="text-brand-orange">&amp;</span> NUTRICION
            </h1>
            <p className="text-brand-gray-light text-lg max-w-2xl mx-auto">
              Consejos, rutinas, guias de suplementacion y mas — escritos por Andrea Musar para ayudarte a alcanzar tus metas.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              id={`blog-filter-${cat.value}`}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-brand-orange text-black'
                  : 'bg-brand-charcoal border border-brand-border text-white/70 hover:border-brand-orange hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <AnimatePresence mode="wait">
              {featured && (
                <motion.div
                  key={featured.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-10"
                >
                  <Link href={`/blog/${featured.slug}`} className="block card-dark group hover:border-brand-orange transition-colors duration-300">
                    <div className="h-64 bg-brand-charcoal-light flex items-center justify-center relative overflow-hidden">
                      <BookOpen size={64} className="text-brand-orange/10" />
                      <div className="absolute top-4 left-4">
                        <span className={`text-xs font-bold px-3 py-1 border uppercase tracking-widest ${categoryColors[featured.category] ?? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20'}`}>
                          {BLOG_CATEGORIES.find((c) => c.value === featured.category)?.label ?? featured.category}
                        </span>
                      </div>
                      <span className="absolute top-4 right-4 tag">Destacado</span>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-xs text-brand-gray mb-4">
                        <span className="flex items-center gap-1.5"><Clock size={12} />{featured.read_time} de lectura</span>
                        <span>{formatDate(featured.created_at)}</span>
                      </div>
                      <h2 className="font-heading text-3xl text-white tracking-wider mb-3 group-hover:text-brand-orange transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-brand-gray-light text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                      <div className="flex items-center gap-2 text-brand-orange font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                        Leer articulo <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Article Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {rest.map((post, i) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="card-dark flex flex-col h-full group hover:border-brand-orange transition-colors duration-300"
                    >
                      <div className="h-36 bg-brand-charcoal-light flex items-center justify-center relative">
                        <BookOpen size={36} className="text-brand-orange/10" />
                        <div className="absolute top-3 left-3">
                          <span className={`text-xs font-bold px-2 py-0.5 border uppercase tracking-widest ${categoryColors[post.category] ?? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20'}`}>
                            {BLOG_CATEGORIES.find((c) => c.value === post.category)?.label ?? post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-brand-gray mb-3">
                          <span className="flex items-center gap-1"><Clock size={11} />{post.read_time}</span>
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                        <h3 className="font-heading text-lg text-white tracking-wider mb-2 group-hover:text-brand-orange transition-colors flex-1">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-1 text-brand-orange text-xs font-bold uppercase tracking-widest mt-2">
                          Leer <ArrowRight size={12} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Popular posts */}
            <div className="bg-brand-charcoal border border-brand-border p-6">
              <h3 className="font-heading text-xl text-white tracking-wider uppercase mb-6">Mas Leidos</h3>
              <div className="space-y-4">
                {MOCK_BLOG_POSTS.slice(0, 4).map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex items-start gap-3 group"
                  >
                    <span className="font-heading text-3xl text-brand-orange/30 leading-none flex-shrink-0">
                      0{i + 1}
                    </span>
                    <span className="text-white/70 text-xs leading-snug group-hover:text-brand-orange transition-colors">
                      {post.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-brand-orange p-6">
              <Mail size={24} className="text-black mb-3" />
              <h3 className="font-heading text-2xl text-black tracking-wider uppercase mb-2">
                Tips Semanales
              </h3>
              <p className="text-black/80 text-sm mb-4">
                Recibe consejos de entrenamiento y nutricion directo en tu email.
              </p>
              <input
                type="email"
                placeholder="tu@email.com"
                id="newsletter-email"
                className="w-full bg-black/10 border border-black/20 text-black placeholder-black/50 px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-black"
              />
              <button className="w-full bg-black text-white py-2.5 text-sm font-bold uppercase tracking-widest hover:bg-brand-charcoal transition-colors">
                Suscribirme
              </button>
            </div>

            {/* Categories */}
            <div className="bg-brand-charcoal border border-brand-border p-6">
              <h3 className="font-heading text-xl text-white tracking-wider uppercase mb-6">Categorias</h3>
              <div className="space-y-2">
                {BLOG_CATEGORIES.filter((c) => c.value !== 'all').map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`w-full text-left flex items-center justify-between py-2 px-3 text-xs uppercase tracking-widest transition-all duration-300 ${
                      activeCategory === cat.value
                        ? 'text-brand-orange border-l-2 border-brand-orange pl-4'
                        : 'text-brand-gray-light hover:text-white hover:pl-4 border-l-2 border-transparent'
                    }`}
                  >
                    {cat.label}
                    <ArrowRight size={12} />
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
