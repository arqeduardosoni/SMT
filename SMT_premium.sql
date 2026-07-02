-- ============================================================
-- SMT — Campo Premium (para el premio anual del ranking)
-- Cómo usarlo: Supabase -> SQL Editor -> New query -> pega TODO -> RUN.
-- Seguro de correr varias veces.
-- ============================================================

-- Marca si la cuenta es Premium (elegible al premio anual de $2,000/categoría)
alter table public.profiles add column if not exists premium boolean default false;
alter table public.profiles add column if not exists premium_since timestamptz;

-- Listo. Desde la app, como admin, puedes marcar Premium a un jugador
-- (Perfil del jugador -> Editar -> interruptor "Cuenta Premium").
-- Cuando exista el cobro por Apple (IAP), se activará automáticamente.
