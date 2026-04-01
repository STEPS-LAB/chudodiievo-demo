import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Users, Search, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useBookingStore } from '@/store/bookingStore'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

export default function SearchBar({ variant = 'hero', onSearch }) {
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const { checkIn, checkOut, adults, children, setDates, setGuests } = useBookingStore()
  const navigate = useNavigate()

  const [guestMenuOpen, setGuestMenuOpen] = useState(false)

  const handleSearch = () => {
    if (onSearch) onSearch({ checkIn, checkOut, adults, children })
    else navigate('/rooms')
  }

  const totalGuests = adults + children
  const isHero = variant === 'hero'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={cn(
        'rounded-xl overflow-visible',
        isHero
          ? 'bg-white/95 backdrop-blur-md shadow-xl p-2'
          : 'bg-white border border-neutral-200 shadow-soft p-2'
      )}
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* Check-in */}
        <label
          className={cn(
            'flex flex-col gap-1 px-4 py-2.5 rounded-sm cursor-pointer hover:bg-neutral-50 transition-colors flex-1 min-w-0',
            'border border-transparent hover:border-neutral-200'
          )}
        >
          <span className="text-xs font-semibold font-display text-neutral-500 uppercase tracking-wide">
            {isUa ? 'Заїзд' : 'Check-in'}
          </span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-600 shrink-0" />
            <input
              type="date"
              value={checkIn || ''}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDates(e.target.value, checkOut)}
              className="text-sm font-medium text-neutral-900 bg-transparent border-none outline-none cursor-pointer w-full"
              placeholder={isUa ? 'Оберіть дату' : 'Select date'}
            />
          </div>
        </label>

        <div className="hidden sm:block w-px h-10 bg-neutral-200 self-center" />

        {/* Check-out */}
        <label
          className={cn(
            'flex flex-col gap-1 px-4 py-2.5 rounded-sm cursor-pointer hover:bg-neutral-50 transition-colors flex-1 min-w-0',
            'border border-transparent hover:border-neutral-200'
          )}
        >
          <span className="text-xs font-semibold font-display text-neutral-500 uppercase tracking-wide">
            {isUa ? 'Виїзд' : 'Check-out'}
          </span>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-600 shrink-0" />
            <input
              type="date"
              value={checkOut || ''}
              min={
                checkIn
                  ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0]
                  : new Date().toISOString().split('T')[0]
              }
              onChange={(e) => setDates(checkIn, e.target.value)}
              className="text-sm font-medium text-neutral-900 bg-transparent border-none outline-none cursor-pointer w-full"
            />
          </div>
        </label>

        <div className="hidden sm:block w-px h-10 bg-neutral-200 self-center" />

        {/* Guests */}
        <div className="relative flex-1 min-w-0">
          <button
            className={cn(
              'flex flex-col gap-1 px-4 py-2.5 rounded-sm hover:bg-neutral-50 transition-colors w-full text-left',
              'border border-transparent hover:border-neutral-200'
            )}
            onClick={() => setGuestMenuOpen(!guestMenuOpen)}
          >
            <span className="text-xs font-semibold font-display text-neutral-500 uppercase tracking-wide">
              {isUa ? 'Гості' : 'Guests'}
            </span>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-600 shrink-0" />
                <span className="text-sm font-medium text-neutral-900">
                  {totalGuests}{' '}
                  {isUa
                    ? totalGuests === 1
                      ? 'гість'
                      : totalGuests < 5
                        ? 'гості'
                        : 'гостей'
                    : totalGuests === 1
                      ? 'guest'
                      : 'guests'}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-neutral-400 transition-transform',
                  guestMenuOpen && 'rotate-180'
                )}
              />
            </div>
          </button>

          {/* Guest Dropdown */}
          {guestMenuOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-large border border-neutral-100 p-4 z-50">
              <GuestCounter
                label={isUa ? 'Дорослі' : 'Adults'}
                sublabel={isUa ? 'від 13 років' : '13+ years'}
                value={adults}
                min={1}
                max={8}
                onChange={(v) => setGuests(v, children)}
              />
              <div className="border-t border-neutral-100 my-3" />
              <GuestCounter
                label={isUa ? 'Діти' : 'Children'}
                sublabel={isUa ? 'до 12 років' : 'up to 12 years'}
                value={children}
                min={0}
                max={4}
                onChange={(v) => setGuests(adults, v)}
              />
              <button
                className="mt-4 w-full text-center text-sm font-semibold text-primary-900 hover:text-primary-700 transition-colors"
                onClick={() => setGuestMenuOpen(false)}
              >
                {isUa ? 'Готово' : 'Done'}
              </button>
            </div>
          )}
        </div>

        {/* Search Button */}
        <Button size="lg" onClick={handleSearch} className="shrink-0 sm:self-center">
          <Search className="w-4 h-4" />
          <span>{isUa ? 'Знайти' : 'Search'}</span>
        </Button>
      </div>
    </motion.div>
  )
}

function GuestCounter({ label, sublabel, value, min, max, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-900">{label}</p>
        <p className="text-xs text-neutral-400">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          className={cn(
            'w-8 h-8 rounded-full border font-bold text-lg leading-none transition-colors flex items-center justify-center',
            value <= min
              ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
              : 'border-primary-300 text-primary-900 hover:bg-primary-50'
          )}
          onClick={() => value > min && onChange(value - 1)}
          disabled={value <= min}
        >
          −
        </button>
        <span className="w-6 text-center text-sm font-semibold text-neutral-900">{value}</span>
        <button
          className={cn(
            'w-8 h-8 rounded-full border font-bold text-lg leading-none transition-colors flex items-center justify-center',
            value >= max
              ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
              : 'border-primary-300 text-primary-900 hover:bg-primary-50'
          )}
          onClick={() => value < max && onChange(value + 1)}
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  )
}
