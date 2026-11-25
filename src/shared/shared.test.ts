import { describe, expect, it } from 'vitest'
import { direction, text } from './i18n'
import { formatSar } from './money'

describe('shared language and money contracts', () => {
  it('selects the requested text and writing direction', () => {
    const label = { en: 'Total', ar: 'الإجمالي' }
    expect(text(label, 'en')).toBe('Total')
    expect(text(label, 'ar')).toBe('الإجمالي')
    expect(direction('en')).toBe('ltr')
    expect(direction('ar')).toBe('rtl')
  })

  it('formats halalas as SAR without treating them as whole riyals', () => {
    expect(formatSar(11550, 'en')).toContain('115.50')
    expect(formatSar(11550, 'en')).toContain('SAR')
    expect(formatSar(11550, 'ar')).toContain('١١٥٫٥٠')
    expect(formatSar(0, 'en')).toContain('0.00')
  })

  it('rejects fractional or invalid halala values', () => {
    for (const value of [1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
      expect(() => formatSar(value, 'en')).toThrow(RangeError)
    }
  })
})
