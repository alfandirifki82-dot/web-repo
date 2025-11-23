# 🚀 QUICK START - Admin CMS

**Masalah**: Gambar dan UI CMS Admin tidak muncul?
**Solusi**: Follow 3 langkah ini! (5 menit)

---

## ⚡ LANGKAH CEPAT (3 Steps)

### 1️⃣ Create Admin User (WAJIB!)

```bash
node scripts/create-first-admin.js
```

**Input**:
- Email: `admin@sekolah.com`
- Password: `admin123` (atau terserah Anda, min 6 karakter)
- Nama: `Admin Sekolah`

**Output yang diharapkan**:
```
✅ Admin user created successfully!
```

---

### 2️⃣ Start Dev Server

```bash
npm run dev
```

**Biarkan terminal ini tetap buka!**

---

### 3️⃣ Login ke Admin Panel

**Browser**: Buka http://localhost:3000/admin/login

**Login dengan**:
- Email: `admin@sekolah.com`
- Password: `admin123` (yang tadi Anda buat)

**Expected**: Redirect ke dashboard dengan stats, charts, dan menu lengkap!

---

## 🎯 Apa yang Harus Muncul?

### ✅ Login Page:
- Background gradient (hijau-teal)
- Card putih di tengah
- Icon sekolah
- Form email & password

### ✅ Dashboard (setelah login):
- **Header**: User name & avatar
- **Sidebar**: 14+ menu items
- **Stats Cards**: 8 cards dengan angka & icon
- **Charts**: Bar chart & pie chart
- **Recent Activity**: Lists
- **Quick Actions**: 4 buttons

---

## 🐛 Masalah Umum

### "Tidak bisa login / redirect loop"

**Penyebab**: Belum create admin user

**Solusi**:
```bash
node scripts/create-first-admin.js
```

---

### "Dashboard loading forever"

**Penyebab**: Database connection issue

**Solusi**:
```bash
# Test database
node scripts/test-database-connection.js

# Should show: ✅ ALL TESTS PASSED
```

---

### "Charts tidak muncul"

**Penyebab**: Sudah diperbaiki! Clear cache:

**Solusi**:
```bash
rm -rf .next
npm run dev
```

---

### "CSS berantakan / no styling"

**Solusi**:
```bash
# Clear cache
rm -rf .next

# Hard refresh browser
Ctrl + Shift + R
```

---

## 📚 Dokumentasi Lengkap

**Untuk troubleshooting detail, lihat**:
- `ADMIN_UI_FIX_GUIDE.md` - Complete troubleshooting
- `CMS_ADMIN_GUIDE.md` - How to use CMS
- `QUICK_START_GUIDE.md` - General setup

---

## ✅ Checklist Cepat

- [ ] Run `node scripts/create-first-admin.js` ← **PENTING!**
- [ ] Run `npm run dev`
- [ ] Open `http://localhost:3000/admin/login`
- [ ] Login dengan credentials yang dibuat
- [ ] Dashboard muncul dengan lengkap!

---

## 🎉 DONE!

Jika 3 langkah di atas sudah dijalankan dan dashboard muncul lengkap, berarti **SUKSES!** 🚀

Admin CMS Anda sudah siap digunakan untuk:
- ✅ Manage berita
- ✅ Manage program
- ✅ Manage guru
- ✅ Manage galeri
- ✅ Build custom pages
- ✅ Customize themes
- ✅ Dan masih banyak lagi!

**Selamat! 🎊**

---

**Status**: ✅ FIXED & TESTED
**Build**: ✅ SUCCESS (31 pages)
**Ready**: ✅ PRODUCTION

**Updated**: 23 November 2025
