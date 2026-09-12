/** Wochentage in Anzeigereihenfolge (Schlüssel der Stundenplan-Einträge in content/). */
export const WEEKDAYS = ['mo', 'di', 'mi', 'do', 'fr', 'sa', 'so'] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export interface SlotLike {
  day: Weekday;
  time: string;
}

/** Sortiert Termine nach Wochentag und Uhrzeit. */
export function sortSlots<T extends SlotLike>(slots: readonly T[]): T[] {
  return [...slots].sort(
    (a, b) => WEEKDAYS.indexOf(a.day) - WEEKDAYS.indexOf(b.day) || a.time.localeCompare(b.time),
  );
}

/** Gruppiert Termine nach Wochentag; nur Tage mit Terminen, in Wochenreihenfolge. */
export function groupByWeekday<T extends SlotLike>(
  slots: readonly T[],
): { day: Weekday; slots: T[] }[] {
  const sorted = sortSlots(slots);
  return WEEKDAYS.map((day) => ({ day, slots: sorted.filter((slot) => slot.day === day) })).filter(
    (group) => group.slots.length > 0,
  );
}
