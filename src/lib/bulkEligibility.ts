import type { Review } from '@/types/iris'

/**
 * A review can be bulk-validated & published only when it already has an
 * AI-suggested response awaiting a decision — critical reviews never get one
 * (human treatment is mandatory) and simple ones are already auto-published.
 */
export function isBulkEligible(review: Review): boolean {
  return (
    (review.status === 'a-relire' || review.status === 'en-traitement') &&
    review.priority !== 'critique' &&
    Boolean(review.aiResponse)
  )
}
