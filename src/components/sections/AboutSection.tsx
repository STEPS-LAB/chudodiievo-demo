'use client';

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/lib/hooks';
import { Trees, Gem, Heart, Utensils } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import Image from 'next/image';

const features = [
  { icon: Trees, key: 'nature' },
  { icon: Gem, key: 'luxury' },
  { icon: Heart, key: 'wellness' },
  { icon: Utensils, key: 'cuisine' },
];

const content = {
  ua: {
    subtitle: 'Про нас',
    title: 'Місце, де природа зустрічається з розкішшю',
    description: 'Чудодієво — це унікальний курортний комплекс, розташований у серці мальовничого українського Полісся. Ми створили місце, де кожен гість може відпочити від міського шуму та насолодитися гармонією з природою, не відмовляючись від комфорту та розкоші.',
    features: {
      nature: { title: 'Природа', description: 'Оточений віковими лісами та кристально чистими озерами' },
      luxury: { title: 'Розкіш', description: 'Преміальний сервіс та увага до кожної деталі' },
      wellness: { title: 'Здоров\'я та релакс', description: 'Комплексні програми для тіла та душі' },
      cuisine: { title: 'Кухня', description: 'Авторська кухня з локальних продуктів' },
    },
  },
  en: {
    subtitle: 'About Us',
    title: 'Where Nature Meets Luxury',
    description: 'Chudodievo is a unique resort complex located in the heart of the picturesque Ukrainian Polissia. We have created a place where every guest can escape from the city noise and enjoy harmony with nature without compromising on comfort and luxury.',
    features: {
      nature: { title: 'Nature', description: 'Surrounded by ancient forests and crystal-clear lakes' },
      luxury: { title: 'Luxury', description: 'Premium service and attention to every detail' },
      wellness: { title: 'Wellness', description: 'Comprehensive programs for body and soul' },
      cuisine: { title: 'Cuisine', description: 'Author\'s cuisine from local products' },
    },
  },
};

export default function AboutSection() {
  const { locale } = useLanguage();
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });
  const t = content[locale as 'ua' | 'en'];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm uppercase tracking-widest text-primary-600 font-medium">
              {t.subtitle}
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-medium text-neutral-900 mt-4 mb-8">
              {t.title}
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              {t.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.key}
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
                      {t.features[feature.key as keyof typeof t.features].title}
                    </h3>
                    <p className="text-sm text-neutral-500">
                      {t.features[feature.key as keyof typeof t.features].description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="image-zoom-container rounded-sm overflow-hidden">
                  <Image
                    src="/images/about1.webp"
                    alt="Chudodievo nature"
                    width={400}
                    height={320}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 400px"
                  />
                </div>
                <div className="image-zoom-container rounded-sm overflow-hidden">
                  <Image
                    src="/images/about2.webp"
                    alt="Luxury resort"
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 400px"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="image-zoom-container rounded-sm overflow-hidden">
                  <Image
                    src="/images/about3.webp"
                    alt="Resort amenities"
                    width={400}
                    height={240}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 400px"
                  />
                </div>
                <div className="image-zoom-container rounded-sm overflow-hidden">
                  <Image
                    src="/images/about4.webp"
                    alt="Wellness"
                    width={400}
                    height={320}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 400px"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-100 rounded-sm -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
