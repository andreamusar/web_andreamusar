import type { Metadata } from 'next'
import BlogListPage from '@/components/blog/BlogListPage'

export const metadata: Metadata = {
  title: 'Blog de Fitness y Nutricion Lima — Andrea Musar | Entrenamiento, Suplementacion, Rutinas',
  description:
    'Articulos de entrenamiento, nutricion, suplementacion, rutinas y transformacion fitness. Consejos de Andrea Musar, personal trainer en Lima, Peru.',
}

export default function Page() {
  return <BlogListPage />
}
