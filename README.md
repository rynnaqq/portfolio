# Portofolio Profesional Interaktif (Bauhaus × Memphis × Kawaii)

Portofolio web profesional yang menggabungkan fondasi struktural **Bauhaus (~60%)**, aksen ritmis **Memphis (~25%)**, serta keramahan geometris **Kawaii (~15%)**. Dilengkapi patung 3D modular berbasis WebGL (Three.js & React Three Fiber) yang tersinkronisasi dua arah dengan kontrol HTML alternatif berkemampuan aksesibilitas penuh.

Proyek ini dibangun berdasarkan spesifikasi ketat pada [`PRD_Portofolio_Interaktif_Bauhaus_Memphis_Kawaii.md`](./PRD_Portofolio_Interaktif_Bauhaus_Memphis_Kawaii.md).

---

## 🎨 Karakter Desain & Sistem Visual

1. **Bauhaus (Fondasi ~60%):**
   - Grid layout yang disiplin, border hitam tegas (`border-2 border-charcoal`), tipografi terstruktur (**Space Grotesk** untuk display dan **Inter** untuk keterbacaan teks panjang).
   - Palet warna primer: warm ivory (`#F6F1E7`), charcoal (`#242424`), cobalt blue (`#2146D9`), tomato red (`#D83A2F`), dan butter yellow (`#F2D45C`).
2. **Memphis (Aksen ~25%):**
   - Hard drop shadow berjarak tegas (`shadow-[4px_4px_0px_#242424]`), garis tepi tebal, variasi ritmis kontras pada tombol aksi dan kartu proyek.
3. **Kawaii (Detail ~15%):**
   - Sudut melengkung halus (`rounded-2xl`, `rounded-full`), proporsi ramah, mikro-interaksi responsif tanpa gerakan liar atau animasi otomatis yang mengganggu.
4. **Anti AI-Slop (PRD Bagian 15):**
   - Bebas badge generik ("Premium Experience", "Verified Expert"), tanpa bar persentase keahlian fiktif ("React 98%"), tanpa testimoni/metrik rekaan, dan tanpa purplish glassmorphism/glow blur yang mengaburkan konten.

---

## 🛠️ Tech Stack

- **Framework & Core:** React 19, TypeScript (Strict Mode)
- **Bundler & Tooling:** Vite 6, PostCSS, Tailwind CSS v3
- **Routing:** React Router v7
- **3D Graphics:** Three.js, `@react-three/fiber` (R3F), `@react-three/drei`
- **Icons:** Lucide React
- **Testing:** Vitest, `@testing-library/react`, `@testing-library/jest-dom`, JSDOM

---

## 🚀 Memulai Proyek

### Kebutuhan Sistem
- Node.js versi 18+ (atau LTS terbaru)
- npm versi 9+

### Instalasi & Menjalankan Development Server
```bash
# Instal dependensi
npm install

# Jalankan dev server lokal (dengan Hot Module Replacement)
npm run dev
```
Buka browser di `http://localhost:5173`.

### Pengujian & Validasi
```bash
# Jalankan seluruh unit dan integration test (Vitest)
npm test

# Jalankan pemeriksaan tipe statis TypeScript (strict)
npm run typecheck

# Jalankan production build Vite (minifikasi, chunking, & CSS tree-shaking)
npm run build

# Pratinjau hasil build lokal
npm run preview
```

---

## 📦 Anggaran Bundle & Optimasi Performa

Berdasarkan target Bagian 12 PRD, bundle JavaScript dibagi secara modular melalui `vite.config.ts`:
- **Initial JS Chunk:** `~28.44 KiB gzip` (Target PRD: `<= 200 KiB gzip`) ✅
- **Three.js Vendor Chunk:** `~302.74 KiB gzip` (Target PRD: `<= 450 KiB gzip`) ✅
- **Frameloop On-Demand:** Render WebGL hanya dipicu saat terjadi interaksi atau perubahan state (`frameloop="demand"`), menghemat baterai perangkat mobile dan mencegah pemanasan CPU/GPU saat diam.
- **Gesture Threshold:** Ambang batas 8px memisahkan swipe/rotasi kamera dari klik pemilihan proyek, didukung `touch-action: pan-y pinch-zoom` untuk kenyamanan scroll vertikal pada smartphone.

---

## 📝 Panduan Pengelolaan Konten & Publikasi

Seluruh data portofolio diisolasi pada satu sumber data bertipe: [`src/content/portfolio.ts`](./src/content/portfolio.ts).

### 1. Mode Saat Ini (`preview`)
Aplikasi saat ini berjalan dalam mode `'preview'`, yang memungkinkan pengembangan antarmuka dan interaksi 3D dengan penanda placeholder transparan (`[JUDUL ...]`, `[BIO ...]`, dsb.).

### 2. Beralih ke Mode Produksi (`production`)
Ketika pemilik portofolio siap merilis portofolio dengan data riil:
1. Buka file [`src/content/portfolio.ts`](./src/content/portfolio.ts).
2. Isi identitas pemilik: `name`, `title`, `heroDescription`, `bio`, `approach`, `email`, dan tautan sosial.
3. Masukkan 3–4 proyek riil dengan struktur lengkap:
   - `id`, `slug`, `title`, `year`, `role`, `summary`, `problem`, `solution`, `architecture`, `impact`, `metrics`, dan `visual`.
4. Sesuaikan kelompok keahlian (`skills`) dengan kategori dan contoh aplikasi nyata.
5. Ubah konfigurasi `mode`:
   ```typescript
   export const portfolioContent: PortfolioContent = {
     mode: 'production', // Ubah dari 'preview' ke 'production'
     // ...
   };
   ```
6. Jalankan pengujian dan validasi:
   ```bash
   npm test
   npm run build
   ```
   *Validator (`src/content/validator.ts`) secara otomatis memverifikasi bahwa tidak ada lagi string placeholder (`[PLACEHOLDER]`, `[JUDUL]`, dll.), email valid, dan tidak ada route studi kasus yang rusak.*

---

## ♿ Aksesibilitas (WCAG 2.2 AA)

- **Skip to Content:** Tautan pintas navigasi keyboard langsung ke `#main-content`.
- **Alternative Controls:** Kontrol proyek HTML lengkap berbentuk radio group `<fieldset>` dan `<legend>`, tombol rotasi step 15°, serta tombol reset rotasi patung.
- **Copy Email Notification:** Notifikasi status penyalinan email ke clipboard menggunakan `aria-live="polite"`, dengan pesan fallback instruksi salin manual jika izin clipboard ditolak.
- **Reduced Motion:** Mendeteksi `prefers-reduced-motion: reduce` secara otomatis untuk menonaktifkan transisi/animasi gerak berlebih tanpa mengurangi fungsionalitas.
- **WebGL Fallback:** Jika WebGL tidak didukung atau terjadi kegagalan context, fallback SVG poster dan tombol coba lagi tetap menjaga kelengkapan informasi portofolio.

---

## 📂 Struktur Direktori

```text
portofolio/
├── docs/                      # Dokumentasi teknis, spek, rencana implementasi & QA report
├── public/                    # Aset statis & SVG poster fallback
├── src/
│   ├── components/            # Komponen antarmuka React
│   │   ├── about/             # Seksi profil & kelompok keahlian
│   │   ├── common/            # Tombol, header seksi, skip link, visually hidden
│   │   ├── contact/           # Seksi kontak & copy email button
│   │   ├── hero/              # Hero layout, panel proyek terpilih, kontrol HTML
│   │   ├── layout/            # SiteHeader, MobileNav, Footer, AppShell
│   │   └── work/              # Daftar kartu proyek pilihan
│   ├── content/               # Sumber konten portofolio & validator
│   ├── hooks/                 # Custom hooks (useClipboard, useReducedMotion)
│   ├── pages/                 # Halaman aplikasi (HomePage, ProjectDetailPage, NotFoundPage)
│   ├── scene/                 # Komponen 3D Three.js/R3F, gesture utils, fallback boundary
│   ├── styles/                # Token desain CSS & Tailwind directives
│   ├── types/                 # Definisi tipe TypeScript
│   ├── App.tsx                # Komponen akar & router
│   └── main.tsx               # Titik masuk aplikasi
├── tests/                     # Suite pengujian otomatis Vitest & Testing Library
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 Lisensi

Hak Cipta © 2026. Seluruh hak cipta dilindungi.
