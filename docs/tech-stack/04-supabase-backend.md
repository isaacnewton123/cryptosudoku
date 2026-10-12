# 04 — Supabase Backend (Free Tier)

Single backend for **Postgres + Auth + Realtime + Storage + Edge Functions + Cron**. Nothing else to host.

## 4.1 Postgres Schema (v1 Draft)

```sql
-- profiles: one row per auth.users id
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  handle text unique not null,
  wallet text, -- hex address, nullable until ranked play
  created_at timestamptz default now()
);

-- puzzles: generated daily + tournament sets
create table puzzles (
  id uuid primary key default gen_random_uuid(),
  seed text not null,
  difficulty text not null check (difficulty in ('easy','medium','hard','tournament')),
  grid jsonb not null,          -- givens
  solution_hash text not null,  -- sha256 of solution, commitment helper
  onchain_commitment text,      -- tx hash / commitment id on BOT Registry
  active_date date,
  created_at timestamptz default now()
);

-- tournaments
create table tournaments (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  puzzle_id uuid references puzzles(id),
  max_entries int default 10000,
  created_at timestamptz default now()
);

-- scores: off-chain submissions + mirrored on-chain finals
create table scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  tournament_id uuid references tournaments(id),
  elapsed_ms int not null,
  mistakes int not null default 0,
  proof_verified boolean default false,
  tx_hash text,
  created_at timestamptz default now(),
  unique (user_id, tournament_id)
);

-- leaderboard_cache: fast read model updated by indexer
create table leaderboard_cache (
  tournament_id uuid references tournaments(id),
  user_id uuid references profiles(id),
  rank int not null,
  elapsed_ms int not null,
  primary key (tournament_id, user_id)
);

-- waitlist (landing; unauthenticated inserts only)
create table waitlist (
  email citext primary key,
  source text,
  created_at timestamptz default now()
);
```

Indexes: `scores(tournament_id, elapsed_ms)`, `leaderboard_cache(tournament_id, rank)`, `puzzles(active_date)`. Enable `pg_cron` + `pgcrypto` extensions.

Migrations live in `supabase/migrations/`; never edit prod via dashboard SQL without a matching migration file.

## 4.2 Auth

- Providers: Email (magic link) + Sign in with Ethereum (SIWE via Supabase Auth `signInWithWeb3` or custom verify in Edge Function — pick one and document). Social logins deferred to cut free-tier MAU noise.
- Client uses **anon key** only. `service_role` key lives **only** in Edge Function secrets.
- Supabase Auth config: Site URL = `https://app.cryptosudoku.fun`; Additional Redirect URLs = `https://cryptosudoku.fun`, `http://localhost:5173`, `http://localhost:3000`, Netlify/Vercel preview wildcards as needed.
- Link `profiles.id` to `auth.users.id` via trigger `handle_new_user()` on signup.

## 4.3 Row-Level Security (Summary; Full Rules in `10`)

| Table | anon | authenticated |
| ----- | ---- | ------------- |
| `puzzles` | `SELECT` only where `active_date <= today` | same + tournament puzzles if entered |
| `scores` | none | `SELECT` all in tournament; `INSERT` own row only; no `UPDATE` (corrections via function) |
| `leaderboard_cache` | `SELECT` | `SELECT` |
| `profiles` | none (or handle-only for leaderboard join via view) | `SELECT` all; `UPDATE` own row |
| `waitlist` | `INSERT` only (no select/update/delete) | none extra |

All tables: `ENABLE ROW LEVEL SECURITY`, `FORCE` where applicable. Service-role bypasses RLS — that is why it never ships to browsers.

## 4.4 Realtime

- Channels: `tournament:{id}:leaderboard` (Broadcast of top-N diffs) + Postgres Changes on `leaderboard_cache` filtered by `tournament_id`.
- Publish via Edge Function after score ingest (not direct client inserts) to keep payloads small and trusted.
- Client subscribes once per view; caps at ~50 rows initial + diffs (protects concurrent-connection quota).

## 4.5 Storage

Buckets: `nft-metadata` (public read, function-gated write), `cosmetics` (public read), `puzzle-assets` (public read). All writes via signed URLs minted by Edge Functions; no public writes. Set `fileSizeLimit` low (e.g. 1–2MB) and restrict MIME types (`image/*`, `application/json`).

## 4.6 Edge Functions (Deno/TypeScript)

| Function | Trigger | Does |
| -------- | ------- | ---- |
| `get-daily-puzzle` | GET (anon, rate-limited) | Returns today's puzzle (no solution), logs fetch |
| `generate-puzzle` | pg_cron daily + manual | Creates puzzle row, computes `solution_hash`, queues on-chain commitment job |
| `submit-score` | POST (auth) | Validates window, upserts `scores` (unverified), publishes realtime hint |
| `submit-proof` | POST (auth + wallet sig) | Verifies SIWE, checks commitment, relays/stores proof ref, marks `proof_verified` after on-chain confirm |
| `leaderboard-index` | pg_cron every 1–5 min + on-demand | Reads `ScoreRecorded` events via RPC, upserts `leaderboard_cache` |
| `close-epoch` | pg_cron at tournament end | Freezes entries, triggers payout read-back, writes results |

Conventions: each function in `supabase/functions/<name>/index.ts` with shared `_shared/supabase.ts` (service-role client) + `_shared/rateLimit.ts` (table-backed IP+user throttle). CORS allowlist: both prod domains + localhost + preview regex. Always `try/catch` → JSON error envelope `{ error: { code, message } }`, never leak service errors.

## 4.7 Cron (pg_cron, Not Vercel/Netlify)

- `generate-puzzle` daily 00:05 UTC; `leaderboard-index` every 2 min during live tournaments, hourly otherwise; `close-epoch` at `tournaments.ends_at`.
- Keep cron count ≤ 3 on free tier; log runs to `cron_runs` table for observability.

## 4.8 Environments

- One Supabase **Free project** for prod; local Supabase CLI (`supabase start`) for dev; optional second Free project as `staging` (note: Free projects pause after inactivity — document wake-up step in `09`).
- Branching (paid) is **not** assumed; use local CLI + `staging` project instead.
