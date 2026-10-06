# 📋 PRD — Documento de Requisitos de Produto: Mockup de Apresentação Comercial & Showcase de Clientes

> **Projeto:** KonohaTech — Engenharia de Software & Soluções Digitais  
> **Documento:** PRD para Mockup de Apresentação de Projetos & Propostas  
> **Versão:** 1.0.0 | **Status:** Aprovado para Coleta de Assets e Geração  
> **Autor / Agente:** Product Manager (`@product-manager`)  

---

## 1. 🎯 Visão Geral & Objetivos

### 1.1 Contexto e Justificativa
A **KonohaTech** atua no  e sites de alta performance, landing pages de conversão e automações com IA para clientes de nichos diversos (saúde, imóveis, seguros, psicologia, fitness). 

Para acelerar o fechamento de propostas comerciais e elevar o valor percebido de novos projetos, é necessário um **modelo padronizado de Mockup de Apresentação**. Este mockup serve como um show de impacto visual (pitch / apresentação de projeto), onde os materiais do cliente (fotos, prints do Instagram/site atual, logos e paleta de cores) são sintetizados em uma peça visual moderna, nos padrões da KonohaTech (dark mode, glassmorphism, micro-detalhes de engenharia e tipografia refinada).

### 1.2 Objetivo Central
Definir a especificação completa para gerar apresentações de mockups de alto impacto, estruturando o pipeline que:
1. Recebe **prints e fotos reais de clientes**.
2. **Extrai a paleta cromática**, hierarquia tipográfica e estilo visual do cliente.
3. Funde a identidade do cliente com o acabamento de engenharia da **KonohaTech**.
4. Gera um **mockup de apresentação completo e modular** (formato 16:9 / apresentação de slides ou showcase em tela única).

### 1.3 Métricas de Sucesso
* **Velocidade de Geração:** Tempo de transformação de fotos brutas em mockup final < 15 minutos.
* **Fidelidade de Cores:** Extração de paleta harmoniosa (Primária, Secundária, Acento, Fundo e Superfície).
* **Taxa de Conversão Comercial:** Percepção de valor premium ("Uau!") na reunião de apresentação de proposta.

---

## 2. 👥 Personas & Casos de Uso

| Caso de Uso | Usuário / Alvo | Objetivo do Mockup |
|---|---|---|
| **Proposta Comercial (Pitch)** | Lead interessado em novo site/sistema | Ver como sua marca ficará no ar com tecnologia moderna antes de assinar contrato. |
| **Apresentação de Entrega** | Cliente ativo em fase de validação | Visualizar a aplicação final renderizada em dispositivos (Desktop + Mobile) com métricas de entrega. |
| **Showcase de Portfólio** | Redes sociais da KonohaTech (Instagram / LinkedIn) | Publicar cases de sucesso com comparativo "Antes vs. Depois" e paleta de cores do cliente. |

---

## 3. 🎨 Pipeline de Ingestão de Assets & Extração Cromática

O sistema de mockup opera através de um pipeline em 4 etapas:

```
┌─────────────────┐     ┌──────────────────┐     ┌───────────────────┐     ┌──────────────────┐
│  1. RECEBIMENTO │ ──> │ 2. EXTRAÇÃO DE   │ ──> │ 3. HARMONIZAÇÃO   │ ──> │ 4. COMPOSIÇÃO DO │
│  Prints & Fotos │     │    DESIGN TOKENS │     │    CROMÁTICA      │     │    MOCKUP FINAL  │
└─────────────────┘     └──────────────────┘     └───────────────────┘     └──────────────────┘
```

### 3.1 Entradas Requeridas do Usuário
O usuário fornecerá:
1. **Fotos de Perfil / Profissional:** Retratos do cliente em alta qualidade (para compor autoridade e bio).
2. **Prints da Interface / Redes:** Capturas de tela do Instagram, site atual ou identidade visual existente.
3. **Logotipo / Assinatura (se houver):** Elemento gráfico principal da marca do cliente.
4. **Nicho e Especialidade:** Ex.: Fisioterapia Pélvica, Imóveis de Luxo, Psicologia Clínica, Seguros.

### 3.2 Protocolo de Extração de Paleta de Cores
A partir das imagens fornecidas, o agente extrairá:
* **Cor Dominante (Primária):** O tom característico da marca do cliente (ex.: azul saúde, verde esmeralda, dourado imobiliário, terracota acolhedor).
* **Cor de Acento / Destaque:** Cor vibrante para botões de CTA, badges e glows neon.
* **Base de Contraste (Dark / Light):** Fundo profundo (`#050505` a `#0f172a` para estilo Cyber/Glassmorphic KonohaTech ou `#fcfcfd` para clean minimalista).
* **Superfícies de Vidro (Glassmorphism):** Camadas translúcidas com opacidade calculada (10% a 20% com blur e borda de 1px reflexiva).

---

## 4. 📐 Anatomia do Modelo de Mockup de Apresentação (16:9)

O mockup de apresentação é concebido no formato **16:9 (1920x1080)**, otimizado para telas, apresentações em PDF, slides e carrosséis. Ele é estruturado em blocos modulares:

### Bloco A: Header & Identidade da Apresentação
* **Badge de Status:** Ex.: `[PROPOSTA EXCLUSIVA]`, `[REQUISIÇÃO DE ARQUITETURA]`, `[CASE DE SUCESSO]`.
* **Identificação Co-branded:** Logo da KonohaTech (`#df2531`) + Nome do Cliente & Segmento.
* **Título de Impacto:** Headline focada na transformação digital e faturamento do cliente.

### Bloco B: O Showcase Central de Dispositivos (Device Frames)
* **Moldura Desktop (MacBook / Browser Moderno):**
  * Barra de título com botões de janela (vermelho, amarelo, verde) ou minimalista escuro.
  * Captura da nova página/sistema em escala perfeita.
* **Moldura Mobile (iPhone / Smartphone sem bordas):**
  * Tela vertical sobreposta com efeito de profundidade (sombra suave e reflexo de vidro).
  * Exibição do fluxo móvel de conversão rápida (agendamento WhatsApp, bio de links ou checkout).

### Bloco C: Ficha Técnica & Paleta de Cores Extraída
* **Swatches de Cores:** Cartões com código HEX, nome funcional e amostra visual (Primária, Secundária, Superfície, Texto).
* **Spec Tipográfica:** Famílias de fontes recomendadas (ex.: Display Sans + Body Sans + JetBrains Mono para dados técnicos).
* **Stack Tecnológico Proposto:** Badges das tecnologias (React 19, Tailwind CSS v4, TypeScript, Vite, SEO/GEO).

### Bloco D: Métricas de Impacto & Valor Agregado
* **Performance Score:** Badges de pontuação 99+ no Google PageSpeed (Performance, Acessibilidade, SEO, Boas Práticas).
* **Diferenciais:** Carregamento instantâneo (< 0.8s), Otimização para IAs generativas (llms.txt), Proteção e blindagem de código.
* **Call to Action (CTA):** Botão de ação direta (ex.: "Aprovar Escopo & Iniciar Sprint 01").

---

## 5. 🛠️ Formatos de Renderização e Entregáveis

O modelo suporta duas formas complementares de entrega:

1. **Mockup Visual de Alta Resolução (Arte Gráfica 16:9):**
   * Imagem final hiper-realista e refinada para envio direto no WhatsApp do cliente ou inserção em PDF comercial.
   * Iluminação volumétrica, sombras calibradas e materiais em vidro e metal fosco.

2. **Componente de Apresentação Web Interativo (Opcional):**
   * Tela web responsiva no próprio projeto KonohaTech com animações do Framer Motion, permitindo navegação interativa pelo cliente.

---

## 6. 🚦 Critérios de Aceite (Gherkin ACs)

### Cenário 1: Extração cromática com fidelidade
```gherkin
Dado que o usuário fornece prints ou fotos de um cliente
Quando o agente analisar as imagens recebidas
Então deve identificar no mínimo 3 cores fundamentais (Primária, Acento e Fundo) com códigos HEX válidos
E validar se o contraste visual atende aos critérios de legibilidade (WCAG AA).
```

### Cenário 2: Montagem do mockup co-branded
```gherkin
Dado que as cores e fotos do cliente foram processadas
Quando o mockup de apresentação for montado
Então deve integrar a marca do cliente respeitando a estética de ponta da KonohaTech
E conter a exibição em molduras de dispositivo (Desktop e/ou Mobile).
```

### Cenário 3: Exibição da ficha técnica e proposta de valor
```gherkin
Dado a visualização da apresentação
Quando o cliente analisar o documento
Então deve estar visível a paleta de cores, a tipografia recomendada e os indicadores de performance esperados.
```

---

## 7. 🚀 Próximos Passos Imediatos

Para iniciarmos a geração do seu primeiro mockup neste modelo:
1. **Envio das Fotos e Prints:** Você pode anexar/descrever ou apontar as fotos dos clientes e capturas de tela.
2. **Definição do Cliente do Mockup:** Qual cliente ou segmento será o primeiro (ex.: Saúde/Fisioterapia, Imobiliário, Psicologia, Seguros, ou novo cliente)?
3. **Extração e Execução:** Processaremos os elementos visuais, criaremos os tokens de design e geraremos o mockup final!
