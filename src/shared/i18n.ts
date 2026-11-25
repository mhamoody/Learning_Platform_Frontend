import type { BilingualText, Lang } from './types'

export function text(value: BilingualText, lang: Lang): string {
  return value[lang]
}

export function direction(lang: Lang): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr'
}
