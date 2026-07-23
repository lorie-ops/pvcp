export interface KpiData {
  label: string
  value: string
  target: string
  status: 'good' | 'warning'
  trend?: 'up' | 'down'
}

export const KPI_DATA: KpiData[] = [
  { label: 'Avis en attente', value: '47', target: 'cible : <50', status: 'good' },
  { label: 'Délai moyen réponse', value: '18h', target: 'cible : <72h', status: 'good' },
  { label: "Taux d'acceptation IA", value: '73%', target: 'cible : ≥75%', status: 'warning' },
  { label: 'DMT moyenne', value: '6,2 min', target: 'baseline : 11,5 min', status: 'good', trend: 'down' },
]

export const PRIORITY_DISTRIBUTION = [
  { name: 'Critique', value: 3, color: '#ef4444' },
  { name: 'Sensible', value: 11, color: '#f97316' },
  { name: 'Standard', value: 28, color: '#f59e0b' },
  { name: 'Simple', value: 94, color: '#10b981' },
]

export interface PendingAlertReview {
  id: string
  siteName: string
  platform: string
  hoursWaiting: number
}

export const PENDING_48H: PendingAlertReview[] = [
  { id: 'alert-1', siteName: 'Villages Nature Paris', platform: 'TripAdvisor', hoursWaiting: 52 },
  { id: 'alert-2', siteName: 'Park De Haan', platform: 'Google', hoursWaiting: 61 },
  { id: 'alert-3', siteName: 'Sainte-Luce', platform: 'Booking', hoursWaiting: 49 },
]

export interface TeamMember {
  agent: string
  languages: string
  volume: number
  dmt: string
  aiRate: string
  modifiedRate: string
  flagged?: boolean
}

export const TEAM_PERFORMANCE: TeamMember[] = [
  { agent: 'Kensy Bellune', languages: 'FR EN', volume: 34, dmt: '5,8 min', aiRate: '79%', modifiedRate: '21%' },
  { agent: 'Gladys Guiovanna', languages: 'FR EN', volume: 31, dmt: '6,1 min', aiRate: '76%', modifiedRate: '24%' },
  { agent: 'Sascha Heckersbruch', languages: 'DE', volume: 18, dmt: '7,2 min', aiRate: '61%', modifiedRate: '39%', flagged: true },
  { agent: 'Regina Mann', languages: 'DE', volume: 15, dmt: '6,8 min', aiRate: '70%', modifiedRate: '30%' },
  { agent: 'Anneleen Mondelaers', languages: 'NL EN', volume: 22, dmt: '5,9 min', aiRate: '77%', modifiedRate: '23%' },
  { agent: 'Sylvie Vandevenne', languages: 'NL', volume: 14, dmt: '6,5 min', aiRate: '72%', modifiedRate: '28%' },
]
