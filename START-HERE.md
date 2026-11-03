# Start here

## Owner decisions already settled
- Name: OVERBID CAPITAL. Domain direction: overbidcapital.com; ownership and DNS are not verified by this pack.
- Audiences: business owners, especially SaaS founders; acquisition entrepreneurs, investors and qualified buyers.
- Visual identity: use `Reference-Guidelines/00-approved-logo.png`. No shark, gold-only wealth-management rebrand, or ordinary corporate-template replacement.
- Seven homepage chapters, plus optional cinematic entrance.
- Art generation: KIE API, GPT Image 2.5 family for stills and Seedance for motion; keep exact provider variant configurable.
- Build in the user's Cursor repository. This is not a request to publish or use another hosting product.

## Default implementation choices
Use Next.js App Router, React, TypeScript, CSS variables with CSS Modules, a small shared component library, and one motion library only if necessary. Validate current package versions and peer dependencies in official docs, then lock them. Avoid unnecessary state frameworks and component kits that dictate the visual design. Use local fixture data first.

## First agent output
Before code, provide a concise inspection report: existing stack, instruction conflicts, available references, asset gaps, intended file tree, chosen package versions, first milestone. Then implement. Ask only when a missing decision blocks correct work; continue unrelated tasks.

## Delivery boundary
A design demo is not an operational business brokerage. Report which behaviors are local, mocked, or production-connected. Track owner inputs in `docs/11-LAUNCH-INPUTS.md` rather than inventing them.
