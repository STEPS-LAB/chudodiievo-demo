'use client';

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/lib/hooks';
import { Waves, Thermometer, Utensils, Music, Baby, Armchair } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export default function PoolSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const { locale } = useLanguage();
  const isUA = locale === 'ua';

  const t = isUA
    ? {
        subtitle: 'Водна стихія',
        title: 'Басейн',
        description: 'Зовнішній басейн з музикою та коктейлями. Курортний простір для відпочинку, де можна поплавати, засмагати, поспілкуватися з друзями або познайомитися з новими людьми. DJ створює настрій.',
        features: [
          { icon: Thermometer, name: 'Підігрів', description: 'Басейн з системою підігріву' },
          { icon: Waves, name: 'Джакузі', description: 'Гідромасажна зона' },
          { icon: Baby, name: 'Дитячий басейн', description: 'Окремий басейн для дітей' },
          { icon: Utensils, name: 'Ресторан і бар', description: 'Кухня та напої на місці' },
          { icon: Armchair, name: 'Зони відпочинку', description: 'Шезлонги, бунгало, пляжні ліжка' },
          { icon: Music, name: 'Музика', description: 'DJ створює атмосферу' },
        ],
        pricing: {
          title: 'Вартість відвідування',
          weekdays: 'Будні (Пн–Чт)',
          weekends: 'Вихідні (Пт–Нд)',
          sunLounger: 'Шезлонг',
          beachBed: 'Пляжне ліжко',
          bungalow: 'Бунгало',
          children: 'Дитячий квиток (50%)',
          hotelGuest: 'Квиток для гостей готелю',
          uah: 'грн',
        },
        cta: 'Забронювати',
      }
    : {
        subtitle: 'Water Element',
        title: 'Pool',
        description: 'Outdoor pool with music and cocktails. A resort-style relaxation space where guests can swim, sunbathe, socialize with friends, or make new acquaintances. DJ sets the mood.',
        features: [
          { icon: Thermometer, name: 'Heated Pool', description: 'Main pool with heating system' },
          { icon: Waves, name: 'Jacuzzi', description: 'Hydro massage area' },
          { icon: Baby, name: "Children's Pool", description: 'Separate pool for kids' },
          { icon: Utensils, name: 'Restaurant & Bar', description: 'On-site dining and drinks' },
          { icon: Armchair, name: 'Lounge Areas', description: 'Sun loungers, bungalows, beach beds' },
          { icon: Music, name: 'Music', description: 'DJ sets the atmosphere' },
        ],
        pricing: {
          title: 'Pricing',
          weekdays: 'Weekdays (Mon–Thu)',
          weekends: 'Weekends (Fri–Sun)',
          sunLounger: 'Sun Lounger',
          beachBed: 'Beach Bed',
          bungalow: 'Bungalow',
          children: "Children's Ticket (50%)",
          hotelGuest: 'Hotel Guest Ticket',
          uah: 'UAH',
        },
        cta: 'Book Now',
      };

  const prices = {
    weekdays: {
      sunLounger: 700,
      beachBed: 2000,
      bungalow: 2500,
      children: 300,
      hotelGuest: 350,
    },
    weekends: {
      sunLounger: 800,
      beachBed: 3000,
      bungalow: 3500,
      children: 400,
      hotelGuest: 450,
    },
  };

  return (
    <section className="section-padding bg-white">
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
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            {t.description}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {t.features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-neutral-100 rounded-sm flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-neutral-600" />
              </div>
              <div>
                <h3 className="font-medium text-neutral-900 mb-1">
                  {feature.name}
                </h3>
                <p className="text-sm text-neutral-500">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pool Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="image-zoom-container rounded-sm overflow-hidden aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]">
            <img
              src="/images/pool.webp"
              alt={isUA ? 'Басейн' : 'Pool'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-display font-medium text-neutral-900 text-center mb-8">
            {t.pricing.title}
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Weekdays */}
            <div className="bg-neutral-50 rounded-sm p-6">
              <h4 className="text-lg font-display font-medium text-neutral-900 mb-4">
                {t.pricing.weekdays}
              </h4>
              <div className="space-y-3">
                <div className="grid grid-cols-[65%_35%] gap-4">
                  <span className="text-neutral-600">{t.pricing.sunLounger}</span>
                  <span className="font-medium text-neutral-900 text-right whitespace-nowrap">{prices.weekdays.sunLounger} {t.pricing.uah}</span>
                </div>
                <div className="grid grid-cols-[65%_35%] gap-4">
                  <span className="text-neutral-600">{t.pricing.beachBed}</span>
                  <span className="font-medium text-neutral-900 text-right whitespace-nowrap">{prices.weekdays.beachBed} {t.pricing.uah}</span>
                </div>
                <div className="grid grid-cols-[65%_35%] gap-4">
                  <span className="text-neutral-600">{t.pricing.bungalow}</span>
                  <span className="font-medium text-neutral-900 text-right whitespace-nowrap">{prices.weekdays.bungalow} {t.pricing.uah}</span>
                </div>
                <div className="border-t border-neutral-200 pt-3 space-y-2">
                  <div className="grid grid-cols-[65%_35%] gap-4">
                    <span className="text-neutral-600">{t.pricing.children}</span>
                    <span className="font-medium text-neutral-900 text-right whitespace-nowrap">{prices.weekdays.children} {t.pricing.uah}</span>
                  </div>
                  <div className="grid grid-cols-[65%_35%] gap-4">
                    <span className="text-neutral-600">{t.pricing.hotelGuest}</span>
                    <span className="font-medium text-neutral-900 text-right whitespace-nowrap">{prices.weekdays.hotelGuest} {t.pricing.uah}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekends */}
            <div className="bg-primary-50 rounded-sm p-6 border border-primary-100">
              <h4 className="text-lg font-display font-medium text-neutral-900 mb-4">
                {t.pricing.weekends}
              </h4>
              <div className="space-y-3">
                <div className="grid grid-cols-[65%_35%] gap-4">
                  <span className="text-neutral-600">{t.pricing.sunLounger}</span>
                  <span className="font-medium text-neutral-900 text-right whitespace-nowrap">{prices.weekends.sunLounger} {t.pricing.uah}</span>
                </div>
                <div className="grid grid-cols-[65%_35%] gap-4">
                  <span className="text-neutral-600">{t.pricing.beachBed}</span>
                  <span className="font-medium text-neutral-900 text-right whitespace-nowrap">{prices.weekends.beachBed} {t.pricing.uah}</span>
                </div>
                <div className="grid grid-cols-[65%_35%] gap-4">
                  <span className="text-neutral-600">{t.pricing.bungalow}</span>
                  <span className="font-medium text-neutral-900 text-right whitespace-nowrap">{prices.weekends.bungalow} {t.pricing.uah}</span>
                </div>
                <div className="border-t border-neutral-200 pt-3 space-y-2">
                  <div className="grid grid-cols-[65%_35%] gap-4">
                    <span className="text-neutral-600">{t.pricing.children}</span>
                    <span className="font-medium text-neutral-900 text-right whitespace-nowrap">{prices.weekends.children} {t.pricing.uah}</span>
                  </div>
                  <div className="grid grid-cols-[65%_35%] gap-4">
                    <span className="text-neutral-600">{t.pricing.hotelGuest}</span>
                    <span className="font-medium text-neutral-900 text-right whitespace-nowrap">{prices.weekends.hotelGuest} {t.pricing.uah}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
