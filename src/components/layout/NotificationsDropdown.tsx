import { Bell, Inbox } from 'lucide-react'
import { useIrisStore } from '@/store/useIrisStore'
import PlatformIcon from '@/components/shared/PlatformIcon'
import BrandBadge from '@/components/shared/BrandBadge'
import { timeAgo } from '@/lib/format'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function NotificationsDropdown() {
  const reviews = useIrisStore((s) => s.reviews)
  const setSelectedReview = useIrisStore((s) => s.setSelectedReview)

  const notifications = reviews.filter(
    (r) => r.priority === 'critique' && r.status === 'a-relire'
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {notifications.length > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {notifications.length}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="border-b border-gray-100 px-3 py-2.5">
          <p className="text-sm font-semibold text-gray-900">Notifications</p>
          <p className="text-xs text-gray-400">Avis critiques à traiter</p>
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center gap-1.5 px-4 py-8 text-center">
            <Inbox className="h-6 w-6 text-gray-300" />
            <p className="text-sm text-gray-400">Aucune notification</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto py-1">
            {notifications.map((review) => (
              <DropdownMenuItem
                key={review.id}
                onClick={() => setSelectedReview(review)}
                className={cn('flex items-start gap-2.5 px-3 py-2.5')}
              >
                <PlatformIcon platform={review.platform} className="h-7 w-7 shrink-0 text-xs" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-medium text-gray-900">
                      {review.siteName}
                    </span>
                    <BrandBadge brand={review.brand} />
                  </div>
                  <p className="truncate text-xs text-gray-500">{review.reviewText}</p>
                  <p className="mt-0.5 text-[11px] text-gray-400">{timeAgo(review.receivedAt)}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
