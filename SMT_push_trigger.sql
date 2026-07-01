-- ============================================================
-- SMT — Disparador de PUSH
-- Cuando se crea una notificación, llama a la función 'smart-action'
-- (send-push) para mandar el push al celular del usuario.
-- Cómo usarlo: Supabase -> SQL Editor -> New query -> pega TODO -> RUN.
-- Seguro de correr varias veces.
-- ============================================================

-- Extensión para hacer llamadas HTTP desde la base de datos
create extension if not exists pg_net;

-- Función que dispara el push
create or replace function public.notify_push()
returns trigger
language plpgsql
security definer
as $$
begin
  perform net.http_post(
    url := 'https://vwdviikyhimzikxoasjd.supabase.co/functions/v1/smart-action',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3ZHZpaWt5aGltemlreG9hc2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDgzMjIsImV4cCI6MjA5NDUyNDMyMn0.-xf4-d2-rFEC299v2udYawm9tIjs1SyS5BRvw0hHXT8',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3ZHZpaWt5aGltemlreG9hc2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDgzMjIsImV4cCI6MjA5NDUyNDMyMn0.-xf4-d2-rFEC299v2udYawm9tIjs1SyS5BRvw0hHXT8'
    ),
    body := jsonb_build_object('record', to_jsonb(NEW))
  );
  return NEW;
end;
$$;

-- Conectar el disparador a la tabla de notificaciones
drop trigger if exists trg_notify_push on public.notifications;
create trigger trg_notify_push
  after insert on public.notifications
  for each row execute function public.notify_push();

-- Listo. Cada notificación nueva disparará el push automáticamente.
