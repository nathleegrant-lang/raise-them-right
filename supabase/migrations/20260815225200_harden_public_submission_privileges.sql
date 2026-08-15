-- Phase 0 security hardening for current public submission tables.
-- Preserve anonymous INSERT capability for the existing public forms.
-- Remove unnecessary table privileges from public-facing roles.

revoke all privileges on table public.pledges from anon, authenticated;
revoke all privileges on table public.volunteers from anon, authenticated;
revoke all privileges on table public.support_requests from anon, authenticated;

grant insert on table public.pledges to anon;
grant insert on table public.volunteers to anon;
grant insert on table public.support_requests to anon;
