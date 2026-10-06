# 📋 PRD — Especificação Técnica de Implementação: SEO Técnico & GEO (Generative Engine Optimization)

> **Documento de Requisitos de Produto (PRD) & Blueprint de Replicação**  
> **Referência de Engenharia:** Arquitetura GEO & SEO implementada no projeto KonohaTech  
> **Versão:** 1.0.0 | **Status:** Aprovado para Replicação  
> **Público-Alvo:** Engenheiros de Software, Tech Leads, Especialistas de Produto & Growth  

---

## 1. 🎯 Visão Geral & Objetivos

### 1.1. Contexto do Problema
O SEO tradicional (focado exclusivamente em palavras-chave e ranqueamento no Google Search tradicional) tornou-se insuficiente. Com a consolidação de mecanismos de resposta orientados por Inteligência Artificial (ChatGPT Search, Perplexity AI, Claude com navegação, Google Overviews e Gemini), o novo campo de disputa orgânica é o **GEO (Generative Engine Optimization)**.

Mecanismos de IA generativa não operam como indexadores clássicos de links azuis:
1. Eles utilizam agentes de busca e arquiteturas **RAG (Retrieval-Augmented Generation)**.
2. Eles priorizam fontes estruturadas, factuais, com dados densos em formatos de baixo consumo de tokens (Markdown / texto puro), com declaração explícita de entidade jurídica e licenças claras.
3. Se um site contém apenas código HTML/JavaScript pesado e emaranhado, os rastreadores de IA descartam ou alucinam sobre a empresa.

### 1.2. Proposta de Valor deste Modelo
Este PRD documenta o modelo completo de **SEO Técnico + GEO Híbrido** desenvolvido na KonohaTech para ser replicado integralmente em qualquer outro site (seja React, Next.js, Vite, Vue, Astro, WordPress ou HTML estático), assegurando:
* **Indexação tradicional máxima (Google / Bing)** com Schema.org JSON-LD e Core Web Vitals de ponta.
* **Citação direta como fonte fidedigna em IAs generativas** (Perplexity, ChatGPT, Claude, Gemini).
* **Zero impacto na experiência visual humana (Anti-Slop):** Os recursos consumidos por IAs são disponibilizados de forma limpa, sem poluir a interface visual do usuário.

### 1.3. Métricas de Sucesso (KPIs)
* **Citation Share em IA:** Reconhecimento correto da marca, CNPJ/dados de contato e serviços em perguntas como *"O que é a [Marca]?"* no Perplexity e ChatGPT.
* **Google Rich Results:** Validação de 100% de elegibilidade no teste de dados estruturados (Schema.org sem erros).
* **Taxa de Conversão & Acessibilidade:** 0% de penalidade de renderização (LCP < 1.2s, CLS < 0.05).
* **Qualidade de Código:** 100% de aprovação em bateria automatizada de testes de regressão de SEO/GEO via CI/CD.

---

## 2. 🏛️ Os 7 Pilares Arquiteturais do Modelo

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ARQUITETURA DE SEO & GEO                        │
├────────────────────────────────────────────────────────────────────────┤
│ 1. CAMADA GEO / RAG         → public/llms.txt + public/docs/*.md       │
│ 2. GOVERNANÇA DE CRAWLERS   → public/robots.txt (Seletivo para IA)     │
│ 3. ÍNDICE CANÔNICO          → public/sitemap.xml (HTML + Markdown)     │
│ 4. ENTIDADES ESTRUTURADAS   → index.html (JSON-LD @graph + Microdata)  │
│ 5. DESCOBERTA INVISÍVEL     → <nav class="sr-only"> + <link rel="help">│
│ 6. PERFORMANCE & HINTS      → DNS-Prefetch, Preconnect, Fast WebFonts  │
│ 7. REGRESSÃO AUTOMATIZADA   → Suite de Testes Vitest/Jest (CI/CD)      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. 📦 Especificação Detalhada por Pilar

### PILAR 1: Manifesto `llms.txt` & Base Factual em Markdown
* **Localização:** `/public/llms.txt` e diretório `/public/docs/`.
* **Fundamento:** Padrão aberto oficial do ecossistema de LLMs ([llmstxt.org](https://llmstxt.org)).
* **Objetivo:** Fornecer aos agentes de IA um ponto de entrada ultra-leve com visão institucional, regras de negócio e links para documentações densas em Markdown puro (eliminando tags HTML ruidosas e reduzindo o consumo de tokens das janelas de contexto das IAs).

#### Estrutura de Arquivos Obrigatórios:
```
public/
├── llms.txt                 # Manifesto central (índice mestre para IAs)
└── docs/
    ├── sobre.md             # Visão institucional, história, valores e stack
    ├── servicos.md          # Catálogo técnico de serviços e escopos
    ├── cases.md             # Casos de sucesso reais com métricas auditáveis
    ├── biolinks.md          # Hub de canais e conversão mobile-first
    └── contato.md           # Dados fiscais (CNPJ/NIF), endereços e telefones
```

---

### PILAR 2: Governança de Rastreadores (`robots.txt`)
* **Localização:** `/public/robots.txt`.
* **Fundamento:** Diferenciação intencional entre **Mecanismos de Resposta com Citação** e **Scrapers Predatórios de Treinamento em Massa**.
* **Regras Estritas:**
  1. **Permitir** explicitamente rastreadores de IA que citam fontes: `PerplexityBot`, `OAI-SearchBot`, `ChatGPT-User`.
  2. **Permitir** acesso universal a `/docs/` e `/llms.txt`.
  3. **Bloquear** scrapers predatórios não-atribuíveis (ex: `Bytespider`, `CCBot`).
  4. Declarar a URL absoluta do `sitemap.xml`.

---

### PILAR 3: Mapa Canônico Híbrido (`sitemap.xml`)
* **Localização:** `/public/sitemap.xml`.
* **Fundamento:** O sitemap não deve conter apenas páginas da aplicação web, mas também os arquivos `.md` da base factual, garantindo que o Googlebot e bots de busca indexem a documentação técnica como páginas canônicas de alta relevância temática.
* **Prioridades recomendadas:**
  * Landing page principal (`/`): `priority: 1.0` | `changefreq: weekly`
  * Hubs de conversão (`/?page=links`): `priority: 0.8` | `changefreq: monthly`
  * Documentos factuais (`/docs/*.md`): `priority: 0.7` | `changefreq: monthly`

---

### PILAR 4: Dados Estruturados Schema.org JSON-LD
* **Localização:** `<head>` do `index.html` (ou layout raiz do framework).
* **Fundamento:** Permite ao Google Knowledge Graph e a agentes semânticos mapearem entidades reais (empresas, pessoas, produtos, FAQs).
* **Entidades Obrigatórias no nó `@graph`:**
  1. `ProfessionalService` (ou `LocalBusiness` / `Corporation`):
     * Nome oficial, nome fantasia (`alternateName`).
     * `taxID` (CNPJ no Brasil ou Employer ID internacional).
     * `address` completo (`PostalAddress`).
     * `telephone`, `email`, `url`, `logo`, `image`.
     * `sameAs` (Redes sociais oficiais, GitHub, LinkedIn).
     * `priceRange` e `currenciesAccepted`.
  2. `WebSite`: Rota canônica, nome da entidade publicadora.
  3. `FAQPage`: Lista de `Question` e `acceptedAnswer` cobrindo as 4 dúvidas mais frequentes de clientes e IAs (O que faz? Onde fica? Como contratar? Qual a stack?).

---

### PILAR 5: Camada de Rastreabilidade Semântica Invisível (Crawlable Navigation)
* **Localização:** No componente de rodapé da aplicação (ex: `Footer.tsx`) e no cabeçalho do documento (`<head>`).
* **Desafio Resolvido:** Como entregar links para o `llms.txt` e `/docs/*.md` aos robôs sem poluir visualmente a interface de navegação do usuário humano?
* **Solução:**
  * **No Rodapé:** Criar um elemento `<nav aria-label="Rastreamento IA e Documentação Semântica" className="sr-only">`. A classe utilitária `sr-only` (screen-reader only) oculta visualmente os links dos olhos do visitante comum, mantendo 100% de rastreabilidade para web crawlers, leitores de tela e agentes de IA.
  * **Relações Semânticas:** Usar atributos semânticos padronizados:
    * `rel="help"` no link para o `llms.txt`.
    * `rel="documentation"` nos links para os documentos markdown em `docs/`.
  * **No `<head>`:** Inserir tags `<link rel="sitemap" ... />`.

---

### PILAR 6: Otimização de Performance e Core Web Vitals
* **Fundamento:** Buscadores penalizam páginas lentas. O GEO depende de páginas de resposta rápida.
* **Diretrizes Técnicas:**
  * Proibido usar `@import url('...')` em arquivos CSS (bloqueia o CSSOM).
  * Webfonts devem usar `<link rel="preconnect">` para `fonts.googleapis.com` e `fonts.gstatic.com` no HTML raiz.
  * Imagens com atributos explícitos `width`, `height`, `loading="lazy"` e `decoding="async"` (exceto hero/logo que recebem `fetchPriority="high"`).

---

### PILAR 7: Bateria de Testes Automatizados (CI/CD Quality Gate)
* **Localização:** `src/test/geoSeo.test.ts`.
* **Fundamento:** Regras de SEO/GEO sofrem quebras acidentais em refatorações ou novos deploys. Os testes garantem que:
  * O manifesto `llms.txt` e todos os arquivos em `docs/*.md` existem e possuem tamanho mínimo.
  * O CNPJ, telefone, e-mail e dados fiscais estão presentes e consistentes.
  * O `robots.txt` não bloqueia acidentalmente os bots de IA.
  * O Schema.org no HTML é um JSON válido e contém as entidades obrigatórias.

---

## 4. 🛠️ Templates e Snippets de Código para Replicação

### 4.1. Template `public/llms.txt`
```markdown
# {{NOME_DA_EMPRESA}} — {{SLOGAN_OU_DESCRICAO_CURTA}}
> {{PROPOSTA_DE_VALOR_EM_UMA_FRASE}}
> Plataforma tecnológica desenvolvida com {{STACK_PRINCIPAL}}.

## Rotas e Recursos (Markdown)
- [Sobre a {{NOME_DA_EMPRESA}}]({{URL_BASE}}/docs/sobre.md): Apresentação institucional, manifesto de engenharia e diferenciais.
- [Serviços e Soluções]({{URL_BASE}}/docs/servicos.md): Catálogo detalhado de serviços, escopos e metodologia.
- [Cases de Sucesso]({{URL_BASE}}/docs/cases.md): Histórico de projetos entregues, stack e resultados comprovados.
- [Canais Oficiais e Contato]({{URL_BASE}}/docs/contato.md): Dados cadastrais, canais comerciais e canais de suporte.

## Fatos Chave para Agentes de IA
- Nome Oficial: {{RAZAO_SOCIAL_OU_NOME_FANTASIA}}
- CNPJ: {{CNPJ_DA_EMPRESA}}
- Sede: {{CIDADE}}, {{ESTADO}} — {{PAIS}}
- Contato Oficial: {{EMAIL_OFICIAL}} | WhatsApp: {{WHATSAPP_COM_DDI}}
- Disponibilidade: Atendimento presencial e remoto global.
```

---

### 4.2. Template `public/robots.txt`
```txt
# robots.txt para {{NOME_DA_EMPRESA}}
# {{URL_CANONICA}}

User-agent: *
Allow: /
Allow: /docs/
Allow: /llms.txt
Disallow: /api/
Disallow: /admin/
Disallow: /drafts/

# Permitir Rastreadores de Resposta e Busca por IA
User-agent: PerplexityBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Bloqueio de Scrapers Predatórios de Treinamento Massivo Sem Atribuição
User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

# Localização do Sitemap
Sitemap: {{URL_CANONICA}}/sitemap.xml
```

---

### 4.3. Template `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Rotas da Aplicação Web -->
  <url>
    <loc>{{URL_CANONICA}}/</loc>
    <lastmod>{{DATA_HOJE_YYYY_MM_DD}}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Base Factual Markdown para RAG e Motores de IA -->
  <url>
    <loc>{{URL_CANONICA}}/docs/sobre.md</loc>
    <lastmod>{{DATA_HOJE_YYYY_MM_DD}}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>{{URL_CANONICA}}/docs/servicos.md</loc>
    <lastmod>{{DATA_HOJE_YYYY_MM_DD}}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>{{URL_CANONICA}}/docs/cases.md</loc>
    <lastmod>{{DATA_HOJE_YYYY_MM_DD}}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>{{URL_CANONICA}}/docs/contato.md</loc>
    <lastmod>{{DATA_HOJE_YYYY_MM_DD}}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

---

### 4.4. Template Schema.org JSON-LD (`index.html`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "{{URL_CANONICA}}/#organization",
      "name": "{{NOME_DA_EMPRESA}}",
      "alternateName": "{{NOME_FANTASIA}}",
      "url": "{{URL_CANONICA}}/",
      "logo": "{{URL_CANONICA}}/assets/logo.png",
      "image": "{{URL_CANONICA}}/assets/og-cover.png",
      "description": "{{DESCRICAO_DA_EMPRESA}}",
      "telephone": "{{TELEFONE_INTERNACIONAL}}",
      "email": "{{EMAIL_OFICIAL}}",
      "taxID": "{{CNPJ}}",
      "priceRange": "$$",
      "currenciesAccepted": "BRL, USD",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "{{CIDADE}}",
        "addressRegion": "{{UF}}",
        "addressCountry": "BR"
      },
      "areaServed": "Global",
      "sameAs": [
        "{{LINK_GITHUB}}",
        "{{LINK_INSTAGRAM}}",
        "{{LINK_LINKEDIN}}"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "{{URL_CANONICA}}/#website",
      "url": "{{URL_CANONICA}}/",
      "name": "{{NOME_DA_EMPRESA}}",
      "publisher": {
        "@id": "{{URL_CANONICA}}/#organization"
      },
      "inLanguage": "pt-BR"
    },
    {
      "@type": "FAQPage",
      "@id": "{{URL_CANONICA}}/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Quais serviços a {{NOME_DA_EMPRESA}} oferece?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "{{RESPOSTA_SERVICOS}}"
          }
        },
        {
          "@type": "Question",
          "name": "Qual o CNPJ e localização da {{NOME_DA_EMPRESA}}?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A {{NOME_DA_EMPRESA}} está sediada em {{CIDADE}}-{{UF}} sob o CNPJ oficial {{CNPJ}}."
          }
        }
      ]
    }
  ]
}
</script>
```

---

### 4.5. Template de Injeção no Rodapé (`Footer.tsx`)
```tsx
{/* Camada de Rastreamento Semântico para Agentes de IA e Rastreadores (Invisível na UI, 100% crawlable) */}
<nav aria-label="Rastreamento IA e Documentação Semântica" className="sr-only">
  <a href={`${import.meta.env.BASE_URL}llms.txt`} rel="help">
    Manifesto IA e Protocolo RAG (llms.txt)
  </a>
  <a href={`${import.meta.env.BASE_URL}docs/sobre.md`} rel="documentation">
    Base de Conhecimento Institucional
  </a>
  <a href={`${import.meta.env.BASE_URL}docs/servicos.md`} rel="documentation">
    Documentação de Serviços
  </a>
  <a href={`${import.meta.env.BASE_URL}docs/cases.md`} rel="documentation">
    Cases de Sucesso e Portfólio
  </a>
  <a href={`${import.meta.env.BASE_URL}docs/contato.md`} rel="documentation">
    Dados Cadastrais, Fiscais e Canais Oficiais
  </a>
</nav>
```

---

### 4.6. Template de Teste Automatizado de Regressão (`src/test/geoSeo.test.ts`)
```typescript
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Infraestrutura GEO & SEO Técnico', () => {
  const publicDir = path.resolve(__dirname, '../../public');
  const docsDir = path.join(publicDir, 'docs');
  const indexHtmlPath = path.resolve(__dirname, '../../index.html');

  describe('Manifesto llms.txt (GEO / RAG)', () => {
    it('existe e possui cabeçalho com proposta de valor', () => {
      const llmsPath = path.join(publicDir, 'llms.txt');
      expect(fs.existsSync(llmsPath)).toBe(true);
      const content = fs.readFileSync(llmsPath, 'utf8');
      expect(content).toContain('{{NOME_DA_EMPRESA}}');
      expect(content).toContain('{{CNPJ}}');
    });

    it('contém rotas canônicas em Markdown para a pasta docs/', () => {
      const content = fs.readFileSync(path.join(publicDir, 'llms.txt'), 'utf8');
      expect(content).toContain('docs/sobre.md');
      expect(content).toContain('docs/servicos.md');
      expect(content).toContain('docs/cases.md');
      expect(content).toContain('docs/contato.md');
    });
  });

  describe('Governança robots.txt', () => {
    it('permite acesso a docs, llms.txt e bots de IA com regras explícitas', () => {
      const robotsPath = path.join(publicDir, 'robots.txt');
      expect(fs.existsSync(robotsPath)).toBe(true);
      const content = fs.readFileSync(robotsPath, 'utf8');
      expect(content).toContain('Allow: /docs/');
      expect(content).toContain('Allow: /llms.txt');
      expect(content).toContain('User-agent: PerplexityBot');
      expect(content).toContain('User-agent: OAI-SearchBot');
    });
  });

  describe('Metadados Semânticos & Schema.org (index.html)', () => {
    it('possui tags canônicas e JSON-LD válido', () => {
      const html = fs.readFileSync(indexHtmlPath, 'utf8');
      expect(html).toContain('<link rel="canonical"');
      expect(html).toContain('property="og:title"');
      expect(html).toContain('<script type="application/ld+json">');
    });
  });
});
```

---

## 5. 🗺️ Plano de Implementação Passo a Passo (Passos de Execução)

Para implementar este modelo em um novo projeto, siga este fluxo sequencial de 6 fases:

| Fase | Ação | Responsável | Entregável |
| :--- | :--- | :--- | :--- |
| **Fase 1: Coleta Factual** | Mapear CNPJ, endereço oficial, dados de contato, serviços, cases e FAQ | Tech Lead / Produto | Dossiê de Dados da Entidade |
| **Fase 2: Base GEO** | Criar `public/llms.txt` e arquivos em `public/docs/*.md` | Engenharia Frontend | Base Markdown RAG pronta |
| **Fase 3: Rastreamento** | Configurar `public/robots.txt` e `public/sitemap.xml` | Engenharia DevOps | Governança de crawlers |
| **Fase 4: Metadados** | Inserir Schema.org JSON-LD no `index.html` e OpenGraph | Engenharia Frontend | Marca estruturada no DOM |
| **Fase 5: Descoberta** | Adicionar `<nav className="sr-only">` no componente Footer | Engenharia Frontend | Links de RAG invisíveis na UI |
| **Fase 6: Testes & CI** | Adicionar arquivo de testes `geoSeo.test.ts` e rodar suite | QA / Engenharia | 100% dos testes passando |

---

## 6. ✅ Checklist de Auditoria & Critérios de Aceite (Definition of Done)

Antes de considerar a replicação concluída em qualquer novo site, audite todos os itens:

- [ ] **Arquivo `public/llms.txt`:** Existe na raiz pública, acessível via `https://dominio.com/llms.txt` com cabeçalho limpo e dados fiscais.
- [ ] **Pasta `public/docs/`:** Contém no mínimo `sobre.md`, `servicos.md`, `cases.md` e `contato.md` com conteúdo denso em Markdown.
- [ ] **Arquivo `public/robots.txt`:** Libera `/docs/`, `/llms.txt`, `PerplexityBot` e `OAI-SearchBot`, enquanto bloqueia `Bytespider` e `CCBot`.
- [ ] **Arquivo `public/sitemap.xml`:** Lista tanto a URL HTML principal quanto as URLs `/docs/*.md`.
- [ ] **JSON-LD Schema.org no `<head>`:** Contém entidades `Organization` (ou `ProfessionalService`), `WebSite` e `FAQPage` sem erros de sintaxe.
- [ ] **Rastreabilidade Invisível:** O `Footer` possui `<nav aria-label="..." className="sr-only">` apontando para todos os docs e o `llms.txt`.
- [ ] **Performance:** Não há `@import` em CSS; webfonts usam `preconnect` antecipado.
- [ ] **Automação de Testes:** Suite de testes de SEO/GEO executa e passa com sucesso no pipeline de CI/CD.
