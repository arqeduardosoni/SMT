-- ============================================================
-- SMT — Biblioteca de videos de coaches
-- Supabase -> SQL Editor -> New query -> pega TODO -> RUN. Seguro de correr varias veces.
-- ============================================================

-- Tabla con los videos que suben los coaches
create table if not exists public.coach_videos (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null,
  coach_name text,
  topic text not null,
  title text,
  video_url text not null,
  premium boolean default false,
  created_at timestamptz default now()
);

alter table public.coach_videos enable row level security;

-- Todos pueden ver la lista de videos
drop policy if exists "coach_videos_read" on public.coach_videos;
create policy "coach_videos_read" on public.coach_videos for select using (true);
-- El coach crea/borra solo sus propios videos
drop policy if exists "coach_videos_insert" on public.coach_videos;
create policy "coach_videos_insert" on public.coach_videos for insert to authenticated with check (auth.uid() = coach_id);
drop policy if exists "coach_videos_delete" on public.coach_videos;
create policy "coach_videos_delete" on public.coach_videos for delete to authenticated using (auth.uid() = coach_id);

-- Bucket de storage para los archivos de video (lectura pública)
insert into storage.buckets (id, name, public) values ('coach-videos','coach-videos',true)
on conflict (id) do nothing;

-- Políticas de storage: leer público; subir/borrar solo en TU carpeta (tu uid)
drop policy if exists "cv_read" on storage.objects;
create policy "cv_read" on storage.objects for select using (bucket_id='coach-videos');
drop policy if exists "cv_insert" on storage.objects;
create policy "cv_insert" on storage.objects for insert to authenticated
  with check (bucket_id='coach-videos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "cv_delete" on storage.objects;
create policy "cv_delete" on storage.objects for delete to authenticated
  using (bucket_id='coach-videos' and (storage.foldername(name))[1] = auth.uid()::text);

-- Listo. Los coaches suben videos por tema y marcan cada uno premium o gratis.
