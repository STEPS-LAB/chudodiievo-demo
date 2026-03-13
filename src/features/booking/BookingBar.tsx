'use client';

import { useState, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { CalendarDays, Minus, Plus, Users } from 'lucide-react';
import { format } from 'date-fns';

interface BookingBarProps {
  onSearch?: (data: BookingData) => void;
}

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function BookingBar({ onSearch }: BookingBarProps) {
  const { locale } = useLanguage();
  const isUA = locale === 'ua';

  const today = new Date().toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState<string>(today);
  const [checkOut, setCheckOut] = useState<string>(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(2);
  const [showCalendar, setShowCalendar] = useState(false);

  const dateDropdownRef = useRef<HTMLButtonElement>(null);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (onSearch) {
      onSearch({ checkIn, checkOut, guests });
    }
  };

  const datesDisplayFull = isUA
    ? `${format(new Date(checkIn), 'dd.MM.yyyy')} — ${format(new Date(checkOut), 'dd.MM.yyyy')}`
    : `${format(new Date(checkIn), 'dd.MM.yyyy')} — ${format(new Date(checkOut), 'dd.MM.yyyy')}`;

  const datesDisplayShort = isUA
    ? `${format(new Date(checkIn), 'dd.MM.yy')} — ${format(new Date(checkOut), 'dd.MM.yy')}`
    : `${format(new Date(checkIn), 'MM/dd/yy')} — ${format(new Date(checkOut), 'MM/dd/yy')}`;

  const copy = {
    searchDates: isUA ? 'Дати' : 'Dates',
    searchGuests: isUA ? 'Гості' : 'Guests',
    calendarLabel: isUA ? 'Оберіть дати' : 'Select dates',
    dateCheckInLabel: isUA ? 'Заїзд' : 'Check-in',
    dateCheckOutLabel: isUA ? 'Виїзд' : 'Check-out',
    searchButton: isUA ? 'ЗНАЙТИ' : 'FIND',
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mx-auto flex w-full max-w-5xl flex-col gap-3 rounded-sm bg-surface p-4 shadow-lg sm:flex-row sm:items-center"
    >
      {/* Dates Input Button */}
      <div className="relative w-full sm:w-[400px]">
        <button
          ref={dateDropdownRef}
          onClick={() => setShowCalendar((value) => !value)}
          className="flex h-14 w-full items-center gap-3 rounded-sm bg-white px-4 text-left text-sm shadow-sm transition hover:bg-neutral-50"
          type="button"
        >
          <CalendarDays className="h-5 w-5 shrink-0 text-neutral-500" />
          <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
            <span className="text-xs text-neutral-500">{copy.searchDates}:</span>
            <span className="truncate font-medium text-neutral-900">
              {datesDisplayFull}
            </span>
          </div>
        </button>

        {/* Calendar Dropdown */}
        {showCalendar && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowCalendar(false)}
            />
            <div className="absolute left-0 top-full z-50 mt-2 rounded-sm bg-white p-4 shadow-xl sm:min-w-[340px]">
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-neutral-500">
                {copy.calendarLabel}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* Check-in Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-neutral-500">{copy.dateCheckInLabel}</label>
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => {
                      const v = e.target.value;
                      setCheckIn(v);
                      if (checkOut && v >= checkOut) {
                        const nextDay = new Date(v);
                        nextDay.setDate(nextDay.getDate() + 1);
                        setCheckOut(nextDay.toISOString().split('T')[0]);
                      }
                    }}
                    className="box-border h-10 w-full min-w-0 rounded border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                </div>

                {/* Check-out Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-neutral-500">{copy.dateCheckOutLabel}</label>
                  <input
                    type="date"
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="box-border h-10 w-full min-w-0 rounded border border-neutral-200 bg-white px-3 py-2 text-base text-neutral-900 outline-none transition focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Guests Selector */}
      <div className="flex h-14 w-full items-center gap-3 rounded-sm bg-white px-4 shadow-sm transition hover:bg-neutral-50 sm:w-[340px]">
        <Users className="h-5 w-5 shrink-0 text-neutral-500" />
        <span className="text-xs text-neutral-500">{copy.searchGuests}:</span>
        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            disabled={guests <= 1}
            className="flex h-8 w-8 items-center justify-center rounded text-neutral-600 transition hover:bg-neutral-100 disabled:opacity-40"
            aria-label={isUA ? "Зменшити кількість гостей" : "Decrease guests"}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[1.5rem] text-center text-sm font-medium text-neutral-900">
            {guests}
          </span>
          <button
            type="button"
            onClick={() => setGuests((g) => Math.min(10, g + 1))}
            disabled={guests >= 10}
            className="flex h-8 w-8 items-center justify-center rounded text-neutral-600 transition hover:bg-neutral-100 disabled:opacity-40"
            aria-label={isUA ? "Збільшити кількість гостей" : "Increase guests"}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="flex h-14 flex-1 items-center justify-center rounded-sm bg-primary px-6 text-sm font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none"
      >
        {copy.searchButton}
      </button>
    </form>
  );
}
