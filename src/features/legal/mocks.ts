
import type { BilingualText } from '../../shared/types'
import type { LegalSection } from './types'

export const legalTitles = {
  terms: {
    en: 'Terms of Service',
    ar: 'شروط الخدمة',
  },
  privacy: {
    en: 'Privacy Policy',
    ar: 'سياسة الخصوصية',
  },
  refund: {
    en: 'Refund Policy',
    ar: 'سياسة الاسترداد',
  },
} satisfies Record<string, BilingualText>

export type LegalDocumentType = keyof typeof legalTitles

export const sampleUpdatedAt = '2026-11-25'

const placeholderBody: BilingualText = {
  en: `This is **placeholder text**. The company will provide the real legal text later. It is here only to show spacing, line length and how a section reads on different screens.

A second paragraph shows the gap between paragraphs and how longer content wraps.`,

  ar: `هذا **نص مؤقت**. ستقدم الشركة النص القانوني الفعلي لاحقًا. الغرض منه عرض المسافات وطول السطر وشكل القسم على الشاشات المختلفة.

توضح الفقرة الثانية المسافة بين الفقرات وكيفية التفاف المحتوى الأطول.`,
}

const placeholderList: BilingualText = {
  en: `- Sample list item one
- Sample list item two
- Sample list item three`,

  ar: `- عنصر قائمة تجريبي أول
- عنصر قائمة تجريبي ثانٍ
- عنصر قائمة تجريبي ثالث`,
}

function createSection(
  id: string,
  heading: BilingualText,
  withList = false,
): LegalSection {
  return {
    id,
    heading,
    body: withList
      ? {
          en: `${placeholderBody.en}\n\n${placeholderList.en}`,
          ar: `${placeholderBody.ar}\n\n${placeholderList.ar}`,
        }
      : placeholderBody,
  }
}

// Terms of Service
export const termsSections: LegalSection[] = [
  createSection('intro', {
    en: 'Introduction',
    ar: 'مقدمة',
  }),

  createSection('accounts', {
    en: 'Your account',
    ar: 'حسابك',
  }, true),

  createSection('payments', {
    en: 'Payments',
    ar: 'المدفوعات',
  }),

  createSection('use', {
    en: 'Acceptable use',
    ar: 'الاستخدام المقبول',
  }, true),

  createSection('liability', {
    en: 'Liability',
    ar: 'المسؤولية',
  }),

  createSection('contact', {
    en: 'Contact us',
    ar: 'تواصل معنا',
  }, true),
]

// Privacy Policy
export const privacySections: LegalSection[] = [
  createSection('intro', {
    en: 'Introduction',
    ar: 'مقدمة',
  }),

  createSection('collect', {
    en: 'Data we collect',
    ar: 'البيانات التي نجمعها',
  }, true),

  createSection('how', {
    en: 'How we use data',
    ar: 'كيف نستخدم البيانات',
  }),

  createSection('share', {
    en: 'Sharing',
    ar: 'مشاركة البيانات',
  }, true),

  createSection('rights', {
    en: 'Your rights',
    ar: 'حقوقك',
  }),

  createSection('contact', {
    en: 'Contact us',
    ar: 'تواصل معنا',
  }, true),
]

// Refund Policy
export const refundSections: LegalSection[] = [
  createSection('intro', {
    en: 'Introduction',
    ar: 'مقدمة',
  }),

  createSection('eligible', {
    en: 'Eligibility',
    ar: 'الأهلية',
  }, true),

  createSection('request', {
    en: 'How to request',
    ar: 'طريقة تقديم الطلب',
  }),

  createSection('timing', {
    en: 'Processing time',
    ar: 'مدة المعالجة',
  }, true),

  createSection('except', {
    en: 'Exceptions',
    ar: 'الاستثناءات',
  }),

  createSection('contact', {
    en: 'Contact us',
    ar: 'تواصل معنا',
  }, true),
]

export const legalDocuments: Record<
  LegalDocumentType,
  {
    title: BilingualText
    sections: LegalSection[]
  }
> = {
  terms: {
    title: legalTitles.terms,
    sections: termsSections,
  },

  privacy: {
    title: legalTitles.privacy,
    sections: privacySections,
  },

  refund: {
    title: legalTitles.refund,
    sections: refundSections,
  },
}

// Kept for compatibility with existing imports.
export const sampleSections = termsSections
