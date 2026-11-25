
import { Fragment, type ReactNode } from 'react'
import LanguageSwitch from '../../shared/components/LanguageSwitch'
import { direction, text } from '../../shared/i18n'
import type { LegalPageProps } from './types'

function renderInline(value: string): ReactNode[] {
  const tokens = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g

  return value.split(tokens).filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      )
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          dir="ltr"
          className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800"
        >
          {part.slice(1, -1)}
        </code>
      )
    }

    return <Fragment key={index}>{part}</Fragment>
  })
}

function MarkdownBody({ source }: { source: string }) {
  const lines = source.replace(/\r\n?/g, '\n').split('\n')

  const blocks: ReactNode[] = []
  let paragraph: string[] = []
  let list: string[] = []
  let listType: 'ul' | 'ol' | null = null

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(
        <p
          key={`p-${blocks.length}`}
          className="mb-4 leading-7 text-slate-600"
        >
          {renderInline(paragraph.join(' '))}
        </p>,
      )

      paragraph = []
    }
  }

  const flushList = () => {
    if (list.length && listType) {
      const List = listType

      blocks.push(
        <List
          key={`list-${blocks.length}`}
          className={`mb-5 space-y-2 ps-6 leading-7 text-slate-600 marker:text-slate-400 ${
            listType === 'ul' ? 'list-disc' : 'list-decimal'
          }`}
        >
          {list.map((item, index) => (
            <li key={index}>{renderInline(item)}</li>
          ))}
        </List>,
      )
    }

    list = []
    listType = null
  }

  lines.forEach((line) => {
    const trimmed = line.trim()

    const unordered = trimmed.match(/^[-*]\s+(.+)$/)
    const ordered = trimmed.match(/^\d+[.)]\s+(.+)$/)

    if (!trimmed) {
      flushParagraph()
      flushList()
    } else if (unordered || ordered) {
      flushParagraph()

      const nextType = unordered ? 'ul' : 'ol'

      if (listType && listType !== nextType) {
        flushList()
      }

      listType = nextType
      list.push((unordered ?? ordered)![1])
    } else {
      flushList()
      paragraph.push(trimmed)
    }
  })

  flushParagraph()
  flushList()

  return <>{blocks}</>
}

function formatDate(value: string, lang: LegalPageProps['lang']) {
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return new Intl.DateTimeFormat(
    lang === 'ar' ? 'ar-EG-u-ca-gregory-nu-latn' : 'en-GB',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    },
  ).format(date)
}

export default function LegalPage({
  title,
  updatedAt,
  sections,
  lang,
  onLangChange,
}: LegalPageProps) {
  const labels = {
    contents: {
      en: 'Contents',
      ar: 'المحتويات',
    },
    updated: {
      en: 'Last updated',
      ar: 'آخر تحديث',
    },
    backToTop: {
      en: '↑ Back to top',
      ar: '↑ العودة إلى الأعلى',
    },
    navigation: {
      en: 'Table of contents',
      ar: 'جدول المحتويات',
    },
  }

  return (
    <article
      lang={lang}
      dir={direction(lang)}
      className="legal-document mx-auto w-full max-w-[1040px] border border-slate-200 bg-white"
    >
      <header
        id="legal-document-top"
        className="flex flex-col gap-4 border-b border-slate-200 px-5 py-7 sm:px-8 sm:py-8 md:flex-row md:items-start md:justify-between"
      >
        <div className="min-w-0">
          <h1 className="text-[23px] font-semibold leading-[1.3] tracking-tight text-slate-900 sm:text-[28px]">
            {text(title, lang)}
          </h1>

          <p className="mt-2 text-[13px] text-slate-500">
            {text(labels.updated, lang)}:{' '}
            <time dateTime={updatedAt} dir="auto">
              {formatDate(updatedAt, lang)}
            </time>
          </p>
        </div>

        <div className="no-print self-start">
          <LanguageSwitch lang={lang} onChange={onLangChange} />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-7 px-4 py-6 sm:px-8 sm:py-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-8">
        <aside className="legal-toc h-fit rounded-lg bg-slate-50 p-4 lg:sticky lg:top-[70px]">
          <h2 className="mb-3 text-sm font-semibold text-slate-700">
            {text(labels.contents, lang)}
          </h2>

          <nav aria-label={text(labels.navigation, lang)}>
            <ol className="list-decimal space-y-1 ps-5 marker:text-slate-400">
              {sections.map((section) => (
                <li key={section.id} className="ps-1">
                  <a
                    href={`#${encodeURIComponent(section.id)}`}
                    className="block rounded py-1 text-sm leading-6 text-slate-600 transition-colors hover:text-teal-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
                  >
                    {text(section.heading, lang)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="legal-section mb-7 max-w-[68ch] scroll-mt-[70px] last:mb-0"
            >
              <h2
                id={`${section.id}-heading`}
                className="mb-3 text-[19px] font-semibold leading-snug text-slate-900"
              >
                {text(section.heading, lang)}
              </h2>

              <div className="text-[15px] sm:text-base">
                <MarkdownBody source={text(section.body, lang)} />
              </div>

              <a
                href="#legal-document-top"
                className="no-print mt-2 inline-flex text-[13px] text-slate-500 transition-colors hover:text-teal-700 hover:underline"
              >
                {text(labels.backToTop, lang)}
              </a>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
