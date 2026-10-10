# Layout: container queries and overflow

## Responsive layout goes through container queries

`Layout.astro` marks `<main>` as `@container`; page content sizes itself off that element, and sections use `@3xl:grid-cols-2`, `@5xl:grid-cols-3`, and so on. Viewport variants (`sm:`/`md:`/`lg:`) are not a style choice here, they are wrong: `<SiteSidebar/>` appears at `lg` and takes 16rem, so `lg:grid-cols-2` fires at exactly the moment the space available drops by 256px, and every viewport breakpoint above it is off by that much. The symptom was a 1024–1280px window rendering four ~180px columns with a horizontal scrollbar while the same page at 390px was fine.

- Container sizes are content widths, much smaller than the viewport names: `@3xl` = 768px, `@5xl` = 1024px. Rough conversion for old code: `md:` → `@3xl:`, `xl:` → `@5xl:`, `sm:` → `@2xl:`.
- **A component laid out inside a column needs its own `@container`.** The `@…` variants measure the nearest container ancestor, by default the whole of `<main>`, so a card grid in a half-width column would still be sized against the full page. `Feedback.astro`, `DeveloperApi.astro` and `StatDonut.astro` each open one; copy that.
- **Anything that can be squeezed wants `min-w-0`.** A grid or flex item's automatic minimum size is its content's, so one long unbreakable line (the `curl` snippet in `DeveloperApi.astro`) widens its column and pushes a scrollbar onto the page rather than scrolling inside its own `overflow-x-auto`.
- Purely decorative viewport variants (`intersect:md:motion-preset-*`, which only pick an entrance animation) are deliberately left as they are.

## `<main>` carries `overflow-x-clip`, because of entrance animations

The card rows arrive with `intersect:motion-preset-slide-left`, which starts the element at `translateX(+25%)` of its own width (`+100%` for the `-lg` ones). For the length of that animation the offset is real scrollable overflow at every width; on a phone the front page measured most of a screen wider than the viewport, and since a slide plays while the reader scrolls, the page went wide under them with white gutters down both sides.

- **The clip belongs on the column, not the call sites.** Clipping there keeps every slide as designed: the card arrives from behind the page edge. It is `clip` and not `hidden` on purpose: `hidden` makes `<main>` a scroll container, which forces `overflow-y` to `auto` and breaks the legal pages' `sticky top-20` table of contents.
- **A section may not rely on that clip for its layout.** It covers deliberate, transient, animated overshoot and nothing else.

## The overflow audit

To check a layout change: `npm run build`, serve `dist/`, then `npm run audit:overflow`, which compares `document.documentElement.scrollWidth` against `clientWidth` on every built page and language at 320 / 390 / 768 / **1024 / 1100** / 1440 / 1920. The two in bold are the sidebar-transition widths where this class of bug lives, and the ones nobody tests by hand. When it finds a page, `npm run audit:overflow:bisect -- <base-url> <path> <width>` names the element responsible by hiding one subtree at a time (an element-edge scan misses text that overflows a box that itself fits).

- **The audit lifts the guard before it measures** (`main{overflow: visible}`), because otherwise the clip would swallow the accidental content overflow the script exists to find. Keep that line if you touch the script. It also disables animations, which is now de-noising only.
- **It skips redirect stubs and catches per page.** The `/api-tool/` pages are `<meta http-equiv="refresh">` stubs to `/tmc-cli`; they navigate the instant they load, and once killed the whole run silently (see [history.md](history.md#the-overflow-audit-that-stopped-running)). Stubs are skipped at discovery, by content rather than path, and the whole per-page measurement is wrapped so one bad page costs one finding. Check its exit code. Any script like this needs the same two guarantees.
