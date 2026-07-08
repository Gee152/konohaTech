import { Service, PortfolioProject, Testimonial, WorkflowStep, TechBadge, Data } from './types'
import logoSrc from './assets/img/heron.webp'
import eaoliveira from './assets/img/eaoliveira.webp'
import anaCarolina from './assets/img/anaCarolina.png'

const logo = logoSrc;
const eaOliveira = eaoliveira;
const anacarolina = anaCarolina;

export const DATA: Data[] = [
  {
    email: 'contatokonohatech@gmail.com',
    phone: '(81) 98777-2234',
    address: 'Recife - PE',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/gabriel-alves-7967641b1',
      github: 'https://github.com/gee152',
    whatsapp: '558187772234',
    instagram: 'https://www.instagram.com/konoha.tech/',
    tiktok: '@konohatech'
  },
  about: 'asd',
  }
]

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Desenvolvimento Web',
    description: 'Landing pages, sistemas e aplicações modernas de alto desempenho.',
    features: [
      'Performance máxima e Web Vitals otimizados',
      'Designs responsivos exclusivos (Mobile e Desktop)',
      'SEO integrado para atração orgânica',
      'Segurança completa com práticas modernas'
    ],
    iconName: 'Layout'
  },
  {
    id: 'api-backend',
    title: 'APIs e Back-end',
    description: 'Arquiteturas robustas, seguras e preparadas para escalabilidade.',
    features: [
      'Construção de APIs REST ou GraphQL robustas',
      'Modelagem de banco de dados otimizada',
      'Microsserviços de alto desempenho',
      'Integrações com sistemas legado'
    ],
    iconName: 'Database'
  },
  {
    id: 'automations',
    title: 'Automações',
    description: 'Integrações e otimização de processos internos eficientes.',
    features: [
      'Eliminação de tarefas manuais repetitivas',
      'Webhooks e gatilhos automatizados',
      'Redução de erros operacionais e gargalos',
      'Integração fluida entre diferentes softwares (SaaS)'
    ],
    iconName: 'Cpu'
  },
  {
    id: 'qa-tests',
    title: 'QA e Testes',
    description: 'Garantia completa de qualidade para blindar seu produto.',
    features: [
      'Testes E2E com Cypress e Playwright',
      'Cobertura extensa de testes unitários e funcionais',
      'Monitoramento preventivo de falhas em produção',
      'Esteiras de CI/CD para deploy seguro'
    ],
    iconName: 'CheckSquare'
  },
  {
    id: 'ai-solutions',
    title: 'Inteligência Artificial',
    description: 'Assistentes inteligentes e automação cognitiva.',
    features: [
      'Assistentes virtuais e chatbots com LLMs',
      'Classificação e análise de dados complexos',
      'Processamento de Linguagem Natural (NLP)',
      'Geração inteligente de relatórios e conteúdos'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'consulting',
    title: 'Consultoria',
    description: 'Planejamento estratégico e modernização tecnológica.',
    features: [
      'Auditoria de arquitetura de software',
      'Estratégias de migração para nuvem',
      'Otimização de custos de infraestrutura',
      'Planejamento técnico para escalabilidade'
    ],
    iconName: 'TrendingUp'
  }
];

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: 'apex-inventory',
    title: "Psicologo Heron Silveira",
    category: 'Sistemas Web',
    tags: ['React', 'Node.js', ],
    description: "Site focado em divulgação de serviços psicológicos, apresentando consultas presenciais e online. O projeto visa converter visitantes em pacientes através de um design profissional e acolhedor, com agendamento direto via WhatsApp.",
    image: `${logo}`,
    url: 'https://heronpsicologo.com'
  },
  {
    id: 'chrono-flow',
    title: "Fisioterapeuta Ana Carolina",
    category: "Gthree",
    tags: ['React', 'TypeScript', 'Tailwind CSS',],
    description: "Ambiente online com intuito de levar o paciente até sua consulta de modo fácil e prático, dando visão geral da profissional. O projeto visa converter visitantes em pacientes através de um design profissional e acolhedor, com agendamento direto via WhatsApp.",
    image: `${anacarolina}`,
    url: "https://gee152.github.io/LDA_fisioterapeuta_Ana_Carolina/"
  },
  {
    id: 'elysium-portal',
    title: "EaOliveira Corretora de Seguros",
    category: 'Site de vendas',
    tags: ['Astro', 'TypeScript', 'Tailwind CSS', 'Playwright'],
    description: "Site focado na venda de seguros, apresentando diversas opções de seguros para diferentes necessidades. O projeto visa converter visitantes em clientes através de um design profissional e acolhedor, com agendamento direto via WhatsApp.",
    image: `${eaOliveira}`,
    url: 'https://eaoliveiracorretoradeseguros.com'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'carlos-henrique',
    name: 'Carlos Henrique',
    role: 'CTO',
    company: 'Vortex Fintech',
    comment: 'A Konoha Tech entregou nosso novo motor de pagamentos em tempo recorde. O sistema é robusto, seguro e o suporte técnico prestado foi incrível durante todo o projeto.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 'beatriz-mello',
    name: 'Beatriz Mello',
    role: 'Diretora de Operações',
    company: 'LogiCargo Logística',
    comment: 'Automatizamos todo o faturamento da nossa frota com o fluxo de automações desenvolvido pela Konoha. Reduzimos o retrabalho manual a zero e ganhamos tempo.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 'rodrigo-almeida',
    name: 'Rodrigo Almeida',
    role: 'Fundador',
    company: 'Elysium Developments',
    comment: 'Nossa nova landing page comercial superou todas as metas de conversão de leads altamente qualificados. O refinamento de design premium faz toda a diferença.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80'
  }
];

export const PROCESS_STEPS: WorkflowStep[] = [
  {
    stepNumber: 1,
    title: 'Entendimento do negócio',
    description: 'Análise profunda e alinhamento dos seus objetivos estratégicos para estruturar a solução correta.'
  },
  {
    stepNumber: 2,
    title: 'Planejamento',
    description: 'Arquitetura técnica, wireframes, escopo de APIs e seleção das melhores tecnologias para o seu negócio.'
  },
  {
    stepNumber: 3,
    title: 'Desenvolvimento',
    description: 'Desenvolvimento ágil com código limpo, componentizado, bem documentado e focado em altíssimo desempenho.'
  },
  {
    stepNumber: 4,
    title: 'Testes e validação',
    description: 'Blindagem de qualidade por meio de baterias intensas de testes funcionais, de integração e ponta a ponta.'
  },
  {
    stepNumber: 5,
    title: 'Entrega e suporte',
    description: 'Publicação estável assistida, documentada e ativação de canais de manutenção proativa para inovações sequenciais.'
  }
];

export const TECH_BADGES: TechBadge[] = [
  { name: 'Astro', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'React', category: 'frontend' },
  { name: 'Next.js', category: 'frontend' },
  { name: 'Docker', category: 'devops' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MySQL', category: 'database' },
  { name: 'Cypress', category: 'testing' },
  { name: 'Playwright', category: 'testing' },
  { name: 'GitHub Actions', category: 'devops' }
];
