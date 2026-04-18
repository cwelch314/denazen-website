# Denazen Website

The marketing site for [Denazen](https://www.denazen.com) — public when you want, private when it matters. A privacy-first social network built on Bluesky with end-to-end encrypted circles.

Built with [Astro](https://astro.build). Zero client-side JavaScript by default. Deployed to Cloudflare Pages.

## Stack

- **Astro** — static site generator
- **Plain CSS** with design tokens (no Tailwind, no component library)
- **Inter** + **JetBrains Mono** self-hosted as `.woff2`
- **MailerLite** (waitlist form — integration pending, see `src/components/WaitlistForm.astro`)

## Development

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # produces ./dist
npm run preview    # preview the built site
```

## Project structure

```
public/
  favicon/                 favicon and touch icons
  fonts/inter/             self-hosted Inter woff2
  fonts/jetbrains-mono/    self-hosted JetBrains Mono woff2 (used on /security/)
  images/                  hero mockups, circles diagram, brand assets
src/
  layouts/Base.astro       shared HTML shell (nav, footer, meta)
  components/              Nav, Footer, WaitlistForm
  styles/global.css        design tokens + all CSS
  pages/
    index.astro            landing
    about.astro
    faq.astro
    security.astro         encryption architecture skeleton (content TBD)
    privacy.astro          Privacy Policy placeholder (needs legal review)
    terms.astro            Terms of Service placeholder (needs legal review)
```

## Design system

- **Palette**: white (`#ffffff`) / purple-tinted (`#faf7fd`) / dark (`#2a1742` → `#3c0087`) backgrounds; accent `#6B2C91` with `#3c0087` hover. Primary text `#111827`, secondary `#4b5563`. No orange. No status colors on marketing pages.
- **Type scale**: hero `clamp(2.5rem, 6vw, 4.5rem)`, section H2 `clamp(1.75rem, 3.5vw, 2.5rem)`. Inter ExtraBold 800 for display, Regular 400 for body.
- **Layout**: max content width 72rem; narrow-column (text-only) pages use 44rem. Section padding 6rem desktop / 4rem mobile.

## Waitlist integration (TODO)

The form in `src/components/WaitlistForm.astro` currently posts to `/api/waitlist` (placeholder). To wire it to MailerLite, either:

1. Replace the form markup with MailerLite's universal embed snippet (simplest), or
2. Add a Cloudflare Pages Function at `functions/api/waitlist.ts` that POSTs to the MailerLite Subscribers API with a `MAILERLITE_API_KEY` secret.

## Deployment (Cloudflare Pages)

Build command: `npm run build`. Build output: `dist`. Node version: 18+.

```sh
npx wrangler pages deploy dist
```

## Content owners

- Marketing copy (home, about, FAQ): maintained here
- `/security/`: section skeleton here; prose to be written by the Denazen team
- `/privacy/` and `/terms/`: placeholder templates — must be reviewed by legal counsel before publication
- Product screenshots: SVG placeholders in `public/images/feed-*.svg` — to be replaced with real screenshots
