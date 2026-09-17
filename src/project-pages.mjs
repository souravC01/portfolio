import { projects } from './projects.mjs';

const siteUrl = 'https://souravchandhok.dev';

const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const screenshots = {
  roleimpact: '/assets/images/Roleimpact1.png',
  jobhelperguru: '/assets/images/JobHelperGuru1.png',
  'yu-bazaar': '/assets/images/yu-bazaar1.png',
  'toronto-airbnb': '/assets/images/Toronto%20Airbnb%201.png'
};
const showcases = {
  roleimpact: [
    { src: '/assets/images/Roleimpact1.png', alt: 'RoleImpact access-change simulation and mitigation analysis' },
    { src: '/assets/images/Roleimpact2.png', alt: 'RoleImpact organization structure and roles model' },
    { src: '/assets/images/Roleimpact%203.png', alt: 'RoleImpact workflow and capability mapping' },
    { src: '/assets/images/roleimpact%204.png', alt: 'RoleImpact operational consequence analysis' },
    { src: '/assets/images/roleimpact%205.png', alt: 'RoleImpact mitigation recommendations' },
    { src: '/assets/images/roleimpact%206.png.png', alt: 'RoleImpact relationship path tracing' },
    { src: '/assets/images/roleimpact%207.png', alt: 'RoleImpact access changes evaluation' },
    { src: '/assets/images/roleimpact%208.png.png', alt: 'RoleImpact simulation summary overview' }
  ],
  jobhelperguru: [
    { src: '/assets/images/JobHelperGuru1.png', alt: 'JobHelperGuru ATS match scoring and qualification analysis' },
    { src: '/assets/images/jobhelperguru2.png', alt: 'JobHelperGuru job description parsing and bullet optimizer' },
    { src: '/assets/images/jobhelperguru3.png', alt: 'JobHelperGuru resume comparison and claim verification' },
    { src: '/assets/images/jobhelperguru4.png', alt: 'JobHelperGuru application pipeline and tracking spreadsheet' },
    { src: '/assets/images/jobhelperguru5.png', alt: 'JobHelperGuru model provider settings and fallback heuristics' },
    { src: '/assets/images/jobhelperguru6.png', alt: 'JobHelperGuru workflow details and candidate tailoring' },
    { src: '/assets/images/jobhelper-live.jpg', alt: 'JobHelperGuru workspace dashboard overview' }
  ],
  'yu-bazaar': [
    { src: '/assets/images/yu-bazaar1.png', alt: 'YU Bazaar listing creation and account security verification' },
    { src: '/assets/images/yu-bazaar2.png', alt: 'YU Bazaar listing details and student contact flow' }
  ],
  'toronto-airbnb': [
    { src: '/assets/images/Toronto%20Airbnb%201.png', alt: 'Toronto Airbnb interactive neighbourhood map exploration' },
    { src: '/assets/images/Toronto%20Airbnb%202.png', alt: 'Toronto Airbnb Louvain and Leiden community partition comparison' },
    { src: '/assets/images/Toronto%20Airbnb%203.png', alt: 'Toronto Airbnb regression sensitivity and empirical price findings' }
  ]
};
const tags = project => `<div class="project-tags">${project.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div>`;
const links = project => `<div class="project-actions"><a href="${project.repo}" target="_blank" rel="noopener noreferrer">GitHub</a><a href="${project.demo}" target="_blank" rel="noopener noreferrer">Live demo ↗</a></div>`;


export function projectCards() {
  return projects.map(project => `<article class="project-card reveal" data-category="${project.filterCategory}" data-slug="${project.slug}" lang="en">
    <div class="project-card-header">
      <div class="project-card-domain">
        <span class="project-domain-pip" style="background-color: ${project.themeColor};" aria-hidden="true"></span>
        <span class="project-domain-text">${escape(project.category)}</span>
      </div>
    </div>
    <div class="project-preview-frame">
      <div class="preview-browser-bar" aria-hidden="true">
        <div class="preview-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="preview-address-bar">
          <svg class="preview-lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span class="preview-address-text">${project.slug}.sourav.dev</span>
        </div>
        <div class="preview-badge" style="color: ${project.themeColor}; border-color: ${project.themeColor};">${escape(project.featuredBadge)}</div>
      </div>
      <div class="project-media-wrapper">
        <img class="project-thumbnail" src="${screenshots[project.slug]}" alt="${escape(project.name)} ${project.slug === 'toronto-airbnb' ? 'research community map' : 'application screenshot'}" loading="lazy" decoding="async">
      </div>
    </div>
    <div class="project-info">
      <div class="project-title-row">
        <a class="project-title-link" href="/projects/${project.slug}/">
          <h3 class="project-title">${escape(project.name)}</h3>
          <span class="project-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
      <div class="project-subtitle">${escape(project.subtitle)}</div>
      <p class="project-desc">${escape(project.summary)}</p>
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="project-tag">${escape(tag)}</span>`).join('')}
      </div>
      <div class="project-footer-actions">
        <a class="case-study-btn" href="/projects/${project.slug}/">
          <span>Read case study</span>
          <span aria-hidden="true">→</span>
        </a>
        <div class="project-ext-links">
          <a href="${project.repo}" target="_blank" rel="noopener noreferrer" class="project-ghost-link" title="GitHub Repository">GitHub ↗</a>
          <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-ghost-link" title="Live Demonstration">Live demo ↗</a>
        </div>
      </div>
    </div>
  </article>`).join('');
}

export const contactSection = `<section id="contact" class="section-wrapper contact-section"><div class="container">
  <p class="section-eyebrow" data-i18n="contact_eyebrow">LET'S CONNECT</p>
  <h2 class="section-title" data-i18n="contact_title">Have an opportunity in mind?</h2>
  <p data-i18n="contact_body">I'm seeking full-time Java backend, full-stack, and AI application development opportunities across Canada.</p>
  <div class="project-actions"><a href="mailto:sourav.chandhok@gmail.com">sourav.chandhok@gmail.com</a><a href="https://www.linkedin.com/in/souravchandhok">LinkedIn ↗</a><a href="https://drive.google.com/drive/folders/1KaP-RA-Se7_0GJAdX_mI6Da3yhFThYQa?usp=drive_link" target="_blank" rel="noopener noreferrer" data-i18n="download_resume">Download my resume</a></div>
</div></section>`;

export function caseStudy(project, index) {
  const next = projects[(index + 1) % projects.length];
  const projectUrl = `${siteUrl}/projects/${project.slug}/`;
  const projectImage = `${siteUrl}${screenshots[project.slug]}`;
  const images = showcases[project.slug] || [{ src: screenshots[project.slug], alt: `${project.name} application screenshot` }];
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escape(project.name)} | Project by Sourav Chandhok</title>

  <meta name="description" content="${escape(project.summary)}">
  <meta name="author" content="Sourav Chandhok">

  <link rel="canonical" href="${projectUrl}">

  <meta property="og:title" content="${escape(project.name)} | Project by Sourav Chandhok">
  <meta property="og:description" content="${escape(project.summary)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${projectUrl}">
  <meta property="og:image" content="${projectImage}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escape(project.name)} | Project by Sourav Chandhok">
  <meta name="twitter:description" content="${escape(project.summary)}">
  <meta name="twitter:image" content="${projectImage}">

  <link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/style.css"></head><body>
  <a class="skip-to-content" href="#main">Skip to content</a>
  <header class="case-header container"><a href="/">Sourav Chandhok<span aria-hidden="true">.</span></a><a href="/#projects">All projects →</a></header>
  <main id="main" class="case-main container"><div class="case-intro"><p class="section-eyebrow">${escape(project.category)}</p>
  <h1>${escape(project.name)}</h1><p class="case-summary">${escape(project.summary)}</p>${tags(project)}${links(project)}
  <p class="case-note">Live demos may take a moment to wake up. Case studies and screenshots remain available here.</p></div>
  <figure class="case-screenshot case-showcase" data-showcase>
    <div class="showcase-viewport" tabindex="0" role="region" aria-roledescription="carousel" aria-label="${escape(project.name)} screenshot gallery">
      <div class="showcase-slides">
        ${images.map((img, i) => `
        <div class="showcase-slide${i === 0 ? ' active' : ''}" data-index="${i}">
          <img src="${img.src}" alt="${escape(img.alt)}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async">
        </div>`).join('')}
      </div>
      <button type="button" class="showcase-nav-btn showcase-prev" aria-label="Previous screenshot">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button type="button" class="showcase-nav-btn showcase-next" aria-label="Next screenshot">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
      </button>
      <div class="showcase-counter" aria-live="polite">
        <span class="showcase-counter-current">1</span> / <span class="showcase-counter-total">${images.length}</span>
      </div>
    </div>
    <figcaption>${escape(project.name)} · ${escape(project.format)}</figcaption>
  </figure>${project.metricsStrip ? `\n  ${project.metricsStrip}` : ''}
  <div class="case-layout"><nav class="case-toc" aria-label="Case study contents">${project.sections.map(section => `<a href="#${section.id}">${escape(section.title)}</a>`).join('')}</nav>
  <article>${project.sections.map(section => `<section id="${section.id}"><h2>${escape(section.title)}</h2>${section.html}</section>`).join('')}
  <nav class="case-next" aria-label="More projects"><a href="/#projects">All projects</a><a href="/projects/${next.slug}/">Next: ${escape(next.name)} →</a></nav></article></div></main>
  ${contactSection.replace(/ data-i18n="[^"]+"/g, '')}<footer class="site-footer"><p>Made by Sourav Chandhok · Toronto, Canada</p></footer>
  <script>
  (function() {
    var showcase = document.querySelector('[data-showcase]');
    if (!showcase) return;
    var slides = showcase.querySelectorAll('.showcase-slide');
    var prevBtn = showcase.querySelector('.showcase-prev');
    var nextBtn = showcase.querySelector('.showcase-next');
    var currentEl = showcase.querySelector('.showcase-counter-current');
    var viewport = showcase.querySelector('.showcase-viewport');
    if (!slides.length) return;
    var currentIndex = 0;
    var total = slides.length;
    function goToSlide(index) {
      slides[currentIndex].classList.remove('active');
      currentIndex = (index + total) % total;
      slides[currentIndex].classList.add('active');
      if (currentEl) currentEl.textContent = String(currentIndex + 1);
    }
    if (prevBtn) prevBtn.addEventListener('click', function(e) { e.preventDefault(); goToSlide(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function(e) { e.preventDefault(); goToSlide(currentIndex + 1); });
    if (viewport) {
      viewport.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goToSlide(currentIndex - 1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); goToSlide(currentIndex + 1); }
      });
    }
  })();
  </script></body></html>`;
}
