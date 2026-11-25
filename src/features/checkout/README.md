# Task 1: Checkout summary

**Status: not implemented.** Replace the placeholder in `CheckoutSummary.tsx`. Work inside this folder; shared routing and configuration are already provided.

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

**Remaining:** checkout UI, local demo interactions, VAT/total calculations, and task-specific tests. Current callbacks are intentionally no-ops in the starter demo.
