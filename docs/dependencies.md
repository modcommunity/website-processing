# Dependencies

Stack: `astro` 7, `@astrojs/react`, Tailwind v4 via `@tailwindcss/vite`, `react-icons`, `react-multi-carousel`, `three`. No HeroUI, no Mantine.

## `@modcommunity/shared`: two sources

The shared library has two sources: the published package on GitHub Packages (the committed default, what CI gets from `npm ci`; `.npmrc` maps the `@modcommunity` scope to `https://npm.pkg.github.com`, the auth token goes in your `~/.npmrc`) and the local checkout at `../tmc-global/shared` (what you develop against). Either way it lands at `node_modules/@modcommunity/shared` (a symlink in local mode), so no source, import or CSS path changes between modes.

| command | effect |
| --- | --- |
| `npm run shared:local` | link the on-disk `../tmc-global/shared` |
| `npm run shared:registry` | install the published version instead |
| `npm run shared:status` | print which one is currently installed |
| `npm run shared:build` / `shared:watch` | rebuild the shared library's `dist` (once / on save) |
| `npm run shared:flush` | delete `node_modules/.vite` (only with dev stopped) |

Both switches use `npm install … --no-save`, so `package.json` and the lockfile are untouched and switching never shows in `git status`. The traps:

- **A plain `npm install` / `npm ci` restores the lockfile's registry version.** Re-run `npm run shared:local` after any install, or you silently build against the published package again.
- **A shared change is not live here until it is published.** In registry mode, editing `../tmc-global/shared` does nothing; `shared:status` says `registry -> <version>` while your source says otherwise. Either `shared:local` (dev) or publish a new version and bump the dependency (prod). Symptom: a fix you just made to a shared component does not appear in `dist/`.
- **It is consumed as the built `dist`.** After changing the shared library, `npm run shared:build`. A stale `dist` shows up here as a resolve or missing-export error.
- **In local mode the two checkouts must be on matching branches.** If this repo is on a task branch and tmc-global is on `main`, you build against the wrong library. Symptom: `"X" is not exported by ".../shared"` for components that plainly exist. Fix by checking out the matching branch there and running `shared:build`, not by re-implementing the component here.
- **Never delete `node_modules/.vite` while `npm run dev` is running.** The dev server then answers every client module with `504 (Outdated Optimize Dep)`: no React island hydrates and no webfont applies (everything falls back to a system sans), while the page still renders and `npm run build` stays green. Those two symptoms together are always this; restart the dev server. `astro.config.mjs` sets `optimizeDeps.exclude: ['@modcommunity/shared']` so the linked package is served straight from disk, which is why `shared:build` / `shared:local` are safe with dev up.

## `three` is only ever imported dynamically

It is here for one thing, the front page's hero field (`landing/heading/HeroField.tsx`), and it is about 700 KB of JS, several times the rest of the site's client bundle. The `await import('three')` inside that component's effect keeps it a separate chunk no other page fetches and nothing waits on. A top-level `import … from 'three'` anywhere would put it in the entry bundle; if a second thing ever needs it, give that one a dynamic import too.

## `react-multi-carousel` is pinned to exactly `2.8.5`

Do not change it to `^2.8.5` or bump it to `2.8.6`. 2.8.6 accidentally ships `npm`, `install` and `core-js` as runtime dependencies, which drags the whole npm CLI into `node_modules` and makes `npm audit` report a pile of advisories, none from code this site loads. The two releases differ only in `package.json`, so the pin costs nothing, and a caret range would silently resolve back to 2.8.6. Revisit only if upstream publishes a release that drops those deps.
