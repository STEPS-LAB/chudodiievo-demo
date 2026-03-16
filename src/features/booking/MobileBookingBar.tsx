'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import BookingModal from '@/components/booking/BookingModal';

export default function MobileBookingBar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > window.innerHeight - 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hide only on contacts page
  const isHiddenPage = pathname === '/contacts';
  if (isHiddenPage) return null;

  // Pages with hero section - show bar only after scrolling past hero
  const hasHeroPage = pathname === '/' || pathname === '/restaurant' || pathname === '/activities';
  const shouldBeVisible = !hasHeroPage || isScrolled;

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ 
          y: shouldBeVisible ? 0 : 20, 
          opacity: shouldBeVisible ? 1 : 0,
          pointerEvents: shouldBeVisible ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white px-4 py-2 border-t border-neutral-200 md:hidden"
      >
        <button
          onClick={() => setBookingModalOpen(true)}
          className="flex h-10 w-full items-center justify-center rounded-sm bg-primary px-6 text-xs font-medium uppercase tracking-[0.14em] text-white shadow-lg transition-all duration-300 hover:bg-primary-900 cursor-pointer"
        >
          ЗАБРОНЮВАТИ
        </button>
      </motion.div>

      {/* Booking Modal */}
      <BookingModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </>
  );
}
