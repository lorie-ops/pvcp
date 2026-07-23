import { Eye, CheckCircle, Zap, AlertTriangle, Flag, Clock } from 'lucide-react'
import type { Status } from '@/types/iris'
import { cn } from '@/lib/utils'

const STATUS_CONFIG: Record<Status, { label: string; className: string; Icon: typeof Eye }> = {
  'a-relire': { label: 'À relire', className: 'border-amber-300 text-amber-700 bg-amber-50', Icon: Eye },
  'en-traitement': { label: 'En traitement', className: 'border-blue-300 text-blue-700 bg-blue-50', Icon: Clock },
  'valide-publie': { label: 'Traité', className: 'border-green-300 text-green-700 bg-green-50', Icon: CheckCircle },
  'auto-publie': { label: 'Auto-publié', className: 'border-emerald-300 text-emerald-700 bg-emerald-50', Icon: Zap },
  escalade: { label: 'Escaladé', className: 'border-red-300 text-red-700 bg-red-50', Icon: AlertTriangle },
  'a-signaler': { label: 'À signaler', className: 'border-gray-300 text-gray-600 bg-gray-50', Icon: Flag },
}

export default function StatusBadge({ status, className }: { status: Status; className?: string }) {
  const config = STATUS_CONFIG[status]
  const Icon = config.Icon
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  )
}

export { STATUS_CONFIG }
