### Task 1: Era short labels + i18n for timeline

**Files:**
- Modify: `daniel-portfolio/src/config/eras.ts`
- Modify: `daniel-portfolio/src/i18n/pt.json`
- Modify: `daniel-portfolio/src/i18n/en.json`

**Interfaces:**
- Consumes: existing `ERAS` registry shape
- Produces: each era has `shortLabel: { pt: string; en: string }` used by timeline as `2006 Â· Web`

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
  shortLabel: { pt: 'PortfÃ³lio', en: 'Portfolio' },
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
  "coming_soon_sr": "Esta era estarÃ¡ disponÃ­vel em breve",
  "active_format": "{year} Â· {short}"
}
```

EN:

```json
"timeline": {
  "aria_label": "Browse eras",
  "coming_soon_sr": "This era will be available soon",
  "active_format": "{year} Â· {short}"
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
