# 10 — Security, RLS & Compliance

## 10.1 Golden Rules

1. **Anon key is public** (ships in JS bundles). Safety comes from RLS + function validation, never from hiding it.
2. **Service-role key never leaves Supabase** (function secrets only). Leaked service key = full DB bypass.
3. **Browsers never write trusted state directly.** Scores, ranks, payouts are written by Edge Functions and contracts, not client inserts.
4. **Every function validates:** auth JWT → tournament window → rate limit → commitment match → signature (where wallet-bound).

## 10.2 RLS Starter Policies (Postgres)

```sql
alter table puzzles enable row level security;
alter table scores enable row level security;
alter table leaderboard_cache enable row level security;
alter table profiles enable row level security;
alter table waitlist enable row level security;

-- puzzles: public read of active ones only
create policy "read active puzzles" on puzzles for select
  using (active_date <= current_date);

-- scores: anyone can read tournament scores; users insert own only; no updates
create policy "read scores" on scores for select using (true);
create policy "insert own score" on scores for insert
  with check (auth.uid() = user_id);
-- (no update/delete policies = denied by default)

-- leaderboard_cache: public read-only
create policy "read leaderboard" on leaderboard_cache for select using (true);

-- profiles: public read (handles for leaderboard), self-update only
create policy "read profiles" on profiles for select using (true);
create policy "update own profile" on profiles for update
  using (auth.uid() = id) with check (auth.uid() = id);

-- waitlist: anon insert-only
create policy "waitlist insert" on waitlist for insert with check (true);
```

Review with `supabase db lint` + manual `EXPLAIN` on leaderboard queries. Add indexes before adding policies that scan.

## 10.3 Edge Function Hardening

- CORS allowlist (exact, no `*` with credentials):
  `https://cryptosudoku.fun, https://app.cryptosudoku.fun, http://localhost:5173, http://localhost:3000` + preview regex (`https://*.vercel.app`, `https://*.netlify.app` only in staging).
- Rate limiting: table `rate_limits(key, window, count)` — e.g. `submit-score`: 10/min/user + 60/min/IP; `waitlist`: 5/hr/IP. Return `429` with `Retry-After`.
- Input validation with `zod`: puzzle IDs UUID, `elapsed_ms` within sane bounds (e.g. 5s–2h), wallet `0x` + checksum.
- Secrets via `Deno.env.get()` from function secrets; never log them. Error envelope never echoes SQL or stack traces to clients (log full error server-side with request ID).

## 10.4 Web Hardening (Vercel + Netlify)

- CSP per site (see `02`/`03`); `frame-ancestors 'none'` (no clickjacked wallet prompts).
- `Referrer-Policy: strict-origin-when-cross-origin`; HSTS after SSL verified on both domains.
- Wallet: verify SIWE message domain matches `app.cryptosudoku.fun`; reject signatures from unknown domains (phishing guard).
- Storage: signed upload URLs short-lived (60s), MIME + size enforced; public buckets read-only.

## 10.5 Abuse & Tournament Integrity

- One ranked entry per user per tournament (`unique(user_id, tournament_id)`); duplicate wallet across accounts flagged in `close-epoch` report (not auto-ban in v1 — manual review).
- Proof replay rejected: commitment + tournament ID bound into proof input; `submit-proof` checks `proof_verified = false` before relay.
- On-chain `commitPuzzle` before window opens (see `05`); late commits invalidate the tournament (document as incident, refund/void per DAO policy draft).

## 10.6 Audit Hooks

- All payouts linkable: `leaderboard_cache` row → `tx_hash` → explorer. `close-epoch` writes JSON snapshot to Storage (`snapshots/<tournamentId>.json`) for independent recounts.
- Keep Supabase logs ≥ tournament duration; export `cron_runs` + function error samples into beta report (feeds `docs/05-roadmap.md` Phase 2 exit criteria).
