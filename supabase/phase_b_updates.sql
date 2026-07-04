-- =========================================================================
-- Phase B — batch 1 (collected 2026-07-05)
-- 2026/27 bando figures + agency registry corrections.
-- Run AFTER schema.sql + seed.sql, in the Supabase SQL Editor.
--
-- Headline findings this batch:
--   * Three 2026/27 bandi are LIVE: ER.GO (deadline 24 Aug), DiSCo Lazio
--     (22 Jul!), ERSU Palermo (22 Jul!).
--   * Regional ISEE ceilings genuinely differ (Puglia €26,000 vs national
--     max €27,948.60 in 25/26) — the national decree value is a CAP, not
--     a uniform threshold.
--   * FVG agency is ARDISS (two esses), not ARDIS.
-- =========================================================================

-- ---- new sources -----------------------------------------------------------

insert into sources (id, url, title, publisher, doc_type, notes) values
  ('00000000-0000-0000-0000-000000000008',
   'https://www.er-go.it/cosa-fare-per/bandi-di-concorso/leggi-il-bando',
   'ER.GO — Bando 2026/27 (leggi il bando)', 'ER.GO', 'agency_page',
   'Official bando page, 2026/27 live. Window 23 Jun–24 Aug 2026 (matricole), renewals by 6 Aug.'),
  ('00000000-0000-0000-0000-000000000009',
   'https://www.studenti.it/borse-di-studio-2026-27-emilia-romagna-bando-requisiti-e-scadenze.html',
   'Borse di studio 2026-27 Emilia-Romagna (secondary)', 'Studenti.it', 'news',
   'Reports ER.GO 2026/27 max amounts: fuori sede €7,171.11, pendolare €4,190.71, in sede €2,890.16 (+1.4%). NOTE: these equal the reported national minimums +1.4% exactly — possible year-shift in one source; confirm against bando PDF.'),
  ('00000000-0000-0000-0000-000000000010',
   'https://laziodisco.it/bando-diritto-allo-studio-2026-2027/',
   'DiSCo Lazio — Bando diritto allo studio 2026/2027', 'DiSCo Lazio', 'agency_page',
   'Official 2026/27 bando page, live. Phase 1: 10 Jun–22 Jul 2026 12:00. Phase 2 (corrections only): 29 Jul–11 Aug 2026. Has a dedicated international-students FAQ.'),
  ('00000000-0000-0000-0000-000000000011',
   'https://www.ersupalermo.it/category/borse-di-studio/',
   'ERSU Palermo — Borse di studio (bando 2026/27)', 'ERSU Palermo', 'agency_page',
   '2026/27 application window: 5 Jun 2026 – 22 Jul 2026 14:00, online only.'),
  ('00000000-0000-0000-0000-000000000012',
   'https://adisupuglia.it/area_letturaNotizia/570028/pagsistema.html',
   'ADISU Puglia — Bando Benefici e Servizi 2025/2026', 'ADISU Puglia', 'agency_page',
   '2025/26 baseline: window 15 Jul–19 Aug 2025 12:00; ISEE ceiling €26,000 / ISPE €56,000 per DGR Puglia n.831 19-06-2025. PROVES regional ceilings can sit below the national cap.'),
  ('00000000-0000-0000-0000-000000000013',
   'https://www.unipd.it/borse-studio-regionali',
   'UniPD — Borse di studio regionali (ESU Padova)', 'Università di Padova', 'agency_page',
   '2025/26 baseline for Veneto: ISEE < €26,306.25, ISPE < €42,530.50. 2026/27 expected Aug; deadlines traditionally 20–30 Aug.'),
  ('00000000-0000-0000-0000-000000000014',
   'https://www.adisurcampania.it/notizie/approvazione-bando-di-concorso-20252026',
   'ADISURC — Approvazione bando 2025/2026', 'ADISURC', 'agency_page',
   '2025/26 baseline: deadline 18 Sep 2025 12:00. 2026/27 expected ~Aug 2026.'),
  ('00000000-0000-0000-0000-000000000015',
   'https://www.edisu.piemonte.it/',
   'EDISU Piemonte (site + scadenziario)', 'EDISU Piemonte', 'agency_page',
   '2025/26 baseline: deadline 9 Sep 2025 12:00. 2026/27 bando expected late July. Regional budget for scholarships doubled 13.2→27 M€ in 25/26.'),
  ('00000000-0000-0000-0000-000000000016',
   'https://www.adisu.umbria.it/',
   'ADiSU Umbria — official site', 'ADiSU Umbria', 'agency_page',
   'Official portal confirmed (Via Benedetta 14, Perugia). Applications via SPID in Area Studenti.');

-- ---- agency registry corrections + verifications -----------------------------

-- FVG: correct name and URL (ARDISS, not ARDIS)
update agencies set
  name = 'ARDISS',
  official_name = 'Agenzia Regionale per il Diritto allo Studio — Friuli Venezia Giulia',
  website_url = 'https://www.ardiss.fvg.it',
  verification_status = 'verified',
  verified_at = now(),
  notes = 'Name corrected from ARDIS: it is ARDISS (double s). Domain confirmed live 2026-07-05.'
where name = 'ARDIS';

-- ERSU Sassari: URL works without www
update agencies set
  website_url = 'https://ersusassari.it',
  notes = coalesce(notes,'') || ' Domain confirmed live 2026-07-05 (no-www form).'
where name = 'ERSU Sassari';

-- Bodies verified this batch (site + role confirmed via search)
update agencies set verification_status = 'verified', verified_at = now(),
  bando_page_url = 'https://www.er-go.it/cosa-fare-per/bandi-di-concorso/leggi-il-bando'
where name = 'ER.GO';

update agencies set verification_status = 'verified', verified_at = now(),
  bando_page_url = 'https://laziodisco.it/bando-diritto-allo-studio-2026-2027/'
where name = 'DiSCo Lazio';

update agencies set verification_status = 'verified', verified_at = now(),
  bando_page_url = 'https://www.ersupalermo.it/category/borse-di-studio/'
where name = 'ERSU Palermo';

update agencies set verification_status = 'verified', verified_at = now(),
  bando_page_url = 'https://adisupuglia.it/pagina106703_borse-di-studio.html/'
where name = 'ADISU Puglia';

update agencies set verification_status = 'verified', verified_at = now()
where name in ('EDISU Piemonte', 'ESU Padova', 'ADISURC', 'ADiSU Umbria');

-- Domain-liveness only (curl 200 on 2026-07-05); body/role still to confirm
update agencies set notes = coalesce(notes,'') || ' Domain live 2026-07-05.'
where name in ('Opera Universitaria di Trento','ESU Venezia','ESU Verona','ALiSEO',
               'ERDIS Marche','ADSU L''Aquila','ARDSU Basilicata','ERSU Catania',
               'ERSU Messina','ERSU Enna','ERSU Cagliari');

-- ---- 2026/27 bando figures ------------------------------------------------------

-- ER.GO: amounts + window VERIFIED (against secondary reporting of the live bando)
insert into region_year_figures (
  agency_id, academic_year_id,
  award_fuori_sede, award_pendolare, award_in_sede,
  application_opens_on, application_deadline,
  bando_url, source_id, verification_status, verified_at, notes
)
select a.id, y.id,
       7171.11, 4190.71, 2890.16,
       '2026-06-23', '2026-08-24',
       'https://www.er-go.it/cosa-fare-per/bandi-di-concorso/leggi-il-bando',
       '00000000-0000-0000-0000-000000000009', 'verified', now(),
       'Max amounts (+1.4% vs 25/26). Deadline 24 Aug 16:00 is for matricole; renewals/anni successivi close 6 Aug 2026. Figures from studenti.it reporting the live bando — cross-check the bando PDF itself for the ISEE ceiling ER.GO adopts, then archive the PDF.'
from agencies a, academic_years y
where a.name = 'ER.GO' and y.label = '2026/27';

-- DiSCo Lazio: window VERIFIED, amounts not yet extracted
insert into region_year_figures (
  agency_id, academic_year_id,
  application_opens_on, application_deadline,
  bando_url, source_id, verification_status, verified_at, notes
)
select a.id, y.id,
       '2026-06-10', '2026-07-22',
       'https://laziodisco.it/bando-diritto-allo-studio-2026-2027/',
       '00000000-0000-0000-0000-000000000010', 'verified', now(),
       'Phase 1 closes 22 Jul 2026 12:00 (hard deadline — corrections-only phase follows 29 Jul–11 Aug). Award amounts and ceilings still to extract from the bando PDF.'
from agencies a, academic_years y
where a.name = 'DiSCo Lazio' and y.label = '2026/27';

-- ERSU Palermo: window VERIFIED, amounts not yet extracted
insert into region_year_figures (
  agency_id, academic_year_id,
  application_opens_on, application_deadline,
  bando_url, source_id, verification_status, verified_at, notes
)
select a.id, y.id,
       '2026-06-05', '2026-07-22',
       'https://www.ersupalermo.it/category/borse-di-studio/',
       '00000000-0000-0000-0000-000000000011', 'verified', now(),
       'Closes 22 Jul 2026 14:00, online only. Award amounts and ceilings still to extract from the bando.'
from agencies a, academic_years y
where a.name = 'ERSU Palermo' and y.label = '2026/27';

-- ---- 2025/26 baselines (proof of regional ceiling variation) ---------------------

insert into region_year_figures (
  agency_id, academic_year_id, isee_ceiling, ispe_ceiling,
  application_opens_on, application_deadline,
  source_id, verification_status, verified_at, notes
)
select a.id, y.id, 26000.00, 56000.00,
       '2025-07-15', '2025-08-19',
       '00000000-0000-0000-0000-000000000012', 'verified', now(),
       'Per DGR Puglia n.831 del 19-06-2025. Ceiling sits BELOW the national cap — key evidence that ceilings vary by region.'
from agencies a, academic_years y
where a.name = 'ADISU Puglia' and y.label = '2025/26';

insert into region_year_figures (
  agency_id, academic_year_id, isee_ceiling, ispe_ceiling,
  source_id, verification_status, verified_at, notes
)
select a.id, y.id, 26306.25, 42530.50,
       '00000000-0000-0000-0000-000000000013', 'verified', now(),
       'Veneto 25/26 (via UniPD). Note the unusually low ISPE ceiling. Also explains the €26,306.25 figure previously marked conflicting at national level — it is a regional ceiling, not the national one.'
from agencies a, academic_years y
where a.name = 'ESU Padova' and y.label = '2025/26';

-- ---- deadlines (drives calendar + reminder emails) --------------------------------

insert into deadlines (agency_id, academic_year_id, label, due_on, url, source_id, notes)
select a.id, y.id, d.label, d.due_on::date, d.url, d.source_id::uuid, d.notes
from (values
  ('DiSCo Lazio',  '2026/27', 'DiSCo Lazio bando closes (phase 1, 12:00)', '2026-07-22', 'https://laziodisco.it/bando-diritto-allo-studio-2026-2027/', '00000000-0000-0000-0000-000000000010', 'Hard deadline; only corrections allowed afterwards.'),
  ('ERSU Palermo', '2026/27', 'ERSU Palermo bando closes (14:00)',          '2026-07-22', 'https://www.ersupalermo.it/category/borse-di-studio/',       '00000000-0000-0000-0000-000000000011', null),
  ('ER.GO',        '2026/27', 'ER.GO renewals close',                        '2026-08-06', 'https://www.er-go.it/cosa-fare-per/bandi-di-concorso/leggi-il-bando', '00000000-0000-0000-0000-000000000008', 'Students already in the system / anni successivi.'),
  ('ER.GO',        '2026/27', 'ER.GO bando closes for matricole (16:00)',    '2026-08-24', 'https://www.er-go.it/cosa-fare-per/bandi-di-concorso/leggi-il-bando', '00000000-0000-0000-0000-000000000008', null)
) as d(agency_name, year_label, label, due_on, url, source_id, notes)
join agencies a on a.name = d.agency_name
join academic_years y on y.label = d.year_label;

-- ---- national framework: clarify ceiling semantics ---------------------------------

update programme_years py set notes = coalesce(py.notes,'') ||
  ' CLARIFIED 2026-07-05: the decree ISEE/ISPE values are NATIONAL CAPS; regions may adopt lower ceilings (Puglia 25/26: €26,000; Veneto 25/26: €26,306.25). Site copy must say "up to €X depending on region".'
from programmes p
where py.programme_id = p.id and p.slug = 'italy-dsu';
