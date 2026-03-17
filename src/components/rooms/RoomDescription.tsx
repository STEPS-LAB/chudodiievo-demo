'use client';

import { motion } from 'framer-motion';
import { Users, Maximize } from 'lucide-react';
import Image from 'next/image';

interface RoomDescriptionProps {
  name: string;
  description: string;
  maxGuests: number;
  size: number;
}

export default function RoomDescription({
  name,
  description,
  maxGuests,
  size,
}: RoomDescriptionProps) {
  return (
    <section className="section-padding bg-surface">
      <div className="container-wide mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-display font-medium text-neutral-900 mb-6">
              {name}
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-8">
              {description}
            </p>

            {/* Stats */}
            <div className="flex space-x-8 pt-8 border-t border-neutral-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-50 rounded-sm flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="text-2xl font-medium text-neutral-900">
                    {maxGuests}
                  </div>
                  <div className="text-sm text-neutral-500">
                    Гостей
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-50 rounded-sm flex items-center justify-center">
                  <Maximize className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <div className="text-2xl font-medium text-neutral-900">
                    {size} м²
                  </div>
                  <div className="text-sm text-neutral-500">
                    Площа
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="image-zoom-container rounded-sm overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80"
                alt="Room detail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-100 rounded-sm -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
