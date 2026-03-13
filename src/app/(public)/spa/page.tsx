'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Phone, Mail, Check } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';

export const dynamic = 'force-dynamic';

const spaServices = [
  {
    icon: '💆',
    title: { ua: 'Масажі', en: 'Massages' },
    description: {
      ua: 'Класичні та авторські техніки масажу для розслаблення та відновлення',
      en: 'Classic and author massage techniques for relaxation and restoration',
    },
    services: [
      { ua: 'Класичний масаж', en: 'Classic Massage', duration: '60 хв', price: '1200' },
      { ua: 'Релакс масаж', en: 'Relaxation Massage', duration: '90 хв', price: '1600' },
      { ua: 'Спортивний масаж', en: 'Sports Massage', duration: '60 хв', price: '1400' },
      { ua: 'Тайський масаж', en: 'Thai Massage', duration: '120 хв', price: '2200' },
    ],
  },
  {
    icon: '🧖',
    title: { ua: 'Термальний комплекс', en: 'Thermal Complex' },
    description: {
      ua: 'Сауна, хаммам та гарячі джерела для глибокого розслаблення',
      en: 'Sauna, hammam and hot springs for deep relaxation',
    },
    services: [
      { ua: 'Фінська сауна', en: 'Finnish Sauna', duration: '60 хв', price: '800' },
      { ua: 'Турецький хаммам', en: 'Turkish Hammam', duration: '90 хв', price: '1000' },
      { ua: 'Гарячі джерела', en: 'Hot Springs', duration: '120 хв', price: '600' },
    ],
  },
  {
    icon: '✨',
    title: { ua: 'Догляд за обличчям', en: 'Facial Care' },
    description: {
      ua: 'Омолоджуючі та відновлювальні процедури для сяючої шкіри',
      en: 'Rejuvenating and restorative procedures for radiant skin',
    },
    services: [
      { ua: 'Класичний догляд', en: 'Classic Facial', duration: '60 хв', price: '1000' },
      { ua: 'Омолоджуючий догляд', en: 'Anti-Aging Facial', duration: '90 хв', price: '1500' },
      { ua: 'Зволоження', en: 'Hydration Treatment', duration: '60 хв', price: '900' },
    ],
  },
];

export default function SpaPage() {
  const { locale } = useLanguage();
  const t = useTranslations();
  const isUA = locale === 'ua';

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/60" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium text-white mb-6">
              {t('spa.title')}
            </h1>
            <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
              {t('spa.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding bg-surface">
        <div className="container-wide mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-neutral-700 leading-relaxed mb-12">
                {t('spa.description')}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
              'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
              'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative aspect-[3/4]"
              >
                <Image
                  src={src}
                  alt={isUA ? 'СПА процедури' : 'SPA Treatments'}
                  fill
                  className="object-cover rounded-sm"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-neutral-50">
        <div className="container-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-medium text-3xl text-neutral-900 mb-4">
              {t('spa.services')}
            </h2>
            <p className="text-neutral-600">
              {isUA ? 'Оберіть ідеальну процедуру для себе' : 'Choose the perfect treatment for you'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {spaServices.map((category, index) => (
              <motion.div
                key={category.title.ua}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-sm shadow-soft"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-display font-medium text-xl text-neutral-900 mb-3">
                  {isUA ? category.title.ua : category.title.en}
                </h3>
                <p className="text-neutral-600 text-sm mb-6">
                  {isUA ? category.description.ua : category.description.en}
                </p>
                <ul className="space-y-4">
                  {category.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex justify-between items-start pb-4 border-b border-neutral-100 last:border-0">
                      <div>
                        <p className="text-neutral-900 font-medium">{isUA ? service.ua : service.en}</p>
                        <p className="text-sm text-neutral-500">{service.duration}</p>
                      </div>
                      <span className="font-medium text-primary-700">{service.price} ₴</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding bg-surface">
        <div className="container-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-medium text-3xl text-neutral-900 mb-4">
              {t('spa.programs')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: { ua: 'День релаксації', en: 'Relaxation Day' },
                description: {
                  ua: 'Комплексна програма для повного розслаблення: масаж, сауна та термальні джерела',
                  en: 'Comprehensive relaxation program: massage, sauna and thermal springs',
                },
                duration: '4 години',
                price: '3500',
              },
              {
                title: { ua: 'Велнес вихідні', en: 'Wellness Weekend' },
                description: {
                  ua: 'Дводенна програма відновлення з персональним інструктором та детокс-меню',
                  en: 'Two-day restoration program with personal instructor and detox menu',
                },
                duration: '2 дні',
                price: '8900',
              },
            ].map((program, index) => (
              <motion.div
                key={program.title.ua}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-sm"
              >
                <h3 className="font-display font-medium text-2xl text-neutral-900 mb-4">
                  {isUA ? program.title.ua : program.title.en}
                </h3>
                <p className="text-neutral-700 mb-6">
                  {isUA ? program.description.ua : program.description.en}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-neutral-600">
                    <Clock className="w-4 h-4" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-medium text-primary-700">{program.price} ₴</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section-padding bg-neutral-50">
        <div className="container-wide mx-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display font-medium text-3xl text-neutral-900 mb-4">
                {isUA ? 'Переваги нашого СПА' : 'SPA Benefits'}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { ua: 'Професійні терапевти', en: 'Professional Therapists' },
                { ua: 'Натуральна косметика', en: 'Natural Cosmetics' },
                { ua: 'Приватні кімнати', en: 'Private Rooms' },
                { ua: 'Індивідуальний підхід', en: 'Individual Approach' },
                { ua: 'Сучасне обладнання', en: 'Modern Equipment' },
                { ua: 'Зони відпочинку', en: 'Relaxation Areas' },
              ].map((item, index) => (
                <motion.div
                  key={item.ua}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-3 bg-white p-4 rounded-sm shadow-soft"
                >
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-neutral-700">{isUA ? item.ua : item.en}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding bg-surface">
        <div className="container-wide mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-medium text-2xl text-neutral-900 mb-8">
                {isUA ? 'Записатися на процедуру' : 'Book a Treatment'}
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center space-x-3">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span className="text-neutral-600">
                    {isUA ? 'Щодня: 09:00 — 21:00' : 'Daily: 09:00 — 21:00'}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <a href="tel:+380123456789" className="text-neutral-600 hover:text-primary-600 transition-colors">
                    +38 (012) 345-67-89
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <a href="mailto:spa@chudodievo.com" className="text-neutral-600 hover:text-primary-600 transition-colors">
                    spa@chudodievo.com
                  </a>
                </div>
              </div>

              <Link href="/contacts" className="luxury-button">
                {t('spa.bookTreatment')}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
