'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/hooks';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Олена та Андрій',
    location: 'Київ, Україна',
    rating: 5,
    text: 'Незабутній відпочинок! Озерний Будинок перевершив усі наші очікування. Ідеальне місце для романтичного вихік-енду. Обов\'язково повернемося!',
    date: 'Грудень 2025',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
  },
  {
    id: 2,
    name: 'Сім\'я Коваленків',
    location: 'Львів, Україна',
    rating: 5,
    text: 'Чудове місце для сімейного відпочинку. Діти в захваті від природи та активностей. Персонал неймовірно уважний. Дякуємо за чудові канікули!',
    date: 'Січень 2026',
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=100&q=80',
  },
  {
    id: 3,
    name: 'Марія Шевченко',
    location: 'Дніпро, Україна',
    rating: 5,
    text: 'СПА-центр — це просто казка! Масажі та процедури на найвищому рівні. Вдалося повністю відновитися після важкого робочого року.',
    date: 'Січень 2026',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    id: 4,
    name: 'Олександр Бондар',
    location: 'Одеса, Україна',
    rating: 5,
    text: 'Організовували корпоратив для команди. Все було ідеально — від розміщення до харчування. Команда повернулася мотивованою та відпочившою.',
    date: 'Грудень 2025',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-padding bg-neutral-100">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-primary-600 font-medium">
            Що кажуть наші гості
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-neutral-900 mt-4">
            Відгуки гостей
          </h2>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white p-8 sm:p-12 text-center rounded-sm shadow-md h-full">
                    <Quote className="w-12 h-12 text-primary-200 mx-auto mb-6" />

                    <div className="flex justify-center mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-accent-500 fill-accent-500"
                        />
                      ))}
                    </div>

                    <p className="text-lg text-neutral-700 leading-relaxed mb-8 max-w-2xl mx-auto">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center justify-center space-x-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div className="text-left">
                        <div className="font-medium text-neutral-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-neutral-400">
                      {testimonial.date}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
              aria-label="Previous testimonial"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-primary-600'
                      : 'bg-neutral-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  type="button"
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
              aria-label="Next testimonial"
              type="button"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
