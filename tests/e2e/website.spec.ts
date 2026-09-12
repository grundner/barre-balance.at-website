/**
 * Akzeptanzkriterien der Website (docs/features/website.md) gegen den Produktions-Build.
 */
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/** Kernseiten WEB-P1 bis WEB-P13 (P14 = 404 separat). */
const PAGES = [
  '/',
  '/kurse/',
  '/kurse/barre/',
  '/stundenplan/',
  '/ueber-isabell/',
  '/philosophie/',
  '/fragen/',
  '/kontakt/',
  '/blog/',
  '/blog/willkommen/',
  '/blog/thema/neuigkeiten/',
  '/impressum/',
  '/datenschutz/',
];

for (const path of PAGES) {
  test.describe(`Seite ${path}`, () => {
    test('lädt ohne Fehler, hat genau eine H1 und nur eigene Requests (WEB-Q3)', async ({
      page,
      baseURL,
    }) => {
      const errors: string[] = [];
      const foreignRequests: string[] = [];
      page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('request', (request) => {
        const url = new URL(request.url());
        if (!['data:', 'mailto:'].includes(url.protocol) && url.origin !== baseURL) {
          foreignRequests.push(request.url());
        }
      });

      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await page.waitForLoadState('networkidle');

      expect(errors).toEqual([]);
      expect(foreignRequests).toEqual([]);
    });

    test('hat keine automatisch erkennbaren A11y-Verstöße (WEB-Q2)', async ({ page }) => {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.length}× ${v.help}`)).toEqual([]);
    });

    test('scrollt nicht horizontal (WEB-Q1)', async ({ page }) => {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test('hat Titel, Beschreibung und Canonical (WEB-Q5)', async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/Barre & Balance/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://barre-balance.at${path}`,
      );
    });
  });
}

test('unbekannte Pfade liefern die 404-Seite (WEB-P14)', async ({ page }) => {
  const response = await page.goto('/gibt-es-nicht/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveCount(1);
});

test('alle internen Links führen zu existierenden Seiten', async ({ page, request }) => {
  const targets = new Set<string>();
  for (const path of PAGES) {
    await page.goto(path);
    const hrefs = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));
    hrefs.forEach((href) => targets.add(href.split('#')[0]));
  }
  for (const target of targets) {
    const response = await request.get(target);
    expect(response.status(), target).toBe(200);
  }
});

test.describe('Regeln', () => {
  test('WEB-R1: Anfrage-Links enthalten Kurs, Wochentag und Uhrzeit', async ({ page }) => {
    await page.goto('/stundenplan/');
    const href = await page.locator('a[data-inquiry="email"]').first().getAttribute('href');
    expect(href).toMatch(/^mailto:[^?]+@barre-balance\.at\?/);
    const params = new URLSearchParams(href!.split('?')[1]);
    expect(params.get('subject')).toBe('Anfrage: Barre');
    expect(params.get('body')).toContain('ich interessiere mich für Barre am Mittwoch um 18:30.');

    await page.goto('/kurse/barre/');
    const courseHref = await page
      .locator('.course__inquiry a[data-inquiry="email"]')
      .getAttribute('href');
    expect(new URLSearchParams(courseHref!.split('?')[1]).get('body')).toContain(
      'ich interessiere mich für Barre.',
    );
  });

  test('WEB-R2: Stimmen ohne Einwilligung erscheinen nicht', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Beispielstimme ohne Einwilligung')).toHaveCount(0);
  });

  test('WEB-R3: Entwürfe sind nicht veröffentlicht', async ({ page, request }) => {
    expect((await request.get('/blog/entwurf-beispiel/')).status()).toBe(404);
    await page.goto('/blog/');
    await expect(page.getByText('Beispiel für einen Entwurf')).toHaveCount(0);
    const rss = await (await request.get('/rss.xml')).text();
    expect(rss).not.toContain('entwurf-beispiel');
    const sitemap = await (await request.get('/sitemap-0.xml')).text();
    expect(sitemap).not.toContain('entwurf-beispiel');
  });

  test('WEB-R4: ohne Freigabe zur Indexierung gilt noindex', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
  });

  test('WEB-R4: Platzhalter sind sichtbar markiert', async ({ page }) => {
    await page.goto('/kurse/');
    await expect(page.locator('.placeholder-banner')).toBeVisible();
  });
});

test('mobile Navigation funktioniert ohne JavaScript (WEB-Q4)', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('http://localhost:4322/');
  const menu = page.locator('details.menu');
  await menu.locator('summary').click();
  await expect(menu.locator('a[href="/kurse/"]')).toBeVisible();
  await menu.locator('a[href="/kurse/"]').click();
  await expect(page).toHaveURL(/\/kurse\/$/);
  await context.close();
});
