# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

`@smilepass/web` — the SmilePass marketing site. A faithful re-build of the current `smilepass.com.au` (which runs on WordPress + Elementor) in **Next.js 16 + React 19 + Tailwind 4**, with a clean architecture so the team can iterate from a familiar shell instead of inheriting WordPress baggage.

The intent is **structural parity** with the current production site, not a redesign: same menu, same footer hierarchy, same 9 solution names, same hero copy, same section order. The improvements that fall out for free are: (a) actual dedicated pages per solution instead of 9 menu items all pointing to `/payment-plans/`, (b) no placeholder copy in production, (c) modern stack with real performance budget, (d) the brand purples extracted directly from the official logo.

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
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
npm run lint     # eslint
npx tsc --noEmit # type-check without emitting
```

`npm run build` is the source of truth for "ready for QA". `dev` mode masks classes of errors (server-component boundary violations, font-loading failures, static-prerender errors) that only surface at build time.

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

### Forms (Phase 2)

The pattern is **Server Actions + Zod**. One Zod schema per form lives in `src/lib/schemas/`. The same schema is used client-side (form validation) and server-side (action input parsing). Server Actions live in `src/app/actions/` and call Resend to deliver the email.

**Phase 1 (current):** UI is built, submit is stubbed (logs to console). **Phase 2:** wire Server Actions to Resend, validate via Zod, return `{ success, error? }` to the client.

DTO-at-boundary is non-negotiable here — never trust raw form data. The schema is the contract.

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

### A new solution

1. Add an inline SVG icon component in `src/data/solutions/icons.tsx` (follow the existing weight-1.6 stroke style).
2. Add an entry to the `solutions` array in `src/data/solutions/index.tsx`:
   ```tsx
   {
     slug: "new-thing",
     label: "New Thing",
     href: "/new-thing",
     tagline: "Short one-liner for nav dropdowns.",
     headline: "Headline for the solution's hero",
     description: "Full paragraph for the home tab / page hero.",
     bullets: ["...", "...", "..."],
     imageAlt: "...",
     Icon: NewThingIcon,
   }
   ```
3. Create the page at `src/app/new-thing/page.tsx` that renders `<SolutionPageTemplate data={solution} />`.
4. Add the URL to `src/app/sitemap.ts` if it's already not flowing from the registry.

That's it. The header dropdown, footer, home tabs, home chips strip — all pick it up automatically.

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

- **9 solution pages** — each one renders `SolutionPageTemplate` with its own data. Slugs match the registry: `/membership-plans`, `/payment-plans`, `/dental-loans`, `/dental-savings-account`, `/online-payments`, `/access-superannuation`, `/crypto-payments`, `/loyalty-referral-programs`, `/crowdfunding`.
- **Pricing page** (`/pricing`) — `PricingTable` with Monthly/Yearly toggle. Awaiting real tier/price data.
- **Contact + Request Demo pages** (`/contact`, `/request-demo`) — forms with Zod + Server Actions; wire to Resend when API key arrives.
- **Standalone pages** — `/patients`, `/benefits`, `/how-it-works`, `/faqs`, `/policies/privacy`, `/policies/terms`.
- **Resend wire-up** — needs `RESEND_API_KEY`, verified `from:` domain, and a destination inbox.
- **Real assets** — partner logos, testimonial photos/names, hero secondary imagery.
- **Solution page imagery** — one image per solution for the home tabs (currently falling back to a styled placeholder).
- **GTM ID** — set `NEXT_PUBLIC_GTM_ID` in production to enable Analytics.
- **Auth + patient portal** — separate phase entirely; not in the marketing site.

### Out of scope for this repo

- Auth UI (login/signup/forgot) — lives in the SmilePass app, not the marketing site.
- Patient portal.
- Xano backend integration — forms ship via Resend (transactional email) in Phase 2. CRM integration is a separate decision.
- Blog/articles.
- i18n (AU-only).
