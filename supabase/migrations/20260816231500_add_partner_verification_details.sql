alter table public.community_partner_profiles
  add column if not exists verification_submitted_at timestamptz,
  add column if not exists verification_reviewed_at timestamptz,
  add column if not exists verification_reviewed_by uuid,
  add column if not exists verification_note text;

comment on column public.community_partner_profiles.verification_note is 'Administrator verification note. Do not store child-identifying information here.';
