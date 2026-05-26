/**
 * Strategy content — marketing-tone prescriptive playbooks for prospects.
 *
 * Sits next to Pricing and Solutions in the funnel: "here's how SmilePass
 * actually grows your practice if you focus on X". Each strategy maps to
 * real product features (Membership Builder, Payment Plan Builder, Dependent
 * Program, Payment Hold etc.) so the pitch is concrete, not handwavy.
 *
 * Same data-driven pattern as the wiki — the index page and per-slug page
 * both read from here, and the header dropdown auto-builds from this list.
 *
 * Categories (8): two foundational (Memberships, Payment plans) plus six
 * by specialty (Ortho, Perio, Cosmetic, All-on-X, Kids, Emergency).
 */

export interface StrategyCategory {
  id: string;
  title: string;
  /** Shown beneath the category title on the index page. */
  description: string;
  order: number;
}

export interface Strategy {
  slug: string;
  title: string;
  /** One-line hook. Used in the header dropdown, index card, and SEO meta. */
  lead: string;
  categoryId: StrategyCategory["id"];
  order: number;
  /** Marketing body in Markdown. Rendered with react-markdown. */
  body: string;
}

/**
 * One setup step in the "How to launch this in SmilePass" section.
 *
 * Kept short (1-3 sentences) and concrete — every step should reference an
 * actual SmilePass nav path or toggle so the reader can act immediately.
 */
export interface SetupStep {
  num: string; // "01", "02", ...
  title: string;
  body: string;
}

/* ─────────────────────────────────────────────────────────── */

export const STRATEGY_CATEGORIES: StrategyCategory[] = [
  {
    id: "foundations",
    title: "Foundations",
    description: "The non-negotiables. Get these right before running any of the plays below — none of them work without the team behind them.",
    order: 0,
  },
  {
    id: "memberships",
    title: "Memberships",
    description: "Build predictable recurring revenue and lock in patient relationships.",
    order: 1,
  },
  {
    id: "payment-plans",
    title: "Payment plans",
    description: "Remove the price barrier on the treatments your patients keep saying no to.",
    order: 2,
  },
  {
    id: "ortho",
    title: "Ortho",
    description: "Make a 24-month treatment look like an affordable monthly decision — and keep the patient for life after de-bond.",
    order: 3,
  },
  {
    id: "perio",
    title: "Perio",
    description: "Turn quarterly maintenance from a chore into a relationship, and cover the gap insurance won't.",
    order: 4,
  },
  {
    id: "cosmetic",
    title: "Cosmetic",
    description: "Finance the smile makeover, then keep the relationship long after the photos are taken.",
    order: 5,
  },
  {
    id: "all-on-x",
    title: "All-on-X",
    description: "Close the $35k case, then turn that one-off patient into a 10-year maintenance relationship.",
    order: 6,
  },
  {
    id: "kids",
    title: "Kids",
    description: "Acquire whole families through the kids, then lock in a multi-generation relationship.",
    order: 7,
  },
  {
    id: "emergency",
    title: "Emergency",
    description: "Capture the patient who'll never join a full plan but wants a relationship of record when something breaks.",
    order: 8,
  },
];

/* ─────────────────────────────────────────────────────────── */

export const STRATEGIES: Strategy[] = [
  /* ─── Foundations ─── */
  {
    slug: "know-the-platform",
    title: "Learn the platform first",
    lead: "Spend an hour walking through SmilePass before you launch anything. Knowing where every setting lives makes every later play 10× faster.",
    categoryId: "foundations",
    order: 1,
    body: `
The single biggest predictor of a smooth membership launch is whether the practice owner has actually used the platform before the launch day. Practices that skip this step end up making config changes mid-launch, training a confused team, and chasing problems they could have anticipated.

This is the smallest investment in the whole playbook: about an hour, before you open the doors. Skipping it costs you weeks downstream.

## Why this is the very first step

Every other strategy in this playbook assumes you can find Membership Builder, configure a payment plan, toggle the Referral Program, and read the dashboard without hunting. If those motions aren't reflexive, the launch wobbles. You'll mistime a config change, miss a setting, or build a plan whose name and pricing don't match what reception is quoting to patients at the chair.

The good news: SmilePass is genuinely simple to learn end-to-end. The whole platform takes under an hour to walk through once. Doing it before launch (not after) is what separates the practices that compound from the ones that re-launch six months later.

## What "knowing the platform" means

You should be able to do all of these in under a minute each, without notes:

- Open Membership Builder and create a new plan
- Open Payment Plan Builder and create a template
- Toggle Dependent Program on/off in Custom Discounts & Code
- Create a Promo Code
- Find a specific member in the member list
- Issue a Payment Request via Quick Actions
- Open the home dashboard and read MRR, member count, new signups
- Find the Reports area and run a tier-mix breakdown

If any of those make you pause, you haven't done the walkthrough yet. Spend the hour now.

## How to learn it: read the wiki

We wrote the SmilePass [wiki](/wiki) as a guided tour, organised into four short tracks that mirror the order you'll actually use the platform:

1. **[Getting started](/wiki/onboarding-wizard)** — the onboarding wizard, the home dashboard, the Quick Actions toolbar, practice locations. About 15 minutes.
2. **[Building plans](/wiki/membership-plans)** — Membership Builder, plan templates, add-ons, payment plan builder, custom discounts. About 20 minutes.
3. **[Daily operations](/wiki/registering-patients)** — registering patients, importing patient lists, adding members, taking payments, reading reports. About 15 minutes.
4. **[Account & integrations](/wiki/account-and-team)** — team accounts, marketing shop, integrations, billing. About 10 minutes.

Total: roughly an hour. Read straight through, in order, ideally with the live SmilePass tab open next to it so you can click as you read.

## When this strategy fits

- Every practice, before launching memberships or payment plans for the first time
- Practices about to bring on a new staff member who'll be using SmilePass daily
- Practice owners who delegated the original setup and haven't logged in themselves in 6+ months

## When it doesn't

- There is no "when it doesn't". If you're going to run a SmilePass program, you (or whoever owns the program) needs to know the platform inside-out before anything else happens.
    `.trim(),
  },
  {
    slug: "team-training",
    title: "Train your team second",
    lead: "Now that you know the platform, get your team to the same level. Memberships and payment plans don't fail because the software breaks — they fail because reception forgets to mention them.",
    categoryId: "foundations",
    order: 2,
    body: `
Once you know the platform yourself, the next foundation is making sure the rest of the team is on the same page. The single biggest predictor of whether a practice's membership program succeeds is not the pricing, not the inclusions, not even the marketing. It's whether the front desk and the hygienists actually mention it to patients. Every practice that has launched memberships and then watched them stall has the same root cause: the team wasn't on board, didn't know the script, and quietly let the program die from neglect.

This is foundation step two, and it comes right after [learning the platform yourself](/strategy/know-the-platform). If you only have time to do two things this month, do these.

## Why team training is the foundation

A patient walks out of your practice having had a clean and a check-up. The receptionist processes the payment, says "see you in six months", and the patient leaves. The membership plan never gets mentioned. Multiply that by every appointment, every day, for a year, and you have a membership program that never gets off the ground despite being available the entire time.

This is the default outcome unless the team is actively trained and held accountable. The platform makes membership effortless to *operate*. But platforms don't talk to patients. Your team does.

## What "trained" actually means

Trained doesn't mean "the team knows the membership exists". It means:

- **Reception knows the script for the post-appointment conversation** and uses it on every patient over a certain treatment threshold
- **Hygienists know the chairside moment** to mention specific add-ons (Whitening Boost during polish, Night Guard during occlusion check)
- **Everyone can answer the top five patient questions** without flinching ("What if I move?", "Can I cancel?", "Is this insurance?")
- **The practice manager checks the membership dashboard every morning** and flags slow weeks before they become slow months
- **The dentist owns the high-value pitch** for ortho, implant cases and full-mouth rehabs, and books the second consult themselves

If any of those are missing, the program leaks revenue silently.

## The three conversations that matter most

**1. The post-hygiene checkout.** Reception or hygienist says: "Next time, your visit is already paid for. Want me to set that up?" Most practices that nail this one conversation see hygiene-attached membership conversion at 25 to 35% within six months.

**2. The treatment-plan presentation.** When the dentist hands over a $2,000+ treatment plan, the team has the payment-plan offer ready. The line that works: "You don't need to find that today. About $X a month covers it." This single conversation lifts case acceptance by 30 to 60%.

**3. The post-emergency follow-up.** A week after an emergency visit, the team reaches out: "Glad we got that sorted. Just so you know, we have an Emergency Safety-Net plan that would have covered tonight's call-out." Recovery rate is unusually high because the patient just experienced the pain point.

If your team can do those three conversations confidently, your membership and payment-plan programs work. If they can't, no amount of platform configuration will save you.

## Common failure modes

- **"Reception forgot."** Translation: nobody ever made it part of the routine, and nobody is reviewing whether it's happening.
- **"The hygienist assumes the dentist will mention it."** Nobody owns the conversation, so it doesn't happen.
- **"The dentist thinks it's a reception job."** Wrong. High-value plans (ortho, implants) need the dentist's authority behind the pitch.
- **"We tried it for a month and nothing happened."** Memberships are a 6 to 12-month compound. Quitting after a month is the modal failure.
- **"We trained them once at launch."** Hygienists turn over. Receptionists go on leave. Without a quarterly refresh and a new-hire onboarding script, the program decays.

## The training curriculum that works

Most practices that get this right run training in four blocks, spread over the first two weeks of program launch (and refreshed quarterly):

1. **Week 1, Day 1: the why.** A 30-minute team meeting explaining what changes for patients, what changes for the practice's revenue, and what the team's role is.
2. **Week 1, Day 3: the platform tour.** Walk the whole team through SmilePass together. They see where members are listed, how an enrolment happens, and where the dashboard lives.
3. **Week 1, Day 5: role-play.** Each team member practises the three core conversations on each other. Stop when it feels natural, not when it feels memorised.
4. **Week 2 onwards: the daily standup.** Every morning, the practice manager opens the dashboard, calls out yesterday's signups by name, and asks "what's blocking us today?". This is the single most important habit. Without it, the program drifts.

## What to measure

Track these three numbers weekly during the first 90 days:

- **New signups per week.** Target: 5 to 15 in the first month, ramping to 20+ by month three.
- **Hygiene-to-membership conversion rate.** Target: 25 to 35% of hygiene patients on the plan within six months.
- **Active plans vs cancelled plans this week.** Target: 5:1 or better. If cancellations climb, the conversation at sign-up was over-promising.

If any of these slip, it's almost always a training issue, not a platform issue. The fix is another role-play session, not a new feature.

## When this strategy fits

- Every practice launching memberships or in-house payment plans for the first time
- Established programs that have plateaued (training has decayed)
- Practices that have just hired new reception staff or a new hygienist
- Practices where the dentist wants to delegate the conversation but reception keeps forgetting

## When it doesn't

- There is no "when it doesn't". Every practice running memberships or payment plans needs this strategy in place first.
    `.trim(),
  },

  /* ─── Memberships ─── */
  {
    slug: "family-first-growth",
    title: "Family-first growth",
    lead: "Turn one patient into a household of subscribers.",
    categoryId: "memberships",
    order: 1,
    body: `
Most dental marketing chases individuals. The practices that compound do the opposite — they sign up **households**. One adult who joins your membership often brings their partner, their kids, and eventually their parents. The unit economics are different. The relationships are stickier. And SmilePass is built to reward exactly this behaviour.

## Why it works

A single patient at $20/month is a $240/year relationship. A family of four on the same plan, with the Dependent Program enabled, is closer to $900/year — for the same marketing spend. Add the fact that families who all see the same dentist tend to stay together for years, and the lifetime value math gets very honest very fast.

The wedge is the **Dependent Program** discount. When you turn it on, the discount accumulates for the account holder — so a parent with three dependents already gets a 30% break on their own membership. That's not a marketing trick; it's how dental works in real homes. Reward it, and parents tell other parents.

## How SmilePass enables it

- **Dependent Program** (Settings → Custom Discounts & Code → Manage Discounts) — toggle on, set 10%. Every dependent automatically lowers the account-holder's price.
- **Family-friendly plan in Membership Builder** — set a single membership with **No age limits**, included services that cover both adult and child preventive care, and pricing that obviously rewards adding people.
- **Dependents step in the Add New Member wizard** — built specifically for this flow. The pricing card on the right updates live as you add dependents so the patient sees the discount immediately.

## What to expect

Practices that lean into family memberships typically see two compound effects within six months: average revenue per acquired family climbs 3–4× vs single-patient acquisition, and member retention stays high because cancelling a family plan is socially harder than cancelling an individual one.

The strategy works best when paired with the **referral program** (members earn discounts when friends sign up — also configured under Manage Discounts). A happy family of four is your best marketing channel.

## When this strategy fits

- Family or suburban practices with mixed adult + child caseloads
- Practices in growing residential areas
- Practices that want to reduce dependence on Google Ads / paid acquisition

## When it doesn't

- Specialist clinics (ortho-only, perio-only) where the household angle is irrelevant
- Practices targeting high-end cosmetic, where the buying decision is individual rather than family
    `.trim(),
  },
  {
    slug: "recurring-revenue-foundation",
    title: "Recurring-revenue foundation",
    lead: "Replace lumpy month-to-month with a base of subscribers you can forecast.",
    categoryId: "memberships",
    order: 2,
    body: `
Most dental practices ride a revenue rollercoaster — March is great, July is dire, December is anyone's guess. Memberships change the shape of the year. They give you a base of **predictable monthly cashflow** that doesn't depend on new bookings, weather, or the school holidays.

This isn't about chasing maximum revenue. It's about reducing the *variance* — making your cashflow boring enough that you can hire confidently, invest in equipment, and stop refreshing the appointment book at 4pm on a Thursday.

## Why it works

A practice with 200 members on a $30/month plan has **$6,000 of guaranteed recurring revenue every single month** before a single new patient walks through the door. Once you cross that threshold, the day-to-day decisions get easier: you can take a tough Monday in stride because the base is intact.

Hygiene-led memberships also pull members back for their preventive visits naturally, which protects your column-fill rate. Members who come for their twice-yearly clean see five times the treatment uptake of patients who don't.

## How SmilePass enables it

- **One mid-priced plan in Membership Builder** — don't overthink it. Start with a single plan covering 2× cleans and 1× check-up per year at a price that's "obvious value" for your market.
- **Membership Auto-Renewals** (included on the Free tier) — patients don't have to do anything to stay subscribed. Churn drops.
- **Dashboard KPI cards** — Members, Retention %, and Total Revenue all update live. You can see in 10 seconds whether you're trending toward your goal.
- **The Club Advantage Level** — the gamified milestones (Emerging 25 → Master 1000) give your front-desk team a target to rally around. Sounds soft; works.

## What to expect

A reasonable 12-month trajectory for a practice committing to this strategy:

- **Month 1–2:** Build the plan, train the team, soft-launch to existing patients
- **Month 3–4:** 25–50 members signed up via in-chair conversations and email
- **Month 5–6:** First Club Advantage level (Emerging, 25 members)
- **Month 9–12:** 100+ members, Retention % stabilising above 90%, predictable monthly revenue baseline established

Once you cross 100 active members, the membership program effectively pays for the SmilePass subscription many times over via the transaction-fee math alone (see [pricing](/pricing)).

## When this strategy fits

- Established practices with a steady patient list looking to smooth cashflow
- Practices that want to reduce reliance on insurance fee schedules
- New owners taking over an existing patient base who need predictability fast

## When it doesn't

- Brand-new practices with under ~200 active patients (build the patient base first)
- Practices where most income comes from one-off cosmetic work
    `.trim(),
  },
  {
    slug: "good-better-best-ladder",
    title: "Good / Better / Best ladder",
    lead: "Three plans, anchored by price — and the one in the middle is the one most people pick.",
    categoryId: "memberships",
    order: 3,
    body: `
Pick any successful subscription business and you'll see the same architecture: three plans, three prices, a clear hierarchy. The cheap one anchors the bottom, the expensive one anchors the top, and the middle one is where most customers land. Dental memberships are no different — and SmilePass ships with the three templates already built.

## Why it works

Patients faced with one plan compare it to "no plan" and often decline. Patients faced with **three** plans compare them to each other and almost always pick. The cheapest plan reframes the decision from *"is this worth it?"* to *"which tier is right for me?"* — a much easier yes.

The middle tier — your Comprehensive — is where this strategy makes its money. Pricing research consistently shows 50-65% of customers in a Good/Better/Best layout pick the middle option, even when their actual usage would map better to one of the extremes. The expensive Premium plan exists primarily to *make Comprehensive look reasonable*.

## How SmilePass enables it

- **Three preset templates in Membership Builder** — Essential, Comprehensive, Premium. Click each, press **Use Template**, and you've got a real Good/Better/Best lineup in under a minute.
- **Edit the Comprehensive tier carefully** — this is the one most patients will choose. The included services, the discount %, and the price all need to feel like the sweet spot. The Essential and Premium plans can be more about anchoring.
- **The plan cards in the Builder list show member count per tier** — track the ratio. If too many people pick Essential, your Comprehensive isn't differentiated enough. If too few pick Premium, your Comprehensive looks too good.

## What to expect

- **~15% of members** on Essential (price-anchored entry)
- **~60% of members** on Comprehensive (the sweet spot)
- **~25% of members** on Premium (anchored against the others; high-LTV patients self-select up)

That ratio shifts a lot by practice demographics, but if you see it inverted (everyone on Essential, nobody on Premium), your tiering is broken — either the middle plan is overpriced or the Premium isn't enticing enough.

## Pricing benchmark (Australian general dentistry)

The industry settled into a recognisable shape: Essential around $20-25/month, Comprehensive around $30-45/month, Premium around $55-75/month. Adjust to your market — coastal-suburb practices in higher-income areas often push 30-50% higher than the benchmark, regional practices often sit below.

## When this strategy fits

- Practices that want to launch memberships and don't know where to start
- Practices with an existing single plan that's stalled (the middle plan exists with no anchors)
- Owners who want a memorable membership story to tell at chair-side
    `.trim(),
  },
  {
    slug: "hygiene-only-starter",
    title: "Hygiene-only starter plan",
    lead: "A bare-bones $15-25/month plan that does one job — get them through the door.",
    categoryId: "memberships",
    order: 4,
    body: `
The hardest part of any membership program isn't running it — it's getting the first signup. A patient who's never been a member sees full-feature plans as *commitment*, weighs the cost against the value, and walks away thinking. Lower the bar. Give them a plan so cheap and so simple that the joining decision becomes trivial. Then upsell once they're in.

## Why it works

This is the dental equivalent of a streaming-service freemium tier. The Hygiene Starter isn't designed to be your most profitable plan — it's designed to **acquire patients into the membership relationship**, where the math then works in your favour.

Once a patient is a member:
- They show up for their cleans (they paid for them — sunk cost effect kicks in)
- They convert to treatment 50-75% more often than non-members
- They become reachable for upsells to higher tiers via in-chair conversations
- They refer friends (especially if the referral program is on)

The plan's job is just to remove friction at signup.

## How SmilePass enables it

- **Membership Builder, bare-bones config:** 2× Dental Cleans included, 1× check-up, **no discounts on additional services**. The deliberate absence is the point — no overstuffed promise, just clean preventive coverage.
- **Frequency: Fortnightly or Monthly** — keep the per-bill amount under $25 so it lives below the patient's mental "should I cancel this?" threshold.
- **Lock-in period: 12 months** (the default) — sounds restrictive, isn't. Most patients never think about it.
- **Sell at chair-side** — reception or the dentist mentions it at the end of a check-up: *"We have a plan that covers your cleans, $20/month. Shall I sign you up before you leave?"* No formal pitch. No printed brochure.

## What to expect

Practices that introduce a hygiene-only starter alongside their other tiers typically see:

- **Membership signups climb 2-3×** because the entry friction is lower
- **Conversion from Starter to Comprehensive** within 12 months runs 30-40% (patients realise they want more than just cleans)
- **Treatment acceptance from members vs non-members** matches the industry benchmark (50-75% higher)

The strategy especially shines when paired with the Good/Better/Best ladder — Starter becomes the visible entry, Comprehensive becomes the obvious upgrade.

## When this strategy fits

- Urban / high-traffic practices struggling to convert new-patient enquiries
- Practices that already have Comprehensive and Premium plans but few takers
- Practices wanting to test memberships without committing to a full lineup

## When it doesn't

- Practices in low-volume, high-touch demographics where the patient already wants the full relationship
- Boutique cosmetic clinics where "$20/month for cleans" sends the wrong signal
    `.trim(),
  },
  {
    slug: "demographic-segmented-tiers",
    title: "Demographic-segmented tiers",
    lead: "Separate plans for Adults, Kids, and Seniors — each tuned to what that group actually uses.",
    categoryId: "memberships",
    order: 5,
    body: `
A single "everyone" plan is a compromise. Kids don't need restorative discounts. Seniors don't need fluoride sealants. Adults sit in between. When you build three plans calibrated to three demographics, each one feels like it was made *for* that patient — because it was.

## Why it works

The dental needs of a 7-year-old, a 35-year-old, and a 70-year-old don't overlap much. The 7-year-old wants fluoride and sealants. The 35-year-old wants preventive plus aesthetic. The 70-year-old wants periodontal maintenance and denture care. Pricing all three on the same plan means either the kid is overpaying or the senior is undercovered. Segmenting fixes both.

It also gives you three distinct marketing stories instead of one. "Family dental for kids from $25/month" lands differently to "Senior preventive plan, $55/month." The patient self-selects into the conversation that's relevant to them.

## How SmilePass enables it

- **Age from / Age To controls** in Membership Builder (Terms tab) — set Kids 0–17, Adults 18–64, Seniors 65+. The platform enforces the boundaries at signup.
- **Per-plan service categories** — kids plan emphasises Preventive + Diagnostic categories with sealant/fluoride coverage; senior plan weights Periodontics, Prosthodontics, General Services.
- **Different price points** — industry benchmarks: kids $25-35/mo, adults $30-45/mo, seniors $55-75/mo. The senior tier is the highest-margin (more services per visit).
- **Pairs naturally with the Dependent Program** — a parent on the Adult plan can add their Kids-tier dependents at the dependent-discount rate.

## What to expect

This strategy works in catchment areas with mixed demographics — multi-generational suburbs, near retirement villages, family-heavy school zones. The signup mix typically lands around:

- **20-30% Kids tier** — strong if you have a family clientele
- **45-55% Adults tier** — the workhorse
- **20-25% Seniors tier** — highest revenue-per-member, lower volume

You also see better retention than a one-plan-fits-all model, because each plan is genuinely relevant.

## Setup tip

Don't launch all three at once if you've never run memberships. Start with Adults (the largest segment), prove the model with 50-100 members, then add Kids and Seniors as separate launches with their own campaigns ("New: Kids' Membership, $25/month").

## When this strategy fits

- Multi-generational suburban practices
- Practices near retirement villages, primary schools, or family-dense catchments
- Practices that already segment patients clinically and want to mirror that in pricing

## When it doesn't

- Single-demographic clinics (boutique cosmetic, exclusively adult perio, paediatric-only)
- Practices with under 200 active patients (segmenting too early dilutes signups across plans)
    `.trim(),
  },
  {
    slug: "fortnightly-billing",
    title: "Fortnightly billing for invisible churn",
    lead: "The smallest bill the system supports, dropped on payday — so nobody notices it leaving.",
    categoryId: "memberships",
    order: 6,
    body: `
Membership churn doesn't usually happen because the patient hates the plan. It happens because they *noticed* the plan — a bill landed, they looked at it, they thought "do I really use this?", and they cancelled. The strategy is therefore the inverse of obvious: make the bill **invisible**.

Fortnightly billing, especially when it lands on the same day as the Australian fortnightly pay-cycle, does exactly that. $10 a fortnight reads differently from $22 a month, even though the math is similar. The patient's bank statement shows a small line item next to all the other small line items — there's nothing to question.

## Why it works

Three psychological dynamics stack up:

1. **Smaller numbers feel smaller.** $10 vs $22 is the same maths but a different emotional response. Patients evaluating cancellation see *what's leaving today*, not *what leaves in a year*.
2. **Payday alignment.** A debit landing the same day pay arrives never feels like a cost — it feels like a normal expenditure pattern. A debit landing mid-fortnight feels like an imposition.
3. **Lower per-bill scrutiny.** Patients reconcile their accounts mostly when a "big" bill lands. Fortnightly debits below $20 typically clear the noise filter.

## Why annual prepay does the opposite

A 25% annual discount looks great on paper, but in practice the patient hits month 11, looks at the $360 annual debit coming up, and runs the maths: *"I used the cleans, but did I really save $360 worth?"* The conscious re-evaluation kills retention. **Don't offer annual prepay for memberships.** (Payment plans are different — a deferred annual payment makes sense when it's tied to specific treatment.)

## How SmilePass enables it

- **Fortnightly toggle** in Membership Builder → Profile tab → Price and Frequency. Turn it on alongside (or instead of) Monthly.
- **Membership Auto-Renewals** (Free tier+) — patients don't decide anything fortnight-to-fortnight; the platform just keeps the relationship live.
- **Position fortnightly as the default at signup** — train reception to present prices as fortnightly first ("It's $10 a fortnight"), monthly only if the patient asks.

## What to expect

Practices that switch their headline pricing from monthly to fortnightly typically see:

- **Membership signups climb 10-20%** at the same headline plan because the per-bill number is friendlier
- **Annual churn drops 15-25%** vs monthly billing because the patient never gets a "decide whether to renew" moment
- **Front-desk objections drop** because reception is now quoting $10-ish numbers instead of $20-ish ones

## When this strategy fits

- Wage-employed patient demographics (alignment with payroll cycles is the whole game)
- Younger or budget-conscious patient bases
- Practices where memberships have stalled but the value is real

## When it doesn't

- Patient bases with significant self-employed / business-owner concentration (monthly billing aligns better with how they think about cashflow)
    `.trim(),
  },
  {
    slug: "founder-launch-pricing",
    title: "Founder launch pricing",
    lead: "Lock in your $20/month rate for life — first 50 members only.",
    categoryId: "memberships",
    order: 7,
    body: `
A new membership program launched into silence is a membership program that dies. The hardest customers to acquire are the first ones — there's no social proof, no "everyone's joining," no urgency. Founder pricing manufactures all three in 30 days, then you go back to normal pricing once you have a base.

## Why it works

The strategy combines two pricing dynamics: **scarcity** ("first 50 members only") and **loss aversion** ("lock in this price for life — it goes up after launch"). Together they convert visitors who'd otherwise have waited.

Once the 50 founder members are in, the rest of the funnel improves on its own. Reception can say *"we already have 50 members in our first month."* New patients see Google reviews mentioning the membership. The Comprehensive plan stops feeling experimental.

The "for life" lock-in is the part most practices fear — *"but won't we lose money on those founders forever?"* — and it's the part that actually works. Founder members are typically your most loyal advocates. The lifetime discount is real but the LTV is also real, and the social proof they create pays for itself many times over in the first year.

## How SmilePass enables it

- **Promo Code** under Settings → Custom Discounts & Code → Promo Code List. Create a code like **FOUNDER50** that grants a permanent discount on the plan.
- **Time-bound the campaign** — set a clear end date (30 days from launch, or "first 50 members" — whichever comes first). Don't let it run forever.
- **Custom Discounts & Code dashboard** — track how many redemptions you've had vs your cap. Close the campaign cleanly when you hit it.
- **Pair with public-facing comms** — email blast to your existing patient list, social-media countdown, signage at reception. The "founder" framing only works if patients know it's happening.

## What to expect

A reasonable 30-day launch with founder pricing on a single Comprehensive plan:

- **Week 1:** 5–10 founder members from your warmest patients
- **Week 2:** 15-25 total, momentum building via word-of-mouth
- **Week 3-4:** 40-50 total as social-proof effects compound
- **Day 30:** Campaign closes, you transition to standard pricing for new joiners

After day 30, your launch story becomes "we just signed up 50 founder members — here's the standard plan from this week onwards." New patients now have the social proof they needed.

## When this strategy fits

- New practice launches
- New plan launches at existing practices
- Practices ready to make membership a centrepiece of their identity (not just a side offering)

## When it doesn't

- Practices that already run memberships and just want incremental signups (use a time-bound promo without the "lifetime" lock)
- Patient bases that distrust "limited time" framing (high-net-worth cosmetic clientele often read scarcity as gimmicky)
    `.trim(),
  },
  {
    slug: "referral-engine",
    title: "Referral engine",
    lead: "Your members are your sales team — pay them in discounts, not commissions.",
    categoryId: "memberships",
    order: 8,
    body: `
Paid advertising for dental practices is expensive and getting worse. Referrals from existing patients convert 4-5× better, have higher lifetime value, and cost nothing per acquisition. SmilePass's Referral Program turns that natural word-of-mouth into something measurable and rewardable — without the practice having to negotiate individual deals.

## Why it works

A referred patient is qualified before they arrive. They've already heard who you are, why someone they trust likes you, and what to expect. The conversion conversation is shorter, the price objection is softer, and they stay longer.

Practices that turn on the Referral Program without doing anything else still see referral volume climb 30-50% within the first six months. Members notice the discount on their next bill and become consciously aware that *referring is a thing*. That single shift in awareness moves the needle.

## How SmilePass enables it

- **Referral Program** under Settings → Custom Discounts & Code → Manage Discounts. Toggle on, set a percentage (start with 10%).
- **The math built in** — existing members earn the discount per active referral for **12 months**, capped at 100% off. The referred friend keeps the discount as long as they remain a member. Both sides benefit. The 12-month cap protects the practice from infinite-stacking.
- **Tracked automatically** — every signup carries the referrer attribution; no manual reconciliation. The Reporting page (under apps → member → member-referral) shows you who's referring, when, and the conversion status.
- **Pairs with promo codes** for time-bound campaigns ("Refer 2 friends in January, get an extra free month") that boost volume during slow months.

## What to expect

A practice with 100 active members turning on the Referral Program typically sees:

- **Month 1-3:** Members become aware of the program; first 5-10 referrals trickle in
- **Month 4-6:** Conversion rate per referral hits 60-75% (vs ~15-20% for paid advertising)
- **Month 7-12:** Referral becomes a meaningful share of new signups — often 30-40% of monthly growth

> **Worked example.** A member with 2 active referrals pays 20% less on their $40/month plan (saves $96/year). Each referred friend gets 10% off, costing the practice $48/year per friend. The practice's total discount cost is ~$190/year. The two new members contribute ~$870/year in revenue. The net is unambiguously positive.

## How to launch it well

The referral program needs **awareness** to do its work. Two practical tactics:

1. **Reception script after every check-up:** *"By the way, we have a refer-a-friend program — if you refer two people in the next month, you both get $4 off your monthly plan."*
2. **One email blast at launch + one quarterly reminder** explaining the mechanics. The discount is invisible to members who don't know it exists.

## When this strategy fits

- Practices with 25+ active members (you need a base to refer from)
- Family or suburban practices with strong organic word-of-mouth
- Practices wanting to reduce paid acquisition spend

## When it doesn't

- Brand-new practices with no member base yet (build first, then activate)
- Boutique single-practitioner clinics where the dentist personally meets every prospect (referrals already happen, formalising it adds little)
    `.trim(),
  },
  {
    slug: "corporate-workplace-memberships",
    title: "Corporate / workplace memberships",
    lead: "Sell memberships in bulk to local employers — every employee gets one.",
    categoryId: "memberships",
    order: 9,
    body: `
Most dental memberships are sold one-by-one, in-chair, after a check-up. The slower path. The faster path is selling 30 memberships in a single conversation — with an HR manager at a local employer who wants to offer dental as a workplace benefit. Same revenue, fraction of the acquisition cost, predictable cohort.

## Why it works

Employers are increasingly looking for benefits that meaningfully improve employee wellbeing without insurance overhead. Dental memberships fit perfectly: defined cost per employee, no claim paperwork, real preventive value. For the employer, it's a recruitment / retention tool. For you, it's a cohort of 20-100 patients in one conversation.

The economics are also strong from your side. A corporate cohort tends to use the membership consistently (people don't ghost a benefit their employer is paying for), refers spouses and kids onto family plans, and creates a beachhead in a workplace that compounds.

## How SmilePass enables it

- **Import Patients** (Settings → Import Patients) — CSV bulk-load the entire employee roster in one go. Each row becomes a patient record; SmilePass automatically sends each one a membership invitation.
- **Promo Code** for the corporate signup — gives the cohort a discounted rate that's not available to walk-ins. Lets the employer say "your $30/month plan is $20 through our program."
- **Multi-Location support** — for distributed employer sites, each employee picks the clinic closest to them at signup.
- **Logins & Permissions** — give the employer's HR team read-only access to a roster view (Pro tier).
- **Billing & Payout reporting** — clean monthly statements for the employer's accounts payable team.

## What to expect

A practice that lands one solid corporate deal of 40 employees in month one:

- **Month 1:** Signup conversations + CSV import; ~30-35 of the 40 employees activate within 30 days
- **Month 2-3:** Family members (spouses, kids) start joining at full price via the natural household dynamic
- **Month 6:** The 30 corporate members + 15-20 family members = 45-50 active subscribers from one B2B conversation
- **Year 2:** The employer renews (now seen as a real workplace benefit); attrition replaced by new hires

A second corporate deal compounds — the practice now has a B2B sales motion that scales.

## How to actually sell to employers

This is the harder part — practices used to chair-side sales need a different muscle. The realistic playbook:

1. **Identify 5-10 employers in your catchment** with 30-200 employees and no existing dental benefit
2. **Pitch the HR / People & Culture lead** — short cold email, then a 20-minute meeting
3. **Lead with the employer's problem** ("Your team mentions cost as a barrier to seeing the dentist") not your offering
4. **Offer a launch incentive** — first month free for all employees, or an onsite "lunch & learn" the practice runs at no cost
5. **Make signup frictionless** — CSV import + auto-invitations means HR uploads one file and the practice handles the rest

## When this strategy fits

- Practices near office parks, factories, professional centres, hospitals
- Practices with a partner or associate willing to do B2B sales calls
- Practices that have proven the membership model on individual patients and want to scale

## When it doesn't

- Single-dentist practices with no spare bandwidth for sales motion
- Practices in residential-only catchments with no employer concentration
    `.trim(),
  },
  {
    slug: "add-on-revenue-layer",
    title: "Add-on revenue layer",
    lead: "Memberships set the baseline; add-ons grow ARPU without raising plan prices.",
    categoryId: "memberships",
    order: 10,
    body: `
Once you have 50+ active members, the next growth lever isn't more members — it's more revenue per member. The lazy way to do that is to raise plan prices (which causes churn). The smart way is to introduce **add-ons**: small recurring extras members can attach to their plan without changing it. The patient gets choice. You get revenue without risk.

## Why it works

Add-ons turn a single plan into a personalisable product. Some members want a take-home whitening top-up. Some want a premium oral-care kit. Some want an emergency-cover layer. Each opt-in is a 10-30% boost to that member's monthly spend — and because the member chose it, churn on add-ons is near zero.

Practices that introduce 3-5 add-ons typically see 25-40% of their existing member base attach at least one within six months, lifting average revenue per member by 15-20% without a single price increase.

## How SmilePass enables it

- **Addons Builder** (Settings → Addons Builder) — same three-tab shape as the Membership Builder but simpler. Name, Locations, Description, Price + Frequency.
- **Profile / Benefits / Terms tabs** — define what the add-on includes, who can buy it, and any specific T&Cs.
- **Multiple frequency options** — most add-ons land on Monthly; one or two might be Annually for big-ticket extras like a custom mouthguard.
- **Surfaced in the Add New Member wizard** — under "Addons Fee" in the live pricing card on Step 1. The patient sees them at signup; staff can also add them mid-membership.

## What add-ons to actually build

Start small. A typical catalogue:

1. **Take-home whitening top-up** — $15-20/month. Recurring whitening trays and gel shipped quarterly. Appeals to aesthetic-conscious members.
2. **Premium oral-care kit** — $10/month. Quarterly toothbrush + toothpaste + floss + interdental brushes shipped to the patient. Sells on convenience.
3. **Emergency-cover add-on** — $20-25/month. Adds 2 emergency visits/year + after-hours triage on top of the base plan. Sells on peace of mind.
4. **Custom mouthguard renewal** — $25/year (Annually). Re-fits a sports mouthguard once a year. Sells to athletic members.

Don't launch 10 at once. Pick 3 that map to obvious patient segments, run them for 6 months, then add more.

## What to expect

A practice with 200 active members launching 3 add-ons:

- **Month 1-2:** 10-15% of members attach an add-on during in-chair conversations
- **Month 3-6:** 25-40% attach rate as awareness spreads via reception scripts and email
- **Average ARPU lift:** $4-8/month per member who attaches → ~$1,000/month extra revenue across the base

The strategy compounds beautifully with the Good/Better/Best ladder: members on the Premium plan attach more add-ons; members on Essential attach the cheaper ones.

## When this strategy fits

- Practices with 50+ active members and stable plans
- Practices where the front desk has bandwidth to introduce add-ons in-chair
- Patient bases that already buy retail products (whitening, kits) — packaging them as recurring is an easy upgrade

## When it doesn't

- Practices still trying to acquire their first 50 members (add-ons distract from the core)
- Markets where patients are extremely price-sensitive (multiple add-ons feel like upsell pressure)
    `.trim(),
  },

  /* ─── Payment plans ─── */
  {
    slug: "treatment-day-deposits",
    title: "Treatment-day deposits",
    lead: "Use payment holds to filter out no-shows before they happen.",
    categoryId: "payment-plans",
    order: 1,
    body: `
No-shows quietly cost dental practices more than any other operational issue. A 10% no-show rate on a single dentist's day costs roughly 4-6 hours of billable time per week — gone, with no recovery. Most of those gaps were avoidable. The patient knew they weren't coming; they just didn't tell you.

The fix isn't more reminders. It's **a small financial commitment at booking**. Hold a $50 deposit on the patient's card when they book. If they show up, you release it. If they don't, you keep it. The cost-of-entry filter is the whole point — the patients who say no to the hold are exactly the patients who would have no-showed.

## Why it works

People treat money differently from time. A patient may reschedule a free booking three times without thinking; a patient with a $50 deposit booked the right slot the first time, set a calendar reminder, and showed up.

You're not trying to make money from the hold. You're trying to **make the booking real**. Once the booking is real, the no-show rate drops and your column-fill stabilises.

## How SmilePass enables it

- **Payment Hold tab** in Create Payment — reserves an authorised amount on the patient's card without capturing it. (Available on Growth / Pro / Enterprise tiers — see [pricing](/pricing).)
- **Instant Payment links** — if you'd rather collect the deposit (not just authorise) for a high-ticket appointment, send a link by SMS. Patient pays from their phone, no card details over the phone, no PCI concerns.
- **Payment list with Status column** — Pending / Active / Failed tells the front desk at a glance which holds have cleared.
- **The patient pays themselves** — you never touch their card. Cleaner for compliance, faster at the desk.

## What to expect

Practices that introduce a treatment-day deposit on appointments above a certain threshold (typically anything over $300) typically report:

- **No-show rate drops 40–60%** within the first month
- **First-visit cancellations** (the most expensive kind) drop to near zero
- **Patient pushback is rare** — when framed correctly, the $50 hold reads as "we're holding your spot", not "we don't trust you"
- **Recovered chair time** more than covers the SmilePass subscription itself

## Implementation in one paragraph

Pick a threshold (often $300 or $500 treatment-cost minimum). Train reception to mention the deposit during booking: *"To hold your appointment, we'll authorise $50 on your card now and release it when you arrive — no charge if you make it."* Use the Payment Hold tab in Create Payment to send the link. Track holds in the Payment Plan list.

## When this strategy fits

- Practices with no-show rates above 5%
- High-ticket treatments where each missed appointment is genuinely painful
- Practices that already use SMS reminders but still see drop-offs

## When it doesn't

- Very-low-ticket appointments (a $50 hold on a $80 visit feels heavy)
- Patient bases that are price-sensitive and likely to read the hold as friction
    `.trim(),
  },
  {
    slug: "accessible-major-treatments",
    title: "Make high-ticket treatments affordable",
    lead: "Every patient who said \"I'll think about it\" really meant \"I can't pay it all today.\"",
    categoryId: "payment-plans",
    order: 2,
    body: `
Case acceptance is rarely a clinical problem. The patient agrees they need the treatment, agrees the dentist they're sitting in front of is the right person to do it — and then they go home, "think about it", and never come back. The reason is almost always the same: they can't write a $4k cheque today.

**Payment plans solve this directly.** Not by discounting the treatment, but by reshaping the cost into something the patient can absorb monthly. The same $4k case at $170/month for 24 months is a different decision entirely.

## Why it works

Dental treatment competes for the patient's wallet with everything else — mortgage, school fees, the car. When a major treatment lands as a single huge bill, it loses every time. When it lands as a monthly line item in the same range as a phone plan, it often wins.

Importantly, the practice still gets paid in full. SmilePass funds the plan or you fund it in-house; either way, you don't carry the cashflow risk while the patient pays it down.

## How SmilePass enables it

- **Payment Plan Builder** (Settings → Payment Plan Builder) — build re-usable templates per treatment type. One for ortho (24 months), one for full-mouth implants (36 months), one for major restorative (12 months).
- **Multi-tier amounts via ADD +** — a single template can offer $150/$200/$300 monthly options depending on case complexity. Reception picks the right tier at sign-up.
- **Only for Members toggle** — restrict your best terms to membership patients. Suddenly the membership has a concrete reason to exist.
- **Set instalment to start after** — defer the first payment 30 days so the patient's first instalment doesn't land alongside the treatment cost itself.
- **Progression + Balance columns** in the Payment Plan list — see at a glance which plans are on track and which need a follow-up.

## What to expect

Practices that introduce structured payment plans for ortho, implants and major restorative typically see:

- **Case acceptance climbs 20–40%** on high-ticket treatments within 90 days
- **Average case value grows** — patients who would have done "just the front teeth" now do the full quadrant
- **Treatment plans get presented more confidently** — the team stops softening the price because they have a real answer for "I can't afford that"
- **More memberships sold downstream** — members get better terms, so financing becomes a reason to join

## The presentation script

When the patient hesitates, *don't* drop the price. Instead:

> "We have a payment plan for exactly this — we can spread the $4,200 across 24 months at $185 a month, with the first payment in 30 days. Would that help?"

Reception or the treatment coordinator hits **Create Payment → Payment Plan** in SmilePass while the patient is still in the chair, picks the right template, sends the patient a link. They sign on the spot. They walk out booked for next week's first appointment.

## When this strategy fits

- Practices with a meaningful pipeline of ortho, implants, full-mouth or major cosmetic
- Practices where treatment plans currently sit in limbo after the consult
- Practices wanting to differentiate from competitors who only take upfront payment

## When it doesn't

- Pure hygiene-and-check-up practices with no high-ticket pipeline
- Practices uncomfortable with the operational lift of administering instalments (though SmilePass automates most of this)
    `.trim(),
  },

  /* ─── Ortho ─── */
  {
    slug: "ortho-financing-playbook",
    title: "Ortho financing playbook",
    lead: "Every ortho case acceptance is a financing decision. Solve the financing.",
    categoryId: "ortho",
    order: 1,
    body: `
A patient sits in your consult and learns they need 18 months of braces or clear aligners for $7,500. They nod, they ask sensible questions, they say *"let me think about it"* — and 70% of them never come back. The decision they're really making isn't clinical. It's financial. The case acceptance problem in ortho is fundamentally a payment problem, and SmilePass solves it directly.

## Why it works

A $7,500 case is intimidating as a lump sum. The same $7,500 spread over 24 months — say $310/month with the first payment 60 days post-bond-up — is a much easier "yes". The patient still pays the same total; the practice still gets the same revenue; but the friction at the moment of decision drops dramatically.

The deferred-start mechanic is the underrated piece. Most ortho patients have just paid for the consult and scans; asking them to start instalments immediately feels like piling on. Deferring 60-90 days lets them get used to the idea before the first debit lands.

## How SmilePass enables it

- **Payment Plan Builder** (Settings → Payment Plan Builder) — build dedicated templates:
  - **Braces 24-month** — typical case range $5,000-$9,000, monthly $210-$380
  - **Clear aligners 18-month** — typical case range $4,500-$7,500, monthly $250-$420
- **"Set instalment to start after"** — defer first payment by 60-90 days post-bond. This single feature lifts close rates more than any sales script.
- **ADD+ on Amount** for multi-tier pricing — one template handles a $5k case and a $9k case via different selectable monthly amounts.
- **Setup Fee** — bake in the records / appliance cost as a one-time upfront amount, separate from the monthly stream.
- **Only for Members** toggle — if you also run a membership program, give members better terms (longer plan, lower deposit) as a reason to join *before* the ortho consult.

## What to expect

Practices that introduce a dedicated ortho financing playbook typically see, within 90 days:

- **Case acceptance climbs 20-40%** on ortho specifically
- **Average case value grows** as patients accept full treatment rather than scaled-back versions
- **Drop-off after consult falls** because financing is presented *during* the consult, not "we'll email you the quote"
- **Treatment coordinator confidence climbs** — they have a concrete answer for the only objection that matters

## The presentation script

The win condition is to never let the patient leave the room without seeing the monthly number. The script:

> *"Total treatment is $7,500. We can spread that across 24 months at $325 a month — and your first payment isn't due for 60 days, so you've got time to settle in. I can send the financing link to your phone now and you can review it tonight."*

Treatment coordinator opens **Create Payment → Payment Plan → Braces 24-month template**, fills in the amount tier, sends the SMS link. Patient signs on their phone from the carpark. Practice books the next appointment before they drive away.

## When this strategy fits

- General-dentistry practices that do their own ortho or have an in-house orthodontist
- Specialist orthodontic clinics
- Practices where ortho consults convert below 50%

## When it doesn't

- Practices that refer all ortho out (no in-house treatment to finance)
    `.trim(),
  },
  {
    slug: "post-ortho-retention",
    title: "Post-ortho retention membership",
    lead: "You spent 18 months turning their teeth around — don't lose them the day the brackets come off.",
    categoryId: "ortho",
    order: 2,
    body: `
Ortho practices win the war and lose the peace. The patient finishes treatment, walks out with a perfect smile and a retainer, and disappears. Six years later they're someone else's hygiene patient. The case was profitable, the relationship was not. SmilePass closes this loop with a dedicated post-ortho membership that turns the de-bond appointment into the start of a 10-year relationship.

## Why it works

A patient who just paid $7,500 for ortho is *the most relationship-warm patient you'll ever have*. They trust you. They care about the outcome. They want to protect their investment. Selling them a maintenance membership at de-bond is the easiest membership sale a dental practice will ever make — and the conversion rate proves it (industry data suggests 60-80% of ortho patients accept a maintenance plan if it's offered well).

The plan also has a clinical purpose: retainer compliance is genuinely poor without follow-up, and a membership that pulls patients back twice a year for retainer checks and cleans literally protects the treatment outcome.

## How SmilePass enables it

- **Membership Builder** — dedicated "Retainer Care" plan with:
  - 2× cleans/year + retainer assessment
  - Small whitening allowance (1× annual touch-up — covers the typical post-ortho aesthetic concern)
  - 15-20% discount on cosmetic treatments (configure under Custom Discounts & Code → Preventive/Cosmetic categories)
  - Optional: discounted aligner re-fits if relapse occurs
- **Frequency: Monthly** at $30-45/month — a price that anchors against the $7,500 they just paid (insignificant)
- **Sell at de-bond** — the appointment script positions the membership as the natural next step ("Now we protect what we built")
- **No lock-in if you're nervous** — set lock-in to 0 months in the Terms tab. The conversion is high enough that you don't need contractual stickiness.

## What to expect

A practice converting 70% of ortho patients into post-ortho members:

- **20 ortho cases finished per year** × 70% conversion × $40/month × 60-month average retention = **~$33,600 lifetime revenue from a single year's ortho graduates**
- **Treatment uptake** from these members is meaningfully higher because trust is already established
- **Word-of-mouth referrals** — happy post-ortho members refer their siblings, friends, kids who hit ortho age
- **Practice valuation** — recurring revenue from a known-good cohort improves any future practice sale

## The de-bond script

The de-bond appointment is the magic moment. Train the team:

> *"Your treatment is officially complete — congratulations. To protect everything we just did over the last 18 months, I'd love to put you onto our Retainer Care plan: $40/month covers two cleans, a retainer check at each visit, and your annual whitening top-up. We can set it up now if you'd like — takes about a minute."*

Most patients say yes. The ones who don't get a soft reminder at their 3-month retainer check.

## When this strategy fits

- Practices that finish ortho cases in-house (general or specialist)
- Practices with no existing post-ortho retention mechanism
- Specialist ortho practices wanting to extend the relationship beyond debond

## When it doesn't

- Practices that refer ortho out (you don't own the de-bond appointment, can't sell at it)
    `.trim(),
  },

  /* ─── Perio ─── */
  {
    slug: "perio-maintenance-membership",
    title: "Perio maintenance membership",
    lead: "Make the quarterly clean feel like care, not a chore — and price it accordingly.",
    categoryId: "perio",
    order: 1,
    body: `
Periodontal patients are the hardest segment to retain and the most valuable to keep. They need 3-4 maintenance visits per year (not 2), and missing one of those visits can mean disease progression that costs the patient teeth and costs you trust. A perio-specific membership reframes the quarterly visit from "another bill" to "your ongoing care plan" — and the numbers stop being the deciding factor.

## Why it works

Perio maintenance is the textbook case for memberships. The patient genuinely needs the higher visit frequency. The visits are clinically substantial (scaling, root planing, monitoring). And the alternative — paying $250-350 per visit four times a year — feels punitive even though it's what good care looks like.

Bundling 4 maintenance visits + monitoring + discounts into a single $55-75/month membership flips the emotional read. The patient now sees a *care plan* instead of a series of expensive appointments. Compliance climbs, outcomes improve, retention stabilises.

## How SmilePass enables it

- **Membership Builder, perio-specific plan:**
  - **Included services:** 4× Periodontal Maintenance Cleans per year (vs the 2 in a standard plan)
  - **Discount on Periodontics category:** 15-25% (Custom Discounts & Code → Periodontics) — covers surgical procedures, deep scaling, antibacterial therapy
  - **Discount on Diagnostic category:** 15% — covers x-rays and periodontal charting at maintenance visits
  - **Smaller discount on other categories:** 10% — keeps the perio focus clear
- **Price band:** $55-75/month (the industry benchmark for perio plans)
- **Frequency: Monthly** — the higher price point doesn't work well fortnightly; psychologically monthly reads as "professional care"
- **Lock-in: 12 months** — given the chronic-disease framing, the 12-month commitment is genuinely justified clinically

## What to expect

A perio-led practice converting active perio patients onto this plan:

- **Compliance rises** — 4× annual visits actually happen because the patient has paid for them
- **Revenue per perio patient** stabilises at $660-900/year (membership) vs the variable $0-1,400/year (per-visit billing) — predictable cashflow
- **Treatment uptake on restorative** climbs because perio members are in your chair 4 times a year vs the 1 time non-members typically show up
- **Patient-reported outcomes** improve (visible plaque, bleeding indices) — and the patients notice

## How to sell it at the chair

Frame it as a care plan, not a discount:

> *"Your perio status needs four visits a year. The way most patients handle that is our Periodontal Care plan — $65/month covers all four visits plus 20% off any restorative work. It works out about the same as paying per visit but spreads the cost evenly and means you never have to think about whether to come in."*

The reframe from "discount" to "consistent care" is the whole game. Patients who say yes value the structure more than the savings.

## When this strategy fits

- Practices with a meaningful perio caseload (often general practices in older catchments, or any practice with a dedicated hygienist running maintenance)
- Specialist periodontal clinics
- Practices wanting to formalise their perio recall mechanism

## When it doesn't

- Practices with minimal perio caseload (better to focus on a general preventive plan)
    `.trim(),
  },
  {
    slug: "insurance-gap-perio",
    title: "Insurance-gap perio plan",
    lead: "Your insurance caps at $1,500 a year. Your perio costs $2,800. The membership covers the gap.",
    categoryId: "perio",
    order: 2,
    body: `
Most dental insurance in Australia caps annual benefits at $1,500-2,000 per person. Perio patients routinely blow through that by July — and then face the rest of the year self-funded. They cut visits, skip maintenance, disease progresses. Everyone loses.

A perio gap-coverage membership solves the second-half-of-year problem directly. Patients use their insurance until it caps, then the membership picks up — same dentist, same visits, just a different payment mechanism. The clinical relationship continues uninterrupted.

## Why it works

The patient's experience changes from "I have to skip my October visit because insurance is exhausted" to "my insurance handles January through June, my membership handles July through December." Continuity of care becomes possible. Compliance stays high. Disease progression stops.

For the practice, this is acquiring patients who *already need ongoing care* — a cohort with built-in clinical justification for the membership. Conversion is genuinely high because the alternative (paying full per-visit fees from July onwards) is worse.

## How SmilePass enables it

- **Membership Builder, gap-focused plan:**
  - **Included services:** 2 maintenance visits per year (the second-half ones that fall outside typical insurance reset cycles)
  - **Discount on Periodontics category:** 25-30% — meaningful enough to make the second-half-of-year care affordable
  - **Discount on Diagnostic category:** 20% — covers x-rays and periodontal charting
  - **Price band:** $35-50/month — lower than the full perio plan because it complements insurance rather than replaces it
- **Frequency: Monthly or Fortnightly** — fortnightly works well here because the lower per-bill amount feels right alongside an insurance premium
- **Promo code at sign-up** for patients converted mid-year ("MIDYEAR" gives 20% off first 3 months) — softens the timing if you sign them up in August

## What to expect

A practice with 100 perio patients on insurance:

- **20-30% conversion rate** to the gap plan within 12 months
- **Maintenance visit compliance** rises sharply for those members (you actually see them in Q3/Q4)
- **Disease progression slows** — measurable in pocket depth measurements and bleeding indices at year-end
- **Patient-reported satisfaction** climbs because care becomes continuous rather than insurance-bounded

## The conversation script

This one is almost too easy. After the patient hits their annual cap:

> *"You've used your full insurance benefit for the year, which means your November and February visits would otherwise be self-funded — about $300 each. Our gap-cover plan is $40/month and covers both visits plus discounts on any work you need. Want me to set it up?"*

Patients who've already paid $600 in self-funded perio care this year do the math instantly. Many say yes on the spot.

## When this strategy fits

- Practices in markets with high private health insurance penetration (most of urban Australia)
- Perio caseload patients who consistently hit insurance caps
- Practices wanting a complement-not-replace position vs insurance

## When it doesn't

- Patient bases without significant insurance coverage (use the standard Perio maintenance membership instead)
- Practices that don't run their own perio program (referred-out cases can't be membered)
    `.trim(),
  },

  /* ─── Cosmetic ─── */
  {
    slug: "smile-makeover-combo",
    title: "Smile-makeover financing + maintenance combo",
    lead: "Two products, one decision: finance the work over 24 months, then a maintenance plan starts the day the temporary comes off.",
    categoryId: "cosmetic",
    order: 1,
    body: `
A $20,000 smile makeover is two distinct conversations. The first is *"how do I afford this?"* — solved by a payment plan. The second is *"how do I protect what I just paid for?"* — solved by a maintenance membership. Most practices win the first conversation and never have the second. The combo strategy turns the makeover into a multi-year revenue stream instead of a one-shot.

## Why it works

The cosmetic patient who's just committed $20k cares deeply about the outcome. They're at their most relationship-warm at the temporary-fitting appointment. Selling them a *Cosmetic Care* membership at that moment — to preserve what they just bought — has the highest conversion rate in dentistry. They aren't being upsold; they're being given a way to *protect* the investment.

The financing is the entry product. The membership is the long-tail value. The combo means you go from "$20k one-time" to "$20k + $50/month for 5+ years" per patient.

## How SmilePass enables it

**The financing side:**
- **Payment Plan Builder** — Cosmetic Makeover template, typical structure:
  - **Total range:** $8,000-$30,000 (multi-tier via ADD+ Amount)
  - **Length:** 24-36 months
  - **Setup Fee:** the deposit / records / impressions cost as an upfront amount
  - **Deposit:** 15-25% to lock the case
  - **Set instalment to start after:** 30-60 days post-treatment-start
- **Only for Members toggle:** members get longer-term financing (36 months vs 24) — a reason to join *first*

**The maintenance side:**
- **Membership Builder** — Cosmetic Care plan, typical structure:
  - **2× cleans/year** (preserves margins, prevents stain)
  - **Quarterly whitening top-up** (the touch-up that keeps veneers looking new)
  - **Annual veneer / crown polish appointment** — clinical maintenance specific to restorations
  - **Discount on cosmetic re-touches** — chipped veneer, replacement, etc.
  - **Price band:** $50-80/month — premium pricing aligned with the patient's existing spend

## What to expect

A practice doing 12 smile makeovers per year, with 70% converting to the Cosmetic Care membership:

- **8-9 new memberships per year** at $60/month average
- **5-year retention** typical for this cohort (cosmetic patients are sticky once invested)
- **Annual membership revenue from one year of makeovers:** ~$6,400/year, recurring
- **Compounding effect:** Year 5, you have 40+ active cosmetic members from prior years contributing $30k+/year in recurring revenue alone

## The sell-it moment

The win happens at the temporary-fitting appointment, before final cementation:

> *"Now that the temporaries are in, we're 80% done — but the real work is keeping these looking like new for the next 10 years. I'd love to set you up on our Cosmetic Care plan: $60/month covers cleans, quarterly whitening top-ups, and a yearly polish appointment specifically for the veneers. It's the difference between veneers that look amazing for 3 years and veneers that look amazing for 10."*

Frame it as outcome protection, not upsell.

## When this strategy fits

- Practices with active cosmetic / aesthetic caseload (veneers, full smile design, ceramic crowns)
- Practices wanting to extend cosmetic patient LTV
- Multi-clinic groups where the cosmetic patient might continue care at any location

## When it doesn't

- Practices with minimal cosmetic work — the maintenance pricing doesn't anchor against anything
    `.trim(),
  },
  {
    slug: "pre-event-whitening",
    title: "Pre-event whitening package",
    lead: "Brides, grooms, public-facing professionals book months in advance — meet them where they are.",
    categoryId: "cosmetic",
    order: 2,
    body: `
A bride two months out from her wedding is one of the most predictable, motivated cosmetic patients you'll ever have. So is the executive about to land a major media appearance, the wedding party in a group package, the actor before a high-profile shoot. They have a date. They have a budget. They know what they want. They just need the practice to meet their timeline.

## Why it works

Event-driven patients buy on motivation, not price-sensitivity. They've already decided to spend money on their appearance — the only question is *which dentist*. A package that names the event, builds the timeline, and lets them finance the cost across the planning window converts at rates well above generic cosmetic enquiries.

The financing piece is the unlock. A $3,000 whitening + bonding + reshape package billed in one hit lands as a luxury. The same $3,000 billed at $250/month across 12 months — with the first payment dated *after* the event, when their savings are no longer locked in wedding deposits — feels like a normal monthly line item.

## How SmilePass enables it

- **Payment Plan Builder, Pre-Event template:**
  - **Total range:** $1,500-$5,000 (whitening + bonding + minor reshaping packages)
  - **Length:** 6-12 months (matches typical engagement / event lead times)
  - **Setup Fee:** initial consultation + records as the upfront component
  - **"Set instalment to start after":** date the first instalment **after the event** — patients are cash-poor in event lead-up, cash-rich afterwards
  - **Multi-tier Amount via ADD+** — base whitening package $1,500, mid package $2,800, full package $4,500
- **Pair with a Promo Code** — campaigns like **WEDDING2026** discount the setup fee if signed up 90+ days before the event
- **Marketing surface** — the Practice tag line and description on each Location's public profile can mention pre-event packages explicitly

## What to expect

A practice that builds a Pre-Event package and markets it (Google Ads targeting bridal-related keywords, local wedding-vendor partnerships):

- **3-8 event-driven patients per month** in a typical urban catchment
- **Conversion rate from enquiry to booking** typically 50-70% (these patients are pre-qualified)
- **Average case value** $2,500-3,500 — meaningful per-patient revenue
- **Word-of-mouth multiplier** — wedding parties refer friends; corporate executives refer colleagues

## The marketing motion

This is one strategy where active marketing pays back hard. Practical tactics:

1. **Vendor partnerships** — local bridal stores, wedding planners, photographers; offer them a referral fee or co-marketed material
2. **Time-bound promo code** — "WEDDING2026" or "EVENT90" attached to the Pre-Event package; expires 90 days out
3. **Public profile copy** — explicitly mention "wedding & event packages" in the Practice description (Settings → Locations → Profile Description)
4. **Search-targeted ads** — keywords like "whitening before wedding [city]" convert well for cosmetic-equipped practices

## When this strategy fits

- Practices in catchments with strong event / lifestyle demographics
- Practices with cosmetic dentists who can deliver fast-turnaround whitening and bonding
- Practices already running cosmetic packages but with weak event-specific marketing

## When it doesn't

- Pure preventive / general practices without cosmetic infrastructure
- Practices in catchments where the patient base doesn't have discretionary cosmetic spend
    `.trim(),
  },

  /* ─── All-on-X ─── */
  {
    slug: "all-on-x-financing",
    title: "The All-on-X financing playbook",
    lead: "The case is $35k. The patient wants the work. The price is the only thing in the way.",
    categoryId: "all-on-x",
    order: 1,
    body: `
All-on-X (full-arch implant rehabilitation) is the single biggest case acceptance challenge in dentistry. The clinical conversation is straightforward — the patient understands they need it, they want their teeth back, they've already psychologically committed. Then the price lands: $35,000-$60,000+. And they walk away.

Most of those patients don't walk away because they decided not to do the treatment. They walk away because they can't see *how* to do it. A structured financing playbook converts that hesitation into a yes.

## Why it works

A $35,000 case as a single sum is impossible for most patients. The same $35,000 structured as $7,000 deposit + 36 monthly payments of $830, starting 90 days after the final prosthetic is fitted — that's a different conversation. It's now an interpretable monthly commitment, not an insurmountable wall.

The deferred-start mechanic is critical specifically for All-on-X. Patients have just paid the deposit, gone through surgery, lived in temporary prostheses for months. Demanding monthly instalments immediately makes them feel ground-down. Deferring 60-90 days after final prosthetic delivery lets them experience the outcome before they start regular payments.

## How SmilePass enables it

- **Payment Plan Builder** — dedicated All-on-X template with:
  - **Total range:** $25,000-$65,000 via multi-tier Amount (ADD+)
  - **Length:** 36-48 months (longer than standard payment plans — the case justifies it)
  - **Deposit:** 15-25% upfront — locks the case psychologically and financially
  - **Setup Fee:** initial CT scan, surgical planning, records — billed as a one-time charge separate from instalments
  - **"Set instalment to start after":** 60-90 days post-final prosthetic — the deferred start that converts hesitant patients
  - **Admin Fee:** small recurring administration component (often $5-10/month) for the practice's bookkeeping cost
- **Only for Members toggle:** consider restricting the best terms (longer plan, lower deposit) to existing members — gives membership a tangible upgrade path
- **Payment Hold** for pre-surgical commitment — authorise a portion of the deposit weeks before the surgical date as a soft "I'm doing this" anchor
- **Progression + Balance columns** in the Payment Plan list let you monitor each high-ticket plan individually — these are big enough that any failed payment needs immediate attention

## What to expect

A practice that introduces a structured All-on-X financing playbook:

- **Case acceptance climbs 30-50%** on All-on-X consultations specifically
- **Average case value rises** as patients accept full-arch rather than partial-arch alternatives
- **Drop-off after consult falls dramatically** — patients leave the room with a signed plan and a booked surgical date
- **Cashflow impact:** the practice receives the full case value over 36 months instead of waiting for a lump sum that may never come

## Pre-screen before sending the link

Critically: **do not** send All-on-X financing links to patients who haven't been clinically and financially pre-screened. The case stakes are too high. Front-loaded process:

1. **Clinical consult and CT scan** — confirm the patient is a candidate
2. **Financial pre-screen** — informal credit and income check (most patients self-disclose)
3. **Presentation of plan options** — typically two or three Amount tiers within the same template
4. **Send the financing link** via SmilePass — patient signs from their phone, surgical booking lands the same day

## When this strategy fits

- Practices with in-house implant capability or close referral relationships with implant surgeons
- Practices in catchments with patients aged 55+ where full-arch demand is concentrated
- Practices that have consults stall after presentation of price

## When it doesn't

- Practices that refer all complex implant work out (no in-house treatment to finance)
- Practices without the operational maturity to manage 36-month payment plans
    `.trim(),
  },
  {
    slug: "implant-maintenance-membership",
    title: "Implant maintenance membership",
    lead: "You spent $40,000 on the prosthetic. $80 a month keeps it pristine for the next 20 years.",
    categoryId: "all-on-x",
    order: 2,
    body: `
An All-on-X patient is a $40,000+ patient who often disappears after the final prosthetic. They've already paid the case. They feel finished. They go back to seeing their dentist annually at best — or not at all — and the practice loses the relationship that should have lasted decades. A dedicated implant maintenance membership turns the final delivery appointment into the start of the next phase.

## Why it works

Implant prostheses need active maintenance: peri-implant assessment, occlusal adjustment, prosthetic component checks (screw access, abutment torque), professional cleaning of complex prosthetic surfaces. A patient who skips these checks risks peri-implantitis, prosthetic failure, and complications that cost both parties dearly. Bundling this care into a clear monthly plan makes the maintenance feel like *care for the investment*, not *another bill*.

For the practice, this is the highest-LTV membership cohort in dentistry. Implant patients who join a maintenance plan stay for 5-10+ years. The recurring revenue from a single year's worth of All-on-X graduates compounds into a meaningful annuity.

## How SmilePass enables it

- **Membership Builder** — Implant Maintenance plan:
  - **Annual implant assessment** (peri-implant probing, x-rays, occlusal check)
  - **Annual prosthetic check** (screw torque, abutment inspection, prosthesis assessment)
  - **2× professional cleans/year** specifically calibrated for implant cleaning
  - **Discount on prosthetic repairs / component replacements** — 15-25% off (under Custom Discounts & Code → Prosthodontics)
  - **Discount on additional implant placement** if they decide to add more later (the All-on-X patient often becomes the multi-implant patient)
- **Price band:** $60-90/month — premium pricing anchored against the $40k+ they just spent (the maintenance is a rounding error)
- **Lock-in: 24 months** — justified clinically given prosthesis warranty cycles
- **Frequency: Monthly** — the price point doesn't suit fortnightly framing

## What to expect

A practice converting 80% of All-on-X graduates into the maintenance plan:

- **12 cases per year** × 80% conversion × $75/month × 7-year average retention = **~$50,000+ recurring revenue from one year's case load**
- **Reduced prosthetic complications** — annual checks catch issues before they become emergencies
- **Higher patient satisfaction** — the patient feels actively cared for, not abandoned post-treatment
- **Practice valuation impact** — recurring revenue from a clinically-justified high-margin cohort lifts any sale multiple

## The de-prosthetic-delivery script

The win happens at the final prosthetic delivery appointment:

> *"Your prosthesis is delivered — you're officially done with the surgical phase. But your implants are with you for life, and they need active maintenance. Our Implant Care plan is $75 a month: an annual implant assessment, an annual prosthetic check, two cleanings a year specifically calibrated for implant surfaces, and discounts on any repairs down the track. Want me to set it up before you leave?"*

The patient has just had a transformative experience and trusts the practice deeply. Conversion is high because the framing is right.

## When this strategy fits

- Practices doing in-house All-on-X or major implant work
- Specialist implant clinics
- Practices wanting to convert one-shot implant patients into 10-year relationships

## When it doesn't

- Practices that refer implants out (you don't own the post-delivery relationship)
- Patient bases where the implant patient typically lives interstate / overseas (maintenance proximity matters)
    `.trim(),
  },

  /* ─── Kids ─── */
  {
    slug: "kids-only-membership",
    title: "Kids-only membership",
    lead: "A clean + check-up plan parents say yes to without thinking.",
    categoryId: "kids",
    order: 1,
    body: `
The fastest way to win a multi-generation patient relationship is to win the kids. Parents who trust you with their kids' teeth will trust you with theirs. They'll bring their partner. They'll bring grandparents. A simple, low-priced kids-only membership opens that door — and because the price is low and the offering is focused, parents say yes almost automatically.

## Why it works

Parents make low-friction decisions about kids' preventive care when the offering is simple, clearly age-appropriate, and priced as obviously reasonable. A $25-35/month plan that covers the dentist visits a kid actually needs (2 cleans, fluoride, sealants) is an easier "yes" than a generic family plan that prices the kid same as the adult.

It's also a high-quality acquisition wedge. Once the kid is your patient, the practice has natural opportunities to convert the parents — and the parents are pre-disposed to trust you because the kids are happy. Family acquisition starts with the kids.

## How SmilePass enables it

- **Membership Builder** — Kids-only plan with:
  - **Age To: 17** in the Terms tab — enforces the age boundary at signup
  - **Included services:** 2× cleans/year, fluoride treatments, 1× check-up + bitewings, sealants on permanent molars
  - **Discount on Diagnostic + Preventive categories:** 15-20%
  - **Lower discount on other categories** — keeps the plan focused
  - **Price band:** $25-35/month (industry benchmark; calibrate to local market)
- **Frequency: Fortnightly or Monthly** — fortnightly $12 reads even softer for the budget-conscious parent
- **Pairs with the Dependent Program** — when the parent joins later, the kid becomes their dependent and the parent's membership price drops automatically

## What to expect

A practice introducing a kids-only plan typically sees:

- **High immediate signup volume** — parents convert at 60-80% when offered at the kid's first or second visit
- **Average 1-2 year delay** before parents join their own membership — they want to see the kid's experience first
- **Multi-generation expansion** — within 3-5 years a single kid's membership often anchors 3-5 family-of-origin members (kid → parent → other parent → grandparent → sibling)
- **Lifetime patient relationships** — kids who join a membership at age 8 are still your patients at 28 if the family experience is good

## The sell-it moment

The win happens at the kid's check-up, with the parent in the room:

> *"Olivia is a great patient. We have a kids' plan that covers her cleans, check-ups, fluoride and sealants — $30 a month. Saves you scheduling-and-paying each visit and makes sure she doesn't fall off the recall schedule. Want me to set it up while we're here?"*

Most parents say yes on the spot because the friction is so low. The plan effectively pays for itself in convenience and time saved.

## When this strategy fits

- Family-oriented practices in suburban catchments
- Practices near schools / family-dense residential areas
- Practices wanting to acquire multi-generation patient relationships

## When it doesn't

- Adult-only clinics (boutique cosmetic, pure ortho-on-adults)
- Catchments without family demographics
    `.trim(),
  },
  {
    slug: "family-bundles-back-to-school",
    title: "Family bundles + back-to-school promo",
    lead: "Family of 4 for $89/month — sign up by 28 February for first month free.",
    categoryId: "kids",
    order: 2,
    body: `
School-year cycles create predictable acquisition windows that most dental practices ignore. January (back-to-school) and July (mid-year) are the moments when parents do a "let's get the kids organised" sweep — and dentistry sits on that list. A pre-priced family bundle plus a time-bound promo turns those windows into measurable signup pulses.

## Why it works

Family pricing solves the *math problem* parents do at signup. Calculating "$30 for each kid plus $40 for me plus $40 for my partner minus the dependent discount" is too much mental work. "Whole family, $89/month, fixed" is a decision the parent can make in 5 seconds. Combined with a time-bound promo, the parent now has a *reason to decide today* rather than next month.

The back-to-school promo specifically rides a cultural pulse — parents in January / February are in "organising the kids" mode, looking at school uniforms, books, healthcare. A practice that runs a "$89/month for a family of 4, first month free if signed up by 28 February" campaign is meeting parents exactly where their attention is.

## How SmilePass enables it

- **Membership Builder** — Family plan with the Dependent Program activated (so the discount stacks automatically): the headline "$89/month for family of 4" results from base plan + dependent discounts
- **Promo Code** under Settings → Custom Discounts & Code → Promo Code List — campaigns like:
  - **BACKTOSCHOOL** — first month free, expires 28 February
  - **MIDYEAR** — first month free, expires 31 July
- **Multi-location bonus** — for chains, "any clinic, any city" framing in the family plan works hard
- **Public profile copy** — Practice description (Settings → Locations) updated seasonally to mention the active campaign

## What to expect

A practice running both seasonal campaigns annually:

- **January-February:** 15-25 family signups in the 60-day campaign window
- **June-July:** 10-15 family signups in the mid-year window
- **Cumulative effect:** 30-50 new family memberships per year from campaigns alone
- **Compounding:** these families then refer other families during the year via the Referral Program

The campaigns are also a useful operational rhythm — they give the front desk a clear "here's what we're pushing this month" focus and a measurable target.

## How to actually run the campaign

The mistake practices make is *building* the campaign but never *talking* about it. Practical activation:

1. **Email blast to existing patients** 7 days before campaign launch — "If you've been thinking about it, here's the moment"
2. **Reception script** for every patient interaction during the window — "We're running a family plan promo right now, $89/month, first month free if you decide before [date]"
3. **Social-media announcement** at launch and 1 week before expiry
4. **Reminder email** 3 days before expiry — the urgency converts the on-the-fence parents
5. **Track signups against target** in real time via the Dashboard

## When this strategy fits

- Family-oriented practices in suburban / school-zone catchments
- Practices that have struggled to drive *any* membership growth and need a forcing function
- Multi-location groups that can run unified campaigns at scale

## When it doesn't

- Adult-only clinics
- Practices whose patient base doesn't think in school-year cycles
    `.trim(),
  },

  /* ─── Emergency ─── */
  {
    slug: "emergency-safety-net",
    title: "Emergency safety-net plan",
    lead: "We don't see them often — but when their kid breaks a tooth at 9pm, they call us.",
    categoryId: "emergency",
    order: 1,
    body: `
Not every patient wants a full preventive membership. Some patients see the dentist once a year reluctantly, prefer to pay-as-they-go, and refuse to feel "locked in" to anything. They're not bad patients — they're just a different cohort. But they still want a *relationship of record* for emergencies: someone to call when something breaks at the worst possible time. The emergency safety-net plan captures exactly this cohort with a low-commitment, low-price plan that turns occasional users into recurring revenue.

## Why it works

The plan reframes the relationship from "do you want to be a member?" to "do you want a dentist on call?" Most patients say yes to the second framing. The membership is functionally insurance against a $1,200 emergency-visit bill at 11pm on a Sunday — and at $15/month, it's effectively free peace of mind.

For the practice, this captures patients who would otherwise drift away entirely, generates predictable recurring revenue from a previously zero-revenue cohort, and creates a soft upsell funnel to a full preventive plan over time (once the patient has been in the chair a few times, the full plan becomes a much easier conversation).

## How SmilePass enables it

- **Membership Builder** — Emergency Safety-Net plan:
  - **Included services:** 1-2× emergency visits/year (toothache, broken tooth, lost crown — triage and stabilisation)
  - **15% discount on follow-up restorative work** (so the emergency visit naturally leads to repair)
  - **No preventive services included** — deliberate. This is a different product from a full membership.
  - **Price band:** $12-18/month — low enough to read as "no-brainer insurance"
  - **Lock-in: 6 or 0 months** — short commitment because the cohort hates being locked in
- **Frequency: Fortnightly or Monthly** — fortnightly $6 reads as essentially-free
- **Position as a complement, not a competitor, to your full plans** — different sell, different segment

## What to expect

A practice introducing the safety-net plan:

- **Acquisition from patients who'd never join a full plan** — typically 5-15% of one-off / occasional patients convert
- **Upsell rate to full preventive membership** of 25-40% within 12-18 months — once the patient has been seen 1-2 times, the full plan starts making sense
- **Steady recurring revenue** from a cohort that previously contributed nothing between emergency visits
- **Patient retention** lifts even for non-converters — they're now "members of record" and call you first when something happens

## The sell-it moment

The win typically happens *after* an emergency visit, when the patient is most aware of why they'd want a relationship-of-record:

> *"Glad we got that sorted. Just so you know — we offer an Emergency Safety-Net plan: $15 a month, covers two emergency visits a year plus discounts on repairs. Most patients on it never use the visits, but when something breaks at 11pm on a Sunday they're not paying $800 for the after-hours emergency call-out. Want me to set it up?"*

The frame is *peace of mind*, not *let me sell you a plan*. The patient who just had an emergency understands the value instantly.

## When this strategy fits

- Any practice (the safety-net cohort exists in every patient base)
- Practices wanting to monetise occasional / once-a-year patients
- Practices with an after-hours emergency capability to anchor the value

## When it doesn't

- Practices that don't actually offer any meaningful emergency response (the plan over-promises)
- Practices that don't want to dilute their full-membership pitch with a "lighter" option (some boutique clinics deliberately segment up only)
    `.trim(),
  },
];

/* ─────────────────────────────────────────────────────────── */

/** Find a strategy by slug. */
export function getStrategyBySlug(slug: string): Strategy | undefined {
  return STRATEGIES.find((s) => s.slug === slug);
}

/** Find a category by id. */
export function getCategoryById(id: string): StrategyCategory | undefined {
  return STRATEGY_CATEGORIES.find((c) => c.id === id);
}

/** Strategies in a category, sorted by their position within the category. */
export function getStrategiesInCategory(categoryId: string): Strategy[] {
  return STRATEGIES.filter((s) => s.categoryId === categoryId).sort(
    (a, b) => a.order - b.order,
  );
}

/* ─────────────────────────────────────────────────────────── */
/*  Setup steps — "How to launch this in SmilePass" per strategy.
 *
 *  Sidecar map keyed by slug. Stored separately from the strategy bodies
 *  so the marketing prose stays readable and the implementation guide
 *  can be edited independently. Rendered after the body on /strategy/[slug].
 */
/* ─────────────────────────────────────────────────────────── */

export const STRATEGY_SETUPS: Record<string, SetupStep[]> = {
  /* ─── Foundations ─── */

  "know-the-platform": [
    {
      num: "01",
      title: "Read the Getting Started wiki track",
      body:
        "Open the [Getting Started track](/wiki/onboarding-wizard) of the SmilePass wiki and read it end-to-end with the live SmilePass tab open next to it. Onboarding wizard, the home dashboard, Quick Actions, practice locations. About 15 minutes.",
    },
    {
      num: "02",
      title: "Walk through Building Plans",
      body:
        "Read the [Building Plans track](/wiki/membership-plans) covering Membership Builder, plan templates, add-ons, the payment plan builder, and custom discounts. Click through each section in your own account as you read. About 20 minutes.",
    },
    {
      num: "03",
      title: "Run through Daily Operations",
      body:
        "Read the [Daily Operations track](/wiki/registering-patients) on registering patients, importing patient lists, adding members, taking payments, and reading reports. These are the motions your team will do every day. About 15 minutes.",
    },
    {
      num: "04",
      title: "Finish with Account & Integrations",
      body:
        "Read the [Account & Integrations track](/wiki/account-and-team) on team accounts, the marketing shop, integrations, and billing. Lighter material but covers the housekeeping. About 10 minutes.",
    },
    {
      num: "05",
      title: "Pin the wiki to a browser tab",
      body:
        "Bookmark the [SmilePass wiki](/wiki) and pin it in your browser. From now on, when you (or anyone on the team) needs a refresher, it's one click away. The wiki updates as the platform updates, so it stays current automatically.",
    },
  ],

  "team-training": [
    {
      num: "01",
      title: "Run the kickoff meeting",
      body:
        "Block 30 minutes with the whole team before launch. Explain the 'why': what changes for patients, what changes for your revenue, what each role owns. Without buy-in at this meeting, nothing downstream sticks.",
    },
    {
      num: "02",
      title: "Tour SmilePass together",
      body:
        "Walk reception and the hygienists through Membership Builder, the member list, the Quick Actions toolbar (Add Member, Request Payment) and the home dashboard. They need to see the platform once with their own eyes so it isn't intimidating.",
    },
    {
      num: "03",
      title: "Build the one-page reception cheat sheet",
      body:
        "Print a single page taped to the side of every reception monitor: each plan's name and price, the top three patient objections with the one-liner response, and which patient type to offer which plan to. Short enough to scan in 10 seconds.",
    },
    {
      num: "04",
      title: "Role-play the three core conversations",
      body:
        "Pair up the team and practise the post-hygiene checkout, the treatment-plan presentation and the post-emergency follow-up. Each pair runs each script three times. Stop when it sounds natural, not when it sounds memorised.",
    },
    {
      num: "05",
      title: "Set the daily dashboard standup",
      body:
        "Every morning, the practice manager opens the home dashboard, calls out yesterday's new signups by name, and asks 'what's blocking us today?'. Five minutes. The single most important habit for keeping the program alive.",
    },
  ],

  /* ─── Memberships ─── */

  "family-first-growth": [
    {
      num: "01",
      title: "Turn on the Dependent Program",
      body:
        "Open Settings → Custom Discounts & Code → Manage Discounts. Toggle Dependent Program on and set the per-dependent discount at 10%. Save.",
    },
    {
      num: "02",
      title: "Build a family-friendly plan",
      body:
        "In Membership Builder, create a new plan called 'Family Care'. Set No age limits, include adult-and-child preventive services, and price the adult tier at $30 to $40 per month.",
    },
    {
      num: "03",
      title: "Switch on the live price preview",
      body:
        "In the plan settings, enable the live dependent-pricing card on the patient-facing signup page so families see the discount stack as they add kids.",
    },
    {
      num: "04",
      title: "Train reception on the household pitch",
      body:
        "Script the offer to lead with the family plan whenever any new adult enrols. The line that works: 'Add your partner and kids for less than the price of two singles.'",
    },
    {
      num: "05",
      title: "Announce and track",
      body:
        "Send a launch email to your existing patient list from your own CRM or email tool, headlining the family discount and the dependent stacking math. Then watch Reports → Membership for family-plan signups vs single-adult signups in the first 30 days.",
    },
  ],

  "recurring-revenue-foundation": [
    {
      num: "01",
      title: "Build your first plan",
      body:
        "In Membership Builder, start from the 'Comprehensive Adult' template. Tune inclusions to match your average preventive visit value and price between $25 and $45 per month.",
    },
    {
      num: "02",
      title: "Pick the billing cadence",
      body:
        "Set billing to monthly to start. Enable auto-renewal so the membership runs indefinitely until the patient cancels. Most practices run on monthly debit by default.",
    },
    {
      num: "03",
      title: "Import your existing patient list",
      body:
        "Upload your patient CSV via Members → Import. From now on every new patient at reception is one click away from a SmilePass invitation.",
    },
    {
      num: "04",
      title: "Send the first wave of invites",
      body:
        "From Members → Bulk Actions, select your top 50 most-loyal patients and send the enrolment invitation. Expect 20 to 40% to convert in the first week.",
    },
    {
      num: "05",
      title: "Watch the MRR climb on the dashboard",
      body:
        "Home dashboard shows MRR, member count and new signups by day. Make checking it the first thing your practice manager does each morning.",
    },
  ],

  "good-better-best-ladder": [
    {
      num: "01",
      title: "Design the three tiers",
      body:
        "Build Essentials, Comprehensive and Premium in Membership Builder. Price them roughly $25, $35 and $50 per month. The middle plan is the one most patients will pick.",
    },
    {
      num: "02",
      title: "Make the middle plan obviously the best deal",
      body:
        "Essentials should feel a bit thin (2 cleans only). Comprehensive should add the things patients actually want (cleans + exams + x-rays + 15% off other treatments). Premium adds whitening or top-ups.",
    },
    {
      num: "03",
      title: "Order them left to right on your webpage",
      body:
        "Marketing → Your Webpage. Set the order Essentials → Comprehensive → Premium. Add a 'Most popular' badge to Comprehensive in the plan settings.",
    },
    {
      num: "04",
      title: "Train reception to anchor on Premium",
      body:
        "The pitch: 'Most patients land on Comprehensive for $35 a month, but you can step up to Premium if you also want your whitening covered.' Anchoring on the top makes the middle feel like the smart choice.",
    },
    {
      num: "05",
      title: "Review tier mix monthly",
      body:
        "Reports → Membership shows mix percentage per plan. Target 60 to 70% on Comprehensive. If too many are on Essentials, the gap is too small. If too few are on Premium, the top is too steep.",
    },
  ],

  "hygiene-only-starter": [
    {
      num: "01",
      title: "Build the Hygiene Only plan",
      body:
        "In Membership Builder, create a plan with two hygiene visits per year included and nothing else. Name it clearly ('Hygiene Essentials') and price it low enough that hygiene-only seekers self-filter to it from your public page. Reception offers it directly at the chair to everyone else.",
    },
    {
      num: "02",
      title: "Price it as roughly 'two cleans, paid over 12 months'",
      body:
        "If a hygiene visit costs $180 at your practice, the plan price lands around $30 per month (two visits ÷ 12 with a small discount). Tune to your fee schedule.",
    },
    {
      num: "03",
      title: "Make it the post-hygiene-checkout default offer",
      body:
        "Train hygienists to mention it at the end of every visit. Script: 'Next time, your visit will already be paid for. Want me to set that up?'",
    },
    {
      num: "04",
      title: "Track conversion in Reports",
      body:
        "Reports → Membership filtered by Hygiene Only plan. The goal: 25 to 35% of hygiene patients on the plan within six months.",
    },
  ],

  "demographic-segmented-tiers": [
    {
      num: "01",
      title: "Pick three or four target demographics",
      body:
        "Common splits: Young Adults, Families, Seniors, Implant Patients. Each gets a plan that maps to what they actually need.",
    },
    {
      num: "02",
      title: "Build one plan per segment",
      body:
        "Membership Builder, one plan each. Tune inclusions to the demographic: Seniors get more denture/relining cover, Young Adults get whitening, Families get the dependent discount.",
    },
    {
      num: "03",
      title: "Name and price niche plans to self-filter",
      body:
        "Every plan you build appears on your public signup page, so use the plan name (e.g. 'Implant Maintenance Care'), the price point and the inclusions to make sure only the right patient type would consider it. Brief reception to actively steer the matching patient to each one.",
    },
    {
      num: "04",
      title: "Train staff on which plan to offer when",
      body:
        "Build a one-page cheat sheet for the front desk: patient type → recommended plan. Tape it to the side of the reception monitor.",
    },
    {
      num: "05",
      title: "Consolidate weak performers",
      body:
        "After six months, kill any plan with fewer than 10 members and roll those patients into the next-closest plan. Too many plans is harder to operate than too few.",
    },
  ],

  "fortnightly-billing": [
    {
      num: "01",
      title: "In Membership Builder, set frequency to Fortnightly",
      body:
        "Edit your existing flagship plan. Change Billing Frequency from Monthly to Fortnightly. Save as a new variant so the original monthly plan stays intact.",
    },
    {
      num: "02",
      title: "Price as monthly ÷ 2.17",
      body:
        "A $35 monthly plan becomes a $16 fortnightly plan. Round to the nearest dollar. Total annual cost stays the same; the perceived size of each debit roughly halves.",
    },
    {
      num: "03",
      title: "Align debit day to payday",
      body:
        "Set debit day to Thursday or Friday so payment lands when patients are likeliest to have money in the account. This single change drops failed-payment rate noticeably.",
    },
    {
      num: "04",
      title: "Migrate existing monthly members",
      body:
        "From your own CRM or email tool, send your existing monthly members a one-off offer to switch to fortnightly billing at no extra cost. Most will say yes; many will also tell a friend it's now cheaper-sounding than they thought.",
    },
    {
      num: "05",
      title: "Watch retention by cohort",
      body:
        "Reports → Cohorts, compare 6-month retention of fortnightly vs monthly cohorts. Expect a 10 to 20% improvement on fortnightly.",
    },
  ],

  "founder-launch-pricing": [
    {
      num: "01",
      title: "Create the promo code",
      body:
        "Settings → Custom Discounts & Code → Promo Code List → New. Code: FOUNDER50. Type: Percentage. Value: 50%. Duration: Lifetime of membership.",
    },
    {
      num: "02",
      title: "Cap the campaign tightly",
      body:
        "Set redemption limit to 50 redemptions or set an expiry date 30 days from launch. Whichever comes first. The scarcity is the engine.",
    },
    {
      num: "03",
      title: "Announce it to your patient list",
      body:
        "From your own CRM or email tool, send a launch email to your entire patient list. Suggested subject line: 'We're launching memberships, and the first 50 get founder pricing for life.' Include the FOUNDER50 code visibly in the body and the call to action.",
    },
    {
      num: "04",
      title: "Put signage at reception",
      body:
        "Marketing → Marketing Shop. Download the founder-launch flyer template, tune the copy, and print for the front desk. Make sure every patient sees it on the way in.",
    },
    {
      num: "05",
      title: "Close the campaign cleanly",
      body:
        "When you hit the cap, deactivate the code in the dashboard and email the list: '50 founders signed up. We're now back to standard pricing.' That email creates a second wave.",
    },
  ],

  "referral-engine": [
    {
      num: "01",
      title: "Toggle on the Referral Program",
      body:
        "Settings → Custom Discounts & Code → Manage Discounts → Referral Program. Toggle on. Set discount to 10% for the referrer, 10% for the referred friend.",
    },
    {
      num: "02",
      title: "Confirm the 12-month duration cap",
      body:
        "The default is that members earn the discount per active referral for 12 months, capped at 100% off. Leave the defaults unless you have a specific reason to change them.",
    },
    {
      num: "03",
      title: "Tell members the program exists",
      body:
        "Use your own CRM or email tool to send a one-off announcement to all active members, explaining how the referral mechanic works. Without this email, members never realise they can save by referring.",
    },
    {
      num: "04",
      title: "Make referral the post-appointment ask",
      body:
        "Train staff to say at checkout: 'Know anyone who'd benefit from the membership? We'll discount your next month for every friend who joins.'",
    },
    {
      num: "05",
      title: "Track in the referral dashboard",
      body:
        "Reports → Referrals shows who referred whom, conversion rate, and current outstanding referral discount. Target: 30% of new signups attributed to referrals within 12 months.",
    },
  ],

  "corporate-workplace-memberships": [
    {
      num: "01",
      title: "Build a 'Corporate' plan",
      body:
        "In Membership Builder, copy your standard adult plan and discount 10 to 15% to reflect the bulk relationship. Name it explicitly (e.g. 'Workplace Wellness Plan') so it reads as a corporate offering on the public page. Pair it with a company-specific Promo Code so the corporate discount only applies for verified employees who enter the code.",
    },
    {
      num: "02",
      title: "Create the company-specific promo code",
      body:
        "Settings → Promo Code List → New. Code: ACMECORP (or the company name). Set redemption cap, expiry, and discount. Each company gets its own code.",
    },
    {
      num: "03",
      title: "Pitch HR managers directly",
      body:
        "Reach out to HR at 3 to 5 nearby companies (offices, manufacturing, retail). The offer: a free workplace dental health perk for employees, zero cost to the employer.",
    },
    {
      num: "04",
      title: "Enable family extension",
      body:
        "Keep Dependent Program on so employees can add spouse and kids at the discounted family rate. The HR pitch is stronger when it covers the household.",
    },
    {
      num: "05",
      title: "Run a quarterly review",
      body:
        "Send each HR contact a summary every quarter: employees enrolled, visits delivered, total value. This is what keeps the relationship alive year after year.",
    },
  ],

  "add-on-revenue-layer": [
    {
      num: "01",
      title: "Build your first three add-ons",
      body:
        "Memberships → Add-Ons → New. Start with Whitening Boost, Custom Night Guard, and Annual X-Ray Pack. Price each between $8 and $20 per month on top of the base membership.",
    },
    {
      num: "02",
      title: "Surface add-ons at enrolment",
      body:
        "In plan settings, enable 'Show add-ons on signup page'. Patients see them as optional upgrades while joining. Acceptance rate is highest at this moment.",
    },
    {
      num: "03",
      title: "Brief hygienists on the chairside pitch",
      body:
        "Train hygienists to mention the Whitening Boost during the polish phase, and the Night Guard during occlusion check. Natural, in-context, not sales-y.",
    },
    {
      num: "04",
      title: "Review add-on attach rate monthly",
      body:
        "Reports → Add-Ons. Target attach rate: 20 to 30% of new members take at least one add-on within their first 90 days.",
    },
    {
      num: "05",
      title: "Retire add-ons that flop",
      body:
        "If an add-on is under 5% attach after three months, kill it. Replace with something patients actually ask about (e.g. an Invisalign Refresh, a desensitiser top-up).",
    },
  ],

  /* ─── Payment plans ─── */

  "treatment-day-deposits": [
    {
      num: "01",
      title: "Enable Payment Hold",
      body:
        "Available on Growth plan and above. Payment Plans → Settings → Enable Payment Hold. This is the escrow feature that holds the deposit until treatment day.",
    },
    {
      num: "02",
      title: "Build the high-value plan template",
      body:
        "Payment Plans → New Plan Template. Name it 'Implant Case' or 'Full Mouth Rehab'. Set deposit at 20 to 30% with Payment Hold on. Configure auto-convert to first instalment on treatment day.",
    },
    {
      num: "03",
      title: "Set the refund rule",
      body:
        "Configure refund-if-no-treatment-by-date. Most practices set 12 weeks. This protects the patient and reduces the perceived risk of paying upfront.",
    },
    {
      num: "04",
      title: "Issue at the case-presentation appointment",
      body:
        "Reception sends the signed plan to the patient's phone before they leave. The deposit clears within minutes. The treatment is now anchored in the patient's mind.",
    },
    {
      num: "05",
      title: "Measure no-show drop",
      body:
        "Reports → Appointments → No-Show Rate, filtered to cases with Payment Hold vs without. Expect to see no-show on $5k+ cases drop from 8 to 12% to under 1%.",
    },
  ],

  "accessible-major-treatments": [
    {
      num: "01",
      title: "Pick the three treatments you most want to unlock",
      body:
        "Common picks: crowns ($1,500 to $2,500), root canals + crown bundles ($2,000 to $3,500), partial dentures ($1,500 to $3,000). These are where the price barrier loses you cases.",
    },
    {
      num: "02",
      title: "Build a plan template per treatment",
      body:
        "Payment Plans → New Template. Crown Plan: 6-month interest-free, optional 20% deposit. Save as a one-click issue from the patient record.",
    },
    {
      num: "03",
      title: "Train the team on objection handling",
      body:
        "The pitch: 'You don't need to find $2,000 today. About $330 a month covers it, and we can start treatment as soon as the first payment clears.' Script it, then drill it.",
    },
    {
      num: "04",
      title: "Add the plan to the treatment-plan handout",
      body:
        "Update your treatment-plan PDF template to include a line: 'Payment plan available: $X per month over Y months.' Make it visible at presentation time, not when they ask.",
    },
    {
      num: "05",
      title: "Track case-acceptance lift",
      body:
        "Reports → Treatment Acceptance, segmented by treatment type. Target: 30 to 60% lift on $1,500 to $3,000 treatments within six months.",
    },
  ],

  /* ─── Ortho ─── */

  "ortho-financing-playbook": [
    {
      num: "01",
      title: "Build the Ortho 24-Month Plan template",
      body:
        "Payment Plans → New Template. 24 fortnightly debits, $0 setup fee, $0 interest. Optional small commitment fee at consultation (Payment Hold).",
    },
    {
      num: "02",
      title: "Lock in the commitment fee with Payment Hold",
      body:
        "Set a $500 to $1,000 commitment fee that sits in escrow until the start-of-treatment appointment, then converts to the first instalment. This eliminates the 'I'll think about it' drift.",
    },
    {
      num: "03",
      title: "Issue at the consult, not the start appointment",
      body:
        "The signed plan must leave with the patient at the end of the consult. Reception sends it to their phone, they sign before they reach the car park.",
    },
    {
      num: "04",
      title: "Pair with a retention follow-up",
      body:
        "In your CRM, set up an automated 48-hour follow-up to consult patients who haven't signed. A simple 'Just checking in, happy to answer any questions about the plan' nudge typically recovers 15 to 25% of stalled consults.",
    },
    {
      num: "05",
      title: "Measure consult-to-start conversion",
      body:
        "Reports → Conversion, filtered to ortho. Target: lift from baseline 30 to 45% up to 55 to 65% within six months of running the playbook.",
    },
  ],

  "post-ortho-retention": [
    {
      num: "01",
      title: "Build a 'Retainer Care' membership",
      body:
        "Membership Builder, $35 to $45 per month. Inclusions: 2 cleans per year, retainer check at each visit, annual whitening top-up. This is what keeps ex-ortho patients in the practice.",
    },
    {
      num: "02",
      title: "Add the retainer-replacement add-on",
      body:
        "Add-Ons → New. Retainer Replacement, $15 per month extra, covers one set per year. Solves the 'I lost it' anxiety that keeps patients up at night.",
    },
    {
      num: "03",
      title: "Issue at de-bond, not at start of treatment",
      body:
        "The script lands when the patient sees their new smile in the mirror. 'To protect everything we just did, here's the maintenance plan.' Sign on the spot.",
    },
    {
      num: "04",
      title: "Position it as a chairside-only offer",
      body:
        "The plan will appear on your public signup page alongside the others, but treat it as something reception only proactively mentions at the de-bond appointment. The name 'Retainer Care' and the price point make it obvious to general patients that it isn't for them. Brief reception not to pitch it outside the ortho cohort.",
    },
    {
      num: "05",
      title: "Track 12-month retention",
      body:
        "Reports → Membership, cohort filtered to ex-ortho. Target: 70%+ of ex-ortho patients on Retainer Care at the 12-month mark.",
    },
  ],

  /* ─── Perio ─── */

  "perio-maintenance-membership": [
    {
      num: "01",
      title: "Build a 'Perio Active Maintenance' plan",
      body:
        "Membership Builder, $50 to $80 per month. Inclusions: 4 maintenance visits per year, perio chart annually, 10% discount on any further perio surgery.",
    },
    {
      num: "02",
      title: "Position it as a post-diagnosis offer",
      body:
        "The plan will appear on your public signup page, but treat it as an offer reception and hygienists only present after a documented periodontitis diagnosis. The name 'Perio Active Maintenance' and the higher price point both signal to general patients that it isn't for them, so accidental signups stay rare.",
    },
    {
      num: "03",
      title: "Add it to the perio referral pathway",
      body:
        "Whenever a hygienist diagnoses or the dentist refers for perio, the plan is part of the treatment proposal. Build it into the perio chart workflow.",
    },
    {
      num: "04",
      title: "Pair with insurance-gap framing",
      body:
        "Many private health funds cap perio maintenance at 2 visits a year. The plan covers the gap. That's the line that converts.",
    },
    {
      num: "05",
      title: "Review cohort outcomes",
      body:
        "Reports → Perio Cohort. Track average pocket depth, bleeding sites, and 12-month retention. The clinical data justifies the plan and helps you sell it to the next patient.",
    },
  ],

  "insurance-gap-perio": [
    {
      num: "01",
      title: "Build a 'Perio Gap' add-on, not a full plan",
      body:
        "Memberships → Add-Ons → New. Covers the third and fourth maintenance visit per year that most private health funds cap. $12 to $20 per month.",
    },
    {
      num: "02",
      title: "Attach to your existing adult membership",
      body:
        "Make it available as an add-on to your existing Comprehensive plan. Don't build a separate plan; this is a top-up, not a replacement.",
    },
    {
      num: "03",
      title: "Brief hygienists on the end-of-year insurance check",
      body:
        "October to November, hygienists ask: 'Have you used your private health dental cover for the year?' If yes, offer the gap add-on for next year.",
    },
    {
      num: "04",
      title: "Run an annual reminder",
      body:
        "Each October, send your perio patients a reminder email from your own CRM: 'Your private health resets in January. Want to add the gap cover now?' Schedule it as a recurring annual campaign so it sends itself every year.",
    },
  ],

  /* ─── Cosmetic ─── */

  "smile-makeover-combo": [
    {
      num: "01",
      title: "Build the Cosmetic Bundle plan template",
      body:
        "Payment Plans → New Template. Pre-set inclusions: Veneers + Whitening + Bonding + Hygiene. 12-month interest-free instalments.",
    },
    {
      num: "02",
      title: "Set a deposit with Payment Hold",
      body:
        "20% deposit sits in escrow until the first treatment appointment. Reduces cancellations on long-lead cosmetic cases dramatically.",
    },
    {
      num: "03",
      title: "Issue at the smile-design presentation",
      body:
        "When the patient sees the mock-up of their new smile, the plan is the next thing on the screen. Sign while the excitement is fresh.",
    },
    {
      num: "04",
      title: "Add the lifetime maintenance plan",
      body:
        "After treatment, transition the patient onto a 'Cosmetic Maintenance' membership ($45 to $60 per month). 2 cleans + annual whitening top-up + veneer check.",
    },
    {
      num: "05",
      title: "Track cosmetic ROI per case",
      body:
        "Reports → Treatment Plans, filtered to Cosmetic Bundle. Average plan value, conversion rate from consult, and downstream membership attach rate.",
    },
  ],

  "pre-event-whitening": [
    {
      num: "01",
      title: "Create a time-bound promo code",
      body:
        "Settings → Promo Code List → New. Code: WEDDING2026. Discount: $0 setup fee on the Whitening + Polish bundle when booked 90 days before the event date.",
    },
    {
      num: "02",
      title: "Build the Whitening + Polish bundle as a payment plan",
      body:
        "Payment Plans → New Template. 3-month interest-free, total around $400 to $600. Configure as a Whitening Pack including in-chair, take-home trays, and a touch-up appointment.",
    },
    {
      num: "03",
      title: "Promote via Instagram and your patient list",
      body:
        "Post on Instagram and email your patient list 4 to 6 months before wedding and graduation season. A before/after carousel works best. Send the email from your own CRM and include the WEDDING2026 code visibly in the call to action.",
    },
    {
      num: "04",
      title: "Train reception on the discovery question",
      body:
        "When booking any whitening enquiry: 'Is there a date you're working toward?' If yes, slot them into the plan and lock in the discount.",
    },
    {
      num: "05",
      title: "Convert to membership at follow-up",
      body:
        "At the post-event polish, offer the Cosmetic Maintenance membership. Patients who loved their result roll into the plan around 40 to 50% of the time.",
    },
  ],

  /* ─── All-on-X ─── */

  "all-on-x-financing": [
    {
      num: "01",
      title: "Build the All-on-X plan template",
      body:
        "Payment Plans → New Template. 25% deposit (Payment Hold, refundable until surgery date). Balance over 12 to 24 monthly instalments, $0 interest.",
    },
    {
      num: "02",
      title: "Configure the refund rule clearly",
      body:
        "If the patient cancels before surgery, the deposit refunds in full. State this in the agreement copy patients sign. It removes the biggest psychological barrier to a 5-figure commitment.",
    },
    {
      num: "03",
      title: "Issue at the records appointment, not the consult",
      body:
        "The plan signature comes at the records visit, after the CBCT and prosthetic mock-up. Patients are most committed at this point; the case is real to them.",
    },
    {
      num: "04",
      title: "Pair with a 24-month follow-up cadence",
      body:
        "Set up a 24-month post-op care email cadence in your CRM. Triggered emails at 1 week, 1 month, 3 months, 6 months and 12 months keep the patient engaged and create natural review-request moments along the way.",
    },
    {
      num: "05",
      title: "Measure consult-to-surgery conversion",
      body:
        "Reports → Conversion, filtered to All-on-X. Industry baseline: 15 to 25%. Practices running this playbook regularly hit 35 to 45%.",
    },
  ],

  "implant-maintenance-membership": [
    {
      num: "01",
      title: "Build an 'Implant Maintenance' membership",
      body:
        "Membership Builder, $65 to $90 per month. Inclusions: 2 specialised hygiene visits per year (40-minute appointments), annual peri-implantitis screening, x-ray check, 10% off prosthetic repairs.",
    },
    {
      num: "02",
      title: "Issue at the surgery-completion appointment",
      body:
        "The final-fit appointment is the moment. Patients have just received a $30k+ result and want to protect it. Sign the maintenance plan on the spot.",
    },
    {
      num: "03",
      title: "Bundle with a warranty registration",
      body:
        "Pair the plan signature with formal registration of the implant warranty. The maintenance plan is the patient's side of the warranty contract.",
    },
    {
      num: "04",
      title: "Position it as a post-surgery offer",
      body:
        "The plan will appear on your public signup page alongside the others, but it's only ever pitched at the surgery-completion appointment. The 'Implant Maintenance' name and the $65 to $90 price point signal clearly that it's for implant patients only. Brief reception never to proactively offer it outside that cohort.",
    },
    {
      num: "05",
      title: "Track 10-year retention",
      body:
        "Set up a long-cohort report. The goal is to keep implant patients on the plan for the lifetime of the implant. Each retained patient is $700 to $1,000 per year of recurring revenue.",
    },
  ],

  /* ─── Kids ─── */

  "kids-only-membership": [
    {
      num: "01",
      title: "Build a 'Kids Plan' in Membership Builder",
      body:
        "Set age cap at 16. Inclusions: 2 cleans, 2 exams, 2 fluoride, free emergency visit. Price 30 to 40% below the adult equivalent ($15 to $25 per month).",
    },
    {
      num: "02",
      title: "Enable family-of-kids logic",
      body:
        "When a parent signs up two or more kids, the second and third child get an additional 10% off. Configure this on the plan, not via Dependent Program.",
    },
    {
      num: "03",
      title: "Promote at school-holiday campaigns",
      body:
        "A fortnight before each school break, send a kids-plan email to your family-list segment from your own CRM. Position the plan as the way to fit dental visits around school terms. Pair the email with social posts using the Family Plan brochure from the Promotional Material library.",
    },
    {
      num: "04",
      title: "Pair with adult membership at signup",
      body:
        "When a parent enrols, the signup form prompts: 'Add your kids?' Family conversion compounds; a 4-person household at adult+kids rates is $80 to $100 per month of recurring revenue.",
    },
    {
      num: "05",
      title: "Track kid-to-adult conversion at 16+",
      body:
        "When a kid ages out of the plan, your CRM can auto-trigger a transition email offering the adult Comprehensive plan. Use Reports → Cohorts → Kids Aging Out to identify the segment to target. Aim for 50%+ conversion.",
    },
  ],

  "family-bundles-back-to-school": [
    {
      num: "01",
      title: "Create the BACKTOSCHOOL promo code",
      body:
        "Settings → Promo Code List → New. Code: BACKTOSCHOOL. Discount: First month free on the Family Plan. Expires 28 February. Redemption cap as you choose.",
    },
    {
      num: "02",
      title: "Replicate for the mid-year run",
      body:
        "Create a matching MIDYEAR code with the same mechanics. Expires 31 July. Two campaigns per year, both built once, both auto-promoted.",
    },
    {
      num: "03",
      title: "Schedule the campaign emails in your CRM",
      body:
        "In your CRM or email tool, schedule the BACKTOSCHOOL email for 15 January and the MIDYEAR email for 15 June. Set them as recurring annual sends. Built once, both auto-promote forever.",
    },
    {
      num: "04",
      title: "Use signage and reception scripts during the window",
      body:
        "Print the campaign flyer from Marketing → Marketing Shop. Stack at reception. Train staff to mention 'School holiday family offer' at every adult appointment.",
    },
    {
      num: "05",
      title: "Track campaign attribution",
      body:
        "Reports → Promo Code Performance. Compare BACKTOSCHOOL and MIDYEAR redemptions year on year. Tune the discount level if you need more volume.",
    },
  ],

  /* ─── Emergency ─── */

  "emergency-safety-net": [
    {
      num: "01",
      title: "Build the Emergency Safety-Net plan",
      body:
        "Membership Builder, $12 to $18 per month. Inclusions: 2 emergency visits per year, 15% off all repairs, free same-day triage call. No preventive care included.",
    },
    {
      num: "02",
      title: "Position it for fee-for-service patients who refuse memberships",
      body:
        "The pitch: 'You don't want a full membership, fair enough. But for the cost of a coffee a month, the next time something breaks at 11pm on a Sunday, you're not paying the after-hours emergency rate.'",
    },
    {
      num: "03",
      title: "Trigger the offer in emergency follow-ups",
      body:
        "In your CRM, set up an automated email triggered 7 days after any emergency visit, offering the Emergency Safety-Net plan. Recovery rate on this email is high because the patient just experienced the exact pain point the plan covers.",
    },
    {
      num: "04",
      title: "Make it the closing offer of every after-hours call",
      body:
        "When the on-call dentist takes an after-hours call, the script ends with: 'We have an Emergency Safety-Net plan that would have covered tonight's call-out. Want me to send you the details?'",
    },
    {
      num: "05",
      title: "Watch attach rate post-emergency",
      body:
        "Reports → Emergency Follow-Up Conversion. Target: 15 to 25% of patients who attend an emergency visit attach to the plan within 14 days.",
    },
  ],
};

/** Find the setup checklist for a strategy by slug. */
export function getStrategySetup(slug: string): SetupStep[] | undefined {
  return STRATEGY_SETUPS[slug];
}
