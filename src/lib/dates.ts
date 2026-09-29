const dateFormat = new Intl.DateTimeFormat('de-AT', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Vienna',
});

/** Datum in österreichischer Schreibweise, z. B. „12. September 2026“. */
export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

/** Datum als ISO-Tag für `<time datetime>`. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const sessionDateFormat = new Intl.DateTimeFormat('de-AT', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'Europe/Vienna',
});

/** Termin-Datum mit Wochentag, z. B. „Mittwoch, 7. Oktober“. */
export function formatSessionDate(date: Date): string {
  return sessionDateFormat.format(date);
}
