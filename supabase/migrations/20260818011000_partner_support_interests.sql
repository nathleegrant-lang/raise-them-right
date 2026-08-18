create table if not exists public.partner_support_interests (
  id uuid primary key default gen_random_uuid(),
  support_request_id uuid not null references public.parent_support_requests(id) on delete cascade,
  partner_user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'interested' check (status in ('interested','withdrawn','parent_declined','parent_invited')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (support_request_id, partner_user_id)
);
alter table public.partner_support_interests enable row level security;
revoke all on public.partner_support_interests from anon, authenticated;
create index if not exists partner_support_interests_request_idx on public.partner_support_interests(support_request_id);
create index if not exists partner_support_interests_partner_idx on public.partner_support_interests(partner_user_id);
