alter table public.eligibility enable row level security;

alter table public.eligibility
add column if not exists interest text;

alter table public.leads
add column if not exists interest text;

grant insert on table public.eligibility to anon;
grant insert, select on table public.eligibility to authenticated;
grant insert on table public.leads to anon;
grant select on table public.leads to authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'eligibility'
      and policyname = 'Allow public eligibility submissions'
  ) then
    create policy "Allow public eligibility submissions"
    on public.eligibility
    for insert
    to anon
    with check (true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'eligibility'
      and policyname = 'Allow authenticated admins to read eligibility'
  ) then
    create policy "Allow authenticated admins to read eligibility"
    on public.eligibility
    for select
    to authenticated
    using (true);
  end if;

  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'eligibility'
  ) then
    alter publication supabase_realtime add table public.eligibility;
  end if;

  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'leads'
  ) then
    alter publication supabase_realtime add table public.leads;
  end if;
end $$;
