import { ChevronDown, ChevronRight } from 'lucide-react'
import { forwardRef, useMemo } from 'react'
import type { Priority, Review } from '@/types/iris'
import { PRIORITY_CONFIG } from '@/types/iris'
import { useIrisStore } from '@/store/useIrisStore'
import { isBulkEligible } from '@/lib/bulkEligibility'
import { PRIORITY_ICONS } from '@/lib/priorityIcons'
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
    const Icon = PRIORITY_ICONS[priority]
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
          title={isCollapsed ? 'Cliquer pour déplier' : 'Cliquer pour replier'}
          className={cn(
            'flex w-full cursor-pointer items-center justify-between gap-3 border-l-4 px-4 py-3 text-left transition-colors',
            config.bgColor,
            config.borderColor,
            config.hoverBgColor
          )}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                config.iconBgColor
              )}
            >
              <Icon className={cn('h-4 w-4', config.iconTextColor)} />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className={cn('text-[15px] font-bold', config.textColor)}>{config.label}</span>
                <span className="text-xs text-gray-600">{config.description}</span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            {eligibleIds.length > 0 && (
              <label
                onClick={(e) => e.stopPropagation()}
                className="flex cursor-pointer select-none items-center gap-1.5 rounded-md border border-gray-200 bg-white/70 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-white"
              >
                <IndeterminateCheckbox
                  checked={allEligibleSelected}
                  indeterminate={someEligibleSelected}
                  onChange={() => setIdsSelected(eligibleIds, !allEligibleSelected)}
                  aria-label={`Sélectionner tous les avis ${config.label.toLowerCase()}`}
                />
                <span className="hidden sm:inline">Tout sélectionner</span>
              </label>
            )}
            <span
              className={cn(
                'flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold text-white',
                config.dotColor
              )}
            >
              {reviews.length}
            </span>
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
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
