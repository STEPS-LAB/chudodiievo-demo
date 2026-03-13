import { cn } from '@/utils/cn'

const variants = {
  default: 'bg-primary-100 text-primary-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  info: 'bg-blue-100 text-blue-800',
  outline: 'border border-primary-300 text-primary-700',
  secondary: 'bg-secondary-200 text-secondary-900',
}

export default function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-display tracking-wide',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
