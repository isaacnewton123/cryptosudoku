/**
 * CryptoSudoku core types.
 *
 * Canonical parameters live in `docs/` (PRD v1.1). The Agent Skills in
 * `skills/` derive from those docs; this module exposes the same constants
 * in typed form so skill examples typecheck against the published API.
 */

export const CHAIN_ID = 677 as const;
export const CHAIN_NAME = "BOT Chain" as const;
export const SUDO_SYMBOL = "SUDO" as const;
export const SUDO_MAX_SUPPLY = 1_000_000_000 as const;
export const SUDO_STANDARD = "ERC-20 + ERC-20 Votes" as const;

/** PRD 4.2 allocation table. Percentages must sum to 100. */
export interface TokenAllocation {
  label: string;
  percent: number;
  vesting: string;
  purpose: string;
}

export const TOKEN_ALLOCATIONS: TokenAllocation[] = [
  { label: "Play-to-Earn & Leaderboard", percent: 35, vesting: "4-year linear", purpose: "Long-term player incentives" },
  { label: "Investors", percent: 20, vesting: "12-24 month cliff + vesting", purpose: "Development funding" },
  { label: "Team & Developers", percent: 15, vesting: "4 years, 1-year cliff", purpose: "Long-term commitment" },
  { label: "Treasury & Ecosystem", percent: 15, vesting: "DAO-managed", purpose: "Ecosystem development" },
  { label: "Liquidity & Market Making", percent: 10, vesting: "Immediate", purpose: "Initial market liquidity" },
  { label: "Advisors & Partners", percent: 5, vesting: "2-year vesting", purpose: "Strategic support" },
];

export function allocationTotal(allocations: TokenAllocation[] = TOKEN_ALLOCATIONS): number {
  return allocations.reduce((sum, a) => sum + a.percent, 0);
}

/** PRD 3.5 functional requirement IDs FR-1..FR-7. */
export type FunctionalRequirementId = "FR-1" | "FR-2" | "FR-3" | "FR-4" | "FR-5" | "FR-6" | "FR-7";

export interface FunctionalRequirement {
  id: FunctionalRequirementId;
  requirement: string;
  layer: string;
}

export const FUNCTIONAL_REQUIREMENTS: FunctionalRequirement[] = [
  { id: "FR-1", requirement: "Play daily / tournament puzzle off-chain, free", layer: "Frontend + Appwrite" },
  { id: "FR-2", requirement: "Commit puzzle hash on-chain before play window", layer: "Puzzle Registry" },
  { id: "FR-3", requirement: "Generate + submit ZK solution proof from client", layer: "Frontend + ZK Verifier" },
  { id: "FR-4", requirement: "Record verified score immutably", layer: "Game Session + Leaderboard" },
  { id: "FR-5", requirement: "Distribute epoch rewards to top 100 automatically", layer: "Reward Distributor" },
  { id: "FR-6", requirement: "Gate premium tournaments via NFT pass", layer: "NFT contract" },
  { id: "FR-7", requirement: "Stake SUDO for revenue-share APY", layer: "Staking contract" },
];

/** PRD 3.3 upgradeability policy. */
export interface UpgradePolicy {
  standard: "UUPS";
  timelockHours: number;
  requiresMultisig: boolean;
}

export const UPGRADE_POLICY: UpgradePolicy = {
  standard: "UUPS",
  timelockHours: 48,
  requiresMultisig: true,
};

export function isValidTimelock(hours: number): boolean {
  return hours >= UPGRADE_POLICY.timelockHours;
}
