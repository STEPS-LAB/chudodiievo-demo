import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { getIcon } from '@/utils/icons'
import { AMENITIES } from '@/constants'

export default function AmenitiesSection() {
  const [ref, inView] = useIntersectionObserver()

  return (
    <section className="section-padding" style={{ backgroundColor: '#1F3A2E', color: 'white' }}>
      <div className="container-max container-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <p
            className="text-sm font-semibold tracking-widest uppercase font-display mb-3"
            style={{ color: '#D8C3A5' }}
          >
            Зручності
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
            Все для вашого комфорту
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {AMENITIES.map(({ id, label, icon }, i) => {
            const Icon = getIcon(icon)
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex flex-col items-center gap-3 p-4 rounded-xl text-center group cursor-default transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')
                }
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#D8C3A5' }} />
                </div>
                <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
