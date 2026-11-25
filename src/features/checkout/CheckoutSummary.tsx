import { useId, useState } from 'react'
import { text } from '../../shared/i18n'
import { formatSar } from '../../shared/money'
import type { BilingualText } from '../../shared/types'
import { VAT_RATE_PERCENT, calculateCheckout, normalizeCouponCode } from './pricing'
import type { CheckoutSummaryProps } from './types'

const copy = {
  title: { en: 'Order summary', ar: 'ملخص الطلب' },
  couponLabel: { en: 'Coupon code', ar: 'رمز الخصم' },
  apply: { en: 'Apply', ar: 'تطبيق' },
  applying: { en: 'Applying…', ar: 'جارٍ التطبيق…' },
  remove: { en: 'Remove', ar: 'إزالة' },
  discount: { en: 'Discount', ar: 'الخصم' },
  total: { en: 'Total', ar: 'الإجمالي' },
  vat: { en: `Price includes VAT (${VAT_RATE_PERCENT}%)`, ar: `السعر شامل ضريبة القيمة المضافة (${VAT_RATE_PERCENT}%)` },
  pay: { en: 'Pay', ar: 'ادفع' },
} satisfies Record<string, BilingualText>

const outlineButton =
  'inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-teal-700 bg-white px-4 text-sm font-medium text-teal-700 hover:bg-teal-50 disabled:cursor-not-allowed disabled:border-teal-700/40 disabled:bg-white disabled:text-teal-700/50'

export default function CheckoutSummary({
  item,
  priceHalalas,
  coupon,
  error,
  lang,
  isApplyingCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onPay,
}: CheckoutSummaryProps) {
  // Local input state only; validation and payment stay with the parent.
  const [draft, setDraft] = useState('')
  const inputId = useId()
  const feedbackId = useId()

  const { discountHalalas, totalHalalas, vatHalalas } = calculateCheckout(priceHalalas, coupon?.discountHalalas ?? 0)
  const money = (halalas: number) => formatSar(halalas, lang)

  const code = normalizeCouponCode(draft)
  const visibleError = coupon === null && !isApplyingCoupon ? error : null

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault()
    if (isApplyingCoupon || coupon !== null || code === null) return
    onApplyCoupon(code)
  }

  function handleRemove() {
    setDraft('')
    onRemoveCoupon()
  }

  return (
    <section aria-labelledby={`${inputId}-title`} className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <h2 id={`${inputId}-title`} className="text-sm font-semibold text-slate-950">
        {text(copy.title, lang)}
      </h2>

      <div className="mt-3 flex items-baseline justify-between gap-4 border-b border-slate-200 pb-4 text-sm">
        <span className="font-medium text-slate-900">{text(item.title, lang)}</span>
        <bdi className="shrink-0 text-slate-700">{money(priceHalalas)}</bdi>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-4 border-b border-slate-200 pb-4">
        <label htmlFor={inputId} className="block text-xs text-slate-500">
          {text(copy.couponLabel, lang)}
        </label>
        <div className="mt-1.5 flex gap-2">
          <input
            id={inputId}
            type="text"
            value={coupon ? coupon.code : draft}
            onChange={(event) => setDraft(event.target.value)}
            readOnly={coupon !== null}
            disabled={isApplyingCoupon}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-invalid={visibleError ? true : undefined}
            aria-describedby={feedbackId}
            className={`min-h-11 min-w-0 flex-1 rounded-xl border bg-white px-3 text-sm text-slate-900 disabled:bg-slate-50 disabled:text-slate-400 ${visibleError ? 'border-red-600' : 'border-slate-300'}`}
          />
          {coupon ? (
            <button type="button" data-action="remove" onClick={handleRemove} className={outlineButton}>
              {text(copy.remove, lang)}
            </button>
          ) : (
            <button
              type="submit"
              data-action="apply"
              disabled={isApplyingCoupon || code === null}
              aria-busy={isApplyingCoupon}
              className={outlineButton}
            >
              {isApplyingCoupon && (
                <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-teal-700/30 border-t-teal-700" />
              )}
              {text(isApplyingCoupon ? copy.applying : copy.apply, lang)}
            </button>
          )}
        </div>

        <div id={feedbackId} aria-live="polite" className="min-h-0">
          {visibleError && (
            <p role="alert" className="mt-2 text-xs text-red-700">
              {text(visibleError, lang)}
            </p>
          )}
          {coupon && (
            <p className="mt-2 text-xs text-green-700">
              <span aria-hidden="true">✓ </span>
              {text(coupon.message, lang)}
            </p>
          )}
        </div>
      </form>

      <dl className="mt-4 space-y-2">
        {coupon && discountHalalas > 0 && (
          <div className="flex items-baseline justify-between gap-4 text-sm text-green-700">
            <dt>{text(copy.discount, lang)}</dt>
            <dd>
              <bdi>−{money(discountHalalas)}</bdi>
            </dd>
          </div>
        )}
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-base font-semibold text-slate-950">{text(copy.total, lang)}</dt>
          <dd className="text-lg font-bold text-slate-950">
            <bdi>{money(totalHalalas)}</bdi>
          </dd>
        </div>
      </dl>
      <p className="mt-1 text-xs text-slate-500">
        {text(copy.vat, lang)}: <bdi>{money(vatHalalas)}</bdi>
      </p>

      <button
        type="button"
        data-action="pay"
        onClick={onPay}
        disabled={isApplyingCoupon}
        className="mt-4 min-h-12 w-full rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-teal-700/50"
      >
        {text(copy.pay, lang)} <bdi>{money(totalHalalas)}</bdi>
      </button>
    </section>
  )
}
