import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { formatSar } from '../../shared/money'
import CheckoutSummary from './CheckoutSummary'
import { checkoutSamples } from './mocks'
import { calculateCheckout, normalizeCouponCode } from './pricing'
import type { CheckoutSummaryProps } from './types'

const noop = () => {}

function render(overrides: Partial<CheckoutSummaryProps> = {}) {
  return renderToStaticMarkup(
    <CheckoutSummary {...checkoutSamples.default} lang="en" onApplyCoupon={noop} onRemoveCoupon={noop} onPay={noop} {...overrides} />,
  )
}

/** Opening tag of the button with the given data-action. */
function button(html: string, action: 'apply' | 'remove' | 'pay'): string {
  const match = html.match(new RegExp(`<button[^>]*data-action="${action}"[^>]*>`))
  if (!match) throw new Error(`No ${action} button rendered`)
  return match[0]
}

const isDisabled = (tag: string) => / disabled(=""|\s|>)/.test(tag)

describe('calculateCheckout', () => {
  it('extracts included VAT (15/115) without adding it again', () => {
    expect(calculateCheckout(11500)).toEqual({ discountHalalas: 0, totalHalalas: 11500, vatHalalas: 1500 })
    expect(calculateCheckout(49900).vatHalalas).toBe(6509)
  })

  it('subtracts the discount and recalculates VAT on the new total', () => {
    expect(calculateCheckout(11500, 1150)).toEqual({ discountHalalas: 1150, totalHalalas: 10350, vatHalalas: 1350 })
    expect(calculateCheckout(49900, 9980)).toMatchObject({ totalHalalas: 39920, vatHalalas: 5207 })
  })

  it('never lets the discount exceed the price', () => {
    expect(calculateCheckout(1000, 5000)).toEqual({ discountHalalas: 1000, totalHalalas: 0, vatHalalas: 0 })
  })

  it('rejects fractional or negative halalas', () => {
    expect(() => calculateCheckout(10.5)).toThrow(RangeError)
    expect(() => calculateCheckout(1000, -1)).toThrow(RangeError)
  })

  it('trims coupon codes and ignores empty input', () => {
    expect(normalizeCouponCode('  SAVE10 ')).toBe('SAVE10')
    expect(normalizeCouponCode('   ')).toBeNull()
  })
})

describe('CheckoutSummary', () => {
  it('shows item, price, total and the included VAT amount in English', () => {
    const html = render()
    expect(html).toMatch(/^<section\b[^>]*lang="en"[^>]*dir="ltr"/)
    expect(html).toContain('Sample learning course')
    expect(html).toContain(formatSar(11500, 'en'))
    expect(html).toContain('Price includes VAT (15%)')
    expect(html).toContain(formatSar(1500, 'en'))
    expect(html).toContain('Pay')
    expect(html).not.toContain('Discount')
  })

  it('renders Arabic text and Arabic-formatted SAR amounts', () => {
    const html = render({ lang: 'ar' })
    expect(html).toMatch(/^<section\b[^>]*lang="ar"[^>]*dir="rtl"/)
    expect(html).toContain('دورة تعليمية تجريبية')
    expect(html).toContain('ملخص الطلب')
    expect(html).toContain('ادفع')
    expect(html).toContain(formatSar(11500, 'ar'))
    expect(html).toContain(formatSar(1500, 'ar'))
  })

  it('shows the discount line, new total and recalculated VAT when a coupon is applied', () => {
    const html = render(checkoutSamples.applied)
    expect(html).toContain('Discount')
    expect(html).toContain(formatSar(1150, 'en'))
    expect(html).toContain(formatSar(10350, 'en'))
    expect(html).toContain(formatSar(1350, 'en'))
    expect(html).toContain('Sample discount applied.')
    expect(html).toContain('value="SAMPLE"')
    expect(html).toMatch(/<input\b[^>]*\sreadonly(?:=""|\s|\/?>)/i)
    expect(button(html, 'remove')).toBeTruthy()
    expect(html).not.toContain('data-action="apply"')
  })

  it('shows the coupon message in Arabic', () => {
    expect(render({ ...checkoutSamples.applied, lang: 'ar' })).toContain('تم تطبيق الخصم التجريبي.')
  })

  it('disables Pay and Apply and shows loading while a coupon is being applied', () => {
    const html = render(checkoutSamples.applying)
    expect(isDisabled(button(html, 'pay'))).toBe(true)
    expect(isDisabled(button(html, 'apply'))).toBe(true)
    expect(button(html, 'apply')).toContain('aria-busy="true"')
    expect(html).toContain('Applying…')
  })

  it('keeps Pay enabled when nothing is loading', () => {
    expect(isDisabled(button(render(), 'pay'))).toBe(false)
    expect(isDisabled(button(render(checkoutSamples.applied), 'pay'))).toBe(false)
  })

  it('disables Apply while the code field is empty', () => {
    expect(isDisabled(button(render(), 'apply'))).toBe(true)
  })

  it('shows the error in the active language as an alert on the input', () => {
    const en = render(checkoutSamples.error)
    expect(en).toContain('role="alert"')
    expect(en).toContain('This sample coupon is not valid.')
    expect(en).toContain('aria-invalid="true"')

    expect(render({ ...checkoutSamples.error, lang: 'ar' })).toContain('رمز الخصم التجريبي غير صالح.')
  })

  it('does not show a stale error while a new coupon is being applied', () => {
    const html = render({ ...checkoutSamples.error, isApplyingCoupon: true })
    expect(html).not.toContain('role="alert"')
  })
})
