# Barre & Balance – Website

Quellcode und Inhalte der Website [barre-balance.at](https://barre-balance.at) –
Barre, Pilates und Tanz mit Isabell Grundner in Tirol.

## Überblick

| | |
|---|---|
| Generator | [Astro](https://astro.build), statisch |
| Inhalte | Markdown / YAML in [`content/`](content/) |
| Design | Claude Design System „Barre & Balance“, Tokens in [`src/styles/tokens/`](src/styles/tokens/) |
| Hosting | GitHub Pages, DNS über Cloudflare |
| Dokumentation | [`docs/`](docs/README.md) |

Das Repository folgt einem dokumentationsgetriebenen Vorgehen, siehe
[`CLAUDE.md`](CLAUDE.md).

## Lokal starten

Voraussetzung: Node.js 24 (siehe `.nvmrc`).

```sh
npm install
npm run dev        # Entwicklungsserver, http://localhost:4321
```

Weitere Befehle: [`.claude/project/build-and-test.md`](.claude/project/build-and-test.md).

## Inhalte ändern

Alle Texte, Kurse, Termine und Blog-Beiträge liegen in `content/`. Komponenten
und Layouts enthalten keine Texte. Beim Build werden alle Inhalte gegen ihre
Schemas geprüft ([`src/content.config.ts`](src/content.config.ts)).

| Was | Wo |
|---|---|
| Marke, Kontakt, Navigation, Indexierung | `content/settings/site.yaml` |
| Oberflächentexte | `content/settings/ui.yaml` |
| Seitentexte | `content/pages/*.md` |
| Kurse | `content/courses/*.md` |
| Stundenplan und Hinweise | `content/schedule/` |
| Fragen | `content/faq/*.md` |
| Blog | `content/blog/*.md` |

## Rechte

Alle Rechte vorbehalten. Texte, Bilder, Logo und Design dürfen nicht ohne
Zustimmung verwendet werden.
