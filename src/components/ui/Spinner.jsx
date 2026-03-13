import { cn } from '@/utils/cn'
import { Loader2 } from 'lucide-react'

export default function Spinner({ size = 'md', className }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-8 h-8', xl: 'w-12 h-12' }

  return (
    <Loader2 className={cn('animate-spin text-primary-900', sizes[size], className)} />
  )
}

export function PageSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas">
      <Spinner size="xl" />
    </div>
  )
}
