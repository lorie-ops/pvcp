import type { Language } from '@/types/iris'

/**
 * There is no live model behind this POC, so "regenerating" a suggestion
 * swaps the opening and closing sentence for an alternate phrasing in the
 * same language while keeping the substantive middle (the facts specific
 * to the review) untouched — enough to feel like a fresh attempt without
 * fabricating new claims about the review.
 */
const OPENERS: Record<'FR' | 'EN' | 'DE' | 'NL', string[]> = {
  FR: [
    'Nous vous remercions sincèrement pour ce retour.',
    'Nous sommes désolés d\'apprendre cette expérience.',
    'Merci d\'avoir pris le temps de partager votre ressenti.',
  ],
  EN: [
    'Thank you for taking the time to share this feedback.',
    'We\'re sorry to hear about your experience.',
    'We appreciate you bringing this to our attention.',
  ],
  DE: [
    'Vielen Dank, dass Sie sich die Zeit genommen haben, uns dies mitzuteilen.',
    'Es tut uns leid, von dieser Erfahrung zu hören.',
    'Wir bedanken uns herzlich für Ihre Rückmeldung.',
  ],
  NL: [
    'Hartelijk dank voor het delen van uw ervaring.',
    'Het spijt ons te horen wat u heeft meegemaakt.',
    'We waarderen het dat u de tijd heeft genomen om dit te melden.',
  ],
}

const CLOSERS: Record<'FR' | 'EN' | 'DE' | 'NL', string[]> = {
  FR: [
    'Nous restons à votre disposition pour toute question.',
    'N\'hésitez pas à nous contacter directement pour un suivi personnalisé.',
    'Au plaisir de vous accueillir à nouveau.',
  ],
  EN: [
    'Please don\'t hesitate to reach out directly for further assistance.',
    'We remain at your disposal for any follow-up.',
    'We hope to welcome you again soon.',
  ],
  DE: [
    'Bitte zögern Sie nicht, uns direkt zu kontaktieren.',
    'Wir stehen Ihnen für weitere Fragen jederzeit zur Verfügung.',
    'Wir hoffen, Sie bald wieder bei uns begrüßen zu dürfen.',
  ],
  NL: [
    'Aarzel niet om rechtstreeks contact met ons op te nemen.',
    'We staan u graag verder te woord.',
    'We hopen u snel weer te mogen verwelkomen.',
  ],
}

function poolFor(language: Language, table: Record<'FR' | 'EN' | 'DE' | 'NL', string[]>): string[] {
  return table[language as 'FR' | 'EN' | 'DE' | 'NL'] ?? table.EN
}

function pickRandom(options: string[], exclude?: string): string {
  const filtered = exclude ? options.filter((o) => o !== exclude) : options
  const pool = filtered.length > 0 ? filtered : options
  return pool[Math.floor(Math.random() * pool.length)]
}

export function regenerateResponse(text: string, language: Language): string {
  const sentences = text.trim().split(/(?<=[.!?])\s+/).filter(Boolean)
  if (sentences.length === 0) return text

  const newOpener = pickRandom(poolFor(language, OPENERS), sentences[0])

  if (sentences.length === 1) {
    return `${newOpener} ${sentences[0]}`
  }

  const newCloser = pickRandom(poolFor(language, CLOSERS), sentences[sentences.length - 1])
  const middle = sentences.slice(1, -1)
  return [newOpener, ...middle, newCloser].join(' ')
}
