# Implementation Plan — Portofolio Interaktif (Bauhaus × Memphis × Kawaii)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun website portofolio profesional interaktif lengkap, aksesibel, dan berkinerja tinggi yang menggabungkan tiga gaya visual (Bauhaus 60%, Memphis 25%, Kawaii 15%), patung geometris 3D modular dengan Three.js / React Three Fiber, kontrol alternatif HTML 100% mandiri, serta studi kasus proyek terstruktur berdasarkan PRD.

**Architecture:** Single-page app dengan client-side routing (`/`, `/work/:slug`, `*`), model konten terpusat bertipe TypeScript, boundary 3D lazy-load dengan on-demand frameloop (`frameloop="demand"`), serta pemisahan threshold gestur drag (>8px) vs klik. Komposisi halaman editorial asimetris didukung CSS Custom Properties dan Tailwind CSS.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Three.js, `@react-three/fiber`, `@react-three/drei`, `react-router-dom`, `lucide-react`, `vitest`, `@testing-library/react`.

**Spec:** `docs/superpowers/specs/2026-09-10-portfolio-design.md` & `PRD_Portofolio_Interaktif_Bauhaus_Memphis_Kawaii.md`

## Global Constraints
- Standar aksesibilitas WCAG 2.2 AA (kontras teks minimal 4.5:1, target sentuh minimal 44×44px, navigasi keyboard penuh, screen reader label).
- Pemisahan drag vs klik patung 3D: perpindahan pointer > 8 CSS px membatalkan kandidat klik.
- Kebijakan gestur sentuh: `touch-action: pan-y pinch-zoom` pada container canvas; geser vertikal tidak boleh terblokir.
- Batasan rotasi patung: Yaw bebas 360°, Pitch dibatasi ketat ±30° dari orientasi awal.
- Aturan anti-AI-slop Bagian 15 PRD: tanpa badge generik, tanpa persentase keahlian bar, tanpa gradient ungu blur, tanpa kontrol semu.
- Seluruh tugas inti (membaca profil, memilih proyek, membuka studi kasus, menyalin email) harus 100% dapat diselesaikan saat WebGL tidak tersedia.
- Chunk 3D dimuat secara terpisah (lazy-loaded); initial JS bundle tidak boleh memuat Three.js saat awal load.

---

### Task 1: Scaffolding Vite + React + TypeScript + Tailwind CSS + Dependencies

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/styles/tokens.css`
- Create: `src/styles/index.css`
- Create: `tests/setup.ts`
- Test: `tests/sanity.test.ts`

**Interfaces:**
- Produces: Lingkungan build Vite, test runner Vitest, dan utilitas token CSS untuk task-task berikutnya.

- [ ] **Step 1: Inisialisasi package.json dengan dependensi yang terkunci**

Tulis `package.json` dengan scripts `dev`, `build`, `preview`, `test`, `typecheck`, serta dependensi `react`, `react-dom`, `react-router-dom`, `three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`, `lucide-react`, `clsx`, `tailwind-merge`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.

- [ ] **Step 2: Jalankan npm install**

Run: `npm install`
Expected: Dependensi terpasang bersih dan `package-lock.json` terbentuk.

- [ ] **Step 3: Buat konfigurasi Vite, Tailwind, PostCSS, dan TypeScript**

Buat `vite.config.ts` dengan chunk splitting untuk vendor 3D (`three`, `@react-three/fiber`, `@react-three/drei`), `tailwind.config.js` dengan token warna (#F6F1E7, #242424, #2146D9, dll.), `tokens.css`, `index.css`, dan `index.html`.

- [ ] **Step 4: Buat sanity test Vitest**

Tulis `tests/sanity.test.ts` untuk memverifikasi lingkungan test Vitest + DOM berjalan.
Run: `npm test`
Expected: 1 test passed.

- [ ] **Step 5: Commit**

Run:
```bash
git add package.json package-lock.json vite.config.ts tailwind.config.js postcss.config.js tsconfig.json tsconfig.node.json index.html src/styles/ tests/
git commit -m "chore: scaffold vite react typescript tailwind and testing setup"
```

---

### Task 2: Type Definitions, Model Konten, & Content Validator (TDD)

**Files:**
- Create: `src/types/portfolio.ts`
- Create: `src/content/validator.ts`
- Create: `src/content/portfolio.ts`
- Test: `tests/content.test.ts`

**Interfaces:**
- Consumes: None
- Produces: `Portfolio`, `Owner`, `Project`, `CaseStudy`, `SceneBinding` types, `portfolioContent` data, and `validatePortfolio` validator function.

- [ ] **Step 1: Buat file definisi tipe `src/types/portfolio.ts`**

Definisikan interface `Portfolio`, `Owner`, `SkillGroup`, `Project`, `CaseStudy`, `Outcome`, `Media`, `ExternalLink`, `SceneBinding` sesuai Bagian 10 PRD.

- [ ] **Step 2: Tulis test validasi konten yang gagal (`tests/content.test.ts`)**

Tulis unit tests untuk:
- Memverifikasi konsistensi relasi `featuredProjectIds` dan `projects`.
- Memverifikasi `sceneBindings` merujuk ke ID proyek yang valid.
- Memvalidasi mode `'preview'` mengizinkan tag penanda jujur `[NAMA]`, dsb.
- Memvalidasi fungsi `validatePortfolio` menolak mode `'production'` jika ada placeholder atau email kosong.

- [ ] **Step 3: Jalankan test untuk memastikan test gagal**

Run: `npx vitest run tests/content.test.ts`
Expected: FAIL (karena `validator.ts` dan `portfolio.ts` belum dibuat).

- [ ] **Step 4: Implementasikan `src/content/validator.ts` dan `src/content/portfolio.ts`**

Tulis `validator.ts` dan buat `portfolio.ts` berisi 4 proyek terstruktur rapi (3 unggulan + 1 tambahan), identitas pemilik terstruktur dalam mode `'preview'` sesuai Bagian 3.2 PRD.

- [ ] **Step 5: Jalankan test untuk memastikan test lulus**

Run: `npx vitest run tests/content.test.ts`
Expected: PASS all tests.

- [ ] **Step 6: Commit**

Run:
```bash
git add src/types/ src/content/ tests/content.test.ts
git commit -m "feat: add typed content model and portfolio integrity validator"
```

---

### Task 3: Komponen Aksesibel Dasar, Header, Mobile Nav Disclosure, & Footer

**Files:**
- Create: `src/components/common/SkipLink.tsx`
- Create: `src/components/common/VisuallyHidden.tsx`
- Create: `src/components/common/SectionHeader.tsx`
- Create: `src/components/layout/SiteHeader.tsx`
- Create: `src/components/layout/MobileNav.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/AppShell.tsx`
- Test: `tests/navigation.test.ts`

**Interfaces:**
- Consumes: `portfolioContent.owner`, `portfolioContent.labels` from `src/content/portfolio.ts`
- Produces: `AppShell`, `SiteHeader`, `MobileNav`, `Footer`, `SkipLink`

- [ ] **Step 1: Tulis failing test navigasi & disclosure mobile (`tests/navigation.test.ts`)**

Test navigasi:
- Render header dengan wordmark nama dan link anchor `#work`, `#about`, `#contact`.
- Menu mobile disclosure: tombol memiliki `aria-expanded="false"`, berubah menjadi `"true"` saat diklik, dapat ditutup dengan `Escape`, dan memulihkan fokus ke tombol trigger.

- [ ] **Step 2: Jalankan test navigasi untuk memastikan fail**

Run: `npx vitest run tests/navigation.test.ts`
Expected: FAIL (komponen belum dibuat).

- [ ] **Step 3: Implementasikan komponen layout & aksesibilitas**

- `SkipLink.tsx`: tautan `#main-content` dengan fokus terlihat jelas.
- `VisuallyHidden.tsx`: helper teks pembaca layar.
- `SiteHeader.tsx`: header sticky dengan wordmark dan navigasi desktop.
- `MobileNav.tsx`: menu mobile disclosure dengan tombol buka/tutup, keyboard handling (Escape/Enter/Space), dan offset scroll.
- `Footer.tsx`: footer editorial Bauhaus dengan nama, tahun build dinamis, dan navigasi ringkas.
- `AppShell.tsx`: pembungkus halaman dengan skip link dan manajemen fokus.

- [ ] **Step 4: Jalankan test navigasi untuk memastikan pass**

Run: `npx vitest run tests/navigation.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/components/common/ src/components/layout/ tests/navigation.test.ts
git commit -m "feat: add accessible site header mobile disclosure and footer"
```

---

### Task 4: Hero Section, Selected Project Panel, & Kontrol Alternatif HTML

**Files:**
- Create: `src/components/hero/SelectedProjectPanel.tsx`
- Create: `src/components/hero/SceneControls.tsx`
- Create: `src/components/hero/HeroSection.tsx`
- Create: `src/hooks/useReducedMotion.ts`
- Test: `tests/hero.test.ts`

**Interfaces:**
- Consumes: `portfolioContent`, `Project`
- Produces: `HeroSection`, `SelectedProjectPanel`, `SceneControls`
- Exposes: State `selectedProjectId`, handler `onSelectProject(id)`, `onRotate(dir)`, `onReset()`

- [ ] **Step 1: Tulis failing test hero & kontrol HTML (`tests/hero.test.ts`)**

Test:
- Hero merender nama H1, profesi, deskripsi, CTA "Lihat Proyek" (`#work`) dan "Hubungi Saya" (`#contact`).
- Radio group `fieldset` dengan `legend="Pilih proyek"` merender nama semua proyek.
- Pemilihan radio memperbarui panel proyek aktif (judul, ringkasan, peran, CTA "Lihat detail [judul]").
- Tombol rotasi 15° dan tombol "Reset posisi" memanggil callback yang tepat.

- [ ] **Step 2: Jalankan test untuk memastikan fail**

Run: `npx vitest run tests/hero.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implementasikan `useReducedMotion.ts`, `SelectedProjectPanel.tsx`, `SceneControls.tsx`, dan `HeroSection.tsx`**

- Tata letak asimetris Bauhaus: 5 kolom teks + 7 kolom visual.
- Panel proyek HTML dengan tinggi minimum stabil agar tidak layout-shift.
- Kontrol HTML lengkap yang dapat dioperasikan keyboard tanpa membutuhkan canvas.

- [ ] **Step 4: Jalankan test untuk memastikan pass**

Run: `npx vitest run tests/hero.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/components/hero/ src/hooks/useReducedMotion.ts tests/hero.test.ts
git commit -m "feat: implement hero section project panel and html alternative controls"
```

---

### Task 5: Work Section, Project Cards, About Section, & Contact Section dengan Clipboard

**Files:**
- Create: `src/components/work/ProjectCard.tsx`
- Create: `src/components/work/WorkSection.tsx`
- Create: `src/components/about/SkillGroups.tsx`
- Create: `src/components/about/AboutSection.tsx`
- Create: `src/hooks/useClipboard.ts`
- Create: `src/components/contact/CopyEmailButton.tsx`
- Create: `src/components/contact/ContactSection.tsx`
- Test: `tests/clipboard.test.ts`
- Test: `tests/sections.test.ts`

**Interfaces:**
- Consumes: `portfolioContent`
- Produces: `WorkSection`, `AboutSection`, `ContactSection`

- [ ] **Step 1: Tulis failing test clipboard dan sections (`tests/clipboard.test.ts`, `tests/sections.test.ts`)**

Test:
- `CopyEmailButton`: memanggil clipboard API, menampilkan "Email disalin" dengan `aria-live="polite"`, mengembalikan teks setelah 3 detik. Menampilkan instruksi manual jika API gagal/ditolak.
- `WorkSection`: merender semua proyek pilihan dengan media cover utuh (`object-contain`), peran, masalah, kontribusi.
- `AboutSection`: merender bio dan skill groups tanpa persentase angka.
- `ContactSection`: email tampil sebagai teks dan link `mailto:`.

- [ ] **Step 2: Jalankan test untuk memastikan fail**

Run: `npx vitest run tests/clipboard.test.ts tests/sections.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implementasikan komponen Work, About, dan Contact**

Susun komponen dengan estetika editorial Bauhaus, aksen Memphis pada divider, dan Kawaii pada tombol. Terapkan fallback clipboard manual.

- [ ] **Step 4: Jalankan test untuk memastikan pass**

Run: `npx vitest run tests/clipboard.test.ts tests/sections.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/components/work/ src/components/about/ src/components/contact/ src/hooks/useClipboard.ts tests/clipboard.test.ts tests/sections.test.ts
git commit -m "feat: implement work section about section and contact section with clipboard"
```

---

### Task 6: Routing, Halaman Beranda, Detail Studi Kasus (`/work/:slug`), & 404

**Files:**
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/ProjectDetailPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`
- Create: `src/App.tsx`
- Create: `src/main.tsx`
- Test: `tests/routing.test.ts`

**Interfaces:**
- Consumes: All components from Tasks 2–5
- Produces: Halaman lengkap aplikasi dengan browser routing dan direct URL loading

- [ ] **Step 1: Tulis failing test routing (`tests/routing.test.ts`)**

Test:
- Route `/` merender HomePage dengan Hero, Work, About, Contact.
- Route `/work/:slug` valid merender ProjectDetailPage dengan data proyek yang cocok, bagian Konteks, Kontribusi, Proses, Keputusan, Deliverable, dan tombol "Kembali ke Proyek".
- Route `/work/non-existent-slug` merender NotFoundPage.
- Route sembarang `/unknown-route` merender NotFoundPage.

- [ ] **Step 2: Jalankan test routing untuk memastikan fail**

Run: `npx vitest run tests/routing.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implementasikan `HomePage.tsx`, `ProjectDetailPage.tsx`, `NotFoundPage.tsx`, `App.tsx`, dan `main.tsx`**

- Konfigurasi `react-router-dom` dengan `createBrowserRouter` (atau HashRouter/BrowserRouter dengan fallback).
- Studi kasus menyajikan rincian lengkap sesuai template Bagian 10.3 PRD.
- Pengaturan judul dokumen dan fokus otomatis ke heading utama saat halaman berpindah.

- [ ] **Step 4: Jalankan test routing untuk memastikan pass**

Run: `npx vitest run tests/routing.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/pages/ src/App.tsx src/main.tsx tests/routing.test.ts
git commit -m "feat: implement routing homepage case study detail page and 404 page"
```

---

### Task 7: Patung 3D Modular, R3F Scene, Gestur, & Lifecycle Fallback (P0)

**Files:**
- Create: `public/poster-sculpture.svg`
- Create: `src/scene/useSculptureGesture.ts`
- Create: `src/scene/ModularSculpture.tsx`
- Create: `src/scene/PortfolioScene.tsx`
- Create: `src/scene/SceneBoundary.tsx`
- Test: `tests/gesture.test.ts`

**Interfaces:**
- Consumes: `selectedProjectId`, `onSelectProject(id)`, `sceneBindings`, `useReducedMotion`
- Produces: `SceneBoundary` yang di-load secara lazy di `HeroSection`

- [ ] **Step 1: Tulis unit test untuk logika gestur & kalkulasi pemisah drag (>8px) (`tests/gesture.test.ts`)**

Test:
- Fungsi hitung delta pointer: pergerakan <= 8px menandai kandidat klik valid.
- Pergerakan > 8px menandai rotasi drag dan membatalkan seleksi klik.
- Fungsi clamp pitch membatasi sudut pada interval `[-30 * Math.PI / 180, +30 * Math.PI / 180]`.

- [ ] **Step 2: Jalankan test gestur untuk memastikan fail**

Run: `npx vitest run tests/gesture.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implementasikan `useSculptureGesture.ts` dan SVG Poster Statis**

- `public/poster-sculpture.svg`: vektor geometris patung Bauhaus (kubus, bola, torus, arc) yang ringan (< 15 KiB) untuk fallback instan.
- `useSculptureGesture.ts`: hook logika rotasi yaw/pitch, threshold 8px, touch-action horizontal pan, dan pointer cleanup.

- [ ] **Step 4: Implementasikan `ModularSculpture.tsx`, `PortfolioScene.tsx`, dan `SceneBoundary.tsx`**

- `ModularSculpture.tsx`: 4 geometri prosedural (soft cube, sphere, torus, arc) dengan material satin/matte palet token. Pointer event terhubung ke seleksi proyek jika bukan drag.
- `PortfolioScene.tsx`: Canvas R3F dengan `frameloop="demand"`, kamera perspektif, directional light + ambient fill, kontak bayangan, event handler rotasi eksternal (15° step & reset).
- `SceneBoundary.tsx`: Wrapper lazy dynamic import dengan status `poster`, `loading`, `ready`, `paused`, dan `fallback` (8s timeout atau WebGL fail) serta tombol coba ulang.

- [ ] **Step 5: Integrasikan `SceneBoundary` ke dalam `HeroSection.tsx`**

Hubungkan `SceneBoundary` ke dalam area visual hero, memastikan state `selectedProjectId` sinkron dua arah antara 3D mesh dan radio group HTML.

- [ ] **Step 6: Jalankan test gestur dan test keseluruhan**

Run: `npm test`
Expected: PASS all tests.

- [ ] **Step 7: Commit**

Run:
```bash
git add public/poster-sculpture.svg src/scene/ src/components/hero/HeroSection.tsx tests/gesture.test.ts
git commit -m "feat: implement modular 3d sculpture with r3f gesture controls and resilient fallback"
```

---

### Task 8: Build Verification, Audit Bundle & Aksesibilitas, Dokumentasi, & Laporan QA

**Files:**
- Create: `README.md`
- Create: `docs/QA_REPORT.md`

**Interfaces:**
- Produces: Production build terverifikasi, README lengkap, dan QA Report faktual mencakup kriteria AC-01 s.d. AC-22.

- [ ] **Step 1: Jalankan Typecheck TypeScript**

Run: `npm run typecheck`
Expected: Exit code 0, no errors.

- [ ] **Step 2: Jalankan Production Build Vite**

Run: `npm run build`
Expected: Build sukses di direktori `dist/`. Periksa pemisahan chunk JS: chunk Three.js terpisah dari initial vendor JS.

- [ ] **Step 3: Jalankan seluruh suite test Vitest**

Run: `npm test`
Expected: Seluruh unit dan integration test passed.

- [ ] **Step 4: Buat `README.md` dan `docs/QA_REPORT.md`**

Dokumentasikan:
- Cara menjalankan development server (`npm run dev`), build (`npm run build`), preview (`npm run preview`), test (`npm test`).
- Panduan mengganti konten di `src/content/portfolio.ts` dan beralih ke mode `'production'`.
- Matriks evaluasi kriteria penerimaan AC-01 s.d. AC-22 secara faktual.

- [ ] **Step 5: Commit final**

Run:
```bash
git add README.md docs/QA_REPORT.md
git commit -m "docs: add comprehensive readme and QA verification report"
```
