import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Documentation — CryptoSudoku",
  description:
    "Technical documentation for CryptoSudoku: architecture overview, system components, frontend/backend stack, on-chain layer, and security model.",
};

export default function DocsPage() {
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
            <p className="badge" style={{ marginBottom: 12 }}>Technical Reference</p>
            <h1 className="display-md" style={{ marginBottom: 16 }}>DOCUMENTATION</h1>
            <p className="body-lg">
              Everything you need to understand how CryptoSudoku works under the hood — from the hybrid architecture to the ZK proving flow.
            </p>
          </div>

          {/* Resource Navigation */}
          <div className="resource-tabs">
            <Link href="/whitepaper" className="resource-tab">Whitepaper</Link>
            <Link href="/docs" className="resource-tab active">Documentation</Link>
            <Link href="/contracts" className="resource-tab">Smart Contracts</Link>
            <Link href="/brand" className="resource-tab">Brand Kit</Link>
          </div>

          {/* Architecture Overview */}
          <section className="wp-section">
            <h2>Architecture Overview</h2>
            <p>
              CryptoSudoku follows a <strong>&ldquo;Verify On-Chain, Play Off-Chain&rdquo;</strong> philosophy.
              Gameplay happens off-chain for speed and zero gas costs. Only verification and rewards touch
              the blockchain — giving users a Web2-smooth experience with Web3-grade guarantees.
            </p>

            <h3>Stack Summary</h3>
            <table>
              <thead><tr><th>Layer</th><th>Technology</th><th>Host</th></tr></thead>
              <tbody>
                <tr><td>Landing Site</td><td>Next.js (SSG/ISR)</td><td>Vercel</td></tr>
                <tr><td>Game App</td><td>Vite SPA + WASM ZK Prover</td><td>Netlify</td></tr>
                <tr><td>Backend</td><td>Supabase (Auth, Postgres, Edge Functions, Realtime)</td><td>Supabase Cloud</td></tr>
                <tr><td>Blockchain</td><td>Solidity (OpenZeppelin UUPS)</td><td>BOT Chain (677)</td></tr>
              </tbody>
            </table>
          </section>

          {/* Frontend */}
          <section className="wp-section">
            <h2>Frontend Layer</h2>

            <h3>Landing Site — cryptosudoku.fun</h3>
            <ul>
              <li>Built with <strong>Next.js</strong> on Vercel.</li>
              <li>Static and ISR marketing pages.</li>
              <li>No wallet connection — purely informational.</li>
            </ul>

            <h3>Game App — app.cryptosudoku.fun</h3>
            <ul>
              <li>Built with <strong>Vite</strong> as a Single Page Application on Netlify.</li>
              <li>Wallet connection via <strong>wagmi + viem</strong> (MetaMask, WalletConnect, Coinbase Wallet).</li>
              <li>Client-side ZK prover compiled to <strong>WASM</strong>, lazy-loaded for performance.</li>
              <li>Realtime leaderboard panel via Supabase Realtime (broadcast + Postgres Changes).</li>
            </ul>

            <h3>Shared UI Kit</h3>
            <p>
              Common UI components and puzzle logic are shared between landing and game app via a
              monorepo package — ensuring consistent branding and behavior.
            </p>
          </section>

          {/* Backend */}
          <section className="wp-section">
            <h2>Backend Layer (Supabase)</h2>

            <table>
              <thead><tr><th>Service</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td>Auth</td><td>Web2 (magic link) + Web3 (SIWE) user authentication</td></tr>
                <tr><td>Database</td><td>Postgres with Row Level Security for puzzles, scores, tournaments, profiles, and leaderboard cache</td></tr>
                <tr><td>Storage</td><td>NFT metadata, cosmetic assets, and epoch snapshots</td></tr>
                <tr><td>Edge Functions</td><td>Daily puzzle generation, score/proof ingest, leaderboard indexing, epoch close</td></tr>
                <tr><td>Realtime</td><td>Live leaderboard updates via broadcast channels</td></tr>
                <tr><td>pg_cron</td><td>Scheduled puzzle generation, leaderboard indexing, and epoch closure</td></tr>
              </tbody>
            </table>

            <h3>Security Model</h3>
            <ul>
              <li><strong>RLS-first:</strong> every table has Row Level Security policies. No open access.</li>
              <li><strong>Edge Functions</strong> pre-validate auth, play windows, and commitment matches before prompting wallet signatures.</li>
              <li><strong>No deployer keys</strong> in Vercel/Netlify env. Contract deploys use CI with GitHub Secrets.</li>
              <li><strong>Public RPC only</strong> in client env vars. Read calls are rate-limited and cached via Supabase.</li>
            </ul>
          </section>

          {/* ZK Flow */}
          <section className="wp-section">
            <h2>ZK Proving Flow</h2>
            <p>The full commit → prove → record → payout sequence:</p>
            <ol>
              <li><strong>Commit:</strong> <code>generate-puzzle</code> Edge Function commits <code>solution_hash</code> on-chain via <code>commitPuzzle</code>. Transaction stored in <code>puzzles.onchain_commitment</code>.</li>
              <li><strong>Solve:</strong> Player solves the puzzle off-chain in the game app.</li>
              <li><strong>Prove:</strong> WASM prover (client-side) builds a ZK proof against the commitment — no grid revealed.</li>
              <li><strong>Record:</strong> Wallet sends <code>recordScore</code> via the ZK Verifier contract. <code>ScoreRecorded</code> event emitted.</li>
              <li><strong>Index:</strong> <code>leaderboard-index</code> cron reads events → upserts <code>leaderboard_cache</code> → Realtime broadcast.</li>
              <li><strong>Payout:</strong> <code>close-epoch</code> → <code>finalize</code> → <code>distribute</code> (top-100). Indexer marks payouts; UI shows tx links.</li>
            </ol>
          </section>

          {/* Upgradeability */}
          <section className="wp-section">
            <h2>Upgradeability &amp; Governance</h2>
            <p>All core contracts use <strong>UUPS (Universal Upgradeable Proxy Standard)</strong>:</p>
            <ul>
              <li>Bug fixes without state migration.</li>
              <li>New features without changing contract addresses.</li>
              <li>Gas optimizations over time.</li>
            </ul>
            <p>
              <strong>Upgrade governance:</strong> multi-signature wallet + <strong>48-hour timelock</strong>.
              Every upgrade requires multi-party approval (core team, investors, community representatives)
              with public review time before deployment.
            </p>
          </section>

          {/* Environments */}
          <section className="wp-section">
            <h2>Environments</h2>
            <table>
              <thead><tr><th>Environment</th><th>Purpose</th><th>Chain</th></tr></thead>
              <tbody>
                <tr><td>Local</td><td>Development &amp; testing</td><td>Hardhat / local node</td></tr>
                <tr><td>Preview</td><td>PR review deploys</td><td>Bohr Testnet</td></tr>
                <tr><td>Staging</td><td>Pre-production validation</td><td>Bohr Testnet</td></tr>
                <tr><td>Production</td><td>Live public access</td><td>BOT Chain Mainnet (677)</td></tr>
              </tbody>
            </table>
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
