# Spesifikasi Desain Teknis — Portofolio Interaktif (Bauhaus × Memphis × Kawaii)

**Tanggal:** 10 September 2026  
**Status:** Disetujui (Approved)  
**Referensi PRD:** `PRD_Portofolio_Interaktif_Bauhaus_Memphis_Kawaii.md`  

---

## 1. Ringkasan & Tujuan Sistem

Membangun website portofolio profesional berkecepatan tinggi, aksesibel, dan interaktif yang memadukan tiga gaya visual:
1. **Bauhaus (~60%)**: Pondasi grid presisi, tipografi tegas berhirarki, bentuk geometris murni, garis struktural 1–2 px, fungsi konten diutamakan sebelum ornamen.
2. **Memphis (~25%)**: Aksen titik (*dots matrix*), garis zigzag (*squiggles*), kontras warna berani pada pembatas seksi terpilih (maksimal 2 area aksen beranda).
3. **Kawaii (~15%)**: Radius sudut lembut (8–12 px) pada elemen interaktif, patung geometris 3D yang bersahabat, dan micro-interaction taktis yang menyenangkan.

Website ini menyediakan akses langsung ke identitas pemilik, 3–4 karya pilihan terstruktur, studi kasus lengkap per proyek, profil tentang pemilik, serta kanal kontak terverifikasi (email + tautan sosial). Seluruh fungsionalitas inti dapat digunakan secara penuh tanpa WebGL (HTML fallback mandiri) dan memenuhi standar aksesibilitas WCAG 2.2 AA.

---

## 2. Arsitektur Teknis & Dependensi

### 2.1 Stack Inti
- **Framework UI:** React 18 / 19 + TypeScript (strict mode).
- **Build Tool:** Vite (mendukung chunk splitting dan Fast Refresh).
- **Styling:** Tailwind CSS + CSS Custom Properties (Design Tokens terpusat).
- **Routing:** `react-router-dom` (client-side routing untuk `/`, `/work/:slug`, dan `*` 404).
- **Mesin 3D:** Three.js + `@react-three/fiber` (R3F) + `@react-three/drei` (komponen pembantu terpilih).
- **Pengujian:** Vitest + React Testing Library.
- **Ikon:** Lucide React / SVG kustom konsisten.

### 2.2 Struktur Direktori
```text
portofolio/
├── src/
│   ├── types/
│   │   └── portfolio.ts              # TypeScript interfaces: Portfolio, Owner, Project, CaseStudy, SceneBinding
│   ├── content/
│   │   ├── portfolio.ts              # Single source of truth data (mode: 'preview')
│   │   └── validator.ts              # Validasi struktur, konsistensi relasi, dan rule mode produksi
│   ├── styles/
│   │   ├── tokens.css                # CSS Custom Properties (#F6F1E7, #242424, #2146D9, dll.)
│   │   └── index.css                 # Tailwind directives, font definitions, base styles
│   ├── components/
│   │   ├── common/
│   │   │   ├── SkipLink.tsx          # Aksesibilitas skip-to-content
│   │   │   ├── VisuallyHidden.tsx    # Accessible text untuk screen reader
│   │   │   └── SectionHeader.tsx     # Judul seksi bergaya Bauhaus
│   │   ├── layout/
│   │   │   ├── AppShell.tsx          # Shell pembungkus halaman & focus management
│   │   │   ├── SiteHeader.tsx        # Wordmark pemilik & link navigasi desktop
│   │   │   ├── MobileNav.tsx         # Menu disclosure mobile (Escape/Tab accessible)
│   │   │   └── Footer.tsx            # Footer informatif + tahun dinamis
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx       # 5 kolom teks + 7 kolom area visual
│   │   │   ├── SelectedProjectPanel.tsx # Info HTML proyek terpilih & link detail
│   │   │   └── SceneControls.tsx     # Radio group proyek, rotasi 15°, reset posisi
│   │   ├── work/
│   │   │   ├── WorkSection.tsx       # Daftar 3-4 proyek pilihan tata letak editorial
│   │   │   └── ProjectCard.tsx       # Presentasi karya (media cover tidak terpotong, peran, masalah, kontribusi)
│   │   ├── about/
│   │   │   ├── AboutSection.tsx      # Bio singkat, pendekatan kerja
│   │   │   └── SkillGroups.tsx       # Kelompok keahlian fungsional (tanpa persentase)
│   │   └── contact/
│   │   │   ├── ContactSection.tsx    # Email & tautan sosial
│   │   │   └── CopyEmailButton.tsx   # Tombol salin email dengan feedback aria-live
│   ├── scene/                        # Lazy-loaded chunk
│   │   ├── SceneBoundary.tsx         # Boundary status (poster, loading, ready, paused, fallback)
│   │   ├── PortfolioScene.tsx        # Canvas R3F, camera, lights, frameloop="demand"
│   │   ├── ModularSculpture.tsx      # Mesh kubus lembut, bola, torus, arc prosedural
│   │   └── useSculptureGesture.ts    # Drag yaw bebas, pitch ±30°, threshold pemisah 8px
│   ├── pages/
│   │   ├── HomePage.tsx              # Beranda terpadu (Hero, Work, About, Contact)
│   │   ├── ProjectDetailPage.tsx     # Halaman studi kasus /work/:slug
│   │   └── NotFoundPage.tsx          # Halaman 404 bersih dengan link kembali
│   ├── hooks/
│   │   ├── useReducedMotion.ts       # Deteksi sistem prefers-reduced-motion
│   │   └── useClipboard.ts           # Logika copy to clipboard aman
│   ├── App.tsx                       # Router configuration
│   └── main.tsx                      # Mount React root
├── tests/
│   ├── content.test.ts               # Validasi data & validator logic
│   └── interaction.test.ts           # Validasi threshold gestur & seleksi
├── public/
│   ├── favicon.svg                   # Favicon geometris Bauhaus
│   ├── poster-sculpture.svg          # Poster fallback statis patung
│   └── projects/                     # Gambar cover proyek rasio terjaga
├── vite.config.ts                    # Chunk splitting Three.js & alias
├── tailwind.config.js                # Tema token & font
└── tsconfig.json                     # Strict TypeScript
```

---

## 3. Model Konten & Aturan Validasi

### 3.1 Skema Data (`src/types/portfolio.ts`)
- `Portfolio`: `mode` (`'preview'` | `'production'`), `locale` (`'id'`), `owner`, `projects`, `featuredProjectIds`, `sceneBindings`, `labels`, `seo`.
- `Owner`: `name`, `profession`, `intro`, `bio`, `approach`, `skillGroups`, `email`, `socialLinks`, `availability`.
- `Project`: `id`, `slug`, `contentState` (`'placeholder'` | `'verified'`), `title`, `summary`, `problem`, `role`, `contributions`, `cover`, `caseStudy`, `year?`, `period?`, `technologies?`, `projectType?`, `externalLinks?`.
- `CaseStudy`: `context`, `process`, `decisions`, `deliverables`, `outcomes?`, `lessons?`, `gallery?`.
- `SceneBinding`: `partId` (`'part-cube'` | `'part-sphere'` | `'part-ring'` | `'part-arc'`), `projectId`.

### 3.2 Aturan Validasi (`src/content/validator.ts`)
1. **Keunikan & Integritas:** Setiap `project.id` dan `project.slug` wajib unik. `featuredProjectIds` harus memetakan proyek yang terdaftar.
2. **Kesesuaian 3D:** Setiap `sceneBindings` harus merujuk ke ID proyek valid di `projects`.
3. **Mode Preview:** Mengizinkan string template dengan penanda transparan `[NAMA]`, `[PROFESI]`, dll., serta teks pemberitahuan pratinjau.
4. **Mode Production:** Menolak build jika ada placeholder tersisa, email kosong/invalid, atau proyek berstatus `'placeholder'`.

---

## 4. Sistem Visual, Token, & Tipografi

### 4.1 Token Warna
| Token CSS | Hex | Peran |
| --- | --- | --- |
| `--color-bg` | `#F6F1E7` | Warm Ivory (latar utama) |
| `--color-text` | `#242424` | Charcoal (teks utama & garis batas, kontras > 11:1) |
| `--color-text-muted` | `#59554F` | Neutral Dark Muted (keterangan/metadata, kontras > 5.5:1) |
| `--color-cobalt` | `#2146D9` | Cobalt Blue (CTA primer, tautan, bagian patung) |
| `--color-tomato` | `#D83A2F` | Tomato Red (aksen komposisi Bauhaus & bagian patung) |
| `--color-butter` | `#F2D45C` | Butter Yellow (bidang sorotan dengan teks charcoal) |
| `--color-pink` | `#EFBFCB` | Soft Pink (aksen lembut Kawaii/Memphis) |
| `--color-mint` | `#B8D8C7` | Soft Mint (aksen lembut pelengkap) |
| `--color-on-accent` | `#FFFFFF` | Putih bersih untuk teks di atas cobalt/tomato |

### 4.2 Tipografi
- **Display / Headings:** Space Grotesk (geometric sans, tracking rapat, H1 fluid `clamp(2.5rem, 5vw, 4.5rem)`).
- **Body / Kontrol:** Inter (sans-serif netral, line-height 1.6, lebar kolom baca 55–75 karakter).
- **Skala Spacing:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px.

### 4.3 Kepatuhan Anti-AI-Slop (PRD Bagian 15)
- Tanpa badge generik ("100% Creative", "Verified Expert", "Next-Gen").
- Tanpa persentase keahlian bar ("React 95%").
- Tanpa gradient ungu/pink blur atau glassmorphism klise.
- Seluruh tata letak berbasis container tegas, garis struktural berkarakter, dan asimetri editorial terencana.

---

## 5. Spesifikasi Patung 3D & Lifecycle

### 5.1 Geometri Prosedural & Pemetaan
- **Bagian 1 (Kubus bersudut lembut):** Proyek 01 (default aktif saat load).
- **Bagian 2 (Bola):** Proyek 02.
- **Bagian 3 (Cincin / Torus):** Proyek 03.
- **Bagian 4 (Bentuk Lengkung / Arc):** Proyek 04 (atau dekoratif jika hanya ada 3 proyek).

### 5.2 Kontrak Interaksi & Gestur
- **Pemisahan Drag vs Klik:** Pointer movement > 8 CSS px membatalkan status klik kandidat. Seleksi proyek hanya dieksekusi jika pointer up terjadi pada mesh yang sama tanpa perpindahan drag.
- **Touch Policy:** Elemen kanvas disetel `touch-action: pan-y pinch-zoom`. Geser horizontal satu jari memutar objek pada sumbu yaw. Geser vertikal mengalirkan scroll halaman dokumen tanpa hambatan.
- **Batasan Rotasi:** Yaw bebas 360°, Pitch dibatasi ketat ±30° dari sudut pandang natural.
- **Kontrol Alternatif HTML:**
  - `fieldset` radio group dengan `legend="Pilih proyek"` untuk keyboard / screen reader.
  - Tombol HTML rotasi langkah 15° (Kiri, Kanan, Atas, Bawah).
  - Tombol "Reset posisi" memulihkan sudut kamera/objek ke default tanpa mengubah proyek terpilih.

### 5.3 Siklus Hidup & Fallback
- `poster`: Ilustrasi vektor statis SVG dengan ukuran dicadangkan (*zero CLS*) tampil instan.
- `loading`: Chunk 3D dimuat di background secara asinkron; tidak memblokir render hero HTML.
- `ready`: Scene R3F siap berinteraksi dengan `frameloop="demand"` (hanya merender frame saat ada interaksi drag atau transisi).
- `paused`: Menghentikan loop render jika scene tidak terlihat (`IntersectionObserver`) atau tab di-minimize (`document.visibilityState === 'hidden'`).
- `fallback`: Ditampilkan jika WebGL tidak ada, context lost, atau inisialisasi > 8 detik. Seluruh pilihan proyek HTML tetap bekerja 100%.

---

## 6. Rencana Verifikasi & Kriteria Penerimaan

| ID | Pengujian | Kriteria Lolos |
| --- | --- | --- |
| **AC-01** | Simulasi WebGL off / 3D block | Hero, navigasi, dan daftar proyek HTML tampil instan dan dapat digunakan |
| **AC-02** | Navigasi menu & anchor | Anchor `#work`, `#about`, `#contact` mendarat tepat tanpa tertutup sticky header |
| **AC-03** | Route langsung `/work/:slug` | Dapat di-reload langsung, metadata benar, dan tombol kembali ke `/#work` berfungsi |
| **AC-04** | Navigasi keyboard & focus trap mobile | Menu mobile merespons `Enter`, `Space`, `Escape`, dan tidak ada focus trap |
| **AC-05** | Drag vs Tap threshold | Drag > 8px tidak memicu seleksi proyek; tap langsung memilih proyek |
| **AC-06** | Sinkronisasi seleksi | Pemilihan via 3D mesh langsung memperbarui panel HTML; pemilihan radio HTML memperbarui highlight 3D |
| **AC-07** | Reset posisi | Orientasi patung kembali ke titik awal tanpa mengubah proyek aktif |
| **AC-08** | Touch gesture mobile | Scroll vertikal halaman normal; swipe horizontal memutar patung |
| **AC-09** | Preferensi Reduced Motion | Menghilangkan animasi damping, rotasi transisi seketika, dan parallax off |
| **AC-10** | Salin Email Clipboard | Menampilkan status "Email disalin" (`aria-live="polite"`) atau fallback jika clipboard ditolak |
| **AC-11** | Validator Integritas Konten | Unit test memverifikasi relasi data dan menolak data invalid pada mode produksi |
| **AC-12** | Production Build & Typecheck | `tsc --noEmit` lulus bersih; build Vite memisahkan chunk 3D dari bundle utama |
