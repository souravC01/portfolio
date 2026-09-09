# Portfolio planning record

Updated: 2026-09-09. Status: first release implemented following the user's instruction to start publishing the homepage and four case studies.

## First release implementation

- Five static content routes plus a 404 page, generated with Node.js without third-party build dependencies.
- Shared responsive typography, light/navy/blue design, mobile layouts, keyboard focus styles, reduced-motion behavior, contact and copy-email interactions.
- Project data and narratives live in src/projects.mjs; homepage and shared templates in scripts/build.mjs.
- Existing marketplace screenshot and research figure are reused. No portrait was supplied, so the About section uses text without a placeholder or generated likeness.
- Downloadable resume copy preserves all visible content; its LinkedIn link was repaired. The source PDF is unchanged. Original and revised copies render identically.
- Research report authorship and YU Bazaar team contributions are explicitly qualified in their case studies.
- Local checks cover complete routes, case-study content, internal assets/anchors, metadata, project ordering, and resume availability. Browser interaction/visual QA was not performed.
- Publishing target: Sites, for the recruiting portfolio requested by the user.

## Confirmed direction

- Audience: recruiters, hiring managers, and technical reviewers considering full-time opportunities in Canada.
- Positioning: new computer-science graduate with Java/backend, full-stack, and AI application experience.
- Approved hero: “New-Grad Software Engineer based in Toronto, Canada” followed by “I build reliable Java backend, full-stack, and AI-powered systems.” Include availability for full-time opportunities across Canada.
- Structure: a homepage plus dedicated project case-study pages.
- Hero actions: View My Work (primary) and Download Résumé (secondary).
- Contact, LinkedIn, and GitHub remain readily accessible; repeat Contact Me after the project evidence.
- Project order: RoleImpact, JobHelperGuru, YU Bazaar, Toronto Airbnb Market Network.
- Exclude the separate agentic-AI project entirely: it does not exist. No placeholder or Currently Building card.
- Case-study structure: problem, personal role, approach, architecture, hardest challenges, results, learning, and demo/source links. Distinguish team contributions from individual work; include research limitations where relevant.
- Visual direction: modern and technical with restrained personality; light-first surfaces, navy/charcoal text, cool blue/cyan accents, subtle graph/grid details, and optional dark technical sections.
- Lead with work; follow with a photograph and concise professional story with selected human details.
- Contact: direct email, LinkedIn, and copy-email action.
- Résumé: downloadable PDF plus concise education and experience summaries on the site.

## Evidence collected

- RoleImpact: local README and dependency files describe Java/Spring Boot, React/TypeScript, PostgreSQL, deterministic access-change impact analysis, mitigation recommendations, and automated tests. Earlier project context is stale relative to its README; inspect current implementation before publishing claims.
- JobHelperGuru: local README describes Python/FastAPI, React, résumé matching, AI-assisted bullet revision, job tracking, document storage, authentication, and a heuristic offline mode. Feature and test claims have not been independently verified in this planning session.
- YU Bazaar: local README distinguishes original four-person coursework from Sourav's contributions and subsequent independent production modernization. Preserve that attribution.
- Toronto Airbnb Market Network: local README describes analysis of 15,809 listings, network community detection, reproducibility, and robustness experiments. Preserve original report authorship and state limitations; avoid claiming material predictive improvement.

## Resume-derived content

Source: `D:/Grind/Resume stuff/Full Stack/No phone number/Sourav Chandhok resume.pdf`, read 2026-09-09. These are resume-supported statements, not independent employment verification.

- Name: Sourav Chandhok.
- Public location in resume: Ontario, Canada. The previously approved hero uses Toronto; retain that approved direction unless corrected.
- Email: sourav.chandhok@gmail.com.
- LinkedIn displayed address: https://www.linkedin.com/in/souravchandhok. Use this HTTPS address on the website. The PDF annotation incorrectly targets a local file; correct the source resume and re-export before launch.
- GitHub: https://github.com/souravC01.
- Education: Bachelor of Science (Honours) in Computer Science, York University. User confirmed on 2026-09-09 that all academic requirements are complete and only convocation remains. Use “Computer Science graduate” in introductory copy. In Education, use “Academic requirements completed; convocation October 2026” (October comes from the supplied resume). Do not invent a formal degree-conferral date.
- Certificate: Bergeron Entrepreneurs in Science and Technology (BEST) Certificate; no date stated.
- Experience: Application Programmer Analyst Co-op, Ontario Ministry of Education / Ontario Public Service, Toronto, May 2023-August 2024.
- Experience themes: React/Java application changes, REST APIs and Oracle investigations, QA/UAT validation, accessibility, cross-functional defect resolution, and release support.
- Resume-reported scope: 500+ manual and automated test cases, 200+ tracked defects, and 5+ release cycles. Retain supported wording and do not imply sole ownership of team delivery or invent impact percentages.
- Present the co-op as a prominent homepage experience section alongside the project evidence, with three concise bullets for development, investigation/testing, and releases.
- Skills emphasis: Java/Spring Boot/PostgreSQL; React/TypeScript; Python/FastAPI/LLM integration; Docker/CI and automated testing. Show additional resume-listed tools only where relevant, without proficiency percentages.
- Resume demo links: https://roleimpact.vercel.app/, https://jobhelperguru.onrender.com/, https://toronto-airbnb-market-network.vercel.app/. Public availability has not been checked during this resume review.
- The resume omits YU Bazaar; retain it on the website as explicitly requested.
- The supplied PDF has no phone number; the planned site uses email and professional profiles.

## Remaining planning work

- Obtain portrait and optional personal details. Degree completion wording is resolved; resume, email, and professional profile addresses have been supplied.
- Confirm individual contributions where repository evidence is insufficient.
- Choose launch timing, hosting budget, content maintenance approach, and implementation stack.
- Turn the agreed direction into page layouts, content requirements, sequenced implementation tasks, and launch checks.
- Review the completed plan with the user before implementation.

## Proposed delivery sequence

1. Assemble verified copy, résumé, portrait, project screenshots, attribution, and demo/source links.
2. Design the homepage and one reusable case-study layout at desktop and mobile sizes.
3. Build the shared layout, navigation, homepage, and project case studies using the approved design.
4. Add résumé delivery, contact interactions, page metadata, social previews, and accessible motion.
5. Check mobile layout, keyboard navigation, contrast, links, direct case-study navigation, and production output.
6. Publish after deployment authorization and verify the public routes and downloads.
