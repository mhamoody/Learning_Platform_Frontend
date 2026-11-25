# Learning Platform Frontend

A shared workspace for two independent frontend tasks: a checkout summary and reusable legal pages. **Both tasks are implemented and ready for review.** The repository includes the shared app shell, typed contracts, synthetic demo fixtures, a working checkout component, and a reusable bilingual legal page template.

## Local setup

Use Node.js 24 LTS (24.15.0 or newer) and npm. The stack is React 19, TypeScript, Vite 8, and Tailwind CSS 4, following the task brief's TypeScript requirement.

```sh
npm ci
npm run dev
```

Open `http://localhost:5173`. Local setup and demos require no credentials or backend services.

Run the checks before opening a pull request:

```sh
npm run build
npm run lint
npm test
```

The test suite includes shared language/currency checks and checkout tests. Record the latest build, lint, and test results with your changes. GitHub Actions runs lint, tests, and the build for pull requests and updates to `main`.

## Preview routes

| Route | Purpose |
| --- | --- |
| `/` | Task navigation |
| `/checkout` | Live checkout demo (`WELCOME20`) and four sample states: default, applying, applied, and error |
| `/legal/terms` | Terms of Service demo |
| `/legal/privacy` | Privacy Policy demo |
| `/legal/refund` | Refund Policy demo |

`/legal` and unknown legal document types redirect to `/legal/terms`. Each legal demo contains six bilingual sections with placeholder text, a localized update date, table-of-contents jump links, a language switch, and print styling. Approved legal text must still be supplied by the company.

## Structure and task ownership

```text
src/
  App.tsx
  features/
    checkout/
      CheckoutSummary.tsx
      CheckoutSummary.test.tsx
      CheckoutDemo.tsx
      pricing.ts
      types.ts
      mocks.ts
      README.md
    legal/
      LegalPage.tsx
      LegalDemo.tsx
      types.ts
      mocks.ts
      README.md
  shared/
    types.ts
    i18n.ts
    money.ts
    components/
      LanguageSwitch.tsx
      TaskPlaceholder.tsx
```

- **Checkout — implemented:** `CheckoutSummary` inside `src/features/checkout/` displays item pricing, coupon Apply/Remove controls, discounts, totals, and included VAT at 15%. `pricing.ts` calculates integer-halala totals and extracts VAT without adding it again. Props supply item and coupon data, a bilingual error, `lang`, coupon/payment callbacks, and `isApplyingCoupon` for loading and disabling payment during coupon application. The live demo accepts `WELCOME20` for 20% off; other codes show an error, and Pay logs its callback without making a payment.
- **Legal — implemented:** `LegalPage` inside `src/features/legal/` renders the title, update date, six-section sample documents, table-of-contents anchors, and back-to-top links in English/LTR or Arabic/RTL. Its contract accepts the title, update date, sections with Markdown bodies, `lang`, and a required `onLangChange` callback for the controlled language switch. `LegalDemo` selects the Terms, Privacy, or Refund fixture by route. Markdown support covers paragraphs, ordered/unordered lists, bold, italic, and inline code; links, headings, and other Markdown syntax are not parsed. The layout includes phone and print styling; see the feature README for verification status.

Read the README in your assigned feature folder for its requirements. Demo adapters supply props and synthetic fixtures; the reusable feature components must not make API or network requests.

Shared contracts use `Lang` (`"en" | "ar"`) and `BilingualText` (`{ en: string; ar: string }`). Money uses safe integer halalas in SAR: `100` halalas is `1` SAR. Keep amounts in halalas for calculations and use the shared money formatting boundary for display.

## Contribution workflow

Start from the latest shared `main`, then create your task branch:

```sh
git switch main
git pull --ff-only origin main
git switch -c feature/checkout-summary
```

For the legal task, use `feature/legal-page` instead. These are branch-name examples; choose the branch for your assignment.

Work in your own feature folder. Coordinate changes to shared contracts, `src/App.tsx`, shared components, global styles, and project configuration. Preserve the shared app shell and submit changes through a pull request to `main`. Include the check results and a short description of what is implemented and what remains.

## Public repository content

Use generic, synthetic data only. Do not commit employer PDFs, NDAs, private content, credentials, or code copied from an unrelated existing project.

If configuration is needed later, keep local values in the ignored `.env.local` file. Vite variables prefixed with `VITE_` are exposed to the browser and must never contain secrets.
