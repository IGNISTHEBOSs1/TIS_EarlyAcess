# The Improvement System — Landing Page

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview   # serve the production build locally to check it
```

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite` — config lives in `src/index.css`
  under `@theme`, not a separate `tailwind.config.js`; that's how v4 works)

## Structure

```
src/
  components/   one file per section/UI piece, see LandingPage.tsx for composition
  hooks/        useInView.ts — scroll-reveal intersection observer hook
  App.tsx       renders LandingPage
  index.css     Tailwind import + marquee keyframe theme extension
```

## Known placeholder

`LandingPage.tsx` posts waitlist submissions to `/api/waitlist`, which
doesn't exist yet. Point `handleWaitlistSubmit` at your real endpoint —
Cloudflare Pages won't have this route unless you add a Pages Function
for it.

## Deploying to Cloudflare Pages

In the Cloudflare Pages dashboard, set:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Environment variable:** `NODE_VERSION=22` (also pinned in `.nvmrc`,
  but Pages doesn't always read it automatically — set it explicitly)

`public/_redirects` is included so client-side routes (if you add any
later) don't 404 on refresh. Not load-bearing for this single-page
build today, but free insurance.

If you deploy via the `wrangler` CLI instead of the dashboard:

```bash
npm run build
npx wrangler pages deploy dist
```
