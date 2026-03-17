'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from '@/lib/i18n/useTranslations';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Check, ChevronRight, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import Image from 'next/image';

type BookingStep = 'dates' | 'guests' | 'room' | 'summary';

interface BookingData {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  selectedRoom: string | null;
}

const recommendedStays = [
  { id: 'tomorrow', icon: '🌅' },
  { id: 'weekend', icon: '🏕️' },
  { id: 'morning', icon: '🧘' },
];

export default function BookingForm() {
  const t = useTranslations('booking');
  const [currentStep, setCurrentStep] = useState<BookingStep>('dates');
  const [isSearching, setIsSearching] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: null,
    checkOut: null,
    adults: 2,
    children: 0,
    selectedRoom: null,
  });

  const steps: { key: BookingStep; icon: React.ReactNode }[] = [
    { key: 'dates', icon: <Calendar className="w-4 h-4" /> },
    { key: 'guests', icon: <Users className="w-4 h-4" /> },
    { key: 'room', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'summary', icon: <Check className="w-4 h-4" /> },
  ];

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => {
      const stepOrder: BookingStep[] = ['dates', 'guests', 'room', 'summary'];
      const currentIndex = stepOrder.indexOf(prev);
      return stepOrder[Math.min(currentIndex + 1, stepOrder.length - 1)];
    });
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => {
      const stepOrder: BookingStep[] = ['dates', 'guests', 'room', 'summary'];
      const currentIndex = stepOrder.indexOf(prev);
      return stepOrder[Math.max(currentIndex - 1, 0)];
    });
  }, []);

  const handleSearch = useCallback(() => {
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
      handleNext();
    }, 2000);
  }, [handleNext]);

  const getStepTitle = (step: BookingStep) => {
    switch (step) {
      case 'dates':
        return t('selectDates');
      case 'guests':
        return t('selectGuests');
      case 'room':
        return t('roomSuggestion');
      case 'summary':
        return t('summary');
      default:
        return '';
    }
  };

  return (
    <section className="bg-surface rounded-sm shadow-medium overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-100">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                  steps.findIndex((s) => s.key === currentStep) >= index
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-200 text-neutral-400'
                }`}
              >
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-24 h-px mx-2 transition-colors duration-300 ${
                    steps.findIndex((s) => s.key === currentStep) > index
                      ? 'bg-primary-600'
                      : 'bg-neutral-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {/* Step Title */}
          <motion.div
            key={`title-${currentStep}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-6"
          >
            <h3 className="text-xl font-display font-medium text-neutral-900">
              {getStepTitle(currentStep)}
            </h3>
          </motion.div>

          {/* Dates Step */}
          {currentStep === 'dates' && (
            <DatesStep
              bookingData={bookingData}
              setBookingData={setBookingData}
              onNext={handleNext}
            />
          )}

          {/* Guests Step */}
          {currentStep === 'guests' && (
            <GuestsStep
              bookingData={bookingData}
              setBookingData={setBookingData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {/* Room Step */}
          {currentStep === 'room' && (
            <RoomStep
              bookingData={bookingData}
              setBookingData={setBookingData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {/* Summary Step */}
          {currentStep === 'summary' && (
            <SummaryStep
              bookingData={bookingData}
              onBack={handleBack}
            />
          )}
        </AnimatePresence>

        {/* Recommended Stays */}
        {currentStep === 'dates' && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 pt-6 border-t border-neutral-100"
          >
            <p className="text-sm text-neutral-500 mb-4">{t('recommendedStays.title')}</p>
            <div className="flex flex-wrap gap-3">
              {recommendedStays.map((stay) => (
                <button
                  key={stay.id}
                  onClick={() => {
                    // Set recommended dates
                    const today = new Date();
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const dayAfter = new Date(tomorrow);
                    dayAfter.setDate(dayAfter.getDate() + 1);
                    
                    setBookingData((prev) => ({
                      ...prev,
                      checkIn: tomorrow,
                      checkOut: dayAfter,
                    }));
                  }}
                  className="px-4 py-2 bg-neutral-50 hover:bg-primary-50 rounded-sm text-sm text-neutral-600 hover:text-primary-700 transition-colors flex items-center space-x-2"
                >
                  <span>{stay.icon}</span>
                  <span>{t(`recommendedStays.${stay.id}`)}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Searching Overlay */}
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-surface/95 backdrop-blur-sm z-10 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"
              />
              <p className="text-neutral-700 font-medium">{t('searching')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Dates Step Component
function DatesStep({
  bookingData,
  setBookingData,
  onNext,
}: {
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
  onNext: () => void;
}) {
  const t = useTranslations('booking');

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-600 mb-2">
            {t('checkIn')}
          </label>
          <input
            type="date"
            min={today.toISOString().split('T')[0]}
            value={bookingData.checkIn?.toISOString().split('T')[0] || ''}
            onChange={(e) =>
              setBookingData({
                ...bookingData,
                checkIn: e.target.value ? new Date(e.target.value) : null,
              })
            }
            className="luxury-input"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-600 mb-2">
            {t('checkOut')}
          </label>
          <input
            type="date"
            min={tomorrow.toISOString().split('T')[0]}
            value={bookingData.checkOut?.toISOString().split('T')[0] || ''}
            onChange={(e) =>
              setBookingData({
                ...bookingData,
                checkOut: e.target.value ? new Date(e.target.value) : null,
              })
            }
            className="luxury-input"
          />
        </div>
      </div>
      <button
        onClick={onNext}
        disabled={!bookingData.checkIn || !bookingData.checkOut}
        className="luxury-button w-full justify-center mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('search')}
        <ChevronRight className="w-4 h-4 ml-2" />
      </button>
    </motion.div>
  );
}

// Guests Step Component
function GuestsStep({
  bookingData,
  setBookingData,
  onNext,
  onBack,
}: {
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const t = useTranslations('booking');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm text-neutral-600 mb-2">
          {t('adults')}
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() =>
              setBookingData({
                ...bookingData,
                adults: Math.max(1, bookingData.adults - 1),
              })
            }
            className="w-10 h-10 rounded-sm border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            -
          </button>
          <span className="text-lg font-medium w-8 text-center">
            {bookingData.adults}
          </span>
          <button
            onClick={() =>
              setBookingData({
                ...bookingData,
                adults: Math.min(10, bookingData.adults + 1),
              })
            }
            className="w-10 h-10 rounded-sm border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm text-neutral-600 mb-2">
          {t('children')}
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() =>
              setBookingData({
                ...bookingData,
                children: Math.max(0, bookingData.children - 1),
              })
            }
            className="w-10 h-10 rounded-sm border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            -
          </button>
          <span className="text-lg font-medium w-8 text-center">
            {bookingData.children}
          </span>
          <button
            onClick={() =>
              setBookingData({
                ...bookingData,
                children: Math.min(6, bookingData.children + 1),
              })
            }
            className="w-10 h-10 rounded-sm border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex space-x-4 pt-4">
        <button onClick={onBack} className="luxury-button-secondary flex-1">
          Назад
        </button>
        <button onClick={onNext} className="luxury-button flex-1">
          {t('search')}
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </motion.div>
  );
}

// Room Step Component
function RoomStep({
  bookingData,
  setBookingData,
  onNext,
  onBack,
}: {
  bookingData: BookingData;
  setBookingData: (data: BookingData) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const t = useTranslations('rooms');
  
  const suggestedRooms = [
    { id: 'lake-house', name: 'Озерний Будинок', price: 8500, image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&q=80' },
    { id: 'forest-cottage', name: 'Лісовий Котедж', price: 7200, image: 'https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?w=400&q=80' },
    { id: 'premium-suite', name: 'Преміум Люкс', price: 15000, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="grid gap-4">
        {suggestedRooms.map((room) => (
          <button
            key={room.id}
            onClick={() =>
              setBookingData({ ...bookingData, selectedRoom: room.id })
            }
            className={`flex items-center space-x-4 p-4 rounded-sm border transition-all duration-200 text-left ${
              bookingData.selectedRoom === room.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-neutral-200 hover:border-primary-300'
            }`}
            type="button"
          >
            <Image
              src={room.image}
              alt={room.name}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-sm flex-shrink-0"
            />
            <div className="flex-1">
              <h4 className="font-medium text-neutral-900">{room.name}</h4>
              <p className="text-sm text-neutral-500">
                {t('from')} {room.price.toLocaleString()} ₴ / {t('perNight')}
              </p>
            </div>
            {bookingData.selectedRoom === room.id && (
              <Check className="w-5 h-5 text-primary-600" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>

      <div className="flex space-x-4 pt-4">
        <button onClick={onBack} className="luxury-button-secondary flex-1">
          Назад
        </button>
        <button
          onClick={onNext}
          disabled={!bookingData.selectedRoom}
          className="luxury-button flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('checkAvailability')}
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </motion.div>
  );
}

// Summary Step Component
function SummaryStep({
  bookingData,
  onBack,
}: {
  bookingData: BookingData;
  onBack: () => void;
}) {
  const t = useTranslations('booking');

  const nights = bookingData.checkIn && bookingData.checkOut
    ? Math.ceil((bookingData.checkOut.getTime() - bookingData.checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="bg-neutral-50 rounded-sm p-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-neutral-600">{t('checkIn')}</span>
          <span className="font-medium">
            {bookingData.checkIn ? format(bookingData.checkIn, 'dd MMMM yyyy', { locale: uk }) : '-'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600">{t('checkOut')}</span>
          <span className="font-medium">
            {bookingData.checkOut ? format(bookingData.checkOut, 'dd MMMM yyyy', { locale: uk }) : '-'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600">{t('guests')}</span>
          <span className="font-medium">
            {bookingData.adults} {t('adults')}
            {bookingData.children > 0 && `, ${bookingData.children} ${t('children')}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600">{t('roomSuggestion')}</span>
          <span className="font-medium">
            {bookingData.selectedRoom ? 
              bookingData.selectedRoom === 'lake-house' ? 'Озерний Будинок' :
              bookingData.selectedRoom === 'forest-cottage' ? 'Лісовий Котедж' :
              bookingData.selectedRoom === 'premium-suite' ? 'Преміум Люкс' : '-'
              : '-'}
          </span>
        </div>
        {nights > 0 && (
          <div className="pt-4 border-t border-neutral-200">
            <div className="flex justify-between text-lg">
              <span className="font-medium">{t('summary')}</span>
              <span className="font-medium text-primary-700">
                {nights} {nights === 1 ? 'ніч' : nights < 5 ? 'ночі' : 'ночей'}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button onClick={onBack} className="luxury-button-secondary flex-1">
          Назад
        </button>
        <button className="luxury-button flex-1">
          {t('reserve')}
        </button>
      </div>
    </motion.div>
  );
}
