import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { useScrollPosition } from '@/hooks/useScrollPosition'

export default function MobileBookingBar() {
  const { pathname } = useLocation()
  const { language } = useLanguage()
  const { scrollY } = useScrollPosition()

  const isHiddenPage = pathname === '/contact' || pathname === '/booking' || pathname === '/checkout'
  const hasHero = pathname === '/'
  const shouldShow = !isHiddenPage && (!hasHero || scrollY > window.innerHeight - 120)
  const label = useMemo(() => (language === 'ua' ? 'Забронювати' : 'Book now'), [language])

  if (isHiddenPage) return null

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{
        y: shouldShow ? 0 : 20,
        opacity: shouldShow ? 1 : 0,
        pointerEvents: shouldShow ? 'auto' : 'none',
      }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="fixed bottom-0 inset-x-0 z-40 px-3 py-2 border-t border-neutral-200 bg-white/95 backdrop-blur-sm lg:hidden"
    >
      <Link
        to="/booking"
        className="w-full h-11 rounded-md bg-primary-900 text-white flex items-center justify-center text-sm font-semibold uppercase tracking-[0.14em] hover:bg-primary-800 transition-colors"
      >
        {label}
      </Link>
    </motion.div>
  )
}
