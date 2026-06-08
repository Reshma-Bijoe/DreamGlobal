alter table public.eligibility enable row level security;

grant insert on table public.eligibility to anon;
grant insert, select on table public.eligibility to authenticated;

create policy "Allow public eligibility submissions"
on public.eligibility
for insert
to anon
with check (true);

create policy "Allow authenticated admins to read eligibility"
on public.eligibility
for select
to authenticated
using (true);
