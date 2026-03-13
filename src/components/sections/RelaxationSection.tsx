'use client';

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/lib/hooks';
import { Bike, Fish, Flower2, Heart } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

const activities = {
  ua: [
    { icon: Bike, key: 'cycling', name: 'Велопрогулянки', description: 'Прогулянки околицями курорту', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80' },
    { icon: Flower2, key: 'banya', name: 'Лазня та чан', description: 'Лазня на дровах та гарячий чан', image: 'https://images.unsplash.com/photo-1543489822-c49534f3271f?w=800&q=80' },
    { icon: Heart, key: 'massage', name: 'Масаж', description: 'Сеанси загального масажу', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80' },
    { icon: Bike, key: 'atv', name: 'Квадроцикли', description: 'Екстремальне катання в лісі', image: 'https://images.unsplash.com/photo-1563294029-b4f56e1c9133?w=800&q=80' },
    { icon: Fish, key: 'boats', name: 'Човни та катамарани', description: 'Прогулянки озером', image: 'https://images.unsplash.com/photo-1544551763-46a8723ba3f9?w=800&q=80' },
    { icon: Fish, key: 'fishing', name: 'Риболовля', description: 'Любительська та спортивна', image: 'https://images.unsplash.com/photo-1544209978-71468935cd7e?w=800&q=80' },
    { icon: Bike, key: 'tennis', name: 'Теніс', description: 'Тенісний корт та прокат', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80' },
    { icon: Bike, key: 'football', name: 'Мініфутбол', description: 'Поле для мініфутболу', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80' },
    { icon: Bike, key: 'table-tennis', name: 'Настільний теніс', description: 'Класичний настільний теніс', image: 'https://images.unsplash.com/photo-1534158914592-062992bbe900?w=800&q=80' },
  ],
  en: [
    { icon: Bike, key: 'cycling', name: 'Cycling', description: 'Rides around the resort', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80' },
    { icon: Flower2, key: 'banya', name: 'Banya & Hot Tub', description: 'Wood-fired sauna and hot tub', image: 'https://images.unsplash.com/photo-1543489822-c49534f3271f?w=800&q=80' },
    { icon: Heart, key: 'massage', name: 'Massage', description: 'General massage sessions', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80' },
    { icon: Bike, key: 'atv', name: 'ATVs', description: 'Extreme forest riding', image: 'https://images.unsplash.com/photo-1563294029-b4f56e1c9133?w=800&q=80' },
    { icon: Fish, key: 'boats', name: 'Boats & Catamarans', description: 'Lake cruises', image: 'https://images.unsplash.com/photo-1544551763-46a8723ba3f9?w=800&q=80' },
    { icon: Fish, key: 'fishing', name: 'Fishing', description: 'Amateur and sport fishing', image: 'https://images.unsplash.com/photo-1544209978-71468935cd7e?w=800&q=80' },
    { icon: Bike, key: 'tennis', name: 'Tennis', description: 'Tennis court and rental', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80' },
    { icon: Bike, key: 'football', name: 'Mini Football', description: 'Mini football field', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80' },
    { icon: Bike, key: 'table-tennis', name: 'Table Tennis', description: 'Classic table tennis', image: 'https://images.unsplash.com/photo-1534158914592-062992bbe900?w=800&q=80' },
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
              <img
                src={activity.image}
                alt={activity.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
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
