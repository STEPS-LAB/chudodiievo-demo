'use client';

import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';

const footerLinks = {
  navigation: [
    { href: '/', key: 'home' },
    { href: '/rooms', key: 'rooms' },
    { href: '/restaurant', key: 'restaurant' },
    { href: '/spa', key: 'spa' },
    { href: '/experiences', key: 'experiences' },
    { href: '/events', key: 'events' },
  ],
  info: [
    { href: '/#about', key: 'about' },
    { href: '/blog', key: 'blog' },
    { href: '/faq', key: 'faq' },
    { href: '/contacts', key: 'contacts' },
  ],
};

const socialLinks = [
  {
    href: 'https://instagram.com',
    icon: Instagram,
    label: 'Instagram',
  },
  {
    href: 'https://facebook.com',
    icon: Facebook,
    label: 'Facebook',
  },
];

export default function Footer() {
  const { locale } = useLanguage();
  const t = useTranslations();

  const isUA = locale === 'ua';

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-sm flex items-center justify-center">
                <span className="text-white font-display font-medium text-lg">Ч</span>
              </div>
              <div>
                <span className="block font-display font-medium text-lg text-white">
                  {isUA ? 'Чудодієво' : 'Chudodievo'}
                </span>
                <span className="block text-xs text-neutral-400 tracking-wide">
                  {isUA ? 'Розкішний відпочинок на природі' : 'Luxury Escape in Nature'}
                </span>
              </div>
            </Link>
            <p className="text-neutral-400 mb-6 max-w-sm">
              {t('footer.description')}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-neutral-800 rounded-sm flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-display font-medium text-white mb-6">
              {t('footer.navigation')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {t(`common.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <h3 className="font-display font-medium text-white mb-6">
              {t('common.about')}
            </h3>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {t(`common.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-display font-medium text-white mb-6">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-400">
                  {isUA ? 'Київська область,\nс. Чудодієво' : 'Kyiv region,\nv. Chudodievo'}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href="tel:+380123456789"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  +38 (012) 345-67-89
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href="mailto:info@chudodievo.com"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  info@chudodievo.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-400">
                  09:00 — 21:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-neutral-500">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {isUA ? 'Політика конфіденційності' : 'Privacy Policy'}
              </Link>
              <Link
                href="/terms"
                className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {isUA ? 'Умови використання' : 'Terms of Use'}
              </Link>
            </div>
          </div>
          {/* Developer Credit */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-500">
              Developed by{' '}
              <a
                href="https://stepslab.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                STEPS LAB
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
