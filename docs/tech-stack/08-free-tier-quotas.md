# 08 — Free-Tier Quotas & Guardrails

> Quotas change. Numbers below are **planning baselines as of Oct 2026** — revalidate in each dashboard before investor claims or tournament sizing. Design assumes the *lowest* plausible free cap.

## 8.1 Planning Baselines

### Vercel (Hobby)

| Resource | Baseline | Guardrail |
| -------- | -------- | --------- |
| Bandwidth | ~100 GB/mo | Static-first, images via `next/image` + CDN cache; video click-to-load |
| Build minutes | Shared monthly pool | Small landing bundle; avoid `staging` auto-builds on every push |
| Serverless invocations | Low (ISR + OG only) | No API-heavy routes; waitlist insert is single lightweight handler |
| Previews | Unlimited-ish | Prune stale PRs; don't keep 20 open previews generating traffic |

### Netlify (Starter)

| Resource | Baseline | Guardrail |
| -------- | -------- | --------- |
| Bandwidth | ~100 GB/mo | No source maps in prod; WASM + assets `immutable`; Storage CDN for images |
| Build minutes | ~300 min/mo | Cache `node_modules`; `branch-deploy` only for `staging`; lock prod during epochs |
| Serverless/Edge | Minimal use (prefer Supabase) | No Netlify Functions in v1 — all server logic in Supabase Edge Functions |
| Forms/Identity | Not used | Avoid accidental enable (would double auth systems) |

### Supabase (Free)

| Resource | Baseline | Guardrail |
| -------- | -------- | --------- |
| Database size | ~500 MB | Prune old `scores` to aggregated snapshots post-epoch; archive to Storage JSON |
| Monthly active users | ~50k | Magic-link only; no bot-friendly open signup loops |
| Bandwidth / API calls | Single-digit GB + rate limits | Read from `leaderboard_cache`, paginate (25–50 rows), one Realtime channel per view |
| Storage | ~1 GB | Cap uploads; NFT metadata is JSON + small images only |
| Edge Function invocations | ~500k/mo | Cache daily puzzle client-side; cron `leaderboard-index` every 2 min only during live events |
| Realtime connections | Low concurrent cap | Unsubscribe on unmount; broadcast diffs, not full tables |
| Project pausing | Pauses after inactivity | Staging will pause — document wake-up; prod needs weekly activity (cron counts) |
| Projects | 2 free | Exactly prod + staging; no per-PR database projects |

## 8.2 What Breaks First (and the Fix)

1. **Supabase DB size** (scores grow fast) → archive + aggregate; cap `max_entries` per tournament.
2. **Bandwidth spikes** (tournament stream + images) → immutable caching + pagination + poster-first media.
3. **Build minutes** (two hosts × frequent pushes) → batch marketing edits; `[skip ci]`-aware squash merges.
4. **Realtime fan-out** (everyone on leaderboard socket) → broadcast top-50 diffs; full table is paginated REST.

## 8.3 Upgrade Triggers (When Free Stops Being Free)

| Signal | Upgrade path (cheapest first) |
| ------ | ----------------------------- |
| DB > 70% for 2 weeks | Supabase Pro **or** aggressive archival (decide per cost review) |
| Bandwidth overage warnings on either host | Move large media to Supabase Storage / R2-style object CDN; then paid bandwidth |
| Cron/indexer needs <1 min cadence | Supabase Pro (more cron reliability) or external scheduler (adds cost — avoid) |
| Need 99.9% SLA / no pausing for staging | Pro for prod only; keep staging free + pausable |

No paid upgrade is in the v1 budget — any trigger fires a treasury/DAO cost review (see `docs/06-funding-strategy.md` ops line).
