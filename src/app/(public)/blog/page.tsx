'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

const blogPosts = [
  {
    slug: 'best-time-visit',
    title: {
      ua: 'Найкращий час для відвідування Чудодієво',
      en: 'Best Time to Visit Chudodievo',
    },
    excerpt: {
      ua: 'Дізнайтеся, коли найкраще приїжджати в наш курорт для максимального відпочинку',
      en: 'Discover the best time to visit our resort for maximum relaxation',
    },
    category: 'nature',
    date: '2026-02-15',
    readTime: '5 хв',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  },
  {
    slug: 'local-cuisine',
    title: {
      ua: 'Локальна кухня: смаки Полісся',
      en: 'Local Cuisine: Flavors of Polissia',
    },
    excerpt: {
      ua: 'Традиційні страви та інгредієнти, які роблять нашу кухню унікальною',
      en: 'Traditional dishes and ingredients that make our cuisine unique',
    },
    category: 'cuisine',
    date: '2026-02-10',
    readTime: '7 хв',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
  },
  {
    slug: 'wellness-routine',
    title: {
      ua: 'Велнес-рутина на вихідних',
      en: 'Wellness Routine for Weekend',
    },
    excerpt: {
      ua: 'Як провести вихідні з користю для тіла та душі в нашому СПА-центрі',
      en: 'How to spend a weekend benefiting body and soul in our SPA center',
    },
    category: 'wellness',
    date: '2026-02-05',
    readTime: '6 хв',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
  },
  {
    slug: 'outdoor-activities',
    title: {
      ua: 'Активний відпочинок на природі',
      en: 'Outdoor Activities in Nature',
    },
    excerpt: {
      ua: 'Піші прогулянки, велоспорт та інші активності для любителів природи',
      en: 'Hiking, cycling and other activities for nature lovers',
    },
    category: 'nature',
    date: '2026-01-28',
    readTime: '8 хв',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
  },
  {
    slug: 'event-planning',
    title: {
      ua: 'Як організувати ідеальну подію',
      en: 'How to Plan the Perfect Event',
    },
    excerpt: {
      ua: 'Поради щодо організації весіль та корпоративних заходів на природі',
      en: 'Tips for organizing weddings and corporate events in nature',
    },
    category: 'events',
    date: '2026-01-20',
    readTime: '10 хв',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  },
  {
    slug: 'seasonal-offers',
    title: {
      ua: 'Сезонні пропозиції та знижки',
      en: 'Seasonal Offers and Discounts',
    },
    excerpt: {
      ua: 'Огляд найкращих сезонних пропозицій для економного відпочинку',
      en: 'Overview of the best seasonal offers for budget-friendly vacation',
    },
    category: 'events',
    date: '2026-01-15',
    readTime: '4 хв',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  },
];

const categories = [
  { key: 'all', ua: 'Всі', en: 'All' },
  { key: 'nature', ua: 'Природа', en: 'Nature' },
  { key: 'wellness', ua: 'Велнес', en: 'Wellness' },
  { key: 'cuisine', ua: 'Кухня', en: 'Cuisine' },
  { key: 'events', ua: 'Події', en: 'Events' },
];

export default function BlogPage() {
  const { locale } = useLanguage();
  const t = useTranslations();
  const isUA = locale === 'ua';

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/60" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium text-white mb-6">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-surface">
        <div className="container-wide mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`px-6 py-3 rounded-sm text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.key
                    ? 'bg-primary-700 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {isUA ? category.ua : category.en}
              </button>
            ))}
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-4">
                    <Image
                      src={post.image}
                      alt={isUA ? post.title.ua : post.title.en}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-neutral-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString(isUA ? 'uk-UA' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-medium text-xl text-neutral-900 mb-3 group-hover:text-primary-700 transition-colors">
                    {isUA ? post.title.ua : post.title.en}
                  </h3>

                  <p className="text-neutral-600 mb-4 line-clamp-2">
                    {isUA ? post.excerpt.ua : post.excerpt.en}
                  </p>

                  <div className="flex items-center text-primary-600 group-hover:text-primary-700 transition-colors">
                    <span className="font-medium">{t('blog.readArticle')}</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-neutral-500 text-lg">
                {isUA ? 'Немає статей у цій категорії' : 'No articles in this category'}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
