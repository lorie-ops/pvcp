import { ChevronDown, ChevronRight } from 'lucide-react'
import { forwardRef, useMemo } from 'react'
import type { Priority, Review } from '@/types/iris'
import { PRIORITY_CONFIG } from '@/types/iris'
import { useIrisStore } from '@/store/useIrisStore'
import { isBulkEligible } from '@/lib/bulkEligibility'
import { cn } from '@/lib/utils'
import ReviewRow from './ReviewRow'
import IndeterminateCheckbox from '@/components/shared/IndeterminateCheckbox'

interface PrioritySectionProps {
  priority: Priority
  reviews: Review[]
}

const PrioritySection = forwardRef<HTMLDivElement, PrioritySectionProps>(
  ({ priority, reviews }, ref) => {
    const config = PRIORITY_CONFIG[priority]
    const collapsedPriorities = useIrisStore((s) => s.collapsedPriorities)
    const togglePrioritySection = useIrisStore((s) => s.togglePrioritySection)
    const selectedIds = useIrisStore((s) => s.selectedIds)
    const setIdsSelected = useIrisStore((s) => s.setIdsSelected)
    const isCollapsed = collapsedPriorities.has(priority)

    const eligibleIds = useMemo(
      () => reviews.filter(isBulkEligible).map((r) => r.id),
      [reviews]
    )
    const selectedEligibleCount = eligibleIds.filter((id) => selectedIds.has(id)).length
    const allEligibleSelected = eligibleIds.length > 0 && selectedEligibleCount === eligibleIds.length
    const someEligibleSelected = selectedEligibleCount > 0 && !allEligibleSelected

    if (reviews.length === 0) return null

    return (
      <div
        ref={ref}
        id={`priority-section-${priority}`}
        className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white scroll-mt-4"
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => togglePrioritySection(priority)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              togglePrioritySection(priority)
            }
          }}
          className={cn(
            'flex w-full cursor-pointer items-center justify-between border-l-4 px-4 py-2.5 text-left',
            config.bgColor,
            config.borderColor
          )}
        >
          <div className="flex items-center gap-3">
            {eligibleIds.length > 0 && (
              <IndeterminateCheckbox
                checked={allEligibleSelected}
                indeterminate={someEligibleSelected}
                onChange={() => setIdsSelected(eligibleIds, !allEligibleSelected)}
                aria-label={`Sélectionner tous les avis ${config.label.toLowerCase()}`}
              />
            )}
            <span className={cn('h-2 w-2 shrink-0 rounded-full', config.dotColor)} />
            <span className={cn('text-sm font-semibold', config.textColor)}>{config.label}</span>
            <span className="text-xs text-gray-500">— {config.description}</span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold text-white',
                config.dotColor
              )}
            >
              {reviews.length}
            </span>
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>

        {!isCollapsed && (
          <div>
            {reviews.map((review) => (
              <ReviewRow key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    )
  }
)
PrioritySection.displayName = 'PrioritySection'

export default PrioritySection
