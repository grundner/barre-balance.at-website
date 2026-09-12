# Design System and Content/Design Separation

## Source

The design source is the Claude Design project **"Barre & Balance Design System"**
(`76a62150-7990-4b2c-8b92-7961647458ce`), readable via the `DesignSync` tool.
Accepted in [`docs/ux/design-process.md`](../../docs/ux/design-process.md#design-system).

Relevant parts in the design project:

| Path | Use in this repository |
|---|---|
| `readme.md` | Visual foundations and content fundamentals (voice extracted to `docs/brand/voice-and-tone.md`) |
| `tokens/*.css` | Copied 1:1 to `src/styles/tokens/` (except `fonts.css`) |
| `assets/*.svg` | Signet geometry reproduced in `Logo.astro`, `public/favicon.svg`, `scripts/generate-og-image.mjs` |
| `components/**.jsx` | Reference for the `.astro` ports in `src/components/ui/` |
| `ui_kits/website/*.jsx` | Layout reference for pages; **all texts there are placeholders** |

A local copy of the design skill lives in [`.claude/skills/barre-balance-design/`](../skills/barre-balance-design/SKILL.md).

## Sync procedure

1. Design changes happen in Claude Design, not in this repository.
2. Read the changed files with `DesignSync` (`list_files`, `get_file`).
3. Tokens: replace the corresponding file in `src/styles/tokens/`, keep the
   header comment and update its sync date.
4. Components: adapt the `.astro` port; keep props/variants aligned with the
   DS component; no React runtime.
5. Run `npm run verify` and compare visually (`npm run dev` → `/ds/`).

## Separation rules (ADR-0003)

- No user-visible text in `src/components`, `src/layouts`, `src/pages`
  (including `alt`, `title`, `aria-label`). Texts come from `content/`.
- No colour values outside `src/styles/tokens/`; use `var(--bb-*)`.
  Exceptions: `<meta name="theme-color">`, `public/`, `scripts/`.
- `src/components/ui/*` never read content collections; they receive props.
- Checked by `npm run lint:separation`.

## Implementation choices differing from the design project

| Topic | Design project | Implementation | Reason |
|---|---|---|---|
| Fonts | Google Fonts via `@import` | Self-hosted via `@fontsource` (Latin subset) | No third-party requests (WEB-Q3) |
| Icons | Material Symbols webfont | Inline SVG from Iconify `material-symbols-light` (outlined, weight 300) | No third-party requests, no icon font download |
| Accordion | React state | Native `<details>` | No client JS (WEB-Q4) |

## Known deviations

These deviate visually from the design project to meet WCAG 2.2 AA (WEB-Q2).
Accepted deviations should be carried over into Claude Design so both sides match again.

| ID | Deviation | Detail | Status |
|---|---|---|---|
| DS-DEV-1 | Filled primary buttons use **Teal-dark** (`--bb-teal-dark`) instead of Teal; hover goes to Deep | White on Teal `#1B9AAA` = 3.36:1 (fails AA for button text); on Teal-dark = 5.77:1 | **Accepted** by the product owner (2026-09-12); not yet updated in Claude Design |
| DS-DEV-2 | Overlines, timeline years and small meta texts use `--bb-text-secondary` instead of `--bb-text-muted` | Muted on page background = 3.40:1; secondary = 6.41:1 | Pending design decision |
| DS-DEV-3 | Links inside running text (`.bb-prose`) are underlined | DS links have no underline; WCAG 1.4.1 | Pending design decision |
