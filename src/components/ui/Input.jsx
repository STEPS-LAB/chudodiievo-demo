import { cn } from '@/utils/cn'
import { forwardRef } from 'react'

const Input = forwardRef(function Input({ label, error, hint, prefix, suffix, className, ...props }, ref) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-700 font-display">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 flex items-center">
            {prefix}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full h-11 bg-white border rounded-sm px-4 text-neutral-900 text-sm placeholder:text-neutral-400',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-primary-900/20 focus:border-primary-900',
            error
              ? 'border-red-400 focus:ring-red-400/20 focus:border-red-400'
              : 'border-neutral-200 hover:border-neutral-300',
            prefix && 'pl-10',
            suffix && 'pr-10',
            className
          )}
          {...props}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 flex items-center">
            {suffix}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-500">{hint}</p>}
    </div>
  )
})

export default Input
