# Designprozess

Status: **Akzeptiert**

Vorgehen für UX/UI und visuelle Exploration mit **Claude Design**.

## Grundsatz

Nicht sofort einzelne Screens isoliert designen.

Zunächst wird aus der Projektdokumentation ein konsistentes Produkt- und
UX-Konzept entwickelt. Ergebnisse aus dem Designprozess werden – sobald
abgestimmt – textuell in die zuständigen Dokumente übernommen (siehe
`CLAUDE.md`, Abschnitt „Design Results“).

Punkte aus den [Offenen Fragen](../open-questions.md) dürfen vom Design nicht
ungeprüft vorweggenommen werden.

## Design System

Status: **Akzeptiert** (2026-09-12)

Das Ergebnis von Brand Direction und grundlegender UX ist das Claude Design
System **„Barre & Balance“**:

- Projekt: https://claude.ai/design/p/76a62150-7990-4b2c-8b92-7961647458ce
- Inhalt: Tokens (Farbe, Typografie, Abstände, Form, Motion), Logo und Signet,
  Guidelines, Komponenten, UI-Kits für Website, App und Studio, Templates
- Es ist die **Quelle des Designs**. Änderungen am Design entstehen dort und
  werden ins Repository synchronisiert (Ablauf:
  [`.claude/project/design-system.md`](../../.claude/project/design-system.md)).
- Texte, Kursnamen, Preise und Stimmen in den UI-Kits sind **Platzhalter** und
  keine bestätigten Inhalte.

Stand der Schritte unten: Schritt 1 (Brand Direction) ist mit dem Design System
abgeschlossen. Die Schritte 2 bis 5 liegen für die Website als Vorentwurf in den
UI-Kits vor und werden bei der Umsetzung konkretisiert.

## Eingangsdokumente

- [Produktvision](../product/vision.md)
- [Zielgruppen](../product/target-groups.md)
- [Markenpositionierung](../brand/positioning.md)
- [AI-Grundsätze](../product/ai-principles.md)
- [Designprinzipien](design-principles.md)
- [Informationsarchitektur](information-architecture.md)
- [User Journeys](user-journeys.md)
- [Roadmap & MVP-Abgrenzung](../product/roadmap.md)
- [Architekturüberblick](../architecture/overview.md)

## Schritt 1 – Brand Direction

2–3 unterschiedliche visuelle Richtungen für die Marke erarbeiten.

Für jede Richtung:

- visuelle Grundidee
- Typografie
- Farbwelt
- Bildsprache
- UI-Charakter
- Beispiele für Hero / Cards / CTAs
- Begründung, warum die Richtung zu Isabell passt

## Schritt 2 – Informationsarchitektur

Getrennt definieren:

1. öffentliche Website
2. Kundenbereich / App
3. Betreiberbereich

Zusammenhänge und Übergänge zeigen.

## Schritt 3 – User Journeys

Die wichtigsten [User Journeys](user-journeys.md) visualisieren, insbesondere:

- Erstbesuch → erste Buchung (UJ-1)
- wiederkehrende Buchung (UJ-2)
- Warteliste (UJ-3)
- Login → nächstes Training (UJ-4)
- später: digitales Training → Check-in → Empfehlung (UJ-5)

## Schritt 4 – Wireframes

Wireframes für die wichtigsten Screens, in dieser Priorität:

1. Homepage
2. Kursübersicht
3. Kursdetail
4. Stundenplan
5. Buchungsflow
6. Kunden-Dashboard
7. Mobile Dashboard
8. Betreiber-Dashboard

## Schritt 5 – High-Fidelity Design

Erst nachdem Brand Direction, Informationsarchitektur und grundlegende UX
abgestimmt sind, werden High-Fidelity Screens und das Design System entwickelt.
