import { Eye } from 'lucide-react'
import type { Review } from '@/types/iris'
import { PRIORITY_CONFIG } from '@/types/iris'
import { useIrisStore } from '@/store/useIrisStore'
import { Button } from '@/components/ui/button'
import PlatformIcon from '@/components/shared/PlatformIcon'
import BrandBadge from '@/components/shared/BrandBadge'
import StarRating from '@/components/shared/StarRating'
import StatusBadge from '@/components/shared/StatusBadge'
import { timeAgo } from '@/lib/format'
import { cn } from '@/lib/utils'

export default function ReviewRow({ review }: { review: Review }) {
  const setSelectedReview = useIrisStore((s) => s.setSelectedReview)
  const config = PRIORITY_CONFIG[review.priority]
  const isActionable = review.status === 'a-relire' || review.status === 'en-traitement'
  const isPublished = review.status === 'valide-publie' || review.status === 'auto-publie'

  return (
    <div className="flex min-w-0 items-stretch border-b border-gray-100 transition-colors hover:bg-gray-50">
      <div className={cn('w-[3px] shrink-0', config.dotColor)} />
      <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3">
        <PlatformIcon platform={review.platform} />
        <BrandBadge brand={review.brand} />
        <span className="w-32 shrink-0 truncate text-sm font-semibold text-gray-900 xl:w-40">
          {review.siteName}
        </span>
        <StarRating rating={review.rating} className="shrink-0" />
        <span className="min-w-0 flex-1 truncate text-sm text-gray-500">{review.reviewText}</span>
        <span className="hidden shrink-0 text-xs text-gray-400 sm:inline">{review.language}</span>
        <StatusBadge status={review.status} className="hidden md:inline-flex" />
        <span className="hidden shrink-0 text-xs text-gray-400 xl:inline">
          {timeAgo(review.receivedAt)}
        </span>
        <div className="shrink-0">
          {isActionable && (
            <Button size="sm" onClick={() => setSelectedReview(review)}>
              Traiter l'avis ›
            </Button>
          )}
          {isPublished && (
            <button
              onClick={() => setSelectedReview(review)}
              className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Consulter la réponse</span>
            </button>
          )}
          {!isActionable && !isPublished && (
            <button
              onClick={() => setSelectedReview(review)}
              className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Consulter</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
