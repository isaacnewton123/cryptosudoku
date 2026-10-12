# 06 — Shared Frontend Conventions

Applies to **both** Vercel landing and Netlify app. Goal: avoid drift between two deploys.

## 6.1 Packages (Monorepo Optional, Conventions Mandatory)

- `packages/ui`: design tokens, buttons, cards, tournament widgets (Tailwind or CSS Modules — one choice).
- `packages/config`: chain constants (`CHAIN_ID=677`), contract addresses loader, Supabase client factory.
- `packages/puzzle`: Sudoku generator/solver/validator (shared by landing demo + app + Edge Function port). Client uses TS version; prover WASM wraps the same constraints.

If two repos: publish `packages/*` via git submodule or npm pack artifact — document which in each repo README. Do not copy-paste components.

## 6.2 Data Fetching

- Supabase JS v2 (`@supabase/supabase-js`) with anon key; one client singleton per app.
- Queries prefer `leaderboard_cache` (indexed, RLS-open read) over raw `scores` joins.
- Realtime: `supabase.channel(...).on('broadcast' ...).subscribe()`; always `.unsubscribe()` on unmount. No polling fallback except manual refresh button.

## 6.3 ZK Client

- Prover compiled to WASM, lazy `import()` on Ranked route only. Landing never bundles it.
- Prover inputs: puzzle + solution (local); outputs: proof bytes. No solution leaves the client except as proof.
- Version-pin circuit params (`circuit vX`); display version in UI footer for auditability.

## 6.4 Testing

| Level | Tool (suggested) | Gate |
| ----- | ---------------- | ---- |
| Unit (puzzle logic, fee math) | Vitest | `npm test` in CI |
| Component | Testing Library / Playwright CT | PR check (app only) |
| E2E (Free Play → score → leaderboard) | Playwright vs. local Supabase + preview | Nightly or pre-tournament |
| Contract | Hardhat/Foundry tests | Pre-audit gate (Phase 2) |

## 6.5 Accessibility & Mobile

- Touch-first Sudoku grid (≥44px cells on mobile), keyboard support on desktop, `prefers-reduced-motion` respected.
- Both sites: semantic HTML, labeled inputs, contrast AA. Game must be playable at 360px width (primary user segment is mobile-friendly per `docs/02`).
