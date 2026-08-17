# Task 2 Report: Redesign EraTimeline into decade track

## Status

**DONE**

## Summary

Rewrote `EraTimeline.astro` and `timeline.css` to replace the pill-capsule tab bar with a horizontal decade track: a sticky nav containing a decorative rail line and a scrollable row of ticks. Inactive ticks show a small dot + year; the active tick grows a bigger dot and reveals the short label (`getEraMeta(year).shortLabel[locale]`). Also removed dead legacy CSS in `2046.css` left over from the old tab-based timeline.

## Changes

### `src/components/EraTimeline.astro`

- Replaced the single `.era-timeline__tab` markup with the brief's structure: `.era-timeline__rail` (decorative line, `aria-hidden`) + `.era-timeline__track` containing `.era-timeline__tick` anchors.
- Each tick renders `.era-timeline__dot` + `.era-timeline__year` always; `.era-timeline__short` only when `selected` (via `getEraMeta(year).shortLabel[locale]`).
- Kept `role="tablist"`/`role="tab"`/`aria-selected`/`aria-current`, added `is-active` class via `class:list`.

### `src/styles/eras/timeline.css` (full rewrite)

- `.era-timeline`: `position: sticky; top: 0`, per-era `background`, no longer a pill container.
- `.era-timeline__rail`: absolutely positioned 2px line, vertically centered, sits behind the track (`z-index: 0` vs track's `1`) — decorative, `aria-hidden`.
- `.era-timeline__track`: the actual `overflow-x: auto` scroll container (not the nav), so the rail stays a fixed decorative backdrop while ticks scroll on narrow viewports — avoids the classic bug where an absolutely-positioned rail's width is capped to the visible viewport instead of the full scrollable content width.
- Dot grows from 7px → 10px and opacity 0.6 → 1 on `.is-active`/`[aria-selected='true']`.
- Per-era base skins for all 7 eras (`.timeline--1986` … `.timeline--2046`): background, rail tint, inactive tick color — matching each era's existing palette (terminal green, Windows purple/magenta, glossy blue, flat 2016 dark, glassy agent purple, firmware cyan-on-black, flat white 2046).
- Active-state contrast block placed **last** in the file, generic rule first then 7 per-era overrides, each with `.timeline--X .era-timeline__tick.is-active` / `[aria-selected='true']` (3-class specificity) so it always beats the earlier per-era inactive-color rule (2-class specificity) regardless of the era.
- Mobile breakpoint (`max-width: 480px`) shrinks padding/font-size.

### `src/styles/eras/2046.css`

- Removed a dead/orphaned block (`.timeline--2046 .era-timeline__track`, `.era-timeline__tab`, `.era-timeline__tab[aria-selected='true']`) left over from before the timeline redesign — those class names no longer exist in the markup, so this was inert CSS bloat. Discovered while auditing the built CSS bundle for stray old selectors.

## Verification

```bash
cd daniel-portfolio
npm run build
```

- Exit code: **0**, `astro check`: 0 errors/warnings, 16 pages generated.
- Smoke-checked built HTML for all 7 pt years + spot checks in en (1996, 2016, 2006, 1986, 2046): every page has `era-timeline__rail`, `era-timeline__track`, `era-timeline__tick` (×7), the active tick carries `class="era-timeline__tick is-active"` + `aria-selected="true"` + `aria-current="page"` + `era-timeline__short` with the correct localized label (e.g. pt/2016 → "Portfólio", en/1996 → "Homepage", pt/2046 → "Stream"); inactive ticks omit `era-timeline__short` entirely.
- Verified the built CSS bundle: active-override rules for all 7 eras appear after the base/per-era rules, each pairs a light or saturated background with an explicitly opposite-value text color (no era reuses its own base background/text combo for the active state) — no white-on-white or matching-color pairs found for any of the 7 eras.
- Grepped all `src/styles/eras/*.css` for stray `era-timeline__tab`/`__track` selectors after the 2046.css cleanup — none remain outside `timeline.css` itself.

## Commit

| SHA | Subject |
|-----|---------|
| `6294d21` | feat: redesign era timeline as decade track |

Branch: `feat/time-machine-identity-redesign` (daniel-portfolio)
Files: `src/components/EraTimeline.astro`, `src/styles/eras/timeline.css`, `src/styles/eras/2046.css`

## Self-Review

| Check | Result |
|-------|--------|
| Markup matches brief's `nav > rail + track > tick(dot, year, [short])` structure | Yes |
| `role="tablist"`/`role="tab"`/`aria-selected` preserved | Yes |
| Active tick shows year + short label; inactive shows year + dot only | Yes |
| Rail visible behind ticks | Yes |
| Sticky top + horizontal scroll on narrow viewports | Yes |
| Per-era skins for all 7 eras | Yes |
| Active contrast rules last + higher specificity, no white-on-white | Yes |
| Individual era pages untouched (Tasks 3+) | Yes — only touched `EraTimeline.astro`, `timeline.css`, and one dead-code removal in `2046.css` |
| Build passes | Yes |
| Lints clean on edited files | Yes |

## Concerns

- `timeline.active_format` (added in Task 1's i18n files) is still unused — Task 2's brief specifies separate `__year`/`__short` spans rather than one formatted string, so I followed the literal brief instead of wiring that key in. Flagging in case a later task expects it consumed; currently it's dead i18n data with no functional impact.
- The rail is intentionally a *static* decorative backdrop sized to the nav's visible width (not the full scrollable content width) — ticks scroll independently inside `.era-timeline__track` over/under it. This avoids a real CSS pitfall (an absolutely-positioned full-width rail inside an `overflow-x: auto` container gets clipped to the container's un-scrolled box width, not the scrolled content width) while still satisfying "visible rail behind ticks." Only matters on very narrow viewports with all 7 ticks; visually still reads correctly since the line runs edge-to-edge under the ticks either way.
- Did not manually visually verify in a live browser (no dev server run) — verification is from static HTML/CSS output only, per the build+grep smoke check requested in the brief.

## Report Path

`c:\Users\toyst\Documents\Projetos\Repositório\.superpowers\sdd\task-2-report.md`
