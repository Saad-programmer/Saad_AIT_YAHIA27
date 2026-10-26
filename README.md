# Saad AIT YAHIA — Systems Portfolio

Portfolio for C/C++ systems programming, GTK applications, and low-level software projects.

## Development

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

## Quality checks

```sh
npm run build
npm run lint
npm run format:check
npm test
```

## Deployment

Vercel builds the root site with `npm run build`; Vite writes the static site to `dist/` and defaults to `/`.

The GitHub Pages workflow sets `VITE_BASE_PATH=/Saad_AIT_YAHIA/` and deploys the same `dist/` output. It deploys only after changes reach `main`. To enable it, open **Settings → Pages → Build and deployment → Source → GitHub Actions** and save. This does not change Vercel configuration; both hosts can deploy from the same repository.

## Structure

- `src/main.ts` — page composition and interactions
- `src/lib/` — GitHub data/cache, filters, theme logic
- `src/data/project-fallback.json` — source-reviewed project details and GitHub metadata suggestions
- `src/styles.css` — responsive themes and components
- `public/` — static site assets, résumé downloads, favicon, and SEO files
- `legacy/` — preserved original portfolio and assets; excluded from linting, formatting, and production output

Add a project record to `src/data/project-fallback.json`, review its actual source, include architecture/features/evidence, and provide suggested GitHub description/topics. Add visual assets to `public/images/` and reference them with `import.meta.env.BASE_URL` so they work on both hosting paths.

## Contact form

The Web3Forms access key is intentionally left as `TODO: add Web3Forms access key` in `src/main.ts`. Until it is configured, the form opens a `mailto:` draft and includes a honeypot field. Certificates stay archived until their publication is approved.

## Content TODOs

- Add the Web3Forms access key.
- Confirm daily-use tools and proficiency outside the linked repositories.
- Add education, courses, learning goals, and availability details.
- Review the TRackRS fork attribution and identify which changes are your own.
- Capture project screenshots and fill in remaining learning-outcome TODOs.
- Approve or exclude each certificate before it is published.
