# Design system

This site's theme is not defined here. It comes from `@modcommunity/shared` (the `../tmc-global` repo), the single source of truth for the TMC design, which mirrors website-city's look.

## Shared shell

Header, Footer and Logo are the shared components, not local ones. `src/components/SiteHeader.tsx` and `SiteFooter.tsx` are thin wrappers around `Header`/`Footer` from `@modcommunity/shared`, rendered by `Layout.astro`. Do not bring back a bespoke header or footer.

Reuse the shared library for anything generic (buttons, blocks, icon rows, sections). Only build a local component when it is specific to the landing pages. New colours go into the shared theme in `../tmc-global`, not hard-coded here, so website-city and the app stay in sync.

## How the CSS is wired (`src/styles/Global.css`)

```css
@import "tailwindcss";
@import "@modcommunity/shared/theme.css";                 /* website-city tokens */
@source "../../node_modules/@modcommunity/shared/dist";   /* generate shared components' classes */
```

The `@source` line is required: Tailwind ignores `node_modules`, so without it the shared Header/Footer/Logo classes would not be generated and they would render unstyled.

## Backwards-compatibility token aliases

The older landing and legal components were written against an older token vocabulary (`bg-body`, `text-text-default`, `special-1`, `border-secondary`, `item`, `btn-*`, …). Rather than rewrite every component, `Global.css` has an `@theme inline` block that aliases those old names onto the website-city tokens (`--color-special-1: var(--accent)`, `--color-body: var(--background)`, `--color-text-default: var(--foreground)`), so the whole site re-skins to the shared theme automatically.

New markup uses the website-city names directly (`surface`, `accent`, `foreground`, `border`, `muted`, `surface-secondary`, …). The alias block is a migration bridge, not the target vocabulary: migrate a component off the old names and, once none remain, delete the corresponding aliases.

## Dark mode

Dark is the default; light is a choice. `Layout.astro`'s `<html>` starts as `class="dark"` and an inline script applies the stored `tmc:theme` (`dark`/`light`, as `class` plus `data-theme`) before first paint; the shared header's `ThemeToggle` writes it. Heroes follow the theme ([heroes](heroes.md)); anything else must use tokens.

## Fonts

DM Sans (body) and Plus Jakarta Sans (headings), loaded through `@fontsource-variable/*` imports in `Layout.astro`.

## Icons

`lucide-react` is the house set: it is what website-city uses, so matching it keeps the two shells visually identical. `react-icons` is kept only for brand marks, which means all of them: Discord, X, GitHub, Steam and Facebook, from `react-icons/fa6`. lucide dropped its brand glyphs (the surviving ones are deprecated aliases due for removal upstream, and Steam never had one), so brand marks from lucide are a build break waiting for a version bump. The shared `Footer` uses the same `fa6` marks, so the two social rows match.

- Do not add `react-icons` imports for anything that is not a brand mark; everything else has a lucide glyph.
- When an icon has a website-city counterpart, use the same glyph city uses (Apps→`Boxes`, Assets→`Cog`, Mods→`Hammer`, Servers→`Server`, Browse→`Search`, Knowledgebase→`BookOpen`, Blog→`Newspaper` in the header / `NotebookPen` in the sidebar). The authoritative list, icons and order both, is `../website-city`'s `src/app/_components/ui/shell/nav-config.ts`.
- lucide icons are stroke-based: colour them with `text-*`, never `fill-*` (a `fill-` class leaves them invisible).

## Astro islands

Props passed from `.astro` to a `client:*` React component are JSON-serialised, so you cannot pass functions (icon components, `linkComponent`, a `nav` config). Keep those on the client: use the shared component defaults, or wrap them in a local React component (as `SiteHeader` does) that supplies the non-serialisable parts internally. Keep `.astro` files for page structure and React (`.tsx`) for interactive islands.
