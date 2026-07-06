-- ============================================================
-- SMT — Premium (premio anual + prueba gratis de 1 mes)
-- Supabase -> SQL Editor -> New query -> pega TODO -> RUN. Seguro de correr varias veces.
-- ============================================================

-- ¿La cuenta tiene Premium ahora? (por prueba gratis o por suscripción)
alter table public.profiles add column if not exists premium boolean default false;
alter table public.profiles add column if not exists premium_since timestamptz;

-- Prueba gratis de 1 mes (al primer registro)
alter table public.profiles add column if not exists premium_until timestamptz;   -- fin de la prueba gratis
alter table public.profiles add column if not exists trial_used boolean default false;      -- ya usó su mes gratis
alter table public.profiles add column if not exists trial_ended_seen boolean default false; -- ya vio el aviso de fin de prueba

-- Listo. El mes gratis se otorga solo al crear cuenta; al vencer, vuelve a modo gratis
-- y muestra el aviso. La suscripción real (RevenueCat) sobreescribe y da Premium sin fecha.
