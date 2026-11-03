# 06 — Asset production and KIE integration

## Source separation
The supplied section PNGs are composition references. Do not deploy them as webpage backgrounds: they contain baked text/UI. Generate CLEAN scene plates, then use actual HTML for content and the approved logo overlay. Do not regenerate the brand mark inside scenery, where it will drift. Art direction follows prompts; exact UI follows docs/03.

## Art inventory
See `design/asset-manifest.json`: clean right-weighted gateway hero, centered intro gateway, sculptural key, archive/dossiers, embossed dossier still,3 abstract listing covers, and optional ambient video. Reuse CSS/SVG geometry where it adds precision. No image model needed for buttons or simple lines. Final artwork must be reviewed for distorted symbols, unwanted writing, accidental faces and inconsistent green.

## Raster delivery
Desktop art master target2560×1440; export to supported provider dimensions then resize/crop in post if necessary. Mobile master1080×1440 with intentional focal point, not blind desktop crop. Serve responsive AVIF/WebP plus suitable fallback. Hero target≤450KB at1440 display, mobile≤220KB; nonhero images≤200KB each. Logo≤100KB if possible without damage. Optional ambient video target≤3MB desktop, none auto-loaded mobile. Dimensions/aspect ratios reserved to avoid layout shift. Visual assets have no readable legal/financial copy baked in.

## Build-time pipeline
1. Read official model docs and user's existing KIE tooling; record variant, input schema, account access and pricing date.
2. Select one asset, prepare prompt+negative constraints+required reference, and dry-run payload with secrets redacted.
3. Confirm authorized count/spend cap. Generate first hero plate only; inspect before related assets.
4. Persist provider taskId, asset ID, prompt, model variant, timestamp, output metadata and local output path in an ignored job log. Never put API key or temporary signed URLs in committed manifests.
5. Poll with backoff only if no trusted callback setup; stop at a bounded timeout and report pending task. Resume by known taskId rather than accidentally creating another paid job.
6. Download results to staging, validate mime/size/dimensions, inspect, optimize and promote approved exports. Keep originals outside public serving directory. Commit approved exports and sanitized manifest.
7. Never depend on expiring provider output URLs at runtime.

## Verified provider facts / configurable defaults
Official docs checked2026-11-03 show shared POST `https://api.kie.ai/api/v1/jobs/createTask`, Bearer authentication, and asynchronous `data.taskId`. Text-to-image variant `gpt-image-2-5-sunburst-text-to-image`; video variant `bytedance/seedance-2-5`. KIE lists multiple GPT Image2.5 variants; the user has not selected Sunburst versus Flare. Treat these as configurable provider names, not claims about an OpenAI public API model. Recheck on implementation day. No automatic fallback to a different paid model.

A minimal documentation-derived text-to-image example is in `design/kie-image-request.example.json`. Aspect ratio16:9 and output resolution must be validated against current model/account before sending; do not infer support solely from the desired deliverable. Image-to-image needs its own verified endpoint schema; do not append guessed reference-image fields to the text-to-image payload.

## Credentials
`KIE_API_KEY` only local tooling/server-side; never NEXT_PUBLIC or VITE-prefixed. Do not print env values. User may supply an existing connector/skill; reuse it after inspecting its contract. Asset-generation scripts must fail closed on missing key/model, default dry-run and require an explicit execution flag and max-task cap. Site visitors cannot submit paid generations.

## Jobs and callbacks
Implement provider adapter states as project abstractions: queued/running/succeeded/failed/timed_out, mapping from documented raw fields. Never assume these exact strings are KIE's status schema. Validate create response HTTP status AND provider business status. Store task association. Ignore duplicate callbacks safely, reject unknown task IDs; authenticate callbacks by a documented signature mechanism if offered, otherwise treat callback as a hint and retrieve authoritative status server-side. Validate returned media URLs and download limits. Retry safe status reads with capped exponential backoff/jitter; don't blindly retry create calls after network ambiguity. Maintain bounded job timeout and recovery instructions.

## Video
Seedance docs distinguish reference mode from first/last-frame mode. Do not mix modes. Read current input fields before selecting image-to-video. Disable generated audio for ambient assets. Preserve original still and composited logo rather than trusting frame-to-frame symbolic fidelity.

Sources and preflight checklist: `docs/12-SOURCES-AND-PREFLIGHT.md`.
