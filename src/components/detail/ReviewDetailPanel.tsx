import { useEffect, useState } from 'react'
import { ArrowLeft, Flag, CheckCircle2, ChevronDown, Check, Users } from 'lucide-react'
import { toast } from 'sonner'
import { useIrisStore } from '@/store/useIrisStore'
import type { Language, Priority } from '@/types/iris'
import { PRIORITY_CONFIG, LANGUAGE_GROUP_LABELS } from '@/types/iris'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import BrandBadge from '@/components/shared/BrandBadge'
import StarRating from '@/components/shared/StarRating'
import StatusBadge from '@/components/shared/StatusBadge'
import ExpandableText from '@/components/shared/ExpandableText'
import { platformLabel } from '@/components/shared/PlatformIcon'
import { formatDate, formatDateTime } from '@/lib/format'
import { cn } from '@/lib/utils'
import RecategorizeDialog from './RecategorizeDialog'

const ALL_PRIORITIES: Priority[] = ['critique', 'sensible', 'standard', 'simple', 'a-moderer']
const LANGUAGE_GROUPS: Language[] = ['FR', 'EN', 'DE', 'NL', 'OTHER']

export default function ReviewDetailPanel() {
  const isOpen = useIrisStore((s) => s.isDetailPanelOpen)
  const selectedReview = useIrisStore((s) => s.selectedReview)
  const reviews = useIrisStore((s) => s.reviews)
  const setDetailPanelOpen = useIrisStore((s) => s.setDetailPanelOpen)
  const updateReviewStatus = useIrisStore((s) => s.updateReviewStatus)
  const recategorizePriority = useIrisStore((s) => s.recategorizePriority)
  const assignToGroup = useIrisStore((s) => s.assignToGroup)

  const [displayedReviewId, setDisplayedReviewId] = useState<string | null>(null)
  const [draftResponse, setDraftResponse] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)
  const [pendingPriority, setPendingPriority] = useState<Priority | null>(null)

  useEffect(() => {
    if (selectedReview) {
      setDisplayedReviewId(selectedReview.id)
      setDraftResponse(selectedReview.aiResponse ?? '')
      setIsPublishing(false)
    }
  }, [selectedReview])

  const handleClose = () => setDetailPanelOpen(false)

  // Read the live review from the store (not a stale snapshot) so in-place
  // edits like recategorization are reflected while the panel stays open.
  const review = reviews.find((r) => r.id === displayedReviewId) ?? null

  if (!review) return null

  const config = PRIORITY_CONFIG[review.priority]
  const isCritique = review.priority === 'critique'
  const isReadOnly = review.status === 'valide-publie' || review.status === 'auto-publie'
  const wasModified = draftResponse !== (review.aiResponse ?? '')
  const lastRecategorization = review.priorityChangeLog?.at(-1)
  const lastAssignment = review.assignmentLog?.at(-1)

  const handlePublish = () => {
    setIsPublishing(true)
    setTimeout(() => {
      updateReviewStatus(review.id, 'valide-publie', draftResponse)
      toast.success(`Réponse publiée sur ${platformLabel(review.platform)}`)
      setIsPublishing(false)
      handleClose()
    }, 2000)
  }

  const handleFlag = () => {
    updateReviewStatus(review.id, 'a-signaler')
    toast.success('Avis signalé')
    handleClose()
  }

  const handleAssignToGroup = (group: Language) => {
    assignToGroup(review.id, group)
    toast.success(`Assigné au ${LANGUAGE_GROUP_LABELS[group]} — membres notifiés`)
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        className={cn(
          'absolute inset-0 z-40 bg-black/20 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      />

      {/* Panel */}
      <div
        className={cn(
          'absolute right-0 top-0 z-50 flex h-full w-[480px] max-w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </button>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold border transition-colors hover:brightness-95',
                    config.bgColor,
                    config.textColor,
                    config.borderColor
                  )}
                >
                  {config.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {ALL_PRIORITIES.map((p) => (
                  <DropdownMenuItem
                    key={p}
                    onClick={() => {
                      if (p !== review.priority) setPendingPriority(p)
                    }}
                  >
                    <span className={cn('mr-2 h-2 w-2 shrink-0 rounded-full', PRIORITY_CONFIG[p].dotColor)} />
                    {PRIORITY_CONFIG[p].label}
                    {p === review.priority && <Check className="ml-auto h-3.5 w-3.5 text-indigo-600" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <StatusBadge status={review.status} />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {(lastRecategorization || lastAssignment) && (
            <div className="mb-3 space-y-1">
              {lastRecategorization && (
                <p className="text-xs text-gray-400">
                  Recatégorisé {PRIORITY_CONFIG[lastRecategorization.from].label} → {PRIORITY_CONFIG[lastRecategorization.to].label} le{' '}
                  {formatDateTime(lastRecategorization.at)} par {lastRecategorization.by}
                  {lastRecategorization.motif && <> — « {lastRecategorization.motif} »</>}
                </p>
              )}
              {lastAssignment && (
                <p className="text-xs text-gray-400">
                  Assigné au {LANGUAGE_GROUP_LABELS[lastAssignment.group]} le{' '}
                  {formatDateTime(lastAssignment.at)} par {lastAssignment.by}
                </p>
              )}
            </div>
          )}

          {/* Review info block */}
          <div className="mb-5">
            <div className="mb-1 flex items-center gap-2">
              <h2 className="text-base font-semibold text-gray-900">{review.siteName}</h2>
              <BrandBadge brand={review.brand} />
            </div>
            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
              <span className="font-medium text-gray-700">{review.authorName}</span>
              <span>·</span>
              <StarRating rating={review.rating} />
              <span>·</span>
              <span>{formatDate(review.reviewDate)}</span>
              <span>·</span>
              <span>{review.language}</span>
            </div>

            {review.tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {review.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <blockquote
              className={cn('rounded-r-md border-l-4 bg-gray-50 px-3 py-2.5 text-sm italic text-gray-700', config.borderColor)}
            >
              <ExpandableText>{review.reviewText}</ExpandableText>
            </blockquote>
          </div>

          {/* Read-only published response */}
          {isReadOnly && (
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">Réponse publiée</h3>
                <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                  <CheckCircle2 className="h-3 w-3" />
                  Publié le {formatDate(review.reviewDate)}
                </span>
                {review.modifiedByAgent && (
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                    Modifié par agent
                  </span>
                )}
              </div>
              <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2.5 text-sm text-gray-800">
                {review.publishedResponse}
              </div>
            </div>
          )}

          {/* AI response editor — available for every priority, including critique */}
          {!isReadOnly && (
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">Réponse suggérée par Iris</h3>
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                  IA
                </span>
              </div>

              <Textarea
                value={draftResponse}
                onChange={(e) => setDraftResponse(e.target.value)}
                rows={8}
                className="mb-1"
              />
              <div className="flex items-center justify-between text-xs">
                {wasModified ? (
                  <span className="font-medium text-indigo-600">Modifié</span>
                ) : (
                  <span />
                )}
                <span className="text-gray-400">{draftResponse.length} caractères</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {!isReadOnly && (
          <div className="shrink-0 space-y-2 border-t border-gray-200 px-5 py-4">
            <Button
              className="w-full"
              variant={isCritique ? 'destructive' : 'default'}
              disabled={isPublishing}
              onClick={handlePublish}
            >
              {isPublishing ? 'Publication en cours...' : '✓ Valider & Publier'}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Users className="h-3.5 w-3.5" />
                  Assigner à un groupe
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                {LANGUAGE_GROUPS.map((group) => (
                  <DropdownMenuItem key={group} onClick={() => handleAssignToGroup(group)}>
                    <span>{LANGUAGE_GROUP_LABELS[group]}</span>
                    {review.assignedGroup === group && (
                      <Check className="ml-auto h-3.5 w-3.5 text-indigo-600" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={handleFlag}
              className="flex w-full items-center justify-center gap-1.5 py-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <Flag className="h-3.5 w-3.5" />
              À signaler
            </button>
          </div>
        )}
      </div>

      {pendingPriority && (
        <RecategorizeDialog
          open={pendingPriority !== null}
          fromPriority={review.priority}
          toPriority={pendingPriority}
          onOpenChange={(open) => {
            if (!open) setPendingPriority(null)
          }}
          onConfirm={(motif) => {
            recategorizePriority(review.id, pendingPriority, motif)
            toast.success(`Priorité changée en ${PRIORITY_CONFIG[pendingPriority].label}`)
            setPendingPriority(null)
          }}
        />
      )}
    </>
  )
}
