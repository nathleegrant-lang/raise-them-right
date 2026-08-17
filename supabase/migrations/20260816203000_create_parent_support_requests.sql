create table public.parent_support_requests (
  id uuid primary key default gen_random_uuid(),
  parent_user_id uuid not null references public.member_accounts(user_id) on delete cascade,
  support_areas text[] not null default '{}',
  family_stage text[] not null default '{}',
  preferred_support text[] not null default '{}',
  availability text[] not null default '{}',
  urgency text not null default 'planning' check (urgency in ('planning','soon','prompt')),
  status text not null default 'open' check (status in ('open','paused','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.parent_support_requests is 'Structured Parent-to-adult-support request. Must not contain child names, schools, photographs, exact ages, addresses, telephone numbers, free-text child stories, or other child-identifying information.';
alter table public.parent_support_requests enable row level security;
revoke all privileges on table public.parent_support_requests from anon, authenticated;
grant select on table public.parent_support_requests to authenticated;
grant select, insert, update, delete on table public.parent_support_requests to service_role;
create policy "Parents can read their own support requests" on public.parent_support_requests for select to authenticated using (auth.uid() = parent_user_id);
