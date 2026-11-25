import TaskPlaceholder from '../../shared/components/TaskPlaceholder'
import type { CheckoutSummaryProps } from './types'

// TODO (checkout task): replace this placeholder using the agreed prop contract.
export default function CheckoutSummary({ lang }: CheckoutSummaryProps) {
  return (
    <TaskPlaceholder
      title={{ en: 'Checkout summary', ar: 'ملخص الدفع' }}
      folder="src/features/checkout/CheckoutSummary.tsx"
      lang={lang}
    />
  )
}
