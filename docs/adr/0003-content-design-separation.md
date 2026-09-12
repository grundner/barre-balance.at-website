# ADR-0003: Strikte Trennung von Inhalt und Design

- Status: Accepted
- Datum: 2026-09-12
- Betrifft: [Website](../features/website.md), [Architekturüberblick](../architecture/overview.md)

## Kontext

Die Website soll AI-native entwickelt werden, einen Blog enthalten und später
ohne Umbau erweiterbar sein. Inhalte (Texte, Kurse, Stundenplan, Blog-Beiträge)
ändern sich häufig, das Design selten. Das Design entsteht im Claude Design
System „Barre & Balance“. Inhalte werden vorerst über Git bzw. Claude Code
gepflegt; ein CMS ist nicht geplant, soll aber später möglich bleiben.

## Entscheidung

1. **Inhalt** liegt ausschließlich im Top-Level-Ordner `content/` als Markdown,
   MDX oder YAML, validiert durch Schemas (Astro Content Collections).
2. **Design** liegt ausschließlich unter `src/`: Tokens aus dem Claude Design
   System, Komponenten, Layouts.
3. **Komponenten und Layouts enthalten keine nutzersichtbaren Texte.** Auch
   UI-Texte (Button-Beschriftungen, Leerzustände, Navigation) kommen aus
   `content/`.
4. **Seiten (`src/pages/`)** komponieren nur Layouts, Komponenten und
   Content-Einträge.
5. **Gestalterische Werte** (Farben, Abstände, Schriften, Radien, Motion) werden
   nur über die Design-Tokens verwendet.
6. Das Claude Design System ist die Quelle des Designs. Änderungen am Design
   entstehen dort und werden in das Repository synchronisiert.

## Alternativen

| Alternative | Warum nicht gewählt |
|---|---|
| Inhalte unter `src/content/` (Astro-Standard) | Trennung ist weniger sichtbar; Inhalt und Code vermischen sich im selben Baum |
| Headless CMS | Zusätzlicher Dienst, Kosten, Datenschutzfragen; für den aktuellen Pflegeweg (Git/Claude Code) nicht nötig |
| Texte direkt in Komponenten | Widerspricht der geforderten Trennung; erschwert Pflege und spätere Mehrsprachigkeit |

## Konsequenzen

- Positiv: Inhalte sind ohne Design-Kenntnisse änderbar; ungültige Inhalte brechen den Build.
- Positiv: Ein Git-basiertes CMS kann später auf dieselben Dateien aufsetzen; Mehrsprachigkeit ist vorbereitet.
- Negativ: Etwas mehr Indirektion bei kleinen Texten (z. B. Button-Labels).
- Folgearbeit: Regeln als Arbeitskonvention in `.claude/project/design-system.md` festhalten und im Review prüfen.
