# 05 — Motion and cinematic entrance

## Principle
Motion supports orientation and atmosphere. It never delays financial information, locks scrolling, blocks a form, or makes a clickable element move away. No background audio. No autoplay with sound. Respect reduced-motion and data-saving signals; static poster always works.

## Motion choreography
| Element | Behavior | Timing |
|---|---|---|
| Hero text | opacity0→1, translateY16→0 | 560ms ease-out,60ms stagger,max240ms delay |
| Section reveal | once, opacity and12pxY | 480ms; threshold0.12 |
| Buttons/icons | color/border, arrow2px | 160ms |
| Cards | translateY-2px,border | 180ms |
| Accordion | natural disclosure or height animation | ≤240ms, no abrupt page jump |
| Ambient orbital layer | optional slow rotation | 90sec revolution, pause offscreen |
| Portal Enter | controlled camera/scale illusion + crossfade | 700–1000ms total |
| Intro Skip | immediate dismissal | 0–160ms |

Limit text motion to grouped lines; don't split letters into hundreds of spans. Never leave initial hidden content if observer/JS fails. No mandatory parallax. Optional desktop art parallax ≤12px, pointer-fine only, transform GPU layer, no state writes on every mouse event. Pause background media when document hidden or art offscreen.

## Intro state machine
States: bypassed / showing-poster / entering / dismissed. On deep link, session seen, reduced motion or failed init: bypass immediately. Default showing-poster uses logo and live text/buttons; video optional enhancement. Enter sets entering, disables repeated activation, waits at most1000ms, dismisses, writes session flag, restores focus to H1 (tabIndex -1 temporarily). Skip/Escape bypasses animation and dismisses. If animation rejects or media errors, still dismiss. Clear timers/listeners on unmount. Browser Back must not reopen intro automatically.

## Seedance usage
Generate environment-only plate from approved still with gentle mist and almost static light. Do not animate the logo or bake UI into video. Composite a fixed crisp logo and HTML over it. Asset prompt and loop instructions in `prompts/ASSET-PROMPTS.md`. Choose a legal supported duration after checking provider schema; target5–8sec ambient loop, shorten/encode in post. Loop seam must be inspected, not assumed from the word 'seamless'. Portal entry itself can be CSS/motion and need not spend video credits.

## Performance policy
Hero image loads first with dimensions and high priority. Video deferred until poster loaded and page interactive. Mobile and reduced-motion get poster only by default. Background video muted playsInline, no audio track, lightweight source and poster. If motion exceeds budget, remove it rather than degrade input responsiveness. No WebGL dependency required for first release.
