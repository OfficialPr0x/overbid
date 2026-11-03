# 03 — Homepage implementation contract

## Shared page composition
One H1 only. Homepage sections follow 01–07, with stable anchor IDs below. Header is the one global navigation, not repeated logos/section headers from every reference screenshot. The reference section numbering is optional small chapter decoration in the live page. Preserve logical reading order. Visual target at1920×1080; annotate differences for other viewport heights.

## 00 — Optional threshold intro
Reference `08-splash.png`. Optional first-visit experience with full-screen black architectural portal, rabbit mark, centered live headline 'Follow the white rabbit. Own what comes next.' Copy 'A private introduction to your next chapter.' CTA 'Enter OVERBID ↗'; obvious 'Skip intro' top right. Never block access while video loads. Implement as an accessible dialog over the already-rendered page, focus within it, Escape/Skip/Enter dismiss. Session-only flag `overbid.intro.seen.v1`. Deep links and return visits bypass it. Reduced motion shows instant static composition. Intro may always be revisited through an understated footer control. Do not create a second indexed homepage or an SEO content gate.

## 01 — The Entrance · #home
Reference `01-entrance.png`; use `09-original-hero.png` as secondary reference.
Desktop header height96; logo left, links 'Sell a Business', 'Acquire a Business', 'Our Approach', outlined 'Private Introduction'. Hero grid6/6. Left headline maximum840px, right art fills half viewport with overlap under gradient at center. Art composition gateway center at72% horizontal. At1920 text begins80px from left; H1 begins approx180px from top. Hero min-height calc(100svh - 96px), but content can grow.
Eyebrow 'M&A • ACQUISITIONS • CAPITAL'. H1 four planned desktop lines: 'You built' / 'the empire.' / 'Own your' / 'next move.' Last two lime. Copy 'A private marketplace for business owners and ambitious buyers.' Buttons 'List Your Business ↗' → /sell and 'Explore Businesses' → /businesses. Bottom trust strip 'CONFIDENTIAL LISTINGS / QUALIFIED INTRODUCTIONS / CLEAR NEXT STEPS'; these describe intended workflows, not third-party certification.
Art is separate from HTML logo/copy. On mobile headline and actions come first, portal art below in4:3 crop; do not place text over smoke. Strip wraps into three short rows.

## 02 — The Advantage · #approach
Reference `02-advantage.png`. H2 'An unfair level of preparation.' Copy 'Better positioning. Relevant buyers. A clearer path to a deal.' Header across page, then left art5 columns / right content7. Left sculptural key with faint geometry, right three editorial rows (no generic feature-card grid):
1. 'Position the business' — 'Present the story, financials, and opportunity clearly.'
2. 'Connect with intent' — 'Match buyer criteria with the right opportunities.'
3. 'Move with clarity' — 'Keep information, introductions, and next steps organized.'
CTA 'See our approach ↗' opens a useful process dialog/page with scope, responsibilities and next steps; no empty modal. On mobile text precedes decorative art, numbers36px rather than oversized desktop72px.

## 03 — For Founders · #founders
Reference `03-founders.png`. Left6 columns: H2 'You built it. Make your next move count.' Second sentence lime. Copy 'Bring your business to market with a clear story and control over what you share.' CTA 'Start Your Listing ↗' → /sell; secondary 'Discuss your exit' → #introduction with seller selected. Note 'Begin with a private introduction.'
Right6: real responsive DOM listing-draft preview, eyebrow 'YOUR LISTING / DRAFT', heading 'Your business. Presented properly.' Three panels Business overview / Financial snapshot / Ideal buyer. 'Confidentiality controls': Identity withheld / Approve access requests. If controls are merely an illustration, use noninteractive styled indicators and label 'Interface preview'; no focusable fake toggles. Actual editable controls belong in wizard.
Bottom steps Create your profile / Prepare your listing / Review buyer interest. On mobile preview follows copy, simplified with three content rows; no desktop sidebar squeezed into small width.

## 04 — For Buyers · #buyers
Reference `04-buyers.png`. H2 'Find the business worth your next move.' Last clause lime. Copy 'Discover opportunities that fit your acquisition strategy.' Left5 columns filter form: Industry / Asking price / Location. CTA 'Explore Opportunities ↗' navigates /businesses with selected filters encoded in URL. Right7 cinematic private archive/dossier illustration without baked text; overlay dossier labels as DOM if needed. Footer three pillars Search with purpose / Request confidential details / Connect with sellers. Mobile filter controls full-width; artwork smaller and after form. Use labelled accessible select controls, not a fake screenshot.

## 05 — Selected Opportunities · #opportunities
Reference `05-marketplace.png`. H2 'Your next chapter. Now on the market.' Second sentence lime. Filter chips All businesses / SaaS / E-commerce / Services and labelled search. Three equal cards on desktop; two on tablet, one mobile. Sample cards use `data/sample-listings.json`. Clearly show 'Illustrative listings — sample data' in demo. Each card has category, title, asking price, annual revenue with explicit currency, location, bookmark action, View Opportunity. In production add profit metric/type/period and source/disclosure status when actually available. Do not equate revenue with profit. Preserve amounts as numbers, format with Intl.NumberFormat. Card layout aligns CTAs without truncating business titles. Empty/error/loading states mandatory.
Footer 'Have a business to sell?' and 'Create a listing ↗' → /sell. Homepage preview has3 items; /businesses provides expanded list/filter state. No fake inventory scarcity.

## 06 — Behind the Curtain · #trust
Reference `06-trust.png`. Left5 black embossed dossier artwork. Right7 H2 'Discretion outside. Clarity inside.' Last sentence lime. Copy 'Know who you are working with. Understand how the process works.' Three accordions: Who is behind OVERBID? / How does information access work? / What happens after an introduction? Show one open by default. Demo answer for first: 'Team information will be published before launch.' Real launch requires actual names/roles/contact and verified credentials where claimed.
Standard note 'Clear roles. Transparent fees. Confidential information handled with care.' This is a product intention; actual fees, roles and privacy process must be disclosed before launch. 'Meet OVERBID ↗' → /about. That route must never invent profiles or certifications. Mobile copy/accordions before decorative image; image may be reduced or omitted.

## 07 — Your Next Move · #introduction
Reference `07-introduction.png`. Left6 H2 'The next move is yours.' Last clause lime. Copy 'Tell us what you are building toward.' Rabbit over restrained orbital artwork; line 'FOLLOW THE WHITE RABBIT'. Right6 form with segmented intent 'I want to sell' / 'I want to buy', persistent visible labels Full name / Work email / Business website / What are you planning? Button 'Request a Private Introduction ↗'. Note 'Share an overview. Keep sensitive documents for later.' Privacy link adjacent to form. No unnecessary collection or newsletter consent preselection.
Footer logo, Privacy / Terms / Contact, business/legal identity when supplied, and BUSINESS SALES / ACQUISITIONS / CAPITAL. Intro replay can be a small extra action. Mobile footer wraps, form precedes decorative rabbit.
