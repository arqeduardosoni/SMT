-- ============================================================
-- SMT — QUE EL ADMIN PUEDA GUARDAR CATEGORÍAS Y EDITAR JUGADORES
--
-- PROBLEMA: la política de edición de perfiles solo dejaba a cada
-- usuario editar SU PROPIO perfil (auth_id = auth.uid()). Por eso,
-- cuando el ADMINISTRADOR le asignaba categoría a otro jugador,
-- NO se guardaba (la base de datos lo bloqueaba en silencio).
--
-- Este archivo reemplaza esa política para que:
--   • Cada usuario siga editando SOLO su propio perfil.
--   • El ADMIN (admin@smt.mx) pueda editar CUALQUIER perfil
--     (asignar categorías, corregir datos, etc.).
--
-- Cómo usarlo: Supabase -> SQL Editor -> New query -> pega TODO -> RUN.
-- Es seguro correrlo varias veces.
-- ============================================================

alter table public.profiles enable row level security;

-- Quitar la política anterior (y variantes) para reemplazarla
drop policy if exists "profiles_update_own"          on public.profiles;
drop policy if exists "profiles_update_own_or_admin" on public.profiles;

-- Nueva política: tu propio perfil, o cualquiera si eres el admin
create policy "profiles_update_own_or_admin" on public.profiles
  for update to authenticated
  using (
    auth_id = auth.uid()
    or (auth.jwt() ->> 'email') = 'admin@smt.mx'
  )
  with check (
    auth_id = auth.uid()
    or (auth.jwt() ->> 'email') = 'admin@smt.mx'
  );

-- ============================================================
-- Listo. Debe decir "Success. No rows returned".
-- Ahora, entrando como administrador, las categorías que asignes
-- a los jugadores SÍ se guardan.
-- ============================================================
