-- ============================================================
-- SMT — CREAR PERFILES FALTANTES (usuarios atorados)  [AUTO-SUFICIENTE]
--
-- Algunos usuarios se registraron (existen en Authentication -> Users) pero su
-- fila de perfil no se creó, así que al entrar les sale
-- "No se encontró tu perfil". Este script:
--   1) Asegura que existan las columnas del perfil (por si faltan)
--   2) Crea el perfil de todos los usuarios que no lo tienen
--
-- Cómo usarlo: Supabase -> SQL Editor -> pega TODO -> RUN.
-- Es seguro correrlo varias veces (solo crea los que faltan).
-- ============================================================

-- 1) Asegurar columnas (si ya existen, no hace nada)
alter table public.profiles
  add column if not exists objectives      jsonb   default '[]'::jsonb,
  add column if not exists objectives_set  boolean default false,
  add column if not exists physical        jsonb   default '{}'::jsonb,
  add column if not exists goals           jsonb   default '{}'::jsonb,
  add column if not exists blocked         jsonb   default '[]'::jsonb;

-- 2) Crear los perfiles faltantes (solo columnas base, el resto usa sus valores por defecto)
insert into public.profiles (
  id, auth_id, email,
  name, first_name, last_name, birthdate,
  sex, category_locked,
  city, state, country,
  avatar, ranking, points, wins, losses, titles,
  hand, racket,
  premium, premium_until,
  objectives_set,
  privacy_accepted_at
)
select
  u.id, u.id, lower(u.email),
  initcap(replace(split_part(u.email, '@', 1), '.', ' ')),
  initcap(split_part(replace(split_part(u.email, '@', 1), '.', ' '), ' ', 1)),
  '', '1990-01-01'::date,
  'M', false,
  'Monterrey', 'Nuevo León', 'México',
  upper(substr(split_part(u.email, '@', 1), 1, 2)),
  0, 0, 0, 0, 0,
  'Diestro', 'Wilson Pro Staff',
  true, (now() + interval '30 days'),
  false,
  now()
from auth.users u
left join public.profiles p on p.auth_id = u.id
where p.auth_id is null
  and u.email is not null;

-- ============================================================
-- VERIFICAR que ya no falta ninguno (debe dar 0):
--   select count(*) from auth.users u
--   left join public.profiles p on p.auth_id = u.id
--   where p.auth_id is null and u.email is not null;
-- ============================================================
