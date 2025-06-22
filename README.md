# Keuku – Keuanganku

Aplikasi Web Keuangan sederhana berbasis React.js dan Laravel yang digunakan untuk pencatatan keuangan pribadi, terintegrasi langsung dengan Google Sheets API melalui frontend.

## 📌 Deskripsi
Keuku dikembangkan sebagai prototipe sistem informasi keuangan untuk membantu pencatatan dan visualisasi data keuangan secara real-time. Aplikasi ini terdiri dari frontend React.js dan backend Laravel, dengan penggunaan Google Sheets API secara langsung di sisi frontend untuk menyimpan data transaksi.

## 🚀 Fitur Utama
- Autentikasi Pengguna (Login, Register, Lupa Password) menggunakan Laravel Backend
- Dashboard Keuangan dengan rekap pengeluaran dan pemasukan
- Statistik Keuangan bulanan (Bar Chart) yang interaktif
- Pencatatan Transaksi yang disimpan langsung ke Google Sheets via API (tanpa backend)
- About Page dengan marquee berjalan
- Custom Background dan Identitas Kartu di Dashboard
- Rekap data berdasarkan tanggal & filter transaksi
- Responsive Design menggunakan TailwindCSS

## 🛠️ Teknologi yang Digunakan
- React.js (.jsx)
- Laravel 10 (Backend)
- Google Sheets API (langsung di frontend)
- TailwindCSS
- React Router DOM
- MySQL (local database Laravel)
- Laragon (sebagai local server environment)

## ⚙️ Cara Menjalankan (Local)

### 1. Clone Repository
```
git clone https://github.com/woodyuser/webkeuanganku-week7.git
cd webkeuanganku-week7
```

### 2. Jalankan Backend (Laravel)
```
cd backend-keuku
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Catatan Backend:
- Database MySQL dikelola melalui phpMyAdmin: http://localhost/phpmyadmin
- Database: keuku_db
- Username: root
- Password: (kosong jika default Laragon/XAMPP)
- Backend hanya digunakan untuk autentikasi (Login, Register, Lupa Password)

### 3. Jalankan Frontend (React.js)
```
npm install
npm start
```

Catatan Frontend:
- Frontend berjalan di: http://localhost:3000
- Pastikan file .env frontend sudah berisi:
  ```bash
  PUBLIC_BUILDER_KEY=d813235722dd44409885b9825c4ed9eb
  REACT_APP_API_URL=http://localhost:8000/api
  ```

### 4. Konfigurasi Google Sheets API
Google Sheets API digunakan langsung di frontend (bukan lewat backend).

Atur di file:
```bash
frontend-keuku/src/services/googleSheets.js
```
  
Isi variabel berikut:
```bash
const API_KEY = 'API_KEY_KAMU';
const SPREADSHEET_ID = 'SPREADSHEET_ID_KAMU';
const SHEET_NAME = 'Sheet1'; // atau sesuaikan dengan nama sheet
```

Catatan:
Google Sheets harus di-share agar dapat diakses API.

API Key diatur via Google Cloud Console.

## 🔧 Contoh .env Backend (Laravel)
```bash
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:XXXXXXXXXXXXXXXXXXXX
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=keuku_db
DB_USERNAME=root
DB_PASSWORD=

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/google/callback
GOOGLE_SHEET_ID=your-google-sheet-id
GOOGLE_SHEET_RANGE=Sheet1!A:F
GOOGLE_SHEET_HEADER_ROW=1
```

## 🔗 Video Demo 
[Demo Video di YouTube]([https://youtu.be/link-video-kamu](https://youtu.be/nm1G6c9Aq0k)

## 👨‍💻 Developer
Indah Ayu Putri Mashita Cahyani
(Universitas Pembangunan Nasional Veteran Jawa Timur)

## 📄 Lisensi
Project ini dibuat sebagai bagian dari program magang mandiri di PT Winnicode Garuda Teknologi.
