/**
 * Wiki content — single source of truth for /wiki/[slug] pages AND the
 * chatbot's grounded knowledge base.
 *
 * Articles are authored as Markdown in the `body` field and rendered with
 * react-markdown on the article page. The chatbot reads the same bodies
 * to answer questions, citing the article slug it learned from.
 *
 * Per work rule #2 (zero inline duplication): every consumer of wiki
 * content imports from here. Adding an article = appending to WIKI_ARTICLES
 * and (optionally) updating the previous article's `nextSlug` so the
 * "Next step" link points at it.
 */

export interface WikiTrack {
  id: string;
  title: string;
  description: string;
  /** Display order in the side menu. */
  order: number;
}

export interface WikiArticle {
  slug: string;
  title: string;
  /** One-line summary used in the side menu and SEO meta. */
  lead: string;
  trackId: WikiTrack["id"];
  /** Position within the track (1-based). */
  order: number;
  /** Markdown body. Rendered with react-markdown. */
  body: string;
  /**
   * Slug of the natural next article. Powers the "Next step → …" link
   * at the bottom of every article. Omit on the last article.
   */
  nextSlug?: string;
}

/* ─────────────────────────────────────────────────────────── */

export const WIKI_TRACKS: WikiTrack[] = [
  {
    id: "getting-started",
    title: "Getting started",
    description: "From first sign-in to your first ready-to-use clinic.",
    order: 1,
  },
  {
    id: "building-plans",
    title: "Building your plans",
    description: "Design the memberships, payment plans, add-ons and discounts you'll offer.",
    order: 2,
  },
  {
    id: "daily-operations",
    title: "Daily operations",
    description: "Onboard patients, take payments and watch the numbers move.",
    order: 3,
  },
  {
    id: "account-integrations",
    title: "Account & integrations",
    description: "Team management, marketing kit, third-party connections, billing and support.",
    order: 4,
  },
];

/* ─────────────────────────────────────────────────────────── */

export const WIKI_ARTICLES: WikiArticle[] = [
  /* ─── Track 1: Getting started ─── */
  {
    slug: "onboarding-wizard",
    title: "The onboarding wizard",
    lead: "What SmilePass asks during the four-step first-time setup.",
    trackId: "getting-started",
    order: 1,
    nextSlug: "dashboard",
    body: `
![Step 1 of the SmilePass first-time onboarding wizard](/images/wiki/onboarding-wizard.png)
*The four-step wizard that runs the first time you sign in.*

The very first time you sign in to SmilePass, you're handed off to a four-step wizard. Nothing you enter here is permanent — every value is editable later from **Settings**. Treat the wizard as a smart default-builder, not a contract.

## Step 1 — Tell us about your practice

Five fields:

1. **What is your business called?** — your practice name. This becomes the default Company Name and seeds your first Location.
2. **Where is your business based?** — country dropdown, defaulted to Australia.
3. **How many practice locations?** — number of clinics you operate.
4. **Do you currently offer memberships to your patients?** — Yes / No buttons.
5. **How did you hear about us?** — dropdown.

Press **Next** once everything is filled.

## Step 2 — Add your team

A table of four blank rows, each asking for **First Name · Last Name · Work Email · Admin** toggle.

Anyone you add here is immediately sent a welcome email. So **only enter real addresses** — don't fill it with placeholder data to "move on". If you'd rather invite people later, use the **Skip** button at the bottom.

You can always add more users one-at-a-time from **Settings → Logins & Permissions** once you're inside.

## Step 3 — Pick your primary goals

A multi-select with seven options:

- Increase Treatment Acceptance Rate
- Attract New Patients
- Differentiate From Competitors
- Expand Financial Options
- Increase Revenue
- Improve Patient Retention and Re-engagement
- Minimise Revenue Fluctuations / Create Predictable Revenue

Pick whichever apply. SmilePass uses your choices to tune the dashboard hints later. There's no penalty for selecting many.

## Step 4 — Choose your payment solutions

Multi-select again. Six options:

- Membership Plans
- In-House Payment Plans / Instalments
- Third Party Payment Plans / Dental Loans
- Online Instant Payment
- Dental Savings Account
- Gift Cards

The dashboard surfaces only the modules you turn on here. If you're not sure, leave them all on — you can come back and toggle off what you don't use.

Press **Finish** to enter the platform.

## What happens next

You're dropped on the **dashboard** with a five-step setup checklist waiting for you. That checklist picks up right where the wizard left off.
    `.trim(),
  },
  {
    slug: "dashboard",
    title: "Your dashboard",
    lead: "The home screen, the five-step setup checklist, and how it tracks itself.",
    trackId: "getting-started",
    order: 2,
    nextSlug: "quick-actions",
    body: `
![SmilePass dashboard with the 5-step setup checklist, Club Advantage Level and KPI cards](/images/wiki/dashboard.png)
*The home dashboard — setup checklist, gamified milestone bar and live KPIs in one view.*

The dashboard (**Home** in the sidebar) is the first screen you see every time you sign in. It packs three things into one view: a guided setup checklist, your gamified milestone meter, and live KPIs for the period.

## The five-step setup checklist

Front and centre when you're new. Steps:

1. **Set Up Practice Location** — jumps to **Settings → Locations** (Edit your auto-created clinic).
2. **Invite Your Team** — jumps to **Settings → Logins & Permissions** to add staff.
3. **Create Membership Plans** — opens **Settings → Membership Builder**.
4. **Order Marketing Essentials Kit** — opens the in-app shop (Settings → Promotional Material).
5. **Send Patient Invitations** — bulk-invite patients to join your plans.

Two things to know about how the checklist behaves:

- **It self-ticks.** When you complete the underlying action elsewhere in the app, the checklist item flips to "done" on its own — for example, visiting the materials shop ticks step 4. You don't have to come back and mark things complete.
- **It gates.** Some steps require earlier steps. "Send Patient Invitations" stays disabled with a button that reads **Requires Step 3** until you've created at least one membership plan. Build first, invite second.

Press **Hide** in the top-right of the checklist when you've outgrown it.

## The Club Advantage Level

A horizontal milestone bar across five tiers based on your active member count:

- **Emerging** — 25 members
- **Competent** — 100
- **Expert** — 250
- **Elite** — 500
- **Master** — 1,000

It's gamification, not gating. Useful as a benchmark for where you sit relative to other practices.

## KPI cards & charts

Three headline metrics with **this-month deltas** and **goal targets**:

- **Members** — total active members (goal 25)
- **Retention** — % of members still active (goal 95%)
- **Total Revenue** — collected revenue (goal $2,000)

Below: two line charts (**New Members** and **Committed Payments**) plus the **Latest New Members** feed.

The **date-range dropdown** at top-right of the right column (Last 7 days by default) filters the right-side widgets — useful for comparing this week to last.

## Sidebar at a glance

The left sidebar — **Home · Membership · Payment Plan · Reporting** on top, **Support · Settings** pinned to the bottom — stays visible on every screen. The top bar carries the [quick-action shortcuts](/wiki/quick-actions) that work from anywhere.
    `.trim(),
  },
  {
    slug: "quick-actions",
    title: "Quick actions in the top bar",
    lead: "The shortcuts every screen carries — patient creation, payment, theme, location, profile.",
    trackId: "getting-started",
    order: 3,
    nextSlug: "practice-locations",
    body: `
![Top-bar quick-create menu open, showing Add New Member and Create Payment](/images/wiki/quick-actions.png)
*The purple + opens the two highest-frequency shortcuts on every page.*

The top-bar chrome carries shortcuts that work from any page, so staff never have to navigate three menus deep to do common things. Learning these in order of frequency pays back fast.

## Purple **+** — Quick-create menu

The fastest path to action in the entire app. Click to open a tiny menu with two options:

- **Add New Member** — kicks off the full four-step membership wizard.
- **Create Payment** — opens the payment creator (Instant Payment / Payment Hold / Payment Plan tabs).

Worth committing to muscle memory — these are the two most-frequent tasks for front-desk staff.

## Person+ — Register a New Patient

Opens a modal that captures just the patient record, **without** putting them on a membership. Fields:

- Current Location (dropdown)
- First Name · Last Name
- Email · Phone (with **+61** Australian prefix)
- Birthday · Gender
- Address

Use this when you want a patient in the system but they're not signing up for anything yet — for example, a walk-in who'll book a consultation but hasn't decided whether to join the membership.

The difference vs the Add New Member wizard: the wizard wraps a membership around a patient; the person+ saves the patient on their own.

## Search

The magnifying glass icon — global search across patients and records.

## Upgrade Now

Deep-link to **Settings → Subscription** for tier comparison. Quick way to jump there from anywhere.

## Moon / sun

Light / dark theme toggle. Applies to the entire admin app immediately. Personal preference, doesn't affect what patients see.

## Location pin — location switcher

Critical for multi-clinic accounts. Click the pin to drop down a list of every clinic you operate, with a tick beside the one you're currently acting under. Every action you take (Add Patient, Create Payment, reports) is scoped to the selected location. Single-clinic accounts will just see their one location listed.

## User avatar

The circle with your initial in the far right. Click to open a small menu:

- **Profile** — jumps to Settings → My Profile
- **Support** — jumps to the support / tickets page
- **Logout** — signs you out

## Why this matters

If you can call up these shortcuts without thinking, common tasks (book payment, register patient, jump to your profile) collapse from a five-click journey to one click. Train new staff on the top bar before anything else.
    `.trim(),
  },
  {
    slug: "practice-locations",
    title: "Setting up your practice locations",
    lead: "Each clinic you operate is one Location. This is the form to set one up.",
    trackId: "getting-started",
    order: 4,
    nextSlug: "membership-plans",
    body: `
![Edit Location drawer showing Location Details + Profile Description fields](/images/wiki/practice-locations.png)
*Settings → Locations → Edit. The drawer carries every field you need to fully configure one clinic.*

Each clinic you operate is a separate **Location** in SmilePass. A default one is created automatically from the onboarding wizard (named "[Your business] Main Location") and starts with status **PENDING** until every required field is complete.

## Step 1 — Open the Locations list

Navigate to **Settings → Locations**. The table shows every clinic with columns **Location · Users · Status · Actions**. Status pills:

- **PENDING** — fields missing; can't accept patient sign-ups yet
- **Active** — fully configured and live

## Step 2 — Edit or add

To edit the auto-created location, click the **kebab menu (⋯)** on the row → **Edit**. To add a new clinic, use the **Add** button top-right. Either opens the same form as a side drawer.

## Step 3 — Fill in Location Details

The top half of the drawer:

- **Location Name** — what staff and patients see
- **Time Zone** — sets when reminders fire
- **Website** — the clinic's own website URL
- **Address** — full street address (geocoded for the location switcher)
- **Profile photo** — uploaded via the image area on the right
- **Business Name** — trading name; can differ from your Company record
- **ABN** — Australian Business Number
- **Type of legal entity** — dropdown
- **Phone** — main clinic line
- **Email** — main clinic inbox
- **List Dental Practitioners** — multi-select; populated from your Users list

## Step 4 — Fill in the Profile Description

These two fields show on your **public SmilePass profile** (the patient-facing landing page):

- **Practice tag line** — one short hook (e.g. "Family dental care in Southport since 2010")
- **Practice description** — up to 1,000 characters; describe your services, your team, what makes the practice different

## Step 5 — Save

Press **Save Changes**. Once every required field is valid, the **Account Status** flips from PENDING to active and the location can accept patient sign-ups.

## Common gotchas

- **PENDING never flips?** Look for missing fields — Phone, ABN, Time Zone and Type of legal entity are easy to skip.
- **Wrong photo cropping?** Re-upload from the image area on the right side of the drawer.
- **Multi-location practices** — repeat the flow for each clinic. Each becomes selectable in the [location switcher](/wiki/quick-actions).

With at least one Active location, you're ready to start building the plans you'll offer your patients.
    `.trim(),
  },

  /* ─── Track 2: Building your plans ─── */
  {
    slug: "membership-plans",
    title: "Building membership plans",
    lead: "Recurring subscriptions patients pay you directly for, in exchange for included services and discounts.",
    trackId: "building-plans",
    order: 1,
    nextSlug: "plan-templates",
    body: `
![Membership Builder showing Create New Plan and the three recommended templates](/images/wiki/membership-builder.png)
*Settings → Membership Builder. Start blank or pick one of the three templates.*

A **membership plan** is a recurring subscription patients pay your practice directly for, in exchange for a bundle of included services and discounts on additional treatment.

You build plans in **Settings → Membership Builder**. Start from **Create New Plan** for a blank form, or pick one of the three pre-built [plan templates](/wiki/plan-templates) to seed values. Either way you get the same three-tab form.

## Profile tab — the basics

Identifies and prices the plan:

- **Name** — what patients and staff see
- **Locations** — multi-select; which clinics offer this plan
- **Description** — up to 500 characters; shown to patients during sign-up
- **Setup Fee** — checkbox + amount; charged once when a new member joins
- **Price and Frequency** — toggle on any combination of **Weekly / Fortnightly / Monthly / Annually** and set a price for each. Patients pick the frequency that suits them at sign-up
- **Start Date** — when the plan becomes available for sign-ups
- **End Date** — optional; useful for limited-time promotional plans

## Benefits tab — what members actually get

Two columns:

### Included Services and Benefits (left)

A simple table of **service** + **quantity per year** included for free. Press the **+** button to add a row. Examples:

- Dental Exams · 2
- Dental Cleans · 2
- X-Rays · 1
- Emergency Exams · 1

### Discounts on services and Products (right)

Set the percentage discount members get on **additional** treatment, broken into ten service categories:

1. Diagnostic Services
2. Preventive, Prophylactic and Bleaching Services
3. Periodontics
4. Oral Surgery
5. Endodontics
6. Restorative Services
7. Prosthodontics
8. Orthodontics
9. General Services
10. Miscellaneous

Use the **Apply to all** shortcut to set the same percentage everywhere, then tweak individual categories. Toggle the **INCLUDE** column to control whether each category is even part of the discount scheme.

## Terms tab — the contract

- **Membership lock-in period (Months)** — minimum commitment, default 12
- **Age from** / **Age To** — restrict the plan to a specific age band (e.g. 8–65), or click **No age limits** to remove the range
- **Specific Terms and Conditions** — free text up to 500 characters, surfaced to the patient before they sign up

## Save and accept members

Press **Save**. The plan is now visible in the Membership Builder list. Each saved plan appears as a card showing:

- The headline price ("$X / Week")
- The **Accept New Members** toggle (turn off to pause sign-ups without deleting the plan)
- The current member count

The plan can immediately be selected when [adding a new member](/wiki/adding-members).
    `.trim(),
  },
  {
    slug: "plan-templates",
    title: "Plan templates — three worked examples",
    lead: "Essential, Comprehensive and Premium — three pre-built starting points.",
    trackId: "building-plans",
    order: 2,
    nextSlug: "addons",
    body: `
![Recommended Templates row — Essential, Comprehensive and Premium plans](/images/wiki/plan-templates.png)
*Three preset plans you can use as-is, edit after creating, or just study as worked examples.*

SmilePass ships three preset membership templates. Clicking a template opens a preview modal; pressing **Use Template** creates the plan **immediately** with its preset values, which you can then edit. (Heads-up: this is a one-click commit — there's no "load into editable form first" intermediate step.)

The presets are useful as **starting points** or as **reference examples** of how memberships are typically priced.

## Essential Plan — $6.00 / Week

> Ideal for individuals and families looking for a balanced approach to dental care with budget-friendly options. Covers routine needs at a low entry price.

**Included:**

- 2× Dental Cleans per year
- 1× Dental Check-up + X-Rays per year

Good as the **entry tier** in a three-tier offering. The low price removes the barrier to signing up; the included services cover the most common preventive visits.

## Comprehensive Plan

> Combines preventive and emergency dental care for patients who want full coverage without unexpected costs. Built to address every aspect of dental health, with extra protection for urgent needs.

**Included:**

- 2× Annual Check-ups
- 2× Dental Cleans
- Digital X-Rays
- Emergency Exams
- Exclusive Discounts

The **middle tier** in a typical setup. Patients on this plan get the peace-of-mind of emergency cover without paying premium prices. This is often the bestseller — make it visible.

## Premium Plan

> Top-tier coverage for patients who want access to the most advanced dental care at the best value — all-inclusive preventative care, special access to cosmetic and restorative treatments, and exclusive perks.

**Included:**

- 2× Dental Check-ups
- 2× Dental Cleans
- Free Premium Oral Kit
- Extended Warranty
- Exclusive Discount

The **top tier** — for patients who want everything and have the budget. Lower volume, higher revenue per member.

## How to use the templates

There are two healthy ways to use them:

1. **Use Template, then customise.** Press Use Template to create the plan instantly, then open it from the list and adjust the price, included services, locations and discounts to fit your practice.
2. **Read them, then build your own.** Don't press Use Template — instead use them as reference for what a well-shaped plan looks like, and build your own from scratch via [Create New Plan](/wiki/membership-plans).

Whatever you do, **price for your market** — these defaults are illustrative, not benchmarks for every practice.
    `.trim(),
  },
  {
    slug: "addons",
    title: "Add-ons — extras attached to memberships",
    lead: "Recurring extra services a member can attach on top of their plan.",
    trackId: "building-plans",
    order: 3,
    nextSlug: "payment-plans",
    body: `
![New Addon drawer with Profile, Benefits and Terms tabs](/images/wiki/addons-builder.png)
*Settings → Addons Builder. Slimmer than the Membership Builder but the same three-tab shape.*

Add-ons are **recurring extra services** a member can attach on top of their plan — for example a whitening top-up, a take-home oral-hygiene kit, or any product you bill monthly alongside the membership fee.

You build them in **Settings → Addons Builder**.

## Why use add-ons vs new plans

Anything that doesn't change the underlying plan but adds a regular extra charge belongs as an add-on rather than as a separate plan. Add-ons:

- Stack on top of any membership a member is already on
- Show as a discrete line item in the patient's pricing summary at sign-up (**Addons Fee**)
- Can be added or removed mid-membership without restarting the member's plan

## The form

Mirrors the [Membership Builder](/wiki/membership-plans) but slimmer — same three tabs (**Profile / Benefits / Terms**), simpler Profile shape:

### Profile tab

- **Name** — what staff and patients see (e.g. "Take-home whitening trays")
- **Locations** — which clinics offer this add-on
- **Description** — up to 500 characters
- **Price and Frequency** — same Weekly / Fortnightly / Monthly / Annually toggles. No setup fee or dates field — add-ons are simpler than full plans

### Benefits tab

Lists what the add-on includes, same shape as the Membership Builder.

### Terms tab

Lock-in period and any specific T&Cs that apply just to this add-on.

## Save and offer

Press **Save**. The add-on appears in the Addons Builder list and is offered to patients alongside their plan in the [Add New Member wizard](/wiki/adding-members). On the wizard's pricing card, it shows in the **Monthly Fee → Addons Fee** breakdown row.

## Examples to consider

- **Whitening top-up** — quarterly maintenance whitening visits
- **Premium oral-care kit** — branded toothbrush + toothpaste + floss shipped quarterly
- **Insurance gap subscription** — small monthly fee that covers the gap on a specific service
- **Sports mouthguard renewal** — annual refit for athlete members

Keep the catalogue small (3-5 add-ons) so staff can recall them at sign-up without checking the screen.
    `.trim(),
  },
  {
    slug: "payment-plans",
    title: "Payment plans — instalment financing",
    lead: "Multi-instalment financing for specific treatment costs.",
    trackId: "building-plans",
    order: 4,
    nextSlug: "loyalty-and-discounts",
    body: `
![New Payment Plan form with two columns of fields](/images/wiki/payment-plan-builder.png)
*Settings → Payment Plan Builder. One panel, two columns — amounts on the left, frequency and fees on the right.*

A **payment plan** lets a patient spread one specific treatment cost over multiple instalments. Different from [membership plans](/wiki/membership-plans), which are open-ended subscriptions to a bundle of services. Use payment plans for one-off treatments like orthodontics, implants or major restorative work that the patient can't pay for in one hit.

You build payment-plan **templates** in **Settings → Payment Plan Builder**. Each template becomes a re-usable option you can apply when [taking a payment](/wiki/taking-payments) for a specific patient.

## The form

One panel with two columns.

### Top fields

- **Name** — what staff see when picking a template
- **Locations** — which clinics offer this template
- **Description** — up to 200 characters; what staff need to know when picking
- **Only for Members** — toggle. When on, this plan is only offered to patients who already hold a membership. Useful for member-exclusive financing terms

### Left column — amounts & timing

- **Total Payment Amount** — Minimum and Maximum the plan can cover (e.g. min $500, max $15,000)
- **Instalment length (month)** — press **ADD +** to add each duration you offer (e.g. 6, 12, 24). The patient picks one at sign-up
- **Set instalment to start after** — defer the first payment by N days or months. Useful for treatment-completion scenarios where you don't want billing to start until the work is finished

### Right column — frequency & fees

- **Payment Frequency** — Weekly / Fortnightly / Monthly toggles, all on by default. Turn off anything you don't want to offer
- **Amount** — ADD + for each instalment amount tier the plan supports
- **Setup Fee** — ADD + for a one-time setup charge billed before instalments start
- **Deposit** — ADD + for an upfront deposit
- **Admin Fee** — ADD + for a recurring administration charge

The **ADD +** pattern lets one template carry multiple tiers — so a single "Orthodontics 12-month" plan can offer $200/mo, $250/mo, $300/mo depending on case complexity.

## Save

Press **Submit**. The template is now available when you create a payment for a specific patient — see [taking payments](/wiki/taking-payments).

## Compared to instant payments

- **Instant Payment** — one charge, one link. Patient pays now (or by the due date)
- **Payment Plan** — multiple charges spread over time, automated. Patient enters into a financing agreement
- **Payment Hold** — authorise an amount without capturing it (typically for treatment-day deposits)

Build templates for the treatments you finance often. For a one-off custom plan, you can also use **Create Personalised Payment Plan** in the payment flow without pre-building a template.
    `.trim(),
  },
  {
    slug: "loyalty-and-discounts",
    title: "Loyalty, discounts & promo codes",
    lead: "Dependent discounts, referral rewards, and promo codes.",
    trackId: "building-plans",
    order: 5,
    nextSlug: "registering-patients",
    body: `
![Manage Discounts modal with Dependent Program and Referral Program toggles](/images/wiki/manage-discounts.png)
*Settings → Custom Discounts & Code → Manage Discounts. Two switches, two percentages, lots of leverage.*

Loyalty in SmilePass takes three forms, all configured in **Settings → Custom Discounts & Code**. Together they let you reward families, drive referrals, and run targeted campaigns without bending the price of your underlying plans.

## Dependent Program — family discount

Press **Manage Discounts**, toggle **Dependent Program** on, and set a percentage (default 10%).

The discount **accumulates** for the account holder with every dependent added.

> **Example:** at 10%, an account holder with 3 dependents gets a 30% membership discount, and each dependent also gets 10%. A family of 5 (account holder + 4 dependents) on a $20/month plan pays $20 × 0.6 + 4 × $20 × 0.9 = **$84/month** instead of $100 if there were no dependent discount.

Use this to make family-of-four sign-ups feel like a deal — they likely will pay for itself many times over in retained patient relationships.

## Referral Program — word-of-mouth rewards

In the same Manage Discounts modal, toggle **Referral Program** on and set a percentage.

How it works:

- **Existing members** earn the discount per active referral for **12 months**
- The **referred friend** keeps the discount for as long as they remain a member

> **Example:** at 10%, a member with 2 active referrals pays 20% less on their membership for 12 months, while each referred friend gets 10% off for as long as they stay subscribed.

The 12-month cap on the existing member keeps the discount sustainable for your practice while still rewarding sustained advocacy.

## Promo codes — campaign vouchers

The **Promo Code List** below the Referral card lets you create one-off coupon codes:

| Column | Used for |
|---|---|
| **Name** | Internal label (e.g. "Spring 2026 launch") |
| **Code** | What patients type at sign-up (e.g. SPRING25) |
| **Status** | Active / Inactive |
| **Active/View** | Quick toggle + edit |
| **Actions** | Delete / archive |

Press **Add** (top right of the card) to create a new code.

Patients use the code by typing it into the **COUPON** field on the [Add New Member wizard](/wiki/adding-members) → Step 1. The pricing card live-updates as the discount applies.

## When to use which

- **Dependent Program** — leave it on. It's a no-brainer for family bookings.
- **Referral Program** — turn it on once you have ~25 happy members to refer-from.
- **Promo codes** — for one-off campaigns: new-clinic launch, a partner-network special, seasonal pushes.

You can run all three at once — the discounts stack at sign-up.
    `.trim(),
  },

  /* ─── Track 3: Daily operations ─── */
  {
    slug: "registering-patients",
    title: "Registering a new patient",
    lead: "Save a patient record without putting them on a membership yet.",
    trackId: "daily-operations",
    order: 1,
    nextSlug: "importing-patients",
    body: `
![Register a New Patient modal with name, email, phone, birthday and address fields](/images/wiki/register-patient.png)
*The top-bar person+ icon opens this modal. Quick patient record, no membership required.*

Sometimes you want a patient in the system but they're not signing up for a plan yet — for example, a walk-in who booked a consult but hasn't decided about membership. For that, use the **person+** icon in the top bar.

## How to open the form

Click the **person+ icon** in the top bar (next to the purple **+**). A **Register a New Patient** modal opens.

If you'd rather wrap the patient in a membership in one go, use [Add New Member](/wiki/adding-members) instead.

## The fields

The modal asks for:

- **Current Location** — which clinic this patient belongs to (defaults to the one you currently have selected via the [location switcher](/wiki/quick-actions))
- **First Name · Last Name**
- **Email** — must be a valid address; SmilePass uses it for payment links and reminders
- **Phone** — **+61** prefix locked in; you type the rest as digits only (no spaces or hyphens)
- **Birthday** — date picker
- **Gender** — dropdown
- **Address** — full street address

## Submit

Press **Submit**. The patient is saved as a bare record. You can later:

- Send them an [Instant Payment](/wiki/taking-payments) link
- Convert them into a member by running the [Add New Member](/wiki/adding-members) wizard against their existing record
- See them in any patient search

## When to use this vs Add New Member

| Use **person+** when… | Use **Add New Member** when… |
|---|---|
| The patient hasn't committed to a plan | The patient is ready to sign up for a membership |
| You need a record fast (e.g. mid-appointment) | You have time to walk through the wizard |
| You want to send a single Instant Payment but they're not in the system yet | You want to bill them recurring fees |

The person+ flow takes ~30 seconds. Use it liberally — having every patient in the system makes everything else easier.
    `.trim(),
  },
  {
    slug: "importing-patients",
    title: "Importing existing patients (CSV bulk)",
    lead: "Load your existing patient list into SmilePass in one go instead of typing them one-by-one.",
    trackId: "daily-operations",
    order: 2,
    nextSlug: "adding-members",
    body: `
![Import Patients screen with template download link and drag-and-drop CSV upload zone](/images/wiki/import-patients.png)
*Settings → Import Patients. Download the template, fill it, drop it back in.*

If you're migrating from another system or starting fresh with a list of existing patients, **Settings → Import Patients** lets you bring them in via a CSV upload — no manual data entry.

## Step 1 — Download the template

On the Import Patients page, click **Template Patient List.csv** to download the file SmilePass expects.

**Don't change the column order or rename the headers.** The import maps columns by name, so editing them will silently fail or import into the wrong fields.

## Step 2 — Fill in the basic details

Open the file in your spreadsheet program. Per row, fill in:

- **name** — full name
- **email** — must be a valid address (patients receive invitations here)
- **phone** — Australian mobile, digits only
- **address** — full street address
- **date of birth** — format as the template specifies (typically YYYY-MM-DD or DD/MM/YYYY)

Leave optional cells **blank** rather than typing placeholders like "N/A" — the import treats empty as missing, but text as data.

## Step 3 — Upload the file

Back in SmilePass:

1. Save the spreadsheet as **.csv** (not .xlsx — Excel format won't work)
2. Drag the file onto the dashed upload zone, or click **DROP FILES HERE OR CLICK TO UPLOAD** to pick it

## Step 4 — Submit

Press the submit button. SmilePass processes the file in the background and adds each row as a patient record.

## Heads-up — auto-invitations

> Patients imported this way are **automatically sent invitations** to join your membership plans. Reach out to current patients, offering them the benefits of joining your membership program to enhance their care experience.

If you only want to **load records without contacting them yet**, hold off on importing until you've decided which plans to expose. Or do a small test batch first (5–10 patients you've already told to expect an email).

## Common problems

- **"My headers got changed by Excel"** — Excel sometimes auto-formats column headers. Open the CSV in a plain text editor to verify before uploading
- **Date formats mismatched** — stick to exactly what the template's example row shows
- **Duplicate emails** — the import deduplicates by email. The newest import wins
    `.trim(),
  },
  {
    slug: "adding-members",
    title: "Adding a new member (the membership wizard)",
    lead: "The four-step flow that signs a patient up to a membership plan.",
    trackId: "daily-operations",
    order: 3,
    nextSlug: "taking-payments",
    body: `
![Add New Member wizard Step 1 with the live pricing card on the right](/images/wiki/add-member-wizard.png)
*Start → Form → Dependents → Review. The right-hand pricing card updates as the patient's plan and dependents change.*

The **Add New Member** wizard is the canonical way to put a patient onto a [membership plan](/wiki/membership-plans). It walks through plan selection, personal details, dependents and payment in four steps.

## How to start

Two paths:

1. Click **Membership** in the left sidebar → **Add New Member** button at the top-left of the table
2. Use the **+** quick-create in the top bar → **Add New Member**

Either way you land on Step 1 of the wizard. Above the form, four step indicators show your progress: **Start · Form · Dependents · Review**.

## Step 1 — Start (Select Plan)

The left half of the screen captures core details:

- **Current Location** — dropdown; defaults to the location you have selected in the [switcher](/wiki/quick-actions)
- **Start at** — date picker; defaults to today
- **Select Account Holder Plan** — pick from your active membership plans

The **right half** is a live pricing card that updates as you choose. It splits costs into two blocks:

- **Join Fee** (one-time) — Account Holder · Dependents · SmilePass Fee
- **Monthly Fee** (recurring) — Account Holder · Dependents · Addons Fee · SmilePass Fee

A **COUPON** field at the top of the card accepts a [promo code](/wiki/loyalty-and-discounts). The discount applies live.

Press **Next** to continue.

## Step 2 — Form (Personal Details)

Patient contact and identity information. Standard fields (name, email, phone, address, date of birth, etc.).

If the patient is already in the system from a previous [registration](/wiki/registering-patients), SmilePass will offer to pre-fill from their existing record.

## Step 3 — Dependents

Optionally attach family members covered under the same account holder. For each dependent: name, date of birth, relationship.

Adding dependents triggers the [**Dependent Program discount**](/wiki/loyalty-and-discounts) — the pricing card on the right updates to show the discount applied.

If you have **add-ons** built, this is also where they can be attached. The pricing card moves them into the "Addons Fee" line of the Monthly Fee block.

## Step 4 — Review (Send Payment Link)

Confirm the final breakdown. Press the send button — SmilePass dispatches a payment link to the patient by email or SMS.

The patient completes payment **themselves** on their own device. Once they pay:

- Their record flips from pending to **Active** in the membership list
- The Join Fee is captured
- Their Monthly Fee schedule kicks off based on the **Start at** date you chose in Step 1

## Tip — let the patient pay on their phone

Don't try to capture card details from the patient at the front desk. Send the link, let them tap through on their own phone. It's faster for everyone and avoids PCI compliance concerns.
    `.trim(),
  },
  {
    slug: "taking-payments",
    title: "Taking a payment — Instant, Plan or Hold",
    lead: "Three payment flows for three different situations.",
    trackId: "daily-operations",
    order: 4,
    nextSlug: "tracking-results",
    body: `
![Create Payment screen with Instant Payment / Payment Hold / Payment Plan tabs](/images/wiki/create-payment.png)
*Three flows for three situations. Instant Payment is the most-used.*

Click **Payment Plan** in the left sidebar to reach the payments list. The list shows every payment in flight with columns **Member · Start Date · Payment Type · Total Amount · Progression · Balance · Status · Actions**. **Progression** and **Balance** are how you reconcile multi-instalment plans patient-by-patient — see [tracking results](/wiki/tracking-results).

To create a new payment, press **Create Payment**. The form has three tabs.

## Instant Payment — single charge, single link

The simplest path. Use it for single-visit costs, deposits, one-off invoices — anything that doesn't need an instalment plan.

1. **Select Patient** — search the members list or use **+ ADD NEW PATIENT** to create one on the fly
2. **Amount** in dollars
3. **Due Date** — when payment is due
4. **ADD MORE +** — if you need to bill for multiple items at once, add more amount/due-date pairs to the same link
5. **Send** — patient receives the link by SMS or email immediately

They pay from their phone, no terminal required.

## Payment Plan — multi-instalment financing

Apply a pre-built [payment plan template](/wiki/payment-plans), or click **Create Personalised Payment Plan** to design a one-off plan for this specific patient (same field shape as the Payment Plan Builder).

Use this for treatment costs the patient will pay off over weeks or months — orthodontics, implants, major restorative work.

The pagination at the bottom of the Plan list (< Prev [1] Next >) cycles through your pre-built templates if you have many. If the patient already has an active membership, plans flagged **Only for Members** will appear here too.

## Payment Hold — authorise without capturing

Reserve an authorised amount on the patient's card without actually capturing it yet. Useful for **treatment-day deposits** — you authorise $500 before the appointment, then capture (or release) once the work is done and you know the final cost.

This tab is **greyed out on the Free tier** — it's a paid-tier feature. Upgrade if you need it.

## What happens after Send

Sent payments appear in the Payment Plan list. The Status column tells you what's happening:

- **Pending** — link sent, awaiting patient action
- **Active** — patient has paid (Instant) or is on schedule (Plan)
- **Failed** — most recent attempt was declined
- **Completed** — all instalments paid (Plan) or the single payment is done (Instant)

**Progression** shows what fraction of a plan is paid (e.g. 3/12 = $750/$3,000). **Balance** is the outstanding amount.

## When in doubt

If you're not sure which type to use, default to **Instant Payment**. You can always come back and put the patient on a plan later if the bill turns out larger than expected.
    `.trim(),
  },
  {
    slug: "tracking-results",
    title: "Tracking results — KPIs, reports and reconciliation",
    lead: "Dashboard KPIs, referral tracking, and per-list status columns.",
    trackId: "daily-operations",
    order: 5,
    nextSlug: "account-and-team",
    body: `
![Dashboard KPI cards — Members, Retention and Total Revenue with goals](/images/wiki/tracking-results.png)
*The dashboard's KPI strip is the at-a-glance view. The Reporting page and per-list status columns are the other two reporting surfaces.*

"Reports" in SmilePass lives in **three places**, each tuned to a different question. You'll likely flip between them every week.

## 1. The dashboard — at-a-glance KPIs

**Home** in the sidebar. Three headline metrics:

- **Members** — count of active members, with this-month delta and goal target (default 25)
- **Retention %** — percentage of members still active, with goal target (default 95%)
- **Total Revenue** — collected this period, with this-month delta and goal ($2,000 default)

Below: two line charts — **New Members** and **Committed Payments**. Plus the **Latest New Members** feed.

The **date-range dropdown** (Last 7 days by default) filters the right-side widgets. Use it to compare this week to last, this month to last, etc.

## 2. Reporting — referral tracking

**Reporting** in the sidebar opens \`/apps/member/member-referral\`. Despite the name, this is **specifically a referral tracking dashboard**, not a general financial reports area.

Columns: **Account Holder · Dependents · Start Date · Campaign · User · Status**.

Filters at top: by **Campaign**, by **User** (which staff member is associated), by **Status**.

Use this to monitor:

- Who's bringing in new patients via your [referral program](/wiki/loyalty-and-discounts)
- How each referral converts
- Which campaigns (promo codes, marketing pushes) are pulling weight

## 3. Per-list status columns — patient-level reconciliation

Both the **Membership** and **Payment Plan** lists carry their own status columns. This is where your **per-patient reconciliation** lives.

### Membership list

- **Status** — Active / Pending / Cancelled / Failed
- **Plan** — which plan they're on
- **Start Date**

Filter by **Practice**, **Plan** or **Status** at the top.

### Payment Plan list

- **Progression** — e.g. 4/12 (paid 4 of 12 instalments)
- **Balance** — outstanding dollars
- **Status** — Active / Completed / Failed / Pending
- **Payment Type** — Instant / Plan / Hold

Filter by **Practice**, **Status** or **Payment Type**.

When a plan goes **Failed**, follow up with the patient via the Actions menu (resend link, contact patient, etc.). When **Completed**, you can archive or leave for records.

## What's not here

There is no separate "Profit & Loss" or "Aged Receivables" view inside SmilePass. For accounting-grade reports, the **[Xero integration](/wiki/integrations)** pushes invoices into your accounting file where you build those reports.

For deeper reporting (cohort analysis, per-staff attribution), the **Pro tier** unlocks "Advanced reports" — see [pricing](/wiki/pricing).

## Weekly rhythm

A useful 5-minute weekly check:

1. Open the dashboard. Compare this week's KPIs to last week's via the date-range dropdown
2. Open the Payment Plan list. Sort by Status, action any Failed payments
3. Open Reporting. See which referrals just converted, thank the referring members personally if possible
    `.trim(),
  },

  /* ─── Track 4: Account & integrations ─── */
  {
    slug: "account-and-team",
    title: "Account & team",
    lead: "My Profile, Logins & Permissions, and the top-level Company record.",
    trackId: "account-integrations",
    order: 1,
    nextSlug: "marketing-shop",
    body: `
![Logins & Permissions User List showing one Admin user](/images/wiki/account-and-team.png)
*Settings → Logins & Permissions. Each row is one staff login, scoped to one or more clinics.*

Three Settings panels cover the people who log in and the practice entity itself.

## My Profile — your personal account

**Settings → My Profile**. Your individual account record:

- **First Name · Last Name**
- **E-mail** — the address you sign in with
- **Phone**
- **New Password / Retype New Password** — leave blank to keep your current password

Press **Save changes** to commit, **Cancel** to discard.

You can also reach this page via the **user avatar dropdown → Profile** in the top bar.

## Logins & Permissions — your staff

**Settings → Logins & Permissions**. The **User List** table:

| Column | Used for |
|---|---|
| **Name** | Who they are |
| **Locations** | Which clinics they can act under (icons) |
| **Status** | Active / Pending / Disabled |
| **Admin** | Toggle — admin access vs limited access |
| **Actions** | Edit / Disable / Delete |

### Adding a user one-at-a-time

Press **Add** (top right). A drawer opens asking for:

- **First Name · Last Name**
- **Email** — the invitation is sent here
- **User Role** — dropdown
- **Locations** — multi-select for which clinics this user can act under

Press **Create**. The new user receives a welcome email and shows in the list immediately. They'll show as **Pending** until they accept the invite.

> Different from the bulk-invite step in the [onboarding wizard](/wiki/onboarding-wizard): this is the post-launch way to add people one at a time. Use this for any new hire.

## Company — the top-level legal entity

**Settings → Company**. This is the **business** record, separate from each clinic's [Location](/wiki/practice-locations).

Two blocks:

### Company Details

- **Company Name** — your legal trading entity
- **ABN** — Australian Business Number

### Contact Person

The primary admin SmilePass contacts about subscription, billing or escalations.

- **First Name · Last Name**
- **E-mail**
- **Phone Number**

This person typically isn't the same as every staff user — they're the one who owns the SmilePass relationship.

## How the three relate

Think of it as three concentric circles:

- **Company** = the legal entity (one)
- **Locations** = the clinics it operates (one or many)
- **Logins & Permissions** = the people who log in (many, each scoped to one or more locations)

Set Company and Locations once at setup. Maintain Logins & Permissions as your team grows.
    `.trim(),
  },
  {
    slug: "marketing-shop",
    title: "Marketing materials shop",
    lead: "Printed flyers, brochures, posters and stickers ordered through the platform.",
    trackId: "account-integrations",
    order: 2,
    nextSlug: "integrations",
    body: `
![Promotional Material shop grid showing printable flyers, brochures and stickers](/images/wiki/marketing-shop.png)
*Settings → Promotional Material. Star-rated, free or low-cost. View PDF previews and Request to order.*

**Settings → Promotional Material** opens a small e-commerce shop with **printable assets** you can order through SmilePass. A mix of free items and low-cost paid items — useful when you want consistent on-brand collateral without designing your own.

It's also the destination of the dashboard checklist's **"Order Marketing Essentials Kit"** step. The first time you open this shop, that checklist item self-ticks.

## What's on offer

The current catalogue (~9 items) includes:

- **Posters** for the reception area ("Unlock your perfect smile")
- **Tiles / brochures** explaining membership benefits to walk-in patients
- **Flyers** highlighting payment options
- **Window decals / stickers** ("SmilePass Accepted Here") for the shopfront
- **Partnership banners** for cross-promotion

Each card shows:

- A **thumbnail** preview
- A **star rating** — signal for how useful other practices have found it
- The **price** (Free or a small dollar amount)
- Two action buttons

## The two action buttons

- **View PDF** — preview the printable PDF before ordering
- **Request** — order the item

The Featured dropdown at the top lets you sort, and the grid/list view toggle changes the layout. The **Search Product** box at the top searches across the catalogue.

## How ordering works

Click **Request** on the item you want. SmilePass handles printing and shipping to the address you've registered against your Company record.

Free items are exactly that — you only pay shipping (if any). Paid items are charged to the credit card on file (see [Billing & payouts](/wiki/billing-and-payouts)).

## Practical advice

The most useful items for a new practice:

- One **patient-facing brochure** explaining your plans, on the reception desk
- One **window decal** so passers-by know you accept SmilePass
- One **A4 flyer** describing payment plans, behind the front desk for staff to hand out when patients ask about cost

Start small. Order more after you see which assets your staff actually use.

The catalogue grows over time — bookmark the shop and check back occasionally.
    `.trim(),
  },
  {
    slug: "integrations",
    title: "Integrations — Xero, Zoho, Principle",
    lead: "Connect SmilePass to your accounting, CRM and practice-management tools.",
    trackId: "account-integrations",
    order: 3,
    nextSlug: "pricing",
    body: `
![Integrations page showing Xero, Zoho and Principle cards](/images/wiki/integrations.png)
*Settings → Integrations. Xero is live; Zoho and Principle are flagged Coming Soon.*

**Settings → Integrations** is where you connect SmilePass to other tools your practice already uses. Three integrations are listed today; two are flagged Coming Soon.

## Xero — Share Invoices (available now)

**Status:** Connect available

**What it does:** Pushes invoices generated in SmilePass straight into your Xero accounting file. Reduces the manual reconciliation step at month-end and means your bookkeeper doesn't have to re-enter every transaction.

**To connect:**

1. Click **CONNECT** on the Xero card
2. You'll be redirected to Xero to authorise SmilePass
3. Pick which Xero organisation to connect to (if you have more than one)
4. Approve the requested permissions
5. You're returned to SmilePass; the card now shows the connection as active

From that point forward, every membership Join Fee, recurring Monthly Fee and payment plan instalment SmilePass collects will be recorded as an invoice in Xero against the patient's contact record.

**To disconnect:** click the Xero card again and use the disconnect option (visible once connected).

## Zoho — Share Leads (coming soon)

**Status:** Coming Soon

**What it'll do:** Forward enquiries and prospects from SmilePass into a Zoho CRM pipeline. Useful for practices that already run sales follow-up in Zoho — every new lead the SmilePass website captures gets routed to your existing CRM workflow.

**Notify-me:** the card will flip to **CONNECT** when it's live; no action needed from you to be eligible.

## Principle — Share Patients (coming soon)

**Status:** Coming Soon

**What it'll do:** Sync patient records with the **Principle** practice-management system — bi-directional so patient data stays in sync between the two systems. Especially useful for practices running their clinical operations in Principle and using SmilePass for the membership/payment layer.

## What if my system isn't here?

- **Have an API?** Reach out via [Support](/wiki/support) — Enterprise customers can request custom integrations
- **Use accounting other than Xero?** The Xero connector pulls invoices into Xero; if you use MYOB, QuickBooks or another package, the manual reconciliation is via the **[Billing & payouts](/wiki/billing-and-payouts)** Payment History export

The integrations area will grow over time. Check back as your practice scales.
    `.trim(),
  },
  {
    slug: "pricing",
    title: "Your SmilePass subscription",
    lead: "The four pricing tiers and what each one includes.",
    trackId: "account-integrations",
    order: 4,
    nextSlug: "billing-and-payouts",
    body: `
![Subscription tier comparison — Free, Growth, Pro (Most Popular) and Enterprise](/images/wiki/subscription-tiers.png)
*Settings → Subscription. Monthly / Yearly toggle, four tiers, fees printed per tier.*

**Settings → Subscription** (or the **Upgrade Now** button in the top bar) opens your SmilePass plan. Toggle **Monthly** / **Yearly (save 25%)** to compare billing cycles. Four tiers, each with its own per-transaction fee structure.

## Free — $0 forever

**Transaction fees:** Membership 6.56% · Other Payments 2.5%

**For:** Small clinics exploring basic payment options and memberships.

**Main benefits:**

- Up to 50 members
- Members Directory
- Automated invoicing
- Membership Auto-Renewals
- Access to the Help Centre

## Growth — $39 per practice / month

**Transaction fees:** Membership 6.39% · Other Payments 2.1%

**For:** Clinics expanding payment options with customisable plans.

**Everything in Free, plus:**

- Up to 200 members
- 3 users for staff access
- Customisable Terms
- Referral Program
- Exclusive webpage

## Pro — $75 per practice / month *(Most Popular)*

**Transaction fees:** Membership 5.94% · Other Payments 1.8%

**For:** Practices whose programs are scaling and need advanced tools and insights.

**Everything in Growth, plus:**

- Unlimited members
- Unlimited users
- Dedicated onboarding
- Advanced reports
- Priority Support

## Enterprise — Custom

**Transaction fees:** Most competitive fees — designed per agreement

**For:** Large networks needing full customisation and unlimited scalability.

**Everything in Pro, plus:**

- White labelling
- Custom integrations
- Custom reports
- Organisation settings

Press **CONTACT US** on the Enterprise card to start a conversation.

## How to choose

A practical rule of thumb:

- **Under 50 members?** Free tier is enough to validate the model.
- **50 to 200 members or running a [referral program](/wiki/loyalty-and-discounts)?** Growth pays for itself in the lower transaction fees alone.
- **200+ members or want priority support and dedicated onboarding?** Pro.
- **Multi-clinic network with branding requirements?** Enterprise.

Switching tiers is immediate — click **SELECT** on the tier you want. Yearly billing gives you a 25% discount and is the right call if you're committed to using SmilePass for the next 12 months.

## What you pay for

Two things go on your credit card:

1. **The subscription fee** (Growth/Pro/Enterprise — Free is genuinely free)
2. **A small percentage of every transaction** SmilePass processes for you

Both show up in your [Billing & Payouts](/wiki/billing-and-payouts) Payment History.
    `.trim(),
  },
  {
    slug: "billing-and-payouts",
    title: "Billing & payouts",
    lead: "How SmilePass charges your practice for paid features.",
    trackId: "account-integrations",
    order: 5,
    nextSlug: "support",
    body: `
![Billing and Payout page with Add Card and Payment History sections](/images/wiki/billing-and-payouts.png)
*Settings → Billing and Payout. Your card on file plus the audit trail of every charge SmilePass has made.*

**Settings → Billing and Payout** is where SmilePass charges **your practice** for the paid features you have enabled. Two sections.

## Payment Details — your card on file

Press **ADD CARD** to attach a credit card to your account. SmilePass uses this card to bill:

- Your subscription tier (Growth / Pro / Enterprise — Free has no charges here)
- Any add-on or upgrade charges you've opted into
- The per-transaction percentage on patient payments SmilePass processes for you (see [pricing](/wiki/pricing))

You can add multiple cards if you want a backup; one is marked as the primary.

## Payment History — your audit trail

A table of every charge SmilePass has made to your card:

| Column | Used for |
|---|---|
| **Name** | Description of the charge (subscription, transaction fee batch, etc.) |
| **Location** | Which clinic the charge belongs to (for multi-clinic accounts) |
| **Date** | When the charge was made |
| **Amount** | In dollars |

This is your accounting audit trail. Export it monthly for your bookkeeper, or — better — connect [Xero](/wiki/integrations) so each charge flows directly into your accounting file as a bill.

## What this page is NOT

Important distinction: **this page is not where you reconcile patient payments.**

- **Practice paying SmilePass** — Billing and Payout (this page)
- **Patients paying your practice** — tracked in the [Membership list](/wiki/adding-members) and [Payment Plan list](/wiki/taking-payments) via the **Status**, **Progression** and **Balance** columns. See [Tracking results](/wiki/tracking-results)

The two flows are separate by design — your patient revenue lands directly in your nominated bank account; SmilePass only takes its cut via this Billing page.

## Common questions

- **What if my card gets declined?** SmilePass retries automatically a couple of times, then emails the Contact Person on your [Company record](/wiki/account-and-team). Add the card via this page to clear the issue.
- **Can I see what's coming up?** Payment History shows posted charges only. For an estimate of next month's bill, multiply your Growth/Pro tier fee + estimated transaction-fee share of your typical monthly volume.
- **Receipts?** Each row in Payment History generates a downloadable receipt for accounting.
    `.trim(),
  },
  {
    slug: "support",
    title: "Getting help",
    lead: "How to open a support ticket and what happens after you do.",
    trackId: "account-integrations",
    order: 6,
    body: `
![Support page with the New Request form on the left and ticket history on the right](/images/wiki/support.png)
*Sidebar → Support. File a ticket on the left, watch its status on the right. Or just ask the chatbot — it can file the ticket for you.*

SmilePass has three paths for getting help, in increasing order of formality.

## 1. Ask the chatbot (fastest)

Open the chatbot from the launcher button at the bottom-right of any **Wiki** page. It's grounded in this knowledge base and will:

- Answer most "how do I…" questions instantly
- Cite which article it learned from so you can read the full context
- If it can't answer, it can **open a support ticket** for you directly — no separate form to fill in

Try the chatbot first for any straightforward question. It's much faster than waiting for a human reply.

## 2. Open a ticket yourself

If you prefer to write a ticket directly, click **Support** at the bottom of the left sidebar (or pick **Support** from the user avatar dropdown in the top bar). The page is split in two.

### Open a new request (left)

Fill in:

- **Title** — one line summarising the issue
- **Description** — what happened, in up to 500 characters
- **Priority** — dropdown; default Low
- **Support Category** — dropdown; default Technical Issues & Bugs
- **Upload Image** — attach a screenshot for context (recommended for bugs)

Press **Add** to file the ticket.

### Your tickets (right)

A sortable table of every ticket you've opened. Columns: **Priority · Date · Title · Category · Status**. Replies from the SmilePass team appear inside the ticket detail view — click into a row to see the conversation.

Statuses cycle: **Open → In Progress → Waiting on user → Resolved → Closed**.

## 3. Reach a human

For anything urgent — billing-impacting issues, security concerns, or escalations — use the [Contact us](/contact) form on the marketing site. That routes directly to the SmilePass team rather than the general support queue.

For Enterprise customers, dedicated account managers reach out and handle escalations directly. Pro tier gets **Priority Support** — your tickets jump the queue.

## What makes for a good ticket

Help us help you. Include:

- **What you were trying to do** ("I was creating a payment plan with a 24-month term")
- **What happened** ("the ADD + button did nothing")
- **Browser + device** ("Chrome on Mac")
- **Screenshot** (use the Upload Image field)

A ticket with all four resolves in roughly 1/3 the time of a vague one.

## What's next

That wraps up the SmilePass wiki. From here you can:

- [Return to the wiki index](/wiki)
- [Contact a human](/contact)
- Use the **chatbot** at the bottom-right for any specific question
    `.trim(),
  },
];

/* ─────────────────────────────────────────────────────────── */

/** Find an article by slug. Returns undefined if not found. */
export function getArticleBySlug(slug: string): WikiArticle | undefined {
  return WIKI_ARTICLES.find((a) => a.slug === slug);
}

/** Find a track by id. */
export function getTrackById(id: string): WikiTrack | undefined {
  return WIKI_TRACKS.find((t) => t.id === id);
}

/** All articles in a track, sorted by their position within the track. */
export function getArticlesInTrack(trackId: string): WikiArticle[] {
  return WIKI_ARTICLES
    .filter((a) => a.trackId === trackId)
    .sort((a, b) => a.order - b.order);
}

/** Resolve the next article object from a given article's `nextSlug`. */
export function getNextArticle(article: WikiArticle): WikiArticle | undefined {
  return article.nextSlug ? getArticleBySlug(article.nextSlug) : undefined;
}
