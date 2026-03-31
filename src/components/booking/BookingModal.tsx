'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Minus, Plus, Loader2, Calendar } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const formatDateLocal = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const parseDateInput = (value: string) => {
    return new Date(`${value}T12:00:00`);
  };

  const displayDate = (date: Date) => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}.${m}.${y}`;
  };

  const openDatePicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    const input = ref.current as (HTMLInputElement & { showPicker?: () => void }) | null;
    if (!input) return;
    if (typeof input.showPicker === 'function') {
      input.showPicker();
      return;
    }
    input.focus();
    input.click();
  };

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
  const [searchStatus, setSearchStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const isSearching = searchStatus !== 'idle';
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
      if (e.key === 'Escape' && !isSearching) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose, isSearching]);

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
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center"
            onClick={() => {
              if (!isSearching) onClose();
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
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
                onClick={() => {
                  if (!isSearching) onClose();
                }}
                className="flex h-10 w-10 items-center justify-center rounded-sm bg-neutral-50 hover:bg-neutral-100 transition-colors"
                aria-label="Закрити"
                disabled={isSearching}
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
                <div
                  className="relative w-full cursor-pointer"
                  onClick={() => openDatePicker(checkInInputRef)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openDatePicker(checkInInputRef);
                    }
                  }}
                  aria-label="Оберіть дату заїзду"
                >
                  <div className="luxury-input bg-white h-[52px] w-full flex items-center justify-between px-4 pointer-events-none">
                    <span className="text-neutral-900 text-[1.02rem]">{displayDate(checkIn)}</span>
                    <Calendar className="w-5 h-5 text-neutral-900" />
                  </div>
                  <input
                    ref={checkInInputRef}
                    type="date"
                    min={formatDateLocal(tomorrow)}
                    value={formatDateLocal(checkIn)}
                    onChange={(e) => {
                      const newDate = parseDateInput(e.target.value);
                      setCheckIn(newDate);
                      if (checkOut <= newDate) {
                        const newCheckout = new Date(newDate);
                        newCheckout.setDate(newCheckout.getDate() + 3);
                        setCheckOut(newCheckout);
                      }
                    }}
                    className="absolute inset-0 h-[52px] w-full opacity-0 pointer-events-none"
                    style={{ colorScheme: 'light' }}
                    aria-label="Дата заїзду"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="relative">
                <label className="block text-sm text-neutral-600 mb-2">
                  Дата виїзду
                </label>
                <div
                  className="relative w-full cursor-pointer"
                  onClick={() => openDatePicker(checkOutInputRef)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openDatePicker(checkOutInputRef);
                    }
                  }}
                  aria-label="Оберіть дату виїзду"
                >
                  <div className="luxury-input bg-white h-[52px] w-full flex items-center justify-between px-4 pointer-events-none">
                    <span className="text-neutral-900 text-[1.02rem]">{displayDate(checkOut)}</span>
                    <Calendar className="w-5 h-5 text-neutral-900" />
                  </div>
                  <input
                    ref={checkOutInputRef}
                    type="date"
                    min={formatDateLocal(minCheckOut)}
                    value={formatDateLocal(checkOut)}
                    onChange={(e) => setCheckOut(parseDateInput(e.target.value))}
                    className="absolute inset-0 h-[52px] w-full opacity-0 pointer-events-none"
                    style={{ colorScheme: 'light' }}
                    aria-label="Дата виїзду"
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
                  if (isSearching) return;
                  setSearchStatus('loading');
                  setTimeout(() => {
                    setSearchStatus('success');
                    setTimeout(() => {
                      setSearchStatus('idle');
                      onClose();
                    }, 1100);
                  }, 2600);
                }}
                disabled={isSearching}
                className="w-full h-[52px] bg-[var(--color-primary)] hover:bg-primary-900 text-white text-sm font-medium uppercase tracking-[0.1em] rounded-sm transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                Підібрати номер
              </button>

              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isSearching ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex items-center gap-3 rounded-sm bg-neutral-100/90 p-4 text-sm">
                    {searchStatus === 'loading' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin text-neutral-500" />
                        <span className="text-neutral-700">AI підбирає найкращий номер для вашого відпочинку...</span>
                      </>
                    ) : (
                      <>
                        <div className="h-2 w-2 rounded-full bg-green-600" />
                        <span className="text-neutral-700">Підходящий номер знайдено. Закриваємо вікно...</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
