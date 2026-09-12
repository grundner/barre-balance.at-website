# Offene Fragen

Diese Punkte sind bewusst noch nicht entschieden und dürfen weder vom Design
noch von der Umsetzung ungeprüft vorweggenommen werden.

Wird eine Frage entschieden, wird die Entscheidung in das zuständige Dokument
übernommen (bei signifikanten technischen Entscheidungen als ADR) und der
Eintrag unter „Entschieden“ mit Verweis vermerkt.

## Marke & Zielgruppe

| ID | Frage | Betrifft |
|---|---|---|
| OQ-2 | Claim | [Markenpositionierung](brand/positioning.md), [Produktvision](product/vision.md) |
| OQ-3 | Exakt definierte Kernzielgruppe | [Zielgruppen](product/target-groups.md) |

## Geschäftsmodell & Betrieb

| ID | Frage | Betrifft |
|---|---|---|
| OQ-4 | Preis- und Mitgliedschaftsmodell; ob Preise auf der Website erscheinen | [Website](features/website.md), später Buchung |
| OQ-5 | Einzelbuchung vs. Blöcke vs. Membership | Buchung (Phase 1b) |
| OQ-6 | Eigener Standort / eigenes Studio | [Ausgangssituation](product/context.md) |
| OQ-7 | Zahlungsanbieter | [Architektur](architecture/overview.md) |
| OQ-8 | Genaue Storno- und Wartelistenlogik | [User Journeys](ux/user-journeys.md) |
| OQ-12 | Langfristige Öffnung der Plattform für weitere Trainerinnen | [Produktvision](product/vision.md) |

## Produktumfang & Technik

| ID | Frage | Betrifft |
|---|---|---|
| OQ-9 | Umfang digitaler On-Demand-Angebote | [Roadmap](product/roadmap.md) |
| OQ-10 | Zeitpunkt für AI-Personalisierung | [Roadmap](product/roadmap.md), [AI-Grundsätze](product/ai-principles.md) |
| OQ-11 | Native App vs. responsive Web-App / PWA | [Architektur](architecture/overview.md) |
| OQ-15 | Verhältnis der statischen Website zur späteren Plattform: bleibt die Website eigenständig oder geht sie im Plattform-Stack auf? Gilt der Plattform-Stack aus dem Briefing weiterhin? | [Architektur](architecture/overview.md), [ADR-0001](adr/0001-static-website-astro.md) |
| OQ-16 | Reichweitenmessung: keine, oder cookielose Lösung (z. B. Cloudflare Web Analytics)? | [Website](features/website.md) |
| OQ-17 | Mehrsprachigkeit: nur Deutsch, oder später auch Englisch (Tourismusregion)? | [Website](features/website.md) |

## Entschieden

| ID | Frage | Entscheidung |
|---|---|---|
| OQ-1 | Endgültiger Markenname | **Barre & Balance** (2026-09-12), siehe [Markenpositionierung](brand/positioning.md#markenname) |
| OQ-13 | Verbindlicher Umfang des ersten Releases | Statische Website (2026-09-12), siehe [Roadmap](product/roadmap.md#aktueller-scope) |
| OQ-14 | Verhältnis Domain `barre-balance.at` zum Markennamen | Domain entspricht dem Markennamen (2026-09-12) |
