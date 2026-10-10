# History

Stories worth keeping because the bug could come back. Each one's lesson is also a rule in [CLAUDE.md](../CLAUDE.md) or a topic doc.

## The overflow audit that stopped running

A page that went wider than the phone (see [layout.md](layout.md#main-carries-overflow-x-clip-because-of-entrance-animations)) shipped because `audit:overflow` had silently stopped running. The `/api-tool/` pages are `<meta http-equiv="refresh">` stubs redirecting to `/tmc-cli`; they navigate the instant they load, so the `addStyleTag` right after `goto` threw "Execution context was destroyed". That `await` sat outside the per-page `try`, so the rejection was uncaught and killed the process, from the commit that added the redirects onward. A dead audit and a clean audit look identical in a terminal if you are not reading the exit code. The script now skips redirect stubs at discovery (by content, not path) and wraps the whole per-page measurement.

Also from this hunt: the obvious detector, "list every element whose right edge is past the viewport", found nothing on `/ru/`, because the culprit was a heading whose box fitted and whose text did not. That is why `overflow-bisect.mjs` removes subtrees instead of measuring them.

## Two grids in one hero

`blueprint` used to paint a flat grid in CSS (a 40px minor lattice and a 200px major one behind a radial mask), and `HeroField` drew a second grid in perspective, a wireframe terrain displaced by three sines in a vertex shader. They were meant to hand over to each other; a reader saw both crossing, the very interference the drawn field was supposed to fix. The CSS grid was removed outright so the question cannot come back, the terrain went with it, and the field became a point cloud with no lines.

## The typing headline

The front page's headline used to type itself in (`react-type-animation`), which made the first paint of the site an empty box that then pushed everything below it down, and needed a `min-h-*` floor on its wrapper to hide that. It is plain markup now and the dependency is gone; hence "no layout ever animates".

## Three identical heroes

All three heroes once painted the same two layers (one accent wash and one accent orb under the title) over the same centred column, so only the words told you which page you were on. That is why each now has its own backdrop and silhouette.
