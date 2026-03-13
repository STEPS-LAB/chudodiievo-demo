import { cn } from '@/utils/cn'
import { ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'

const Select = forwardRef(function Select({ label, error, options = [], placeholder, className, ...props }, ref) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-700 font-display">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'w-full h-11 bg-white border rounded-sm px-4 pr-10 text-sm text-neutral-900 appearance-none cursor-pointer',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-primary-900/20 focus:border-primary-900',
            error
              ? 'border-red-400'
              : 'border-neutral-200 hover:border-neutral-300',
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
})

export default Select
