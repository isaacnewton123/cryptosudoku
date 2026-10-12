# 03 — Game App on Netlify (Free)

**Site:** `app.cryptosudoku.fun` → Netlify Starter site `cryptosudoku-app`.
**Framework:** Vite + React + TypeScript (recommended) **or** Next.js static export. Pick one; do not mix. Vite SPA is cheaper on Netlify (no SSR functions burned).

## 3.1 Why Netlify Here

- First-class SPA fallback (`/* → /index.html`), `_headers` caching, atomic deploys + instant rollbacks.
- Deploy Previews per PR with distinct URLs for QA vs. landing previews.
- Forms/Identity **not** used — auth stays in Supabase (avoids two user systems).

## 3.2 Project Setup

1. New Netlify site from `cryptosudoku-app` repo.
2. Build settings: Base = `/` (or `apps/app`), Build = `npm run build`, Publish = `dist` (Vite) / `out` (Next export).
3. Environment variables (all scopes unless noted):
   - `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (or `NEXT_PUBLIC_*` if Next)
   - `VITE_CHAIN_ID=677`, `VITE_RPC_URL` (public BOT RPC), `VITE_VERIFIER_ADDRESS`, etc. (addresses injected post-deploy — see `05`)
   - `VITE_APP_URL=https://app.cryptosudoku.fun`, `VITE_LANDING_URL=https://cryptosudoku.fun`
   - No `SERVICE_ROLE` key in Netlify env — Edge Functions hold it server-side.
4. Deploy contexts: `production` (from `main`), `deploy-preview` (PRs), `branch-deploy` (only `staging` to save build minutes).

`netlify.toml` baseline:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = { Role = ["visitor"] } # placeholder — real gating is in-app via Supabase Auth, not Netlify roles

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.wasm"
  [headers.values]
    Content-Type = "application/wasm"
    Cache-Control = "public, max-age=31536000, immutable"
    Cross-Origin-Embedder-Policy = "require-corp"
    Cross-Origin-Opener-Policy = "same-origin"

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.botchain.example https://*.walletconnect.com; img-src 'self' data: https:; script-src 'self'; style-src 'self' 'unsafe-inline'"
```

> Adjust `connect-src` to real BOT RPC + WalletConnect relay hosts. CSP lives here (Netlify) for the app; landing CSP lives in `vercel.json`.

## 3.3 Performance Budget (Free-Tier Driven)

- Initial JS ≤ 250KB gz; ZK WASM lazy-loaded **only** on Ranked flow (`import()` on route).
- Puzzle assets + NFT images via Supabase Storage CDN with `immutable` cache; never bundle them.
- Realtime: one channel per tournament view; unsubscribe on unmount (saves concurrent-connection quota).
- Disable source maps in production builds (`vite build --sourcemap false`) to cut bandwidth.

## 3.4 Wallet & Chain Wiring

- Libraries: `wagmi` + `viem` (typed, tree-shakeable). Connectors: injected (MetaMask), WalletConnect, Coinbase Wallet — matches PRD non-goals (no custom wallet).
- Chain config: BOT Chain ID 677, RPC from `VITE_RPC_URL`, block explorer link. Contract addresses from generated `abis/*.json` + `addresses.json` (see `05`).
- Free Play works wallet-less; Ranked prompts connect **only at proof submission** (reduces drop-off, avoids needless RPC calls).

## 3.5 Previews & Rollback

- Every PR → Deploy Preview; QA checklist: Free Play loop, wallet connect, proof submit on testnet, leaderboard realtime.
- Netlify "Locked deploys" for tournaments: pin production deploy during live epoch; unlock after payout.
- Instant rollback = one click in Netlify UI (no rebuild burns minutes).
