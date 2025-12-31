# 🚀 DEPLOY VIA TERMINAL - PANDUAN LENGKAP

## ✅ PERSIAPAN (Sekali Aja)

### 1. Install Git (kalau belum ada)
Download: https://git-scm.com/download/win

### 2. Bikin Akun GitHub (kalau belum)
Daftar: https://github.com/signup

### 3. Bikin Akun Netlify (kalau belum)
Daftar: https://app.netlify.com/signup (pakai GitHub)

---

## 🔧 LANGKAH DEPLOY

### STEP 1: Buka Terminal & Masuk Folder Project

```powershell
cd "C:\Users\andri\Downloads\Responsive QR Code Generator"
```

---

### STEP 2: Fix File `_headers` yang Corrupt

```powershell
# Hapus folder _headers yang salah
Remove-Item -Path "public\_headers" -Recurse -Force

# Buat file _headers yang BENAR
@"
/*
  # Security Headers
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  
  # Cache Control
  Cache-Control: public, max-age=3600, must-revalidate

/static/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.png
  Cache-Control: public, max-age=31536000, immutable

/*.jpg
  Cache-Control: public, max-age=31536000, immutable

/*.svg
  Cache-Control: public, max-age=31536000, immutable
"@ | Out-File -FilePath "public\_headers" -Encoding utf8 -NoNewline

# Verifikasi (harus muncul: -a--- bukan d----)
Get-Item public\_headers
```

**Output yang BENAR:**
```
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---          31/12/2024    XX:XX           XXX _headers
```
☝️ **Huruf pertama harus `-` (bukan `d`)** = FILE ✅

---

### STEP 3: Git Init & First Commit

```powershell
# Init git repository
git init

# Config user (ganti dengan data Anda)
git config user.name "Nama Anda"
git config user.email "email@anda.com"

# Add semua file
git add .

# Commit pertama
git commit -m "Initial commit - QR Generator ready for production"
```

---

### STEP 4: Buat Repository di GitHub

**VIA BROWSER:**
1. Buka: https://github.com/new
2. Repository name: **qr-generator**
3. Pilih: **Public**
4. ❌ JANGAN centang "Add a README file"
5. Klik: **Create repository**

**COPY URL yang muncul**, contoh:
```
https://github.com/USERNAME/qr-generator.git
```

---

### STEP 5: Push ke GitHub

```powershell
# Connect ke GitHub (ganti USERNAME dengan username GitHub Anda!)
git remote add origin https://github.com/USERNAME/qr-generator.git

# Rename branch ke main
git branch -M main

# Push code
git push -u origin main
```

**Kalau diminta login:**
- Masukkan username & password GitHub
- Atau pakai Personal Access Token (kalau sudah setup)

**Output sukses:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Delta compression using up to X threads
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), XXX KiB | XXX MiB/s, done.
Total XX (delta X), reused 0 (delta 0), pack-reused 0
To https://github.com/USERNAME/qr-generator.git
 * [new branch]      main -> main
```

✅ **CODE SUDAH DI GITHUB!**

Cek di browser: `https://github.com/USERNAME/qr-generator`

---

### STEP 6: Deploy ke Netlify

**VIA BROWSER:**

1. **Login Netlify**: https://app.netlify.com/
2. Klik: **"Add new site"**
3. Pilih: **"Import an existing project"**
4. Klik: **"Deploy with GitHub"**
5. Cari repository: **"qr-generator"** → Klik
6. **Build settings** (auto-detect, jangan diubah):
   ```
   Build command: npm run build
   Publish directory: dist
   ```
7. Klik: **"Deploy qr-generator"**

**TUNGGU BUILD SELESAI (1-3 menit)**

Lihat progress di halaman deploy. Kalau sukses:
```
✅ Site is live
```

---

### STEP 7: Custom Domain

Di dashboard Netlify:
1. Klik: **"Site settings"**
2. Tab: **"Site details"**
3. Section: **"Site information"**
4. Klik: **"Change site name"**
5. Ketik: **qr-generator**
6. Klik: **"Save"**

✅ **FINAL URL**: https://qr-generator.netlify.app/

---

## 🎉 SELESAI!

Website sudah LIVE dan bisa diakses siapa aja!

**Test:**
1. Buka: https://qr-generator.netlify.app/
2. Coba generate QR code
3. Download PNG/WebP
4. Buka halaman Tentang
5. Test di mobile (responsive)

---

## 🔄 UPDATE WEBSITE SETELAH DEPLOY

Setiap kali ada perubahan code:

```powershell
# 1. Masuk folder project
cd "C:\Users\andri\Downloads\Responsive QR Code Generator"

# 2. Add semua perubahan
git add .

# 3. Commit (ganti pesan sesuai perubahan)
git commit -m "Update: tambah fitur X"

# 4. Push ke GitHub
git push

# SELESAI! Netlify auto-build & deploy (1-2 menit)
```

Cek status deploy di: https://app.netlify.com/

---

## ❓ TROUBLESHOOTING

### **1. Error: "git: command not found"**
**Solusi**: Install Git dulu
- Download: https://git-scm.com/download/win
- Install dengan setting default
- Restart terminal

---

### **2. Error: "remote origin already exists"**
**Solusi**: Hapus remote lama, tambah baru
```powershell
git remote remove origin
git remote add origin https://github.com/USERNAME/qr-generator.git
git push -u origin main
```

---

### **3. Error: "failed to push some refs"**
**Solusi**: Pull dulu, baru push
```powershell
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

### **4. Build Failed di Netlify**
**Solusi**: 
1. Klik tab "Deploys" di Netlify
2. Klik deploy yang failed
3. Scroll ke bawah, lihat error log
4. Screenshot & tanya ke support

**Common fix:**
```powershell
# Hapus cache, build ulang lokal
Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "node_modules\.vite" -Recurse -Force -ErrorAction SilentlyContinue
npm run build

# Kalau lokal sukses, commit & push lagi
git add .
git commit -m "Fix: rebuild after clearing cache"
git push
```

---

### **5. File `_headers` masih jadi folder**
**Solusi**:
```powershell
# Paksa hapus folder
Remove-Item -Path "public\_headers" -Recurse -Force

# Buat file baru (copy command dari STEP 2)
@"
/*
  # Security Headers
  ...
"@ | Out-File -FilePath "public\_headers" -Encoding utf8 -NoNewline

# Verifikasi (harus -a--- bukan d----)
Get-Item public\_headers
```

---

## 📋 QUICK REFERENCE

### **Perintah Git Penting**

```powershell
# Status file yang berubah
git status

# Lihat history commit
git log --oneline

# Undo perubahan (belum commit)
git checkout -- nama-file.tsx

# Undo commit terakhir (keep changes)
git reset --soft HEAD~1

# Push force (hati-hati!)
git push --force

# Clone repository
git clone https://github.com/USERNAME/qr-generator.git
```

---

### **Perintah Netlify CLI (Optional)**

Install Netlify CLI (opsional, untuk deploy langsung dari terminal):

```powershell
# Install
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## ✅ CHECKLIST FINAL

- [ ] File `_headers` sudah jadi FILE (bukan folder)
- [ ] Code sudah di-commit
- [ ] Code sudah di-push ke GitHub
- [ ] Repository GitHub bisa dibuka
- [ ] Deploy di Netlify sukses
- [ ] Website live: https://qr-generator.netlify.app/
- [ ] Generate QR berfungsi
- [ ] Download PNG/WebP berfungsi
- [ ] Mobile responsive
- [ ] Google Analytics tracking (tunggu 24 jam)

---

## 🎊 CONGRATULATIONS!

**Website QR Generator Anda sudah LIVE!**

Share ke dunia:
👉 **https://qr-generator.netlify.app/**

---

Butuh bantuan? Tanya aja! 😊
