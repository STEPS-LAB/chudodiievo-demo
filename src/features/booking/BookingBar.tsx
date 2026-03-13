'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { Calendar, Users, Minus, Plus } from 'lucide-react';

interface BookingBarProps {
  onSearch?: (data: BookingData) => void;
}

interface BookingData {
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
}

export default function BookingBar({ onSearch }: BookingBarProps) {
  const { locale } = useLanguage();
  const isUA = locale === 'ua';

  const [checkIn, setCheckIn] = useState<Date>(() => {
    const today = new Date();
    today.setHours(14, 0, 0, 0);
    return today;
  });

  const [checkOut, setCheckOut] = useState<Date>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 3);
    tomorrow.setHours(12, 0, 0, 0);
    return tomorrow;
  });

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showGuestsPopup, setShowGuestsPopup] = useState(false);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ checkIn, checkOut, adults, children });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const totalGuests = adults + children;

  return (
    <div className="w-full">
      <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-3">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Dates Block */}
          <div className="flex-1 relative">
            <div className="flex items-center h-[64px] border border-neutral-200 rounded-lg bg-white px-5 hover:border-primary-300 transition-colors">
              <Calendar className="w-5 h-5 text-neutral-500 mr-3 flex-shrink-0" />
              <span className="text-base text-neutral-600 mr-4 whitespace-nowrap">
                {isUA ? 'Дати:' : 'Dates:'}
              </span>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <span className="text-base text-neutral-900">
                  {formatDate(checkIn)}
                </span>
                <span className="text-neutral-300">—</span>
                <span className="text-base text-neutral-900">
                  {formatDate(checkOut)}
                </span>
              </div>
              {/* Hidden date inputs for interaction */}
              <input
                type="date"
                value={checkIn.toISOString().split('T')[0]}
                onChange={(e) => {
                  if (e.target.value) {
                    const newDate = new Date(e.target.value);
                    newDate.setHours(14, 0, 0, 0);
                    setCheckIn(newDate);
                    if (newDate >= checkOut) {
                      const newCheckOut = new Date(newDate);
                      newCheckOut.setDate(newCheckOut.getDate() + 1);
                      setCheckOut(newCheckOut);
                    }
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Guests Block */}
          <div className="flex-1 relative">
            <div
              className="flex items-center h-[64px] border border-neutral-200 rounded-lg bg-white px-5 hover:border-primary-300 transition-colors cursor-pointer"
              onClick={() => setShowGuestsPopup(!showGuestsPopup)}
            >
              <Users className="w-5 h-5 text-neutral-500 mr-3 flex-shrink-0" />
              <span className="text-base text-neutral-600 mr-4 whitespace-nowrap">
                {isUA ? 'Гості:' : 'Guests:'}
              </span>
              <div className="flex items-center gap-4 flex-1 justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAdults(Math.max(1, adults - 1));
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-100 transition-colors"
                >
                  <Minus className="w-4 h-4 text-neutral-600" />
                </button>
                <span className="text-lg text-neutral-900 w-6 text-center">{totalGuests}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAdults(Math.min(10, adults + 1));
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-neutral-100 transition-colors"
                >
                  <Plus className="w-4 h-4 text-neutral-600" />
                </button>
              </div>
            </div>

            {/* Guests Popup */}
            {showGuestsPopup && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowGuestsPopup(false)}
                />
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[300px] bg-white rounded-lg shadow-xl border border-neutral-200 p-5 z-50">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{isUA ? 'Дорослі' : 'Adults'}</p>
                        <p className="text-xs text-neutral-500">{isUA ? 'від 18 років' : '18+ years'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded border border-neutral-200 hover:bg-neutral-100 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-neutral-600" />
                        </button>
                        <span className="text-sm text-neutral-900 w-6 text-center">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(Math.min(10, adults + 1))}
                          className="w-8 h-8 flex items-center justify-center rounded border border-neutral-200 hover:bg-neutral-100 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-neutral-600" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{isUA ? 'Діти' : 'Children'}</p>
                        <p className="text-xs text-neutral-500">{isUA ? 'до 18 років' : 'Under 18'}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-8 h-8 flex items-center justify-center rounded border border-neutral-200 hover:bg-neutral-100 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-neutral-600" />
                        </button>
                        <span className="text-sm text-neutral-900 w-6 text-center">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(Math.min(6, children + 1))}
                          className="w-8 h-8 flex items-center justify-center rounded border border-neutral-200 hover:bg-neutral-100 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-neutral-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowGuestsPopup(false)}
                    className="w-full mt-4 py-2.5 bg-[#B59456] text-white text-sm font-medium uppercase tracking-wider rounded-lg hover:bg-[#9D7942] transition-colors"
                  >
                    {isUA ? 'Застосувати' : 'Apply'}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="h-[64px] px-8 bg-[#B59456] hover:bg-[#9D7942] text-white text-sm font-medium uppercase tracking-widest rounded-lg transition-all duration-300 shadow-sm hover:shadow-md whitespace-nowrap"
          >
            {isUA ? 'Знайти' : 'Find'}
          </button>
        </div>
      </div>
    </div>
  );
}
