import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// ELG Website — Phase 1 build config.
// Static output for Vercel. i18n routing (en default, th reserved)
// is enabled from day one so Thai content can land in Phase 2
// without restructuring routes.
export default defineConfig({
  output: 'static',
  site: 'https://www.embeddedlinuxgroup.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'th'],
  },
  integrations: [
    react({
      include: ['**/react/*'],
    }),
    tailwind(),
  ],
});
