'use client';

import { useState, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { CalendarDays, Minus, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

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
    ? `${format(new Date(checkIn), 'dd MMMM yyyy', { locale: uk })} — ${format(new Date(checkOut), 'dd MMMM yyyy', { locale: uk })}`
    : `${format(new Date(checkIn), 'MMMM dd, yyyy')} — ${format(new Date(checkOut), 'MMMM dd, yyyy')}`;

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
      className="mx-auto flex w-full max-w-5xl flex-col gap-3 rounded-sm bg-white p-3 shadow-lg md:flex-row md:items-center md:gap-4 md:p-4"
    >
      {/* Dates Input Button */}
      <button
        ref={dateDropdownRef}
        onClick={() => setShowCalendar((value) => !value)}
        className="flex h-14 w-full flex-col items-start justify-center rounded-sm border border-black/15 bg-white px-3 text-left text-sm transition-[border-color,background-color] duration-150 hover:border-black/25 hover:bg-black/[0.02] md:w-[280px]"
        type="button"
      >
        <span className="text-xs text-[#666]">{copy.searchDates}</span>
        <span className="font-medium text-[#1A1A1B]">
          {datesDisplayShort}
        </span>
      </button>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowCalendar(false)}
          />
          <div className="absolute left-3 right-3 top-full z-50 mt-2 flex flex-col gap-3 rounded-sm border border-black/15 bg-white p-3 shadow-xl md:left-auto md:right-auto md:w-[280px]">
            <h3 className="text-sm font-medium text-[#1A1A1B]">
              {copy.calendarLabel}
            </h3>

            {/* Check-in Input */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#666]">{copy.dateCheckInLabel}</label>
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
                className="box-border h-10 w-full min-w-0 rounded border border-black/15 bg-white px-3 py-2 text-base text-[#1A1A1B] outline-none transition focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>

            {/* Check-out Input */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#666]">{copy.dateCheckOutLabel}</label>
              <input
                type="date"
                min={checkIn}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="box-border h-10 w-full min-w-0 rounded border border-black/15 bg-white px-3 py-2 text-base text-[#1A1A1B] outline-none transition focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
              />
            </div>
          </div>
        </>
      )}

      {/* Guests Selector */}
      <div className="flex h-14 w-full items-center justify-between rounded-sm border border-black/15 bg-white px-3 md:w-[180px]">
        <div className="flex flex-col">
          <span className="text-xs text-[#666]">{copy.searchGuests}</span>
          <span className="font-medium text-[#1A1A1B]">{guests}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            disabled={guests <= 1}
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded p-1.5 text-[#4A4A4A] transition hover:bg-black/5 disabled:opacity-40"
            aria-label={isUA ? "Зменшити кількість гостей" : "Decrease guests"}
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setGuests((g) => Math.min(10, g + 1))}
            disabled={guests >= 10}
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded p-1.5 text-[#4A4A4A] transition hover:bg-black/5 disabled:opacity-40"
            aria-label={isUA ? "Збільшити кількість гостей" : "Increase guests"}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="flex h-14 items-center justify-center gap-2 rounded-sm bg-[#C5A059] px-6 text-sm font-medium text-white transition-[background-color,opacity] duration-150 hover:bg-[#B8934E] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {copy.searchButton}
      </button>
    </form>
  );
}
