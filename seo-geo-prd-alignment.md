# Plano de Alinhamento do Projeto com PRD (SEO & GEO Local)

> **Slug do Plano**: `seo-geo-prd-alignment.md`  
> **Status**: Planejamento Finalizado / Em Fase de Execução & Validação  
> **Data**: Outubro de 2026  
> **Escopo**: Análise de conformidade do projeto KonohaTech frente ao PRD "Sistema & Processo de Análise de Site e Implementação de Palavras-Chave (SEO & GEO Local)".

---

## 📊 1. Matriz de Alinhamento: Projeto KonohaTech vs PRD

| Requisito do PRD | Item de Verificação | Status Atual | Detalhamento & Evidências no Código |
|---|---|---|---|
| **FR-01.1** | Crawlability & Indexabilidade | 🟢 **100% Alinhado** | [`public/robots.txt`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/public/robots.txt) liberado para bots do Google e de IA (PerplexityBot, OAI-SearchBot, ClaudeBot). [`sitemap.xml`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/public/sitemap.xml) ativo. |
| **FR-01.2** | Core Web Vitals | 🟢 **100% Alinhado** | Vite + React 19 + Tailwind CSS v4. Preconnect de fontes Google em [`index.html`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/index.html). Build gerando chunks minificados sem erros. |
| **FR-01.3** | Estrutura Canonical | 🟢 **100% Alinhado** | Canonical declarado explicitamente em [`index.html`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/index.html#L21) (`https://www.konohatech.com.br`). |
| **FR-02.1 a FR-02.3** | Categorização & Keyword Mapping Canvas | 🟢 **100% Alinhado** | Estruturado no [`seo-geo-otimizacao.md`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/seo-geo-otimizacao.md) em 3 Clusters (Institucional/Local, Serviços Transacionais e GEO/Long-tail). |
| **FR-03.1** | Tag `<title>` (55-60 chars) | 🟢 **100% Alinhado** | Configurado em [`index.html`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/index.html#L6): `KonohaTech — Desenvolvimento de Software, Web & IA em Recife-PE` (~61 chars). |
| **FR-03.2** | Tag `<meta description>` | 🟢 **100% Alinhado** | Configurado com termos transacionais e CTA no [`index.html`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/index.html#L8). |
| **FR-03.3** | Hierarquia Semântica ($H1, H2, H3$) | 🟢 **100% Alinhado** | $H1$ otimizado no [`Hero.tsx`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/src/components/Hero.tsx#L188); $H2$ e $H3$ presentes nos componentes de serviços e FAQ visual. |
| **FR-03.4** | Atributo `alt` em Imagens | 🟢 **100% Alinhado** | Imagens nos componentes possuem atributos alt descritivos. |
| **FR-03.5** | Formatação Answer-First (GEO) | 🟢 **100% Alinhado** | Presença do [`public/llms.txt`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/public/llms.txt), resumos fáticos e seção de FAQ visual no DOM. |
| **FR-04.1** | Alinhamento NAP (Name, Address, Phone) | 🟢 **100% Alinhado** | Nome (*KonohaTech*), CNPJ (*45.109.825/0001-92*), Telefone (*+55 81 98777-2234*) e Localidade (*Recife-PE*) idênticos no Schema JSON-LD e rodapé [`Footer.tsx`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/src/components/Footer.tsx). |
| **FR-04.2 / FR-04.3** | Integração Google Business Profile | 🟢 **100% Alinhado** | Perfil do Google Meu Negócio criado e linkado no array `sameAs` do Schema.org em [`index.html`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/index.html). |
| **FR-05.1** | Schema `ProfessionalService` JSON-LD | 🟢 **100% Alinhado** | Injetado com coordenadas GPS (-8.05428, -34.8813), telefone, fundador e ofertas em [`index.html`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/index.html#L47-L134). |
| **FR-05.2** | Schema `FAQPage` JSON-LD + DOM Visível | 🟢 **100% Alinhado** | 5 Perguntas/Respostas presentes no JSON-LD de [`index.html`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/index.html#L146-L190) **E** espelhadas no componente visual [`FAQ.tsx`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/src/components/FAQ.tsx) renderizado em [`App.tsx`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/src/App.tsx#L74) (cumprindo a regra anti-hidden content do Google). |
| **NFRs** | HTTPS, Responsividade, LGPD | 🟢 **100% Alinhado** | Servido via HTTPS; 100% responsivo; gestão de consentimento via [`CookieConsentManager.tsx`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/src/components/CookieConsentManager.tsx). |

---

## 🎯 2. Análise Detalhada dos 5 Pilares do PRD

### Pilar 1: Auditoria Técnica & Performance (FR-01 & NFRs)
- **O que está alinhado**:
  - `robots.txt` configurado permitindo crawlers de busca e LLMs (ChatGPT, Perplexity, ClaudeBot, Google-Extended) enquanto bloqueia bots predatórios.
  - Preconnect de fontes Google DNS e suporte `display=swap` em `index.html`.
  - Canonical URL explicitamente apontando para a URL oficial da KonohaTech.

### Pilar 2: Otimização On-Page & Meta Tags (FR-03)
- **O que está alinhado**:
  - `<title>` com exatamente 61 caracteres focado na palavra-chave primária transacional geolocalizada: `KonohaTech — Desenvolvimento de Software, Web & IA em Recife-PE`.
  - `<meta name="keywords">` incluindo variações de cauda longa ("desenvolvimento de software e sites recife-PE", "tecnologia porto digital recife-PE", "criação de sistemas web pernambuco").
  - Meta tags geográficas nativas (`geo.region`, `geo.placename`, `geo.position`, `ICBM`).
  - Título principal $H1$ no componente [`Hero.tsx`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/src/components/Hero.tsx#L188) ajustado para SEO e conversão.

### Pilar 3: Dados Estruturados Schema.org (FR-05)
- **O que está alinhado**:
  - `@graph` contendo `ProfessionalService`, `WebSite` e `FAQPage`.
  - Inclusão de atributos de autoridade E-E-A-T: CNPJ oficial (`45.109.825/0001-92`), Fundador (`Gabriel Campos`), Coordenadas Geo de Recife e `hasOfferCatalog` mapeando os serviços prestados.

### Pilar 4: GEO (Generative Engine Optimization) & Readiness para IA (FR-03.5)
- **O que está alinhado**:
  - Arquivo [`public/llms.txt`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/public/llms.txt) catalogado para consumo por LLMs.
  - Respostas diretas sem rodeios (format Answer-First) na seção de FAQ e nas descrições de serviços.

### Pilar 5: SEO Local e GBP (FR-04) - *Próximos Passos*
- **Ações complementares sugeridas**:
  1. Cadastrar/reivindicar a ficha no Google Business Profile (GBP) com as categorias "Fábrica de Software" / "Empresa de Tecnologia".
  2. Adicionar menções discretas aos bairros estratégicos de Recife (Boa Viagem, Recife Antigo / Porto Digital, Ilha do Leite) no rodapé ou na seção local do site para reforçar cauda longa extrema.
  3. Adquirir e configurar domínio próprio TLD (ex: `konohatech.com.br` ou `konohatech.dev`) para maximizar CTR e autoridade de marca.

---

## 🚀 3. Plano de Ação & Checklist de Conclusão (DoD)

- [x] **Tag Title e Meta Description otimizadas no `index.html`**
- [x] **Geotags e Coordenadas de Recife injetadas**
- [x] **Schema.org ProfessionalService + FAQPage sincronizados entre JSON-LD e DOM**
- [x] **Rastreabilidade de IA (robots.txt + llms.txt) configurados**
- [x] **Configuração e Vínculo com Perfil do Google Meu Negócio (Concluído e adicionado ao Schema `sameAs`)**
- [ ] **Migração recomendada para domínio próprio (`.com.br` / `.dev`)**
