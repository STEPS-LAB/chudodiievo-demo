'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Minus, Plus } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [checkIn, setCheckIn] = useState<Date>(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });
  const [checkOut, setCheckOut] = useState<Date>(() => {
    const today = new Date();
    const checkout = new Date(today);
    checkout.setDate(checkout.getDate() + 4);
    return checkout;
  });
  const [guests, setGuests] = useState(1);
  const checkInInputRef = useRef<HTMLInputElement>(null);
  const checkOutInputRef = useRef<HTMLInputElement>(null);

  // Block scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minCheckOut = new Date(checkIn);
  minCheckOut.setDate(minCheckOut.getDate() + 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-[95%] max-w-[400px] rounded-sm bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              onClick={(e) => e.stopPropagation()}
            >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
              <h2 id="modal-title" className="text-2xl font-display font-medium text-neutral-900">
                Бронювання
              </h2>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-50 hover:bg-neutral-100 transition-colors"
                aria-label="Закрити"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-5">
              {/* Check-in */}
              <div className="relative">
                <label className="block text-sm text-neutral-600 mb-2">
                  Дата заїзду
                </label>
                <div className="relative w-full">
                  <input
                    ref={checkInInputRef}
                    type="date"
                    min={tomorrow.toISOString().split('T')[0]}
                    value={checkIn.toISOString().split('T')[0]}
                    onChange={(e) => {
                      const newDate = new Date(e.target.value);
                      setCheckIn(newDate);
                      if (checkOut <= newDate) {
                        const newCheckout = new Date(newDate);
                        newCheckout.setDate(newCheckout.getDate() + 3);
                        setCheckOut(newCheckout);
                      }
                    }}
                    className="luxury-input bg-white h-[52px] w-full"
                    style={{ colorScheme: 'light' }}
                  />
                  <div 
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => checkInInputRef.current?.showPicker()}
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="relative">
                <label className="block text-sm text-neutral-600 mb-2">
                  Дата виїзду
                </label>
                <div className="relative w-full">
                  <input
                    ref={checkOutInputRef}
                    type="date"
                    min={minCheckOut.toISOString().split('T')[0]}
                    value={checkOut.toISOString().split('T')[0]}
                    onChange={(e) => setCheckOut(new Date(e.target.value))}
                    className="luxury-input bg-white h-[52px] w-full"
                    style={{ colorScheme: 'light' }}
                  />
                  <div 
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => checkOutInputRef.current?.showPicker()}
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                  <Users className="w-4 h-4" />
                  Гості
                </label>
                <div className="flex items-center justify-between px-6 py-4 border border-neutral-200 rounded-sm h-[52px]">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={guests <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-sm hover:bg-neutral-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Зменшити кількість гостей"
                  >
                    <Minus className="w-4 h-4 text-neutral-700 disabled:text-neutral-400" />
                  </button>
                  <span className="text-lg font-medium text-neutral-900">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    disabled={guests >= 10}
                    className="flex h-8 w-8 items-center justify-center rounded-sm hover:bg-neutral-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Збільшити кількість гостей"
                  >
                    <Plus className="w-4 h-4 text-neutral-700 disabled:text-neutral-400" />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={() => {
                  onClose();
                }}
                className="w-full h-[52px] bg-[var(--color-primary)] hover:bg-primary-900 text-white text-sm font-medium uppercase tracking-[0.1em] rounded-sm transition-colors duration-300"
              >
                Підібрати номер
              </button>
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
