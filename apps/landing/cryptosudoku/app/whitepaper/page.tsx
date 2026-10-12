import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Whitepaper — CryptoSudoku",
  description:
    "The CryptoSudoku whitepaper: executive summary, market analysis, product architecture, tokenomics, roadmap, funding strategy, risk management, and governance.",
};

export default function WhitepaperPage() {
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

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <p className="badge" style={{ marginBottom: 12 }}>Official Document</p>
            <h1 className="display-md" style={{ marginBottom: 16 }}>WHITEPAPER</h1>
            <p className="body-lg">
              A comprehensive overview of CryptoSudoku — the on-chain competitive puzzle platform
              powered by Zero-Knowledge Proofs on BOT Chain.
            </p>
          </div>

          {/* Resource Navigation */}
          <div className="resource-tabs">
            <Link href="/whitepaper" className="resource-tab active">Whitepaper</Link>
            <Link href="/docs" className="resource-tab">Documentation</Link>
            <Link href="/contracts" className="resource-tab">Smart Contracts</Link>
            <Link href="/brand" className="resource-tab">Brand Kit</Link>
          </div>

          {/* Table of Contents */}
          <div className="token-panel" style={{ marginBottom: 48 }}>
            <h2 className="heading-sm" style={{ marginBottom: 16 }}>Table of Contents</h2>
            <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["#executive-summary", "Executive Summary"],
                ["#market-analysis", "Market Analysis & Opportunity"],
                ["#product-architecture", "Product Architecture"],
                ["#tokenomics", "Business Model & Tokenomics"],
                ["#roadmap", "Development Roadmap"],
                ["#funding", "Funding Strategy"],
                ["#risk", "Risk Management"],
                ["#governance", "Team & Governance"],
                ["#glossary", "Glossary"],
              ].map(([href, label], i) => (
                <li key={i}>
                  <a href={href} style={{ color: "var(--color-primary)", textDecoration: "none", fontSize: 15 }}>
                    {i + 1}. {label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* ── I. Executive Summary ── */}
          <section className="wp-section" id="executive-summary">
            <h2>I — Executive Summary</h2>

            <h3>Product Vision</h3>
            <p>
              CryptoSudoku is a competitive Sudoku platform that guarantees fairness mathematically through
              <strong> Zero-Knowledge Proofs (ZKP)</strong> and <strong>upgradeable smart contracts</strong> on BOT Chain.
            </p>
            <ul>
              <li>No admin can alter scores.</li>
              <li>No centralized server can silently manipulate results.</li>
              <li>Every match result is verifiable by anyone, at any time.</li>
            </ul>

            <h3>Mission</h3>
            <p>
              Become the <strong>global standard for on-chain competitive puzzle gaming</strong> by
              delivering a Web2-like playing experience with Web3-grade transparency.
            </p>

            <h3>Problem → Solution</h3>
            <table>
              <thead><tr><th>Problem</th><th>CryptoSudoku Answer</th></tr></thead>
              <tbody>
                <tr><td>Centralized leaderboards can be edited or hacked</td><td>Immutable on-chain leaderboard + puzzle commitments</td></tr>
                <tr><td>Players distrust ranking / reward payouts</td><td>ZK-verified solutions, automatic reward distributor</td></tr>
                <tr><td>Full on-chain games are expensive with poor UX</td><td>Hybrid: play off-chain, verify + reward on-chain</td></tr>
              </tbody>
            </table>

            <h3>Unique Value Proposition</h3>
            <table>
              <thead><tr><th>Players</th><th>Investors</th><th>Developers</th><th>Ecosystem Partners</th></tr></thead>
              <tbody>
                <tr>
                  <td>100% guaranteed fair play</td>
                  <td>Passive income from revenue sharing</td>
                  <td>Token allocation + ongoing fees</td>
                  <td>User distribution &amp; collaboration</td>
                </tr>
                <tr>
                  <td>Free to play</td>
                  <td>Buyback &amp; burn</td>
                  <td>Grants from DAO treasury</td>
                  <td>Cross-promotion tournaments</td>
                </tr>
                <tr>
                  <td>Real rewards for top 100</td>
                  <td>Governance over treasury</td>
                  <td>4-year vesting</td>
                  <td>Access to BOT Chain network</td>
                </tr>
              </tbody>
            </table>

            <h3>Target Market</h3>
            <ul>
              <li><strong>Global Sudoku players:</strong> hundreds of millions, ages 18–65+.</li>
              <li><strong>GameFi:</strong> shifting from inflationary Play-to-Earn to sustainable Play-and-Earn.</li>
              <li><strong>BOT Chain ecosystem:</strong> active wallets, growing transactions, and 900+ partner projects.</li>
            </ul>
          </section>

          {/* ── II. Market Analysis ── */}
          <section className="wp-section" id="market-analysis">
            <h2>II — Market Analysis &amp; Opportunity</h2>

            <h3>Current Market Conditions</h3>
            <ul>
              <li><strong>From inflationary Play-to-Earn → sustainable Play-and-Earn.</strong> Players want fun-first games; economic incentives are an additional layer, not the core loop.</li>
              <li><strong>Cheating remains unsolved.</strong> Centralized competitive games are vulnerable to internal manipulation, server exploits, and leaderboard distrust.</li>
            </ul>

            <h3>Untapped Opportunities</h3>
            <ul>
              <li>No established on-chain competitive puzzle game. Sudoku has no serious Web3 representative.</li>
              <li>ZKP rarely used in games. Most on-chain games use simple commit-reveal without full cryptographic guarantees.</li>
              <li>Growing BOT Chain GameFi ecosystem with established partners.</li>
              <li>BOT Chain grant program available for aligned GameFi projects.</li>
            </ul>

            <h3>Competitive Positioning</h3>
            <table>
              <thead><tr><th>Competitor</th><th>Weakness</th><th>CryptoSudoku Advantage</th></tr></thead>
              <tbody>
                <tr><td>Web2 puzzle games</td><td>Centralized, opaque</td><td>Cryptographic fair play + real rewards</td></tr>
                <tr><td>Experimental Web3 puzzles</td><td>Fully on-chain: expensive, poor UX</td><td>Hybrid: low cost, smooth UX</td></tr>
                <tr><td>On-chain competitive games</td><td>Complex, high hardware needs</td><td>Simple, playable by anyone</td></tr>
                <tr><td>Inflationary P2E games</td><td>Unsustainable economy</td><td>Revenue-based, deflationary model</td></tr>
              </tbody>
            </table>

            <h3>User Segments</h3>
            <table>
              <thead><tr><th>Segment</th><th>Motivation</th><th>Key Need</th></tr></thead>
              <tbody>
                <tr><td>Casual Sudoku players</td><td>Fun, daily habit</td><td>Free, fast, mobile-friendly</td></tr>
                <tr><td>Competitive grinders</td><td>Rank + rewards</td><td>Fair leaderboard, top-100 payouts</td></tr>
                <tr><td>Web3 natives / BOT users</td><td>Ecosystem rewards</td><td>Wallet-native flow, staking, governance</td></tr>
                <tr><td>Sponsors / partners</td><td>Distribution</td><td>Tournament co-branding, licensed puzzles</td></tr>
              </tbody>
            </table>
          </section>

          {/* ── III. Product Architecture ── */}
          <section className="wp-section" id="product-architecture">
            <h2>III — Product Architecture</h2>

            <h3>Design Philosophy: &ldquo;Verify On-Chain, Play Off-Chain&rdquo;</h3>
            <p>
              Separate <strong>gameplay</strong> (off-chain: fast, free) from <strong>verification and rewards</strong> (on-chain: transparent, automatic). Target: Web2-smooth play with Web3 guarantees.
            </p>

            <h3>System Components</h3>
            <h4>Frontend Layer</h4>
            <ul>
              <li><strong>Landing site</strong> (cryptosudoku.fun) — Next.js marketing pages on Vercel.</li>
              <li><strong>Game app</strong> (app.cryptosudoku.fun) — Vite SPA on Netlify with wallet connection, client-side ZK prover (WASM), and realtime leaderboard.</li>
            </ul>

            <h4>Backend Layer (Supabase)</h4>
            <table>
              <thead><tr><th>Service</th><th>Use</th></tr></thead>
              <tbody>
                <tr><td>Auth</td><td>Web2 (magic link) + Web3 (SIWE) authentication</td></tr>
                <tr><td>Database (Postgres + RLS)</td><td>Puzzles, scores, tournaments, profiles, leaderboard cache</td></tr>
                <tr><td>Storage</td><td>NFT metadata, cosmetic assets, epoch snapshots</td></tr>
                <tr><td>Edge Functions</td><td>Puzzle generation, score/proof ingest, leaderboard indexing</td></tr>
                <tr><td>Realtime</td><td>Live leaderboard updates</td></tr>
                <tr><td>Cron (pg_cron)</td><td>Scheduled generation, indexing, epoch close</td></tr>
              </tbody>
            </table>

            <h4>On-Chain Layer (BOT Chain, Chain ID 677)</h4>
            <table>
              <thead><tr><th>Contract</th><th>Responsibility</th></tr></thead>
              <tbody>
                <tr><td>Puzzle Registry</td><td>Proof-of-commitment (puzzle hash before play)</td></tr>
                <tr><td>ZK Verifier</td><td>Validates solution proofs</td></tr>
                <tr><td>Game Session</td><td>Records scores</td></tr>
                <tr><td>Leaderboard</td><td>Ranking finality</td></tr>
                <tr><td>Reward Distributor</td><td>Top-100 payouts</td></tr>
                <tr><td>Staking</td><td>Passive income / revenue share</td></tr>
                <tr><td>NFT Pass</td><td>Premium tournament access</td></tr>
              </tbody>
            </table>

            <h3>Anti-Cheating Guarantees</h3>
            <ol>
              <li><strong>On-chain puzzle commitment</strong> — puzzle hashed + stored before play; admins cannot swap mid-game.</li>
              <li><strong>Zero-Knowledge Proof</strong> — player proves valid solution without revealing grid; verified on-chain.</li>
              <li><strong>Immutable leaderboard</strong> — once recorded, no party can alter scores.</li>
            </ol>
          </section>

          {/* ── IV. Tokenomics ── */}
          <section className="wp-section" id="tokenomics">
            <h2>IV — Business Model &amp; Tokenomics</h2>

            <h3>SUDO Token</h3>
            <p>Utility + governance token for tournament access, staking, voting, and cosmetics.</p>
            <table>
              <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td>Name</td><td>Sudoku Token</td></tr>
                <tr><td>Symbol</td><td>SUDO</td></tr>
                <tr><td>Max Supply</td><td>1,000,000,000</td></tr>
                <tr><td>Network</td><td>BOT Chain (Chain ID: 677)</td></tr>
                <tr><td>Standard</td><td>ERC-20 + ERC-20 Votes</td></tr>
              </tbody>
            </table>

            <h3>Token Distribution</h3>
            <table>
              <thead><tr><th>Allocation</th><th>%</th><th>Vesting</th></tr></thead>
              <tbody>
                <tr><td>Play-to-Earn &amp; Leaderboard</td><td>35%</td><td>4-year linear</td></tr>
                <tr><td>Investors</td><td>20%</td><td>12–24 month cliff + vesting</td></tr>
                <tr><td>Team &amp; Developers</td><td>15%</td><td>4 years, 1-year cliff</td></tr>
                <tr><td>Treasury &amp; Ecosystem</td><td>15%</td><td>DAO-managed</td></tr>
                <tr><td>Liquidity &amp; Market Making</td><td>10%</td><td>Immediate</td></tr>
                <tr><td>Advisors &amp; Partners</td><td>5%</td><td>2-year vesting</td></tr>
              </tbody>
            </table>

            <h3>Revenue Streams</h3>
            <table>
              <thead><tr><th>Source</th><th>Est. Share</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td>Tournament entry fees</td><td>40%</td><td>5–10% of prize pool</td></tr>
                <tr><td>Staked duel fees</td><td>25%</td><td>5% of 1v1 duel pot</td></tr>
                <tr><td>NFT pass sales</td><td>20%</td><td>Premium access + cosmetics</td></tr>
                <tr><td>Sponsorships</td><td>10%</td><td>External brand tournaments</td></tr>
                <tr><td>Premium puzzle licensing</td><td>5%</td><td>Exclusive partner puzzles</td></tr>
              </tbody>
            </table>

            <h3>Sustainability Loop</h3>
            <p>
              Fees → rewards + buyback/burn + staking yield → retention → more fee volume.
              Emissions (35% P2E pool) are linear over 4 years to avoid early inflation shocks.
            </p>
          </section>

          {/* ── V. Roadmap ── */}
          <section className="wp-section" id="roadmap">
            <h2>V — Development Roadmap</h2>
            {[
              { phase: "Phase 0: Validation & Foundation", time: "Months 1–2", items: ["Submit BOT Chain Ecosystem Support proposal", "Enter BOT Chain Builder Challenge", "Infrastructure setup (Supabase, Vercel, Netlify)", "ZK circuit exploration on Bohr testnet"] },
              { phase: "Phase 1: MVP Development", time: "Months 3–6", items: ["Core smart contracts (UUPS pattern)", "Landing site + game SPA", "Client-side ZK prover (WASM)", "Free Play + Ranked Tournament modes"] },
              { phase: "Phase 2: Beta & Audit", time: "Months 7–8", items: ["Independent contract audit", "Closed beta with BOT Chain community", "Feedback-driven fixes", "Mainnet infrastructure preparation"] },
              { phase: "Phase 3: Mainnet Launch", time: "Months 9–10", items: ["Mainnet deploy on BOT Chain", "First grant-funded rewards tournament", "≥ 2 ecosystem partner integrations", "Referral program activation"] },
              { phase: "Phase 4: Token Generation Event", time: "Months 11–12", items: ["TGE on BDEX", "Staking Vault launch", "Buyback & burn activation", "DAO establishment"] },
              { phase: "Phase 5: Scaling & Sustainability", time: "Year 2+", items: ["iOS / Android native apps", "Telegram Mini App", "Cross-chain bridge to other L2 EVMs", "Monthly Grand Prix tournaments"] },
            ].map((p, i) => (
              <div key={i} style={{ marginBottom: 28 }}>
                <h3>{p.phase}</h3>
                <p style={{ color: "var(--color-muted)", fontSize: 13, marginBottom: 8 }}>{p.time}</p>
                <ul>
                  {p.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </section>

          {/* ── VI. Funding ── */}
          <section className="wp-section" id="funding">
            <h2>VI — Funding Strategy</h2>
            <h3>Funding Sources</h3>
            <table>
              <thead><tr><th>Source</th><th>Timeline</th><th>Use of Funds</th></tr></thead>
              <tbody>
                <tr><td>BOT Chain Grant</td><td>Phase 0–1</td><td>MVP development &amp; audit</td></tr>
                <tr><td>Builder Challenge</td><td>Phase 0</td><td>Validation &amp; exposure</td></tr>
                <tr><td>Private Sale</td><td>Phase 2–3</td><td>Marketing &amp; liquidity</td></tr>
                <tr><td>Public Sale (IDO)</td><td>Phase 4</td><td>BDEX liquidity</td></tr>
                <tr><td>Platform Revenue</td><td>Phase 4+</td><td>Operations &amp; rewards</td></tr>
              </tbody>
            </table>

            <h3>Use of Funds Allocation</h3>
            <table>
              <thead><tr><th>Category</th><th>%</th></tr></thead>
              <tbody>
                <tr><td>Product Development</td><td>35%</td></tr>
                <tr><td>Audit &amp; Security</td><td>15%</td></tr>
                <tr><td>Marketing &amp; Acquisition</td><td>25%</td></tr>
                <tr><td>Liquidity &amp; Market Making</td><td>15%</td></tr>
                <tr><td>Operations &amp; Legal</td><td>10%</td></tr>
              </tbody>
            </table>
          </section>

          {/* ── VII. Risk ── */}
          <section className="wp-section" id="risk">
            <h2>VII — Risk Management</h2>
            <table>
              <thead><tr><th>Risk</th><th>Impact</th><th>Mitigation</th></tr></thead>
              <tbody>
                <tr><td>BOT Chain ecosystem immaturity</td><td>Medium</td><td>Leverage grants &amp; partners; build independent community</td></tr>
                <tr><td>Token price volatility</td><td>High</td><td>Strict vesting, buyback &amp; burn, treasury management</td></tr>
                <tr><td>Smart contract exploit</td><td>High</td><td>Independent audit, bug bounty, UUPS + timelock upgrades</td></tr>
                <tr><td>Slow user adoption</td><td>High</td><td>Partnerships, cross-promotion, referrals</td></tr>
                <tr><td>Crypto regulation</td><td>Medium</td><td>Legal counsel, KYC/AML where required</td></tr>
                <tr><td>Copycat competitors</td><td>Medium</td><td>Fair-play differentiation, shipping speed</td></tr>
              </tbody>
            </table>
          </section>

          {/* ── VIII. Team & Governance ── */}
          <section className="wp-section" id="governance">
            <h2>VIII — Team &amp; Governance</h2>

            <h3>Core Team Structure</h3>
            <table>
              <thead><tr><th>Role</th><th>Responsibilities</th></tr></thead>
              <tbody>
                <tr><td>Founder &amp; CEO</td><td>Vision, partnerships, fundraising</td></tr>
                <tr><td>CTO</td><td>Architecture, smart contracts, ZKP</td></tr>
                <tr><td>Lead Developer</td><td>Game app, landing site, Supabase integration</td></tr>
                <tr><td>Game Designer</td><td>Puzzle design, economy, UX</td></tr>
                <tr><td>Community Manager</td><td>Community, social, events</td></tr>
                <tr><td>Growth Lead</td><td>Acquisition, partnerships, marketing</td></tr>
              </tbody>
            </table>

            <h3>DAO Governance</h3>
            <p>
              Post-TGE, governance transitions to a <strong>DAO</strong>. SUDO holders can propose and vote on:
            </p>
            <ul>
              <li>Treasury allocation for development</li>
              <li>Economic parameters (fees, rewards)</li>
              <li>Feature priorities</li>
              <li>Strategic partnerships</li>
              <li>Contract upgrade proposals (subject to multisig + 48h timelock)</li>
            </ul>
            <p>
              This makes the platform <strong>owned and directed by the community</strong>, not a central team.
            </p>
          </section>

          {/* ── IX. Glossary ── */}
          <section className="wp-section" id="glossary">
            <h2>IX — Glossary</h2>
            <table>
              <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><td>ZKP</td><td>Zero-Knowledge Proof — prove validity without revealing data</td></tr>
                <tr><td>UUPS</td><td>Universal Upgradeable Proxy Standard (OpenZeppelin)</td></tr>
                <tr><td>TGE</td><td>Token Generation Event</td></tr>
                <tr><td>BDEX</td><td>BOT Chain native DEX</td></tr>
                <tr><td>DAO</td><td>Decentralized Autonomous Organization</td></tr>
                <tr><td>P2E / Play-and-Earn</td><td>Fun-first gaming + economic incentives</td></tr>
                <tr><td>Epoch</td><td>Tournament reward period (top-100 payout unit)</td></tr>
              </tbody>
            </table>
          </section>

          {/* Back to home */}
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
