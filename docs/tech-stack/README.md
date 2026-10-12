# Tech Stack Documentation — Free-Tier Architecture

**Stack decision (canonical):** Vercel (landing) + Netlify (app) + Supabase (backend) + BOT Chain (settlement).
**Status:** Draft — supersedes all `Appwrite Cloud` references in `docs/01–09`.
**Domain:** `cryptosudoku.fun` (landing) + `app.cryptosudoku.fun` (app, proposed).

## Why This Split

| Concern | Decision | Rationale |
| ------- | -------- | --------- |
| Landing page | Vercel Hobby | Best Next.js ISR/OG-image DX, free SSL, preview URLs for marketing review |
| App (game) | Netlify Starter | Free SPA hosting with fine-grained `_headers` / `_redirects`, background-function-ready, isolates game deploy cadence from marketing |
| Backend | Supabase Free | Single free-tier Postgres + Auth + Realtime + Storage + Edge Functions replaces 5 separate services |
| Chain | BOT Chain 677 | Proof commitment + ZK verify + payouts; unchanged from PRD |

> Old docs referenced Appwrite Cloud. That is **deprecated**. See [ADR-001](01-architecture-overview.md#adr-001-appwrite--supabase) for migration rationale.

## Folder Map

| File | Covers |
| ---- | ------ |
| [01-architecture-overview.md](01-architecture-overview.md) | Topology, request flows, repo strategy, ADR |
| [02-landing-vercel.md](02-landing-vercel.md) | Landing on Vercel: framework, ISR, analytics, domains |
| [03-app-netlify.md](03-app-netlify.md) | Game app on Netlify: SPA routing, caching, wallet, ZK bundle |
| [04-supabase-backend.md](04-supabase-backend.md) | Postgres schema, Auth, RLS, Realtime, Storage, Edge Functions, Cron |
| [05-blockchain-layer.md](05-blockchain-layer.md) | Contracts, viem/wagmi, commit→prove→record→payout flow |
| [06-shared-frontend.md](06-shared-frontend.md) | Shared UI kit, state, testing, ZK client conventions |
| [07-devops-environments.md](07-devops-environments.md) | Repos, branches, previews, env-var matrix, domains, CI |
| [08-free-tier-quotas.md](08-free-tier-quotas.md) | Free-tier limits, guardrails, upgrade triggers |
| [09-local-dev-workflows.md](09-local-dev-workflows.md) | Local Supabase CLI, `netlify dev`, `vercel dev`, seeding |
| [10-security-compliance.md](10-security-compliance.md) | RLS, secrets, CSP/CORS, abuse prevention, audit hooks |

## Topology (Text Diagram)

```
                    cryptosudoku.fun              app.cryptosudoku.fun
                   +----------------+            +------------------+
                   | Landing (Vercel)|            | App SPA (Netlify)|
                   | Next.js static/ |            | Vite or Next     |
                   | ISR + OG images |            | + ZK prover (WASM)|
                   +--------+-------+            +--------+---------+
                            |                             |
                            | Supabase JS (anon key)      | Supabase JS + wagmi/viem
                            v                             v
                   +------------------------------------------------+
                   | Supabase Free                                  |
                   | Auth | Postgres+RLS | Realtime | Storage |      |
                   | Edge Functions (puzzle-gen, score-ingest,      |
                   | leaderboard-index) | pg_cron                   |
                   +-------------------------+----------------------+
                                             |
                                             | RPC + signed txs
                                             v
                                   +------------------+
                                   | BOT Chain (677)  |
                                   | Registry, Verifier,
                                   | Session, Leaderboard,
                                   | Distributor, Staking |
                                   +------------------+
```

**Key rule:** browsers never touch Postgres directly without RLS; writes that need trust (score finalization, payouts) go through Edge Functions + on-chain verification.

## Read Order

1. `01` for mental model + ADRs.
2. `04` + `10` for backend/security feasibility.
3. `02`, `03`, `07` for deploy/ops.
4. `08` before any investor claim about "zero infra cost".
