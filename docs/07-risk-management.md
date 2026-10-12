# VII — Risk Management

| Risk | Impact | Probability | Mitigation | Owner (Proposed) |
| ---- | ------ | ----------- | ---------- | ---------------- |
| BOT Chain ecosystem immaturity | Medium | Medium | Leverage grants & partners; build independent community | Growth Lead |
| Token price volatility | High | High | Strict vesting, buyback & burn, treasury management | CFO / Treasury (DAO post-TGE) |
| Smart contract exploit | High | Low | Independent audit, bug bounty, UUPS + timelock upgrades | CTO |
| Slow user adoption | High | Medium | Vendetta partnership, cross-promotion, referrals | Growth / Community |
| Crypto regulation (jurisdictions) | Medium | Medium | Legal counsel, KYC/AML where required | Operations / Legal |
| Copycat competitors | Medium | Low | Fair-play differentiation, shipping speed | Founder / Game Designer |
| Supabase Free dependence (pausing, DB size, Realtime caps) | Medium | Medium | RLS-first + archival policy, one-channel realtime, staging pausing runbook; self-host migration path | Lead Developer |
| Vercel/Netlify free bandwidth/build caps | Low | Medium | Static-first, immutable caching, locked deploys during epochs; upgrade triggers in tech-stack/08 | Lead Developer |

**Refinement notes:**
- Original table preserved; added Owner column so each risk has accountability.
- v1.2: replaced Appwrite row with Supabase + Vercel/Netlify free-tier rows; detail in [tech-stack/08](../tech-stack/08-free-tier-quotas.md).
- Recommended additions for next revision: likelihood review post-audit, bug-bounty scope/size, jurisdiction list for legal review, Supabase self-host exit runbook reference.

> Refined from `plan.md` Ch. VII.
