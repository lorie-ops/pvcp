import type { Brand } from '@/types/iris'
import { cn } from '@/lib/utils'

const BRAND_CONFIG: Record<Brand, { label: string; className: string }> = {
  PV: { label: 'PV', className: 'bg-blue-100 text-blue-700' },
  CP: { label: 'CP', className: 'bg-indigo-100 text-indigo-700' },
}

export default function BrandBadge({ brand }: { brand: Brand }) {
  const config = BRAND_CONFIG[brand]
  return (
    <span className={cn('inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-semibold', config.className)}>
      {config.label}
    </span>
  )
}
