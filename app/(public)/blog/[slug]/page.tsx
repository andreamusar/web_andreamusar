import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogArticlePage from '@/components/blog/BlogArticlePage'
import { MOCK_BLOG_POSTS } from '@/lib/constants'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: `${post.title} — Blog Andrea Musar`,
    description:
      post.excerpt +
      ' Personal trainer Lima, entrenamiento personalizado, fitness Peru.',
  }
}

export function generateStaticParams() {
  return MOCK_BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()
  return <BlogArticlePage post={post} />
}
