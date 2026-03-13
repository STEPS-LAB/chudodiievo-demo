'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Users, Maximize, Check } from 'lucide-react';
import { getRoomBySlug, getRelatedRooms } from '@/lib/config/rooms';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';

export const dynamic = 'force-dynamic';

export default function RoomDetailPage() {
  const params = useParams();
  const { locale } = useLanguage();
  const t = useTranslations();
  const isUA = locale === 'ua';

  const slug = params.slug as string;
  const room = getRoomBySlug(slug);
  const relatedRooms = getRelatedRooms(slug, 3);

  if (!room) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-medium text-neutral-900 mb-4">
            {isUA ? 'Номер не знайдено' : 'Room Not Found'}
          </h1>
          <Link href="/rooms" className="luxury-button">
            {isUA ? 'Переглянути всі номери' : 'View All Rooms'}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24">
      {/* Back Link */}
      <div className="container py-8">
        <Link
          href="/rooms"
          className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {isUA ? 'Всі номери' : 'All Rooms'}
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 container mb-12">
        <div className="relative aspect-[4/3] md:aspect-square">
          <Image
            src={room.images[0]}
            alt={isUA ? room.name.ua : room.name.en}
            fill
            className="object-cover rounded-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {room.images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={image}
                alt={`${isUA ? room.name.ua : room.name.en} - ${index + 2}`}
                fill
                className="object-cover rounded-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Room Info */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl font-medium text-neutral-900 mb-6">
                {isUA ? room.name.ua : room.name.en}
              </h1>

              <div className="flex items-center space-x-6 mb-8 text-neutral-600">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>{room.maxGuests} {isUA ? 'гостей' : 'guests'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Maximize className="w-5 h-5" />
                  <span>{room.size} м²</span>
                </div>
              </div>

              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                {isUA ? room.description.ua : room.description.en}
              </p>

              <div className="flex items-center justify-between pb-8 border-b border-neutral-200 mb-8">
                <div>
                  <span className="text-3xl font-medium text-primary-700">
                    {room.price.toLocaleString()} {room.currency}
                  </span>
                  <span className="text-neutral-500 ml-2">
                    {isUA ? 'за ніч' : 'per night'}
                  </span>
                </div>
                <Link href="/rooms" className="luxury-button">
                  {t('common.bookNow')}
                </Link>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-display font-medium text-2xl text-neutral-900 mb-6">
                  {t('rooms.amenities')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(isUA ? room.amenities.ua : room.amenities.en).map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-600" />
                      </div>
                      <span className="text-neutral-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Rooms */}
      {relatedRooms.length > 0 && (
        <section className="section-padding bg-neutral-50">
          <div className="container">
            <h2 className="font-display font-medium text-3xl text-neutral-900 mb-8 text-center">
              {t('rooms.relatedRooms')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedRooms.map((relatedRoom, index) => (
                <motion.div
                  key={relatedRoom.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/rooms/${relatedRoom.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                      <Image
                        src={relatedRoom.images[0]}
                        alt={isUA ? relatedRoom.name.ua : relatedRoom.name.en}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-display font-medium text-xl text-neutral-900 mb-2">
                      {isUA ? relatedRoom.name.ua : relatedRoom.name.en}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500">
                        {relatedRoom.maxGuests} {isUA ? 'гостей' : 'guests'} • {relatedRoom.size} м²
                      </span>
                      <span className="text-primary-700 font-medium">
                        {relatedRoom.price.toLocaleString()} {relatedRoom.currency}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
