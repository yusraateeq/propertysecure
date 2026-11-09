import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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
let violationCount = 0;

for (const route of routes) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
  const violations = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    nodes: violation.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
  }));
  violationCount += violations.length;
  console.log(`\n${route}: ${violations.length} violation types`);
  if (violations.length) console.log(JSON.stringify(violations, null, 2));
  await context.close();
}

await browser.close();
if (violationCount) process.exitCode = 1;
