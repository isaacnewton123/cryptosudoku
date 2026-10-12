import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Brand Kit — CryptoSudoku",
  description:
    "Official CryptoSudoku brand assets: logos, color palette, typography guidelines, and media resources.",
};

const brandColors = [
  {
    name: "Blurple (Primary)",
    hex: "#5865F2",
    rgb: "rgb(88, 101, 242)",
    role: "Brand anchor, primary buttons, accents",
    textColor: "#ffffff",
  },
  {
    name: "Electric Green",
    hex: "#35ED7E",
    rgb: "rgb(53, 237, 126)",
    role: "High-intent CTAs, positive status, success",
    textColor: "#000000",
  },
  {
    name: "Vibrant Magenta",
    hex: "#EC48BD",
    rgb: "rgb(236, 72, 189)",
    role: "Gradient accents, badges, highlights",
    textColor: "#ffffff",
  },
  {
    name: "Deep Canvas",
    hex: "#0A0D3A",
    rgb: "rgb(10, 13, 58)",
    role: "Page canvas, deep background",
    textColor: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.15)",
  },
  {
    name: "Raised Indigo",
    hex: "#1E2353",
    rgb: "rgb(30, 35, 83)",
    role: "Card surfaces, elevated panels",
    textColor: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.15)",
  },
  {
    name: "Pure White",
    hex: "#FFFFFF",
    rgb: "rgb(255, 255, 255)",
    role: "Primary text, headers, icons",
    textColor: "#000000",
  },
];

const mediaAssets = [
  {
    title: "Brand Logo (PNG)",
    desc: "Transparent high-resolution icon mark",
    src: "/branding/logo.png",
    filename: "cryptosudoku-logo.png",
  },
  {
    title: "Leaderboard Mockup",
    desc: "Live verified leaderboard screen",
    src: "/branding/leaderboard-mockup.png",
    filename: "cryptosudoku-leaderboard.png",
  },
];

export default function BrandPage() {
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
        <div className="container" style={{ maxWidth: 840 }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <p className="badge" style={{ marginBottom: 12 }}>Brand Resources</p>
            <h1 className="display-md" style={{ marginBottom: 16 }}>BRAND KIT</h1>
            <p className="body-lg">
              Official logos, color codes, typography standards, and downloadable assets for partners, press, and community builders.
            </p>
          </div>

          {/* Resource Navigation */}
          <div className="resource-tabs">
            <Link href="/whitepaper" className="resource-tab">Whitepaper</Link>
            <Link href="/docs" className="resource-tab">Documentation</Link>
            <Link href="/contracts" className="resource-tab">Smart Contracts</Link>
            <Link href="/brand" className="resource-tab active">Brand Kit</Link>
          </div>

          {/* ── Logos ── */}
          <section className="wp-section">
            <h2>Logomark &amp; Wordmark</h2>
            <p>
              The CryptoSudoku logomark represents cryptographic precision merged with puzzle logic.
              Always use the official files provided here.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 24 }}>
              {/* Dark canvas preview */}
              <div className="token-panel" style={{ textAlign: "center", padding: "36px 24px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <Image src="/branding/logo.png" alt="CryptoSudoku" width={52} height={52} />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em" }}>
                    Crypto<span style={{ color: "var(--color-primary)" }}>Sudoku</span>
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 16 }}>
                  Lockup on Dark Surface (Default)
                </div>
                <a
                  href="/branding/logo.png"
                  download="cryptosudoku-logo.png"
                  className="btn btn-ghost"
                  style={{ padding: "8px 20px", fontSize: 13 }}
                >
                  Download PNG
                </a>
              </div>

              {/* Light canvas preview */}
              <div
                style={{
                  background: "#ffffff",
                  color: "#0a0d3a",
                  borderRadius: "var(--radius-lg)",
                  textAlign: "center",
                  padding: "36px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <Image src="/branding/logo.png" alt="CryptoSudoku" width={52} height={52} />
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em", color: "#0a0d3a" }}>
                    Crypto<span style={{ color: "#5865F2" }}>Sudoku</span>
                  </span>
                </div>
                <div style={{ fontSize: 13, color: "#666666", marginBottom: 16 }}>
                  Lockup on Light Surface
                </div>
                <a
                  href="/branding/logo.png"
                  download="cryptosudoku-logo.png"
                  className="btn btn-primary"
                  style={{ padding: "8px 20px", fontSize: 13 }}
                >
                  Download PNG
                </a>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <h3>Logo Guidelines</h3>
              <ul>
                <li><strong>Clearspace:</strong> Keep minimum margin equal to the height of the &ldquo;C&rdquo; glyph around the logo.</li>
                <li><strong>Minimum Size:</strong> Do not display smaller than 32px × 32px for digital screens.</li>
                <li><strong>Integrity:</strong> Do not stretch, warp, recolor to unapproved hues, or apply heavy drop shadows.</li>
              </ul>
            </div>
          </section>

          {/* ── Color Palette ── */}
          <section className="wp-section">
            <h2>Color Palette</h2>
            <p>
              CryptoSudoku uses an arcade-inspired, modern high-contrast palette anchored by Blurple (#5865F2), Electric Green (#35ED7E), and deep indigo surfaces.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 24 }}>
              {brandColors.map((c, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    border: "1px solid var(--color-border)",
                    background: "var(--color-surface)",
                  }}
                >
                  <div
                    style={{
                      height: 100,
                      backgroundColor: c.hex,
                      border: c.border || "none",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: 12,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: 14,
                        fontWeight: 700,
                        color: c.textColor,
                        background: "rgba(0,0,0,0.25)",
                        padding: "2px 8px",
                        borderRadius: 4,
                      }}
                    >
                      {c.hex}
                    </span>
                  </div>
                  <div style={{ padding: 16 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--color-subtle)", fontFamily: "monospace", marginBottom: 6 }}>
                      {c.rgb}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--color-muted)", lineHeight: 1.4 }}>
                      {c.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Typography ── */}
          <section className="wp-section">
            <h2>Typography</h2>
            <p>
              Bold display typography delivers competitive energy, paired with a legible geometric sans for data and game copy.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
              <div className="token-panel">
                <div style={{ fontSize: 12, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                  Display Headings — Space Grotesk / Inter Display (700–800)
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, letterSpacing: "-0.02em" }}>
                  THE FIRST CRYPTOGRAPHIC SUDOKU
                </div>
                <p style={{ fontSize: 13, color: "var(--color-muted)", marginTop: 8 }}>
                  Used for hero titles, section headlines, stat counters, and primary callouts. Always confident, tight tracking.
                </p>
              </div>

              <div className="token-panel">
                <div style={{ fontSize: 12, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                  Body &amp; UI — Inter / System Sans (400–600)
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--color-ink)" }}>
                  Solve puzzles off-chain in your browser with instant zero-gas moves. When complete, a Zero-Knowledge Proof is generated locally via WebAssembly and verified on BOT Chain.
                </p>
                <p style={{ fontSize: 13, color: "var(--color-muted)", marginTop: 8 }}>
                  Used for descriptions, docs, leaderboard rows, and UI interactive controls.
                </p>
              </div>
            </div>
          </section>

          {/* ── Downloadable Media ── */}
          <section className="wp-section">
            <h2>Media &amp; Screenshots</h2>
            <p>
              High-resolution promotional assets and product screenshots ready for editorial and partner use.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 20 }}>
              {mediaAssets.map((asset, i) => (
                <div key={i} className="token-panel" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{
                      borderRadius: "var(--radius-sm)",
                      overflow: "hidden",
                      height: 140,
                      position: "relative",
                      background: "rgba(0,0,0,0.3)",
                      marginBottom: 14,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <Image
                        src={asset.src}
                        alt={asset.title}
                        width={240}
                        height={140}
                        style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                      {asset.title}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 16 }}>
                      {asset.desc}
                    </div>
                  </div>
                  <a
                    href={asset.src}
                    download={asset.filename}
                    className="btn btn-ghost"
                    style={{ padding: "8px 16px", fontSize: 13, textAlign: "center" }}
                  >
                    Download Asset ↓
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* ── Press & Inquiries ── */}
          <div className="token-panel" style={{ textAlign: "center", padding: "40px 24px", marginTop: 40 }}>
            <h2 className="heading-sm" style={{ marginBottom: 8 }}>Media &amp; Press Inquiries</h2>
            <p style={{ color: "var(--color-subtle)", fontSize: 14, maxWidth: 480, margin: "0 auto 20px" }}>
              Need custom resolutions, vectors, or co-marketing materials? Reach out to our community leads on Discord or Telegram.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/" className="btn btn-primary" style={{ padding: "12px 28px", fontSize: 14 }}>
                ← Back to Home
              </Link>
              <Link href="/docs" className="btn btn-ghost" style={{ padding: "12px 24px", fontSize: 14 }}>
                View Documentation
              </Link>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
