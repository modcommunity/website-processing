// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite'

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

//import node from "@astrojs/node";

// The nine locales, in one place in this file. `src/i18n/config.ts` holds the
// same list for the app code; this config is plain `.mjs` and cannot import a
// `.ts` module, so the list is written twice on purpose. Keep them in step --
// `LOCALES` there is the one the components read.
const LOCALES = ['en', 'es', 'fr', 'de', 'ru', 'nl', 'ja', 'zh', 'pt']
const DEFAULT_LOCALE = 'en'

// The site's own public origin. Mirrors `SITE_URL` in `src/lib/site.ts`, which
// reads the same variable for canonical/hreflang/Open Graph. Astro needs it at
// the config level too: without `site` it refuses to emit a sitemap at all.
const SITE = (process.env.PUBLIC_URL ?? 'https://moddingcommunity.com').replace(/\/+$/, '')

// https://astro.build/config
export default defineConfig({
  site: SITE,

  // `/tmc-cli` was `/api-tool` until the English page was renamed. The eight
  // localized copies were not renamed with it, which left the two halves of one
  // page under different names -- so the home page's Developer API button
  // (`localizePath("/tmc-cli", ...)`) and the language picker both pointed at
  // `/es/tmc-cli`, which did not exist, and every hreflang on either side named
  // a URL that 404s. Renaming the localized route fixes that; these redirects
  // keep the old name working for anything already linking it. Astro emits a
  // meta-refresh page with a canonical link to the target for each.
  redirects: Object.fromEntries(
    LOCALES.map((l) => (l === DEFAULT_LOCALE
      ? ['/api-tool', '/tmc-cli']
      : [`/${l}/api-tool`, `/${l}/tmc-cli`]))
  ),

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
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
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

  integrations: [
    react(),

    // A sitemap, and the hreflang cluster inside it. The `i18n` option is what
    // makes each entry carry an `xhtml:link` alternate for all nine locales,
    // matching the <link rel="alternate"> tags Layout.astro already emits -- a
    // sitemap that listed the 54 pages as 54 unrelated URLs would contradict
    // them. `public/robots.txt` points crawlers at the result.
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: Object.fromEntries(LOCALES.map((l) => [l, l])),
      },
      // The redirect stubs above are built as HTML pages, so they land in the
      // sitemap unless they are filtered out. A redirect is not a destination.
      filter: (page) => !/\/api-tool\/?$/.test(new URL(page).pathname),
    }),
  ]
});