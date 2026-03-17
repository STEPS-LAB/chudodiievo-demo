'use client';

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/lib/hooks';
import { Bike, Fish, Flower2 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import Image from 'next/image';

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
    { icon: Bike, key: 'atv', name: 'ATVs', description: 'Extreme forest riding', image: '/images/quadro.webp', duration: 'from 1600 UAH', level: 'Extreme' },
    { icon: Fish, key: 'boats', name: 'Boats & Catamarans', description: 'Lake cruises', image: '/images/boats.webp', duration: 'from 150 UAH', level: 'Any level' },
    { icon: Fish, key: 'fishing', name: 'Fishing', description: 'Amateur and sport fishing', image: '/images/fishing.webp', duration: 'from 500 UAH', level: 'Any level' },
    { icon: Bike, key: 'tennis', name: 'Tennis', description: 'Tennis court and rental', image: '/images/tennis.webp', duration: '400 UAH/hour', level: 'Any level' },
    { icon: Bike, key: 'football', name: 'Football', description: 'Football field', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80', duration: 'Free', level: 'Any level' },
  ],
};

export default function RelaxationSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const { locale } = useLanguage();
  const isUA = locale === 'ua';
  const t = isUA
    ? {
        subtitle: 'Пригоди та відкриття',
        title: 'Релакс та дозвілля',
        description: 'Відкрийте для себе всі можливості відпочинку на природі',
        cta: 'Дізнатися більше',
      }
    : {
        subtitle: 'Adventures & Discovery',
        title: 'Relaxation & Leisure',
        description: 'Discover all the possibilities for outdoor recreation',
        cta: 'Learn More',
      };

  const activitiesList = activities[locale as 'ua' | 'en'];

  return (
    <section className="section-padding bg-neutral-100">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-primary-600 font-medium">
            {t.subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-neutral-900 mt-4 mb-6">
            {t.title}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activitiesList.map((activity, index) => (
            <motion.div
              key={activity.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-sm aspect-[4/3]"
            >
              <Image
                src={activity.image}
                alt={activity.name}
                fill
                className="object-cover transition-transform duration-700 md:group-hover:scale-110"
                loading="lazy"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-sm flex items-center justify-center mb-4">
                  <activity.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-medium text-white mb-2">
                  {activity.name}
                </h3>
                <p className="text-sm text-white/80">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/activities" className="luxury-button">
            {t.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
