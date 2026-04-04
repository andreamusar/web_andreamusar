import type { Metadata } from 'next'
import ResultsPageContent from '@/components/results/ResultsPageContent'

export const metadata: Metadata = {
  title: 'Resultados y Testimonios — Transformaciones Reales Lima | Andrea Musar',
  description:
    'Transformaciones reales de clientes de Andrea Musar en Lima. Fotos de antes y despues, testimonios de perdida de peso, ganancia muscular y mejora de rendimiento.',
}

export default function Page() {
  return <ResultsPageContent />
}
