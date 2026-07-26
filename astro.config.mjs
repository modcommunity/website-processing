// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react';

//import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  // For testing locally since npm run preview (astro preview) doesn't work.
  /*
  output: "server",
  adapter: node({
    mode: "standalone", // or "middleware"
  }),
  */
  // Astro's HTML compressor collapses a newline between text and an inline
  // element ("... and\n<span class="special">insights</span>") into nothing
  // rather than a single space, so wrapped markup renders words jammed
  // together. Gzip makes the size difference negligible.
  compressHTML: false,

  // Mirrors website-city's next-intl setup: same 9 locales, English default, and
  // "as-needed" prefixing (English on the bare domain, others under /es, /fr, …).
  i18n: {
    locales: ['en', 'es', 'fr', 'de', 'ru', 'nl', 'ja', 'zh', 'pt'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
    server: {
      // Accept the proxied Host header from nginx (dev is reached via tmcdev.net).
      allowedHosts: ["x-tmc-dev01", "tmcdev.net"]
    },
    optimizeDeps: {
      // In local mode @modcommunity/shared is a symlink into ../tmc-global.
      // Pre-bundling it caches a copy, so `npm run shared:build` looked like it
      // did nothing — and clearing that cache under a running dev server left it
      // serving "504 (Outdated Optimize Dep)" for every client module, which
      // silently killed hydration (no typing animation) and webfonts (system
      // font fallback). Excluding it makes Vite serve the linked source
      // directly: rebuilds show up on reload, with no cache to flush.
      exclude: ["@modcommunity/shared"]
    }
  },

  integrations: [react()]
});