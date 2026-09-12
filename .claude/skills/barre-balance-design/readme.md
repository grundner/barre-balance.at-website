<!--
Kopie von readme.md aus dem Claude Design System "Barre & Balance"
(76a62150-7990-4b2c-8b92-7961647458ce), synchronisiert 2026-09-12. Nicht hier bearbeiten.
Abweichungen der Umsetzung: .claude/project/design-system.md
-->

# Barre & Balance — Design System

Design System für das Movement-Business von **Isabell Grundner** (Barre, Pilates, Modern Jazz; Kitzbühel, St. Johann in Tirol, Fieberbrunn). Es deckt drei Oberflächen ab: die öffentliche Website, den Mitgliederbereich als mobile-first Web-App und das Studio-Backend.

Der Markenname **Barre & Balance** und das Signet stammen aus dem Vorentwurf und sind noch nicht final — siehe *Offene Punkte*.

## Quellen

| Quelle | Inhalt |
| --- | --- |
| Claude-Design-Projekt `fa225460-81c4-4e52-a610-444c372a0562` — https://claude.ai/design/p/fa225460-81c4-4e52-a610-444c372a0562 | `Barre & Balance Design System.dc.html` (Tokens, MUI-Theme, Komponentenzustände), `Barre & Balance Logo.dc.html` (Signet, Konstruktion, Varianten), `Isabell Website & Buchung.dc.html` (Website- und App-Screens, 390 px) |
| `uploads/claude-design-isabell-movement-platform.md` im selben Projekt | Briefing: Positionierung, Zielgruppe, Phasen 1–4, User Journeys, technische Leitplanken |

Technische Leitplanke aus dem Briefing: Next.js / React / TypeScript mit **MUI und MUI X**. Die Tokens hier sind deshalb 1:1 auf ein `createTheme`-Objekt abbildbar; die Komponenten sind kosmetische Nachbauten der MUI-Familien im Markenzustand, keine Ersatzimplementierungen.

## Content Fundamentals

**Sprache:** Deutsch, Du-Form, Österreich-nah, aber ohne Dialekt. Isabell spricht in der Ich-Form („Ich arbeite mit kleinen Bewegungen, weil sie ehrlich sind"), die Nutzerin wird geduzt („Dein nächstes Training", „Du gehst müde, aber aufgerichtet nach Hause").

**Ton:** ruhig und konkret. Jeder Systemtext sagt, was als Nächstes passiert: *„Buchung bestätigt — Mittwoch, 3. September, 18:30. Die Bestätigung ist unterwegs."* Keine Ausrufezeichen, keine Emoji, keine Motivationssprache, keine Transformations- oder Abnehmversprechen.

**Casing:** Sätze in normaler Schreibweise. Versalien nur an drei Stellen — Buttons (`KURS BUCHEN`), Overlines (`MITTWOCH · 18:30`) und die Wortmarke. Overlines und Datenangaben stehen in JetBrains Mono mit weiter Laufweite.

**Trenner:** der Mittelpunkt statt Komma oder Pipe: `45 min · Level 2 · St. Johann`.

**Wortwahl:** AI wird nie als solche verkauft. Statt „AI Recommendation Engine" heißt es **„Für dich empfohlen"**, statt „AI Workout Generator" **„Dein Training für heute"**. Statt Gym-Vokabular (Workout, Shredding, Transformation) die eigenen Begriffe: Einheit, Kurs, Termin, Ausgleich, Haltung, Bewegung.

**Leerzustände** sind Sätze, keine Sprüche: *„An diesem Tag findet kein Kurs statt."*

## Visual Foundations

**Grundidee.** Alles leitet sich aus dem Signet ab: eine Senkrechte, ein Kreis, eine waagerechte Barre. Runde Formen nur dort, wo etwas wirklich rund ist; aufrechte, leichte Typografie; genau eine farbige Linie, die Halt gibt.

**Farbe.** Teal `#1B9AAA` ist Akzent, nie Fläche — es markiert Aktion, Auswahl, aktiven Zustand. Flächen sind warmes Off-White `#FAFAF8`, Weiß und Sand `#EFEAE2`. Schwarz ist immer Ink `#14161A`. Faustregel 70 / 25 / 5. Teal-dark `#14707C` ist die Textfarbe für Links (4,9:1); Weiß auf Teal erst ab 18 px oder Medium.

**Typografie.** Jost (geometrische Grotesk, gleiche DNA wie das Signet) für alles, JetBrains Mono für Zeiten, Zahlen, Kürzel und Overlines. Überschriften laufen leicht (200–300), Fließtext 300, Interaktion 500 mit 0,12 em Versalien.

**Raster.** 8-px-Basis, 12 Spalten, Gutter 24 px (16 px in Kurslisten), Container-Padding 16 / 32 / 72 px. Maximale Inhaltsbreite 1200 px, Textseiten 900 px, Formulare 600 px.

**Ecken.** 0 für Flächen und Bilder, 2 px als Default für Karten, Buttons, Eingaben und Dialoge, 4 px für Menüs und Popover, Pille nur für Chip, Avatar, Fab und Switch. Bilder sind nie gerundet.

**Karten** sind outlined: 1 px `#E4E2DC`, 2 px Radius, weiße Fläche, **kein** Schatten im Ruhezustand. Unter dem Text steht häufig der Barre-Akzent: 48 × 2 px Teal.

**Schatten.** Weich und kühlgrau, nie schwarz. 0 outlined · 1 Card-Hover · 3 Menü und Popover · 8 Drawer und Dialog · 16 Modal.

**Hintergründe.** Flächig, nie mit Verlauf. Wechsel zwischen Off-White, Weiß und Sand rhythmisiert die Seite; dunkle Flächen sind Ink (App-Bar der App, Snackbar, Tooltip) oder Deep `#2E4A4F` (Footer). Keine Muster, keine Texturen, keine Farbverläufe.

**Bildsprache.** Tageslicht, warme neutrale Töne, Haltung und Bewegungsdetails statt Posen oder Grimassen; 3:2 oder 1:1, ohne Radius, ohne Filter. Bis echte Fotos vorliegen zeigen alle Kits diagonal schraffierte Platzhalter mit Dateinamen.

**Transparenz und Blur** genau einmal: die Website-AppBar liegt auf `rgba(250,250,248,0.9)` mit 8 px Blur. Sonst deckende Flächen. Scrim für Modals: `rgba(20,22,26,0.45)`.

**Motion.** `cubic-bezier(0.2, 0, 0, 1)`. 150 ms Hover und Fokus, 195 ms Leaving, 225 ms Menü / Tooltip / Snackbar, 320 ms Drawer, Dialog, Seitenwechsel. Bewegung immer entlang einer Achse — wie an der Stange. Kein Bounce, kein Scale-Pop, kein Zoom, kein Shimmer im Skeleton.

**Hover** ist eine Farbänderung, kein Schatten und keine Skalierung: gefüllte Buttons gehen auf Teal-dark, ruhige Flächen auf 6 % Teal, Listenzeilen auf 6 % Teal. **Press** dunkelt weiter ab; nichts schrumpft. **Fokus** ist ein 2 px Teal-Ring mit 2 px Offset, bei Eingabefeldern der 2 px Rahmen selbst.

**Aktiver Zustand** ist überall dieselbe Geste: eine 2 px Teal-Linie. Unter dem Tab, unter dem Navigationslink, links an der Drawer-Zeile. Nie eine gefüllte Pille, nie ein Rahmen.

**Layout-Regeln.** Website-AppBar sticky; die mobile Buchungsleiste bleibt am unteren Rand stehen; genau ein Fab pro Screen, unten rechts mit 24 px Abstand; Snackbar unten links (Desktop) bzw. unten mittig (Handy); Touch-Ziele mindestens 44 px, mobile Primäraktionen 52 px.

## Iconography

**Material Symbols Outlined**, Weight 300, optische Größe 24 — als Webfont von Google Fonts geladen (`tokens/fonts.css`), Nutzung über die Klasse `.bb-icon` oder die `Icon`-Komponente. Die gefüllte Variante (`FILL 1`) markiert ausschließlich aktive Zustände, etwa das aktuelle Element der BottomNav.

Es gibt kein eigenes Icon-Set und keine Icon-SVGs im Vorentwurf; Material Symbols ist die bewusste Wahl der MUI-Basis, keine Ersatzlösung. Emoji werden nicht verwendet. Unicode-Zeichen dienen nur als Trenner (`·`) und im Ampersand der Wortmarke.

Häufig verwendet: `event`, `calendar_month`, `schedule`, `place`, `person`, `group`, `self_improvement`, `accessibility_new`, `favorite`, `credit_card`, `confirmation_number`, `insights`, `notifications`, `settings`, `check_circle`, `event_busy`.

## Logo

Das Signet ist ein kleines „b" aus Senkrechte und Kreis, geschnitten von der Barre. Alles leitet sich aus dem Kreisradius *r* ab: Stammhöhe 2r, Barre 4r, Strichstärken 0,11 r (Signet) und 0,18 r (Barre), Enden stumpf.

- `assets/logo.svg` — vertikales Lockup (Beschilderung, Titelseiten, Social-Profile)
- `assets/logo-horizontal.svg` — horizontales Lockup (Website-Header, Briefkopf)
- `assets/logo-mark.svg`, `assets/logo-mark-on-dark.svg`, `assets/logo-mark-mono.svg` — Signet allein
- Komponente `Logo` für alle Varianten im UI

Wortmarke: Jost Light, Versalien, Laufweite 0,44 em (vertikal) bzw. 0,3 em (horizontal), Ampersand in Teal. Abstand Signet zu Wortmarke = ein Kreisradius.

## Index

| Pfad | Inhalt |
| --- | --- |
| `styles.css` | Einstiegspunkt, nur `@import`-Zeilen |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `shape.css`, `motion.css`, `semantic.css` |
| `assets/` | Logo-Lockups und Signet-Varianten |
| `guidelines/` | Specimen-Cards für Farbe, Typografie, Raster, Form, Motion, Marke, Icons |
| `components/` | Reusable Primitives (siehe unten) |
| `ui_kits/website/` | Öffentliche Website |
| `ui_kits/app/` | Mitglieder-App, mobile first |
| `ui_kits/studio/` | Studio-Backend |
| `templates/website-seite/` | Template: öffentliche Seite (AppBar, Hero, Kurskarten, Footer) |
| `templates/app-screen/` | Template: mobiler App-Screen, 390 px |
| `SKILL.md` | Agent-Skill-Einstieg |

### Components

**core** — `Button`, `IconButton`, `Fab`, `ButtonGroup`, `ToggleButtonGroup`, `Chip`, `Badge`, `Avatar`, `AvatarGroup`, `Divider`, `Icon`, `Logo`

**forms** — `TextField`, `Select`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Slider`, `Rating`

**surfaces** — `Card`, `Paper`, `Accordion`, `AppBar`, `AppBarLink`, `Dialog`

**navigation** — `Tabs`, `Breadcrumbs`, `Pagination`, `SideNav`, `BottomNav`, `Stepper`, `Menu`

**feedback** — `Alert`, `Snackbar`, `LinearProgress`, `CircularProgress`, `Skeleton`, `Tooltip`

**data** — `DataList`, `DataTable`, `Timeline`

Jede Komponente liegt als `<Name>.jsx` mit `<Name>.d.ts` und `<Name>.prompt.md` daneben; pro Verzeichnis zeigt eine `*.card.html` alle Zustände.

### Intentional additions

Der Vorentwurf zeigt MUI-Komponenten in Markenzuständen, keine benannte eigene Bibliothek. Folgende Namen sind deshalb neu gesetzt, bilden aber jeweils eine im Vorentwurf gezeigte Familie ab:

- `Icon` — Wrapper um Material Symbols, damit Glyphe, Gewicht und FILL-Achse nicht in jeder Datei wiederholt werden
- `Logo` — das Signet-Lockup als Komponente (im Vorentwurf inline-SVG)
- `SideNav` (MUI `Drawer`, permanent), `BottomNav` (MUI `BottomNavigation`), `DataList` (MUI `List`), `DataTable` (MUI `Table`) — umbenannt, weil die Nachbauten bewusst nur kosmetisch sind
- `AppBarLink` — der aktive Navigationslink mit Teal-Unterstrich

Nicht gebaut, weil im Vorentwurf zwar erwähnt, aber nur als MUI-Standard gezeigt: `Autocomplete`, `Transfer List`, `SpeedDial`, `ImageList`, `Masonry`, `Grid`/`Stack`/`Container` (Layout-Utilities).

## Offene Punkte

- **Fonts:** Jost und JetBrains Mono kommen von Google Fonts, nicht als lokale Dateien. Wenn lizenzierte Schnitte selbst gehostet werden sollen, bitte die Dateien liefern — `tokens/fonts.css` wird dann auf `@font-face` umgestellt.
- **Fotografie:** es existiert kein einziges echtes Bild. Alle Kits zeigen Platzhalter mit Dateinamen.
- **Markenname und Claim** sind laut Briefing noch offen. „Barre & Balance" ist der Arbeitsstand aus dem Vorentwurf; das Signet funktioniert nur mit dem Anfangsbuchstaben „b".
- **Zahlungen und Einstellungen** im Studio-Backend sind noch nicht gestaltet und bleiben leer.
