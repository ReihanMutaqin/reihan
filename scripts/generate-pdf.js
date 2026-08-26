import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Helper to convert image file to base64 data URI
function getBase64Image(relativePath) {
  const fullPath = path.join(projectRoot, 'public', relativePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}`);
    return '';
  }
  const ext = path.extname(fullPath).toLowerCase();
  const mimeType = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.svg' ? 'image/svg+xml' : 'image/png';
  const data = fs.readFileSync(fullPath).toString('base64');
  return `data:${mimeType};base64,${data}`;
}

const photoProfile = getBase64Image('images/reihan-mutaqin.png');
const photoSpeaking = getBase64Image('images/reihan-speaking.jpg');
const photoTeaching = getBase64Image('images/reihan-teaching.jpg');

// 17 Projects images
const imgAiReihan = getBase64Image('images/ai-reihan.png');
const imgFilterSakti = getBase64Image('images/filter-sakti.png');
const imgEbisTelkom = getBase64Image('images/ebis-telkom.png');
const imgReya = getBase64Image('images/reya-reihan.png');
const imgMetadata = getBase64Image('images/metadata-reihan.png');
const imgMusik = getBase64Image('images/musik-reihan.png');
const imgShl = getBase64Image('images/shl-mu.png');
const imgHr = getBase64Image('images/hr-rei219.png');
const imgSheva = getBase64Image('images/shevaangel.png');

const imgArBook = getBase64Image('images/ar-book.png');
const imgPetualangan = getBase64Image('images/petualangan-barudak.png');
const imgRelive = getBase64Image('images/relife-ar.png');
const imgPenyusunKata = getBase64Image('images/penyusun-kata.png');
const imgBerita = getBase64Image('images/42-berita-kita.png');
const imgDesa = getBase64Image('images/informasi-desa.png');
const imgEcommerce = getBase64Image('images/ecommerce.png');
const imgUrangIT = getBase64Image('images/urang-it.png');

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Portofolio - Reihan Mutaqin</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');

    @page {
      size: A4 portrait;
      margin: 10mm 12mm 10mm 12mm;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #f7f5f0;
      color: #171717;
      font-size: 9.2pt;
      line-height: 1.45;
    }

    .page {
      position: relative;
      width: 100%;
      page-break-after: always;
      min-height: 277mm;
      padding-bottom: 8mm;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #171717;
      padding-bottom: 12px;
      margin-bottom: 14px;
    }

    .header-left {
      flex: 1;
      padding-right: 18px;
    }

    .brand-tag {
      display: inline-block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      background: #e8590c;
      color: #ffffff;
      padding: 3px 8px;
      border-radius: 3px;
      margin-bottom: 5px;
    }

    .name {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24pt;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: #111111;
      line-height: 1.1;
      margin-bottom: 3px;
    }

    .name span {
      color: #e8590c;
    }

    .title-sub {
      font-size: 10.5pt;
      font-weight: 600;
      color: #4b5563;
      margin-bottom: 9px;
    }

    .contact-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 7px 16px;
      font-size: 8.2pt;
      color: #2b2b2b;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .contact-item strong {
      color: #111;
    }

    .header-photo {
      width: 86px;
      height: 106px;
      border-radius: 6px;
      overflow: hidden;
      border: 2px solid #171717;
      box-shadow: 3px 3px 0px #171717;
      flex-shrink: 0;
      background: #151515;
    }

    .header-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }

    /* Stats Grid */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 9px;
      margin-bottom: 14px;
    }

    .stat-card {
      background: #ffffff;
      border: 1px solid #dcd7cc;
      border-left: 3.5px solid #e8590c;
      padding: 7px 11px;
      border-radius: 4px;
    }

    .stat-number {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 15pt;
      font-weight: 700;
      color: #111111;
      line-height: 1.1;
    }

    .stat-label {
      font-size: 7.2pt;
      font-weight: 600;
      color: #525252;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Section Headings */
    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 11pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      color: #111;
      border-bottom: 1.5px solid #171717;
      padding-bottom: 4px;
      margin-top: 14px;
      margin-bottom: 10px;
    }

    .section-title .badge-num {
      background: #171717;
      color: #fff;
      font-size: 7.5pt;
      padding: 1px 6px;
      border-radius: 2px;
    }

    /* Profile / Summary Layout */
    .profile-box {
      background: #ffffff;
      border: 1px solid #dcd7cc;
      border-radius: 5px;
      padding: 11px 14px;
      margin-bottom: 14px;
      font-size: 9pt;
      line-height: 1.5;
    }

    .profile-box strong {
      color: #0f172a;
    }

    /* Grid for Skills on Page 1 */
    .skills-grid-page1 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 12px;
    }

    .skill-card {
      background: #ffffff;
      border: 1px solid #dcd7cc;
      border-left: 3px solid #171717;
      border-radius: 4px;
      padding: 9px 12px;
    }

    .skill-title {
      font-size: 8.8pt;
      font-weight: 700;
      color: #111;
      margin-bottom: 5px;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }

    .tag {
      display: inline-block;
      font-size: 7pt;
      font-weight: 600;
      background: #f1ede4;
      color: #27272a;
      padding: 2px 6px;
      border-radius: 3px;
      border: 1px solid #ded8cc;
    }

    .tag-accent {
      background: #fed7aa;
      color: #9a3412;
      border-color: #fdba74;
    }

    /* Page 1 Value Pillars */
    .pillars-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 9px;
      margin-top: 10px;
    }

    .pillar-card {
      background: #ffffff;
      border: 1px solid #dcd7cc;
      border-radius: 4px;
      padding: 9px 11px;
    }

    .pillar-card h4 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 8.5pt;
      font-weight: 700;
      color: #c2410c;
      margin-bottom: 3px;
    }

    .pillar-card p {
      font-size: 7.8pt;
      color: #52525b;
      line-height: 1.35;
    }

    /* Experience Items on Page 2 */
    .exp-list-page2 {
      display: flex;
      flex-direction: column;
      gap: 11px;
      margin-bottom: 14px;
    }

    .exp-card-full {
      background: #ffffff;
      border: 1px solid #dcd7cc;
      border-left: 4px solid #e8590c;
      border-radius: 4px;
      padding: 10px 14px;
    }

    .exp-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;
    }

    .exp-role {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 10.5pt;
      font-weight: 700;
      color: #111;
    }

    .exp-period {
      font-size: 7.5pt;
      font-weight: 600;
      color: #71717a;
      background: #eae6dd;
      padding: 2px 7px;
      border-radius: 3px;
    }

    .exp-company {
      font-size: 9pt;
      font-weight: 600;
      color: #c2410c;
      margin-bottom: 4px;
    }

    .exp-desc {
      font-size: 8.2pt;
      color: #3f3f46;
      line-height: 1.4;
    }

    /* Activities / Photo row on Page 2 */
    .photo-activity-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 10px;
    }

    .photo-card {
      background: #fff;
      border: 1px solid #dcd7cc;
      border-radius: 5px;
      overflow: hidden;
    }

    .photo-card img {
      width: 100%;
      height: 110px;
      object-fit: cover;
      display: block;
    }

    .photo-caption {
      padding: 6px 10px;
      font-size: 7.5pt;
      font-weight: 600;
      color: #4b5563;
      background: #faf8f5;
      border-top: 1px solid #eee;
    }

    /* Projects Grid */
    .projects-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 11px;
      margin-top: 6px;
    }

    .project-card {
      background: #ffffff;
      border: 1px solid #dcd7cc;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      break-inside: avoid;
    }

    .project-image-wrap {
      width: 100%;
      height: 106px;
      background: #1c1917;
      position: relative;
      overflow: hidden;
      border-bottom: 1px solid #e5e5e5;
    }

    .project-image-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
    }

    .project-year-badge {
      position: absolute;
      top: 5px;
      right: 5px;
      background: rgba(23, 23, 23, 0.85);
      color: #ffffff;
      font-size: 7pt;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 3px;
      backdrop-filter: blur(4px);
    }

    .project-category-badge {
      position: absolute;
      top: 5px;
      left: 5px;
      background: #e8590c;
      color: #ffffff;
      font-size: 6.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      padding: 2px 6px;
      border-radius: 3px;
    }

    .project-body {
      padding: 9px 10px 10px;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
    }

    .project-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 9.8pt;
      font-weight: 700;
      color: #111;
      line-height: 1.25;
      margin-bottom: 4px;
    }

    .project-desc {
      font-size: 7.8pt;
      color: #4b5563;
      line-height: 1.35;
      margin-bottom: 7px;
      flex: 1;
    }

    .project-footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
    }

    .tech-pill {
      font-size: 6.8pt;
      font-weight: 600;
      background: #f1ede4;
      color: #18181b;
      padding: 1.5px 5px;
      border-radius: 2px;
      border: 1px solid #ded8cc;
    }

    .project-link-badge {
      font-size: 6.8pt;
      font-weight: 700;
      color: #e8590c;
      text-decoration: none;
    }

    /* Credentials & Education on Page 6 */
    .edu-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 9px;
      margin-bottom: 10px;
    }

    .edu-card {
      background: #ffffff;
      border: 1px solid #dcd7cc;
      border-left: 3.5px solid #171717;
      padding: 9px 11px;
      border-radius: 4px;
    }

    .edu-label {
      font-size: 7pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #c2410c;
      margin-bottom: 2px;
    }

    .edu-title {
      font-size: 9.2pt;
      font-weight: 700;
      color: #111;
    }

    .edu-sub {
      font-size: 8pt;
      color: #52525b;
      margin-top: 1px;
    }

    .edu-highlight {
      font-size: 7.8pt;
      font-weight: 600;
      color: #047857;
      margin-top: 2px;
    }

    /* Footer Call To Action */
    .cta-box {
      background: #171717;
      color: #f7f5f0;
      border-radius: 6px;
      padding: 13px 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }

    .cta-text h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 11pt;
      font-weight: 700;
      color: #f2c94c;
      margin-bottom: 2px;
    }

    .cta-text p {
      font-size: 8pt;
      color: #d4d4d4;
    }

    .cta-links {
      display: flex;
      gap: 8px;
    }

    .cta-button {
      display: inline-block;
      background: #e8590c;
      color: #ffffff;
      font-size: 8pt;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 4px;
      text-decoration: none;
    }

    .page-number-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      font-size: 7pt;
      color: #888;
      border-top: 1px solid #ddd;
      padding-top: 4px;
    }
  </style>
</head>
<body>

  <!-- ==================== HALAMAN 1: IDENTITAS, PROFIL & KEAHLIAN ==================== -->
  <div class="page">
    <div class="header">
      <div class="header-left">
        <div class="brand-tag">PORTOFOLIO PROFESIONAL 2026</div>
        <h1 class="name">REIHAN MUTAQIN<span>.</span></h1>
        <div class="title-sub">Operasional TI · Software Development · Edukasi</div>
        <div class="contact-bar">
          <div class="contact-item"><strong>Email:</strong> reyhanmutakin1@gmail.com</div>
          <div class="contact-item"><strong>WhatsApp:</strong> +62 821 1103 9958</div>
          <div class="contact-item"><strong>Domisili:</strong> Pandeglang, Banten, ID</div>
          <div class="contact-item"><strong>LinkedIn:</strong> in/reihan-mutaqin-351169201</div>
          <div class="contact-item"><strong>GitHub:</strong> github.com/ReihanMutaqin</div>
          <div class="contact-item"><strong>Web:</strong> reihan.online</div>
        </div>
      </div>
      <div class="header-photo">
        <img src="${photoProfile}" alt="Reihan Mutaqin">
      </div>
    </div>

    <!-- STATS -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-number">3,96</div>
        <div class="stat-label">IPK dari 4,00 (Lulusan Terbaik)</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">17+</div>
        <div class="stat-label">Proyek Unggulan Terverifikasi</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">2022</div>
        <div class="stat-label">Pengembang Mandiri / Freelance</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">550</div>
        <div class="stat-label">Skor TOEFL Institusional</div>
      </div>
    </div>

    <!-- PROFIL RINGKAS -->
    <div class="profile-box">
      <strong>Ringkasan Profesional:</strong> Lulusan <strong>Pendidikan Teknologi Informasi Universitas Bina Bangsa</strong> dengan predikat <em>Lulusan Terbaik Program Studi (IPK 3,96/4,00)</em>. Memiliki portofolio luas yang mencakup <strong>tools operasional TI & rekonsiliasi data skala enterprise</strong>, <strong>platform AI canggih (Rdir AI, REYA)</strong>, <strong>aplikasi web & audio engineering</strong>, <strong>Augmented Reality & game edukasi</strong>, serta <strong>edukasi dan transfer keahlian teknologi</strong>. Terbiasa mengelola siklus penuh dari kebutuhan, arsitektur, testing terstruktur, hingga deployment cloud & pemeliharaan.
    </div>

    <!-- MATRIKS KEAHLIAN LENGKAP -->
    <div class="section-title">
      <span class="badge-num">01</span> Matriks Keahlian & Arsitektur Teknologi
    </div>

    <div class="skills-grid-page1">
      <div class="skill-card">
        <div class="skill-title">AI, Computer Vision & Audio Engineering</div>
        <div class="skill-tags">
          <span class="tag tag-accent">OpenRouter AI Multi-Model</span>
          <span class="tag tag-accent">Hand Gesture Vision</span>
          <span class="tag">Web Audio API</span>
          <span class="tag">ID3v2 & Vorbis Metadata</span>
          <span class="tag">Speech Synthesis (TTS)</span>
          <span class="tag">TiDB Cloud Database</span>
        </div>
      </div>

      <div class="skill-card">
        <div class="skill-title">Operasional TI, Cleansing Data & Enterprise</div>
        <div class="skill-tags">
          <span class="tag tag-accent">Data Cleansing & Deduplikasi</span>
          <span class="tag tag-accent">Google Sheets API Realtime</span>
          <span class="tag">WSA / MODOROSO / WAPPR</span>
          <span class="tag">Order Tracker (WOC/ROC)</span>
          <span class="tag">Excel / CSV Automated Processing</span>
        </div>
      </div>

      <div class="skill-card">
        <div class="skill-title">Fullstack Web Development & Modern UI</div>
        <div class="skill-tags">
          <span class="tag tag-accent">React / TypeScript</span>
          <span class="tag">Tailwind CSS</span>
          <span class="tag">Node.js / Express</span>
          <span class="tag">PHP & MySQL</span>
          <span class="tag">CMS & E-Commerce</span>
          <span class="tag">Vercel & Cloudflare Deployment</span>
        </div>
      </div>

      <div class="skill-card">
        <div class="skill-title">Game Development, AR & Edukasi</div>
        <div class="skill-tags">
          <span class="tag tag-accent">Unity 3D / 2D</span>
          <span class="tag">C# Scripting</span>
          <span class="tag">Vuforia AR Engine</span>
          <span class="tag">Android App Build</span>
          <span class="tag">Penyusunan Modul Ajar</span>
          <span class="tag">Public Speaking</span>
        </div>
      </div>
    </div>

    <!-- NILAI TAMBAH & PENDEKATAN KERJA -->
    <div class="pillars-row">
      <div class="pillar-card">
        <h4>Ketelitian Operasional</h4>
        <p>Terbiasa menangani ribuan baris data, rekonsiliasi sistem, dan otomasi alur kerja untuk efisiensi maksimal.</p>
      </div>
      <div class="pillar-card">
        <h4>Pengembangan Modern</h4>
        <p>Membangun solusi digital responsif, interaktif, berbasis AI dan cloud dengan standar kualitas tinggi.</p>
      </div>
      <div class="pillar-card">
        <h4>Komunikasi & Edukasi</h4>
        <p>Mampu menerjemahkan konsep teknis kompleks menjadi modul pembelajaran dan penjelasan yang mudah dipahami.</p>
      </div>
    </div>

    <div class="page-number-footer">
      <span>Portofolio Reihan Mutaqin · Operasional TI, AI & Software Development</span>
      <span>Halaman 1 dari 6</span>
    </div>
  </div>

  <!-- ==================== HALAMAN 2: PENGALAMAN KERJA & REKAM JEJAK ==================== -->
  <div class="page">
    <div class="section-title" style="margin-top: 4px;">
      <span class="badge-num">02</span> Pengalaman Kerja & Rekam Jejak Profesional
    </div>

    <div class="exp-list-page2">
      <!-- Exp 1 -->
      <div class="exp-card-full">
        <div class="exp-header">
          <span class="exp-role">Representative District Southern</span>
          <span class="exp-period">Jul 2026 — Sekarang</span>
        </div>
        <div class="exp-company">PT Telkom Indonesia</div>
        <div class="exp-desc">
          Menjalankan fungsi perwakilan operasional, koordinasi layanan telekomunikasi di District Southern, pemantauan performa jaringan, rekonsiliasi data pelanggan lintas sistem, dan penanganan isu operasional lapangan.
        </div>
      </div>

      <!-- Exp 2 -->
      <div class="exp-card-full">
        <div class="exp-header">
          <span class="exp-role">Agent</span>
          <span class="exp-period">Nov 2025 — Jun 2026</span>
        </div>
        <div class="exp-company">PT Telkom Indonesia</div>
        <div class="exp-desc">
          Merekonsiliasi data jaringan dan layanan antara UIM dengan data pelanggan untuk menjaga akurasi 100%. Memantau serta menindaklanjuti order alur WOC, organic, C4, GDoc, dan ROC. Mengembangkan automated data cleansing and filtering tools untuk mempercepat pelaporan operasional harian.
        </div>
      </div>

      <!-- Exp 2 -->
      <div class="exp-card-full">
        <div class="exp-header">
          <span class="exp-role">Pengajar Informatika</span>
          <span class="exp-period">Jul — Des 2025</span>
        </div>
        <div class="exp-company">Ganesha Operation</div>
        <div class="exp-desc">
          Menyusun modul ajar, menyampaikan konsep informatika, algoritma pemrograman, dan literasi digital kepada siswa. Mendampingi sesi latihan praktik dan melakukan evaluasi pemahaman siswa secara berkala.
        </div>
      </div>

      <!-- Exp 3 -->
      <div class="exp-card-full">
        <div class="exp-header">
          <span class="exp-role">Freelance App, Game & Web Developer</span>
          <span class="exp-period">Okt 2022 — Sekarang</span>
        </div>
        <div class="exp-company">Mandiri / Klien Profesional</div>
        <div class="exp-desc">
          Mengembangkan platform web AI (Rdir Studio, REYA), browser rhythm game, audio metadata engineering tools, aplikasi Augmented Reality berbasis Unity, game edukasi, serta sistem CMS berita & e-commerce terintegrasi.
        </div>
      </div>

      <!-- Exp 4 -->
      <div class="exp-card-full">
        <div class="exp-header">
          <span class="exp-role">Pengajar Magang</span>
          <span class="exp-period">Feb — Mar 2024</span>
        </div>
        <div class="exp-company">SMKN 1 Pandeglang</div>
        <div class="exp-desc">
          Mengajar lebih dari dua kelas bidang Teknik Komputer dan Jaringan (TKJ) / Informatika, menyusun rancangan pembelajaran berbasis kurikulum, serta mengelola bimbingan praktikum perakitan dan konfigurasi jaringan.
        </div>
      </div>

      <!-- Exp 5 -->
      <div class="exp-card-full">
        <div class="exp-header">
          <span class="exp-role">Magang Divisi Media & TI</span>
          <span class="exp-period">Jul — Sep 2019</span>
        </div>
        <div class="exp-company">Diskominfo Pandeglang</div>
        <div class="exp-desc">
          Mengelola situs informasi publik dinas, membantu pemantauan keamanan wilayah di Gedung Pintar, serta mendokumentasikan dan mempublikasikan kegiatan instansi.
        </div>
      </div>
    </div>

    <div class="page-number-footer">
      <span>Portofolio Reihan Mutaqin · Operasional TI, AI & Software Development</span>
      <span>Halaman 2 dari 6</span>
    </div>
  </div>

  <!-- ==================== HALAMAN 3: AI PLATFORMS & ENTERPRISE TOOLS ==================== -->
  <div class="page">
    <div class="section-title" style="margin-top: 4px;">
      <span class="badge-num">03</span> Karya Pilihan: AI Platforms & Enterprise Data Tools
    </div>

    <div class="projects-container">
      <!-- Proyek 1: Rdir AI -->
      <div class="project-card">
        <div class="project-image-wrap">
          <img src="${imgAiReihan}" alt="Rdir Studio AI Workspace">
          <span class="project-category-badge">AI Platform</span>
          <span class="project-year-badge">2026</span>
        </div>
        <div class="project-body">
          <div class="project-title">Rdir Studio AI Workspace</div>
          <div class="project-desc">
            Web AI Workspace modern kelas dunia seperti Claude & Kimi dengan Live Code/View Preview, integrasi multi-model OpenRouter, database TiDB Cloud, dan sistem isolasi chat privat.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">AI Workspace</span>
              <span class="tech-pill">OpenRouter</span>
              <span class="tech-pill">TiDB Cloud</span>
            </div>
            <span class="project-link-badge">ai.reihan.online ↗</span>
          </div>
        </div>
      </div>

      <!-- Proyek 2: Filter Sakti -->
      <div class="project-card">
        <div class="project-image-wrap">
          <img src="${imgFilterSakti}" alt="Filter Sakti Data Cleansing">
          <span class="project-category-badge">Data Cleansing</span>
          <span class="project-year-badge">2026</span>
        </div>
        <div class="project-body">
          <div class="project-title">Filter Sakti — Data Cleansing Tool</div>
          <div class="project-desc">
            Tools cleansing dan deduplikasi data otomatis untuk format WSA, MODOROSO, dan WAPPR dengan integrasi real-time Google Sheets (5.600+ baris), upload file .xlsx/.csv, dan filter per bulan.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">Data Cleansing</span>
              <span class="tech-pill">Sheets API</span>
              <span class="tech-pill">Excel</span>
            </div>
            <span class="project-link-badge">filter-sakti.vercel.app ↗</span>
          </div>
        </div>
      </div>

      <!-- Proyek 3: EBIS Telkom -->
      <div class="project-card">
        <div class="project-image-wrap">
          <img src="${imgEbisTelkom}" alt="Filter Sakti EBIS Telkom">
          <span class="project-category-badge">Enterprise Tool</span>
          <span class="project-year-badge">2026</span>
        </div>
        <div class="project-body">
          <div class="project-title">Filter Sakti EBIS — Telkom Tracker</div>
          <div class="project-desc">
            Sistem analisis dan filtering data EBIS Telkom dari xpro.telkom.co.id (.xls/.txt/.csv), dilengkapi tracker penugasan teknisi dan export data hasil deduplikasi.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">Telkom EBIS</span>
              <span class="tech-pill">Data Analysis</span>
              <span class="tech-pill">Tracker</span>
            </div>
            <span class="project-link-badge">ebis-telkom.vercel.app ↗</span>
          </div>
        </div>
      </div>

      <!-- Proyek 4: RS SHL Absensi -->
      <div class="project-card">
        <div class="project-image-wrap">
          <img src="${imgShl}" alt="RS SHL Absensi Digital">
          <span class="project-category-badge">Healthcare Web</span>
          <span class="project-year-badge">2026</span>
        </div>
        <div class="project-body">
          <div class="project-title">RS SHL — Sistem Absensi Digital</div>
          <div class="project-desc">
            Sistem absensi digital dan presensi pegawai Rumah Sakit SHL dengan verifikasi ID pegawai terenkripsi, alur check-in/check-out terstruktur, dan dashboard manajemen kehadiran.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">Enterprise App</span>
              <span class="tech-pill">Healthcare</span>
              <span class="tech-pill">Auth</span>
            </div>
            <span class="project-link-badge">shl-mu.vercel.app ↗</span>
          </div>
        </div>
      </div>
    </div>

    <div class="page-number-footer">
      <span>Portofolio Reihan Mutaqin · Operasional TI, AI & Software Development</span>
      <span>Halaman 3 dari 6</span>
    </div>
  </div>

  <!-- ==================== HALAMAN 4: CREATIVE AI, MUSIC & AUDIO ==================== -->
  <div class="page">
    <div class="section-title" style="margin-top: 4px;">
      <span class="badge-num">04</span> Karya Pilihan: Creative AI, Music & Audio Engineering
    </div>

    <div class="projects-container">
      <!-- Proyek 5: REYA -->
      <div class="project-card">
        <div class="project-image-wrap">
          <img src="${imgReya}" alt="REYA Robot AI">
          <span class="project-category-badge">AI Vision & Voice</span>
          <span class="project-year-badge">2026</span>
        </div>
        <div class="project-body">
          <div class="project-title">REYA — Robot AI & Gesture Music</div>
          <div class="project-desc">
            Robot AI lokal interaktif dengan suara cute Bahasa Indonesia, percakapan suara cepat OpenRouter AI, dan integrasi kamera computer vision untuk memainkan musik instrumen melalui gesture tangan.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">Computer Vision</span>
              <span class="tech-pill">Gesture Music</span>
              <span class="tech-pill">Voice AI</span>
            </div>
            <span class="project-link-badge">reya.reihan.online ↗</span>
          </div>
        </div>
      </div>

      <!-- Proyek 6: RIFF//LAB -->
      <div class="project-card">
        <div class="project-image-wrap">
          <img src="${imgMusik}" alt="RIFF LAB Rhythm Game">
          <span class="project-category-badge">Web Rhythm Game</span>
          <span class="project-year-badge">2026</span>
        </div>
        <div class="project-body">
          <div class="project-title">RIFF//LAB — Browser Rhythm Game</div>
          <div class="project-desc">
            Game musik ritme 5-fret (Guitar Hero style) langsung di browser tanpa instalasi. Dilengkapi akses katalog cloud Chorus 120.000+ lagu, import .sng/.zip, leaderboard, dan real-time multiplayer.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">Web Audio API</span>
              <span class="tech-pill">Rhythm Engine</span>
              <span class="tech-pill">Multiplayer</span>
            </div>
            <span class="project-link-badge">musik.reihan.online ↗</span>
          </div>
        </div>
      </div>

      <!-- Proyek 7: SoundTools MetaStudio -->
      <div class="project-card">
        <div class="project-image-wrap">
          <img src="${imgMetadata}" alt="SoundTools MetaStudio">
          <span class="project-category-badge">Audio Engineering</span>
          <span class="project-year-badge">2026</span>
        </div>
        <div class="project-body">
          <div class="project-title">SoundTools MetaStudio</div>
          <div class="project-desc">
            Browser-based audio metadata & cover art editor 100% client-side tanpa upload server. Mendukung ID3v2.3, Vorbis, FLAC, M4A, WAV, dan OGG dengan lossless stream copy injection dan batch editing.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">ID3 / Vorbis</span>
              <span class="tech-pill">Client-Side</span>
              <span class="tech-pill">Lossless</span>
            </div>
            <span class="project-link-badge">metadata.reihan.online ↗</span>
          </div>
        </div>
      </div>

      <!-- Proyek 8: Sheva & Angel -->
      <div class="project-card">
        <div class="project-image-wrap">
          <img src="${imgSheva}" alt="The Wedding of Sheva and Angel">
          <span class="project-category-badge">Digital Invitation</span>
          <span class="project-year-badge">2026</span>
        </div>
        <div class="project-body">
          <div class="project-title">The Wedding of Sheva & Angel</div>
          <div class="project-desc">
            Platform undangan pernikahan digital interaktif dan responsif dengan buku tamu digital, amplop digital/rekening, reservasi kehadiran, background music, dan animasi interaktif.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">Interactive Web</span>
              <span class="tech-pill">Guestbook</span>
              <span class="tech-pill">UI/UX</span>
            </div>
            <span class="project-link-badge">shevaangel.vercel.app ↗</span>
          </div>
        </div>
      </div>
    </div>

    <div class="page-number-footer">
      <span>Portofolio Reihan Mutaqin · Operasional TI, AI & Software Development</span>
      <span>Halaman 4 dari 6</span>
    </div>
  </div>

  <!-- ==================== HALAMAN 5: AR & GAME EDUKASI ==================== -->
  <div class="page">
    <div class="section-title" style="margin-top: 4px;">
      <span class="badge-num">05</span> Karya Pilihan: Augmented Reality & Game Edukasi
    </div>

    <div class="projects-container">
      <!-- Proyek 9: AR Book -->
      <div class="project-card">
        <div class="project-image-wrap">
          <img src="${imgArBook}" alt="AR Book Dasar Komputer">
          <span class="project-category-badge">Edukasi AR</span>
          <span class="project-year-badge">2024</span>
        </div>
        <div class="project-body">
          <div class="project-title">AR Book — Dasar Komputer</div>
          <div class="project-desc">
            Aplikasi Android berbasis Augmented Reality yang menghubungkan buku modul fisik dengan visualisasi 3D perangkat keras & lunak komputer secara real-time untuk pembelajaran interaktif.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">Unity 3D</span>
              <span class="tech-pill">C#</span>
              <span class="tech-pill">Vuforia AR</span>
              <span class="tech-pill">Android</span>
            </div>
            <span class="project-link-badge">Studi Proyek</span>
          </div>
        </div>
      </div>

      <!-- Proyek 10: Petualangan Barudak -->
      <div class="project-card">
        <div class="project-image-wrap">
          <img src="${imgPetualangan}" alt="Petualangan Barudak">
          <span class="project-category-badge">Game Edukasi 3D</span>
          <span class="project-year-badge">2024</span>
        </div>
        <div class="project-body">
          <div class="project-title">Petualangan Barudak</div>
          <div class="project-desc">
            Game eksplorasi edukatif Provinsi Banten yang memadukan pengenalan budaya lokal, kuis interaktif, dan pembelajaran matematika bangun ruang melalui rekonstruksi visual bangunan nyata.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">Unity</span>
              <span class="tech-pill">C#</span>
              <span class="tech-pill">3D Level</span>
              <span class="tech-pill">Physics</span>
            </div>
            <span class="project-link-badge">Studi Proyek</span>
          </div>
        </div>
      </div>

      <!-- Proyek 11: ReLive AR -->
      <div class="project-card">
        <div class="project-image-wrap">
          <img src="${imgRelive}" alt="ReLive AR">
          <span class="project-category-badge">Live-Photo AR</span>
          <span class="project-year-badge">2025</span>
        </div>
        <div class="project-body">
          <div class="project-title">ReLive AR</div>
          <div class="project-desc">
            Aplikasi AR berbasis pengenalan citra instan yang memindai foto statis (misal album/poster) dan mentransformasikannya menjadi tayangan video live-action serta animasi berlapis di smartphone.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">Unity</span>
              <span class="tech-pill">Image Target AR</span>
              <span class="tech-pill">Mobile UI</span>
            </div>
            <span class="project-link-badge">Studi Proyek</span>
          </div>
        </div>
      </div>

      <!-- Proyek 12: Game Penyusun Kata -->
      <div class="project-card">
        <div class="project-image-wrap">
          <img src="${imgPenyusunKata}" alt="Game Penyusun Kata">
          <span class="project-category-badge">Game Literasi</span>
          <span class="project-year-badge">2025</span>
        </div>
        <div class="project-body">
          <div class="project-title">Game Edukasi Penyusun Kata</div>
          <div class="project-desc">
            Permainan edukasi interaktif untuk melatih literasi, pembendaharaan kosakata, dan ketangkasan kognitif siswa dengan menyusun karakter huruf acak berdasarkan visual clue dan audio penjelas.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">Unity 2D</span>
              <span class="tech-pill">C#</span>
              <span class="tech-pill">Audio System</span>
            </div>
            <span class="project-link-badge">Studi Proyek</span>
          </div>
        </div>
      </div>
    </div>

    <div class="page-number-footer">
      <span>Portofolio Reihan Mutaqin · Operasional TI, AI & Software Development</span>
      <span>Halaman 5 dari 6</span>
    </div>
  </div>

  <!-- ==================== HALAMAN 6: WEB, ENTERPRISE, PENDIDIKAN & KONTAK ==================== -->
  <div class="page">
    <div class="section-title" style="margin-top: 4px;">
      <span class="badge-num">06</span> Web Platform, Enterprise HR & Kredensial
    </div>

    <div class="projects-container" style="margin-bottom: 8px;">
      <!-- Proyek 13: 42 Berita Kita -->
      <div class="project-card">
        <div class="project-image-wrap" style="height: 80px;">
          <img src="${imgBerita}" alt="42 Berita Kita">
          <span class="project-category-badge">Portal Berita</span>
          <span class="project-year-badge">2024</span>
        </div>
        <div class="project-body" style="padding: 6px 8px;">
          <div class="project-title" style="font-size: 8.8pt;">42 Berita Kita</div>
          <div class="project-desc" style="font-size: 7.2pt; margin-bottom: 4px;">
            Portal berita web responsif dengan manajemen konten dinamis, sistem kategori, dan panel administrasi publikasi.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">Web Fullstack</span>
              <span class="tech-pill">PHP/MySQL</span>
            </div>
            <span class="project-link-badge">berita.42web.io ↗</span>
          </div>
        </div>
      </div>

      <!-- Proyek 14: HR Portal -->
      <div class="project-card">
        <div class="project-image-wrap" style="height: 80px;">
          <img src="${imgHr}" alt="HR Portal & Management System">
          <span class="project-category-badge">HR & Enterprise</span>
          <span class="project-year-badge">2026</span>
        </div>
        <div class="project-body" style="padding: 6px 8px;">
          <div class="project-title" style="font-size: 8.8pt;">HR Portal & Management System</div>
          <div class="project-desc" style="font-size: 7.2pt; margin-bottom: 4px;">
            Platform HRIS terintegrasi dengan modul data karyawan terpusat, rekap kehadiran, dan reporting SDM.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">HRIS</span>
              <span class="tech-pill">Dashboard</span>
            </div>
            <a href="https://hr.reihan.online/" class="project-link-badge">hr.reihan.online ↗</a>
          </div>
        </div>
      </div>

      <!-- Proyek 15: Informasi Desa -->
      <div class="project-card">
        <div class="project-image-wrap" style="height: 80px;">
          <img src="${imgDesa}" alt="Informasi Desa">
          <span class="project-category-badge">Layanan Publik</span>
          <span class="project-year-badge">2023</span>
        </div>
        <div class="project-body" style="padding: 6px 8px;">
          <div class="project-title" style="font-size: 8.8pt;">Sistem Informasi Desa</div>
          <div class="project-desc" style="font-size: 7.2pt; margin-bottom: 4px;">
            Website pelayanan publik pemerintahan desa untuk transparansi anggaran, agenda warga, dan persuratan digital.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">Responsive Web</span>
              <span class="tech-pill">CMS</span>
            </div>
            <span class="project-link-badge">Studi Proyek</span>
          </div>
        </div>
      </div>

      <!-- Proyek 16: E-Commerce -->
      <div class="project-card">
        <div class="project-image-wrap" style="height: 80px;">
          <img src="${imgEcommerce}" alt="Platform E-Commerce">
          <span class="project-category-badge">Toko Online</span>
          <span class="project-year-badge">2023</span>
        </div>
        <div class="project-body" style="padding: 6px 8px;">
          <div class="project-title" style="font-size: 8.8pt;">Platform E-Commerce</div>
          <div class="project-desc" style="font-size: 7.2pt; margin-bottom: 4px;">
            Toko online dengan katalog, keranjang belanja, checkout notifikasi WhatsApp, dan manajemen stok produk.
          </div>
          <div class="project-footer-row">
            <div class="project-tech">
              <span class="tech-pill">E-Commerce</span>
              <span class="tech-pill">Checkout</span>
            </div>
            <span class="project-link-badge">Studi Proyek</span>
          </div>
        </div>
      </div>
    </div>

    <!-- PENDIDIKAN & KREDENSIAL -->
    <div class="section-title" style="margin-top: 6px; margin-bottom: 6px;">
      <span class="badge-num">07</span> Pendidikan Formal & Kredensial
    </div>

    <div class="edu-grid">
      <div class="edu-card">
        <div class="edu-label">Pendidikan Tinggi & Kemahiran Bahasa</div>
        <div class="edu-title">Universitas Bina Bangsa</div>
        <div class="edu-sub">S1 Pendidikan Teknologi Informasi (2020 – 2024)</div>
        <div class="edu-highlight">★ IPK 3,96 / 4,00 — Lulusan Terbaik Program Studi 2024<br>✓ TOEFL Pusat Bahasa Universitas Bina Bangsa · Skor 550</div>
      </div>

      <div class="edu-card">
        <div class="edu-label">Pendidikan Vokasi</div>
        <div class="edu-title">SMKN 1 Pandeglang</div>
        <div class="edu-sub">Teknik Komputer dan Jaringan (2017–2020)</div>
        <div class="edu-highlight">✓ Fondasi kuat arsitektur komputer, hardware, jaringan & troubleshooting</div>
      </div>
    </div>

    <!-- CALL TO ACTION BOX -->
    <div class="cta-box">
      <div class="cta-text">
        <h3>Mari Berkolaborasi atau Diskusikan Peluang Profesional</h3>
        <p>Terbuka untuk posisi Operasional TI, AI / Fullstack Web Development, dan Edukasi / Pelatihan Teknologi.</p>
      </div>
      <div class="cta-links">
        <a class="cta-button" href="mailto:reyhanmutakin1@gmail.com">Kirim Email</a>
        <a class="cta-button" style="background:#25d366;color:#fff;" href="https://wa.me/6282111039958">WhatsApp</a>
      </div>
    </div>

    <div class="page-number-footer">
      <span>Portofolio Reihan Mutaqin · Operasional TI, AI & Software Development</span>
      <span>Halaman 6 dari 6</span>
    </div>
  </div>

</body>
</html>
`;

// Write HTML file to temp location
const tempHtmlPath = path.join(projectRoot, '.tmp', 'portfolio-print.html');
const outputPdfPath = path.join(projectRoot, 'public', 'downloads', 'Portofolio-Reihan-Mutaqin.pdf');

fs.mkdirSync(path.dirname(tempHtmlPath), { recursive: true });
fs.mkdirSync(path.dirname(outputPdfPath), { recursive: true });
fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

console.log(`HTML template saved to: ${tempHtmlPath}`);

// Find available browser (Edge or Chrome)
const browserCandidates = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];

let browserPath = browserCandidates.find(p => fs.existsSync(p));

if (!browserPath) {
  console.error('No supported browser found for PDF generation.');
  process.exit(1);
}

console.log(`Using browser: ${browserPath}`);
console.log(`Generating PDF at: ${outputPdfPath}...`);

try {
  const fileUrl = `file:///${tempHtmlPath.replace(/\\/g, '/')}`;
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--print-to-pdf-no-header',
    `--print-to-pdf=${outputPdfPath}`,
    fileUrl
  ];

  execFileSync(browserPath, args, { stdio: 'inherit' });

  if (fs.existsSync(outputPdfPath)) {
    const stats = fs.statSync(outputPdfPath);
    console.log(`\nSUCCESS: PDF generated successfully!`);
    console.log(`File: ${outputPdfPath}`);
    console.log(`Size: ${(stats.size / 1024).toFixed(1)} KB`);
  } else {
    throw new Error('PDF output file was not created.');
  }
} catch (err) {
  console.error('Error generating PDF:', err);
  process.exit(1);
}
