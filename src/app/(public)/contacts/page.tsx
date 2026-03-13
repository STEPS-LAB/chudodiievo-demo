'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function ContactsPage() {
  const { locale } = useLanguage();
  const t = useTranslations();
  const isUA = locale === 'ua';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80)',
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
              {t('contacts.title')}
            </h1>
            <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
              {t('contacts.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-medium text-3xl text-neutral-900 mb-8">
                {t('contacts.title')}
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-1">{t('contacts.address')}</h3>
                    <p className="text-neutral-600">
                      {isUA ? 'Київська область, с. Чудодієво' : 'Kyiv region, v. Chudodievo'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-1">{t('contacts.phone')}</h3>
                    <a href="tel:+380123456789" className="text-neutral-600 hover:text-primary-600 transition-colors">
                      +38 (012) 345-67-89
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-1">{t('contacts.email')}</h3>
                    <a href="mailto:info@chudodievo.com" className="text-neutral-600 hover:text-primary-600 transition-colors">
                      info@chudodievo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-sm flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-1">{t('contacts.hours')}</h3>
                    <p className="text-neutral-600">
                      {isUA ? 'Щодня: 09:00 — 21:00' : 'Daily: 09:00 — 21:00'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Image Placeholder */}
              <div className="relative aspect-video rounded-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                  alt={isUA ? 'Мапа' : 'Map'}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display font-medium text-3xl text-neutral-900 mb-8">
                {isUA ? 'Напишіть нам' : 'Write to Us'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    {isUA ? "Ваше ім'я" : 'Your Name'} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="luxury-input"
                    placeholder={isUA ? 'Іван Петренко' : 'John Doe'}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="luxury-input"
                    placeholder="example@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    {isUA ? 'Телефон' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="luxury-input"
                    placeholder="+38 (___) ___-__-__"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    {isUA ? 'Повідомлення' : 'Message'} *
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="luxury-input min-h-[150px] resize-y"
                    placeholder={isUA ? 'Ваше повідомлення...' : 'Your message...'}
                    required
                  />
                </div>

                <button type="submit" className="luxury-button w-full">
                  {isUA ? 'Відправити' : 'Send Message'}
                </button>
              </form>

              {/* Quick Contact */}
              <div className="mt-8 p-6 bg-neutral-50 rounded-sm">
                <div className="flex items-start space-x-4">
                  <MessageCircle className="w-6 h-6 text-primary-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-2">
                      {isUA ? 'Швидкий зв\'язок' : 'Quick Contact'}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-3">
                      {isUA
                        ? 'Відповідаємо протягом 15 хвилин у робочий час'
                        : 'We respond within 15 minutes during business hours'}
                    </p>
                    <a
                      href="https://wa.me/380123456789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {isUA ? 'Написати у WhatsApp' : 'Chat on WhatsApp'}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
