# The three heroes (`src/components/helper/HeroBackdrop.astro`)

The home page, `/tmc-app` and `/tmc-cli` each open with a hero, and they are deliberately not the same hero: each is built over its own named backdrop with its own silhouette and frame. The product pages are self-contained rounded panels; the front page is a full-bleed band.

| Page | Backdrop | Shape |
| --- | --- | --- |
| `/` (`landing/Heading.astro`) | `blueprint`: two restrained lights and a diagonal sweep, with a slowly turning Three.js point cloud over them (`HeroField.tsx`) | Full-bleed asymmetric band: copy left (eyebrow rule, static display headline, CTAs), the five surfaces as a numbered index in a rule-separated column right |
| `/tmc-app` (`tmcApp/Hero.astro`) | `workshop`: indigo/violet over a lit horizon | Two-column split: copy left, a pure-markup mock of the app's server browser right |
| `/tmc-cli` (`apiTool/Hero.astro`) | `console`: teal on black, perspective floor, scanlines | Banner: headline left with CTAs on its baseline, then the full-width install terminal |

## What is load-bearing

- **The backdrops are image-free and theme-aware.** Pure gradient and blurred light, so nothing can fail to load or go stale. Each variant paints two literal palettes: the deep one under `.dark` (`hidden dark:block`), a pale tinted one otherwise (`dark:hidden`): the same hues as soft washes over near-white, with grain (multiply instead of overlay) and hairlines kept. A backdrop built from `--surface` would not do: it has no hue of its own. `var(--accent)` is the one token used. Same rules and vocabulary as website-city's `src/app/_components/ui/browser/hero_backdrops.tsx`; keep the two in step.
- **Copy is written white-on-dark and flips by scope.** Every hero root carries `data-hero`. In `Global.css`, `html:not(.dark) [data-hero]` re-points `--color-white` at ink and the pastel 200/300 shades (sky, teal, violet, emerald, amber) at their dark counterparts, so `text-white/70`, `border-white/10`, `bg-white/5` and `text-sky-300` mean "the hero's copy, rule and tint" in both themes. Consequences: a solid button that must be dark-on-light in dark mode and inverse in light uses `bg-foreground text-background`; a solid brand button uses `text-accent-foreground`, never `text-white`; a literal hex (`text-[#c4b5fd]`) needs a `dark:` pair with its darker twin. A panel that is a drawing of a dark product (the app window, the terminal, the Play button) wears `hero-keep-dark`, which restores the original values inside it.
- **The point cloud has two looks.** `HeroField` watches `<html class>`: additive pale dots in dark, normal-blended indigo dots at lower opacity in light (additive blending is invisible on white), with the fog colour following the backdrop base.
- **No layout ever animates, headlines included.** A headline that types itself in makes the first paint an empty box that then shoves everything below it down.
- **Nothing in a hero draws a grid.** A CSS grid in the backdrop and a drawn one in the field crossed each other (see [history.md](history.md#two-grids-in-one-hero)); neither exists now, and neither should come back.
- **`.special` is `text-special-1 font-bold` from `Utilities.css`,** and each hero overrides its colour (`[&_.special]:…`) so the emphasis belongs to that page's palette rather than the site accent, a blue that fights both the green and the violet. The 200-weight Tailwind shades read as white at hero sizes; 300 is where they look coloured.
- **The front page's surface index is not a stat row.** This site is static and has no live counts; invented numbers under a headline are worse than none. That half carries the five destinations as numbered rows, one hover target per row, labelled from `nav.*` (which website-city translates in all nine locales) with the icons and order of city's nav config. The closing rule sits on the `<ul>`, not the last row: each anchor is its `<li>`'s only child, so `last:` would match all five.

## The front page's hero field (`landing/heading/HeroField.tsx`)

The one animation on the site, and strictly additive. It is a point cloud (a few hundred dots in a box, turning slowly) with no lines in it, so nothing can collide with the copy or the backdrop. It is deliberately small: no custom shaders. Depth fade is `scene.fog`, which `PointsMaterial` honours for free, and the round dot is a radial gradient drawn once into a `<canvas>`. If you find yourself writing GLSL in here again, that is what this replaced.

It is arranged so that it can simply not happen:

- The backdrop under it is complete on its own, with no handshake (no data attribute, no `:has()` fade, no scrim). No JS, no WebGL, or a context that fails to create leaves the hero exactly as it renders without it.
- It hydrates `client:idle` and imports `three` dynamically, so the first paint waits on nothing and `three` stays its own chunk ([dependencies.md](dependencies.md#three-is-only-ever-imported-dynamically)).
- `prefers-reduced-motion: reduce` renders one frame and never starts the loop, and the loop stops whenever the hero is off-screen or the tab is hidden. Time advances only on frames drawn, so a hero away for a minute resumes rather than jumping.
- The camera widens its lens by aspect, not width: a tall, narrow hero sees a smaller slice of the box, so portrait gets a wider FOV.

If another page wants motion, copy this shape: a backdrop complete on its own, and an enhancement layered over it that adds no structure the backdrop already draws. Do not animate a backdrop in place of one, and do not give the enhancement and the backdrop the same motif.
