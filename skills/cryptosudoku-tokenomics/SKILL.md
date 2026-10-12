---
name: cryptosudoku-tokenomics
description: "Use when working on SUDO tokenomics: supply, allocation table, vesting, revenue streams, or staking rewards. Enforces the PRD v1.1 allocation percentages and revenue-share (not emissions) model."
license: MIT
sources:
  - docs/04-business-model-tokenomics.md
  - docs/09-appendix.md
metadata:
  library: cryptosudoku
  library_version: 0.1.0
  domain: tokenomics
---

# CryptoSudoku Tokenomics

Derived from `docs/04-business-model-tokenomics.md` (PRD v1.1). When the docs
change, treat this skill as stale until reviewed.

## SUDO parameters

- Symbol: SUDO, max supply 1,000,000,000, BOT Chain (677), ERC-20 + ERC-20 Votes.
- Utilities: tournament access, staking (revenue-share APY), governance, cosmetics/passes.

```ts
import { SUDO_SYMBOL, SUDO_MAX_SUPPLY, SUDO_STANDARD } from "cryptosudoku";

function describeToken(): string {
  return `${SUDO_SYMBOL}: max supply ${SUDO_MAX_SUPPLY}, standard ${SUDO_STANDARD}`;
}
```

## Allocation table must sum to 100%

PRD 4.2: 35 / 20 / 15 / 15 / 10 / 5. Flag drift in review.

```ts
import { allocationTotal, TOKEN_ALLOCATIONS } from "cryptosudoku";

function assertAllocations(): void {
  const total = allocationTotal(TOKEN_ALLOCATIONS);
  if (total !== 100) {
    throw new Error(`SUDO allocations must sum to 100, got ${total}`);
  }
}
```

## Common mistakes

- Do not fund staking APY from emissions. Yield comes from actual platform
  revenue (tournament fees, duels, NFT passes, sponsorships).
- Do not change an allocation percentage without updating the vesting note and
  the open-questions entry in `docs/09-appendix.md` (investor cliff detail).
- Do not quote ecosystem stats (wallets, transactions, partners) without
  revalidating source and date — they are marked as revalidate-before-circulation.

## Staleness rule (conservative)

Same as the architecture skill: `sources` + `metadata.library_version` drive
`intent stale`. A flagged signal is a review prompt, not proof the guidance is
wrong. Check the source diff, then record the outcome with
`intent maintainer review`. Do not edit guidance to clear the signal without evidence.
