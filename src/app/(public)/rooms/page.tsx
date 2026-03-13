'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { rooms } from '@/lib/config/rooms';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';

export const dynamic = 'force-dynamic';

export default function RoomsPage() {
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
            backgroundImage: 'url(https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1920&q=80)',
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
              {t('rooms.title')}
            </h1>
            <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
              {t('rooms.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="section-padding bg-surface">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/rooms/${room.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6">
                    <Image
                      src={room.images[0]}
                      alt={isUA ? room.name.ua : room.name.en}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display font-medium text-2xl text-neutral-900 mb-2">
                        {isUA ? room.name.ua : room.name.en}
                      </h3>
                      <p className="text-neutral-600">
                        {isUA ? room.shortDescription.ua : room.shortDescription.en}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-neutral-500">
                      <span>{room.maxGuests} {isUA ? 'гостей' : 'guests'}</span>
                      <span>•</span>
                      <span>{room.size} м²</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-medium text-primary-700">
                        {room.price.toLocaleString()} {room.currency}
                      </span>
                      <span className="text-sm text-neutral-500">
                        {isUA ? 'за ніч' : 'per night'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-primary-600 group-hover:text-primary-700 transition-colors">
                    <span className="font-medium">{t('rooms.viewDetails')}</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
