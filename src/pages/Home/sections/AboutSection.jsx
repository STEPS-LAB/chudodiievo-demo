import { motion } from 'framer-motion'
import { RESORT_FEATURES } from '@/constants'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import SectionHeader from '@/components/ui/SectionHeader'
import { getIcon } from '@/utils/icons'

export default function AboutSection() {
  const [ref, inView] = useIntersectionObserver()

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Left column */}
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-medium">
                  <img
                    src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80"
                    alt="Природа курорту"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden shadow-medium">
                  <img
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80"
                    alt="СПА процедури"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              {/* Right column — offset down */}
              <div className="space-y-4 mt-8">
                <div className="aspect-square rounded-xl overflow-hidden shadow-medium">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
                    alt="Авторська кухня"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-medium">
                  <img
                    src="https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80"
                    alt="Озеро"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -right-4 rounded-xl px-5 py-4 shadow-xl"
              style={{ backgroundColor: '#1F3A2E', color: 'white' }}
            >
              <p className="text-3xl font-bold font-display">12+</p>
              <p className="text-xs" style={{ color: '#a7c4b5' }}>
                років досвіду
              </p>
            </div>
          </div>

          {/* Text content */}
          <div ref={ref} className="space-y-8">
            <SectionHeader
              eyebrow="Про Чудодієво"
              title="Більше ніж просто готель"
              description="Ми створили місце, де кожна деталь продумана для вашого відновлення. Від архітектури, що вписується в природний ландшафт, до авторської кухні з місцевих продуктів — Чудодієво це досвід, який змінює уявлення про відпочинок."
              align="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {RESORT_FEATURES.map(({ icon, title, description }, i) => {
                const Icon = getIcon(icon)
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div
                      className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: '#e8f0ec' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: '#1F3A2E' }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold font-display text-primary-900 mb-1">
                        {title}
                      </h4>
                      <p className="text-xs text-neutral-500 leading-relaxed">{description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
