'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';

const footerLinks = {
  navigation: [
    { href: '/', key: 'home' },
    { href: '/#about', key: 'about' },
    { href: '/#rooms', key: 'rooms' },
    { href: '/restaurant', key: 'restaurant' },
    { href: '/activities', key: 'activities' },
    { href: '/#pool', key: 'pool' },
  ],
};

const socialLinks = [
  {
    href: 'https://www.instagram.com/chudodievo/',
    icon: Instagram,
    label: 'Instagram',
  },
  {
    href: 'https://www.facebook.com/chudodievo',
    icon: Facebook,
    label: 'Facebook',
  },
];

export default function Footer() {
  const { locale } = useLanguage();
  const t = useTranslations();

  const isUA = locale === 'ua';

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <button onClick={scrollToTop} className="mb-6" aria-label="Scroll to top">
              <Image
                src="/images/logo.svg"
                alt={isUA ? 'Чудодієво' : 'Chudodievo'}
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </button>
            <p className="text-neutral-400 mb-6 max-w-sm">
              {t('footer.description')}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4" role="navigation" aria-label="Social media links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-neutral-800 rounded-sm flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-display font-medium text-white mb-6">
              {t('footer.navigation')}
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2" role="list">
              {footerLinks.navigation.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-neutral-200 underline decoration-neutral-500 underline-offset-4 hover:text-white transition-colors duration-200"
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
            <ul className="space-y-4" role="list">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <address className="text-neutral-400 not-italic">
                  {isUA ? 'Житомирська область,\nс. Вишпіль, вул. Лісова 47' : 'Zhytomyr region,\nv. Vyshpil, Lisova st. 47'}
                </address>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+380123456789"
                  className="text-neutral-200 underline decoration-neutral-500 underline-offset-4 hover:text-white transition-colors"
                >
                  +38 (012) 345-67-89
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@chudodievo.com"
                  className="text-neutral-200 underline decoration-neutral-500 underline-offset-4 hover:text-white transition-colors"
                >
                  info@chudodievo.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-neutral-400">
                  09:00 — 21:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-300 text-center md:text-left">
              {t('footer.copyright')}
            </p>
            <p className="text-sm text-neutral-300">
              Developed by{' '}
              <a
                href="https://stepslab.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-200 underline decoration-primary-300 underline-offset-4 hover:text-white transition-colors"
              >
                STEPS LAB
              </a>
            </p>
            <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-auto md:justify-end space-y-2 md:space-y-0 md:space-x-6">
              <a href="/privacy" className="inline-flex min-h-11 items-center text-sm text-neutral-300 underline decoration-neutral-500 underline-offset-4 hover:text-white transition-colors">
                {isUA ? 'Політика конфіденційності' : 'Privacy Policy'}
              </a>
              <a href="/terms" className="inline-flex min-h-11 items-center text-sm text-neutral-300 underline decoration-neutral-500 underline-offset-4 hover:text-white transition-colors">
                {isUA ? 'Умови використання' : 'Terms of Use'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
