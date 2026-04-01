import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  ArrowLeft,
  Users,
  Maximize2,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { roomsApi } from '@/services/api/rooms'
import BookingWidget from '@/features/booking/BookingWidget'
import Rating from '@/components/ui/Rating'
import Badge from '@/components/ui/Badge'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { AMENITIES } from '@/constants'
import { getIcon } from '@/utils/icons'
import { cn } from '@/utils/cn'
import { useLanguage } from '@/context/LanguageContext'
import { localizeRoom } from '@/i18n/rooms'

const CATEGORY_LABELS = {
  standard: 'Стандарт',
  studio: 'Студія',
  suite: 'Люкс',
  cottage: 'Котедж',
  penthouse: 'Пентхаус',
}

export default function RoomDetail() {
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const { slug } = useParams()
  const [activeImg, setActiveImg] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const {
    data: room,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['room', slug],
    queryFn: () => roomsApi.getBySlug(slug),
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas pt-20">
        <div className="container-max container-padding py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <SkeletonCard />
          </div>
        </div>
      </div>
    )
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-4xl mb-4">🌲</p>
          <h2 className="text-2xl font-bold font-display text-primary-900 mb-2">
            {isUa ? 'Номер не знайдено' : 'Room not found'}
          </h2>
          <Link to="/rooms" className="text-primary-600 hover:underline">
            {isUa ? 'Повернутися до номерів' : 'Back to rooms'}
          </Link>
        </div>
      </div>
    )
  }

  const localizedRoom = localizeRoom(room, language)

  const amenitiesData = localizedRoom.amenities
    .map((id) => AMENITIES.find((a) => a.id === id))
    .filter(Boolean)

  const prevImg = () =>
    setActiveImg((activeImg - 1 + localizedRoom.images.length) % localizedRoom.images.length)
  const nextImg = () => setActiveImg((activeImg + 1) % localizedRoom.images.length)

  return (
    <div className="min-h-screen bg-canvas">
      {/* Back link */}
      <div className="container-max container-padding pt-24 pb-4">
        <Link
          to="/rooms"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          {isUa ? 'Усі номери' : 'All rooms'}
        </Link>
      </div>

      <div className="container-max container-padding pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Image Gallery */}
            <div className="space-y-3">
              {/* Main image */}
              <div
                className="relative aspect-video rounded-xl overflow-hidden cursor-zoom-in shadow-medium"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={localizedRoom.images[activeImg]}
                  alt={localizedRoom.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Nav arrows */}
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImg()
                  }}
                >
                  <ChevronLeft className="w-5 h-5 text-primary-900" />
                </button>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImg()
                  }}
                >
                  <ChevronRight className="w-5 h-5 text-primary-900" />
                </button>

                {/* Counter */}
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
                  {activeImg + 1} / {localizedRoom.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {localizedRoom.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={cn(
                      'shrink-0 w-20 h-16 rounded-md overflow-hidden transition-all duration-200 border-2',
                      i === activeImg
                        ? 'border-primary-900'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-start gap-3 mb-3">
                <Badge variant="default">
                  {isUa
                    ? CATEGORY_LABELS[localizedRoom.category]
                    : {
                        standard: 'Standard',
                        studio: 'Studio',
                        suite: 'Suite',
                        cottage: 'Cottage',
                        penthouse: 'Penthouse',
                      }[localizedRoom.category]}
                </Badge>
                <Rating value={localizedRoom.rating} count={localizedRoom.reviewCount} size="sm" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-display text-primary-900 mb-4">
                {localizedRoom.name}
              </h1>

              {/* Specs row */}
              <div className="flex flex-wrap gap-4 mb-6">
                {[
                  { icon: Users, label: isUa ? `до ${localizedRoom.maxGuests} гостей` : `up to ${localizedRoom.maxGuests} guests` },
                  { icon: Maximize2, label: `${localizedRoom.size} м²` },
                  { icon: BedDouble, label: localizedRoom.bedType },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-neutral-600">
                    <Icon className="w-4 h-4 text-primary-600" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

              <p className="text-neutral-600 leading-relaxed text-base">{localizedRoom.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-bold font-display text-primary-900 mb-5">
                {isUa ? 'Зручності' : 'Amenities'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenitiesData.map(({ id, label, icon }) => {
                  const Icon = getIcon(icon)
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-3 p-3 bg-white rounded-md border border-neutral-100"
                    >
                      <div
                        className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
                        style={{ backgroundColor: '#e8f0ec' }}
                      >
                        <Icon className="w-4 h-4" style={{ color: '#2d5944' }} />
                      </div>
                      <span className="text-sm font-medium text-neutral-700">{label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Sidebar — Booking Widget */}
          <div className="lg:col-span-1">
            <BookingWidget room={localizedRoom} />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={localizedRoom.images[activeImg]}
            alt=""
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              prevImg()
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              nextImg()
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  )
}
