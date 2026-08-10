-- =============================================================
-- Storage buckets + policies
-- =============================================================

insert into storage.buckets (id, name, public)
values
  ('website-assets', 'website-assets', true),
  ('product-images', 'product-images', true),
  ('service-images', 'service-images', true),
  ('testimonial-images', 'testimonial-images', true),
  ('team-images', 'team-images', true)
on conflict (id) do nothing;

-- Public read for all buckets
create policy "public_read_bucket" on storage.objects
  for select using (bucket_id in (
    'website-assets','product-images','service-images',
    'testimonial-images','team-images'
  ));

-- Authenticated admins can upload/replace
create policy "admin_insert_objects" on storage.objects
  for insert to authenticated
  with check (public.is_admin() and bucket_id in (
    'website-assets','product-images','service-images',
    'testimonial-images','team-images'
  ));

create policy "admin_update_objects" on storage.objects
  for update to authenticated
  using (public.is_admin() and bucket_id in (
    'website-assets','product-images','service-images',
    'testimonial-images','team-images'
  ));

create policy "admin_delete_objects" on storage.objects
  for delete to authenticated
  using (public.is_admin() and bucket_id in (
    'website-assets','product-images','service-images',
    'testimonial-images','team-images'
  ));
