import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, User, Phone, Mail } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { useBookingStore } from '@/store/bookingStore'
import { bookingApi } from '@/services/api/booking'
import { formatPrice, formatDate, getNights } from '@/utils/format'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Rating from '@/components/ui/Rating'

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
  const navigate = useNavigate()
  const {
    selectedRoom,
    checkIn,
    checkOut,
    adults,
    children,
    setConfirmation,
  } = useBookingStore()

  useEffect(() => {
    if (!selectedRoom) navigate('/rooms', { replace: true })
  }, [selectedRoom, navigate])

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

  return (
    <div className="min-h-screen bg-canvas pt-20">
      <div className="container-max container-padding py-10">
        {/* Back link */}
        <Link
          to={`/rooms/${selectedRoom.slug}`}
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-900 transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад до номеру
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-soft p-6 sm:p-8"
            >
              <h1 className="text-2xl font-bold font-display text-primary-900 mb-6">
                Ваші дані для бронювання
              </h1>

              <form onSubmit={handleSubmit(mutate)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Ім'я"
                    placeholder="Іван"
                    prefix={<User className="w-4 h-4" />}
                    error={errors.firstName?.message}
                    {...register('firstName')}
                  />
                  <Input
                    label="Прізвище"
                    placeholder="Іваненко"
                    error={errors.lastName?.message}
                    {...register('lastName')}
                  />
                </div>

                <Input
                  label="Телефон"
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
                    Особливі побажання (необов'язково)
                  </label>
                  <textarea
                    placeholder="Ранній заїзд, алергія на пір'яні подушки, святкування..."
                    rows={3}
                    className="w-full bg-white border border-neutral-200 rounded-sm px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-900/20 focus:border-primary-900 transition-colors resize-none hover:border-neutral-300"
                    {...register('requests')}
                  />
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-sm text-neutral-500 mb-5">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    Безкоштовне скасування до 48 годин до заїзду
                  </div>
                  <Button type="submit" fullWidth size="lg" loading={isPending}>
                    {isPending
                      ? 'Обробляємо бронювання...'
                      : `Підтвердити бронювання · ${formatPrice(total)}`}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-soft p-6 sticky top-24">
              <h3 className="font-bold font-display text-primary-900 mb-4">Деталі бронювання</h3>

              <div className="mb-4">
                <img
                  src={selectedRoom.images[0]}
                  alt={selectedRoom.name}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h4 className="font-bold font-display text-primary-900">{selectedRoom.name}</h4>
                <Rating
                  value={selectedRoom.rating}
                  count={selectedRoom.reviewCount}
                  size="xs"
                  className="mt-1"
                />
              </div>

              <div className="space-y-3 text-sm border-t border-neutral-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Заїзд</span>
                  <span className="font-medium">{formatDate(checkIn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Виїзд</span>
                  <span className="font-medium">{formatDate(checkOut)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Тривалість</span>
                  <span className="font-medium">
                    {nights} {nights === 1 ? 'ніч' : nights < 5 ? 'ночі' : 'ночей'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Гості</span>
                  <span className="font-medium">{adults + children} особи</span>
                </div>
              </div>

              <div className="border-t border-neutral-100 mt-4 pt-4">
                <div className="flex justify-between text-sm text-neutral-600 mb-2">
                  <span>
                    {formatPrice(selectedRoom.price)} × {nights} ночей
                  </span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between font-bold text-primary-900">
                  <span>Разом</span>
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
