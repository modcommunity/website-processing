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

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["x-tmc-dev01"]
    }
  },

  integrations: [react()]
});