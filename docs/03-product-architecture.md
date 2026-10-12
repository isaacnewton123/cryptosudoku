# III — Product Architecture

## 3.1 Design Philosophy: "Verify On-Chain, Play Off-Chain"

Separate **gameplay** (off-chain: fast, free) from **verification and rewards**
(on-chain: transparent, automatic). Target: Web2-smooth play with Web3 guarantees.

## 3.2 System Components

### Frontend Layer

- Landing site (`cryptosudoku.fun`) on **Vercel** — Next.js static/ISR marketing pages; see [tech-stack/02](../tech-stack/02-landing-vercel.md).
- Game app (`app.cryptosudoku.fun`) on **Netlify** — Vite SPA (or Next static export), wallet connection (MetaMask, WalletConnect, Coinbase Wallet), lazy-loaded client ZK prover (WASM), realtime leaderboard panel; see [tech-stack/03](../tech-stack/03-app-netlify.md).
- Shared UI kit + puzzle logic conventions: [tech-stack/06](../tech-stack/06-shared-frontend.md).

### Backend Layer (Supabase — replaces former Appwrite reference)

| Service | Use |
| ------- | --- |
| Auth | Web2 (magic link) + Web3 (SIWE) user authentication |
| Database (Postgres + RLS) | Puzzles, scores, tournaments, user profiles, leaderboard cache |
| Storage | NFT metadata, cosmetic assets, epoch snapshots |
| Edge Functions | Daily puzzle generation, score/proof ingest, leaderboard indexing, epoch close |
| Realtime | Live leaderboard updates (broadcast + Postgres Changes) |
| Cron (pg_cron) | Scheduled generation / indexing / epoch close |

Full schema, function list, and RLS summary: [tech-stack/04](../tech-stack/04-supabase-backend.md). Security rules: [tech-stack/10](../tech-stack/10-security-compliance.md).

### On-Chain Layer (BOT Chain, Chain ID 677)

| Contract | Responsibility |
| -------- | -------------- |
| Puzzle Registry | Proof-of-commitment (puzzle hash before play) |
| ZK Verifier | Validates solution proofs |
| Game Session | Records scores |
| Leaderboard | Ranking finality |
| Reward Distributor | Top-100 payouts |
| Staking | Passive income / revenue share |
| NFT Pass | Premium tournament access |

### Stack Summary

- Landing: Next.js on Vercel (`cryptosudoku.fun`).
- App: Vite SPA (or Next static export) on Netlify (`app.cryptosudoku.fun`) + client ZK prover (WASM, lazy-loaded).
- Backend: Supabase (auth, Postgres+RLS, storage, Edge Functions, realtime, pg_cron).
- Chain: BOT Chain EVM (Chain ID 677), OpenZeppelin UUPS proxies.
- Detail: [tech-stack/](../tech-stack/README.md).

## 3.3 Upgradeability Principles

All core contracts use **UUPS (Universal Upgradeable Proxy Standard)**:

- Bug fixes without state migration.
- New features (modes, rewards, integrations) without changing addresses.
- Gas optimizations over time.

**Upgrade governance:** multi-signature wallet + **48-hour timelock**. Every
upgrade requires multi-party approval (core team, investors, community reps)
with public review time before deployment.

## 3.4 Anti-Cheating Guarantees

Three layers of defense:

1. **On-chain puzzle commitment** — puzzle hashed + stored before play; admins cannot swap mid-game.
2. **Zero-Knowledge Proof** — player proves valid solution without revealing grid publicly; verified on-chain.
3. **Immutable leaderboard** — once recorded, no party (including team) can alter scores.

## 3.5 Functional Requirements (Refined)

| ID | Requirement | Layer |
| -- | ----------- | ----- |
| FR-1 | Play daily / tournament puzzle off-chain, free | Netlify app + Supabase |
| FR-2 | Commit puzzle hash on-chain before play window | Puzzle Registry |
| FR-3 | Generate + submit ZK solution proof from client | Netlify app (WASM) + ZK Verifier |
| FR-4 | Record verified score immutably | Game Session + Leaderboard + Supabase cache |
| FR-5 | Distribute epoch rewards to top 100 automatically | Reward Distributor |
| FR-6 | Gate premium tournaments via NFT pass | NFT contract |
| FR-7 | Stake SUDO for revenue-share APY | Staking contract |

## 3.6 Non-Functional Requirements (Refined)

- **Verifiability:** any result reproducible from on-chain data.
- **Upgrade safety:** timelocked, multisig-approved, audited changes only.
- **UX:** wallet-optional Free Play; wallet-required for ranked rewards.
- **Portability:** modular Supabase usage (migrations + Edge Functions in repo); self-host migration path preserved.
- **Cost:** free-tier-only infra at MVP (Vercel Hobby + Netlify Starter + Supabase Free); quotas + upgrade triggers in [tech-stack/08](../tech-stack/08-free-tier-quotas.md).

> Refined from `plan.md` Ch. III. v1.2: Appwrite → Supabase, split frontend into Vercel landing + Netlify app; no game-logic decisions changed.
