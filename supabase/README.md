# The dataset (Phase A)

This folder is the source of truth for the Just Wanna Leave dataset — the thing
the whole site exists to serve. Schema and seeds are versioned here; the live
database is Supabase.

## Apply

1. Create a project at [supabase.com](https://supabase.com) → SQL Editor
2. Run `schema.sql`, then `seed.sql`
3. Put the project URL + anon key in `.env.local`
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

RLS is on: public can read everything, writes require the service role key
(admin pipeline only — never expose it client-side).

## The model in one paragraph

Every figure is scoped to an **academic year** and points to a **source** row
(URL + retrieved date + archived copy). National decree values live in
`programme_years`; what each agency's bando actually says lives in
`region_year_figures`; funding outcomes (*idonei* vs *beneficiari* — the
"odds" on the map) live in `region_year_outcomes` because they publish a year
late. `agencies` is the registry of the ~28 bodies that actually administer
DSU — not "20 regions": Sicily has four ERSUs, Veneto three ESUs, Abruzzo
three ADSUs, and Lombardy delegates to individual universities.

## Verification conventions

Every row that a human must check has a `verification_status`:

| status | meaning |
|---|---|
| `verified` | checked against the **primary** document (bando PDF, decree) |
| `unverified` | from a secondary source or registry knowledge — usable internally, **must not render on the public site** |
| `conflicting` | two sources disagree; see `notes` for both values |
| `stale` | was verified for a past year; new bando may have superseded it |

The site should only render rows with `verification_status = 'verified'`.

## What's in the seed (collected 2026-07-04)

- 6 countries, 20 Italian regions, the DSU programme, years 2025/26 + 2026/27
- **National framework 2026/27** (from secondary reports of DD 175/2026 +
  DD 176/2026): ISEE ceiling €28,339.88, ISPE €61,608.48; minimum awards
  fuori sede €7,072.10 / pendolare €4,132.85 / in sede €2,850.26 — status
  `unverified` until checked against the decree PDFs on mur.gov.it
- **2025/26** ISEE/ISPE marked `conflicting` (sources disagree:
  €27,948.60 vs €26,306.25) — deliberately kept as an example of why this
  pipeline exists
- **28 agencies** across all 20 regions; 3 confirmed today (DSU Toscana,
  Lombardy's per-university model, ADISURC Campania), the rest flagged
  `unverified` for the Phase B pass against the
  [ANDISU registry](https://www.andisu.it/homepage/enti-organismi-del-dsu/)

## Phase B checklist (per agency)

1. Confirm the body still exists under that name (ANDISU list)
2. Find the 2026/27 bando page → fill `bando_page_url`
3. Download + archive the bando PDF → `sources.archived_path`
4. Extract into `region_year_figures`: ceilings, three award amounts,
   `includes_meals`/`includes_housing`, application window
5. Find the latest *graduatorie*/transparency stats → `region_year_outcomes`
6. Set `verified_at`, flip status to `verified`

Key national outcome source: [USTAT](https://ustat.mur.gov.it/) (MUR
statistics office). The bandi mostly publish June–July with deadlines
August–September — **collection window is open now.**

## Known open questions

- Resolve the 2025/26 ISEE ceiling conflict (likely €27,948.60; €26,306.25
  looks like an outdated LEP value)
- Molise and Calabria administration models unconfirmed
- Alto Adige (Bolzano) office needs its own agency row
- The 15% low-ISEE supplement rule needs the exact decree wording
- ISEE parificato procedure for US applicants — deserves its own research
  doc; it's the #1 practical question for the target audience
