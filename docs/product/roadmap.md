# Roadmap & MVP-Abgrenzung

Die Plattform wird **iterativ** aufgebaut (**Akzeptiert**).

Die Phasen beschreiben die Entwicklungsrichtung. Die in den Phasen 2–4
genannten Funktionen sind **Kandidaten** und nicht zur Umsetzung freigegeben,
solange sie nicht in eine Feature-Spezifikation überführt wurden.

---

## Aktueller Scope

Status: **Akzeptiert** (2026-09-12)

Der aktuelle Scope umfasst **ausschließlich die öffentliche, statische
Website** (Phase 1a). Spezifikation: [Website](../features/website.md).

Alles Weitere – einschließlich Buchung, Warteliste, Accounts und
Betreiberbereich – ist nicht Teil des aktuellen Scopes.

---

## Phase 1 – Marke & lokale Kurse

Isabell benötigt zunächst eine professionelle digitale Basis für ihr bereits
existierendes Kursgeschäft. Phase 1 wird in zwei Stufen umgesetzt.

### Phase 1a – Website

Status: **Akzeptiert**, in Umsetzung

- Marke etablieren
- Kurse präsentieren
- Stundenplan (ohne freie Plätze)
- Kontakt und Anfrage über Kontakt-Links statt Buchung
- Testimonials
- Blog

### Phase 1b – Buchung & Verwaltung

Status: **Kandidat** (Umfang und Zeitpunkt offen)

- Kursbuchung
- Wartelisten
- Teilnehmerverwaltung
- Gutscheine / Specials – perspektivisch
- Interessentinnen und bestehende Kundinnen in eine eigene Community überführen

Die lokale Community ist zunächst wichtiger als maximale Skalierung.

## Phase 2 – Kundenportal

Registrierte Kundinnen erhalten einen persönlichen Bereich.

Mögliche Funktionen (**Kandidaten**):

- Meine nächsten Kurse
- Buchungen
- Stornierungen
- Wartelisten
- Trainingshistorie
- persönliche Empfehlungen
- Challenges
- Inhalte / Übungen
- Videos
- Favoriten
- persönliche Einstellungen

## Phase 3 – Digitales Movement-Angebot

Die Plattform wird selbst zum Produkt.

Mögliche Inhalte (**Kandidaten**):

- On-Demand Trainings
- kurze Mobility Sessions
- Barre Sessions
- Pilates Sessions
- Programme / Serien
- Challenges
- Trainingspläne
- Wissensinhalte
- eventuell Ernährung / Rezepte als ergänzender Bereich

Der Umfang digitaler On-Demand-Angebote ist [offen](../open-questions.md).

## Phase 4 – AI-native Movement Platform

Personalisierung wird zu einem zentralen Bestandteil. Der Zeitpunkt für
AI-Personalisierung ist [offen](../open-questions.md). Für alle AI-Funktionen
gelten die [AI-Grundsätze](ai-principles.md).

Mögliche Features (**Kandidaten**):

### AI Movement Assistant

Nutzerinnen geben Ziele, Erfahrung, verfügbare Zeit und relevante
Einschränkungen an. Die Plattform empfiehlt daraus passende Inhalte und Kurse.

### Persönlicher Trainingsplan

Dynamische Empfehlungen auf Basis von:

- Ziel
- Trainingshistorie
- verfügbarer Zeit
- bevorzugten Formaten
- Feedback nach Einheiten

### Check-in nach Trainings

Beispielfragen:

- Wie fühlst du dich?
- Wie anstrengend war die Einheit?
- Welche Bereiche waren besonders gefordert?
- Wie ist dein Energielevel?

Diese Informationen können zukünftige Empfehlungen beeinflussen.

### Isabell AI / Knowledge Assistant

Ein digitaler Assistant auf Basis von Isabells eigener Methodik, Philosophie und
freigegebenen Inhalten. Er beantwortet beispielsweise Fragen zu:

- Kursen
- Übungen
- Trainingsabläufen
- Vorbereitung auf Einheiten
- Regeneration
- Isabells Trainingsphilosophie

### AI für den internen Betrieb

AI unterstützt Isabell bei der Administration:

- Newsletter vorbereiten
- Social-Media-Content entwerfen
- Kursbeschreibungen erzeugen
- Auslastung analysieren
- Teilnehmerentwicklung erkennen
- Feedback zusammenfassen
- Inhalte wiederverwenden / adaptieren

---

## MVP-Abgrenzung (erster Release)

### Verbindlich

Status: **Akzeptiert**

- Die langfristige Vision soll Architektur und UX beeinflussen, aber **nicht
  vollständig im ersten Release implementiert werden**.
- AI Coach, umfangreiche Video-Plattform, dynamische Trainingspläne,
  Challenges und tiefgehendes Tracking sind **spätere Ausbaustufen** und nicht
  Teil des ersten Releases.

### Umfang des ersten Releases

Status: **Akzeptiert** (2026-09-12, löst den früheren Vorschlag und OQ-13 ab)

Der erste Release ist die **statische Website** gemäß
[Feature-Spezifikation](../features/website.md):

- hochwertige öffentliche Website
- Isabell / Brand
- Kurse und Kursdetails
- Stundenplan
- Anfrage über Kontakt-Links
- Blog

Buchung, Teilnehmerverwaltung, Kundenaccounts, Betreiberverwaltung und
Benachrichtigungen – im früheren Vorschlag noch enthalten – folgen frühestens
in Phase 1b.
