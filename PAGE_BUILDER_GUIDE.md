# 🎨 Visual Page Builder - Panduan Lengkap

**Update**: 20 November 2025
**Fitur Baru**: Page Builder, Theme Manager, Global Styles

---

## 🎉 APA YANG BARU?

CMS Admin sekarang dilengkapi dengan **Visual Page Builder** yang powerful! Anda bisa:

✅ **Tambah/Hapus/Edit Section** di setiap halaman
✅ **Ubah Warna & Theme** seluruh website
✅ **Customize Font & Typography** (ukuran, jenis, line-height)
✅ **Atur Urutan Section** dengan drag-like interface
✅ **Hide/Show Section** tanpa menghapus
✅ **Edit Content & Style** per section
✅ **Kelola CSS Variables** global

---

## 📊 DATABASE BARU

### Tables yang Ditambahkan:

1. **section_types** (9 templates):
   - Hero Section
   - Text Block
   - Image + Text
   - Cards Grid
   - CTA Banner
   - Gallery
   - Testimonials
   - Statistics
   - Contact Form

2. **page_sections**:
   - Section actual di setiap halaman
   - Content & styles per section
   - Order position & visibility

3. **themes** (3 themes default):
   - Default Theme (Teal)
   - Modern Dark (Blue)
   - Minimalist (Gray)

4. **page_styles**:
   - Custom CSS per page
   - Meta tags & SEO settings
   - Theme overrides

5. **global_styles**:
   - CSS variables global
   - Colors, fonts, spacing, shadows

6. **media_library**:
   - Upload & manage images/files
   - Organized by folders

---

## 🚀 CARA MENGGUNAKAN

### 1. **Page Builder** (`/admin/page-builder`)

#### Pilih Halaman
1. Buka Page Builder dari sidebar
2. Pilih halaman yang ingin di-edit dari dropdown
3. Akan tampil list section yang ada

#### Tambah Section Baru
1. Klik tombol **"Tambah Section"**
2. Pilih template section:
   - **Hero**: Banner besar dengan judul & CTA
   - **Text Block**: Block text sederhana
   - **Image + Text**: Gambar dengan teks
   - **Cards Grid**: Grid card (fitur, layanan)
   - **CTA Banner**: Call-to-action banner
   - **Gallery**: Grid foto
   - **Testimonials**: Slider testimoni
   - **Stats**: Tampilan angka statistik
   - **Contact Form**: Form kontak
3. Section langsung ditambahkan ke halaman

#### Atur Urutan Section
1. Di table sections, lihat kolom **Order**
2. Klik panah **↑** untuk pindah ke atas
3. Klik panah **↓** untuk pindah ke bawah
4. Urutan langsung berubah di database

#### Hide/Show Section
1. Klik badge **Status** (Visible/Hidden)
2. Section akan disembunyikan tanpa dihapus
3. Data tetap tersimpan di database

#### Edit Section
1. Klik icon **Edit** (✏️)
2. Akan buka halaman editor detail
3. Edit content & styles
4. Simpan perubahan

#### Preview Halaman
1. Klik icon **Eye** (👁️)
2. Halaman akan buka di tab baru
3. Lihat hasil real-time

#### Hapus Section
1. Klik icon **Trash** (🗑️)
2. Konfirmasi delete
3. Section permanent dihapus

---

### 2. **Theme Management** (`/admin/themes`)

#### Aktifkan Theme
1. Buka Themes dari sidebar
2. Lihat 3 theme presets:
   - **Default**: Original teal theme
   - **Modern Dark**: Dark theme dengan blue accent
   - **Minimalist**: Clean gray theme
3. Klik card theme untuk aktivasi
4. Theme langsung di-apply ke seluruh website

#### Edit Theme Colors
1. Pilih theme yang aktif (atau yang mau di-edit)
2. Tab **Colors**:
   - **Primary**: Warna utama brand
   - **Secondary**: Warna sekunder
   - **Accent**: Warna aksen
   - **Background**: Background utama
   - **Foreground**: Text color utama
   - **Muted**: Background subtle
   - **Border**: Warna border
   - **Success/Warning/Error**: Status colors
3. Cara edit:
   - Ketik hex code manual (#0d9488)
   - Atau klik color picker untuk visual selection
4. Preview langsung terlihat di kotak warna
5. Klik **"Simpan Perubahan"** untuk apply

#### Edit Typography
1. Tab **Typography**:
   - **Heading Font**: Font untuk H1-H6 (contoh: Poppins)
   - **Body Font**: Font untuk teks body (contoh: Inter)
   - **Heading Sizes**: Ukuran H1-H6 (contoh: 48px, 36px, dst)
   - **Body Size**: Ukuran teks body (contoh: 16px)
   - **Line Height**: Tinggi baris
2. Edit nama font (harus tersedia di Google Fonts)
3. Edit ukuran (gunakan px, rem, atau em)
4. Lihat preview di bawah
5. **Simpan Perubahan**

---

### 3. **Global Styles** (`/admin/styles`)

#### Manage CSS Variables
1. Buka Global Styles dari sidebar
2. Ada 4 kategori tabs:
   - **Typography**: Font variables
   - **Colors**: Color variables
   - **Spacing**: Spacing variables
   - **Shadows**: Shadow variables
   - **Borders**: Border variables

#### Edit Variable
1. Pilih tab kategori
2. Edit value di input field:
   - **Colors**: #hex code atau color name
   - **Fonts**: Font family name
   - **Spacing**: 8px, 1rem, 0.5em
   - **Shadows**: CSS shadow value
3. Untuk colors, bisa gunakan color picker
4. Preview langsung di kotak warna (untuk colors)

#### Save Changes
1. Edit beberapa variables
2. Counter di tombol "Simpan" akan update
3. Klik **"Simpan Perubahan (X)"**
4. Variables di-apply ke database
5. CSS akan di-generate ulang

#### Preview CSS Output
1. Scroll ke bawah
2. Lihat preview **CSS output**
3. Code akan di-generate sebagai `:root { ... }`
4. Variables bisa digunakan di CSS dengan `var(--variable-name)`

---

## 🎨 WORKFLOW LENGKAP

### Scenario 1: Ubah Warna Seluruh Website

1. **Buka Themes** → Pilih theme aktif
2. **Tab Colors** → Edit warna yang mau diubah:
   ```
   Primary: #0d9488 → #3b82f6 (biru)
   Secondary: #10b981 → #8b5cf6 (purple)
   ```
3. **Simpan Perubahan**
4. **Refresh website** → Semua warna berubah!

### Scenario 2: Ganti Font Seluruh Website

1. **Buka Themes** → Pilih theme aktif
2. **Tab Typography** → Edit fonts:
   ```
   Heading Font: Poppins → Montserrat
   Body Font: Inter → Open Sans
   ```
3. **Edit Heading Sizes** jika perlu:
   ```
   H1: 48px → 56px
   H2: 36px → 40px
   ```
4. **Simpan Perubahan**
5. **Refresh website** → Semua font berubah!

### Scenario 3: Tambah Section Baru di Homepage

1. **Buka Page Builder**
2. **Pilih Halaman**: Homepage (/)
3. **Klik "Tambah Section"**
4. **Pilih template**: CTA Banner
5. **Section ditambahkan** ke paling bawah
6. **Atur urutan** dengan panah ↑↓
7. **Klik Edit** untuk customize content:
   ```
   Title: "Daftar Sekarang!"
   Subtitle: "Raih masa depan gemilang"
   Button Text: "Daftar PPDB"
   Button Link: "/ppdb"
   ```
8. **Edit styles**:
   ```
   Background Color: #10b981
   Text Color: #ffffff
   Padding: 80px
   Font Size: 32px
   ```
9. **Simpan** → Section langsung muncul di homepage!

### Scenario 4: Hide Section Sementara

1. **Buka Page Builder**
2. **Pilih halaman**
3. **Lihat section** yang mau disembunyikan
4. **Klik status badge** "Visible"
5. **Status berubah** jadi "Hidden"
6. **Section hilang** dari website tapi data tersimpan
7. **Klik lagi** untuk show kembali

---

## 💡 TIPS & TRICKS

### Colors
- **Hex Codes**: Selalu pakai # (contoh: #0d9488)
- **Color Picker**: Lebih mudah untuk visual selection
- **Consistency**: Gunakan color palette yang harmonis
- **Contrast**: Pastikan text readable di background (cek contrast ratio)
- **Brand Colors**: Simpan kode warna brand Anda

### Fonts
- **Google Fonts**: Gunakan font dari Google Fonts (gratis)
- **Pairing**: Pair 2 fonts max (heading + body)
- **Readability**: Body font harus mudah dibaca (15-18px)
- **Hierarchy**: H1 > H2 > H3 > H4 > H5 > H6 (ukuran menurun)
- **Line Height**: 1.5-1.7 untuk body, 1.1-1.3 untuk heading

### Spacing
- **8px Grid**: Gunakan kelipatan 8px (8, 16, 24, 32, 40, 48, dst)
- **Consistent**: Spacing yang konsisten = UI yang clean
- **Breathing Room**: Jangan terlalu rapat, beri space

### Sections
- **Order Matters**: Urutan section pengaruhi user flow
- **Hero First**: Hero section selalu di paling atas
- **CTA Strategic**: Tempatkan CTA di posisi strategis
- **Balance**: Jangan terlalu banyak section dalam 1 page
- **Test**: Preview di berbagai device (desktop, tablet, mobile)

---

## 🔧 TECHNICAL DETAILS

### Database Structure

**section_types** → **page_sections**
- 1 section type bisa digunakan berkali-kali
- Each page_section punya content & styles sendiri
- Linked via `section_type_id`

**themes** → active theme
- Only 1 theme aktif at a time
- Theme berisi colors & fonts
- Di-apply global ke seluruh website

**global_styles**
- CSS variables independent
- Bisa override theme
- Langsung inject ke `:root`

### How It Works

1. **Frontend** fetch data dari Supabase:
   ```typescript
   const { data } = await supabase
     .from('page_sections')
     .select('*, section_types(*)')
     .eq('page_path', '/')
     .order('order_position');
   ```

2. **Render** sections based on data:
   ```typescript
   {sections.map(section => (
     <SectionRenderer
       type={section.section_types.name}
       content={section.content}
       styles={section.styles}
     />
   ))}
   ```

3. **Apply** theme colors:
   ```css
   :root {
     --color-primary: var(--theme-primary);
     --color-secondary: var(--theme-secondary);
   }
   ```

4. **CSS Variables** di-inject:
   ```css
   :root {
     --font-heading: Poppins;
     --font-body: Inter;
     --color-primary: #0d9488;
   }
   ```

---

## 🎯 USE CASES

### Use Case 1: Landing Page Event
Buat landing page untuk event sekolah:
1. Tambah **Hero Section** (banner event)
2. Tambah **Text Block** (deskripsi event)
3. Tambah **Stats** (jumlah peserta, hadiah, dll)
4. Tambah **Gallery** (foto event tahun lalu)
5. Tambah **CTA Banner** (button daftar)

### Use Case 2: Halaman Program
Customize halaman program keahlian:
1. Tambah **Image + Text** (overview program)
2. Tambah **Cards Grid** (fitur program)
3. Tambah **Testimonials** (dari alumni program)
4. Tambah **CTA** (daftar program)

### Use Case 3: Rebranding
Ganti warna & font website:
1. **Themes** → Pilih Modern Dark
2. **Edit Colors** → Ganti primary jadi brand color baru
3. **Edit Fonts** → Ganti font sesuai brand guideline
4. **Global Styles** → Fine-tune spacing & shadows
5. **Apply** → Seluruh website ter-rebrand!

---

## 🚧 LIMITATIONS & ROADMAP

### Current Limitations:
- ❌ Section editor belum ada rich text editor
- ❌ Image upload belum terintegrasi (manual URL)
- ❌ No drag-and-drop (gunakan arrow buttons)
- ❌ No live preview (harus refresh page)
- ❌ No undo/redo functionality

### Roadmap (Future Enhancement):
- [ ] Rich text editor untuk section content
- [ ] Image upload & media library browser
- [ ] Drag-and-drop section reordering
- [ ] Live preview window (iframe)
- [ ] Undo/redo history
- [ ] Duplicate section
- [ ] Export/import page templates
- [ ] A/B testing support
- [ ] Responsive breakpoint editor
- [ ] Animation controls

---

## 📚 EXAMPLES

### Example 1: Hero Section Content
```json
{
  "title": "Selamat Datang di SMK Mustaqbal",
  "subtitle": "Membangun Generasi Unggul dan Berkarakter",
  "buttonText": "Daftar Sekarang",
  "buttonLink": "/ppdb",
  "backgroundImage": "https://images.pexels.com/..."
}
```

### Example 2: Hero Section Styles
```json
{
  "backgroundColor": "#0d9488",
  "textColor": "#ffffff",
  "height": "600px",
  "fontSize": "48px",
  "backgroundSize": "cover",
  "backgroundPosition": "center"
}
```

### Example 3: Cards Grid Content
```json
{
  "title": "Program Keahlian",
  "cards": [
    {
      "title": "Teknik Komputer",
      "description": "Belajar programming, networking, dan hardware",
      "icon": "Computer"
    },
    {
      "title": "Desain Grafis",
      "description": "Kreativitas visual dan multimedia",
      "icon": "Palette"
    }
  ]
}
```

---

## 🎓 BEST PRACTICES

### Design
1. **Consistency**: Gunakan warna & font yang konsisten
2. **Hierarchy**: Establish visual hierarchy yang jelas
3. **Whitespace**: Beri breathing room, jangan cramped
4. **Contrast**: Pastikan text readable
5. **Mobile-First**: Think mobile, scale up to desktop

### Content
1. **Clear**: Message yang jelas dan to the point
2. **Engaging**: Gunakan power words dan actionable copy
3. **Scannable**: Break text jadi paragraf pendek
4. **Visual**: Kombinasi text dengan images/icons
5. **CTA**: Strong call-to-action di setiap section penting

### Performance
1. **Optimize Images**: Compress images sebelum upload
2. **Lazy Load**: Implement lazy loading untuk images
3. **Minimize Sections**: Jangan terlalu banyak section per page
4. **Cache**: Utilize browser caching
5. **CDN**: Use CDN untuk static assets

---

## ✅ CHECKLIST

### Before Go Live:
- [ ] Test di semua halaman (10 pages)
- [ ] Check responsive di mobile, tablet, desktop
- [ ] Verify semua links working
- [ ] Test semua CTAs
- [ ] Check image loading
- [ ] Verify colors contrast (accessibility)
- [ ] Test page load speed
- [ ] Check browser compatibility
- [ ] Verify SEO meta tags
- [ ] Test forms (if any)

### After Launch:
- [ ] Monitor analytics
- [ ] Gather user feedback
- [ ] A/B test CTAs
- [ ] Optimize based on data
- [ ] Regular content updates

---

## 🎉 SELAMAT!

Anda sekarang punya **full control** atas design website!

**Yang Bisa Anda Lakukan**:
- ✅ Ubah warna & theme kapan saja
- ✅ Ganti font & typography
- ✅ Tambah/hapus section tanpa coding
- ✅ Edit content langsung dari CMS
- ✅ Atur layout & urutan section
- ✅ Customize style per section
- ✅ Manage CSS variables global

**No Coding Required!** 🚀

---

**Dibuat**: 20 November 2025
**Versi**: 2.0.0 - Page Builder Release
**Status**: Production Ready
