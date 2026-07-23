import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Inbox } from 'lucide-react'
import { useIrisStore } from '@/store/useIrisStore'
import type { Priority } from '@/types/iris'
import PriorityCounters from '@/components/feed/PriorityCounters'
import PrioritySection from '@/components/feed/PrioritySection'

const SECTION_ORDER: Priority[] = ['critique', 'sensible', 'standard', 'simple']

export default function FeedPage() {
  const reviews = useIrisStore((s) => s.reviews)
  const activeLanguage = useIrisStore((s) => s.activeLanguage)
  const activeBrandFilters = useIrisStore((s) => s.activeBrandFilters)
  const activePlatformFilters = useIrisStore((s) => s.activePlatformFilters)
  const location = useLocation()

  const scope = location.pathname.endsWith('/signales')
    ? 'signales'
    : location.pathname.endsWith('/archive')
      ? 'archive'
      : 'queue'

  const scopedReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (activeLanguage !== 'ALL' && r.language !== activeLanguage) return false
      if (activeBrandFilters.size > 0 && !activeBrandFilters.has(r.brand)) return false
      if (activePlatformFilters.size > 0 && !activePlatformFilters.has(r.platform)) return false
      if (scope === 'signales') return r.status === 'a-signaler'
      if (scope === 'archive') return r.status === 'valide-publie' || r.status === 'auto-publie'
      return r.status !== 'a-signaler'
    })
  }, [reviews, activeLanguage, activeBrandFilters, activePlatformFilters, scope])

  const reviewsByPriority = useMemo(() => {
    const map: Record<Priority, typeof reviews> = {
      critique: [],
      sensible: [],
      standard: [],
      simple: [],
      'a-moderer': [],
    }
    for (const r of scopedReviews) {
      map[r.priority]?.push(r)
    }
    return map
  }, [scopedReviews])

  const scopeTitle =
    scope === 'signales' ? 'À signaler' : scope === 'archive' ? 'Archive' : "File d'attente"

  return (
    <div className="h-full overflow-y-auto px-6 py-5">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">{scopeTitle}</h1>
      </div>

      <PriorityCounters reviews={scopedReviews} />

      {scopedReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white py-16 text-center">
          <Inbox className="mb-3 h-8 w-8 text-gray-300" />
          <p className="text-sm font-medium text-gray-500">Aucun avis dans cette vue</p>
          <p className="text-xs text-gray-400">Changez de langue ou de filtre pour voir plus d'avis.</p>
        </div>
      ) : (
        SECTION_ORDER.map((priority) => (
          <PrioritySection key={priority} priority={priority} reviews={reviewsByPriority[priority]} />
        ))
      )}
    </div>
  )
}
