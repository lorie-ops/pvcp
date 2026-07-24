import { useState } from 'react'
import { toast } from 'sonner'
import { X } from 'lucide-react'
import { useIrisStore } from '@/store/useIrisStore'
import { Button } from '@/components/ui/button'

export default function BulkActionBar() {
  const selectedIds = useIrisStore((s) => s.selectedIds)
  const clearSelection = useIrisStore((s) => s.clearSelection)
  const bulkValidateAndPublish = useIrisStore((s) => s.bulkValidateAndPublish)
  const [isPublishing, setIsPublishing] = useState(false)

  const count = selectedIds.size
  if (count === 0) return null

  const handleBulkPublish = () => {
    setIsPublishing(true)
    const ids = Array.from(selectedIds)
    setTimeout(() => {
      bulkValidateAndPublish(ids)
      toast.success(`${ids.length} avis validé${ids.length > 1 ? 's' : ''} et publié${ids.length > 1 ? 's' : ''}`)
      setIsPublishing(false)
    }, 1200)
  }

  return (
    <div className="sticky bottom-4 z-10 mt-2 flex items-center justify-between rounded-lg border border-indigo-200 bg-indigo-600 px-4 py-3 text-white shadow-lg">
      <div className="flex items-center gap-3">
        <button
          onClick={clearSelection}
          className="flex h-6 w-6 items-center justify-center rounded-full text-indigo-200 hover:bg-indigo-500 hover:text-white"
          aria-label="Désélectionner tout"
          disabled={isPublishing}
        >
          <X className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">
          {count} avis sélectionné{count > 1 ? 's' : ''}
        </span>
      </div>
      <Button
        onClick={handleBulkPublish}
        disabled={isPublishing}
        className="bg-white text-indigo-700 hover:bg-indigo-50"
      >
        {isPublishing ? 'Publication en cours...' : `✓ Valider & Publier (${count})`}
      </Button>
    </div>
  )
}
