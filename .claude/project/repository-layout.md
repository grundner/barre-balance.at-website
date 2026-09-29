# Repository Layout

```text
CLAUDE.md                     Universal working model
README.md                     Public entry point
.claude/                      Working instructions (profile, project rules, templates, skills)
docs/                         Authoritative project knowledge (German), index: docs/README.md
content/                      Website content only (Markdown, MDX, YAML) – ADR-0003
  settings/site.yaml          Brand, contact channels, navigation, indexing switch
  settings/ui.yaml            All recurring UI texts
  pages/*.md                  Page texts; file name = page id used by src/pages
  courses/*.md                Courses; file name = URL slug /kurse/<id>/
  locations/*.yaml            Teaching locations
  schedule/slots.yaml         Weekly schedule (references courses and locations by id)
  schedule/notices.yaml       Time-boxed schedule notices
  faq/*.md                    FAQ entries
  testimonials.yaml           Testimonials (consent required)
  about/qualifications.yaml   Isabell's qualifications timeline
  blog/*.md(x)                Blog posts; file name = URL slug /blog/<id>/
  images/*.jpg                Photos, referenced relatively from content (e.g. ../images/x.jpg);
                              descriptive German kebab-case names; Astro optimizes them at build
src/
  content.config.ts           Content schemas (Zod) – the contract for content/
  styles/tokens/              Design tokens copied from Claude Design (do not edit)
  styles/fonts.css            Self-hosted fonts
  styles/global.css           Base styles, typography, layout and prose utilities
  components/ui/              Ports of design-system components (no content, no data access)
  components/site/            Website-specific compositions (receive content via props)
  layouts/                    Page layouts (BaseLayout, TextPageLayout)
  lib/                        Content access (content.ts) and pure helpers (tested)
  pages/                      Routes; compose layouts, components and content only
  dev/                        Development-only pages (/ds/), not built for production
tmp/                          Scratch drop zone, committed empty (only .gitkeep); ignore its content
public/                       Static files (CNAME, favicon, OG image)
scripts/                      Build and quality scripts
tests/unit/                   Node test runner, pure functions in src/lib
tests/e2e/                    Playwright tests against dist/
.github/workflows/deploy.yml  CI and GitHub Pages deploy
```

## Conventions

- `tmp/` is a scratch drop zone for the user. Never read, use or modify its
  content unless explicitly asked to. Its content is git-ignored; the empty
  directory is kept via `tmp/.gitkeep`.

- Routes are code (`src/pages`), their texts are content (`content/pages/<id>.md`).
  Adding a page means: spec in `docs/features/website.md`, content file, route, test entry in `tests/e2e/website.spec.ts`.
- Deferred features stay in the code but are not built: a route is parked by an
  underscore prefix (`src/pages/_<name>.astro`, excluded by Astro), unused
  compositions stay in `src/components/site/`. Currently parked: the schedule
  (`_stundenplan.astro`, `CourseSchedule.astro`), see `docs/features/website.md`.
  Reactivating requires an explicit decision; update the spec, navigation and tests.
- Pure helpers in `src/lib` import siblings with explicit `.ts` extensions so
  they run under the Node test runner without a build step.
- Comments and documentation facing the project are German; code identifiers are English.
