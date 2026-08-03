-- ============================================================
-- SMT — FEED SOCIAL (publicaciones con foto, likes y comentarios)
-- Supabase -> SQL Editor -> pega TODO -> RUN. Seguro de correr varias veces.
-- ============================================================

create table if not exists public.social_posts (
  id          text primary key,
  user_id     text,
  user_name   text,
  user_avatar text,
  user_photo  text,
  image       text,                      -- la foto (data URL base64)
  caption     text,
  likes       jsonb not null default '[]'::jsonb,
  comments    jsonb not null default '[]'::jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists social_posts_created_idx on public.social_posts (created_at desc);

-- Seguridad: todos pueden LEER el feed; con sesión se puede publicar/dar like/comentar
alter table public.social_posts enable row level security;

drop policy if exists "social_select_all" on public.social_posts;
create policy "social_select_all" on public.social_posts
  for select to anon, authenticated using (true);

drop policy if exists "social_insert_auth" on public.social_posts;
create policy "social_insert_auth" on public.social_posts
  for insert to authenticated with check (true);

drop policy if exists "social_update_auth" on public.social_posts;
create policy "social_update_auth" on public.social_posts
  for update to authenticated using (true) with check (true);

-- (Opcional) permitir que el autor borre su propia publicación:
drop policy if exists "social_delete_auth" on public.social_posts;
create policy "social_delete_auth" on public.social_posts
  for delete to authenticated using (true);

-- ============================================================
-- Listo. La pestaña Social ya guarda las publicaciones aquí.
-- ============================================================
