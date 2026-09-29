# ADR-0004: Zeitabhängige Inhalte zum Build-Zeitpunkt, nächtlicher Rebuild

- Status: Accepted
- Datum: 2026-09-29
- Betrifft: [Website](../features/website.md#zeitabhängige-inhalte), [Architekturüberblick](../architecture/overview.md), Build- und Deploy-Workflow

## Kontext

Die Website ist statisch (ADR-0001) und wird nur bei einem Build erzeugt.
Einige Inhalte hängen von der Zeit ab: Der nächste Termin eines Kurses ist nach
seinem Beginn nicht mehr aktuell. Künftig kommen weitere Bereiche mit derselben
Eigenschaft hinzu, z. B. zeitgesteuert erscheinende Blog-Beiträge oder ein
Kalender. Ohne Automatismus bliebe Veraltetes sichtbar, bis jemand manuell
einen Build auslöst. Client-JavaScript ist standardmäßig ausgeschlossen (WEB-Q4).

## Entscheidung

1. Zeitabhängige Inhalte werden **beim Build** gegen den Build-Zeitpunkt
   ausgewertet: Was vergangen ist, wird nicht ausgeliefert.
2. Es gibt **eine gemeinsame, rein funktionale Hilfsbibliothek** für die
   Auswertung (Zeitzone `Europe/Vienna`, Vergleich mit einem übergebenen
   Zeitpunkt). Neue zeitabhängige Bereiche verwenden sie, statt eigene Logik
   zu schreiben.
3. Die Website wird **jede Nacht automatisch neu gebaut und veröffentlicht**
   (geplanter Lauf des bestehenden Build-&-Deploy-Workflows), damit Vergangenes
   spätestens am Folgetag verschwindet.
4. Tests dürfen nicht vom Datum echter Inhalte abhängen: Die Logik wird mit
   festen Zeitpunkten per Unit-Test geprüft; E2E-Tests prüfen nur Invarianten.

## Alternativen

| Alternative | Warum nicht gewählt |
|---|---|
| Manuelle Pflege | Veraltete Termine blieben sichtbar, bis jemand daran denkt. |
| Ausblenden per Client-JavaScript | Widerspricht WEB-Q4 (kein Client-JS als Standard); Inhalte wären ohne JS falsch. |
| Server-Rendering | Widerspricht ADR-0001/0002 (statisch, GitHub Pages). |
| Rebuild in kürzeren Abständen (z. B. stündlich) | Für Kurstermine unnötig; höherer CI-Verbrauch. Kann bei Bedarf angepasst werden. |

## Konsequenzen

- Positiv: Einheitlicher, JS-freier Mechanismus für alle zeitabhängigen Bereiche.
- Negativ / Kosten: Zwischen Ereignis und nächstem Build (max. ca. 24 h) kann
  Vergangenes noch sichtbar sein. Ein nächtlicher Build, der an Tests scheitert,
  veröffentlicht nichts; die Seite bleibt dann auf dem letzten Stand.
- Folgearbeiten: Weitere zeitabhängige Bereiche (Blog, Kalender) nutzen die
  Hilfsbibliothek und die Regel [WEB-R7](../features/website.md#web-r7--zeitabhängige-inhalte).
