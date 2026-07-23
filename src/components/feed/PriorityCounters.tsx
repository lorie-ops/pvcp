import type { Priority, Review } from '@/types/iris'
import { PRIORITY_CONFIG } from '@/types/iris'
import { PRIORITY_ICONS } from '@/lib/priorityIcons'
import { cn } from '@/lib/utils'

const COUNTER_ORDER: Priority[] = ['critique', 'sensible', 'standard', 'simple']

export default function PriorityCounters({ reviews }: { reviews: Review[] }) {
  const counts = reviews.reduce<Record<string, number>>((acc, r) => {
    acc[r.priority] = (acc[r.priority] || 0) + 1
    return acc
  }, {})

  const scrollToSection = (priority: Priority) => {
    document.getElementById(`priority-section-${priority}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {COUNTER_ORDER.map((priority) => {
        const config = PRIORITY_CONFIG[priority]
        const Icon = PRIORITY_ICONS[priority]
        const count = counts[priority] || 0
        return (
          <button
            key={priority}
            onClick={() => scrollToSection(priority)}
            className={cn(
              'flex items-center gap-3 rounded-lg border bg-white px-4 py-3 text-left transition-colors hover:bg-gray-50',
              config.borderColor
            )}
          >
            <Icon className={cn('h-5 w-5 shrink-0', config.textColor)} />
            <div>
              <div className={cn('text-lg font-bold leading-tight', config.textColor)}>{count}</div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
                {config.label}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
