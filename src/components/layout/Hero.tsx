'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import BookingBar from '@/features/booking/BookingBar';

interface HeroProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage = '/images/hero.webp',
}: HeroProps) {
  const { locale } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (_data: { checkIn: string; checkOut: string; guests: number }) => {
    // Redirect to rooms or handle search
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with priority for LCP optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={subtitle || (locale === 'ua' ? 'Розкішний відпочинок на природі' : 'Luxury Escape in Nature')}
          fill
          priority
          fetchPriority="high"
          loading="eager"
          className="object-cover bg-center bg-no-repeat"
          sizes="100vw"
          quality={85}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-white mb-6 tracking-tight">
            {title || (locale === 'ua' ? 'Чудодієво' : 'Chudodievo')}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-neutral-200 mb-10 max-w-2xl mx-auto font-light">
            {subtitle || (locale === 'ua' ? 'Розкішний відпочинок на природі' : 'Luxury Escape in Nature')}
          </p>
        </motion.div>

        {/* Booking Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <BookingBar onSearch={handleSearch} />
        </motion.div>
      </div>
    </section>
  );
}
