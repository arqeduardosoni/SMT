-- ============================================================
-- SMT — BLINDAJE: puntos del ranking y avisos de administración
--
-- Estos dos problemas se resolvían en la app, pero cualquier teléfono con
-- una versión vieja los volvía a provocar. Este SQL los corrige EN LA BASE
-- DE DATOS, así que ya no importa qué versión tenga cada usuario.
--
--   1) PUNTOS: solo el admin puede cambiar puntos, victorias, derrotas y
--      títulos de un perfil. Si un jugador (o una app vieja) manda esos
--      campos, la base los ignora y conserva los reales.
--   2) AVISOS DE ADMIN: cualquier aviso tipo 'admin' se guarda para la
--      cuenta admin, aunque la app que lo mandó haya puesto otro destino.
--      También borra los que ya cayeron en cuentas personales.
--
-- CÓMO USARLO: Supabase -> SQL Editor -> New query -> pega TODO -> RUN
-- Es seguro correrlo varias veces.
-- ============================================================

-- ---------- 1) Puntos: solo el admin los escribe ----------
create or replace function public.smt_protege_puntos()
returns trigger language plpgsql security definer as $$
declare
  correo text := lower(coalesce(auth.jwt() ->> 'email',''));
  es_admin boolean := correo in ('admin@smt.mx','smt.tennismx@gmail.com');
begin
  -- Sin sesión (SQL Editor, scripts, service role) o admin: se permite todo
  if auth.uid() is null or es_admin then
    return new;
  end if;
  -- Jugador normal: se conservan los valores competitivos reales
  new.points := old.points;
  new.wins   := old.wins;
  new.losses := old.losses;
  new.titles := old.titles;
  return new;
end $$;

drop trigger if exists trg_smt_protege_puntos on public.profiles;
create trigger trg_smt_protege_puntos
  before update on public.profiles
  for each row execute function public.smt_protege_puntos();

-- ---------- 2) Avisos de admin: siempre a la cuenta admin ----------
create or replace function public.smt_redirige_avisos_admin()
returns trigger language plpgsql security definer as $$
begin
  if new.type = 'admin' then
    new.user_id := 'admin';
    -- Apps viejas mandaban el mismo aviso dos veces (Eduardo y Alan): se deja uno solo
    if exists (
      select 1 from public.notifications n
      where n.user_id = 'admin' and n.type = 'admin'
        and n.title = new.title and coalesce(n.body,'') = coalesce(new.body,'')
        and n.created_at > now() - interval '2 minutes'
    ) then
      return null; -- duplicado: no se inserta
    end if;
  end if;
  return new;
end $$;

drop trigger if exists trg_smt_redirige_avisos_admin on public.notifications;
create trigger trg_smt_redirige_avisos_admin
  before insert on public.notifications
  for each row execute function public.smt_redirige_avisos_admin();

-- Limpieza de los que ya cayeron en cuentas personales
delete from public.notifications
where type = 'admin' and user_id <> 'admin';

-- ---------- Comprobación ----------
select tgname as trigger, tgrelid::regclass as tabla
from pg_trigger
where tgname in ('trg_smt_protege_puntos','trg_smt_redirige_avisos_admin');

-- Debe aparecer 2 filas: trg_smt_protege_puntos (profiles) y trg_smt_redirige_avisos_admin (notifications).
