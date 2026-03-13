'use client';

import { motion } from 'framer-motion';
import { Wifi, Flame, Wind, Coffee, Tv, Car, Droplets, Shield } from 'lucide-react';

interface RoomAmenitiesProps {
  amenities: string[];
}

const amenityIcons = [
  Wifi,
  Flame,
  Wind,
  Coffee,
  Tv,
  Car,
  Droplets,
  Shield,
];

export default function RoomAmenities({ amenities }: RoomAmenitiesProps) {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-wide mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-medium text-neutral-900">
            Зручності
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {amenities.map((amenity, index) => {
            const Icon = amenityIcons[index % amenityIcons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col items-center text-center p-4"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-sm flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <span className="text-sm text-neutral-700">{amenity}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
