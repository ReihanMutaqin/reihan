import pptxgen from 'pptxgenjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const imgDir = path.join(root, 'public', 'images');
const outPath = path.join(root, 'public', 'downloads', 'Portofolio-Reihan-Mutaqin.pptx');

const RECT = 'rect';
const ELLIPSE = 'ellipse';

// Helper: image path to base64 data URI
function img(filename) {
  const fp = path.join(imgDir, filename);
  if (!fs.existsSync(fp)) return null;
  const ext = path.extname(fp).slice(1).toLowerCase();
  const mime = ext === 'png' ? 'image/png' : 'image/jpeg';
  return 'data:' + mime + ';base64,' + fs.readFileSync(fp).toString('base64');
}

// Color palette
const C = {
  paper:   'F3EFE5',
  paperDk: 'E7E0D2',
  ink:     '151515',
  muted:   '655F57',
  yellow:  'F2C94C',
  orange:  'E95D32',
  white:   'FFFFFF',
  cardDk:  '1C1917',
  borderDk:'2D2925',
};

const F = { heading: 'Segoe UI', body: 'Segoe UI', mono: 'Courier New' };

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE'; // 16:9 widescreen (13.33" x 7.5")
pptx.author = 'Reihan Mutaqin';
pptx.company = 'Reihan Mutaqin Portfolio';
pptx.title = 'Portofolio Reihan Mutaqin';

const totalSlides = 13;

function addPageNum(slide, num) {
  slide.addText(`${num} / ${totalSlides}`, {
    x: 12.0, y: 7.1, w: 1.2, h: 0.25,
    fontSize: 8, color: C.muted, align: 'right',
    fontFace: F.body
  });
}

function topBar(slide, label, isDark = false) {
  slide.addShape(RECT, { x: 0, y: 0, w: 13.33, h: 0.06, fill: { color: isDark ? C.yellow : C.ink } });
  slide.addShape(RECT, { x: 0.4, y: 0.15, w: 1.8, h: 0.28, fill: { color: C.orange }, line: { color: C.orange } });
  slide.addText(label, {
    x: 0.4, y: 0.15, w: 1.8, h: 0.28,
    fontSize: 7.5, bold: true, color: C.white, align: 'center',
    fontFace: F.body, charSpacing: 1.5
  });
}

// ──────────────────────────────────────────────
// SLIDE 1 – COVER
// ──────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.addShape(RECT, { x: 0, y: 0, w: 7.5, h: 7.5, fill: { color: C.ink } });
  slide.addShape(RECT, { x: 7.5, y: 0, w: 5.83, h: 7.5, fill: { color: C.paper } });
  slide.addShape(RECT, { x: 0.5, y: 0.55, w: 0.08, h: 1.6, fill: { color: C.yellow } });

  slide.addText('PORTOFOLIO PROFESIONAL', {
    x: 0.7, y: 0.5, w: 6.5, h: 0.35,
    fontSize: 8, bold: true, color: C.yellow, fontFace: F.body, charSpacing: 2
  });
  slide.addText('2026', {
    x: 0.7, y: 0.85, w: 6.5, h: 0.35,
    fontSize: 8, color: C.muted, fontFace: F.mono
  });

  slide.addText('REIHAN\nMUTAQIN.', {
    x: 0.5, y: 1.3, w: 6.8, h: 2.4,
    fontSize: 64, bold: true, color: C.white,
    fontFace: F.heading, lineSpacingMultiple: 1.1
  });

  slide.addText('Operasional TI  ·  Software Development  ·  Edukasi', {
    x: 0.5, y: 3.8, w: 6.8, h: 0.5,
    fontSize: 12, color: 'A09890', fontFace: F.body, italic: true
  });

  slide.addShape(RECT, { x: 0.5, y: 4.35, w: 6.5, h: 0.015, fill: { color: '333333' } });

  const contacts = [
    { icon: '✉', text: 'reyhanmutakin1@gmail.com' },
    { icon: '📞', text: '+62 821 1103 9958' },
    { icon: '📍', text: 'Pandeglang, Banten, Indonesia' },
    { icon: '🔗', text: 'github.com/ReihanMutaqin' },
    { icon: '🔗', text: 'linkedin.com/in/reihan-mutaqin-351169201' },
    { icon: '🌐', text: 'reihan.online' },
  ];
  contacts.forEach((c, i) => {
    slide.addText(`${c.icon}  ${c.text}`, {
      x: 0.5, y: 4.55 + i * 0.36, w: 6.8, h: 0.32,
      fontSize: 9.5, color: 'C0B8B0', fontFace: F.body
    });
  });

  const photoData = img('reihan-mutaqin.png');
  if (photoData) {
    slide.addImage({ data: photoData, x: 7.9, y: 0.4, w: 4.9, h: 6.7, sizing: { type: 'contain', w: 4.9, h: 6.7 } });
  }

  slide.addText('Reihan Mutaqin  ·  Indonesia', {
    x: 7.6, y: 6.85, w: 5.5, h: 0.3,
    fontSize: 8, color: C.muted, align: 'center', fontFace: F.body
  });

  addPageNum(slide, 1);
}

// ──────────────────────────────────────────────
// SLIDE 2 – PROFIL
// ──────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  topBar(slide, 'PROFIL');

  slide.addText('Berpikir terstruktur.\nMembuat dengan tujuan.', {
    x: 0.4, y: 0.6, w: 12.5, h: 1.4,
    fontSize: 30, bold: true, color: C.ink, fontFace: F.heading, lineSpacingMultiple: 1.2
  });

  slide.addShape(RECT, { x: 0.4, y: 2.1, w: 12.5, h: 0.015, fill: { color: C.ink } });

  slide.addText(
    'Lulusan Pendidikan Teknologi Informasi Universitas Bina Bangsa dengan IPK 3,96/4,00 dan predikat Lulusan Terbaik Program Studi. Portofolio mencakup tools operasional TI, platform AI modern, browser audio engineering, game edukasi & AR, serta pengajaran informatika.',
    {
      x: 0.4, y: 2.25, w: 7.5, h: 1.6,
      fontSize: 12, color: C.muted, fontFace: F.body, lineSpacingMultiple: 1.5
    }
  );

  slide.addText(
    'Terbiasa menerjemahkan kebutuhan teknis menjadi pekerjaan yang runtut — mulai dari memahami masalah, membangun solusi, menguji hasil, sampai menyampaikan informasi secara mudah dipahami.',
    {
      x: 0.4, y: 3.9, w: 7.5, h: 1.2,
      fontSize: 12, color: C.muted, fontFace: F.body, lineSpacingMultiple: 1.5
    }
  );

  const stats = [
    { val: '3,96', label: 'IPK dari 4,00' },
    { val: '17+',  label: 'Proyek Pilihan' },
    { val: '2022', label: 'Mulai Freelance' },
    { val: '550',  label: 'Skor TOEFL' },
  ];
  stats.forEach((s, i) => {
    const x = 8.2 + (i % 2) * 2.5;
    const y = 2.2 + Math.floor(i / 2) * 2.0;
    slide.addShape(RECT, { x, y, w: 2.2, h: 1.7, fill: { color: C.white }, line: { color: C.paperDk, pt: 1 } });
    slide.addShape(RECT, { x, y, w: 0.08, h: 1.7, fill: { color: C.orange } });
    slide.addText(s.val, {
      x: x + 0.2, y: y + 0.2, w: 2.0, h: 0.8,
      fontSize: 30, bold: true, color: C.ink, fontFace: F.heading
    });
    slide.addText(s.label, {
      x: x + 0.2, y: y + 1.05, w: 2.0, h: 0.45,
      fontSize: 9, color: C.muted, fontFace: F.body, bold: true
    });
  });

  const pillars = [
    { title: 'Ketelitian Operasional', desc: 'Terbiasa menangani ribuan baris data, rekonsiliasi sistem UIM/WOC, dan otomasi alur kerja untuk akurasi optimal.' },
    { title: 'Pengembangan Modern', desc: 'Membangun aplikasi digital responsif, interaktif, berbasis AI multi-model, computer vision, audio tools, dan cloud.' },
    { title: 'Komunikasi & Edukasi', desc: 'Mampu menerjemahkan konsep teknis kompleks menjadi modul pembelajaran dan penjelasan yang mudah dipahami.' },
  ];
  pillars.forEach((p, i) => {
    const px = 0.4 + i * 4.2;
    slide.addShape(RECT, { x: px, y: 5.2, w: 3.9, h: 1.8, fill: { color: C.white }, line: { color: C.paperDk, pt: 1 } });
    slide.addShape(RECT, { x: px, y: 5.2, w: 3.9, h: 0.04, fill: { color: C.orange } });
    slide.addText(p.title, { x: px + 0.2, y: 5.4, w: 3.5, h: 0.35, fontSize: 11, bold: true, color: C.ink, fontFace: F.heading });
    slide.addText(p.desc, { x: px + 0.2, y: 5.8, w: 3.5, h: 1.1, fontSize: 8.8, color: C.muted, fontFace: F.body, lineSpacingMultiple: 1.35 });
  });

  addPageNum(slide, 2);
}

// ──────────────────────────────────────────────
// SLIDE 3 – PENGALAMAN
// ──────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: C.ink };
  topBar(slide, 'PENGALAMAN', true);

  slide.addText('Pengalaman lintas operasi,\npengembangan, dan pendidikan.', {
    x: 0.4, y: 0.6, w: 12.5, h: 1.1,
    fontSize: 24, bold: true, color: C.white, fontFace: F.heading, lineSpacingMultiple: 1.2
  });

  slide.addShape(RECT, { x: 0.4, y: 1.8, w: 12.5, h: 0.015, fill: { color: '333333' } });

  const exps = [
    { period: 'Jul 2026 — Sekarang', role: 'Representative District Southern', company: 'PT Telkom Indonesia', desc: 'Menjalankan perwakilan operasional, koordinasi layanan District Southern, monitoring performa jaringan, rekonsiliasi data pelanggan, dan eskalasi isu.' },
    { period: 'Nov 2025 — Jun 2026', role: 'Agent', company: 'PT Telkom Indonesia', desc: 'Merekonsiliasi data jaringan & layanan UIM, memantau order WOC/ROC, dan mengembangkan automated tools cleansing data operasional.' },
    { period: 'Jul — Des 2025',      role: 'Pengajar Informatika', company: 'Ganesha Operation', desc: 'Menyusun modul ajar, menyampaikan konsep informatika & pemrograman, serta memfasilitasi sesi latihan praktik dan evaluasi pemahaman siswa.' },
    { period: 'Okt 2022 — Sekarang', role: 'Freelance App, Game & Web Developer', company: 'Mandiri / Klien Profesional', desc: 'Mengembangkan platform AI, web tools, aplikasi AR berbasis Unity, game edukasi 3D/2D, hingga CMS berita & e-commerce terintegrasi.' },
    { period: 'Feb — Mar 2024',      role: 'Pengajar Magang', company: 'SMKN 1 Pandeglang', desc: 'Mengajar lebih dari 2 kelas bidang TKJ/Informatika, menyusun rancangan pembelajaran, dan membimbing praktikum perangkat keras & jaringan.' },
    { period: 'Jul — Sep 2019',      role: 'Magang Divisi Media', company: 'Diskominfo Pandeglang', desc: 'Mengelola situs dinas, membantu pemantauan keamanan wilayah di Gedung Pintar, dan mendokumentasikan kegiatan dinas.' },
  ];

  exps.forEach((e, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i < 3 ? i : i - 3;
    const x = col === 0 ? 0.4 : 6.9;
    const y = 2.0 + row * 1.6;
    const w = 6.1;

    slide.addShape(ELLIPSE, { x: x, y: y + 0.18, w: 0.14, h: 0.14, fill: { color: C.orange } });
    if (row < (col === 0 ? 2 : 1)) {
      slide.addShape(RECT, { x: x + 0.06, y: y + 0.32, w: 0.02, h: 1.25, fill: { color: '333333' } });
    }

    slide.addText(e.period, { x: x + 0.25, y: y, w: w - 0.3, h: 0.25, fontSize: 7.5, color: C.muted, fontFace: F.mono });
    slide.addText(e.role, { x: x + 0.25, y: y + 0.26, w: w - 0.3, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: F.heading });
    slide.addText(e.company, { x: x + 0.25, y: y + 0.57, w: w - 0.3, h: 0.25, fontSize: 9, color: C.orange, fontFace: F.body, bold: true });
    slide.addText(e.desc, { x: x + 0.25, y: y + 0.84, w: w - 0.3, h: 0.7, fontSize: 8.5, color: 'A09890', fontFace: F.body, lineSpacingMultiple: 1.3 });
  });

  addPageNum(slide, 3);
}

// ──────────────────────────────────────────────
// SLIDE 4 – KEAHLIAN
// ──────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  topBar(slide, 'KEAHLIAN');

  slide.addText('Fondasi teknis yang\nditopang komunikasi baik.', {
    x: 0.4, y: 0.6, w: 12.5, h: 1.3,
    fontSize: 28, bold: true, color: C.ink, fontFace: F.heading, lineSpacingMultiple: 1.2
  });

  slide.addShape(RECT, { x: 0.4, y: 1.95, w: 12.5, h: 0.015, fill: { color: C.ink } });

  const skillGroups = [
    {
      num: '01', title: 'AI, Computer Vision & Audio',
      tags: ['OpenRouter AI', 'Hand Gesture Vision', 'Web Audio API', 'ID3/Vorbis Metadata', 'Speech Synthesis', 'TiDB Cloud']
    },
    {
      num: '02', title: 'Operasional TI & Cleansing Data',
      tags: ['Data Cleansing & Filtering', 'Google Sheets API', 'WSA / MODOROSO / WAPPR', 'Order Tracker (WOC/ROC)', 'Excel / CSV Automation']
    },
    {
      num: '03', title: 'Fullstack Web & Database',
      tags: ['React / TypeScript', 'Tailwind CSS', 'PHP & MySQL', 'CMS & E-Commerce', 'Node.js / Express', 'Vercel Deployment']
    },
    {
      num: '04', title: 'Game Dev, AR & Edukasi',
      tags: ['Unity 3D / 2D', 'C# Scripting', 'Vuforia AR Engine', 'Android Build', 'Penyusunan Modul Ajar', 'Public Speaking']
    },
  ];

  skillGroups.forEach((g, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 6.4;
    const y = 2.15 + row * 2.35;
    const w = 6.0;

    slide.addShape(RECT, { x, y, w, h: 2.1, fill: { color: C.white }, line: { color: C.paperDk, pt: 1 } });
    slide.addShape(RECT, { x, y, w: 0.08, h: 2.1, fill: { color: C.ink } });

    slide.addText(g.num, { x: x + 0.18, y: y + 0.1, w: 0.5, h: 0.3, fontSize: 9, color: C.muted, fontFace: F.mono });
    slide.addText(g.title, { x: x + 0.18, y: y + 0.38, w: w - 0.3, h: 0.35, fontSize: 12, bold: true, color: C.ink, fontFace: F.heading });

    let tx = x + 0.18;
    let ty = y + 0.82;
    g.tags.forEach((tag) => {
      const tagW = Math.min(tag.length * 0.078 + 0.2, w - 0.3);
      if (tx + tagW > x + w - 0.1) { tx = x + 0.18; ty += 0.42; }
      slide.addShape(RECT, { x: tx, y: ty, w: tagW, h: 0.3, fill: { color: C.paperDk }, line: { color: 'DED8CC', pt: 1 } });
      slide.addText(tag, { x: tx, y: ty, w: tagW, h: 0.3, fontSize: 7.5, color: C.ink, align: 'center', fontFace: F.body });
      tx += tagW + 0.1;
    });
  });

  addPageNum(slide, 4);
}

// ──────────────────────────────────────────────
// PROJECT SLIDES (Slides 5 to 11)
// ──────────────────────────────────────────────
const projectSlideData = [
  {
    slideNum: 5,
    subtitle: 'AI & Intelligent Workspaces',
    projects: [
      { img: 'ai-reihan.png', year: '2026', cat: 'AI Platform', title: 'Rdir Studio AI Workspace', desc: 'Web AI Workspace modern kelas dunia dengan Live Code/View Preview, integrasi multi-model OpenRouter, database TiDB Cloud, dan isolasi chat privat.', tags: ['AI Workspace', 'OpenRouter', 'TiDB Cloud', 'Fullstack'], link: 'ai.reihan.online' },
      { img: 'reya-reihan.png', year: '2026', cat: 'AI Vision & Voice', title: 'REYA — Robot AI & Gesture Music', desc: 'Robot AI lokal interaktif dengan suara Bahasa Indonesia, percakapan suara cepat OpenRouter AI, dan integrasi kamera computer vision untuk bermain musik via gesture tangan.', tags: ['Computer Vision', 'Hand Gesture', 'AI Voice', 'Web Audio'], link: 'reya.reihan.online' }
    ]
  },
  {
    slideNum: 6,
    subtitle: 'Enterprise Data & Cleansing Tools',
    projects: [
      { img: 'filter-sakti.png', year: '2026', cat: 'Data Cleansing', title: 'Filter Sakti — Data Cleansing Tool', desc: 'Tools cleansing dan deduplikasi data otomatis untuk format WSA, MODOROSO, dan WAPPR dengan integrasi real-time Google Sheets (5.600+ baris), upload file .xlsx/.csv, dan filter per bulan.', tags: ['Data Cleansing', 'Google Sheets API', 'Excel', 'Deduplikasi'], link: 'filter-sakti.vercel.app' },
      { img: 'ebis-telkom.png', year: '2026', cat: 'Enterprise Tool', title: 'Filter Sakti EBIS — Telkom Tracker', desc: 'Sistem analisis dan filtering data EBIS Telkom dari xpro.telkom.co.id (.xls/.txt/.csv), dilengkapi tracker penugasan teknisi dan export data hasil deduplikasi.', tags: ['Telkom EBIS', 'Data Analysis', 'Web App', 'Excel Tracker'], link: 'ebis-telkom.vercel.app' }
    ]
  },
  {
    slideNum: 7,
    subtitle: 'Web Audio Engineering & Rhythm Gaming',
    projects: [
      { img: 'musik-reihan.png', year: '2026', cat: 'Web Rhythm Game', title: 'RIFF//LAB — Browser Rhythm Game', desc: 'Game musik ritme 5-fret (Guitar Hero style) langsung di browser tanpa instalasi. Dilengkapi akses katalog cloud Chorus 120.000+ lagu, import .sng/.zip, leaderboard, dan real-time multiplayer.', tags: ['Web Audio API', 'Rhythm Engine', 'Multiplayer', 'Leaderboard'], link: 'musik.reihan.online' },
      { img: 'metadata-reihan.png', year: '2026', cat: 'Audio Engineering', title: 'SoundTools MetaStudio', desc: 'Browser-based audio metadata & cover art editor 100% client-side tanpa upload server. Mendukung ID3v2.3, Vorbis, FLAC, M4A, WAV, dan OGG dengan lossless stream copy injection dan batch editing.', tags: ['Audio Metadata', 'ID3v2/Vorbis', 'Client-Side', 'Lossless Copy'], link: 'metadata.reihan.online' }
    ]
  },
  {
    slideNum: 8,
    subtitle: 'Healthcare Enterprise & Digital Invitation',
    projects: [
      { img: 'shl-mu.png', year: '2026', cat: 'Healthcare App', title: 'RS SHL — Sistem Absensi Digital', desc: 'Sistem absensi digital dan presensi pegawai Rumah Sakit SHL dengan verifikasi ID pegawai terenkripsi, alur check-in/check-out terstruktur, dan dashboard manajemen kehadiran.', tags: ['Enterprise App', 'Healthcare', 'Absensi Digital', 'Auth'], link: 'shl-mu.vercel.app' },
      { img: 'shevaangel.png', year: '2026', cat: 'Digital Invitation', title: 'The Wedding of Sheva & Angel', desc: 'Platform undangan pernikahan digital interaktif dan responsif dengan buku tamu digital, amplop digital/rekening, reservasi kehadiran, background music, dan animasi interaktif.', tags: ['Digital Invitation', 'Interactive Web', 'UI/UX', 'Animation'], link: 'shevaangel.vercel.app' }
    ]
  },
  {
    slideNum: 9,
    subtitle: 'Augmented Reality & Game Edukasi 3D',
    projects: [
      { img: 'ar-book.png', year: '2024', cat: 'Edukasi AR', title: 'AR Book — Dasar Komputer', desc: 'Aplikasi Android berbasis Augmented Reality yang menghubungkan buku modul fisik dengan visualisasi 3D perangkat keras & lunak komputer secara real-time untuk pembelajaran interaktif.', tags: ['Unity 3D', 'C#', 'Vuforia AR', 'Android SDK'] },
      { img: 'petualangan-barudak.png', year: '2024', cat: 'Game Edukasi 3D', title: 'Petualangan Barudak', desc: 'Game eksplorasi edukatif Provinsi Banten yang memadukan pengenalan budaya lokal, kuis interaktif, dan pembelajaran matematika bangun ruang melalui rekonstruksi visual bangunan nyata.', tags: ['Unity', 'C#', '3D Level Design', 'Game Physics'] }
    ]
  },
  {
    slideNum: 10,
    subtitle: 'Live-Photo AR & Game Literasi',
    projects: [
      { img: 'relife-ar.png', year: '2025', cat: 'Live-Photo AR', title: 'ReLive AR', desc: 'Aplikasi AR berbasis pengenalan citra instan yang memindai foto statis (album/poster) dan mentransformasikannya menjadi tayangan video live-action serta animasi berlapis di smartphone.', tags: ['Unity', 'Image Target AR', 'Mobile UI', 'Video Player'] },
      { img: 'penyusun-kata.png', year: '2025', cat: 'Game Literasi', title: 'Game Edukasi Penyusun Kata', desc: 'Permainan edukasi interaktif untuk melatih literasi, pembendaharaan kosakata, dan ketangkasan kognitif siswa dengan menyusun karakter huruf acak berdasarkan visual clue dan audio penjelas.', tags: ['Unity 2D', 'C#', 'Audio System', 'Educational Logic'] }
    ]
  },
  {
    slideNum: 11,
    subtitle: 'Web CMS, E-Commerce & HR System',
    projects: [
      { img: '42-berita-kita.png', year: '2024', cat: 'Portal Berita', title: '42 Berita Kita', desc: 'Portal berita web responsif dengan manajemen konten dinamis, sistem kategori multi-level, panel administrasi redaksi, dan integrasi database untuk publikasi artikel real-time.', tags: ['Web Fullstack', 'PHP / MySQL', 'CMS Dashboard', 'SEO Friendly'], link: 'berita.42web.io' },
      { img: 'ecommerce.png', year: '2023', cat: 'Toko Online', title: 'Platform E-Commerce & Katalog Produk', desc: 'Sistem penjualan digital dengan katalog interaktif, filter kategori, keranjang belanja, checkout notifikasi WhatsApp, serta dashboard admin untuk pengelolaan stok dan pesanan.', tags: ['E-Commerce Engine', 'Cart & Checkout', 'Stock Management', 'UI/UX'] }
    ]
  }
];

projectSlideData.forEach((ps) => {
  const slide = pptx.addSlide();
  slide.background = { color: C.ink };

  slide.addShape(RECT, { x: 0, y: 0, w: 13.33, h: 0.06, fill: { color: C.yellow } });
  slide.addShape(RECT, { x: 0.4, y: 0.15, w: 1.8, h: 0.28, fill: { color: C.orange }, line: { color: C.orange } });
  slide.addText('KARYA PILIHAN', { x: 0.4, y: 0.15, w: 1.8, h: 0.28, fontSize: 7, bold: true, color: C.white, align: 'center', fontFace: F.body, charSpacing: 1 });
  slide.addText(ps.subtitle, { x: 2.4, y: 0.15, w: 10.5, h: 0.28, fontSize: 9, color: C.muted, fontFace: F.body, valign: 'middle' });

  ps.projects.forEach((proj, pi) => {
    const x = pi === 0 ? 0.4 : 7.0;
    const w = 6.0;

    slide.addShape(RECT, { x, y: 0.6, w, h: 6.6, fill: { color: C.cardDk }, line: { color: C.borderDk, pt: 1 } });

    const imgData = img(proj.img);
    if (imgData) {
      slide.addImage({ data: imgData, x: x, y: 0.6, w, h: 3.2, sizing: { type: 'cover', w, h: 3.2 } });
    }

    slide.addShape(RECT, { x: x + w - 0.75, y: 0.75, w: 0.65, h: 0.28, fill: { color: '1A1A1A' }, line: { color: '000000' } });
    slide.addText(proj.year, { x: x + w - 0.75, y: 0.75, w: 0.65, h: 0.28, fontSize: 8, color: C.white, align: 'center', fontFace: F.mono });

    slide.addShape(RECT, { x: x + 0.1, y: 0.75, w: 1.5, h: 0.28, fill: { color: C.orange }, line: { color: C.orange } });
    slide.addText(proj.cat, { x: x + 0.1, y: 0.75, w: 1.5, h: 0.28, fontSize: 7, color: C.white, align: 'center', fontFace: F.body, bold: true });

    const cy = 3.9;
    slide.addText(proj.title, { x: x + 0.2, y: cy, w: w - 0.4, h: 0.5, fontSize: 13, bold: true, color: C.white, fontFace: F.heading, lineSpacingMultiple: 1.1 });
    slide.addText(proj.desc, { x: x + 0.2, y: cy + 0.55, w: w - 0.4, h: 1.5, fontSize: 8.8, color: 'A09890', fontFace: F.body, lineSpacingMultiple: 1.35 });

    let tx = x + 0.2;
    let ty = cy + 2.15;
    proj.tags.forEach(tag => {
      const tw = Math.min(tag.length * 0.074 + 0.2, 2.5);
      slide.addShape(RECT, { x: tx, y: ty, w: tw, h: 0.27, fill: { color: '2D2D2D' }, line: { color: '3D3D3D', pt: 1 } });
      slide.addText(tag, { x: tx, y: ty, w: tw, h: 0.27, fontSize: 7.5, color: 'D0C8C0', align: 'center', fontFace: F.body });
      tx += tw + 0.1;
      if (tx > x + w - 0.4) { tx = x + 0.2; ty += 0.35; }
    });

    if (proj.link) {
      slide.addText(`🔗 ${proj.link}`, { x: x + 0.2, y: 6.9, w: w - 0.4, h: 0.25, fontSize: 8, color: C.yellow, fontFace: F.body, hyperlink: { url: `https://${proj.link}` } });
    }
  });

  addPageNum(slide, ps.slideNum);
});

// ──────────────────────────────────────────────
// SLIDE 12 – PENDIDIKAN & KREDENSIAL
// ──────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: C.paper };
  topBar(slide, 'PENDIDIKAN');

  slide.addText('Latar belakang akademis\n& kepemimpinan terstruktur.', {
    x: 0.4, y: 0.6, w: 12.5, h: 1.3,
    fontSize: 26, bold: true, color: C.ink, fontFace: F.heading, lineSpacingMultiple: 1.2
  });

  slide.addShape(RECT, { x: 0.4, y: 1.95, w: 12.5, h: 0.015, fill: { color: C.ink } });

  const creds = [
    { label: 'Pendidikan Tinggi & Bahasa', title: 'Universitas Bina Bangsa', sub: 'S1 Pendidikan Teknologi Informasi · 2020–2024', highlight: '★ IPK 3,96 / 4,00 (Lulusan Terbaik) · TOEFL Score 550', color: C.orange },
    { label: 'Pendidikan Vokasi', title: 'SMKN 1 Pandeglang', sub: 'Teknik Komputer dan Jaringan (TKJ) · 2017–2020', highlight: '✓ Dasar kuat arsitektur komputer, hardware, jaringan & troubleshooting', color: C.ink },
    { label: 'Organisasi Kampus', title: 'Himpunan Mahasiswa PTI', sub: 'Wakil Ketua (2022–2023) · Ketua Divisi IT (2021–2022)', highlight: 'Memimpin tim teknis & workshop IT untuk 200+ peserta', color: C.ink },
    { label: 'Kontribusi Komunitas', title: 'Inovasi Teknologi Pendidikan ID', sub: 'Kontributor Aplikasi Digital (2025–2026)', highlight: 'Pengembangan aplikasi digital dan pengelolaan e-learning', color: C.ink },
  ];

  creds.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.4 + col * 6.4;
    const y = 2.15 + row * 2.35;
    const w = 6.0;

    slide.addShape(RECT, { x, y, w, h: 2.1, fill: { color: C.white }, line: { color: C.paperDk, pt: 1 } });
    slide.addShape(RECT, { x, y, w: 0.08, h: 2.1, fill: { color: c.color } });

    slide.addText(c.label, { x: x + 0.2, y: y + 0.12, w: w - 0.3, h: 0.25, fontSize: 7.5, color: C.orange, fontFace: F.body, bold: true, charSpacing: 0.5 });
    slide.addText(c.title, { x: x + 0.2, y: y + 0.38, w: w - 0.3, h: 0.38, fontSize: 13, bold: true, color: C.ink, fontFace: F.heading });
    slide.addText(c.sub, { x: x + 0.2, y: y + 0.8, w: w - 0.3, h: 0.3, fontSize: 9.5, color: C.muted, fontFace: F.body });
    slide.addText(c.highlight, { x: x + 0.2, y: y + 1.2, w: w - 0.3, h: 0.5, fontSize: 9.5, color: '047857', fontFace: F.body, bold: true, lineSpacingMultiple: 1.3 });
  });

  addPageNum(slide, 12);
}

// ──────────────────────────────────────────────
// SLIDE 13 – KONTAK (PENUTUP)
// ──────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.background = { color: C.ink };

  slide.addShape(RECT, { x: 0, y: 0, w: 13.33, h: 0.06, fill: { color: C.yellow } });

  slide.addText('Punya tantangan untuk diselesaikan?', {
    x: 0.6, y: 0.8, w: 12.1, h: 0.5,
    fontSize: 12, color: C.muted, fontFace: F.body, italic: true
  });

  slide.addText('Mari membuat sesuatu\nyang benar-benar berguna.', {
    x: 0.6, y: 1.3, w: 12.1, h: 2.2,
    fontSize: 40, bold: true, color: C.white, fontFace: F.heading, lineSpacingMultiple: 1.1
  });

  slide.addShape(RECT, { x: 0.6, y: 3.6, w: 12.1, h: 0.015, fill: { color: '333333' } });

  const contacts = [
    { icon: '✉', label: 'Email', val: 'reyhanmutakin1@gmail.com', href: 'mailto:reyhanmutakin1@gmail.com' },
    { icon: '📞', label: 'WhatsApp', val: '+62 821 1103 9958', href: 'https://wa.me/6282111039958' },
    { icon: '📍', label: 'Domisili', val: 'Pandeglang, Banten, Indonesia', href: null },
    { icon: '💼', label: 'LinkedIn', val: 'linkedin.com/in/reihan-mutaqin-351169201', href: 'https://www.linkedin.com/in/reihan-mutaqin-351169201/' },
    { icon: '🐙', label: 'GitHub', val: 'github.com/ReihanMutaqin', href: 'https://github.com/ReihanMutaqin' },
    { icon: '🌐', label: 'Website', val: 'reihan.online', href: 'https://www.reihan.online/' },
  ];

  contacts.forEach((c, i) => {
    const x = 0.6 + (i % 3) * 4.2;
    const y = 3.85 + Math.floor(i / 3) * 1.5;
    slide.addShape(RECT, { x, y, w: 3.9, h: 1.2, fill: { color: C.cardDk }, line: { color: C.borderDk, pt: 1 } });
    slide.addText(`${c.icon}  ${c.label}`, { x: x + 0.15, y: y + 0.1, w: 3.6, h: 0.28, fontSize: 8, color: C.orange, fontFace: F.body, bold: true });
    if (c.href) {
      slide.addText(c.val, { x: x + 0.15, y: y + 0.42, w: 3.6, h: 0.55, fontSize: 10, color: C.white, fontFace: F.body, lineSpacingMultiple: 1.2, hyperlink: { url: c.href } });
    } else {
      slide.addText(c.val, { x: x + 0.15, y: y + 0.42, w: 3.6, h: 0.55, fontSize: 10, color: C.white, fontFace: F.body, lineSpacingMultiple: 1.2 });
    }
  });

  slide.addText('© 2026 Reihan Mutaqin  ·  reihan.online', {
    x: 0.6, y: 7.0, w: 12.1, h: 0.3,
    fontSize: 8, color: C.muted, fontFace: F.body, align: 'center'
  });

  addPageNum(slide, 13);
}

// ──────────────────────────────────────────────
// SAVE
// ──────────────────────────────────────────────
console.log('Saving PowerPoint file with 13 slides and 17 projects...');
await pptx.writeFile({ fileName: outPath });

const size = fs.statSync(outPath).size;
console.log(`\nSUCCESS: PowerPoint generated!`);
console.log(`File : ${outPath}`);
console.log(`Size : ${Math.round(size / 1024)} KB  (${(size / 1024 / 1024).toFixed(2)} MB)`);
console.log(`Slides: 13 slides covering all 17 projects`);
