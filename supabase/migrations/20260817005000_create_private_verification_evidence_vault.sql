insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('verification-evidence','verification-evidence',false,10485760,array['image/jpeg','image/png','application/pdf'])
on conflict (id) do update set public=excluded.public,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;

create table if not exists public.community_partner_verification_documents (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.member_accounts(user_id) on delete cascade,
 document_type text not null check (document_type in ('certified_id','verification_photo')),
 storage_path text not null unique,
 original_filename text not null,
 mime_type text not null check (mime_type in ('image/jpeg','image/png','application/pdf')),
 file_size_bytes bigint not null check (file_size_bytes > 0 and file_size_bytes <= 10485760),
 uploaded_at timestamptz not null default now(),
 reviewed_at timestamptz,
 reviewed_by uuid,
 is_current boolean not null default true
);
comment on table public.community_partner_verification_documents is 'Private metadata for Community Partner verification evidence. File bytes live only in the private verification-evidence storage bucket.';
alter table public.community_partner_verification_documents enable row level security;
revoke all privileges on table public.community_partner_verification_documents from anon, authenticated;
grant select, insert, update, delete on table public.community_partner_verification_documents to service_role;
create index if not exists community_partner_verification_documents_user_idx on public.community_partner_verification_documents(user_id, document_type, is_current);