-- ============================================================
-- SMT — Metas: objetivos del usuario, perfil físico y metas
-- Supabase -> SQL Editor -> pega TODO -> RUN. Seguro de correr varias veces.
-- ============================================================

-- Objetivos que elige el usuario al entrar (para personalizar la app)
alter table public.profiles add column if not exists objectives jsonb default '[]'::jsonb;
alter table public.profiles add column if not exists objectives_set boolean default false;

-- Perfil físico (respuestas del cuestionario de Físio) y metas/rutinas
alter table public.profiles add column if not exists physical jsonb default '{}'::jsonb;
alter table public.profiles add column if not exists goals jsonb default '{}'::jsonb;

-- Listo.
