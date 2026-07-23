import { toast } from 'sonner'
import { AlertTriangle } from 'lucide-react'
import { PENDING_48H } from '@/data/mockDashboard'
import { Button } from '@/components/ui/button'

export default function PendingReviewsAlert() {
  return (
    <div className="rounded-lg border border-red-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <h3 className="text-sm font-semibold text-gray-900">Avis en attente depuis +48h</h3>
      </div>
      <div className="space-y-2">
        {PENDING_48H.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
          >
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-gray-900">{item.siteName}</div>
              <div className="text-xs text-gray-400">{item.platform}</div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700">
                {item.hoursWaiting}h+
              </span>
              <Button size="sm" variant="outline" onClick={() => toast.success(`${item.siteName} assigné`)}>
                Assigner
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
