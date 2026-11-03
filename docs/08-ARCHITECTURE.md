# 08 — Architecture and engineering defaults

## Suggested tree after scaffold
```text
src/app/layout.tsx
src/app/page.tsx
src/app/businesses/page.tsx
src/app/businesses/[slug]/page.tsx
src/app/sell/page.tsx
src/app/about/page.tsx
src/app/privacy/page.tsx
src/app/terms/page.tsx
src/app/saved/page.tsx
src/components/ui/
src/components/sections/Entrance.tsx … Introduction.tsx
src/components/marketplace/
src/components/forms/
src/components/intro/
src/lib/content.ts
src/lib/listings.ts
src/lib/validation.ts
src/lib/services/       # contracts + demo/production adapters
src/styles/globals.css
public/brand/
public/media/
scripts/assets/        # local generation tooling,not a public endpoint
tests/e2e/
```

Prefer server-rendered content; client islands for filters,bookmarking,forms,dialogs and motion. Don't add use-client to the whole root page. Metadata for public pages, canonical domain only once ownership/configuration supplied, social preview asset and descriptive title. Demo/no-public inventory may be noindex; private routes always excluded from public indexing. Never render confidential fields to crawlers.

## Dependencies
Next.js/React/TypeScript version chosen after current docs/peer checks; use one package manager and lockfile. CSS Modules + tokens. Optional Motion for scoped interactions; native CSS/IntersectionObserver adequate for most effects. Playwright for behavioral/screenshots; accessibility engine such as axe-core where compatible. Do not install GSAP,Three,Rive and multiple motion systems merely to look advanced.

## Service abstraction
`ListingRepository`: listPublic(filters),getPublicBySlug(slug).
`DraftRepository`: loadOwnedDraft(id),saveOwnedDraft(input),submitForReview(id).
`IntroductionService`: submit(input,requestId)→accepted receipt or structured error.
`AccessService`: requestAccess(listingId),grant/revoke owned listing access,readAuthorizedDocument.
Demo implementations explicit and never silently substituted into production. `APP_MODE=demo|production` server variable; expose only safe mode indicator, not arbitrary env. Production mode without required services fails readiness checks and cannot simulate accepted submissions.

## Runtime reliability
Typed schemas at all boundaries, safe output encoding, no raw HTML from listing text. HTTPS production, proper cookie flags and origin/CSRF protections for mutations. Accessible404/500 and empty states. A broken image falls back to neutral brand artwork while preserving dimensions. Missing video never blocks content. Form retries don't duplicate records. Avoid unsafe arbitrary URL downloads/SSRF in generation tooling; allowed provider output hosts and size/time limits verified.

## Analytics
Events: hero_sell_click,hero_buy_click,filter_applied,listing_opened,bookmark_toggled,introduction_started,introduction_accepted. Demo events separated. No personally identifying form values, private business details or documents. Respect consent requirements for the chosen deployment. Track meaningful accepted requests rather than treating every click as a lead.

## Performance targets
Field goals LCP≤2.5s,INP≤200ms,CLS≤0.1 at75th percentile once enough data exists. Local lab target Lighthouse mobile≥90 performance and≥95 accessibility as diagnostics, not proof of field outcomes. Initial compressed JS target≤200KB excluding framework variance documented; critical above-fold image≤450KB; defer noncritical media. Do not preload every image/font. LCP asset never lazily loaded. Route bundles should not include original PNG references.
