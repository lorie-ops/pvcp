import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function StarRating({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-3.5 w-3.5',
            i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-transparent text-gray-300'
          )}
        />
      ))}
    </div>
  )
}
