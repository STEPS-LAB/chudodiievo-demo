'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Users, Maximize } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/hooks';
import { getFeaturedRooms } from '@/lib/config/rooms';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function RoomsSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const { locale } = useLanguage();

  const content = {
    ua: {
      subtitle: 'Простір для вашого ідеального відпочинку',
      title: 'Номери та Котеджі',
    },
    en: {
      subtitle: 'Space for your perfect getaway',
      title: 'Rooms & Cottages',
    },
  };

  const t = content[locale as 'ua' | 'en'];

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-primary-600 font-medium">
            {t.subtitle}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-neutral-900 mt-4 mb-6">
            {t.title}
          </h2>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFeaturedRooms().slice(0, 3).map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/rooms/${room.id}`} className="block group">
                <div className="bg-white rounded-sm shadow-md overflow-hidden md:hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="image-zoom-container relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={room.images[0]}
                      alt={room.name.ua}
                      fill
                      className="object-cover"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-medium text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {room.name.ua}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-4 line-clamp-2">
                      {room.shortDescription.ua}
                    </p>

                    {/* Amenities */}
                    <div className="flex items-center space-x-4 mb-4 text-sm text-neutral-500">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{room.maxGuests}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Maximize className="w-4 h-4" />
                        <span>{room.size} м²</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div>
                        <span className="text-xs text-neutral-500">від</span>
                        <div className="text-lg font-medium text-primary-700">
                          {room.price.toLocaleString()} ₴
                        </div>
                        <span className="text-xs text-neutral-500">за ніч</span>
                      </div>
                      <span className="flex items-center text-sm font-medium text-primary-600 group-hover:translate-x-2 transition-transform">
                        Детальніше
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
