# 🚀 QUICK START - Setup Admin Login

**Problem**: Login error 500 saat akses admin_users
**Status**: ✅ **FIXED!**

---

## ⚡ 3 LANGKAH SETUP

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Admin User
```bash
node scripts/create-first-admin.js
```

Input:
```
Email: admin@sekolah.com
Password: admin123
Nama: Admin Sekolah
```

### 3. Run Dev Server
```bash
npm run dev
```

---

## 🎯 LOGIN

**URL**: http://localhost:3000/admin/login

**Credentials**:
- Email: admin@sekolah.com
- Password: admin123

**Expected**: ✅ Redirect ke Dashboard

---

## ✅ YANG SUDAH DIPERBAIKI

1. ✅ **RLS Policy** - Users sekarang bisa read record sendiri
2. ✅ **Auto-Trigger** - admin_users auto-created saat signup
3. ✅ **Setup Script** - Easy create first admin
4. ✅ **Migration** - Fix existing users

---

## 🛠️ TROUBLESHOOTING

### Login masih error?

**Check admin_users record**:
```sql
SELECT * FROM admin_users WHERE email = 'admin@sekolah.com';
```

**Promote ke admin**:
```sql
SELECT promote_to_admin('admin@sekolah.com');
```

**Re-run script**:
```bash
node scripts/create-first-admin.js
```

---

## 📚 FULL DOCUMENTATION

- **ADMIN_LOGIN_FIX.md** - Detailed fix explanation
- **CMS_ADMIN_GUIDE.md** - CMS usage guide
- **PAGE_BUILDER_GUIDE.md** - Page builder tutorial

---

**Status**: 🟢 Ready to Use!
