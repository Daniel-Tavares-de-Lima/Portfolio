### Task 8: Reskin era 2036 (firmware / link â€” rename away from Neuralink parody)

**Files:**
- Modify: `daniel-portfolio/src/components/eras/2036/NeuralPairing.astro`
- Modify: `daniel-portfolio/src/components/eras/2036/NeuralContent.astro` (labels)
- Modify: `daniel-portfolio/src/styles/eras/2036.css`
- Modify: i18n `era2036` (PT+EN)
- Optionally rename display strings from `DanielLink` â†’ e.g. `DT-Link` / `ArquivoLink` / `NodePair` (pick one and use consistently)

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
  "subtitle": "Aproxime o mÃ³dulo DT-Link para sincronizar o arquivo Daniel Tavares. Fique parado durante o handshake.",
  "start": "Iniciar pareamento",
  "linking": "Sincronizando firmware...",
  "linked": "Pareamento concluÃ­do",
  "nav_label": "MÃ³dulos",
  "footer": "Â© 2036 DANIEL TAVARES",
  "location": "Recife, Pernambuco, Brasil"
}
```

- [ ] **Step 2: Reskin pairing UI (not the reference Start screen)**

Different layout hierarchy/colors; keep working `showContent()` query-at-click pattern.

- [ ] **Step 3: Build + click Start on `/pt/2036`** â€” content must appear (no blank screen)

- [ ] **Step 4: Commit**

```bash
git commit -m "feat: reskin 2036 as firmware pairing era"
```

---
