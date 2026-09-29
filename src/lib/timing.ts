/**
 * Zeitabhängige Inhalte (docs/features/website.md, WEB-R7; ADR-0004).
 * Gemeinsame, reine Funktionen für alle Bereiche mit Datum und Uhrzeit: Umrechnung aus
 * Tiroler Ortszeit und Auswertung gegen einen übergebenen Zeitpunkt (in der Regel den Build).
 */

/** Zeitzone aller Datums- und Zeitangaben im Inhalt. */
export const TIME_ZONE = 'Europe/Vienna';

/** Zeitpunkt des Builds; einmal pro Build-Prozess festgelegt. */
export const BUILD_TIME = new Date();

const zoneFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

/** Abstand der Zeitzone zu UTC in Millisekunden zum gegebenen Zeitpunkt. */
function zoneOffset(instant: Date): number {
  const parts = Object.fromEntries(
    zoneFormat.formatToParts(instant).map((part) => [part.type, part.value]),
  );
  const asUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  return asUtc - Math.floor(instant.getTime() / 1000) * 1000;
}

/** Zeitpunkt aus Datum („2026-10-07“) und Uhrzeit („18:30“) in Tiroler Ortszeit. */
export function zonedDateTime(date: string, time: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const wallClock = Date.UTC(year, month - 1, day, hour, minute);
  // Zweimal korrigieren, damit auch Tage mit Zeitumstellung stimmen.
  const first = wallClock - zoneOffset(new Date(wallClock));
  return new Date(wallClock - zoneOffset(new Date(first)));
}

/** Vergangen, sobald der Beginn vor dem Vergleichszeitpunkt liegt. */
export function isPast(start: Date, now: Date): boolean {
  return start.getTime() < now.getTime();
}

/** Nur kommende Einträge, aufsteigend nach Beginn sortiert. */
export function upcoming<T>(items: readonly T[], start: (item: T) => Date, now: Date): T[] {
  return items
    .filter((item) => !isPast(start(item), now))
    .sort((a, b) => start(a).getTime() - start(b).getTime());
}
