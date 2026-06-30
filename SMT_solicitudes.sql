-- ============================================================
-- SMT — Persistencia de SOLICITUDES (coach, retas, compras, posts, etc.)
-- Hace que las solicitudes se guarden y le lleguen al ADMIN desde
-- cualquier dispositivo (antes solo vivían en la memoria del celular).
-- Cómo usarlo: Supabase -> SQL Editor -> New query -> pega TODO -> RUN.
-- Seguro de correr varias veces.
-- ============================================================

create table if not exists public.app_requests (
  id text primary key,
  kind text not null,          -- coach_app, match_req, purchase_req, media_req, etc.
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.app_requests enable row level security;

drop policy if exists "app_requests_all" on public.app_requests;
create policy "app_requests_all" on public.app_requests
  for all to authenticated using (true) with check (true);

-- Tiempo real (que le llegue al admin al instante)
do $$
begin
  begin
    alter publication supabase_realtime add table public.app_requests;
  exception when duplicate_object then null;
  end;
end $$;

-- Listo. Ahora las solicitudes (incluida la del coach Alan) le llegarán al administrador.
