import { useNavigate } from 'react-router-dom'
import { Calendar, Users, Check } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useBookingStore } from '@/store/bookingStore'
import { formatPrice, getNights, formatGuests } from '@/utils/format'
import Button from '@/components/ui/Button'
import Rating from '@/components/ui/Rating'

export default function BookingWidget({ room }) {
  const navigate = useNavigate()
  const { checkIn, checkOut, adults, children, setDates, setGuests, setSelectedRoom } =
    useBookingStore()

  const nights = getNights(checkIn, checkOut)
  const totalPrice = nights ? room.price * nights : 0

  const handleBook = () => {
    setSelectedRoom(room)
    navigate('/booking')
  }

  return (
    <div className="bg-white rounded-xl shadow-large border border-neutral-100 p-6 sticky top-24">
      {/* Price header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          {room.originalPrice && (
            <p className="text-sm text-neutral-400 line-through">{formatPrice(room.originalPrice)}</p>
          )}
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold font-display text-primary-900">
              {formatPrice(room.price)}
            </span>
            <span className="text-sm text-neutral-500">/ ніч</span>
          </div>
        </div>
        <Rating value={room.rating} count={room.reviewCount} size="sm" />
      </div>

      {/* Date + Guests Inputs */}
      <div className="border border-neutral-200 rounded-md overflow-hidden mb-3">
        {/* Dates row */}
        <div className="flex">
          <label className="flex-1 p-3 border-r border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors">
            <p className="text-xs font-semibold font-display text-neutral-500 uppercase tracking-wide mb-1">
              Заїзд
            </p>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-600 shrink-0" />
              <input
                type="date"
                value={checkIn || ''}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setDates(e.target.value, checkOut)}
                className="text-sm font-medium text-neutral-900 bg-transparent border-none outline-none cursor-pointer w-full"
              />
            </div>
          </label>
          <label className="flex-1 p-3 cursor-pointer hover:bg-neutral-50 transition-colors">
            <p className="text-xs font-semibold font-display text-neutral-500 uppercase tracking-wide mb-1">
              Виїзд
            </p>
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
        </div>

        {/* Guests row */}
        <div className="border-t border-neutral-200 p-3">
          <p className="text-xs font-semibold font-display text-neutral-500 uppercase tracking-wide mb-2">
            Гості
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-neutral-900">
                {formatGuests(adults, children)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="w-7 h-7 rounded-full border border-primary-300 text-primary-900 hover:bg-primary-50 flex items-center justify-center text-lg font-bold leading-none transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={() => adults > 1 && setGuests(adults - 1, children)}
                disabled={adults <= 1}
              >
                −
              </button>
              <span className="w-5 text-center text-sm font-semibold text-neutral-900">{adults}</span>
              <button
                className="w-7 h-7 rounded-full border border-primary-300 text-primary-900 hover:bg-primary-50 flex items-center justify-center text-lg font-bold leading-none transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={() => adults < room.maxGuests && setGuests(adults + 1, children)}
                disabled={adults >= room.maxGuests}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      {nights > 0 && (
        <div className="space-y-2 py-4 border-y border-neutral-100 mb-4">
          <div className="flex justify-between text-sm text-neutral-600">
            <span>
              {formatPrice(room.price)} × {nights}{' '}
              {nights === 1 ? 'ніч' : nights < 5 ? 'ночі' : 'ночей'}
            </span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-neutral-900">
            <span>Разом</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      )}

      <Button fullWidth size="lg" onClick={handleBook} className="mb-3">
        {nights > 0 ? `Забронювати · ${formatPrice(totalPrice)}` : 'Забронювати'}
      </Button>

      <p className="text-xs text-neutral-400 text-center">
        Безкоштовне скасування до 48 годин до заїзду
      </p>

      {/* Trust features */}
      <div className="mt-5 space-y-2">
        {['Підтвердження миттєво', 'Без прихованих платежів', 'Безпечна оплата'].map((feat) => (
          <div key={feat} className="flex items-center gap-2 text-xs text-neutral-600">
            <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
            {feat}
          </div>
        ))}
      </div>
    </div>
  )
}
