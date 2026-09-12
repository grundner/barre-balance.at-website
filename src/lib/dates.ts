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
