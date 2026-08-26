import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const imgDir = path.join(root, 'public', 'images');

const urls = [
  { id: 'filter-sakti', url: 'https://filter-sakti.vercel.app/', img: 'filter-sakti.png' },
  { id: 'ebis-telkom', url: 'https://ebis-telkom.vercel.app/', img: 'ebis-telkom.png' },
  { id: 'shevaangel', url: 'https://shevaangel.vercel.app/', img: 'shevaangel.png' },
  { id: 'ai-reihan', url: 'https://ai.reihan.online/', img: 'ai-reihan.png' },
  { id: 'reya-reihan', url: 'https://reya.reihan.online/', img: 'reya-reihan.png' },
  { id: 'metadata-reihan', url: 'https://metadata.reihan.online/', img: 'metadata-reihan.png' },
  { id: 'musik-reihan', url: 'https://musik.reihan.online/', img: 'musik-reihan.png' },
  { id: 'shl-mu', url: 'https://shl-mu.vercel.app/', img: 'shl-mu.png' },
  { id: 'hr-rei219', url: 'https://hr-rei219.vercel.app/', img: 'hr-rei219.png' }
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log('Launching browser to inspect and screenshot 9 projects...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const results = [];

  for (const item of urls) {
    console.log(`\nNavigating to ${item.url} ...`);
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 25000 }).catch(e => {
        console.warn(`Timeout/warn loading ${item.url}: ${e.message}`);
      });

      await sleep(2500);

      const info = await page.evaluate(() => {
        const title = document.title || '';
        const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        const h1 = Array.from(document.querySelectorAll('h1')).map(h => h.innerText.trim()).filter(Boolean);
        const h2 = Array.from(document.querySelectorAll('h2')).map(h => h.innerText.trim()).filter(Boolean);
        const h3 = Array.from(document.querySelectorAll('h3')).map(h => h.innerText.trim()).filter(Boolean);
        
        // Grab prominent body text snippets
        const pTexts = Array.from(document.querySelectorAll('p, span, div'))
          .map(el => el.innerText.trim())
          .filter(t => t.length > 20 && t.length < 300)
          .slice(0, 15);

        const buttons = Array.from(document.querySelectorAll('button, a'))
          .map(b => b.innerText.trim())
          .filter(t => t.length > 2 && t.length < 40)
          .slice(0, 10);

        return {
          title,
          metaDesc,
          h1,
          h2: h2.slice(0, 5),
          h3: h3.slice(0, 5),
          sampleTexts: pTexts.slice(0, 8),
          buttons
        };
      });

      const screenshotPath = path.join(imgDir, item.img);
      await page.screenshot({ path: screenshotPath, type: 'png' });
      console.log(`Saved screenshot: ${screenshotPath}`);

      results.push({ ...item, ...info });
      await page.close();
    } catch (err) {
      console.error(`Error processing ${item.url}:`, err.message);
      results.push({ ...item, error: err.message });
    }
  }

  await browser.close();

  const outReport = path.join(root, '.tmp', 'scraped_projects.json');
  fs.writeFileSync(outReport, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nReport written to ${outReport}`);
})();
