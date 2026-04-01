import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { roomsApi } from '@/services/api/rooms'
import RoomCard from '@/features/rooms/RoomCard'
import { SkeletonCard } from '@/components/ui/Skeleton'
import SearchBar from '@/features/search/SearchBar'
import { ROOM_CATEGORIES, SORT_OPTIONS } from '@/constants'
import { cn } from '@/utils/cn'
import { useLanguage } from '@/context/LanguageContext'

export default function Rooms() {
  const { language } = useLanguage()
  const isUa = language === 'ua'
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('popular')
  const categoryLabels = {
    all: isUa ? 'Всі номери' : 'All rooms',
    standard: isUa ? 'Стандарт' : 'Standard',
    studio: isUa ? 'Студія' : 'Studio',
    suite: isUa ? 'Люкс' : 'Suite',
    cottage: isUa ? 'Котедж' : 'Cottage',
    penthouse: isUa ? 'Пентхаус' : 'Penthouse',
  }
  const sortLabels = {
    popular: isUa ? 'За популярністю' : 'Most popular',
    price_asc: isUa ? 'Від дешевших' : 'Price: low to high',
    price_desc: isUa ? 'Від дорожчих' : 'Price: high to low',
    rating: isUa ? 'За рейтингом' : 'Top rated',
  }

  const { data: rooms, isLoading } = useQuery({
    queryKey: ['rooms', { category, sort }],
    queryFn: () => roomsApi.getAll({ category, sort }),
  })

  return (
    <div className="min-h-screen bg-canvas">
      {/* Page hero */}
      <div className="pt-24 pb-12" style={{ backgroundColor: '#1F3A2E' }}>
        <div className="container-max container-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-sm font-semibold tracking-widest uppercase font-display mb-2"
              style={{ color: '#D8C3A5' }}
            >
              {isUa ? 'Розміщення' : 'Accommodation'}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold font-display text-white mb-4">
              {isUa ? 'Наші номери та котеджі' : 'Our rooms and cottages'}
            </h1>
            <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {isUa
                ? 'Від затишної студії до ексклюзивного пентхаусу — знайдіть ідеальний простір для вашого відпочинку.'
                : 'From a cozy studio to an exclusive penthouse - find the perfect space for your stay.'}
            </p>
          </motion.div>

          <div className="mt-8">
            <SearchBar variant="listing" />
          </div>
        </div>
      </div>

      <div className="container-max container-padding py-10">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            {ROOM_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  'shrink-0 px-4 py-2 rounded-full text-sm font-medium font-display transition-all duration-200',
                  category === cat.id
                    ? 'text-white shadow-sm'
                    : 'bg-white text-neutral-600 hover:text-primary-900 border border-neutral-200 hover:border-primary-300'
                )}
                style={
                  category === cat.id ? { backgroundColor: '#1F3A2E' } : {}
                }
              >
                {categoryLabels[cat.key]}
              </button>
            ))}
          </div>

          {/* Sort select */}
          <div className="flex items-center gap-3 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-neutral-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-9 px-3 pr-8 rounded-md border border-neutral-200 text-sm text-neutral-700 bg-white focus:outline-none focus:border-primary-500 appearance-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {sortLabels[opt.key]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result count */}
        {!isLoading && rooms && (
          <p className="text-sm text-neutral-500 mb-6">
            {isUa ? 'Знайдено' : 'Found'}{' '}
            <span className="font-semibold text-neutral-700">{rooms.length}</span>{' '}
            {isUa ? 'варіантів' : 'options'}
          </p>
        )}

        {/* Room grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : rooms?.map((room, i) => <RoomCard key={room.id} room={room} index={i} />)}
        </div>

        {/* Empty state */}
        {!isLoading && rooms?.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🌲</p>
            <h3 className="text-xl font-bold font-display text-primary-900 mb-2">
              {isUa ? 'Номерів не знайдено' : 'No rooms found'}
            </h3>
            <p className="text-neutral-500">{isUa ? 'Спробуйте змінити фільтри' : 'Try changing filters'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
