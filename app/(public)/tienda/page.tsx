import type { Metadata } from 'next'
import StorePage from '@/components/store/StorePage'

export const metadata: Metadata = {
  title: 'Tienda de Suplementos Deportivos Lima — Andrea Musar',
  description:
    'Compra suplementos deportivos en Lima: proteinas, pre-entrenos, vitaminas y accesorios. Recomendacion personalizada de Andrea Musar. Envio a todo Lima.',
}

export default function Page() {
  return <StorePage />
}
