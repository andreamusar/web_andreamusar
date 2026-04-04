import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import ServicesSection from '@/components/home/ServicesSection'
import ResultsSection from '@/components/home/ResultsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import ChallengesSection from '@/components/home/ChallengesSection'
import CtaBanner from '@/components/home/CtaBanner'

export const metadata: Metadata = {
  title: 'Andrea Musar — Personal Trainer Lima, Peru | Entrenamiento Online y Presencial',
  description:
    'Entrenadora personal certificada en Lima, Peru. Planes de coaching online, entrenamiento presencial en Santa Anita, suplementos deportivos y nutricion personalizada. ¡Transforma tu cuerpo hoy!',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ResultsSection />
      <TestimonialsSection />
      <ChallengesSection />
      <CtaBanner />
    </>
  )
}
