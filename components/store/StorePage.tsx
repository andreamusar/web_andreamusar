'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Star, Package, Filter, Search } from 'lucide-react'
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES, SITE_CONFIG } from '@/lib/constants'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/lib/utils'
import type { CartItem } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [added, setAdded] = useState<string | null>(null)
  const { addItem, itemCount } = useCart()

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleAdd = (product: typeof MOCK_PRODUCTS[0]) => {
    const item: CartItem = {
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0] ?? '',
      slug: product.slug,
    }
    addItem(item)
    setAdded(product.id)
    setTimeout(() => setAdded(null), 2000)
  }

  return (
    <div className="pt-20 bg-brand-black min-h-screen">
      {/* Hero */}
      <div className="py-16 bg-brand-charcoal border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="tag mb-4 inline-block">Tienda</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="font-heading text-6xl md:text-7xl text-white uppercase tracking-wider">
                  SUPLEMENTOS <span className="text-brand-orange">PRO</span>
                </h1>
                <p className="text-brand-gray-light text-lg mt-2">
                  Seleccionados y recomendados por Andrea Musar. Envio a todo Lima.
                </p>
              </div>
              <Link
                href="/tienda"
                className="relative inline-flex items-center gap-2 px-6 py-3 bg-brand-charcoal-light border border-brand-border text-white hover:border-brand-orange transition-colors"
              >
                <ShoppingCart size={18} />
                <span className="text-sm font-medium">Carrito</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-orange text-black text-xs font-bold flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray" />
            <input
              type="text"
              placeholder="Buscar producto o marca..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-dark pl-10"
              id="store-search"
            />
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-brand-gray flex-shrink-0" />
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                id={`category-filter-${cat.value}`}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === cat.value
                    ? 'bg-brand-orange text-black'
                    : 'bg-brand-charcoal border border-brand-border text-white/70 hover:border-brand-orange hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-brand-gray-light text-sm mb-8">
          {filtered.length} producto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="card-dark group flex flex-col hover:border-brand-orange transition-colors duration-300"
              >
                {/* Image area */}
                <Link href={`/tienda/${product.slug}`} className="block">
                  <div className="aspect-square bg-brand-charcoal-light relative overflow-hidden">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="text-center">
                          <Package size={48} className="text-brand-orange/30 mx-auto mb-2" />
                          <div className="font-heading text-sm text-white/50 tracking-wider">
                            {product.brand}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Stock badge */}
                    <div className="absolute top-3 left-3">
                      {product.stock <= 5 ? (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                          Pocas unidades
                        </span>
                      ) : (
                        <span className="bg-green-600/80 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                          En Stock
                        </span>
                      )}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-brand-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-brand-gray text-xs uppercase tracking-widest mb-1">{product.brand}</div>
                  <Link href={`/tienda/${product.slug}`}>
                    <h3 className="font-semibold text-white text-sm leading-tight mb-2 hover:text-brand-orange transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex text-brand-orange text-xs mb-3">★★★★★</div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="font-heading text-xl text-white">
                      {formatCurrency(product.price, product.currency)}
                    </div>
                    <button
                      id={`add-to-cart-${product.id}`}
                      onClick={() => handleAdd(product)}
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                        added === product.id
                          ? 'bg-green-600 text-white'
                          : 'bg-brand-orange text-black hover:bg-brand-orange-dark hover:scale-105'
                      }`}
                    >
                      <ShoppingCart size={12} />
                      {added === product.id ? '✓ Agregado' : 'Agregar'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Package size={48} className="text-brand-gray mx-auto mb-4" />
            <h3 className="font-heading text-2xl text-white mb-2">No se encontraron productos</h3>
            <p className="text-brand-gray-light text-sm">Intenta con otra busqueda o categoria</p>
          </div>
        )}

        {/* WhatsApp order note */}
        <div className="mt-16 p-6 bg-brand-charcoal border border-brand-border flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="font-heading text-2xl text-white tracking-wider mb-2">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-brand-gray-light text-sm">
              Contáctame por WhatsApp y puedo conseguirte cualquier suplemento con recomendacion personalizada.
            </p>
          </div>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent('Hola Andrea! Quiero pedir suplementos y necesito orientacion.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-shrink-0 text-sm"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
