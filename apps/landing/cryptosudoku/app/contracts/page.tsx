import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Smart Contracts — CryptoSudoku",
  description:
    "CryptoSudoku on-chain smart contracts: Puzzle Registry, ZK Verifier, Game Session, Leaderboard, Reward Distributor, Staking, and NFT Pass on BOT Chain.",
};

export default function ContractsPage() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link href="/" className="nav-logo">
            <Image src="/branding/logo.png" alt="CryptoSudoku" width={32} height={32} />
            <span>Crypto<span className="logo-highlight">Sudoku</span></span>
          </Link>
          <div className="nav-cta">
            <Link href="/" className="btn btn-ghost" style={{ padding: "8px 18px", fontSize: 13 }}>
              ← Home
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 760 }}>

          <div style={{ marginBottom: 32 }}>
            <p className="badge" style={{ marginBottom: 12 }}>On-Chain</p>
            <h1 className="display-md" style={{ marginBottom: 16 }}>SMART CONTRACTS</h1>
            <p className="body-lg">
              All CryptoSudoku contracts are deployed on BOT Chain (Chain ID 677) using OpenZeppelin UUPS upgradeable proxies with multisig + 48-hour timelock governance.
            </p>
          </div>

          {/* Resource Navigation */}
          <div className="resource-tabs">
            <Link href="/whitepaper" className="resource-tab">Whitepaper</Link>
            <Link href="/docs" className="resource-tab">Documentation</Link>
            <Link href="/contracts" className="resource-tab active">Smart Contracts</Link>
            <Link href="/brand" className="resource-tab">Brand Kit</Link>
          </div>

          {/* Network Info */}
          <section className="wp-section">
            <h2>Network Information</h2>
            <table>
              <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td>Network</td><td>BOT Chain</td></tr>
                <tr><td>Chain ID</td><td>677</td></tr>
                <tr><td>Testnet</td><td>Bohr Testnet</td></tr>
                <tr><td>Proxy Pattern</td><td>UUPS (OpenZeppelin)</td></tr>
                <tr><td>Upgrade Governance</td><td>Multisig + 48h Timelock</td></tr>
              </tbody>
            </table>
          </section>

          {/* Contract Registry */}
          <section className="wp-section">
            <h2>Contract Registry</h2>
            <p>
              Seven core contracts power the CryptoSudoku protocol. All are upgradeable and governed by multi-party approval with a public review window.
            </p>

            {[
              {
                name: "Puzzle Registry",
                desc: "Stores puzzle commitments on-chain before the play window opens. Ensures no admin can swap or alter a puzzle after it's been committed.",
                methods: ["commitPuzzle(bytes32 hash, uint256 tournamentId)"],
                role: "Proof-of-commitment",
              },
              {
                name: "ZK Verifier",
                desc: "Validates Zero-Knowledge Proofs submitted by players. Confirms that a player's solution is valid against the committed puzzle hash — without revealing the actual solution grid.",
                methods: ["verifyProof(bytes proof, bytes32 commitment)"],
                role: "Solution verification",
              },
              {
                name: "Game Session",
                desc: "Records verified scores immutably. Once a score is written, no party — including the CryptoSudoku team — can alter it.",
                methods: ["recordScore(uint256 tournamentId, uint32 elapsedMs, bytes proof)"],
                role: "Score recording",
              },
              {
                name: "Leaderboard",
                desc: "Provides ranking finality for each tournament epoch. Stores the final ordering of players and marks the epoch as closed.",
                methods: ["finalize(uint256 tournamentId)"],
                role: "Ranking finality",
              },
              {
                name: "Reward Distributor",
                desc: "Automatically distributes rewards to the top 100 players at the end of each epoch. No manual intervention or admin approval required.",
                methods: ["distribute(uint256 tournamentId)"],
                role: "Automated top-100 payouts",
              },
              {
                name: "Staking",
                desc: "Allows SUDO holders to stake tokens for revenue-share APY. Yield is generated from real platform revenue, not token emissions.",
                methods: ["stake(uint256 amount)", "unstake(uint256 amount)", "claim()"],
                role: "Passive income / revenue share",
              },
              {
                name: "NFT Pass",
                desc: "Gates access to premium tournaments and unlocks cosmetic features. Functions as a membership tier within the CryptoSudoku ecosystem.",
                methods: ["balanceOf(address)", "hasPass(address, uint256 tier)"],
                role: "Premium tournament access",
              },
            ].map((contract, i) => (
              <div key={i} className="token-panel" style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <h3 className="heading-sm">{contract.name}</h3>
                  <span style={{
                    fontSize: 11,
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "var(--color-green)",
                    background: "rgba(16, 185, 129, 0.1)",
                    padding: "3px 10px",
                    borderRadius: 9999,
                  }}>
                    {contract.role}
                  </span>
                </div>
                <p style={{ color: "var(--color-subtle)", fontSize: 14, lineHeight: 1.65, marginBottom: 12 }}>
                  {contract.desc}
                </p>
                <div>
                  <span style={{ fontSize: 12, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                    Key Methods
                  </span>
                  <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
                    {contract.methods.map((method, j) => (
                      <code key={j} style={{
                        fontSize: 13,
                        background: "rgba(99, 102, 241, 0.08)",
                        color: "var(--color-primary)",
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontFamily: "monospace",
                        display: "inline-block",
                        width: "fit-content",
                      }}>
                        {method}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Flow Diagram */}
          <section className="wp-section">
            <h2>Transaction Flow</h2>
            <div className="token-panel">
              <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  ["1", "Puzzle committed on-chain", "Puzzle Registry stores hash before play window"],
                  ["2", "Player solves off-chain", "Zero gas cost gameplay in the browser"],
                  ["3", "Client builds ZK proof", "WASM prover runs locally — solution never leaves device"],
                  ["4", "Wallet submits proof", "recordScore via ZK Verifier — ScoreRecorded event emitted"],
                  ["5", "Indexer updates leaderboard", "Cron reads events → upserts cache → Realtime broadcast"],
                  ["6", "Epoch closed & rewards distributed", "Top 100 receive payouts automatically"],
                ].map(([num, title, desc]) => (
                  <li key={num} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 20,
                      color: "var(--color-primary)",
                      opacity: 0.3,
                      minWidth: 28,
                      lineHeight: 1.2,
                    }}>
                      {num}
                    </span>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{title}</div>
                      <div style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.5 }}>{desc}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Security */}
          <section className="wp-section">
            <h2>Security Measures</h2>
            <ul>
              <li><strong>UUPS Proxy Pattern</strong> — all contracts are upgradeable without state migration or address changes.</li>
              <li><strong>48-hour Timelock</strong> — every upgrade has a mandatory public review window before execution.</li>
              <li><strong>Multi-signature Governance</strong> — upgrade proposals require approval from core team, investors, and community representatives.</li>
              <li><strong>Independent Audit</strong> — all contracts will be audited before mainnet deployment (Phase 2).</li>
              <li><strong>Bug Bounty Program</strong> — community-driven vulnerability disclosure with rewards.</li>
            </ul>
          </section>

          <div style={{ marginTop: 64, textAlign: "center" }}>
            <Link href="/" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: 15 }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
