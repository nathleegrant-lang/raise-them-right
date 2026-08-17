create table public.community_partner_profiles (
  user_id uuid primary key references public.member_accounts(user_id) on delete cascade,
  support_areas text[] not null default '{}',
  support_formats text[] not null default '{}',
  service_scope text[] not null default '{}',
  availability text[] not null default '{}',
  verification_status text not null default 'not_started' check (verification_status in ('not_started','pending','verified','declined')),
  profile_complete boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.community_partner_profiles is 'Adult Community Partner support profile. Partners support parents and families; this table must not store child-identifying information.';

alter table public.community_partner_profiles enable row level security;
revoke all privileges on table public.community_partner_profiles from anon, authenticated;
grant select on table public.community_partner_profiles to authenticated;
grant select, insert, update, delete on table public.community_partner_profiles to service_role;

create policy "Community Partners can read their own profile"
on public.community_partner_profiles
for select
to authenticated
using (auth.uid() = user_id);
