import puppeteer from 'puppeteer';
import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');
const downloadsDir = path.resolve(projectRoot, 'public', 'downloads');

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function createStaticServer(port = 4173) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(distDir, 'index.html');
      }

      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(content);
        }
      });
    });

    server.listen(port, () => {
      console.log(`Static server running at http://localhost:${port}`);
      resolve(server);
    });
  });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const server = await createStaticServer(4173);

  console.log('Launching browser (Edge/Chromium)...');
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

    // 1. High-Resolution Full Desktop Capture (Grid 2-column)
    console.log('1. Capturing HD Showcase Grid...');
    await page.setViewport({ width: 1300, height: 1600, deviceScaleFactor: 2.5 });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });

    await page.evaluate(() => {
      // Force all elements visible
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
      document.querySelectorAll('*').forEach((el) => {
        el.style.animation = 'none';
        el.style.transition = 'none';
      });
    });

    await sleep(1500);

    const pubSection = await page.$('#publikasi');
    if (pubSection) {
      const hdPath = path.join(downloadsDir, 'publikasi-reihan-hd.jpg');
      const rootHdPath = path.join(projectRoot, 'publikasi-reihan-hd.jpg');
      
      await pubSection.screenshot({
        path: hdPath,
        type: 'jpeg',
        quality: 98,
      });
      fs.copyFileSync(hdPath, rootHdPath);
      console.log(`Saved: ${hdPath}`);
      console.log(`Saved: ${rootHdPath}`);
    }

    // 2. High-Resolution WhatsApp Status / Instagram Story (Vertical 9:16 - 1080 x 1920)
    console.log('2. Capturing HD WhatsApp Status / Story (9:16)...');
    await page.setViewport({ width: 620, height: 1100, deviceScaleFactor: 2.5 });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });

    await page.evaluate(() => {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
      document.querySelectorAll('*').forEach((el) => {
        el.style.animation = 'none';
        el.style.transition = 'none';
      });
    });

    await sleep(1500);

    const pubSectionMobile = await page.$('#publikasi');
    if (pubSectionMobile) {
      const storyPath = path.join(downloadsDir, 'publikasi-reihan-status-story.jpg');
      const rootStoryPath = path.join(projectRoot, 'publikasi-reihan-status-story.jpg');
      
      await pubSectionMobile.screenshot({
        path: storyPath,
        type: 'jpeg',
        quality: 98,
      });
      fs.copyFileSync(storyPath, rootStoryPath);
      console.log(`Saved: ${storyPath}`);
      console.log(`Saved: ${rootStoryPath}`);
    }

    console.log('\nAll HD JPG images generated successfully!');
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error('Error generating HD JPG:', err);
  process.exit(1);
});
