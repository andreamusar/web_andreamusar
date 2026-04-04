import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetailPage from '@/components/store/ProductDetailPage'
import { MOCK_PRODUCTS } from '@/lib/constants'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug)
  if (!product) return {}
  return {
    title: `${product.name} — Tienda Andrea Musar Lima`,
    description: `${product.description} Compra ${product.name} de ${product.brand} en Lima con recomendacion de Andrea Musar.`,
  }
}

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({ slug: p.slug }))
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()
  return <ProductDetailPage product={product} />
}
