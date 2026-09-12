# Build and Test

Requirements: Node.js 24 (`.nvmrc`), npm. Playwright needs Chromium once:
`npx playwright install chromium`.

| Command | Purpose |
|---|---|
| `npm run dev` | Development server on http://localhost:4321 (drafts visible, `/ds/` design-system overview) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve `dist/` like GitHub Pages on http://localhost:4321 |
| `npm run check` | TypeScript and content schema check (`astro check`) |
| `npm run lint:separation` | Content/design separation and token usage (ADR-0003) |
| `npm run format` / `format:check` | Prettier for code (docs and content are excluded) |
| `npm run test:unit` | Node test runner for `src/lib` |
| `npm run test:e2e` | Playwright against `dist/` (desktop + 390 px mobile), incl. axe A11y |
| `npm run verify` | Everything above in CI order |

## Traceability

Tests reference the IDs from `docs/features/website.md` (WEB-P*, WEB-R*, WEB-Q*)
in their names. Keep IDs aligned when requirements change.

## Checks that are not automated

- **Invalid content breaks the build:** verified manually (e.g. remove `title`
  from a course → `astro build` fails with a schema error).
- **Launch guard (WEB-R4):** `indexing: true` with placeholder content makes
  `/robots.txt` generation throw and the build fail; logic is unit-tested in
  `tests/unit/lib.test.ts`.
- **Visual fidelity** to the Claude Design System: compare `/ds/` and pages in
  the browser at 390 px and desktop width.

## Deployment

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) runs all checks
and deploys `dist/` to GitHub Pages. Pull requests run checks only.
