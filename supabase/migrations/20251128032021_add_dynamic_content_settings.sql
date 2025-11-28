/*
  # Add Dynamic Content Settings

  1. Changes
    - Insert footer_info settings for dynamic footer
    - Insert contact_info for footer contact section
    - Update social_media with real URLs structure
    - Update hero_section with all dynamic content
    - Add SEO settings

  2. Notes
    - All settings use JSONB for flexible structure
    - Anyone can read settings for public display
    - Only admins can update settings
*/

-- Insert footer info
INSERT INTO settings (key, value, description) VALUES
('footer_info', '{
  "description": "Membentuk generasi yang cerdas, berkarakter, dan siap menghadapi tantangan masa depan melalui pendidikan vokasi berkualitas tinggi.",
  "copyright": "SMK Mustaqbal"
}'::jsonb, 'Footer description and copyright text')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Insert contact info
INSERT INTO settings (key, value, description) VALUES
('contact_info', '{
  "address": "Jl. Pendidikan No. 123, Jakarta Selatan",
  "phone": "021-12345678",
  "email": "info@smkmustaqbal.sch.id",
  "whatsapp": "6281234567890"
}'::jsonb, 'School contact information')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Update social media with structure for URLs
INSERT INTO settings (key, value, description) VALUES
('social_media', '{
  "facebook": "https://facebook.com/smkmustaqbal",
  "instagram": "https://instagram.com/smkmustaqbal",
  "twitter": "https://twitter.com/smkmustaqbal",
  "youtube": "https://youtube.com/@smkmustaqbal"
}'::jsonb, 'Social media URLs')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Insert hero section settings
INSERT INTO settings (key, value, description) VALUES
('hero_section', '{
  "badge_text": "PPDB 2024/2025 Dibuka!",
  "title": "Membangun Generasi Unggul",
  "subtitle": "Bergabunglah dengan SMK Mustaqbal dan raih masa depan gemilang melalui pendidikan vokasi berkualitas tinggi dengan kurikulum berbasis industri.",
  "cta_primary_text": "Daftar Sekarang",
  "cta_primary_url": "/ppdb",
  "cta_secondary_text": "Download E-Brosur",
  "slides": [
    {
      "image_url": "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1920",
      "alt": "Siswa SMK Mustaqbal dalam kegiatan praktik"
    },
    {
      "image_url": "https://images.pexels.com/photos/5212653/pexels-photo-5212653.jpeg?auto=compress&cs=tinysrgb&w=1920",
      "alt": "Laboratorium modern SMK Mustaqbal"
    },
    {
      "image_url": "https://images.pexels.com/photos/8500373/pexels-photo-8500373.jpeg?auto=compress&cs=tinysrgb&w=1920",
      "alt": "Fasilitas kelas SMK Mustaqbal"
    }
  ]
}'::jsonb, 'Hero section content and images')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Insert SEO settings
INSERT INTO settings (key, value, description) VALUES
('seo_settings', '{
  "site_title": "SMK Mustaqbal - Membangun Generasi Unggul",
  "meta_description": "SMK Mustaqbal adalah sekolah menengah kejuruan yang menyediakan pendidikan berkualitas dengan kurikulum berbasis industri dan fasilitas modern.",
  "keywords": ["smk mustaqbal", "sekolah vokasi", "pendidikan kejuruan", "smk jakarta", "ppdb smk"],
  "og_image": "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200"
}'::jsonb, 'SEO meta tags and Open Graph data')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
