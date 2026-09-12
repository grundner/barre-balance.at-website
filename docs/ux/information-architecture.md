# Informationsarchitektur

Status: **Vorschlag**

Die Plattform gliedert sich in drei Bereiche (**Akzeptiert**):

1. öffentliche Website
2. Kundenbereich / App (eingeloggter Bereich)
3. Betreiberbereich

Die folgende Struktur je Bereich ist eine erste mögliche
Informationsarchitektur. Die endgültige Informationsarchitektur wird im
[Designprozess](design-process.md) aus den [User Journeys](user-journeys.md)
abgeleitet, einschließlich der Zusammenhänge und Übergänge zwischen den
Bereichen.

Grundhaltung der Bereiche: siehe
[Designprinzipien – Zwei Erlebniswelten](design-principles.md#zwei-erlebniswelten).

---

## 1. Öffentliche Website

Für den aktuellen Scope (statische Website) ist die verbindliche Seitenstruktur
in der [Feature-Spezifikation Website](../features/website.md#seiten)
festgelegt. Abweichend von den folgenden Ideen gilt dort:

- statt Buchung eine **Anfrage** über Kontakt-Links
- **keine freien Plätze** in Kursdetail und Stundenplan
- zusätzlich **Blog**, **Impressum** und **Datenschutz**

### Home

Hero mit starker Fotografie / Video von Isabell und Bewegung.

Mögliche inhaltliche Richtung:

> Bewege dich stärker.
> Fühle dich leichter.
> Trainiere mit Freude.

Darunter direkter CTA: **Kurse entdecken** / **Training buchen**

### Kurse

Übersicht aktueller Formate, beispielsweise:

- Barre
- Pilates
- Modern Jazz / Dance
- Specials / Workshops

Jeder Kurs erhält eine eigene Detaildarstellung mit:

- Beschreibung
- für wen geeignet
- Intensität
- Dauer
- Ort
- Trainerin
- Termine
- freie Plätze
- CTA zur Buchung

### Stundenplan

**Sehr wichtiger Bereich** (**Akzeptiert**).

Der Stundenplan soll visuell hochwertig, extrem einfach und insbesondere mobil
hervorragend funktionieren.

### Über Isabell

Nicht als klassischer Lebenslauf, sondern Storytelling über:

- Leidenschaft für Tanz
- Unterrichtserfahrung
- Barre
- Pilates
- Philosophie
- Motivation

Qualifikationen (siehe [Profil](../product/context.md#profil-isabell)) dienen
als Vertrauenssignal.

### Philosophie / Methodik

- Was bedeutet Movement für Isabell?
- Warum verbindet sie unterschiedliche Bewegungsformen?

### Testimonials

Persönliche Stimmen bestehender Teilnehmerinnen.

### FAQ

Typische Fragen:

- Brauche ich Erfahrung?
- Was soll ich mitbringen?
- Was ziehe ich an?
- Wie funktioniert die Buchung?
- Kann ich spontan teilnehmen?
- Was ist Barre?
- Was unterscheidet Barre und Pilates?

### Kontakt

Einfach, persönlich und lokal.

---

## 2. Kundenbereich / App

### Dashboard

Das Dashboard beantwortet zuerst (**Akzeptiert**):

> Was ist für mich jetzt relevant?

Beispiele:

- „Dein nächstes Training: Barre – Donnerstag 18:30“
- Buchung verwalten
- nächste passende Kurse
- neue Session von Isabell
- aktuelle Challenge
- Trainingsfortschritt

Keine klassische Enterprise-Dashboard-Optik mit zahlreichen Statistikkarten
(**Akzeptiert**).

### Navigation

Mobile-first gedacht (**Akzeptiert**).

Mögliche Hauptbereiche:

- Home
- Entdecken / Trainieren
- Kurse
- Fortschritt
- Profil

Funktionen des Kundenbereichs je Ausbaustufe: siehe
[Roadmap – Phase 2](../product/roadmap.md#phase-2--kundenportal).

---

## 3. Betreiberbereich

Die Plattform benötigt perspektivisch einen einfachen administrativen Bereich
für Isabell. Leitfrage: siehe
[Minimaler Administrationsaufwand](design-principles.md#minimaler-administrationsaufwand).

Mögliche Funktionen (**Kandidaten**):

- Termine erstellen
- Serienkurse erstellen
- Teilnehmerinnen sehen
- Anwesenheit
- Wartelisten
- Kurse absagen / verschieben
- Benachrichtigungen
- Kundinnen
- Gutscheine
- Inhalte
- Videos
- Testimonials
- Newsletter
- Statistiken

AI-Unterstützung im Betrieb: siehe
[Roadmap – AI für den internen Betrieb](../product/roadmap.md#ai-für-den-internen-betrieb).
