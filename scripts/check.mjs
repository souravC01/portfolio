import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const resumeDriveUrl = 'https://drive.google.com/drive/folders/1KaP-RA-Se7_0GJAdX_mI6Da3yhFThYQa?usp=drive_link';

async function runChecks() {
  console.log('Running automated validation on build output...');

  // 1. Check index.html exists
  const indexPath = path.join(root, 'index.html');
  const indexHtml = await readFile(indexPath, 'utf8');
  assert(indexHtml.length > 1000, 'index.html should have substantial content');
  assert.equal((indexHtml.match(/<h1[ >]/g) || []).length, 1, 'Should have exactly one h1');
  assert.match(indexHtml, /<title>.+<\/title>/, 'Must have a title tag');
  assert.match(indexHtml, /<meta\s+name="description"\s+content="[^"]+"/s, 'Must have a meta description');
  assert.equal(indexHtml.split(`href="${resumeDriveUrl}"`).length - 1, 3, 'Every homepage resume link must use the Google Drive folder');
  assert.equal(indexHtml.split(`href="${resumeDriveUrl}" target="_blank" rel="noopener noreferrer"`).length - 1, 3, 'Every homepage resume link must open securely in a new tab');
  assert.doesNotMatch(indexHtml, /href="\/(?:assets\/)?resume\.pdf"/, 'Homepage must not link directly to a local resume PDF');

  // 2. Check sections
  const requiredSections = ['about', 'skills', 'education', 'experiences', 'projects', 'contact'];
  for (const sec of requiredSections) {
    assert(indexHtml.includes(`id="${sec}"`), `index.html must contain section #${sec}`);
  }

  assert.doesNotMatch(indexHtml, /\/\/ AWAY FROM THE KEYBOARD/, 'AFK header must not include the removed eyebrow');
  assert.match(indexHtml, /<p class="section-eyebrow" data-i18n="afk_eyebrow">OUTSIDE THE CODE<\/p>\s*<h2 class="section-title" data-i18n="afk_title">Beyond the Terminal<\/h2>/, 'Personal interests section must include its eyebrow above the title');
  assert.match(indexHtml, /<h2 class="section-title" data-i18n="afk_title">Beyond the Terminal<\/h2>/, 'Personal interests section must use the selected Beyond the Terminal title');
  assert.doesNotMatch(indexHtml, /Beyond the Terminal — AFK/, 'Personal interests title must not retain the AFK suffix');
  assert.match(indexHtml, /\[HIKING &amp; EXPLORATION\][\s\S]*?The best views are earned[\s\S]*?Exploring mountain trails, alpine lakes, and the landscapes waiting beyond the familiar route\./, 'Alpine lake story card must use the selected hiking and exploration copy');
  assert.doesNotMatch(indexHtml, /STRATEGY &amp; CHESS|64 squares|1940 ELO|3\+2 BLITZ/, 'Alpine lake story card must not retain chess copy');
  assert.match(indexHtml, /Professional Experience<\/h2>\s*<p class="section-subtitle" data-i18n="exp_subtitle">Building reliable full-stack applications through collaborative development, testing, and release delivery\.<\/p>/, 'Professional Experience must include its supporting subtitle');
  assert.doesNotMatch(indexHtml, /projects-filter-bar|Filter projects by specialization|project-filter-btn/, 'Projects section must not render specialization filters');
  assert.equal((indexHtml.match(/<article class="project-card reveal"/g) || []).length, 4, 'Projects section must keep all four project cards visible');
  assert.match(indexHtml, /<p class="section-eyebrow" data-i18n="projects_eyebrow">FEATURED WORK &amp; ENGINEERING EVIDENCE<\/p>/, 'Projects eyebrow must render without the slash prefix');
  assert.doesNotMatch(indexHtml, /\/\/ FEATURED WORK &amp; ENGINEERING EVIDENCE/, 'Projects eyebrow must not retain the slash prefix');
  assert.match(indexHtml, /<h3 class="project-title">YU Bazaar<\/h3>[\s\S]*?<div class="project-subtitle">SECURE CAMPUS MARKETPLACE<\/div>/, 'YU Bazaar card must use the secure campus marketplace subtitle');
  assert.doesNotMatch(indexHtml, /floating-audio-widget|id="bg-audio"/, 'Homepage must not render the floating audio player');
  assert.doesNotMatch(indexHtml, /class="project-card-date"/, 'Project-card headers must not render dates');
  assert.match(indexHtml, /<article class="project-card reveal"[^>]*data-slug="roleimpact"[\s\S]*?JAVA \/ SYSTEM DESIGN[\s\S]*?<span class="project-tag">Docker<\/span>/, 'RoleImpact card must use the requested category and Docker tag');
  assert.match(indexHtml, /<article class="project-card reveal"[^>]*data-slug="yu-bazaar"[\s\S]*?JAVA \/ CLOUD &amp; SECURITY[\s\S]*?<span class="project-tag">PostgreSQL<\/span>/, 'YU Bazaar card must use the requested category and PostgreSQL tag');
  assert.match(indexHtml, /<article class="project-card reveal"[^>]*data-slug="toronto-airbnb"[\s\S]*?DATA ANALYTICS \/ NETWORK SCIENCE/, 'Toronto Airbnb card must use the requested category');

  // The first experience pillar uses the shared metric-callout pattern.
  const firstExperiencePillar = indexHtml.match(/<!-- Pillar 1:[\s\S]*?<div class="exp-pillar">([\s\S]*?)<!-- Pillar 2:/)?.[1] ?? '';
  assert.match(firstExperiencePillar, /4<span class="exp-plus">\+<\/span>[\s\S]*Enterprise Applications/, 'First experience pillar must show 4+ enterprise applications');
  assert.match(firstExperiencePillar, /20<span class="exp-plus">\+<\/span>[\s\S]*Features &amp; Fixes/, 'First experience pillar must show 20+ features and fixes');
  assert.match(firstExperiencePillar, /class="exp-stat-icon"[\s\S]*?<svg/, 'First experience pillar must use the shared right-side icon treatment');

  const testingExperiencePillar = indexHtml.match(/<!-- Pillar 2:[\s\S]*?<div class="exp-pillar">([\s\S]*?)<!-- Pillar 3:/)?.[1] ?? '';
  assert.match(testingExperiencePillar, /Test Cases Executed \(Selenium &amp; Manual\)/, 'Testing methods must remain inline with the test case label');

  const roleImpactHtml = await readFile(path.join(root, 'projects', 'roleimpact', 'index.html'), 'utf8');
  assert.match(roleImpactHtml, /RoleImpact is a Java 21 and Spring Boot simulation platform/, 'RoleImpact must use the revised case-study summary');
  assert.match(roleImpactHtml, /<span>Flyway<\/span>/, 'RoleImpact must include the Flyway tag');
  assert.match(roleImpactHtml, /<section id="role"><h2>What I built<\/h2>/, 'RoleImpact must use the What I built heading');
  assert.match(roleImpactHtml, /<strong>Docker:<\/strong> provides a reproducible local PostgreSQL environment/, 'RoleImpact architecture must describe the Docker development environment');
  assert.doesNotMatch(roleImpactHtml, /<strong>Apache Kafka:<\/strong>/, 'RoleImpact architecture must not include the removed Kafka bullet');
  assert.match(roleImpactHtml, /architecture-primary-flow[\s\S]*?React \/ TypeScript[\s\S]*?Spring Boot REST API[\s\S]*?Deterministic Impact Engine[\s\S]*?PostgreSQL \/ JPA/, 'RoleImpact must show the application architecture flow');
  assert.match(roleImpactHtml, /architecture-flow-track[\s\S]*?Organization Snapshot[\s\S]*?Access Change[\s\S]*?Impact Analysis[\s\S]*?Mitigation Ranking/, 'RoleImpact must show the impact-engine analysis flow');

  const jobHelperHtml = await readFile(path.join(root, 'projects', 'jobhelperguru', 'index.html'), 'utf8');
  assert.match(jobHelperHtml, /JobHelperGuru is a full-stack job-search workspace built with Python, FastAPI, and React/, 'JobHelperGuru must use the revised case-study summary');
  assert.match(jobHelperHtml, /APPLIED AI \/ FULL-STACK/, 'JobHelperGuru must use the requested category');
  assert.match(jobHelperHtml, /<section id="role"><h2>What I built<\/h2>/, 'JobHelperGuru must use the What I built heading');
  assert.match(jobHelperHtml, /<section id="approach"><h2>Application workflow<\/h2>/, 'JobHelperGuru must use the Application workflow heading');
  assert.match(jobHelperHtml, /<section id="challenges"><h2>Evidence-aware AI<\/h2>/, 'JobHelperGuru must use the Evidence-aware AI heading');
  assert.match(jobHelperHtml, /architecture-client-flow[\s\S]*?React UI[\s\S]*?FastAPI API/, 'JobHelperGuru must show React UI to FastAPI orchestration flow');
  assert.match(jobHelperHtml, /architecture-subsystems-row[\s\S]*?AI \/ Matching Engine[\s\S]*?PostgreSQL[\s\S]*?Cloudflare R2/, 'JobHelperGuru must branch to AI Engine, PostgreSQL, and Cloudflare R2');
  assert.match(jobHelperHtml, /OpenAI-compatible provider[\s\S]*?Cloud \/ local model endpoints[\s\S]*?Offline heuristic fallback[\s\S]*?Zero-config parsing &amp; keyword matching/, 'JobHelperGuru must show AI engine resolution paths');
  assert.match(jobHelperHtml, /PostgreSQL[\s\S]*?Applications &amp; tracking data/, 'JobHelperGuru must show PostgreSQL applications & tracking data');
  assert.match(jobHelperHtml, /Cloudflare R2[\s\S]*?Résumé document storage/, 'JobHelperGuru must show Cloudflare R2 document storage');
  assert.match(jobHelperHtml, /claim-badges-grid[\s\S]*?SUPPORTED CLAIM[\s\S]*?UNVERIFIED SKILL[\s\S]*?METRIC PLACEHOLDER/, 'JobHelperGuru must show the three claim badges in Evidence-aware AI');
  assert.match(jobHelperHtml, /OpenAI-compatible model integration/, 'JobHelperGuru must use OpenAI-compatible model integration in What I built');
  assert.match(jobHelperHtml, /<strong>pytest:<\/strong> automated testing across API routes/, 'JobHelperGuru must describe pytest testing');
  assert.match(jobHelperHtml, /<strong>openpyxl:<\/strong> spreadsheet export for tracked applications\./, 'JobHelperGuru must describe openpyxl export');

  const yuBazaarHtml = await readFile(path.join(root, 'projects', 'yu-bazaar', 'index.html'), 'utf8');
  assert.match(yuBazaarHtml, /A modernized Java campus marketplace for York University students featuring Spring Security, OTP verification, persistent PostgreSQL storage, cloud-hosted listing images, and automated CI\/CD\./, 'YU Bazaar must use the updated hero summary');
  assert.match(yuBazaarHtml, /JAVA \/ CLOUD &amp; SECURITY/, 'YU Bazaar must use the requested category');
  assert.match(yuBazaarHtml, /<span>Java 17<\/span>\s*<span>Spring Security<\/span>\s*<span>PostgreSQL<\/span>\s*<span>Docker<\/span>\s*<span>Cloudflare R2<\/span>/, 'YU Bazaar must have the 5 requested tech chips');
  assert.doesNotMatch(yuBazaarHtml, /RabbitMQ/i, 'YU Bazaar case study must not contain RabbitMQ');
  assert.doesNotMatch(yuBazaarHtml, /Kubernetes/i, 'YU Bazaar case study must not contain Kubernetes');
  assert.doesNotMatch(indexHtml, /data-slug="yu-bazaar"[\s\S]*?RabbitMQ/i, 'Homepage YU Bazaar card must not reference RabbitMQ');
  assert.doesNotMatch(indexHtml, /data-slug="yu-bazaar"[\s\S]*?Kubernetes/i, 'Homepage YU Bazaar card must not reference Kubernetes');

  // Section headings & TOC
  assert.match(yuBazaarHtml, /<section id="problem"><h2>The problem<\/h2>/, 'YU Bazaar must have The problem section');
  assert.match(yuBazaarHtml, /<section id="role"><h2>From team project to portfolio system<\/h2>/, 'YU Bazaar must have From team project to portfolio system section');
  assert.match(yuBazaarHtml, /<section id="approach"><h2>Marketplace journey<\/h2>/, 'YU Bazaar must have Marketplace journey section');
  assert.match(yuBazaarHtml, /<section id="architecture"><h2>Architecture<\/h2>/, 'YU Bazaar must have Architecture section');
  assert.match(yuBazaarHtml, /<section id="challenges"><h2>From course project to durable application<\/h2>/, 'YU Bazaar must have From course project to durable application section');
  assert.match(yuBazaarHtml, /<section id="results"><h2>Result and scope<\/h2>/, 'YU Bazaar must have Result and scope section');
  assert.match(yuBazaarHtml, /<section id="learning"><h2>What the project taught me<\/h2>/, 'YU Bazaar must have What the project taught me section');
  assert.match(yuBazaarHtml, /<a href="#role">From team project to portfolio system<\/a>/, 'YU Bazaar TOC must link to From team project to portfolio system');
  assert.match(yuBazaarHtml, /<a href="#approach">Marketplace journey<\/a>/, 'YU Bazaar TOC must link to Marketplace journey');
  assert.match(yuBazaarHtml, /<a href="#challenges">From course project to durable application<\/a>/, 'YU Bazaar TOC must link to From course project to durable application');

  // Architecture diagram checks
  assert.match(yuBazaarHtml, /Thymeleaf Web UI[\s\S]*?Spring Boot Application[\s\S]*?central application layer/, 'YU Bazaar architecture must show Thymeleaf Web UI to Spring Boot Application flow');
  assert.match(yuBazaarHtml, /architecture-subsystems-row[\s\S]*?Spring Security[\s\S]*?PostgreSQL \+ JPA[\s\S]*?Accounts &amp; listings[\s\S]*?Flyway migrations[\s\S]*?Cloudflare R2/, 'YU Bazaar architecture must branch to Spring Security, PostgreSQL + JPA, and Cloudflare R2');
  assert.match(yuBazaarHtml, /Verification \/ Recovery[\s\S]*?OTP · Password reset[\s\S]*?Demo restrictions/, 'YU Bazaar architecture must show Verification / Recovery child box under Spring Security');
  assert.match(yuBazaarHtml, /DELIVERY &amp; DEPLOYMENT PIPELINE[\s\S]*?GitHub Actions[\s\S]*?Maven Build &amp; Tests[\s\S]*?Docker[\s\S]*?Render/, 'YU Bazaar architecture must show delivery/deployment pipeline below runtime');

  const airbnbHtml = await readFile(path.join(root, 'projects', 'toronto-airbnb', 'index.html'), 'utf8');
  assert.match(airbnbHtml, /Do Toronto’s Airbnb market segments follow official neighbourhood boundaries\? An interactive network analysis and research case study of 15,809 Toronto Airbnb listings using Louvain and Leiden community detection\./, 'Toronto Airbnb must use updated research summary');
  assert.match(airbnbHtml, /DATA ANALYTICS \/ NETWORK SCIENCE/, 'Toronto Airbnb must use DATA ANALYTICS / NETWORK SCIENCE category');
  assert.match(airbnbHtml, /<span>Python<\/span>\s*<span>React<\/span>\s*<span>TypeScript<\/span>\s*<span>Network Science<\/span>\s*<span>Data Analysis<\/span>/, 'Toronto Airbnb must have the 5 safe tech chips');

  // Metrics strip
  assert.match(airbnbHtml, /research-metrics-strip[\s\S]*?15,809[\s\S]*?LISTINGS[\s\S]*?3[\s\S]*?NETWORK LAYERS[\s\S]*?7[\s\S]*?PARAMETER CONFIGURATIONS[\s\S]*?3[\s\S]*?VALIDATION SCHEMES/, 'Toronto Airbnb must show the research metrics strip with 4 key metrics');

  // Section headings & TOC
  assert.match(airbnbHtml, /<section id="problem"><h2>The research question<\/h2>/, 'Toronto Airbnb must have The research question section');
  assert.match(airbnbHtml, /<section id="problem"><h2>The research question<\/h2>\s*<p class="research-provenance">Dataset source: <a href="https:\/\/insideairbnb\.com\/get-the-data\/" target="_blank" rel="noopener noreferrer">Inside Airbnb<\/a> — Toronto, November 2025 snapshot<\/p>/, 'Toronto Airbnb must show the verified dataset provenance line under The research question');
  assert.match(airbnbHtml, /<section id="role"><h2>My portfolio contribution<\/h2>/, 'Toronto Airbnb must have My portfolio contribution section');
  assert.match(airbnbHtml, /<section id="approach"><h2>Build the network in layers<\/h2>/, 'Toronto Airbnb must have Build the network in layers section');
  assert.match(airbnbHtml, /<section id="architecture"><h2>From analysis to reproducible evidence<\/h2>/, 'Toronto Airbnb must have From analysis to reproducible evidence section');
  assert.match(airbnbHtml, /<section id="challenges"><h2>Testing the interpretation<\/h2>/, 'Toronto Airbnb must have Testing the interpretation section');
  assert.match(airbnbHtml, /<section id="results"><h2>Findings and limitations<\/h2>/, 'Toronto Airbnb must have Findings and limitations section');
  assert.match(airbnbHtml, /<section id="learning"><h2>What the project taught me<\/h2>/, 'Toronto Airbnb must have What the project taught me section');
  assert.match(airbnbHtml, /<a href="#role">My portfolio contribution<\/a>/, 'Toronto Airbnb TOC must link to My portfolio contribution');
  assert.match(airbnbHtml, /<a href="#approach">Build the network in layers<\/a>/, 'Toronto Airbnb TOC must link to Build the network in layers');
  assert.match(airbnbHtml, /<a href="#architecture">From analysis to reproducible evidence<\/a>/, 'Toronto Airbnb TOC must link to From analysis to reproducible evidence');

  // Methodology pipeline flowchart
  assert.match(airbnbHtml, /methodology-pipeline[\s\S]*?RESEARCH METHODOLOGY FLOW[\s\S]*?Toronto Airbnb Snapshot[\s\S]*?Graph A[\s\S]*?Graph B[\s\S]*?Graph C[\s\S]*?Louvain \/ Leiden[\s\S]*?Compare with[\s\S]*?Ridge Regression[\s\S]*?Interactive React/, 'Toronto Airbnb must show methodology pipeline flowchart');
  assert.match(airbnbHtml, /methodology-step-layers[\s\S]*?LAYERED GRAPH PROGRESSION[\s\S]*?methodology-layers-row[\s\S]*?Graph A[\s\S]*?Graph B[\s\S]*?Graph C/, 'Toronto Airbnb must show compact Graph A / B / C progression');

  // Findings callout
  assert.match(airbnbHtml, /research-findings-callout[\s\S]*?RAW R² GAIN[\s\S]*?\+0\.0016 to \+0\.0024[\s\S]*?ADJUSTED R²[\s\S]*?Declined[\s\S]*?The empirical comparison does not claim a material price-prediction improvement over baseline features\./, 'Toronto Airbnb must show findings callout card with exact empirical results');

  // Report & documentation links
  assert.match(airbnbHtml, /EECS4414-Airbnb-Network-Analysis-Final-Report\.pdf/, 'Toronto Airbnb must link to the original course report');
  assert.match(airbnbHtml, /ROBUSTNESS\.md/, 'Toronto Airbnb must link to robustness methodology');

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
    assert.match(html, /<meta\s+name="description"\s+content="[^"]+"/s, `${route}: description`);
    assert.doesNotMatch(html, /href="\/(?:assets\/)?resume\.pdf"/, `${route}: resume links must not use a local PDF`);
    assert(html.includes(`href="${resumeDriveUrl}"`), `${route}: resume link must use the Google Drive folder`);
    assert(html.includes(`href="${resumeDriveUrl}" target="_blank" rel="noopener noreferrer"`), `${route}: resume link must open securely in a new tab`);
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
