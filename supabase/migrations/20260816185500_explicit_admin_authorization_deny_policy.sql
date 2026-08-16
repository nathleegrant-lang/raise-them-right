-- Explicitly deny application-role access to the Mission Control authorization registry.
-- The service_role remains the only application role with table privileges.

create policy "Deny application access to admin authorizations"
on public.admin_authorizations
as restrictive
for all
to anon, authenticated
using (false)
with check (false);
