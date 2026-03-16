'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Bike, Fish, Flower2, Clock, Users } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export const dynamic = 'force-dynamic';

const activities = {
  ua: [
    { icon: Bike, key: 'cycling', name: 'Велопрогулянки', description: 'Прогулянки околицями курорту', image: '/images/velo.webp', duration: '250 грн/год', level: 'Будь-який рівень' },
    { icon: Flower2, key: 'banya', name: 'Лазня та чан', description: 'Лазня на дровах та гарячий чан', image: '/images/laznya.webp', duration: 'від 800 грн', level: 'Комплекс 2600 грн' },
    { icon: Bike, key: 'atv', name: 'Квадроцикли', description: 'Екстремальне катання в лісі', image: '/images/quadro.webp', duration: 'від 1600 грн', level: 'Екстрим' },
    { icon: Fish, key: 'boats', name: 'Човни та катамарани', description: 'Прогулянки озером', image: '/images/boats.webp', duration: 'від 150 грн', level: 'Будь-який рівень' },
    { icon: Fish, key: 'fishing', name: 'Риболовля', description: 'Любительська та спортивна', image: '/images/fishing.webp', duration: 'від 500 грн', level: 'Будь-який рівень' },
    { icon: Bike, key: 'tennis', name: 'Теніс', description: 'Тенісний корт', image: '/images/tennis.webp', duration: '400 грн/год', level: 'Будь-який рівень' },
    { icon: Bike, key: 'football', name: 'Футбол', description: 'Поле для мініфутболу', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80', duration: 'Безкоштовно', level: 'Будь-який рівень' },
  ],
  en: [
    { icon: Bike, key: 'cycling', name: 'Cycling', description: 'Rides around the resort', image: '/images/velo.webp', duration: '250 UAH/hour', level: 'Any level' },
    { icon: Flower2, key: 'banya', name: 'Banya & Hot Tub', description: 'Wood-fired sauna and hot tub', image: '/images/laznya.webp', duration: 'from 800 UAH', level: 'Complex 2600 UAH' },
    { icon: Bike, key: 'atv', name: 'ATVs', description: 'Extreme forest riding', image: 'https://images.unsplash.com/photo-1563294029-b4f56e1c9133?w=800&q=80', duration: 'from 1600 UAH', level: 'Extreme' },
    { icon: Fish, key: 'boats', name: 'Boats & Catamarans', description: 'Lake cruises', image: 'https://images.unsplash.com/photo-1544551763-46a8723ba3f9?w=800&q=80', duration: 'from 150 UAH', level: 'Any level' },
    { icon: Fish, key: 'fishing', name: 'Fishing', description: 'Amateur and sport fishing', image: 'https://images.unsplash.com/photo-1544209978-71468935cd7e?w=800&q=80', duration: 'from 500 UAH', level: 'Any level' },
    { icon: Bike, key: 'tennis', name: 'Tennis', description: 'Tennis court and rental', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80', duration: '400 UAH/hour', level: 'Any level' },
    { icon: Bike, key: 'football', name: 'Football', description: 'Football field', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80', duration: 'Free', level: 'Any level' },
  ],
};

export default function ActivitiesPage() {
  const { locale } = useLanguage();
  const isUA = locale === 'ua';
  const t = isUA
    ? {
        heroTitle: 'Дозвілля',
        heroSubtitle: 'Відпочинок для тіла та душі',
        description: 'Обирайте активності до смаку: від традиційної лазні та гарячого чану до екстремальних розваг на квадроциклах. У нас кожен знайде заняття для ідеального відпочинку.',
        activitiesTitle: 'Види дозвілля',
        duration: 'Ціна',
        level: 'Умови',
      }
    : {
        heroTitle: 'Leisure',
        heroSubtitle: 'Recreation for Body and Soul',
        description: 'Choose activities to your liking: from traditional banya and hot tub to extreme ATV adventures. Everyone will find something for perfect relaxation.',
        activitiesTitle: 'Activities',
        duration: 'Price',
        level: 'Conditions',
      };

  const activitiesList = activities[locale as 'ua' | 'en'];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/d-hero.webp)',
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
              {t.heroTitle}
            </h1>
            <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
              {t.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-neutral-700 leading-relaxed">
                {t.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="section-padding bg-neutral-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-medium text-3xl text-neutral-900 mb-4">
              {t.activitiesTitle}
            </h2>
            <p className="text-neutral-600">
              {isUA ? 'Оберіть активність до смаку' : 'Choose an activity to your liking'}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activitiesList.map((activity, index) => (
              <motion.div
                key={activity.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-sm aspect-[4/3] bg-white shadow-soft"
              >
                <div className="image-zoom-container absolute inset-0 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.name}
                    fill
                    className="object-cover transition-transform duration-700 md:group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-sm flex items-center justify-center mb-4">
                    <activity.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-medium text-white mb-2">
                    {activity.name}
                  </h3>
                  <p className="text-sm text-white/80 mb-3">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/70">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {activity.level}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
