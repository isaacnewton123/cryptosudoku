# V — Development Roadmap

## Phase 0: Validation & Foundation (Months 1–2)

**Focus:** Technical, ecosystem, and funding foundations before production code.

**Key Activities**
- Submit BOT Chain Ecosystem Support Program proposal.
- Enter BOT Chain Builder Challenge.
- Register Supabase project, configure auth/RLS/DB baseline (migrations in repo); create Vercel (landing) + Netlify (app) projects with preview deploys.
- ZK circuit exploration for Sudoku on Bohr testnet.
- BOT Chain / GameFi community due diligence.

**Deliverables**
- Accepted grant proposal.
- Working ZK proof-generation prototype.
- Ecosystem partner integration map.

**Exit Criteria:** grant submitted + ZK prototype proves solution verification end-to-end.

## Phase 1: MVP Development (Months 3–6)

**Focus:** Fully functional core product.

**Key Activities**
- Core contracts (UUPS pattern).
- Landing on Vercel + game SPA on Netlify (see `tech-stack/02–03`).
- Supabase auth / database (RLS-first) / storage / Edge Functions integration.
- Client-side ZK prover (WASM, lazy-loaded).
- Free Play + Ranked Tournament modes.

**Deliverables**
- Playable MVP on testnet.
- Technical documentation.
- First internal audit.

**Exit Criteria:** testnet loop FR-1 → FR-4 works (see Architecture doc).

## Phase 2: Beta & Audit (Months 7–8)

**Focus:** Security + quality before mainnet.

**Key Activities**
- Independent contract audit.
- Closed beta with BOT Chain community.
- Feedback-driven fixes.
- Mainnet infra prep.

**Deliverables**
- Public audit report.
- Beta test report.
- Mainnet launch plan.

**Exit Criteria:** no unresolved critical/high audit findings; beta report signed off.

## Phase 3: Mainnet Launch (Months 9–10)

**Focus:** Public launch + initial users.

**Key Activities**
- Mainnet deploy on BOT Chain (677).
- First grant-funded rewards tournament.
- Vendetta Games BotChain App integration.
- GameFi partner acquisition campaigns.
- Referral program activation.

**Deliverables**
- Live mainnet with active users.
- First top-100 rewarded tournament.
- ≥ 2 ecosystem partner integrations.

## Phase 4: Token Generation Event (Months 11–12)

**Focus:** Launch SUDO economy.

**Key Activities**
- TGE on BDEX.
- Staking Vault launch.
- Buyback & burn activation.
- DAO establishment.
- Mid-tier CEX listing.

**Deliverables**
- SUDO live.
- Active staking with revenue-based APY.
- Operational governance DAO.

## Phase 5: Scaling & Sustainability (Year 2+)

**Focus:** Reach + market position.

**Key Activities**
- iOS / Android app.
- Telegram Mini App.
- Cross-chain bridge to other L2 EVMs.
- Monthly Grand Prix.
- SEA + global expansion.

**Deliverables**
- Growing user base, sustainable revenue, puzzle-category leadership.

**Dependencies:** Phase N requires prior phase exit criteria; TGE gated on audit + mainnet traction.

> Refined from `plan.md` Ch. V. Added exit criteria + dependency note; dates/activities unchanged.
