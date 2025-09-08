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
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["x-dev"]
    }
  },

  integrations: [react()]
});