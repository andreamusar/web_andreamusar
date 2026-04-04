import type { Metadata } from 'next'
import ServicesPage from '@/components/services/ServicesPage'

export const metadata: Metadata = {
  title: 'Servicios — Planes de Entrenamiento Online y Presencial Lima',
  description:
    'Planes de coaching online (Basic, Standard, Premium), entrenamiento presencial en Santa Anita Lima, retos fitness de 15, 21 y 30 dias, y planes nutricionales personalizados.',
}

export default function Page() {
  return <ServicesPage />
}
