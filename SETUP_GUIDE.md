# 🚀 Setup Guide - Website Sekolah + CMS Admin

Panduan praktis untuk setup dan menggunakan sistem Website Sekolah + CMS Admin dari NOL.

---

## 📋 Daftar Isi

1. [Prerequisites](#1-prerequisites)
2. [Setup Database Supabase](#2-setup-database-supabase)
3. [Setup Project](#3-setup-project)
4. [Konfigurasi Awal](#4-konfigurasi-awal)
5. [Menjalankan Development](#5-menjalankan-development)
6. [Panduan CMS Admin](#6-panduan-cms-admin)
7. [Deployment ke Production](#7-deployment-ke-production)
8. [Troubleshooting](#8-troubleshooting)

---

## 1️⃣ Prerequisites

Pastikan Anda sudah install:

✅ **Node.js 18+** - [Download](https://nodejs.org/)
✅ **Git** - [Download](https://git-scm.com/)
✅ **Code Editor** (VS Code recommended)
✅ **Akun Supabase** (Gratis) - [Daftar](https://supabase.com)

---

## 2️⃣ Setup Database Supabase

### Step 1: Buat Project Supabase

1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Klik **"New Project"**
3. Isi informasi:
   - **Name**: `smk-mustaqbal` (atau nama sekolah)
   - **Database Password**: Buat password kuat (SIMPAN!)
   - **Region**: Southeast Asia (Singapore)
4. Klik **"Create new project"**
5. Tunggu 2-3 menit hingga selesai

### Step 2: Jalankan SQL Migration

1. Di Supabase Dashboard, buka **SQL Editor** (icon di sidebar)
2. Klik **"New query"**
3. Copy SEMUA isi file `supabase/migrations/complete_schema.sql`
4. Paste ke SQL Editor
5. Klik **RUN** (atau Ctrl+Enter)
6. Tunggu hingga ada notifikasi **"Success"**

> ⚠️ **Penting**: Jika ada error, pastikan Anda copy SEMUA kode SQL tanpa ada yang terlewat.

### Step 3: Setup Storage Bucket

1. Buka **Storage** di sidebar
2. Klik **"Create a new bucket"**
3. Setting:
   - **Name**: `public`
   - **Public bucket**: **ON** (toggle hijau)
   - **File size limit**: 50MB
4. Klik **"Create bucket"**

5. Buat folder-folder ini di dalam bucket `public`:
   - `news/` - Foto berita
   - `programs/` - Foto program keahlian
   - `teachers/` - Foto guru
   - `gallery/` - Galeri foto/video
   - `documents/` - File download (PDF, DOC)
   - `facilities/` - Foto fasilitas
   - `achievements/` - Foto prestasi

**Cara buat folder:**
- Klik bucket `public`
- Klik **"Create folder"**
- Ketik nama folder
- Tekan Enter

### Step 4: Setup Authentication

1. Buka **Authentication** > **Providers**
2. **Email** provider → pastikan **Enabled**
3. Buka **Authentication** > **Email Templates** (opsional)
4. Buka **URL Configuration**:
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: Tambah:
     - `http://localhost:3000/**`

---

## 3️⃣ Setup Project

### Step 1: Clone Project (atau gunakan project existing)

```bash
# Navigasi ke folder project
cd /path/to/your/project

# Atau clone jika project di GitHub
git clone <repository-url>
cd smk-mustaqbal
```

### Step 2: Install Dependencies

```bash
npm install
```

Tunggu hingga semua package terinstall (2-5 menit).

### Step 3: Setup Environment Variables

1. Copy file `.env` dan rename jadi `.env.local`:

```bash
cp .env .env.local
```

2. Buka `.env.local` di code editor

3. Dapatkan kredensial Supabase:
   - Buka Supabase Dashboard
   - Klik **Settings** (icon gear) > **API**
   - Copy **Project URL** dan **anon public key**

4. Update `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey...

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Ganti dengan nilai yang sebenarnya!**

---

## 4️⃣ Konfigurasi Awal

### Step 1: Buat Admin User Pertama

1. Buka Supabase Dashboard > **Authentication** > **Users**
2. Klik **"Add user"** dropdown > **"Create new user"**
3. Isi:
   - **Email**: `admin@smkmustaqbal.sch.id`
   - **Password**: Buat password kuat (SIMPAN!)
   - **Auto Confirm User**: **ON** (penting!)
4. Klik **"Create user"**

5. Setelah user terbuat, **copy User UID** (kolom paling kiri)
   Contoh: `550e8400-e29b-41d4-a716-446655440000`

6. Buka **SQL Editor**, jalankan query ini:

```sql
-- Ganti 'USER_UID_DISINI' dengan UID yang sudah di-copy
INSERT INTO admin_users (id, email, full_name, role)
VALUES (
  'USER_UID_DISINI',
  'admin@smkmustaqbal.sch.id',
  'Administrator',
  'admin'
);
```

7. Klik **RUN**
8. ✅ Admin user siap digunakan!

### Step 2: Input Settings Awal

Jalankan SQL ini untuk setup konfigurasi website:

```sql
-- Informasi Sekolah
INSERT INTO settings (key, value, description) VALUES
('school_info', '{
  "name": "SMK Mustaqbal",
  "tagline": "School of Future",
  "npsn": "12345678",
  "address": "Jl. Pendidikan No. 123, Jakarta Timur",
  "phone": "021-12345678",
  "whatsapp": "628123456789",
  "email": "info@smkmustaqbal.sch.id"
}', 'Informasi umum sekolah'),

-- Branding
('branding', '{
  "logo_url": "/images/logo.png",
  "primary_color": "#0d9488",
  "secondary_color": "#10b981"
}', 'Branding sekolah'),

-- Social Media
('social_media', '{
  "facebook": "https://facebook.com/smkmustaqbal",
  "instagram": "https://instagram.com/smkmustaqbal",
  "youtube": "https://youtube.com/@smkmustaqbal"
}', 'Social media links'),

-- Hero Section
('hero_section', '{
  "title": "Langkah Awal Menuju Masa Depan Hebat",
  "subtitle": "Bangun karir impianmu bersama SMK Mustaqbal",
  "cta_text": "Daftar Sekarang",
  "cta_link": "/ppdb"
}', 'Hero section homepage');
```

### Step 3: Input Data Sample (Opsional - untuk testing)

```sql
-- Kategori Berita
INSERT INTO categories (name, slug, color) VALUES
('Pengumuman', 'pengumuman', 'teal'),
('Prestasi', 'prestasi', 'emerald'),
('Kegiatan', 'kegiatan', 'blue'),
('Artikel', 'artikel', 'orange');

-- Program Keahlian
INSERT INTO programs (name, slug, description, icon, color_theme, is_active, order_position) VALUES
('Teknik Otomasi & Robotik', 'teknik-otomasi-robotik',
 'Program keahlian di bidang robotika dan otomasi industri dengan teknologi terkini',
 'Cpu', 'blue', true, 1),

('Product Design & 3D', 'product-design-3d',
 'Program keahlian desain produk 3D menggunakan software profesional',
 'Box', 'purple', true, 2),

('IT Support & Network', 'it-support-network',
 'Program keahlian jaringan komputer dan IT support untuk perusahaan',
 'Network', 'green', true, 3),

('Web Dev & Digital Marketing', 'web-dev-digital-marketing',
 'Program keahlian pengembangan website dan strategi digital marketing',
 'Code', 'orange', true, 4);
```

---

## 5️⃣ Menjalankan Development

### Start Development Server

Buka terminal di folder project, jalankan:

```bash
npm run dev
```

Output yang muncul:

```
  ▲ Next.js 13.5.1
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

### Buka Website

Buka browser, akses:

- **Homepage**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login

### Test Login Admin

1. Buka http://localhost:3000/admin/login
2. Masukkan:
   - Email: `admin@smkmustaqbal.sch.id`
   - Password: (password yang dibuat tadi)
3. Klik **Login**
4. Akan redirect ke Dashboard

✅ **Berhasil!** Anda sudah bisa menggunakan CMS Admin.

---

## 6️⃣ Panduan CMS Admin

### A. Dashboard Overview

Setelah login, Anda akan melihat:
- **Statistik**: Total berita, program, guru, pendaftar
- **Grafik**: Visitor, pendaftaran bulanan
- **Recent Activities**: Aktivitas terbaru

### B. Mengelola Berita

#### Tambah Berita Baru

1. Klik **Berita** di sidebar (atau dari quick action)
2. Klik tombol **+ Tambah Berita**
3. Isi form:

   **Judul** (required):
   - Contoh: `Pendaftaran Siswa Baru 2025 Dibuka`
   - Max 200 karakter

   **Slug** (auto-generate dari judul):
   - Contoh: `pendaftaran-siswa-baru-2025`
   - Hanya boleh huruf kecil, angka, dan dash (-)

   **Kategori** (required):
   - Pilih dari dropdown
   - Contoh: Pengumuman

   **Excerpt/Ringkasan** (optional):
   - Ringkasan singkat 1-2 kalimat
   - Max 500 karakter
   - Akan muncul di card preview

   **Cover Image** (optional tapi recommended):
   - Klik area upload atau drag & drop
   - Format: JPG, PNG, WebP
   - Max size: 5MB
   - Rekomendasi size: 1200x630px (ratio 16:9)

   **Konten** (required):
   - Gunakan rich text editor
   - Toolbar: Bold, Italic, Heading, List, Link, Image
   - Min 100 karakter
   - Support HTML

   **Tags** (optional):
   - Pisahkan dengan koma
   - Contoh: `PPDB, Pendaftaran, 2025`

   **Status Publikasi**:
   - ☐ Draft: Belum tampil di website
   - ☑️ Published: Langsung tampil di website

   **Featured**:
   - ☑️ Jika ingin tampil di homepage

   **Tanggal Publikasi** (optional):
   - Default: sekarang
   - Bisa dijadwalkan untuk masa depan

4. Klik **Simpan** atau **Simpan & Publikasikan**

#### Edit Berita

1. Di halaman list berita, klik icon **Pencil** (✏️)
2. Edit form
3. Klik **Update**

#### Hapus Berita

1. Klik icon **Trash** (🗑️)
2. Konfirmasi: "Yakin hapus berita ini?"
3. Klik **Ya, Hapus**

> ⚠️ **Perhatian**: Data yang dihapus tidak bisa dikembalikan!

### C. Mengelola Program Keahlian

#### Tambah Program Baru

1. Sidebar → **Program Keahlian**
2. **+ Tambah Program**
3. Isi form:
   - **Nama**: Contoh `Multimedia & Broadcasting`
   - **Slug**: `multimedia-broadcasting`
   - **Deskripsi Singkat**: 1-2 kalimat
   - **Konten Lengkap**: Detail program (fasilitas, prospek kerja, dll)
   - **Cover Image**: Upload (1200x800px)
   - **Icon**: Pilih dari list (contoh: `Camera`, `Video`)
   - **Color Theme**: teal, blue, purple, orange, green
   - **Status**: ☑️ Aktif
   - **Urutan**: Angka untuk sorting (1, 2, 3...)
4. **Simpan**

Program akan muncul di:
- Homepage (card)
- Halaman `/program`
- Menu navigasi (jika ditambahkan)

### D. Mengelola Guru & Staff

#### Tambah Data Guru

1. Sidebar → **Guru & Staff**
2. **+ Tambah Guru**
3. Isi form:

   **Data Pribadi:**
   - Nama Lengkap: `Dr. Ahmad Fauzi, M.Pd`
   - NIP: `196805151994031005` (opsional)
   - Slug: `ahmad-fauzi` (untuk URL profile)

   **Jabatan & Keahlian:**
   - Jabatan: `Kepala Sekolah`
   - Mata Pelajaran: `Manajemen Pendidikan`

   **Foto:**
   - Upload foto formal (400x400px, square)
   - Format: JPG, PNG
   - Background netral lebih baik

   **Pendidikan:**
   - Contoh: `S3 Manajemen Pendidikan - Universitas Negeri Jakarta`

   **Sertifikasi** (pisah dengan Enter):
   ```
   Sertifikat Pendidik
   Certified Educational Leader
   ISO 9001 Auditor
   ```

   **Biografi:**
   - Deskripsi singkat pengalaman & prestasi
   - 2-3 paragraf

   **Kontak:**
   - Email: `ahmad.fauzi@smkmustaqbal.sch.id`
   - Telepon: `081234567890`

   **Status & Urutan:**
   - ☑️ Aktif
   - Urutan: 1 (Kepala sekolah biasanya di urutan 1)

4. **Simpan**

### E. Mengelola Galeri

#### Upload Foto

1. Sidebar → **Galeri**
2. Tab **Foto**
3. **+ Upload Foto**
4. Pilih file (bisa multiple upload):
   - Tekan Ctrl untuk select multiple
   - Atau drag & drop langsung
5. Untuk setiap foto, isi:
   - **Judul**: Deskripsi singkat
   - **Caption**: Detail acara/kegiatan
   - **Tanggal**: Kapan foto diambil
   - **Featured**: ☑️ untuk tampil di homepage
6. **Upload**

#### Tambah Video (YouTube)

1. Tab **Video**
2. **+ Tambah Video**
3. Isi:
   - **Judul**: Judul video
   - **URL YouTube**: `https://www.youtube.com/watch?v=xxxxx`
   - **Deskripsi**: Deskripsi singkat
   - **Tanggal**
4. **Simpan**

Video akan auto-embed di galeri.

### F. Mengelola Halaman Statis

#### Buat Halaman Baru

1. Sidebar → **Halaman**
2. **+ Tambah Halaman**
3. Isi:

   **Judul**: `Sejarah SMK Mustaqbal`

   **Slug**: `sejarah` (akan jadi URL: /sejarah)

   **Konten**: Gunakan rich text editor
   ```
   <h2>Awal Mula</h2>
   <p>SMK Mustaqbal didirikan pada tahun 2010...</p>

   <h2>Perkembangan</h2>
   <p>Dalam perjalanannya...</p>
   ```

   **Meta Description** (untuk SEO):
   - Ringkasan halaman 150-160 karakter
   - Contoh: `Sejarah pendirian dan perkembangan SMK Mustaqbal dari tahun 2010 hingga menjadi sekolah vokasi terkemuka.`

   **Keywords** (untuk SEO):
   - Contoh: `sejarah, SMK Mustaqbal, pendirian, vokasi`

   **Status**:
   - ☑️ Published

4. **Simpan**

Halaman akan otomatis tersedia di: `http://localhost:3000/sejarah`

#### Contoh Halaman yang Biasa Dibuat:
- `/sejarah` - Sejarah sekolah
- `/visi-misi` - Visi & Misi
- `/struktur-organisasi` - Struktur organisasi
- `/fasilitas` - Sarana prasarana
- `/ekstrakurikuler` - Kegiatan ekskul
- `/alumni` - Info alumni
- `/karir` - Lowongan kerja

### G. Mengelola Menu Navigasi

#### Tambah Menu Utama

1. Sidebar → **Menu Navigasi**
2. **+ Tambah Menu**
3. Isi:
   - **Label**: `Tentang Kami`
   - **URL**: `#` (untuk menu parent yang punya submenu)
   - **Parent**: (kosongkan)
   - **Icon**: `Info` (dari Lucide icons)
   - **Urutan**: `2`
   - **Status**: ☑️ Aktif
4. **Simpan**

#### Tambah Submenu

1. **+ Tambah Menu**
2. Isi:
   - **Label**: `Visi & Misi`
   - **URL**: `/tentang/visi-misi`
   - **Parent**: Pilih `Tentang Kami`
   - **Urutan**: `1`
3. **Simpan**

Ulangi untuk submenu lainnya:
- Sejarah → `/tentang/sejarah`
- Profile Guru → `/tentang/profile-guru`
- Struktur Organisasi → `/tentang/struktur-organisasi`

**Hasil di website:**
```
Tentang Kami ▼
  ├── Visi & Misi
  ├── Sejarah
  ├── Profile Guru
  └── Struktur Organisasi
```

### H. Pengaturan Website

#### Pengaturan Umum

1. Sidebar → **Pengaturan** → **Umum**
2. Edit field:
   - **Nama Sekolah**: `SMK Mustaqbal Jakarta`
   - **Tagline**: `School of Future`
   - **NPSN**: `12345678`
   - **Alamat Lengkap**: `Jl. ...`
   - **Telepon**: `021-12345678`
   - 
   - **WhatsApp**: `628123456789` (tanpa +)
   - **Email**: `info@smkmustaqbal.sch.id`
   - **Website**: `https://smkmustaqbal.sch.id`
3. **Simpan Perubahan**

#### Branding

1. **Pengaturan** → **Branding**
2. **Logo**:
   - Klik **Upload Logo**
   - Pilih file PNG dengan background transparan
   - Size: 200x200px atau 500x500px
   - Logo akan muncul di header
3. **Warna Tema**:
   - Primary Color: `#0d9488` (teal)
   - Secondary Color: `#10b981` (emerald)
   - Preview akan muncul
4. **Favicon**:
   - Upload icon untuk browser tab
   - Format: .ico atau .png 32x32px
5. **Simpan**

#### Hero Section (Homepage)

1. **Pengaturan** → **Hero**
2. Edit:
   - **Judul Utama**: `Langkah Awal Menuju Masa Depan Hebat`
   - **Subtitle**: `Bangun karir impianmu bersama SMK Mustaqbal. Kurikulum berbasis industri, fasilitas modern.`
   - **Teks Tombol**: `Daftar Sekarang`
   - **Link Tombol**: `/ppdb`
3. **Background Images**:
   - Upload 3-5 gambar (slideshow otomatis)
   - Size: 1920x1080px
   - Format: JPG
   - Tekan **+ Tambah Gambar** untuk upload lebih
4. **Simpan**

#### Social Media

1. **Pengaturan** → **Social Media**
2. Isi URL lengkap (termasuk https://):
   - Facebook: `https://facebook.com/smkmustaqbal`
   - Instagram: `https://instagram.com/smkmustaqbal`
   - YouTube: `https://youtube.com/@smkmustaqbal`
   - Twitter/X: `https://twitter.com/smkmustaqbal`
   - TikTok: `https://tiktok.com/@smkmustaqbal`
3. **Simpan**

Icon social media akan muncul di footer & header.

### I. Mengelola PPDB (Pendaftaran)

#### Lihat Daftar Pendaftar

1. Sidebar → **PPDB**
2. Tampilan table dengan kolom:
   - No. Registrasi
   - Nama Lengkap
   - Asal Sekolah
   - Program Pilihan
   - Status (Pending/Approved/Rejected)
   - Tanggal Daftar
   - Aksi

#### Filter Pendaftar

- **Filter Status**: Pending / Approved / Rejected
- **Filter Program**: Pilih program keahlian
- **Search**: Cari berdasarkan nama
- **Filter Tanggal**: Range tanggal pendaftaran

#### Review & Approve Pendaftaran

1. Klik **nama pendaftar** atau icon **View** (👁️)
2. Lihat detail lengkap:
   - Data pribadi
   - Data orang tua
   - Asal sekolah
   - Program pilihan
   - Dokumen upload (ijazah, KK, foto)
3. Review dokumen:
   - Klik dokumen untuk preview/download
4. Beri keputusan:
   - **Approve** → Status jadi `Approved`
   - **Reject** → Status jadi `Rejected`
5. Tambah **Catatan** (opsional):
   - Contoh: `Dokumen lengkap, disetujui`
6. **Simpan**

#### Notifikasi ke Pendaftar

Setelah approve/reject, sistem otomatis kirim notifikasi ke:
- Email pendaftar
- WhatsApp pendaftar (jika fitur aktif)

#### Export Data

1. Klik **Export CSV**
2. File akan terdownload: `ppdb-submissions-2025-01-20.csv`
3. Bisa dibuka di Excel/Google Sheets

Format CSV:
```
No. Registrasi,Nama,Email,Telepon,Program,Status,Tanggal
PPDB2025001,Budi Santoso,budi@example.com,081234567890,Teknik Otomasi,Approved,2025-01-20
```

### J. Mengelola Dokumen Download

#### Upload Dokumen

1. Sidebar → **Dokumen**
2. **+ Upload Dokumen**
3. Isi:
   - **Judul**: `Kalender Akademik 2024/2025`
   - **Kategori**: Pilih (Akademik, Administrasi, Panduan, Brosur)
   - **Deskripsi**: `Kalender akademik tahun ajaran 2024/2025`
   - **File**: Upload PDF/DOC/XLS (max 10MB)
   - **Status**: ☑️ Public (bisa didownload publik)
4. **Upload**

#### Dokumen yang Biasa Diupload:
- **Akademik**: Kalender akademik, jadwal pelajaran, silabus
- **Administrasi**: Formulir pendaftaran, surat pernyataan
- **Panduan**: Panduan siswa baru, panduan PKL, panduan ujian
- **Brosur**: E-brochure sekolah, leaflet program

#### Edit/Hapus Dokumen

- **Edit**: Klik icon Pencil, update info (tidak bisa ganti file)
- **Hapus**: Klik icon Trash, konfirmasi hapus

### K. Mengelola Pengumuman

#### Buat Pengumuman Penting

1. Sidebar → **Pengumuman**
2. **+ Tambah Pengumuman**
3. Isi:
   - **Judul**: `PPDB 2025 Dibuka!`
   - **Isi**: `Pendaftaran siswa baru tahun ajaran 2025/2026 telah dibuka. Daftar sekarang!`
   - **Tipe Tampilan**:
     - **Banner**: Muncul di atas homepage
     - **Popup**: Muncul saat buka website
     - **Ticker**: Running text di header
   - **Prioritas**: High / Normal / Low
   - **Tanggal Mulai**: `2025-01-15 00:00`
   - **Tanggal Selesai**: `2025-03-31 23:59`
   - **Link**: `/ppdb` (opsional)
   - **Status**: ☑️ Aktif
4. **Simpan**

Pengumuman akan muncul sesuai tipe yang dipilih.

### L. Newsletter Subscribers

#### Lihat Subscriber

1. Sidebar → **Newsletter**
2. List semua subscriber:
   - Email
   - Nama
   - Status (Subscribed/Unsubscribed)
   - Tanggal subscribe

#### Kirim Newsletter (Manual)

1. Klik **Kirim Newsletter**
2. Compose email:
   - Subject
   - Body (rich text)
   - Attachment (opsional)
3. Preview
4. **Kirim ke Semua Subscriber**

---

## 7️⃣ Deployment ke Production

### Option 1: Deploy ke Vercel (Recommended)

**Vercel** adalah platform hosting yang paling cocok untuk Next.js.

#### Prerequisites:
- Akun GitHub (gratis) - [Daftar](https://github.com)
- Akun Vercel (gratis) - [Daftar](https://vercel.com)

#### Step 1: Push ke GitHub

```bash
# Inisialisasi Git (jika belum)
git init

# Add semua file
git add .

# Commit
git commit -m "Initial commit - SMK Mustaqbal website"

# Buat repository di GitHub:
# - Login ke github.com
# - Klik "New repository"
# - Nama: smk-mustaqbal
# - Public/Private: terserah
# - Jangan centang "Initialize with README"
# - Klik "Create repository"

# Connect ke GitHub (ganti username & repo)
git remote add origin https://github.com/username/smk-mustaqbal.git

# Push
git branch -M main
git push -u origin main
```

#### Step 2: Deploy di Vercel

1. Login ke [Vercel Dashboard](https://vercel.com/dashboard)
2. Klik **"Add New..."** → **"Project"**
3. **Import Git Repository**:
   - Pilih repository `smk-mustaqbal`
   - Klik **Import**
4. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detect)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: (kosongkan)
5. **Environment Variables**:
   Klik **Add** dan masukkan:
   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://xxxxx.supabase.co

   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGc...

   Name: NEXT_PUBLIC_SITE_URL
   Value: https://smk-mustaqbal.vercel.app
   ```
6. Klik **Deploy**
7. Tunggu 2-3 menit
8. ✅ Website live di: `https://smk-mustaqbal.vercel.app`

#### Step 3: Setup Custom Domain (Opsional)

Jika punya domain sendiri (contoh: `www.smkmustaqbal.sch.id`):

1. Di Vercel Dashboard, buka project
2. **Settings** → **Domains**
3. Klik **Add**
4. Masukkan domain: `smkmustaqbal.sch.id`
5. Vercel akan kasih instruksi update DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
6. Login ke domain registrar (Niagahoster, Rumahweb, dll)
7. Buka **DNS Management**
8. Tambah record sesuai instruksi Vercel
9. Tunggu 24-48 jam propagasi DNS
10. ✅ Website bisa diakses via domain custom

#### Step 4: Update Supabase Settings

1. Buka Supabase Dashboard
2. **Authentication** → **URL Configuration**
3. Update:
   - **Site URL**: `https://smkmustaqbal.sch.id`
   - **Redirect URLs**: Tambah:
     - `https://smkmustaqbal.sch.id/**`

### Option 2: Deploy ke Netlify

1. Login [Netlify](https://netlify.com)
2. **Add new site** → **Import from Git**
3. Connect GitHub
4. Pilih repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Environment variables: Sama seperti Vercel
7. **Deploy**

### Option 3: VPS (untuk advanced user)

Jika ingin hosting di VPS sendiri:

1. Install Node.js 18+ di VPS
2. Clone repository
3. Setup environment variables
4. Build: `npm run build`
5. Start: `npm start`
6. Setup Nginx reverse proxy
7. Setup SSL dengan Let's Encrypt

**Tidak recommended untuk pemula!**

---

## 8️⃣ Troubleshooting

### ❌ Problem: "Cannot connect to Supabase"

**Solusi:**
1. Cek `.env.local` sudah ada & benar
2. Pastikan `NEXT_PUBLIC_SUPABASE_URL` valid
3. Pastikan `NEXT_PUBLIC_SUPABASE_ANON_KEY` valid (copy ulang dari Supabase)
4. Restart dev server:
   ```bash
   # Ctrl+C untuk stop
   npm run dev
   ```

### ❌ Problem: "Admin login tidak bisa"

**Solusi:**
1. Cek user sudah ada di Supabase → Authentication → Users
2. Pastikan user sudah di-insert ke table `admin_users`:
   ```sql
   SELECT * FROM admin_users;
   ```
3. Cek password benar
4. Cek email confirmation sudah ON di Supabase
5. Clear browser cache & cookies

### ❌ Problem: "Upload image gagal"

**Solusi:**
1. Pastikan bucket `public` sudah dibuat
2. Pastikan bucket setting → **Public bucket: ON**
3. Cek folder destination ada (contoh: `news/`)
4. Cek file size < 5MB
5. Format file: JPG, PNG, WebP
6. Cek Storage policies:
   ```sql
   -- Di SQL Editor
   SELECT * FROM storage.policies;
   ```

### ❌ Problem: "Data tidak muncul di website"

**Solusi:**
1. Cek status **Published** = true
2. Clear browser cache (Ctrl+Shift+R)
3. Cek data ada di database:
   ```sql
   SELECT * FROM news_articles WHERE is_published = true;
   ```
4. Cek RLS policies enabled
5. Restart dev server

### ❌ Problem: "Build error saat deploy"

**Solusi:**
```bash
# Test build local dulu
npm run build

# Cek TypeScript errors
npm run typecheck

# Cek ESLint errors (jika ada)
npm run lint

# Fix errors yang muncul
```

Common errors:
- **Missing environment variables**: Pastikan semua env vars ada di Vercel
- **TypeScript errors**: Fix type errors di code
- **Module not found**: Run `npm install`

### ❌ Problem: "Page 404 Not Found"

**Solusi:**
1. Cek route file ada: `app/[path]/page.tsx`
2. Cek slug di database sesuai dengan URL
3. Cek page status `is_published = true`
4. Clear Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

### ❌ Problem: "Foto tidak muncul"

**Solusi:**
1. Cek URL foto di database (table column `image_url`)
2. Cek foto ada di Supabase Storage
3. Cek bucket `public` setting → Public
4. Pastikan URL lengkap: `https://xxx.supabase.co/storage/v1/object/public/...`
5. Cek Network tab di browser DevTools (F12)

---

## ✅ Checklist Setup Lengkap

Centang setiap langkah yang sudah selesai:

### Database
- [ ] Supabase project dibuat
- [ ] SQL migration dijalankan (semua tabel ada)
- [ ] Storage bucket `public` dibuat & setting Public
- [ ] Folder di storage dibuat (news, programs, dll)
- [ ] Authentication email provider enabled

### Project
- [ ] Dependencies installed (`npm install` success)
- [ ] `.env.local` dibuat & diisi dengan benar
- [ ] Environment variables valid (URL & anon key)

### Admin Setup
- [ ] Admin user dibuat di Supabase Auth
- [ ] Admin user di-insert ke table `admin_users`
- [ ] Settings data di-insert (school_info, branding, dll)
- [ ] Sample data di-insert (categories, programs - opsional)

### Testing
- [ ] Dev server running (`npm run dev`)
- [ ] Homepage bisa diakses (http://localhost:3000)
- [ ] Admin login berhasil
- [ ] Dashboard bisa diakses
- [ ] Bisa tambah berita baru
- [ ] Bisa upload foto
- [ ] Settings bisa diubah

### Deployment
- [ ] Repository pushed ke GitHub
- [ ] Project connected ke Vercel
- [ ] Environment variables di-set di Vercel
- [ ] Deploy berhasil
- [ ] Website live & bisa diakses
- [ ] Supabase settings diupdate (Site URL, Redirect URLs)
- [ ] Custom domain setup (opsional)

### Production Ready
- [ ] Logo & branding diupload
- [ ] Konten berita ditambahkan
- [ ] Program keahlian lengkap
- [ ] Data guru lengkap
- [ ] Galeri foto diisi
- [ ] Halaman statis dibuat (visi-misi, sejarah, dll)
- [ ] Menu navigasi diatur
- [ ] Social media links diisi
- [ ] Contact info update
- [ ] PPDB form tested

---

## 🎉 Selesai!

Website Sekolah + CMS Admin Anda sudah **100% siap digunakan**!

### Next Steps:

1. **Isi Konten**
   - Tambah minimal 5 berita
   - Upload foto galeri
   - Lengkapi data guru
   - Buat halaman-halaman penting

2. **Customize**
   - Upload logo sekolah
   - Ganti warna tema sesuai branding
   - Edit hero section
   - Update social media links

3. **SEO**
   - Isi meta description setiap halaman
   - Tambahkan keywords
   - Submit sitemap ke Google Search Console

4. **Marketing**
   - Share link website ke sosmed
   - Print QR code untuk brosur
   - Buat konten regular (min 1 berita/minggu)

5. **Maintenance**
   - Backup database berkala (via Supabase)
   - Monitor traffic (Vercel Analytics)
   - Update konten rutin

---

## 📚 Resource & Support

### Dokumentasi Lengkap
- [SCHOOL_CMS_COMPLETE_GUIDE.md](./SCHOOL_CMS_COMPLETE_GUIDE.md) - Dokumentasi teknis lengkap

### Tutorial
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Butuh Bantuan?
- GitHub Issues: [Create issue](https://github.com/username/smk-mustaqbal/issues)
- Email: support@example.com

---

**Terakhir diupdate**: Januari 2025
**Versi**: 1.0.0

Semoga sukses! 🚀
