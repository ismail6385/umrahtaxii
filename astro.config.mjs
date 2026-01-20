// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import preact from '@astrojs/preact';

import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';

import { storyblok } from '@storyblok/astro';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://umrahtaxi.site',
  output: 'hybrid',
  trailingSlash: 'never',
  integrations: [preact(), sentry(), spotlightjs(), storyblok({
    accessToken: process.env.STORYBLOK_TOKEN || '',
    components: {
      // page: "src/storyblok/Page.astro",
    },
    apiOptions: {
      region: "eu", // default
    }
  }), sitemap()],

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()]
  }
});