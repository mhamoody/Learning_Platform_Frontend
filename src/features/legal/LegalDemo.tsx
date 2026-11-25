
import { Navigate, NavLink, useParams } from 'react-router-dom'

import { text } from '../../shared/i18n'
import type { Lang } from '../../shared/types'

import LegalPage from './LegalPage'

import {
  legalDocuments,
  legalTitles,
  sampleUpdatedAt,
  type LegalDocumentType,
} from './mocks'

interface LegalDemoProps {
  lang: Lang
  onLangChange: (lang: Lang) => void
}

export default function LegalDemo({
  lang,
  onLangChange,
}: LegalDemoProps) {
  const { documentType = 'terms' } = useParams<{
    documentType: string
  }>()

  const isValidDocument = Object.prototype.hasOwnProperty.call(
    legalDocuments,
    documentType,
  )

  if (!isValidDocument) {
    return <Navigate to="/legal/terms" replace />
  }

  const currentType = documentType as LegalDocumentType
  const currentDocument = legalDocuments[currentType]

  return (
    <main
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      lang={lang}
      className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="mx-auto w-full max-w-[1040px]">

        {/* Document navigation */}
        <nav
          aria-label={text(
            {
              en: 'Legal documents',
              ar: 'المستندات القانونية',
            },
            lang,
          )}
          className="no-print mb-6 flex flex-wrap gap-2"
        >
          {(Object.keys(legalTitles) as LegalDocumentType[]).map(
            (type) => {
              const isActive = currentType === type

              return (
                <NavLink
                  key={type}
                  to={`/legal/${type}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={({ isActive: routeIsActive }) =>
                    `rounded-md border px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
                      routeIsActive
                        ? 'border-teal-700 bg-teal-700 text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-teal-700 hover:text-teal-700'
                    }`
                  }
                >
                  {text(legalTitles[type], lang)}
                </NavLink>
              )
            },
          )}
        </nav>

        {/* Selected legal document */}
        <LegalPage
          title={currentDocument.title}
          updatedAt={sampleUpdatedAt}
          sections={currentDocument.sections}
          lang={lang}
          onLangChange={onLangChange}
        />

      </div>
    </main>
  )
}
