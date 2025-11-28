/*
  # Create Dynamic Menu System

  1. New Tables
    - `menu_items`
      - `id` (uuid, primary key)
      - `parent_id` (uuid, self-referencing for submenus)
      - `title` (text, menu label)
      - `url` (text, menu link)
      - `icon` (text, lucide icon name)
      - `order_position` (integer, for sorting)
      - `target` (text, link target _self or _blank)
      - `is_active` (boolean, show/hide menu)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `menu_items` table
    - Add policy for public read access
    - Add policy for authenticated admin write access

  3. Default Data
    - Insert default navigation structure matching current Header
*/

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text,
  icon text,
  order_position integer DEFAULT 0,
  target text DEFAULT '_self',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active menu items"
  ON menu_items FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage menu items"
  ON menu_items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role IN ('admin', 'editor')
    )
  );

-- Insert default menu structure
INSERT INTO menu_items (title, url, icon, order_position, parent_id) VALUES
('Beranda', '/', 'Home', 1, NULL),
('Tentang Kami', NULL, 'Info', 2, NULL),
('Program Keahlian', '/program', 'GraduationCap', 3, NULL),
('Galeri', NULL, 'Images', 4, NULL),
('Portfolio', '/portfolio', 'Award', 5, NULL),
('Berita', '/berita', 'Newspaper', 6, NULL),
('Hubungi Kami', '/kontak', 'Phone', 7, NULL)
ON CONFLICT DO NOTHING;

-- Get parent IDs for submenus
DO $$
DECLARE
  tentang_id uuid;
  program_id uuid;
  galeri_id uuid;
BEGIN
  SELECT id INTO tentang_id FROM menu_items WHERE title = 'Tentang Kami' AND parent_id IS NULL;
  SELECT id INTO program_id FROM menu_items WHERE title = 'Program Keahlian' AND parent_id IS NULL;
  SELECT id INTO galeri_id FROM menu_items WHERE title = 'Galeri' AND parent_id IS NULL;

  -- Tentang Kami submenus
  IF tentang_id IS NOT NULL THEN
    INSERT INTO menu_items (title, url, icon, order_position, parent_id) VALUES
    ('Visi dan Misi', '/tentang/visi-misi', NULL, 1, tentang_id),
    ('Sambutan Kepala Sekolah', '/tentang/sambutan-kepala-sekolah', NULL, 2, tentang_id),
    ('Profile Guru', '/tentang/profile-guru', NULL, 3, tentang_id)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Galeri submenus
  IF galeri_id IS NOT NULL THEN
    INSERT INTO menu_items (title, url, icon, order_position, parent_id) VALUES
    ('Galeri Foto', '/galeri/foto', NULL, 1, galeri_id),
    ('Galeri Video', '/galeri/video', NULL, 2, galeri_id)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
