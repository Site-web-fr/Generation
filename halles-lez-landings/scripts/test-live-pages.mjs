import { chromium, devices } from 'playwright';

const BASE = 'https://site-web-fr.github.io/Generation';
const PAGES = [
  { name: 'Home (Halles hub)', url: `${BASE}/` },
  { name: 'Pilot HTML', url: `${BASE}/pilot.html` },
  { name: 'Premium hub', url: `${BASE}/#/premium` },
  { name: 'Velours Auto', url: `${BASE}/#/velours-auto` },
  { name: 'Eclat Aesthetic', url: `${BASE}/#/eclat-aesthetic` },
];

async function testPage(page, { name, url }) {
  const errors = [];
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !/Failed to load resource.*404/.test(msg.text())) {
      errors.push(`console: ${msg.text()}`);
    }
  });

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(10000);

    const rootChildren = await page.locator('#root > *').count();
    const bodyText = (await page.locator('body').innerText()).replace(/\s+/g, ' ').trim();
    const textSample = bodyText.slice(0, 200);

    const hasPremiumContent =
      /Velours Auto|Éclat Aesthetic|Premium Landings|Configurez|Expérience premium|Halles|Rouge Beef|10 Expériences/i.test(
        bodyText,
      ) && !/Chargement interrompu/.test(bodyText);
    const hasLoaderStuck =
      (await page.locator('.fx-loader').count()) > 0 &&
      (await page.locator('.premium-landing, .hub-main, .hub-card, header h1').count()) === 0;

    const bootFallbackVisible = await page.locator('#boot-fallback:not([hidden])').isVisible().catch(() => false);
    if (bootFallbackVisible) errors.push('boot-fallback visible (JS failed to boot)');

    const bad = /Chargement interrompu|Cannot read properties/.test(bodyText);
    const isPilot = name === 'Pilot HTML';
    const ok =
      errors.length === 0 &&
      !bootFallbackVisible &&
      !hasLoaderStuck &&
      !bad &&
      (isPilot ? /Pilot Mobile/i.test(bodyText) : rootChildren > 0 && hasPremiumContent);

    return { name, url, ok, errors, rootChildren, textSample, hasPremiumContent, hasLoaderStuck };
  } catch (err) {
    errors.push(`navigation: ${err instanceof Error ? err.message : String(err)}`);
    return {
      name,
      url,
      ok: false,
      errors,
      rootChildren: 0,
      textSample: '',
      hasPremiumContent: false,
      hasLoaderStuck: false,
    };
  }
}

async function run() {
  const iphone = devices['iPhone 13'];
  const browser = await chromium.launch({ headless: true });
  const results = [];

  console.log('\n=== Mobile (iPhone 13) ===\n');
  const mobile = await browser.newContext({ ...iphone });
  const mobilePage = await mobile.newPage();
  for (const p of PAGES) {
    const r = await testPage(mobilePage, p);
    results.push({ ...r, name: `[mobile] ${r.name}` });
    console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}`);
    console.log(`       root children: ${r.rootChildren}, premium content: ${r.hasPremiumContent}`);
    if (r.errors.length) console.log(`       errors: ${r.errors.join(' | ')}`);
    if (r.textSample) console.log(`       text: ${r.textSample.slice(0, 120)}...`);
    console.log('');
  }
  await mobile.close();

  console.log('\n=== Desktop ===\n');
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const desktopPage = await desktop.newPage();
  for (const p of [PAGES[2], PAGES[3]]) {
    const r = await testPage(desktopPage, p);
    results.push({ ...r, name: `[desktop] ${r.name}` });
    console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}`);
    if (r.errors.length) console.log(`       errors: ${r.errors.join(' | ')}`);
    console.log('');
  }
  await desktop.close();
  await browser.close();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n=== SUMMARY: ${results.length - failed.length}/${results.length} passed ===\n`);
  if (failed.length) {
    failed.forEach((f) => console.log(`FAIL: ${f.name} — ${f.errors.join('; ') || 'no content'}`));
    process.exit(1);
  }
}

run();
