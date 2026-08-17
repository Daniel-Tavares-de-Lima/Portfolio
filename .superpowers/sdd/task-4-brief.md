### Task 4: Reskin era 1996 (personal homepage)

**Files:**
- Modify: `daniel-portfolio/src/styles/eras/1996.css`
- Modify: `daniel-portfolio/src/components/eras/1996/*` (banner/marquee/sidebar/content as needed)
- Modify: `daniel-portfolio/src/i18n/pt.json` / `en.json` (`era1996`)

**Interfaces:**
- Consumes: existing GeoLoader + dial-up avatar reveal
- Produces: same IDs for loader/avatar scripts

- [ ] **Step 1: Soften â€œGeoCities cloneâ€ signals in copy**

Rename banner/menu voice toward â€œhomepage pessoal 96â€ (still kitschy, but original wording). Keep visitor counter & marquee as era-authentic devices.

- [ ] **Step 2: Restructure section skins**

Keep alternating readable light panels (spec contrast rule). Change border/title language so it isnâ€™t a 1:1 of previous GeoCities frame. Preserve `section-plain` / forced light colors if dark-mode inversion was an issue.

- [ ] **Step 3: Build + manual**

`/pt/1996` â€” loader, avatar reveal, readable SATRE/skills, scrollbar still ok if present.

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: reskin 1996 personal homepage era"
```

(Prefer explicit `git add` of touched files.)

---
