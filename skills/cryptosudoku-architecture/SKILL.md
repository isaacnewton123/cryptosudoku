---
name: cryptosudoku-architecture
description: "Use when working on CryptoSudoku hybrid architecture: off-chain play vs on-chain verification, UUPS upgradeability, anti-cheat layers, or FR-1..FR-7 requirements. Covers Puzzle Registry, ZK Verifier, Leaderboard, and Appwrite integration."
license: MIT
sources:
  - docs/03-product-architecture.md
  - docs/01-executive-summary.md
metadata:
  library: cryptosudoku
  library_version: 0.1.0
  domain: architecture
---

# CryptoSudoku Architecture

Derived from `docs/03-product-architecture.md` (PRD v1.1). When the docs change, treat this skill as stale until reviewed — see `stale` workflow below.

## Design philosophy: verify on-chain, play off-chain

Gameplay runs off-chain (fast, free). Verification and rewards run on-chain
(BOT Chain, chain ID 677). Do not put real-time gameplay loops on-chain.

```ts
import { CHAIN_ID, CHAIN_NAME } from "cryptosudoku";

function assertChain(chainId: number): void {
  if (chainId !== CHAIN_ID) {
    throw new Error(`Expected ${CHAIN_NAME} (${CHAIN_ID}), got ${chainId}`);
  }
}
```

## Upgradeability: UUPS + 48-hour timelock + multisig

All core contracts use UUPS proxies. Every upgrade requires multisig approval
and a 48-hour timelock with public review time.

```ts
import { UPGRADE_POLICY, isValidTimelock } from "cryptosudoku";

function approveUpgrade(timelockHours: number, multisigApproved: boolean): boolean {
  return multisigApproved && isValidTimelock(timelockHours) && UPGRADE_POLICY.standard === "UUPS";
}
```

## Common mistakes

- Do not access scores from a mutable off-chain table as the source of truth.
  The immutable on-chain Leaderboard is final.
- Do not shorten or skip the timelock. `isValidTimelock` enforces the
  48-hour minimum; a smaller value must fail review.
- Do not commit a puzzle hash after the play window opens. The Puzzle Registry
  commitment must precede play (FR-2 before FR-1 scoring).

## Functional requirements (FR-1..FR-7)

```ts
import { FUNCTIONAL_REQUIREMENTS } from "cryptosudoku";

function requirementLayer(id: string): string | undefined {
  return FUNCTIONAL_REQUIREMENTS.find((r) => r.id === id)?.layer;
}
```

Full requirement text lives in the PRD. This skill covers the mapping only;
implementation details stay in source and docs.

## Staleness rule (conservative)

`metadata.library_version` pins the release this guidance was reviewed against.
`sources` lists the docs it derives from. When a listed source changes, run
`npx @tanstack/intent stale` and `npx @tanstack/intent maintainer review`,
inspect the actual diff, and record an outcome — even when the conclusion is
`no-change`. Missing evidence stays pending; do not silently clear the signal.
