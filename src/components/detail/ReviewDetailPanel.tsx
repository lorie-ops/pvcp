import { useEffect, useState } from 'react'
import { ArrowLeft, ExternalLink, AlertTriangle, Flag, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { useIrisStore } from '@/store/useIrisStore'
import type { Review } from '@/types/iris'
import { PRIORITY_CONFIG } from '@/types/iris'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import BrandBadge from '@/components/shared/BrandBadge'
import StarRating from '@/components/shared/StarRating'
import StatusBadge from '@/components/shared/StatusBadge'
import { platformLabel } from '@/components/shared/PlatformIcon'
import { formatDate } from '@/lib/format'
import { highlightKeywords } from '@/lib/highlightKeywords'
import { cn } from '@/lib/utils'
import EscalationDialog from './EscalationDialog'

export default function ReviewDetailPanel() {
  const isOpen = useIrisStore((s) => s.isDetailPanelOpen)
  const selectedReview = useIrisStore((s) => s.selectedReview)
  const setDetailPanelOpen = useIrisStore((s) => s.setDetailPanelOpen)
  const updateReviewStatus = useIrisStore((s) => s.updateReviewStatus)

  const [displayedReview, setDisplayedReview] = useState<Review | null>(null)
  const [draftResponse, setDraftResponse] = useState('')
  const [isPublishing, setIsPublishing] = useState(false)
  const [isEscalationOpen, setIsEscalationOpen] = useState(false)

  useEffect(() => {
    if (selectedReview) {
      setDisplayedReview(selectedReview)
      setDraftResponse(selectedReview.aiResponse ?? '')
      setIsPublishing(false)
    }
  }, [selectedReview])

  const handleClose = () => setDetailPanelOpen(false)

  if (!displayedReview) return null

  const review = displayedReview
  const config = PRIORITY_CONFIG[review.priority]
  const isCritique = review.priority === 'critique'
  const isReadOnly = review.status === 'valide-publie' || review.status === 'auto-publie'
  const wasModified = draftResponse !== (review.aiResponse ?? '')

  const handlePublish = () => {
    setIsPublishing(true)
    setTimeout(() => {
      updateReviewStatus(review.id, 'valide-publie', draftResponse)
      toast.success(`Réponse publiée sur ${platformLabel(review.platform)}`)
      setIsPublishing(false)
      handleClose()
    }, 2000)
  }

  const handleEscalate = () => {
    updateReviewStatus(review.id, 'escalade')
  }

  const handleFlag = () => {
    updateReviewStatus(review.id, 'a-signaler')
    toast.success('Avis signalé')
    handleClose()
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
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-xs font-semibold',
                config.bgColor,
                config.textColor,
                'border',
                config.borderColor
              )}
            >
              {config.label}
            </span>
            <StatusBadge status={review.status} />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Voir sur {platformLabel(review.platform)}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          {/* Review info block */}
          <div className="mb-5">
            <div className="mb-1 flex items-center gap-2">
              <h2 className="text-base font-semibold text-gray-900">{review.siteName}</h2>
              <BrandBadge brand={review.brand} />
            </div>
            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
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
              {isCritique
                ? highlightKeywords(review.reviewText).map((part) =>
                    typeof part === 'string' ? (
                      part
                    ) : (
                      <mark key={part.key} className="rounded bg-red-100 px-0.5 font-semibold not-italic text-red-700">
                        {part.text}
                      </mark>
                    )
                  )
                : review.reviewText}
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

          {/* Critique lockout */}
          {isCritique && !isReadOnly && (
            <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Aucune réponse automatique autorisée pour ce niveau de priorité</span>
              </div>
            </div>
          )}

          {/* AI response editor */}
          {!isCritique && !isReadOnly && (
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">Réponse suggérée par Iris</h3>
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                  IA
                </span>
              </div>

              <div className="mb-2 flex flex-wrap gap-1.5">
                <span className="rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-500">
                  FAQ PVCP
                </span>
                <span className="rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-500">
                  Fiche parc {review.siteName}
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
            {isCritique ? (
              <>
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => setIsEscalationOpen(true)}
                >
                  ↗ Escalader à Vanessa Klein
                </Button>
                <Button variant="outline" className="w-full" onClick={handleFlag}>
                  <Flag className="h-3.5 w-3.5" />
                  Signaler l'avis
                </Button>
              </>
            ) : (
              <>
                <Button className="w-full" disabled={isPublishing} onClick={handlePublish}>
                  {isPublishing ? 'Publication en cours...' : '✓ Valider & Publier'}
                </Button>
                <Button
                  variant="outlineDestructive"
                  className="w-full"
                  onClick={() => setIsEscalationOpen(true)}
                >
                  Escalader
                </Button>
                <button
                  onClick={handleFlag}
                  className="flex w-full items-center justify-center gap-1.5 py-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  <Flag className="h-3.5 w-3.5" />
                  À signaler
                </button>
              </>
            )}
          </div>
        )}

        {isReadOnly && (
          <div className="shrink-0 border-t border-gray-200 px-5 py-4">
            <a
              href={review.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-1.5 rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Voir sur {platformLabel(review.platform)}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </div>

      <EscalationDialog
        open={isEscalationOpen}
        onOpenChange={setIsEscalationOpen}
        onConfirm={() => {
          handleEscalate()
          handleClose()
        }}
      />
    </>
  )
}
