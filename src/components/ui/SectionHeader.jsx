import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function SectionHeader({ eyebrow, title, description, align = 'center', className }) {
  const [ref, inView] = useIntersectionObserver()

  return (
    <div
      ref={ref}
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        align === 'left' && 'text-left',
        className
      )}
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-widest uppercase text-secondary-700 font-display mb-3"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 font-display leading-tight mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-neutral-600 leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
