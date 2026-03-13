'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/hooks';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export default function SpaSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const { locale } = useLanguage();
  const isUA = locale === 'ua';

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -40 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm uppercase tracking-widest text-primary-600 font-medium">
              {isUA ? 'Релаксація' : 'Relaxation'}
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-medium text-neutral-900 mt-4 mb-6">
              {isUA ? 'СПА та Велнес' : 'SPA & Wellness'}
            </h2>
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              {isUA
                ? 'Наш СПА-центр пропонує комплексні програми релаксації та відновлення. Від традиційних масажів до сучасних велнес-процедур — кожен знайде щось для себе.'
                : 'Our SPA center offers comprehensive relaxation and restoration programs. From traditional massages to modern wellness procedures — everyone will find something for themselves.'}
            </p>

            <div className="space-y-4 mb-8">
              {[
                { ua: 'Масажі та СПА-процедури', en: 'Massages & SPA Treatments' },
                { ua: 'Сауна та хаммам', en: 'Sauna & Hammam' },
                { ua: 'Йога та медитація', en: 'Yoga & Meditation' },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full" />
                  <span className="text-neutral-700">{isUA ? item.ua : item.en}</span>
                </div>
              ))}
            </div>

            <Link
              href="/activities"
              className="luxury-button inline-flex items-center"
            >
              {isUA ? 'Дізнатися більше' : 'Learn More'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>

          {/* Images */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
                  alt={isUA ? 'СПА' : 'SPA'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80"
                  alt={isUA ? 'Масаж' : 'Massage'}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative aspect-square overflow-hidden rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80"
                  alt={isUA ? 'Велнес' : 'Wellness'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80"
                  alt={isUA ? 'Релаксація' : 'Relaxation'}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
