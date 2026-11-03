# 02 — Design system

## Palette
| Token | Value | Use |
|---|---|---|
| background | #080A09 | dominant canvas |
| surface | #111512 | forms and cards |
| surface-raised | #191E19 | hover/selected panel |
| ivory | #F5F1E6 | headings, primary body |
| muted | #B8BCAF | secondary body |
| lime | #C3FF36 | CTA, active states, headline emphasis |
| gold | #B99B61 | sparse decorative construction lines |
| border | #363E33 | functional boundaries |
| danger | #FF9B93 | errors with icon/text |

Gold is not a primary fill. Do not put lime text on ivory. Check actual rendered contrast, including against images. Functional boundaries use sufficient contrast; decorative hairlines may be quieter. Error and success states never depend on color alone.

## Type
Default self-hosted font: Space Grotesk, weights 400/500/600/700; body and UI: Inter 400/500/600. Obtain legitimate font files/license notices. Fallback Arial, sans-serif. Logo remains the supplied wordmark, not these fonts. Headline weight 700; letter-spacing -0.045em; line-height 0.98–1.05. Body 1.5–1.65; UI 1.3.

At 1920 wide: hero 112px (max text width 840px), section H2 72px, body 22px, control 18px, eyebrow 13px with 0.2em tracking. At 1440: hero 88px, H2 60px, body 18px. At 390: hero 48px, H2 38px, body 17px, controls 16px, eyebrow 11px. Use fluid values in `design/tokens.css`, then adjust only at named breakpoints. Avoid all-caps paragraphs.

## Layout
Container max 1760px. Gutters: 80px ≥1440, 48px 1024–1439, 32px 768–1023, 20px below768. Desktop 12-column grid, 32px gap. Mobile 4-column conceptual grid, 16px gap. Section padding 112px desktop, 80px tablet, 64px mobile. Shared spacing scale 4/8/12/16/24/32/48/64/80/112/160. All sections are content-driven; desktop references are 16:9 presentations, not a mandate to crop every real section into 100vh.

## Shape and finish
Buttons: minimum height 56px desktop, 52px mobile, horizontal padding24, 8px clipped upper-left/lower-right corners only as decorative wrapper. Native button hitbox remains rectangular. Secondary button 1px ivory/border outline. Focus ring 2px lime offset4. Cards radius12; form fields radius8; no pill overuse except filter chips. Borders1px. Extremely restrained shadow and glow. No frosted-glass soup.

## Iconography and images
Consistent 20/24px line icons, stroke1.75. Use one icon library with license captured. Arrows up-right for navigation/outbound-like CTAs; down chevrons for disclosure. No icon-only form actions without accessible labels. Architectural art uses black stone, subtle smoke, controlled lime lighting. Product cards use restrained abstract business imagery; no coin piles or stock broker handshakes.

## Logo
Desktop header 230–260px wide; mobile 168px. Preserve aspect ratio and colors. Clear space at least half rabbit-head width. No stretching, glow, rotation or hue cycling. The approved raster is a source reference; prepare a tightly trimmed high-resolution transparent asset with image editing only if needed and inspect at1x/2x. Keep exact contours. Real SVG needs reviewed path geometry.
