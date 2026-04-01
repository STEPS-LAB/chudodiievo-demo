import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TreePine, ArrowLeft } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'

export default function NotFound() {
  const { language } = useLanguage()
  const isUa = language === 'ua'

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ backgroundColor: '#e8f0ec' }}
        >
          <TreePine className="w-10 h-10" style={{ color: '#1F3A2E' }} />
        </div>

        <h1
          className="text-8xl font-bold font-display mb-2"
          style={{ color: '#d1ddd8' }}
        >
          404
        </h1>

        <h2 className="text-2xl font-bold font-display text-primary-900 mb-3">
          {isUa ? 'Сторінку не знайдено' : 'Page not found'}
        </h2>

        <p className="text-neutral-500 mb-8">
          {isUa
            ? 'Схоже, ця стежина веде в нікуди. Повертайтеся на головну і знайдіть свій шлях до відпочинку.'
            : 'Looks like this trail leads nowhere. Return to the homepage and find your way to a perfect stay.'}
        </p>

        <Link to="/">
          <Button size="lg">
            <ArrowLeft className="w-4 h-4" />
            {isUa ? 'На головну' : 'Back home'}
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
