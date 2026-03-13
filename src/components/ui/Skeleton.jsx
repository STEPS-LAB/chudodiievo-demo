import { cn } from '@/utils/cn'

export default function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded bg-neutral-200 animate-shimmer',
        'bg-[linear-gradient(90deg,#e5e5e5_0%,#f0f0f0_50%,#e5e5e5_100%)]',
        'bg-[length:1200px_100%]',
        className
      )}
      {...props}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-soft">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-9 w-28 rounded-sm" />
        </div>
      </div>
    </div>
  )
}
