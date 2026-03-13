'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import BookingForm from '@/features/booking/BookingForm';
import type { Room } from '@/lib/config/rooms';

interface RoomBookingProps {
  room: Room;
}

export default function RoomBooking({ room }: RoomBookingProps) {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-wide mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <BookingForm />
            </motion.div>
          </div>

          {/* Price Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="luxury-card p-8 sticky top-24">
              <h3 className="text-xl font-display font-medium text-neutral-900 mb-6">
                Вартість перебування
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">за ніч</span>
                  <span className="text-2xl font-medium text-primary-700">
                    {room.price.toLocaleString()} ₴
                  </span>
                </div>
                <div className="pt-4 border-t border-neutral-100">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Мінімальне бронювання</span>
                    <span className="font-medium">2 ночі</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {[
                  'Безкоштовне скасування',
                  'Миттєве підтвердження',
                  'Найкраща ціна',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3 text-sm text-neutral-600">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="luxury-button w-full">
                Забронювати цей номер
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <p className="text-xs text-neutral-500 text-center mt-4">
                Без комісії за бронювання
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
