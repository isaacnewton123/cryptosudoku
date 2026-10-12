# CryptoSudoku — Product Requirements Documentation

**Version:** 1.2 (stack canonicalized: Vercel landing + Netlify app + Supabase backend; `plan.md` baseline deleted — this folder is now canonical)
**Domain:** cryptosudoku.fun (landing, Vercel) + app.cryptosudoku.fun (app, Netlify)
**Chain:** BOT Chain (Chain ID: 677)
**Backend:** Supabase (Postgres + Auth + Realtime + Storage + Edge Functions) — replaces former Appwrite reference
**Status:** Draft for Investors & Strategic Partners

## Purpose

This folder is the structured, reviewable version of the CryptoSudoku PRD.
The original single-file `plan.md` v1.0 has been deleted; these files are now
the source of truth without changing agreed parameters
(supply, allocations, chain, phases).

## Structure

| File | Chapter | Contents |
| ---- | ------- | -------- |
| [01-executive-summary.md](01-executive-summary.md) | I | Vision, mission, UVP, target market, goals / non-goals, success metrics |
| [02-market-analysis.md](02-market-analysis.md) | II | Market conditions, opportunities, competitive positioning |
| [03-product-architecture.md](03-product-architecture.md) | III | Hybrid architecture, components, upgradeability, anti-cheat, requirements |
| [04-business-model-tokenomics.md](04-business-model-tokenomics.md) | IV | SUDO token, distribution, revenue streams, stakeholder incentives |
| [05-roadmap.md](05-roadmap.md) | V | Phases 0–5: focus, activities, deliverables, exit criteria |
| [06-funding-strategy.md](06-funding-strategy.md) | VI | Funding sources, use of funds, investor narrative, schedule |
| [07-risk-management.md](07-risk-management.md) | VII | Risk register with impact, probability, mitigation, owner |
| [08-team-governance.md](08-team-governance.md) | VIII | Core team, DAO governance scope |
| [09-appendix.md](09-appendix.md) | IX + Appendix | Conclusion, glossary, version history, open questions, next steps |
| [tech-stack/](tech-stack/README.md) | X | Free-tier tech stack: Vercel landing, Netlify app, Supabase backend, BOT Chain wiring, quotas, dev workflows, security |

## Conventions

- All token/economic figures match the v1.0 baseline unless explicitly marked `Proposed`.
- Tables use percentages that must sum to 100% — flag drift in review.
- Each phase file lists **Exit Criteria** so progress is verifiable.
- Open uncertainties are collected in [09-appendix.md](09-appendix.md#open-questions), not scattered inline.

## How to Review

1. Start with [01-executive-summary.md](01-executive-summary.md) for scope.
2. Review [03-product-architecture.md](03-product-architecture.md) + [04-business-model-tokenomics.md](04-business-model-tokenomics.md) for feasibility.
3. For implementation detail, read [tech-stack/](tech-stack/README.md) — architecture, Vercel/Netlify/Supabase guides, quotas, security.
4. Check [05-roadmap.md](05-roadmap.md) + [06-funding-strategy.md](06-funding-strategy.md) for sequencing and asks.
5. Log gaps in [09-appendix.md](09-appendix.md#open-questions).
