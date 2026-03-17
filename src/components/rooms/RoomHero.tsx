'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useScrollPosition } from '@/lib/hooks';
import type { Room } from '@/lib/config/rooms';

interface RoomHeroProps {
  room: Room;
}

export default function RoomHero({ room }: RoomHeroProps) {
  const { isScrolled } = useScrollPosition(100);

  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: isScrolled ? 100 : 0 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={room.images[0]}
          alt={room.name.ua}
          fill
          priority
          fetchPriority="high"
          loading="eager"
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-neutral-900/30 to-neutral-900/70" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-sm text-sm uppercase tracking-widest text-white mb-6"
        >
          {room.featured ? 'Featured' : 'Luxury'}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-5xl sm:text-6xl md:text-7xl font-display font-medium text-white mb-6"
        >
          {room.name.ua}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl text-neutral-200 max-w-2xl mx-auto"
        >
          {room.shortDescription.ua}
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
