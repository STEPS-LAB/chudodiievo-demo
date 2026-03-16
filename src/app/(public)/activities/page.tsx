'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin, Phone, Mail, ArrowRight, Mountain, Bike, Fish, Flower2, Bird, Stars, Heart, Users } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export const dynamic = 'force-dynamic';

const activities = {
  ua: [
    { icon: Bike, key: 'cycling', name: 'Велопрогулянки', description: 'Прогулянки околицями курорту', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80', duration: '250 грн/год', level: 'Будь-який рівень' },
    { icon: Flower2, key: 'banya', name: 'Лазня та чан', description: 'Лазня на дровах та гарячий чан', image: 'https://images.unsplash.com/photo-1543489822-c49534f3271f?w=800&q=80', duration: 'від 800 грн', level: 'Комплекс 2600 грн' },
    { icon: Heart, key: 'massage', name: 'Масаж', description: 'Сеанси загального масажу', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', duration: '550 грн/45 хв', level: 'Будь-який рівень' },
    { icon: Bike, key: 'atv', name: 'Квадроцикли', description: 'Екстремальне катання в лісі', image: 'https://images.unsplash.com/photo-1563294029-b4f56e1c9133?w=800&q=80', duration: 'від 1600 грн', level: 'Екстрим' },
    { icon: Fish, key: 'boats', name: 'Човни та катамарани', description: 'Прогулянки озером', image: 'https://images.unsplash.com/photo-1544551763-46a8723ba3f9?w=800&q=80', duration: 'від 150 грн', level: 'Будь-який рівень' },
    { icon: Fish, key: 'fishing', name: 'Риболовля', description: 'Любительська та спортивна', image: 'https://images.unsplash.com/photo-1544209978-71468935cd7e?w=800&q=80', duration: 'від 500 грн', level: 'Будь-який рівень' },
    { icon: Bike, key: 'tennis', name: 'Теніс', description: 'Тенісний корт та прокат', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80', duration: '400 грн/год', level: 'Будь-який рівень' },
    { icon: Bike, key: 'football', name: 'Мініфутбол', description: 'Поле для мініфутболу', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80', duration: 'Безкоштовно', level: 'Будь-який рівень' },
    { icon: Bike, key: 'table-tennis', name: 'Настільний теніс', description: 'Класичний настільний теніс', image: 'https://images.unsplash.com/photo-1534158914592-062992bbe900?w=800&q=80', duration: '100 грн/год', level: 'Будь-який рівень' },
  ],
  en: [
    { icon: Bike, key: 'cycling', name: 'Cycling', description: 'Rides around the resort', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80', duration: '250 UAH/hour', level: 'Any level' },
    { icon: Flower2, key: 'banya', name: 'Banya & Hot Tub', description: 'Wood-fired sauna and hot tub', image: 'https://images.unsplash.com/photo-1543489822-c49534f3271f?w=800&q=80', duration: 'from 800 UAH', level: 'Complex 2600 UAH' },
    { icon: Heart, key: 'massage', name: 'Massage', description: 'General massage sessions', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', duration: '550 UAH/45min', level: 'Any level' },
    { icon: Bike, key: 'atv', name: 'ATVs', description: 'Extreme forest riding', image: 'https://images.unsplash.com/photo-1563294029-b4f56e1c9133?w=800&q=80', duration: 'from 1600 UAH', level: 'Extreme' },
    { icon: Fish, key: 'boats', name: 'Boats & Catamarans', description: 'Lake cruises', image: 'https://images.unsplash.com/photo-1544551763-46a8723ba3f9?w=800&q=80', duration: 'from 150 UAH', level: 'Any level' },
    { icon: Fish, key: 'fishing', name: 'Fishing', description: 'Amateur and sport fishing', image: 'https://images.unsplash.com/photo-1544209978-71468935cd7e?w=800&q=80', duration: 'from 500 UAH', level: 'Any level' },
    { icon: Bike, key: 'tennis', name: 'Tennis', description: 'Tennis court and rental', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&q=80', duration: '400 UAH/hour', level: 'Any level' },
    { icon: Bike, key: 'football', name: 'Mini Football', description: 'Mini football field', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80', duration: 'Free', level: 'Any level' },
    { icon: Bike, key: 'table-tennis', name: 'Table Tennis', description: 'Classic table tennis', image: 'https://images.unsplash.com/photo-1534158914592-062992bbe900?w=800&q=80', duration: '100 UAH/hour', level: 'Any level' },
  ],
};

const programs = {
  ua: [
    {
      icon: Flower2,
      title: 'Лазня + Чан',
      description: 'Комплексна програма релаксу: традиційна лазня на дровах та гарячий чан на вибір',
      duration: '2 години',
      price: 2600,
      features: ['Лазня на дровах (2 години)', 'Гарячий чан (1 година)', 'Віник в подарунок', 'Рушники та капці'],
    },
    {
      icon: Bike,
      title: 'Активний відпочинок',
      description: 'Комбо для любителів активності: квадроцикли, велосипеди та риболовля',
      duration: '4 години',
      price: 3200,
      features: ['Квадроцикл Лайт (1 година)', 'Велосипеди (2 години)', 'Риболовля любительська', 'Спорядження включено'],
    },
    {
      icon: Heart,
      title: 'Романтичний',
      description: 'Ідеальний вечір для пари: масаж, чан та прогулянка озером',
      duration: '3 години',
      price: 4500,
      features: ['Масаж для двох (90 хв)', 'Чан приватний (1 година)', 'Прогулянка човном', 'Шампанське в подарунок'],
    },
  ],
  en: [
    {
      icon: Flower2,
      title: 'Banya + Hot Tub',
      description: 'Comprehensive relaxation program: traditional wood-fired banya and hot tub of your choice',
      duration: '2 hours',
      price: 2600,
      features: ['Wood-fired banya (2 hours)', 'Hot tub (1 hour)', 'Complimentary broom', 'Towels and slippers'],
    },
    {
      icon: Bike,
      title: 'Active Recreation',
      description: 'Combo for activity lovers: ATVs, bicycles and fishing',
      duration: '4 hours',
      price: 3200,
      features: ['ATV Light (1 hour)', 'Bicycles (2 hours)', 'Amateur fishing', 'Equipment included'],
    },
    {
      icon: Heart,
      title: 'Romantic',
      description: 'Perfect evening for couples: massage, hot tub and lake cruise',
      duration: '3 hours',
      price: 4500,
      features: ['Massage for two (90 min)', 'Private hot tub (1 hour)', 'Boat cruise', 'Complimentary champagne'],
    },
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
        programsTitle: 'Готові програми',
        bookActivity: 'Забронювати',
        contactUs: 'Контакти',
        duration: 'Ціна',
        level: 'Умови',
        features: 'Що включено',
        from: 'від',
        perPerson: 'за програму',
      }
    : {
        heroTitle: 'Leisure',
        heroSubtitle: 'Recreation for Body and Soul',
        description: 'Choose activities to your liking: from traditional banya and hot tub to extreme ATV adventures. Everyone will find something for perfect relaxation.',
        activitiesTitle: 'Activities',
        programsTitle: 'Ready Programs',
        bookActivity: 'Book Now',
        contactUs: 'Contacts',
        duration: 'Price',
        level: 'Conditions',
        features: 'What\'s Included',
        from: 'from',
        perPerson: 'per program',
      };

  const activitiesList = activities[locale as 'ua' | 'en'];
  const programsList = programs[locale as 'ua' | 'en'];

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
              <p className="text-lg text-neutral-700 leading-relaxed mb-12">
                {t.description}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-video"
            >
              <Image
                src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80"
                alt={isUA ? 'Велопрогулянки' : 'Cycling'}
                fill
                className="object-cover rounded-sm"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative aspect-video"
            >
              <Image
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80"
                alt={isUA ? 'Йога на природі' : 'Yoga in Nature'}
                fill
                className="object-cover rounded-sm"
              />
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
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
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

      {/* Programs */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-medium text-3xl text-neutral-900 mb-4">
              {t.programsTitle}
            </h2>
            <p className="text-neutral-600">
              {isUA ? 'Готові рішення для ідеального відпочинку' : 'Ready solutions for perfect vacation'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {programsList.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-neutral-50 rounded-sm p-8 shadow-soft hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-sm flex items-center justify-center mb-6">
                  <program.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="font-display font-medium text-xl text-neutral-900 mb-3">
                  {program.title}
                </h3>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                  {program.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {program.duration}
                  </span>
                </div>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-neutral-600">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-1.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-neutral-200">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xs text-neutral-500">{t.from}</span>
                    <span className="text-2xl font-medium text-primary-700">
                      {program.price.toLocaleString()} ₴
                    </span>
                    <span className="text-xs text-neutral-500">{t.perPerson}</span>
                  </div>
                  <Link
                    href="/contacts"
                    className="luxury-button-secondary w-full justify-center"
                  >
                    {t.bookActivity}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-neutral-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display font-medium text-3xl text-neutral-900 mb-4">
                {isUA ? 'Потрібна допомога з вибором?' : 'Need Help Choosing?'}
              </h2>
              <p className="text-neutral-600">
                {isUA
                  ? 'Наші менеджери допоможуть підібрати ідеальну програму відпочинку'
                  : 'Our managers will help you choose the perfect vacation program'}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center justify-center gap-3"
              >
                <MapPin className="w-5 h-5 text-primary-600" />
                <span className="text-neutral-700">
                  {isUA ? 'с. Вишпіль, вул. Лісова 47' : 'Vyspil, Lisova St 47'}
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5 text-primary-600" />
                <a href="tel:+380504631864" className="text-neutral-700 hover:text-primary-600 transition-colors">
                  050 463 18 64
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center justify-center gap-3"
              >
                <Mail className="w-5 h-5 text-primary-600" />
                <a href="mailto:info@chudodievo.com" className="text-neutral-700 hover:text-primary-600 transition-colors">
                  info@chudodievo.com
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Link href="/contacts" className="luxury-button">
                {t.contactUs}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
