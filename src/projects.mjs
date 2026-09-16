const diagram = (label, nodes, note, extra = '') => `<div class="project-art technical ${extra}"><span class="small">${label}</span><div class="flow">${nodes.map((n, i) => `${i ? '<span aria-hidden="true">→</span>' : ''}<div class="node ${i === 1 ? 'active' : ''}">${n}</div>`).join('')}</div><div class="flow-label">${note}</div></div>`;
export const projects = [
    { slug: 'roleimpact', name: 'RoleImpact', category: 'JAVA / SYSTEM DESIGN', filterCategory: 'java-systems', timeline: 'Sep – Dec 2024', subtitle: 'DETERMINISTIC PERMISSION & GRAPH SIMULATION', watermark: 'ROLEIMPACT', themeColor: '#3b82f6', featuredBadge: '★ Core System', summary: 'Understand the business consequences of an access change before making it. RoleImpact is a Java 21 and Spring Boot simulation platform that models employees, roles, permissions, capabilities, and workflows to identify downstream impact and evaluate mitigation options.', tags: ['Java 21', 'Spring Boot', 'Docker', 'React', 'Testcontainers', 'PostgreSQL', 'Flyway'], demo: 'https://roleimpact.vercel.app/', repo: 'https://github.com/souravC01/RoleImpact', focus: 'Deterministic simulation & graph modeling', role: 'Full-stack portfolio project', format: 'Interactive web application', art: diagram('Access-change simulation', ['Role removed', 'Impact analysis', 'Mitigation'], 'Trace the change. Explain the impact. Test the recovery.') },
    { slug: 'jobhelperguru', name: 'JobHelperGuru', category: 'APPLIED AI / FULL-STACK', filterCategory: 'applied-ai', timeline: 'Jul – Dec 2025', subtitle: 'AI-ASSISTED RÉSUMÉ & JOB SEARCH WORKSPACE', watermark: 'JOBHELPER', themeColor: '#a855f7', featuredBadge: '★ Featured', summary: 'JobHelperGuru is a full-stack job-search workspace built with Python, FastAPI, and React. It analyzes job postings, compares multiple résumés, generates evidence-aware bullet suggestions, tracks applications, and preserves core functionality through an offline heuristic fallback.', tags: ['Python', 'FastAPI', 'React', 'OpenAI API', 'pytest', 'PostgreSQL'], demo: 'https://jobhelperguru.onrender.com/', repo: 'https://github.com/souravC01/JobHelperGuru', focus: 'AI integration & application workflows', role: 'Full-stack portfolio project', format: 'Interactive web application', art: diagram('Job application workflow', ['Job posting', 'Résumé fit', 'Application tracker'], 'Structured analysis with cloud, local, and heuristic paths.', 'job-art') },
    { slug: 'yu-bazaar', name: 'YU Bazaar', category: 'JAVA / CLOUD & SECURITY', filterCategory: 'java-systems', timeline: '2024 – 2025', subtitle: 'SECURE CAMPUS MARKETPLACE', watermark: 'YU BAZAAR', themeColor: '#10b981', featuredBadge: '★ Campus MVP', summary: 'A modernized Java campus marketplace for York University students featuring Spring Security, OTP verification, persistent PostgreSQL storage, cloud-hosted listing images, and automated CI/CD.', tags: ['Java 17', 'Spring Security', 'PostgreSQL', 'Docker', 'Cloudflare R2'], demo: 'https://yu-bazaar.onrender.com/', repo: 'https://github.com/souravC01/yu-bazaar', focus: 'Authentication, persistence & deployment', role: 'Team contributor & independent modernization', format: 'Campus marketplace', art: diagram('Campus marketplace', ['Verify account', 'Discover listings', 'Contact seller'], 'Spring Boot · persistent data · cloud image storage') },
    { slug: 'toronto-airbnb', name: 'Toronto Airbnb Market Network', category: 'DATA ANALYTICS / NETWORK SCIENCE', filterCategory: 'research', timeline: 'Nov 2025', subtitle: '15,809 LISTINGS NETWORK COMMUNITY ANALYSIS', watermark: 'AIRBNB NET', themeColor: '#ff5c39', featuredBadge: '★ Research', summary: 'Do Toronto’s Airbnb market segments follow official neighbourhood boundaries? An interactive network analysis and research case study of 15,809 Toronto Airbnb listings using Louvain and Leiden community detection.', tags: ['Python', 'React', 'TypeScript', 'Network Science', 'Data Analysis'], demo: 'https://toronto-airbnb-market-network.vercel.app/', repo: 'https://github.com/souravC01/toronto-airbnb-market-network', focus: 'Network science & reproducible analysis', role: 'Portfolio edition & interactive presentation', format: 'Research & interactive data exploration', art: diagram('Market network analysis', ['15,809 listings', 'Communities', 'Validation'], 'Geography + shared hosts + listing similarity.') }
];

projects[0].repo = 'https://github.com/souravC01/RoleImpact';
projects[1].repo = 'https://github.com/souravC01/JobHelperGuru';
projects[2].art = '<div class="project-art"><a href="/assets/yu-bazaar.jpg" aria-label="View full YU Bazaar marketplace screenshot"><img src="/assets/yu-bazaar.jpg" alt="YU Bazaar marketplace with four listings and Public Seller and York Verified badges" width="1890" height="816" loading="lazy"></a></div>';
projects[3].art = '<div class="project-art"><a href="/assets/airbnb-network.png" aria-label="View full Toronto Airbnb community map"><img src="/assets/airbnb-network.png" alt="Map of Toronto Airbnb listings colored by Graph C Louvain market community" width="2250" height="2100" loading="lazy"></a></div>';
const section = (id, title, html) => ({ id, title, html });
const roleImpactArchitectureDiagram = `<figure class="architecture-diagram" aria-label="RoleImpact application architecture and impact-analysis flow">
  <div class="architecture-primary-flow">
    <span class="architecture-node">React / TypeScript</span>
    <span class="architecture-arrow" aria-hidden="true">→</span>
    <span class="architecture-node">Spring Boot REST API</span>
    <span class="architecture-arrow" aria-hidden="true">→</span>
    <span class="architecture-node architecture-node-engine">Deterministic Impact Engine</span>
    <span class="architecture-arrow" aria-hidden="true">→</span>
    <span class="architecture-node">PostgreSQL / JPA</span>
  </div>
  <div class="architecture-secondary-flow">
    <span class="architecture-flow-title">SIMULATION FLOW</span>
    <div class="architecture-flow-track">
      <span class="architecture-flow-node">Organization Snapshot</span>
      <span class="architecture-arrow" aria-hidden="true">→</span>
      <span class="architecture-flow-node">Access Change</span>
      <span class="architecture-arrow" aria-hidden="true">→</span>
      <span class="architecture-flow-node">Impact Analysis</span>
      <span class="architecture-arrow" aria-hidden="true">→</span>
      <span class="architecture-flow-node">Mitigation Ranking</span>
    </div>
  </div>
</figure>`;

const jobHelperArchitectureDiagram = `<figure class="architecture-diagram architecture-diagram-jhg" aria-label="JobHelperGuru application architecture and orchestration flow">
  <svg class="architecture-tree-svg" viewBox="0 0 780 480" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="JobHelperGuru application architecture diagram">
    <!-- Level 1: Client Flow -->
    <g class="architecture-client-flow">
      <!-- React UI -->
      <rect x="330" y="10" width="200" height="42" rx="6" fill="#ffffff" stroke="rgba(22, 22, 22, 0.16)" stroke-width="1.2" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.03))" />
      <text x="430" y="36" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#18181b" text-anchor="middle">React UI</text>

      <!-- Connector 1 -> 2 -->
      <line x1="430" y1="52" x2="430" y2="72" stroke="#a1a1aa" stroke-width="1.5" />
      <polygon points="426,72 434,72 430,78" fill="#ff5c39" />

      <!-- Level 2: FastAPI API (orchestration layer) -->
      <rect x="305" y="80" width="250" height="54" rx="6" fill="#ffffff" stroke="rgba(168, 85, 247, 0.6)" stroke-width="1.3" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.04))" />
      <text x="430" y="103" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#18181b" text-anchor="middle">FastAPI API</text>
      <text x="430" y="122" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">orchestration layer</text>
    </g>

    <!-- 3-Way Fork Connector (FastAPI -> Subsystems) -->
    <g class="arch-connector-3">
      <!-- Stem down from FastAPI API -->
      <line x1="430" y1="134" x2="430" y2="152" stroke="#a1a1aa" stroke-width="1.5" />
      <!-- Horizontal bar connecting Col 1, Col 2, Col 3 -->
      <line x1="200" y1="152" x2="660" y2="152" stroke="#a1a1aa" stroke-width="1.5" />
      <!-- Drop to AI / Matching Engine -->
      <line x1="200" y1="152" x2="200" y2="168" stroke="#a1a1aa" stroke-width="1.5" />
      <polygon points="196,168 204,168 200,174" fill="#ff5c39" />
      <!-- Drop to PostgreSQL -->
      <line x1="430" y1="152" x2="430" y2="168" stroke="#a1a1aa" stroke-width="1.5" />
      <polygon points="426,168 434,168 430,174" fill="#ff5c39" />
      <!-- Drop to Cloudflare R2 -->
      <line x1="660" y1="152" x2="660" y2="168" stroke="#a1a1aa" stroke-width="1.5" />
      <polygon points="656,168 664,168 660,174" fill="#ff5c39" />
    </g>

    <!-- Level 3: Three Subsystems -->
    <g class="architecture-subsystems-row">
      <!-- Col 1: AI / Matching Engine -->
      <g class="arch-box-ai">
        <rect x="100" y="176" width="200" height="120" rx="6" fill="#ffffff" stroke="rgba(168, 85, 247, 0.45)" stroke-width="1.2" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.03))" />
        <text x="200" y="200" font-family="'JetBrains Mono', monospace" font-size="12.5" font-weight="700" fill="#18181b" text-anchor="middle">AI / Matching Engine</text>
        <text x="200" y="226" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">Job analysis</text>
        <text x="200" y="248" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">Résumé ranking</text>
        <text x="200" y="270" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">Bullet suggestions</text>
      </g>

      <!-- Col 2: PostgreSQL -->
      <g class="arch-box-db">
        <rect x="330" y="176" width="200" height="120" rx="6" fill="#ffffff" stroke="rgba(22, 22, 22, 0.16)" stroke-width="1.2" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.03))" />
        <text x="430" y="204" font-family="'JetBrains Mono', monospace" font-size="12.5" font-weight="700" fill="#18181b" text-anchor="middle">PostgreSQL</text>
        <text x="430" y="236" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">Applications &amp;</text>
        <text x="430" y="256" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">tracking data</text>
      </g>

      <!-- Col 3: Cloudflare R2 -->
      <g class="arch-box-storage">
        <rect x="560" y="176" width="200" height="120" rx="6" fill="#ffffff" stroke="rgba(22, 22, 22, 0.16)" stroke-width="1.2" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.03))" />
        <text x="660" y="204" font-family="'JetBrains Mono', monospace" font-size="12.5" font-weight="700" fill="#18181b" text-anchor="middle">Cloudflare R2</text>
        <text x="660" y="236" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">Résumé document</text>
        <text x="660" y="256" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">storage</text>
      </g>
    </g>

    <!-- 2-Way Fork Connector (AI Engine -> Children) -->
    <g class="arch-connector-2">
      <!-- Stem down from AI Engine center (x=200, y=296) -->
      <line x1="200" y1="296" x2="200" y2="314" stroke="#a1a1aa" stroke-width="1.5" />
      <!-- Horizontal bar: from Child 1 center (x=120) to Child 2 center (x=280) -->
      <line x1="120" y1="314" x2="280" y2="314" stroke="#a1a1aa" stroke-width="1.5" />
      <!-- Drop to Child 1 -->
      <line x1="120" y1="314" x2="120" y2="328" stroke="#a1a1aa" stroke-width="1.5" />
      <polygon points="116,328 124,328 120,334" fill="#ff5c39" />
      <!-- Drop to Child 2 -->
      <line x1="280" y1="314" x2="280" y2="328" stroke="#a1a1aa" stroke-width="1.5" />
      <polygon points="276,328 284,328 280,334" fill="#ff5c39" />
    </g>

    <!-- Level 4: Two Children under AI Engine -->
    <g class="architecture-children-tree">
      <!-- Child 1: OpenAI-compatible provider -->
      <g class="arch-child-box">
        <rect x="42" y="336" width="156" height="92" rx="6" fill="#ffffff" stroke="rgba(22, 22, 22, 0.16)" stroke-width="1.2" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.03))" />
        <text x="120" y="360" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#18181b" text-anchor="middle">OpenAI-compatible</text>
        <text x="120" y="376" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#18181b" text-anchor="middle">provider</text>
        <text x="120" y="400" font-family="'JetBrains Mono', monospace" font-size="9.5" fill="#52525b" text-anchor="middle">Cloud / local</text>
        <text x="120" y="415" font-family="'JetBrains Mono', monospace" font-size="9.5" fill="#52525b" text-anchor="middle">model endpoints</text>
      </g>

      <!-- Child 2: Offline heuristic fallback -->
      <g class="arch-child-box">
        <rect x="202" y="336" width="156" height="92" rx="6" fill="#ffffff" stroke="rgba(22, 22, 22, 0.16)" stroke-width="1.2" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.03))" />
        <text x="280" y="360" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#18181b" text-anchor="middle">Offline heuristic</text>
        <text x="280" y="376" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#18181b" text-anchor="middle">fallback</text>
        <text x="280" y="400" font-family="'JetBrains Mono', monospace" font-size="9.5" fill="#52525b" text-anchor="middle">Zero-config parsing</text>
        <text x="280" y="415" font-family="'JetBrains Mono', monospace" font-size="9.5" fill="#52525b" text-anchor="middle">&amp; keyword matching</text>
      </g>
    </g>
  </svg>
  <div class="sr-only">
    <div class="architecture-client-flow">
      <span>React UI</span>
      <span>FastAPI API</span>
    </div>
    <div class="architecture-subsystems-row">
      <span>AI / Matching Engine</span>
      <span>PostgreSQL</span>
      <span>Applications &amp; tracking data</span>
      <span>Cloudflare R2</span>
      <span>Résumé document storage</span>
    </div>
    <div class="architecture-children-row">
      <span>OpenAI-compatible provider</span>
      <span>Cloud / local model endpoints</span>
      <span>Offline heuristic fallback</span>
      <span>Zero-config parsing &amp; keyword matching</span>
    </div>
  </div>
</figure>`;

const yuBazaarArchitectureDiagram = `<figure class="architecture-diagram architecture-diagram-yub" aria-label="YU Bazaar application architecture and runtime flow">
  <svg class="architecture-tree-svg" viewBox="0 0 780 430" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="YU Bazaar application architecture diagram">
    <!-- Level 1: Client Flow -->
    <g class="architecture-client-flow">
      <!-- Thymeleaf Web UI -->
      <rect x="280" y="12" width="220" height="42" rx="6" fill="#ffffff" stroke="rgba(22, 22, 22, 0.16)" stroke-width="1.2" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.03))" />
      <text x="390" y="38" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#18181b" text-anchor="middle">Thymeleaf Web UI</text>

      <!-- Connector 1 -> 2 -->
      <line x1="390" y1="54" x2="390" y2="74" stroke="#a1a1aa" stroke-width="1.5" />
      <polygon points="386,74 394,74 390,80" fill="#ff5c39" />

      <!-- Level 2: Spring Boot Application (central application layer) -->
      <rect x="260" y="82" width="260" height="54" rx="6" fill="#ffffff" stroke="rgba(16, 185, 129, 0.7)" stroke-width="1.3" filter="drop-shadow(0 1px 3px rgba(0,0,0,0.04))" />
      <text x="390" y="105" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="700" fill="#18181b" text-anchor="middle">Spring Boot Application</text>
      <text x="390" y="124" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">central application layer</text>
    </g>

    <!-- 3-Way Fork Connector (Spring Boot -> Subsystems) -->
    <g class="arch-connector-3">
      <!-- Stem down from Spring Boot Application -->
      <line x1="390" y1="136" x2="390" y2="156" stroke="#a1a1aa" stroke-width="1.5" />
      <!-- Horizontal bar connecting Col 1, Col 2, Col 3 -->
      <line x1="160" y1="156" x2="620" y2="156" stroke="#a1a1aa" stroke-width="1.5" />
      <!-- Drop to Spring Security -->
      <line x1="160" y1="156" x2="160" y2="172" stroke="#a1a1aa" stroke-width="1.5" />
      <polygon points="156,172 164,172 160,178" fill="#ff5c39" />
      <!-- Drop to PostgreSQL -->
      <line x1="390" y1="156" x2="390" y2="172" stroke="#a1a1aa" stroke-width="1.5" />
      <polygon points="386,172 394,172 390,178" fill="#ff5c39" />
      <!-- Drop to Cloudflare R2 -->
      <line x1="620" y1="156" x2="620" y2="172" stroke="#a1a1aa" stroke-width="1.5" />
      <polygon points="616,172 624,172 620,178" fill="#ff5c39" />
    </g>

    <!-- Level 3: Three Subsystems -->
    <g class="architecture-subsystems-row">
      <!-- Col 1: Spring Security -->
      <g class="arch-box-sec">
        <rect x="60" y="180" width="200" height="110" rx="6" fill="#ffffff" stroke="rgba(16, 185, 129, 0.45)" stroke-width="1.2" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.03))" />
        <text x="160" y="208" font-family="'JetBrains Mono', monospace" font-size="12.5" font-weight="700" fill="#18181b" text-anchor="middle">Spring Security</text>
        <text x="160" y="236" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">Auth / ownership</text>
        <text x="160" y="256" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">Session management</text>
      </g>

      <!-- Col 2: PostgreSQL -->
      <g class="arch-box-db">
        <rect x="290" y="180" width="200" height="110" rx="6" fill="#ffffff" stroke="rgba(22, 22, 22, 0.16)" stroke-width="1.2" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.03))" />
        <text x="390" y="208" font-family="'JetBrains Mono', monospace" font-size="12.5" font-weight="700" fill="#18181b" text-anchor="middle">PostgreSQL + JPA</text>
        <text x="390" y="236" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">Accounts &amp; listings</text>
        <text x="390" y="256" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">Flyway migrations</text>
      </g>

      <!-- Col 3: Cloudflare R2 -->
      <g class="arch-box-storage">
        <rect x="520" y="180" width="200" height="110" rx="6" fill="#ffffff" stroke="rgba(22, 22, 22, 0.16)" stroke-width="1.2" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.03))" />
        <text x="620" y="208" font-family="'JetBrains Mono', monospace" font-size="12.5" font-weight="700" fill="#18181b" text-anchor="middle">Cloudflare R2</text>
        <text x="620" y="236" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">Listing images</text>
        <text x="620" y="256" font-family="'JetBrains Mono', monospace" font-size="11" fill="#52525b" text-anchor="middle">AWS SDK S3-compatible</text>
      </g>
    </g>

    <!-- Child Branch under Spring Security -->
    <g class="arch-connector-sec">
      <line x1="160" y1="290" x2="160" y2="316" stroke="#a1a1aa" stroke-width="1.5" />
      <polygon points="156,316 164,316 160,322" fill="#ff5c39" />
    </g>

    <!-- Level 4: Child Box under Spring Security -->
    <g class="architecture-sec-child">
      <rect x="45" y="324" width="230" height="90" rx="6" fill="#ffffff" stroke="rgba(22, 22, 22, 0.16)" stroke-width="1.2" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.03))" />
      <text x="160" y="348" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="700" fill="#18181b" text-anchor="middle">Verification / Recovery</text>
      <text x="160" y="372" font-family="'JetBrains Mono', monospace" font-size="10" fill="#52525b" text-anchor="middle">OTP · Password reset</text>
      <text x="160" y="390" font-family="'JetBrains Mono', monospace" font-size="10" fill="#52525b" text-anchor="middle">Demo restrictions</text>
    </g>
  </svg>
  <div class="sr-only">
    <div class="architecture-client-flow">
      <span>Thymeleaf Web UI</span>
      <span>Spring Boot Application</span>
    </div>
    <div class="architecture-subsystems-row">
      <span>Spring Security (Auth / ownership)</span>
      <span>PostgreSQL + JPA (Accounts &amp; listings · Flyway migrations)</span>
      <span>Cloudflare R2 (Listing images)</span>
    </div>
    <div class="architecture-children-row">
      <span>Verification / Recovery (OTP · Password reset · Demo restrictions)</span>
    </div>
    <div class="architecture-flow-track">
      <span>GitHub Actions</span>
      <span>Maven Build &amp; Tests</span>
      <span>Docker</span>
      <span>Render</span>
    </div>
  </div>
  <div class="architecture-secondary-flow">
    <span class="architecture-flow-title">DELIVERY &amp; DEPLOYMENT PIPELINE</span>
    <div class="architecture-flow-track">
      <span class="architecture-flow-node">GitHub Actions</span>
      <span class="architecture-arrow" aria-hidden="true">→</span>
      <span class="architecture-flow-node">Maven Build &amp; Tests</span>
      <span class="architecture-arrow" aria-hidden="true">→</span>
      <span class="architecture-flow-node">Docker</span>
      <span class="architecture-arrow" aria-hidden="true">→</span>
      <span class="architecture-flow-node">Render</span>
    </div>
  </div>
</figure>`;

projects[0].sections = [
    section('problem', 'The problem', '<p>Removing access is easy to describe as a permissions change. The harder question is what the organization can no longer do afterward. A role might be the only thing keeping a time-sensitive business workflow covered.</p><p>RoleImpact models employees, roles, permissions, capabilities, and workflow requirements together so an access change can be evaluated in terms of its operational consequences.</p>'),
    section('role', 'What I built', '<p>I designed and built the React and TypeScript interface, Spring Boot REST API, object-oriented Java impact analysis engine, and PostgreSQL persistence layer. The application connects an interactive organization model to deterministic backend simulations so users can trace why a workflow is affected and compare possible mitigations.</p>'),
    section('approach', 'From change to consequence', '<p>A user opens an organization model, removes a role, and runs an impact simulation. RoleImpact traces the affected relationship paths from employee access through permissions and capabilities to business workflows.</p><p>The user can then evaluate a replacement, compare the original and mitigated results, and inspect the evidence behind each recommendation. Because the engine is deterministic, identical organization states and changes produce identical results.</p>'),
    section('architecture', 'Architecture', `${roleImpactArchitectureDiagram}<ul><li><strong>React + TypeScript:</strong> interactive organization modeling, impact visualization, relationship paths, and before-and-after comparisons.</li><li><strong>Java 21 + Spring Boot:</strong> REST API and application services for organization models, impact simulations, mitigation scenarios, and saved drafts.</li><li><strong>Deterministic Java impact engine:</strong> evaluates access changes against immutable organization snapshots, traces affected workflows, produces stable result hashes, and ranks eligible mitigation options.</li><li><strong>PostgreSQL + Spring Data JPA + Flyway:</strong> stores organization data and simulation relationships while maintaining versioned database migrations.</li><li><strong>Docker:</strong> provides a reproducible local PostgreSQL environment and consistent development setup.</li><li><strong>JUnit + Testcontainers:</strong> validates application and persistence behaviour against real PostgreSQL container instances rather than relying only on mocked database tests.</li></ul>`),
    section('challenges', 'Engineering challenges', '<p>A replacement recommendation cannot simply match a role name. It must satisfy the permissions and capabilities required by the affected workflows while actually restoring coverage. That required recommendation logic to operate on the same domain model used by the impact engine rather than relying on superficial similarity.</p><p>Another challenge was making simulation results reproducible. Organization state is assembled into immutable snapshots, allowing the engine to compare original and alternative scenarios without mutating the underlying model. Stable result hashing also makes equivalent simulations identifiable.</p><p>The interface also needed to explain relationship-rich results without making a graph the only way to understand them. RoleImpact therefore exposes textual relationship paths and rule-based evidence alongside the visual representation.</p>'),
    section('results', 'Result and scope', '<p>RoleImpact demonstrates an end-to-end workflow from an access change to an evidence-backed impact explanation and tested mitigation. Simulations can be persisted and compared while organization data remains available across sessions.</p><p>The application is a portfolio simulation using synthetic organization data. It does not connect to production identity providers or modify real permissions, and it is not intended for confidential organizational data.</p>'),
    section('learning', 'What the project taught me', '<p>The biggest design lesson was that explainability has to exist in the domain model and engine, rather than being added only at the interface layer. A useful result needs to preserve the relationship path and rule that produced it so the frontend can explain why a workflow was affected and why a mitigation is valid.</p><p> The project also reinforced the value of deterministic state, explicit domain models, database-backed integration testing, and designing APIs around business behaviour rather than UI screens.</p>')];
projects[1].sections = [
    section('problem', 'The problem', '<p>Job applications involve repeated context switching: reading a posting, identifying requirements, comparing it against different résumés, tailoring the wording, and remembering what was submitted.</p><p>JobHelperGuru brings those steps into one workspace so job analysis, résumé matching, tailoring, and <span class="concept-accent">application tracking</span> share the same context.</p>'),
    section('role', 'What I built', '<p>I designed and built the React frontend, Python/FastAPI backend, OpenAI-compatible model integration, <span class="concept-accent">multi-résumé matching</span> workflow, and <span class="concept-accent">application tracking</span> system. The project also includes authentication, persistent application data, résumé document storage, Excel export, and an <span class="concept-accent">offline heuristic fallback</span> path for core job-analysis features.</p>'),
    section('approach', 'Application workflow', '<p>Users can paste a job description or submit a supported job-posting URL, review the extracted qualifications and ATS keywords, compare stored résumés, revise individual bullets, and then track the application without leaving the workspace.</p><p>Cloud and local models use an OpenAI-compatible interface. When no model is configured, an <span class="concept-accent">offline heuristic fallback</span> still supports pasted-job analysis and keyword matching.</p>'),
    section('architecture', 'Architecture', `${jobHelperArchitectureDiagram}<ul><li><strong>React:</strong> job analysis, résumé inspection, settings, and table or Kanban <span class="concept-accent">application tracking</span>.</li><li><strong>FastAPI:</strong> authenticated application endpoints, job-analysis workflows, résumé matching, tracking operations, and structured Pydantic response models.</li><li><strong>AI engine + offline fallback:</strong> structured job analysis, résumé ranking, and <span class="concept-accent">evidence-aware suggestions</span>, with a heuristic path that preserves core functionality when no model is configured.</li><li><strong>PostgreSQL + Cloudflare R2:</strong> persistent application records and résumé document storage, with local development alternatives.</li><li><strong>pytest:</strong> automated testing across API routes, authentication, parsing, data processing, and application logic.</li><li><strong>openpyxl:</strong> spreadsheet export for tracked applications.</li></ul>`),
    section('challenges', 'Evidence-aware AI', '<div class="claim-badges-grid"><div class="claim-badge-card claim-badge-supported"><div class="claim-badge-header"><span class="claim-badge-dot"></span><span class="claim-badge-title">SUPPORTED CLAIM</span></div><p class="claim-badge-caption">Backed by résumé or project evidence</p></div><div class="claim-badge-card claim-badge-unverified"><div class="claim-badge-header"><span class="claim-badge-dot"></span><span class="claim-badge-title">UNVERIFIED SKILL</span></div><p class="claim-badge-caption">Requires user confirmation before use</p></div><div class="claim-badge-card claim-badge-placeholder"><div class="claim-badge-header"><span class="claim-badge-dot"></span><span class="claim-badge-title">METRIC PLACEHOLDER</span></div><p class="claim-badge-caption">Uses placeholders until a real value is supplied</p></div></div><p>The main design constraint was preventing AI-generated résumé suggestions from silently becoming fabricated experience.</p><p>JobHelperGuru separates supported claims from unverified skills and metric placeholders. Missing keywords can still be surfaced and suggested as hypothetical rewrites, but assumptions remain visible so the user can confirm them before using the content.</p><p>Model responses and scraped job pages are variable inputs, so parsing, validation, and fallback paths keep the workflow usable when a provider response cannot be interpreted or no external model is configured.</p>'),
    section('results', 'Result and scope', '<p>JobHelperGuru combines job analysis, <span class="concept-accent">multi-résumé matching</span>, bullet revision, <span class="concept-accent">application tracking</span>, and spreadsheet export in one application. The project demonstrates applied AI embedded inside ordinary product workflows rather than treated as a standalone chatbot.</p><p>Résumé match percentages are application heuristics, not validated hiring predictions or guarantees of ATS compatibility. AI-generated suggestions require user review, and URL ingestion depends on source-site accessibility.</p>'),
    section('learning', 'What the project taught me', '<p>The biggest lesson was that AI features need explicit contracts, visible assumptions, and reliable failure paths. Generated text is most useful when the application makes clear which claims are supported, which require confirmation, and what happens when the model is unavailable.</p><p>The project also reinforced the value of schema-constrained responses, fallback logic, persistent workflow state, and designing AI features as part of a complete product rather than as isolated prompts.</p>')];
projects[2].sections = [
    section('problem', 'The problem', '<p>A campus marketplace needs more than listings. Users need to understand who is selling, recover access to their accounts, upload photographs, contact sellers safely, and manage their own listings without exposing credentials or giving other users control over their content.</p>'),
    section('role', 'From team project to portfolio system', '<p>The original application was a four-person York University course project. My original contributions included registration and recovery email notifications, password recovery, York email OTP verification, item search and live suggestions, and listing and homepage workflow fixes.</p><p>I later maintained an independent portfolio edition, adding production-oriented infrastructure, security improvements, cloud media storage, verification tiers, protected reviewer access, automated testing, database migrations, CI/CD, and deployment work. The <a href="https://github.com/hvpham-yorku/YuBazaar" target="_blank" rel="noopener noreferrer">original team repository</a> and contributor credit remain distinct from these later improvements.</p>'),
    section('approach', 'Marketplace journey', '<p>Visitors can browse public listings without signing in. Sellers can register, verify their email address, create listings, upload photographs, and manage only the items they own.</p><p>York email verification adds a York Verified Student badge, while other verified sellers remain clearly distinguished from York-verified accounts.</p><p>Reviewers can use a protected read-only demo path, and buyers can contact sellers through controlled email inquiries. Payments and physical exchanges take place outside the application.</p>'),
    section('architecture', 'Architecture', `${yuBazaarArchitectureDiagram}<ul><li><strong>Java 17 + Spring Boot + Thymeleaf:</strong> Server-rendered marketplace pages and application workflows.</li><li><strong>Spring Security:</strong> Session authentication, protected routes, BCrypt password hashing, OTP verification, password recovery, ownership authorization, and reviewer restrictions.</li><li><strong>PostgreSQL + Spring Data JPA + Flyway:</strong> Persistent accounts, listings, verification state, and versioned database migrations.</li><li><strong>Cloudflare R2 + AWS SDK:</strong> Private object storage for listing photographs with application-controlled access.</li><li><strong>Docker + Render:</strong> Containerized deployment in a reproducible runtime environment.</li><li><strong>GitHub Actions:</strong> Automated Maven build and test validation on pushes and pull requests.</li></ul>`),
    section('challenges', 'From course project to durable application', '<p>Moving beyond local development meant addressing the less visible parts of a usable application: persistent data and images, expiring verification and recovery credentials, owner-only mutations, protected reviewer access, repeatable database migrations, automated tests, and deployment.</p><p>The verification model also needed precise language. A verified public seller is not automatically a York student; the York Verified Student badge specifically represents verified institutional email ownership.</p>'),
    section('results', 'Result and scope', '<p>The portfolio edition is a deployed marketplace with public browsing, persistent listings and photographs, account recovery, verification tiers, ownership controls, and a protected read-only reviewer path.</p><p>The repository includes automated coverage for authentication, ownership, recovery, and media behaviour.</p><p>YU Bazaar remains a portfolio MVP. Payments, escrow, delivery, and real-time chat are outside its scope, and the hosted application may take a moment to wake after inactivity.</p>'),
    section('learning', 'What the project taught me', '<p>The biggest lesson was that production readiness often lives in the less visible paths: authentication, account recovery, persistence, ownership rules, media storage, database migrations, deployment, and test coverage.</p><p>Modernizing an existing team project also reinforced the importance of preserving attribution while evolving the architecture independently.</p>')];
const airbnbMetricsStrip = `<div class="research-metrics-strip" aria-label="Research project key metrics">
  <div class="research-metric-item">
    <div class="research-metric-num">15,809</div>
    <div class="research-metric-label">LISTINGS</div>
  </div>
  <div class="research-metric-item">
    <div class="research-metric-num">3</div>
    <div class="research-metric-label">NETWORK LAYERS</div>
  </div>
  <div class="research-metric-item">
    <div class="research-metric-num">7</div>
    <div class="research-metric-label">PARAMETER CONFIGURATIONS</div>
  </div>
  <div class="research-metric-item">
    <div class="research-metric-num">3</div>
    <div class="research-metric-label">VALIDATION SCHEMES</div>
  </div>
</div>`;
projects[3].metricsStrip = airbnbMetricsStrip;

const airbnbMethodologyPipeline = `<figure class="methodology-pipeline" aria-label="Research methodology pipeline flowchart">
  <span class="methodology-pipeline-eyebrow">RESEARCH METHODOLOGY FLOW</span>
  <div class="methodology-flow">
    <div class="methodology-step">
      <div class="methodology-box methodology-box-data">
        <span class="methodology-step-badge">RAW DATA</span>
        <div class="methodology-box-title">Toronto Airbnb Snapshot</div>
        <div class="methodology-box-sub">15,809 listings</div>
      </div>
    </div>
    <span class="methodology-arrow" aria-hidden="true">↓</span>
    <div class="methodology-step methodology-step-layers">
      <div class="methodology-box methodology-box-layers">
        <span class="methodology-step-badge">LAYERED GRAPH PROGRESSION</span>
        <div class="methodology-layers-row">
          <div class="methodology-layer-card">
            <span class="methodology-layer-badge">LAYER 1</span>
            <div class="methodology-layer-title">Graph A</div>
            <div class="methodology-layer-sub">Geographic proximity ≤ 500m</div>
          </div>
          <span class="methodology-layer-arrow" aria-hidden="true">→</span>
          <div class="methodology-layer-card">
            <span class="methodology-layer-badge">LAYER 2</span>
            <div class="methodology-layer-title">Graph B</div>
            <div class="methodology-layer-sub">+ Shared-host ownership</div>
          </div>
          <span class="methodology-layer-arrow" aria-hidden="true">→</span>
          <div class="methodology-layer-card methodology-layer-culmination">
            <span class="methodology-layer-badge">LAYER 3</span>
            <div class="methodology-layer-title">Graph C</div>
            <div class="methodology-layer-sub">+ Listing-attribute similarity</div>
          </div>
        </div>
      </div>
    </div>
    <span class="methodology-arrow" aria-hidden="true">↓</span>
    <div class="methodology-step">
      <div class="methodology-box methodology-box-algo">
        <span class="methodology-step-badge">COMMUNITY DETECTION</span>
        <div class="methodology-box-title">Louvain / Leiden</div>
        <div class="methodology-box-sub">Community Detection</div>
      </div>
    </div>
    <span class="methodology-arrow" aria-hidden="true">↓</span>
    <div class="methodology-step">
      <div class="methodology-box">
        <span class="methodology-step-badge">SPATIAL BENCHMARK</span>
        <div class="methodology-box-title">Compare with</div>
        <div class="methodology-box-sub">Official Neighbourhoods</div>
      </div>
    </div>
    <span class="methodology-arrow" aria-hidden="true">↓</span>
    <div class="methodology-step">
      <div class="methodology-box methodology-box-eval">
        <span class="methodology-step-badge">PREDICTIVE EVALUATION</span>
        <div class="methodology-box-title">Ridge Regression</div>
        <div class="methodology-box-sub">+ Validation Schemes</div>
      </div>
    </div>
    <span class="methodology-arrow" aria-hidden="true">↓</span>
    <div class="methodology-step">
      <div class="methodology-box methodology-box-ui">
        <span class="methodology-step-badge">RESEARCH ARTIFACT</span>
        <div class="methodology-box-title">Interactive React</div>
        <div class="methodology-box-sub">Research Presentation</div>
      </div>
    </div>
  </div>
</figure>`;

const airbnbFindingsCallout = `<div class="research-findings-callout" aria-label="Key empirical findings on price prediction">
  <div class="research-finding-header">
    <span class="research-finding-eyebrow">EMPIRICAL COMPARISON · COMMUNITY FEATURE IMPACT</span>
  </div>
  <div class="research-finding-grid">
    <div class="research-finding-card">
      <div class="research-finding-metric-label">RAW R² GAIN</div>
      <div class="research-finding-metric-val">+0.0016 to +0.0024</div>
      <div class="research-finding-caption">Marginal across 5-fold schemes</div>
    </div>
    <div class="research-finding-card">
      <div class="research-finding-metric-label">ADJUSTED R²</div>
      <div class="research-finding-metric-val">Declined</div>
      <div class="research-finding-caption">Penalized by model degrees of freedom</div>
    </div>
  </div>
  <p class="research-finding-summary">The empirical comparison does not claim a material price-prediction improvement over baseline features.</p>
</div>`;

projects[3].sections = [
    section('problem', 'The research question', '<p class="research-provenance">Dataset source: <a href="https://insideairbnb.com/get-the-data/" target="_blank" rel="noopener noreferrer">Inside Airbnb</a> — Toronto, November 2025 snapshot</p><p>Do Toronto’s Airbnb market segments follow official neighbourhood boundaries? Geographic proximity is only one relationship: listings can also share hosts or similar characteristics.</p><p>The analysis models 15,809 listings from a November 2025 Toronto snapshot as a weighted network and asks whether detected communities add useful information to price prediction.</p>'),
    section('role', 'My portfolio contribution', '<p>I built the responsive React and TypeScript presentation, a reproducible Python pipeline for analytical data and research artifacts, and automated checks that keep displayed metrics synchronized with canonical analysis outputs.</p><p>This is an independently maintained portfolio edition of a York University EECS 4414 research project. The original final report retains its original submission authorship; this page does not claim sole authorship of that course report.</p>'),
    section('approach', 'Build the network in layers', `${airbnbMethodologyPipeline}<ul><li><strong>Graph A:</strong> geographic proximity within 500 metres.</li><li><strong>Graph B:</strong> adds shared-host ownership.</li><li><strong>Graph C:</strong> adds listing-attribute similarity.</li></ul><p>Louvain and Leiden community detection are compared against official neighbourhoods. Price is excluded from edge construction. A paired ridge-regression comparison then tests whether community membership adds information beyond the baseline price model.</p>`),
    section('architecture', 'From analysis to reproducible evidence', '<p>Python experiments produce canonical tables and figures. A validation step checks those outputs, and the React presentation exposes graph layers, community algorithms, validation schemes, and sensitivity results.</p><p>The presentation is exported as static HTML with browser-side interactivity. GitHub Actions checks the application and analytical artifacts so changes to the research do not silently leave the website out of sync.</p>'),
    section('challenges', 'Testing the interpretation', '<p>Communities depend on modeling choices. The project uses seven parameter configurations and random, host-grouped, and spatial-block five-fold validation to examine how stable the results are.</p><p>Separating exploratory segmentation from predictive usefulness is essential: a visually interesting map does not establish that its labels improve a predictive model.</p>'),
    section('results', 'Findings and limitations', `<p>Adding ownership and similarity links connects geographic clusters into broader market segments. Spatial-only communities align most closely with official neighbourhoods, while the full graph spans those administrative boundaries.</p>${airbnbFindingsCallout}<p>Community membership increases mean raw R² by only 0.0016–0.0024 across validation schemes; adjusted R² declines. The study therefore does not claim a material price-prediction improvement.</p><p>Validation is transductive: communities are learned from the full price-free graph before price folds are created. It is not a deployment test on completely unseen listings. The dataset is one time snapshot, and exact community membership changes with parameters.</p>`),
    section('learning', 'What the project taught me', '<p>A strong research presentation makes its uncertainty inspectable. Reproducible artifacts, explicit validation assumptions, and honest reporting make the findings more useful than a claim of improvement unsupported by the results.</p><p><a href="https://toronto-airbnb-market-network.vercel.app/report/EECS4414-Airbnb-Network-Analysis-Final-Report.pdf" target="_blank" rel="noopener noreferrer">Read the original course report ↗</a> · <a href="https://github.com/souravC01/toronto-airbnb-market-network/blob/main/docs/ROBUSTNESS.md" target="_blank" rel="noopener noreferrer">Read the robustness methodology ↗</a></p>')];
