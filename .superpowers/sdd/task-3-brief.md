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
  "bbs_title": "ARQUIVO Â· DANIEL TAVARES",
  "specs": "RECIFE NODE Â· 8-N-1 Â· ANSI",
  "file_listing": "LISTAGEM",
  "dial": "LINK",
  "skip": "Pular animaÃ§Ã£o",
  "skip_hint": "ESC"
}
```

Mirror EN meaningfully (not literal machine translation of brand names).

- [ ] **Step 2: Visual reskin in `1986.css`**

Keep CRT idea but shift palette/details (e.g. amber phosphor option OR denser green with different panel chrome) so it doesnâ€™t match the reference layout. Preserve skip button styles and contrast.

- [ ] **Step 3: Build + verify ritual**

`npm run build`  
Manual: `/pt/1986` â€” handshake works; skip works; content appears.

- [ ] **Step 4: Commit**

```bash
git add src/styles/eras/1986.css src/components/eras/1986 src/i18n/pt.json src/i18n/en.json src/layouts/eras/Era1986Layout.astro
git commit -m "feat: reskin 1986 terminal era identity"
```

---
