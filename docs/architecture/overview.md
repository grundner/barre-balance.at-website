# Architekturüberblick

## 1. Öffentliche Website (aktueller Scope)

Status: **Akzeptiert**

| Aspekt | Entscheidung | Quelle |
|---|---|---|
| Art | Statische Website, kein Server, keine Datenbank | [ADR-0001](../adr/0001-static-website-astro.md) |
| Generator | Astro (`output: 'static'`), TypeScript strict | [ADR-0001](../adr/0001-static-website-astro.md) |
| Inhalte | Markdown / MDX / YAML in `content/`, validiert über Content Collections | [ADR-0003](../adr/0003-content-design-separation.md) |
| Design | Tokens und Komponenten nach Claude Design System „Barre & Balance“ | [ADR-0003](../adr/0003-content-design-separation.md) |
| Client-JS | Standardmäßig keines | [Website WEB-Q4](../features/website.md#qualitätsanforderungen) |
| Schriften / Icons | Selbst gehostet bzw. Inline-SVG, keine Third-Party-Requests | [ADR-0001](../adr/0001-static-website-astro.md) |
| Hosting | GitHub Pages, öffentliches Repository, Deploy über GitHub Actions | [ADR-0002](../adr/0002-hosting-github-pages-cloudflare-dns.md) |
| DNS / Domain | Cloudflare DNS, `barre-balance.at` (Apex), `www` leitet um | [ADR-0002](../adr/0002-hosting-github-pages-cloudflare-dns.md) |

### Bausteine

```text
content/  ──(Schemas)──▶  Astro Build  ──▶  dist/ (HTML, CSS, Assets)  ──▶  GitHub Pages  ◀── Cloudflare DNS
                             ▲
src/ (Tokens, Komponenten, Layouts, Seiten)
```

Repository-Aufbau und Befehle: [`.claude/project/repository-layout.md`](../../.claude/project/repository-layout.md),
[`.claude/project/build-and-test.md`](../../.claude/project/build-and-test.md).

## 2. Spätere Plattform

Status: **Geplant**, nicht Teil des aktuellen Scopes. Bei Beginn der Plattform
neu zu bewerten (siehe [Offene Fragen](../open-questions.md)).

### Architekturprinzipien

- **API-first** – Funktionen werden über eine REST API bereitgestellt.
- **Klare Trennung der Bereiche** – öffentliche Website, Kunden-App und
  Betreiberfunktionen sind klar getrennt, stehen aber möglichst auf einer
  gemeinsamen technischen Basis (siehe
  [Informationsarchitektur](../ux/information-architecture.md)).
- **Wiederverwendbares Design System** für alle Bereiche. Die Tokens des Claude
  Design Systems sind 1:1 auf ein MUI-Theme abbildbar.
- **Responsive Web-App zunächst bevorzugt.** Die Architektur ist so zu
  gestalten, dass später native/mobile Experiences möglich sind. Native App vs.
  responsive Web-App / PWA ist [offen](../open-questions.md).

### Geplanter Stack laut Briefing

- **Frontend:** Next.js, React, TypeScript, MUI / MUI X
- **Backend:** Java 21+, Spring Boot, Spring Security, JPA, PostgreSQL, REST API
- **Betrieb:** Docker / containerisiert

### Offene technische Entscheidungen

- Zahlungsanbieter
- Native App vs. responsive Web-App / PWA
- Verhältnis der statischen Website zur späteren Plattform
