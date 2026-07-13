-- ============================================================
-- SMT — Borra los torneos DEMO que reaparecían (Monterrey Open y Sociedad Cup)
-- Supabase -> SQL Editor -> pega TODO -> RUN. Seguro de correr varias veces.
-- ============================================================

delete from public.tournament_data where id in ('t1','t2');

-- (Opcional) Si quieres ver qué torneos te quedan en la base:
-- select id, data->>'name' as nombre from public.tournament_data;
