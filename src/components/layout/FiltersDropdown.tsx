import { Filter } from 'lucide-react'
import { useIrisStore } from '@/store/useIrisStore'
import type { Brand, Platform } from '@/types/iris'
import { BRAND_LABELS } from '@/types/iris'
import { PLATFORM_CONFIG } from '@/components/shared/PlatformIcon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const BRAND_OPTIONS: Brand[] = ['PV', 'CP']
const PLATFORM_OPTIONS: Platform[] = ['google', 'tripadvisor', 'booking', 'trustpilot', 'holidaycheck']

export default function FiltersDropdown() {
  const activeBrandFilters = useIrisStore((s) => s.activeBrandFilters)
  const activePlatformFilters = useIrisStore((s) => s.activePlatformFilters)
  const toggleBrandFilter = useIrisStore((s) => s.toggleBrandFilter)
  const togglePlatformFilter = useIrisStore((s) => s.togglePlatformFilter)
  const clearFilters = useIrisStore((s) => s.clearFilters)

  const activeCount = activeBrandFilters.size + activePlatformFilters.size

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'relative flex h-8 items-center gap-1.5 rounded-md border px-3 text-sm hover:bg-gray-50',
            activeCount > 0 ? 'border-indigo-300 text-indigo-700 bg-indigo-50' : 'border-gray-300 text-gray-600'
          )}
        >
          <Filter className="h-3.5 w-3.5" />
          Filtres
          {activeCount > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-3">
        <div className="mb-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Marque</p>
          <div className="space-y-1.5">
            {BRAND_OPTIONS.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={activeBrandFilters.has(brand)}
                  onChange={() => toggleBrandFilter(brand)}
                  className="h-4 w-4 accent-indigo-600"
                />
                {BRAND_LABELS[brand]}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Plateforme</p>
          <div className="space-y-1.5">
            {PLATFORM_OPTIONS.map((platform) => (
              <label
                key={platform}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={activePlatformFilters.has(platform)}
                  onChange={() => togglePlatformFilter(platform)}
                  className="h-4 w-4 accent-indigo-600"
                />
                <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', PLATFORM_CONFIG[platform].bg)} />
                {PLATFORM_CONFIG[platform].label}
              </label>
            ))}
          </div>
        </div>

        {activeCount > 0 && (
          <>
            <DropdownMenuSeparator />
            <button
              onClick={clearFilters}
              className="w-full pt-1 text-left text-xs font-medium text-indigo-600 hover:text-indigo-700"
            >
              Réinitialiser les filtres
            </button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
