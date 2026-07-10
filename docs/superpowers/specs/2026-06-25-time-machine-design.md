# Design Spec: Time Machine — Portfólio Multi-Era

**Data:** 2026-06-25  
**Status:** Aprovado pelo autor  
**Abordagem escolhida:** A — Rotas por era + layouts isolados  
**Projeto base:** `daniel-portfolio/` (Astro 5, Vercel)

---

## 1. Objetivo

Transformar o portfólio existente em uma **máquina do tempo**: sete versões visuais do mesmo site, cada uma evocando a estética e os clichês de uma década da tecnologia. O visitante navega entre eras por uma barra de timeline fixa no topo.

**Tagline conceitual:** *"This is not a portfolio. It's a time machine."*

Inspiração visual: portfólio Pedro Belleza (timeline de anos com skins distintas).

---

## 2. Decisões de produto (brainstorming)

| Tópico | Decisão |
|--------|---------|
| Site atual | Corresponde à era **2016** (flat design) |
| Conteúdo | **Mesmo em todas as eras** — bio, experiência, projetos, SATRE, skills |
| Idiomas | PT/EN em **todas** as eras |
| Rotas | `/{locale}/{year}` — ex.: `/pt/2016`, `/en/2026` |
| Home padrão | `/`, `/pt` → redirect `/pt/2016`; `/en` → redirect `/en/2016` |
| Barra timeline | Fixa no topo; **estilo adapta** conforme era ativa |
| MVP (Fase 1) | Eras **1986**, **2016**, **2026** + placeholders |
| Anos restantes | Visíveis e clicáveis → tela "Coming soon" estilizada |
| Chat 2026 | **Só visual** — respostas pré-programadas por keyword, sem API |
| Fase 2 | Eras 1996, 2006, 2036, 2046 substituem placeholders |

---

## 3. Eras — visão geral

| Ano | Estética | Status Fase 1 |
|-----|----------|---------------|
| **1986** | BBS/terminal CRT, verde fosforescente, scanlines, typewriter | Ready |
| **1996** | GeoCities: tiled bg, GIFs, visitor counter, marquee | Placeholder |
| **2006** | Web 2.0: gradientes, rounded corners, tag cloud, badges RSS | Placeholder |
| **2016** | Flat design minimalista (site atual) | Ready |
| **2026** | Agente IA: orb glow, chat simulado, glassmorphism | Ready |
| **2036** | Futurista Neuralink-style: holograma, pairing flow | Placeholder |
| **2046** | Ultra-futurista: glitch, consciência, disclaimer biológico | Placeholder |

---

## 4. Stack e princípios arquiteturais

| Princípio | Detalhe |
|-----------|---------|
| Framework | Astro 5.x (existente) |
| Dados | JSON + Content Collections — **sem alteração** |
| Separação | Dados centralizados; apresentação isolada por era |
| CSS | Arquivo por era, importado no layout correspondente |
| JS | Mínimo e client-side apenas onde necessário (1986 typewriter, 2026 chat) |
| i18n | Labels de timeline, chat e placeholders em `src/i18n/` |

---

## 5. Arquitetura de arquivos

```
src/
├── config/
│   └── eras.ts                    # Registry: anos, status, metadados SEO
├── layouts/
│   ├── BaseLayout.astro           # html/head/SEO (existente)
│   └── eras/
│       ├── Era1986Layout.astro
│       ├── Era2016Layout.astro
│       ├── Era2026Layout.astro
│       └── EraPlaceholderLayout.astro
├── components/
│   ├── EraTimeline.astro          # Barra de anos (variante CSS por era)
│   └── eras/
│       ├── 1986/                  # ConnectScreen, TypewriterText, seções terminal
│       ├── 2016/                  # Componentes atuais migrados (sem mudança visual)
│       └── 2026/                  # AgentOrb, ChatInput, ChatMessages, FakeAgent
├── pages/
│   ├── index.astro                # redirect → /pt/2016
│   ├── pt/
│   │   ├── index.astro            # redirect → /pt/2016
│   │   └── [year]/index.astro
│   └── en/
│       ├── index.astro            # redirect → /en/2016
│       └── [year]/index.astro
└── styles/
    └── eras/
        ├── timeline.css
        ├── 1986.css
        ├── 2016.css
        └── 2026.css
```

### Registry de eras (`config/eras.ts`)

```ts
export const ERAS = {
  '1986': { status: 'ready',       label: '1986' },
  '1996': { status: 'placeholder', label: '1996' },
  '2006': { status: 'placeholder', label: '2006' },
  '2016': { status: 'ready',       label: '2016' },
  '2026': { status: 'ready',       label: '2026' },
  '2036': { status: 'placeholder', label: '2036' },
  '2046': { status: 'placeholder', label: '2046' },
} as const;

export type EraYear = keyof typeof ERAS;
export type EraStatus = 'ready' | 'placeholder';
```

### Fluxo da rota `[year]/index.astro`

1. Lê `locale` + `year` dos params
2. Valida `year` contra `ERAS` — inválido → 404
3. `status === 'placeholder'` → `EraPlaceholderLayout` com skin da era
4. `status === 'ready'` → layout correspondente (1986 | 2016 | 2026)
5. Injeta `EraTimeline` no topo (`currentYear`, `locale`)
6. Repassa `locale` a todos os componentes de conteúdo

---

## 6. Componente EraTimeline

Barra compartilhada, sempre visível:

- Renderiza os 7 anos em ordem cronológica
- Ano ativo = pill branca com texto escuro (referência Pedro Belleza)
- Links: `/{locale}/{year}` — preserva idioma ao trocar era
- Classe `timeline--{year}` adapta aparência da barra inteira

| Era ativa | Estilo da barra |
|-----------|-----------------|
| 1986 | Fundo preto, texto verde fosforescente, fonte monoespaçada |
| 1996 | Borda pixelada colorida, fundo azul |
| 2006 | Gradiente azul, cantos arredondados |
| 2016 | Cinza neutro (referência) |
| 2026 | Glassmorphism escuro, glow cyan sutil |
| 2036/2046 | Variantes futuristas |

**A11y:** `role="tablist"`, anos como `role="tab"`, `aria-selected` no ativo. Scroll horizontal em telas < 480px.

---

## 7. Design por era (Fase 1)

### 7.1 — 1986: BBS / Terminal CRT

**Paleta:** fundo `#000`, texto `#00FF41`, fonte VT323 ou Press Start 2P.

**Efeitos:** overlay scanlines (CSS), bloom sutil, cursor piscando `_`.

**Fluxo:**
1. Tela inicial "CONNECT": título `DANIEL'S BBS`, specs `1200 BAUD - 8-N-1 - ANSI`, botão `► CONNECT`
2. Clique → animação "dialing..." (~2s typewriter) → reveal do conteúdo
3. Seções em blocos de terminal com typewriter letra a letra

**Mapeamento de seções:**

| Seção | Versão 1986 |
|-------|-------------|
| Hero | ASCII art do nome + cargo |
| About | Bloco typewriter |
| Experience | Lista numerada estilo BBS board |
| Projects | "FILE LISTING" com nomes `.PRJ` |
| Contact | `DIAL:` com email/LinkedIn disfarçados |

**Fallback JS off:** conteúdo visível direto, sem animação connect.

**Reduced motion:** typewriter instantâneo; scanlines desligadas.

---

### 7.2 — 2016: Site atual

**Conceito:** portfólio existente sem mudança visual.

**Mudanças:** rota `/pt/2016`, barra timeline no topo, componentes em `components/eras/2016/`.

**Mantidos:** toggle PT/EN, toggle claro/escuro, lightbox SATRE, navegação por âncoras.

---

### 7.3 — 2026: Agente IA (UI simulada)

**Layout:** tela escura, orb central pulsante (CSS gradient cyan → purple), branding `DanielTavaresOS²⁶`.

**Elementos:**
- Input pill: placeholder "Ask Daniel's agent anything..."
- Badge fictício: `Daniel Agent v1`
- Disclaimer satírico: *"DanielTavaresOS never makes mistakes."*
- Botões de sugestão: "Experiência", "Projetos", "Contato"

**Chat simulado (client-side, ~2KB):**

| Input contém | Resposta |
|--------------|----------|
| experiência, experience, trabalho, work | Resumo da timeline |
| projeto, project, SATRE | Projetos destacados |
| skill, tecnologia, stack | Skills principais |
| contato, contact, email | Links de contato |
| fallback | Prompt listando tópicos disponíveis |

- Delay ~1.5s + typing indicator antes da resposta
- Respostas em PT ou EN conforme locale
- Links internos nas respostas levam a âncoras com cards glassmorphism

**Fallback JS off:** seções estáticas glassmorphism abaixo do orb.

---

### 7.4 — Placeholders (1996, 2006, 2036, 2046)

Tela única "Coming soon" com skin da era. Timeline funcional para voltar às eras prontas. Meta `noindex`.

| Era | Visual placeholder |
|-----|-------------------|
| 1996 | Tiled roxo, "UNDER CONSTRUCTION" piscando, visitor counter fake, marquee |
| 2006 | Card Web 2.0 gradiente azul, badge "BETA" |
| 2036 | Wireframe holográfico, "Neural link pending...", botão Start desabilitado |
| 2046 | Texto glitch truncado, disclaimer biológico satírico |

---

## 8. Rotas e redirects

| Rota | Comportamento |
|------|---------------|
| `/` | 302 → `/pt/2016` |
| `/pt` | 302 → `/pt/2016` |
| `/en` | 302 → `/en/2016` |
| `/pt/{year}` | Era correspondente ou 404 |
| `/en/{year}` | Era correspondente ou 404 |

Rotas `/pt` e `/en` como página completa **deixam de existir** — viram redirects.

Language toggle preserva era: `/pt/2016` → EN → `/en/2016`.

---

## 9. SEO

| Item | Detalhe |
|------|---------|
| Title por era | Ex.: `"Daniel Tavares — BBS Edition (1986)"` |
| og:url | `/{locale}/{year}` |
| Canonical | Mesma URL da página |
| Sitemap | `/pt/2016`, `/en/2016` como principais |
| Placeholders | `noindex, nofollow` |

---

## 10. Acessibilidade

- Timeline navegável por teclado
- 1986: `prefers-reduced-motion` desliga typewriter e scanlines
- 2026: input com label acessível; chat navegável por teclado
- Placeholders: mensagem clara para screen readers ("Esta era estará disponível em breve")
- Contraste WCAG AA onde aplicável

---

## 11. Performance

- CSS por era importado apenas no layout da era
- Fontes condicionais por layout (1986: VT323; 2016/2026: Inter)
- Chat 2026: zero requests externos
- GIFs/imagens pesadas reservados para Fase 2 com lazy load

---

## 12. Fases de entrega

### Fase 1 — MVP

- Infra: `eras.ts`, rotas `[year]`, redirects, `EraTimeline`
- Era 1986 completa
- Era 2016 (refatoração do site atual)
- Era 2026 (agent UI + chat simulado)
- Placeholders estilizados para 1996, 2006, 2036, 2046
- i18n: labels timeline, chat, placeholders

**Critério de pronto:** navegação entre 7 eras via timeline; conteúdo completo em 1986/2016/2026; placeholders funcionais.

### Fase 2 — Eras restantes

| Era | Escopo |
|-----|--------|
| 1996 | GeoCities completo: sidebar, GIFs, visitor counter, marquee |
| 2006 | Web 2.0: tag cloud, badges RSS/Flickr, layout two-column |
| 2036 | Neuralink-style: holograma, pairing flow |
| 2046 | Glitch/consciência: texto desbotando, disclaimer biológico |

Cada era substitui placeholder — mesma rota, `status: 'ready'` no registry.

---

## 13. Fora de escopo

- API/LLM real no chat 2026
- Persistência de era preferida (localStorage) — futuro
- Som/modem dial-up no 1986 — futuro
- Analytics por era — futuro
- Conteúdo diferente por era — explicitamente excluído

---

## 14. Checklist de testes (manual)

**Navegação:**
- [ ] Timeline troca era preservando locale
- [ ] Language toggle preserva era
- [ ] Redirects `/`, `/pt`, `/en` funcionam
- [ ] Ano inválido retorna 404

**Por era:**
- [ ] 1986: CONNECT → typewriter → seções PT e EN
- [ ] 2016: idêntico ao site atual + timeline
- [ ] 2026: chat responde keywords PT/EN; fallback ok
- [ ] Placeholders: skin correta + timeline funcional

**Responsivo:**
- [ ] Timeline scroll horizontal em mobile (< 480px)
- [ ] 2026 chat usável em 375px

**A11y:**
- [ ] `prefers-reduced-motion` desliga animações 1986
- [ ] Timeline navegável por teclado

---

## 15. Referências

- Portfólio Pedro Belleza — time machine concept (7 eras, timeline pill)
- Spec base: `docs/superpowers/specs/2026-06-25-portfolio-design.md`
- Implementação atual: `daniel-portfolio/`
