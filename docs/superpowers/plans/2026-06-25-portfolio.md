# Portfólio Pessoal — Daniel Tavares Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (PT/EN) Astro portfolio site with dual theme, 10 curated projects, and free Vercel hosting.

**Architecture:** Single-page per locale (`/pt`, `/en`) with structured JSON data for resume content and Astro Content Collections for projects. Static build, no backend. CSS custom properties for theming.

**Tech Stack:** Astro 5.x, TypeScript, CSS custom properties, Vercel

**Spec reference:** `docs/superpowers/specs/2026-06-25-portfolio-design.md`

---

## File Map

| Path | Responsibility |
|------|----------------|
| `src/styles/themes.css` | Light/dark CSS variables |
| `src/styles/global.css` | Reset, typography, layout utilities |
| `src/data/*.json` | Resume content (profile, experience, education, skills, AI) |
| `src/content/config.ts` | Content Collection schema for projects |
| `src/content/projects/*.md` | 10 curated project entries |
| `src/i18n/pt.json` / `en.json` | UI label translations |
| `src/layouts/BaseLayout.astro` | HTML shell, SEO meta, font imports |
| `src/components/*.astro` | One component per page section |
| `src/pages/index.astro` | Redirect to `/pt` |
| `src/pages/pt/index.astro` | Portuguese single-page |
| `src/pages/en/index.astro` | English single-page |
| `public/` | Static assets (CV PDF, favicon, avatar) |
| `vercel.json` | Deploy config |

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: project root via CLI
- Create: `tsconfig.json` (generated)
- Create: `astro.config.mjs`

- [ ] **Step 1: Create project**

Run from workspace root (`c:\Users\toyst\Documents\Projetos\Repositório`):

```bash
npm create astro@latest portfolio -- --template minimal --typescript strict --install --git --yes
cd portfolio
```

Expected: `portfolio/` folder created with `package.json`, `src/pages/index.astro`.

- [ ] **Step 2: Replace astro.config.mjs**

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://daniel-tavares.vercel.app',
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: `✓ Completed` with output in `dist/`.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: scaffold Astro project"
```

---

### Task 2: Theme and Global Styles

**Files:**
- Create: `src/styles/themes.css`
- Create: `src/styles/global.css`

- [ ] **Step 1: Create themes.css**

```css
/* src/styles/themes.css */
:root,
[data-theme='light'] {
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  --border: #e2e8f0;
  --card-bg: #f8fafc;
  --header-bg: rgba(255, 255, 255, 0.9);
}

[data-theme='dark'] {
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --accent: #60a5fa;
  --accent-hover: #93c5fd;
  --border: #334155;
  --card-bg: #1e293b;
  --header-bg: rgba(15, 23, 42, 0.9);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --bg-primary: #0f172a;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
    --accent: #60a5fa;
    --accent-hover: #93c5fd;
    --border: #334155;
    --card-bg: #1e293b;
    --header-bg: rgba(15, 23, 42, 0.9);
  }
}
```

- [ ] **Step 2: Create global.css**

```css
/* src/styles/global.css */
@import './themes.css';

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  scroll-padding-top: 4rem;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  transition: background 0.2s, color 0.2s;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

section {
  padding: 5rem 0;
}

section h2 {
  font-size: 1.75rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

a { color: var(--accent); text-decoration: none; }
a:hover { color: var(--accent-hover); }

.tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  color: var(--text-secondary);
}

.btn {
  display: inline-block;
  padding: 0.6rem 1.4rem;
  border-radius: 0.5rem;
  background: var(--accent);
  color: #fff;
  font-weight: 500;
  transition: background 0.2s;
}
.btn:hover { background: var(--accent-hover); color: #fff; }
.btn-outline {
  background: transparent;
  border: 1px solid var(--accent);
  color: var(--accent);
}
.btn-outline:hover { background: var(--accent); color: #fff; }

.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: border-color 0.2s, transform 0.2s;
}
.card:hover { border-color: var(--accent); transform: translateY(-2px); }

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
@media (max-width: 900px) { .grid-3 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .grid-3 { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: PASS (no import errors yet — files exist but aren't imported until Task 7).

- [ ] **Step 4: Commit**

```bash
git add src/styles/
git commit -m "feat: add theme and global styles"
```

---

### Task 3: Resume Data JSON Files

**Files:**
- Create: `src/data/profile.json`
- Create: `src/data/experience.json`
- Create: `src/data/education.json`
- Create: `src/data/skills.json`
- Create: `src/data/ai-tools.json`

- [ ] **Step 1: Create profile.json**

```json
{
  "name": "Daniel Tavares",
  "title": {
    "pt": "Desenvolvedor Full Stack",
    "en": "Full Stack Developer"
  },
  "bio": {
    "pt": "Desenvolvedor Full Stack em formação, com experiência em sistemas corporativos, APIs REST e automação. Apaixonado por arquitetura de software, IA generativa e aprendizado contínuo.",
    "en": "Full Stack Developer in training, with experience in corporate systems, REST APIs and automation. Passionate about software architecture, generative AI and continuous learning."
  },
  "avatar": "/avatar.jpg",
  "cv": "/cv-daniel-tavares.pdf",
  "links": {
    "github": "https://github.com/Daniel-Tavares-de-Lima",
    "linkedin": "https://linkedin.com/in/danieltavareslima",
    "email": "mailto:danieltavareslima72@gmail.com",
    "phone": "+5581997642392"
  }
}
```

- [ ] **Step 2: Create experience.json**

```json
[
  {
    "company": "Beyond Co.",
    "role": { "pt": "Desenvolvedor Full Stack (Estágio)", "en": "Full Stack Developer (Intern)" },
    "period": { "pt": "Out/2025 – Jun/2026", "en": "Oct/2025 – Jun/2026" },
    "location": "Recife - PE",
    "highlights": {
      "pt": [
        "Desenvolvimento de funcionalidades com Node.js, Vue.js, Sequelize e N8N",
        "Consumo e desenvolvimento de APIs REST",
        "Agentes de IA com Claude, ChatGPT e Gemini para automação"
      ],
      "en": [
        "Feature development with Node.js, Vue.js, Sequelize and N8N",
        "REST API development and consumption",
        "AI agents with Claude, ChatGPT and Gemini for automation"
      ]
    }
  },
  {
    "company": "Emlurb",
    "role": { "pt": "Estagiário de TI", "en": "IT Intern" },
    "period": { "pt": "Mai/2024 – Out/2025", "en": "May/2024 – Oct/2025" },
    "location": "Recife - PE",
    "highlights": {
      "pt": [
        "Suporte técnico a usuários internos",
        "Configuração de equipamentos de rede e infraestrutura",
        "Diagnóstico e resolução de incidentes de conectividade"
      ],
      "en": [
        "Technical support for internal users",
        "Network equipment and infrastructure configuration",
        "Connectivity incident diagnosis and resolution"
      ]
    }
  },
  {
    "company": "Seed a Bit Tecnologia",
    "role": { "pt": "Analista de Negócios", "en": "Business Analyst" },
    "period": { "pt": "2024", "en": "2024" },
    "location": "Recife - PE",
    "highlights": {
      "pt": [
        "Prospecção e qualificação de leads",
        "Levantamento de necessidades de negócio",
        "Ponte entre áreas técnicas e comerciais"
      ],
      "en": [
        "Lead prospecting and qualification",
        "Business needs assessment",
        "Bridge between technical and commercial teams"
      ]
    }
  }
]
```

- [ ] **Step 3: Create education.json**

```json
[
  {
    "institution": "Universidade Federal Rural de Pernambuco (UFRPE)",
    "degree": {
      "pt": "Bacharelado em Ciência da Computação",
      "en": "Bachelor's in Computer Science"
    },
    "period": { "pt": "Previsão: 2027.2", "en": "Expected: 2027.2" },
    "status": { "pt": "Em andamento", "en": "In progress" }
  },
  {
    "institution": "Centro Universitário SENAC",
    "degree": {
      "pt": "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      "en": "Associate Degree in Systems Analysis and Development"
    },
    "period": { "pt": "Embarque Digital", "en": "Embarque Digital Program" },
    "status": { "pt": "Concluído", "en": "Completed" }
  }
]
```

- [ ] **Step 4: Create skills.json**

```json
{
  "languages": ["JavaScript", "TypeScript", "Python", "SQL", "Java"],
  "frameworks": ["Node.js", "Vue.js", "Sequelize", "N8N", "Spring Boot", "Flutter", "Git", "Docker", "Postman"],
  "concepts": {
    "pt": ["APIs REST", "Banco Relacional", "Automação de Processos", "IA Generativa", "Metodologias Ágeis", "Levantamento de Requisitos"],
    "en": ["REST APIs", "Relational Databases", "Process Automation", "Generative AI", "Agile Methodologies", "Requirements Gathering"]
  }
}
```

- [ ] **Step 5: Create ai-tools.json**

```json
{
  "tools": ["Claude", "ChatGPT", "Gemini", "GitHub Copilot"],
  "useCases": {
    "pt": [
      "Agentes de IA para análise de requisitos e geração de conteúdo",
      "Automação de tarefas repetitivas no fluxo de desenvolvimento",
      "Desenvolvimento assistido por IA para aumento de produtividade",
      "Integração de ferramentas de IA na tomada de decisão técnica"
    ],
    "en": [
      "AI agents for requirements analysis and content generation",
      "Automation of repetitive tasks in the development workflow",
      "AI-assisted development for increased productivity",
      "Integration of AI tools in technical decision-making"
    ]
  }
}
```

- [ ] **Step 6: Verify JSON validity**

```bash
node -e "['profile','experience','education','skills','ai-tools'].forEach(f=>JSON.parse(require('fs').readFileSync('src/data/'+f+'.json')))"
```

Expected: no output (all valid JSON).

- [ ] **Step 7: Commit**

```bash
git add src/data/
git commit -m "feat: add resume data JSON files"
```

---

### Task 4: Content Collection Schema

**Files:**
- Create: `src/content/config.ts`

- [ ] **Step 1: Create config.ts**

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.object({ pt: z.string(), en: z.string() }),
    description: z.object({ pt: z.string(), en: z.string() }),
    stack: z.array(z.string()),
    category: z.enum(['professional', 'academic', 'personal']),
    featured: z.boolean().default(true),
    order: z.number(),
    github: z.string().url().optional(),
    demo: z.string().url().optional().or(z.literal('')),
    relatedRepos: z.array(z.string().url()).optional(),
  }),
});

export const collections = { projects };
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/content/config.ts
git commit -m "feat: add projects content collection schema"
```

---

### Task 5: Project Content Files (10 projects)

**Files:**
- Create: `src/content/projects/tickets-system.md`
- Create: `src/content/projects/beyond-corporate.md`
- Create: `src/content/projects/vencife.md`
- Create: `src/content/projects/senac-integrador.md`
- Create: `src/content/projects/todolist-api.md`
- Create: `src/content/projects/ml-boletos.md`
- Create: `src/content/projects/analise-residuos.md`
- Create: `src/content/projects/pwa-deploy.md`
- Create: `src/content/projects/sistema-faturamento.md`
- Create: `src/content/projects/petshop-mobile.md`

- [ ] **Step 1: Create tickets-system.md**

```markdown
---
title:
  pt: "Sistema Distribuído de Tickets"
  en: "Distributed Ticket System"
description:
  pt: "Sistema completo com API REST, frontend Vue e serviço de notificações distribuídas."
  en: "Full system with REST API, Vue frontend and distributed notification service."
stack: ["Node.js", "Vue.js", "REST API", "JavaScript"]
category: "academic"
featured: true
order: 1
github: "https://github.com/Daniel-Tavares-de-Lima/API-de-Gerenciamento-de-Chamados"
demo: ""
relatedRepos:
  - "https://github.com/Daniel-Tavares-de-Lima/Tickets-Frontend-Sistema-Distribuido"
  - "https://github.com/Daniel-Tavares-de-Lima/Notification-Services"
---
```

- [ ] **Step 2: Create beyond-corporate.md**

```markdown
---
title:
  pt: "Sistema Corporativo de Formulários"
  en: "Corporate Forms Management System"
description:
  pt: "Desenvolvimento de formulários dinâmicos, validações e integrações com APIs em ambiente corporativo."
  en: "Dynamic forms, validations and API integrations in a corporate environment."
stack: ["Node.js", "Sequelize", "N8N", "JavaScript", "SQL"]
category: "professional"
featured: true
order: 2
demo: ""
---
```

- [ ] **Step 3: Create vencife.md**

```markdown
---
title:
  pt: "Vencife"
  en: "Vencife"
description:
  pt: "App mobile desenvolvido na Residência Tecnológica do Porto Digital — RiseUp 2024.2."
  en: "Mobile app developed at Porto Digital Technology Residency — RiseUp 2024.2."
stack: ["Flutter", "Dart"]
category: "academic"
featured: true
order: 3
github: "https://github.com/Daniel-Tavares-de-Lima/Vencife"
demo: ""
---
```

- [ ] **Step 4: Create senac-integrador.md**

```markdown
---
title:
  pt: "Projeto Integrador SENAC"
  en: "SENAC Integrator Project"
description:
  pt: "Sistema web completo com frontend React/TypeScript e deploy em produção."
  en: "Full web system with React/TypeScript frontend and production deployment."
stack: ["TypeScript", "React"]
category: "academic"
featured: true
order: 4
github: "https://github.com/Daniel-Tavares-de-Lima/Projeto_Integrador_Senac"
demo: "https://sal-o-senac-projeto-integrador.vercel.app"
---
```

- [ ] **Step 5: Create todolist-api.md**

```markdown
---
title:
  pt: "TodoList API"
  en: "TodoList API"
description:
  pt: "API REST em Spring Boot para gerenciamento de tarefas com operações CRUD."
  en: "REST API in Spring Boot for task management with CRUD operations."
stack: ["Java", "Spring Boot"]
category: "personal"
featured: true
order: 5
github: "https://github.com/Daniel-Tavares-de-Lima/TodoList-API"
demo: ""
---
```

- [ ] **Step 6: Create ml-boletos.md**

```markdown
---
title:
  pt: "Detecção de Boletos (ML)"
  en: "Bill Detection (ML)"
description:
  pt: "Modelo de machine learning para detecção e classificação de boletos."
  en: "Machine learning model for bill detection and classification."
stack: ["Python", "Jupyter", "Machine Learning"]
category: "academic"
featured: true
order: 6
github: "https://github.com/Daniel-Tavares-de-Lima/machine_learing_detecta_boletos"
demo: ""
---
```

- [ ] **Step 7: Create analise-residuos.md**

```markdown
---
title:
  pt: "Análise de Resíduos Sólidos"
  en: "Solid Waste Data Analysis"
description:
  pt: "Análise exploratória e estatística de dados sobre destinação de resíduos sólidos com Python."
  en: "Exploratory and statistical data analysis on solid waste disposal using Python."
stack: ["Python", "Pandas", "Jupyter"]
category: "personal"
featured: true
order: 7
github: "https://github.com/Daniel-Tavares-de-Lima/Destinacao-de-residuos-solidos---Analise-de-Dados"
demo: ""
---
```

- [ ] **Step 8: Create pwa-deploy.md**

```markdown
---
title:
  pt: "PWA Deploy"
  en: "PWA Deploy"
description:
  pt: "Progressive Web App com backend Node.js e frontend JavaScript, pronta para deploy."
  en: "Progressive Web App with Node.js backend and JavaScript frontend, deployment-ready."
stack: ["Node.js", "JavaScript"]
category: "academic"
featured: true
order: 8
github: "https://github.com/Daniel-Tavares-de-Lima/PWA-Deploy-Backend"
demo: ""
relatedRepos:
  - "https://github.com/Daniel-Tavares-de-Lima/PWA-Deploy-Frontend"
---
```

- [ ] **Step 9: Create sistema-faturamento.md**

```markdown
---
title:
  pt: "Sistema de Faturamento"
  en: "Billing System"
description:
  pt: "Sistema de faturamento empresarial desktop com Java e JavaFX."
  en: "Enterprise desktop billing system with Java and JavaFX."
stack: ["Java", "JavaFX"]
category: "academic"
featured: true
order: 9
github: "https://github.com/Daniel-Tavares-de-Lima/Sistema-de-Faturamento"
demo: ""
---
```

- [ ] **Step 10: Create petshop-mobile.md**

```markdown
---
title:
  pt: "Petshop Mobile"
  en: "Petshop Mobile"
description:
  pt: "App mobile para ONGs de doação e resgate de pets, voluntários e blog."
  en: "Mobile app for pet rescue NGOs, volunteers and blog."
stack: ["CSS", "Mobile"]
category: "academic"
featured: true1
order: 10
github: "https://github.com/Daniel-Tavares-de-Lima/Petshop-Mobile"
demo: ""
---
```

- [ ] **Step 11: Verify build**

```bash
npm run build
```

Expected: PASS — 10 projects parsed by Content Collections.

- [ ] **Step 12: Commit**

```bash
git add src/content/projects/
git commit -m "feat: add 10 curated project entries"
```

---

### Task 6: i18n UI Labels

**Files:**
- Create: `src/i18n/pt.json`
- Create: `src/i18n/en.json`
- Create: `src/i18n/index.ts`

- [ ] **Step 1: Create pt.json**

```json
{
  "nav": {
    "about": "Sobre",
    "experience": "Experiência",
    "education": "Formação",
    "projects": "Projetos",
    "skills": "Skills",
    "ai": "IA & Automação",
    "contact": "Contato"
  },
  "hero": {
    "cta_cv": "Baixar CV",
    "cta_github": "GitHub"
  },
  "projects": {
    "view_github": "Ver no GitHub",
    "view_demo": "Ver Demo",
    "category_professional": "Profissional",
    "category_academic": "Acadêmico",
    "category_personal": "Pessoal"
  },
  "contact": {
    "title": "Contato",
    "download_cv": "Baixar Currículo PDF"
  },
  "footer": {
    "built_with": "Feito com Astro"
  }
}
```

- [ ] **Step 2: Create en.json**

```json
{
  "nav": {
    "about": "About",
    "experience": "Experience",
    "education": "Education",
    "projects": "Projects",
    "skills": "Skills",
    "ai": "AI & Automation",
    "contact": "Contact"
  },
  "hero": {
    "cta_cv": "Download CV",
    "cta_github": "GitHub"
  },
  "projects": {
    "view_github": "View on GitHub",
    "view_demo": "View Demo",
    "category_professional": "Professional",
    "category_academic": "Academic",
    "category_personal": "Personal"
  },
  "contact": {
    "title": "Contact",
    "download_cv": "Download CV PDF"
  },
  "footer": {
    "built_with": "Built with Astro"
  }
}
```

- [ ] **Step 3: Create index.ts helper**

```typescript
// src/i18n/index.ts
import pt from './pt.json';
import en from './en.json';

const translations = { pt, en } as const;
export type Locale = keyof typeof translations;

export function useTranslations(locale: Locale) {
  return translations[locale];
}
```

- [ ] **Step 4: Commit**

```bash
git add src/i18n/
git commit -m "feat: add i18n UI translations"
```

---

### Task 7: BaseLayout with SEO

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create BaseLayout.astro**

```astro
---
// src/layouts/BaseLayout.astro
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  locale: 'pt' | 'en';
}

const { title, description, locale } = Astro.props;
const siteUrl = Astro.site?.toString() ?? 'https://daniel-tavares.vercel.app';
---
<!DOCTYPE html>
<html lang={locale}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${siteUrl}/${locale}`} />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <script is:inline>
    (function () {
      const stored = localStorage.getItem('theme');
      if (stored) {
        document.documentElement.setAttribute('data-theme', stored);
      }
    })();
  </script>
</head>
<body>
  <slot />
</body>
</html>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/
git commit -m "feat: add BaseLayout with SEO and theme init"
```

---

### Task 8: ThemeToggle Component

**Files:**
- Create: `src/components/ThemeToggle.astro`

- [ ] **Step 1: Create ThemeToggle.astro**

```astro
---
// src/components/ThemeToggle.astro
---
<button id="theme-toggle" aria-label="Toggle theme" class="theme-toggle">
  <span class="icon-light">☀️</span>
  <span class="icon-dark">🌙</span>
</button>

<style>
  .theme-toggle {
    background: none;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    padding: 0.4rem 0.6rem;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
  }
  [data-theme='dark'] .icon-light { display: none; }
  [data-theme='light'] .icon-dark,
  :root:not([data-theme]) .icon-dark { display: none; }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme='light']) .icon-light { display: none; }
    :root:not([data-theme='light']) .icon-dark { display: inline; }
  }
</style>

<script>
  const btn = document.getElementById('theme-toggle');
  btn?.addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = current === 'dark' || (!current && prefersDark);
    const next = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ThemeToggle.astro
git commit -m "feat: add ThemeToggle component"
```

---

### Task 9: Header with Navigation

**Files:**
- Create: `src/components/LanguageToggle.astro`
- Create: `src/components/Header.astro`

- [ ] **Step 1: Create LanguageToggle.astro**

```astro
---
// src/components/LanguageToggle.astro
interface Props { locale: 'pt' | 'en'; }
const { locale } = Astro.props;
const other = locale === 'pt' ? 'en' : 'pt';
const label = locale === 'pt' ? 'EN' : 'PT';
---
<a href={`/${other}${Astro.url.hash}`} class="lang-toggle" aria-label={`Switch to ${other}`}>
  {label}
</a>

<style>
  .lang-toggle {
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    padding: 0.4rem 0.7rem;
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }
  .lang-toggle:hover { color: var(--accent); border-color: var(--accent); }
</style>
```

- [ ] **Step 2: Create Header.astro**

```astro
---
// src/components/Header.astro
import ThemeToggle from './ThemeToggle.astro';
import LanguageToggle from './LanguageToggle.astro';
import { useTranslations, type Locale } from '../i18n';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const t = useTranslations(locale);
const nav = [
  { href: '#about', label: t.nav.about },
  { href: '#experience', label: t.nav.experience },
  { href: '#education', label: t.nav.education },
  { href: '#projects', label: t.nav.projects },
  { href: '#skills', label: t.nav.skills },
  { href: '#ai', label: t.nav.ai },
  { href: '#contact', label: t.nav.contact },
];
---
<header class="header">
  <div class="container header-inner">
    <a href={`/${locale}`} class="logo">DT</a>
    <nav class="nav" id="main-nav">
      {nav.map(item => (
        <a href={item.href} class="nav-link">{item.label}</a>
      ))}
    </nav>
    <div class="header-actions">
      <LanguageToggle locale={locale} />
      <ThemeToggle />
      <button class="menu-toggle" id="menu-toggle" aria-label="Menu">☰</button>
    </div>
  </div>
</header>

<style>
  .header {
    position: sticky; top: 0; z-index: 100;
    background: var(--header-bg);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
  }
  .header-inner {
    display: flex; align-items: center; justify-content: space-between;
    height: 4rem;
  }
  .logo { font-weight: 700; font-size: 1.25rem; color: var(--accent); }
  .nav { display: flex; gap: 1.25rem; }
  .nav-link {
    font-size: 0.875rem; color: var(--text-secondary);
    transition: color 0.2s;
  }
  .nav-link:hover, .nav-link.active { color: var(--accent); }
  .header-actions { display: flex; align-items: center; gap: 0.5rem; }
  .menu-toggle {
    display: none; background: none; border: none;
    font-size: 1.5rem; cursor: pointer; color: var(--text-primary);
  }
  @media (max-width: 768px) {
    .nav {
      display: none; position: absolute; top: 4rem; left: 0; right: 0;
      flex-direction: column; background: var(--header-bg);
      border-bottom: 1px solid var(--border); padding: 1rem 1.5rem;
    }
    .nav.open { display: flex; }
    .menu-toggle { display: block; }
  }
</style>

<script>
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  toggle?.addEventListener('click', () => nav?.classList.toggle('open'));

  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        active?.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/LanguageToggle.astro src/components/Header.astro
git commit -m "feat: add Header with nav, language and theme toggles"
```

---

### Task 10: Section Components (Hero through Footer)

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/About.astro`
- Create: `src/components/ExperienceTimeline.astro`
- Create: `src/components/EducationCards.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/ProjectGrid.astro`
- Create: `src/components/SkillGrid.astro`
- Create: `src/components/AiSection.astro`
- Create: `src/components/Contact.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create Hero.astro**

```astro
---
// src/components/Hero.astro
import profile from '../data/profile.json';
import { useTranslations, type Locale } from '../i18n';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const t = useTranslations(locale);
---
<section id="hero" class="hero">
  <div class="container hero-inner">
    <img src={profile.avatar} alt={profile.name} class="avatar" width="140" height="140" />
    <div>
      <h1>{profile.name}</h1>
      <p class="title">{profile.title[locale]}</p>
      <div class="hero-actions">
        <a href={profile.cv} class="btn" download>{t.hero.cta_cv}</a>
        <a href={profile.links.github} class="btn btn-outline" target="_blank" rel="noopener">{t.hero.cta_github}</a>
      </div>
    </div>
  </div>
</section>

<style>
  .hero { padding: 6rem 0 4rem; }
  .hero-inner { display: flex; align-items: center; gap: 2rem; }
  .avatar { border-radius: 50%; border: 3px solid var(--accent); object-fit: cover; }
  h1 { font-size: 2.5rem; margin-bottom: 0.25rem; }
  .title { font-size: 1.15rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
  .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  @media (max-width: 600px) {
    .hero-inner { flex-direction: column; text-align: center; }
  }
</style>
```

- [ ] **Step 2: Create About.astro**

```astro
---
// src/components/About.astro
import profile from '../data/profile.json';
import { useTranslations, type Locale } from '../i18n';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const t = useTranslations(locale);
---
<section id="about">
  <div class="container">
    <h2>{t.nav.about}</h2>
    <p class="bio">{profile.bio[locale]}</p>
    <div class="social-links">
      <a href={profile.links.github} target="_blank" rel="noopener">GitHub</a>
      <a href={profile.links.linkedin} target="_blank" rel="noopener">LinkedIn</a>
      <a href={profile.links.email}>Email</a>
    </div>
  </div>
</section>

<style>
  .bio { font-size: 1.05rem; color: var(--text-secondary); max-width: 700px; margin-bottom: 1rem; }
  .social-links { display: flex; gap: 1.5rem; }
</style>
```

- [ ] **Step 3: Create ExperienceTimeline.astro**

```astro
---
// src/components/ExperienceTimeline.astro
import experience from '../data/experience.json';
import { useTranslations, type Locale } from '../i18n';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const t = useTranslations(locale);
---
<section id="experience">
  <div class="container">
    <h2>{t.nav.experience}</h2>
    <div class="timeline">
      {experience.map(job => (
        <div class="timeline-item card">
          <div class="timeline-marker" />
          <div>
            <h3>{job.company}</h3>
            <p class="role">{job.role[locale]}</p>
            <p class="meta">{job.period[locale]} · {job.location}</p>
            <ul>
              {job.highlights[locale].map(h => <li>{h}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .timeline { position: relative; padding-left: 2rem; }
  .timeline::before {
    content: ''; position: absolute; left: 0.5rem; top: 0; bottom: 0;
    width: 2px; background: var(--border);
  }
  .timeline-item { position: relative; margin-bottom: 1.5rem; }
  .timeline-marker {
    position: absolute; left: -1.65rem; top: 1.5rem;
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--accent); border: 2px solid var(--bg-primary);
  }
  h3 { font-size: 1.1rem; margin-bottom: 0.25rem; }
  .role { color: var(--accent); font-weight: 500; }
  .meta { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem; }
  ul { padding-left: 1.2rem; color: var(--text-secondary); font-size: 0.9rem; }
  li { margin-bottom: 0.3rem; }
</style>
```

- [ ] **Step 4: Create EducationCards.astro**

```astro
---
// src/components/EducationCards.astro
import education from '../data/education.json';
import { useTranslations, type Locale } from '../i18n';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const t = useTranslations(locale);
---
<section id="education">
  <div class="container">
    <h2>{t.nav.education}</h2>
    <div class="grid-3">
      {education.map(edu => (
        <div class="card">
          <h3>{edu.institution}</h3>
          <p class="degree">{edu.degree[locale]}</p>
          <p class="meta">{edu.period[locale]}</p>
          <span class="tag">{edu.status[locale]}</span>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  h3 { font-size: 1rem; margin-bottom: 0.5rem; }
  .degree { color: var(--text-secondary); margin-bottom: 0.25rem; }
  .meta { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem; }
</style>
```

- [ ] **Step 5: Create ProjectCard.astro**

```astro
---
// src/components/ProjectCard.astro
import type { CollectionEntry } from 'astro:content';
import { useTranslations, type Locale } from '../i18n';

interface Props {
  project: CollectionEntry<'projects'>;
  locale: Locale;
}
const { project, locale } = Astro.props;
const { title, description, stack, category, github, demo, relatedRepos } = project.data;
const t = useTranslations(locale);
const categoryLabels = {
  professional: t.projects.category_professional,
  academic: t.projects.category_academic,
  personal: t.projects.category_personal,
};
---
<article class="card project-card">
  <span class="tag category">{categoryLabels[category]}</span>
  <h3>{title[locale]}</h3>
  <p>{description[locale]}</p>
  <div class="stack-tags">
    {stack.map(tech => <span class="tag">{tech}</span>)}
  </div>
  <div class="project-links">
    {github && <a href={github} target="_blank" rel="noopener">{t.projects.view_github}</a>}
    {demo && <a href={demo} target="_blank" rel="noopener">{t.projects.view_demo}</a>}
    {relatedRepos?.map(url => (
      <a href={url} target="_blank" rel="noopener">{t.projects.view_github} +</a>
    ))}
  </div>
</article>

<style>
  .project-card { display: flex; flex-direction: column; gap: 0.75rem; }
  .category { align-self: flex-start; }
  h3 { font-size: 1.05rem; }
  p { font-size: 0.9rem; color: var(--text-secondary); flex: 1; }
  .stack-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .project-links { display: flex; gap: 1rem; font-size: 0.85rem; }
</style>
```

- [ ] **Step 6: Create ProjectGrid.astro**

```astro
---
// src/components/ProjectGrid.astro
import { getCollection } from 'astro:content';
import ProjectCard from './ProjectCard.astro';
import { useTranslations, type Locale } from '../i18n';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const t = useTranslations(locale);
const projects = (await getCollection('projects'))
  .filter(p => p.data.featured)
  .sort((a, b) => a.data.order - b.data.order);
---
<section id="projects">
  <div class="container">
    <h2>{t.nav.projects}</h2>
    <div class="grid-3">
      {projects.map(project => (
        <ProjectCard project={project} locale={locale} />
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 7: Create SkillGrid.astro**

```astro
---
// src/components/SkillGrid.astro
import skills from '../data/skills.json';
import { useTranslations, type Locale } from '../i18n';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const t = useTranslations(locale);
---
<section id="skills">
  <div class="container">
    <h2>{t.nav.skills}</h2>
    <div class="skills-grid">
      <div class="skill-group card">
        <h3>Languages</h3>
        <div class="tags">{skills.languages.map(s => <span class="tag">{s}</span>)}</div>
      </div>
      <div class="skill-group card">
        <h3>Frameworks & Tools</h3>
        <div class="tags">{skills.frameworks.map(s => <span class="tag">{s}</span>)}</div>
      </div>
      <div class="skill-group card">
        <h3>Concepts</h3>
        <div class="tags">{skills.concepts[locale].map(s => <span class="tag">{s}</span>)}</div>
      </div>
    </div>
  </div>
</section>

<style>
  .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  @media (max-width: 768px) { .skills-grid { grid-template-columns: 1fr; } }
  .skill-group h3 { font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--accent); }
  .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
</style>
```

- [ ] **Step 8: Create AiSection.astro**

```astro
---
// src/components/AiSection.astro
import aiTools from '../data/ai-tools.json';
import { useTranslations, type Locale } from '../i18n';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const t = useTranslations(locale);
---
<section id="ai">
  <div class="container">
    <h2>{t.nav.ai}</h2>
    <div class="ai-content card">
      <div class="tools">
        {aiTools.tools.map(tool => <span class="tag">{tool}</span>)}
      </div>
      <ul>
        {aiTools.useCases[locale].map(uc => <li>{uc}</li>)}
      </ul>
    </div>
  </div>
</section>

<style>
  .tools { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
  ul { padding-left: 1.2rem; color: var(--text-secondary); }
  li { margin-bottom: 0.4rem; }
</style>
```

- [ ] **Step 9: Create Contact.astro**

```astro
---
// src/components/Contact.astro
import profile from '../data/profile.json';
import { useTranslations, type Locale } from '../i18n';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const t = useTranslations(locale);
---
<section id="contact">
  <div class="container">
    <h2>{t.contact.title}</h2>
    <div class="contact-links">
      <a href={profile.links.email} class="btn">{profile.links.email.replace('mailto:', '')}</a>
      <a href={profile.links.linkedin} class="btn btn-outline" target="_blank" rel="noopener">LinkedIn</a>
      <a href={profile.links.github} class="btn btn-outline" target="_blank" rel="noopener">GitHub</a>
      <a href={profile.cv} class="btn btn-outline" download>{t.contact.download_cv}</a>
    </div>
  </div>
</section>

<style>
  .contact-links { display: flex; flex-wrap: wrap; gap: 1rem; }
</style>
```

- [ ] **Step 10: Create Footer.astro**

```astro
---
// src/components/Footer.astro
import { useTranslations, type Locale } from '../i18n';

interface Props { locale: Locale; }
const { locale } = Astro.props;
const t = useTranslations(locale);
const year = new Date().getFullYear();
---
<footer class="footer">
  <div class="container">
    <p>&copy; {year} Daniel Tavares · {t.footer.built_with}</p>
  </div>
</footer>

<style>
  .footer {
    padding: 2rem 0; border-top: 1px solid var(--border);
    text-align: center; color: var(--text-secondary); font-size: 0.85rem;
  }
</style>
```

- [ ] **Step 11: Verify build**

```bash
npm run build
```

Expected: PASS (components exist but pages not wired yet — no errors from orphan files).

- [ ] **Step 12: Commit**

```bash
git add src/components/
git commit -m "feat: add all section components"
```

---

### Task 11: Locale Pages and Redirect

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/pages/pt/index.astro`
- Create: `src/pages/en/index.astro`

- [ ] **Step 1: Replace index.astro with redirect**

```astro
---
// src/pages/index.astro
return Astro.redirect('/pt');
---
```

- [ ] **Step 2: Create pt/index.astro**

```astro
---
// src/pages/pt/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Hero from '../../components/Hero.astro';
import About from '../../components/About.astro';
import ExperienceTimeline from '../../components/ExperienceTimeline.astro';
import EducationCards from '../../components/EducationCards.astro';
import ProjectGrid from '../../components/ProjectGrid.astro';
import SkillGrid from '../../components/SkillGrid.astro';
import AiSection from '../../components/AiSection.astro';
import Contact from '../../components/Contact.astro';
import Footer from '../../components/Footer.astro';
import profile from '../../data/profile.json';

const locale = 'pt' as const;
---
<BaseLayout
  title={`${profile.name} — ${profile.title.pt}`}
  description={profile.bio.pt}
  locale={locale}
>
  <Header locale={locale} />
  <main>
    <Hero locale={locale} />
    <About locale={locale} />
    <ExperienceTimeline locale={locale} />
    <EducationCards locale={locale} />
    <ProjectGrid locale={locale} />
    <SkillGrid locale={locale} />
    <AiSection locale={locale} />
    <Contact locale={locale} />
  </main>
  <Footer locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: Create en/index.astro**

```astro
---
// src/pages/en/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Hero from '../../components/Hero.astro';
import About from '../../components/About.astro';
import ExperienceTimeline from '../../components/ExperienceTimeline.astro';
import EducationCards from '../../components/EducationCards.astro';
import ProjectGrid from '../../components/ProjectGrid.astro';
import SkillGrid from '../../components/SkillGrid.astro';
import AiSection from '../../components/AiSection.astro';
import Contact from '../../components/Contact.astro';
import Footer from '../../components/Footer.astro';
import profile from '../../data/profile.json';

const locale = 'en' as const;
---
<BaseLayout
  title={`${profile.name} — ${profile.title.en}`}
  description={profile.bio.en}
  locale={locale}
>
  <Header locale={locale} />
  <main>
    <Hero locale={locale} />
    <About locale={locale} />
    <ExperienceTimeline locale={locale} />
    <EducationCards locale={locale} />
    <ProjectGrid locale={locale} />
    <SkillGrid locale={locale} />
    <AiSection locale={locale} />
    <Contact locale={locale} />
  </main>
  <Footer locale={locale} />
</BaseLayout>
```

- [ ] **Step 4: Verify build and preview**

```bash
npm run build
npm run preview
```

Expected: build PASS. Preview serves `/pt` and `/en` with all sections.

- [ ] **Step 5: Commit**

```bash
git add src/pages/
git commit -m "feat: add locale pages and root redirect"
```

---

### Task 12: Public Assets

**Files:**
- Create: `public/favicon.svg`
- Create: `public/avatar.jpg` (placeholder or real photo)
- Copy: `public/cv-daniel-tavares.pdf`

- [ ] **Step 1: Create favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#3B82F6"/>
  <text x="16" y="22" text-anchor="middle" fill="white" font-family="sans-serif" font-weight="bold" font-size="14">DT</text>
</svg>
```

Save as `public/favicon.svg`.

- [ ] **Step 2: Add avatar**

Copy a profile photo to `public/avatar.jpg`. If none available, use a placeholder:

```bash
# Placeholder: download a neutral avatar or use any square JPG renamed to avatar.jpg
# Minimum: create public/avatar.jpg (140x140 recommended)
```

- [ ] **Step 3: Copy CV PDF**

```bash
cp "c:/Users/toyst/Documents/Curriculo/Daniel Tavares Curriculo.pdf" public/cv-daniel-tavares.pdf
```

- [ ] **Step 4: Verify assets load**

```bash
npm run preview
```

Open `http://localhost:4321/cv-daniel-tavares.pdf` — Expected: PDF downloads.
Open `http://localhost:4321/avatar.jpg` — Expected: image loads.

- [ ] **Step 5: Commit**

```bash
git add public/
git commit -m "feat: add public assets (favicon, avatar, CV)"
```

---

### Task 13: Vercel Deploy Config and README

**Files:**
- Create: `vercel.json`
- Create: `README.md`

- [ ] **Step 1: Create vercel.json**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

- [ ] **Step 2: Create README.md**

```markdown
# Daniel Tavares — Portfolio

Bilingual (PT/EN) personal portfolio built with Astro.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Connected to Vercel — push to `main` triggers automatic deploy.

## Content Updates

- **Projects:** add/edit files in `src/content/projects/`
- **Resume data:** edit JSON files in `src/data/`
- **CV:** replace `public/cv-daniel-tavares.pdf`
```

- [ ] **Step 3: Final build verification**

```bash
npm run build
```

Expected: PASS with routes `/`, `/pt`, `/en`.

- [ ] **Step 4: Commit**

```bash
git add vercel.json README.md
git commit -m "chore: add Vercel config and README"
```

---

### Task 14: GitHub Repository and Vercel Deploy

**Files:** none (external setup)

- [ ] **Step 1: Create GitHub repo**

On GitHub, create repository `portfolio` under `Daniel-Tavares-de-Lima`.

- [ ] **Step 2: Push code**

```bash
git remote add origin https://github.com/Daniel-Tavares-de-Lima/portfolio.git
git branch -M main
git push -u origin main
```

Expected: code visible on GitHub.

- [ ] **Step 3: Connect Vercel**

1. Go to [vercel.com](https://vercel.com) → Import Project
2. Select `Daniel-Tavares-de-Lima/portfolio`
3. Framework: Astro (auto-detected)
4. Deploy

Expected: live URL like `portfolio-xxx.vercel.app`.

- [ ] **Step 4: Verify success criteria**

Manual checklist:
- [ ] Site accessible at public Vercel URL
- [ ] `/pt` and `/en` both render all 8 sections
- [ ] Language toggle switches locale preserving hash
- [ ] Theme toggle persists after refresh
- [ ] 10 project cards with correct GitHub links
- [ ] CV PDF download works
- [ ] Responsive at 375px width (mobile)
- [ ] Lighthouse Performance > 90 (Chrome DevTools)

---

## Spec Coverage Check

| Spec requirement | Task |
|-----------------|------|
| Bilíngue PT/EN | Task 6, 9, 11 |
| Dual theme | Task 2, 8 |
| 10 projetos curados | Task 5 |
| 8 seções | Task 10, 11 |
| CV download | Task 12 |
| Responsivo | Task 9 (mobile nav), Task 2 (grid breakpoints) |
| SEO básico | Task 7 |
| Vercel deploy | Task 13, 14 |
| Content Collections | Task 4, 5 |
| JSON data | Task 3 |

No gaps found.

---

## Plan Self-Review

- No TBD/TODO placeholders
- All file paths explicit
- Code provided for every implementation step
- Type names consistent (`Locale`, `useTranslations`, collection schema)
- Scope matches spec v1 (no blog, no CMS, no E2E tests)
