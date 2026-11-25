import type { Halalas, Lang } from './types'

export function formatSar(halalas: Halalas, lang: Lang): string {
  if (!Number.isSafeInteger(halalas)) {
    throw new RangeError('Amounts must be safe integer halalas.')
  }

  return new Intl.NumberFormat(lang === 'ar' ? 'ar-SA' : 'en-SA', {
    style: 'currency',
    currency: 'SAR',
    currencyDisplay: 'code',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(halalas / 100)
}
