import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { Priority } from '@/types/iris'
import { PRIORITY_CONFIG } from '@/types/iris'
import { cn } from '@/lib/utils'

interface RecategorizeDialogProps {
  open: boolean
  fromPriority: Priority
  toPriority: Priority
  onOpenChange: (open: boolean) => void
  onConfirm: (motif?: string) => void
}

export default function RecategorizeDialog({
  open,
  fromPriority,
  toPriority,
  onOpenChange,
  onConfirm,
}: RecategorizeDialogProps) {
  const [motif, setMotif] = useState('')

  const handleConfirm = () => {
    onConfirm(motif)
    setMotif('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Recatégoriser cet avis</DialogTitle>
          <DialogDescription>
            <span className="inline-flex items-center gap-1.5">
              <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', PRIORITY_CONFIG[fromPriority].bgColor, PRIORITY_CONFIG[fromPriority].textColor)}>
                {PRIORITY_CONFIG[fromPriority].label}
              </span>
              →
              <span className={cn('rounded-full px-2 py-0.5 text-xs font-semibold', PRIORITY_CONFIG[toPriority].bgColor, PRIORITY_CONFIG[toPriority].textColor)}>
                {PRIORITY_CONFIG[toPriority].label}
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>
        <label className="mb-1.5 block text-xs font-medium text-gray-600">
          Motif (optionnel)
        </label>
        <Textarea
          value={motif}
          onChange={(e) => setMotif(e.target.value)}
          placeholder="Pourquoi cette correction ?"
          rows={3}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button onClick={handleConfirm}>Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
