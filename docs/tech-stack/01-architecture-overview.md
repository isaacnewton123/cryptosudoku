# 01 — Architecture Overview & Decisions

## 1.1 Goals

- $0 infra at MVP/beta using only free tiers.
- Landing and app deploy independently (marketing velocity ≠ game stability).
- One backend (Supabase) for auth, data, realtime, files, server logic.
- On-chain only for commitments, verification, rankings, payouts.

## 1.2 Repo Strategy (Recommended)

| Repo | Host | Contents |
| ---- | ---- | -------- |
| `cryptosudoku-landing` | Vercel | Marketing site, docs mirror, waitlist form (Supabase table, no auth) |
| `cryptosudoku-app` | Netlify | Game SPA, wallet flows, ZK prover, tournament UI |
| `cryptosudoku-contracts` | — (CI only) | Hardhat/Foundry contracts, deploy scripts, ABIs published to app via npm artifact or `abis/` copy |
| `cryptosudoku-supabase` (folder inside app repo **or** standalone) | Supabase CLI | `supabase/migrations/*.sql`, `supabase/functions/*`, `supabase/seed.sql` |

Monorepo (`apps/landing`, `apps/app`, `packages/*`, `supabase/`) is also acceptable, but then Vercel and Netlify each set a **Root Directory** to their app to avoid building the other. Two repos is simpler on free tiers (separate build quotas, separate preview noise).

## 1.3 Request Flows

### A. Free Play (no wallet)

```
App (Netlify) → Supabase Edge Function `get-daily-puzzle` → Postgres (puzzles)
              → play locally → submit score → `submit-score` (anon + rate-limit)
              → Realtime leaderboard update
```

### B. Ranked Tournament (wallet + ZK)

```
1. App reads Puzzle Registry commitment (BOT RPC) — proves puzzle fixed pre-window.
2. User solves locally; client WASM prover builds ZK proof.
3. App → `submit-proof` Edge Function: checks auth, tournament window, rate limit,
   then relays proof tx via user wallet (viem/wagmi) to ZK Verifier → Game Session.
4. Indexer function (`leaderboard-index`, cron or Realtime webhook) mirrors
   on-chain `ScoreRecorded` events into Postgres for fast UI.
5. Epoch close → Reward Distributor pays top-100 on-chain; indexer marks payouts.
```

### C. Landing Conversion

```
Vercel ISR page → Supabase `waitlist` insert (anon key, strict RLS: insert-only)
               → Plausible/Vercel Analytics (cookieless) for funnel
```

## 1.4 ADR-001: Appwrite → Supabase

**Context:** PRD v1.1 specified Appwrite Cloud.
**Decision:** Migrate to Supabase Free.
**Reasons:**
- Postgres + RLS gives row-level tournament/score isolation Appwrite rules can't express as cleanly.
- Edge Functions (Deno/TypeScript) colocated with DB; pg_cron for epoch jobs without an external scheduler.
- Realtime (Broadcast + Postgres Changes) covers live leaderboard without extra infra.
- Larger free-tier community examples for `pgvector` (future puzzle similarity) and PostgREST.
- MCP + CLI support in this workspace (`opencode.json` already wires Supabase MCP).

**Consequences:**
- Rewrite `docs/03`, `05`, `07` references (done — see notes below).
- Must design RLS first (see `04` + `10`); anon key is public by design.
- Self-host fallback changes from "Appwrite self-host" to "Supabase self-host / Postgres + PostgREST".

## 1.5 ADR-002: Two Hosts (Vercel + Netlify) Instead of One

**Context:** Either host could serve both sites.
**Decision:** Vercel = landing, Netlify = app.
**Reasons:**
- Isolates quotas (bandwidth/build minutes counted per platform, not shared).
- Lets marketing use Vercel's Next.js ISR/OG strengths while game uses Netlify's SPA redirect/header controls and Forms-free simplicity.
- Blast-radius separation: landing traffic spike (Product Hunt) can't starve game deploys.

**Consequences:**
- Two deploy pipelines to maintain (mitigated by `07` env matrix + shared UI package).
- CORS/allowed-origins must list both domains in Supabase Auth + Edge Functions.
- Shared design tokens must be versioned (`packages/ui`) to avoid drift.

## 1.6 Non-Goals (v1)

- No SSR for game state (static SPA + client fetch keeps Netlify bandwidth low).
- No custom backend server (no Express/Fastify to host — Edge Functions only).
- No cross-chain indexer yet (BOT RPC + one cron indexer suffices).
