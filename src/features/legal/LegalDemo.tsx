import { NavLink, Navigate, useParams } from 'react-router-dom'
import { text } from '../../shared/i18n'
import type { Lang } from '../../shared/types'
import LegalPage from './LegalPage'
import { legalTitles, sampleSections, sampleUpdatedAt, type LegalDocumentType } from './mocks'

interface LegalDemoProps {
  lang: Lang
  onLangChange: (lang: Lang) => void
}

export default function LegalDemo({ lang, onLangChange }: LegalDemoProps) {
  const { documentType = 'terms' } = useParams()
  if (!Object.hasOwn(legalTitles, documentType)) return <Navigate to="/legal/terms" replace />

  return (
    <>
      <nav aria-label={text({ en: 'Legal documents', ar: 'المستندات القانونية' }, lang)} className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(legalTitles) as LegalDocumentType[]).map((type) => (
          <NavLink key={type} to={`/legal/${type}`} className={({ isActive }) => `rounded-xl px-4 py-3 text-sm ${isActive ? 'bg-violet-100 font-semibold text-violet-900' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>
            {text(legalTitles[type], lang)}
          </NavLink>
        ))}
      </nav>
      <LegalPage title={legalTitles[documentType as LegalDocumentType]} updatedAt={sampleUpdatedAt} sections={sampleSections} lang={lang} onLangChange={onLangChange} />
    </>
  )
}
