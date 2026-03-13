import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

export default function Card({ children, hover = false, padding = true, className, onClick, ...props }) {
  return (
    <motion.div
      className={cn(
        'bg-white rounded-xl overflow-hidden',
        hover && 'cursor-pointer transition-shadow duration-300 hover:shadow-large',
        !hover && 'shadow-soft',
        padding && 'p-6',
        className
      )}
      onClick={onClick}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
