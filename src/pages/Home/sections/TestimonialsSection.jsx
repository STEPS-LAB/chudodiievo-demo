import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { TESTIMONIALS } from '@/constants'
import SectionHeader from '@/components/ui/SectionHeader'

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((idx, dir) => {
    setDirection(dir)
    setCurrent(idx)
  }, [])

  const prev = () =>
    goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length, -1)

  const next = useCallback(
    () => goTo((current + 1) % TESTIMONIALS.length, 1),
    [current, goTo]
  )

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const t = TESTIMONIALS[current]

  return (
    <section className="section-padding" style={{ backgroundColor: '#F0EEE9' }}>
      <div className="container-max container-padding">
        <SectionHeader
          eyebrow="Відгуки гостей"
          title="Що кажуть наші гості"
          description="Справжні враження від людей, які обрали Чудодієво для свого відпочинку."
        />

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d) => ({ opacity: 0, x: d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d) => ({ opacity: 0, x: d * -60 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="bg-white rounded-2xl p-8 sm:p-10 shadow-medium text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg sm:text-xl text-neutral-700 leading-relaxed mb-8 italic">
                  "{t.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-secondary-200"
                    style={{ borderColor: '#D8C3A5' }}
                  />
                  <div className="text-left">
                    <p className="font-bold font-display text-primary-900">{t.name}</p>
                    <p className="text-sm text-neutral-400">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev/Next controls */}
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 bg-white rounded-full shadow-medium flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-primary-900" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 bg-white rounded-full shadow-medium flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-primary-900" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '24px' : '6px',
                  backgroundColor: i === current ? '#1F3A2E' : '#D4D4D4',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
