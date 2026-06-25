import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://daniel-tavares.vercel.app',
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});
