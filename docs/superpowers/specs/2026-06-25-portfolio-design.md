# Design Spec: Portfólio Pessoal — Daniel Tavares

**Data:** 2026-06-25  
**Status:** Aprovado pelo autor  
**Abordagem escolhida:** C — Híbrido (single-page por idioma + dados estruturados)

---

## 1. Objetivo

Criar um portfólio pessoal bilíngue (PT/EN) que funcione como:

1. **Ferramenta para recrutadores** — visão rápida e profissional de experiência, projetos e skills.
2. **Hub pessoal** — referência organizada de tudo que Daniel sabe e construiu, indo além do GitHub.

Hospedagem gratuita via Vercel, deploy automático a partir de repositório GitHub.

---

## 2. Requisitos funcionais

| Requisito | Detalhe |
|-----------|---------|
| Bilíngue | Rotas `/pt` e `/en`; toggle no header preserva scroll |
| Dual theme | Claro/escuro com toggle; `localStorage` + `prefers-color-scheme` na 1ª visita |
| Projetos curados | 10 projetos em destaque com descrição, stack, links e categoria |
| Seções | Hero, Sobre, Experiência, Formação, Projetos, Skills, IA & Automação, Contato |
| CV download | Link para PDF do currículo em `/public/cv-daniel-tavares.pdf` |
| Responsivo | Mobile-first; menu hambúrguer em telas pequenas |
| SEO básico | Meta tags, Open Graph, `lang` attribute por rota |

---

## 3. Stack técnica

| Camada | Tecnologia |
|--------|------------|
| Framework | Astro 5.x |
| Estilização | CSS custom properties (sem framework CSS externo na v1) |
| Conteúdo | Astro Content Collections (projetos) + JSON tipado (currículo) |
| i18n UI | Arquivos de tradução em `src/i18n/` |
| Deploy | Vercel (plano gratuito) |
| Repositório | GitHub — `Daniel-Tavares-de-Lima/portfolio` (nome sugerido) |

---

## 4. Arquitetura

```
daniel-portfolio/
├── src/
│   ├── content/
│   │   ├── config.ts              # Schema Content Collections
│   │   └── projects/              # 1 .md por projeto
│   │       ├── tickets-system.md
│   │       ├── beyond-corporate.md
│   │       └── ...
│   ├── data/
│   │   ├── profile.json           # Nome, bio, links, foto
│   │   ├── experience.json        # Timeline profissional
│   │   ├── education.json         # Formação acadêmica
│   │   ├── skills.json            # Skills categorizadas
│   │   └── ai-tools.json          # Seção IA & Automação
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── ExperienceTimeline.astro
│   │   ├── EducationCards.astro
│   │   ├── ProjectGrid.astro
│   │   ├── ProjectCard.astro
│   │   ├── SkillGrid.astro
│   │   ├── AiSection.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   ├── ThemeToggle.astro
│   │   └── LanguageToggle.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro            # Redirect para /pt (default)
│   │   ├── pt/index.astro
│   │   └── en/index.astro
│   ├── i18n/
│   │   ├── pt.json                # Labels de UI
│   │   └── en.json
│   └── styles/
│       ├── global.css
│       └── themes.css             # CSS variables light/dark
├── public/
│   ├── cv-daniel-tavares.pdf
│   ├── favicon.svg
│   └── avatar.jpg
├── astro.config.mjs
├── package.json
└── vercel.json
```

### Fluxo de dados

```
JSON/YAML (data/) ──→ Componentes Astro ──→ HTML estático
Content Collections (projects/) ──→ getCollection() ──→ ProjectGrid
i18n (pt.json/en.json) ──→ Labels de navegação e UI
```

Todo conteúdo é estático em build time. Não há backend, banco de dados ou API.

---

## 5. Layout e navegação

Single-page por idioma com scroll vertical e header sticky.

**Ordem das seções:** Hero → Sobre → Experiência → Formação → Projetos → Skills → IA & Automação → Contato → Footer

**Comportamentos:**
- Links de navegação usam âncoras (`#projects`) com scroll suave
- Seção ativa destacada no header via Intersection Observer
- Toggle idioma redireciona `/pt` ↔ `/en` mantendo hash da âncora
- Toggle tema alterna classe `data-theme` no `<html>` e persiste em `localStorage`
- Grid de projetos: 3 colunas (desktop), 2 (tablet), 1 (mobile)

---

## 6. Projetos curados (10)

| # | Slug | Título | Stack | Categoria | Links |
|---|------|--------|-------|-----------|-------|
| 1 | `tickets-system` | Sistema Distribuído de Tickets | Node.js, Vue.js, REST API | Acadêmico | GitHub (3 repos agrupados) |
| 2 | `beyond-corporate` | Sistema Corporativo de Formulários | Node.js, Sequelize, N8N | Profissional | Sem repo (descrito no site) |
| 3 | `vencife` | Vencife | Flutter, Dart | Acadêmico | GitHub |
| 4 | `senac-integrador` | Projeto Integrador SENAC | TypeScript, React | Acadêmico | GitHub + [Demo Vercel](https://sal-o-senac-projeto-integrador.vercel.app) |
| 5 | `todolist-api` | TodoList API | Java, Spring Boot | Pessoal | GitHub |
| 6 | `ml-boletos` | Detecção de Boletos (ML) | Python, Jupyter, ML | Acadêmico | GitHub |
| 7 | `analise-residuos` | Análise de Resíduos Sólidos | Python, Pandas, Jupyter | Pessoal | GitHub |
| 8 | `pwa-deploy` | PWA Deploy | Node.js, JavaScript | Acadêmico | GitHub (front + back) |
| 9 | `sistema-faturamento` | Sistema de Faturamento | Java, JavaFX | Acadêmico | GitHub |
| 10 | `petshop-mobile` | Petshop Mobile | CSS, Mobile | Acadêmico | GitHub |

### Schema do frontmatter (Content Collection)

```yaml
---
title:
  pt: "Sistema Distribuído de Tickets"
  en: "Distributed Ticket System"
description:
  pt: "Sistema completo com API REST, frontend Vue e serviço de notificações."
  en: "Full system with REST API, Vue frontend and notification service."
stack: ["Node.js", "Vue.js", "REST API", "JavaScript"]
category: "academic"          # professional | academic | personal
featured: true
order: 1
github: "https://github.com/Daniel-Tavares-de-Lima/API-de-Gerenciamento-de-Chamados"
demo: ""                      # URL opcional
relatedRepos:
  - "https://github.com/Daniel-Tavares-de-Lima/Tickets-Frontend-Sistema-Distribuido"
  - "https://github.com/Daniel-Tavares-de-Lima/Notification-Services"
---
```

Corpo do `.md` (opcional): case study expandido em PT; versão EN no frontmatter é suficiente na v1.

---

## 7. Conteúdo das seções (fonte: currículo)

### Experiência
1. **Beyond Co.** — Desenvolvedor Full Stack (Estágio), Out/2025 – Jun/2026
2. **Emlurb** — Estagiário de TI, Mai/2024 – Out/2025
3. **Seed a Bit Tecnologia** — Analista de Negócios, 2024

### Formação
1. **UFRPE** — Bacharelado em Ciência da Computação (previsão 2027.2)
2. **SENAC** — Tecnólogo em ADS — Embarque Digital (concluído)

### Skills (categorias)
- **Linguagens:** JavaScript, TypeScript, Python, SQL, Java
- **Frameworks/Ferramentas:** Node.js, Vue.js, Sequelize, N8N, Spring Boot, Flutter, Git, Docker, Postman
- **Conceitos:** APIs REST, Banco Relacional, Automação, IA Generativa, Metodologias Ágeis, Levantamento de Requisitos

### IA & Automação
- Ferramentas: Claude, ChatGPT, Gemini, GitHub Copilot
- Casos de uso: agentes para requisitos, automação de tarefas repetitivas, desenvolvimento assistido por IA

### Contato
- Email: danieltavareslima72@gmail.com
- LinkedIn: linkedin.com/in/danieltavareslima
- GitHub: github.com/Daniel-Tavares-de-Lima
- Telefone: (81) 9 9764-2392

---

## 8. Visual e tema

### Paleta
| Token | Light | Dark |
|-------|-------|------|
| `--bg-primary` | `#FFFFFF` | `#0F172A` |
| `--text-primary` | `#1E293B` | `#F1F5F9` |
| `--text-secondary` | `#64748B` | `#94A3B8` |
| `--accent` | `#3B82F6` | `#60A5FA` |
| `--border` | `#E2E8F0` | `#334155` |
| `--card-bg` | `#F8FAFC` | `#1E293B` |

### Tipografia
- Corpo: **Inter** (Google Fonts)
- Código/tags: **JetBrains Mono**

### Estilo
Minimalista dev: cards com borda sutil, hover leve, timeline vertical na experiência, tags coloridas por categoria de skill.

---

## 9. i18n

- **Rotas:** `/pt/index.astro` e `/en/index.astro` — páginas espelhadas
- **Conteúdo dinâmico:** campos `{ pt, en }` nos JSON e frontmatter dos projetos
- **UI estática:** `src/i18n/pt.json` e `en.json` para labels (ex: "Ver projeto", "Baixar CV")
- **Default:** redirect de `/` para `/pt`
- **Toggle:** link `<a href="/en#projects">` preservando hash

---

## 10. Deploy e domínio

1. Criar repo `portfolio` no GitHub
2. Conectar ao Vercel (import from GitHub)
3. Build command: `npm run build` | Output: `dist`
4. Deploy automático a cada push na branch `main`
5. URL gratuita: `daniel-tavares.vercel.app` (ou similar)
6. Domínio customizado (opcional, futuro): `danieltavares.dev`

---

## 11. Manutenção

Para adicionar um projeto: criar `src/content/projects/novo-projeto.md` com frontmatter bilíngue.

Para atualizar experiência/skills: editar JSON em `src/data/`.

Para atualizar CV: substituir `public/cv-daniel-tavares.pdf`.

Push na `main` → deploy automático em ~1 minuto.

---

## 12. Fora de escopo (v1)

- Blog ou artigos
- CMS headless (Sanity, Contentful)
- Formulário de contato com backend (usar mailto: ou links diretos)
- Analytics (pode adicionar Vercel Analytics depois)
- Testes automatizados E2E
- Página de todos os 48 repos do GitHub

---

## 13. Critérios de sucesso

- [ ] Site acessível em URL pública via Vercel
- [ ] Toggle PT/EN funcional em todas as seções
- [ ] Toggle claro/escuro persistente
- [ ] 10 projetos exibidos com links corretos
- [ ] Responsivo em mobile (375px+) e desktop
- [ ] Lighthouse Performance > 90
- [ ] Link para download do CV PDF funcional
