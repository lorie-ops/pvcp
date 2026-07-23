import { useMemo } from 'react'
import { Search, Filter, Bell } from 'lucide-react'
import { useIrisStore } from '@/store/useIrisStore'
import type { Language } from '@/types/iris'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const LANGUAGE_TABS: { key: Language; label: string }[] = [
  { key: 'FR', label: 'FR' },
  { key: 'EN', label: 'EN' },
  { key: 'DE', label: 'DE' },
  { key: 'NL', label: 'NL' },
  { key: 'OTHER', label: 'Autres' },
]

export default function TopBar() {
  const reviews = useIrisStore((s) => s.reviews)
  const activeLanguage = useIrisStore((s) => s.activeLanguage)
  const setActiveLanguage = useIrisStore((s) => s.setActiveLanguage)

  const tabStats = useMemo(() => {
    const stats: Record<Language, { count: number; dot: 'red' | 'orange' | null }> = {
      FR: { count: 0, dot: null },
      EN: { count: 0, dot: null },
      DE: { count: 0, dot: null },
      NL: { count: 0, dot: null },
      OTHER: { count: 0, dot: null },
    }
    for (const r of reviews) {
      const s = stats[r.language]
      if (r.status === 'a-relire') s.count += 1
      if (r.priority === 'critique' && r.status === 'a-relire') s.dot = 'red'
      else if (r.priority === 'sensible' && r.status === 'a-relire' && s.dot !== 'red') s.dot = 'orange'
    }
    return stats
  }, [reviews])

  const criticalUnseenCount = useMemo(
    () => reviews.filter((r) => r.priority === 'critique' && r.status === 'a-relire').length,
    [reviews]
  )

  return (
    <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4">
      <div className="flex items-center gap-1">
        {LANGUAGE_TABS.map((tab) => {
          const isActive = activeLanguage === tab.key
          const stat = tabStats[tab.key]
          return (
            <button
              key={tab.key}
              onClick={() => setActiveLanguage(tab.key)}
              className={cn(
                'relative flex items-center gap-1.5 rounded-t-md border-b-2 px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'border-indigo-600 bg-white font-bold text-indigo-600'
                  : 'border-transparent text-gray-500 hover:bg-gray-100'
              )}
            >
              <span>{tab.label}</span>
              <span className={cn('text-xs', isActive ? 'text-indigo-600' : 'text-gray-400')}>
                {stat.count}
              </span>
              {stat.dot && (
                <span
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    stat.dot === 'red' ? 'bg-red-500' : 'bg-orange-500'
                  )}
                />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-[280px]">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="h-8 w-full rounded-md border border-gray-300 bg-gray-50 pl-8 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={() => toast('Filtres — à venir')}
          className="flex h-8 items-center gap-1.5 rounded-md border border-gray-300 px-3 text-sm text-gray-600 hover:bg-gray-50"
        >
          <Filter className="h-3.5 w-3.5" />
          Filtres
        </button>

        <button
          onClick={() => toast(`${criticalUnseenCount} avis critiques à traiter`)}
          className="relative flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {criticalUnseenCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {criticalUnseenCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
