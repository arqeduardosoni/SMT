-- ============================================================
-- SMT — ACCESO DE INVITADO (lectura sin cuenta)
-- Apple Guideline 5.1.1(v): el usuario debe poder EXPLORAR sin registrarse.
-- Este archivo permite que un visitante SIN sesión (rol "anon") pueda LEER
-- (solo lectura) los torneos, el marketplace y los perfiles para rankings.
-- Escribir/crear/editar sigue requiriendo cuenta (no se toca eso).
--
-- Cómo usarlo: Supabase -> tu proyecto -> SQL Editor -> New query
-- -> pega TODO este archivo -> botón RUN (verde). Es seguro correrlo varias veces.
-- ============================================================

-- 1) Torneos: lectura para invitados (anon)
drop policy if exists "tournament_select_anon" on public.tournament_data;
create policy "tournament_select_anon" on public.tournament_data
  for select to anon using (true);

-- 2) Marketplace: lectura para invitados (anon)
drop policy if exists "marketplace_select_anon" on public.marketplace_data;
create policy "marketplace_select_anon" on public.marketplace_data
  for select to anon using (true);

-- 3) Perfiles (para rankings y "buscar partido"): lectura para invitados (anon)
--    Solo SELECT. Insertar/editar/borrar perfiles sigue requiriendo cuenta.
alter table public.profiles enable row level security;
drop policy if exists "profiles_select_anon" on public.profiles;
create policy "profiles_select_anon" on public.profiles
  for select to anon using (true);

-- Listo. Deberías ver "Success. No rows returned".
-- A partir de ahora, quien entre como "Explorar sin cuenta" verá torneos,
-- marketplace y rankings; al intentar vender/comprar/inscribirse/postear/chatear
-- la app le pedirá crear una cuenta gratis.
