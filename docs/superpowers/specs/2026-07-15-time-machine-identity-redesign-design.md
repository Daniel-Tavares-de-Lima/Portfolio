# Design Spec: Time Machine — Redesign de Identidade Visual

**Data:** 2026-07-15  
**Status:** Aprovado em brainstorming (aguardando review do arquivo)  
**Abordagem:** 1 — Nova pele, mesma estrutura  
**Projeto:** `daniel-portfolio/` (Astro 5, Vercel)  
**Relação com spec anterior:** Complementa e atualiza a intenção visual de `2026-06-25-time-machine-design.md` sem alterar a arquitetura de rotas/dados.

---

## 1. Objetivo

Manter a **ideia da máquina do tempo** (mesmo portfólio, sete eras) e trocar a **expressão visual e as metáforas**, para o site não parecer cópia de outra referência.

Fio condutor: **história pessoal da web** — cada ano evoca como a internet *parecia* naquela década, com o conteúdo e a voz do Daniel (Recife / full stack / SATRE).

**Tagline conceitual (proposta):** *"Mesmo eu. Outra década."*  
(Ajustável no i18n; não precisa ser literal na UI.)

---

## 2. Decisões de produto (brainstorming)

| Tópico | Decisão |
|--------|---------|
| Escopo do redesign | Visual + metáforas + timeline + rituais de entrada |
| Anos | Permanecem **1986, 1996, 2006, 2016, 2026, 2036, 2046** |
| Arquitetura | Permanecem rotas `/{locale}/{year}`, layouts isolados, JSON/content |
| Home | `/` e `/pt` → `/pt/2016` (2016 = portfólio canônico) |
| Idiomas | PT/EN em todas as eras, inclusive intros |
| Rituais de entrada | Manter função; reinventar visual e copy |
| Conteúdo textual do CV | Sem mudança de dados (bio, jobs, projects, etc.) |
| Fora de escopo | Novas eras, CMS, trocar stack, redesign profundo de dados |

---

## 3. O que fica vs. o que muda

### Fica
- Registry `src/config/eras.ts` e páginas `[year]`
- Conteúdo compartilhado (`src/data/*`, `content/projects`)
- Layouts por era + CSS por era
- Skip / `prefers-reduced-motion` onde já existir animação
- Chat 2026 pré-programado (sem API)

### Muda
- Componente/estilos da **timeline** (nova metáfora visual)
- Tokens, tipografia, texturas e layout de seções por era
- Copy dos rituais e labels de era no i18n
- Metáforas futuras (2036/2046) para não ecoar parody óbvia da referência

### Não fazer
- Remover a máquina do tempo
- Transformar 2016 numa “exposição” em vez de portfólio profissional
- Quebrar contraste, avatar ou ano ativo na timeline (bugs já conhecidos)

---

## 4. Timeline — “trilha de décadas”

### Conceito
Substituir o cluster de pills genéricas por uma **linha do tempo horizontal**:
- Anos como marcas (ticks) numa trilha
- Ano ativo: marca maior + rótulo curto da era (ex.: `2006 · Web`)
- Mesma estrutura HTML; variantes CSS por `timeline--{year}`
- Sticky no topo; scroll horizontal no mobile; ano ativo legível

### Acessibilidade
- `role="tablist"` / `role="tab"` / `aria-selected`
- Contraste do estado ativo **obrigatório** (evitar texto branco sobre pill branca)
- Foco visível por teclado

### Anti-cópia
- Sem cápsula única com pills brancas no estilo da referência
- Identidade da trilha muda com a era (terminal, 90s, glossy, flat, agent, neural, glitch)

---

## 5. Eras — pele e ritual

| Ano | Caracterização | Ritual |
|-----|----------------|--------|
| **1986** | Terminal/BBS: CRT, mono, typewriter | Handshake/discagem com copy própria; skip mantido |
| **1996** | Homepage pessoal 90s (tiled, marquee, counter) — layout próprio, não clone GeoCities | Loader dial-up; imagem progressiva |
| **2006** | Blog/Web 2.0 (gloss, badges, sidebar) — composição própria | Entrada direta; micro-interações ok |
| **2016** | Flat canônico — mudança mínima | Sem ritual |
| **2026** | UI de agente / chat | O chat é a entrada |
| **2036** | Link/firmware futurista — evitar parody Neuralink óbvia | Pairing reinventado (nome/copy próprios) |
| **2046** | Protocolo quebrado / stream | Intro glitch → conteúdo |

### Regras transversais
- Contraste legível em painéis e listas
- Toggle PT/EN nas intros (não só no conteúdo pós-ritual)
- Avatar: container com `overflow: hidden` + `object-position` que mostre o rosto
- Lightbox/interações existentes em 2006 podem permanecer se couberem na nova pele

---

## 6. Arquitetura técnica (sem mudança de forma)

```
src/
├── config/eras.ts              ← anos/status (inalterado em estrutura)
├── components/EraTimeline.astro ← redesign markup/CSS
├── styles/eras/timeline.css    ← variantes por era
├── layouts/eras/Era*Layout.astro
├── components/eras/{year}/
├── styles/eras/{year}.css
└── i18n/pt.json, en.json       ← novos labels de ritual/timeline
```

**Princípio:** dados centralizados; apresentação isolada. Redesign = CSS + copy + markup leve nos componentes de era/timeline. Sem migrar para outro framework.

---

## 7. Ordem de implementação

1. Timeline nova (todas as eras)
2. 1986 → 1996 → 2006
3. 2026
4. 2036 → 2046
5. Ajustes leves em 2016 (só se necessário para coesão)
6. QA: contraste, mobile, rituais, skip/a11y, PT/EN

---

## 8. Critérios de sucesso

- Visitante reconhece a máquina do tempo **sem** associar ao layout da referência
- Cada ano “cheira” à sua década; 2016 continua home profissional
- Rituais revelam conteúdo (sem tela vazia)
- PT/EN coerente nas intros
- Sem regressões: avatar cortado, texto ilegível, ano ativo invisível

---

## 9. Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| Redesign cosmético demais | Priorizar timeline + copy + layout de seções, não só hue-shift |
| Escopo crescer | Stick à abordagem 1; sem novos anos/features |
| 2036/2046 ainda “iguais à referência” | Renomear metáfora e UI de pairing/glitch na implementação |

---

## 10. Relação com o trabalho já feito

O MVP multi-era e o polish recente (skip 1986, contraste 1996/2006, lightbox, fixes 2036/2046) **permanecem como base**. Este redesign **substitui a identidade visual**, não descarta a infra.
