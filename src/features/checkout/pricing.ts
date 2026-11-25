import type { Halalas } from '../../shared/types'

/** Saudi VAT rate. Prices already include it, so it is extracted, never added. */
export const VAT_RATE_PERCENT = 15

export interface CheckoutTotals {
  /** Discount actually applied (never more than the price). */
  discountHalalas: Halalas
  totalHalalas: Halalas
  /** VAT portion already contained in `totalHalalas`. */
  vatHalalas: Halalas
}

function assertHalalas(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative safe integer of halalas.`)
  }
}

/** All values are integer halalas. VAT = total x 15 / 115, rounded to the nearest halala. */
export function calculateCheckout(priceHalalas: Halalas, discountHalalas: Halalas = 0): CheckoutTotals {
  assertHalalas(priceHalalas, 'priceHalalas')
  assertHalalas(discountHalalas, 'discountHalalas')

  const appliedDiscount = Math.min(discountHalalas, priceHalalas)
  const totalHalalas = priceHalalas - appliedDiscount
  const vatHalalas = Math.round((totalHalalas * VAT_RATE_PERCENT) / (100 + VAT_RATE_PERCENT))

  return { discountHalalas: appliedDiscount, totalHalalas, vatHalalas }
}

/** Trims the typed code. Returns null when there is nothing to apply. */
export function normalizeCouponCode(raw: string): string | null {
  const code = raw.trim()
  return code === '' ? null : code
}
