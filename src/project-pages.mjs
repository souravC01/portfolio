import { projects } from './projects.mjs';

const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const screenshots = {
  roleimpact: '/assets/images/roleimpact-live.jpg',
  jobhelperguru: '/assets/images/jobhelper-live.jpg',
  'yu-bazaar': '/assets/yu-bazaar.jpg',
  'toronto-airbnb': '/assets/airbnb-network.png'
};
const tags = project => `<div class="project-tags">${project.tags.map(tag => `<span>${escape(tag)}</span>`).join('')}</div>`;
const links = project => `<div class="project-actions"><a href="${project.repo}" target="_blank" rel="noopener noreferrer">GitHub</a><a href="${project.demo}" target="_blank" rel="noopener noreferrer">Live demo ↗</a></div>`;

export function projectsFilterBar() {
  return `<div class="projects-filter-bar reveal" role="tablist" aria-label="Filter projects by specialization">
    <button type="button" class="project-filter-btn active" data-filter="all" role="tab" aria-selected="true">
      <span>All Projects</span>
      <span class="filter-count">4</span>
    </button>
    <button type="button" class="project-filter-btn" data-filter="java-systems" role="tab" aria-selected="false">
      <span>Java &amp; Systems</span>
      <span class="filter-count">2</span>
    </button>
    <button type="button" class="project-filter-btn" data-filter="applied-ai" role="tab" aria-selected="false">
      <span>Applied AI</span>
      <span class="filter-count">1</span>
    </button>
    <button type="button" class="project-filter-btn" data-filter="research" role="tab" aria-selected="false">
      <span>Data &amp; Research</span>
      <span class="filter-count">1</span>
    </button>
  </div>`;
}

export function projectCards() {
  return projects.map(project => `<article class="project-card reveal" data-category="${project.filterCategory}" data-slug="${project.slug}" lang="en">
    <div class="project-blueprint-header" style="--accent-glow: ${project.themeColor};">
      <div class="blueprint-topbar">
        <div class="blueprint-domain">
          <span class="blueprint-pip" style="background-color: ${project.themeColor};" aria-hidden="true"></span>
          <span class="blueprint-category">${escape(project.category)}</span>
        </div>
        <div class="blueprint-date">
          <svg class="blueprint-cal-icon" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
          <span>${escape(project.timeline)}</span>
        </div>
      </div>
      <div class="blueprint-canvas">
        <div class="blueprint-grid-bg" aria-hidden="true"></div>
        <div class="blueprint-watermark" aria-hidden="true">${escape(project.watermark)}</div>
        <div class="blueprint-media-frame">
          <img class="blueprint-thumbnail" src="${screenshots[project.slug]}" alt="${escape(project.name)} ${project.slug === 'toronto-airbnb' ? 'research community map' : 'application screenshot'}" loading="lazy" decoding="async">
          <div class="blueprint-glow-overlay" aria-hidden="true"></div>
          <div class="blueprint-badge" style="border-color: ${project.themeColor}; color: ${project.themeColor};">${escape(project.featuredBadge)}</div>
        </div>
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
  <div class="project-actions"><a href="mailto:sourav.chandhok@gmail.com">sourav.chandhok@gmail.com</a><a href="https://www.linkedin.com/in/souravchandhok">LinkedIn ↗</a><a href="/assets/resume.pdf" download data-i18n="download_resume">Download my resume</a></div>
</div></section>`;

export function caseStudy(project, index) {
  const next = projects[(index + 1) % projects.length];
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escape(project.name)} — Sourav Chandhok</title><meta name="description" content="${escape(project.summary)}">
  <link rel="icon" href="/favicon.svg"><link rel="stylesheet" href="/style.css"></head><body>
  <a class="skip-to-content" href="#main">Skip to content</a>
  <header class="case-header container"><a href="/">Sourav Chandhok<span aria-hidden="true">.</span></a><a href="/#projects">All projects →</a></header>
  <main id="main" class="case-main container"><div class="case-intro"><p class="section-eyebrow">${escape(project.category)}</p>
  <h1>${escape(project.name)}</h1><p class="case-summary">${escape(project.summary)}</p>${tags(project)}${links(project)}
  <p class="case-note">Live demos may take a moment to wake up. Case studies and screenshots remain available here.</p></div>
  <figure class="case-screenshot"><img src="${screenshots[project.slug]}" alt="${escape(project.name)} ${project.slug === 'toronto-airbnb' ? 'research community map' : 'application screenshot'}"><figcaption>${escape(project.name)} · ${escape(project.format)}</figcaption></figure>
  <div class="case-layout"><nav class="case-toc" aria-label="Case study contents">${project.sections.map(section => `<a href="#${section.id}">${escape(section.title)}</a>`).join('')}</nav>
  <article>${project.sections.map(section => `<section id="${section.id}"><h2>${escape(section.title)}</h2>${section.html}</section>`).join('')}
  <nav class="case-next" aria-label="More projects"><a href="/#projects">All projects</a><a href="/projects/${next.slug}/">Next: ${escape(next.name)} →</a></nav></article></div></main>
  ${contactSection.replace(/ data-i18n="[^"]+"/g, '')}<footer class="site-footer"><p>Made by Sourav Chandhok · Toronto, Canada</p></footer></body></html>`;
}
