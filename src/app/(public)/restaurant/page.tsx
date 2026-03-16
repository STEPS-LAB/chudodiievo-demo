'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';

export const dynamic = 'force-dynamic';

const menuCategories = [
  {
    title: { ua: 'Закуски', en: 'Starters' },
    items: [
      { ua: 'Карпатський сир з медом', en: 'Carpathian Cheese with Honey', price: '280' },
      { ua: 'Тартар з яловичини', en: 'Beef Tartare', price: '320' },
      { ua: 'Брускети з томатами', en: 'Tomato Bruschetta', price: '180' },
    ],
  },
  {
    title: { ua: 'Основні страви', en: 'Main Courses' },
    items: [
      { ua: 'Качка з яблуками', en: 'Duck with Apples', price: '480' },
      { ua: 'Лосось на грилі', en: 'Grilled Salmon', price: '520' },
      { ua: 'Ризото з грибами', en: 'Mushroom Risotto', price: '340' },
    ],
  },
  {
    title: { ua: 'Десерти', en: 'Desserts' },
    items: [
      { ua: 'Шоколадний фондан', en: 'Chocolate Fondant', price: '180' },
      { ua: 'Сирний торт', en: 'Cheesecake', price: '160' },
      { ua: 'Сезонні фрукти', en: 'Seasonal Fruits', price: '140' },
    ],
  },
];

export default function RestaurantPage() {
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80)',
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
              {t('restaurant.title')}
            </h1>
            <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
              {t('restaurant.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-neutral-700 leading-relaxed mb-12">
                {t('restaurant.description')}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-square"
            >
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80"
                alt={isUA ? 'Інтер\'єр ресторану' : 'Restaurant Interior'}
                fill
                className="object-cover rounded-sm"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative aspect-square"
            >
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt={isUA ? 'Авторська кухня' : 'Author\'s Cuisine'}
                fill
                className="object-cover rounded-sm"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="section-padding bg-neutral-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-medium text-3xl text-neutral-900 mb-4">
              {t('restaurant.menu')}
            </h2>
            <p className="text-neutral-600">
              {isUA ? 'Обрані страви з нашого меню' : 'Selected dishes from our menu'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {menuCategories.map((category, index) => (
              <motion.div
                key={category.title.ua}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-sm shadow-soft"
              >
                <h3 className="font-display font-medium text-xl text-neutral-900 mb-6 pb-4 border-b border-neutral-200">
                  {isUA ? category.title.ua : category.title.en}
                </h3>
                <ul className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex justify-between items-start">
                      <span className="text-neutral-700">{isUA ? item.ua : item.en}</span>
                      <span className="font-medium text-primary-700">{item.price} ₴</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Contact */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start space-x-4 mb-6">
                <Clock className="w-6 h-6 text-primary-600 mt-1" />
                <div>
                  <h3 className="font-display font-medium text-xl text-neutral-900 mb-2">
                    {t('restaurant.hours')}
                  </h3>
                  <ul className="space-y-2 text-neutral-600">
                    <li className="flex justify-between">
                      <span>{isUA ? 'Пн-Пт' : 'Mon-Fri'}</span>
                      <span>08:00 — 22:00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>{isUA ? 'Сб-Нд' : 'Sat-Sun'}</span>
                      <span>09:00 — 23:00</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <MapPin className="w-6 h-6 text-primary-600" />
                  <span className="text-neutral-600">
                    {isUA ? 'Головний корпус, 1 поверх' : 'Main Building, 1st Floor'}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-primary-600" />
                  <a href="tel:+380123456789" className="text-neutral-600 hover:text-primary-600 transition-colors">
                    +38 (012) 345-67-89
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-primary-600" />
                  <a href="mailto:restaurant@chudodievo.com" className="text-neutral-600 hover:text-primary-600 transition-colors">
                    restaurant@chudodievo.com
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
