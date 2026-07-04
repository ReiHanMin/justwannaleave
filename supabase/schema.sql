-- =========================================================================
-- Just Wanna Leave — core dataset schema
-- Phase A: the data model that makes every figure on the site traceable
-- to a primary source, versioned by academic year.
--
-- Design principles:
--   1. No figure without a source. Every numeric row references `sources`.
--   2. Academic year is first-class. A new bando year = new rows, never edits.
--   3. Awards are per housing status (fuori sede / pendolare / in sede) —
--      there is no such thing as "the" DSU stipend amount.
--   4. Outcomes (idonei vs beneficiari) lag a year and live in their own
--      table so the map can label its data year honestly.
--   5. verification_status + verified_at on everything a human must check.
-- =========================================================================

-- ---- enums ---------------------------------------------------------------

create type verification_status as enum ('verified', 'unverified', 'stale', 'conflicting');
create type source_doc_type as enum ('bando_pdf', 'ministerial_decree', 'stats_page', 'registry', 'agency_page', 'news', 'other');
create type programme_type as enum ('grant', 'tuition_waiver', 'scholarship', 'salaried_position', 'low_tuition');
create type agency_scope as enum ('region', 'province', 'university', 'city');

-- ---- provenance ----------------------------------------------------------

create table sources (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  title text,
  publisher text,                      -- e.g. 'MUR', 'ER.GO', 'ANDISU'
  doc_type source_doc_type not null default 'other',
  retrieved_at timestamptz not null default now(),
  archived_path text,                  -- storage path of archived PDF/HTML copy
  notes text
);

-- ---- geography -----------------------------------------------------------

create table countries (
  code char(2) primary key,            -- ISO 3166-1 alpha-2
  name text not null,
  slug text not null unique
);

create table regions (
  id uuid primary key default gen_random_uuid(),
  country_code char(2) not null references countries(code),
  code text not null,                  -- e.g. 'EMR' (matches the map ids)
  name text not null,                  -- 'Emilia-Romagna'
  slug text not null,
  unique (country_code, code)
);

-- ---- administering bodies --------------------------------------------------
-- DSU is not "20 regions": Sicily has 4 ERSUs, Veneto 3 ESUs, Abruzzo 3 ADSUs,
-- Lombardy delegates to universities. `scope` captures this.

create table agencies (
  id uuid primary key default gen_random_uuid(),
  region_id uuid not null references regions(id),
  name text not null,                  -- 'ER.GO'
  official_name text,                  -- 'Azienda Regionale per il Diritto agli Studi Superiori'
  scope agency_scope not null default 'region',
  covers text,                         -- universities/cities covered, free text
  website_url text,
  bando_page_url text,                 -- page where the annual bando is published
  stats_page_url text,                 -- graduatorie / transparency page
  verification_status verification_status not null default 'unverified',
  verified_at timestamptz,
  registry_source_id uuid references sources(id),
  notes text
);

-- ---- programmes ------------------------------------------------------------

create table programmes (
  id uuid primary key default gen_random_uuid(),
  country_code char(2) not null references countries(code),
  slug text not null unique,           -- 'italy-dsu'
  name text not null,                  -- 'DSU regional scholarship (borsa di studio)'
  type programme_type not null,
  administered_by text,                -- 'regional agencies' | 'national government' | ...
  summary text,
  legal_basis text                     -- 'd.lgs 68/2012, DPCM 9/4/2001'
);

create table academic_years (
  id uuid primary key default gen_random_uuid(),
  label text not null unique,          -- '2026/27'
  starts_on date,
  ends_on date
);

-- ---- national framework values per programme/year --------------------------
-- For Italy: the ministerial decree sets NATIONAL minimums and the NATIONAL
-- ISEE/ISPE ceilings. Regions may pay more, never less; ceilings are uniform.

create table programme_years (
  id uuid primary key default gen_random_uuid(),
  programme_id uuid not null references programmes(id),
  academic_year_id uuid not null references academic_years(id),
  isee_ceiling numeric(10,2),
  ispe_ceiling numeric(10,2),
  min_award_fuori_sede numeric(10,2),
  min_award_pendolare numeric(10,2),
  min_award_in_sede numeric(10,2),
  low_isee_supplement_pct numeric(5,2),  -- e.g. 15.00 (% top-up below half-ceiling)
  decree_reference text,               -- 'DD 175/2026, DD 176/2026'
  source_id uuid references sources(id),
  verification_status verification_status not null default 'unverified',
  verified_at timestamptz,
  notes text,
  unique (programme_id, academic_year_id)
);

-- ---- per-agency, per-year bando figures -------------------------------------
-- What each agency's bando actually says: actual award amounts (can exceed the
-- national minimum), application window, and where the bando lives.

create table region_year_figures (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id),
  academic_year_id uuid not null references academic_years(id),
  isee_ceiling numeric(10,2),          -- normally = national; record what the bando says
  ispe_ceiling numeric(10,2),
  award_fuori_sede numeric(10,2),
  award_pendolare numeric(10,2),
  award_in_sede numeric(10,2),
  includes_meals boolean,              -- some agencies bundle mensa; affects comparability
  includes_housing boolean,            -- some deduct if a residence place is assigned
  application_opens_on date,
  application_deadline date,
  bando_url text,
  bando_archived_path text,
  source_id uuid references sources(id),
  verification_status verification_status not null default 'unverified',
  verified_at timestamptz,
  notes text,
  unique (agency_id, academic_year_id)
);

-- ---- outcomes: the odds ------------------------------------------------------
-- idonei = passed the means test; beneficiari = actually paid.
-- These publish AFTER the year starts; the site must display the data year.

create table region_year_outcomes (
  id uuid primary key default gen_random_uuid(),
  region_id uuid not null references regions(id),
  academic_year_id uuid not null references academic_years(id),
  applicants integer,
  idonei integer,
  beneficiari integer,
  pct_funded numeric(5,2) generated always as (
    case when idonei > 0 then round(beneficiari::numeric * 100 / idonei, 2) end
  ) stored,
  source_id uuid references sources(id),
  verification_status verification_status not null default 'unverified',
  verified_at timestamptz,
  notes text,
  unique (region_id, academic_year_id)
);

-- ---- deadlines (drives the calendar + reminder emails) ----------------------

create table deadlines (
  id uuid primary key default gen_random_uuid(),
  programme_id uuid references programmes(id),
  agency_id uuid references agencies(id),
  academic_year_id uuid references academic_years(id),
  label text not null,                 -- 'ER.GO bando closes'
  due_on date not null,
  url text,
  source_id uuid references sources(id),
  notes text
);

-- ---- indexes ----------------------------------------------------------------

create index idx_agencies_region on agencies(region_id);
create index idx_ryf_agency_year on region_year_figures(agency_id, academic_year_id);
create index idx_ryo_region_year on region_year_outcomes(region_id, academic_year_id);
create index idx_deadlines_due on deadlines(due_on);

-- ---- row-level security -------------------------------------------------------
-- Public site reads everything; writes only via service role (admin/pipeline).

alter table sources enable row level security;
alter table countries enable row level security;
alter table regions enable row level security;
alter table agencies enable row level security;
alter table programmes enable row level security;
alter table academic_years enable row level security;
alter table programme_years enable row level security;
alter table region_year_figures enable row level security;
alter table region_year_outcomes enable row level security;
alter table deadlines enable row level security;

create policy "public read" on sources for select using (true);
create policy "public read" on countries for select using (true);
create policy "public read" on regions for select using (true);
create policy "public read" on agencies for select using (true);
create policy "public read" on programmes for select using (true);
create policy "public read" on academic_years for select using (true);
create policy "public read" on programme_years for select using (true);
create policy "public read" on region_year_figures for select using (true);
create policy "public read" on region_year_outcomes for select using (true);
create policy "public read" on deadlines for select using (true);
