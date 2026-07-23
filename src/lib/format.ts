export function timeAgo(isoDate: string): string {
  const now = Date.now()
  const then = new Date(isoDate).getTime()
  const diffMs = Math.max(0, now - then)
  const diffMin = Math.round(diffMs / 60000)

  if (diffMin < 1) return "reçu à l'instant"
  if (diffMin < 60) return `reçu il y a ${diffMin} min`
  const diffH = Math.round(diffMin / 60)
  if (diffH < 24) return `reçu il y a ${diffH} h`
  const diffD = Math.round(diffH / 24)
  return `reçu il y a ${diffD} j`
}

export function formatDate(isoDate: string): string {
  const d = new Date(isoDate)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
