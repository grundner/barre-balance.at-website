import type { APIContext } from 'astro';
import { getPlaceholders, getSite } from '../lib/content.ts';
import { assertLaunchReady } from '../lib/launch.ts';

/**
 * robots.txt und Launch-Prüfung (WEB-R4): Mit `indexing: true` bricht der Build ab,
 * solange Platzhalter-Inhalte existieren.
 */
export async function GET(context: APIContext) {
  const [site, placeholders] = await Promise.all([getSite(), getPlaceholders()]);
  assertLaunchReady(site.indexing, placeholders);

  const sitemap = new URL('/sitemap-index.xml', context.site).href;
  const body = site.indexing
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
