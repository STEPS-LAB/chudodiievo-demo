import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, User, Phone, Mail } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useBookingStore } from '@/store/bookingStore'
import { bookingApi } from '@/services/api/booking'
import { roomsApi } from '@/services/api/rooms'
import { formatPrice, formatDate, getNights } from '@/utils/format'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Rating from '@/components/ui/Rating'
import { useLanguage } from '@/context/LanguageContext'
import { localizeRoom } from '@/i18n/rooms'

const schema = z.object({
  firstName: z.string().min(2, "Мінімум 2 символи"),
  lastName: z.string().min(2, "Мінімум 2 символи"),
  phone: z
    .string()
    .min(10, 'Введіть коректний номер')
    .regex(/^[\d+\s()-]+$/, 'Некоректний формат'),
  email: z.string().email('Невірний email'),
  requests: z.string().optional(),
})

export default function Booking() {
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const navigate = useNavigate()
  const {
    selectedRoom,
    checkIn,
    checkOut,
    adults,
    children,
    setSelectedRoom,
    setDates,
    setGuests,
    setConfirmation,
  } = useBookingStore()

  const { data: rooms = [] } = useQuery({
    queryKey: ['rooms', 'booking-page'],
    queryFn: () => roomsApi.getAll({ sort: 'popular' }),
  })

  useEffect(() => {
    if (!selectedRoom && rooms.length > 0) {
      setSelectedRoom(rooms[0])
    }
  }, [selectedRoom, rooms, setSelectedRoom])

  useEffect(() => {
    if (!checkIn || !checkOut) {
      const today = new Date()
      const inDate = new Date(today)
      inDate.setDate(today.getDate() + 1)
      const outDate = new Date(today)
      outDate.setDate(today.getDate() + 2)
      setDates(inDate.toISOString().split('T')[0], outDate.toISOString().split('T')[0])
    }
  }, [checkIn, checkOut, setDates])

  const nights = getNights(checkIn, checkOut)
  const total = selectedRoom ? selectedRoom.price * nights : 0

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      bookingApi.createBooking({
        room: selectedRoom,
        checkIn,
        checkOut,
        adults,
        children,
        guest: data,
        total,
        nights,
      }),
    onSuccess: (booking) => {
      setConfirmation(booking)
      navigate('/confirmation')
    },
  })

  if (!selectedRoom) return null
  const localizedRoom = localizeRoom(selectedRoom, language)

  return (
    <div className="min-h-screen bg-canvas pt-20">
      <div className="container-max container-padding py-10">
        <div className="mb-8 bg-white rounded-xl shadow-soft p-5">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-neutral-700 font-display mb-2 block">
                {isUa ? 'Оберіть номер' : 'Select room'}
              </label>
              <select
                value={selectedRoom.slug}
                onChange={(e) => {
                  const nextRoom = rooms.find((room) => room.slug === e.target.value)
                  if (nextRoom) setSelectedRoom(nextRoom)
                }}
                className="h-11 w-full px-3 rounded-md border border-neutral-200 text-sm text-neutral-800 bg-white focus:outline-none focus:border-primary-500"
              >
                {rooms.map((room) => (
                  <option key={room.slug} value={room.slug}>
                    {localizeRoom(room, language).name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:w-[320px]">
              <div>
                <label className="text-sm font-medium text-neutral-700 font-display mb-2 block">
                  {isUa ? 'Заїзд' : 'Check-in'}
                </label>
                <input
                  type="date"
                  value={checkIn || ''}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDates(e.target.value, checkOut)}
                  className="h-11 w-full px-3 rounded-md border border-neutral-200 text-sm text-neutral-800 bg-white focus:outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700 font-display mb-2 block">
                  {isUa ? 'Виїзд' : 'Check-out'}
                </label>
                <input
                  type="date"
                  value={checkOut || ''}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDates(checkIn, e.target.value)}
                  className="h-11 w-full px-3 rounded-md border border-neutral-200 text-sm text-neutral-800 bg-white focus:outline-none focus:border-primary-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setGuests(Math.max(1, adults - 1), children)}
                className="w-11 h-11 rounded-md border border-neutral-200 text-lg text-primary-900"
              >
                -
              </button>
              <div className="h-11 px-4 rounded-md border border-neutral-200 flex items-center text-sm text-neutral-700">
                {adults + children} {isUa ? 'гостей' : 'guests'}
              </div>
              <button
                type="button"
                onClick={() => setGuests(Math.min(selectedRoom.maxGuests, adults + 1), children)}
                className="w-11 h-11 rounded-md border border-neutral-200 text-lg text-primary-900"
              >
                +
              </button>
            </div>
          </div>
          <Link
            to={`/rooms/${localizedRoom.slug}`}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-900 transition-colors mt-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {isUa ? 'Переглянути деталі номера' : 'View room details'}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-soft p-6 sm:p-8"
            >
              <h1 className="text-2xl font-bold font-display text-primary-900 mb-6">
                {isUa ? 'Ваші дані для бронювання' : 'Your booking details'}
              </h1>

              <form onSubmit={handleSubmit(mutate)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label={isUa ? "Ім'я" : 'First name'}
                    placeholder={isUa ? 'Іван' : 'John'}
                    prefix={<User className="w-4 h-4" />}
                    error={errors.firstName?.message}
                    {...register('firstName')}
                  />
                  <Input
                    label={isUa ? 'Прізвище' : 'Last name'}
                    placeholder={isUa ? 'Іваненко' : 'Doe'}
                    error={errors.lastName?.message}
                    {...register('lastName')}
                  />
                </div>

                <Input
                  label={isUa ? 'Телефон' : 'Phone'}
                  type="tel"
                  placeholder="+380 00 000 00 00"
                  prefix={<Phone className="w-4 h-4" />}
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="ivan@example.com"
                  prefix={<Mail className="w-4 h-4" />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-neutral-700 font-display">
                    {isUa ? "Особливі побажання (необов'язково)" : 'Special requests (optional)'}
                  </label>
                  <textarea
                    placeholder={
                      isUa
                        ? "Ранній заїзд, алергія на пір'яні подушки, святкування..."
                        : 'Early check-in, allergy to feather pillows, celebration...'
                    }
                    rows={3}
                    className="w-full bg-white border border-neutral-200 rounded-sm px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-900/20 focus:border-primary-900 transition-colors resize-none hover:border-neutral-300"
                    {...register('requests')}
                  />
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-sm text-neutral-500 mb-5">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {isUa
                      ? 'Безкоштовне скасування до 48 годин до заїзду'
                      : 'Free cancellation up to 48 hours before check-in'}
                  </div>
                  <Button type="submit" fullWidth size="lg" loading={isPending}>
                    {isPending
                      ? isUa
                        ? 'Обробляємо бронювання...'
                        : 'Processing booking...'
                      : `${isUa ? 'Підтвердити бронювання' : 'Confirm booking'} · ${formatPrice(total)}`}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
              <h3 className="font-bold font-display text-primary-900 mb-4">
                {isUa ? 'Деталі бронювання' : 'Booking details'}
              </h3>

              <div className="mb-4">
                <img
                  src={localizedRoom.images[0]}
                  alt={localizedRoom.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h4 className="font-bold font-display text-primary-900">{localizedRoom.name}</h4>
                <Rating
                  value={localizedRoom.rating}
                  count={localizedRoom.reviewCount}
                  size="xs"
                  className="mt-1"
                />
              </div>

              <div className="space-y-3 text-sm border-t border-neutral-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isUa ? 'Заїзд' : 'Check-in'}</span>
                  <span className="font-medium">{formatDate(checkIn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isUa ? 'Виїзд' : 'Check-out'}</span>
                  <span className="font-medium">{formatDate(checkOut)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isUa ? 'Тривалість' : 'Duration'}</span>
                  <span className="font-medium">
                    {nights} {isUa ? (nights === 1 ? 'ніч' : nights < 5 ? 'ночі' : 'ночей') : nights === 1 ? 'night' : 'nights'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">{isUa ? 'Гості' : 'Guests'}</span>
                  <span className="font-medium">{adults + children} {isUa ? 'особи' : 'guests'}</span>
                </div>
              </div>

              <div className="border-t border-neutral-100 mt-4 pt-4">
                <div className="flex justify-between text-sm text-neutral-600 mb-2">
                  <span>
                    {formatPrice(localizedRoom.price)} × {nights} {isUa ? 'ночей' : 'nights'}
                  </span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between font-bold text-primary-900">
                  <span>{isUa ? 'Разом' : 'Total'}</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
