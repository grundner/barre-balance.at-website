/** Hero-Varianten der Startseite (docs/features/website.md#hero-der-startseite). */
export const HERO_VARIANTS = ['vollflaechig', 'editorial'] as const;
export type HeroVariant = (typeof HERO_VARIANTS)[number];
