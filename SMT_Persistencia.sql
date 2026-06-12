-- ============================================================
-- SMT — PERSISTENCIA DE TORNEOS Y MARKETPLACE
-- Cómo usarlo: Supabase → tu proyecto → SQL Editor → New query
-- → pega TODO este archivo → botón RUN (verde, abajo a la derecha)
-- Es seguro correrlo varias veces: no borra datos existentes.
-- ============================================================

-- 1) Tabla de torneos (cada torneo completo se guarda como JSON)
create table if not exists public.tournament_data (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2) Tabla del marketplace (cada producto como JSON)
create table if not exists public.marketplace_data (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 3) Mantener updated_at al día automáticamente
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists trg_touch_tournament on public.tournament_data;
create trigger trg_touch_tournament before update on public.tournament_data
  for each row execute function public.touch_updated_at();

drop trigger if exists trg_touch_marketplace on public.marketplace_data;
create trigger trg_touch_marketplace before update on public.marketplace_data
  for each row execute function public.touch_updated_at();

-- 4) Seguridad (RLS): solo usuarios con sesión iniciada pueden leer/escribir
alter table public.tournament_data enable row level security;
alter table public.marketplace_data enable row level security;

drop policy if exists "tournament_select" on public.tournament_data;
create policy "tournament_select" on public.tournament_data
  for select to authenticated using (true);

drop policy if exists "tournament_write" on public.tournament_data;
create policy "tournament_write" on public.tournament_data
  for all to authenticated using (true) with check (true);

drop policy if exists "marketplace_select" on public.marketplace_data;
create policy "marketplace_select" on public.marketplace_data
  for select to authenticated using (true);

drop policy if exists "marketplace_write" on public.marketplace_data;
create policy "marketplace_write" on public.marketplace_data
  for all to authenticated using (true) with check (true);

-- 5) Tiempo real: que los cambios se reflejen al instante en otros dispositivos
do $$
begin
  begin
    alter publication supabase_realtime add table public.tournament_data;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.marketplace_data;
  exception when duplicate_object then null;
  end;
end $$;

-- Listo. Deberías ver "Success. No rows returned".
