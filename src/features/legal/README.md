# Task 2: Legal page template

**Status: implemented, integrated locally, and ready for review.** `LegalPage` provides one reusable layout for Terms, Privacy, and Refund documents.

## Components and contract

`LegalPage.tsx` receives all content through `LegalPageProps` in `types.ts`, with no network calls:

- `title`: `{ en, ar }`.
- `updatedAt`: ISO date-only string (`YYYY-MM-DD`), displayed as a localized Gregorian date.
- `sections`: `{ id, heading: { en, ar }, body: { en, ar } }[]`.
- `lang`: `en` or `ar`.
- `onLangChange(lang)`: asks the parent to update the controlled language selection.

The component uses the shared `LanguageSwitch`, English/LTR and Arabic/RTL direction, stable section IDs, table-of-contents jump links, and back-to-top links. Its responsive layout stacks the contents and sections on smaller screens. Print styling hides interactive navigation and removes document-card decoration.

Section bodies support a limited Markdown subset: paragraphs, unordered lists (`-` or `*`), ordered lists, bold (`**text**`), italic (`*text*`), and inline code. Links, Markdown headings, blockquotes, fenced code, nested lists, and other Markdown features are not supported. Text is rendered through React without executing raw HTML. Keep section IDs unique, URL-safe, and identical in both languages.

`LegalDemo.tsx` selects a document from `mocks.ts`, supplies the props, and renders links between the three documents. Each document has six sections of synthetic bilingual placeholder text, including paragraph and list examples. The sample update date is `2026-11-25`.

## Run and review

From the repository root, use Node.js 24.15.0 or newer:

```sh
npm ci
npm run dev
```

Open the local development URL (normally `http://localhost:5173`) and visit:

| Route | Sample document |
| --- | --- |
| `/legal/terms` | Terms of Service |
| `/legal/privacy` | Privacy Policy |
| `/legal/refund` | Refund Policy |

`/legal` and unknown legal document types redirect to `/legal/terms`.

Run the repository checks before submission:

```sh
npm run build
npm run lint
npm test
```

Local integration verification:

- Build and lint pass; all 17 existing shared/checkout tests pass.
- Browser checks passed for all three legal documents in English and Arabic at desktop and 375 px widths: six sections each, language switching, all 72 table-of-contents jumps, back-to-top links, document tabs, and invalid-document redirects. No horizontal overflow or browser errors were found.
- English and Arabic Terms print samples each produced two A4 pages with no blank page, a white background, and hidden navigation controls. Print styling is scoped to Legal and leaves Checkout printing unchanged.
- Checkout feature files match their pre-integration copies. Its coupon/loading/error/payment callback checks still pass in both languages at desktop, 375 px, and 320 px widths.

These are recorded browser checks, not new tests in `npm test`. The existing test suite covers shared utilities and checkout. Review the print layout yourself using the browser's Print command.

**Remaining:** team review and company-approved legal text. The placeholder documents are demonstrations and must be replaced before actual use. Markdown is limited to the subset documented above.
