# 📚 Website Sekolah Modern + CMS Admin - Complete Guide

## 🎯 Overview
Dokumentasi lengkap untuk membangun Website Sekolah Modern berbasis Next.js 13+ (App Router) dengan CMS Admin yang terintegrasi dengan Supabase Database.

---

## 1️⃣ SCHEMA DATABASE LENGKAP

### 1.1 Tabel: `admin_users`
**Fungsi:** Menyimpan data admin/staff yang dapat login ke CMS

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK, DEFAULT gen_random_uuid() | ID unik admin | `550e8400-e29b-41d4-a716-446655440000` |
| email | text | NOT NULL, UNIQUE | Email login | `admin@smkmustaqbal.sch.id` |
| full_name | text | - | Nama lengkap admin | `Ahmad Fauzi` |
| role | text | NOT NULL | Role akses (admin, editor, viewer) | `admin` |
| avatar_url | text | - | URL foto profil | `/storage/avatars/admin1.jpg` |
| created_at | timestamptz | DEFAULT now() | Waktu dibuat | `2025-01-20 10:00:00` |
| updated_at | timestamptz | DEFAULT now() | Waktu diupdate | `2025-01-20 15:30:00` |

**Contoh Data:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "admin@smkmustaqbal.sch.id",
  "full_name": "Ahmad Fauzi",
  "role": "admin",
  "avatar_url": "/storage/avatars/admin1.jpg",
  "created_at": "2025-01-20T10:00:00Z",
  "updated_at": "2025-01-20T15:30:00Z"
}
```

---

### 1.2 Tabel: `settings`
**Fungsi:** Menyimpan konfigurasi website (logo, kontak, social media, hero section)

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| key | text | PK | Key setting | `school_info` |
| value | jsonb | NOT NULL | Nilai setting dalam JSON | `{"name": "SMK Mustaqbal", "phone": "021-xxx"}` |
| description | text | - | Deskripsi setting | `Informasi umum sekolah` |
| updated_at | timestamptz | DEFAULT now() | Terakhir diupdate | `2025-01-20 10:00:00` |

**Contoh Data:**
```json
// Key: school_info
{
  "key": "school_info",
  "value": {
    "name": "SMK Mustaqbal",
    "tagline": "School of Future",
    "address": "Jl. Raya Bekasi No. 123, Jakarta Timur",
    "phone": "021-12345678",
    "whatsapp": "628123456789",
    "email": "info@smkmustaqbal.sch.id"
  },
  "description": "Informasi umum sekolah",
  "updated_at": "2025-01-20T10:00:00Z"
}

// Key: social_media
{
  "key": "social_media",
  "value": {
    "facebook": "https://facebook.com/smkmustaqbal",
    "instagram": "https://instagram.com/smkmustaqbal",
    "youtube": "https://youtube.com/@smkmustaqbal",
    "twitter": "https://twitter.com/smkmustaqbal"
  },
  "description": "Link social media sekolah"
}

// Key: hero_section
{
  "key": "hero_section",
  "value": {
    "title": "Langkah Awal Menuju Masa Depan Hebat",
    "subtitle": "Bangun karir impianmu bersama SMK Mustaqbal",
    "cta_text": "Daftar Sekarang",
    "cta_link": "/ppdb",
    "background_images": [
      "/images/hero1.jpg",
      "/images/hero2.jpg",
      "/images/hero3.jpg"
    ]
  },
  "description": "Konten hero section homepage"
}

// Key: branding
{
  "key": "branding",
  "value": {
    "logo_url": "/images/logo.png",
    "favicon_url": "/images/favicon.ico",
    "primary_color": "#0d9488",
    "secondary_color": "#10b981"
  },
  "description": "Branding dan logo sekolah"
}
```

---

### 1.3 Tabel: `pages`
**Fungsi:** Menyimpan halaman statis (Sejarah, Visi Misi, Struktur Organisasi, dll)

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK, DEFAULT gen_random_uuid() | ID unik halaman | `660e8400-e29b-41d4-a716-446655440000` |
| slug | text | NOT NULL, UNIQUE | URL slug | `visi-misi` |
| title | text | NOT NULL | Judul halaman | `Visi & Misi` |
| content | text | - | Konten HTML/Markdown | `<h2>Visi Kami</h2><p>...</p>` |
| meta | jsonb | - | SEO metadata | `{"description": "...", "keywords": "..."}` |
| is_published | boolean | DEFAULT false | Status publikasi | `true` |
| created_at | timestamptz | DEFAULT now() | Waktu dibuat | `2025-01-20 10:00:00` |
| updated_at | timestamptz | DEFAULT now() | Waktu diupdate | `2025-01-20 15:30:00` |

**Contoh Data:**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "slug": "visi-misi",
  "title": "Visi & Misi SMK Mustaqbal",
  "content": "<h2>Visi</h2><p>Menjadi SMK yang memuliakan fitrah...</p><h2>Misi</h2><ul><li>Pembentukan akhlaq</li></ul>",
  "meta": {
    "description": "Visi dan Misi SMK Mustaqbal dalam menghasilkan lulusan berkualitas",
    "keywords": "visi misi, SMK Mustaqbal, pendidikan vokasi"
  },
  "is_published": true,
  "created_at": "2025-01-20T10:00:00Z",
  "updated_at": "2025-01-20T15:30:00Z"
}
```

---

### 1.4 Tabel: `menu_links`
**Fungsi:** Navigasi dinamis website

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK, DEFAULT gen_random_uuid() | ID unik menu | `770e8400-e29b-41d4-a716-446655440000` |
| title | text | NOT NULL | Label menu | `Tentang Kami` |
| href | text | NOT NULL | URL tujuan | `/tentang/visi-misi` |
| parent_id | uuid | FK REFERENCES menu_links(id) | ID parent (untuk submenu) | `null` |
| position | integer | DEFAULT 0 | Urutan tampil | `1` |
| is_active | boolean | DEFAULT true | Status aktif | `true` |
| icon | text | - | Nama icon (lucide-react) | `Info` |

**Contoh Data:**
```json
// Menu Parent
{
  "id": "770e8400-e29b-41d4-a716-446655440000",
  "title": "Tentang Kami",
  "href": "#",
  "parent_id": null,
  "position": 1,
  "is_active": true,
  "icon": "Info"
}

// Submenu
{
  "id": "880e8400-e29b-41d4-a716-446655440000",
  "title": "Visi & Misi",
  "href": "/tentang/visi-misi",
  "parent_id": "770e8400-e29b-41d4-a716-446655440000",
  "position": 1,
  "is_active": true,
  "icon": null
}
```

---

### 1.5 Tabel: `categories`
**Fungsi:** Kategori untuk berita

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK, DEFAULT gen_random_uuid() | ID unik kategori | `990e8400-e29b-41d4-a716-446655440000` |
| name | text | NOT NULL | Nama kategori | `Pengumuman` |
| slug | text | NOT NULL, UNIQUE | URL slug | `pengumuman` |
| description | text | - | Deskripsi kategori | `Pengumuman resmi sekolah` |
| color | text | - | Warna badge | `teal` |

**Contoh Data:**
```json
[
  {"id": "990e8400...", "name": "Pengumuman", "slug": "pengumuman", "color": "teal"},
  {"id": "aa0e8400...", "name": "Prestasi", "slug": "prestasi", "color": "emerald"},
  {"id": "bb0e8400...", "name": "Kegiatan", "slug": "kegiatan", "color": "blue"},
  {"id": "cc0e8400...", "name": "Artikel", "slug": "artikel", "color": "orange"}
]
```

---

### 1.6 Tabel: `programs`
**Fungsi:** Program keahlian sekolah

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK, DEFAULT gen_random_uuid() | ID unik program | `dd0e8400-e29b-41d4-a716-446655440000` |
| name | text | NOT NULL | Nama program | `Teknik Otomasi & Robotik` |
| slug | text | NOT NULL, UNIQUE | URL slug | `teknik-otomasi-robotik` |
| description | text | - | Deskripsi singkat | `Program keahlian di bidang robotika` |
| content | text | - | Konten lengkap HTML | `<h2>Tentang Program</h2>...` |
| image_url | text | - | Gambar cover | `/images/programs/robotik.jpg` |
| icon | text | - | Nama icon | `Cpu` |
| color_theme | text | - | Tema warna | `blue` |
| is_active | boolean | DEFAULT true | Status aktif | `true` |
| order_position | integer | DEFAULT 0 | Urutan tampil | `1` |
| created_at | timestamptz | DEFAULT now() | Waktu dibuat | `2025-01-20 10:00:00` |

---

### 1.7 Tabel: `teachers`
**Fungsi:** Data guru dan staff

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK, DEFAULT gen_random_uuid() | ID unik guru | `ee0e8400-e29b-41d4-a716-446655440000` |
| full_name | text | NOT NULL | Nama lengkap | `Dr. Ahmad Fauzi, M.Pd` |
| nip | text | UNIQUE | NIP guru | `196805151994031005` |
| slug | text | UNIQUE | URL slug | `ahmad-fauzi` |
| position | text | NOT NULL | Jabatan | `Kepala Sekolah` |
| subject | text | - | Mata pelajaran/keahlian | `Manajemen Pendidikan` |
| photo_url | text | - | Foto profil | `/images/teachers/ahmad.jpg` |
| bio | text | - | Biografi singkat | `Berpengalaman 25 tahun...` |
| education | text | - | Pendidikan terakhir | `S3 Manajemen Pendidikan - UNJ` |
| certifications | text[] | - | Sertifikasi | `["Sertifikat Pendidik", "ISO Auditor"]` |
| email | text | - | Email | `ahmad.fauzi@smkmustaqbal.sch.id` |
| phone | text | - | Telepon | `081234567890` |
| is_active | boolean | DEFAULT true | Status aktif | `true` |
| order_position | integer | DEFAULT 0 | Urutan tampil | `1` |
| created_at | timestamptz | DEFAULT now() | Waktu dibuat | `2025-01-20 10:00:00` |

---

### 1.8 Tabel: `news_articles`
**Fungsi:** Artikel berita sekolah

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK, DEFAULT gen_random_uuid() | ID unik artikel | `ff0e8400-e29b-41d4-a716-446655440000` |
| title | text | NOT NULL | Judul berita | `Pendaftaran Siswa Baru 2025` |
| slug | text | NOT NULL, UNIQUE | URL slug | `pendaftaran-siswa-baru-2025` |
| excerpt | text | - | Ringkasan | `Pendaftaran dibuka 1 Januari...` |
| content | text | - | Konten lengkap HTML | `<p>Pendaftaran siswa baru...</p>` |
| author_id | uuid | FK REFERENCES admin_users(id) | Penulis | `550e8400-e29b-41d4...` |
| category_id | uuid | FK REFERENCES categories(id) | Kategori | `990e8400-e29b-41d4...` |
| cover_url | text | - | Gambar cover | `/images/news/ppdb2025.jpg` |
| tags | text[] | - | Tag artikel | `["PPDB", "Pendaftaran", "2025"]` |
| views | integer | DEFAULT 0 | Jumlah views | `1250` |
| is_published | boolean | DEFAULT false | Status publikasi | `true` |
| is_featured | boolean | DEFAULT false | Artikel unggulan | `true` |
| published_at | timestamptz | - | Waktu publikasi | `2025-01-15 08:00:00` |
| created_at | timestamptz | DEFAULT now() | Waktu dibuat | `2025-01-14 15:00:00` |
| updated_at | timestamptz | DEFAULT now() | Waktu diupdate | `2025-01-15 08:00:00` |

---

### 1.9 Tabel: `testimonials`
**Fungsi:** Testimoni alumni dan siswa

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK | ID unik testimoni | `110e8400-e29b-41d4...` |
| name | text | NOT NULL | Nama pemberi testimoni | `Rizki Ahmad` |
| role | text | - | Role/posisi | `Alumni TKJ 2020` |
| company | text | - | Perusahaan saat ini | `PT Astra Honda Motor` |
| current_position | text | - | Jabatan saat ini | `IT Support` |
| program | text | - | Program saat sekolah | `TKJ` |
| testimonial_text | text | NOT NULL | Isi testimoni | `SMK Mustaqbal memberikan...` |
| photo_url | text | - | Foto | `/images/testimonials/rizki.jpg` |
| avatar_url | text | - | Avatar (alias photo_url) | `/images/testimonials/rizki.jpg` |
| rating | integer | CHECK (rating >= 1 AND rating <= 5) | Rating 1-5 | `5` |
| is_featured | boolean | DEFAULT false | Ditampilkan di home | `true` |
| approved | boolean | DEFAULT false | Status persetujuan | `true` |
| created_at | timestamptz | DEFAULT now() | Waktu dibuat | `2025-01-20 10:00:00` |

---

### 1.10 Tabel: `gallery_items`
**Fungsi:** Galeri foto dan video sekolah

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK | ID unik item | `220e8400-e29b-41d4...` |
| title | text | NOT NULL | Judul | `Kelas Praktik Robotika` |
| description | text | - | Deskripsi | `Siswa sedang praktik...` |
| caption | text | - | Caption (alias description) | `Siswa sedang praktik...` |
| media_type | text | NOT NULL | Tipe media | `photo` atau `video` |
| media_url | text | NOT NULL | URL media utama | `/images/gallery/robotik1.jpg` |
| image_url | text | - | URL gambar (alias media_url) | `/images/gallery/robotik1.jpg` |
| thumbnail_url | text | - | URL thumbnail | `/images/gallery/thumb/robotik1.jpg` |
| alt_text | text | - | Alt text untuk SEO | `Siswa praktik robotika` |
| category | text | - | Kategori galeri | `photo` atau `video` |
| is_featured | boolean | DEFAULT false | Item unggulan | `true` |
| order_position | integer | DEFAULT 0 | Urutan tampil | `1` |
| taken_at | date | - | Tanggal pengambilan | `2025-01-15` |
| created_at | timestamptz | DEFAULT now() | Waktu dibuat | `2025-01-20 10:00:00` |
| updated_at | timestamptz | DEFAULT now() | Waktu diupdate | `2025-01-20 15:30:00` |

---

### 1.11 Tabel: `documents`
**Fungsi:** File download (brosur, jadwal, kalender akademik, SOP)

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK | ID unik dokumen | `330e8400-e29b-41d4...` |
| title | text | NOT NULL | Judul dokumen | `Kalender Akademik 2025` |
| filename | text | NOT NULL | Nama file asli | `kalender-akademik-2025.pdf` |
| url | text | NOT NULL | URL file | `/storage/documents/kalender2025.pdf` |
| mime_type | text | - | Tipe MIME | `application/pdf` |
| size | integer | - | Ukuran file (bytes) | `2048576` |
| category | text | - | Kategori dokumen | `akademik` |
| description | text | - | Deskripsi | `Kalender akademik tahun ajaran 2025` |
| uploaded_by | uuid | FK REFERENCES admin_users(id) | ID uploader | `550e8400-e29b-41d4...` |
| related_table | text | - | Tabel terkait | `news_articles` |
| related_id | uuid | - | ID record terkait | `ff0e8400-e29b-41d4...` |
| download_count | integer | DEFAULT 0 | Jumlah download | `125` |
| is_public | boolean | DEFAULT true | Dapat diakses publik | `true` |
| created_at | timestamptz | DEFAULT now() | Waktu dibuat | `2025-01-20 10:00:00` |

**Kategori Dokumen:**
- `akademik` - Kalender, jadwal pelajaran
- `administrasi` - Formulir, surat
- `brosur` - E-brochure, pamflet
- `sop` - Standard Operating Procedure
- `panduan` - Panduan siswa, panduan PPDB

---

### 1.12 Tabel: `ppdb_submissions`
**Fungsi:** Data pendaftaran siswa baru online

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK | ID unik pendaftaran | `440e8400-e29b-41d4...` |
| registration_number | text | UNIQUE | Nomor registrasi | `PPDB2025001` |
| full_name | text | NOT NULL | Nama lengkap | `Budi Santoso` |
| birth_date | date | - | Tanggal lahir | `2008-05-15` |
| birth_place | text | - | Tempat lahir | `Jakarta` |
| gender | text | - | Jenis kelamin | `Laki-laki` |
| religion | text | - | Agama | `Islam` |
| address | text | - | Alamat lengkap | `Jl. Merdeka No. 10...` |
| phone | text | - | No. telepon siswa | `081234567890` |
| email | text | - | Email siswa | `budi@example.com` |
| parent_name | text | - | Nama orang tua/wali | `Ahmad Santoso` |
| parent_phone | text | - | No. telepon ortu | `081298765432` |
| parent_email | text | - | Email ortu | `ahmad@example.com` |
| origin_school | text | - | Asal sekolah | `SMP N 1 Jakarta` |
| nisn | text | - | NISN siswa | `0012345678` |
| program_id | uuid | FK REFERENCES programs(id) | Program pilihan | `dd0e8400-e29b-41d4...` |
| documents | jsonb | - | Dokumen upload | `{"ktp": "url...", "ijazah": "url..."}` |
| status | text | DEFAULT 'pending' | Status pendaftaran | `pending`, `approved`, `rejected` |
| notes | text | - | Catatan admin | `Dokumen lengkap` |
| created_at | timestamptz | DEFAULT now() | Waktu daftar | `2025-01-20 10:00:00` |
| updated_at | timestamptz | DEFAULT now() | Waktu diupdate | `2025-01-21 14:00:00` |

---

### 1.13 Tabel: `ebrochure_downloads`
**Fungsi:** Tracking download e-brochure

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK | ID unik download | `550e8400-e29b-41d4...` |
| full_name | text | NOT NULL | Nama pengunduh | `Siti Aminah` |
| whatsapp | text | NOT NULL | No. WhatsApp | `081234567890` |
| origin_school | text | NOT NULL | Asal sekolah | `SMP N 2 Bekasi` |
| document_id | uuid | FK REFERENCES documents(id) | ID dokumen | `330e8400-e29b-41d4...` |
| email | text | - | Email | `siti@example.com` |
| ip_address | text | - | IP address | `192.168.1.1` |
| user_agent | text | - | Browser info | `Mozilla/5.0...` |
| downloaded_at | timestamptz | DEFAULT now() | Waktu download | `2025-01-20 10:00:00` |

---

### 1.14 Tabel: `facilities` (BARU)
**Fungsi:** Sarana dan prasarana sekolah

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK | ID unik fasilitas | `660e8400-e29b-41d4...` |
| name | text | NOT NULL | Nama fasilitas | `Lab Robotika` |
| slug | text | UNIQUE | URL slug | `lab-robotika` |
| description | text | - | Deskripsi | `Laboratorium robotika dengan...` |
| category | text | - | Kategori | `laboratorium`, `ruang_kelas`, `fasilitas_umum` |
| image_url | text | - | Gambar | `/images/facilities/lab-robotika.jpg` |
| specifications | jsonb | - | Spesifikasi detail | `{"capacity": 40, "area": "100m2"}` |
| is_active | boolean | DEFAULT true | Status aktif | `true` |
| order_position | integer | DEFAULT 0 | Urutan tampil | `1` |
| created_at | timestamptz | DEFAULT now() | Waktu dibuat | `2025-01-20 10:00:00` |

---

### 1.15 Tabel: `achievements` (BARU)
**Fungsi:** Prestasi siswa dan sekolah

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK | ID unik prestasi | `770e8400-e29b-41d4...` |
| title | text | NOT NULL | Judul prestasi | `Juara 1 LKS Robotika Tingkat Nasional` |
| slug | text | UNIQUE | URL slug | `juara-1-lks-robotika-nasional` |
| description | text | - | Deskripsi | `Tim robotika SMK Mustaqbal...` |
| student_name | text | - | Nama siswa | `Rizki Ahmad` |
| category | text | - | Kategori | `akademik`, `olahraga`, `seni`, `teknologi` |
| level | text | - | Tingkat | `sekolah`, `kota`, `provinsi`, `nasional`, `internasional` |
| rank | text | - | Peringkat | `Juara 1` |
| year | integer | - | Tahun | `2024` |
| event_date | date | - | Tanggal acara | `2024-11-15` |
| image_url | text | - | Foto prestasi | `/images/achievements/lks2024.jpg` |
| certificate_url | text | - | URL sertifikat | `/documents/certificates/lks2024.pdf` |
| is_featured | boolean | DEFAULT false | Prestasi unggulan | `true` |
| created_at | timestamptz | DEFAULT now() | Waktu dibuat | `2025-01-20 10:00:00` |

---

### 1.16 Tabel: `events` (BARU)
**Fungsi:** Kalender acara dan kegiatan sekolah

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK | ID unik event | `880e8400-e29b-41d4...` |
| title | text | NOT NULL | Judul acara | `Open House PPDB 2025` |
| slug | text | UNIQUE | URL slug | `open-house-ppdb-2025` |
| description | text | - | Deskripsi | `Kunjungi sekolah kami...` |
| event_type | text | - | Tipe acara | `ppdb`, `workshop`, `competition`, `ceremony`, `other` |
| start_date | timestamptz | NOT NULL | Waktu mulai | `2025-02-01 08:00:00` |
| end_date | timestamptz | - | Waktu selesai | `2025-02-01 14:00:00` |
| location | text | - | Lokasi | `Aula SMK Mustaqbal` |
| organizer | text | - | Penyelenggara | `Panitia PPDB` |
| image_url | text | - | Gambar banner | `/images/events/openhouse2025.jpg` |
| registration_url | text | - | Link pendaftaran | `https://forms.gle/xxx` |
| is_published | boolean | DEFAULT false | Status publikasi | `true` |
| created_at | timestamptz | DEFAULT now() | Waktu dibuat | `2025-01-20 10:00:00` |

---

### 1.17 Tabel: `announcements` (BARU)
**Fungsi:** Pengumuman penting (popup/banner)

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK | ID unik pengumuman | `990e8400-e29b-41d4...` |
| title | text | NOT NULL | Judul | `PPDB 2025 Dibuka!` |
| content | text | NOT NULL | Isi pengumuman | `Pendaftaran siswa baru...` |
| type | text | - | Tipe tampilan | `banner`, `popup`, `ticker` |
| priority | text | - | Prioritas | `high`, `normal`, `low` |
| start_date | timestamptz | - | Mulai tampil | `2025-01-15 00:00:00` |
| end_date | timestamptz | - | Selesai tampil | `2025-03-31 23:59:59` |
| link_url | text | - | Link terkait | `/ppdb` |
| link_text | text | - | Text link | `Daftar Sekarang` |
| is_active | boolean | DEFAULT true | Status aktif | `true` |
| created_at | timestamptz | DEFAULT now() | Waktu dibuat | `2025-01-20 10:00:00` |

---

### 1.18 Tabel: `newsletters` (BARU)
**Fungsi:** Subscriber newsletter

| Kolom | Tipe | Constraint | Deskripsi | Contoh |
|-------|------|------------|-----------|---------|
| id | uuid | PK | ID unik subscriber | `aa0e8400-e29b-41d4...` |
| email | text | NOT NULL, UNIQUE | Email subscriber | `user@example.com` |
| name | text | - | Nama | `John Doe` |
| is_subscribed | boolean | DEFAULT true | Status berlangganan | `true` |
| verified | boolean | DEFAULT false | Email terverifikasi | `true` |
| verification_token | text | - | Token verifikasi | `abc123...` |
| subscribed_at | timestamptz | DEFAULT now() | Waktu subscribe | `2025-01-20 10:00:00` |
| unsubscribed_at | timestamptz | - | Waktu unsubscribe | `null` |

---

## 2️⃣ ERD (Entity Relationship Diagram)

```
┌─────────────────┐
│  admin_users    │
│  - id (PK)      │
│  - email        │
│  - role         │
└─────────────────┘
        │
        │ 1
        │
        │ *
┌─────────────────┐       ┌─────────────────┐
│ news_articles   │   *   │   categories    │
│  - id (PK)      │───────│  - id (PK)      │
│  - author_id(FK)│   1   │  - name         │
│  - category_id  │       │  - slug         │
│  - title        │       └─────────────────┘
│  - content      │
└─────────────────┘
        │
        │ 1
        │
        │ *
┌─────────────────┐
│   documents     │
│  - id (PK)      │
│  - uploaded_by  │
│  - related_id   │
└─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│    programs     │   1   │ppdb_submissions │
│  - id (PK)      │───────│  - id (PK)      │
│  - name         │   *   │  - program_id   │
│  - slug         │       │  - full_name    │
└─────────────────┘       └─────────────────┘

┌─────────────────┐
│   menu_links    │
│  - id (PK)      │
│  - parent_id(FK)│──┐
│  - title        │  │
│  - href         │  │ self-referencing
└─────────────────┘  │ (submenu)
        └─────────────┘

┌─────────────────┐
│     pages       │
│  - id (PK)      │
│  - slug         │
│  - title        │
│  - content      │
└─────────────────┘

┌─────────────────┐
│    settings     │
│  - key (PK)     │
│  - value (JSON) │
└─────────────────┘

┌─────────────────┐
│    teachers     │
│  - id (PK)      │
│  - full_name    │
│  - position     │
└─────────────────┘

┌─────────────────┐
│  testimonials   │
│  - id (PK)      │
│  - name         │
│  - content      │
└─────────────────┘

┌─────────────────┐
│ gallery_items   │
│  - id (PK)      │
│  - media_url    │
│  - media_type   │
└─────────────────┘

┌─────────────────┐
│   facilities    │
│  - id (PK)      │
│  - name         │
│  - category     │
└─────────────────┘

┌─────────────────┐
│  achievements   │
│  - id (PK)      │
│  - title        │
│  - level        │
└─────────────────┘

┌─────────────────┐
│     events      │
│  - id (PK)      │
│  - title        │
│  - start_date   │
└─────────────────┘

┌─────────────────┐
│ announcements   │
│  - id (PK)      │
│  - title        │
│  - type         │
└─────────────────┘

┌─────────────────┐
│  newsletters    │
│  - id (PK)      │
│  - email        │
└─────────────────┘

┌─────────────────┐
│ebrochure_dwnlds │
│  - id (PK)      │
│  - document_id  │
└─────────────────┘
```

---

## 3️⃣ STRUKTUR FOLDER NEXT.JS (APP ROUTER)

```
smk-mustaqbal/
├── app/
│   ├── (public)/                      # Group route untuk public pages
│   │   ├── layout.tsx                 # Layout dengan header & footer
│   │   ├── page.tsx                   # Homepage (/)
│   │   ├── tentang/
│   │   │   ├── visi-misi/
│   │   │   │   └── page.tsx           # /tentang/visi-misi
│   │   │   ├── sejarah/
│   │   │   │   └── page.tsx           # /tentang/sejarah
│   │   │   ├── profile-guru/
│   │   │   │   └── page.tsx           # /tentang/profile-guru
│   │   │   └── struktur-organisasi/
│   │   │       └── page.tsx           # /tentang/struktur-organisasi
│   │   ├── program/
│   │   │   ├── page.tsx               # List semua program
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Detail program
│   │   ├── berita/
│   │   │   ├── page.tsx               # List berita
│   │   │   ├── kategori/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx       # Berita per kategori
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Detail berita
│   │   ├── galeri/
│   │   │   ├── foto/
│   │   │   │   └── page.tsx           # Galeri foto
│   │   │   └── video/
│   │   │       └── page.tsx           # Galeri video
│   │   ├── fasilitas/
│   │   │   ├── page.tsx               # List fasilitas
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Detail fasilitas
│   │   ├── prestasi/
│   │   │   └── page.tsx               # List prestasi
│   │   ├── kalender/
│   │   │   └── page.tsx               # Kalender akademik & events
│   │   ├── ppdb/
│   │   │   ├── page.tsx               # Form pendaftaran
│   │   │   └── success/
│   │   │       └── page.tsx           # Sukses page
│   │   ├── download/
│   │   │   └── page.tsx               # Halaman download dokumen
│   │   ├── kontak/
│   │   │   └── page.tsx               # Halaman kontak
│   │   └── portfolio/
│   │       └── page.tsx               # Portfolio karya siswa
│   │
│   ├── (admin)/                       # Group route untuk admin CMS
│   │   ├── layout.tsx                 # Layout admin (sidebar, topbar)
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx           # Dashboard overview
│   │   │   ├── berita/
│   │   │   │   ├── page.tsx           # List berita
│   │   │   │   ├── tambah/
│   │   │   │   │   └── page.tsx       # Tambah berita
│   │   │   │   └── [id]/
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx   # Edit berita
│   │   │   ├── kategori/
│   │   │   │   └── page.tsx           # Manage kategori
│   │   │   ├── program/
│   │   │   │   ├── page.tsx           # List program
│   │   │   │   ├── tambah/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/edit/
│   │   │   │       └── page.tsx
│   │   │   ├── guru/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── tambah/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/edit/
│   │   │   │       └── page.tsx
│   │   │   ├── galeri/
│   │   │   │   ├── page.tsx
│   │   │   │   └── upload/
│   │   │   │       └── page.tsx
│   │   │   ├── testimoni/
│   │   │   │   └── page.tsx
│   │   │   ├── fasilitas/
│   │   │   │   └── page.tsx
│   │   │   ├── prestasi/
│   │   │   │   └── page.tsx
│   │   │   ├── events/
│   │   │   │   └── page.tsx
│   │   │   ├── pengumuman/
│   │   │   │   └── page.tsx
│   │   │   ├── ppdb/
│   │   │   │   └── page.tsx           # Manage pendaftaran
│   │   │   ├── dokumen/
│   │   │   │   └── page.tsx           # Manage file download
│   │   │   ├── halaman/
│   │   │   │   ├── page.tsx           # List pages
│   │   │   │   ├── tambah/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/edit/
│   │   │   │       └── page.tsx
│   │   │   ├── menu/
│   │   │   │   └── page.tsx           # Manage navigation menu
│   │   │   ├── pengaturan/
│   │   │   │   ├── umum/
│   │   │   │   │   └── page.tsx       # General settings
│   │   │   │   ├── branding/
│   │   │   │   │   └── page.tsx       # Logo, colors
│   │   │   │   ├── hero/
│   │   │   │   │   └── page.tsx       # Hero section settings
│   │   │   │   └── social/
│   │   │   │       └── page.tsx       # Social media
│   │   │   └── pengguna/
│   │   │       └── page.tsx           # Manage admin users
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts           # POST /api/auth/login
│   │   │   ├── logout/
│   │   │   │   └── route.ts           # POST /api/auth/logout
│   │   │   └── me/
│   │   │       └── route.ts           # GET /api/auth/me
│   │   ├── news/
│   │   │   ├── route.ts               # GET, POST /api/news
│   │   │   └── [id]/
│   │   │       └── route.ts           # GET, PATCH, DELETE /api/news/[id]
│   │   ├── categories/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── programs/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── teachers/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── gallery/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── testimonials/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── pages/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── settings/
│   │   │   ├── route.ts               # GET, PUT /api/settings
│   │   │   └── [key]/
│   │   │       └── route.ts           # GET, PUT /api/settings/[key]
│   │   ├── ppdb/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── documents/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── facilities/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── achievements/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── events/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── announcements/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   ├── newsletters/
│   │   │   ├── subscribe/
│   │   │   │   └── route.ts           # POST /api/newsletters/subscribe
│   │   │   └── unsubscribe/
│   │   │       └── route.ts           # POST /api/newsletters/unsubscribe
│   │   └── upload/
│   │       └── route.ts               # POST /api/upload (image/file)
│   │
│   ├── globals.css
│   ├── layout.tsx                     # Root layout
│   └── not-found.tsx
│
├── components/
│   ├── public/                        # Components untuk public site
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── NewsCard.tsx
│   │   ├── ProgramCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── GalleryGrid.tsx
│   │   ├── ContactForm.tsx
│   │   ├── PPDBForm.tsx
│   │   ├── NewsletterForm.tsx
│   │   └── AnnouncementBanner.tsx
│   │
│   ├── admin/                         # Components untuk CMS admin
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminTopbar.tsx
│   │   ├── DataTable.tsx
│   │   ├── Modal.tsx
│   │   ├── FormFields.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── RichTextEditor.tsx         # WYSIWYG/Markdown
│   │   ├── StatsCard.tsx
│   │   └── DeleteConfirmDialog.tsx
│   │
│   └── ui/                            # shadcn/ui components
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── table.tsx
│       ├── dialog.tsx
│       ├── select.tsx
│       ├── textarea.tsx
│       ├── label.tsx
│       ├── badge.tsx
│       ├── tabs.tsx
│       └── ...
│
├── lib/
│   ├── supabase.ts                    # Supabase client
│   ├── supabase-server.ts             # Supabase untuk server components
│   ├── utils.ts                       # Utility functions
│   ├── constants.ts                   # Constants
│   ├── validations.ts                 # Zod schemas
│   └── hooks/
│       ├── useAuth.ts
│       ├── useSettings.ts
│       └── useUpload.ts
│
├── types/
│   ├── database.ts                    # TypeScript types dari database
│   ├── supabase.ts                    # Supabase generated types
│   └── index.ts
│
├── middleware.ts                      # Auth middleware
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

---

## 4️⃣ API ROUTE STRUCTURE (CRUD LENGKAP)

### 4.1 News Articles API

#### GET /api/news
**Fungsi:** Mengambil daftar berita dengan filtering & pagination

**Query Parameters:**
```typescript
{
  page?: number;          // Default: 1
  limit?: number;         // Default: 10
  category?: string;      // Filter by category slug
  is_published?: boolean; // Filter published/draft
  search?: string;        // Search by title
  is_featured?: boolean;  // Filter featured articles
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "ff0e8400-e29b-41d4-a716-446655440000",
      "title": "Pendaftaran Siswa Baru 2025 Dibuka",
      "slug": "pendaftaran-siswa-baru-2025",
      "excerpt": "SMK Mustaqbal membuka pendaftaran siswa baru...",
      "cover_url": "/images/news/ppdb2025.jpg",
      "category": {
        "id": "990e8400-e29b-41d4-a716-446655440000",
        "name": "Pengumuman",
        "slug": "pengumuman"
      },
      "author": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "full_name": "Ahmad Fauzi"
      },
      "views": 1250,
      "is_published": true,
      "is_featured": true,
      "published_at": "2025-01-15T08:00:00Z",
      "created_at": "2025-01-14T15:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

#### POST /api/news
**Fungsi:** Membuat berita baru (Admin only)

**Request Body:**
```json
{
  "title": "Workshop Kurikulum Merdeka",
  "slug": "workshop-kurikulum-merdeka",
  "excerpt": "SMK Mustaqbal mengadakan workshop pengembangan kurikulum merdeka",
  "content": "<p>Content lengkap dalam HTML...</p>",
  "category_id": "990e8400-e29b-41d4-a716-446655440000",
  "cover_url": "/images/news/workshop.jpg",
  "tags": ["workshop", "kurikulum", "pendidikan"],
  "is_published": true,
  "is_featured": false,
  "published_at": "2025-01-20T08:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Berita berhasil dibuat",
  "data": {
    "id": "110e8400-e29b-41d4-a716-446655440000",
    "title": "Workshop Kurikulum Merdeka",
    "slug": "workshop-kurikulum-merdeka",
    "created_at": "2025-01-20T10:00:00Z"
  }
}
```

#### GET /api/news/[id]
**Fungsi:** Mengambil detail berita

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "ff0e8400-e29b-41d4-a716-446655440000",
    "title": "Pendaftaran Siswa Baru 2025 Dibuka",
    "slug": "pendaftaran-siswa-baru-2025",
    "excerpt": "SMK Mustaqbal membuka pendaftaran...",
    "content": "<h2>Pendaftaran Dibuka</h2><p>...</p>",
    "cover_url": "/images/news/ppdb2025.jpg",
    "category": {
      "id": "990e8400-e29b-41d4-a716-446655440000",
      "name": "Pengumuman"
    },
    "author": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "full_name": "Ahmad Fauzi",
      "avatar_url": "/images/admin1.jpg"
    },
    "tags": ["PPDB", "Pendaftaran", "2025"],
    "views": 1250,
    "is_published": true,
    "published_at": "2025-01-15T08:00:00Z",
    "created_at": "2025-01-14T15:00:00Z",
    "updated_at": "2025-01-15T08:00:00Z"
  }
}
```

#### PATCH /api/news/[id]
**Fungsi:** Update berita (Admin only)

**Request Body:**
```json
{
  "title": "Pendaftaran Siswa Baru 2025 - Update",
  "content": "<p>Updated content...</p>",
  "is_published": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Berita berhasil diupdate",
  "data": {
    "id": "ff0e8400-e29b-41d4-a716-446655440000",
    "updated_at": "2025-01-20T14:00:00Z"
  }
}
```

#### DELETE /api/news/[id]
**Fungsi:** Hapus berita (Admin only)

**Response:**
```json
{
  "success": true,
  "message": "Berita berhasil dihapus"
}
```

---

### 4.2 Programs API

#### GET /api/programs
```json
{
  "success": true,
  "data": [
    {
      "id": "dd0e8400-e29b-41d4-a716-446655440000",
      "name": "Teknik Otomasi & Robotik",
      "slug": "teknik-otomasi-robotik",
      "description": "Program keahlian di bidang robotika dan otomasi industri",
      "image_url": "/images/programs/robotik.jpg",
      "icon": "Cpu",
      "color_theme": "blue",
      "is_active": true,
      "order_position": 1
    }
  ]
}
```

#### POST /api/programs
```json
{
  "name": "Web Development & Digital Marketing",
  "slug": "web-dev-digital-marketing",
  "description": "Program keahlian web development dan digital marketing",
  "content": "<h2>Tentang Program</h2><p>...</p>",
  "image_url": "/images/programs/webdev.jpg",
  "icon": "Code",
  "color_theme": "purple",
  "is_active": true,
  "order_position": 4
}
```

---

### 4.3 Teachers API

#### GET /api/teachers
```json
{
  "success": true,
  "data": [
    {
      "id": "ee0e8400-e29b-41d4-a716-446655440000",
      "full_name": "Dr. Ahmad Fauzi, M.Pd",
      "nip": "196805151994031005",
      "position": "Kepala Sekolah",
      "subject": "Manajemen Pendidikan",
      "photo_url": "/images/teachers/ahmad.jpg",
      "education": "S3 Manajemen Pendidikan - UNJ",
      "certifications": ["Sertifikat Pendidik", "ISO Auditor"],
      "email": "ahmad.fauzi@smkmustaqbal.sch.id",
      "is_active": true,
      "order_position": 1
    }
  ]
}
```

---

### 4.4 Settings API

#### GET /api/settings
**Fungsi:** Mengambil semua settings

```json
{
  "success": true,
  "data": {
    "school_info": {
      "name": "SMK Mustaqbal",
      "tagline": "School of Future",
      "address": "Jl. Raya Bekasi No. 123, Jakarta Timur",
      "phone": "021-12345678",
      "whatsapp": "628123456789",
      "email": "info@smkmustaqbal.sch.id"
    },
    "branding": {
      "logo_url": "/images/logo.png",
      "primary_color": "#0d9488"
    },
    "social_media": {
      "facebook": "https://facebook.com/smkmustaqbal",
      "instagram": "https://instagram.com/smkmustaqbal"
    }
  }
}
```

#### GET /api/settings/[key]
**Fungsi:** Mengambil setting spesifik

```json
{
  "success": true,
  "data": {
    "key": "school_info",
    "value": {
      "name": "SMK Mustaqbal",
      "phone": "021-12345678"
    }
  }
}
```

#### PUT /api/settings/[key]
**Fungsi:** Update setting (Admin only)

**Request Body:**
```json
{
  "value": {
    "name": "SMK Mustaqbal Jakarta",
    "phone": "021-87654321"
  }
}
```

---

### 4.5 Upload API

#### POST /api/upload
**Fungsi:** Upload file/image ke Supabase Storage

**Request:** multipart/form-data
```typescript
{
  file: File;
  folder?: string; // 'news', 'programs', 'teachers', 'gallery'
  maxSize?: number; // Max file size in MB
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "/storage/news/image-1705740000.jpg",
    "filename": "image-1705740000.jpg",
    "size": 256000,
    "mimeType": "image/jpeg"
  }
}
```

---

### 4.6 PPDB API

#### POST /api/ppdb
**Fungsi:** Submit pendaftaran siswa baru

**Request Body:**
```json
{
  "full_name": "Budi Santoso",
  "birth_date": "2008-05-15",
  "birth_place": "Jakarta",
  "gender": "Laki-laki",
  "religion": "Islam",
  "address": "Jl. Merdeka No. 10, Jakarta",
  "phone": "081234567890",
  "email": "budi@example.com",
  "parent_name": "Ahmad Santoso",
  "parent_phone": "081298765432",
  "origin_school": "SMP N 1 Jakarta",
  "nisn": "0012345678",
  "program_id": "dd0e8400-e29b-41d4-a716-446655440000",
  "documents": {
    "ijazah": "/uploads/ijazah-budi.pdf",
    "kk": "/uploads/kk-budi.pdf"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pendaftaran berhasil! Nomor registrasi Anda: PPDB2025001",
  "data": {
    "id": "440e8400-e29b-41d4-a716-446655440000",
    "registration_number": "PPDB2025001",
    "status": "pending"
  }
}
```

#### GET /api/ppdb (Admin only)
**Fungsi:** List semua pendaftaran dengan filter

**Query Parameters:**
```typescript
{
  status?: 'pending' | 'approved' | 'rejected';
  program_id?: string;
  search?: string;
}
```

---

## 5️⃣ CMS ADMIN DASHBOARD DESIGN CONCEPT

### 5.1 Layout Structure

```typescript
// app/(admin)/layout.tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <AdminTopbar />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### 5.2 Sidebar Menu

```typescript
const menuItems = [
  {
    section: "Dashboard",
    items: [
      { label: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" }
    ]
  },
  {
    section: "Konten",
    items: [
      { label: "Berita", icon: Newspaper, href: "/admin/berita" },
      { label: "Kategori", icon: FolderOpen, href: "/admin/kategori" },
      { label: "Halaman", icon: FileText, href: "/admin/halaman" },
      { label: "Menu Navigasi", icon: Menu, href: "/admin/menu" },
    ]
  },
  {
    section: "Akademik",
    items: [
      { label: "Program Keahlian", icon: GraduationCap, href: "/admin/program" },
      { label: "Guru & Staff", icon: Users, href: "/admin/guru" },
      { label: "Fasilitas", icon: Building2, href: "/admin/fasilitas" },
      { label: "Prestasi", icon: Trophy, href: "/admin/prestasi" },
      { label: "Events", icon: Calendar, href: "/admin/events" },
    ]
  },
  {
    section: "Media",
    items: [
      { label: "Galeri", icon: Image, href: "/admin/galeri" },
      { label: "Dokumen", icon: FileDown, href: "/admin/dokumen" },
      { label: "Testimoni", icon: MessageSquare, href: "/admin/testimoni" },
    ]
  },
  {
    section: "PPDB",
    items: [
      { label: "Pendaftaran", icon: UserPlus, href: "/admin/ppdb" },
      { label: "E-Brochure Downloads", icon: Download, href: "/admin/ebrochure" },
    ]
  },
  {
    section: "Sistem",
    items: [
      { label: "Pengumuman", icon: Bell, href: "/admin/pengumuman" },
      { label: "Newsletter", icon: Mail, href: "/admin/newsletter" },
      { label: "Pengaturan", icon: Settings, href: "/admin/pengaturan" },
      { label: "Pengguna Admin", icon: Shield, href: "/admin/pengguna" },
    ]
  },
];
```

### 5.3 Data Table Component

```typescript
// components/admin/DataTable.tsx
interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  onEdit,
  onDelete,
  onView
}: DataTableProps<T>) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={String(col.key)}>{col.label}</TableHead>
            ))}
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell key={String(col.key)}>
                  {col.render ? col.render(item) : item[col.key]}
                </TableCell>
              ))}
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {onView && (
                    <Button size="sm" variant="ghost" onClick={() => onView(item)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                  {onEdit && (
                    <Button size="sm" variant="ghost" onClick={() => onEdit(item)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button size="sm" variant="ghost" onClick={() => onDelete(item)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
```

### 5.4 Image Uploader Component

```typescript
// components/admin/ImageUploader.tsx
interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  maxSize?: number; // MB
  aspectRatio?: string; // "16:9", "1:1", "4:3"
}

export function ImageUploader({
  value,
  onChange,
  folder = 'general',
  maxSize = 5,
  aspectRatio
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);

  const handleUpload = async (file: File) => {
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setPreview(data.data.url);
        onChange(data.data.url);
        toast.success('Upload berhasil');
      }
    } catch (error) {
      toast.error('Upload gagal');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {preview && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <Button
            size="sm"
            variant="destructive"
            className="absolute top-2 right-2"
            onClick={() => {
              setPreview(undefined);
              onChange('');
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <div className="border-2 border-dashed rounded-lg p-8 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
          <p className="text-sm text-slate-600">
            Klik untuk upload atau drag & drop
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Max {maxSize}MB {aspectRatio && `• Ratio ${aspectRatio}`}
          </p>
        </label>
      </div>
    </div>
  );
}
```

### 5.5 Rich Text Editor

```typescript
// components/admin/RichTextEditor.tsx
// Using TipTap or React-Quill

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Image, Link],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex gap-2 p-2 border-b bg-slate-50">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-4 h-4" />
        </Button>
        {/* More toolbar buttons */}
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="prose max-w-none p-4" />
    </div>
  );
}
```

---

## 6️⃣ WORKFLOW TEKNIS LENGKAP

### 6.1 Next.js Rendering Strategies

#### SSR (Server-Side Rendering)
Digunakan untuk halaman yang memerlukan data real-time atau personalisasi

```typescript
// app/(public)/berita/[slug]/page.tsx
export default async function NewsDetailPage({
  params
}: {
  params: { slug: string }
}) {
  // Fetch data di server setiap request
  const { data: article } = await supabase
    .from('news_articles')
    .select('*, category(*), author(*)')
    .eq('slug', params.slug)
    .single();

  return <ArticleDetail article={article} />;
}
```

#### ISR (Incremental Static Regeneration)
Untuk konten semi-statis yang jarang berubah

```typescript
// app/(public)/program/page.tsx
export const revalidate = 3600; // Revalidate every 1 hour

export default async function ProgramsPage() {
  const { data: programs } = await supabase
    .from('programs')
    .select('*')
    .eq('is_active', true)
    .order('order_position');

  return <ProgramsList programs={programs} />;
}
```

#### CSR (Client-Side Rendering)
Untuk interaksi user yang dinamis

```typescript
'use client';

export function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    await fetch('/api/newsletters/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### 6.2 Supabase Integration

#### Client-side Supabase
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

#### Server-side Supabase (dengan Auth)
```typescript
// lib/supabase-server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}
```

### 6.3 File Upload Flow

```typescript
// API Route: app/api/upload/route.ts
import { createClient } from '@/lib/supabase-server';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  // Check auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File;
  const folder = formData.get('folder') as string || 'general';

  // Validate file
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return Response.json({ error: 'File too large' }, { status: 400 });
  }

  // Generate unique filename
  const ext = file.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
  const filePath = `${folder}/${filename}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('public')
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false
    });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('public')
    .getPublicUrl(filePath);

  return Response.json({
    success: true,
    data: {
      url: publicUrl,
      filename: filename,
      size: file.size,
      mimeType: file.type
    }
  });
}
```

### 6.4 Settings Implementation

#### Fetch Settings in Layout
```typescript
// app/(public)/layout.tsx
import { createClient } from '@/lib/supabase-server';

export default async function PublicLayout({
  children
}: {
  children: React.ReactNode
}) {
  const supabase = createClient();

  // Fetch all settings
  const { data: settings } = await supabase
    .from('settings')
    .select('key, value');

  // Transform to object
  const config = settings?.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, any>);

  return (
    <div>
      <Header config={config} />
      {children}
      <Footer config={config} />
    </div>
  );
}
```

#### Use Settings in Component
```typescript
// components/Header.tsx
export function Header({ config }: { config: any }) {
  const schoolInfo = config.school_info;
  const branding = config.branding;
  const socialMedia = config.social_media;

  return (
    <header>
      <img src={branding.logo_url} alt={schoolInfo.name} />
      <h1>{schoolInfo.name}</h1>
      <p>{schoolInfo.tagline}</p>
      <nav>
        <a href={socialMedia.facebook}>Facebook</a>
        <a href={socialMedia.instagram}>Instagram</a>
      </nav>
    </header>
  );
}
```

### 6.5 Dynamic Pages from Database

```typescript
// app/(public)/[slug]/page.tsx
import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: pages } = await supabase
    .from('pages')
    .select('slug')
    .eq('is_published', true);

  return pages?.map((page) => ({
    slug: page.slug
  })) || [];
}

export default async function DynamicPage({
  params
}: {
  params: { slug: string }
}) {
  const supabase = createClient();

  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', params.slug)
    .eq('is_published', true)
    .single();

  if (!page) notFound();

  return (
    <div className="container mx-auto px-4 py-20">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}
```

---

## 7️⃣ FITUR WAJIB WEBSITE SEKOLAH MODERN

### 7.1 Homepage Features
- ✅ Hero Section dengan slideshow otomatis
- ✅ Announcement Banner (pengumuman penting)
- ✅ Program Keahlian Cards
- ✅ Testimoni Alumni
- ✅ Berita Terkini (3-6 artikel featured)
- ✅ Statistik Sekolah (Jumlah siswa, guru, alumni bekerja)
- ✅ Partner/Mitra Industri
- ✅ CTA PPDB (Call-to-Action pendaftaran)
- ✅ Newsletter Subscription

### 7.2 PPDB Online
- Form pendaftaran multi-step
- Upload dokumen (KTP, Ijazah, KK, Foto)
- Pilihan program keahlian
- Notifikasi email otomatis
- Nomor registrasi otomatis
- Dashboard tracking status pendaftaran
- Admin dashboard untuk approve/reject

### 7.3 E-Brochure Download
- Form data diri (nama, WA, asal sekolah)
- Tracking download
- Kirim otomatis via WhatsApp/Email
- Analytics download count

### 7.4 Kalender Akademik & Events
- View kalender bulanan
- List upcoming events
- Filter by event type
- RSVP/Registration untuk event tertentu
- Notifikasi H-7 sebelum event

### 7.5 Galeri
- Grid view foto dengan lightbox
- Video gallery (YouTube embed)
- Filter by kategori/tahun
- Lazy loading images
- Infinite scroll atau pagination

### 7.6 Prestasi
- List prestasi dengan filter (kategori, level, tahun)
- Detail prestasi dengan foto & sertifikat
- Featured achievements di homepage

### 7.7 Fasilitas
- Grid view dengan foto
- Detail fasilitas dengan spesifikasi
- Virtual tour (360° photo atau video)

### 7.8 Download Center
- Kategori dokumen (Akademik, Administrasi, Panduan)
- Search & filter
- Download counter
- Preview PDF inline

### 7.9 Sistem Newsletter
- Subscribe form
- Email verification
- Unsubscribe link
- Admin dashboard untuk send broadcast

### 7.10 SEO & Analytics
- Meta tags dynamic per halaman
- Open Graph untuk social sharing
- Sitemap.xml auto-generated
- Google Analytics integration
- Search functionality

---

## 8️⃣ CONTOH REAL IMPLEMENTATION

### 8.1 Contoh Settings Table Data

```sql
-- Insert settings data
INSERT INTO settings (key, value, description) VALUES
('school_info', '{
  "name": "SMK Mustaqbal",
  "tagline": "School of Future",
  "npsn": "12345678",
  "address": "Jl. Raya Bekasi No. 123, Jakarta Timur 13210",
  "phone": "021-12345678",
  "whatsapp": "628123456789",
  "email": "info@smkmustaqbal.sch.id",
  "website": "https://smkmustaqbal.sch.id"
}', 'Informasi umum sekolah'),

('branding', '{
  "logo_url": "/images/logo.png",
  "logo_white_url": "/images/logo-white.png",
  "favicon_url": "/images/favicon.ico",
  "primary_color": "#0d9488",
  "secondary_color": "#10b981",
  "font_family": "Inter"
}', 'Branding dan identitas visual'),

('social_media', '{
  "facebook": "https://facebook.com/smkmustaqbal",
  "instagram": "https://instagram.com/smkmustaqbal",
  "youtube": "https://youtube.com/@smkmustaqbal",
  "twitter": "https://twitter.com/smkmustaqbal",
  "tiktok": "https://tiktok.com/@smkmustaqbal"
}', 'Link social media sekolah'),

('hero_section', '{
  "title": "Langkah Awal Menuju Masa Depan Hebat",
  "subtitle": "Bangun karir impianmu bersama SMK Mustaqbal. Kurikulum berbasis industri, fasilitas modern, dan jaminan penyaluran kerja ke perusahaan ternama.",
  "cta_primary_text": "Daftar Sekarang",
  "cta_primary_link": "/ppdb",
  "cta_secondary_text": "Unduh Kurikulum",
  "cta_secondary_link": "/download",
  "background_images": [
    "/images/hero/slide1.jpg",
    "/images/hero/slide2.jpg",
    "/images/hero/slide3.jpg"
  ]
}', 'Konten hero section homepage'),

('stats', '{
  "total_students": 1250,
  "total_teachers": 65,
  "alumni_working": 2800,
  "industry_partners": 50,
  "placement_rate": 92
}', 'Statistik sekolah untuk homepage'),

('contact', '{
  "maps_embed": "https://www.google.com/maps/embed?pb=...",
  "office_hours": "Senin - Jumat: 07:00 - 16:00, Sabtu: 07:00 - 12:00"
}', 'Informasi kontak tambahan');
```

### 8.2 Contoh News Article

```sql
INSERT INTO news_articles (
  title, slug, excerpt, content, category_id, cover_url,
  tags, is_published, is_featured, published_at
) VALUES (
  'Pendaftaran Siswa Baru Tahun Ajaran 2025/2026 Resmi Dibuka',
  'pendaftaran-siswa-baru-2025-2026',
  'SMK Mustaqbal resmi membuka pendaftaran siswa baru untuk tahun ajaran 2025/2026. Tersedia 4 program keahlian unggulan dengan fasilitas modern dan jaminan penyaluran kerja.',
  '<h2>Pendaftaran Dibuka!</h2>
   <p>SMK Mustaqbal dengan bangga mengumumkan bahwa pendaftaran siswa baru untuk tahun ajaran 2025/2026 telah resmi dibuka mulai tanggal <strong>1 Januari 2025</strong>.</p>

   <h3>Program Keahlian yang Tersedia</h3>
   <ul>
     <li>Teknik Otomasi & Robotik</li>
     <li>Product Design & 3D</li>
     <li>IT Support & Network</li>
     <li>Web Development & Digital Marketing</li>
   </ul>

   <h3>Syarat Pendaftaran</h3>
   <ol>
     <li>Lulus SMP/MTs atau sederajat</li>
     <li>Memiliki NISN aktif</li>
     <li>Mengisi formulir pendaftaran online</li>
     <li>Melengkapi dokumen: Ijazah, KK, Akte Kelahiran, Foto 3x4</li>
   </ol>

   <h3>Jalur Pendaftaran</h3>
   <p>Kami menyediakan 2 jalur pendaftaran:</p>
   <ul>
     <li><strong>Jalur Reguler</strong>: 1 Januari - 31 Maret 2025</li>
     <li><strong>Jalur Prestasi</strong>: Khusus untuk siswa berprestasi akademik atau non-akademik</li>
   </ul>

   <p>Untuk informasi lebih lengkap dan pendaftaran online, kunjungi: <a href="/ppdb">Halaman PPDB</a></p>',
  (SELECT id FROM categories WHERE slug = 'pengumuman'),
  '/images/news/ppdb-2025.jpg',
  ARRAY['PPDB', 'Pendaftaran', '2025', 'Siswa Baru'],
  true,
  true,
  '2025-01-15 08:00:00+07'
);
```

### 8.3 Contoh Static Page (Visi Misi)

```sql
INSERT INTO pages (slug, title, content, meta, is_published) VALUES (
  'visi-misi',
  'Visi & Misi SMK Mustaqbal',
  '<section>
    <h2>Visi</h2>
    <blockquote>
      "Menjadi SMK yang memuliakan fitrah, unggul dalam vokasi, dan adaptif teknologi—melahirkan lulusan berakhlaq, mandiri, dan berdampak."
    </blockquote>

    <h3>Pilar Visi</h3>
    <div class="grid grid-cols-3 gap-6">
      <div>
        <h4>Memuliakan Fitrah</h4>
        <p>Mengembangkan potensi diri sesuai nilai spiritual dan karakter</p>
      </div>
      <div>
        <h4>Unggul Vokasi</h4>
        <p>Menguasai keahlian praktis relevan dengan industri</p>
      </div>
      <div>
        <h4>Adaptif Teknologi</h4>
        <p>Mengikuti perkembangan teknologi dalam karya</p>
      </div>
    </div>
  </section>

  <section>
    <h2>Misi</h2>
    <ol>
      <li>
        <strong>Pembentukan Akhlaq & Fitrah</strong>
        <ul>
          <li>Menanamkan iman, adab, dan amanah sebagai pondasi sikap kerja</li>
          <li>Membiasakan disiplin, kolaborasi, dan layanan bermanfaat</li>
          <li>Refleksi berkala melalui jurnal karakter & mentoring</li>
        </ul>
      </li>
      <li>
        <strong>Kurikulum Vokasi Adaptif</strong>
        <ul>
          <li>Model belajar 80/20 berbasis proyek & magang</li>
          <li>Portofolio nyata sebagai bukti kompetensi</li>
          <li>Micro-credential relevan dengan industri</li>
        </ul>
      </li>
      <li>
        <strong>Kemitraan Industri</strong>
        <ul>
          <li>Kolaborasi proyek dan magang terarah</li>
          <li>Showcase karya & career day bersama mitra</li>
          <li>Penyaluran ke ekosistem kerja</li>
        </ul>
      </li>
      <li>
        <strong>Budaya Data & Teknologi</strong>
        <ul>
          <li>Literasi digital dan dokumentasi proses</li>
          <li>Penggunaan alat modern yang legal & aman</li>
          <li>Penguatan keselamatan & kesehatan kerja</li>
        </ul>
      </li>
    </ol>
  </section>',
  '{
    "description": "Visi dan Misi SMK Mustaqbal dalam menghasilkan lulusan berkualitas, berakhlaq mulia, dan siap bersaing di dunia industri",
    "keywords": "visi misi, SMK Mustaqbal, pendidikan vokasi, sekolah menengah kejuruan"
  }',
  true
);
```

### 8.4 Contoh Menu Navigation

```sql
-- Main menu items
INSERT INTO menu_links (title, href, parent_id, position, icon) VALUES
('Beranda', '/', NULL, 1, 'Home'),
('Tentang Kami', '#', NULL, 2, 'Info'),
('Program Keahlian', '/program', NULL, 3, 'GraduationCap'),
('Galeri', '#', NULL, 4, 'Images'),
('Berita', '/berita', NULL, 5, 'Newspaper'),
('Hubungi Kami', '/kontak', NULL, 6, 'Phone');

-- Submenu for "Tentang Kami"
INSERT INTO menu_links (title, href, parent_id, position) VALUES
('Visi & Misi', '/tentang/visi-misi', (SELECT id FROM menu_links WHERE title = 'Tentang Kami'), 1),
('Sejarah', '/tentang/sejarah', (SELECT id FROM menu_links WHERE title = 'Tentang Kami'), 2),
('Struktur Organisasi', '/tentang/struktur-organisasi', (SELECT id FROM menu_links WHERE title = 'Tentang Kami'), 3),
('Profile Guru', '/tentang/profile-guru', (SELECT id FROM menu_links WHERE title = 'Tentang Kami'), 4),
('Fasilitas', '/fasilitas', (SELECT id FROM menu_links WHERE title = 'Tentang Kami'), 5);

-- Submenu for "Galeri"
INSERT INTO menu_links (title, href, parent_id, position) VALUES
('Galeri Foto', '/galeri/foto', (SELECT id FROM menu_links WHERE title = 'Galeri'), 1),
('Galeri Video', '/galeri/video', (SELECT id FROM menu_links WHERE title = 'Galeri'), 2);
```

### 8.5 Contoh Fetch Data dari Supabase

```typescript
// app/(public)/berita/page.tsx
import { createClient } from '@/lib/supabase-server';
import { NewsCard } from '@/components/public/NewsCard';

interface SearchParams {
  page?: string;
  category?: string;
}

export default async function NewsPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const supabase = createClient();
  const page = parseInt(searchParams.page || '1');
  const limit = 9;
  const offset = (page - 1) * limit;

  // Build query
  let query = supabase
    .from('news_articles')
    .select(`
      *,
      category:categories(id, name, slug),
      author:admin_users(id, full_name, avatar_url)
    `, { count: 'exact' })
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  // Filter by category if provided
  if (searchParams.category) {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', searchParams.category)
      .single();

    if (category) {
      query = query.eq('category_id', category.id);
    }
  }

  const { data: articles, count } = await query;

  const totalPages = Math.ceil((count || 0) / limit);

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-12">Berita SMK Mustaqbal</h1>

      {/* Category Filter */}
      <CategoryFilter currentCategory={searchParams.category} />

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {articles?.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        baseUrl="/berita"
      />
    </div>
  );
}
```

---

## 9️⃣ SECURITY & BEST PRACTICES

### 9.1 Row Level Security (RLS)

```sql
-- Enable RLS for all tables
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
-- ... enable for all tables

-- Public read access for published content
CREATE POLICY "Anyone can view published news"
  ON news_articles FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Admin can do everything
CREATE POLICY "Admins can do everything on news"
  ON news_articles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'admin'
    )
  );

-- Editors can insert and update
CREATE POLICY "Editors can insert news"
  ON news_articles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role IN ('admin', 'editor')
    )
  );
```

### 9.2 Authentication Middleware

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check auth for /admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    // Check if user is admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!adminUser) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*']
};
```

### 9.3 Input Validation

```typescript
// lib/validations.ts
import { z } from 'zod';

export const newsArticleSchema = z.object({
  title: z.string().min(10).max(200),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(100),
  category_id: z.string().uuid(),
  cover_url: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  is_published: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  published_at: z.string().datetime().optional(),
});

export const ppdbSubmissionSchema = z.object({
  full_name: z.string().min(3).max(100),
  birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: z.enum(['Laki-laki', 'Perempuan']),
  phone: z.string().regex(/^(\+62|62|0)[0-9]{9,12}$/),
  email: z.string().email(),
  program_id: z.string().uuid(),
  // ... more fields
});
```

### 9.4 Error Handling

```typescript
// lib/api-response.ts
export function apiSuccess<T>(data: T, message?: string) {
  return Response.json({
    success: true,
    message,
    data
  });
}

export function apiError(message: string, status: number = 400) {
  return Response.json({
    success: false,
    error: message
  }, { status });
}

// Usage in API route
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = newsArticleSchema.parse(body);

    // ... create article

    return apiSuccess(article, 'Berita berhasil dibuat');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return apiError('Validation error: ' + error.message, 400);
    }
    return apiError('Internal server error', 500);
  }
}
```

---

## 🎯 KESIMPULAN

Dokumentasi ini menyediakan blueprint lengkap untuk membangun Website Sekolah Modern dengan CMS Admin yang profesional. Dengan mengikuti struktur database, folder, dan API yang telah dirancang, Anda dapat:

1. ✅ Membangun website sekolah yang SEO-friendly dan performant
2. ✅ Menyediakan CMS yang mudah digunakan oleh non-teknis
3. ✅ Mengimplementasikan fitur-fitur modern (PPDB Online, Galeri, dll)
4. ✅ Mengelola konten dinamis tanpa coding
5. ✅ Skalabel dan mudah di-maintain

**Tech Stack:**
- Next.js 13+ (App Router)
- Supabase (Database + Storage + Auth)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

**Next Steps:**
1. Setup Supabase project dan jalankan migration SQL
2. Clone Next.js starter dan install dependencies
3. Implement API routes sesuai spesifikasi
4. Build admin CMS dashboard
5. Develop public pages
6. Testing dan deployment

Semoga dokumentasi ini bermanfaat! 🚀
