const CRITICAL_KEYWORDS = [
  'cafards', 'malades', 'chute grave', 'blessé', 'blessée', 'injoignable', 'scandaleux',
  'journalist', 'accessibilité', 'anwalt', 'verletzt', 'stiche', 'platzwunde',
  'sécurité', 'accident', 'juridique', 'avocat', 'krankenhaus', 'hospital',
]

export function highlightKeywords(text: string): (string | { key: string; text: string })[] {
  const pattern = new RegExp(`(${CRITICAL_KEYWORDS.join('|')})`, 'gi')
  const parts = text.split(pattern)
  return parts.map((part, i) => {
    if (CRITICAL_KEYWORDS.some((kw) => kw.toLowerCase() === part.toLowerCase())) {
      return { key: `${i}-${part}`, text: part }
    }
    return part
  })
}
