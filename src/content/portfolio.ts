import type { Portfolio } from '../types/portfolio';

export const portfolioContent: Portfolio = {
  mode: 'preview',
  locale: 'id',
  owner: {
    name: '[NAMA]',
    profession: '[PROFESI / BIDANG KEAHLIAN]',
    intro: '[JENIS PEKERJAAN, UNTUK SIAPA, DAN KONTRIBUSI UTAMA] — Konten contoh untuk pratinjau; ganti sebelum publikasi.',
    bio: '[BIO SINGKAT] Praktisi desain produk digital dan creative technologist yang berfokus pada kejelasan informasi, arsitektur grid yang kokoh, dan interaksi web modern.',
    approach: '[PENDEKATAN BEKERJA] Menggabungkan ketegasan hierarki Bauhaus, energi aksen Memphis terukur, dan kehangatan Kawaii yang ramah pengguna. Mengutamakan performa tanpa mengorbankan identitas visual.',
    skillGroups: [
      {
        title: 'Desain Sistem & Antarmuka',
        items: ['Arsitektur Token Desain', 'Tata Letak Grid & Tipografi', 'Aksesibilitas WCAG 2.2 AA', 'Design Tokens & UI Kit'],
      },
      {
        title: 'Frontend Engineering',
        items: ['React & TypeScript Modern', 'Vite & Tailored Chunking', 'Tailwind CSS & Custom Properties', 'Pengujian Otomatis (Vitest)'],
      },
      {
        title: 'Interaksi & Creative Tech',
        items: ['Three.js & React Three Fiber', 'Shaders & Geometri Prosedural', 'Gesture Handling Berkinerja Tinggi', 'Animasi Berorientasi Reduced-Motion'],
      },
    ],
    email: '',
    socialLinks: [
      { label: 'GitHub', url: 'https://github.com', kind: 'social' },
      { label: 'LinkedIn', url: 'https://linkedin.com', kind: 'social' },
    ],
  },
  featuredProjectIds: ['project-01', 'project-02', 'project-03'],
  sceneBindings: [
    { partId: 'part-cube', projectId: 'project-01' },
    { partId: 'part-sphere', projectId: 'project-02' },
    { partId: 'part-ring', projectId: 'project-03' },
    { partId: 'part-arc', projectId: 'project-04' },
  ],
  labels: {
    navWork: 'Proyek',
    navAbout: 'Tentang',
    navContact: 'Kontak',
    ctaViewWork: 'Lihat Proyek',
    ctaContactMe: 'Hubungi Saya',
    copyEmailSuccess: 'Email disalin.',
    copyEmailFailed: 'Belum berhasil menyalin. Pilih alamat email lalu salin secara manual.',
    fallback3DTitle: 'Tampilan 3D tidak tersedia',
    fallback3DDesc: 'Proyek tetap bisa dibuka dan dijelajahi secara lengkap melalui daftar di bawah.',
    retry3DButton: 'Coba muat 3D',
    rotateHint: 'Geser untuk memutar patung',
    rotateHintTouch: 'Geser ke samping untuk memutar. Gulir ke atas atau bawah untuk membaca.',
  },
  seo: {
    title: '[NAMA] — Portofolio Desain & Frontend',
    description: 'Portofolio profesional interaktif berfondasi Bauhaus, beraksen Memphis, dan bersentuhan Kawaii.',
  },
  projects: [
    {
      id: 'project-01',
      slug: 'sistem-antarmuka-finansial-modular',
      contentState: 'placeholder',
      title: '[JUDUL PROYEK 01] Sistem Antarmuka Finansial Modular',
      summary: 'Desain dan implementasi sistem dashboard finansial terdesentralisasi dengan navigasi data berkecepatan tinggi.',
      problem: 'Pengguna korporat kesulitan memindai anomali transaksi volume tinggi karena kepadatan visual yang tidak terstruktur.',
      role: 'Lead Frontend Engineer & Design System Specialist',
      contributions: [
        'Merancang sistem token multi-brand dan komponen kartu transaksi asimetris berstandar WCAG AA.',
        'Mengimplementasikan virtualized list untuk rendering tabel 50.000 baris dengan responsivitas <16ms.',
        'Membangun modul validasi data transaksi client-side.',
      ],
      cover: {
        src: '/projects/project-01.svg',
        alt: 'Pratinjau proyek belum ditambahkan — Mockup interface sistem finansial',
        width: 1200,
        height: 800,
        caption: 'Pratinjau proyek belum ditambahkan; konten contoh untuk pengujian alur antarmuka.',
        contentState: 'placeholder',
      },
      year: '2025',
      period: 'Januari — Juni 2025',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web Workers'],
      projectType: 'Web Application & Design System',
      externalLinks: [
        { label: 'Demo Prototipe', url: 'https://example.com/demo-01', kind: 'demo' },
        { label: 'Repositori Komponen', url: 'https://github.com/example/design-system', kind: 'repository' },
      ],
      caseStudy: {
        context: 'Proyek ini ditujukan untuk lembaga audit keuangan yang membutuhkan pemindaian buku besar multi-mata uang secara real-time dengan latensi rendah.',
        contributions: [
          'Memimpin arsitektur antarmuka dan standardisasi CSS variables.',
          'Menerapkan audit kontras otomatis pada setiap status transaksi.',
        ],
        process: [
          'Audit alur navigasi operator eksisting dan pemetaan titik kemacetan membaca data.',
          'Penyusunan wireframe 12 kolom modular dengan pemisahan warna tegas.',
          'Iterasi prototipe interaktif dan pengujian keyboard navigation.',
        ],
        decisions: [
          {
            decision: 'Menggunakan rendering tabel berbasis CSS Grid murni dibanding canvas.',
            rationale: 'Menjamin keterbacaan screen reader dan kemudahan salin-tempel teks secara native.',
            tradeoff: 'Membutuhkan virtual scrolling untuk mengelola beban DOM pada data ekstrem.',
          },
          {
            decision: 'Membatasi palet visual status pada 3 warna primer kontras tinggi.',
            rationale: 'Mencegah kelelahan mata operator yang memantau layar lebih dari 6 jam sehari.',
          },
        ],
        deliverables: [
          'Pustaka komponen UI siap pakai dengan dokumentasi token terintegrasi.',
          'Dashboard pemantauan transaksi real-time dengan dukungan reduced motion.',
        ],
        outcomes: [
          {
            statement: 'Waktu pemindaian entri anomali transaksi berkurang secara terukur dalam simulasi pengujian internal.',
            evidenceReference: 'Laporan Audit Usability Q2 2025.',
          },
        ],
        lessons: [
          'Hierarki informasi yang lugas jauh lebih berharga bagi pengguna profesional daripada transisi visual yang berlebihan.',
        ],
      },
    },
    {
      id: 'project-02',
      slug: 'platform-analitik-data-geometris',
      contentState: 'placeholder',
      title: '[JUDUL PROYEK 02] Platform Analitik Data Geometris',
      summary: 'Visualisasi metrik operasional dan hubungan topologi jaringan menggunakan komputasi grafis ramah peramban.',
      problem: 'Grafik analitik tradisional gagal merepresentasikan relasi multi-dimensi tanpa membebani memori peramban.',
      role: 'Creative Technologist & UI Engineer',
      contributions: [
        'Mengembangkan visualisasi topologi berbasis Three.js dengan on-demand rendering.',
        'Membangun fallback tabel HTML yang sinkron dua arah dengan objek grafis.',
        'Mengoptimalkan draw calls hingga stabil di bawah 45 call per frame.',
      ],
      cover: {
        src: '/projects/project-02.svg',
        alt: 'Pratinjau proyek belum ditambahkan — Visualisasi grafis hubungan data',
        width: 1200,
        height: 800,
        caption: 'Pratinjau proyek belum ditambahkan; konten contoh untuk pengujian alur antarmuka.',
        contentState: 'placeholder',
      },
      year: '2025',
      period: 'Agustus — November 2025',
      technologies: ['React', 'Three.js', 'TypeScript', 'GLSL Shaders'],
      projectType: 'Interactive Data Visualization',
      externalLinks: [
        { label: 'Demo Interaktif', url: 'https://example.com/demo-02', kind: 'demo' },
      ],
      caseStudy: {
        context: 'Dibangun untuk tim infrastruktur jaringan yang membutuhkan visibilitas seketika atas ribuan node server dan jalur transmisi lintas zona.',
        contributions: [
          'Merancang algoritma penempatan node berbasis fisika deterministik.',
          'Menerapkan kebijakan gesture pan-y pada perangkat bergerak.',
        ],
        process: [
          'Benchmarking performa WebGL pada berbagai GPU kelas menengah ke bawah.',
          'Pemisahan thread kalkulasi topologi ke Web Worker terpisah.',
          'Pembuatan kontrol keyboard paralel untuk seluruh aksi visual.',
        ],
        decisions: [
          {
            decision: 'Menghentikan loop render saat tidak ada interaksi pointer aktif.',
            rationale: 'Menghemat konsumsi baterai perangkat laptop dan mobile saat memantau data.',
            tradeoff: 'Perlu mekanisme listener eksplisit untuk memicu render frame baru saat ada perubahan state.',
          },
        ],
        deliverables: [
          'Modul visualisasi web canvas dengan frameloop on-demand.',
          'Panel kontrol HTML aksesibel dengan feedback keyboard lengkap.',
        ],
      },
    },
    {
      id: 'project-03',
      slug: 'dashboard-operasional-kesehatan-terpadu',
      contentState: 'placeholder',
      title: '[JUDUL PROYEK 03] Dashboard Operasional Kesehatan Terpadu',
      summary: 'Antarmuka terpadu pengelolaan antrean pasien dan distribusi logistik medis dengan penekanan pada keterbacaan darurat.',
      problem: 'Petugas medis sering salah membaca status prioritas ruang darurat saat pergantian shift akibat hierarki warna yang membingungkan.',
      role: 'Product Designer & Frontend Developer',
      contributions: [
        'Merancang ulang skala tipografi darurat dengan rasio kontras 7:1.',
        'Mengurangi waktu perpindahan antar-status antrean menjadi satu aktivasi tombol tunggal.',
        'Menambahkan suara notifikasi berbasis Web Audio API dan status live region.',
      ],
      cover: {
        src: '/projects/project-03.svg',
        alt: 'Pratinjau proyek belum ditambahkan — Antarmuka dashboard rumah sakit',
        width: 1200,
        height: 800,
        caption: 'Pratinjau proyek belum ditambahkan; konten contoh untuk pengujian alur antarmuka.',
        contentState: 'placeholder',
      },
      year: '2024',
      period: 'Maret — September 2024',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      projectType: 'Healthcare Web System',
      caseStudy: {
        context: 'Fasilitas klinik rawat jalan dengan 12 poli membutuhkan sinkronisasi cepat antar meja pendaftaran, dokter, dan apotek.',
        contributions: [
          'Riset konteks langsung bersama perawat dan tenaga farmasi.',
          'Penyusunan layout kontras tinggi tanpa elemen dekoratif yang mengganggu.',
        ],
        process: [
          'Observasi lapangan alur penanganan pasien gawat darurat.',
          'Prototyping cepat paper-wireframe hingga validasi antarmuka digital.',
          'Penerapan aturan keras anti-distraksi pada seluruh komponen modal.',
        ],
        decisions: [
          {
            decision: 'Menghilangkan seluruh efek bayangan lembut dan sudut membulat berlebihan pada kartu data kritis.',
            rationale: 'Garis batas tegas dan kontras tinggi lebih cepat dipindai di bawah pencahayaan ruangan intensif.',
          },
        ],
        deliverables: [
          'Aplikasi web responsif untuk tablet perawat dan layar pemantau dinding.',
          'Panduan gaya desain darurat untuk pengembangan modul mendatang.',
        ],
      },
    },
    {
      id: 'project-04',
      slug: 'aplikasi-eksplorasi-visual-interaktif',
      contentState: 'placeholder',
      title: '[JUDUL PROYEK 04] Aplikasi Eksplorasi Visual Interaktif',
      summary: 'Eksperimen kuratorial karya seni grafis geometris dengan pengalaman navigasi spasial yang ringan.',
      problem: 'Galeri digital konvensional seringkali terasa kaku dan tidak mengundang rasa ingin tahu pengunjung umum.',
      role: 'Creative Developer',
      contributions: [
        'Mengembangkan transisi asimetris antar-koleksi menggunakan CSS Custom Properties.',
        'Menghadirkan mini-sculpture 3D sebagai representasi taktil tiap ruangan pameran.',
      ],
      cover: {
        src: '/projects/project-04.svg',
        alt: 'Pratinjau proyek belum ditambahkan — Kurasi galeri seni digital',
        width: 1200,
        height: 800,
        caption: 'Pratinjau proyek belum ditambahkan; konten contoh untuk pengujian alur antarmuka.',
        contentState: 'placeholder',
      },
      year: '2024',
      period: 'Oktober — Desember 2024',
      technologies: ['React', 'Three.js', 'Vite'],
      projectType: 'Creative Gallery',
      caseStudy: {
        context: 'Proyek eksplorasi mandiri untuk mendemonstrasikan bagaimana prinsip Bauhaus dapat diterapkan pada media interaktif web masa kini.',
        contributions: [
          'Konseptualisasi art direction, penulisan esai kurasi, dan implementasi kode.',
        ],
        process: [
          'Kompilasi arsip bentuk dasar Bauhaus dan tipografi Space Grotesk.',
          'Eksperimen gerak interaktif yang mematuhi preferensi reduced-motion.',
        ],
        decisions: [
          {
            decision: 'Menolak penggunaan canvas WebGL menyeluruh untuk seluruh halaman galeri.',
            rationale: 'Memastikan seluruh teks karya seni dapat diindeks mesin pencari dan terbaca oleh screen reader.',
          },
        ],
        deliverables: [
          'Website pameran interaktif publik dengan dukungan fallback statis penuh.',
        ],
      },
    },
  ],
};
