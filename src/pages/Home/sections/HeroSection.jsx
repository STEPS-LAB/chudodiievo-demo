import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowDown, Award } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2000&q=85"
          alt="Готель лісовий курорт"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(15,36,27,0.60) 0%, rgba(15,36,27,0.40) 50%, rgba(15,36,27,0.80) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(15,36,27,0.30) 0%, transparent 50%, rgba(15,36,27,0.30) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20">
        {/* Award badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium"
        >
          <Award className="w-4 h-4 text-secondary-400" style={{ color: '#D8C3A5' }} />
          <span>Найкращий еко-курорт Карпат 2024</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-display text-white mb-6 leading-tight tracking-tight"
        >
          Де природа
          <br />
          <span style={{ color: '#D8C3A5' }}>зустрічає</span>
          <br />
          розкіш
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg sm:text-xl text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Преміальний лісовий курорт у серці Карпат. Унікальне поєднання дикої природи, сучасного
          комфорту та автентичної карпатської культури.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/rooms">
            <Button size="xl" variant="light" className="min-w-48 font-bold shadow-xl hover:shadow-2xl">
              Обрати номер
            </Button>
          </Link>
          <a href="#about">
            <Button
              size="xl"
              variant="ghost"
              className="text-white border border-white/30 min-w-48"
              style={{ color: 'white' }}
            >
              Дізнатись більше
            </Button>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-8 sm:gap-16 mt-16"
        >
          {[
            { value: '200+', label: 'га лісу' },
            { value: '12', label: 'унікальних номерів' },
            { value: '5★', label: 'рейтинг гостей' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold font-display text-white mb-1">{value}</p>
              <p className="text-xs sm:text-sm text-white/60 uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest">Гортати</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
