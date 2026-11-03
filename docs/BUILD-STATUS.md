# Build status

Specification pack delivered. Application implementation has not started in this pack.

| Milestone | Status | Evidence | Remaining |
|---|---|---|---|
| M0 | pending | — | inspect target project |
| M1 | pending | — | static UI |
| M2 | pending | — | responsive/accessibility |
| M3 | pending | — | functional demo |
| M4 | pending | — | clean production assets/motion |
| M5 | pending | — | verification/handoff |
| M6 | unconfigured | — | production inputs |

Append commands,results,screenshot paths,decisions and known gaps. Do not treat reference screenshots as implementation evidence.

## Decisions

- 2026-11-03 — Display face changed from Space Grotesk to Host Grotesk (self-hosted OFL variable, weights 300–800). Headlines set to 800, supporting titles to 700, tracked eyebrows to 600. Body and UI stay Inter. Reason: Space Grotesk’s geometric cut stays optically light and does not carry the brand’s authority. Tracking token is now -0.04em.
- 2026-11-03 — Social preview uses `Lime-lit monolith with rabbit seal.png`, exported to `src/app/opengraph-image.jpg` and `src/app/twitter-image.jpg` at 1200×630 (113KB). Absolute image URLs follow the deployment host. Canonical domain is still unset until ownership is confirmed.
