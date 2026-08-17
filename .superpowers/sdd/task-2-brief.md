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
- Per-era skins via `.timeline--1986` â€¦ `.timeline--2046` (terminal / 90s / glossy / flat / agent / firmware / glitch)
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
