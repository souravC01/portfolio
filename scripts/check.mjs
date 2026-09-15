import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');

async function runChecks() {
  console.log('Running automated validation on build output...');

  // 1. Check index.html exists
  const indexPath = path.join(root, 'index.html');
  const indexHtml = await readFile(indexPath, 'utf8');
  assert(indexHtml.length > 1000, 'index.html should have substantial content');
  assert.equal((indexHtml.match(/<h1[ >]/g) || []).length, 1, 'Should have exactly one h1');
  assert.match(indexHtml, /<title>.+<\/title>/, 'Must have a title tag');
  assert.match(indexHtml, /<meta name="description" content="[^"]+"/, 'Must have a meta description');

  // 2. Check sections
  const requiredSections = ['about', 'skills', 'education', 'experiences', 'projects', 'contact'];
  for (const sec of requiredSections) {
    assert(indexHtml.includes(`id="${sec}"`), `index.html must contain section #${sec}`);
  }

  assert.doesNotMatch(indexHtml, /\/\/ AWAY FROM THE KEYBOARD/, 'AFK header must not include the removed eyebrow');
  assert.match(indexHtml, /<p class="section-eyebrow" data-i18n="afk_eyebrow">OUTSIDE THE CODE<\/p>\s*<h2 class="section-title" data-i18n="afk_title">Beyond the Terminal<\/h2>/, 'Personal interests section must include its eyebrow above the title');
  assert.match(indexHtml, /<h2 class="section-title" data-i18n="afk_title">Beyond the Terminal<\/h2>/, 'Personal interests section must use the selected Beyond the Terminal title');
  assert.doesNotMatch(indexHtml, /Beyond the Terminal — AFK/, 'Personal interests title must not retain the AFK suffix');
  assert.match(indexHtml, /Professional Experience<\/h2>\s*<p class="section-subtitle" data-i18n="exp_subtitle">Building reliable full-stack applications through collaborative development, testing, and release delivery\.<\/p>/, 'Professional Experience must include its supporting subtitle');

  // The first experience pillar uses the shared metric-callout pattern.
  const firstExperiencePillar = indexHtml.match(/<!-- Pillar 1:[\s\S]*?<div class="exp-pillar">([\s\S]*?)<!-- Pillar 2:/)?.[1] ?? '';
  assert.match(firstExperiencePillar, /4<span class="exp-plus">\+<\/span>[\s\S]*Enterprise Applications/, 'First experience pillar must show 4+ enterprise applications');
  assert.match(firstExperiencePillar, /20<span class="exp-plus">\+<\/span>[\s\S]*Features &amp; Fixes/, 'First experience pillar must show 20+ features and fixes');
  assert.match(firstExperiencePillar, /class="exp-stat-icon"[\s\S]*?<svg/, 'First experience pillar must use the shared right-side icon treatment');

  const testingExperiencePillar = indexHtml.match(/<!-- Pillar 2:[\s\S]*?<div class="exp-pillar">([\s\S]*?)<!-- Pillar 3:/)?.[1] ?? '';
  assert.match(testingExperiencePillar, /Test Cases Executed \(Selenium &amp; Manual\)/, 'Testing methods must remain inline with the test case label');

  // 3. Check assets
  const requiredAssets = [
    'style.css',
    'client.js',
    'favicon.svg',
    'assets/fonts/Baufra-Regular.woff2',
    'assets/fonts/Baufra-Medium.woff2',
    'assets/fonts/Baufra-SemiBold.woff2',
    'assets/fonts/Baufra-Bold.woff2',
    'assets/images/noise-bg.webp',
    'assets/images/default-cover.png',
    'assets/images/ca.svg',
    'assets/images/fr.svg',
    'assets/images/MOE.png',
    'assets/images/me.jpg',
    'assets/images/project-jobhelper.jpg',
    'assets/images/project-roleimpact.jpg',
    'assets/images/project-airbnb.jpg',
    'assets/images/york-campus.jpg',
    'assets/images/lassonde-bergeron.jpg',
    'assets/images/yorku-logo.jpg',
    'assets/images/best-logo.png',
    'assets/images/lassonde-logo.png',
    'assets/images/york-lions.png',
    'assets/audio/lofi.mp3',
    'assets/resume.pdf',
    'assets/yu-bazaar.jpg',
    'assets/airbnb-network.png'
  ];

  for (const rel of requiredAssets) {
    const fullPath = path.join(root, rel);
    try {
      const s = await stat(fullPath);
      assert(s.size > 0, `${rel} should not be empty`);
    } catch (err) {
      assert.fail(`Missing required asset: ${rel}`);
    }
  }

  // Check every generated page, including cross-page anchors.
  const routes = ['/', '/projects/roleimpact/', '/projects/jobhelperguru/', '/projects/yu-bazaar/', '/projects/toronto-airbnb/'];
  for (const route of routes) {
    const html = await readFile(path.join(root, route, 'index.html'), 'utf8');
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${route}: one h1`);
    assert.match(html, /<meta name="description" content="[^"]+"/, `${route}: description`);
    for (const [, ref] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(ref, `https://portfolio.test${route}`);
      if (url.origin !== 'https://portfolio.test') continue;
      let target = path.join(root, decodeURIComponent(url.pathname));
      const info = await stat(target);
      if (info.isDirectory()) target = path.join(target, 'index.html');
      await stat(target);
      if (url.hash) {
        const targetHtml = await readFile(target, 'utf8');
        assert(targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: broken anchor ${ref}`);
      }
    }
  }

  console.log('PASS: All structural, asset, and reference checks succeeded!');
}

runChecks().catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});
