import { Link } from 'react-router-dom'
import { TreePine, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'
import { NAV_LINKS, NAV_LABELS } from '@/constants'
import { useLanguage } from '@/context/LanguageContext'

const SOCIAL_LINKS = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-primary-800 rounded-sm">
                <TreePine className="w-5 h-5 text-secondary-400" />
              </div>
              <span className="text-xl font-bold font-display">Готель</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Преміальний лісовий курорт серед нескінченних карпатських лісів.
              Місце, де природа, розкіш та спокій стають єдиним цілим.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-primary-800 hover:bg-primary-700 rounded-sm flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="w-4 h-4 text-neutral-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold font-display tracking-widest uppercase text-secondary-400">
              Навігація
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-150"
                  >
                    {NAV_LABELS[language][link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold font-display tracking-widest uppercase text-secondary-400">
              Послуги
            </h4>
            <ul className="space-y-3">
              {['СПА та оздоровлення', 'Авторська кухня', 'Активний відпочинок', 'Конференц-зал', 'Трансфер', 'Дитячі програми'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold font-display tracking-widest uppercase text-secondary-400">
              Контакти
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary-500 shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-400">
                  Карпатська обл., смт. Готель, вул. Лісова, 1
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary-500 shrink-0" />
                <a href="tel:+380000000000" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  +38 (000) 000-00-00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary-500 shrink-0" />
                <a href="mailto:info@chudodiievo.com" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  info@chudodiievo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Готель. Всі права захищені.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-neutral-500 hover:text-white transition-colors">
              Політика конфіденційності
            </a>
            <a href="#" className="text-xs text-neutral-500 hover:text-white transition-colors">
              Умови бронювання
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
