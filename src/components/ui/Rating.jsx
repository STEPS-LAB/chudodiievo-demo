import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'

export default function Rating({ value, count, size = 'sm', showValue = true, className }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)

  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  }

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {stars.map((star) => (
          <Star
            key={star}
            className={cn(
              sizeClasses[size],
              star <= Math.round(value)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-neutral-200 text-neutral-200'
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-neutral-700">
          {value.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-sm text-neutral-400">({count})</span>
      )}
    </div>
  )
}
