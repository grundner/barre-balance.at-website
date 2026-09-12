// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Registers the design-system overview page (/ds/) in development only.
 * It is never part of the production build.
 * @returns {import('astro').AstroIntegration}
 */
function devDesignSystemPage() {
  return {
    name: 'dev-design-system-page',
    hooks: {
      'astro:config:setup': ({ command, injectRoute }) => {
        if (command === 'dev') {
          injectRoute({ pattern: '/ds', entrypoint: './src/dev/DesignSystem.astro' });
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://barre-balance.at',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.endsWith('/404/') }),
    devDesignSystemPage(),
  ],
});
