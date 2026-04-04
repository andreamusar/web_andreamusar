'use client'

import { useCart } from '@/context/CartContext'
import { formatCurrency } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'
import { Trash2, Package, Minus, Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-brand-black px-4 flex flex-col items-center justify-center text-center">
        <Package size={64} className="text-brand-gray mb-6" />
        <h1 className="font-heading text-4xl text-white mb-4">Tu carrito está vacío</h1>
        <p className="text-brand-gray-light mb-8 max-w-md">
          Parece que aún no has agregado ningún suplemento o plan a tu carrito.
        </p>
        <Link href="/tienda" className="btn-primary">
          Ir a la tienda
        </Link>
      </div>
    )
  }

  const generateWhatsAppMessage = () => {
    const header = `Hola Andrea! Quiero hacer el siguiente pedido:\n\n`
    const itemsList = items
      .map(
        (i) =>
          `- ${i.quantity}x ${i.name} (${formatCurrency(
            i.price * i.quantity,
            'USD' // adjust if you use mixed currencies or PEN globally
          )})`
      )
      .join('\n')
    const totalMsg = `\n\n*Total estimado:* ${formatCurrency(total, 'USD')}\n\nQuedo atento/a para la coordinación del pago y entrega.`
    
    return encodeURIComponent(header + itemsList + totalMsg)
  }

  return (
    <div className="pt-28 pb-20 bg-brand-black min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/tienda" className="text-brand-gray hover:text-brand-orange transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl text-white uppercase tracking-wider">
            TU <span className="text-brand-orange">CARRITO</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product_id} className="card-dark p-4 flex gap-4 items-center">
                <div className="w-20 h-20 bg-brand-charcoal-light flex-shrink-0 relative overflow-hidden rounded">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={24} className="text-brand-orange/40" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link href={`/tienda/${item.slug}`} className="block text-white font-medium hover:text-brand-orange truncate mb-1">
                    {item.name}
                  </Link>
                  <div className="text-brand-orange text-sm font-bold">
                    {formatCurrency(item.price, 'USD')}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-brand-border rounded overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className="px-2 py-1 bg-brand-charcoal hover:bg-brand-gray-dark text-white transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 py-1 text-sm text-white font-medium min-w-[2.5rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="px-2 py-1 bg-brand-charcoal hover:bg-brand-gray-dark text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="p-2 text-brand-gray hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-28">
              <h2 className="font-heading text-2xl text-white mb-6 uppercase tracking-wider">Resumen</h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-brand-gray-light">
                  <span>Productos ({itemCount})</span>
                  <span>{formatCurrency(total, 'USD')}</span>
                </div>
                <div className="flex justify-between text-brand-gray-light">
                  <span>Envío (Lima)</span>
                  <span className="text-green-500 font-medium">Por coordinar</span>
                </div>
              </div>
              
              <div className="border-t border-brand-border pt-4 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-white font-medium">Total</span>
                  <span className="font-heading text-3xl text-brand-orange">
                    {formatCurrency(total, 'USD')}
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Continuar por WhatsApp
              </a>
              
              <p className="text-brand-gray text-xs mt-4 text-center">
                El pago y envío se coordinan directamente de forma segura vía WhatsApp con Andrea.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
