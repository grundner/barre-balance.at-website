# ADR-0001: Statische Website mit Astro

- Status: Accepted
- Datum: 2026-09-12
- Betrifft: [Architekturüberblick](../architecture/overview.md), [Website](../features/website.md)

## Kontext

Der aktuelle Scope umfasst ausschließlich die öffentliche Website von
Barre & Balance. Buchung, Accounts und Betreiberbereich sind nicht Teil dieses
Scopes (siehe [Roadmap](../product/roadmap.md)).

Anforderungen an die technische Basis:

- statisch auslieferbar (Hosting auf GitHub Pages, siehe [ADR-0002](0002-hosting-github-pages-cloudflare-dns.md))
- Inhalte strikt vom Design getrennt, inklusive Blog (siehe [ADR-0003](0003-content-design-separation.md))
- AI-native entwickelbar: klare, typisierte Struktur, die Claude Code zuverlässig bearbeiten kann
- Mobile First, sehr schnell, barrierearm, ohne Third-Party-Requests
- Umsetzung des Claude Design Systems „Barre & Balance“

Das Briefing nennt für die spätere Plattform Next.js / React / MUI. Dieser
Stack ist auf eine interaktive Web-App ausgerichtet, nicht auf eine
inhaltsgetriebene statische Website.

## Entscheidung

Die Website wird mit **Astro** als Static Site Generator gebaut:

- `output: 'static'`, TypeScript strict
- Inhalte über **Astro Content Collections** mit Schemas
- Komponenten als `.astro`-Komponenten **ohne Client-JavaScript**; JavaScript nur,
  wo eine Interaktion es zwingend erfordert
- Design-Tokens des Claude Design Systems als CSS Custom Properties
- Schriften (Jost, JetBrains Mono) und Icons (Material Symbols) werden
  **selbst gehostet** bzw. als Inline-SVG eingebettet

## Alternativen

| Alternative | Warum nicht gewählt |
|---|---|
| Next.js (Static Export) + MUI | Liefert React-Runtime und MUI-JS für eine überwiegend statische Seite aus; Content-Pipeline muss selbst gebaut werden |
| Eleventy / Hugo | Keine typisierten Content-Schemas in vergleichbarer Qualität; Komponentenmodell schwächer; DS-Port aufwendiger |
| Reines HTML/CSS | Keine Trennung von Inhalt und Design, kein Blog ohne eigene Build-Pipeline |

## Konsequenzen

- Positiv: Kein Client-JS im Normalfall, sehr gute Performance, typisierte Inhalte, Build bricht bei ungültigen Inhalten.
- Positiv: Tokens bleiben 1:1 mit dem Design System und später auf ein MUI-Theme abbildbar.
- Negativ: Die React-Komponenten des Design Systems werden nicht direkt verwendet, sondern als `.astro` nachgebaut.
- Folgearbeit: Beim Start der Plattform ist zu entscheiden, ob die Website eigenständig bleibt oder in den Plattform-Stack übergeht (siehe [Offene Fragen](../open-questions.md)).
