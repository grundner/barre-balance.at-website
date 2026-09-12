/**
 * Prüft die Trennung von Inhalt und Design (ADR-0003):
 *  1. Keine nutzersichtbaren Texte in Komponenten, Layouts und Seiten (.astro).
 *  2. Keine Hex-Farben außerhalb der Design-Tokens.
 *
 * Heuristik: Frontmatter, Kommentare, <style>, <script> und {Ausdrücke} werden entfernt;
 * übrig bleibender Text mit Buchstaben gilt als fest verdrahteter Text. Ebenso literale
 * Werte der Attribute alt, title, aria-label und placeholder.
 * Aufruf: node scripts/check-separation.mjs
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const TEXT_DIRS = ['src/components', 'src/layouts', 'src/pages'];
const COLOR_DIRS = ['src'];
const COLOR_ALLOWED = ['src/styles/tokens/', 'src/dev/'];
const TEXT_ATTRIBUTES = ['alt', 'title', 'aria-label', 'placeholder'];

function files(dir, extensions) {
  return readdirSync(join(root, dir), { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext)))
    .map((entry) => relative(root, join(entry.parentPath, entry.name)));
}

/** Entfernt verschachtelte {…}-Ausdrücke. */
function stripExpressions(source) {
  let result = '';
  let depth = 0;
  for (const char of source) {
    if (char === '{') depth++;
    if (depth === 0) result += char;
    if (char === '}' && depth > 0) depth--;
  }
  return result;
}

const problems = [];

for (const file of TEXT_DIRS.flatMap((dir) => files(dir, ['.astro']))) {
  const source = readFileSync(join(root, file), 'utf8');
  const template = source
    .replace(/^---[\s\S]*?\n---/, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<script[\s\S]*?<\/script>/g, '');
  const withoutExpressions = stripExpressions(template);

  for (const attribute of TEXT_ATTRIBUTES) {
    for (const match of withoutExpressions.matchAll(new RegExp(`\\s${attribute}="([^"]*)"`, 'g'))) {
      if (/\p{L}{2,}/u.test(match[1])) problems.push(`${file}: ${attribute}="${match[1]}"`);
    }
  }

  const text = withoutExpressions.replace(/<[^>]*>/g, ' ');
  for (const line of text.split('\n')) {
    if (/\p{L}{2,}/u.test(line)) problems.push(`${file}: Text „${line.trim()}“`);
  }
}

for (const file of COLOR_DIRS.flatMap((dir) => files(dir, ['.astro', '.css', '.ts']))) {
  if (COLOR_ALLOWED.some((allowed) => file.startsWith(allowed))) continue;
  const source = readFileSync(join(root, file), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<meta name="theme-color"[^>]*>/g, '');
  for (const match of source.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) {
    problems.push(`${file}: Hex-Farbe ${match[0]} – Design-Token verwenden`);
  }
}

if (problems.length > 0) {
  console.error(
    `Trennung Inhalt/Design verletzt (ADR-0003):\n${problems.map((p) => `  - ${p}`).join('\n')}`,
  );
  process.exit(1);
}
console.log('Trennung Inhalt/Design: keine Verstöße.');
