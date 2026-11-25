import { useEffect, useRef, useState } from 'react'
import { text } from '../../shared/i18n'
import type { BilingualText, Lang } from '../../shared/types'
import CheckoutSummary from './CheckoutSummary'
import { checkoutSamples } from './mocks'
import type { CheckoutSummaryProps } from './types'

const DEMO_CODE = 'WELCOME20'
const DEMO_DISCOUNT_PERCENT = 20
const FAKE_LATENCY_MS = 800
const noop = () => {}

const stateCaptions: { key: keyof typeof checkoutSamples; title: BilingualText; note: string }[] = [
  { key: 'default', title: { en: '1. No coupon', ar: '1. بدون رمز خصم' }, note: 'coupon: null, error: null' },
  { key: 'applying', title: { en: '2. Applying (loading)', ar: '2. جارٍ التطبيق (تحميل)' }, note: 'isApplyingCoupon: true' },
  { key: 'applied', title: { en: '3. Coupon applied', ar: '3. تم تطبيق الرمز' }, note: 'coupon: { code, discountHalalas, message }' },
  { key: 'error', title: { en: '4. Error', ar: '4. خطأ' }, note: 'error: { en, ar }' },
]

function SectionLabel({ children }: { children: string }) {
  return <h2 className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{children}</h2>
}

/** Fully working card with fake, local-only coupon logic. No network request is made. */
function LiveDemo({ lang }: { lang: Lang }) {
  const base = checkoutSamples.default
  const [coupon, setCoupon] = useState<CheckoutSummaryProps['coupon']>(null)
  const [error, setError] = useState<CheckoutSummaryProps['error']>(null)
  const [isApplying, setIsApplying] = useState(false)
  const [log, setLog] = useState<string[]>([])
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const record = (line: string) => setLog((previous) => [...previous, line].slice(-8))

  function handleApply(code: string) {
    record(`onApplyCoupon(${JSON.stringify(code)})`)
    setError(null)
    setIsApplying(true)
    timer.current = setTimeout(() => {
      if (code.toUpperCase() === DEMO_CODE) {
        setCoupon({
          code: DEMO_CODE,
          discountHalalas: Math.round((base.priceHalalas * DEMO_DISCOUNT_PERCENT) / 100),
          message: { en: `${DEMO_DISCOUNT_PERCENT}% off applied`, ar: `تم تطبيق خصم ${DEMO_DISCOUNT_PERCENT}%` },
        })
      } else {
        setError({ en: 'This code is not valid.', ar: 'هذا الرمز غير صالح.' })
      }
      setIsApplying(false)
    }, FAKE_LATENCY_MS)
  }

  function handleRemove() {
    record('onRemoveCoupon()')
    setCoupon(null)
    setError(null)
  }

  return (
    <div className="flex flex-wrap items-start gap-6">
      <CheckoutSummary
        item={base.item}
        priceHalalas={base.priceHalalas}
        coupon={coupon}
        error={error}
        isApplyingCoupon={isApplying}
        lang={lang}
        onApplyCoupon={handleApply}
        onRemoveCoupon={handleRemove}
        onPay={() => record('onPay()')}
      />
      <pre
        role="log"
        dir="ltr"
        aria-label={text({ en: 'Callback log', ar: 'سجل الاستدعاءات' }, lang)}
        className="min-h-24 w-full max-w-sm flex-1 overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-xs leading-6 text-emerald-300"
      >
        {log.length === 0 ? '// callbacks appear here' : log.join('\n')}
      </pre>
    </div>
  )
}

export default function CheckoutDemo({ lang }: { lang: Lang }) {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-2xl font-semibold text-slate-950">{text({ en: 'Checkout summary', ar: 'ملخص الدفع' }, lang)}</h1>
        <p className="mt-2 text-sm text-slate-600">
          {text(
            {
              en: `Demo with synthetic data. In the live card, ${DEMO_CODE} works and any other code shows the error. No real payment happens.`,
              ar: `عرض تجريبي ببيانات وهمية. في البطاقة الحيّة يعمل الرمز ${DEMO_CODE} ويظهر الخطأ مع أي رمز آخر. لا يتم أي دفع حقيقي.`,
            },
            lang,
          )}
        </p>
      </header>

      <section className="space-y-4">
        <SectionLabel>{text({ en: 'Live demo', ar: 'عرض مباشر' }, lang)}</SectionLabel>
        <LiveDemo lang={lang} />
      </section>

      <section className="space-y-4">
        <SectionLabel>{text({ en: 'All states side by side', ar: 'كل الحالات جنبًا إلى جنب' }, lang)}</SectionLabel>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stateCaptions.map(({ key, title, note }) => (
            <div key={key} className="space-y-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{text(title, lang)}</h3>
                <code dir="ltr" className="block text-xs text-slate-500">{note}</code>
              </div>
              <CheckoutSummary {...checkoutSamples[key]} lang={lang} onApplyCoupon={noop} onRemoveCoupon={noop} onPay={noop} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
