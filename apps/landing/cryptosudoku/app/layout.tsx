import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "CryptoSudoku — On-Chain Competitive Puzzle Gaming",
  description:
    "Play Sudoku with cryptographic fair play. Zero-Knowledge Proofs guarantee every score. Compete in ranked tournaments, earn real rewards, and verify every result on-chain. Built on BOT Chain.",
  keywords: [
    "CryptoSudoku",
    "on-chain Sudoku",
    "ZKP gaming",
    "blockchain puzzle",
    "BOT Chain",
    "Play-and-Earn",
    "SUDO token",
    "competitive Sudoku",
    "GameFi",
  ],
  openGraph: {
    title: "CryptoSudoku — On-Chain Competitive Puzzle Gaming",
    description:
      "Play Sudoku with cryptographic fair play. Zero-Knowledge Proofs guarantee every score. Compete, earn, verify.",
    siteName: "CryptoSudoku",
    type: "website",
    url: "https://cryptosudoku.fun",
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoSudoku — On-Chain Competitive Puzzle Gaming",
    description:
      "Play Sudoku with cryptographic fair play. ZKP-verified scores, ranked tournaments, real rewards.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
