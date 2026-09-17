import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

// Pass a Playwright installation path, or install Playwright locally.
const { chromium } = await import(process.argv[2] ? pathToFileURL(process.argv[2]).href : 'playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const failures = [];
async function check(name, fn) {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  try { await page.goto('http://127.0.0.1:4173/'); await fn(page); console.log(`PASS: ${name}`); }
  catch (error) { failures.push(name); console.error(`FAIL: ${name}: ${error.message}`); }
  finally { await page.close(); }
}
try {
  await check('All four project cards lead to case studies and specific repositories', async page => {
    assert.deepEqual(await page.locator('.project-title').allTextContents(), ['RoleImpact', 'JobHelperGuru', 'YU Bazaar', 'Toronto Airbnb Market Network']);
    for (const slug of ['roleimpact', 'jobhelperguru', 'yu-bazaar', 'toronto-airbnb']) {
      await page.locator(`a.project-title-link[href="/projects/${slug}/"]`).click();
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('a[href="/#projects"]').count() > 0, true);
      assert.equal(await page.locator('article section').count() >= 7, true);
      const repo = await page.getByRole('link', { name: 'GitHub', exact: true }).getAttribute('href');
      assert.match(repo, /^https:\/\/github.com\/souravC01\/.+/);
      await page.goto('http://127.0.0.1:4173/');
    }
  });
  await check('Closed drawer is skipped by keyboard; opening and closing restore focus', async page => {
    const toggle = page.locator('.mobile-menu-toggle');
    await toggle.focus(); await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => !!document.activeElement.closest('.mobile-drawer')), false);
    await toggle.click();
    assert.equal(await page.evaluate(() => !!document.activeElement.closest('.mobile-drawer')), true);
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => !!document.activeElement.closest('.mobile-drawer')), true);
    await page.keyboard.press('Escape');
    assert.equal(await toggle.evaluate(el => el === document.activeElement), true);
  });
  await check('Reduced motion keeps the role static', async page => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(100);
    const initial = await page.locator('.typewriter-text').innerText();
    assert(initial.length > 0);
    await page.waitForTimeout(800);
    assert.equal(await page.locator('.typewriter-text').innerText(), initial);
  });
  await check('Selecting a mobile destination moves focus into that section', async page => {
    await page.locator('.mobile-menu-toggle').click();
    await page.locator('.drawer-link[data-target="#projects"]').click();
    assert.equal(await page.evaluate(() => document.activeElement.id), 'projects');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => !!document.activeElement.closest('#projects')), true);
  });
  await check('Reduced motion disables drawer transition', async page => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.locator('.mobile-drawer').evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  });
  await check('Content remains visible without JavaScript', async page => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    try {
      const plain = await context.newPage(); await plain.goto('http://127.0.0.1:4173/');
      assert.equal(await plain.locator('.hero-content-col').evaluate(el => getComputedStyle(el).opacity), '1');
    } finally { await context.close(); }
  });
} finally { await browser.close(); }
if (failures.length) process.exitCode = 1;
