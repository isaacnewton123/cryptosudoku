# 09 — Local Development Workflows

## 9.1 Prereqs

- Node 20 LTS, `npm` (or `pnpm` — one choice per repo), Git.
- Supabase CLI (`npm i -g supabase` or `brew install supabase/tap/supabase`), Docker running (for `supabase start`).
- Netlify CLI (`npm i -g netlify-cli`), Vercel CLI (`npm i -g vercel`) — only the CLI for the repo you touch.

## 9.2 Supabase Local (Primary Backend Dev)

```bash
# one-time
supabase init      # in cryptosudoku-supabase/ or app repo root
supabase start     # launches Postgres + Auth + Storage + Edge runtime locally

# daily loop
supabase db reset            # clean slate from migrations + seed.sql
supabase functions serve     # serve all Edge Functions with local env
supabase status              # copy local URL + anon key into .env.local
```

`.env.local` (app):

```
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=<local-anon-key>
VITE_CHAIN_ID=677
VITE_RPC_URL=<bohr-testnet-rpc>
```

`.env.local` (landing): same Supabase local URL with `NEXT_PUBLIC_*` prefix.

Migrations workflow: edit SQL → `supabase migration new <name>` → paste → `supabase db reset` → test → commit. Never `db push` to prod without staging first:

```bash
supabase link --project-ref <staging-ref> && supabase db push
# E2E pass, then:
supabase link --project-ref <prod-ref> && supabase db push
supabase functions deploy get-daily-puzzle submit-score submit-proof leaderboard-index close-epoch generate-puzzle
supabase secrets set --project-ref <ref> SERVICE_ROLE_KEY=... RPC_URL=...
```

## 9.3 App (Netlify Dev)

```bash
cd cryptosudoku-app
npm install
npm run dev            # plain Vite dev (fastest)
# or, to test redirects/headers locally:
netlify dev            # honors netlify.toml
```

Playwright E2E targets `netlify dev` URL with local Supabase env.

## 9.4 Landing (Vercel Dev)

```bash
cd cryptosudoku-landing
npm install
npm run dev            # plain Next dev (fastest)
# or:
vercel dev             # honors vercel.json
```

## 9.5 Seed Data

`supabase/seed.sql`: 3 puzzles (easy/medium/tournament), 1 live tournament, 5 demo profiles + scores. Seed script must be idempotent (`on conflict do nothing`) so `db reset` is safe to run repeatedly. Demo wallets use well-known test addresses only.

## 9.6 Waking a Paused Free Project

Free `staging` pauses after ~1 week idle: Supabase Dashboard → Resume → wait ~2 min → re-run `supabase link` + smoke `get-daily-puzzle`. Note wake-up in QA log so "staging down" isn't misfiled as a bug.
