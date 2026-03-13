'use client';

import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/lib/hooks';
import { Mountain, Bike, Fish, Flower2, Bird, Stars } from 'lucide-react';
import Link from 'next/link';

const activities = [
  { icon: Mountain, key: 'hiking', name: 'Піші прогулянки', description: 'Еко-стежки крізь вікові ліси', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80' },
  { icon: Bike, key: 'cycling', name: 'Велопрогулянки', description: 'Маршрути для будь-якого рівня', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80' },
  { icon: Fish, key: 'fishing', name: 'Риболовля', description: 'Риболовля на кристально чистих озерах', image: 'https://images.unsplash.com/photo-1544551763-46a8723ba3f9?w=800&q=80' },
  { icon: Flower2, key: 'yoga', name: 'Йога на природі', description: 'Ранкові та вечірні практики', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80' },
  { icon: Bird, key: 'birdwatching', name: 'Спостереження за птахами', description: 'Унікальна фауна Полісся', image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&q=80' },
  { icon: Stars, key: 'stargazing', name: 'Спостереження за зорями', description: 'Нічне небо без світлового забруднення', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80' },
];

export default function ExperiencesSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="section-padding bg-surface">
      <div className="container-wide mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-primary-600 font-medium">
            Пригоди та відкриття
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-neutral-900 mt-4 mb-6">
            Враження
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Відкрийте для себе всі можливості відпочинку на природі
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-sm aspect-[4/3]"
            >
              <img
                src={activity.image}
                alt={activity.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-neutral-900/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-sm flex items-center justify-center mb-4">
                  <activity.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-display font-medium text-white mb-2">
                  {activity.name}
                </h3>
                <p className="text-sm text-white/80">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/experiences" className="luxury-button">
            Explore All Activities
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
