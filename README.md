# 🔴 KonohaTech — Engenharia de Software & Soluções Digitais

> Engenharia de software de ponta, sistemas escaláveis e automações inteligentes. Código puro, entregas blindadas.

[![Deploy to GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-df2531?style=for-the-badge&logo=github)](https://www.konohatech.com.br/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

---

## 🌐 Demonstração Online

A aplicação está hospedada e em produção contínua no GitHub Pages:
- **Landing Page Completa:** [https://www.konohatech.com.br/](https://www.konohatech.com.br/)
- **Hub BioLinks (Mobile-First):** [https://www.konohatech.com.br/?page=links](https://www.konohatech.com.br/?page=links)

---

## 🚀 Visão Geral do Projeto

O **KonohaTech** é um ecossistema web moderno construído com **React 19**, **TypeScript** e **Tailwind CSS v4**, projetado para oferecer uma experiência visual imersiva (Cyber/Glassmorphic com a assinatura visual vermelha `#df2531`).

A plataforma opera em dois modos integrados via roteamento semântico por query parameter:

1. **Landing Page Institucional:** Uma página de conversão completa para captação de clientes B2B, apresentando proposta de valor, dores de mercado, soluções de engenharia, serviços, cases reais e simulador de orçamento interativo.
2. **Hub BioLinks (`?page=links`):** Interface mobile-first para bio de redes sociais com navegação inovadora via **Menu Circular de Escolhas** com física de mola (Framer Motion), animação de pulso e troca instantânea para lista clássica.

---

## ✨ Funcionalidades Principais

### 🎯 Landing Page Institucional
- **Hero & Atmospheric Glow:** Iluminação volumétrica em tons escuros e vermelho neon com badge de status operacional.
- **Seção Problema vs. Solução:** Mapeamento visual das dores de gargalo técnico em empresas e o framework de solução da KonohaTech.
- **Showcase de Serviços:** Desenvolvimento Web de alta performance, Arquitetura em Nuvem & DevOps, Automações & IA e APIs robustas.
- **Portfólio com Modal Interativo:** Demonstração de cases em produção (ex: *Psicólogo Heron Silveira*, *Clínica Dra. Ana Carolina*, *E&A Oliveira Seguros*) com navegação por slides e detalhes técnicos.
- **Simulador de Orçamento Interativo (Wizard):** Formulário em etapas que calcula estimativa de investimento e escopo com base no porte e necessidades da empresa.
- **Rodapé Responsivo:** Estrutura em duas colunas no mobile (`Navegação` e `Projetos`) com metadados e CNPJ institucional.

### 📱 BioLinks Mobile-First (`?page=links`)
- **Menu de Escolhas Circular (`CircularCommandMenu`):**
  - Botão central pulsante com anel de radar/ping para atrair a atenção do usuário quando fechado.
  - Expansão simultânea dos 5 itens em 360° com física de mola instantânea.
  - Seleção em dois passos: clique para selecionar e exibir o card de ação; segundo clique para acessar o destino.
- **Alternador de Modos:** Troca instantânea entre visualização **Circular** e **Lista Clássica**.
- **Lista Dinâmica de Ações:**
  - Card de ação limpo do serviço selecionado (`Acessar ↗`).
  - Banner de escassez e urgência ("Slots de Desenvolvimento – Q2/2026") posicionado estrategicamente abaixo do menu.
- **Integração WhatsApp:** Disparo direto de mensagens pré-formatadas para orçamentos e agendamento de squads.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Função |
|---|---|---|
| **React** | `^19.0.1` | Biblioteca de interface declarativa e componentes reativos |
| **TypeScript** | `~5.8.2` | Tipagem estática rigorosa para confiabilidade de código |
| **Vite** | `^6.2.3` | Bundler de desenvolvimento ultra-rápido com HMR |
| **Tailwind CSS** | `^4.1.14` | Framework CSS utilitário com engine nativa `@tailwindcss/vite` |
| **Framer Motion** | `^13.4.2` | Animações de mola, gestos e transições de presença |
| **Lucide React** | `^0.546.0` | Ícones vetoriais modernos e consistentes |
| **Vitest** | `^4.1.10` | Suíte de testes unitários e de componentes |
| **Testing Library** | `^16.3.2` | Testes centrados no comportamento do usuário |
| **gh-pages** | `^6.3.0` | Automação de deploy para a branch `gh-pages` |

---

## 📂 Estrutura de Pastas

```plaintext
konohaTech/
├── .github/                 # Workflows e configurações do GitHub
├── public/                  # Favicons, manifest e _redirects
├── src/
│   ├── assets/              # Imagens dos clientes e identidade visual
│   ├── components/          # Componentes modulares da interface
│   │   ├── ui/              # Componentes de design system (ex: CircularCommandMenu)
│   │   ├── Benefits.tsx     # Seção de benefícios e diferenciais
│   │   ├── BioLinks.tsx     # Página de Hub de links da bio
│   │   ├── ContactForm.tsx  # Modal e simulador de orçamento
│   │   ├── Footer.tsx       # Rodapé institucional (2 colunas mobile)
│   │   ├── Header.tsx       # Barra de navegação com menu de comandos
│   │   ├── Hero.tsx         # Seção principal de apresentação
│   │   ├── Portfolio.tsx    # Seção de projetos e clientes
│   │   ├── PortfolioModal.tsx # Modal interativo de cases reais
│   │   ├── Problem.tsx      # Seção de desafios e dores de mercado
│   │   ├── Process.tsx      # Metodologia e etapas de entrega
│   │   ├── Services.tsx     # Lista de serviços prestados
│   │   ├── Solution.tsx     # Soluções arquiteturais
│   │   └── Technologies.tsx # Grid de tecnologias suportadas
│   ├── data.ts              # Fonte única de dados (links, projetos, perfis)
│   ├── hooks/               # Custom hooks (roteamento por query, etc.)
│   ├── lib/                 # Utilitários de estilo (cn, tailwind-merge)
│   ├── test/                # Testes unitários com Vitest
│   ├── types.ts             # Definições de interfaces TypeScript
│   ├── App.tsx              # Componente raiz com alternador de rotas
│   ├── main.tsx             # Ponto de entrada React
│   └── index.css            # Variáveis globais, tokens de cores e Tailwind
├── vite.config.ts           # Configurações do Vite e base path
├── tsconfig.json            # Configurações de compilação do TypeScript
└── package.json             # Dependências e scripts de execução
```

---

## 💻 Começando Localmente

### Pré-requisitos
- **Node.js** (versão 18+ recomendada)
- **npm** ou **yarn** / **pnpm**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Gee152/konohaTech.git
   cd konohaTech
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em: `http://localhost:3000/konohaTech/`

---

## 🧪 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor local de desenvolvimento na porta `3000` |
| `npm run build` | Compila o projeto TypeScript e gera o bundle minificado em `dist/` |
| `npm run preview` | Pré-visualiza localmente a versão gerada em `dist/` |
| `npm run lint` | Executa a checagem de tipos do TypeScript sem emitir arquivos (`tsc --noEmit`) |
| `npm test` | Executa todos os testes unitários via Vitest em modo run |
| `npm run test:watch` | Executa os testes em modo interativo com hot-reload |
| `npm run deploy` | Executa o build (`predeploy`) e publica automaticamente na branch `gh-pages` |

---

## 🚢 Deploy no GitHub Pages

O projeto está configurado para deploy automático através da branch `gh-pages`:

```bash
# 1. Faça o commit das suas alterações na branch principal
git add .
git commit -m "feat: nova funcionalidade implementada"
git push origin main

# 2. Execute o deploy automático
npm run deploy
```

O comando irá compilar o código mais recente e publicar diretamente em:
👉 **[https://www.konohatech.com.br/](https://www.konohatech.com.br/)**

---

## 📄 Licença

© 2026 **KonohaTech**. Todos os direitos reservados.  
CNPJ: `45.109.825/0001-92` • Recife, PE — Brasil.
