'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { useScrollPosition } from '@/lib/hooks';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const demoResponses: Record<string, { ua: string; en: string }> = {
  restaurant: {
    ua: 'Наш шеф-кухар рекомендує спробувати качку з яблуками, карпаччо з локальної риби та фірмовий десерт «Лісова ягода». Всі інгредієнти ми отримуємо від місцевих фермерів.',
    en: 'Our chef recommends trying the duck with apples, carpaccio from local fish, and the signature dessert "Forest Berry". We source all ingredients from local farmers.',
  },
  spa: {
    ua: 'Для максимального релаксу я рекомендую нашу комплексну програму «Поліський велнес», яка включає масаж, сауну та ароматерапію. Тривалість — 2.5 години.',
    en: 'For maximum relaxation, I recommend our "Polissia Wellness" program, which includes massage, sauna, and aromatherapy. Duration — 2.5 hours.',
  },
  rooms: {
    ua: 'Для романтичного відпочинку ідеально підійде «Озерний Будинок» з панорамними вікнами та видом на воду. Для сімей — «Лісовий Котедж» з двома спальнями.',
    en: 'For a romantic getaway, the "Lake House" with panoramic windows and water views is perfect. For families — "Forest Cottage" with two bedrooms.',
  },
  activities: {
    ua: 'У нас доступні піші прогулянки еко-стежками, йога на природі, риболовля на озері, каякинг, спостереження за птахами та вечірні спостереження за зорями.',
    en: 'We offer hiking on eco-trails, yoga in nature, fishing on the lake, kayaking, bird watching, and evening stargazing.',
  },
  default: {
    ua: 'Дякую за запитання! Я з радістю допоможу вам з будь-якою інформацією про наш курорт. Що б ви хотіли дізнатися?',
    en: 'Thank you for your question! I\'d be happy to help you with any information about our resort. What would you like to know?',
  },
};

export default function AIConcierge() {
  const { locale } = useLanguage();
  const { isScrolled } = useScrollPosition(300);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: locale === 'ua' ? demoResponses.default.ua : demoResponses.default.en,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update welcome message when locale changes
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: locale === 'ua' 
          ? 'Вітаю! Я ваш AI-консьєрж. Запитайте мене про будь-що щодо вашого перебування.' 
          : 'Hello! I\'m your AI concierge. Ask me anything about your stay.',
        timestamp: new Date(),
      }]);
    }
  }, [locale]);

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const lang = locale as 'ua' | 'en';

    if (lowerMessage.includes('restaurant') || lowerMessage.includes('ресторан') || lowerMessage.includes('страви') || lowerMessage.includes('dish') || lowerMessage.includes('їжа') || lowerMessage.includes('food')) {
      return demoResponses.restaurant[lang];
    }
    if (lowerMessage.includes('spa') || lowerMessage.includes('масаж') || lowerMessage.includes('massage') || lowerMessage.includes('релакс') || lowerMessage.includes('relax')) {
      return demoResponses.spa[lang];
    }
    if (lowerMessage.includes('room') || lowerMessage.includes('номер') || lowerMessage.includes('котедж') || lowerMessage.includes('cottage')) {
      return demoResponses.rooms[lang];
    }
    if (lowerMessage.includes('activity') || lowerMessage.includes('activity') || lowerMessage.includes('розваги') || lowerMessage.includes('entertainment') || lowerMessage.includes('що робити') || lowerMessage.includes('what to do')) {
      return demoResponses.activities[lang];
    }
    return demoResponses.default[lang];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestions = locale === 'ua' 
    ? [
        'Які страви ви рекомендуєте?',
        'Найкраща програма релаксації?',
        'Який номер найкращий для пари?',
        'Що можна робити на території?',
      ]
    : [
        'What dishes do you recommend?',
        'Best relaxation program?',
        'Which room is best for a couple?',
        'What activities are available?',
      ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: isScrolled ? 0 : 20, opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-neutral-900 text-neutral-200 rounded-sm shadow-large px-5 py-3.5 hover:bg-neutral-800 transition-colors ${
          isScrolled ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-label="Open AI Concierge"
      >
        <MessageSquare className="w-4 h-4 text-secondary-500" />
        <span className="text-xs font-medium tracking-[0.2em] uppercase hidden sm:block">
          {locale === 'ua' ? 'ЗАПИТАЙТЕ ЩО ЗАВГОДНО ПРО ЧУДОДІЄВО' : 'ASK ANYTHING ABOUT CHUDODIEVO'}
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-neutral-900/50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 right-6 w-full max-w-md bg-surface rounded-sm shadow-large z-50 overflow-hidden flex flex-col"
              style={{ maxHeight: 'calc(100vh - 180px)' }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">AI Concierge</h3>
                    <p className="text-xs text-white/80">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-sm ${
                        message.role === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-900'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-neutral-100 px-4 py-3 rounded-sm">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-100" />
                        <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions */}
              {messages.length <= 2 && (
                <div className="px-6 py-3 border-t border-neutral-100">
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(suggestion)}
                        className="px-3 py-1.5 bg-neutral-50 hover:bg-primary-50 text-neutral-600 hover:text-primary-700 text-xs rounded-sm transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="p-4 border-t border-neutral-100"
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={locale === 'ua' ? 'Запитайте щось...' : 'Ask something...'}
                    disabled={status === 'loading' || status === 'success'}
                    className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-sm text-sm focus:outline-none focus:border-primary-400 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="w-10 h-10 bg-primary-600 text-white rounded-sm flex items-center justify-center hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
