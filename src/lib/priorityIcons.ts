import { Clock, AlertTriangle, Target, CheckCircle2 } from 'lucide-react'
import type { Priority } from '@/types/iris'

export const PRIORITY_ICONS: Record<Priority, typeof Clock> = {
  critique: Clock,
  sensible: AlertTriangle,
  standard: Target,
  simple: CheckCircle2,
  'a-moderer': AlertTriangle,
}
