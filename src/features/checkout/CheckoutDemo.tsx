import type { Lang } from '../../shared/types'
import CheckoutSummary from './CheckoutSummary'
import { checkoutSamples } from './mocks'

// TODO (checkout task): add local demo state and working sample callbacks.
export default function CheckoutDemo({ lang }: { lang: Lang }) {
  return (
    <CheckoutSummary
      {...checkoutSamples.default}
      lang={lang}
      onApplyCoupon={() => {}}
      onRemoveCoupon={() => {}}
      onPay={() => {}}
    />
  )
}
