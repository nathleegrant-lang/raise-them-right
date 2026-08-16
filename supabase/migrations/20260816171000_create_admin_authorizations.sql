create table if not exists public.admin_authorizations (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role = 'admin'),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_authorizations enable row level security;

revoke all privileges on table public.admin_authorizations from anon, authenticated;
grant select, insert, update, delete on table public.admin_authorizations to service_role;

comment on table public.admin_authorizations is
  'Server-controlled Mission Control authorization registry. Not exposed to public or authenticated application users.';
