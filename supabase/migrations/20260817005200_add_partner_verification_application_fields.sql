alter table public.community_partner_profiles
  add column if not exists verification_certified_date date,
  add column if not exists verification_reference_name text,
  add column if not exists verification_reference_contact text,
  add column if not exists verification_credentials_details text,
  add column if not exists verification_safeguarding_agreed_at timestamptz;

comment on column public.community_partner_profiles.verification_certified_date is 'Date the submitted identity copy was certified; certification must be recent according to platform policy.';
comment on column public.community_partner_profiles.verification_reference_contact is 'Adult reference contact information supplied for Community Partner verification. Restricted to verification use.';
