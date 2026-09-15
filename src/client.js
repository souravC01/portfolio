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
      view_projects: 'View projects',
      contact_eyebrow: "LET'S CONNECT",
      contact_title: 'Have an opportunity in mind?',
      contact_body: "I'm seeking full-time Java backend, full-stack, and AI application development opportunities across Canada.",
      available_badge: 'Available for work',
      hero_hello: "Hello, I'm",
      hero_name: 'Sourav Chandhok',
      hero_im: "I'm a",
      hero_bio: 'Computer Science graduate from York University building resilient Java backends, modern React applications, and production-tested systems.',
      completed_projects: 'Featured projects',
      skills_eyebrow: 'MY TOOLKIT',
      skills_title: 'Technical Skills & Tools',
      skills_subtitle: 'A comprehensive catalog of languages, frameworks, and developer toolchains I build with.',
      // Education
      edu_eyebrow: 'ACADEMIC BACKGROUND & CREDENTIALS',
      edu_title: 'Education & Credentials',
      edu_subtitle: 'Foundational computer science principles, software architecture, and technology entrepreneurship.',
      edu_1_status: 'Academic Requirements Completed',
      edu_1_title: 'B.Sc. (Honours) in Computer Science',
      edu_focus_1: 'Software & Systems',
      edu_1_school: 'York University • Toronto, ON',
      edu_1_convocation: 'October, 2026',
      edu_1_desc: 'Computer Science program focused on software engineering, algorithms, data structures, object-oriented programming, operating systems, and database systems, with extensive development experience in Java.',
      edu_tags_foundations: 'CORE FOUNDATIONS & COURSEWORK',
      edu_2_status: 'Certificate of Achievement',
      edu_2_title: 'Bergeron Entrepreneurs in Science & Technology (BEST) Certificate',
      edu_focus_2: 'Tech Commercialization',
      edu_2_school: 'Lassonde School of Engineering • York University',
      edu_2_convocation: 'Bergeron Entrepreneurs in Science & Technology',
      edu_2_desc: 'Entrepreneurship and technology innovation program focused on product development, business model validation, venture creation, and translating technical ideas into viable solutions.',
      edu_tags_capabilities: 'SPECIALIZED CAPABILITIES',
      // Experiences
      exp_eyebrow: 'WORK HISTORY & INDUSTRY EXPERIENCE',
      exp_title: 'Professional Experience',
      exp_subtitle: 'Building reliable full-stack applications through collaborative development, testing, and release delivery.',
      download_resume: 'Download my resume',
      projects_eyebrow: 'Featured Projects & Applications',
      projects_title: 'My Projects',
      made_by: 'Made by Sourav Chandhok',
      exp_1_title: 'Application Programmer Analyst Co-op',
      exp_1_company: 'Ministry of Education, Ontario Public Service',
      exp_1_date: 'May 2023 - Aug 2024',
      exp_1_desc: 'Supported development, testing, and release of Ontario government web applications using React, Java, and REST APIs across QA and UAT environments. Implemented JavaScript/React front-end changes alongside Java backend logic for functional workflows. Automated REST API tests with REST Assured, Postman, and Newman while validating backend data with SQL and Oracle for payloads and data flows. Built and maintained 500+ manual and automated test cases with Java, Selenium WebDriver, and TestNG using the Page Object Model (POM) for cross-browser testing (Chrome & Edge). Configured Jenkins CI/CD jobs with Maven parameters to execute automated regression suites, tracked 200+ defects in JIRA and HP ALM, and actively contributed to Agile/Scrum sprint planning, stand-ups, and retrospectives.',
      // Projects
      proj_1_desc: 'AI-powered job application workspace using React and Python/FastAPI that analyzes postings, matches résumés, suggests evidence-aware bullet revisions, and features an offline heuristic fallback when external models are unavailable. Verified with automated pytest suites.',
      proj_2_desc: 'Full-stack access-impact simulator built with Java 21, Spring Boot, and React. Evaluates permission changes using deterministic domain models, asynchronous Kafka microservices, and Testcontainers integration tests against real PostgreSQL instances.',
      proj_3_desc: 'Modernized Java campus marketplace for York University students featuring Spring Security, OTP verification, RabbitMQ asynchronous messaging queue, and containerized deployment with Kubernetes.',
      typewriter_words: ['Full-Stack Developer', 'Java Backend Engineer', 'AI Application Developer', 'Software Engineer'],
      // AFK / Hobbies
      afk_eyebrow: '// AWAY FROM THE KEYBOARD',
      afk_title: 'Beyond the Terminal — AFK',
      afk_subtitle: 'A mix of high-altitude trails, calculated moves, open water, and life outside code.',
      afk_tag_trails: '[TRAILS & NATURE]',
      afk_trails_title: 'Best thoughts come mid-trail',
      afk_trails_desc: 'Hiking alpine ridge lines and red-rock backcountry to build endurance and mental clarity. Stepping away from syntax quietly resets the loop every time.',
      afk_tag_chess: '[STRATEGY & CHESS]',
      afk_chess_title: '64 squares, calculated patience',
      afk_chess_desc: 'Deep positional play, pattern recognition, and calculating moves ahead under strict blitz clock pressure. The ultimate sandbox for tactical trade-offs.',
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
      view_projects: 'Voir les projets',
      contact_eyebrow: 'CONTACT',
      contact_title: 'Une opportunité à partager ?',
      contact_body: 'Je recherche un poste à temps plein en développement Java backend, full-stack ou d’applications IA au Canada.',
      available_badge: 'Disponible pour travailler',
      hero_hello: 'Bonjour, je suis',
      hero_name: 'Sourav Chandhok',
      hero_im: 'Je suis un',
      hero_bio: "Diplômé en informatique de l’Université York, concevant des backends Java résilients, des applications React modernes et des systèmes testés pour la production.",
      completed_projects: 'Projets présentés',
      skills_eyebrow: 'MES OUTILS',
      skills_title: 'Compétences techniques et outils',
      skills_subtitle: 'Un catalogue complet des langages, frameworks et outils de développement que j’utilise.',
      // Education
      edu_eyebrow: 'FORMATION ACADÉMIQUE & DIPLÔMES',
      edu_title: 'Formation & Diplômes',
      edu_subtitle: 'Principes fondamentaux de l’informatique, architecture logicielle et entrepreneuriat technologique.',
      edu_1_status: 'Exigences académiques complétées',
      edu_1_title: 'B.Sc. (Spécialisé) en Informatique',
      edu_focus_1: 'Logiciels & Systèmes',
      edu_1_school: 'Université York • Toronto, ON',
      edu_1_convocation: 'Collation des grades en octobre 2026',
      edu_1_desc: 'Programme d’informatique axé sur le génie logiciel, les algorithmes, les structures de données, la programmation orientée objet, les systèmes d’exploitation et les systèmes de bases de données, avec une vaste expérience de développement en Java.',
      edu_tags_foundations: 'FONDATIONS & COURS CLÉS',
      edu_2_status: 'Certificat de Réussite',
      edu_2_title: 'Certificat Bergeron Entrepreneurs in Science & Technology (BEST)',
      edu_focus_2: 'Commercialisation Tech',
      edu_2_school: 'École d’ingénierie Lassonde • Université York',
      edu_2_convocation: 'Bergeron Entrepreneurs in Science & Technology',
      edu_2_desc: 'Programme d’entrepreneuriat et d’innovation technologique axé sur le développement de produits, la validation de modèles d’affaires, la création d’entreprises et la transformation d’idées techniques en solutions viables.',
      edu_tags_capabilities: 'COMPÉTENCES SPÉCIALISÉES',
      // Experiences
      exp_eyebrow: 'PARCOURS PROFESSIONNEL & EXPÉRIENCE',
      exp_title: 'Expérience Professionnelle',
      exp_subtitle: 'Création d’applications fiables grâce au développement collaboratif, aux tests rigoureux et à des mises en production maîtrisées.',
      download_resume: 'Télécharger mon CV',
      projects_eyebrow: 'Projets & Applications Réalisés',
      projects_title: 'Mes Projets',
      made_by: 'Conçu par Sourav Chandhok',
      exp_1_title: "Analyste Programmeur d'Applications (Stage)",
      exp_1_company: "Ministère de l'Éducation, Fonction publique de l'Ontario",
      exp_1_date: 'Mai 2023 - Août 2024',
      exp_1_desc: "Participation au développement, aux tests et à la livraison d'applications web gouvernementales avec React, Java et API REST en environnements QA et UAT. Évolution du frontend React et de la logique backend Java. Automatisation des tests d'API avec REST Assured, Postman et Newman avec validation SQL et Oracle. Création de plus de 500 tests automatisés avec Java, Selenium WebDriver et TestNG (Page Object Model) sur Chrome et Edge. Configuration de jobs Jenkins CI/CD avec Maven, suivi de 200+ anomalies sur JIRA/HP ALM et participation active aux cérémonies Agile/Scrum.",
      // Projects
      proj_1_desc: "Espace de recherche d'emploi propulsé par l'IA avec React et Python/FastAPI avec analyse d'offres, correspondance de CV et solution de repli heuristique hors-ligne. Validé par tests pytest automatisés.",
      proj_2_desc: "Simulateur d'impact d'accès conçu avec Java 21, Spring Boot et React. Modèles déterministes, microservices asynchrones Kafka et tests d'intégration Testcontainers avec PostgreSQL.",
      typewriter_words: ['Développeur Full-Stack', 'Ingénieur Java Backend', 'Développeur Applications IA', 'Ingénieur Logiciel'],
      // AFK / Hobbies
      afk_eyebrow: '// HORS DU CLAVIER',
      afk_title: 'Au-delà du terminal — AFK',
      afk_subtitle: 'Un mélange de sentiers en haute altitude, de coups calculés, de grand large et de vie hors du code.',
      afk_tag_trails: '[SENTIERS & NATURE]',
      afk_trails_title: 'Les meilleures idées naissent sur les sentiers',
      afk_trails_desc: "Explorer les crêtes alpines et les sentiers rocheux pour forger endurance et clarté d'esprit. S'éloigner de la syntaxe réinitialise l'esprit à chaque fois.",
      afk_tag_chess: '[STRATÉGIE & ÉCHECS]',
      afk_chess_title: '64 cases, patience calculée',
      afk_chess_desc: "Jeu positionnel approfondi, reconnaissance de motifs et calcul de coups sous la pression du blitz. Le banc d'essai idéal pour peser les compromis tactiques.",
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
      : ['Java Developer', 'Full-Stack Developer', 'AI App Developer'];

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

  // --- Web Audio API Equalizer & Player ---
  function initAudioEqualizer() {
    const audio = document.getElementById('bg-audio');
    const playBtn = document.querySelector('.audio-play-btn');
    const bars = document.querySelectorAll('.equalizer-bar');

    if (!audio || !playBtn || bars.length === 0) return;

    let audioCtx = null;
    let analyser = null;
    let sourceNode = null;
    let animationFrameId = null;
    let isPlaying = false;
    let dataArray = null;

    // SVG Icons
    const playSvg = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-accent-orange ml-0.5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>`;
    const pauseSvg = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-accent-orange" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="4" width="4" height="16" rx="1"></rect><rect x="6" y="4" width="4" height="16" rx="1"></rect></svg>`;

    function setupAudioContext() {
      if (audioCtx) return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        sourceNode = audioCtx.createMediaElementSource(audio);
        sourceNode.connect(analyser);
        analyser.connect(audioCtx.destination);
        dataArray = new Uint8Array(analyser.frequencyBinCount);
      } catch (e) {
        console.warn('AudioContext setup fallback:', e);
      }
    }

    function renderBars() {
      if (!isPlaying || reducedMotion.matches) {
        bars.forEach(bar => {
          bar.style.height = '3px';
        });
        return;
      }

      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        // Distribute frequency indices across the 12 bars
        const step = Math.max(1, Math.floor(dataArray.length / bars.length));
        bars.forEach((bar, idx) => {
          const val = dataArray[idx * step] || 0;
          // Scale 0-255 to 3px-22px
          const scaled = 3 + (val / 255) * 19;
          bar.style.height = `${scaled.toFixed(1)}px`;
        });
      } else {
        // Fallback procedural animation
        const time = Date.now() * 0.008;
        bars.forEach((bar, idx) => {
          const wave = Math.sin(time + idx * 0.6) * 8 + 11;
          bar.style.height = `${Math.max(3, wave).toFixed(1)}px`;
        });
      }

      animationFrameId = requestAnimationFrame(renderBars);
    }

    async function togglePlay() {
      setupAudioContext();

      if (audioCtx && audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      if (audio.paused) {
        try {
          await audio.play();
          isPlaying = true;
          playBtn.innerHTML = pauseSvg;
          playBtn.setAttribute('aria-label', 'Pause background music');
          renderBars();
        } catch (err) {
          console.warn('Audio playback error:', err);
        }
      } else {
        audio.pause();
        isPlaying = false;
        playBtn.innerHTML = playSvg;
        playBtn.setAttribute('aria-label', 'Play background music');
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        bars.forEach(bar => {
          bar.style.height = '3px';
        });
      }
    }

    playBtn.addEventListener('click', togglePlay);

    audio.addEventListener('ended', () => {
      isPlaying = false;
      playBtn.innerHTML = playSvg;
      playBtn.setAttribute('aria-label', 'Play background music');
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      bars.forEach(bar => bar.style.height = '3px');
    });
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

    let fullWidth = wrapper.scrollWidth || 540;
    const updateFullWidth = () => {
      if ((window.pageYOffset || document.documentElement.scrollTop) <= 180) {
        fullWidth = wrapper.scrollWidth || 540;
      }
    };
    window.addEventListener('resize', updateFullWidth);

    // Keep fully expanded for top 180px (stationary hero header)
    const startScroll = 180;

    let lastY = window.pageYOffset || document.documentElement.scrollTop;
    let isTicking = false;

    function updateNavbar(currentY) {
      const diff = currentY - lastY;

      // 1. Within top 180px: Hero state — always visible and fully expanded
      if (currentY <= startScroll) {
        container.classList.remove('is-hidden');
        nav.classList.remove('is-scroll-up');
        nav.classList.remove('is-deep-collapsed');
        nav.style.removeProperty('--nav-wrapper-width');
        nav.style.removeProperty('--nav-links-opacity');
        nav.style.removeProperty('--nav-links-y');
        wrapper.style.pointerEvents = 'auto';
      }
      // 2. Beyond top 180px: Smart Headroom with Symmetrical Inward Collapse & Outward Expand
      else {
        nav.classList.add('is-deep-collapsed');
        nav.style.setProperty('--nav-wrapper-width', '0px');
        nav.style.setProperty('--nav-links-opacity', '0');
        nav.style.setProperty('--nav-links-y', '-20px');

        // Check scroll direction for headroom behavior
        if (diff > 8) {
          // Scrolling down: collapse inward and glide off-screen
          container.classList.add('is-hidden');
          nav.classList.remove('is-scroll-up');
          wrapper.style.pointerEvents = 'none';
        } else if (diff < -8) {
          // Scrolling up: slide down and unfurl outward from center
          container.classList.remove('is-hidden');
          nav.classList.add('is-scroll-up');
          wrapper.style.pointerEvents = 'auto';
        }
      }

      lastY = currentY;
    }

    // Top-of-viewport mouse movement reveal for desktop convenience
    document.addEventListener('mousemove', (e) => {
      if (e.clientY <= 30 && container.classList.contains('is-hidden')) {
        container.classList.remove('is-hidden');
        nav.classList.add('is-scroll-up');
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
      nav.style.setProperty('--nav-wrapper-width', '0px');
      nav.style.setProperty('--nav-links-opacity', '0');
      nav.style.setProperty('--nav-links-y', '-20px');
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
    initAudioEqualizer();
    initSkillsFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

})();
