import type { Lang } from '../types'

interface LanguageSwitchProps {
  lang: Lang
  onChange: (lang: Lang) => void
}

export default function LanguageSwitch({ lang, onChange }: LanguageSwitchProps) {
  return (
    <div role="group" aria-label={lang === 'ar' ? 'اللغة' : 'Language'} className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
      {(['en', 'ar'] as const).map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          dir={option === 'ar' ? 'rtl' : 'ltr'}
          aria-pressed={lang === option}
          onClick={() => onChange(option)}
          className={`rounded-lg px-3 py-2 text-sm font-medium ${lang === option ? 'bg-violet-100 text-violet-900' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          {option === 'ar' ? 'العربية' : 'English'}
        </button>
      ))}
    </div>
  )
}
