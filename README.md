# ClassHub - Learning Management System Prototype

![ClassHub](https://img.shields.io/badge/Status-Prototype-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20TailwindCSS%20%7C%20Vanilla%20JS-blue)

ClassHub adalah prototipe aplikasi *Single Page Application* (SPA) berbasis web untuk sistem Learning Management System (LMS). Proyek ini dibangun sebagai pemenuhan tugas **Final Project Multimedia System**.

Aplikasi ini meniru alur kerja LMS populer (seperti Google Classroom / Edlink) namun dengan sentuhan antarmuka (UI) yang jauh lebih modern, asimetris, dan mengutamakan estetika *Glassmorphism* layaknya desain aplikasi kontemporer.

## ✨ Fitur Utama

1. **Dashboard Interaktif**:
   - Menampilkan daftar kelas (*courses*) secara dinamis.
   - Fitur "Add New Course" untuk membuat kelas baru dengan *mock data*.

2. **UI/UX Modern (Course Detail)**:
   - *Hero Banner* bergaya Apple/Google dengan *frosted glass* (backdrop-blur) dan asimetri.
   - *Learning Path*: Modul pembelajaran direpresentasikan sebagai folder horizontal (*scrollable cards*).
   - *Timeline Feed*: Garis waktu aktivitas kelas (Tugas, Kuis, Pengumuman) yang interaktif.
   - *Widgets*: Panel presensi sirkular interaktif dan daftar tugas tertunda dengan mode gelap kontras.

3. **Modul Multimedia (Sistem Multimedia)**:
   - Terintegrasi dengan fitur pemutaran video kompresi (contoh: H.264 MP4).
   - **Multimedia Synchronization**: Simulasi sinkronisasi multimedia (*Video Transcript* & Interupsi Kuis/Polling pada detik tertentu di video).
   - **Buffering Simulation**: Simulasi *loading/buffering* saat pemutaran video.
   - Pemutar Audio dan peninjau (viewer) PDF untuk kelengkapan bahan ajar.

4. **Sistem Pencarian Berbasis Metadata**:
   - Pencarian konten pembelajaran yang difilter menggunakan 8 atribut metadata esensial (Title, Creator, Date Created, Format, Duration, Resolution, Tags, Access Rights).

## 🛠️ Teknologi yang Digunakan

- **Struktur**: HTML5 murni (tanpa framework JS seperti React/Vue).
- **Styling**: Tailwind CSS (via CDN) dengan *custom Vanilla CSS* tambahan untuk animasi dan utilitas *scroll*.
- **Logika & State Management**: Vanilla JavaScript (ES6+).
- **Ikonografi**: FontAwesome 6.

## 🚀 Cara Menjalankan Aplikasi Lokal

Karena aplikasi ini diatur sebagai SPA dengan sistem *routing* Vanilla JS, Anda **harus** menjalankannya menggunakan *local server* (bukan hanya dengan klik dua kali pada file `index.html` karena pembatasan CORS).

Pilih salah satu metode berikut di terminal (berada di dalam direktori proyek ini):

### Metode 1: Menggunakan Python (Disarankan)
Jika Anda memiliki Python terinstal:
```bash
python3 -m http.server 8000
```
Lalu buka browser Anda dan akses: `http://localhost:8000`

### Metode 2: Menggunakan Node.js / NPX
Jika Anda memiliki Node.js terinstal:
```bash
npx serve .
```
Akses URL yang diberikan di terminal (biasanya `http://localhost:3000`).

### Metode 3: Ekstensi VS Code
Jika Anda menggunakan Visual Studio Code, Anda bisa menginstal ekstensi **Live Server**, lalu klik kanan pada file `index.html` dan pilih **"Open with Live Server"**.

## 📁 Struktur Direktori

\`\`\`text
googleclassroom/
│
├── index.html            # File utama (Entry point SPA)
├── css/
│   └── style.css         # Styling kustom tambahan
├── js/
│   ├── app.js            # Inisialisasi router dan core logic SPA
│   ├── state.js          # Mock data JSON dan state management global
│   ├── components.js     # UI Components reusable (Modal, Navbar, Sidebar)
│   └── views/            # Komponen halaman spesifik
│       ├── dashboard.js      # Halaman utama daftar kelas
│       ├── courseDetail.js   # Halaman detail kelas (UI Asimetris)
│       ├── moduleContent.js  # Halaman daftar materi di dalam folder modul
│       ├── mediaPlayer.js    # Simulasi sistem sinkronisasi multimedia
│       └── searchRetrieval.js# Sistem pencarian metadata
└── README.md             # Dokumentasi ini
\`\`\`

---
*Dibuat untuk Final Project Multimedia System.*
