# 04 — Responsive and components

## Breakpoint behavior
| Width | Grid | Header | Type/art rules |
|---|---|---|---|
| ≥1440 | 12 columns,32gap | full nav | 6/6 hero,3 marketplace cards |
| 1024–1439 | 12 columns,24gap | full nav if fits, else menu | 6/6 hero, cards3 only if ≥300px each |
| 768–1023 | 8 columns,24gap | menu | stacked hero, marketplace2 |
| <768 | 1 content column,16gap | compact logo/menu | stacked, marketplace1, full-width forms |

No horizontal overflow at320 CSSpx. Cards min-width0. Prefer natural wrapping, not tiny font shrinkage. Do not force br tags on mobile. At200% zoom navigation must collapse and controls remain accessible. Avoid scroll hijacking or horizontal card carousels as the only route to content. Respect notch safe areas and mobile dynamic viewport. Anchor scroll-margin-top120px desktop/88mobile.

## Component contracts
- `Button`: variant primary/secondary/text, loading, disabled, asLink only when navigating. Exactly one interactive element; no nested anchor/button.
- `SiteHeader`: logo, desktop nav, mobile dialog menu. Menu traps focus, Escape closes, restores trigger focus, prevents background interaction and releases body lock reliably.
- `SectionHeading`: eyebrow, heading element, emphasis span, supporting text. Never choose heading level by font size.
- `AssetMedia`: picture with desktop/mobile sources, dimensions, fallback, decorative alt empty; no click semantics for ornamental art.
- `ListingCard`: Listing summary, saved boolean, onToggleSave; separate details link and bookmark. Bookmark aria-pressed and accessible business name.
- `MarketplaceFilters`: serializable filter state, reset control, visible result count, live status, no announcement per keystroke until debounce settles.
- `Accordion`: native details/summary preferred or correct aria-expanded/controls, keyboard operable.
- `IntroductionForm`: validated fields, idle/submitting/success/error/demo states, field-error association, focus first invalid field, no duplicate submits.
- `IntroGate`: session flag, skip, reduced motion, safe focus restoration to main heading/Enter trigger.
- `ListingWizard`: back/next, draft retention notice, review screen, publish unavailable in demo.

## Interaction detail
Hover lime buttons lighten slightly, arrow translates2px; no scale bounce. Cards raise2px maximum and sharpen border; focus-within equivalent. Input border changes on focus with ring and persists labels; placeholders are examples, not labels. Tab order follows DOM, not CSS visual position. Visible error summary includes links to invalid controls. Accessible names match visible labels.

## Content accessibility
Contrast target WCAG AA; body4.5:1, large text3:1, functional graphics3:1. Touch targets44×44 minimum. Decorative geometry aria-hidden and pointer-events:none. Never convey financial metric verification by color or lock icons alone. Modals have labelled titles. Real content is usable with JavaScript delayed; intro never conceals all accessible page content indefinitely.
