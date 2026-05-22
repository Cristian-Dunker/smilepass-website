# SmilePass — Marketing Site

> Next.js 16 rebuild of [smilepass.com.au](https://smilepass.com.au), replacing the current WordPress + Elementor site with a modern, performance-first stack while preserving the IA the client already knows.

**Status:** MVP — home page complete with structural parity to the current production site. Solution pages, pricing, and forms are next-phase work. See [`CLAUDE.md`](./CLAUDE.md) for the full handoff checklist.

---

## Quickstart

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build (Turbopack) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint with Next.js core-web-vitals + TS configs |
| `npx tsc --noEmit` | Type-check without emitting |

**Before opening a PR or asking for QA:** run `npm run build`. Dev mode hides errors that only surface in production builds.

---

## What's in the box

- **Faithful replication** of the current `smilepass.com.au` structure: same menu, same footer, same 9 solution names, same hero copy, same section order. Improvements (real pages per solution, no placeholder copy, modern performance budget) come for free from the new stack.
- **Brand purples extracted from the official logo** via pixel-sampling: `#252156` (deep) + `#7D7AF2` (bright). No more "Vuexy default purple" — these are the real brand colours.
- **Page-scoped component organisation** — `common/`, `layout/`, `home/`, `solutions/`, `pricing/`, `patients/`, `forms/`. Easy to navigate at scale.
- **Data-driven solution registry** — one source of truth in `src/data/solutions/`. Header dropdown, footer dropdown, home tabs, and future solution pages all consume the same registry.
- **No third-party UI libraries** — no shadcn, no Radix, no Framer Motion. Native CSS + a tiny `IntersectionObserver` utility (`RevealAnimations`) drive every animation.
- **`btn-outline-purple`** custom variant — `Request a Demo` uses it everywhere for clean CTA hierarchy vs the solid `btn-primary` (`Get started free`).

---

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript 5** (strict mode, zero `any`)
- **Tailwind CSS 4** with CSS-variable tokens (no `tailwind.config.js`)
- **`next/font/google`** — Fraunces (display), Inter (body), JetBrains Mono (numbers)
- **Zod** + **Resend** (Phase 2 — forms)
- **ESLint 9** with `eslint-config-next`

No test runner is configured. Marketing sites earn their correctness via TypeScript + ESLint + visual QA, not unit tests.

---

## Folder map

```
src/
├── app/
│   ├── layout.tsx              Root chrome (Header / main / Footer / animations / analytics)
│   ├── globals.css             Brand tokens, fonts, .btn-*, .reveal
│   ├── page.tsx                Home (composes 9 home/* section components)
│   ├── sitemap.ts              Dynamic sitemap including solution slugs
│   └── actions/                Server Actions (Phase 2)
├── components/
│   ├── common/                 Cross-page primitives (reveal, FAQ, breadcrumbs, avatar, video facades)
│   ├── layout/                 Header / Footer / Analytics
│   ├── home/                   9 home page section components
│   ├── solutions/              SolutionPageTemplate (data-driven, used by future solution pages)
│   └── forms/                  NewsletterSignup (more forms in Phase 2)
├── data/
│   ├── nav.ts                  Primary nav, footer sections, social, contact, ctaLinks, brand tagline
│   └── solutions/              Single source of truth: types, icons, registry of 9 solutions
└── lib/
    └── schemas/                Zod schemas (Phase 2)
```

See [`CLAUDE.md`](./CLAUDE.md) for the full folder rationale, brand token reference, animation system details, work rules, and a step-by-step guide for adding solutions, pages, and forms.

---

## Environment

Copy `.env.example` to `.env.local` and fill in:

| Variable | Used for | Required for |
|---|---|---|
| `RESEND_API_KEY` | Transactional email | Phase 2 forms |
| `RESEND_FROM_EMAIL` | Verified outbound `from:` address | Phase 2 forms |
| `LEAD_DESTINATION_EMAIL` | Where contact / demo submissions land | Phase 2 forms |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container | Production tracking |

All of these are optional in dev — the site renders fine without them. Forms log to console as a stub; Analytics simply doesn't render the GTM tag.

---

## Deployment

No deployment target is pinned. **Vercel** is the natural choice for Next.js 16 App Router and matches the dev experience locally. Cloudflare Pages and Netlify also work.

Production checklist before going live:

- [ ] Real `RESEND_API_KEY` + verified domain in Phase 2
- [ ] `NEXT_PUBLIC_GTM_ID` set
- [ ] OG image at `public/images/hero/og-image.png` (currently referenced in `app/layout.tsx`)
- [ ] DNS pointed at the new build (replacing the WordPress site)
- [ ] WordPress legacy URL redirects honoured (already encoded in `next.config.ts`)
- [ ] Sitemap submitted to Google Search Console
- [ ] Lighthouse: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 95

---

## Development workflow

1. **Read [`CLAUDE.md`](./CLAUDE.md) first.** It lists the work rules (zero duplication, codebase as source of truth, modal-not-popover for input flows, etc.) and walks through how to add a new solution / page / form.
2. **Branch off `main`** for a feature.
3. **Make the change.** Reuse existing primitives. If you're tempted to drop a `.tsx` directly in `src/components/` (no subfolder), stop — assign it to `common/` or a page-scoped subfolder first.
4. **Run the build pipeline** before declaring done:
   ```bash
   npm run lint && npx tsc --noEmit && npm run build
   ```
   Zero warnings, zero errors. If something complains, fix the source — don't paper over with `// eslint-disable` or `as any`.
5. **Open a PR.** Reviewer compares against `CLAUDE.md` conventions.

---

## What's already there vs what's pending

| Area | Status |
|---|---|
| Home page (9 sections, real copy) | ✅ Done |
| Header + Footer + layout | ✅ Done |
| Brand system, tokens, fonts | ✅ Done |
| Solution registry (9 products) | ✅ Done |
| Solution page template | ✅ Built (no pages yet) |
| Reveal animation system | ✅ Done (re-observes on route change) |
| WordPress legacy URL redirects | ✅ Done |
| Sitemap + OG/JSON-LD metadata | ✅ Done |
| **9 solution pages** | 🚧 Phase 2 |
| **Pricing page** | 🚧 Phase 2 |
| **Contact + Request Demo + forms wired to Resend** | 🚧 Phase 2 |
| **/patients, /benefits, /how-it-works, /faqs, /policies/\*** | 🚧 Phase 2 |
| **Real partner logos, testimonial photos, solution screenshots** | 🚧 Awaiting assets |

---

## Credits

- **Brand identity** — SmilePass Pty Ltd (logo, purple palette).
- **Original site** — built by Yakk on WordPress + Elementor. This rebuild preserves its IA while moving off WordPress.
- **MVP foundation** — André Melo (buildwithmelo).

For technical questions about working in this codebase, [`CLAUDE.md`](./CLAUDE.md) is the operational guide.
