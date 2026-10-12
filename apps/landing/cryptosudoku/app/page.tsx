"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  HiShieldCheck,
  HiLink,
  HiTrophy,
  HiLockClosed,
  HiCurrencyDollar,
  HiCommandLine,
  HiChevronDown,
  HiArrowRight,
  HiCheckCircle,
  HiXMark,
  HiBars3,
} from "react-icons/hi2";
import {
  FaXTwitter,
  FaDiscord,
  FaGithub,
  FaTelegram,
} from "react-icons/fa6";


/* ── Intersection Observer fade-in ── */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function AnimateIn({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ── FAQ data ── */
const faqs = [
  {
    q: "Is CryptoSudoku free to play?",
    a: "Yes! Free Play mode is completely free. You only need a wallet for Ranked Tournaments where you compete for on-chain rewards. The core puzzle experience is always accessible to everyone.",
  },
  {
    q: "How do Zero-Knowledge Proofs work in a Sudoku game?",
    a: "When you solve a puzzle, a ZK proof is generated in your browser (via WASM) that mathematically proves you found a valid solution — without revealing your grid to anyone. This proof is verified on-chain, making your score tamper-proof.",
  },
  {
    q: "What wallets are supported?",
    a: "MetaMask, WalletConnect, and Coinbase Wallet are supported at launch. Wallet connection is only required for ranked tournaments and earning rewards — casual play needs no wallet at all.",
  },
  {
    q: "What is the SUDO token?",
    a: "SUDO is the utility and governance token on BOT Chain (ERC-20). It powers tournament entry, staking for revenue-share APY, governance votes, and cosmetic purchases. Max supply: 1 billion SUDO.",
  },
  {
    q: "How are rewards distributed?",
    a: "Each epoch, the top 100 players on the leaderboard automatically receive SUDO rewards via the on-chain Reward Distributor. Payouts are funded by real platform revenue — not inflationary emissions.",
  },
  {
    q: "Can admins change scores or manipulate the leaderboard?",
    a: "No. Scores are recorded immutably on-chain after ZK verification. Puzzles are hash-committed before play begins. No party — including the team — can alter results after the fact.",
  },
];

/* ── Tokenomics data ── */
const tokenSlices = [
  { label: "Play-to-Earn & Leaderboard", pct: 35, color: "#6366f1" },
  { label: "Investors",                  pct: 20, color: "#a78bfa" },
  { label: "Team & Developers",          pct: 15, color: "#10b981" },
  { label: "Treasury & Ecosystem",       pct: 15, color: "#60a5fa" },
  { label: "Liquidity & Market Making",  pct: 10, color: "#818cf8" },
  { label: "Advisors & Partners",        pct: 5,  color: "#f59e0b" },
];

/* ── Donut Chart ── */
function DonutChart() {
  const size = 200;
  const strokeWidth = 32;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="donut-svg">
      {tokenSlices.map((slice, i) => {
        const prevPctSum = tokenSlices.slice(0, i).reduce((sum, s) => sum + s.pct, 0);
        const dashLength = (slice.pct / 100) * circumference;
        const dashOffset = -((prevPctSum / 100) * circumference);
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={slice.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
            strokeDashoffset={dashOffset}
            style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        );
      })}
      <text
        x="50%" y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize="18"
      >
        1B SUDO
      </text>
    </svg>
  );
}

const roadmapPhases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "In Progress",
    items: ["Secure ecosystem funding", "Assemble core team", "Validate game concept with early testers", "Establish community channels"],
  },
  {
    phase: "Phase 2",
    title: "Build & Test",
    status: "Upcoming",
    items: ["Launch playable game with Free Play mode", "Wallet connection & ranked matchmaking", "ZK-verified scoring in-browser", "Closed community beta"],
  },
  {
    phase: "Phase 3",
    title: "Security & Audit",
    status: "Upcoming",
    items: ["Independent smart contract audit", "Bug bounty program", "Community feedback integration", "Performance optimization"],
  },
  {
    phase: "Phase 4",
    title: "Public Launch",
    status: "Upcoming",
    items: ["Mainnet deployment on BOT Chain", "First rewarded tournament season", "Referral & growth program", "Partnership announcements"],
  },
  {
    phase: "Phase 5",
    title: "Token & Governance",
    status: "Planned",
    items: ["SUDO Token Generation Event", "Staking & revenue-share vaults", "Community governance launch", "Buyback & burn mechanics"],
  },
  {
    phase: "Phase 6",
    title: "Scale Globally",
    status: "Planned",
    items: ["iOS & Android apps", "Telegram Mini App", "Cross-chain expansion", "Monthly Grand Prix tournaments"],
  },
];


// ══════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════
export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNavOpen]);

  return (
    <>
      {/* ════════ NAV ════════ */}
      <nav className="navbar" id="navbar">
        <div className="navbar-inner">
          <a href="#" className="nav-logo">
            <Image src="/branding/logo.png" alt="CryptoSudoku" width={36} height={36} />
            <span>Crypto<span className="logo-highlight">Sudoku</span></span>
          </a>

          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#tokenomics">Tokenomics</a></li>
            <li><a href="#roadmap">Roadmap</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>

          <div className="nav-cta">
            <Link href="/whitepaper" className="btn btn-ghost" style={{ padding: "10px 20px", fontSize: 14 }}>Whitepaper</Link>
            <a href="#cta" className="btn btn-green" style={{ padding: "10px 24px", fontSize: 14 }}>Play Now</a>
          </div>

          <button className="hamburger" onClick={() => setMobileNavOpen(true)} aria-label="Open menu">
            <HiBars3 style={{ width: 28, height: 28, color: "white" }} />
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${mobileNavOpen ? "open" : ""}`}>
        <button className="mobile-nav-close" onClick={() => setMobileNavOpen(false)} aria-label="Close menu">
          <HiXMark />
        </button>
        {["features", "how-it-works", "tokenomics", "roadmap", "faq"].map((id) => (
          <a key={id} href={`#${id}`} onClick={() => setMobileNavOpen(false)}>
            {id.replace(/-/g, " ")}
          </a>
        ))}
        <a href="#cta" className="btn btn-green" style={{ marginTop: 16 }} onClick={() => setMobileNavOpen(false)}>
          Play Now
        </a>
      </div>

      {/* ════════ HERO ════════ */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">

              <AnimateIn delay={0.1}>
                <h1 className="display-xl">
                  Sudoku With{" "}
                  <span className="accent">Cryptographic</span>{" "}
                  Fair Play
                </h1>
              </AnimateIn>

              <AnimateIn delay={0.2}>
                <p className="body-lg">
                  Compete in ranked tournaments where every score is verified by
                  Zero-Knowledge Proofs. No admin can alter results. No server can
                  manipulate outcomes. Every match is verifiable — by anyone, at any time.
                </p>
              </AnimateIn>

              <AnimateIn delay={0.3}>
                <div className="hero-cta-group">
                  <a href="#cta" className="btn btn-green">
                    Start Playing — Free
                  </a>
                  <a href="#how-it-works" className="btn btn-ghost">
                    Learn More
                  </a>
                </div>
              </AnimateIn>
            </div>

            <Image
              className="hero-media"
              src="/branding/logo.png"
              alt="CryptoSudoku"
              width={400}
              height={400}
              priority
              style={{ width: "100%", maxWidth: 420, height: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* ════════ MARQUEE ════════ */}
      <div className="marquee-band">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <span>PLAY</span> <span className="marquee-dot">◆</span>
              <span>SOLVE</span> <span className="marquee-dot">◆</span>
              <span>PROVE</span> <span className="marquee-dot">◆</span>
              <span>EARN</span> <span className="marquee-dot">◆</span>
              <span>VERIFY</span> <span className="marquee-dot">◆</span>
              <span>COMPETE</span>
              <span className="marquee-dot" style={{ marginRight: 24 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════ FEATURES ════════ */}
      <section className="section" id="features">
        <div className="container">
          <AnimateIn>
            <div className="section-header">
              <p className="badge" style={{ margin: "0 auto var(--space-lg)" }}>Core Features</p>
              <h2 className="display-md">WHY CRYPTOSUDOKU?</h2>
              <p className="body-lg">
                The first competitive puzzle platform where fairness isn&apos;t a promise — it&apos;s a mathematical guarantee.
              </p>
            </div>
          </AnimateIn>

          <div className="feature-grid">
            {[
              { icon: <HiShieldCheck />, cls: "blurple", title: "Zero-Knowledge Proofs", desc: "Prove your solution is valid without revealing your grid. ZK proofs are generated in-browser via WASM and verified on-chain — no trust required." },
              { icon: <HiLink />, cls: "magenta", title: "Immutable Leaderboard", desc: "Once your score is recorded on-chain, no one can change it — not even us. Rankings are transparent, permanent, and auditable by anyone." },
              { icon: <HiCommandLine />, cls: "green", title: "Web2 UX, Web3 Guarantees", desc: "Play off-chain for speed and zero gas costs. Only verification and rewards touch the blockchain. Smooth experience, trustless results." },
              { icon: <HiTrophy />, cls: "magenta", title: "Ranked Tournaments", desc: "Compete in daily challenges and seasonal tournaments. Top 100 players each epoch earn SUDO rewards — automatically distributed on-chain." },
              { icon: <HiLockClosed />, cls: "blurple", title: "Puzzle Commitment", desc: "Every puzzle is hash-committed on-chain before play begins. Admins cannot swap puzzles mid-game. The system is provably fair from start to finish." },
              { icon: <HiCurrencyDollar />, cls: "green", title: "Sustainable Play-and-Earn", desc: "Rewards come from real platform revenue — tournament fees, NFT passes, and sponsorships. No inflationary ponzinomics. Fun first, earnings second." },
            ].map((f, i) => (
              <AnimateIn key={i} delay={0.08 * i}>
                <div className="feature-card">
                  <div className={`feature-icon feature-icon-${f.cls}`}>{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SHOWCASE ════════ */}
      <section className="showcase-band" id="showcase">
        <div className="container">
          <div className="showcase-content">
            <AnimateIn className="showcase-text">
              <div>
                <div className="badge" style={{ marginBottom: "var(--space-lg)" }}>Live Competition</div>
                <h2 className="display-md" style={{ marginBottom: "var(--space-lg)" }}>
                  COMPETE ON A LEADERBOARD NO ONE CAN HACK
                </h2>
                <p className="body-lg">
                  See who&apos;s dominating in real-time. Every rank is backed by a verified ZK proof on BOT Chain.
                  Climb the leaderboard, earn your spot in the top 100, and claim automatic on-chain rewards every epoch.
                </p>
                <div style={{ marginTop: "var(--space-xl)" }}>
                  <a href="#cta" className="btn btn-primary">View Leaderboard</a>
                </div>
              </div>
            </AnimateIn>
            <Image
              src="/branding/leaderboard-mockup.png"
              alt="CryptoSudoku leaderboard"
              width={480} height={640}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section className="section" id="how-it-works">
        <div className="container">
          <AnimateIn>
            <div className="section-header">
              <p className="badge" style={{ margin: "0 auto var(--space-lg)" }}>Simple Process</p>
              <h2 className="display-md">HOW IT WORKS</h2>
              <p className="body-lg">
                From puzzle to proof in three steps. Play like any Sudoku app — verify like a blockchain.
              </p>
            </div>
          </AnimateIn>

          <div className="steps-grid">
            {[
              { n: "01", title: "Solve the Puzzle", desc: "Pick a daily challenge or tournament puzzle. Solve it off-chain with a fast, smooth interface — no gas, no wallet needed for Free Play." },
              { n: "02", title: "Generate ZK Proof", desc: "Your browser generates a Zero-Knowledge Proof of your solution using a client-side WASM prover. The proof proves validity without revealing your grid." },
              { n: "03", title: "Verify & Earn", desc: "The proof is submitted on-chain to BOT Chain. Your score is immutably recorded. Top 100 each epoch receive automatic SUDO rewards." },
            ].map((s, i) => (
              <AnimateIn key={i} delay={0.1 * i}>
                <div className="step-card">
                  <div className="step-number">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="stats-grid">
            {[
              { value: "1B", label: "Max SUDO Supply" },
              { value: "Top 100", label: "Earn Every Epoch" },
              { value: "100%", label: "ZK-Verified Scores" },
              { value: "$0", label: "To Start Playing" },
            ].map((s, i) => (
              <AnimateIn key={i} delay={0.08 * i}>
                <div className="stat-card">
                  <div className="stat-number">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TOKENOMICS ════════ */}
      <section className="section" id="tokenomics" style={{ background: "var(--color-surface-black)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container">
          <AnimateIn>
            <div className="section-header">
              <p className="badge" style={{ margin: "0 auto var(--space-lg)" }}>SUDO Token</p>
              <h2 className="display-md">TOKENOMICS</h2>
              <p className="body-lg">
                A utility &amp; governance token powering tournament access, staking, voting, and cosmetics.
                Revenue-based — not inflationary.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <div className="tokenomics-grid">
              <div className="token-info">
                <div className="token-panel">
                  <h3 className="heading-sm" style={{ marginBottom: "var(--space-xl)" }}>Token Details</h3>
                  {[
                    ["Name", "Sudoku Token"],
                    ["Symbol", "SUDO"],
                    ["Max Supply", "1,000,000,000"],
                    ["Network", "BOT Chain (677)"],
                    ["Standard", "ERC-20 + Votes"],
                  ].map(([label, value]) => (
                    <div className="token-detail-row" key={label}>
                      <span className="token-detail-label">{label}</span>
                      <span className="token-detail-value">{value}</span>
                    </div>
                  ))}
                </div>

              </div>

              <div className="token-chart">
                <h3 className="heading-sm" style={{ marginBottom: "var(--space-xxl)", textAlign: "center" }}>
                  Token Distribution
                </h3>
                <div className="donut-ring">
                  <DonutChart />
                  <div className="donut-legend">
                    {tokenSlices.map((slice, i) => (
                      <div className="donut-legend-item" key={i}>
                        <div className="donut-legend-color" style={{ background: slice.color }} />
                        <span className="donut-legend-label">{slice.label}</span>
                        <span className="donut-legend-value">{slice.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ════════ ROADMAP ════════ */}
      <section className="section" id="roadmap">
        <div className="container">
          <AnimateIn>
            <div className="section-header">
              <p className="badge" style={{ margin: "0 auto var(--space-lg)" }}>What&apos;s Next</p>
              <h2 className="display-md">ROADMAP</h2>
              <p className="body-lg">
                Our journey from concept to the global standard in on-chain competitive puzzles.
              </p>
            </div>
          </AnimateIn>

          <div className="roadmap-grid">
            {roadmapPhases.map((phase, i) => (
              <AnimateIn key={i} delay={0.08 * i}>
                <div className="roadmap-card">
                  <div className="roadmap-card-header">
                    <span className="roadmap-phase-num">{phase.phase}</span>
                    <span className={`roadmap-status roadmap-status-${phase.status.toLowerCase().replace(/ /g, '-')}`}>
                      {phase.status}
                    </span>
                  </div>
                  <h3>{phase.title}</h3>
                  <ul className="roadmap-items">
                    {phase.items.map((item, j) => (
                      <li key={j}><HiCheckCircle /> {item}</li>
                    ))}
                  </ul>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="section" id="faq">
        <div className="container">
          <AnimateIn>
            <div className="section-header">
              <p className="badge" style={{ margin: "0 auto var(--space-lg)" }}>Got Questions?</p>
              <h2 className="display-md">FAQ</h2>
              <p className="body-lg">Everything you need to know about CryptoSudoku.</p>
            </div>
          </AnimateIn>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <AnimateIn key={i} delay={0.05 * i}>
                <div className={`faq-item ${openFaq === i ? "open" : ""}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {faq.q}
                    <HiChevronDown className="faq-chevron" />
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{faq.a}</div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="section" id="cta" style={{ paddingBottom: 64 }}>
        <div className="cta-band">
          <AnimateIn>
            <h2 className="display-md" style={{ textAlign: "center" }}>
              READY TO PLAY?<br />PROVE YOUR SKILL ON-CHAIN.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <p className="body-lg" style={{ textAlign: "center", maxWidth: 500 }}>
              Join the first competitive puzzle platform where every score is cryptographically verified.
              Free to start. Impossible to cheat.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="#" className="btn btn-white" style={{ padding: "14px 32px", fontSize: 17, fontWeight: 700 }}>
                Start Playing — Free <HiArrowRight />
              </a>
              <Link href="/whitepaper" className="btn btn-ghost" style={{ padding: "14px 32px", fontSize: 15 }}>
                Read Whitepaper
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="nav-logo">
                <Image src="/branding/logo.png" alt="CryptoSudoku" width={36} height={36} />
                <span>Crypto<span className="logo-highlight">Sudoku</span></span>
              </a>
              <p>
                The global standard for on-chain competitive puzzle gaming. Verified by math, powered by BOT Chain.
              </p>
              <div className="footer-socials">
                <a href="#" className="footer-social-link" aria-label="Twitter"><FaXTwitter /></a>
                <a href="#" className="footer-social-link" aria-label="Discord"><FaDiscord /></a>
                <a href="#" className="footer-social-link" aria-label="GitHub"><FaGithub /></a>
                <a href="#" className="footer-social-link" aria-label="Telegram"><FaTelegram /></a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#tokenomics">Tokenomics</a></li>
                <li><a href="#roadmap">Roadmap</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><Link href="/whitepaper">Whitepaper</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
                <li><Link href="/contracts">Smart Contracts</Link></li>
                <li><Link href="/brand">Brand Kit</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Community</h4>
              <ul>
                <li><a href="#">Discord</a></li>
                <li><a href="#">Twitter / X</a></li>
                <li><a href="#">Telegram</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-wordmark">CRYPTOSUDOKU</div>

          <div className="footer-bottom">
            <span>© 2026 CryptoSudoku. All rights reserved.</span>
            <span>Built on BOT Chain (Chain ID: 677)</span>
          </div>
        </div>
      </footer>
    </>
  );
}
