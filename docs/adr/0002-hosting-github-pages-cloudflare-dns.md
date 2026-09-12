# ADR-0002: Hosting auf GitHub Pages, DNS über Cloudflare

- Status: Accepted
- Datum: 2026-09-12
- Betrifft: [Architekturüberblick](../architecture/overview.md), Repository `grundner/barre-balance.at-website`

## Kontext

- Die Domain `barre-balance.at` ist registriert und wird über Cloudflare DNS verwaltet.
- Die Website ist statisch ([ADR-0001](0001-static-website-astro.md)).
- Das Repository liegt in der GitHub-Organisation `grundner` (Free-Plan).
  GitHub Pages steht im Free-Plan nur für öffentliche Repositories zur Verfügung.

## Entscheidung

- Die Website wird über **GitHub Pages** ausgeliefert.
- Das Repository wird dafür **öffentlich** geschaltet.
- Build und Deploy laufen über **GitHub Actions** (Pages-Quelle „GitHub Actions“).
- Custom Domain `barre-balance.at` (Apex) über `public/CNAME`; `www.barre-balance.at` leitet auf die Apex-Domain um.
- DNS bleibt bei **Cloudflare**; die Einträge für GitHub Pages werden zunächst als „DNS only“ (nicht proxied) gesetzt, damit GitHub das TLS-Zertifikat ausstellen kann.
- Die Domain wird in der Organisation `grundner` für GitHub Pages verifiziert.

## Alternativen

| Alternative | Warum nicht gewählt |
|---|---|
| Privates Repo + Cloudflare Hosting | Vom Auftraggeber zugunsten GitHub Pages verworfen |
| Privates Repo + GitHub Team-Plan | Laufende Kosten ohne Nutzen für den aktuellen Scope |

## Konsequenzen

- Positiv: Kostenlos, Deploy direkt aus dem Repository, keine eigene Infrastruktur.
- **Negativ: Das gesamte Repository ist öffentlich**, inklusive `docs/`
  (Geschäftsstrategie, offene Fragen, Profilangaben). Vor dem Umschalten ist ein
  Datenschutz-Review der Dokumentation erforderlich. Vertrauliche Informationen
  dürfen danach nicht mehr ins Repository.
- Negativ: Keine serverseitige Logik; Formulare, Buchung o. Ä. benötigen später externe Dienste oder eine andere Plattform.
- Folgearbeit: Bestehende DNS-Einträge (insbesondere MX für E-Mail) vor Änderungen prüfen.
