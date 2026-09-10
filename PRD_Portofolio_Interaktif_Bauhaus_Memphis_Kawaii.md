# PRD — Portofolio Profesional Interaktif

**Bauhaus × Memphis × Kawaii**

| Atribut | Nilai |
| --- | --- |
| Versi | 1.0 |
| Tanggal | 10 September 2026 |
| Status | Spesifikasi produk untuk implementasi; data pemilik belum diberikan |
| Platform | Website responsif untuk desktop, tablet, dan mobile |
| Bahasa awal | Bahasa Indonesia; struktur konten memungkinkan penggantian ke bahasa Inggris |
| Pembaca | Pemilik portofolio, product designer, frontend engineer, creative technologist, dan QA |
| Sumber kebutuhan | Brief portofolio interaktif yang diberikan pengguna |
| Deliverable dokumen ini | PRD Markdown; implementasi website dan hasil pengujiannya merupakan pekerjaan berikutnya |

Navigasi cepat: [Lingkup](#4-lingkup-dan-prioritas) · [Sistem visual](#6-sistem-visual-dan-art-direction) · [Halaman](#7-persyaratan-halaman-dan-konten) · [Interaksi 3D](#8-spesifikasi-objek-3d) · [Model konten](#10-model-konten-dan-aturan-validasi) · [Arsitektur](#11-arsitektur-teknis) · [Pengujian](#16-rencana-verifikasi-dan-kriteria-penerimaan) · [Deliverable](#19-deliverable-dan-definition-of-done)

## 1. Ringkasan produk

Website ini memperkenalkan pemilik portofolio, menunjukkan kualitas pekerjaan melalui 3–4 proyek pilihan, dan menyediakan cara menghubungi pemilik dengan mudah. Pengunjung harus dapat memahami profesi, membaca kontribusi dalam proyek, membuka studi kasus, dan menemukan kontak tanpa bergantung pada interaksi 3D.

Identitas visualnya menggunakan grid dan hierarki Bauhaus sebagai fondasi, aksen Memphis pada titik tertentu, serta kelembutan Kawaii pada bentuk dan respons interaksi. Latar warm ivory, teks charcoal, dan aksen cobalt blue, tomato red, serta butter yellow membentuk komposisi editorial yang tegas namun ramah.

Satu patung geometris modular menjadi elemen interaktif utama. Pengunjung dapat memutarnya dan memilih proyek melalui bagian patung, dengan pilihan yang selalu tersinkron ke informasi HTML. Objek memperkuat identitas dan membantu eksplorasi karya; seluruh jalur membaca proyek dan menghubungi pemilik tetap tersedia ketika 3D belum dimuat atau gagal.

**Urutan keputusan produk:** kejujuran konten → kejelasan karya → kemudahan navigasi dan kontak → aksesibilitas dan performa → penyempurnaan visual serta interaksi 3D.

Angka ukuran, durasi, dan anggaran performa dalam PRD adalah target desain atau target pengujian yang diusulkan. Angka tersebut bukan hasil pengukuran website yang sudah dibangun.

## 2. Masalah, tujuan, dan pengguna

### 2.1 Masalah yang diselesaikan

Portofolio dengan efek visual yang dominan dapat menyulitkan pengunjung menemukan karya dan menilai kontribusi pemilik. Sebaliknya, tata letak yang terlalu seragam dapat menghilangkan karakter kreatif. Produk ini perlu menghadirkan identitas yang khas sambil mempertahankan bukti pekerjaan, keterbacaan, dan navigasi yang langsung.

### 2.2 Pengguna utama

| Pengguna | Pertanyaan utama | Tugas yang harus mudah dilakukan |
| --- | --- | --- |
| Rekruter | Apa bidangnya dan seberapa jelas kontribusinya? | Memahami profil, memindai karya, membuka studi kasus, menemukan email |
| Calon klien | Apakah pendekatan dan hasil kerjanya sesuai kebutuhan saya? | Membaca masalah proyek, keputusan, deliverable, dan cara menghubungi |
| Kolaborator | Bagaimana ia bekerja dan apa yang dapat kami kerjakan bersama? | Membaca pendekatan, kemampuan relevan, peran dalam proyek, dan kontak |
| Pemilik portofolio | Bagaimana memperbarui karya tanpa merusak tampilan? | Mengubah satu sumber konten, menambah proyek, mengganti media dan kontak |

Ketiganya dilayani pada versi awal. Pemilik dapat menetapkan satu segmen utama nanti; jangan menyimpulkan bidang keahlian atau riwayat pemilik dari asumsi tersebut.

### 2.3 Tujuan dan ukuran keberhasilan

| ID | Tujuan | Kriteria yang dapat dinilai |
| --- | --- | --- |
| G-01 | Identitas cepat dipahami | Dalam uji singkat, pengunjung dapat menyebut nama, profesi, dan jenis pekerjaan setelah melihat hero sekitar 10 detik |
| G-02 | Karya mudah dinilai | Setiap proyek memiliki masalah, peran, kontribusi, media yang relevan, dan studi kasus yang dapat dibuka |
| G-03 | Kontak mudah ditemukan | Dari beranda, satu aktivasi CTA membawa pengunjung ke kontak; aktivasi berikutnya membuka email atau menyalinnya jika data tersedia |
| G-04 | Interaksi bersifat tambahan | Seluruh tugas inti dapat diselesaikan dengan keyboard dan pada kondisi WebGL gagal |
| G-05 | Karakter visual konsisten | Review visual memenuhi aturan Bagian 6 dan larangan Bagian 15 |
| G-06 | Konten mudah diperbarui | Identitas, urutan proyek, mapping 3D, dan kontak diperbarui melalui sumber konten terpusat tanpa mengganti markup halaman |

Uji pemahaman awal dapat menggunakan lima orang yang mewakili target pengunjung, dengan target minimal empat orang menyelesaikan tugas tanpa bantuan. Ini merupakan validasi formatif, bukan bukti statistik. Jika peserta belum tersedia, catat pengujian sebagai belum dilakukan. Jangan mengubah target di atas menjadi klaim pemasaran.

## 3. Asumsi dan keputusan awal

### 3.1 Keputusan untuk memulai

| Area | Keputusan awal | Alasan atau kondisi perubahan |
| --- | --- | --- |
| Jenis produk | Portofolio personal dengan beranda dan halaman studi kasus | Sesuai kebutuhan menilai karya dan menghubungi pemilik |
| Repository | Dianggap belum tersedia untuk perencanaan | Jika repository diberikan, audit dan ikuti stack serta konvensinya sebelum mengubah arsitektur |
| Stack baru | React, Vite, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Drei | Mengikuti brief; versi yang saling kompatibel dikunci saat implementasi |
| Bahasa | Indonesia, dengan label terpusat | Tidak membangun pengalih bahasa pada rilis awal |
| Jumlah karya | Tiga proyek sebagai struktur awal; mendukung proyek keempat | Hanya proyek nyata yang boleh dipublikasikan sebagai karya pemilik |
| Kontak | Email sebagai kanal utama | Formulir pengiriman tidak masuk lingkup awal |
| Konten | Data lokal bertipe dan aset statis | Tidak memerlukan CMS atau backend untuk lingkup ini |
| Animasi | Respons pendek terhadap aksi; tanpa rotasi otomatis saat diam | Memusatkan perhatian pada karya dan membatasi beban render |
| Pengukuran | Pengujian lokal dan review manual terlebih dahulu | Analytics eksternal tidak dipasang secara default |

### 3.2 Data yang perlu diisi pemilik

| Data | Placeholder pada pratinjau | Ketentuan publikasi |
| --- | --- | --- |
| Nama | `[NAMA]` | Nama yang diberikan pemilik |
| Profesi | `[PROFESI / BIDANG KEAHLIAN]` | Deskripsi konkret dan terverifikasi |
| Deskripsi hero | `[JENIS PEKERJAAN, UNTUK SIAPA, DAN KONTRIBUSI UTAMA]` | Tidak memuat hasil atau pengalaman yang tidak tersedia |
| Bio dan pendekatan | `[BIO SINGKAT]`, `[PENDEKATAN BEKERJA]` | Disetujui pemilik |
| Kemampuan | `[KELOMPOK KEMAMPUAN DAN CONTOH PENERAPAN]` | Relevan dengan pekerjaan yang benar-benar dilakukan |
| Proyek | `[JUDUL PROYEK 01]` hingga `[JUDUL PROYEK 03]` | Judul, masalah, peran, kontribusi, media, dan deliverable nyata |
| Email | Teks “Email belum ditambahkan.” | Alamat valid yang diberikan pemilik |
| Sosial | Tidak ditampilkan | Hanya platform dan URL yang diberikan |
| Status kerja | Tidak ditampilkan | Hanya boleh hadir jika pemilik memberikan status aktual |

### 3.3 Pratinjau dan publikasi

Dalam mode `preview`, placeholder diperbolehkan dan ditandai sebagai teks biasa: “Konten contoh untuk pratinjau; ganti sebelum publikasi.” Studi kasus contoh tetap dapat dibuka agar alur antarmuka dapat diuji. Visual placeholder harus diberi keterangan “Pratinjau proyek belum ditambahkan”; jangan membuat screenshot yang seolah-olah membuktikan karya nyata.

Dalam mode `production`, validasi konten menolak identitas inti yang belum diisi, email kosong, proyek berstatus placeholder, referensi aset yang tidak valid, serta klaim yang belum dikonfirmasi. Mode produksi merupakan konfigurasi aplikasi, bukan tombol yang terlihat oleh pengunjung.

Target publikasi adalah 3–4 proyek nyata. Jika baru 1–2 proyek tersedia, tampilkan data yang ada pada pratinjau dan catat kekurangan konten; jangan menggandakan atau mengarang proyek untuk memenuhi jumlah. Perubahan target jumlah perlu dicatat sebagai perubahan lingkup sebelum publikasi.

## 4. Lingkup dan prioritas

**P0** wajib untuk penerimaan implementasi inti. **P1** merupakan peningkatan setelah seluruh P0 selesai. Fitur di luar lingkup tidak boleh ditambahkan hanya untuk membuat website terlihat lebih lengkap.

| Prioritas | Lingkup |
| --- | --- |
| P0 | Navigasi responsif, hero konkret, daftar 3–4 proyek yang didukung data, halaman detail, about, email dan tautan sosial valid |
| P0 | Satu patung prosedural, drag/swipe, hover terkontrol, pemilihan proyek, reset, kontrol HTML setara |
| P0 | Fallback statis, lazy loading 3D, reduced motion, penghematan render, layout responsif, akses keyboard |
| P0 | Konten terpusat, validasi placeholder, route langsung, penanganan URL tidak dikenal, metadata dasar, dokumentasi menjalankan proyek |
| P0 | Verifikasi alur utama, audit konten, pengujian kondisi gagal, laporan hasil dan keterbatasan yang jujur |
| P0 | Parallax ringan dan terbatas pada desktop dengan pointer halus; nonaktif pada reduced motion dan profil hemat |
| P1 | Penyempurnaan ekspresi kecil pada patung jika menyatu dengan konsep |
| P1 | Prerender semua studi kasus apabila preview sosial dan indeks per proyek memerlukan HTML awal khusus |
| Di luar lingkup | Login, dashboard admin, CMS, blog, e-commerce, pencarian atau filter untuk hanya 3–4 proyek |
| Di luar lingkup | Formulir tanpa backend, chatbot, audio, game tambahan, VR/AR, dunia 3D yang dapat dijelajahi |
| Di luar lingkup | Dark mode, pengalih bahasa, analytics eksternal, integrasi kalender, dan unduhan CV yang belum diberikan |

Fitur P1 tidak boleh menggantikan penyelesaian P0. Kualitas satu objek dan studi kasus lebih penting daripada menambah efek.

## 5. Arsitektur informasi dan alur pengguna

### 5.1 Halaman dan route

| Route | Isi | Perilaku penting |
| --- | --- | --- |
| `/` | Hero, Proyek Pilihan, Tentang, Kontak, footer | Urutan DOM mengikuti urutan membaca |
| `/#work` | Bagian Proyek Pilihan | Tujuan CTA “Lihat Proyek” |
| `/#about` | Bagian Tentang | Tujuan navigasi About |
| `/#contact` | Bagian Kontak | Tujuan CTA “Hubungi Saya” |
| `/work/:slug` | Studi kasus untuk proyek yang terdaftar | Bisa dibuka langsung, dimuat ulang, dan dibagikan |
| Route tidak dikenal | Halaman “Halaman tidak ditemukan” | Tautan kembali ke beranda; tidak menampilkan studi kasus kosong |

`work`, `about`, dan `contact` tetap menjadi identifier. Label navigasi Indonesia adalah “Proyek”, “Tentang”, dan “Kontak”; bila konten diganti ke Inggris, gunakan “Work”, “About”, dan “Contact”.

### 5.2 Alur utama

1. **Menilai karya:** masuk beranda → membaca identitas → memilih “Lihat Proyek” → memindai media dan kontribusi → membuka studi kasus → menghubungi pemilik.
2. **Mengeksplorasi patung:** melihat patung → memutar → memilih salah satu bagian → membaca panel proyek HTML → membuka detail melalui tautan yang jelas.
3. **Menggunakan keyboard atau fallback:** melewati navigasi ke konten → membaca hero → memilih proyek melalui kontrol HTML atau daftar karya → membuka detail → menemukan kontak.
4. **Masuk melalui studi kasus:** membuka URL proyek langsung → membaca konteks dan kontribusi → melihat karya lain atau kembali ke daftar → menghubungi pemilik.

Pemilihan bagian patung hanya memilih proyek. Pemilihan tersebut tidak otomatis mengganti route, menggulir halaman, membuka tab, atau mengambil fokus keyboard.

### 5.3 Perilaku navigasi dan riwayat

Navigasi bagian dari halaman detail harus kembali ke bagian beranda yang benar. Browser Back mengembalikan posisi daftar ketika riwayatnya tersedia. Tautan “Kembali ke Proyek” selalu menuju `/#work` sehingga tetap bekerja pada kunjungan langsung.

Setelah perpindahan halaman, perbarui judul dokumen dan pindahkan fokus secara terkelola ke heading utama atau area konten. Scroll ke anchor memperhitungkan tinggi header. Pemilihan proyek di dalam hero tidak membuat entri riwayat baru.

## 6. Sistem visual dan art direction

### 6.1 Pembagian peran visual

| Gaya | Porsi arahan | Penerapan | Batas |
| --- | --- | --- | --- |
| Bauhaus | Sekitar 60% | Grid, alignment, tipografi, asimetri seimbang, lingkaran/persegi/segitiga | Bentuk tidak menghalangi informasi |
| Memphis | Sekitar 25% | Titik, zigzag, potongan geometris, aksen warna pada pembatas dan bingkai tertentu | Pola tidak menjadi tekstur seluruh halaman |
| Kawaii | Sekitar 15% | Sudut lembut selektif, patung yang bersahabat, feedback interaksi | Tidak mengubah UI menjadi aplikasi anak-anak |

Persentase adalah panduan hierarki, bukan target luas piksel atau skor audit.

### 6.2 Token warna awal

| Token | Nilai awal | Penggunaan |
| --- | --- | --- |
| `color.background` | `#F6F1E7` | Latar warm ivory |
| `color.text` | `#242424` | Teks utama dan garis struktural |
| `color.textMuted` | `#59554F` | Metadata dan keterangan yang tetap terbaca |
| `color.cobalt` | `#2146D9` | CTA utama, tautan, bagian patung |
| `color.tomato` | `#D83A2F` | Aksen komposisi dan bagian patung |
| `color.butter` | `#F2D45C` | Bidang sorotan dengan teks charcoal |
| `color.pink` | `#EFBFCB` | Aksen kecil opsional |
| `color.mint` | `#B8D8C7` | Aksen kecil opsional |
| `color.onAccent` | `#FFFFFF` | Teks di bidang gelap yang lolos pemeriksaan kontras |

Gunakan pasangan charcoal–ivory sebagai dasar teks. Warna aksen tidak otomatis aman untuk semua ukuran teks: uji pasangan foreground/background yang benar-benar digunakan, termasuk hover, focus, dan selected. Teks kecil merah di atas ivory tidak menjadi pilihan default.

### 6.3 Tipografi dan ukuran

Gunakan maksimal dua keluarga font: satu display geometris dengan karakter kuat untuk judul, satu sans-serif netral untuk paragraf dan kontrol. Kandidat awal adalah Space Grotesk untuk judul dan Inter untuk teks. Font boleh disesuaikan dalam review visual selama fungsi dan batas dua keluarga tetap dipenuhi.

| Elemen | Ukuran awal | Aturan |
| --- | --- | --- |
| Nama/H1 | Fluid sekitar 40–88 px | Tidak dipaksa satu baris; nama panjang tetap terbaca |
| Judul bagian/H2 | Fluid sekitar 30–48 px | Hierarki tegas, tanpa label pill di atasnya |
| Judul proyek/H3 | Sekitar 24–32 px | Memprioritaskan nama dan konteks karya |
| Body | 16–18 px | Line-height 1,5–1,7; panjang baris sekitar 55–75 karakter |
| Metadata | 14–16 px | Tidak menggunakan opacity rendah sebagai gaya default |
| Tombol dan tautan utama | Minimal 16 px | Label singkat, informatif, dan terbaca |

Ukuran menggunakan unit relatif dan `clamp()` bila relevan. Hindari teks seluruhnya kapital pada paragraf, outline text sebagai informasi utama, atau font dekoratif untuk kontrol.

### 6.4 Grid, ruang, dan bentuk

| Elemen | Ketentuan awal |
| --- | --- |
| Lebar konten | Maksimal sekitar 1.280 px, dengan gutter responsif |
| Grid | Desktop 12 kolom; tablet 8 kolom; mobile 4 kolom |
| Spacing | Skala 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px |
| Gutter | Mobile 20 px; tablet 32 px; desktop 40–64 px sesuai lebar |
| Jarak bagian | Mobile 56–80 px; desktop 96–128 px, disesuaikan kepadatan konten |
| Border | 1–2 px untuk struktur; garis aksen lebih tebal hanya pada elemen terpilih |
| Radius | 0 px untuk bidang editorial; 8–12 px untuk kontrol tertentu; radius besar hanya untuk bentuk yang memang lembut |
| Bayangan | Terutama untuk kedalaman patung; bukan bayangan yang ditempel ke setiap blok konten |

### 6.5 Komposisi halaman

Hero desktop menggunakan pembagian sekitar 5 kolom teks dan 7 kolom visual, dengan alignment yang menghubungkan nama dan patung. Di mobile, urutannya identitas, deskripsi, CTA, patung, dan kontrol proyek. CTA tidak boleh terdorong ke bawah oleh canvas setinggi layar.

Proyek pertama dapat menggunakan media lebih lebar; proyek berikutnya dapat menggunakan susunan media–teks bergantian sesuai rasio aset. Semua tetap mengikuti grid yang sama. Tiga proyek tidak boleh menjadi tiga kartu identik jika komposisi editorial lebih membantu menilai karya.

Batasi pola Memphis pada maksimal dua area aksen utama di beranda sebagai titik awal. Jangan meletakkan pola kontras di belakang paragraf, screenshot, atau kontrol. Jika pola mengalihkan perhatian dari karya, kurangi kepadatannya atau hapus.

## 7. Persyaratan halaman dan konten

### FR-01 — Navigasi

- Wordmark berupa nama pemilik, terhubung ke beranda.
- Tautan menuju Work, About, dan Contact sesuai pemetaan bahasa pada Bagian 5.
- Header boleh sticky jika tidak menutupi heading atau fokus.
- Di mobile, gunakan menu disclosure yang mengembang dalam alur halaman, bukan overlay penuh secara default.
- Tombol menu mempunyai nama “Buka menu”/“Tutup menu”, `aria-expanded`, dan hubungan dengan panelnya.
- Menu dapat dioperasikan dengan Enter/Space; Escape menutup dan mengembalikan fokus ke tombol. Memilih tautan menutup menu dan menuju bagian terkait.
- Item tersembunyi tidak masuk urutan Tab. Perubahan ukuran viewport tidak meninggalkan fokus pada elemen tersembunyi.

**Penerimaan:** semua tujuan navigasi benar dari beranda maupun halaman detail; tidak ada fokus terjebak atau heading tertutup header.

### FR-02 — Hero

- H1 memuat nama; profesi dan deskripsi menjelaskan pekerjaan secara konkret.
- Struktur copy: `[NAMA]` → `[PROFESI]` → `[APA YANG DIKERJAKAN, UNTUK SIAPA, DAN KONTRIBUSINYA]`.
- CTA utama “Lihat Proyek” menuju `/#work`; CTA sekunder “Hubungi Saya” menuju `/#contact`.
- Teks dan CTA dirender sebelum penyelesaian import, inisialisasi, atau render pertama 3D.
- Tidak ada slogan generik, penghitung pengalaman, atau status ketersediaan yang belum diberikan.

**Penerimaan:** memblokir pemuatan modul 3D tidak menghilangkan hero, CTA, atau navigasi.

### FR-03 — Proyek Pilihan

- Mendukung 3–4 entri yang diurutkan pemilik melalui sumber data.
- Setiap entri menampilkan judul, ringkasan masalah, peran, kontribusi utama, dan media besar.
- Tahun, teknologi, serta jenis proyek hanya ditampilkan jika tersedia, sebagai teks biasa.
- Judul dan CTA “Lihat detail [judul proyek]” membuka route yang sama.
- Tautan demo atau repository hanya muncul jika URL tersedia dan relevan.
- Media tidak dicrop hingga menyembunyikan bagian penting. Gunakan `object-fit: contain` jika konteks antarmuka perlu terlihat utuh.
- Tidak menambahkan filter, slider otomatis, pagination, atau carousel untuk jumlah proyek ini.

**Penerimaan:** seluruh entri memiliki detail yang cocok; tidak ada proyek duplikat untuk mengisi layout atau media yang menyamar sebagai bukti palsu.

### FR-04 — Studi kasus

Setiap studi kasus menggunakan struktur yang konsisten, dengan panjang mengikuti materi nyata:

| Bagian | Isi wajib atau aturan |
| --- | --- |
| Pengantar | Judul, ringkasan, media utama, peran; periode dan teknologi jika tersedia |
| Konteks | Latar proyek, pengguna yang dilayani, masalah, tujuan, dan batasan yang diketahui |
| Kontribusi | Pekerjaan yang dilakukan pemilik; bedakan dari pekerjaan tim jika ada |
| Proses | Tahapan yang benar-benar dilakukan, dengan artefak yang tersedia |
| Keputusan | Pilihan desain/teknis utama, alasan, dan kompromi yang diketahui |
| Hasil atau deliverable | Hasil terukur hanya dengan sumber; jika tidak tersedia, jelaskan keluaran yang dapat diperiksa |
| Penutup | Pembelajaran bila diberikan, tautan nyata yang relevan, kembali ke proyek, dan kontak |

Bagian opsional yang tidak memiliki materi dihilangkan pada produksi. Untuk proyek yang belum diluncurkan, tulis status faktual bila diberikan. Jangan menyebut dampak bisnis dari asumsi atau menyamakan prototype dengan produk yang sudah digunakan.

**Penerimaan:** setiap klaim kontribusi atau hasil dapat ditelusuri ke konten yang diberikan pemilik; kunjungan langsung dan reload route tidak gagal.

### FR-05 — Tentang

- Bio singkat menjelaskan bidang, minat profesional, dan pendekatan yang diberikan pemilik.
- Kemampuan dikelompokkan berdasarkan fungsi, misalnya desain antarmuka, pengembangan frontend, atau interaksi 3D, hanya jika memang relevan dengan data pemilik.
- Contoh penerapan lebih diutamakan daripada daftar alat yang panjang.
- Tidak ada progress bar, persentase kemampuan, riwayat kerja, pendidikan, atau penghargaan yang dikarang.

**Penerimaan:** pembaruan bio dan kelompok kemampuan cukup dilakukan pada sumber konten.

### FR-06 — Kontak dan footer

- Email valid tampil sebagai teks yang dapat dipilih dan tautan `mailto:`.
- Tombol “Salin email” menyalin alamat persis seperti yang ditampilkan.
- Feedback “Email disalin.” baru muncul setelah operasi clipboard berhasil; diumumkan melalui `aria-live="polite"` dan kembali ke keadaan awal setelah sekitar tiga detik.
- Jika gagal, tampilkan “Belum berhasil menyalin. Pilih alamat email lalu salin secara manual.” Alamat tetap terlihat dan bisa dipilih.
- Jika email belum tersedia, tampilkan “Email belum ditambahkan.” tanpa `mailto:` atau tombol salin yang tampak aktif.
- Tautan sosial hanya berasal dari data URL yang tersedia. Tautan eksternal baru-tab, jika dipakai, diberi nama yang menjelaskan perilakunya dan proteksi `rel` yang sesuai.
- Footer berisi nama, tahun saat build, dan navigasi ringkas bila membantu. Jangan menambah status kerja yang tidak diberikan.
- Tidak ada formulir pengiriman dalam versi awal.

Clipboard perlu dijalankan sebagai respons aksi pengguna dan ditangani sebagai operasi yang dapat ditolak. `writeText()` mengembalikan Promise dan memerlukan secure context; gunakan HTTPS untuk deployment. [Rujukan: MDN Clipboard.writeText](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText).

**Penerimaan:** salin sukses dan salin gagal memiliki feedback yang benar; membuka `mailto:` tidak pernah diklaim sebagai email sudah terkirim.

## 8. Spesifikasi objek 3D

### FR-07 — Bentuk dan pemetaan proyek

Patung terdiri dari kubus bersudut lembut, bola, cincin, dan bentuk lengkung yang disusun sebagai satu komposisi. Gunakan geometri prosedural, material matte/satin, satu pencahayaan utama, fill sederhana, dan bayangan yang lembut. Kedalaman harus tetap terbaca tanpa bloom, kabut dekoratif, atau post-processing berat.

Ekspresi kecil bersifat opsional. Jika digunakan, cukup satu detail yang menyatu dengan patung dan tidak mengganggu identifikasi bentuk atau proyek.

| Bagian patung | Mapping awal | Ketentuan |
| --- | --- | --- |
| Kubus | Proyek urutan pertama | Dipilih saat halaman pertama dimuat |
| Bola | Proyek urutan kedua | Hanya interaktif jika proyek tersedia |
| Cincin | Proyek urutan ketiga | Hanya interaktif jika proyek tersedia |
| Bentuk lengkung | Proyek urutan keempat | Dekoratif jika tidak ada proyek keempat |

Mapping disimpan berdasarkan ID proyek yang stabil, bukan judul atau indeks array yang tersebar di komponen. Urutan awal di atas adalah konfigurasi awal; perubahan urutan tidak boleh menciptakan referensi proyek yang salah. Bagian dekoratif tidak mendapatkan affordance seolah-olah dapat dipilih.

### FR-08 — Kontrak interaksi

| Aksi | Perilaku yang diharapkan |
| --- | --- |
| Drag dengan mouse/pen | Putar grup patung; yaw bebas, pitch dibatasi sekitar ±30° dari orientasi awal agar komposisi tetap terbaca |
| Swipe horizontal satu jari | Putar patung pada sumbu horizontal/yaw hanya di area canvas |
| Swipe vertikal satu jari | Gulir halaman secara normal, termasuk jika gesture dimulai di atas canvas |
| Pinch | Tetap merupakan zoom browser; tidak mengontrol kamera 3D |
| Wheel/trackpad scroll | Menggulir halaman; tidak melakukan zoom atau memblokir scroll |
| Hover bagian interaktif | Perubahan material singkat; boleh translasi/scale sangat kecil pada mode gerak normal |
| Klik/tap bagian | Pilih proyek terkait; ubah highlight patung dan panel HTML tanpa navigasi otomatis |
| Pilih proyek melalui HTML | Hasil pilihan sama dengan pemilihan mesh, termasuk panel dan highlight saat 3D tersedia |
| “Putar kiri/kanan/atas/bawah” | Langkah 15° melalui tombol HTML; pitch tetap dibatasi |
| “Reset posisi” | Pulihkan orientasi awal dan hapus hover; pertahankan proyek terpilih |
| Klik ruang kosong | Tidak mengganti pilihan dan tidak menavigasi |

**Membedakan drag dan klik:** perpindahan pointer lebih dari 8 CSS px membatalkan kandidat klik. Klik/tap hanya sah jika pointer dilepas pada bagian yang sama, tanpa drag atau `pointercancel`. Setelah drag, pelepasan pointer tidak boleh membuka atau memilih proyek secara tidak sengaja.

Untuk touch, gunakan kebijakan gesture seperti `touch-action: pan-y pinch-zoom` pada permukaan interaksi dan handler horizontal yang sesuai. Jangan memasang kontrol yang menggantinya menjadi `touch-action: none` atau membatalkan semua gesture. Saat browser mengambil alih scroll, tangani `pointercancel` dengan membersihkan state drag. Aturan browser atas `touch-action` juga dipengaruhi elemen ancestor. [Rujukan: MDN touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action).

Parameter 8 px, langkah 15°, dan batas pitch merupakan nilai awal yang boleh disesuaikan berdasarkan pengujian perangkat nyata. Perubahan wajib tetap mempertahankan scroll vertikal dan pemisahan klik–drag.

### FR-09 — Alternatif HTML yang setara

- Di dekat scene, selalu tersedia daftar nama proyek yang dapat dipilih serta tautan detail proyek aktif.
- Gunakan kontrol native, misalnya radio group dengan legend “Pilih proyek”, agar pilihan tunggal dan navigasi keyboard jelas.
- Panel aktif menampilkan judul, ringkasan pendek, peran, dan tautan “Lihat detail [judul]”.
- Canvas tidak menjadi tempat satu-satunya untuk judul, petunjuk, informasi proyek, atau navigasi.
- Tombol rotasi dan reset menggunakan HTML dan tetap dapat dipakai dengan keyboard maupun sentuhan saat scene siap.
- Petunjuk “Geser untuk memutar” berada di HTML. Pada touch, tambahkan penjelasan singkat “Geser ke samping. Gulir ke atas atau bawah untuk membaca.”
- Selection tidak memindahkan fokus. Status pilihan boleh diumumkan secara ringkas; jangan membacakan ulang seluruh studi kasus.
- Tinggi panel tidak berubah mendadak ketika judul lebih panjang; media dan area panel memiliki ruang yang memadai tanpa memotong teks.

Rotasi dan reset disembunyikan saat scene belum siap atau gagal. Daftar pilihan proyek dan tautan detail tetap tersedia pada semua keadaan.

### FR-10 — Lifecycle, loading, dan fallback

| Keadaan | Tampilan | Perilaku |
| --- | --- | --- |
| `poster` | Ilustrasi/poster statis dengan ukuran yang dicadangkan | Konten dan pilihan proyek HTML langsung tersedia |
| `loading` | Poster tetap terlihat, dengan teks pendek bila dibutuhkan | Import 3D berjalan setelah konten utama tampil; tanpa loader layar penuh |
| `ready` | Patung dan kontrol rotasi/reset | Render hanya ketika ada perubahan yang terlihat |
| `paused` | Frame terakhir jika masih terpasang | Tidak menjadwalkan render ketika tab tersembunyi atau scene keluar viewport |
| `fallback` | Poster dan pesan “Tampilan 3D tidak tersedia. Proyek tetap bisa dibuka di bawah.” | Pilihan proyek dan route detail tetap bekerja |

Masuk ke fallback ketika WebGL tidak tersedia, context tidak dapat dibuat, import 3D gagal, atau context hilang. Jika setelah delapan detik render pertama belum siap, tampilkan fallback yang dapat digunakan; jangan memblokir halaman atau memuat ulang otomatis berulang-ulang. Tombol “Coba muat 3D” boleh memulai satu percobaan baru per aktivasi, tanpa duplikasi canvas atau listener.

Hasil percobaan lama yang datang setelah fallback, retry, atau unmount tidak boleh menimpa state terbaru. Pilihan proyek tetap dipertahankan saat loading, pause, atau kegagalan scene. Jika daftar proyek kosong pada pratinjau, tampilkan keadaan kosong yang jelas dan jadikan patung dekoratif.

Fallback merupakan ilustrasi statis ringan yang konsisten dengan patung. Poster dekoratif tidak dibacakan berulang oleh pembaca layar; deskripsi singkat dan kontrol HTML sudah menjelaskan fungsi alternatifnya.

## 9. Motion dan kedalaman

| Interaksi | Mode normal | Reduced motion |
| --- | --- | --- |
| Hover/focus UI | Warna atau border 120–180 ms | Perubahan langsung atau transisi opacity singkat |
| Pergantian panel proyek | Opacity 150–220 ms tanpa slide besar | Perubahan konten langsung |
| Reset patung | Interpolasi maksimal sekitar 300 ms | Langsung ke orientasi awal |
| Drag/swipe patung | Mengikuti input, tanpa spin otomatis setelah dilepas | Tetap langsung mengikuti input; tanpa inertia atau damping |
| Tombol langkah rotasi | Transisi singkat sesuai langkah | Perubahan orientasi langsung |
| Parallax | Maksimal sekitar 8 px pada satu lapisan nonteks, merespons pointer desktop secara terbatas; mati pada profil hemat dan touch | Mati |
| Idle | Patung diam setelah transisi selesai | Diam |

Perubahan preferensi sistem harus diperhatikan tanpa mewajibkan reload. Matikan parallax, entrance movement, inertia, gerak hover, dan smooth scroll saat `prefers-reduced-motion: reduce`. Pertahankan pilihan proyek, tautan, drag langsung, dan kontrol langkah. Preferensi ini menyatakan kebutuhan mengurangi gerak yang tidak esensial. [Rujukan: MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion).

Parallax hanya aktif di area hero yang terlihat, tidak dipasang pada teks atau target klik, dan tidak berjalan sebagai loop ketika pointer diam. Matikan respons parallax selama drag patung agar dua gerakan tidak saling bersaing.

Tidak ada autoplay audio, marquee acak, animasi scroll yang menahan konten, custom cursor global, atau elemen yang terus bergerak. Jangan menyembunyikan teks sampai animasi masuk selesai.

## 10. Model konten dan aturan validasi

### 10.1 Sumber konten terpusat

Gunakan satu export utama, misalnya `src/content/portfolio.ts`, sebagai sumber identitas, copy, urutan proyek, mapping scene, dan kontak. Tipe berada di `src/types/portfolio.ts`. Media disimpan sebagai aset terpisah dan direferensikan oleh konten. Nama file adalah struktur implementasi yang diusulkan, bukan file yang sudah tersedia.

| Entitas | Field utama | Aturan |
| --- | --- | --- |
| `Portfolio` | `mode`, `locale`, `owner`, `projects`, `featuredProjectIds`, `sceneBindings`, `labels`, `seo` | `mode` hanya `preview` atau `production`; locale awal `id` |
| `Owner` | `name`, `profession`, `intro`, `bio`, `approach`, `skillGroups`, `email`, `socialLinks`, `availability` | Email dan availability dapat kosong pada preview; availability kosong tidak dirender |
| `SkillGroup` | `title`, `items` | Berisi kemampuan nyata; tidak ada angka persentase |
| `Project` | `id`, `slug`, `contentState`, `title`, `summary`, `problem`, `role`, `contributions`, `cover`, `caseStudy` | ID dan slug unik; `contentState` berupa `placeholder` atau `verified` |
| `Project` opsional | `year`, `period`, `technologies`, `projectType`, `externalLinks` | Field kosong dihilangkan, bukan diganti fakta rekaan |
| `CaseStudy` | `context`, `process`, `decisions`, `deliverables`, `outcomes`, `lessons`, `gallery` | Material sesuai Bagian 7; outcomes dan lessons boleh kosong |
| `Outcome` | `statement`, `evidenceReference`, `metricContext` | Klaim hasil perlu rujukan; metrik perlu baseline/periode/metode bila relevan |
| `Media` | `src`, `alt`, `width`, `height`, `caption`, `contentState` | Dimensi wajib; caption menjelaskan placeholder bila digunakan |
| `ExternalLink` | `label`, `url`, `kind` | URL absolut yang valid; tidak menerima `#`, `javascript:`, atau domain contoh pada produksi |
| `SceneBinding` | `partId`, `projectId` | Bagian unik dan referensi menuju proyek yang ada |

`evidenceReference` dan informasi pemeriksaan konten dapat berupa catatan editorial lokal; tidak otomatis ditampilkan kepada pengunjung atau dikirim ke layanan eksternal.

### 10.2 Ketentuan integritas

1. `featuredProjectIds` menentukan urutan karya; tidak ada ID ganda atau referensi yang hilang.
2. Setiap proyek pilihan memiliki satu route detail yang sesuai slug.
3. Mapping patung mengacu ke proyek pilihan, maksimal empat bagian interaktif.
4. Mode produksi memerlukan 3–4 proyek terverifikasi, identitas inti, bio, dan email yang valid.
5. Setiap proyek produksi memiliki masalah, peran, kontribusi, cover nyata, konteks, keputusan yang tersedia, serta deliverable. Proses ditulis hanya sejauh yang diketahui.
6. Hasil numerik tidak diwajibkan. Jika diisi, sumber, periode, dan konteks pembandingnya harus memadai.
7. String template inti, ID duplikat, URL placeholder, atau media yang tidak ditemukan menghasilkan error validasi produksi yang menyebut field terkait.
8. Validasi otomatis memeriksa struktur; pemilik meninjau keaslian kontribusi dan klaim. Lolos schema tidak membuktikan sebuah klaim benar.
9. Perubahan nama atau judul yang panjang harus ditangani layout, bukan dipotong diam-diam atau diubah substansinya.

### 10.3 Template konten studi kasus

| Field | Panduan pengisian |
| --- | --- |
| Judul | `[JUDUL PROYEK]` |
| Ringkasan | `[APA YANG DIBUAT DAN UNTUK KEBUTUHAN SIAPA]` |
| Masalah | `[MASALAH YANG BENAR-BENAR DIKERJAKAN]` |
| Peran | `[TANGGUNG JAWAB PEMILIK PORTOFOLIO]` |
| Kontribusi | `[TINDAKAN ATAU BAGIAN YANG DIKERJAKAN SECARA LANGSUNG]` |
| Proses | `[TAHAPAN DAN ARTEFAK YANG TERSEDIA]` |
| Keputusan | `[PILIHAN UTAMA, ALASAN, DAN KOMPROMINYA]` |
| Deliverable | `[HASIL KERJA YANG DAPAT DIPERIKSA]` |
| Outcome opsional | `[HASIL TERVERIFIKASI BESERTA SUMBER DAN KONTEKS]` |
| Media | `[ASET MILIK PEMILIK ATAU ASET YANG IZINNYA SESUAI]` |

## 11. Arsitektur teknis

### 11.1 Stack dan batas tanggung jawab

| Bagian | Pilihan | Ketentuan |
| --- | --- | --- |
| UI | React + TypeScript | Mode TypeScript strict; semantik HTML diprioritaskan |
| Build | Vite | Build produksi statis dan development server terdokumentasi |
| Styling | Tailwind CSS + CSS custom properties | Token terpusat; hindari nilai visual acak di setiap komponen |
| 3D | Three.js melalui React Three Fiber | Dimuat sebagai chunk terpisah dari UI inti |
| Helper 3D | Drei | Import selektif; kontrol harus memenuhi kebijakan gesture produk |
| Transisi | CSS terlebih dahulu; Motion jika diperlukan | Jangan menambah library animasi kedua dengan fungsi tumpang tindih |
| Routing | Router React yang ringan dan kompatibel | Mendukung route proyek, anchor, focus, dan scroll restoration |
| State | State lokal/Context yang terbatas | Tidak memerlukan global store tambahan untuk lingkup awal |
| Konten | Data bertipe dan aset lokal | Tidak membutuhkan API key, backend, atau database |

Pilih versi paket yang saling kompatibel pada awal implementasi; sertakan lockfile dan versi runtime yang diuji. Jangan mengandalkan perintah instalasi “latest” sebagai dokumentasi reproduksi. Jika repository sudah ada, manfaatkan router, styling, dan tooling yang telah digunakan selama kebutuhan dapat dipenuhi.

### 11.2 Modul dan kontrak

| Modul | Tanggung jawab | Input atau state penting |
| --- | --- | --- |
| `AppShell` | Route, header, footer, skip link, fokus halaman | Konfigurasi konten dan lokasi route |
| `SiteHeader` / `MobileNav` | Navigasi desktop/mobile | Label, href, state menu terbuka |
| `Hero` | Identitas, CTA, koordinasi panel dan scene | Owner dan proyek pilihan |
| `SceneBoundary` | Lazy import, error boundary, timeout, retry, poster | Status loading/fallback dan lifecycle |
| `PortfolioScene` | Kamera, cahaya, rendering, kontrol gestur | `selectedProjectId`, binding, status aktif, reduced motion |
| `ModularSculpture` | Geometri dan material, hit testing bagian | Binding bagian dan callback selection |
| `SceneControls` | Radio proyek, tombol rotasi, reset | Pilihan, ketersediaan scene, callback aksi |
| `SelectedProjectPanel` | Informasi HTML proyek aktif | Objek proyek terpilih |
| `WorkSection` / `ProjectPreview` | Presentasi karya dan media | Daftar proyek sesuai urutan |
| `ProjectDetailPage` | Studi kasus, metadata, navigasi kembali | Project hasil resolusi slug |
| `AboutSection` | Bio, pendekatan, kelompok kemampuan | Owner |
| `ContactSection` / `CopyEmailButton` | Kontak dan feedback clipboard | Email valid dan status penyalinan |
| Hooks/utilitas | Reduced motion, visibility, validasi konten | API browser dan konfigurasi |

### 11.3 State dan lifecycle

`selectedProjectId` mempunyai satu sumber kebenaran di lapisan Hero. Pilihan HTML dan mesh memanggil perubahan state yang sama; panel dan material membaca state tersebut. Perubahan orientasi per frame menggunakan ref/objek Three, bukan React `setState` untuk setiap gerakan pointer.

State orientasi, hover, loading, dan clipboard tidak dicampurkan. Hover tidak mengganti proyek. Reset posisi tidak menghapus pilihan. Pilihan dan orientasi boleh bertahan selama navigasi dalam sesi aplikasi; reload memulai dari proyek pertama dan orientasi awal. Tidak diperlukan localStorage untuk state ini.

Komponen scene harus membersihkan event listener, pointer capture, observer, timer, dan resource GPU saat tidak lagi diperlukan. Tangani mount/unmount berulang tanpa canvas atau listener ganda. Error scene ditangkap di batas scene agar tidak merusak shell halaman.

### 11.4 Routing, metadata, dan deployment

- Setiap halaman memiliki title dan description yang spesifik serta satu H1.
- Metadata dasar beranda tersedia pada HTML awal. Setelah navigasi client-side, metadata mengikuti proyek yang dibuka.
- Domain canonical, gambar Open Graph, favicon, dan profil sosial hanya berasal dari konfigurasi yang valid. Preview memakai `noindex` agar placeholder tidak diperlakukan sebagai konten final.
- Hosting perlu rewrite route aplikasi ke entry HTML tanpa menangkap permintaan aset yang tidak ada. Uji URL detail langsung pada lingkungan hosting yang dituju.
- Halaman tidak dikenal menampilkan 404 aplikasi. Jika host dapat mengirim status HTTP 404 yang tepat, konfigurasikan; bila tidak, catat keterbatasannya.
- Prerender route studi kasus adalah P1 untuk metadata dan HTML awal per proyek. Sampai tersedia, preview sosial per proyek dapat memakai metadata beranda; jangan mengklaim bahwa crawler pasti mengeksekusi pembaruan metadata client-side.
- Deployment menggunakan HTTPS. Tidak ada kebutuhan layanan rahasia di frontend untuk fitur inti.

## 12. Performa dan ketahanan

### 12.1 Kebutuhan wajib

1. Render teks dan navigasi tanpa menunggu scene. Boundary loading 3D hanya membungkus area scene.
2. Lazy-load import 3D setelah konten awal terpasang dan area scene mendekati viewport. Pada mode hemat data yang dapat dideteksi, poster dan tombol pemuatan manual boleh digunakan.
3. Cadangkan dimensi poster, canvas, dan semua gambar untuk menghindari layout bergeser.
4. Gunakan ukuran gambar responsif serta WebP/AVIF dengan fallback yang sesuai. Gambar di bawah fold memakai lazy loading; jangan menunda aset yang menjadi LCP.
5. Render scene sesuai kebutuhan. Hentikan jadwal frame setelah interaksi/transisi selesai, saat scene tidak terlihat, dan saat tab tersembunyi.
6. Batasi DPR awal maksimal 1,5 pada profil normal dan 1 pada profil hemat. Jangan menggunakan DPR perangkat tanpa batas.
7. Gunakan geometri dan material bersama bila sesuai. Hindari environment map eksternal, texture besar, realtime reflection, dan post-processing yang tidak diperlukan.
8. Jika performa rendah, turunkan kualitas bayangan, DPR, dan detail geometri sebelum mengurangi fungsi HTML.
9. Jangan mengubah selected project, memaksa reload, atau memunculkan loader seluruh halaman saat kualitas render berubah.

### 12.2 Anggaran awal yang harus diukur

| Metrik | Target awal | Cara menilai |
| --- | --- | --- |
| JavaScript UI awal | ≤200 KiB gzip | Build produksi; jumlah aset JS yang diperlukan sebelum 3D |
| JavaScript 3D tertunda | ≤450 KiB gzip tambahan | Jumlah chunk yang khusus diperlukan setelah 3D dimuat |
| CSS awal | ≤40 KiB gzip | Output build produksi |
| Font total | ≤160 KiB transfer | WOFF2 self-hosted, subset/weight yang digunakan |
| Poster scene | ≤80 KiB | Aset final yang benar-benar dikirim |
| Gambar preview proyek | ≤300 KiB per varian yang dikirim | Network panel pada breakpoint yang diuji |
| Geometri scene | ≤50.000 triangle; ≤60 draw call per frame | Statistik renderer pada profil normal, termasuk biaya pass yang relevan |
| Respons selection HTML | Perubahan visual mulai ≤100 ms setelah aksi | Trace lokal; tidak menunggu animasi selesai |
| Kelancaran saat drag | Target 60 fps desktop, minimal stabil sekitar 30 fps pada mobile uji | Rekaman pada perangkat dan browser yang disebutkan |
| Scene diam/offscreen | Tidak ada frame scene terjadwal setelah transisi selesai, maksimal satu detik | Instrumentasi selama sepuluh detik pengamatan |

Budget ini adalah batas kerja awal, bukan benchmark yang sudah dicapai. Bila implementasi menunjukkan kebutuhan berbeda, sertakan ukuran aktual, penyebab, tindakan optimasi, dan dampaknya sebelum mengusulkan revisi anggaran. Dilarang menyatakan target performa tercapai berdasarkan desktop kelas tinggi saja.

### 12.3 Core Web Vitals

Target pengalaman lapangan adalah LCP ≤2,5 detik, INP ≤200 ms, dan CLS ≤0,1 pada persentil ke-75, dipisahkan untuk mobile dan desktop. Ini mengikuti ambang pengalaman baik Core Web Vitals. [Rujukan: web.dev Web Vitals](https://web.dev/articles/vitals).

Sebelum publikasi, gunakan median tiga pengukuran cold-load pada build produksi dengan perangkat, konfigurasi throttling, dan versi alat yang dicatat. LCP dan CLS lokal menjadi pemeriksaan awal; hasil Lighthouse bukan bukti bahwa INP atau persentil pengguna nyata sudah memenuhi target. Laporan harus memisahkan pengukuran laboratorium, pengamatan perangkat nyata, dan data lapangan yang mungkin belum tersedia.

## 13. Aksesibilitas, responsivitas, dan kompatibilitas

### 13.1 Persyaratan aksesibilitas

Target implementasi adalah WCAG 2.2 tingkat AA untuk bagian yang relevan, dengan review manual atas alur utama. Ini bukan klaim sertifikasi.

- Gunakan landmark header, nav, main, section, dan footer; satu H1 per halaman, lalu heading berurutan.
- Sediakan skip link “Lewati ke konten” dan fokus keyboard yang terlihat, termasuk di atas warna aksen.
- Gunakan tombol untuk aksi dan tautan untuk navigasi. Jangan memakai div klik sebagai kontrol utama.
- Semua informasi dan pilihan proyek dapat diakses tanpa canvas. Canvas tidak masuk urutan Tab jika kontrol HTML sudah menyediakan seluruh aksi.
- Jangan bergantung pada warna, hover, suara, atau gestur presisi untuk menyampaikan status pilihan.
- Gambar informatif memiliki alt yang menjelaskan isi; pola dekoratif diabaikan pembaca layar.
- Uji teks, heading, menu, dan kontrol pada zoom 200%; pada pembesaran/reflow yang menghasilkan lebar sekitar 320 CSS px, konten utama tetap terbaca.
- Pesan clipboard dan pilihan proyek memakai live region yang ringkas, tanpa mengulang pengumuman pada setiap frame.

Kontras teks normal minimal 4,5:1; teks besar minimal 3:1 sesuai definisi WCAG. [Rujukan: W3C Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Untuk produk ini, tetapkan juga target kontras minimal 3:1 terhadap warna sekitar pada indikator fokus, batas kontrol yang diperlukan untuk mengenalinya, dan indikator pilihan; gunakan bentuk atau teks sebagai penanda tambahan.

Tetapkan hit area minimal 44 × 44 CSS px untuk tombol dan navigasi utama sebagai standar kenyamanan produk. Nilai ini lebih besar dari ukuran minimum 24 × 24 CSS px pada kriteria WCAG 2.2 AA Target Size, yang memiliki pengecualian tertentu. Tautan inline dalam paragraf mengikuti kebutuhan keterbacaan dan aturan yang relevan. [Rujukan: W3C Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).

### 13.2 Layout responsif

| Rentang uji | Komposisi | Pemeriksaan khusus |
| --- | --- | --- |
| 320–639 CSS px | Satu kolom, CTA terlihat sebelum scene, media selebar konten | Tidak ada horizontal overflow; menu, email panjang, dan kontrol mudah disentuh |
| 640–1.023 CSS px | Susunan adaptif; dua kolom hanya jika teks tetap cukup lebar | Tablet portrait/landscape dan perubahan orientasi |
| ≥1.024 CSS px | Hero asimetris, grid 12 kolom, proyek editorial | Jarak baca, skala patung, dan alignment antarseksi |
| ≥1.600 CSS px | Lebar konten dibatasi | Judul dan media tidak membesar tanpa kendali |

Breakpoint adalah titik awal, bukan alasan memotong konten. Gunakan wrapping untuk email/URL panjang, jangan memasang lebar canvas yang melebihi container, dan jangan memakai `overflow-x: hidden` pada body untuk menyembunyikan cacat layout.

### 13.3 Matriks browser

Target browser adalah dua rilis mayor stabil terakhir Chrome, Edge, Firefox, dan Safari yang tersedia saat QA, ditambah Safari iOS serta Chrome Android pada perangkat uji nyata. Catat versi konkret dalam laporan; jangan hanya menulis “semua browser”.

Perangkat tanpa WebGL tetap harus mendukung alur HTML. Ketika Clipboard API tidak tersedia atau ditolak, salin manual tetap memungkinkan. Dukungan penuh untuk JavaScript yang dinonaktifkan bukan P0; sediakan pesan `noscript` yang jelas dan jangan mengklaim seluruh interaksi bekerja tanpa JavaScript.

## 14. Keadaan gagal dan kasus tepi

| Kondisi | Respons yang diwajibkan |
| --- | --- |
| Chunk 3D gagal dimuat | Poster dan proyek HTML tetap tampil; retry eksplisit dapat dilakukan |
| WebGL/context gagal atau hilang | Scene beralih ke fallback tanpa merusak navigasi atau pilihan proyek |
| Tab disembunyikan atau scene keluar viewport | Jadwal frame dihentikan; kembali aktif tanpa reset selection |
| Pointer dibatalkan saat scroll | State drag bersih; tidak ada klik susulan |
| Klik cepat beberapa proyek | Pilihan terakhir menjadi state final; tidak ada panel dan mesh yang berbeda |
| Judul/nama/email sangat panjang | Wrap secara wajar; tidak overlap, keluar viewport, atau menghilangkan isi penting |
| Media gagal | Placeholder berukuran sama dengan keterangan; detail teks tetap terbaca |
| Slug tidak ditemukan | Halaman tidak ditemukan dengan tautan kembali |
| Email kosong | Pesan faktual; tidak ada tombol salin atau mailto palsu |
| Clipboard ditolak | Pesan gagal dan instruksi salin manual; tidak menampilkan sukses |
| Tautan sosial/demo kosong | Elemen tautan dihilangkan |
| Hasil proyek belum diukur | Tampilkan deliverable dan status faktual, tanpa angka rekaan |
| Proyek keempat tidak ada | Bentuk lengkung tetap dekoratif; tidak menunjuk ke route kosong |
| Data proyek dihapus atau ID salah | Validasi produksi gagal dengan lokasi field; preview menampilkan keadaan yang jelas |
| Reduced motion berubah saat interaksi | Hentikan interpolasi/gerak tambahan, pertahankan state dan fungsi |
| Tombol Back setelah studi kasus | Kembali ke konteks daftar bila tersedia; kunjungan langsung tetap mempunyai jalur kembali |

## 15. Aturan keras anti-AI-slop dan kejujuran konten

Aturan ini adalah kriteria review produk, bukan sekadar preferensi dekorasi.

| Dilarang | Pengganti yang diperbolehkan |
| --- | --- |
| Badge “Premium Experience”, “100% Creative”, “Verified Expert”, “Next-Gen Portfolio” | Informasi faktual tentang pekerjaan, peran, atau proyek |
| Badge “Available for work” tanpa data | Hilangkan status; tampilkan hanya jika diberikan dan masih aktual |
| Logo klien, testimoni, penghargaan, rating bintang, dan statistik palsu | Bukti proyek atau informasi yang diberikan pemilik |
| Persentase skill seperti “React 98%” | Kelompok kemampuan dan contoh penerapannya |
| Label pill di atas setiap judul | Heading yang jelas dengan ruang dan hierarki |
| Hero terpusat generik, deretan logo, lalu kartu seragam | Komposisi editorial asimetris dengan media proyek yang diprioritaskan |
| Semua konten dalam rounded card/bento | Section terbuka, garis pemisah, dan container sesuai fungsi |
| Gradient ungu-biru, glassmorphism, glow, blur default | Warna solid, struktur, bayangan dan pencahayaan yang punya tujuan |
| Emoji menggantikan ikon navigasi | Ikon SVG konsisten dengan label yang dapat diakses |
| “Crafting Digital Experiences” atau “Turning Ideas Into Reality” | Deskripsi konkret profesi, jenis pekerjaan, dan kontribusi |
| Marquee acak, loader panjang, custom cursor mengganggu | Navigasi langsung dan feedback pendek terhadap aksi |
| Tombol, tautan, atau formulir semu | Aksi nyata dengan keadaan sukses/gagal, atau teks keterangan bila data belum ada |

Dekorasi harus dapat dijelaskan melalui komposisi atau identitas visual. Metadata berguna seperti tahun, peran, teknologi, dan jenis proyek boleh tampil sebagai teks sederhana. Jika sebuah elemen tidak membantu informasi, navigasi, interaksi, atau komposisi yang disengaja, hapus.

## 16. Rencana verifikasi dan kriteria penerimaan

Semua skenario berikut adalah pengujian yang harus dilakukan saat implementasi. **Belum ada hasil pengujian website dalam dokumen ini.**

### 16.1 Skenario penerimaan utama

| ID | Kondisi dan tindakan | Hasil yang diwajibkan | Cakupan |
| --- | --- | --- | --- |
| AC-01 | Modul 3D diperlambat atau diblokir; buka beranda | Identitas, navigasi, CTA, dan proyek HTML bisa digunakan | FR-01, FR-02, FR-10 |
| AC-02 | Aktifkan seluruh menu dan CTA dari beranda/detail | Route/anchor benar dan heading tidak tertutup | FR-01–FR-04 |
| AC-03 | Buka dan reload setiap URL proyek langsung; gunakan Back | Studi kasus cocok dan navigasi kembali benar | FR-04, routing |
| AC-04 | Gunakan Tab, Shift+Tab, Enter, Space, Escape pada menu mobile | Fokus jelas, tidak terjebak, panel tersembunyi tidak menerima fokus | FR-01 |
| AC-05 | Drag patung melewati ambang gerak lalu lepaskan di atas mesh | Patung berputar tanpa memilih proyek secara tidak sengaja | FR-08 |
| AC-06 | Tap/klik setiap bagian yang terikat proyek | Panel HTML dan highlight memilih proyek yang sama; route tidak berubah | FR-07–FR-09 |
| AC-07 | Pilih semua proyek dengan kontrol HTML | Pilihan sinkron; semua detail dapat dibuka tanpa canvas | FR-09 |
| AC-08 | Ubah orientasi dan selection, lalu reset | Orientasi awal pulih; selection tetap | FR-08 |
| AC-09 | Swipe vertikal, horizontal, pinch, dan batalkan gesture di mobile nyata | Scroll vertikal dan zoom browser terjaga; horizontal memutar; tidak ada klik susulan | FR-08 |
| AC-10 | Uji parallax normal, lalu aktifkan reduced motion sebelum load dan saat aplikasi berjalan | Parallax terbatas merespons pointer hanya pada profil normal; mode reduce menghapus gerak tambahan tanpa menghilangkan fungsi | Bagian 9 |
| AC-11 | Simulasikan WebGL tidak tersedia, context loss, timeout, dan retry | Fallback stabil; retry tidak menggandakan scene atau merusak selection | FR-10 |
| AC-12 | Tinggalkan scene dan sembunyikan tab; kembali | Tidak ada jadwal render berkelanjutan; state pulih dengan benar | Bagian 12 |
| AC-13 | Salin email pada HTTPS, kemudian simulasikan penolakan clipboard | Sukses hanya setelah operasi berhasil; kegagalan menunjukkan salin manual | FR-06 |
| AC-14 | Gunakan data tanpa email/sosial/demo | Tidak ada tautan atau tombol semu | FR-06, model konten |
| AC-15 | Uji viewport 320, 390, 768, 1.024, dan 1.440 px, zoom serta teks panjang | Tidak overflow/overlap; urutan baca dan kontrol tetap jelas | Bagian 6, 13 |
| AC-16 | Gunakan screen reader pada navigasi, pilihan proyek, detail, dan kontak | Heading/label/status bermakna; informasi tidak bergantung pada canvas | Bagian 13 |
| AC-17 | Ubah satu entry konten dan urutan proyek | Daftar, route, panel HTML, serta mapping tetap konsisten | G-06, Bagian 10 |
| AC-18 | Jalankan validasi produksi dengan placeholder atau referensi salah | Gagal dengan pesan field; tidak meloloskan konten contoh sebagai portofolio final | Bagian 3, 10 |
| AC-19 | Periksa build, console, network, dan aset gagal | Tidak ada error runtime tak tertangani, aset wajib hilang, atau link internal mati | Bagian 11, 14 |
| AC-20 | Audit semua copy dan elemen visual | Tidak ada klaim palsu, badge terlarang, atau dekorasi yang menutupi karya | Bagian 15 |
| AC-21 | Ukur bundle, scene, loading, dan interaksi pada profil yang dicatat | Hasil dibandingkan dengan budget; kekurangan dan tindakan dicatat | Bagian 12 |
| AC-22 | Buka slug tidak valid dan gambar yang dibuat gagal | Halaman error/media fallback jelas; alur inti tetap dapat digunakan | Bagian 14 |

### 16.2 Pendekatan pengujian

- **Otomatis:** validasi data dan mapping, smoke route/navigasi, sinkronisasi pilihan, reset, serta clipboard sukses/gagal. Gunakan test yang memeriksa perilaku penting, bukan snapshot seluruh markup.
- **Browser end-to-end:** uji alur beranda → detail → kontak, menu mobile, direct URL, dan fallback. Gunakan tool yang tersedia di repository, misalnya Playwright bila belum ada standar.
- **Manual:** komposisi visual, kualitas media, touch pada perangkat nyata, keyboard, screen reader, reduced motion, dan kualitas 3D.
- **Performa:** build produksi, ukuran transfer, trace interaksi, instrumentasi render, dan rekaman pada perangkat yang disebutkan.
- **Aksesibilitas otomatis:** gunakan audit seperti axe untuk menemukan masalah yang terdeteksi mesin; hasil nol temuan tidak menggantikan pengujian manual.

Emulasi touch desktop tidak menggantikan pengujian scrolling dan pointer cancellation pada ponsel. Pengujian headless yang hanya menjalankan fallback tidak membuktikan render atau interaksi WebGL berfungsi.

### 16.3 Pelaporan hasil

| Field laporan | Isi yang harus dicatat |
| --- | --- |
| Build | Commit/version yang diuji dan tanggal |
| Lingkungan | Browser, versi, OS, perangkat, viewport, jaringan/throttling |
| Skenario | ID acceptance criterion |
| Status | `Lulus`, `Gagal`, `Belum diuji`, atau `Terblokir` |
| Bukti | Log, screenshot, trace, atau rekaman yang relevan |
| Temuan | Perilaku aktual, dampak, langkah reproduksi |
| Tindak lanjut | Perbaikan atau keterbatasan yang masih terbuka |

Jangan menulis “semua pengujian lulus” jika sebagian skenario belum dijalankan. Bedakan hasil pengujian nyata dari target PRD dan asumsi kompatibilitas.

## 17. Tahapan implementasi dan hasil tiap tahap

| Tahap | Pekerjaan | Syarat keluar |
| --- | --- | --- |
| 1. Fondasi | Audit repository bila ada; setup stack; token; model konten; route; preview data yang ditandai | Aplikasi berjalan, konten terpusat, route dasar dapat dibuka |
| 2. Portofolio HTML | Header, hero, karya, detail, about, kontak, mobile | Alur inti dapat digunakan dengan keyboard tanpa 3D |
| 3. Patung interaktif | Geometri, pencahayaan, mapping, drag/tap, kontrol HTML, reset | Selection sinkron; gesture mobile benar; satu interaksi utama matang |
| 4. Ketahanan | Lazy loading, fallback, timeout, reduced motion, pause render, asset optimization | Kegagalan 3D tidak merusak alur; budget diukur |
| 5. Penyempurnaan | Review editorial, media, typography, spacing, micro-interaction; P1 jika memenuhi budget | Karya lebih dominan daripada dekorasi; responsivitas terjaga |
| 6. Penerimaan | Jalankan matriks QA, review konten, dokumentasi dan build akhir | Status tiap syarat tercatat; source dan instruksi dapat direproduksi |

Tahapan diurutkan berdasarkan dependensi, bukan estimasi kalender. Durasi ditentukan setelah ukuran konten, aset, kondisi repository, dan kapasitas pelaksana diketahui.

## 18. Risiko dan mitigasi

| Risiko | Dampak | Penanganan |
| --- | --- | --- |
| Data proyek belum tersedia | Portofolio tidak dapat dinilai sebagai karya nyata | Gunakan preview yang jelas; kumpulkan materi sebelum publikasi |
| Tiga gaya saling bersaing | Identitas visual terasa ramai | Bauhaus memegang struktur; batasi Memphis dan Kawaii sesuai peran |
| Gesture 3D mengambil alih scroll | Mobile sulit digunakan | Kebijakan pan-y, handler horizontal, kontrol HTML, uji perangkat nyata |
| Bundle/GPU terlalu berat | Loading dan interaksi lambat | Lazy-load, geometri prosedural, render sesuai kebutuhan, DPR/bayangan adaptif |
| Fallback dianggap kegagalan seluruh situs | Pengunjung meninggalkan karya | Pertahankan semua informasi, selection, route, dan kontak dalam HTML |
| Kontrol mesh berbeda dari daftar HTML | Selection membingungkan | Satu sumber state dan mapping ID tervalidasi |
| Metadata client-side tidak terbaca crawler tertentu | Preview berbagi per proyek kurang tepat | Dokumentasikan batas P0; gunakan prerender P1 bila diperlukan |
| Pengujian hanya desktop/headless | Masalah sentuhan dan WebGL terlewat | Catat perangkat nyata dan status pengujian yang belum tersedia |

## 19. Deliverable dan Definition of Done

### 19.1 Deliverable implementasi

| Deliverable | Isi minimum |
| --- | --- |
| Source lengkap | Seluruh komponen, konten, tipe, styles, route, scene, dan utilitas; tidak ada bagian inti yang dibiarkan sebagai pseudocode |
| Dependensi | `package.json`, satu lockfile, versi Node/package manager yang diuji |
| Aset | Media proyek yang disediakan, poster fallback, ikon, font jika self-hosted, serta catatan izin/lisensi yang relevan |
| README | Instalasi, menjalankan dev server, build/preview, struktur modul, mengganti konten, mode preview/production, konfigurasi hosting |
| Pemeriksaan | Script lint, typecheck, validasi konten, serta pengujian perilaku penting yang benar-benar tersedia |
| Laporan QA | Hasil berdasarkan Bagian 16, bukti, perangkat, dan keterbatasan tersisa |
| Build | Output build produksi yang berhasil dibuat dari source dan lockfile |

README untuk repository baru harus menyediakan perintah yang benar-benar bekerja, misalnya `npm ci`, `npm run dev`, `npm run build`, dan `npm run preview`, beserta perintah pemeriksaan yang memang didefinisikan. Sesuaikan bila repository menggunakan package manager lain.

### 19.2 Selesai secara teknis

- [ ] Semua fitur P0 diimplementasikan dan dapat digunakan; placeholder yang diizinkan tetap ditandai dalam preview.
- [ ] Navigasi, detail proyek, selection 3D/HTML, reset, dan kontak yang dikonfigurasi bekerja.
- [ ] Keyboard, reduced motion, fallback, dan kegagalan clipboard ditangani.
- [ ] Gesture mobile tidak menghalangi scroll atau zoom browser.
- [ ] Tidak ada error runtime tak tertangani, overflow utama, link internal mati, atau kontrol semu.
- [ ] Budget dan hasil pengujian dicatat secara faktual; syarat P0 yang belum diuji tetap terbuka.
- [ ] Source, lockfile, aset, build, README, dan laporan QA tersedia.

### 19.3 Siap dipublikasikan sebagai portofolio pemilik

- [ ] Nama, profesi, bio, dan email diberikan serta diperiksa oleh pemilik.
- [ ] Tersedia 3–4 proyek nyata sesuai target, dengan media, kontribusi, dan deliverable yang dapat diperiksa.
- [ ] Tidak ada placeholder, klaim tanpa dasar, status kerja rekaan, atau URL contoh dalam konten produksi.
- [ ] Seluruh syarat penerimaan P0 lulus pada cakupan uji yang dinyatakan; gap belum diuji tidak dianggap lulus.
- [ ] HTTPS, direct route, metadata dasar, aset, dan tautan diuji pada lingkungan publikasi yang dipilih.
- [ ] Setiap perubahan lingkup atau anggaran dicatat, termasuk alasan dan konsekuensinya.

Selesai secara teknis pada mode preview tidak sama dengan konten siap dipublikasikan. PRD ini tidak menyatakan website sudah dibangun, diuji, atau dideploy.

### 19.4 Pemetaan brief ke persyaratan

| Bagian brief asli | Spesifikasi dalam PRD | Verifikasi utama |
| --- | --- | --- |
| 1. Konteks portofolio | Bagian 2, 3, dan 10 | AC-14, AC-17, AC-18, AC-20 |
| 2. Arah visual tiga gaya | Bagian 6 dan 9 | AC-10, AC-15, AC-20 |
| 3. Aturan anti-AI-slop | Bagian 15 dan validasi konten Bagian 10 | AC-14, AC-18, AC-20 |
| 4. Struktur halaman | Bagian 5 dan FR-01–FR-06 | AC-01–AC-04, AC-13, AC-14, AC-22 |
| 5. 3D dan interaksi immersive | FR-07–FR-10 serta Bagian 9 | AC-05–AC-12 |
| 6. Implementasi teknis | Bagian 10, 11, dan 17 | AC-03, AC-17–AC-19 |
| 7. Performa dan aksesibilitas | Bagian 12–14 | AC-09–AC-12, AC-15, AC-16, AC-21 |
| 8. Hasil dan verifikasi | Bagian 16 serta 19 | Seluruh skenario P0 dan kelengkapan deliverable |

## 20. Panduan serah terima kepada pelaksana

Mulai dengan ringkasan konsep visual dan asumsi yang digunakan. Periksa repository yang tersedia, kemudian kerjakan tahapan Bagian 17. Gunakan placeholder sesuai aturan bila informasi belum tersedia; pertanyaan hanya diperlukan jika jawabannya mengubah arah desain atau fungsi utama.

Pertahankan semua aturan kejujuran konten dan anti-AI-slop sepanjang implementasi. Saat perlu memilih, utamakan komposisi, keterbacaan, kualitas studi kasus, aksesibilitas, dan satu interaksi 3D yang dipoles dengan baik. Serahkan implementasi lengkap beserta pengujian yang benar-benar dilakukan dan keterbatasan yang tersisa.
