# Time Machine Identity Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the visual identity and era metaphors of the existing time-machine portfolio so it feels original, while keeping the same years, routes, shared content, and 2016 as home.

**Architecture:** Keep isolated era layouts + per-era CSS. Redesign `EraTimeline` into a decade track with short era labels. Re-skin CSS/copy/rituals era-by-era (1986→2046). Do not change JSON/content collections or routing.

**Tech Stack:** Astro 5, TypeScript, plain CSS, existing `src/i18n` JSON, Vercel static deploy.

**Working directory for code:** `daniel-portfolio/` (own git repo).  
**Spec:** `docs/superpowers/specs/2026-07-15-time-machine-identity-redesign-design.md` (parent repo `Repositório`).

## Global Constraints

- Same years: `1986, 1996, 2006, 2016, 2026, 2036, 2046`
- Home remains `/` and `/pt` → `/pt/2016`
- Shared portfolio data unchanged
- PT/EN on all eras including intros
- Keep skip / `prefers-reduced-motion` where animations exist
- Active timeline year must stay readable (no white-on-white)
- Avatar always `overflow: hidden` + face-friendly `object-position`
- Do not invent new eras or APIs
- Verification command for every code task: `cd daniel-portfolio; npm run build` (must exit 0)

---

## File map

| File | Responsibility |
|------|----------------|
| `daniel-portfolio/src/config/eras.ts` | Add short era labels for timeline (pt/en) |
| `daniel-portfolio/src/components/EraTimeline.astro` | Decade-track markup |
| `daniel-portfolio/src/styles/eras/timeline.css` | Track + per-era skin variants |
| `daniel-portfolio/src/i18n/pt.json` / `en.json` | Timeline short labels + ritual copy |
| `daniel-portfolio/src/styles/eras/{year}.css` | Era visual identity |
| `daniel-portfolio/src/components/eras/{year}/*` | Ritual/UI markup tweaks |
| `daniel-portfolio/src/layouts/eras/Era*Layout.astro` | Only if ritual wiring needs it |

---

### Task 1: Era short labels + i18n for timeline

**Files:**
- Modify: `daniel-portfolio/src/config/eras.ts`
- Modify: `daniel-portfolio/src/i18n/pt.json`
- Modify: `daniel-portfolio/src/i18n/en.json`

**Interfaces:**
- Consumes: existing `ERAS` registry shape
- Produces: each era has `shortLabel: { pt: string; en: string }` used by timeline as `2006 · Web`

- [ ] **Step 1: Extend `ERAS` with short labels**

In `src/config/eras.ts`, add `shortLabel` to every era (keep `status`, `label`, `seoTitle`):

```ts
'1986': {
  status: 'ready',
  label: '1986',
  shortLabel: { pt: 'Terminal', en: 'Terminal' },
  seoTitle: { pt: 'BBS Edition', en: 'BBS Edition' },
},
'1996': {
  status: 'ready',
  label: '1996',
  shortLabel: { pt: 'Homepage', en: 'Homepage' },
  seoTitle: { pt: 'GeoCities Edition', en: 'GeoCities Edition' },
},
'2006': {
  status: 'ready',
  label: '2006',
  shortLabel: { pt: 'Web', en: 'Web' },
  seoTitle: { pt: 'Web 2.0 Edition', en: 'Web 2.0 Edition' },
},
'2016': {
  status: 'ready',
  label: '2016',
  shortLabel: { pt: 'Portfólio', en: 'Portfolio' },
  seoTitle: { pt: 'Portfolio', en: 'Portfolio' },
},
'2026': {
  status: 'ready',
  label: '2026',
  shortLabel: { pt: 'Agente', en: 'Agent' },
  seoTitle: { pt: 'Agent Edition', en: 'Agent Edition' },
},
'2036': {
  status: 'ready',
  label: '2036',
  shortLabel: { pt: 'Firmware', en: 'Firmware' },
  seoTitle: { pt: 'Firmware Edition', en: 'Firmware Edition' },
},
'2046': {
  status: 'ready',
  label: '2046',
  shortLabel: { pt: 'Stream', en: 'Stream' },
  seoTitle: { pt: 'Stream Edition', en: 'Stream Edition' },
},
```

Also update `seoTitle` for 2036/2046 away from Neural/Consciousness naming if still present.

- [ ] **Step 2: Add timeline i18n helper strings**

In both `pt.json` and `en.json` under `timeline`:

```json
"timeline": {
  "aria_label": "Navegar entre eras",
  "coming_soon_sr": "Esta era estará disponível em breve",
  "active_format": "{year} · {short}"
}
```

EN:

```json
"timeline": {
  "aria_label": "Browse eras",
  "coming_soon_sr": "This era will be available soon",
  "active_format": "{year} · {short}"
}
```

(`active_format` is documentation for implementers; markup can concatenate in Astro.)

- [ ] **Step 3: Build**

Run: `cd daniel-portfolio; npm run build`  
Expected: exit 0

- [ ] **Step 4: Commit (in `daniel-portfolio`)**

```bash
git add src/config/eras.ts src/i18n/pt.json src/i18n/en.json
git commit -m "feat: add era short labels for decade timeline"
```

---

### Task 2: Redesign EraTimeline into decade track

**Files:**
- Modify: `daniel-portfolio/src/components/EraTimeline.astro`
- Modify: `daniel-portfolio/src/styles/eras/timeline.css` (rewrite variants)

**Interfaces:**
- Consumes: `ERA_YEARS`, `getEraMeta(year).shortLabel[locale]`, `t.timeline.aria_label`
- Produces: nav with `.era-timeline__rail`, `.era-timeline__tick`, active shows year + short label

- [ ] **Step 1: Replace timeline markup**

Rewrite `EraTimeline.astro` roughly as:

```astro
---
import '../styles/eras/timeline.css';
import { ERA_YEARS, getEraMeta, type EraYear } from '../config/eras';
import { useTranslations, type Locale } from '../i18n';

interface Props {
  currentYear: EraYear;
  locale: Locale;
}

const { currentYear, locale } = Astro.props;
const t = useTranslations(locale);
---
<nav
  class={`era-timeline timeline--${currentYear}`}
  aria-label={t.timeline.aria_label}
  role="tablist"
>
  <div class="era-timeline__rail" aria-hidden="true"></div>
  <div class="era-timeline__track">
    {ERA_YEARS.map((year) => {
      const short = getEraMeta(year).shortLabel[locale];
      const selected = year === currentYear;
      return (
        <a
          href={`/${locale}/${year}`}
          class:list={['era-timeline__tick', selected && 'is-active']}
          role="tab"
          aria-selected={selected ? 'true' : 'false'}
          aria-current={selected ? 'page' : undefined}
        >
          <span class="era-timeline__dot"></span>
          <span class="era-timeline__year">{year}</span>
          {selected && <span class="era-timeline__short">{short}</span>}
        </a>
      );
    })}
  </div>
</nav>
```

- [ ] **Step 2: Rewrite `timeline.css` as a track (not pill capsule)**

Requirements in CSS:
- Sticky top, horizontal scroll on small screens
- Visible horizontal rail/line behind ticks
- Inactive: year + small dot; Active: larger dot + year + short label
- Per-era skins via `.timeline--1986` … `.timeline--2046` (terminal / 90s / glossy / flat / agent / firmware / glitch)
- Active state contrast rules **last** and higher specificity, e.g.:

```css
.era-timeline .era-timeline__tick.is-active,
.era-timeline .era-timeline__tick[aria-selected='true'] {
  color: #111;
  background: #fff;
}
```

Plus era-specific overrides that still keep readable contrast.

- [ ] **Step 3: Build + smoke HTML**

Run: `cd daniel-portfolio; npm run build`  
Then open `dist/pt/2016/index.html` and confirm `era-timeline__tick` / `era-timeline__short` exist.

- [ ] **Step 4: Manual check**

Visit `/pt/2006` and `/pt/1986`: active year readable; no white-on-white.

- [ ] **Step 5: Commit**

```bash
git add src/components/EraTimeline.astro src/styles/eras/timeline.css
git commit -m "feat: redesign era timeline as decade track"
```

---

### Task 3: Reskin era 1986 (terminal) + ritual copy

**Files:**
- Modify: `daniel-portfolio/src/styles/eras/1986.css`
- Modify: `daniel-portfolio/src/components/eras/1986/ConnectScreen.astro`
- Modify: `daniel-portfolio/src/i18n/pt.json` (`era1986`)
- Modify: `daniel-portfolio/src/i18n/en.json` (`era1986`)
- Optionally: `daniel-portfolio/src/layouts/eras/Era1986Layout.astro` (only if copy keys change in script)

**Interfaces:**
- Consumes: existing `initBbs1986` skip/typewriter behavior
- Produces: same IDs (`connect-screen`, `bbs-content`, `bbs-skip-btn`) so JS keeps working

- [ ] **Step 1: Rewrite `era1986` copy (own voice, not generic BBS clone)**

PT example:

```json
"era1986": {
  "connect": "ESTABELECER LINK",
  "press_to_dial": "[ ENTER PARA HANDSHAKE ]",
  "dialing": "Negociando 1200 baud...",
  "bbs_title": "ARQUIVO · DANIEL TAVARES",
  "specs": "RECIFE NODE · 8-N-1 · ANSI",
  "file_listing": "LISTAGEM",
  "dial": "LINK",
  "skip": "Pular animação",
  "skip_hint": "ESC"
}
```

Mirror EN meaningfully (not literal machine translation of brand names).

- [ ] **Step 2: Visual reskin in `1986.css`**

Keep CRT idea but shift palette/details (e.g. amber phosphor option OR denser green with different panel chrome) so it doesn’t match the reference layout. Preserve skip button styles and contrast.

- [ ] **Step 3: Build + verify ritual**

`npm run build`  
Manual: `/pt/1986` — handshake works; skip works; content appears.

- [ ] **Step 4: Commit**

```bash
git add src/styles/eras/1986.css src/components/eras/1986 src/i18n/pt.json src/i18n/en.json src/layouts/eras/Era1986Layout.astro
git commit -m "feat: reskin 1986 terminal era identity"
```

---

### Task 4: Reskin era 1996 (personal homepage)

**Files:**
- Modify: `daniel-portfolio/src/styles/eras/1996.css`
- Modify: `daniel-portfolio/src/components/eras/1996/*` (banner/marquee/sidebar/content as needed)
- Modify: `daniel-portfolio/src/i18n/pt.json` / `en.json` (`era1996`)

**Interfaces:**
- Consumes: existing GeoLoader + dial-up avatar reveal
- Produces: same IDs for loader/avatar scripts

- [ ] **Step 1: Soften “GeoCities clone” signals in copy**

Rename banner/menu voice toward “homepage pessoal 96” (still kitschy, but original wording). Keep visitor counter & marquee as era-authentic devices.

- [ ] **Step 2: Restructure section skins**

Keep alternating readable light panels (spec contrast rule). Change border/title language so it isn’t a 1:1 of previous GeoCities frame. Preserve `section-plain` / forced light colors if dark-mode inversion was an issue.

- [ ] **Step 3: Build + manual**

`/pt/1996` — loader, avatar reveal, readable SATRE/skills, scrollbar still ok if present.

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: reskin 1996 personal homepage era"
```

(Prefer explicit `git add` of touched files.)

---

### Task 5: Reskin era 2006 (Web 2.0 blog)

**Files:**
- Modify: `daniel-portfolio/src/styles/eras/2006.css`
- Modify: `daniel-portfolio/src/components/eras/2006/*`
- Modify: i18n `era2006` keys as needed

**Interfaces:**
- Keep lightbox IDs (`web-lightbox`, `.web-photo-btn`)
- Keep tag cloud wrap (`flex-wrap`)

- [ ] **Step 1: New composition tokens**

Change header chrome, card radii, sidebar card hierarchy — still glossy Web 2.0, different from current blue-clone look.

- [ ] **Step 2: Ensure SATRE/skills contrast + avatar wrap still correct**

- [ ] **Step 3: Build + manual** `/pt/2006` — tags wrap; lightbox; avatar face; timeline active readable

- [ ] **Step 4: Commit**

```bash
git commit -m "feat: reskin 2006 web 2.0 era identity"
```

---

### Task 6: Light cohesion pass on era 2016

**Files:**
- Modify only if needed: `daniel-portfolio/src/styles/global.css` / era 2016 components
- Prefer **minimal** change

- [ ] **Step 1: Check timeline on `/pt/2016` against new track**

If 2016 page looks fine with Task 2 timeline, **skip cosmetic changes**.

- [ ] **Step 2: Only if needed, tiny token align** (spacing under sticky timeline)

- [ ] **Step 3: Build**

- [ ] **Step 4: Commit only if files changed**

```bash
git commit -m "fix: align 2016 layout with new timeline spacing"
```

---

### Task 7: Reskin era 2026 (agent UI)

**Files:**
- Modify: `daniel-portfolio/src/styles/eras/2026.css`
- Modify: `daniel-portfolio/src/components/eras/2026/*`
- Modify: i18n `era2026`

**Interfaces:**
- Keep keyword chat behavior; no API

- [ ] **Step 1: Visual + brand copy refresh**

Keep agent chat metaphor; change chrome/orb/glass so it’s not a lookalike. Optional brand string tweak in i18n (still Daniel-owned).

- [ ] **Step 2: Build + send one chat message on `/pt/2026`**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat: reskin 2026 agent era identity"
```

---

### Task 8: Reskin era 2036 (firmware / link — rename away from Neuralink parody)

**Files:**
- Modify: `daniel-portfolio/src/components/eras/2036/NeuralPairing.astro`
- Modify: `daniel-portfolio/src/components/eras/2036/NeuralContent.astro` (labels)
- Modify: `daniel-portfolio/src/styles/eras/2036.css`
- Modify: i18n `era2036` (PT+EN)
- Optionally rename display strings from `DanielLink` → e.g. `DT-Link` / `ArquivoLink` / `NodePair` (pick one and use consistently)

**Interfaces:**
- Keep IDs `neural-pairing`, `neural-content`, `neural-start` OR rename both HTML+JS together in one commit
- Prefer **keeping IDs**, changing visible copy only (safer)

- [ ] **Step 1: Replace Neuralink-like copy**

Example PT:

```json
"era2036": {
  "brand": "DT-OS Firmware v12",
  "step": "ETAPA 1 DE 1",
  "title_prefix": "Parear",
  "title_highlight": "DT-Link",
  "subtitle": "Aproxime o módulo DT-Link para sincronizar o arquivo Daniel Tavares. Fique parado durante o handshake.",
  "start": "Iniciar pareamento",
  "linking": "Sincronizando firmware...",
  "linked": "Pareamento concluído",
  "nav_label": "Módulos",
  "footer": "© 2036 DANIEL TAVARES",
  "location": "Recife, Pernambuco, Brasil"
}
```

- [ ] **Step 2: Reskin pairing UI (not the reference Start screen)**

Different layout hierarchy/colors; keep working `showContent()` query-at-click pattern.

- [ ] **Step 3: Build + click Start on `/pt/2036`** — content must appear (no blank screen)

- [ ] **Step 4: Commit**

```bash
git commit -m "feat: reskin 2036 as firmware pairing era"
```

---

### Task 9: Reskin era 2046 (broken protocol / stream)

**Files:**
- Modify: `daniel-portfolio/src/components/eras/2046/*`
- Modify: `daniel-portfolio/src/styles/eras/2046.css`
- Modify: i18n `era2046`

**Interfaces:**
- Keep IDs `consciousness-intro`, `consciousness-stream` (or rename both HTML+JS)
- Lang toggle on intro must still work

- [ ] **Step 1: Refresh glitch copy + header titles** (PT/EN already partly done; ensure stream metaphor, not reference phrasing)

- [ ] **Step 2: Visual reskin** — white/glitch or new direction, still “protocol broken”; avatar wrap intact

- [ ] **Step 3: Build + click intro `/pt/2046`**

- [ ] **Step 4: Commit**

```bash
git commit -m "feat: reskin 2046 stream / broken-protocol era"
```

---

### Task 10: Cross-era QA checklist

**Files:** none (verification only); fix regressions in the era that fails

- [ ] **Step 1: Build clean**

`cd daniel-portfolio; npm run build` → exit 0

- [ ] **Step 2: Walk PT eras**

For each `/pt/{year}`:
1. Timeline active year readable + short label on active
2. Lang toggle reaches `/en/{year}` and back
3. Avatar face not clipped (where avatar exists)
4. Rituals: 1986 handshake+skip; 1996 loader; 2036 start; 2046 reveal
5. No illegible dark-on-dark body text

- [ ] **Step 3: Mobile smoke** (narrow viewport) — timeline scrolls; no horizontal page blowout (except intentional 90s kitsch)

- [ ] **Step 4: Final commit only if QA fixes landed**

```bash
git commit -m "fix: qa polish after identity redesign"
```

---

## Spec coverage (self-review)

| Spec requirement | Task |
|------------------|------|
| Keep architecture/routes/data | Global + all tasks |
| Redesign timeline track | Task 2 (+ labels Task 1) |
| Reskin eras / rituals | Tasks 3–9 |
| 2016 stays home / minimal | Task 6 + global |
| PT/EN intros | Tasks 3,8,9 (+ existing toggles) |
| Contrast / avatar / active year | Tasks 2–5, 8–10 |
| Anti-copy 2036/2046 | Tasks 8–9 |
| Order timeline → past → agent → future → QA | Tasks 1–10 |

**Placeholder scan:** none intentional.  
**Type consistency:** `shortLabel[locale]` from Task 1 used in Task 2.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-15-time-machine-identity-redesign.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — execute in this session with checkpoints  

Which approach?
