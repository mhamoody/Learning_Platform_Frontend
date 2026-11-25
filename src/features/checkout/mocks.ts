import type { CheckoutSummaryProps } from './types'

type CheckoutFixture = Pick<CheckoutSummaryProps, 'item' | 'priceHalalas' | 'coupon' | 'error' | 'isApplyingCoupon'>

const base: CheckoutFixture = {
  item: { title: { en: 'Sample learning course', ar: 'دورة تعليمية تجريبية' } },
  priceHalalas: 11500,
  coupon: null,
  error: null,
  isApplyingCoupon: false,
}

// Synthetic fixtures only. Connect these to local state controls in CheckoutDemo.
export const checkoutSamples = {
  default: base,
  applying: { ...base, isApplyingCoupon: true },
  applied: {
    ...base,
    coupon: {
      code: 'SAMPLE',
      discountHalalas: 1150,
      message: { en: 'Sample discount applied.', ar: 'تم تطبيق الخصم التجريبي.' },
    },
  },
  error: {
    ...base,
    error: { en: 'This sample coupon is not valid.', ar: 'رمز الخصم التجريبي غير صالح.' },
  },
} satisfies Record<string, CheckoutFixture>
