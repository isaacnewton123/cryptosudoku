# 07 — DevOps, Environments & Domains

## 7.1 Proposed DNS Map

| Host | Platform | Purpose |
| ---- | -------- | ------- |
| `cryptosudoku.fun` | Vercel | Landing (canonical) |
| `www.cryptosudoku.fun` | Vercel redirect | → apex |
| `app.cryptosudoku.fun` | Netlify (CNAME) | Game SPA |
| `staging-app.cryptosudoku.fun` (optional) | Netlify branch deploy | Pre-tournament QA |

Registrar holds NS; add `A`/`CNAME` per Vercel + Netlify domain wizards. Enable auto-SSL on both; HSTS only after both SSLs verify.

## 7.2 Branch → Deploy Matrix

| Branch | Vercel (landing) | Netlify (app) | Supabase target |
| ------ | ---------------- | ------------- | --------------- |
| PR branch | Preview URL | Deploy Preview | Local CLI or `staging` project |
| `staging` | Preview (staging env) | Branch deploy | `staging` project |
| `main` | Production | Production (locked during epochs) | Prod project |

Lock Netlify production during live tournament epochs (Netlify UI → Deploys → Lock). Landing stays unlocked (marketing can ship mid-tournament safely).

## 7.3 Env-Var Matrix (No Duplicated Secrets)

| Var | Landing (Vercel) | App (Netlify) | Notes |
| --- | ---------------- | ------------- | ----- |
| Supabase URL | `NEXT_PUBLIC_SUPABASE_URL` | `VITE_SUPABASE_URL` | Same prod URL in prod; staging URL in previews |
| Supabase anon key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `VITE_SUPABASE_ANON_KEY` | Public; safe in client |
| Service-role key | ❌ never | ❌ never | Only in Supabase Function secrets |
| Chain ID / RPC / explorer | `NEXT_PUBLIC_*` (read-only display) | `VITE_*` | Same values |
| Contract addresses | ❌ (landing doesn't call chain) | `VITE_*_ADDRESS` | Injected after deploy; keep in `addresses.json` + env mirror |
| App/Landing URLs | `NEXT_PUBLIC_APP_URL` | `VITE_LANDING_URL` | Cross-links + CORS |

Preview envs point at `staging` Supabase; production envs at prod. Never point a preview at prod DB with write access unless explicitly QA-ing a migration.

## 7.4 CI Checks (Free-Tier Friendly)

- GitHub Actions (free for public repos): `lint + typecheck + unit test + build` on every PR for both repos.
- Contract repo: `npx hardhat test` + `slither` (or Foundry `forge test`) before any testnet deploy tag.
- Supabase: `supabase db lint` + `supabase functions deploy --dry-run` (or equivalent) before staging push.
- Required checks before merge: build green + preview URL commented.

## 7.5 Release Checklist (Tournament-Safe)

1. Contracts frozen + addresses pinned → app PR updates `addresses.json`.
2. Supabase migrations applied to staging → E2E pass → apply to prod (off-peak).
3. Netlify production locked → deploy app → smoke test Free Play + Ranked (testnet) → unlock or keep locked for epoch.
4. Vercel landing deploys independently anytime.
5. Post-epoch: `close-epoch` logs reviewed, payouts verified on explorer, leaderboard snapshot archived.
