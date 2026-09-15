# Sourav Chandhok portfolio

Static portfolio with a homepage and four case studies. The public files live in `dist/`; generated HTML is committed for portable hosting.

## Maintain

- Edit project content in `src/projects.mjs`.
- Edit homepage markup in `scripts/build.mjs`; project cards and case-study templates live in `src/project-pages.mjs`.
- Edit styling in `src/style.css`; translations, navigation, animations, and audio live in `src/client.js`.
- Replace `src/assets/resume.pdf` when the résumé changes; retain its filename.
- Assets, including screenshots and the research figure, live in `src/assets/` and are copied by the build.

Run `npm run build`, then `npm test`. Preview using `npm run dev` at http://127.0.0.1:4173.

No dependency installation is necessary for the build or structural tests. Node.js is required for maintenance, but the published website has no server runtime. Fonts are served locally with system-font fallbacks.

For keyboard, reduced-motion, no-JavaScript, and project-navigation regression tests, start the preview and run `node scripts/check-browser.mjs`. This optional test requires Playwright and Microsoft Edge; alternatively pass the absolute path to an existing Playwright `index.mjs` installation as the first argument.

`src/home.mjs` and `src/portrait.css` are legacy files and are not used by the current build. Case studies are English-only; the homepage retains its EN/FR controls.

## Scope

RoleImpact, JobHelperGuru, YU Bazaar, and Toronto Airbnb Market Network appear in that order. Education wording reflects completed academic requirements and pending October 2026 convocation. No unbuilt agentic project or invented portrait is included.

Attribution and research limitations are included in the case studies. Resume statistics are user-supplied. This portfolio does not independently certify the security or performance of linked applications.
