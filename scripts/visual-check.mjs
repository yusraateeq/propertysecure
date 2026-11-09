import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

await fs.mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ headless: true });
const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const routes = [
  '/',
  '/about',
  '/services',
  '/services/commercial-security',
  '/services/residential-security',
  '/services/retail-security',
  '/services/emergency-security',
  '/areas-we-serve',
  '/employment',
  '/construction-security',
  '/policies-procedure',
  '/privacy-policy',
  '/contact-us',
];
const errors = [];

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  page.on('pageerror', (error) => errors.push(`${route}: ${error.message}`));
  const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
  const result = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelectorAll('h1').length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
  }));
  console.log(route, response?.status(), JSON.stringify(result));
  await page.close();
}

for (const test of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 900 },
  { name: 'mobile', width: 360, height: 800 },
]) {
  const page = await browser.newPage({ viewport: { width: test.width, height: test.height }, reducedMotion: 'reduce' });
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  console.log(test.name, dimensions);
  await page.screenshot({ path: `artifacts/home-${test.name}.png`, fullPage: true });
  await page.screenshot({ path: `artifacts/home-${test.name}-fold.png` });
  await page.close();
}

const mobile = await browser.newPage({ viewport: { width: 360, height: 800 }, reducedMotion: 'reduce' });
await mobile.goto(baseURL, { waitUntil: 'networkidle' });
await mobile.getByRole('button', { name: 'Open navigation menu' }).click();
console.log('mobile drawer visible:', await mobile.getByRole('dialog', { name: 'Navigation menu' }).isVisible());
await mobile.screenshot({ path: 'artifacts/mobile-drawer.png' });
await mobile.keyboard.press('Escape');
console.log('mobile drawer closed:', !(await mobile.getByRole('dialog', { name: 'Navigation menu' }).isVisible().catch(() => false)));
await mobile.getByRole('button', { name: 'Click to watch' }).click();
console.log('video dialog visible:', await mobile.getByRole('dialog').isVisible());
await mobile.keyboard.press('Escape');
console.log('video dialog closed:', !(await mobile.getByRole('dialog').isVisible().catch(() => false)));
await mobile.close();

console.log('page errors:', errors);
await browser.close();
