# 12 — Sources and provider preflight
Checked2026-11-03. These links establish provider capabilities at that time; they are not pinned permanent schemas.

- GPT Image2.5 Sunburst text-to-image: https://docs.kie.ai/43286810e0
- Seedance2.5: https://docs.kie.ai/market/bytedance/seedance-2-5
- KIE docs index: https://docs.kie.ai/

Verified narrow facts: shared asynchronous createTask endpoint with Bearer auth; Sunburst variant ID; Seedance2.5 variant ID; provider recommends completion callbacks for production; video frame modes and multimodal references are mutually exclusive. Exact status query schema,image-edit fields,limits,pricing and supported aspect-ratio/resolution enums must be read from the current linked documentation by the implementing agent. This pack intentionally does not guess them.

## Preflight record to create in ignored local output
Date,provider variant,documentation URL,task-create schema,status-query schema,callback contract,reference upload method,input limits,output dimensions,pricing/budget,account availability,dry-run payload,secret-safe execution command.

## Source hierarchy
User's current approved direction > this written spec > supplied visual references for composition > official current technical documentation for implementation details. If provider changes break a field, update adapter and source record without silently changing the brand or paid model.
