// Horizontal-overflow audit: every built page, every language, every width.
//
// CLAUDE.md specifies this check and names 1024 and 1100 as "the
// sidebar-transition widths where this class of bug lives, and the ones nobody
// tests by hand". It lived in /tmp for two runs and was re-derived each time;
// it belongs here.
//
//   npm run build
//   npx http-server dist -p 4319 --silent &
//   npm run audit:overflow -- http://127.0.0.1:4319
//
// Two things it must keep, both learned the hard way:
//
//  1. Disable animations AND scroll the page through before measuring. The
//     entrance animations are intersect-once, so an element sliding into place
//     is transiently outside the viewport and reads as overflow that is not a
//     LAYOUT bug. Without both, two thirds of the output is noise.
//
//     Note what this does NOT mean. That transient used to be dismissed here
//     as "overflow no user could ever scroll to", and it was reaching users on
//     every page: a horizontal slide plays *while* the reader scrolls, so the
//     document really did go 675px wide on a 390px phone. Silencing it here is
//     only correct because Layout.astro now clips it at <main> — this script
//     measures with that guard lifted (below), so the two together mean
//     "no layout overflow, and no animation overflow either".
//
//  2. Report the document's own scrollWidth, not "which element sticks out".
//     An element-blaming detector missed the /ru/ heading bug for two runs: the
//     h2's box is 288px wide and comfortably inside a 320px viewport, and only
//     its *text* overflowed. Nothing sticks out; the page is still 46px wide.
//     When something does overflow, bisect with scripts/overflow-bisect.mjs,
//     which hides subtrees until the page stops scrolling.
//
// Needs a browser. The system Chromium works and no Playwright download is
// required — set CHROMIUM to override.

const BASE = process.argv[2];

if (!BASE) {
  console.error('usage: node scripts/overflow-audit.mjs <base-url> [path ...]');
  process.exit(2);
}

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error(
    'playwright is not installed. It is deliberately not a dependency of this\n' +
      'site — it is only needed for this audit. Install it somewhere and run:\n' +
      '  npm i playwright --prefix /tmp/overflow && \\\n' +
      '  NODE_PATH=/tmp/overflow/node_modules node scripts/overflow-audit.mjs <url>'
  );
  process.exit(2);
}

const WIDTHS = [320, 390, 768, 1024, 1100, 1440, 1920];

// Default to every page the build produced, so a new language or legal page is
// covered the day it is added rather than the day someone remembers to list it.
//
// Except the REDIRECT STUBS. The nine `/api-tool/` pages are four lines of
// `<meta http-equiv="refresh">` pointing at `/tmc-cli`, and they have no layout
// to audit — but they used to take the whole run down with them: the page
// navigates the instant it loads, the `addStyleTag` below lands in a context
// that no longer exists, and the uncaught rejection kills the process. That is
// not a hypothetical. It is why this script reported nothing at all from the
// day those redirects were added until the entrance-animation overflow was
// found by hand, and the per-page `try` further down cannot help because the
// throw is outside it. Skipped by content rather than by path, so the next
// redirect is handled the day it is added.
const { readdirSync, readFileSync } = await import('node:fs');
const REDIRECT = /http-equiv=["']?refresh/i;
const discover = (dir, base = '') =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? discover(`${dir}/${e.name}`, `${base}/${e.name}`)
      : e.name === 'index.html' &&
          !REDIRECT.test(readFileSync(`${dir}/${e.name}`, 'utf8').slice(0, 2048))
        ? [`${base}/`]
        : []
  );

const PAGES = process.argv.length > 3 ? process.argv.slice(3) : discover('dist');

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM || '/usr/bin/chromium',
});

const findings = [];

for (const width of WIDTHS) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();

  for (const path of PAGES) {
    // One page must never be able to end the run. An audit that dies partway
    // reports "no findings" for everything it had not reached yet, which reads
    // exactly like a clean sweep in a terminal and is how the entrance-
    // animation overflow went unreported across every page and every width.
    try {
      await page.goto(`${BASE}${path}`, { waitUntil: 'load', timeout: 20000 });
    } catch {
      findings.push({ width, path, error: 'could not load' });
      continue;
    }

    try {
      // Belt and braces: reducedMotion only helps if the library honours it.
      //
      // `main{overflow:visible}` lifts the entrance-animation guard that
      // Layout.astro puts on <main> (`overflow-x-clip`, see the comment there).
      // That rule exists so a card sliding in from +25% cannot widen the page;
      // left in place here it would also swallow the accidental content overflow
      // this script is FOR, and the audit would go quiet while the bug it was
      // written to catch — the unbreakable Russian heading — went on shipping.
      await page.addStyleTag({
        content:
          '*,*::before,*::after{animation:none!important;transition:none!important}' +
          'main{overflow:visible!important}',
      });

      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 20));
        }
        window.scrollTo(0, 0);
      });

      await page.waitForTimeout(250);

      const over = await page.evaluate(() => {
        const de = document.documentElement;
        return de.scrollWidth - de.clientWidth;
      });

      if (over > 0) findings.push({ width, path, overflowPx: over });
    } catch (e) {
      findings.push({ width, path, error: `could not measure: ${e.message.split('\n')[0]}` });
    }
  }

  await context.close();
}

await browser.close();

const loads = PAGES.length * WIDTHS.length;

if (findings.length === 0) {
  console.log(`clean: ${PAGES.length} pages x ${WIDTHS.length} widths = ${loads} loads, none overflowing`);
  process.exit(0);
}

console.error(`${findings.length} of ${loads} page loads scroll horizontally:`);
for (const f of findings) console.error(' ', JSON.stringify(f));
process.exit(1);
