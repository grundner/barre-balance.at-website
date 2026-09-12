# Active Profile: Static Website (Phase 1a)

This is the active profile. Read it at the start of every task.

## Phase

The current scope is **only the public, static website** of Barre & Balance.
Authoritative scope: [`docs/product/roadmap.md`](../../docs/product/roadmap.md#aktueller-scope),
specification: [`docs/features/website.md`](../../docs/features/website.md).

## Applicable modules

| Module | Purpose |
|---|---|
| [`project/development-approach.md`](../project/development-approach.md) | Tooling, roles, documentation language |
| [`project/repository-layout.md`](../project/repository-layout.md) | Where things live |
| [`project/build-and-test.md`](../project/build-and-test.md) | Commands and verification |
| [`project/design-system.md`](../project/design-system.md) | Design system source, sync, content/design separation rules |
| [`templates/adr.md`](../templates/adr.md) | ADR template |
| [`skills/barre-balance-design/`](../skills/barre-balance-design/SKILL.md) | Brand and design knowledge from Claude Design |

Deliberately absent: API, persistence, security/auth and backend modules. They
become relevant only when the platform scope starts.

## Phase rules

These restrict the general workflow in `CLAUDE.md`:

1. **No platform features.** Do not implement booking, waitlists, accounts,
   payments, forms with server-side processing, tracking or cookies. Treat such
   requests as scope changes that need an explicit decision and documentation
   first.
2. **No third-party requests** from the website (fonts, icons, scripts, embeds).
3. **Content only in `content/`**, design only in `src/` (ADR-0003). Run
   `npm run lint:separation`.
4. **Never invent facts about Isabell or the business** (course details,
   prices, times, addresses, testimonials, legal data). Unconfirmed content gets
   `placeholder: true`.
5. **Do not set `indexing: true`** unless the user explicitly asks for the launch.
6. **Public repository.** Never commit confidential or personal information
   beyond what is intended for the public website and the documented project
   knowledge.
7. Before reporting completion, run `npm run verify` (or explain which parts
   could not run).
