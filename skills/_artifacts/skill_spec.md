# cryptosudoku — Skill Spec

CryptoSudoku is an on-chain competitive Sudoku platform on BOT Chain (677).
Play runs off-chain; verification and rewards run on-chain with ZK proofs and
UUPS-upgradeable contracts. These skills keep agent guidance versioned with the
npm package instead of copy-pasted rules files.

## Domains

| Domain | Description | Skills |
| ------ | ----------- | ------ |
| architecture | Off-chain play vs on-chain verification, upgrades, anti-cheat, FR-1..FR-7 | cryptosudoku-architecture |
| tokenomics | SUDO supply, allocations, vesting, revenue-share staking | cryptosudoku-tokenomics |

## Skill Inventory

| Skill | Type | Domain | What it covers | Failure modes |
| ----- | ---- | ------ | -------------- | ------------- |
| cryptosudoku-architecture | core | architecture | Chain ID, UUPS + timelock, FR mapping | 2 |
| cryptosudoku-tokenomics | core | tokenomics | SUDO params, allocation table, revenue-share | 1 |

## Failure Mode Inventory

### cryptosudoku-architecture (2 failure modes)

| # | Mistake | Priority | Source |
| --- | ------- | -------- | ------ |
| 1 | Treat off-chain scores as final | CRITICAL | docs/03-product-architecture.md |
| 2 | Shorten or skip the upgrade timelock | HIGH | docs/03-product-architecture.md |

### cryptosudoku-tokenomics (1 failure mode)

| # | Mistake | Priority | Source |
| --- | ------- | -------- | ------ |
| 1 | Fund staking APY from emissions | CRITICAL | docs/04-business-model-tokenomics.md |

## Tensions

| Tension | Skills | Agent implication |
| ------- | ------ | ----------------- |
| Speed vs finality | cryptosudoku-architecture + cryptosudoku-tokenomics | Fast off-chain play must still settle via FR-4/FR-5 before rewards are quoted |

## Cross-References

| From | To | Reason |
| ---- | -- | ------ |
| cryptosudoku-tokenomics | cryptosudoku-architecture | FR-5/FR-7 rewards settle on architecture contracts |

## Subsystems & Reference Candidates

| Skill | Subsystems | Reference candidates |
| ----- | ---------- | -------------------- |
| cryptosudoku-architecture | Appwrite Cloud, BOT Chain contracts | — |
| cryptosudoku-tokenomics | SUDO ERC-20 Votes, staking distributor | — |

## Coverage and batch history

- Batch 1 (v0.1.0, PRD v1.1): registered `cryptosudoku-architecture` (sources:
  `docs/03-product-architecture.md`, `docs/01-executive-summary.md`) and
  `cryptosudoku-tokenomics` (sources: `docs/04-business-model-tokenomics.md`,
  `docs/09-appendix.md`). Decisions: skills stay in package-owned `skills/`
  beside `docs/` and `src/`; symlinked third-party skills under `skills/`
  (`supabase`, `supabase-postgres-best-practices`, installed via
  `skills-lock.json`) are consumer copies, not shipped artifacts, and are
  excluded from maintainer registration. Checks: `intent validate` passes (2
  files); TS examples typecheck against `src/index.ts` via `dist/`.
- Remaining work: roadmap/phase-gate skill (docs/05) only if a distinct
  discoverable task emerges; do not add skills per doc chapter by default.
