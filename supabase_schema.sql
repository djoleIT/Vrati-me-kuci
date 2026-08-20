-- Pokreni ovo u Supabase → SQL Editor → New query → Run
-- Bezbedno je pokrenuti više puta — ne puca ako tabele/politike već postoje.

create extension if not exists "pgcrypto";

create table if not exists pets (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  owner_user_id uuid references auth.users(id) on delete cascade,
  pet_name text not null,
  owner_name text,
  phone1_country text default '+381',
  phone1 text not null,
  phone2_country text default '+381',
  phone2 text,
  notes text,
  show_phone1 boolean default true,
  show_phone2 boolean default false,
  show_notes boolean default true,
  created_at timestamptz default now()
);

create table if not exists owner_addresses (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid references pets(id) on delete cascade,
  street text not null,
  city text not null,
  municipality text,
  postal_code text not null,
  country text default 'Srbija',
  contact_phone text not null,
  contact_email text,
  show_address_public boolean default false,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid references pets(id) on delete cascade,
  status text default 'Nova',
  price integer default 990,
  shipping integer default 250,
  total integer generated always as (price + shipping) stored,
  admin_note text,
  created_at timestamptz default now()
);

alter table pets enable row level security;
alter table owner_addresses enable row level security;
alter table orders enable row level security;

drop policy if exists "javno citanje profila" on pets;
drop policy if exists "vlasnik menja svoj profil" on pets;
drop policy if exists "vlasnik pravi profil" on pets;

create policy "javno citanje profila" on pets
  for select using (true);

create policy "vlasnik menja svoj profil" on pets
  for update using (auth.uid() = owner_user_id);

create policy "vlasnik pravi profil" on pets
  for insert with check (auth.uid() = owner_user_id);

-- owner_addresses i orders NEMAJU javne policy — pristup ide isključivo preko
-- service_role ključa na serveru (admin panel, API rute), nikad direktno iz browsera.
