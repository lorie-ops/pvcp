import type { Platform } from '@/types/iris'
import { cn } from '@/lib/utils'

export const PLATFORM_CONFIG: Record<Platform, { letter: string; bg: string; label: string }> = {
  google: { letter: 'G', bg: 'bg-blue-500', label: 'Google' },
  tripadvisor: { letter: 'T', bg: 'bg-green-500', label: 'TripAdvisor' },
  booking: { letter: 'B', bg: 'bg-blue-700', label: 'Booking' },
  trustpilot: { letter: 'TP', bg: 'bg-teal-600', label: 'Trustpilot' },
  holidaycheck: { letter: 'HC', bg: 'bg-orange-500', label: 'HolidayCheck' },
}

export function platformLabel(platform: Platform): string {
  return PLATFORM_CONFIG[platform].label
}

export default function PlatformIcon({ platform, className }: { platform: Platform; className?: string }) {
  const config = PLATFORM_CONFIG[platform]
  return (
    <div
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded font-bold text-white',
        config.bg,
        className
      )}
      title={config.label}
    >
      {config.letter}
    </div>
  )
}
