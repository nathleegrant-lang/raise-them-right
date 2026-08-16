create table public.parent_profiles (
  user_id uuid primary key references public.member_accounts(user_id) on delete cascade,
  support_areas text[] not null default '{}',
  household_stage text[] not null default '{}',
  preferred_support text[] not null default '{}',
  availability text[] not null default '{}',
  profile_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.parent_profiles is 'Structured adult Parent support profile. Do not store child names, schools, photographs, exact ages, addresses, telephone numbers, or other child-identifying information.';

alter table public.parent_profiles enable row level security;

revoke all privileges on table public.parent_profiles from anon, authenticated;
grant select on table public.parent_profiles to authenticated;
grant select, insert, update, delete on table public.parent_profiles to service_role;

create policy "Parents can read their own profile"
on public.parent_profiles
for select
to authenticated
using (auth.uid() = user_id);
