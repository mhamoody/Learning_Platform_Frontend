import { useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import CheckoutDemo from './features/checkout/CheckoutDemo'
import LegalDemo from './features/legal/LegalDemo'
import LanguageSwitch from './shared/components/LanguageSwitch'
import { direction, text } from './shared/i18n'
import type { Lang } from './shared/types'

const tasks = [
  {
    number: '01',
    title: { en: 'Checkout summary', ar: 'ملخص الدفع' },
    description: { en: 'Item pricing, coupon states, totals, and included VAT.', ar: 'سعر المنتج وحالات رمز الخصم والإجمالي وضريبة القيمة المضافة المشمولة.' },
    path: '/checkout',
    folder: 'src/features/checkout/',
  },
  {
    number: '02',
    title: { en: 'Legal page template', ar: 'قالب الصفحات القانونية' },
    description: { en: 'A shared layout for Terms, Privacy, and Refund pages.', ar: 'قالب مشترك لصفحات الشروط والخصوصية والاسترداد.' },
    path: '/legal/terms',
    folder: 'src/features/legal/',
  },
]

function Workspace({ lang }: { lang: Lang }) {
  return (
    <>
      <p className="text-sm font-semibold text-violet-700">{text({ en: 'FRONTEND WORKSPACE', ar: 'مساحة عمل فريق الواجهة الأمامية' }, lang)}</p>
      <h1 className="mt-4 max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-slate-950 sm:text-5xl">
        {text({ en: 'Two tasks. One shared foundation.', ar: 'مهمتان على أساس مشترك.' }, lang)}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
        {text({ en: 'The project structure is ready. Open your task below and follow its README to begin. Both feature implementations are still pending.', ar: 'هيكل المشروع جاهز. افتح مهمتك أدناه واتبع ملف README الخاص بها للبدء. لم تُنفّذ الميزتان بعد.' }, lang)}
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {tasks.map((task) => (
          <Link key={task.path} to={task.path} className="group rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-violet-300 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-sm font-semibold text-violet-800">{task.number}</span>
              <span className="text-xs font-medium text-slate-500">{text({ en: 'To be implemented', ar: 'بانتظار التنفيذ' }, lang)}</span>
            </div>
            <h2 className="mt-6 text-xl font-semibold text-slate-950 group-hover:text-violet-800">{text(task.title, lang)}</h2>
            <p className="mt-3 leading-7 text-slate-600">{text(task.description, lang)}</p>
            <code dir="ltr" className="mt-6 inline-block max-w-full break-all text-xs text-slate-500">{task.folder}</code>
          </Link>
        ))}
      </div>
    </>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = direction(lang)
  }, [lang])

  return (
    <div lang={lang} dir={direction(lang)} className="min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3">
        {text({ en: 'Skip to content', ar: 'انتقل إلى المحتوى' }, lang)}
      </a>
      <header className="no-print border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-5 sm:px-8">
          <Link to="/" className="text-lg font-semibold text-slate-950">{text({ en: 'Learning Platform', ar: 'منصة التعلّم' }, lang)}</Link>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <nav aria-label={text({ en: 'Main navigation', ar: 'التنقل الرئيسي' }, lang)} className="flex flex-wrap gap-4 text-sm">
              {[
                { to: '/', label: { en: 'Workspace', ar: 'مساحة العمل' }, end: true },
                { to: '/checkout', label: { en: 'Checkout', ar: 'الدفع' }, end: false },
                { to: '/legal', label: { en: 'Legal template', ar: 'القالب القانوني' }, end: false },
              ].map((item) => (
                <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `rounded py-2 ${isActive ? 'font-semibold text-violet-800' : 'text-slate-600 hover:text-violet-700'}`}>
                  {text(item.label, lang)}
                </NavLink>
              ))}
            </nav>
            <LanguageSwitch lang={lang} onChange={setLang} />
          </div>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <Routes>
          <Route path="/" element={<Workspace lang={lang} />} />
          <Route path="/checkout" element={<CheckoutDemo lang={lang} />} />
          <Route path="/legal" element={<Navigate to="/legal/terms" replace />} />
          <Route path="/legal/:documentType" element={<LegalDemo lang={lang} onLangChange={setLang} />} />
          <Route path="*" element={<div><h1 className="text-2xl font-semibold">{text({ en: 'Page not found', ar: 'الصفحة غير موجودة' }, lang)}</h1><Link to="/" className="mt-4 inline-block text-violet-700 underline">{text({ en: 'Back to workspace', ar: 'العودة إلى مساحة العمل' }, lang)}</Link></div>} />
        </Routes>
      </main>
    </div>
  )
}