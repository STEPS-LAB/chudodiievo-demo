'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/hooks';

export default function NewsletterSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section className="section-padding bg-primary-700">
      <div className="container-wide mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white mb-4">
            Підпишіться на новини
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Отримуйте ексклюзивні пропозиції та новини
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-6 py-4 bg-white rounded-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              {status === 'success' && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="px-8 py-4 bg-neutral-900 text-white font-medium rounded-sm hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : status === 'success' ? (
                'Дякую!'
              ) : (
                'Підписатися'
              )}
            </button>
          </form>

          {status === 'error' && (
            <p className="mt-4 text-sm text-red-300">Сталася помилка</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
