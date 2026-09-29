# Feature-Spezifikation: Öffentliche Website

Status: **Akzeptiert** (aktueller Scope, siehe [Roadmap](../product/roadmap.md#aktueller-scope))

Technische Entscheidungen: [ADR-0001](../adr/0001-static-website-astro.md),
[ADR-0002](../adr/0002-hosting-github-pages-cloudflare-dns.md),
[ADR-0003](../adr/0003-content-design-separation.md).

## Ziel

Eine hochwertige, statische Website für **Barre & Balance** unter
`https://barre-balance.at`. Sie stellt Isabell, ihre Kurse und ihre Haltung vor. Außerdem ermöglicht sie eine unkomplizierte **Anfrage** über
Kontakt-Links. Die Website verkauft Isabell und das Erlebnis ihrer Kurse – nicht
Software (siehe [Designprinzipien](../ux/design-principles.md)).

## Nicht-Ziele

Nicht Teil dieses Scopes:

- Online-Buchung, Warteliste, Stornierung
- Kundenaccounts, Login, Kundenbereich, Betreiberbereich
- Anzeige freier Plätze oder Auslastung
- Zahlungen, Gutscheinverkauf
- Kontaktformular oder andere serverseitige Datenverarbeitung
- Newsletter
- Tracking, Analytics, Cookies
- Mehrsprachigkeit (siehe [Offene Fragen](../open-questions.md))

---

## Seiten

| ID | Seite | Pfad | Inhalt |
|---|---|---|---|
| WEB-P1 | Home | `/` | Hero ([Varianten](#hero-der-startseite)), Kursauswahl, Philosophie-Teaser, Stimmen, Blog-Teaser, Anfrage-CTA |
| WEB-P2 | Kurse | `/kurse/` | Übersicht aller veröffentlichten Kurse |
| WEB-P3 | Kursdetail | `/kurse/<kurs>/` | Beschreibung, Eckdaten, Anfrage-CTA |
| WEB-P4 | Stundenplan | `/stundenplan/` | **Zurückgestellt**, siehe [Zurückgestellt: Stundenplan](#zurückgestellt-stundenplan) |
| WEB-P5 | Über Isabell | `/ueber-isabell/` | Storytelling, Qualifikationen als Vertrauenssignal |
| WEB-P6 | Philosophie | `/philosophie/` | Was Movement für Isabell bedeutet |
| WEB-P7 | Fragen | `/fragen/` | FAQ |
| WEB-P8 | Kontakt | `/kontakt/` | Kontaktkanäle, Orte |
| WEB-P9 | Blog | `/blog/` | Beitragsliste, neueste zuerst |
| WEB-P10 | Blog-Beitrag | `/blog/<beitrag>/` | Beitrag mit Titel, Datum, Tags |
| WEB-P11 | Blog-Tag | `/blog/thema/<tag>/` | Beiträge zu einem Thema |
| WEB-P12 | Impressum | `/impressum/` | Pflichtangaben |
| WEB-P13 | Datenschutz | `/datenschutz/` | Datenschutzerklärung |
| WEB-P14 | Nicht gefunden | `/404` | Hinweis und Weg zurück |

Die konkreten Pfade und Navigationsbeschriftungen sind Inhalt und in
`content/` gepflegt; die obige Tabelle definiert die Seitentypen.

### Hero der Startseite

Status: **Vorschlag** – Entscheidung zwischen zwei Varianten offen
([OQ-18](../open-questions.md#design)). Nach der Entscheidung wird die andere
Variante entfernt.

Design: Claude Design, `ui_kits/website/Hero Varianten.html`, Varianten 2a und
2b (2c wird nicht verfolgt).

| Variante | Design | Aufbau |
|---|---|---|
| Vollflächig | 2a | Vollflächiges Foto im Querformat. Overline, Titel, Akzentlinie, Lead und CTAs stehen hell links unten auf einem dunklen Schutzverlauf, der die Lesbarkeit unabhängig vom Foto sichert. |
| Editorial | 2b | Sandfarbener Hintergrund. Links Overline, Titel, Lead und CTAs; rechts ein Porträt im Hochformat (3:4) und ein überlappendes Detailbild (1:1). Eine Teal-Linie läuft durch die Bildkomposition, unter dem Porträt steht eine Bildunterschrift. |

- Die aktive Variante ist Inhalt der Startseite. Jeder Build zeigt genau eine
  Variante; Besucher können nicht umschalten (WEB-Q4).
- Zum Vergleich sind in der lokalen Entwicklung beide Varianten unter
  `/ds/hero/<variante>/` abrufbar, unabhängig von der Variante im Inhalt.
- Beide Varianten verwenden dieselben Texte der Startseite (Overline, Titel,
  Lead, CTAs). Die Texte im Design sind Platzhalter.
- Auf Mobilgeräten stapeln sich die Elemente: bei „Vollflächig“ Text unten auf
  dem Foto, bei „Editorial“ Text über der Bildkomposition.
- Nicht aus dem Design übernommen:
  - die Terminleiste in 2a (nächster Kurs, freie Plätze, „Termin buchen“) –
    Buchung und freie Plätze sind Nicht-Ziele, der Stundenplan ist
    zurückgestellt;
  - der Preis- und Konto-Hinweis in 2b – Preise sind offen (OQ-4);
  - die über dem Foto liegende, transparente Kopfzeile in 2a – die Kopfzeile
    bleibt auf allen Seiten gleich.

---

## Inhaltstypen

Alle Inhalte liegen in `content/` und werden beim Build gegen ein Schema
validiert. Ungültige Inhalte brechen den Build.

| Typ | Beschreibung | Wesentliche Felder |
|---|---|---|
| Website-Einstellungen | Marke, Kontaktkanäle, Navigation, Social-Links, Indexierung | Markenname, E-Mail, Telefon, WhatsApp (optional), Instagram (optional), Navigation, Footer-Links, `indexing` |
| UI-Texte | Alle wiederkehrenden Oberflächentexte | Button-Labels, Overlines, Leerzustände, Anfrage-Vorlagen |
| Seite | Redaktioneller Text einer Seite | Titel, Beschreibung (SEO), Overline, Lead, Fließtext, Bild, `placeholder`; Startseite zusätzlich Hero-Variante, weitere Hero-Bilder, Bildunterschrift |
| Kurs | Ein Kursformat (siehe [Glossar](../glossary.md)) | Titel, Kurzbeschreibung, Format, Intensität, Dauer, für wen geeignet, Mitbringen, Reihenfolge, Bild, `placeholder` |
| Ort | Unterrichtsort | Name, Adresse, Hinweis |
| Stundenplan-Eintrag | Regelmäßiger wöchentlicher Termin (zurückgestellt, wird gepflegt, aber nicht angezeigt) | Wochentag, Uhrzeit, Dauer, Kurs, Ort, Hinweis |
| Hinweis | Zeitlich begrenzte Information zum Stundenplan (z. B. Pause; zurückgestellt) | Text, von, bis |
| Frage (FAQ) | Frage und Antwort | Frage, Antwort, Reihenfolge |
| Stimme (Testimonial) | Persönliche Stimme einer Teilnehmerin | Zitat, Zuordnung, `consent` |
| Blog-Beitrag | Artikel | Titel, Beschreibung, Veröffentlichungsdatum, Aktualisierungsdatum, Bild, Tags, `draft` |

---

## Regeln

### WEB-R1 – Anfrage statt Buchung

Jeder Buchungs-CTA ist eine **Anfrage über Kontakt-Links**. Angeboten werden
nur die in den Website-Einstellungen konfigurierten Kanäle:

- **E-Mail:** `mailto:` mit vorausgefülltem Betreff und Text aus den UI-Texten.
  Bei kurs- oder terminbezogenen CTAs enthält die Vorlage Kursname und,
  falls vorhanden, Wochentag und Uhrzeit.
- **Telefon:** `tel:`-Link.
- **WhatsApp** (nur wenn konfiguriert): Link auf `wa.me` mit vorausgefülltem Text.

Die Website selbst verarbeitet keine personenbezogenen Daten.

### WEB-R2 – Stimmen nur mit Einwilligung

Eine Stimme wird nur angezeigt, wenn `consent: true` gesetzt ist.

### WEB-R3 – Entwürfe

Blog-Beiträge mit `draft: true` erscheinen nicht im Produktions-Build (weder
Seite noch Liste, RSS oder Sitemap). In der lokalen Entwicklung sind sie
sichtbar.

### WEB-R4 – Platzhalter und Indexierung

- Inhalte, die noch nicht von Isabell bestätigt sind, tragen `placeholder: true`.
  Die Kennzeichnung ist intern und wird auf der Seite nicht angezeigt
  (geändert 2026-09-29, Entscheidung Stephan Grundner; zuvor sichtbare
  Markierung).
- Solange `indexing: false` gilt, liefern alle Seiten `noindex` aus.
- Ein Build mit `indexing: true` **schlägt fehl**, solange Platzhalter-Inhalte
  existieren.

### WEB-R5 – Stundenplan ohne Echtzeitdaten

Status: **Zurückgestellt** (gilt, sobald der Stundenplan reaktiviert wird)

Der Stundenplan zeigt regelmäßige Wochentermine und manuell gepflegte Hinweise
mit explizitem Zeitraum. Freie Plätze, Ausbuchung und Wartelisten werden nicht
angezeigt.

### WEB-R6 – Kurs und Termine

Status: **Zurückgestellt** (gilt, sobald der Stundenplan reaktiviert wird)

Die Kursdetailseite listet alle Stundenplan-Einträge des Kurses. Ein Kurs ohne
Stundenplan-Eintrag bleibt sichtbar; statt Terminen erscheint der Leerzustand
aus den UI-Texten.

---

## Zurückgestellt: Stundenplan

Status: **Zurückgestellt** (2026-09-29, Entscheidung Stephan Grundner)

Der Stundenplan (WEB-P4, WEB-R5, WEB-R6) wird derzeit nicht benötigt und ist
nicht veröffentlicht: keine Seite `/stundenplan/`, kein Navigations-, Footer-
oder Inhaltslink, keine Termine auf der Kursdetailseite. Anfragen beziehen sich
auf den Kurs (WEB-R1).

Das Design gefällt und wird für später bereitgehalten. Gestaltung, Umsetzung,
Inhaltsschema und Inhalte (Stundenplan-Einträge, Hinweise) bleiben erhalten,
damit der Stundenplan ohne Neugestaltung reaktiviert werden kann. Eine
Reaktivierung erfordert eine ausdrückliche Entscheidung; die Beispieltermine
müssen dann von Isabell bestätigt werden.

---

## Qualitätsanforderungen

| ID | Anforderung |
|---|---|
| WEB-Q1 | **Mobile First:** Alle Seiten sind ab 360 px Breite ohne horizontales Scrollen nutzbar; Touch-Ziele mindestens 44 px. |
| WEB-Q2 | **Barrierefreiheit:** Ziel WCAG 2.2 AA; automatisierte Prüfung ohne Verstöße auf allen Kernseiten; sichtbarer Fokus; Bedienbarkeit per Tastatur. |
| WEB-Q3 | **Keine Third-Party-Requests:** Schriften, Icons und Bilder werden von der eigenen Domain ausgeliefert. Keine Cookies. |
| WEB-Q4 | **Kein Client-JavaScript** als Standard; Navigation und FAQ funktionieren ohne JavaScript. |
| WEB-Q5 | **SEO-Grundlagen:** eindeutiger Titel und Beschreibung pro Seite, Canonical-URL, Open-Graph-Angaben, Sitemap, `robots.txt`, RSS-Feed für den Blog. |
| WEB-Q6 | **Design-Treue:** Umsetzung gemäß Claude Design System „Barre & Balance“ (siehe [Designprozess](../ux/design-process.md)) und [Sprache & Ton](../brand/voice-and-tone.md). |
| WEB-Q7 | **Rechtliches:** Impressum und Datenschutzerklärung sind von jeder Seite aus erreichbar. |

---

## Akzeptanzkriterien

Nachweis: `tests/e2e/website.spec.ts`, `tests/unit/lib.test.ts`, `npm run lint:separation`
(siehe [`.claude/project/build-and-test.md`](../../.claude/project/build-and-test.md)).

- [x] Alle Seitentypen WEB-P1 bis WEB-P14 außer dem zurückgestellten WEB-P4 werden gebaut und sind erreichbar.
- [x] Der zurückgestellte Stundenplan ist weder erreichbar noch verlinkt; Kursdetailseiten zeigen keine Termine.
- [x] Ein ungültiger Content-Eintrag (z. B. fehlender Pflichttitel) lässt den Build fehlschlagen. *(manuell geprüft)*
- [x] Anfrage-CTAs erzeugen korrekte `mailto:`-, `tel:`- und (falls konfiguriert) WhatsApp-Links mit Kursbezug (WEB-R1).
- [x] Stimmen ohne `consent: true` erscheinen nicht (WEB-R2).
- [x] Entwürfe erscheinen nicht im Produktions-Build (WEB-R3).
- [x] `indexing: false` erzeugt `noindex`; `indexing: true` mit Platzhaltern bricht den Build; Platzhalter sind auf der Seite nicht markiert (WEB-R4).
- [x] Automatisierte A11y-Prüfung ohne Verstöße auf den Kernseiten (WEB-Q2).
- [x] Keine Requests an fremde Domains (WEB-Q3).
- [x] Nutzersichtbare Texte stammen aus `content/` ([ADR-0003](../adr/0003-content-design-separation.md)).
- [x] Die Website ist unter `https://barre-balance.at` per HTTPS erreichbar; `www` leitet um. *(geprüft 2026-09-12)*
