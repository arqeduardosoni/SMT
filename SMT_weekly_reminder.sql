-- ============================================================
-- SMT — Programar el recordatorio de los lunes (9:00 AM hora de México)
-- Requiere que ya esté desplegada la función 'weekly-reminder' (Edge Function).
-- Supabase -> SQL Editor -> pega TODO -> RUN.
-- ============================================================

-- Extensiones necesarias (pg_net ya la tienes por el push)
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Quitar el job si ya existía (para poder re-correr este script)
select cron.unschedule('smt-weekly-reminder')
where exists (select 1 from cron.job where jobname = 'smt-weekly-reminder');

-- Programar: cada LUNES a las 15:00 UTC = 9:00 AM en México (UTC-6)
select cron.schedule(
  'smt-weekly-reminder',
  '0 15 * * 1',
  $$
  select net.http_post(
    url := 'https://vwdviikyhimzikxoasjd.supabase.co/functions/v1/weekly-reminder',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3ZHZpaWt5aGltemlreG9hc2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDgzMjIsImV4cCI6MjA5NDUyNDMyMn0.-xf4-d2-rFEC299v2udYawm9tIjs1SyS5BRvw0hHXT8',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3ZHZpaWt5aGltemlreG9hc2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDgzMjIsImV4cCI6MjA5NDUyNDMyMn0.-xf4-d2-rFEC299v2udYawm9tIjs1SyS5BRvw0hHXT8'
    ),
    body := '{}'::jsonb
  );
  $$
);

-- Ver los jobs programados:
-- select * from cron.job;
