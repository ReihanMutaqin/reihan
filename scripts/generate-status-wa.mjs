import puppeteer from 'puppeteer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const downloadsDir = path.resolve(projectRoot, 'public', 'downloads');

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

function getBase64Image(relPath) {
  const fullPath = path.resolve(projectRoot, relPath);
  if (!fs.existsSync(fullPath)) return '';
  const ext = path.extname(fullPath).slice(1);
  const data = fs.readFileSync(fullPath).toString('base64');
  return `data:image/${ext === 'svg' ? 'svg+xml' : ext};base64,${data}`;
}

const sinta3 = getBase64Image('public/images/sinta/sinta-3.png');
const sinta4 = getBase64Image('public/images/sinta/sinta-4.png');
const sinta5 = getBase64Image('public/images/sinta/sinta-5.png');
const fotoReihan = getBase64Image('public/images/reihan-mutaqin.png');

const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Publikasi Jurnal Ilmiah - Reihan Mutaqin</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=Cabinet+Grotesk:wght@800;900&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      width: 1080px;
      height: 1920px;
      background: #f7f5ee;
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #121212;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 90px 48px 100px;
    }

    /* Subtle graph paper background pattern */
    body::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(rgba(21, 21, 21, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(21, 21, 21, 0.04) 1px, transparent 1px);
      background-size: 32px 32px;
      pointer-events: none;
      z-index: 0;
    }

    .container {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-between;
    }

    /* Top Scholar Banner */
    .header-banner {
      background: #ffffff;
      border: 3px solid #121212;
      box-shadow: 7px 7px 0 #121212;
      padding: 28px 32px;
      margin-bottom: 24px;
      border-radius: 4px;
    }

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #121212;
      color: #ffffff;
      padding: 6px 14px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      margin-bottom: 14px;
      border-radius: 2px;
    }

    .profile-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      border-bottom: 2px dashed #e2e8f0;
      padding-bottom: 18px;
      margin-bottom: 18px;
    }

    .profile-info h1 {
      font-family: 'Cabinet Grotesk', 'Plus Jakarta Sans', sans-serif;
      font-size: 38px;
      font-weight: 900;
      letter-spacing: -0.04em;
      line-height: 1.1;
      color: #121212;
      margin-bottom: 4px;
    }

    .profile-info p {
      font-size: 16px;
      font-weight: 700;
      color: #e95d32;
    }

    .profile-avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      border: 3px solid #121212;
      object-fit: cover;
      background: #f2c94c;
      box-shadow: 3px 3px 0 #121212;
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
    }

    .stat-num {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: -0.03em;
      color: #121212;
      line-height: 1.1;
    }

    .stat-lbl {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #64748b;
      margin-top: 2px;
    }

    /* Section Title */
    .section-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .section-title h2 {
      font-family: 'Cabinet Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 900;
      letter-spacing: -0.03em;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-title h2::before {
      content: '';
      display: inline-block;
      width: 14px;
      height: 14px;
      background: #e95d32;
      border: 2px solid #121212;
    }

    .section-tag {
      font-size: 13px;
      font-weight: 800;
      background: #f2c94c;
      border: 2px solid #121212;
      padding: 4px 10px;
      box-shadow: 2px 2px 0 #121212;
    }

    /* Publications List */
    .publications-list {
      display: flex;
      flex-direction: column;
      gap: 14px;
      flex: 1;
    }

    .card {
      background: #ffffff;
      border: 2.5px solid #121212;
      box-shadow: 5px 5px 0 #121212;
      padding: 16px 20px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-left-width: 8px;
    }

    .card--s3 { border-left-color: #0284c7; }
    .card--s5 { border-left-color: #be123c; }
    .card--s4 { border-left-color: #ea580c; }
    .card--prosiding { border-left-color: #334155; }

    .card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }

    .sinta-img {
      height: 38px;
      max-width: 155px;
      object-fit: contain;
      filter: drop-shadow(1.5px 1.5px 0 rgba(0,0,0,0.15));
    }

    .sinta-img--s3 {
      background: #ffffff;
      padding: 2px 6px;
      border: 1.5px solid #64748b;
      border-radius: 4px;
      height: 36px;
    }

    .prosiding-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #334155;
      color: #ffffff;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.06em;
      padding: 6px 12px;
      border: 1.5px solid #121212;
      border-radius: 3px;
    }

    .card-year {
      font-size: 14px;
      font-weight: 850;
      color: #64748b;
    }

    .card-title {
      font-size: 16.5px;
      font-weight: 850;
      line-height: 1.25;
      letter-spacing: -0.025em;
      color: #121212;
      margin-bottom: 6px;
    }

    .card-journal {
      font-size: 13.5px;
      font-weight: 750;
      color: #e95d32;
      line-height: 1.3;
      margin-bottom: 4px;
    }

    .card-author {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
    }

    /* Footer Bar */
    .footer-bar {
      margin-top: 20px;
      background: #121212;
      color: #ffffff;
      padding: 16px 24px;
      border: 2px solid #121212;
      box-shadow: 5px 5px 0 #e95d32;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 4px;
    }

    .footer-brand {
      font-family: 'Cabinet Grotesk', sans-serif;
      font-size: 18px;
      font-weight: 900;
      letter-spacing: -0.02em;
    }

    .footer-url {
      font-size: 14px;
      font-weight: 800;
      color: #f2c94c;
      letter-spacing: 0.04em;
    }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- Header Scholar Box -->
    <div class="header-banner">
      <div class="header-badge">
        GOOGLE SCHOLAR PROFILE & PUBLICATIONS
      </div>
      <div class="profile-row">
        <div class="profile-info">
          <h1>Reihan Mutaqin</h1>
          <p>Pendidikan Teknologi Informasi · Universitas Bina Bangsa</p>
        </div>
        ${fotoReihan ? `<img src="${fotoReihan}" alt="Reihan Mutaqin" class="profile-avatar" />` : ''}
      </div>
      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-num">7+</span>
          <span class="stat-lbl">Kutipan Ilmiah</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">6</span>
          <span class="stat-lbl">Jurnal Terindeks</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">2023–2025</span>
          <span class="stat-lbl">Tahun Riset</span>
        </div>
      </div>
    </div>

    <!-- Section Subheading -->
    <div class="section-title">
      <h2>Daftar Publikasi Jurnal & Prosiding</h2>
      <span class="section-tag">Terakreditasi SINTA</span>
    </div>

    <!-- Publications 6 Cards List -->
    <div class="publications-list">
      
      <!-- 1. ISLAMIKA (SINTA 3) -->
      <div class="card card--s3">
        <div class="card-top">
          <img src="${sinta3}" alt="SINTA 3" class="sinta-img sinta-img--s3" />
          <span class="card-year">2025</span>
        </div>
        <h3 class="card-title">Perancangan Augmented Reality (AR) Book Dasar Komputer pada Mata Pelajaran Informatika Kelas X TJKT 2 di SMK Negeri 1 Pandeglang</h3>
        <p class="card-journal">ISLAMIKA: Jurnal Keislaman dan Ilmu Pendidikan</p>
        <span class="card-author">Penulis: Reihan Mutaqin, dkk.</span>
      </div>

      <!-- 2. Jurnal Saintifik (SINTA 5) -->
      <div class="card card--s5">
        <div class="card-top">
          <img src="${sinta5}" alt="SINTA 5" class="sinta-img" />
          <span class="card-year">2024</span>
        </div>
        <h3 class="card-title">Analisis Penggunaan Chat GPT (AI) dan Modul Pemrograman Terhadap Motivasi Belajar dan Kreativitas Mahasiswa dalam Mata Kuliah Pemrograman</h3>
        <p class="card-journal">Jurnal Saintifik (Multi Science Journal) · UNRAS</p>
        <span class="card-author">Penulis: Reihan Mutaqin, dkk.</span>
      </div>

      <!-- 3. JKPU Nalanda (SINTA 4) -->
      <div class="card card--s4">
        <div class="card-top">
          <img src="${sinta4}" alt="SINTA 4" class="sinta-img" />
          <span class="card-year">2024</span>
        </div>
        <h3 class="card-title">Pelatihan Membuat Media Pembelajaran Berbasis WordPress Menggunakan Plugin H5P</h3>
        <p class="card-journal">JKPU: Jurnal Kajian dan Penelitian Umum · Institut Nalanda</p>
        <span class="card-author">Penulis: Reihan Mutaqin, dkk.</span>
      </div>

      <!-- 4. SEWAGATI (SINTA 5) -->
      <div class="card card--s5">
        <div class="card-top">
          <img src="${sinta5}" alt="SINTA 5" class="sinta-img" />
          <span class="card-year">2024</span>
        </div>
        <h3 class="card-title">Membangun Soft Skill dan Hard Skill Siswa SMK pada Era Digital</h3>
        <p class="card-journal">SEWAGATI: Jurnal Pengabdian Masyarakat Indonesia</p>
        <span class="card-author">Penulis: Beni Junedi, Reihan Mutaqin, Siti Adira Kania, dkk.</span>
      </div>

      <!-- 5. Nusantara (SINTA 5) -->
      <div class="card card--s5">
        <div class="card-top">
          <img src="${sinta5}" alt="SINTA 5" class="sinta-img" />
          <span class="card-year">2023</span>
        </div>
        <h3 class="card-title">Pembuatan Website Pelayanan Pemerintahan Desa Sukalaba: Meningkatkan Kualitas Pelayanan dan Keterbukaan Informasi Bagi Masyarakat</h3>
        <p class="card-journal">Nusantara: Jurnal Pengabdian Kepada Masyarakat</p>
        <span class="card-author">Penulis: Reihan Mutaqin, Abdul Bahits, Ana Regitha D. S., Muhamad Nur F.</span>
      </div>

      <!-- 6. SEUMPAMA (Prosiding Nasional) -->
      <div class="card card--prosiding">
        <div class="card-top">
          <div class="prosiding-tag">PROSIDING SEMINAR NASIONAL</div>
          <span class="card-year">2023</span>
        </div>
        <h3 class="card-title">Pendampingan Pembuatan Peniris Minyak pada Usaha Mikro, Kecil, dan Menengah (UMKM) Jamur Tiram di Desa Sukalaba</h3>
        <p class="card-journal">Prosiding Seminar Umum Pengabdian kepada Masyarakat (SEUMPAMA) · LPPM UNIBA</p>
        <span class="card-author">Penulis: Reihan Mutaqin, dkk.</span>
      </div>

    </div>

    <!-- Footer Bar -->
    <div class="footer-bar">
      <span class="footer-brand">REIHAN MUTAQIN · PORTOFOLIO & RISET</span>
      <span class="footer-url">reihan.online/</span>
    </div>

  </div>
</body>
</html>
`;

async function main() {
  console.log('Launching browser to render 1080x1920 WhatsApp Status...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--font-render-hinting=none',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Wait 1.5s for fonts & images to render cleanly
    await new Promise((r) => setTimeout(r, 1500));

    const outputPath = path.join(downloadsDir, 'Publikasi Reihan.jpg');
    const rootPath = path.join(projectRoot, 'Publikasi Reihan.jpg');

    await page.screenshot({
      path: outputPath,
      type: 'jpeg',
      quality: 98,
      clip: { x: 0, y: 0, width: 1080, height: 1920 },
    });

    fs.copyFileSync(outputPath, rootPath);

    console.log(`\nSUCCESS! Publikasi Reihan.jpg generated!`);
    console.log(`File: ${outputPath}`);
    console.log(`File: ${rootPath}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('Error generating WhatsApp Status image:', err);
  process.exit(1);
});
