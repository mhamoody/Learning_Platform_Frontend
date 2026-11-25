import { text } from '../i18n'
import type { BilingualText, Lang } from '../types'

interface TaskPlaceholderProps {
  title: BilingualText
  folder: string
  lang: Lang
}

export default function TaskPlaceholder({ title, folder, lang }: TaskPlaceholderProps) {
  return (
    <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 sm:p-10">
      <p className="text-sm font-medium text-violet-700">{text({ en: 'Implementation pending', ar: 'بانتظار التنفيذ' }, lang)}</p>
      <h1 className="mt-3 text-2xl font-semibold text-slate-950">{text(title, lang)}</h1>
      <p className="mt-4 max-w-2xl leading-7 text-slate-600">
        {text({ en: 'The route, prop types, and sample data are ready. The assigned member will build this component here.', ar: 'المسار وأنواع الخصائص والبيانات التجريبية جاهزة. سيقوم العضو المسؤول بتنفيذ هذا المكوّن هنا.' }, lang)}
      </p>
      <code dir="ltr" className="mt-6 inline-block max-w-full break-all rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">{folder}</code>
    </section>
  )
}
