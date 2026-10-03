# 📐 Guia de Padrões Arquiteturais, Design & Código — KonohaTech

> **Documento Oficial de Padronização para Revisões Técnicas (Code Review & Auditoria)**  
> **Aplica-se a:** Landing Page, Hub BioLinks, Componentes UI, Integrações e Assets  
> **Última Atualização:** Outubro de 2026 | **Versão:** 2.0 (High Performance & GEO Standard)

---

## 🎯 Objetivo Deste Documento

Este guia define os **padrões obrigatórios** deste projeto. Qualquer nova funcionalidade, refatoração ou revisão de código (**Code Review**) deve ser auditada contra as diretrizes descritas aqui para garantir consistência visual, performance extrema e rankeamento de ponta em buscadores tradicionais e IAs generativas.

---

## 1. 🎨 Padrões de Design System & Identidade Visual

A KonohaTech segue uma estética **Cyberpunk / Deep Dark / Minimalista de Alta Precisão**, com alto contraste e micro-interações refinadas.

### 1.1. Paleta de Cores e Tokens Oficiais (`src/index.css`)
Todas as novas páginas e componentes devem consumir exclusivamente os tokens definidos:

| Nome do Token | Valor CSS / Tailwind | Uso Obrigatório |
| :--- | :--- | :--- |
| **Dark Background** | `#050505` (`bg-[#050505]`) | Fundo base global de toda a aplicação |
| **Surface / Card** | `rgba(255, 255, 255, 0.03)` / `#121214` | Fundo de cartões, painéis e modais |
| **Brand Red (Primária)** | `#df2531` (`text-brand-red`, `bg-brand-red`) | Acentos principais, badges ativos, CTAs |
| **Brand Red Hover** | `#b81c26` (`hover:bg-[#b81c26]`) | Estados de hover e foco em botões vermelhos |
| **Brand Red Glow** | `rgba(223, 37, 49, 0.15)` | Halos de luz de fundo e blur atmosférico |
| **Bordas Sutis** | `rgba(255, 255, 255, 0.06)` a `0.10` | `border-white/5` ou `border-white/10` para divisão de blocos |
| **Bordas Ativas / Hover** | `rgba(223, 37, 49, 0.40)` | `hover:border-brand-red/40` em cards interativos |

> 🚫 **Regra Anti-Slop:** Nunca utilize roxo genérico, azul padrão de framework ou sombras cinzas convencionais. Sombras devem usar halos neon direcionados (`shadow-[0_0_20px_-3px_rgba(223,37,49,0.4)]`).

### 1.2. Tipografia e Hierarquia
* **Display / Títulos:** `Space Grotesk` / `Inter` (`font-display font-bold tracking-tight text-white`).
* **Corpo / Textos:** `Inter` (`font-sans text-zinc-400 text-sm leading-relaxed`).
* **Metadados / Eyebrows / Códigos:** `JetBrains Mono` (`font-mono text-xs uppercase tracking-widest`).

---

## 2. 🧩 Padrões de Componentização & Clean Code

Para evitar duplicações e reinvenção de interfaces, **reutilize rigorosamente os componentes atômicos**.

### 2.1. Padrão de Cabeçalho de Seção (`SectionHeader`)
Qualquer seção da landing page com título, subtítulo ou badge decorativo **DEVE** utilizar o [`SectionHeader`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/src/components/ui/SectionHeader.tsx):

```tsx
// ✅ FORMA CORRETA (Padronizada):
import SectionHeader from './ui/SectionHeader';

<SectionHeader
  eyebrow="Nossos Serviços"
  title="Engenharia de ponta para impulsionar seu pipeline digital"
  description="Moldamos tecnologia em ferramentas escaláveis e de alta performance."
  align="center" // ou "left"
/>

// ❌ PROIBIDO: Recriar divs manuais de título com classes ad-hoc e tags h2 soltas.
```

### 2.2. Padrão de Links e Ícones de WhatsApp
Toda chamada ou botão de contato via WhatsApp **DEVE** passar pelo utilitário centralizado e pelo ícone nativo:

```tsx
// ✅ FORMA CORRETA:
import WhatsAppIcon from './ui/WhatsAppIcon';
import { getWhatsAppUrl } from '../utils/whatsapp';

const whatsappUrl = getWhatsAppUrl(
  DATA[0]?.socialMedia?.whatsapp,
  'Olá KonohaTech! Gostaria de entender mais sobre os serviços.'
);

<a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
  <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
</a>

// ❌ PROIBIDO: Hardcodar strings como "https://api.whatsapp.com/send?phone=..." ou SVGs duplicados.
```

### 2.3. Padrão Estrito de Ícones Lucide (Anti-Bloat & Tree-Shaking)
Nunca importe bibliotecas completas de ícones:

```tsx
// ✅ FORMA CORRETA: Importação seletiva nominal
import { Layout, Sparkles, TrendingUp, Check } from 'lucide-react';

const icons = { Layout, Sparkles, TrendingUp };

// ❌ TERMINANTEMENTE PROIBIDO:
import * as LucideIcons from 'lucide-react'; // 🚨 Adiciona 850kB de ícones desnecessários ao bundle!
```

### 2.4. Padrão de Separação de Rotas: Landing Page vs. BioLinks
* O projeto opera em modo híbrido SPA:
  * `/` (Landing Page Completa institucional).
  * `/?page=links` (Hub de BioLinks Mobile-First).
* **Regra de Isolamento:** O menu circular [`CircularCommandMenu`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/src/components/ui/circular-command-menu.tsx) pertence **exclusivamente ao `BioLinks.tsx`**. O [`Header.tsx`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/src/components/Header.tsx) da Landing Page deve conter apenas a navegação clássica no Desktop e menu hambúrguer no Mobile.
* [`BioLinks.tsx`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/src/components/BioLinks.tsx) deve ser sempre importado via `React.lazy()` com `<Suspense>` em [`App.tsx`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/src/App.tsx).

---

## 3. ⚡ Padrões de Alta Performance & Redes Móveis (4G/5G/Wi-Fi)

Todo código novo deve ser aprovado com foco em dispositivos móveis e conexões de latência variável.

### 3.1. Padrão de Renderização de Imagens
Toda tag `<img>` no projeto precisa conter 4 atributos obrigatórios:

```tsx
<img
  src={imagemSrc}
  alt="Descrição clara e acessível do asset"
  width={400}             // 1. Largura explícita (evita CLS)
  height={300}            // 2. Altura explícita (evita CLS)
  loading="lazy"          // 3. Carregamento sob demanda fora do viewport
  decoding="async"        // 4. Decodificação assíncrona fora da thread da UI
/>
```
> *Exceção:* Logos e banners *above-the-fold* (visíveis de imediato ao abrir a página) recebem `fetchPriority="high"` ao invés de `loading="lazy"`.

### 3.2. Padrão de CSS e Fontes Não-Bloqueantes
* **Sem `@import` em CSS:** Nunca inclua `@import url('https://fonts.googleapis.com/...')` em arquivos `.css`. Isso gera gargalo na árvore de renderização (CSSOM).
* **Preconnect no HTML:** O carregamento de webfonts deve ser realizado exclusivamente no [`index.html`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/index.html) com `<link rel="preconnect">` antecipado para `fonts.googleapis.com` e `fonts.gstatic.com`.

### 3.3. Padrão de Code-Splitting e Chunks (`vite.config.ts`)
As dependências do `package.json` devem ser agrupadas em pacotes imutáveis no Rollup:
* `vendor-react`: `react`, `react-dom`.
* `vendor-motion`: `motion`, `framer-motion`.
* `vendor-lucide`: Ícones específicos do `lucide-react`.
* `index`: Código puro da KonohaTech (**meta: sempre < 150 kB**).

### 3.4. Padrão de Consciência de Bateria & Conexão Móvel
Componentes com animações contínuas (Canvas, Vídeos em loop ou LERP com mouse/scroll) devem checar o status de economia do cliente:

```ts
const isSlowConnection = 
  typeof navigator !== 'undefined' && 
  ('connection' in navigator) &&
  ((navigator as any).connection?.saveData || ['2g', '3g'].includes((navigator as any).connection?.effectiveType));
```
Se `isSlowConnection` for verdadeiro: pausar ou reduzir a taxa de amostragem de animações e definir `preload="metadata"` em mídias pesadas.

---

## 4. 🤖 Padrões GEO (Generative Engine Optimization) & SEO Técnico

Para que a KonohaTech seja citada com precisão factual pelo Google, ChatGPT Search, Perplexity AI e Claude:

### 4.1. Regra da Documentação Factual (`public/docs/*.md`)
Qualquer alteração em serviços, planos ou novos cases do portfólio exige atualização correspondente na documentação:
* **Novo Serviço?** Documentar escopo, entregáveis e diferenciais em [`public/docs/servicos.md`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/public/docs/servicos.md).
* **Novo Case de Sucesso?** Adicionar métricas comprovadas, stack utilizada e URL em [`public/docs/cases.md`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/public/docs/cases.md).
* **Novo Canal Comercial?** Atualizar [`public/docs/contato.md`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/public/docs/contato.md) e [`public/docs/biolinks.md`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/public/docs/biolinks.md).

### 4.2. Padrão do Arquivo `public/llms.txt`
* Manter o resumo institucional em [`public/llms.txt`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/public/llms.txt) conciso (formato markdown denso, sem floreios publicitários excessivos), permitindo que agentes LLM façam parsing com gasto mínimo de tokens.

### 4.3. Padrão Schema.org em JSON-LD (`index.html`)
* Todas as entidades da marca devem ser mantidas no nó `@graph`:
  * `ProfessionalService`: Contendo CNPJ (`45.109.825/0001-92`), endereço completo de Recife-PE, telefone comercial, catálogo de serviços e área de cobertura.
  * `WebSite`: Domínio e rota canônica.
  * `FAQPage`: Perguntas e respostas técnicas atualizadas.

### 4.4. Padrão de Rastreabilidade Semântica Invisível (Crawlable & Screen-Reader Only)
* **Regra de Interface Humana:** Links técnicos de documentação e manifesto de IA (`llms.txt`, `docs/*.md`) **NÃO** devem poluir a interface visual de navegação do usuário.
* **Técnica de Indexação Homologada:**
  1. No rodapé ([`Footer.tsx`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/src/components/Footer.tsx)): Manter os links encapsulados em `<nav aria-label="Rastreamento IA e Documentação Semântica" className="sr-only">`. O `sr-only` garante 100% de leitura para bots, indexadores e leitores de tela sem qualquer impacto visual na tela.
  2. No cabeçalho ([`index.html`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/index.html)): Incluir tags semânticas `<link rel="help" ... />` e `<link rel="documentation" ... />` diretamente no `<head>`.
  3. No [`robots.txt`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/public/robots.txt) e [`sitemap.xml`](file:///c:/Users/gabri/OneDrive/Pictures/konohaTech/konohaTech/public/sitemap.xml): Manter as rotas liberadas e mapeadas explicitamente.

---

## 5. ✅ Checklist Obrigatório de Code Review (PR / Deploy)

Antes de aprovar qualquer alteração ou executar o comando de deploy, verifique:

- [ ] **Design:** O fundo permaneceu `#050505` e os elementos seguem o tema dark neon com bordas sutis `border-white/5` ou `border-white/10`?
- [ ] **Componentes:** Títulos de seção utilizam o `<SectionHeader />`?
- [ ] **WhatsApp:** Todos os botões do WhatsApp utilizam o `getWhatsAppUrl` e o `<WhatsAppIcon />`?
- [ ] **Lucide Icons:** Não há nenhum `import * as ... from 'lucide-react'`?
- [ ] **Header / BioLinks:** O menu circular `CircularCommandMenu` está ausente do `Header.tsx` e presente apenas em `BioLinks.tsx`?
- [ ] **Imagens:** Todas as novas tags `<img>` possuem `width`, `height`, `loading="lazy"` e `decoding="async"`?
- [ ] **CSS:** Não há `@import url(...)` adicionado em arquivos CSS?
- [ ] **Testes Vitest:** Todos os testes passam executando `npm run test`?
- [ ] **Tipagem TypeScript:** O comando `npm run lint` (`tsc --noEmit`) retorna 0 erros?
- [ ] **Build:** O comando `npm run build` conclui sem gerar alertas de chunks maiores que 500 kB?

---

## 6. 🚀 Comandos Operacionais Homologados

```bash
# 1. Executar bateria de testes automatizados (66 testes)
npm run test

# 2. Validar tipagem estrita com TypeScript
npm run lint

# 3. Gerar pacote de produção com Rollup manualChunks
npm run build

# 4. Publicar automaticamente no GitHub Pages
npm run deploy
```
