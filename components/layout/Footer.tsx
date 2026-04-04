import Link from 'next/link'
import { Instagram, Youtube, MapPin, Mail, Phone, Zap } from 'lucide-react'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants'

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.02-.08z"/>
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-black border-t border-brand-border">
      {/* CTA Banner */}
      <div className="bg-brand-orange py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-black uppercase tracking-wider mb-4">
            ¿Listo para transformar tu cuerpo?
          </h2>
          <p className="text-black/80 font-medium mb-8 text-lg">
            Entrena con la mejor personal trainer de Lima. Online o presencial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-brand-charcoal"
            >
              Ver Servicios
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hola+Andrea!+Quiero+empezar+mi+transformacion.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-black text-black font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-black hover:text-white"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-orange flex items-center justify-center">
                <Zap size={18} className="text-black" fill="black" />
              </div>
              <span className="font-heading text-2xl tracking-widest text-white">
                ANDREA MUSAR
              </span>
            </Link>
            <p className="text-brand-gray-light text-sm leading-relaxed mb-6 max-w-sm">
              Entrenadora personal certificada con sede en Lima, Peru. 
              Especialista en transformacion corporal, musculacion y nutricion deportiva 
              para hombres y mujeres.
            </p>
            <div className="flex items-center gap-2 text-brand-gray-light text-sm mb-3">
              <MapPin size={15} className="text-brand-orange flex-shrink-0" />
              <span>Santa Anita, Lima, Peru</span>
            </div>
            <div className="flex items-center gap-2 text-brand-gray-light text-sm mb-3">
              <Mail size={15} className="text-brand-orange flex-shrink-0" />
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
                {SITE_CONFIG.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-brand-gray-light text-sm">
              <Phone size={15} className="text-brand-orange flex-shrink-0" />
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                className="hover:text-white transition-colors"
              >
                +{SITE_CONFIG.whatsapp}
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading text-xl text-white mb-6 uppercase tracking-widest">
              Navegación
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-gray-light text-sm hover:text-brand-orange transition-colors duration-300 hover:pl-2 inline-block transition-all"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services + Social */}
          <div>
            <h3 className="font-heading text-xl text-white mb-6 uppercase tracking-widest">
              Servicios
            </h3>
            <ul className="space-y-3 mb-8">
              {[
                { label: 'Coaching Online', href: '/servicios' },
                { label: 'Entrenamiento Presencial', href: '/servicios' },
                { label: 'Tienda de Suplementos', href: '/tienda' },
                { label: 'Planes Nutricionales', href: '/servicios' },
                { label: 'Retos Fitness', href: '/servicios' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-brand-gray-light text-sm hover:text-brand-orange transition-colors duration-300"
                  >
                    → {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-heading text-xl text-white mb-4 uppercase tracking-widest">
              Sígueme
            </h3>
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-brand-charcoal-light border border-brand-border flex items-center justify-center text-brand-gray-light hover:text-white hover:border-brand-orange hover:bg-brand-orange transition-all duration-300"
                aria-label="Instagram de Andrea Musar"
              >
                <Instagram size={18} />
              </a>
              <a
                href={SITE_CONFIG.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-brand-charcoal-light border border-brand-border flex items-center justify-center text-brand-gray-light hover:text-white hover:border-brand-orange hover:bg-brand-orange transition-all duration-300"
                aria-label="TikTok de Andrea Musar"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://youtube.com/@andreamusar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-brand-charcoal-light border border-brand-border flex items-center justify-center text-brand-gray-light hover:text-white hover:border-brand-orange hover:bg-brand-orange transition-all duration-300"
                aria-label="YouTube de Andrea Musar"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-gray text-sm">
            © {currentYear} Andrea Musar. Todos los derechos reservados.
          </p>
          <p className="text-brand-gray text-xs">
            Entrenadora personal certificada — Lima, Santa Anita, Peru 🇵🇪
          </p>
        </div>
      </div>
    </footer>
  )
}
