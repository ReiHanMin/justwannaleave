-- =========================================================================
-- Just Wanna Leave — Phase A seed data
-- Collected 2026-07-04. Every figure carries a source row and an honest
-- verification_status. 'unverified' = from secondary sources or domain
-- knowledge, must be checked against the primary document in Phase B.
-- =========================================================================

-- ---- sources (provenance for everything below) ----------------------------

insert into sources (id, url, title, publisher, doc_type, notes) values
  ('00000000-0000-0000-0000-000000000001',
   'https://www.andisu.it/homepage/enti-organismi-del-dsu/',
   'ANDISU — Enti/organismi del DSU (member registry)',
   'ANDISU', 'registry',
   'National association of DSU bodies; associates ~95% of agencies. Canonical cross-check for the agency registry.'),
  ('00000000-0000-0000-0000-000000000002',
   'https://ustat.mur.gov.it/attivit%C3%A0/diritto-allo-studio-regionale-e-collegi-di-merito/',
   'USTAT — Diritto allo studio regionale (statistics portal)',
   'MUR / USTAT', 'stats_page',
   'Primary national source for idonei/beneficiari outcome statistics.'),
  ('00000000-0000-0000-0000-000000000003',
   'https://www.mur.gov.it/it/news/giovedi-20032025/universita-aumentano-gli-importi-delle-borse-di-studio-gli-studenti',
   'MUR news — increased scholarship amounts',
   'MUR', 'news',
   'Ministry announcement of updated minimum amounts.'),
  ('00000000-0000-0000-0000-000000000004',
   'https://logicatest.it/universita/universita-borse-di-studio-2026-27-nuovi-importi-e-limiti-isee/',
   'Borse di studio 2026/27: nuovi importi e limiti ISEE',
   'LogicaTest (secondary)', 'news',
   'Reports DD 176/2026 (10 Feb 2026): ISEE max €28,339.88, ISPE max €61,608.48 for 2026/27 (vs €27,948.60 / €60,757.87 in 2025/26). Reports DD 175/2026 minimum awards: fuori sede €7,072.10, pendolare €4,132.85, in sede €2,850.26 (+1.4% vs prior year). MUST be verified against the decree PDFs on mur.gov.it.'),
  ('00000000-0000-0000-0000-000000000005',
   'https://www.universita.it/borse-di-studio-2025-2026-ecco-i-nuovi-limiti-per-isee-e-ispe/',
   'Borse di studio 2025/2026: limiti ISEE e ISPE',
   'Università.it (secondary)', 'news',
   'CONFLICT: quotes ISEE max €26,306.25 for 2025/26 while other sources report €27,948.60. Likely an out-of-date LEP value. Resolve against DD 181 of 28-02-2025.'),
  ('00000000-0000-0000-0000-000000000006',
   'https://www.regione.lombardia.it/wps/portal/istituzionale/HP/DettaglioAvviso/servizi-e-informazioni/cittadini/scuola-universita-e-ricerca/Universita-e-formazione-accademica/dsu-2025-2026/dsu-2025-2026',
   'Regione Lombardia — DSU 2025/2026 criteria',
   'Regione Lombardia', 'agency_page',
   'Confirms Lombardy model: the region sets criteria, individual universities administer the bando (e.g. Polimi, Uninsubria publish their own).'),
  ('00000000-0000-0000-0000-000000000007',
   'https://www.dsu.toscana.it/borsa-di-studio',
   'DSU Toscana — Borsa di studio',
   'ARDSU Toscana', 'agency_page',
   'Confirmed live agency page with the 2025/26 bando.');

-- ---- geography -------------------------------------------------------------

insert into countries (code, name, slug) values
  ('IT', 'Italy', 'italy'),
  ('DE', 'Germany', 'germany'),
  ('JP', 'Japan', 'japan'),
  ('NO', 'Norway', 'norway'),
  ('FR', 'France', 'france'),
  ('TW', 'Taiwan', 'taiwan');

insert into regions (country_code, code, name, slug) values
  ('IT', 'VDA', 'Valle d''Aosta', 'valle-daosta'),
  ('IT', 'PIE', 'Piemonte', 'piemonte'),
  ('IT', 'LOM', 'Lombardia', 'lombardia'),
  ('IT', 'TAA', 'Trentino-Alto Adige', 'trentino-alto-adige'),
  ('IT', 'VEN', 'Veneto', 'veneto'),
  ('IT', 'FVG', 'Friuli-Venezia Giulia', 'friuli-venezia-giulia'),
  ('IT', 'LIG', 'Liguria', 'liguria'),
  ('IT', 'EMR', 'Emilia-Romagna', 'emilia-romagna'),
  ('IT', 'TOS', 'Toscana', 'toscana'),
  ('IT', 'UMB', 'Umbria', 'umbria'),
  ('IT', 'MAR', 'Marche', 'marche'),
  ('IT', 'LAZ', 'Lazio', 'lazio'),
  ('IT', 'ABR', 'Abruzzo', 'abruzzo'),
  ('IT', 'MOL', 'Molise', 'molise'),
  ('IT', 'CAM', 'Campania', 'campania'),
  ('IT', 'PUG', 'Puglia', 'puglia'),
  ('IT', 'BAS', 'Basilicata', 'basilicata'),
  ('IT', 'CAL', 'Calabria', 'calabria'),
  ('IT', 'SIC', 'Sicilia', 'sicilia'),
  ('IT', 'SAR', 'Sardegna', 'sardegna');

-- ---- academic years ----------------------------------------------------------

insert into academic_years (label, starts_on, ends_on) values
  ('2025/26', '2025-09-01', '2026-08-31'),
  ('2026/27', '2026-09-01', '2027-08-31');

-- ---- programme -----------------------------------------------------------------

insert into programmes (country_code, slug, name, type, administered_by, summary, legal_basis) values
  ('IT', 'italy-dsu',
   'DSU — Borsa di studio regionale (regional right-to-study scholarship)',
   'grant',
   'Regional agencies (see agencies table); national minimums and ISEE/ISPE ceilings set annually by ministerial decree',
   'Means-tested grant covering cash + often meals/housing for university students below the national ISEE/ISPE ceilings. Amounts depend on housing status (fuori sede / pendolare / in sede). Open to international students; US applicants need an ISEE parificato.',
   'd.lgs 68/2012; DPCM 9 aprile 2001; annual MUR decrees');

-- ---- national framework values --------------------------------------------------

insert into programme_years (
  programme_id, academic_year_id,
  isee_ceiling, ispe_ceiling,
  min_award_fuori_sede, min_award_pendolare, min_award_in_sede,
  low_isee_supplement_pct, decree_reference, source_id,
  verification_status, notes
)
select p.id, y.id,
       27948.60, 60757.87,
       null, null, null,
       null, 'DD 181 del 28-02-2025', '00000000-0000-0000-0000-000000000004',
       'conflicting',
       'ISEE/ISPE from secondary source. CONFLICT: universita.it reports €26,306.25 ISEE for the same year. 2025/26 award minimums not yet captured (derivable: 2026/27 values are +1.4%). A secondary source reports "up to €8,133" fuori sede for 2025/26, which likely includes the 15% low-ISEE supplement. Resolve all against DD 181/2025 PDF.'
from programmes p, academic_years y
where p.slug = 'italy-dsu' and y.label = '2025/26';

insert into programme_years (
  programme_id, academic_year_id,
  isee_ceiling, ispe_ceiling,
  min_award_fuori_sede, min_award_pendolare, min_award_in_sede,
  low_isee_supplement_pct, decree_reference, source_id,
  verification_status, notes
)
select p.id, y.id,
       28339.88, 61608.48,
       7072.10, 4132.85, 2850.26,
       null, 'DD 175/2026 (amounts); DD 176/2026 del 10-02-2026 (ISEE/ISPE)', '00000000-0000-0000-0000-000000000004',
       'unverified',
       'From secondary source reporting the decrees; +1.4% revaluation vs 2025/26. Verify against decree PDFs on mur.gov.it, then flip to verified. Supplement % for low ISEE to be confirmed from decree text.'
from programmes p, academic_years y
where p.slug = 'italy-dsu' and y.label = '2026/27';

-- ---- agency registry -------------------------------------------------------------
-- The real backbone of the map. One row per administering body.
-- verification_status = 'verified' only where today''s research confirmed the
-- body/URL; everything else is registry knowledge to confirm against ANDISU.

insert into agencies (region_id, name, official_name, scope, covers, website_url, bando_page_url, verification_status, registry_source_id, notes)
select r.id, a.name, a.official_name, a.scope::agency_scope, a.covers, a.website_url, a.bando_page_url, a.vstatus::verification_status, '00000000-0000-0000-0000-000000000001', a.notes
from (values
  -- North
  ('PIE', 'EDISU Piemonte', 'Ente Regionale per il Diritto allo Studio Universitario del Piemonte', 'region', 'All Piedmont universities (Torino, PoliTo, UPO)', 'https://www.edisu.piemonte.it', null, 'unverified', null),
  ('VDA', 'Regione Valle d''Aosta — Ufficio DSU', null, 'region', 'Università della Valle d''Aosta', null, null, 'unverified', 'No standalone agency; DSU handled by a regional office. Confirm current arrangement.'),
  ('LOM', 'Università lombarde (gestione delegata)', null, 'university', 'Each Lombard university runs its own DSU bando under regional criteria', 'https://www.regione.lombardia.it', 'https://www.regione.lombardia.it/wps/portal/istituzionale/HP/DettaglioAvviso/servizi-e-informazioni/cittadini/scuola-universita-e-ricerca/Universita-e-formazione-accademica/dsu-2025-2026/dsu-2025-2026', 'verified', 'CONFIRMED model: region sets criteria (source 6), universities (Polimi, Statale, Bicocca, Uninsubria, Pavia…) publish their own bandi. Data collection must be per-university here.'),
  ('TAA', 'Opera Universitaria di Trento', null, 'province', 'Università di Trento', 'https://www.operauni.tn.it', null, 'unverified', 'Trentino side. Bolzano province handles Alto Adige separately — add second row after confirming its office.'),
  ('VEN', 'ESU Padova', 'Azienda Regionale per il Diritto allo Studio Universitario di Padova', 'city', 'Università di Padova', 'https://www.esu.pd.it', null, 'unverified', null),
  ('VEN', 'ESU Venezia', null, 'city', 'Ca'' Foscari, IUAV', 'https://www.esuvenezia.it', null, 'unverified', null),
  ('VEN', 'ESU Verona', null, 'city', 'Università di Verona', 'https://www.esu.vr.it', null, 'unverified', null),
  ('FVG', 'ARDIS', 'Agenzia Regionale per il Diritto allo Studio — Friuli Venezia Giulia', 'region', 'Trieste, Udine, SISSA', 'https://www.ardis.fvg.it', null, 'unverified', null),
  ('LIG', 'ALiSEO', 'Agenzia Ligure per gli Studenti e l''Orientamento', 'region', 'Università di Genova', 'https://www.aliseo.liguria.it', null, 'unverified', 'Formerly ALFA Liguria.'),
  ('EMR', 'ER.GO', 'Azienda Regionale per il Diritto agli Studi Superiori dell''Emilia-Romagna', 'region', 'Bologna, Modena-Reggio, Parma, Ferrara', 'https://www.er-go.it', null, 'unverified', 'The classic 100%-of-idonei funder; verify claim with outcome data, not folklore.'),
  -- Centre
  ('TOS', 'ARDSU Toscana (DSU Toscana)', 'Azienda Regionale per il Diritto allo Studio Universitario della Toscana', 'region', 'Firenze, Pisa, Siena + AFAM', 'https://www.dsu.toscana.it', 'https://www.dsu.toscana.it/borsa-di-studio', 'verified', 'CONFIRMED live (source 7); 2025/26 bando published on this page.'),
  ('UMB', 'ADiSU Umbria', 'Agenzia per il Diritto allo Studio Universitario dell''Umbria', 'region', 'Perugia, Stranieri di Perugia', 'https://www.adisu.umbria.it', null, 'unverified', null),
  ('MAR', 'ERDIS Marche', 'Ente Regionale per il Diritto allo Studio delle Marche', 'region', 'Ancona, Urbino, Macerata, Camerino', 'https://www.erdis.it', null, 'unverified', null),
  ('LAZ', 'DiSCo Lazio', 'Ente Regionale per il Diritto allo Studio e la promozione della Conoscenza', 'region', 'Sapienza, Tor Vergata, Roma Tre, Cassino, Tuscia + AFAM', 'https://www.laziodisco.it', null, 'unverified', null),
  ('ABR', 'ADSU L''Aquila', null, 'city', 'Università dell''Aquila', 'https://www.adsuaq.org', null, 'unverified', 'Abruzzo has three ADSUs; confirm each.'),
  ('ABR', 'ADSU Teramo', null, 'city', 'Università di Teramo', null, null, 'unverified', null),
  ('ABR', 'ADSU Chieti-Pescara', null, 'city', 'Università G. d''Annunzio', null, null, 'unverified', null),
  ('MOL', 'Molise — ente da confermare', null, 'region', 'Università del Molise', null, null, 'unverified', 'Administration model unclear (regional office vs university). Research in Phase B.'),
  -- South & islands
  ('CAM', 'ADISURC', 'Azienda per il Diritto allo Studio Universitario della Regione Campania', 'region', 'All Campania universities (Federico II, L''Orientale, Vanvitelli…)', 'https://www.adisurcampania.it', null, 'verified', 'Existence/name CONFIRMED via IO app public-body registry; URL to re-confirm.'),
  ('PUG', 'ADISU Puglia', 'Agenzia per il Diritto allo Studio Universitario di Puglia', 'region', 'Bari, PoliBa, Salento, Foggia', 'https://www.adisupuglia.it', null, 'unverified', null),
  ('BAS', 'ARDSU Basilicata', null, 'region', 'Università della Basilicata', 'https://www.ardsubasilicata.it', null, 'unverified', null),
  ('CAL', 'Calabria — gestione universitaria (da confermare)', null, 'university', 'UniCal (Centro Residenziale), Magna Graecia, Mediterranea', null, null, 'unverified', 'Calabria model unclear — likely per-university. Research in Phase B.'),
  ('SIC', 'ERSU Palermo', 'Ente Regionale per il Diritto allo Studio Universitario di Palermo', 'city', 'Università di Palermo + AFAM', 'https://www.ersupalermo.it', null, 'unverified', 'Sicily has four ERSUs.'),
  ('SIC', 'ERSU Catania', null, 'city', 'Università di Catania', 'https://www.ersucatania.it', null, 'unverified', null),
  ('SIC', 'ERSU Messina', null, 'city', 'Università di Messina', 'https://www.ersumessina.it', null, 'unverified', null),
  ('SIC', 'ERSU Enna', null, 'city', 'Università Kore di Enna', 'https://www.ersuenna.it', null, 'unverified', null),
  ('SAR', 'ERSU Cagliari', null, 'city', 'Università di Cagliari', 'https://www.ersucagliari.it', null, 'unverified', null),
  ('SAR', 'ERSU Sassari', null, 'city', 'Università di Sassari', 'https://www.ersusassari.it', null, 'unverified', null)
) as a(region_code, name, official_name, scope, covers, website_url, bando_page_url, vstatus, notes)
join regions r on r.code = a.region_code and r.country_code = 'IT';
