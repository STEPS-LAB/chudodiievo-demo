import { Link } from 'react-router-dom'
import { TreePine, Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'
import { NAV_LINKS, NAV_LABELS } from '@/constants'
import { useLanguage } from '@/context/LanguageContext'

const SOCIAL_LINKS = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
]

export default function Footer() {
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const t = {
    ctaTitle: isUa ? 'Готові забронювати ідеальний відпочинок?' : 'Ready to book your perfect stay?',
    ctaSubtitle: isUa
      ? 'Обирайте номер і підтвердіть бронювання за кілька кроків.'
      : 'Choose your room and confirm booking in just a few steps.',
    ctaButton: isUa ? 'Перейти до бронювання' : 'Go to booking',
    hotelColumn: isUa ? 'Навігація' : 'Navigation',
    infoColumn: isUa ? 'Контакти' : 'Contacts',
    addressLabel: isUa ? 'Адреса' : 'Address',
    phoneLabel: isUa ? 'Телефон' : 'Phone',
    emailLabel: 'Email',
    developedBy: 'Developed by',
    privacy: isUa ? 'Політика конфіденційності' : 'Privacy policy',
    terms: isUa ? 'Умови бронювання' : 'Booking terms',
    rights: isUa ? 'Всі права захищені.' : 'All rights reserved.',
  }

  return (
    <footer className="bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Banner */}
        <div className="pt-10">
          <div className="bg-primary-900/80 border border-primary-800 rounded-lg px-6 py-7 sm:px-8 sm:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">{t.ctaTitle}</h3>
              <p className="text-sm text-neutral-300">{t.ctaSubtitle}</p>
            </div>
            <Link
              to="/booking"
              className="inline-flex items-center justify-center h-11 px-5 rounded-sm bg-white text-primary-900 lg:hover:bg-neutral-100 active:scale-[0.95] lg:hover:scale-[1.02] transition-all duration-200 font-semibold font-display whitespace-nowrap"
            >
              {t.ctaButton}
            </Link>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-x-20 xl:gap-x-28">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-primary-800 rounded-sm">
                <TreePine className="w-5 h-5 text-secondary-400" />
              </div>
              <span className="text-xl font-bold font-display">Готель</span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {isUa
                ? 'Преміальний лісовий курорт серед нескінченних карпатських лісів. Місце, де природа, розкіш та спокій стають єдиним цілим.'
                : 'A premium forest resort among endless Carpathian woods. A place where nature, luxury, and peace become one.'}
            </p>
          </div>

          {/* Hotel Links */}
          <div className="space-y-4 lg:justify-self-center">
            <h4 className="text-sm font-semibold font-display tracking-widest uppercase text-secondary-400">
              {t.hotelColumn}
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.filter((link) => link.key !== 'contacts').map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-neutral-400 lg:hover:text-white transition-colors duration-150"
                  >
                    {NAV_LABELS[language][link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 lg:justify-self-end">
            <h4 className="text-sm font-semibold font-display tracking-widest uppercase text-secondary-400">
              {t.infoColumn}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary-500 shrink-0 mt-0.5" />
                <div className="text-sm text-neutral-400">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">{t.addressLabel}</p>
                  <a
                    href="https://maps.google.com/?q=гора+1,+Буковель,+Івано-Франківська+область,+Україна"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg:hover:text-white transition-colors"
                  >
                    {isUa ? 'Карпатська обл., смт. Готель, вул. Лісова, 1' : 'Carpathian region, Hotel town, Lisova St., 1'}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary-500 shrink-0" />
                <div className="text-sm text-neutral-400">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">{t.phoneLabel}</p>
                  <a href="tel:+380000000000" className="lg:hover:text-white transition-colors">
                    +38 (000) 000-00-00
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary-500 shrink-0" />
                <div className="text-sm text-neutral-400">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 mb-1">{t.emailLabel}</p>
                  <a href="mailto:hotel@gmail.com" className="lg:hover:text-white transition-colors">
                    hotel@gmail.com
                  </a>
                </div>
              </li>
              <li>
                <p className="text-xs uppercase tracking-wide text-neutral-500 mb-2">Social</p>
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      type="button"
                      aria-label={label}
                      className="w-9 h-9 bg-primary-800 lg:hover:bg-primary-700 rounded-sm flex items-center justify-center transition-colors duration-200 cursor-default"
                    >
                      <Icon className="w-4 h-4 text-neutral-300" />
                    </button>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 text-left">
            © {new Date().getFullYear()} {isUa ? 'Готель' : 'Hotel'}. {t.rights}
            <span className="block mt-3 sm:mt-2 lg:inline lg:mt-0 lg:ml-1">
              {t.developedBy}{' '}
              <a
                href="https://stepslab.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 lg:hover:text-white transition-colors"
              >
                STEPS LAB
              </a>.
            </span>
          </p>
          <div className="flex items-center justify-start gap-6 w-full sm:w-auto">
            <button type="button" className="text-xs text-neutral-500 lg:hover:text-white transition-colors cursor-default">
              {t.privacy}
            </button>
            <button type="button" className="text-xs text-neutral-500 lg:hover:text-white transition-colors cursor-default">
              {t.terms}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
