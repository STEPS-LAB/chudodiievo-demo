'use client';

import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { useState, useEffect } from 'react';
import { useHeader } from '@/components/layout/HeaderContext';

export const dynamic = 'force-dynamic';

export default function ContactsPage() {
  const { locale } = useLanguage();
  const t = useTranslations();
  const { setVariant } = useHeader();
  const isUA = locale === 'ua';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    setVariant('dark');
    return () => setVariant('light');
  }, [setVariant]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <main className="pt-24">
      {/* Contact Info & Form */}
      <section className="section-padding bg-neutral-100">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Contact Information */}
            <div>
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
                      {isUA ? 'Житомирська область, с. Вишпіль, вул. Лісова 47' : 'Zhytomyr region, v. Vyshpil, Lisova st. 47'}
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
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-sm">
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
                    className="luxury-input bg-neutral-50"
                    placeholder={isUA ? 'Імʼя' : 'Name'}
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
                    className="luxury-input bg-neutral-50"
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
                    className="luxury-input bg-neutral-50"
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
                    className="luxury-input min-h-[150px] resize-y bg-neutral-50"
                    placeholder={isUA ? 'Ваше повідомлення...' : 'Your message...'}
                    required
                  />
                </div>

                <button type="submit" className="luxury-button w-full">
                  {isUA ? 'Відправити' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
