import { useState } from 'react'
import { toast } from 'sonner'
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

interface EscalationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export default function EscalationDialog({ open, onOpenChange, onConfirm }: EscalationDialogProps) {
  const [note, setNote] = useState('')

  const handleSend = () => {
    onConfirm()
    toast.success('Vanessa Klein a été alertée')
    setNote('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Escalader cet avis</DialogTitle>
          <DialogDescription>
            Ajoutez une note de contexte pour Vanessa Klein avant l'envoi.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note de contexte..."
          rows={5}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button onClick={handleSend}>Envoyer à Vanessa Klein</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
