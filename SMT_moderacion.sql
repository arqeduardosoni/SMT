-- ============================================================
-- SMT — Moderación (Guideline 1.2 de Apple): Bloquear + Reportar
-- Supabase -> SQL Editor -> pega TODO -> RUN. Seguro de correr varias veces.
-- ============================================================

-- 1) Columna para la lista de usuarios bloqueados por cada jugador
alter table public.profiles
  add column if not exists blocked jsonb not null default '[]'::jsonb;

-- 2) Tabla de reportes de contenido/usuarios
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  reporter_id text,
  reporter_name text,
  kind text,            -- 'player' | 'listing'
  target_id text,
  target_name text,
  reason text,
  status text not null default 'pending'   -- 'pending' | 'reviewed' | 'actioned'
);

-- 3) Permisos: RLS activado, cualquiera autenticado/anónimo puede INSERTAR un reporte
alter table public.reports enable row level security;

drop policy if exists reports_insert on public.reports;
create policy reports_insert on public.reports
  for insert to anon, authenticated
  with check (true);

-- (Opcional) Solo tú (admin) podrás leerlos desde el SQL Editor / dashboard.
-- No creamos policy de SELECT pública para no exponer los reportes.

-- ============================================================
-- Listo. La app ya escribe aquí al reportar, y guarda 'blocked' al bloquear.
-- Para ver reportes:  select * from public.reports order by created_at desc;
-- ============================================================
