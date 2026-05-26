# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

`@smilepass/web` — the SmilePass marketing site. A faithful re-build of the current `smilepass.com.au` (which runs on WordPress + Elementor) in **Next.js 16 + React 19 + Tailwind 4**, with a clean architecture so the team can iterate from a familiar shell instead of inheriting WordPress baggage.

The intent is **structural parity** with the current production site, not a redesign: same menu, same footer hierarchy, same 9 solution names, same hero copy, same section order. The improvements that fall out for free are: (a) actual dedicated pages per solution instead of 9 menu items all pointing to `/payment-plans/`, (b) no placeholder copy in production, (c) modern stack with real performance budget, (d) the brand purples extracted directly from the official logo.

## ⚠️ Source-of-truth note (drift to be aware of)

The information architecture **pivoted from 9 product pages to 3 category hubs** mid-build. The redirect map in `next.config.ts` is the canonical statement of the new IA:

- `/solutions/recurring-revenue` ← `membership-plans`, `loyalty-referral-programs`
- `/solutions/patient-financing` ← `payment-plans`, `dental-loans`, `dental-savings-account`, `access-superannuation`, `crowdfunding`
- `/solutions/payment-operations` ← `instant-payment`, `online-payments`, `crypto-payments`

What this means for current state:

- The `solutions` registry in `src/data/solutions/index.tsx` still has the **9 legacy entries** with the old per-product `href`s. Those hrefs now 301 via `next.config.ts`. Treat the registry as content data (copy + icons), not as a routing source until it is restructured into the 3-category model.
- `sitemap.ts` currently emits the 9 legacy slugs (each 301s) and 10 static pages that don't exist yet. Sitemap is **drifted** — do not treat it as authoritative for "what pages exist".
- Don't create `src/app/{membership-plans,payment-plans,dental-loans,...}/page.tsx` files. They should stay redirects. New work should target `src/app/solutions/{recurring-revenue|patient-financing|payment-operations}/page.tsx`.
- When in doubt about routing, read `next.config.ts` first. When in doubt about which solutions belong where, read the redirect map in `next.config.ts`.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI runtime | React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 (`@tailwindcss/postcss`) — CSS-variable tokens, no `tailwind.config.js` |
| Fonts | Fraunces (display), Inter (body), JetBrains Mono (numbers) — all via `next/font/google` |
| Animation | CSS-only `.reveal` class + IntersectionObserver in `RevealAnimations.tsx` |
| Forms | Server Actions + Zod schemas + Resend (transactional email) — Resend wire-up is Phase 2 |
| Analytics | GTM (opt-in via `NEXT_PUBLIC_GTM_ID` env var) |
| Path alias | `@/*` → `./src/*` |
| Linting | ESLint 9 with `eslint-config-next` |
| Tests | None (TypeScript + ESLint cover correctness for content-heavy marketing site) |

**Deliberate non-choices:** no shadcn, no Radix, no Framer Motion, no GSAP, no CSS-in-JS runtime, no React Query, no Zustand. The product is content + marketing; native CSS + a tiny IntersectionObserver utility do the job without bundle weight.

## Commands

```bash
npm install
npm run dev                       # default http://localhost:3000
npm run dev -- --port 3003        # use this if another Next dev server already owns :3000
npm run build                     # production build
npm start                         # serve production build
npm run lint                      # eslint
npx tsc --noEmit                  # type-check without emitting
```

`npm run build` is the source of truth for "ready for QA". `dev` mode masks classes of errors (server-component boundary violations, font-loading failures, static-prerender errors) that only surface at build time.

If you run multiple Next.js projects locally, pass `--port` rather than killing whatever owns `:3000` — other repos in this workspace bind it for their own dev servers.

## Architecture

### Folder layout

```
smilepass-web/
├── public/
│   ├── fonts/                          (managed by next/font — keep empty)
│   └── images/
│       ├── logos/                      smilepass-logo-primary-purple.png (real, from prod)
│       ├── hero/                       smilepass-hero-illustration.png (real)
│       ├── sections/                   smilepass-dashboard-devices.png (real)
│       ├── differentiators/            search-directory / support-monitoring / data-protection .png (real)
│       └── solutions/                  (1 per solution — TBD when assets land)
└── src/
    ├── app/
    │   ├── layout.tsx                  Root: Header + main + Footer + RevealAnimations + Analytics
    │   ├── globals.css                 Brand tokens + h1-h6 + .btn-* + .reveal
    │   ├── page.tsx                    Home — composes 9 home/* section components
    │   ├── sitemap.ts                  Dynamic, includes 9 solution slugs
    │   ├── {slug}/page.tsx             One per route (membership-plans, pricing, contact, …)
    │   └── actions/                    Server Actions (Phase 2 — Resend)
    ├── components/
    │   ├── common/                     Cross-page primitives — reuse first, propose new only if nothing fits
    │   │   ├── RevealAnimations.tsx    See "Animation system" below
    │   │   ├── FAQAccordion.tsx        Reusable accordion with light/dark variants
    │   │   ├── Breadcrumbs.tsx         Includes JSON-LD BreadcrumbList
    │   │   ├── Avatar.tsx              Monogram or icon fallback
    │   │   ├── HeroVideo.tsx           Auto-play muted video background
    │   │   ├── VimeoFacade.tsx         Lazy Vimeo embed (thumb + play → iframe on click)
    │   │   └── YouTubeFacade.tsx       Same pattern, YouTube version
    │   ├── layout/                     Global chrome
    │   │   ├── Header.tsx              Fixed 68px, scroll-to-paper, mega-dropdown of 9 solutions
    │   │   ├── Footer.tsx              Logo + tagline + 4 columns (About / Get In Touch / Follow / Subscribe)
    │   │   └── Analytics.tsx           GTM (renders only when NEXT_PUBLIC_GTM_ID is set)
    │   ├── home/                       Home page sections (one component per "block")
    │   │   ├── HomeHero.tsx, WhatIsSmilePass.tsx, BenefitsForPractice.tsx,
    │   │   ├── SolutionsTabs.tsx, Differentiators.tsx, SuccessStory.tsx,
    │   │   ├── TestimonialsCarousel.tsx, FinalCtaBand.tsx, FaqTeaser.tsx
    │   ├── solutions/
    │   │   ├── SolutionPageTemplate.tsx   Data-driven, 1 product per page (TBD pages)
    │   │   └── (SolutionCard.tsx)         Shared card used by home grid + cross-links
    │   ├── pricing/                    (TBD — PricingTable with Monthly/Yearly toggle)
    │   ├── patients/                   (TBD — /patients landing)
    │   └── forms/
    │       ├── NewsletterSignup.tsx    UI ready, Resend wire-up TBD
    │       └── (ContactForm.tsx, RequestDemoForm.tsx — TBD)
    ├── data/
    │   ├── nav.ts                      primaryNav, footerSections, socialLinks, contactInfo, ctaLinks, brandTagline; re-exports solutions from data/solutions/
    │   └── solutions/
    │       ├── types.ts                SolutionData interface — UNION of all caller needs
    │       ├── icons.tsx               9 inline SVG icon components
    │       └── index.tsx               Registry of 9 solutions (real copy from current site)
    └── lib/
        ├── schemas/                    (TBD — Zod schemas for forms)
        └── env.ts                      (TBD — env validation)
```

### Folder conventions

**Components are organized by page-scope, not flat.** Cross-cutting primitives live in `common/` or `layout/`. Section-level components for a specific page live in `home/`, `solutions/`, `pricing/`, etc. New section-level components default to a page-scoped subfolder; promote to `common/` only when used by 2+ pages.

**Data files are the source of truth.** Solutions live in `src/data/solutions/` — one registry powers nav dropdowns, footer dropdowns, home cards, home tabs, and (Phase 2) per-solution pages. Per the "utility covers union" rule, the registry shape is the **union** of fields any caller needs.

**No flat `components/` root.** If you ever feel the urge to drop a `.tsx` directly under `src/components/`, ask which page or pages will use it — then pick `common/` (multi-page) or a page subfolder.

### `next.config.ts` — what's pinned and why

- `turbopack.root = path.resolve(__dirname)` — pins the workspace root to this project. There's an unrelated `package-lock.json` one directory up that Next.js otherwise picks up as a workspace root and produces wrong path resolution. Don't remove this without verifying both Turbopack dev and `next build` from a fresh clone.
- `skipTrailingSlashRedirect: true` — every legacy WordPress URL is listed twice in `redirects()`, with and without trailing slash, so each request takes **one** 301 hop instead of two.
- `images.remotePatterns` whitelists `i.ytimg.com` for `YouTubeFacade` thumbnails. Add a new entry whenever a remote image source appears.
- `redirects()` is the canonical legacy-URL → new-IA map. See the drift note above — this is where the 9-products-to-3-hubs decision actually lives.

### Brand tokens (`src/app/globals.css`)

Extracted from the official logo via pixel-sampling:

| Token | Value | Use |
|---|---|---|
| `--color-purple-deep` | `#252156` | Wordmark, primary body text, dark surfaces |
| `--color-brand-purple` | `#7D7AF2` | Accent, primary CTA, hover indicator |
| `--color-brand-purple-hover` | `#6864E8` | CTA hover state |
| `--color-paper` | `#FFFFFF` | Primary background |
| `--color-mist` | `#F8F7FC` | Section alternation (cool off-white with purple hint) |
| `--color-bone` | `#F4F2FB` | Card surfaces |
| `--color-divider` | `#E5E3F0` | Borders, dividers |
| `--color-ink` | `#252156` | Alias of purple-deep |
| `--color-ink-muted` | `#5F5C7F` | Secondary text |

**Button variants (use the class, don't reinvent):**
- `.btn-primary` — solid `brand-purple` bg, white text. For "Get started free" and primary "Find out more" actions.
- `.btn-outline-purple` — transparent bg, `brand-purple` border + text; on hover inverts to solid. **Reserved for "Request a Demo"** to keep CTA hierarchy clear.
- `.btn-secondary` — transparent bg, `purple-deep` border + text. Neutral / cancel actions.
- `.btn-glow` — adds a colored glow on hover; layer it on top of one of the above.

### Animation system

`.reveal` elements start at `opacity: 0; transform: translateY(24px)`. `RevealAnimations` (mounted once in the root layout) runs an IntersectionObserver and adds `.visible` when the element enters the viewport — which triggers a 0.75s ease-out fade-in via CSS.

Add `.reveal-delay-1` … `.reveal-delay-4` to stagger entrances (0.1s steps).

**Critical detail:** `RevealAnimations` watches `usePathname()` and re-observes on every route change. Without this, navigating back to a page leaves all `.reveal` elements stuck at `opacity: 0` because the observer was bound to the previous page's nodes. If you ever change this component, preserve the pathname dependency.

### Forms

The pattern is **Server Actions + Zod**. One Zod schema per form lives in `src/lib/schemas/`. The same schema is used client-side (form validation) and server-side (action input parsing). Server Actions live in `src/app/actions/`.

DTO-at-boundary is non-negotiable here — never trust raw form data. The schema is the contract.

#### Request a Demo modal (live)

The "Request a Demo" CTA is a modal, not a route. Wiring:

- **Provider:** `RequestDemoProvider` (`src/components/forms/RequestDemoProvider.tsx`) is mounted once in `src/app/layout.tsx`. It owns open/close state and renders the modal as a portal child of `<body>`.
- **Button:** `RequestDemoButton` (`src/components/forms/RequestDemoButton.tsx`) is a tiny client component that calls `useRequestDemo().open()`. Use it everywhere a "Request a Demo" CTA appears so server-component parents stay server components. Accepts the same `className` you'd pass to the original `<Link>`.
- **Modal:** `RequestDemoModal` (`src/components/forms/RequestDemoModal.tsx`) wraps the shared `Modal` primitive (`src/components/common/Modal.tsx`) with the form.
- **Schema:** `src/lib/schemas/request-demo.ts` (Zod — name, email, phone, practiceWebsite, optional sourcePage).
- **Action:** `src/app/actions/send-request-demo.ts` — POSTs to the Notion REST API (`/v1/pages`) to create a row in the **Demo Requests** database that lives inside the **SmilePass HUB** Notion page.
- **Notion database ID:** `00c05ce69a1e435da2bde4a6dcd04572` (data source `40895c99-5f90-4b47-a84f-f7fd9e442a4a`). Columns: Name (title), Email, Phone, Practice website, Source page, Status (defaults to "New"), Submitted at (created time).
- **Env vars:** `NOTION_API_KEY` (internal integration secret) + `NOTION_DEMO_REQUESTS_DB_ID`. See `.env.example` and the inline notes in `.env.local` for the integration setup steps.

When the env vars are missing the action logs to the console and returns a friendly error string — the form will not silently succeed.

#### Pending forms (Phase 2)

Newsletter signup (Footer) and Contact form (`/contact` page when created) still need wiring. They'll follow the same pattern: schema → Server Action → Resend (for transactional email) or Notion (for lead capture), depending on the destination decision.

---

## Work rules (non-negotiable)

These apply to every change. If the codebase already violates one of these somewhere, that's a bug to fix, not a precedent to copy.

### 1. The codebase is the source of truth

Briefs, plan files, and docs can drift. The code can't. **Verify against the current code before implementing what a description says.** If you find divergence, flag it in the response or the plan — don't paper over it. Prompt templates are often reused across projects and may name things that no longer exist here.

### 2. Zero inline duplication. Utilities cover the UNION of caller needs

Any function / component / hook used by 2+ surfaces gets extracted to a shared module. **No exceptions.** "The other surface has richer needs" is not an excuse to duplicate — the rich caller composes the shared utility plus its own extras locally.

The shared module covers the **union** of caller needs, with optional props for the extras. Not the minimum common subset (which would force every caller to duplicate to add their extras and slowly drift apart).

### 3. Reuse primitives first

Before proposing a new component or utility, **sweep the codebase for existing primitives**: `RevealAnimations`, `FAQAccordion`, `Breadcrumbs`, `Avatar`, `HeroVideo`, `VimeoFacade`, `YouTubeFacade`. If a primitive is missing a variant you need, extend it (add a prop / variant) — don't duplicate.

For input flows (row actions, calendar events, sidebar actions, etc.), reuse a `Modal` / `ConfirmDialog` primitive. Never build a one-off popover, drawer, or panel for input capture.

### 4. Zero `any`. Strict TypeScript

Strict mode is on. **No `any`**, no `as any` casts. If a third-party return type is loose, narrow it via a typed adapter at the boundary — don't push the looseness through the call graph.

`unknown` is the right escape hatch for "I literally don't know" — it forces a narrowing step. `any` skips the narrowing.

### 5. DTOs at boundaries

Every system boundary gets a typed validator. **Zod** for frontend forms and any API response we don't control. Schema and type derive from the same source (`z.infer<typeof Schema>`). Never trust untyped data crossing a boundary — runtime validation is the contract.

### 6. Zero deadcode

Don't leave orphan files, unused imports, dead refs, or "we might use this later" leftovers. Clean as you go. Git history preserves removed code if it's ever needed again. If you remove a feature, search (`Grep`) for all its references and remove them too.

### 7. English in product and code

UI labels, errors, copy, emails — English. Identifiers, comments, commit messages — English. The site serves AU dental practices; everything user-visible is en-AU.

### 8. Build before QA

Before declaring work "done" or asking the user to QA visually, the build pipeline runs clean:

```bash
npm run lint            # zero warnings
npx tsc --noEmit        # zero errors
npm run build           # clean, no warnings
```

Dev mode masks errors that only show up in production. If your change touches a server component, a layout, a font loader, or a static-prerendered page, **always** run a full build before handoff.

### 9. Git discipline

- **Never commit or push** without an explicit instruction from the current turn ("commit", "push", "ship"). Authorisations from past turns do not carry forward.
- **Never use destructive git flags** unprompted: `--no-verify`, `--amend` (unless explicitly asked), `git reset --hard`, `git push --force`.
- "Pode executar" / "go ahead" / "tudo certo" authorises edits, **not** commits.
- If unclear whether something counts as shipping, ask.

---

## Adding new things

### A new solution (current 3-category IA)

The current IA has **3 hub pages**, each grouping multiple solutions. Adding a new solution means adding it to one of the existing hubs — not creating a new per-product page. (See the drift note at the top for what changed.)

1. Add an inline SVG icon component in `src/data/solutions/icons.tsx` (follow the existing weight-1.6 stroke style).
2. Add an entry to the `solutions` array in `src/data/solutions/index.tsx`. **Set `href` to the parent category hub**, not a per-product slug:
   ```tsx
   {
     slug: "new-thing",
     label: "New Thing",
     href: "/solutions/patient-financing",   // pick the category it belongs to
     tagline: "Short one-liner for nav dropdowns.",
     headline: "Headline for the solution's hero",
     description: "Full paragraph for the home tab / page hero.",
     bullets: ["...", "...", "..."],
     imageAlt: "...",
     Icon: NewThingIcon,
   }
   ```
3. Update the corresponding hub page at `src/app/solutions/<category>/page.tsx` to surface the new solution (section, card, or accordion entry, depending on the hub layout).
4. If a legacy per-product URL exists in the wild for this solution, add a `301` to `next.config.ts` `redirects()` pointing the legacy slug at the hub.

The header dropdown, footer, home tabs, and home chips strip read from the registry, so they pick the new entry up automatically.

**Adding a 4th category hub** (rare — the IA is intentionally 3): create `src/app/solutions/<new-category>/page.tsx`, list it in `src/app/sitemap.ts`, and decide whether `primaryNav` in `src/data/nav.ts` needs to change (today the "Solutions" dropdown is registry-driven).

### A new top-level page (e.g. `/pricing`)

1. Create `src/app/pricing/page.tsx` with `metadata` export.
2. Add to `sitemap.ts`.
3. If linked from the header, edit `src/data/nav.ts` `primaryNav`. If linked from the footer, edit `footerSections`.
4. Page-specific section components go in a page-scoped subfolder: `src/components/pricing/`.

### A new form

1. Define the Zod schema in `src/lib/schemas/{form-name}.ts`. Export both the schema and the inferred type.
2. Create the Server Action in `src/app/actions/send-{form-name}.ts`:
   ```ts
   "use server";
   import { schema } from "@/lib/schemas/form-name";
   export async function sendFormName(input: unknown) {
     const parsed = schema.safeParse(input);
     if (!parsed.success) return { success: false, error: ... };
     // ... Resend call ...
     return { success: true };
   }
   ```
3. Build the form component in `src/components/forms/{FormName}.tsx` — client component, useState for fields, calls the Server Action on submit. Use the same Zod schema for client-side validation before submit.
4. Use the form on the relevant page.

### Adding a new image asset

- Hero / illustrations → `public/images/hero/`
- Section illustrations → `public/images/sections/`
- Differentiator card images → `public/images/differentiators/`
- Solution-specific imagery → `public/images/solutions/`
- Partner / integration logos → `public/images/partners/`
- Logo variants → `public/images/logos/`

Use `next/image` with `fill` + `sizes` for responsive images. Set `priority` on above-the-fold assets only. External remote sources need their hostname added to `next.config.ts` `images.remotePatterns`.

---

## Current phase status

### ✅ Done (handoff MVP)

- Project bootstrapped (Next.js 16 + React 19 + TS strict + Tailwind 4)
- Brand tokens applied (real purples from logo)
- Layout chrome (`Header`, `Footer`, `RevealAnimations`, `Analytics`)
- Home page — all 9 sections matching the production site structure
- 9 solution registry (single source of truth)
- 6 common primitives (reveal, FAQ, breadcrumbs, avatar, hero video, vimeo/youtube facades)
- `SolutionPageTemplate` (data-driven, used by future solution pages)
- Sitemap, redirects (WP legacy URLs), OG/JSON-LD metadata
- Newsletter signup UI (stub, in Footer)

### 🚧 Pending (next phases)

- **3 solution hub pages** — `src/app/solutions/recurring-revenue/page.tsx`, `src/app/solutions/patient-financing/page.tsx`, `src/app/solutions/payment-operations/page.tsx`. Each hub presents the solutions grouped under it (see the redirect map in `next.config.ts` for the grouping). The 9 legacy per-product URLs already 301 to these hubs; do not create per-product pages.
- **Registry restructure** — once the 3 hubs exist, update `src/data/solutions/index.tsx` so every entry's `href` points to its category hub rather than a legacy product slug, or split the registry into a `solutions` array (content) plus a `categoryHubs` array (routing) if both are still needed.
- **Sitemap rebuild** — `src/app/sitemap.ts` currently emits the 9 legacy slugs (each 301s) and 10 static pages that don't exist. Rewrite it to emit only real, terminal URLs: `/`, the 3 hubs, and whichever static pages have actually shipped.
- **For-patients page** (`/for-patients`) — replaces the legacy `/patients` URL (already 301'd in `next.config.ts`).
- **Pricing page** (`/pricing`) — `PricingTable` with Monthly/Yearly toggle. Awaiting real tier/price data.
- **Contact + Request Demo pages** (`/contact`, `/request-demo`) — forms with Zod + Server Actions; wire to Resend when API key arrives.
- **Standalone pages** — `/benefits`, `/how-it-works`, `/faqs`, `/policies/privacy`, `/policies/terms`.
- **Resend wire-up** — needs `RESEND_API_KEY`, verified `from:` domain, and a destination inbox.
- **Real assets** — partner logos, testimonial photos/names, hero secondary imagery.
- **Solution imagery** — one image per solution for the home tabs (currently falling back to a styled placeholder).
- **GTM ID** — set `NEXT_PUBLIC_GTM_ID` in production to enable Analytics.
- **Auth + patient portal** — separate phase entirely; not in the marketing site.

### Out of scope for this repo

- Auth UI (login/signup/forgot) — lives in the SmilePass app, not the marketing site.
- Patient portal.
- Xano backend integration — forms ship via Resend (transactional email) in Phase 2. CRM integration is a separate decision.
- Blog/articles.
- i18n (AU-only).
