/**
 * Platzhalter und Indexierung (docs/features/website.md, WEB-R4).
 * Reine Funktionen ohne Astro-Abhängigkeit.
 */

export interface EntryLike {
  id: string;
  data: { placeholder?: boolean };
}

/** Liefert `collection/id` aller Einträge, die als Platzhalter markiert sind. */
export function findPlaceholders(collections: Record<string, readonly EntryLike[]>): string[] {
  return Object.entries(collections).flatMap(([name, entries]) =>
    entries.filter((entry) => entry.data.placeholder).map((entry) => `${name}/${entry.id}`),
  );
}

/** Bricht den Build ab, wenn indexiert werden soll, aber noch Platzhalter existieren. */
export function assertLaunchReady(indexing: boolean, placeholders: readonly string[]): void {
  if (indexing && placeholders.length > 0) {
    throw new Error(
      `indexing: true ist gesetzt, aber es gibt noch ${placeholders.length} Platzhalter-Inhalte:\n` +
        placeholders.map((p) => `  - ${p}`).join('\n'),
    );
  }
}
