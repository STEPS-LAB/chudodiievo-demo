'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useTranslations } from '@/lib/i18n/useTranslations';

const faqs = [
  {
    question: {
      ua: 'Як забронювати номер?',
      en: 'How do I book a room?',
    },
    answer: {
      ua: 'Ви можете забронювати номер онлайн на нашому сайті, зателефонувавши нам або написавши на електронну пошту. Ми рекомендуємо бронювати заздалегідь, особливо у вихідні та святкові дні.',
      en: 'You can book a room online on our website, by calling us or sending an email. We recommend booking in advance, especially on weekends and holidays.',
    },
  },
  {
    question: {
      ua: 'У скільки заїзд та виїзд?',
      en: 'What are check-in and check-out times?',
    },
    answer: {
      ua: 'Час заїзду з 14:00, виїзду до 12:00. За домовленістю можливий ранній заїзд або пізній виїзд.',
      en: 'Check-in is from 14:00, check-out until 12:00. Early check-in or late check-out is possible upon arrangement.',
    },
  },
  {
    question: {
      ua: 'Чи можна з тваринами?',
      en: 'Are pets allowed?',
    },
    answer: {
      ua: 'Так, ми дозволяємо розміщення з невеликими домашніми тваринами. Будь ласка, повідомте нас заздалегідь. Може стягуватися додаткова плата.',
      en: 'Yes, we allow small pets. Please inform us in advance. Additional fees may apply.',
    },
  },
  {
    question: {
      ua: 'Як дістатися до курорту?',
      en: 'How do I get to the resort?',
    },
    answer: {
      ua: 'Ми знаходимося в Київській області, с. Чудодієво. До нас можна доїхати автомобілем або замовити трансфер. Детальні інструкції надішлемо після бронювання.',
      en: 'We are located in Kyiv region, v. Chudodievo. You can drive or order a transfer. Detailed instructions will be sent after booking.',
    },
  },
  {
    question: {
      ua: 'Які послуги включені в ціну?',
      en: 'What services are included in the price?',
    },
    answer: {
      ua: 'У вартість проживання входить сніданок, користування інфраструктурою (басейн, сауна), WiFi та парковка. Деякі послуги надаються за додаткову плату.',
      en: 'The room rate includes breakfast, use of facilities (pool, sauna), WiFi and parking. Some services are available for an additional fee.',
    },
  },
  {
    question: {
      ua: 'Чи є ресторан на території?',
      en: 'Is there a restaurant on site?',
    },
    answer: {
      ua: 'Так, у нас є ресторан з авторською кухнею з локальних продуктів. Також доступний номерний сервіс.',
      en: 'Yes, we have a restaurant with author\'s cuisine from local products. Room service is also available.',
    },
  },
  {
    question: {
      ua: 'Які розваги доступні на території?',
      en: 'What activities are available on site?',
    },
    answer: {
      ua: 'У нас доступні: СПА-центр, піші прогулянки, велоспорт, риболовля, йога на природі, спостереження за птахами та зорями.',
      en: 'We offer: SPA center, hiking, cycling, fishing, yoga in nature, bird watching and stargazing.',
    },
  },
  {
    question: {
      ua: 'Чи можна організувати захід?',
      en: 'Can I organize an event?',
    },
    answer: {
      ua: 'Так, ми організовуємо весілля, корпоративи та приватні святкування. Зв\'яжіться з нами для обговорення деталей.',
      en: 'Yes, we organize weddings, corporate events and private celebrations. Contact us to discuss details.',
    },
  },
  {
    question: {
      ua: 'Яка політика скасування?',
      en: 'What is the cancellation policy?',
    },
    answer: {
      ua: 'Безкоштовне скасування можливе за 48 годин до заїзду. При скасуванні пізніше стягується вартість першої ночі.',
      en: 'Free cancellation is possible 48 hours before check-in. Late cancellation incurs the cost of the first night.',
    },
  },
  {
    question: {
      ua: 'Чи є дитячий майданчик?',
      en: 'Is there a playground for children?',
    },
    answer: {
      ua: 'Так, у нас є дитячий майданчик та можливість організації дитячого дозвілля. Також доступні сімейні номери.',
      en: 'Yes, we have a playground and can organize children\'s activities. Family rooms are also available.',
    },
  },
];

export default function FAQPage() {
  const { locale } = useLanguage();
  const t = useTranslations();
  const isUA = locale === 'ua';

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558244405-67104c4e2684?w=1920&q=80)',
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
              {t('faq.title')}
            </h1>
            <p className="text-xl text-neutral-200 max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section-padding bg-surface">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border border-neutral-200 rounded-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-neutral-50 transition-colors"
                    type="button"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-medium text-neutral-900 pr-8">
                      {isUA ? faq.question.ua : faq.question.en}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-500 transition-transform duration-300 flex-shrink-0 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={false}
                    animate={{
                      height: openIndex === index ? 'auto' : 0,
                      opacity: openIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 bg-white text-neutral-700 leading-relaxed">
                      {isUA ? faq.answer.ua : faq.answer.en}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <h2 className="font-display font-medium text-2xl text-neutral-900 mb-4">
                {t('faq.contact')}
              </h2>
              <p className="text-neutral-600 mb-8">
                {isUA
                  ? 'Ми завжди готові відповісти на ваші запитання'
                  : 'We are always ready to answer your questions'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a
                  href="tel:+380123456789"
                  className="flex items-center space-x-3 text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+38 (012) 345-67-89</span>
                </a>
                <a
                  href="mailto:info@chudodievo.com"
                  className="flex items-center space-x-3 text-neutral-700 hover:text-primary-600 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>info@chudodievo.com</span>
                </a>
              </div>

              <div className="mt-8">
                <Link href="/contacts" className="luxury-button">
                  {t('common.contactUs')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
