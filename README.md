# Sourav Chandhok portfolio

Static portfolio with a homepage and four case studies. The public files live in `dist/`; generated HTML is committed for portable hosting.

## Maintain

- Edit project content in `src/projects.mjs`.
- Edit homepage/shared markup in `scripts/build.mjs`.
- Edit styling in `src/style.css` and the copy-email interaction in `src/client.js`.
- Replace `dist/resume.pdf` when the résumé changes; retain its filename.
- User-provided screenshots and the research figure live in `dist/assets/`.

Run `npm run build`, then `npm test`. Preview using `npm run dev` at http://127.0.0.1:4173.

No dependency installation is necessary. Node.js is required for maintenance, but the published website has no server runtime. Google Fonts has a local system-font fallback.

## Scope

RoleImpact, JobHelperGuru, YU Bazaar, and Toronto Airbnb Market Network appear in that order. Education wording reflects completed academic requirements and pending October 2026 convocation. No unbuilt agentic project or invented portrait is included.

Attribution and research limitations are included in the case studies. Resume statistics are user-supplied. This portfolio does not independently certify the security or performance of linked applications.
