/**
 * Every registered Umami event name must have something that fires it.
 *
 * `src/lib/umami.ts` states the rule in prose — **do not register a name
 * nothing fires**, because a registry that lists events the site cannot emit
 * reads as coverage — and prose does not fail a build. This does. The same
 * check in `website-learn` caught one the day it was written
 * (`docs_toc_toggle`, registered for a collapse control that does not exist),
 * which is the argument for having it at all.
 *
 * The OPPOSITE direction is already covered and needs nothing here:
 * `track()` takes a `UmamiEventName`, so an unregistered name is a type error
 * rather than a row in Umami nobody queries because nobody knows it is there.
 * Only the names that fire from a `data-umami-event` ATTRIBUTE have no such
 * protection, which is most of them on this site — hence this.
 *
 *     npm run umami:check
 *
 * A plain node script rather than a test runner, matching `audit:overflow`:
 * this repo has no vitest and adding one to assert a list is a poor trade.
 * The registry is parsed with a regex rather than imported because it is
 * TypeScript and node is not.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')
const REGISTRY = join(SRC, 'lib', 'umami.ts')

const registry = readFileSync(REGISTRY, 'utf8')

/*
 * Only the quoted entries of the `UMAMI_EVENTS` array, not every string in the
 * file — the header and the per-group comments name events in prose, and
 * matching those would make the check pass on its own documentation.
 */
const body = registry.slice(
    registry.indexOf('export const UMAMI_EVENTS = ['),
    registry.indexOf('] as const')
)

const names = [...body.matchAll(/^\s*'([a-z0-9_]+)',/gm)].map((m) => m[1])

if (names.length === 0) {
    console.error('Parsed no event names out of src/lib/umami.ts — has its shape changed?')
    process.exit(2)
}

function sources(dir, out = []) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, e.name)

        if (e.isDirectory()) sources(p, out)
        else if (/\.(astro|tsx?|mjs)$/.test(e.name) && p !== REGISTRY) out.push(p)
    }

    return out
}

const files = sources(SRC)
const corpus = new Map(files.map((f) => [f, readFileSync(f, 'utf8')]))

let bad = 0
const dupes = names.filter((n, i) => names.indexOf(n) !== i)

for (const dupe of new Set(dupes)) {
    bad++
    console.log(`  DUPLICATE  ${dupe}`)
}

/*
 * A QUOTED occurrence, not a substring.
 *
 * Both ways an event is fired put the name in quotes — `track('back_to_top')`
 * and `data-umami-event="launcher"` — while a bare substring match says yes to
 * any prose that happens to contain the word. `account` matched thirteen files
 * that way, almost all of them translation strings about somebody's account,
 * which would have reported a genuinely unfired event as wired.
 */
function fires(text, name) {
    return text.includes(`'${name}'`) || text.includes(`"${name}"`)
}

for (const name of names) {
    const hits = [...corpus]
        .filter(([, text]) => fires(text, name))
        .map(([f]) => relative(ROOT, f))

    if (hits.length === 0) {
        bad++
        console.log(`  UNFIRED    ${name}`)
    } else if (process.env.VERBOSE) {
        console.log(`  ok         ${name.padEnd(18)} ${hits.join(', ')}`)
    }
}

if (bad > 0) {
    console.log(
        `\n${bad} problem(s) across ${names.length} registered events.\n` +
            'Wire the event up, or delete the entry — a registry that lists ' +
            'events the site cannot emit reads as coverage.'
    )
    process.exit(1)
}

console.log(`✓ all ${names.length} registered Umami events have a call site.`)
