import { defineConfig, devices } from '@playwright/test';

const port = 4322;

/** E2E-Tests gegen den Produktions-Build (dist/). Vorher `npm run build` ausführen. */
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'mobile',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
      },
    },
  ],
  webServer: {
    command: `node scripts/serve-dist.mjs ${port}`,
    url: `http://localhost:${port}/`,
    reuseExistingServer: !process.env.CI,
  },
});
