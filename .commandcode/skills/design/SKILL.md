---
name: design
description: "CryptoSudoku design-language reference (Discord-analysis system). Use for ANY landing-page or game-app UI work: colors, typography, radius, spacing, components, page rhythm, do's/don'ts. Canonical tokens live in DESIGN.md in this folder."
metadata:
  author: cryptosudoku
  version: "1.0"
---

# Design Reference Skill

Canonical spec: [DESIGN.md](DESIGN.md). Always read it before writing UI code or reviewing visual work. This file is the index; DESIGN.md is the source of truth.

## When to use

- Building or editing landing (`cryptosudoku.fun`, Vercel) or app (`app.cryptosudoku.fun`, Netlify) UI.
- Picking colors, type, radius, spacing, buttons, cards, bands, nav, footer.
- Reviewing a PR for visual consistency.

## How to apply

1. Read DESIGN.md frontmatter tokens first (colors, typography, rounded, spacing, components), then the guidance sections.
2. Page rhythm: dark-indigo hero → gradient + dark feature cards → black showcase band → Blurple marquee/CTA band → giant wordmark footer.
3. Blurple `#5865f2` owns CTAs/bands; green `#35ed7e` is the single highest-intent CTA only; magenta `#ec48bd` fills gradient panels/step cards/badges.
4. Headlines all-caps display 700–800; body drops to 400–500. No timid mid-weights.
5. Radius: 12–16px controls, 40px+ media/panels, pill/jumbo for signature shapes. Depth via color/gradient/overlap, not shadows.

## Quick tokens

- Canvas `#0a0d3a`, raised indigo `#1e2353`, onyx `#23272a`, black `#000000`, ink `#ffffff`, link cyan `#00b0f4`.
- Display 82/62/56px 800–700; body 16px/400; buttons 18px/500.
- Container ~1200px; breakpoints 768 / 1024 / 1280; tap targets ≥44px.

## Font substitutes (proprietary originals)

ABC Ginto Nord → Hanken Grotesk or Space Grotesk 700–800. ggsans/ABC Ginto → Inter or Plus Jakarta Sans.

## Do / Don't (full list in DESIGN.md)

Do: indigo canvas + animated Blurple→magenta mesh; one green CTA; generous rounding; mockups in magenta-gradient or indigo cards.
Don't: flat grey/black canvas; green as general accent; mid-weight headlines; squared cards; shadow-based depth; a fourth loud accent.
