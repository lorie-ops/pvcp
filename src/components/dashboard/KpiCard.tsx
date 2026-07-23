import { TrendingDown, CheckCircle2, AlertCircle } from 'lucide-react'
import type { KpiData } from '@/data/mockDashboard'
import { cn } from '@/lib/utils'

export default function KpiCard({ kpi }: { kpi: KpiData }) {
  const isGood = kpi.status === 'good'
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
          {kpi.label}
        </span>
        {isGood ? (
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
        ) : (
          <AlertCircle className="h-4 w-4 text-orange-500" />
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className={cn('text-2xl font-bold', isGood ? 'text-emerald-600' : 'text-orange-600')}>
          {kpi.value}
        </span>
        {kpi.trend === 'down' && <TrendingDown className="mb-1 h-4 w-4 text-emerald-500" />}
      </div>
      <span className="text-xs text-gray-400">{kpi.target}</span>
    </div>
  )
}
