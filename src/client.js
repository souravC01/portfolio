/* ==========================================================================
   PORTFOLIO CLIENT SCRIPT — REPLICATING EMMANUELEBEH.DEV
   Features:
   - Typewriter animation with cursor and bilingual support
   - Scroll reveals with IntersectionObserver
   - Navigation scroll-spy (desktop floating pill & mobile drawer)
   - Real-time Web Audio API frequency equalizer visualizer
   - Bilingual language switcher (EN / FR) with instant reactive translation
   - Mobile navigation drawer
   ========================================================================== */

(function () {
  'use strict';

  // --- Translations Dictionary ---
  const i18nData = {
    en: {
      nav_about: 'About',
      nav_skills: 'Skills',
      nav_education: 'Education',
      nav_experiences: 'Experiences',
      nav_projects: 'Projects',
      nav_contact: 'Contact',
      hero_role: 'Full-Stack, Java backend, and AI application developer',
      hero_location: 'Based in Toronto · Seeking full-time opportunities across Canada.',
      contact_eyebrow: "LET'S CONNECT",
      contact_title: 'Have an opportunity in mind?',
      contact_body: "I'm seeking full-time Java backend, full-stack, and AI application development opportunities across Canada.",
      available_badge: 'Available for work',
      hero_hello: "Hello, I'm",
      hero_name: 'Sourav Chandhok',
      hero_im: "I'm a",
      hero_bio: 'Computer Science graduate from York University building resilient Java backends, modern React applications, and production-tested systems.',
      skills_eyebrow: 'MY TOOLKIT',
      skills_title: 'Technical Skills & Tools',
      skills_subtitle: 'A comprehensive catalog of languages, frameworks, and developer toolchains I build with.',
      // Education
      edu_eyebrow: 'ACADEMIC BACKGROUND & CREDENTIALS',
      edu_title: 'Education & Credentials',
      edu_subtitle: 'Foundational computer science principles, software architecture, and technology entrepreneurship.',
      edu_1_title: 'B.Sc. (Honours) in Computer Science',
      edu_1_school: 'York University • Toronto, ON',
      edu_1_convocation: 'October, 2026',
      edu_1_desc: 'Computer Science program focused on software engineering, algorithms, data structures, object-oriented programming, operating systems, and database systems, with extensive development experience in Java.',
      edu_tags_foundations: 'CORE FOUNDATIONS & COURSEWORK',
      edu_2_title: 'Bergeron Entrepreneurs in Science & Technology (BEST) Certificate',
      edu_2_school: 'Lassonde School of Engineering • York University',
      edu_2_desc: 'Entrepreneurship and technology innovation program focused on product development, business model validation, venture creation, and translating technical ideas into viable solutions.',
      edu_tags_capabilities: 'SPECIALIZED CAPABILITIES',
      // Experiences
      exp_eyebrow: 'WORK HISTORY & INDUSTRY EXPERIENCE',
      exp_title: 'Professional Experience',
      exp_subtitle: 'Building reliable full-stack applications through collaborative development, testing, and release delivery.',
      download_resume: 'Download my resume',
      projects_eyebrow: 'FEATURED WORK & ENGINEERING EVIDENCE',
      projects_title: 'Featured Projects',
      projects_subtitle: 'Production systems, distributed architectures, applied AI workflows, and empirical research.',
      made_by: 'Made by Sourav Chandhok',
      exp_1_title: 'Application Programmer Analyst Co-op',
      exp_1_company: 'Ministry of Education, Ontario Public Service',
      exp_1_date: 'May 2023 - Aug 2024',
      typewriter_words: [
        'Software Developer',
        'Java Backend Developer',
        'Problem Solver',
        'Full-Stack Developer',
        'AI Application Developer',
        'Curious Builder',
        'Adventurer',
        'Yu Lion'
      ],
      // AFK / Hobbies
      afk_eyebrow: 'OUTSIDE THE CODE',
      afk_title: 'Beyond the Terminal',
      afk_subtitle: 'A mix of high-altitude trails, alpine lakes, open water, and life outside code.',
      afk_tag_trails: '[TRAILS & NATURE]',
      afk_trails_title: 'Best thoughts come mid-trail',
      afk_trails_desc: 'Hiking alpine ridge lines and red-rock backcountry to build endurance and mental clarity. Stepping away from syntax quietly resets the loop every time.',
      afk_tag_chess: '[HIKING & EXPLORATION]',
      afk_chess_title: 'The best views are earned',
      afk_chess_desc: 'Exploring mountain trails, alpine lakes, and the landscapes waiting beyond the familiar route.',
      afk_tag_water: '[WATER & ADRENALINE]',
      afk_water_title: 'Open water & speed',
      afk_water_desc: 'Carving wake and feeling raw velocity across open water on bright afternoons. An adrenaline-charged physical counterweight to sedentary terminal sessions.'
    },
    fr: {
      nav_about: 'À propos',
      nav_skills: 'Compétences',
      nav_education: 'Formation',
      nav_experiences: 'Expériences',
      nav_projects: 'Projets',
      nav_contact: 'Contact',
      hero_role: "Développeur full-stack, Java backend et d’applications IA",
      hero_location: 'Basé à Toronto · À la recherche d’un poste à temps plein au Canada.',
      contact_eyebrow: 'CONTACT',
      contact_title: 'Une opportunité à partager ?',
      contact_body: 'Je recherche un poste à temps plein en développement Java backend, full-stack ou d’applications IA au Canada.',
      available_badge: 'Disponible pour travailler',
      hero_hello: 'Bonjour, je suis',
      hero_name: 'Sourav Chandhok',
      hero_im: 'Je suis un',
      hero_bio: "Diplômé en informatique de l’Université York, concevant des backends Java résilients, des applications React modernes et des systèmes testés pour la production.",
      skills_eyebrow: 'MES OUTILS',
      skills_title: 'Compétences techniques et outils',
      skills_subtitle: 'Un catalogue complet des langages, frameworks et outils de développement que j’utilise.',
      // Education
      edu_eyebrow: 'FORMATION ACADÉMIQUE & DIPLÔMES',
      edu_title: 'Formation & Diplômes',
      edu_subtitle: 'Principes fondamentaux de l’informatique, architecture logicielle et entrepreneuriat technologique.',
      edu_1_title: 'B.Sc. (Spécialisé) en Informatique',
      edu_1_school: 'Université York • Toronto, ON',
      edu_1_convocation: 'Collation des grades en octobre 2026',
      edu_1_desc: 'Programme d’informatique axé sur le génie logiciel, les algorithmes, les structures de données, la programmation orientée objet, les systèmes d’exploitation et les systèmes de bases de données, avec une vaste expérience de développement en Java.',
      edu_tags_foundations: 'FONDATIONS & COURS CLÉS',
      edu_2_title: 'Certificat Bergeron Entrepreneurs in Science & Technology (BEST)',
      edu_2_school: 'École d’ingénierie Lassonde • Université York',
      edu_2_desc: 'Programme d’entrepreneuriat et d’innovation technologique axé sur le développement de produits, la validation de modèles d’affaires, la création d’entreprises et la transformation d’idées techniques en solutions viables.',
      edu_tags_capabilities: 'COMPÉTENCES SPÉCIALISÉES',
      // Experiences
      exp_eyebrow: 'PARCOURS PROFESSIONNEL & EXPÉRIENCE',
      exp_title: 'Expérience Professionnelle',
      exp_subtitle: 'Création d’applications fiables grâce au développement collaboratif, aux tests rigoureux et à des mises en production maîtrisées.',
      download_resume: 'Télécharger mon CV',
      projects_eyebrow: 'PROJETS VEDETTES & PREUVES D’INGÉNIERIE',
      projects_title: 'Projets Vedettes',
      projects_subtitle: 'Systèmes de production, architectures distribuées, flux d’IA appliquée et recherche empirique.',
      made_by: 'Conçu par Sourav Chandhok',
      exp_1_title: "Analyste Programmeur d'Applications (Stage)",
      exp_1_company: "Ministère de l'Éducation, Fonction publique de l'Ontario",
      exp_1_date: 'Mai 2023 - Août 2024',
      typewriter_words: [
        'Développeur Logiciel',
        'Développeur Java Backend',
        'Résolveur de Problèmes',
        'Développeur Full-Stack',
        'Développeur Applications IA',
        'Bâtisseur Curieux',
        'Aventurier',
        'Yu Lion'
      ],
      // AFK / Hobbies
      afk_eyebrow: 'HORS DU CODE',
      afk_title: 'Au-delà du terminal',
      afk_subtitle: 'Un mélange de sentiers en haute altitude, de coups calculés, de grand large et de vie hors du code.',
      afk_tag_trails: '[SENTIERS & NATURE]',
      afk_trails_title: 'Les meilleures idées naissent sur les sentiers',
      afk_trails_desc: "Explorer les crêtes alpines et les sentiers rocheux pour forger endurance et clarté d'esprit. S'éloigner de la syntaxe réinitialise l'esprit à chaque fois.",
      afk_tag_chess: '[RANDONNÉE & EXPLORATION]',
      afk_chess_title: 'Les plus belles vues se méritent',
      afk_chess_desc: 'Explorer les sentiers de montagne, les lacs alpins et les paysages qui attendent au-delà des chemins familiers.',
      afk_tag_water: '[EAU & ADRÉNALINE]',
      afk_water_title: 'Grand large & vitesse',
      afk_water_desc: "Fendre l'eau et ressentir la vitesse pure sur le lac les après-midis ensoleillés. Un contrepoids physique électrisant aux longues sessions devant le terminal."
    }
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentLang = localStorage.getItem('portfolio_lang') || 'en';
  let lenisInstance = null;

  // --- Typewriter Controller ---
  let typewriterTimeout = null;
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function initTypewriter() {
    clearTimeout(typewriterTimeout);
    typewriterTimeout = null;
    const target = document.querySelector('.typewriter-text');
    if (!target) return;

    const words = i18nData[currentLang] && i18nData[currentLang].typewriter_words
      ? i18nData[currentLang].typewriter_words
      : [
          'Software Developer',
          'Java Backend Developer',
          'Problem Solver',
          'Full-Stack Developer',
          'AI Application Developer',
          'Curious Builder',
          'Adventurer',
          'Yu Lion'
        ];

    // On initial page load with pre-rendered first word, start from full word and pause
    if (charIndex === 0 && !isDeleting && wordIndex === 0 && target.textContent.trim() === words[0]) {
      charIndex = words[0].length;
      isDeleting = true;
      typewriterTimeout = setTimeout(step, 2000);
      return;
    }

    function step() {
      if (document.hidden) {
        return; // Paused while tab is hidden; visibilitychange will resume
      }

      const currentWord = words[wordIndex % words.length];

      if (isDeleting) {
        target.textContent = currentWord.substring(0, Math.max(0, charIndex - 1));
        charIndex--;
      } else {
        target.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 45 : 90;

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex <= 0) {
        charIndex = 0;
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400; // Pause before typing next word
      }

      typewriterTimeout = setTimeout(step, speed);
    }

    step();
  }

  function handleVisibilityChange() {
    if (!document.hidden) {
      if (!typewriterTimeout) {
        initTypewriter();
      }
    } else {
      clearTimeout(typewriterTimeout);
      typewriterTimeout = null;
    }
  }
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // --- Language Switcher ---
  function applyLanguage(lang) {
    if (!i18nData[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;

    const dict = i18nData[lang];

    // Update all [data-i18n] text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update Language Button State & Flag
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
      const flagImg = langBtn.querySelector('img');
      const labelSpan = langBtn.querySelector('span');
      if (flagImg) {
        flagImg.src = lang === 'fr' ? '/assets/images/fr.svg' : '/assets/images/ca.svg';
        flagImg.alt = lang.toUpperCase();
      }
      if (labelSpan) {
        labelSpan.textContent = lang.toUpperCase();
      }
    }

    // Update Mobile Drawer Lang Buttons
    document.querySelectorAll('.drawer-lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Desktop Dropdown Options
    document.querySelectorAll('.lang-option').forEach(opt => {
      const optLang = opt.getAttribute('data-lang');
      if (optLang === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // Restart typewriter with localized words
    wordIndex = 0;
    charIndex = 0;
    isDeleting = false;
    initTypewriter();
  }

  // --- Desktop Language Dropdown ---
  function initLangDropdown() {
    const langBtn = document.querySelector('.lang-btn');
    const dropdown = document.querySelector('.lang-dropdown');
    if (!langBtn || !dropdown) return;

    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('show');
      langBtn.classList.toggle('open', isOpen);
      langBtn.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const selectedLang = opt.getAttribute('data-lang');
        applyLanguage(selectedLang);
        dropdown.classList.remove('show');
        langBtn.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !langBtn.contains(e.target)) {
        dropdown.classList.remove('show');
        langBtn.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Mobile Drawer Navigation ---
  function initMobileDrawer() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const backdrop = document.querySelector('.drawer-backdrop');
    const closeBtn = document.querySelector('.drawer-close-btn');
    const drawerLinks = document.querySelectorAll('.drawer-link');
    const drawerLangBtns = document.querySelectorAll('.drawer-lang-btn');

    if (!toggleBtn || !drawer || !backdrop) return;

    function openDrawer() {
      if (lenisInstance) lenisInstance.stop();
      drawer.inert = false;
      drawer.classList.add('open');
      backdrop.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      closeBtn?.focus();
    }

    function closeDrawer() {
      const hadFocus = drawer.contains(document.activeElement);
      drawer.classList.remove('open');
      drawer.inert = true;
      backdrop.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (lenisInstance) lenisInstance.start();
      if (hadFocus) toggleBtn.focus();
    }

    toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
        const targetId = link.getAttribute('data-target');
        if (targetId) {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            targetEl.setAttribute('tabindex', '-1');
            targetEl.focus({ preventScroll: true });
            if (lenisInstance && !reducedMotion.matches) {
              lenisInstance.scrollTo(targetEl, { offset: -10, duration: 1.2 });
            } else {
              targetEl.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
            }
          }
        }
      });
    });

    drawerLangBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        applyLanguage(lang);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && drawer.classList.contains('open')) {
        const items = [...drawer.querySelectorAll('button, a[href], [tabindex="0"]')].filter(el => !el.disabled);
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', event => {
      if (event.matches) closeDrawer();
    });
  }

  // --- Scroll Reveals (IntersectionObserver) ---
  function initScrollReveals() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;
    reveals.forEach(el => el.classList.add('reveal-pending'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '50px 0px 50px 0px'
      });

      reveals.forEach(el => observer.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('is-visible'));
    }
  }

  // --- Scroll Spy & Nav Link Active Highlighting ---
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.roll-link');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    function setActive(id) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
      drawerLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-target') === '#' + id);
      });
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      }, {
        rootMargin: '-20% 0px -70% 0px'
      });

      sections.forEach(s => observer.observe(s));
    }
  }


  // --- Lenis Smooth Momentum Scrolling (matching emmanuelebeh.dev) ---
  function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;

    try {
      lenisInstance = new Lenis({
        lerp: 0.1, // silky fluid momentum curve matching emmanuelebeh.dev
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        smoothWheel: true,
        autoRaf: true,
        respectReducedMotion: false // Prevent OS reduce-motion setting from disabling smooth wheel momentum
      });
      window.portfolioLenis = lenisInstance;

      // Smooth anchor navigation for all internal links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href && href.length > 1) {
            const targetEl = document.querySelector(href);
            if (targetEl) {
              e.preventDefault();
              anchor.blur();
              if (document.activeElement && typeof document.activeElement.blur === 'function') {
                document.activeElement.blur();
              }
              if (lenisInstance) {
                lenisInstance.scrollTo(targetEl, { offset: -10, duration: 1.2 });
              } else {
                targetEl.scrollIntoView({ behavior: 'smooth' });
              }
              if (history.pushState) {
                history.pushState(null, null, href);
              }
            }
          }
        });
      });
    } catch (e) {
      console.warn('Lenis initialization fallback:', e);
    }
  }

  // --- Collapsible Desktop Navbar on Scroll (Gradual Scrubbing & Smart Headroom Auto-Hide) ---
  function initCollapsibleNavbar() {
    const container = document.querySelector('.floating-nav-container');
    const nav = document.querySelector('.floating-nav');
    const wrapper = document.querySelector('.nav-links-wrapper');
    const links = document.querySelector('.nav-links');
    if (!nav || !wrapper || !links || !container) return;

    // Keep fully expanded for top 180px (stationary hero header)
    const startScroll = 180;

    let lastY = window.pageYOffset || document.documentElement.scrollTop;
    let isTicking = false;
    let collapseTimer = null;

    function updateNavbar(currentY) {
      const diff = currentY - lastY;

      // 1. Within top 180px: Hero state — always visible and fully expanded
      if (currentY <= startScroll) {
        if (collapseTimer) {
          clearTimeout(collapseTimer);
          collapseTimer = null;
        }
        container.classList.remove('is-hidden');
        nav.classList.remove('is-scroll-up');
        nav.classList.remove('is-collapsing');
        nav.classList.remove('is-deep-collapsed');
        wrapper.style.pointerEvents = 'auto';
      }
      // 2. Beyond top 180px: Smart Headroom with Symmetrical Inward Collapse & Outward Expand
      else {
        // SCROLL DOWN: Fold inward to center capsule, then slide off-screen
        if (diff > 8) {
          // Only trigger collapse sequence if currently visible
          if (!container.classList.contains('is-hidden')) {
            // Stage 1: Fold links inward from sides into center capsule
            nav.classList.remove('is-scroll-up');
            nav.classList.add('is-collapsing');
            nav.classList.add('is-deep-collapsed');
            wrapper.style.pointerEvents = 'none';

            // Stage 2: Once folded into capsule (~500ms), slide capsule off-screen
            if (!collapseTimer) {
              collapseTimer = setTimeout(() => {
                container.classList.add('is-hidden');
                nav.classList.remove('is-collapsing');
                collapseTimer = null;
              }, 500);
            }
          }
        }
        // SCROLL UP: Slide capsule into view, then unfurl outward from center
        else if (diff < -8) {
          if (collapseTimer) {
            clearTimeout(collapseTimer);
            collapseTimer = null;
          }
          container.classList.remove('is-hidden');
          nav.classList.remove('is-collapsing');
          nav.classList.add('is-scroll-up');
          nav.classList.add('is-deep-collapsed');
          wrapper.style.pointerEvents = 'auto';
        }
      }

      lastY = currentY;
    }

    // Top-of-viewport mouse movement reveal for desktop convenience
    document.addEventListener('mousemove', (e) => {
      if (e.clientY <= 30 && container.classList.contains('is-hidden')) {
        if (collapseTimer) {
          clearTimeout(collapseTimer);
          collapseTimer = null;
        }
        container.classList.remove('is-hidden');
        nav.classList.remove('is-collapsing');
        nav.classList.add('is-scroll-up');
        nav.classList.add('is-deep-collapsed');
      }
    });

    // Hover & link-click handlers for seamless collapsed interactions
    nav.addEventListener('mouseleave', () => {
      nav.classList.remove('is-clicked');
    });

    wrapper.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        nav.classList.add('is-clicked');
      }
    });

    function onScroll() {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          const currentY = window.pageYOffset || document.documentElement.scrollTop;
          updateNavbar(currentY);
          isTicking = false;
        });
        isTicking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial check on load
    const initialY = window.pageYOffset || document.documentElement.scrollTop;
    if (initialY > startScroll) {
      container.classList.add('is-hidden');
      nav.classList.add('is-deep-collapsed');
      wrapper.style.pointerEvents = 'none';
    }
    updateNavbar(initialY);
  }

  // --- Skills Category Filter Tabs ---
  function initSkillsFilter() {
    const filterNav = document.querySelector('.skills-filter-nav');
    if (!filterNav) return;

    const filterBtns = filterNav.querySelectorAll('.skills-filter-btn');
    const cards = document.querySelectorAll('.skill-category-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active tab button
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        // Filter cards smoothly
        cards.forEach(card => {
          const category = card.dataset.category;
          if (filter === 'all' || category === filter) {
            card.classList.remove('is-dimmed');
            card.classList.add('is-highlighted');
          } else {
            card.classList.add('is-dimmed');
            card.classList.remove('is-highlighted');
          }
        });
      });
    });
  }

  // --- Initialize Everything ---
  function initAll() {
    initSmoothScroll();
    initCollapsibleNavbar();
    applyLanguage(currentLang);
    initLangDropdown();
    initMobileDrawer();
    initScrollReveals();
    initScrollSpy();
    initSkillsFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
