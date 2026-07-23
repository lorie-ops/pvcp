import { create } from 'zustand'
import type { Review, Language, Status } from '../types/iris'
import { MOCK_REVIEWS } from '../data/mockReviews'

interface IrisStore {
  reviews: Review[]
  selectedReview: Review | null
  activeLanguage: Language | 'ALL'
  isDetailPanelOpen: boolean
  isSidebarExpanded: boolean
  collapsedPriorities: Set<string>
  selectedIds: Set<string>

  setSelectedReview: (review: Review | null) => void
  setActiveLanguage: (lang: Language | 'ALL') => void
  setDetailPanelOpen: (open: boolean) => void
  toggleSidebar: () => void
  togglePrioritySection: (priority: string) => void
  updateReviewStatus: (id: string, status: Status, response?: string) => void
  toggleIdSelection: (id: string) => void
  setIdsSelected: (ids: string[], selected: boolean) => void
  clearSelection: () => void
  bulkValidateAndPublish: (ids: string[]) => void
}

export const useIrisStore = create<IrisStore>((set) => ({
  reviews: MOCK_REVIEWS,
  selectedReview: null,
  activeLanguage: 'FR',
  isDetailPanelOpen: false,
  isSidebarExpanded: true,
  collapsedPriorities: new Set(['simple']), // simple collapsed by default
  selectedIds: new Set(),

  setSelectedReview: (review) => set({
    selectedReview: review,
    isDetailPanelOpen: review !== null,
  }),
  setActiveLanguage: (lang) => set({ activeLanguage: lang }),
  setDetailPanelOpen: (open) => set((s) => ({
    isDetailPanelOpen: open,
    selectedReview: open ? s.selectedReview : null,
  })),
  toggleSidebar: () => set((s) => ({ isSidebarExpanded: !s.isSidebarExpanded })),
  togglePrioritySection: (priority) => set((s) => {
    const next = new Set(s.collapsedPriorities)
    if (next.has(priority)) next.delete(priority)
    else next.add(priority)
    return { collapsedPriorities: next }
  }),
  updateReviewStatus: (id, status, response) => set((s) => ({
    reviews: s.reviews.map((r) =>
      r.id === id
        ? {
            ...r,
            status,
            publishedResponse: response ?? r.publishedResponse,
            modifiedByAgent: response ? response !== r.aiResponse : r.modifiedByAgent,
          }
        : r
    ),
  })),
  toggleIdSelection: (id) => set((s) => {
    const next = new Set(s.selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return { selectedIds: next }
  }),
  setIdsSelected: (ids, selected) => set((s) => {
    const next = new Set(s.selectedIds)
    for (const id of ids) {
      if (selected) next.add(id)
      else next.delete(id)
    }
    return { selectedIds: next }
  }),
  clearSelection: () => set({ selectedIds: new Set() }),
  bulkValidateAndPublish: (ids) => set((s) => {
    const idSet = new Set(ids)
    return {
      reviews: s.reviews.map((r) =>
        idSet.has(r.id) && r.aiResponse
          ? { ...r, status: 'valide-publie' as const, publishedResponse: r.aiResponse }
          : r
      ),
      selectedIds: new Set(),
    }
  }),
}))
