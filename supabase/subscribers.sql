-- Subscribers table — run in the Supabase SQL Editor.
-- Signups persist here even before Resend is configured, so no email is lost.
-- RLS: the public (anon) key may INSERT only — it can never read the list.

create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  -- where the signup came from: 'homepage' now; region/country tags in Phase 1
  source text not null default 'homepage',
  created_at timestamptz not null default now(),
  unsubscribed boolean not null default false
);

alter table subscribers enable row level security;

-- Public form can add a subscriber; nobody can read/update/delete without the
-- service role. (No select policy on purpose.)
create policy "public insert" on subscribers for insert with check (true);
