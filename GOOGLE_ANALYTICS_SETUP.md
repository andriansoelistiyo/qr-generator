# 📊 Panduan Setup Google Analytics

Website QR Code Generator ini sudah dilengkapi dengan Google Analytics untuk tracking aktivitas user.

## 🚀 Cara Setup

### 1. **Buat Akun Google Analytics**

1. Kunjungi [Google Analytics](https://analytics.google.com/)
2. Login dengan akun Google Anda
3. Klik **"Start measuring"** atau **"Mulai mengukur"**
4. Isi informasi akun:
   - **Account name**: QR Code Generator (atau nama lain)
   - Centang semua opsi data sharing yang Anda setujui
   - Klik **Next**

### 2. **Buat Property**

1. Isi informasi property:
   - **Property name**: QR Code Generator Website
   - **Reporting time zone**: (GMT+07:00) Bangkok, Hanoi, Jakarta
   - **Currency**: Indonesian Rupiah (IDR)
   - Klik **Next**

2. Isi informasi bisnis (opsional):
   - **Industry category**: Technology
   - **Business size**: Small (1-10 employees)
   - Pilih tujuan penggunaan Analytics
   - Klik **Create**

3. Setujui Terms of Service
   - Centang kotak persetujuan
   - Klik **I Accept**

### 3. **Setup Data Stream**

1. Pilih platform: **Web**
2. Isi informasi website:
   - **Website URL**: https://qr-generator.netlify.app
   - **Stream name**: QR Code Generator Production
3. Klik **Create stream**

### 4. **Dapatkan Measurement ID**

Setelah stream dibuat, Anda akan melihat **Measurement ID** dengan format:
```
G-XXXXXXXXXX
```

**Contoh**: `G-ABC123XYZ4`

### 5. **Update Kode Website**

Ada 2 cara untuk setup Measurement ID:

#### **Cara 1: Menggunakan Environment Variable (RECOMMENDED)**

1. Buat file `.env` di root project (sejajar dengan `package.json`)
2. Isi dengan Measurement ID Anda:

```env
VITE_GA_MEASUREMENT_ID=G-ABC123XYZ4
```

3. Save file `.env`
4. **PENTING**: Jangan commit file `.env` ke Git (sudah ada di `.gitignore`)

**Untuk Netlify:**
1. Buka dashboard Netlify → pilih site Anda
2. **Site settings** → **Environment variables**
3. Klik **Add a variable**
4. Key: `VITE_GA_MEASUREMENT_ID`
5. Value: `G-ABC123XYZ4`
6. Klik **Save**
7. Deploy ulang website

#### **Cara 2: Hardcode di Kode (TIDAK RECOMMENDED)**

1. Buka file `/src/app/App.tsx`
2. Cari baris berikut (sekitar line 14):

```typescript
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";
```

3. Ganti `"G-XXXXXXXXXX"` dengan Measurement ID Anda:

```typescript
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-ABC123XYZ4";
```

4. Save file dan deploy ulang website ke Netlify

**⚠️ Note**: Cara 2 tidak recommended karena Measurement ID akan ter-commit ke Git repository

---

## 📈 Data yang Di-Track

Website ini secara otomatis melacak:

### **1. Page Views**
- **Beranda** (`/home`)
- **Generate QR Code** (`/generate`)
- **Tentang** (`/about`)

### **2. Custom Events**

#### **Event: `cta_clicked`**
Dilacak setiap kali user klik tombol Call-to-Action.

**Parameters:**
- `button_location`: Lokasi button (hero_section)
- `button_text`: Teks pada button (Mulai Generate QR)

**Contoh:**
```javascript
{
  button_location: "hero_section",
  button_text: "Mulai Generate QR"
}
```

#### **Event: `qr_code_generated`**
Dilacak setiap kali user berhasil generate QR Code.

**Parameters:**
- `qr_type`: Tipe QR (url, text, whatsapp, email)
- `qr_size`: Ukuran QR (small, medium, large)
- `qr_color`: Warna QR (hex color)

**Contoh:**
```javascript
{
  qr_type: "url",
  qr_size: "medium",
  qr_color: "#000000"
}
```

#### **Event: `qr_code_downloaded`**
Dilacak setiap kali user download QR Code.

**Parameters:**
- `qr_type`: Tipe QR (url, text, whatsapp, email)
- `qr_size`: Ukuran QR (small, medium, large)
- `download_format`: Format download (png, webp)

**Contoh:**
```javascript
{
  qr_type: "whatsapp",
  qr_size: "large",
  download_format: "png"
}
```

---

## 🔍 Cara Melihat Data di Google Analytics

### **Real-time Reports**
1. Buka [Google Analytics](https://analytics.google.com/)
2. Pilih property Anda
3. Sidebar kiri → **Reports** → **Realtime**
4. Lihat user yang sedang online dan aktivitas mereka

### **Events**
1. Sidebar kiri → **Reports** → **Engagement** → **Events**
2. Anda akan melihat semua events:
   - `page_view` (otomatis)
   - `qr_code_generated` (custom)
   - `qr_code_downloaded` (custom)

### **Custom Reports**

**Laporan QR Code Generation:**
- Filter event `qr_code_generated`
- Lihat breakdown berdasarkan:
  - Tipe QR paling populer (URL, WhatsApp, Email, Text)
  - Ukuran QR favorit user
  - Warna QR yang sering dipilih

**Laporan Download:**
- Filter event `qr_code_downloaded`
- Lihat breakdown berdasarkan:
  - Format download (PNG vs WebP)
  - Tipe QR yang paling sering di-download

---

## 🎯 Metrics Penting yang Perlu Diperhatikan

### **1. User Engagement**
- **Total Users**: Jumlah unique visitors
- **New Users**: User baru vs returning users
- **Engagement Rate**: Berapa % user yang berinteraksi
- **Average Engagement Time**: Durasi rata-rata user di website

### **2. Conversion Funnel**
1. **Page View** → User masuk ke website
2. **qr_code_generated** → User generate QR Code
3. **qr_code_downloaded** → User download QR Code

**Conversion Rate** = (Total Downloads / Total Page Views) × 100%

### **3. Popular Features**
- Tipe QR apa yang paling sering dibuat?
- Ukuran berapa yang paling populer?
- Format download apa yang lebih disukai?

---

## 🛠 Troubleshooting

### **Data tidak muncul di Google Analytics**

1. **Cek Measurement ID sudah benar:**
   - Pastikan format: `G-XXXXXXXXXX`
   - Tidak ada spasi atau karakter tambahan

2. **Cek browser DevTools:**
   - Buka browser DevTools (F12)
   - Tab **Console**
   - Seharusnya TIDAK ada warning: `"Google Analytics Measurement ID belum diset"`

3. **Cek Network Tab:**
   - Buka DevTools → **Network**
   - Filter: `gtag` atau `analytics`
   - Lakukan action (generate QR, download, etc)
   - Seharusnya muncul request ke `google-analytics.com`

4. **Gunakan Google Analytics Debugger:**
   - Install extension [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/)
   - Aktifkan extension
   - Buka console untuk melihat debug info

5. **Data delay:**
   - Real-time reports: 1-5 menit
   - Standard reports: 24-48 jam

---

## 📝 Best Practices

1. **Jangan share Measurement ID:**
   - Measurement ID tidak sensitif, tapi tetap jaga privacy
   - Jangan commit ke public repository jika ada concern

2. **Setup Goals:**
   - Buat conversion goal untuk `qr_code_downloaded`
   - Track success rate website

3. **Monitoring rutin:**
   - Cek analytics minimal 1x seminggu
   - Perhatikan trend dan pattern user behavior

4. **Privacy:**
   - Google Analytics sudah compliant dengan GDPR
   - Tidak mengumpulkan PII (Personally Identifiable Information)
   - Data yang di-track hanya metadata usage

---

## 🎓 Resources Tambahan

- [Google Analytics Documentation](https://support.google.com/analytics)
- [GA4 Event Tracking Guide](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)

---

## ✅ Checklist Setup

- [ ] Buat akun Google Analytics
- [ ] Buat property untuk website
- [ ] Setup data stream (Web)
- [ ] Copy Measurement ID (G-XXXXXXXXXX)
- [ ] Buat file `.env` dan isi dengan `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
- [ ] (Netlify) Tambahkan environment variable di Netlify dashboard
- [ ] Deploy website ke Netlify
- [ ] Test: Buka website dan cek Real-time reports
- [ ] Test: Klik "Mulai Generate QR" dan cek event `cta_clicked`
- [ ] Test: Generate QR Code dan cek event `qr_code_generated`
- [ ] Test: Download QR Code dan cek event `qr_code_downloaded`

---

**🎉 Selesai! Website Anda sekarang sudah ter-tracking dengan Google Analytics.**