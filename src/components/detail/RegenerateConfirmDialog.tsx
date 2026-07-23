import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface RegenerateConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export default function RegenerateConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: RegenerateConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Demander une nouvelle suggestion ?</DialogTitle>
          <DialogDescription>
            Le texte actuel dans l'éditeur sera remplacé par une nouvelle proposition d'Iris.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            Nouvelle suggestion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
