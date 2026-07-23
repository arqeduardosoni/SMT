-- ============================================================
-- SMT — Programar el recordatorio DIARIO (8:00 AM hora de México)
-- Recuerda a cada jugador su entrenamiento del día, y si tiene partido
-- pendiente de torneo también se lo avisa.
--
-- REQUISITO: primero despliega la Edge Function 'daily-reminder'
--   (carpeta supabase/functions/daily-reminder). Ver instrucciones abajo.
--
-- Cómo usarlo: Supabase -> SQL Editor -> pega TODO -> RUN.
-- ============================================================

create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Quitar el job si ya existía (para poder re-correr este script)
select cron.unschedule('smt-daily-reminder')
where exists (select 1 from cron.job where jobname = 'smt-daily-reminder');

-- Programar: TODOS LOS DÍAS a las 14:00 UTC = 8:00 AM en México (UTC-6)
select cron.schedule(
  'smt-daily-reminder',
  '0 14 * * *',
  $$
  select net.http_post(
    url := 'https://vwdviikyhimzikxoasjd.supabase.co/functions/v1/daily-reminder',
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
-- select jobname, schedule from cron.job;

-- ============================================================
-- CÓMO DESPLEGAR la Edge Function 'daily-reminder' (una sola vez):
--
-- OPCIÓN A (desde tu compu, con Supabase CLI):
--   supabase functions deploy daily-reminder --project-ref vwdviikyhimzikxoasjd
--
-- OPCIÓN B (desde el dashboard de Supabase):
--   Edge Functions -> Deploy a new function -> nombre: daily-reminder
--   -> pega el contenido de supabase/functions/daily-reminder/index.ts -> Deploy
--
-- Después de desplegarla, corre este SQL. ¡Listo!
-- ============================================================
