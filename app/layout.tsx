import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: {
    default: 'Andrea Musar — Personal Trainer Lima, Peru',
    template: '%s | Andrea Musar',
  },
  description:
    'Entrenadora personal en Lima, Peru. Planes de entrenamiento online y presencial, suplementacion deportiva y planes nutricionales personalizados. Santa Anita, Lima.',
  keywords: [
    'personal trainer Lima',
    'entrenadora personal Lima',
    'entrenamiento personalizado Lima',
    'musculacion femenina Lima',
    'asesoria fitness Lima',
    'suplementacion deportiva Lima',
    'planes fitness Lima',
    'Andrea Musar',
    'Santa Anita Lima',
  ],
  authors: [{ name: 'Andrea Musar' }],
  creator: 'Andrea Musar',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://andreamusar.com',
    siteName: 'Andrea Musar',
    title: 'Andrea Musar — Personal Trainer Lima, Peru',
    description:
      'Entrenadora personal en Lima, Peru. Transforma tu cuerpo con planes de entrenamiento personalizados online y presencial.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrea Musar — Personal Trainer Lima, Peru',
    description: 'Entrenadora personal en Lima, Peru. Transformacion real, resultados reales.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
