import type { BilingualText } from '../../shared/types'
import type { LegalSection } from './types'

export const legalTitles = {
  terms: { en: 'Terms — placeholder', ar: 'الشروط — محتوى تجريبي' },
  privacy: { en: 'Privacy — placeholder', ar: 'الخصوصية — محتوى تجريبي' },
  refund: { en: 'Refund — placeholder', ar: 'الاسترداد — محتوى تجريبي' },
} satisfies Record<string, BilingualText>

export type LegalDocumentType = keyof typeof legalTitles

export const sampleUpdatedAt = '2026-11-25'

// Generic layout samples, not real legal policies.
export const sampleSections: LegalSection[] = Array.from({ length: 6 }, (_, index) => ({
  id: `section-${index + 1}`,
  heading: { en: `Sample section ${index + 1}`, ar: `قسم تجريبي ${index + 1}` },
  body: {
    en: '**Placeholder text** for checking the page layout. Approved policy content will be supplied later.\n\n- First sample point.\n- Second sample point.',
    ar: '**نص تجريبي** لاختبار تنسيق الصفحة. سيتم توفير نص السياسة المعتمد لاحقًا.\n\n- النقطة التجريبية الأولى.\n- النقطة التجريبية الثانية.',
  },
}))
