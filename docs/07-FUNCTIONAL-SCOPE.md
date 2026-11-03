# 07 — Functional scope and data boundaries

## Routes
| Route | Initial demo | Production boundary |
|---|---|---|
| / | seven sections, optional intro | approved copy and real disclosures |
| /businesses | search/filter/sample cards | published authorized inventory |
| /businesses/[slug] | sample public details | seller-approved public fields only |
| /sell | listing wizard,local demo draft | authenticated ownership,persistence,review |
| /about | real founder info only,else pending | owner-provided team and roles |
| /privacy and /terms | clearly marked draft placeholders | actual approved policies before launch |
| /saved | local saved sample IDs | account-bound saves if configured |

Never leave visible links404. `/about` can be an honest prelaunch page. Never present template legal text as reviewed advice. Core listing UX is separate from any regulated transaction activity; obtain actual applicable professional/legal requirements before operating, not guesses from an AI spec.

## Marketplace data contract
Listing: id,slug,title,category,location,currency,askingPrice,annualRevenue,profitAmount nullable,profitMetric nullable (SDE/EBITDA/netIncome),financialPeriod,financialSource ('sellerProvided'/'documentReviewed' only if true),description,coverAssetId,publicationStatus,isSample. Public projection must never include legal business name if anonymous, seller contact, private documents, customer lists or internal access tokens. Currency and period mandatory. Missing metrics show 'Not disclosed', not zero. All sample figures are illustrative and must never flow into public production inventory.

Filters: q string≤100, category enum, min/max asking price (nonnegative and ordered), location enum. URL is source of truth; use debounced search250ms, accessible result count, reset and back/forward restoration. Filter semantics AND between categories of filter; case-insensitive normalized text. No matches yields helpful reset CTA. Bookmarks persist IDs in localStorage with try/catch and graceful storage-disabled fallback. Demo saves labelled 'Saved on this device'.

## Listing details
Public summary: business model, approved description, asking price/currency, revenue/profit source/period, geography at seller-approved precision, highlights grounded in data. Demo CTA 'Preview information request' opens a labelled simulation. Production request needs buyer auth, validated profile, NDA workflow if seller requires, seller grant and short-lived file URLs. Gate private details SERVER-SIDE; CSS blur is not access control. Revocation and audit events required. No documents shipped in page source before authorization.

## Seller wizard
Steps:1 Overview (category,title,general location,website private),2 Financials (currency,period,revenue,asking,optional profit+metric),3 Disclosure (identity visibility,document access rules),4 Review. Required validation at each step; Back retains values. Demo stores nonsensitive example text only; warn before users enter actual sensitive information. Do not collect documents in demo. Review clearly says 'Demo draft — not published'. Export draft JSON only by explicit user action. Production uses authenticated ownership, server validation, draft DB, moderation and explicit publish confirmation. No default public exposure of identity or files.

## Introduction form
name2–100 chars; valid email≤254; website optional, parse http/https only; message20–2000 chars; intent seller/buyer required. Visible labels and privacy link. Client validation helps UX, server validation authoritative. Demo primary submission validates and then shows 'Demo only — your message has not been sent.' Keep user values, optionally offer explicit copy/download. Production POST /api/introduction with rate limits, honeypot, bounded payload, request ID/idempotency and configured destination. A2xx is success only after durable accepted record/queue; email failure after acceptance needs queued retry not a false lost request. Error retains fields and offers retry. Do not log messages or emails in analytics.

## Production authorization model
Roles: visitor,buyer,seller,admin. Owner relation per listing; explicit access-grant per buyer and private document scope. Server-enforced allow lists and object ownership; deny by default. Signed URLs with expiry, malware scanning for uploads, MIME allowlist,size cap,tenant isolation,audit log,retention and deletion policy. Cross-role access and guessed-ID tests mandatory. No private seller documents sent to KIE without separate explicit authorization.

## Engagement worth returning for
Useful saved searches, saved opportunities and accurate new-listing alerts can follow once account/consent services exist. Do not fake live interest, buyer counts, pending offers or 'only2 slots'. Relevance and quality generate repeat use; no fabricated pressure.
