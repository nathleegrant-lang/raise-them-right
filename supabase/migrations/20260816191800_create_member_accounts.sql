-- Phase 1: adult account identity foundation.
-- #RaiseThemRight is an adult-only platform. Children never receive accounts.

create table public.member_accounts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  account_type text not null check (account_type in ('parent', 'community_partner')),
  account_status text not null default 'onboarding'
    check (account_status in ('onboarding', 'active', 'suspended', 'closed')),
  first_name text not null,
  last_name text not null,
  display_name text,
  country text,
  parish_state text,
  adult_confirmed boolean not null check (adult_confirmed = true),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.member_accounts is
  'Private adult account registry for Parents and Community Partners. Children must never be represented as platform users.';
comment on column public.member_accounts.account_type is
  'Server-controlled adult role. A user cannot directly change Parent/Community Partner classification.';
comment on column public.member_accounts.adult_confirmed is
  'Required affirmation that the account holder is an adult. Child accounts are prohibited.';

alter table public.member_accounts enable row level security;

revoke all privileges on table public.member_accounts from anon, authenticated;
grant select on table public.member_accounts to authenticated;
grant select, insert, update, delete on table public.member_accounts to service_role;

create policy "Members can read their own account"
on public.member_accounts
for select
to authenticated
using (auth.uid() = user_id);
