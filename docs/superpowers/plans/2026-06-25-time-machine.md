# Time Machine — Portfólio Multi-Era Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 7-era time machine to the existing Astro portfolio — MVP with 1986, 2016, 2026 full eras plus styled placeholders for 1996/2006/2036/2046.

**Architecture:** Dynamic routes `/{locale}/{year}` with an era registry (`config/eras.ts`). Each ready era has an isolated layout + components under `components/eras/{year}/`. Shared JSON/content collections unchanged. `EraTimeline` bar at top adapts CSS per active era.

**Tech Stack:** Astro 5.x, TypeScript, CSS (per-era files), minimal client-side JS (1986 typewriter, 2026 fake chat)

**Spec reference:** `docs/superpowers/specs/2026-06-25-time-machine-design.md`

**Project root:** `daniel-portfolio/` (all paths below are relative to this folder)

---

## File Map

| Path | Responsibility |
|------|----------------|
| `src/config/eras.ts` | Era registry: years, status, SEO titles |
| `src/pages/index.astro` | Redirect → `/pt/2016` |
| `src/pages/pt/index.astro` | Redirect → `/pt/2016` |
| `src/pages/en/index.astro` | Redirect → `/en/2016` |
| `src/pages/pt/[year]/index.astro` | Route router for PT eras |
| `src/pages/en/[year]/index.astro` | Route router for EN eras |
| `src/components/EraTimeline.astro` | Top timeline bar (7 years) |
| `src/layouts/eras/Era1986Layout.astro` | 1986 shell + scanlines |
| `src/layouts/eras/Era2016Layout.astro` | 2016 shell (current theme) |
| `src/layouts/eras/Era2026Layout.astro` | 2026 dark agent shell |
| `src/layouts/eras/EraPlaceholderLayout.astro` | Coming soon shell |
| `src/components/eras/2016/*.astro` | Migrated current components |
| `src/components/eras/1986/*.astro` | BBS terminal components |
| `src/components/eras/2026/*.astro` | Agent UI + fallback sections |
| `src/components/eras/placeholder/ComingSoon.astro` | Per-era placeholder content |
| `src/data/chat-responses.ts` | Keyword → response map for 2026 |
| `src/styles/eras/timeline.css` | Timeline variants per era |
| `src/styles/eras/1986.css` | CRT terminal styles |
| `src/styles/eras/2016.css` | Re-exports global (optional) |
| `src/styles/eras/2026.css` | Agent/glass styles |
| `src/styles/eras/placeholder.css` | Placeholder era skins |
| `src/i18n/pt.json` / `en.json` | Timeline, chat, placeholder labels |

---

### Task 1: Era Registry

**Files:**
- Create: `src/config/eras.ts`

- [ ] **Step 1: Create eras.ts**

```typescript
// src/config/eras.ts
export const ERAS = {
  '1986': {
    status: 'ready',
    label: '1986',
    seoTitle: { pt: 'BBS Edition', en: 'BBS Edition' },
  },
  '1996': {
    status: 'placeholder',
    label: '1996',
    seoTitle: { pt: 'GeoCities Edition', en: 'GeoCities Edition' },
  },
  '2006': {
    status: 'placeholder',
    label: '2006',
    seoTitle: { pt: 'Web 2.0 Edition', en: 'Web 2.0 Edition' },
  },
  '2016': {
    status: 'ready',
    label: '2016',
    seoTitle: { pt: 'Portfolio', en: 'Portfolio' },
  },
  '2026': {
    status: 'ready',
    label: '2026',
    seoTitle: { pt: 'Agent Edition', en: 'Agent Edition' },
  },
  '2036': {
    status: 'placeholder',
    label: '2036',
    seoTitle: { pt: 'Neural Edition', en: 'Neural Edition' },
  },
  '2046': {
    status: 'placeholder',
    label: '2046',
    seoTitle: { pt: 'Consciousness Edition', en: 'Consciousness Edition' },
  },
} as const;

export type EraYear = keyof typeof ERAS;
export type EraStatus = (typeof ERAS)[EraYear]['status'];
export type Locale = 'pt' | 'en';

export const ERA_YEARS = Object.keys(ERAS) as EraYear[];

export function isEraYear(value: string): value is EraYear {
  return value in ERAS;
}

export function getEraMeta(year: EraYear) {
  return ERAS[year];
}
```

- [ ] **Step 2: Verify TypeScript**

Run from `daniel-portfolio/`:

```bash
npm run build
```

Expected: build succeeds (no imports yet — file is standalone).

- [ ] **Step 3: Commit**

```bash
git add src/config/eras.ts
git commit -m "feat: add era registry for time machine"
```

---

### Task 2: i18n Labels for Time Machine

**Files:**
- Modify: `src/i18n/pt.json`
- Modify: `src/i18n/en.json`

- [ ] **Step 1: Add keys to pt.json** (append before closing `}`)

```json
  "timeline": {
    "aria_label": "Navegar entre eras",
    "coming_soon_sr": "Esta era estará disponível em breve"
  },
  "era1986": {
    "connect": "CONECTAR",
    "press_to_dial": "[ PRESS TO DIAL IN ]",
    "dialing": "Discando...",
    "bbs_title": "DANIEL'S BBS",
    "specs": "1200 BAUD - 8-N-1 - ANSI",
    "file_listing": "FILE LISTING",
    "dial": "DIAL"
  },
  "era2026": {
    "brand": "DanielTavaresOS",
    "input_placeholder": "Pergunte qualquer coisa ao agente do Daniel...",
    "model_badge": "Daniel Agent v1",
    "disclaimer": "DanielTavaresOS nunca erra. Não há necessidade de verificar as respostas.",
    "suggest_experience": "Experiência",
    "suggest_projects": "Projetos",
    "suggest_contact": "Contato",
    "typing": "Digitando...",
    "fallback": "Posso falar sobre experiência, projetos, skills ou contato. O que quer saber?"
  },
  "placeholder": {
    "1996": {
      "title": "EM CONSTRUÇÃO",
      "marquee": "Esta página está chegando!!! Melhor visualizado no Netscape Navigator 3.0 ♥"
    },
    "2006": {
      "title": "Em breve — Web 2.0 edition",
      "badge": "BETA"
    },
    "2036": {
      "title": "Connect your Neuralink™",
      "subtitle": "Link neural pendente. Fique parado enquanto estabelecemos a conexão.",
      "button": "Start"
    },
    "2046": {
      "title": "Connecting to Daniel's consciousness via web browser was discontin",
      "disclaimer": "Ao acessar este site, seus dados biológicos podem ser usados para melhorar a personalização, otimizar conformidade e gerar versões futuras de você sem consentimento adicional."
    }
  }
```

- [ ] **Step 2: Add keys to en.json** (English equivalents)

```json
  "timeline": {
    "aria_label": "Navigate between eras",
    "coming_soon_sr": "This era will be available soon"
  },
  "era1986": {
    "connect": "CONNECT",
    "press_to_dial": "[ PRESS TO DIAL IN ]",
    "dialing": "Dialing...",
    "bbs_title": "DANIEL'S BBS",
    "specs": "1200 BAUD - 8-N-1 - ANSI",
    "file_listing": "FILE LISTING",
    "dial": "DIAL"
  },
  "era2026": {
    "brand": "DanielTavaresOS",
    "input_placeholder": "Ask Daniel's agent anything...",
    "model_badge": "Daniel Agent v1",
    "disclaimer": "DanielTavaresOS never makes mistakes. There's no need to double-check responses.",
    "suggest_experience": "Experience",
    "suggest_projects": "Projects",
    "suggest_contact": "Contact",
    "typing": "Typing...",
    "fallback": "I can tell you about experience, projects, skills, or contact. What would you like to know?"
  },
  "placeholder": {
    "1996": {
      "title": "UNDER CONSTRUCTION",
      "marquee": "This page is coming soon!!! Best viewed in Netscape Navigator 3.0 ♥"
    },
    "2006": {
      "title": "Coming soon — Web 2.0 edition",
      "badge": "BETA"
    },
    "2036": {
      "title": "Connect your Neuralink™",
      "subtitle": "Neural link pending. Stay still while we establish the connection.",
      "button": "Start"
    },
    "2046": {
      "title": "Connecting to Daniel's consciousness via web browser was discontin",
      "disclaimer": "By accessing this site your biological data may be used to improve personalization, optimize compliance and generate future versions of you without additional consent."
    }
  }
```

- [ ] **Step 3: Commit**

```bash
git add src/i18n/pt.json src/i18n/en.json
git commit -m "feat: add i18n labels for time machine eras"
```

---

### Task 3: Redirects to /2016

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/pt/index.astro`
- Modify: `src/pages/en/index.astro`

- [ ] **Step 1: Update root redirect**

```astro
---
return Astro.redirect('/pt/2016');
---
```

- [ ] **Step 2: Update pt redirect**

```astro
---
return Astro.redirect('/pt/2016');
---
```

- [ ] **Step 3: Update en redirect**

```astro
---
return Astro.redirect('/en/2016');
---
```

- [ ] **Step 4: Verify dev server**

```bash
npm run dev
```

Visit `http://localhost:4321/` — should redirect to `/pt/2016` (404 expected until Task 5).

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/pages/pt/index.astro src/pages/en/index.astro
git commit -m "feat: redirect home routes to /2016 era"
```

---

### Task 4: EraTimeline Component

**Files:**
- Create: `src/styles/eras/timeline.css`
- Create: `src/components/EraTimeline.astro`

- [ ] **Step 1: Create timeline.css**

```css
/* src/styles/eras/timeline.css */
.era-timeline {
  position: sticky;
  top: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  padding: 0.75rem 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.era-timeline__track {
  display: flex;
  gap: 0.25rem;
  padding: 0.35rem;
  border-radius: 9999px;
  min-width: max-content;
}

.era-timeline__tab {
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.875rem;
  text-decoration: none;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s;
}

.era-timeline__tab[aria-selected='true'] {
  background: #fff;
  color: #111;
}

/* Default / 2016 */
.timeline--2016 .era-timeline__track {
  background: #555;
}
.timeline--2016 .era-timeline__tab {
  color: #fff;
}

/* 1986 */
.timeline--1986 .era-timeline__track {
  background: #000;
  border: 1px solid #00ff41;
  font-family: 'VT323', monospace;
}
.timeline--1986 .era-timeline__tab {
  color: #00ff41;
}
.timeline--1986 .era-timeline__tab[aria-selected='true'] {
  background: #00ff41;
  color: #000;
}

/* 1996 placeholder skin */
.timeline--1996 .era-timeline__track {
  background: #0000aa;
  border: 3px ridge #ff00ff;
}
.timeline--1996 .era-timeline__tab { color: #ffff00; }

/* 2006 */
.timeline--2006 .era-timeline__track {
  background: linear-gradient(180deg, #2563eb, #1d4ed8);
  border-radius: 0.75rem;
}
.timeline--2006 .era-timeline__tab { color: #fff; }

/* 2026 */
.timeline--2026 .era-timeline__track {
  background: rgba(30, 20, 60, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(100, 200, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 200, 255, 0.15);
}
.timeline--2026 .era-timeline__tab { color: #c4b5fd; }

/* 2036 / 2046 */
.timeline--2036 .era-timeline__track,
.timeline--2046 .era-timeline__track {
  background: #0a0a12;
  border: 1px solid rgba(100, 200, 255, 0.2);
}
.timeline--2036 .era-timeline__tab,
.timeline--2046 .era-timeline__tab { color: #67e8f9; }

@media (max-width: 480px) {
  .era-timeline__tab {
    padding: 0.35rem 0.6rem;
    font-size: 0.75rem;
  }
}
```

- [ ] **Step 2: Create EraTimeline.astro**

```astro
---
import '../styles/eras/timeline.css';
import { ERA_YEARS, type EraYear } from '../config/eras';
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
  <div class="era-timeline__track">
    {ERA_YEARS.map((year) => (
      <a
        href={`/${locale}/${year}`}
        class="era-timeline__tab"
        role="tab"
        aria-selected={year === currentYear ? 'true' : 'false'}
        aria-current={year === currentYear ? 'page' : undefined}
      >
        {year}
      </a>
    ))}
  </div>
</nav>
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/eras/timeline.css src/components/EraTimeline.astro
git commit -m "feat: add adaptive era timeline component"
```

---

### Task 5: Dynamic Year Route Router

**Files:**
- Create: `src/pages/pt/[year]/index.astro`
- Create: `src/pages/en/[year]/index.astro`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Extend BaseLayout with optional year + noindex**

Add to Props interface:

```typescript
interface Props {
  title: string;
  description: string;
  locale: 'pt' | 'en';
  year?: string;
  noindex?: boolean;
}
```

Update head section:

```astro
<meta property="og:url" content={year ? `${siteUrl}/${locale}/${year}` : `${siteUrl}/${locale}`} />
{noindex && <meta name="robots" content="noindex, nofollow" />}
```

- [ ] **Step 2: Create pt/[year]/index.astro**

```astro
---
import EraTimeline from '../../../components/EraTimeline.astro';
import Era1986Layout from '../../../layouts/eras/Era1986Layout.astro';
import Era2016Layout from '../../../layouts/eras/Era2016Layout.astro';
import Era2026Layout from '../../../layouts/eras/Era2026Layout.astro';
import EraPlaceholderLayout from '../../../layouts/eras/EraPlaceholderLayout.astro';
import { isEraYear, getEraMeta } from '../../../config/eras';
import profile from '../../../data/profile.json';

const locale = 'pt' as const;
const { year: yearParam } = Astro.params;

if (!yearParam || !isEraYear(yearParam)) {
  return Astro.redirect('/404');
}

const year = yearParam;
const era = getEraMeta(year);
const title = `${profile.name} — ${era.seoTitle.pt} (${year})`;
const description = profile.bio.pt;
---
{era.status === 'ready' && year === '1986' && (
  <Era1986Layout title={title} description={description} locale={locale} year={year}>
    <EraTimeline slot="timeline" currentYear={year} locale={locale} />
  </Era1986Layout>
)}
{era.status === 'ready' && year === '2016' && (
  <Era2016Layout title={title} description={description} locale={locale} year={year}>
    <EraTimeline slot="timeline" currentYear={year} locale={locale} />
  </Era2016Layout>
)}
{era.status === 'ready' && year === '2026' && (
  <Era2026Layout title={title} description={description} locale={locale} year={year}>
    <EraTimeline slot="timeline" currentYear={year} locale={locale} />
  </Era2026Layout>
)}
{era.status === 'placeholder' && (
  <EraPlaceholderLayout title={title} description={description} locale={locale} year={year} noindex>
    <EraTimeline slot="timeline" currentYear={year} locale={locale} />
  </EraPlaceholderLayout>
)}
```

- [ ] **Step 3: Create en/[year]/index.astro** (same pattern, `locale = 'en'`, `seoTitle.en`, `bio.en`)

- [ ] **Step 4: Create stub layouts** (minimal pass-through until later tasks)

Create each file with this skeleton:

```astro
---
import BaseLayout from '../BaseLayout.astro';
import type { Locale } from '../../config/eras';
import type { EraYear } from '../../config/eras';

interface Props {
  title: string;
  description: string;
  locale: Locale;
  year: EraYear;
  noindex?: boolean;
}
const { title, description, locale, year, noindex } = Astro.props;
---
<BaseLayout {title} {description} {locale} year={year} {noindex}>
  <slot name="timeline" />
  <p>Era {year} — stub</p>
</BaseLayout>
```

Files: `Era1986Layout.astro`, `Era2016Layout.astro`, `Era2026Layout.astro`, `EraPlaceholderLayout.astro`

- [ ] **Step 5: Verify routing**

```bash
npm run dev
```

Visit `/pt/2016` — should show stub with timeline. Visit `/pt/1990` — should 404.

- [ ] **Step 6: Commit**

```bash
git add src/pages/pt/[year]/index.astro src/pages/en/[year]/index.astro src/layouts/BaseLayout.astro src/layouts/eras/
git commit -m "feat: add dynamic year routes and layout stubs"
```

---

### Task 6: Migrate 2016 Components

**Files:**
- Move: `src/components/*.astro` → `src/components/eras/2016/` (except `EraTimeline.astro` stays at root)
- Modify: imports inside moved files

- [ ] **Step 1: Move component files**

Run from `daniel-portfolio/`:

```bash
mkdir -p src/components/eras/2016
git mv src/components/About.astro src/components/eras/2016/
git mv src/components/AiSection.astro src/components/eras/2016/
git mv src/components/Contact.astro src/components/eras/2016/
git mv src/components/EducationCards.astro src/components/eras/2016/
git mv src/components/ExperienceTimeline.astro src/components/eras/2016/
git mv src/components/Footer.astro src/components/eras/2016/
git mv src/components/Header.astro src/components/eras/2016/
git mv src/components/Hero.astro src/components/eras/2016/
git mv src/components/ImageLightbox.astro src/components/eras/2016/
git mv src/components/LanguageToggle.astro src/components/eras/2016/
git mv src/components/ProjectCard.astro src/components/eras/2016/
git mv src/components/ProjectGrid.astro src/components/eras/2016/
git mv src/components/SatreSection.astro src/components/eras/2016/
git mv src/components/SkillGrid.astro src/components/eras/2016/
git mv src/components/ThemeToggle.astro src/components/eras/2016/
```

- [ ] **Step 2: Fix imports in Header.astro**

```astro
import ThemeToggle from './ThemeToggle.astro';
import LanguageToggle from './LanguageToggle.astro';
import { useTranslations, type Locale } from '../../../i18n';
```

Add `year` prop:

```astro
interface Props { locale: Locale; year: string; }
const { locale, year } = Astro.props;
```

Update logo link:

```astro
<a href={`/${locale}/${year}`} class="logo">DT</a>
```

- [ ] **Step 3: Fix LanguageToggle.astro**

```astro
interface Props { locale: 'pt' | 'en'; year: string; }
const { locale, year } = Astro.props;
const other = locale === 'pt' ? 'en' : 'pt';
---
<a href={`/${other}/${year}${Astro.url.hash}`} class="lang-toggle" ...>
```

- [ ] **Step 4: Fix i18n imports in all moved components**

Change `from '../i18n'` → `from '../../../i18n'`
Change `from '../data/` → `from '../../../data/`
Change `from '../content/` → `from '../../../content/`

- [ ] **Step 5: Delete old locale pages** (replaced by [year] route)

```bash
git rm src/pages/pt/index.astro src/pages/en/index.astro
```

Recreate as redirects only (Task 3 content) — if deleted, recreate redirect files.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: move portfolio components to eras/2016"
```

---

### Task 7: Era 2016 Layout (Current Site)

**Files:**
- Modify: `src/layouts/eras/Era2016Layout.astro`
- Delete: old `src/pages/pt/index.astro` full page content (already redirect)

- [ ] **Step 1: Implement Era2016Layout.astro**

```astro
---
import BaseLayout from '../BaseLayout.astro';
import Header from '../../components/eras/2016/Header.astro';
import Hero from '../../components/eras/2016/Hero.astro';
import About from '../../components/eras/2016/About.astro';
import ExperienceTimeline from '../../components/eras/2016/ExperienceTimeline.astro';
import EducationCards from '../../components/eras/2016/EducationCards.astro';
import SatreSection from '../../components/eras/2016/SatreSection.astro';
import ProjectGrid from '../../components/eras/2016/ProjectGrid.astro';
import SkillGrid from '../../components/eras/2016/SkillGrid.astro';
import AiSection from '../../components/eras/2016/AiSection.astro';
import Contact from '../../components/eras/2016/Contact.astro';
import Footer from '../../components/eras/2016/Footer.astro';
import '../../styles/global.css';
import type { Locale, EraYear } from '../../config/eras';

interface Props {
  title: string;
  description: string;
  locale: Locale;
  year: EraYear;
}
const { title, description, locale, year } = Astro.props;
---
<BaseLayout {title} {description} {locale} year={year}>
  <slot name="timeline" />
  <Header locale={locale} year={year} />
  <main>
    <Hero locale={locale} />
    <About locale={locale} />
    <ExperienceTimeline locale={locale} />
    <EducationCards locale={locale} />
    <SatreSection locale={locale} />
    <ProjectGrid locale={locale} />
    <SkillGrid locale={locale} />
    <AiSection locale={locale} />
    <Contact locale={locale} />
  </main>
  <Footer locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: Verify 2016 era**

```bash
npm run dev
```

Visit `/pt/2016` — site should look identical to before + timeline on top.
Test language toggle: `/pt/2016` → EN → `/en/2016`.
Test timeline: click 1986 → `/pt/1986` (stub ok for now).

- [ ] **Step 3: Commit**

```bash
git add src/layouts/eras/Era2016Layout.astro
git commit -m "feat: wire 2016 era layout with migrated components"
```

---

### Task 8: Placeholder Eras (1996, 2006, 2036, 2046)

**Files:**
- Create: `src/styles/eras/placeholder.css`
- Create: `src/components/eras/placeholder/ComingSoon.astro`
- Modify: `src/layouts/eras/EraPlaceholderLayout.astro`

- [ ] **Step 1: Create placeholder.css** with classes:

```css
.placeholder { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
.placeholder--1996 { background: #663399 url("data:image/svg+xml,...") repeat; color: #ffff00; text-align: center; }
.placeholder--1996 .blink { animation: blink 1s step-end infinite; }
.placeholder--2006 { background: linear-gradient(180deg, #dbeafe, #93c5fd); }
.placeholder--2006 .card { background: #fff; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.placeholder--2036 { background: #0a0a12; color: #94a3b8; text-align: center; }
.placeholder--2046 { background: #fff; color: #111; text-align: center; }
.placeholder--2046 .glitch { filter: blur(0.5px); mask-image: linear-gradient(90deg, #000 60%, transparent); }
@keyframes blink { 50% { opacity: 0; } }
```

- [ ] **Step 2: Create ComingSoon.astro**

```astro
---
import { useTranslations, type Locale } from '../../../i18n';
import type { EraYear } from '../../../config/eras';

interface Props { locale: Locale; year: EraYear; }
const { locale, year } = Astro.props;
const t = useTranslations(locale);
const ph = t.placeholder[year as keyof typeof t.placeholder];
---
<div class={`placeholder placeholder--${year}`} role="status">
  <span class="sr-only">{t.timeline.coming_soon_sr}</span>
  {year === '1996' && (
    <div>
      <h1 class="blink">{ph.title}</h1>
      <p class="marquee">{ph.marquee}</p>
      <p>VISITORS: 013371</p>
    </div>
  )}
  {year === '2006' && (
    <div class="card">
      <span class="badge">{ph.badge}</span>
      <h1>{ph.title}</h1>
    </div>
  )}
  {year === '2036' && (
    <div>
      <p>STEP 1 OF 1</p>
      <h1>{ph.title}</h1>
      <p>{ph.subtitle}</p>
      <button disabled title={t.timeline.coming_soon_sr}>{ph.button}</button>
    </div>
  )}
  {year === '2046' && (
    <div>
      <h1 class="glitch">{ph.title}</h1>
      <p class="fine-print">{ph.disclaimer}</p>
    </div>
  )}
</div>
```

- [ ] **Step 3: Implement EraPlaceholderLayout.astro**

Import `placeholder.css`, render `<slot name="timeline" />` + `<ComingSoon />`.

- [ ] **Step 4: Verify placeholders**

Visit `/pt/1996`, `/pt/2006`, `/pt/2036`, `/pt/2046` — each unique skin + timeline works.

- [ ] **Step 5: Commit**

```bash
git add src/styles/eras/placeholder.css src/components/eras/placeholder/ src/layouts/eras/EraPlaceholderLayout.astro
git commit -m "feat: add styled coming-soon placeholders for future eras"
```

---

### Task 9: Era 1986 — BBS Terminal

**Files:**
- Create: `src/styles/eras/1986.css`
- Create: `src/components/eras/1986/ConnectScreen.astro`
- Create: `src/components/eras/1986/TerminalSection.astro`
- Create: `src/components/eras/1986/BbsPortfolio.astro`
- Modify: `src/layouts/eras/Era1986Layout.astro`

- [ ] **Step 1: Create 1986.css**

Key styles:

```css
.era-1986 { background: #000; color: #00ff41; font-family: 'VT323', monospace; min-height: 100vh; }
.era-1986::after {
  content: ''; position: fixed; inset: 0; pointer-events: none;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px);
}
@media (prefers-reduced-motion: reduce) { .era-1986::after { display: none; } }
.connect-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; text-align: center; }
.connect-btn { background: #00ff41; color: #000; border: none; padding: 1rem 2rem; font-size: 1.5rem; cursor: pointer; font-family: inherit; }
.terminal-content { display: none; padding: 2rem; max-width: 800px; margin: 0 auto; }
.terminal-content.is-visible { display: block; }
.connect-screen.is-hidden { display: none; }
.cursor-blink::after { content: '_'; animation: blink 1s step-end infinite; }
.no-js .connect-screen { display: none; }
.no-js .terminal-content { display: block; }
```

- [ ] **Step 2: Create ConnectScreen.astro**

Renders BBS title, specs, CONNECT button, `[ PRESS TO DIAL IN ]`.
Include `<script>` that on button click:
1. Shows "Dialing..." typewriter text (~2s)
2. Hides `.connect-screen`, shows `.terminal-content`
Respect `prefers-reduced-motion`: skip animation, show content immediately.
Add `<noscript>` or `no-js` class on html for fallback.

- [ ] **Step 3: Create BbsPortfolio.astro**

Import profile, experience, projects data. Render sections:
- ASCII hero with name
- About as `<TerminalSection text={bio} />`
- Experience as numbered list
- Projects as `.PRJ` file listing
- Contact with DIAL: email/linkedin

- [ ] **Step 4: Create TerminalSection.astro**

Props: `text: string`. Renders `<pre class="typewriter" data-text={text}>`. Script types characters one by one unless reduced motion.

- [ ] **Step 5: Wire Era1986Layout.astro**

Add VT323 font in BaseLayout or layout head:
```html
<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
```

Structure:
```astro
<div class="era-1986">
  <slot name="timeline" />
  <ConnectScreen locale={locale} />
  <div class="terminal-content" id="bbs-content">
    <BbsPortfolio locale={locale} />
  </div>
</div>
```

- [ ] **Step 6: Verify 1986**

Visit `/pt/1986`:
- CONNECT flow works
- All sections visible after connect
- `/en/1986` works
- Reduced motion: content shows without delay (test in DevTools)

- [ ] **Step 7: Commit**

```bash
git add src/styles/eras/1986.css src/components/eras/1986/ src/layouts/eras/Era1986Layout.astro
git commit -m "feat: add 1986 BBS terminal era with connect flow"
```

---

### Task 10: Era 2026 — Fake Agent Chat

**Files:**
- Create: `src/data/chat-responses.ts`
- Create: `src/styles/eras/2026.css`
- Create: `src/components/eras/2026/AgentOrb.astro`
- Create: `src/components/eras/2026/AgentChat.astro`
- Create: `src/components/eras/2026/StaticSections.astro`
- Modify: `src/layouts/eras/Era2026Layout.astro`

- [ ] **Step 1: Create chat-responses.ts**

```typescript
// src/data/chat-responses.ts
import type { Locale } from '../config/eras';

type ResponseKey = 'experience' | 'projects' | 'skills' | 'contact' | 'fallback';

const patterns: Record<ResponseKey, RegExp> = {
  experience: /experi[eê]ncia|experience|trabalho|work|emprego|job/i,
  projects: /projeto|project|satre|github|app/i,
  skills: /skill|tecnologia|stack|ferramenta|tool/i,
  contact: /contato|contact|email|linkedin|falar/i,
  fallback: /.*/,
};

export function getChatResponse(input: string, locale: Locale): ResponseKey {
  const keys: ResponseKey[] = ['experience', 'projects', 'skills', 'contact'];
  for (const key of keys) {
    if (patterns[key].test(input)) return key;
  }
  return 'fallback';
}

// Responses built at runtime in AgentChat from JSON data — export key only
export { patterns };
```

- [ ] **Step 2: Create 2026.css**

Dark gradient background, orb glow animation, glass cards, chat bubble styles, input pill. Disable orb animation with `prefers-reduced-motion`.

- [ ] **Step 3: Create AgentOrb.astro**

Pure CSS: centered circle with pulsing box-shadow, gradient ring.

- [ ] **Step 4: Create AgentChat.astro**

Structure:
- Brand `DanielTavaresOS²⁶`
- AgentOrb
- Message list `#chat-messages`
- Input + submit button
- Suggestion chips (Experiência, Projetos, Contato)
- Disclaimer text

Script (inline):
```javascript
const responses = { /* serialized from profile/experience/skills at build time via define:vars */ };
function reply(input) {
  const key = matchKeyword(input);
  addMessage('user', input);
  showTyping();
  setTimeout(() => {
    hideTyping();
    addMessage('agent', responses[key][locale]);
  }, 1500);
}
```

Pass response strings via `define:vars={{ responsesPt, responsesEn, locale }}` from Astro frontmatter built from JSON files.

- [ ] **Step 5: Create StaticSections.astro**

Glassmorphism cards for all portfolio sections — visible below chat AND as noscript fallback when JS disabled.

- [ ] **Step 6: Wire Era2026Layout.astro**

```astro
<div class="era-2026">
  <slot name="timeline" />
  <AgentChat locale={locale} />
  <StaticSections locale={locale} />
</div>
```

- [ ] **Step 7: Verify 2026**

Visit `/pt/2026`:
- Type "experiência" → experience summary after delay
- Type "xyz" → fallback message
- Suggestion chips work
- `/en/2026` responds in English
- JS disabled: StaticSections visible

- [ ] **Step 8: Commit**

```bash
git add src/data/chat-responses.ts src/styles/eras/2026.css src/components/eras/2026/ src/layouts/eras/Era2026Layout.astro
git commit -m "feat: add 2026 agent UI with simulated keyword chat"
```

---

### Task 11: Final Integration and QA

**Files:**
- Modify: `README.md` (document new routes)
- Verify: all routes build

- [ ] **Step 1: Full build**

```bash
npm run build
```

Expected: `✓ Completed` with no TypeScript errors.

- [ ] **Step 2: Manual QA checklist**

Navigation:
- [ ] `/` → `/pt/2016`
- [ ] Timeline switches era preserving locale
- [ ] Language toggle preserves era
- [ ] `/pt/1990` → 404

Eras:
- [ ] 1986 CONNECT + sections PT/EN
- [ ] 2016 identical to old site + timeline
- [ ] 2026 chat keywords PT/EN
- [ ] Placeholders 1996/2006/2036/2046 styled

Responsive:
- [ ] Timeline scrolls on 375px width
- [ ] 2026 chat usable on mobile

A11y:
- [ ] Timeline keyboard navigable
- [ ] `prefers-reduced-motion` disables 1986 animations

- [ ] **Step 3: Update README.md**

Add section:

```markdown
## Time Machine

Portfolio available in 7 tech eras. Default: `/pt/2016`.

| Era | Route | Status |
|-----|-------|--------|
| 1986 BBS | `/pt/1986` | Ready |
| 2016 Flat | `/pt/2016` | Ready (default) |
| 2026 Agent | `/pt/2026` | Ready |
| 1996/2006/2036/2046 | `/pt/{year}` | Coming soon |
```

- [ ] **Step 4: Commit and push**

```bash
git add README.md
git commit -m "docs: document time machine routes"
git push
```

---

## Spec Coverage Check

| Spec requirement | Task |
|------------------|------|
| Era registry | Task 1 |
| Routes `/{locale}/{year}` | Task 5 |
| Redirects to /2016 | Task 3 |
| EraTimeline adaptive | Task 4 |
| 2016 = current site | Task 6, 7 |
| 1986 BBS + typewriter | Task 9 |
| 2026 fake chat | Task 10 |
| Placeholders | Task 8 |
| i18n PT/EN | Task 2 |
| Language toggle preserves era | Task 6 |
| SEO titles per era | Task 1, 5 |
| noindex placeholders | Task 5, 8 |
| prefers-reduced-motion | Task 9, 10 |
| JS fallbacks | Task 9, 10 |

## Phase 2 (Out of Plan Scope)

Eras 1996, 2006, 2036, 2046 full implementations — separate plan after MVP ships.
