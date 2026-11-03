# 09 — Acceptance and visual QA

## Reference checkpoints
Capture at1920×1080 first. Compare each section to its named reference: palette,logo ratio,headline width and wrap,grid proportions,CTA priority,art focal point,spacing and card geometry. References contain raster text inconsistencies; use written copy instead. Not every photographed texture must be identical, but composition must be deliberate. Build all seven; don't stop at a polished hero and generic lower sections.

For visual diffs, use a first approved implementation screenshot as regression baseline, not blindly compare different responsive dimensions with a PNG mockup. Document intentional differences (real labels,better contrast,no repeated global header). Review screenshots visually in addition to numeric diffs.

## Required viewport matrix
1920×1080,1440×900,1024×768,768×1024,390×844,360×800; plus320wide overflow and200%zoom spot checks. Desktop/mob menu and reduced-motion capture required. All buttons accessible without hover. Sticky header cannot obscure headings or focus.

## Functional acceptance
- Header links land correctly; menu Escape and focus restore work.
- Intro Enter/Skip/Escape work; deep links bypass; never block when media fails; session return skips.
- Filters combine,reset,persist URL and browser history; zero-results state shown.
- Saved state persists/reloads; disabled storage doesn't crash.
- Listing details reference correct record; sample labelling stays visible.
- Wizard Back/Next retains values,validates,bounds numbers,never publishes in demo.
- Form invalid email/message errors associate with fields; duplicate clicks blocked; failed submit preserves data.
- Demo never shows 'sent' or 'published'. Production acceptance is backed by a durable receipt.
- All legal/about routes resolve honestly; no fake logos or deal metrics.
- Keyboard completes every path; meaningful headings/labels; dialogs and accordion semantics valid.

## Production-specific checks
Cross-account listing/draft/document access denied; revoked grants stop future fetches; no private data in public JSON/HTML; valid file upload protections; rate limit and error paths; CSP/media host configuration based on actual dependencies; credentials absent from browser bundles; no demo fixtures reachable as real inventory.

## Motion and media checks
Reduced-motion has no ambient video/parallax/transforms. Pause offscreen media. Poster loads before optional video. No text burned into background. No malformed logo in image/video. No endless loader after KIE timeout. Asset exports have width,height,alt policy and local stable source.

## Required evidence
Run package typecheck,lint,production build and relevant E2E checks using scripts actually created by scaffold. Record exact commands and results. Don't fabricate logs or report an unrun check as passing. Screenshot each seven desktop sections plus key mobile states and interaction outcomes. Failures remain open in BUILD-STATUS.

## Review rubric (100)
Brand/logo fidelity20;composition/type20;responsive15;working flows20;accessibility10;performance10;truthful content/security5. Target≥90 overall, but ANY broken conversion CTA,secret leak,inaccessible core flow,private data exposure or false success claim blocks release regardless of score. Owner review decides final visual acceptance; don't self-certify perfection.
