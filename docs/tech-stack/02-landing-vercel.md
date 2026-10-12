# 02 — Landing Page on Vercel (Free)

**Site:** `cryptosudoku.fun` → Vercel Hobby project `cryptosudoku-landing`.
**Framework:** Next.js (App Router, TypeScript). Static-first + ISR for blog/patch notes.

## 2.1 Why Vercel Here

- Zero-config Next.js builds, OG-image generation (`next/og`), ISR revalidation.
- Free automatic SSL, preview URL per PR (`*.vercel.app`) for marketing review.
- Vercel Analytics / Speed Insights free-lite is enough for funnel (visits → waitlist → app click).

## 2.2 Project Setup

1. New Vercel project → import `cryptosudoku-landing` repo → Framework Preset: Next.js.
2. Root Directory: `/` (or `apps/landing` in monorepo).
3. Build: `next build`; Output: `.next` (default, do not override).
4. Node version: pin in `package.json` `engines` (e.g. Node 20 LTS) to avoid surprise upgrades.
5. Environment variables (Preview + Production):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public by design)
   - `NEXT_PUBLIC_APP_URL=https://app.cryptosudoku.fun`
   - `NEXT_PUBLIC_CHAIN_ID=677`
   - No service-role key on Vercel — ever.

## 2.3 Rendering Strategy (Keep It Cheap)

| Page type | Strategy | Notes |
| --------- | -------- | ----- |
| Hero / features / FAQ / token teaser | Static (`force-static`) | Ships on CDN, ~zero function invocations |
| Blog / changelog / tournament recaps | ISR (`revalidate = 3600`) | Rebuild hourly, not per hit |
| Waitlist API | Route Handler + Supabase insert | Rate-limit by IP (Upstash-free alternative: Supabase table throttle — see `10`) |
| OG images | `next/og` (Edge) | Cache `Cache-Control: public, max-age=86400` |

Disable Vercel Web Analytics sampling overkill; keep default.

## 2.4 Domains & Redirects

- Add `cryptosudoku.fun` + `www.cryptosudoku.fun` in Vercel → Domains. Set `www → apex` redirect (or vice versa, pick one canonical).
- `app.cryptosudoku.fun` is **not** on Vercel — CNAME to Netlify (see `03`). Document here to avoid double-adding.
- `vercel.json` minimal example:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    { "source": "/play", "destination": "https://app.cryptosudoku.fun", "permanent": false },
    { "source": "/app/:path*", "destination": "https://app.cryptosudoku.fun/:path*", "permanent": false }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

## 2.5 CI / Previews

- GitHub integration: every PR gets preview URL; require `next build && next lint` pass before merge.
- Protect `main`: Vercel auto-deploys Production only from `main`.
- Lighthouse budget: LCP < 2.5s on 4G; total JS < 200KB gz for landing (game budget is separate in `03`).

## 2.6 Free-Tier Guardrails

- Keep images in `next/image` with remote optimization off for external assets; prefer committed `public/` + Vercel CDN.
- No cron on Vercel (use Supabase pg_cron instead — one scheduler only).
- If bandwidth warning hits, first lever: convert hero video to poster + click-to-load; second: move docs mirror to static export.

See [08-free-tier-quotas.md](08-free-tier-quotas.md) for quota numbers and upgrade triggers.
