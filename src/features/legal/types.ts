import type { BilingualText, Lang } from '../../shared/types'

export interface LegalSection {
  /** Stable URL-safe identifier, shared across both languages. */
  id: string
  heading: BilingualText
  /** Markdown text. Do not render untrusted raw HTML. */
  body: BilingualText
}

export interface LegalPageProps {
  title: BilingualText
  /** ISO date-only value: YYYY-MM-DD. */
  updatedAt: string
  sections: LegalSection[]
  lang: Lang
  onLangChange: (lang: Lang) => void
}
