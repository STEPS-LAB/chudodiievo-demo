'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useIntersectionObserver } from '@/lib/hooks';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export default function RestaurantSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const { locale } = useLanguage();
  const isUA = locale === 'ua';

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -40 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="image-zoom-container relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src="/images/r1.webp"
                  alt={isUA ? 'Ресторан' : 'Restaurant'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="image-zoom-container relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/images/r2.webp"
                  alt={isUA ? 'Авторська кухня' : 'Author\'s Cuisine'}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="image-zoom-container relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="/images/r3.webp"
                  alt={isUA ? 'Інтер\'єр' : 'Interior'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="image-zoom-container relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src="/images/r4.webp"
                  alt={isUA ? 'Страви' : 'Dishes'}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm uppercase tracking-widest text-primary-600 font-medium">
              {isUA ? 'Гастрономія' : 'Gastronomy'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-medium text-neutral-900 mt-4 mb-6">
              {isUA ? 'Ресторан' : 'Restaurant'}
            </h2>
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              {isUA
                ? 'Наш ресторан пропонує унікальну гастрономічну подорож крізь смаки українського Полісся. Ми використовуємо лише найсвіжіші локальні продукти, створюючи страви, які вражають уяву.'
                : 'Our restaurant offers a unique gastronomic journey through the flavors of Ukrainian Polissia. We use only the freshest local ingredients, creating dishes that amaze the imagination.'}
            </p>

            <div className="space-y-4 mb-8">
              {[
                { ua: 'Авторська кухня', en: 'Author\'s Cuisine' },
                { ua: 'Локальні продукти', en: 'Local Products' },
                { ua: 'Винна карта', en: 'Wine Card' },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-neutral-700">{isUA ? item.ua : item.en}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
