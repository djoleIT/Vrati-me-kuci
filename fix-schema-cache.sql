-- Pokreni OVO u Supabase → SQL Editor. Rešava grešku
-- "Could not find the 'page_mode' column of 'pets' in the schema cache".

alter table pets add column if not exists page_mode text default 'contact';
alter table orders add column if not exists tag_type text default 'standard';

-- Ovo je ključni deo: govori Supabase API sloju (PostgREST) da osveži svoju
-- keširanu shemu baze. Bez ovoga, nova kolona ume da "ne postoji" za API
-- iako je stvarno u tabeli.
notify pgrst, 'reload schema';
