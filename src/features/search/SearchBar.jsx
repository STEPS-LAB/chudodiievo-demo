import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, Users, Search } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useBookingStore } from '@/store/bookingStore'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

export default function SearchBar({ variant = 'hero', onSearch }) {
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const { checkIn, checkOut, adults, children, setDates, setGuests } = useBookingStore()
  const navigate = useNavigate()
  const checkInInputRef = useRef(null)
  const checkOutInputRef = useRef(null)

  const handleSearch = () => {
    if (onSearch) onSearch({ checkIn, checkOut, adults, children })
    else navigate('/rooms')
  }

  const isHero = variant === 'hero'
  const isListing = variant === 'listing'

  useEffect(() => {
    if (isListing && children !== 0) setGuests(adults, 0)
  }, [isListing, children, adults, setGuests])

  const formatDisplayDate = (value) =>
    value
      ? new Date(`${value}T00:00:00`).toLocaleDateString(isUa ? 'uk-UA' : 'en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : isUa
        ? 'Оберіть дату'
        : 'Select date'

  const openDatePicker = (inputRef) => {
    if (!inputRef.current) return
    inputRef.current.focus()
    if (typeof inputRef.current.showPicker === 'function') inputRef.current.showPicker()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={cn(
        'rounded-lg overflow-visible',
        isHero
          ? 'bg-white/95 backdrop-blur-md shadow-xl p-2'
          : 'bg-white border border-neutral-200 shadow-soft p-2'
      )}
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        {/* Check-in */}
        <label
          onClick={() => openDatePicker(checkInInputRef)}
          className={cn(
            'relative flex flex-col gap-1 px-4 py-2.5 rounded-lg cursor-pointer bg-neutral-100 hover:bg-neutral-100 transition-colors flex-1 min-w-0 justify-between',
            isListing && 'h-[72px]',
            'border border-neutral-200'
          )}
        >
          <span className="text-xs font-semibold font-display text-neutral-500 uppercase tracking-wide">
            {isUa ? 'Заїзд' : 'Check-in'}
          </span>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-neutral-900">{formatDisplayDate(checkIn)}</span>
            <CalendarDays className="w-5 h-5 text-primary-600 shrink-0 self-center" />
            <input
              ref={checkInInputRef}
              type="date"
              value={checkIn || ''}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDates(e.target.value, checkOut)}
              className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
              aria-label={isUa ? 'Дата заїзду' : 'Check-in date'}
            />
          </div>
        </label>

        <div className="hidden sm:block w-px h-10 bg-neutral-200 self-center" />

        {/* Check-out */}
        <label
          onClick={() => openDatePicker(checkOutInputRef)}
          className={cn(
            'relative flex flex-col gap-1 px-4 py-2.5 rounded-lg cursor-pointer bg-neutral-100 hover:bg-neutral-100 transition-colors flex-1 min-w-0 justify-between',
            isListing && 'h-[72px]',
            'border border-neutral-200'
          )}
        >
          <span className="text-xs font-semibold font-display text-neutral-500 uppercase tracking-wide">
            {isUa ? 'Виїзд' : 'Check-out'}
          </span>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-neutral-900">{formatDisplayDate(checkOut)}</span>
            <CalendarDays className="w-5 h-5 text-primary-600 shrink-0 self-center" />
            <input
              ref={checkOutInputRef}
              type="date"
              value={checkOut || ''}
              min={
                checkIn
                  ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0]
                  : new Date().toISOString().split('T')[0]
              }
              onChange={(e) => setDates(checkIn, e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
              aria-label={isUa ? 'Дата виїзду' : 'Check-out date'}
            />
          </div>
        </label>

        <div className="hidden sm:block w-px h-10 bg-neutral-200 self-center" />

        {/* Guests */}
        <div className="flex-1 min-w-0">
          <div
            className={cn(
              'flex flex-col gap-1 px-4 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-100 transition-colors w-full text-left justify-between',
              isListing && 'h-[72px]',
              'border border-neutral-200'
            )}
          >
            <span className="text-xs font-semibold font-display text-neutral-500 uppercase tracking-wide">
              {isUa ? 'Гості' : 'Guests'}
            </span>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-600 shrink-0 self-center" />
                <span className="text-sm font-medium text-neutral-900">
                  {adults}{' '}
                  {isUa
                    ? adults === 1
                      ? 'гість'
                      : adults < 5
                        ? 'гості'
                        : 'гостей'
                    : adults === 1
                      ? 'guest'
                      : 'guests'}
                </span>
              </div>
              <div className="flex items-center gap-2 -mt-1">
                <button
                  type="button"
                  className={cn(
                    'w-[38px] h-[38px] rounded-full border text-[1.35rem] font-bold leading-none transition-colors flex items-center justify-center self-center',
                    adults <= 1
                      ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                      : 'border-primary-300 text-primary-900 hover:bg-primary-50'
                  )}
                  onClick={() => adults > 1 && setGuests(adults - 1, 0)}
                  disabled={adults <= 1}
                >
                  −
                </button>
                <button
                  type="button"
                  className={cn(
                    'w-[38px] h-[38px] rounded-full border text-[1.35rem] font-bold leading-none transition-colors flex items-center justify-center self-center',
                    adults >= 8
                      ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                      : 'border-primary-300 text-primary-900 hover:bg-primary-50'
                  )}
                  onClick={() => adults < 8 && setGuests(adults + 1, 0)}
                  disabled={adults >= 8}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <Button
          size="lg"
          onClick={handleSearch}
          className={cn(
            'shrink-0 sm:self-center rounded-lg',
            isListing ? 'h-[72px] px-8' : ''
          )}
        >
          <Search className="w-4 h-4" />
          <span>{isUa ? 'Знайти' : 'Search'}</span>
        </Button>
      </div>
    </motion.div>
  )
}
