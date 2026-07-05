# Just Wanna Leave — Roadmap

_Last updated: 5 July 2026. The sequencing is driven by one seasonal fact: the
2026/27 Italian bando cycle is happening **right now** (deadlines July–September
2026). Data collection and the deadline service are time-sensitive; tools and
expansion are not._

**North star:** the honest, verified reference for studying abroad on a
government's dime — a data operation with a warm editorial face. Every phase
below either deepens the dataset, keeps a promise the UI currently breaks, or
adds a surface users return to.

---

## Phase 0 — Stop breaking promises (this week)

_The UX audit found the site making promises its plumbing doesn't keep. These
are small fixes with outsized trust impact._

- [ ] **Persist signups** — subscribe API writes to a Supabase `subscribers`
      table immediately (emails are currently lost in production)
- [ ] **Resend live** — account, domain verification (Cloudflare DNS), audience;
      real welcome email
- [ ] **Real mobile menu** — burger opens a menu (it currently navigates);
      mobile users have no nav at all on a mobile-first product
- [ ] **Honest guide cards** — fallback cards labeled as upcoming, no fake
      "Updated May 2026" metadata for articles that don't exist
- [ ] **Map on mobile** — scroll detail panel into view on region tap; fix the
      "←" hint that points the wrong way on stacked layout
- [ ] **Dead affordances** — remove hover-lift from unclickable country cards
- [ ] **Legal pages** — /privacy and /disclaimer (required: the form collects
      emails on a public domain); footer links point at real pages
- [ ] **Comprehension quick wins** — inline gloss for ISEE ("Italy's household
      means-test — think FAFSA") and bando on first use; "(in Italian ↗)" on
      external agency links
- [ ] **A11y sweep** — :focus-visible on map regions, prefers-reduced-motion,
      contrast check on fine print

**Gate:** a stranger on a phone can navigate, understand ISEE, sign up, and
actually be stored + welcomed.

## Phase 1 — From landing page to reference site (July)

_The audience arrives from search/social needing specific answers; today every
link points at one page. Build the deep surfaces._

- [ ] **/italy** — the map as a destination page, deep-linkable
- [ ] **/italy/[region]** — 20 region pages: agencies, verified 2026/27 figures,
      last-year reference timing, region-specific FAQ, verified stamps
- [ ] **/deadlines** — calendar of every verified deadline, grouped by month
- [ ] **Contextual signup** — "get one email when [Puglia]'s bando drops" on
      region pages + panels; subscriber tags (country/region) for segmentation
- [ ] **Homepage re-wiring** — map section links to /italy; deadline strip links
      to /deadlines

**Gate:** every region shareable by URL; signups carry intent tags; 25+
indexable pages.

## Phase 2 — Content engine (July–August)

- [ ] **Sanity project live** (env vars, studio works, guides render end to end)
- [ ] **The five core guides written for real** — DSU explainer, region odds,
      living on the stipend in Pisa, MEXT, Germany real costs — with figures
      pulled live from the DB so they can't rot
- [ ] **The ISEE parificato explainer** — how a US family's income actually gets
      assessed; no good English resource exists (killer content)
- [ ] **Real stories** — recruit 2–3 actual DSU/MEXT recipients (Reddit
      r/studyabroad, expat Discords); until then, label current testimonials as
      illustrative composites
- [ ] **SEO plumbing** — article structured data, OG images, internal linking
      region pages ↔ guides

**Gate:** five guides a skeptical Redditor would upvote; zero fictional content
presented as real.

## Phase 3 — Data operations (parallel, through September)

_The annual verification cycle is the business. This season is the proof run._

- [ ] **Service-role write path** so research updates apply directly (no more
      SQL copy-paste), with the verified-only rendering rule unchanged
- [ ] **Catch the wave** — Toscana, Puglia, EDISU Piemonte, Campania, Veneto,
      ESU Molise + remaining regions as their 2026/27 bandi publish; extract
      amounts from the live Lazio/Palermo bandi; archive every PDF
- [ ] **Bando watcher** — weekly Vercel cron diffs the ~28 bando pages, flags
      changes for review (this automates "we'll tell you when it changes")
- [ ] **Outcomes data** — idonei vs beneficiari from USTAT/regional reports →
      the map gets its real "odds" layer, honestly year-labeled
- [ ] **Registry completion** — resolve Calabria, Valle d'Aosta, Bolzano
- [ ] **First reminder emails sent** — deadline reminders to tagged subscribers
      this season; the service exists once the first email lands

**Gate:** 15+ regions verified for 2026/27; watcher running; at least one
reminder campaign delivered.

## Phase 4 — The tools (September–October)

- [ ] **Eligibility checker v1** — nationality, degree level, household income →
      programmes you'd plausibly qualify for, with the ISEE translation ("$52k
      in Ohio → likely under Emilia-Romagna's ceiling")
- [ ] **Checker becomes the hero CTA** — homepage re-weighted around the
      personalized hook
- [ ] **Cost comparator** — the hero receipt made real: your state school vs a
      chosen route, four-year delta
- [ ] **Region comparison** — two regions side by side

**Gate:** a visitor gets a personal answer in under two minutes.

## Phase 5 — Expansion & growth (Q4 2026 →)

- [ ] **Germany dataset + country page** (small, well-documented: blocked
      account, semester fees, DAAD)
- [ ] **Japan/MEXT** content ready by early 2027 (embassy cycle opens ~April)
- [ ] **Programmatic SEO** — city/university cost pages from the DB
- [ ] **Analytics** (Plausible or GA4) + search console; measure which regions/
      guides pull traffic, double down
- [ ] **Monetization experiments** — only after the list is real: application
      playbook, affiliate (Wise, translation services). The list is the asset;
      trust is the moat — nothing that sells the user.

## Standing rules (all phases)

1. **Nothing unverified renders.** The `verification_status='verified'` gate is
   structural, never bypassed for launch pressure.
2. **Every figure has a source and a date** visible to the user.
3. **Mobile first in fact, not in claim** — every new surface is designed at
   375px before desktop.
4. **The annual refresh must get cheaper every cycle** — tooling investments
   (watcher, admin review, extraction) are always in-scope.
