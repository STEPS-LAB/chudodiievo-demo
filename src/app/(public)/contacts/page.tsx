'use client';

import { Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useEffect } from 'react';
import { useHeader } from '@/components/layout/HeaderContext';

export const dynamic = 'force-dynamic';

export default function ContactsPage() {
  const { locale } = useLanguage();
  const { setVariant } = useHeader();
  const isUA = locale === 'ua';

  useEffect(() => {
    setVariant('dark');
    return () => setVariant('light');
  }, [setVariant]);

  const contactInfo = {
    reception: {
      title: isUA ? 'РЕЦЕПЦІЯ' : 'RECEPTION',
      phone: '050 463 18 64',
      email: 'info@chudodievo.com',
      href: 'tel:+380504631864',
    },
    restaurant: {
      title: isUA ? 'РЕСТОРАН' : 'RESTAURANT',
      phone: '066 571 94 72',
      href: 'tel:+380665719472',
    },
    pool: {
      title: isUA ? 'БАСЕЙН' : 'POOL',
      phone: '066 602 10 77',
      href: 'tel:+380666021077',
    },
  };

  const address = {
    title: isUA ? 'АДРЕСА' : 'ADDRESS',
    text: isUA
      ? 'Житомирська область,\nЧерняхівський район, село Вишпіль,\nвулиця Лісова 47'
      : 'Zhytomyr region,\nCherniakhivskyi district, v. Vyshpil,\nLisova street 47',
  };

  const directions = {
    title: isUA ? 'ЯК КРАЩЕ ПРОЇХАТИ?' : 'HOW TO GET THERE?',
    text: isUA
      ? 'По окружній Житомира до села\nКам\'янка, далі поворот на Вишпіль,\nбіля магазину ще раз направо.'
      : 'Via Zhytomyr ring road to Kam\'yanka\nvillage, then turn to Vyshpil,\nturn right again near the store.',
  };

  const socialMedia = {
    title: isUA ? 'НАШІ СОЦМЕРЕЖІ' : 'OUR SOCIAL MEDIA',
    instagram: {
      name: 'Instagram',
      href: 'https://instagram.com/chudodievo',
    },
    facebook: {
      name: 'Facebook',
      href: 'https://facebook.com/chudodievo',
    },
  };

  return (
    <main className="pt-2">
      {/* Contact Information Section */}
      <section className="section-padding bg-[#1A2F2A]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Reception */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-2 tracking-wide">
                  {contactInfo.reception.title}
                </h3>
                <a
                  href={contactInfo.reception.href}
                  className="text-3xl font-light text-white hover:text-secondary-400 transition-colors"
                >
                  {contactInfo.reception.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.reception.email}`}
                  className="block mt-2 text-neutral-400 hover:text-secondary-400 transition-colors"
                >
                  {contactInfo.reception.email}
                </a>
              </div>

              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-4 tracking-wide">
                  {socialMedia.title}
                </h3>
                <div className="space-y-3">
                  <a
                    href={socialMedia.instagram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>{socialMedia.instagram.name}</span>
                  </a>
                  <a
                    href={socialMedia.facebook.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    <span>{socialMedia.facebook.name}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Restaurant */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-2 tracking-wide">
                  {contactInfo.restaurant.title}
                </h3>
                <a
                  href={contactInfo.restaurant.href}
                  className="text-3xl font-light text-white hover:text-secondary-400 transition-colors"
                >
                  {contactInfo.restaurant.phone}
                </a>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-3 tracking-wide">
                  {address.title}
                </h3>
                <p className="text-neutral-300 whitespace-pre-line leading-relaxed">
                  {address.text}
                </p>
              </div>
            </div>

            {/* Pool */}
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-2 tracking-wide">
                  {contactInfo.pool.title}
                </h3>
                <a
                  href={contactInfo.pool.href}
                  className="text-3xl font-light text-white hover:text-secondary-400 transition-colors"
                >
                  {contactInfo.pool.phone}
                </a>
              </div>

              {/* Directions */}
              <div>
                <h3 className="text-sm font-medium text-neutral-400 mb-3 tracking-wide">
                  {directions.title}
                </h3>
                <p className="text-neutral-300 whitespace-pre-line leading-relaxed">
                  {directions.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
