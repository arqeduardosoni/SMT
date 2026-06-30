-- ============================================================
-- SMT — Tabla de tokens de dispositivo (para notificaciones push)
-- Guarda el "token" de cada celular para poder enviarle push.
-- Cómo usarlo: Supabase -> SQL Editor -> New query -> pega TODO -> RUN.
-- Seguro de correr varias veces.
-- ============================================================

create table if not exists public.device_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  token text not null,
  platform text,
  updated_at timestamptz not null default now(),
  unique (user_id, token)
);

alter table public.device_tokens enable row level security;

-- Cada usuario administra solo sus propios tokens
drop policy if exists "device_tokens_own" on public.device_tokens;
create policy "device_tokens_own" on public.device_tokens
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Listo. Aquí se guardarán los tokens cuando agreguemos el código de registro (Fase B).
