import type { BilingualText, Halalas, Lang } from '../../shared/types'

export interface CheckoutSummaryProps {
  item: { title: BilingualText }
  priceHalalas: Halalas
  coupon: {
    code: string
    discountHalalas: Halalas
    message: BilingualText
  } | null
  error: BilingualText | null
  lang: Lang
  isApplyingCoupon: boolean
  onApplyCoupon: (code: string) => void
  onRemoveCoupon: () => void
  onPay: () => void
}
