import type { Metadata } from 'next'
import ContactPageContent from '@/components/contact/ContactPageContent'

export const metadata: Metadata = {
  title: 'Contacto — Andrea Musar Personal Trainer Lima | WhatsApp y Formulario',
  description:
    'Contacta a Andrea Musar, personal trainer en Lima, Peru. WhatsApp, formulario de contacto, ubicacion en Santa Anita, horarios de atencion y preguntas frecuentes.',
}

export default function Page() {
  return <ContactPageContent />
}
