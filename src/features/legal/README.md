# Task 2: Legal page template

**Status: not implemented.** Replace the placeholder in `LegalPage.tsx`. One reusable component serves Terms, Privacy, and Refund pages. Work inside this folder; shared routing and configuration are already provided.

## Contract

See `types.ts` for `LegalPageProps`:

- `title`: `{ en, ar }`.
- `updatedAt`: ISO date-only string (`YYYY-MM-DD`).
- `sections`: `{ id, heading: { en, ar }, body: { en, ar } }[]`; bodies contain Markdown.
- `lang`: `en` or `ar`.
- `onLangChange(lang)`: ask the parent to change the selected language.

The callback supports a controlled language switch. Reuse `LanguageSwitch` from `../../shared/components` if useful. Keep section IDs URL-safe and identical in both languages. Render Markdown safely; do not execute raw HTML. Receive all content through props, with no network calls inside the component.

## Build and verify

- Show the title, formatted update date, a table of contents, and all sections.
- Make table-of-contents links jump to stable section anchors in both languages.
- Add English/LTR and Arabic/RTL layouts, a language switch, a readable phone layout, and clean print styling. Hide the workspace navigation when printing if needed; coordinate that shared change.
- Use the six generic sections in `mocks.ts` through `LegalDemo.tsx`. Real legal text will be provided later; do not invent policy commitments.
- Add tests or sample outputs showing anchor navigation in both languages, mobile readability, and print output. Record results and unfinished work here.

From the repository root: `npm run dev`, then visit `/legal/terms`, `/legal/privacy`, or `/legal/refund`. Run `npm run build`, `npm run lint`, and `npm test` before submitting.

**Remaining:** legal content layout, Markdown rendering, table of contents, component language switch, phone/print styling, and task-specific verification. The six-section fixture is supplied to the placeholder but is not rendered yet.
