# Learning Platform Frontend

A starter workspace for two independent frontend tasks: a checkout summary and reusable legal pages. **Both tasks are unfinished.** The repository provides the shared app shell, typed contracts, synthetic demo fixtures, and placeholder components for members to implement.

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

The starter passes all three checks, including three shared language/currency tests. Its routes and English/Arabic layouts were also checked on desktop and mobile. Feature-specific tests remain each member's responsibility. GitHub Actions runs lint, tests, and the build for pull requests and updates to `main`.

## Preview routes

| Route | Purpose |
| --- | --- |
| `/` | Task navigation |
| `/checkout` | Checkout placeholder and demo data |
| `/legal/terms` | Terms placeholder |
| `/legal/privacy` | Privacy placeholder |
| `/legal/refund` | Refund placeholder |

`/legal` redirects to `/legal/terms`. The legal demos contain six sections with placeholder text; they are not policies for actual use.

## Structure and task ownership

```text
src/
  App.tsx
  features/
    checkout/
      CheckoutSummary.tsx
      CheckoutDemo.tsx
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

- **Checkout:** implement `CheckoutSummary` inside `src/features/checkout/`. Its contract includes item and coupon data, a bilingual error, `lang`, coupon/payment callbacks, and `isApplyingCoupon` for loading and disabling payment during coupon application. The member implements the checkout UI and calculation/display of included VAT at 15%; the skeleton supplies no VAT helper.
- **Legal:** implement `LegalPage` inside `src/features/legal/`. Its contract includes the title, update date, sections with Markdown bodies, `lang`, and a required `onLangChange` callback for the controlled language switch. The member implements the content layout, table-of-contents anchors, phone layout, and print styling.

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
