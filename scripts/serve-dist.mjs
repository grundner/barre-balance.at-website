/**
 * Minimaler statischer Server für dist/ – verhält sich wie GitHub Pages
 * (index.html je Verzeichnis, 404.html bei unbekannten Pfaden). Für E2E-Tests.
 * Aufruf: node scripts/serve-dist.mjs [port]
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.argv[2] ?? 4322);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function resolve(pathname) {
  const path = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '');
  const file = join(root, path);
  if (existsSync(file) && statSync(file).isFile()) return file;
  const index = join(file, 'index.html');
  if (existsSync(index)) return index;
  return undefined;
}

createServer((req, res) => {
  const { pathname } = new URL(req.url ?? '/', 'http://localhost');
  const file = resolve(pathname);
  if (!file) {
    res.writeHead(404, { 'Content-Type': types['.html'] });
    createReadStream(join(root, '404.html')).pipe(res);
    return;
  }
  res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
}).listen(port, () => console.log(`dist/ unter http://localhost:${port}/`));
