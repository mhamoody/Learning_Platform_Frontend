# Task 1: Checkout summary

**Status: implemented** (`CheckoutSummary.tsx`, `pricing.ts`, `CheckoutDemo.tsx`, `CheckoutSummary.test.tsx`). Work stays inside this folder; shared routing and configuration are untouched.

## Contract

See `types.ts` for `CheckoutSummaryProps`:

- `item.title`: `{ en, ar }` text.
- `priceHalalas`: integer halalas in SAR, before any coupon discount.
- `coupon`: `null` or `{ code, discountHalalas, message: { en, ar } }`.
- `error`: `null` or `{ en, ar }`.
- `lang`: `en` or `ar`.
- `isApplyingCoupon`: parent-controlled loading state.
- `onApplyCoupon(code)`, `onRemoveCoupon()`, `onPay()`: callbacks to the parent.

The loading prop supports the brief's loading state without a network request. Local input state is fine; coupon validation and payment remain outside the reusable component. Use `formatSar` from `../../shared/money` for display.

## Build and verify

- Show the item title, price, coupon Apply/Remove controls, discount, total, and the included VAT amount at 15%. VAT is included, not added again.
- Support English/LTR and Arabic/RTL, readable SAR amounts, errors, and loading. Disable Pay while applying a coupon.
- Complete `CheckoutDemo.tsx` with local state controls and sample callbacks. `mocks.ts` supplies synthetic default, applying, applied, and error fixtures.
- Add relevant tests for totals/included VAT, coupon callbacks, errors, disabled payment, and both languages. Use the shared test runner; add a component-testing dependency only if needed and coordinate manifest edits.
- Record test results and any unfinished work in this README before submitting the PR.

From the repository root: `npm run dev`, then visit `/checkout`. Run `npm run build`, `npm run lint`, and `npm test` before submitting.

## Implementation notes

- `pricing.ts` holds the integer-halala maths: `total = price - discount` (discount capped at the price) and `VAT = round(total x 15 / 115)`. VAT is extracted from the price, not added.
- The component keeps only the typed coupon code locally. With a coupon applied the field is read-only and shows Remove; while `isApplyingCoupon` is true the field, Apply and Pay are disabled and Apply shows a spinner.
- Layout uses logical properties and `<bdi>` around amounts, so it flips correctly in RTL.
- `/checkout` demo: a live card (`WELCOME20` works, any other code shows the error, 800 ms fake delay, callback log) and all four states side by side.

## Test results

Tests cover totals/included VAT, rounding, discount cap, both languages, applied/loading/error states and disabled Pay (via `react-dom/server`, no extra dependency).
Run `npm run build`, `npm run lint`, `npm test` and paste the results here before the PR.

**Remaining:** click-level callback tests (`onApplyCoupon`, `onRemoveCoupon`, `onPay`) need a DOM test dependency (e.g. `@testing-library/react` + `jsdom`); coordinate the manifest change with the team.
