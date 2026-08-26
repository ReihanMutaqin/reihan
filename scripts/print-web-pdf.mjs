import puppeteer from 'puppeteer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const output = 'C:\\PROJEK\\reihan\\portfolio-reihan\\public\\downloads\\Portofolio-Web-Reihan-Mutaqin.pdf';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log('Launching Puppeteer (Chromium)...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--font-render-hinting=none',
    ]
  });

  const page = await browser.newPage();
  
  // Set a large viewport so everything renders at full width
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  console.log('Navigating to https://www.reihan.online/ ...');
  await page.goto('https://www.reihan.online/', { 
    waitUntil: 'networkidle2',
    timeout: 30000 
  });

  console.log('Page loaded. Waiting for initial animations...');
  await sleep(2000);

  // Force-reveal ALL scroll-animated elements (bypass IntersectionObserver)
  await page.evaluate(() => {
    // Add is-visible to all .reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('is-visible');
    });
    // Also remove any clip-path / opacity animations that may be in progress
    document.querySelectorAll('.animate-clip-reveal, .animate-blur-reveal').forEach(el => {
      el.style.animationPlayState = 'finished';
      el.style.opacity = '1';
      el.style.filter = 'none';
      el.style.clipPath = 'none';
      el.style.transform = 'none';
    });
    // Add has-js class to trigger CSS reveals
    document.documentElement.classList.add('has-js');
  });

  await sleep(500);

  // Slowly scroll through entire page to trigger lazy images
  console.log('Scrolling page to trigger lazy loading...');
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Page height: ${pageHeight}px`);
  
  for (let y = 0; y < pageHeight; y += 800) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await sleep(300);
    // Continuously reveal newly visible elements
    await page.evaluate(() => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
        el.classList.add('is-visible');
      });
    });
  }

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(1000);

  // Override navigation/cursor elements so they don't clutter the PDF
  await page.addStyleTag({
    content: `
      /* PDF Print Overrides */
      .cursor { display: none !important; }
      .scroll-progress { display: none !important; }
      .back-to-top { display: none !important; }
      
      /* Ensure all reveals are visible */
      .reveal { opacity: 1 !important; transform: none !important; }
      .has-js .reveal { opacity: 1 !important; transform: none !important; }
      
      /* Fix animations */
      *, *::before, *::after {
        animation-play-state: paused !important;
        animation-delay: 0s !important;
        animation-duration: 0.001s !important;
        transition-duration: 0.001s !important;
      }
      
      /* Make sure project images are at grayscale(0%) for print */
      .project-img { filter: grayscale(0%) !important; }
      
      /* Restore actual content opacity/clip */
      .animate-clip-reveal, .animate-blur-reveal {
        opacity: 1 !important;
        filter: none !important;
        clip-path: none !important;
      }
      
      /* Topbar stays, but make it static for print */
      .topbar { position: relative !important; }
    `
  });

  await sleep(500);

  console.log('Generating PDF...');
  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: false,
    margin: {
      top: '8mm',
      bottom: '8mm',
      left: '6mm',
      right: '6mm'
    },
    scale: 0.6  // Scale down to fit wide web layout onto A4
  });

  await browser.close();
  
  const fs = await import('node:fs');
  if (fs.default.existsSync(output)) {
    const size = fs.default.statSync(output).size;
    console.log(`\nSUCCESS: PDF generated!`);
    console.log(`File: ${output}`);
    console.log(`Size: ${Math.round(size / 1024)} KB`);
  } else {
    console.error('PDF was not created!');
    process.exit(1);
  }
})();
