-- Phase B — batch 2 (collected 2026-07-04)
-- Resolves the Molise open question: it's ESU Molise, a standalone body.

insert into sources (id, url, title, publisher, doc_type, notes) values
  ('00000000-0000-0000-0000-000000000017',
   'https://www.esu.molise.it/bandi-di-concorso.html',
   'ESU Molise — Bandi di concorso', 'ESU Molise', 'agency_page',
   'Confirmed: Ente per il Diritto allo Studio Universitario del Molise, Campobasso (on the UniMol campus). 2025/26 bando published 19 Sep 2025 — a LATE publisher; expect the 2026/27 bando around Sep 2026.');

update agencies set
  name = 'ESU Molise',
  official_name = 'Ente per il Diritto allo Studio Universitario del Molise',
  scope = 'region',
  covers = 'Università degli Studi del Molise',
  website_url = 'https://www.esu.molise.it',
  bando_page_url = 'https://www.esu.molise.it/bandi-di-concorso.html',
  verification_status = 'verified',
  verified_at = now(),
  registry_source_id = '00000000-0000-0000-0000-000000000017',
  notes = 'Resolved 2026-07-04: standalone regional body confirmed. Publishes late (2025/26 bando: 19 Sep 2025) — the 2026/27 bando is expected ~Sep 2026, well after most regions.'
where name = 'Molise — ente da confermare';
