'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, ArrowLeft, Check, Package, Star, Minus, Plus, Truck, Shield, Zap } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/lib/utils'
import { SITE_CONFIG, MOCK_PRODUCTS } from '@/lib/constants'
import type { CartItem } from '@/lib/types'

interface ProductDetailPageProps {
  product: typeof MOCK_PRODUCTS[0]
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleAdd = () => {
    const item: CartItem = {
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0] ?? '',
      slug: product.slug,
    }
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 3000)
  }

  const relatedProducts = MOCK_PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="pt-20 bg-brand-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-brand-gray mb-8">
          <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/tienda" className="hover:text-white transition-colors">Tienda</Link>
          <span>/</span>
          <span className="text-brand-gray-light">{product.name}</span>
        </div>

        {/* Back */}
        <Link href="/tienda" className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-orange transition-colors text-sm mb-8 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Volver a la tienda
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="aspect-square bg-brand-charcoal border border-brand-border flex items-center justify-center relative overflow-hidden">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-center p-12">
                  <Package size={80} className="text-brand-orange/20 mx-auto mb-4" />
                  <div className="font-heading text-3xl text-white/20 tracking-widest">{product.brand}</div>
                </div>
              )}

              {/* Stock badge */}
              <div className="absolute top-4 left-4">
                {product.stock <= 5 ? (
                  <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                    ⚠ Solo {product.stock} en stock
                  </span>
                ) : (
                  <span className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                    ✓ En Stock ({product.stock})
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="text-brand-gray text-sm uppercase tracking-widest mb-2">{product.brand}</div>
            <h1 className="font-heading text-4xl md:text-5xl text-white tracking-wider uppercase mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-brand-orange">★★★★★</div>
              <span className="text-brand-gray-light text-sm">(4.9 / 5.0)</span>
              <span className="tag-outline text-xs">{product.category}</span>
            </div>

            <div className="font-heading text-5xl text-white mb-2">
              {formatCurrency(product.price, product.currency)}
            </div>
            <div className="text-brand-gray-light text-sm mb-8">Precio final. Envío incluido en Lima.</div>

            {/* Description */}
            <p className="text-brand-gray-light leading-relaxed mb-8 border-t border-brand-border pt-6">
              {product.description}
            </p>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="font-heading text-xl text-white tracking-wider mb-4">BENEFICIOS</h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check size={16} className="text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Usage */}
            <div className="bg-brand-charcoal border border-brand-border p-4 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className="text-brand-orange" />
                <span className="font-bold text-white text-sm uppercase tracking-widest">Modo de uso</span>
              </div>
              <p className="text-brand-gray-light text-sm">{product.usage_tips}</p>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-brand-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-white hover:bg-brand-charcoal transition-colors"
                  id="qty-minus"
                >
                  <Minus size={16} />
                </button>
                <span className="px-6 py-3 text-white font-bold border-x border-brand-border min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-3 text-white hover:bg-brand-charcoal transition-colors"
                  id="qty-plus"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                id="add-to-cart-detail"
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-3 py-4 font-bold text-sm uppercase tracking-widest transition-all duration-300 ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-brand-orange text-black hover:bg-brand-orange-dark hover:scale-105'
                }`}
              >
                <ShoppingCart size={18} />
                {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
              </button>
            </div>

            {/* WhatsApp order */}
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Hola Andrea! Quiero comprar ${quantity} ${product.name} de ${product.brand}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              id="order-whatsapp"
              className="btn-outline w-full text-center text-sm py-3"
            >
              Pedir directo por WhatsApp
            </a>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-brand-border">
              {[
                { icon: Truck, text: 'Envío a Lima' },
                { icon: Shield, text: 'Productos originales' },
                { icon: Star, text: 'Recomendado por Andrea' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="text-center">
                  <Icon size={20} className="text-brand-orange mx-auto mb-1" />
                  <span className="text-brand-gray-light text-xs">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-heading text-3xl text-white tracking-wider uppercase mb-8">
              Productos <span className="text-brand-orange">Relacionados</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/tienda/${p.slug}`} className="card-dark p-4 flex items-center gap-4 hover:border-brand-orange transition-colors group">
                  <div className="w-14 h-14 bg-brand-charcoal-light flex items-center justify-center flex-shrink-0 relative overflow-hidden rounded">
                    {p.images?.[0] ? (
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                    ) : (
                      <Package size={24} className="text-brand-orange/40" />
                    )}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium group-hover:text-brand-orange transition-colors">{p.name}</div>
                    <div className="text-brand-orange font-heading text-lg">{formatCurrency(p.price, p.currency)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
