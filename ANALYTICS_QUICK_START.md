# 🚀 Google Analytics - Quick Start Guide

## Setup dalam 5 Menit ⏱️

### **Step 1: Dapatkan Measurement ID**
1. Buka [Google Analytics](https://analytics.google.com/)
2. Buat property baru untuk website Anda
3. Copy **Measurement ID** (format: `G-XXXXXXXXXX`)

### **Step 2: Setup di Netlify**
1. Buka [Netlify Dashboard](https://app.netlify.com/)
2. Pilih site Anda → **Site settings** → **Environment variables**
3. Klik **Add a variable**:
   - **Key**: `VITE_GA_MEASUREMENT_ID`
   - **Value**: `G-ABC123XYZ4` (paste Measurement ID Anda)
4. Klik **Save**
5. **Deploy** ulang website

### **Step 3: Verifikasi**
1. Buka website Anda
2. Buka Google Analytics → **Real-time**
3. Anda seharusnya melihat 1 active user (yourself!)

---

## 📊 Apa yang Di-Track?

### **Automatic Tracking:**
- ✅ Page views (Beranda, Generate, Tentang)
- ✅ User demographics & device info
- ✅ Traffic sources (Google, Social Media, Direct, etc)

### **Custom Events:**
- ✅ **CTA Click** - Button "Mulai Generate QR" diklik
- ✅ **QR Generated** - User berhasil membuat QR Code
- ✅ **QR Downloaded** - User download QR Code

---

## 📈 Metrics yang Bisa Anda Lihat

### **User Behavior:**
- Berapa banyak visitor per hari/minggu/bulan?
- Dari mana mereka datang? (Google, Facebook, Direct, etc)
- Device apa yang dipakai? (Mobile vs Desktop)
- Negara/kota asal visitor

### **Feature Usage:**
- Tipe QR apa yang paling populer? (URL, WhatsApp, Email, Text)
- Ukuran QR favorit user (Small, Medium, Large)
- Format download yang lebih disukai (PNG vs WebP)
- Warna QR yang sering dipilih

### **Conversion Funnel:**
```
100 Visitors → 80 Click CTA → 60 Generate QR → 45 Download
                 (80%)          (75%)            (75%)
```

---

## 🔍 Cara Lihat Data

### **Real-time (data instant):**
1. Google Analytics → **Reports** → **Realtime**
2. Lihat user yang sedang online SEKARANG

### **Events (custom tracking):**
1. Google Analytics → **Reports** → **Engagement** → **Events**
2. Klik event untuk lihat detail:
   - `cta_clicked` → Berapa kali button CTA diklik
   - `qr_code_generated` → Berapa QR Code dibuat (breakdown by type)
   - `qr_code_downloaded` → Berapa QR Code di-download

### **User Acquisition:**
1. Google Analytics → **Reports** → **Acquisition**
2. Lihat dari mana visitor datang

---

## 💡 Tips untuk Optimize Website

### **Jika Conversion Rate Rendah:**
- ✅ Perbaiki UX/UI landing page
- ✅ Tambahkan lebih banyak contoh use case
- ✅ Buat tutorial video

### **Jika Traffic Rendah:**
- ✅ Optimize SEO (keyword, meta tags)
- ✅ Share di social media
- ✅ Buat blog posts tentang QR Code

### **Jika Users Bounce Quickly:**
- ✅ Improve loading speed
- ✅ Make CTA more visible
- ✅ Add social proof / testimonials

---

## 🛠 Troubleshooting

### **"Data tidak muncul?"**
1. Cek environment variable sudah diset di Netlify
2. Cek format Measurement ID benar (`G-XXXXXXXXXX`)
3. Clear browser cache dan coba lagi
4. Tunggu 5-10 menit untuk real-time data

### **"Event tidak tercatat?"**
1. Buka DevTools (F12) → Console
2. Seharusnya TIDAK ada error Google Analytics
3. Lakukan action (generate QR, download) dan cek Network tab
4. Seharusnya ada request ke `google-analytics.com`

---

## 📚 More Details

Untuk panduan lengkap, lihat: [GOOGLE_ANALYTICS_SETUP.md](./GOOGLE_ANALYTICS_SETUP.md)

---

**Happy Tracking! 🎉**
