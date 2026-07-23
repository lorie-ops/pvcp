export type Platform = 'google' | 'tripadvisor' | 'booking' | 'trustpilot' | 'holidaycheck'
export type Brand = 'PV' | 'CP'

export const BRAND_LABELS: Record<Brand, string> = {
  PV: 'Pierre & Vacances',
  CP: 'Center Parcs',
}
export type Language = 'FR' | 'EN' | 'DE' | 'NL' | 'OTHER'
export type Priority = 'critique' | 'sensible' | 'standard' | 'simple' | 'a-moderer'
export type Status = 'a-relire' | 'en-traitement' | 'valide-publie' |
                     'auto-publie' | 'escalade' | 'a-signaler'

export interface Review {
  id: string
  platform: Platform
  brand: Brand
  siteName: string
  rating: number
  reviewText: string
  reviewDate: string
  receivedAt: string
  language: Language
  priority: Priority
  status: Status
  aiResponse?: string
  publishedResponse?: string
  modifiedByAgent: boolean
  tags: string[]
  sourceUrl: string
}

export const PRIORITY_CONFIG: Record<Priority, {
  label: string
  color: string
  bgColor: string
  borderColor: string
  textColor: string
  dotColor: string
  description: string
  canAutoPublish: boolean
}> = {
  critique: {
    label: 'Critique',
    color: 'red',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    textColor: 'text-red-700',
    dotColor: 'bg-red-500',
    description: 'Traitement humain obligatoire · aucune réponse automatique',
    canAutoPublish: false,
  },
  sensible: {
    label: 'Sensible',
    color: 'orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-300',
    textColor: 'text-orange-700',
    dotColor: 'bg-orange-500',
    description: 'Validation humaine requise · réponse IA proposée',
    canAutoPublish: false,
  },
  standard: {
    label: 'Standard',
    color: 'amber',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-700',
    dotColor: 'bg-amber-500',
    description: 'Réponse IA à valider et publier',
    canAutoPublish: false,
  },
  simple: {
    label: 'Simple',
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    textColor: 'text-emerald-700',
    dotColor: 'bg-emerald-500',
    description: 'Auto-publiés · consultables en lecture seule',
    canAutoPublish: true,
  },
  'a-moderer': {
    label: 'À modérer',
    color: 'gray',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-300',
    textColor: 'text-gray-600',
    dotColor: 'bg-gray-400',
    description: 'Signalement recommandé sur la plateforme',
    canAutoPublish: false,
  },
}
