'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Maximize } from 'lucide-react';
import type { Room } from '@/lib/config/rooms';

interface RelatedRoomsProps {
  rooms: Room[];
}

export default function RelatedRooms({ rooms }: RelatedRoomsProps) {
  if (rooms.length === 0) return null;

  return (
    <section className="section-padding bg-surface">
      <div className="container-wide mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-medium text-neutral-900">
            Схожі номери
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href="/contacts" className="group block">
                <div className="luxury-card overflow-hidden">
                  {/* Image */}
                  <div className="image-zoom-container relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={room.images[0]}
                      alt={room.name.ua}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-display font-medium text-neutral-900 mb-2 md:group-hover:text-primary-600 transition-colors">
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
                      <span className="flex items-center text-sm font-medium text-primary-600 md:group-hover:translate-x-2 transition-transform">
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
