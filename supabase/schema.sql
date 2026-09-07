-- ============================================================
-- Digital QR Menu — Supabase schema
-- Run this once in your Supabase project's SQL Editor.
-- ============================================================

create table if not exists categories (
  id bigint generated always as identity primary key,
  name text not null,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists menu_items (
  id bigint generated always as identity primary key,
  category_id bigint not null references categories(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  image_url text,
  sold_out boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists menu_items_category_id_idx on menu_items(category_id);

-- ------------------------------------------------------------
-- Row Level Security
-- Anyone (including anonymous customers) can READ the menu.
-- Only a signed-in user (the restaurant owner) can WRITE to it.
-- ------------------------------------------------------------

alter table categories enable row level security;
alter table menu_items enable row level security;

create policy "Public can read categories"
  on categories for select
  using (true);

create policy "Public can read menu items"
  on menu_items for select
  using (true);

create policy "Authenticated users can manage categories"
  on categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can manage menu items"
  on menu_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- Enable Realtime so edits sync live to every open menu/device.
-- (In Supabase dashboard: Database > Replication > toggle these
-- two tables on. This line does the same thing via SQL.)
-- ------------------------------------------------------------
alter publication supabase_realtime add table categories;
alter publication supabase_realtime add table menu_items;

-- ------------------------------------------------------------
-- Optional: starter data so the menu isn't empty on first load.
-- Delete or edit freely from the admin dashboard afterwards.
-- ------------------------------------------------------------
insert into categories (name, sort_order) values
  ('Starters', 0),
  ('Mains', 1),
  ('Desserts', 2),
  ('Drinks', 3)
on conflict do nothing;

insert into menu_items (category_id, name, description, price, sort_order)
select id, 'Burrata & Heirloom Tomato', 'Basil oil, aged balsamic, sourdough crumb', 12.50, 0
from categories where name = 'Starters'
on conflict do nothing;
