import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        padding: 24,
        textAlign: "center",
      }}
    >
      <Image
        src="/branding/logo.png"
        alt="CryptoSudoku"
        width={80}
        height={80}
        style={{ opacity: 0.6 }}
      />
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(64px, 10vw, 120px)",
          fontWeight: 800,
          color: "var(--color-primary)",
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 22,
          fontWeight: 700,
          color: "var(--color-ink)",
        }}
      >
        Page not found
      </p>
      <p
        style={{
          color: "var(--color-muted)",
          fontSize: 15,
          maxWidth: 400,
          lineHeight: 1.6,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Maybe try heading back to the homepage.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--color-primary)",
          color: "white",
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 15,
          padding: "12px 28px",
          borderRadius: 12,
          textDecoration: "none",
          marginTop: 8,
          transition: "opacity 0.2s",
        }}
      >
        ← Back to Home
      </Link>
    </div>
  );
}
