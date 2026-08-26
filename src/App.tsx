import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from 'lucide-react'

type Project = {
  title: string
  year: string
  category: string
  description: string
  tags: string[]
  image: string
  accent: string
  wide?: boolean
  link?: string
}

type Experience = {
  period: string
  role: string
  company: string
  details: string[]
}

const navigation = [
  { label: 'Profil', href: '#profil' },
  { label: 'Pengalaman', href: '#pengalaman' },
  { label: 'Karya', href: '#karya' },
  { label: 'Keahlian', href: '#keahlian' },
  { label: 'Kontak', href: '#kontak' },
]

const projects: Project[] = [
  {
    title: 'Rdir Studio AI Workspace',
    year: '2026',
    category: 'AI Platform & Workspace',
    description:
      'Web AI Workspace modern kelas dunia seperti Claude & Kimi dengan Live Code/View Preview, integrasi multi-model OpenRouter, database TiDB Cloud, dan isolasi chat privat.',
    tags: ['AI Workspace', 'OpenRouter', 'TiDB Cloud', 'Fullstack'],
    image: '/images/ai-reihan.png',
    accent: '#7c3aed',
    wide: true,
    link: 'https://ai.reihan.online/',
  },
  {
    title: 'Filter Sakti — Data Cleansing Tool',
    year: '2026',
    category: 'Operasional Data & Web Tool',
    description:
      'Tools cleansing dan deduplikasi data otomatis untuk format WSA, MODOROSO, dan WAPPR dengan integrasi Google Sheets (5.600+ baris), upload .xlsx/.csv, dan filter per bulan.',
    tags: ['Web', 'Data Cleansing', 'Google Sheets API', 'Excel'],
    image: '/images/filter-sakti.png',
    accent: '#f2994a',
    link: 'https://filter-sakti.vercel.app/',
  },
  {
    title: 'Filter Sakti EBIS — Telkom Tracker',
    year: '2026',
    category: 'Enterprise Data Tool',
    description:
      'Sistem analisis dan filtering data EBIS Telkom dari xpro.telkom.co.id (.xls/.txt/.csv), dilengkapi tracker penugasan teknisi dan export data hasil deduplikasi.',
    tags: ['Telkom', 'Data Analysis', 'Web App', 'Excel'],
    image: '/images/ebis-telkom.png',
    accent: '#e53935',
    link: 'https://ebis-telkom.vercel.app/',
  },
  {
    title: 'REYA — Robot AI & Gesture Music',
    year: '2026',
    category: 'AI Robot & Computer Vision',
    description:
      'Robot AI interaktif dengan suara Bahasa Indonesia, percakapan suara cepat via OpenRouter AI, dan integrasi kamera computer vision untuk memainkan musik instrumen melalui gesture tangan.',
    tags: ['Computer Vision', 'Hand Gesture', 'AI Voice', 'Web Audio'],
    image: '/images/reya-reihan.png',
    accent: '#06b6d4',
    wide: true,
    link: 'https://reya.reihan.online/',
  },
  {
    title: 'SoundTools MetaStudio',
    year: '2026',
    category: 'Audio Engineering & Web Tool',
    description:
      'Browser-based audio metadata & cover art editor 100% client-side tanpa upload ke server. Mendukung ID3v2.3, Vorbis, FLAC, M4A, WAV, dan OGG dengan lossless stream copy injection.',
    tags: ['Audio Metadata', 'ID3v2/Vorbis', 'Client-Side', 'Web Audio'],
    image: '/images/metadata-reihan.png',
    accent: '#10b981',
    link: 'https://metadata.reihan.online/',
  },
  {
    title: 'RIFF//LAB — Browser Rhythm Game',
    year: '2026',
    category: 'Web Rhythm Game & Cloud Audio',
    description:
      'Game musik ritme 5-fret (Guitar Hero style) langsung di browser tanpa instalasi. Dilengkapi akses katalog cloud Chorus 120.000+ lagu, import .sng/.zip, leaderboard, dan real-time multiplayer.',
    tags: ['Rhythm Game', 'Web Audio API', 'Multiplayer', 'Leaderboard'],
    image: '/images/musik-reihan.png',
    accent: '#f59e0b',
    wide: true,
    link: 'https://musik.reihan.online/',
  },
  {
    title: 'RS SHL — Sistem Absensi Digital',
    year: '2026',
    category: 'Healthcare Enterprise App',
    description:
      'Sistem absensi digital dan presensi pegawai Rumah Sakit SHL dengan verifikasi ID pegawai, alur check-in/check-out terstruktur, dan dashboard manajemen kehadiran terenkripsi.',
    tags: ['Enterprise Web', 'Healthcare', 'Absensi Digital', 'Auth'],
    image: '/images/shl-mu.png',
    accent: '#0284c7',
    link: 'https://shl-mu.vercel.app/',
  },
  {
    title: 'HR Portal & Management System',
    year: '2026',
    category: 'HR & Enterprise Dashboard',
    description:
      'Platform HRIS dan manajemen sumber daya manusia dengan modul data karyawan terpusat, rekapitulasi kehadiran, pengajuan izin/cuti terintegrasi, dan reporting SDM.',
    tags: ['HRIS', 'Enterprise Web', 'Dashboard', 'Management'],
    image: '/images/hr-rei219.png',
    accent: '#4f46e5',
    link: 'https://hr.reihan.online/',
  },
  {
    title: 'The Wedding of Sheva & Angel',
    year: '2026',
    category: 'Digital Invitation Platform',
    description:
      'Platform undangan pernikahan digital interaktif dan responsif dengan buku tamu digital, amplop digital/rekening, reservasi kehadiran, background music, dan animasi interaktif.',
    tags: ['Web', 'UI/UX', 'Digital Invitation', 'Interactive'],
    image: '/images/shevaangel.png',
    accent: '#c49b66',
    link: 'https://shevaangel.vercel.app/',
  },
  {
    title: 'AR Book — Dasar Komputer',
    year: '2024',
    category: 'Aplikasi edukasi AR',
    description:
      'Aplikasi Android berbasis Unity dan Vuforia yang menghubungkan buku fisik dengan objek 3D interaktif untuk membantu siswa memahami perangkat keras dan perangkat lunak komputer.',
    tags: ['Unity', 'C#', 'Vuforia', 'Android'],
    image: '/images/ar-book.png',
    accent: '#f2c94c',
    wide: true,
  },
  {
    title: 'Petualangan Barudak',
    year: '2024',
    category: 'Game edukasi',
    description:
      'Game klien yang memadukan eksplorasi Provinsi Banten, kuis interaktif, dan pembelajaran bangun ruang melalui visualisasi bangunan nyata.',
    tags: ['Unity', 'Game', 'Edukasi', '3D'],
    image: '/images/petualangan-barudak.png',
    accent: '#8dc9b8',
  },
  {
    title: 'ReLive AR',
    year: '2025',
    category: 'Aplikasi live-photo AR',
    description:
      'Aplikasi berbasis augmented reality yang memindai gambar dan mengubahnya menjadi pengalaman live-photo dengan konten bergerak.',
    tags: ['Unity', 'AR', 'Mobile'],
    image: '/images/relife-ar.png',
    accent: '#c8b6e8',
  },
  {
    title: 'Game Penyusun Kata',
    year: '2025',
    category: 'Game edukasi',
    description:
      'Permainan untuk klien pendidikan yang mengajak siswa menyusun huruf berdasarkan gambar atau petunjuk guna melatih membaca, kosakata, dan logika bahasa.',
    tags: ['Unity', 'C#', 'Game', 'Literasi'],
    image: '/images/penyusun-kata.png',
    accent: '#f7b267',
  },
  {
    title: '42 Berita Kita',
    year: '2024',
    category: 'Portal berita',
    description:
      'Portal berita responsif dengan pengelolaan konten berbasis database, halaman admin, kategori, dan tanggal publikasi dinamis.',
    tags: ['Web', 'CMS', 'Database'],
    image: '/images/42-berita-kita.png',
    accent: '#9dc0e8',
    wide: true,
    link: 'https://berita.42web.io/',
  },
  {
    title: 'Informasi Desa',
    year: '2023',
    category: 'Layanan informasi publik',
    description:
      'Situs responsif untuk profil desa, berita, agenda, struktur perangkat, pengumuman, dan layanan publik yang mudah diakses warga.',
    tags: ['Web', 'CMS', 'Responsive'],
    image: '/images/informasi-desa.png',
    accent: '#9bc59d',
  },
  {
    title: 'Platform E-commerce',
    year: '2023',
    category: 'Toko online',
    description:
      'Sistem penjualan daring dengan katalog, pencarian, filter kategori, keranjang, checkout, notifikasi, serta pengelolaan produk dan stok.',
    tags: ['Web', 'E-commerce', 'CMS'],
    image: '/images/ecommerce.png',
    accent: '#d4b2a7',
  },
  {
    title: 'Urang IT',
    year: '2020',
    category: 'E-learning pribadi',
    description:
      'Platform belajar mandiri dan showcase proyek yang memuat materi teknologi informasi, dokumentasi, sistem login, dan pengelolaan konten.',
    tags: ['Web', 'E-learning', 'CMS'],
    image: '/images/urang-it.png',
    accent: '#a9b5c8',
  },
]

const experiences: Experience[] = [
  {
    period: 'Jul 2026 — Sekarang',
    role: 'Representative District Southern',
    company: 'PT Telkom Indonesia',
    details: [
      'Menjalankan fungsi perwakilan operasional dan koordinasi layanan telekomunikasi di District Southern.',
      'Memantau performa jaringan, rekonsiliasi data pelanggan lintas sistem, dan penanganan isu operasional lapangan.',
      'Menyusun laporan kinerja layanan dan berkoordinasi langsung dengan tim teknis serta manajemen.',
    ],
  },
  {
    period: 'Nov 2025 — Jun 2026',
    role: 'Agent',
    company: 'PT Telkom Indonesia',
    details: [
      'Merekonsiliasi data jaringan dan layanan antara UIM dengan informasi pelanggan untuk menjaga akurasi data.',
      'Memantau serta menindaklanjuti order melalui alur WOC, organic, C4, GDoc, dan ROC.',
      'Membangun automation filtering tool untuk mempercepat proses cleansing data operasional.',
    ],
  },
  {
    period: 'Jul — Des 2025',
    role: 'Pengajar Informatika',
    company: 'Ganesha Operation',
    details: [
      'Mengajarkan konsep informatika, menyiapkan materi pembelajaran, dan mendampingi latihan praktik siswa.',
    ],
  },
  {
    period: 'Okt 2022 — Sekarang',
    role: 'Pengembang Web, Game & Aplikasi',
    company: 'Freelance',
    details: [
      'Mengembangkan situs responsif, aplikasi Unity, game edukasi, pengalaman AR, dan sistem e-commerce.',
      'Menangani kebutuhan, pengembangan, pengujian, revisi, hingga penyerahan proyek kepada klien.',
    ],
  },
  {
    period: 'Feb — Mar 2024',
    role: 'Pengajar Magang',
    company: 'SMKN 1 Pandeglang',
    details: [
      'Mengajar lebih dari dua kelas, menyusun modul ajar, dan bertanggung jawab atas pengelolaan kelas.',
    ],
  },
  {
    period: 'Jul — Sep 2019',
    role: 'Magang Divisi Media',
    company: 'Diskominfo Pandeglang',
    details: [
      'Mengelola situs, membantu pemantauan keamanan wilayah di Gedung Pintar, dan mendokumentasikan kegiatan.',
    ],
  },
]

const skillGroups = [
  {
    number: '01',
    title: 'Operasional & Data',
    description:
      'Rekonsiliasi data, monitoring order, laporan operasional, dokumentasi, Microsoft Office, dan koordinasi penyelesaian isu.',
  },
  {
    number: '02',
    title: 'Software & Web',
    description:
      'Unity, C#, Vuforia, Firebase, pengembangan web responsif, CMS, WordPress, aplikasi Android, pengujian, dan revisi produk.',
  },
  {
    number: '03',
    title: 'Edukasi & Kolaborasi',
    description:
      'Pengajaran teknis, penyusunan modul, komunikasi, kerja tim, manajemen waktu, koordinasi proyek, Figma, dan Canva.',
  },
]

function SectionHeading({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return (
    <div className="section-heading reveal">
      <div className="section-heading__meta">
        <span className="section-heading__number">{number}</span>
        <p className="section-heading__eyebrow">{eyebrow}</p>
      </div>
      <h2>{title}</h2>
    </div>
  )
}

function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))

    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#konten-utama">
        Lewati ke konten utama
      </a>

      <header className="topbar">
        <a className="brand" href="#utama" aria-label="Kembali ke awal">
          RM<span>.</span>
        </a>

        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="topbar__contact" href="https://t.me/Rei219" target="_blank" rel="noreferrer" aria-label="Mari bicara via Telegram @Rei219">
          Mari bicara <ArrowUpRight size={16} aria-hidden="true" />
        </a>

        <button
          className="menu-button"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
          <nav aria-label="Navigasi seluler">
            {navigation.map((item, index) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="mobile-nav__email" href="https://t.me/Rei219" target="_blank" rel="noreferrer" onClick={closeMenu}>
            Telegram: @Rei219 ↗
          </a>
        </div>
      </header>

      <main id="konten-utama">
        <section id="utama" className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <div className="hero__topline">
              <p>Portofolio / 2026</p>
              <p>Pandeglang, Banten</p>
            </div>

            <div className="hero__content reveal is-visible">
              <p className="eyebrow">Operasional TI · Software Development · Edukasi</p>
              <h1 id="hero-title">
                Teknologi yang <em>bekerja.</em>
                <br />
                Pengalaman yang terasa.
              </h1>
              <p className="hero__lead">
                Saya Reihan Mutaqin. Saya menggabungkan ketelitian operasional, pengembangan perangkat lunak, dan pengalaman mengajar untuk membuat solusi digital yang jelas dan berguna.
              </p>
              <div className="hero__actions">
                <a className="button button--dark" href="#karya">
                  Lihat karya <ArrowDown size={18} aria-hidden="true" />
                </a>
                <a className="button button--accent" href="/downloads/Portofolio-Reihan-Mutaqin.pdf" download="Portofolio-Reihan-Mutaqin.pdf">
                  <Download size={17} aria-hidden="true" /> Portofolio (PDF)
                </a>
                <a className="button button--dark" href="/downloads/Portofolio-Reihan-Mutaqin.pptx" download="Portofolio-Reihan-Mutaqin.pptx">
                  <Download size={17} aria-hidden="true" /> PPT Portofolio
                </a>
                <a className="text-link" href="/downloads/CV-ATS-Reihan-Mutaqin.pdf" download="CV-ATS-Reihan-Mutaqin.pdf">
                  <Download size={17} aria-hidden="true" /> CV ATS
                </a>
              </div>
            </div>

            <div className="hero__footer">
              <span>Unity / C# / Web / Data</span>
              <span>Terbuka untuk peluang profesional</span>
            </div>
          </div>

          <div className="hero__portrait" aria-label="Foto Reihan Mutaqin">
            <span className="hero__portrait-word" aria-hidden="true">
              REIHAN
            </span>
            <img src="/images/reihan-mutaqin.png" alt="Reihan Mutaqin mengenakan pakaian hitam" />
            <div className="hero__portrait-caption">
              <span>Reihan Mutaqin</span>
              <span>Indonesia</span>
            </div>
          </div>
        </section>

        <section id="profil" className="section section--profile">
          <SectionHeading number="01" eyebrow="Profil" title="Berpikir terstruktur. Membuat dengan tujuan." />

          <div className="profile-grid">
            <div className="profile-grid__statement reveal">
              <p>
                Saya bekerja di persimpangan antara <strong>operasional TI</strong>, <strong>pengembangan produk digital</strong>, dan <strong>pembelajaran teknologi</strong>.
              </p>
            </div>
            <div className="profile-grid__body reveal">
              <p>
                Lulusan Pendidikan Teknologi Informasi Universitas Bina Bangsa dengan IPK 3,96/4,00 dan predikat lulusan terbaik program studi. Pengalaman saya mencakup rekonsiliasi data layanan, pemantauan order, pelaporan operasional, pengembangan aplikasi Unity dan web, serta pengajaran informatika.
              </p>
              <p>
                Saya terbiasa menerjemahkan kebutuhan teknis menjadi pekerjaan yang runtut—mulai dari memahami masalah, membangun solusi, menguji hasil, sampai menyampaikan informasi secara mudah dipahami.
              </p>
            </div>
          </div>

          <div className="profile-stats reveal" aria-label="Ringkasan profil">
            <div>
              <strong>3,96</strong>
              <span>IPK dari 4,00</span>
            </div>
            <div>
              <strong>17+</strong>
              <span>Proyek pilihan</span>
            </div>
            <div>
              <strong>2022</strong>
              <span>Mulai freelance</span>
            </div>
            <div>
              <strong>550</strong>
              <span>Skor TOEFL</span>
            </div>
          </div>
        </section>

        <section id="pengalaman" className="section section--experience">
          <SectionHeading number="02" eyebrow="Pengalaman" title="Pengalaman lintas operasi, pengembangan, dan pendidikan." />

          <div className="experience-list">
            {experiences.map((experience) => (
              <article className="experience reveal" key={`${experience.company}-${experience.period}`}>
                <p className="experience__period">{experience.period}</p>
                <div className="experience__title">
                  <h3>{experience.role}</h3>
                  <p>{experience.company}</p>
                </div>
                <ul>
                  {experience.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="karya" className="section section--projects">
          <SectionHeading number="03" eyebrow="Karya pilihan" title="Produk yang dibuat untuk dipakai, bukan sekadar dilihat." />

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className={`project reveal ${project.wide ? 'project--wide' : ''}`}
                style={{ '--project-accent': project.accent } as CSSProperties}
              >
                <div className="project__visual">
                  <span className="project__index">{String(index + 1).padStart(2, '0')}</span>
                  <img src={project.image} alt={`Tampilan proyek ${project.title}`} loading="lazy" />
                </div>
                <div className="project__meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project__footer">
                  <span>{project.tags.join(' / ')}</span>
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Buka ${project.title} di tab baru`}>
                      Buka proyek <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  ) : (
                    <span>Studi proyek</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="keahlian" className="section section--skills">
          <SectionHeading number="04" eyebrow="Keahlian" title="Fondasi teknis yang ditopang komunikasi yang baik." />

          <div className="skill-list">
            {skillGroups.map((group) => (
              <article className="skill-row reveal" key={group.number}>
                <span>{group.number}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </article>
            ))}
          </div>

          <div className="credentials-grid">
            <div className="credential reveal">
              <p className="credential__label">Pendidikan</p>
              <h3>Universitas Bina Bangsa</h3>
              <p>Pendidikan Teknologi Informasi · 2020–2024</p>
              <p>IPK 3,96/4,00 · Lulusan Terbaik Program Studi 2024</p>
              <p>TOEFL Pusat Bahasa Universitas Bina Bangsa · 550</p>
            </div>
            <div className="credential reveal">
              <p className="credential__label">Dasar teknis</p>
              <h3>SMKN 1 Pandeglang</h3>
              <p>Teknik Komputer dan Jaringan · 2017–2020</p>
              <p>Kompetensi Kejuruan Hardware, Jaringan & Troubleshooting</p>
            </div>
            <div className="credential reveal">
              <p className="credential__label">Organisasi</p>
              <h3>Himpunan Mahasiswa PTI</h3>
              <p>Wakil Ketua · Jun 2022–Jun 2023</p>
              <p>Ketua Divisi IT · Jun 2021–Jun 2022</p>
            </div>
            <div className="credential reveal">
              <p className="credential__label">Kontribusi</p>
              <h3>Inovasi Teknologi Pendidikan Indonesia</h3>
              <p>Okt 2025–Februari 2026</p>
              <p>Pengembangan aplikasi digital dan pengelolaan e-learning.</p>
            </div>
          </div>
        </section>

        <section id="kontak" className="contact-section">
          <div className="contact-section__top reveal">
            <p className="eyebrow">Punya tantangan untuk diselesaikan?</p>
            <h2>Mari membuat sesuatu yang benar-benar berguna.</h2>
          </div>

          <div className="contact-grid reveal">
            <a href="https://t.me/Rei219" target="_blank" rel="noreferrer">
              <TelegramIcon size={24} />
              <span>
                <small>Telegram</small>
                @Rei219
              </span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="mailto:reyhanmutakin1@gmail.com">
              <Mail aria-hidden="true" />
              <span>
                <small>Email</small>
                reyhanmutakin1@gmail.com
              </span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a href="tel:+6282111039958">
              <Phone aria-hidden="true" />
              <span>
                <small>Telepon / WhatsApp</small>
                +62 821 1103 9958
              </span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <div className="contact-grid__location">
              <MapPin aria-hidden="true" />
              <span>
                <small>Domisili</small>
                Pandeglang, Banten, Indonesia
              </span>
            </div>
          </div>

          <div className="contact-actions reveal">
            <a className="button button--light" href="/downloads/Portofolio-Reihan-Mutaqin.pdf" download="Portofolio-Reihan-Mutaqin.pdf">
              <Download size={18} aria-hidden="true" /> Unduh Portofolio (PDF)
            </a>
            <a className="button button--light" href="/downloads/Portofolio-Reihan-Mutaqin.pptx" download="Portofolio-Reihan-Mutaqin.pptx">
              <Download size={18} aria-hidden="true" /> Unduh Presentasi (PPTX)
            </a>
            <a className="button button--dark" href="/downloads/CV-ATS-Reihan-Mutaqin.pdf" download="CV-ATS-Reihan-Mutaqin.pdf">
              <Download size={18} aria-hidden="true" /> CV ATS (PDF)
            </a>
            <a className="text-link text-link--light" href="/downloads/CV-ATS-Reihan-Mutaqin.docx" download="CV-ATS-Reihan-Mutaqin.docx">
              Versi Word
            </a>
          </div>

          <div className="contact-footer">
            <div className="contact-socials" aria-label="Media profesional">
              <a href="https://t.me/Rei219" target="_blank" rel="noreferrer" className="social-pill">
                <TelegramIcon size={18} /> Telegram
              </a>
              <a href="https://github.com/ReihanMutaqin" target="_blank" rel="noreferrer" className="social-pill">
                <Github size={18} aria-hidden="true" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/reihan-mutaqin-351169201/" target="_blank" rel="noreferrer" className="social-pill">
                <Linkedin size={18} aria-hidden="true" /> LinkedIn
              </a>
            </div>
            <p>© {new Date().getFullYear()} Reihan Mutaqin</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
