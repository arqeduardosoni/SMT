-- ============================================================
-- SMT — FIX DE ACCESO PARA USUARIOS CON SESIÓN (authenticated)
--
-- PROBLEMA: las políticas de lectura estaban solo para "anon" (invitados),
-- así que al INICIAR SESIÓN (rol "authenticated") el usuario se quedaba sin
-- permiso para LEER torneos/jugadores, y sin permiso para GUARDAR su perfil
-- (por eso se le repetía el cuestionario de metas).
--
-- Este archivo:
--   1) Asegura que existan las columnas del perfil (metas, físico, etc.)
--   2) Da LECTURA a todos (invitados + con sesión) en torneos, marketplace y perfiles
--   3) Deja que cada usuario GUARDE su propio perfil, y que se puedan
--      crear/actualizar torneos y publicaciones estando con sesión.
--
-- Cómo usarlo: Supabase -> SQL Editor -> New query -> pega TODO -> RUN.
-- Es seguro correrlo varias veces.
-- ============================================================

-- 1) COLUMNAS DEL PERFIL (si faltan, el cuestionario no se puede guardar)
alter table public.profiles
  add column if not exists objectives      jsonb   default '[]'::jsonb,
  add column if not exists objectives_set  boolean default false,
  add column if not exists physical        jsonb   default '{}'::jsonb,
  add column if not exists goals           jsonb   default '{}'::jsonb,
  add column if not exists blocked         jsonb   default '[]'::jsonb;

-- ============================================================
-- 2) PERFILES (profiles)
-- ============================================================
alter table public.profiles enable row level security;

-- LECTURA para todos (invitados + con sesión) -> rankings, buscar jugadores
drop policy if exists "profiles_select_anon" on public.profiles;
drop policy if exists "profiles_select_all"  on public.profiles;
create policy "profiles_select_all" on public.profiles
  for select to anon, authenticated using (true);

-- Cada usuario puede CREAR su propio perfil
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (auth_id = auth.uid());

-- Cada usuario puede EDITAR su propio perfil (guardar metas, físico, foto, etc.)
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth_id = auth.uid()) with check (auth_id = auth.uid());

-- ============================================================
-- 3) TORNEOS (tournament_data)
-- ============================================================
alter table public.tournament_data enable row level security;

drop policy if exists "tournament_select_anon" on public.tournament_data;
drop policy if exists "tournament_select_all"  on public.tournament_data;
create policy "tournament_select_all" on public.tournament_data
  for select to anon, authenticated using (true);

-- Con sesión se pueden crear torneos e inscribirse (la app guarda el torneo completo)
drop policy if exists "tournament_insert_auth" on public.tournament_data;
create policy "tournament_insert_auth" on public.tournament_data
  for insert to authenticated with check (true);

drop policy if exists "tournament_update_auth" on public.tournament_data;
create policy "tournament_update_auth" on public.tournament_data
  for update to authenticated using (true) with check (true);

-- ============================================================
-- 4) MARKETPLACE (marketplace_data)
-- ============================================================
alter table public.marketplace_data enable row level security;

drop policy if exists "marketplace_select_anon" on public.marketplace_data;
drop policy if exists "marketplace_select_all"  on public.marketplace_data;
create policy "marketplace_select_all" on public.marketplace_data
  for select to anon, authenticated using (true);

drop policy if exists "marketplace_insert_auth" on public.marketplace_data;
create policy "marketplace_insert_auth" on public.marketplace_data
  for insert to authenticated with check (true);

drop policy if exists "marketplace_update_auth" on public.marketplace_data;
create policy "marketplace_update_auth" on public.marketplace_data
  for update to authenticated using (true) with check (true);

-- ============================================================
-- Listo. Debe decir "Success. No rows returned".
-- Ahora los usuarios CON SESIÓN ya ven torneos y jugadores,
-- y su cuestionario de metas se guarda y NO se vuelve a preguntar.
-- ============================================================
