/**
 * Erzeugt public/og-default.png (1200 × 630) aus dem Signet.
 * Nur bei Änderungen am Signet erneut ausführen: node scripts/generate-og-image.mjs
 * Farben entsprechen den Tokens --bb-grey-50, --bb-ink und --bb-teal.
 */
import sharp from 'sharp';

const size = 300;
const x = (1200 - size) / 2;
const y = (630 - size) / 2;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FAFAF8"/>
  <g transform="translate(${x} ${y}) scale(${size / 240})" fill="none">
    <line x1="75" y1="25" x2="75" y2="185" stroke="#14161A" stroke-width="5"/>
    <circle cx="120" cy="140" r="45" stroke="#14161A" stroke-width="5"/>
    <line x1="30" y1="140" x2="210" y2="140" stroke="#1B9AAA" stroke-width="8"/>
  </g>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(new URL('../public/og-default.png', import.meta.url).pathname);
console.log('public/og-default.png erzeugt');
