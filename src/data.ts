import { Service, PortfolioProject, Testimonial, WorkflowStep, TechBadge, Data, BioProfileConfig, BioLinkItem } from './types'
import logoSrc from './assets/img/site_heron_silveira_recife.webp'
import heronPessoa from './assets/img/psicologo_heron_silveira_recife.png'
import danielleImg from './assets/img/corretora_danielle_galdinho_recife.jpeg'
import anaPerfil from './assets/img/fisioterapeuta_ana_carolina.png'
import eaoliveira from './assets/img/site_eaoliveira_recife.webp'
import anaCarolina from './assets/img/bio_instagram_fisioterapeuta_ana_carolina.png'
import konohaLogo from './assets/img/logo_konoha_tech_recife.png'
import dg from './assets/img/site_corretora_danielle_galdinho_recife.png'
import fitness from './assets/img/fitness.png'

export const DATA: Data[] = [
  {
    email: 'contatokonohatech@gmail.com',
    phone: '(81) 98777-2234',
    address: 'Recife - PE',
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/gabriel-alves-7967641b1',
      github: 'https://github.com/gee152',
      whatsapp: '558187772234',
      instagram: 'https://www.instagram.com/konohatech_/',
      tiktok: '@konohatech'
    },
    about: 'Desenvolvemos tecnologia de estado da arte para estruturar, otimizar e escalar operações de empresas modernas de ponta. Código puro, entregas blindadas.',
  }
]

export const profileConfig: BioProfileConfig = {
  name: "KonohaTech",
  tagline: "Engenharia de software de ponta, sistemas escaláveis e automações inteligentes.",
  handle: "@konoha.tech",
  handleUrl: DATA[0].socialMedia.instagram,
  avatarSrc: konohaLogo,
  badgeStatus: "Disponível para Novos Projetos",
  location: `${DATA[0].address} • Atendimento Global`,
  phone: DATA[0].phone,
  whatsappNumber: DATA[0].socialMedia.whatsapp,
  urgencyBanner: {
    enabled: true,
    title: "Slots de Desenvolvimento — Q2/2026",
    subtitle: "Apenas 2 vagas disponíveis para início imediato este trimestre.",
    ctaText: "Garantir Vaga",
    whatsappMessage: "Olá KonohaTech! Gostaria de consultar a disponibilidade de vagas para iniciar um novo projeto."
  }
};

export const bioLinksData: BioLinkItem[] = [
  {
    id: "whatsapp-budget",
    title: "Solicitar Orçamento de Projeto",
    subtitle: "Fale com nossos engenheiros diretamente pelo WhatsApp",
    icon: "MessageCircle",
    highlight: true,
    badge: "Mais Rápido",
    badgeColor: "bg-[#df2531] text-white shadow-[0_0_12px_rgba(223,37,49,0.5)]",
    type: "whatsapp",
    whatsappMessage: "Olá! Vim pelos links da bio da KonohaTech e gostaria de solicitar um orçamento para meu projeto."
  },
  {
    id: "budget-estimator-modal",
    title: "Simular Estimativa de Projeto",
    subtitle: "Calcule uma estimativa de investimento e escopo em 1 min",
    icon: "Sparkles",
    highlight: false,
    badge: "Interativo",
    badgeColor: "bg-white/10 text-zinc-300 border border-white/10",
    type: "modal"
  },
  {
    id: "portfolio-cases",
    title: "Casos Reais & Portfólio",
    subtitle: "Veja os projetos em produção: Psicologia, Saúde e Seguros",
    icon: "Briefcase",
    highlight: false,
    badge: "Casos Reais",
    badgeColor: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    type: "modal"
  },
  {
    id: "instagram-social",
    title: "Acompanhar no Instagram",
    subtitle: "Bastidores de código, insights de tech e novidades",
    icon: "Instagram",
    highlight: false,
    type: "external",
    url: DATA[0].socialMedia.instagram
  },
  {
    id: "linkedin-social",
    title: "LinkedIn Institucional",
    subtitle: "Conexões profissionais e atualizações técnicas",
    icon: "Linkedin",
    highlight: false,
    type: "external",
    url: DATA[0].socialMedia.linkedin
  }
];

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
    tags: ['React', 'Node.js',],
    description: "Site focado em divulgação de serviços psicológicos, apresentando consultas presenciais e online. O projeto visa converter visitantes em pacientes através de um design profissional e acolhedor, com agendamento direto via WhatsApp.",
    image: `${logoSrc}`,
    url: 'https://heronpsicologo.com'
  },
  {
    id: 'chrono-flow',
    title: "Fisioterapeuta Ana Carolina",
    category: "Gthree",
    tags: ['React', 'TypeScript', 'Tailwind CSS',],
    description: "Ambiente online com intuito de levar o paciente até sua consulta de modo fácil e prático, dando visão geral da profissional. O projeto visa converter visitantes em pacientes através de um design profissional e acolhedor, com agendamento direto via WhatsApp.",
    image: `${anaCarolina}`,
    url: "https://gee152.github.io/LDA_fisioterapeuta_Ana_Carolina/"
  },
  {
    id: 'elysium-portal',
    title: "EaOliveira Corretora de Seguros",
    category: 'Site de vendas',
    tags: ['Astro', 'TypeScript', 'Tailwind CSS', 'Playwright'],
    description: "Site focado na venda de seguros, apresentando diversas opções de seguros para diferentes necessidades. O projeto visa converter visitantes em clientes através de um design profissional e acolhedor, com agendamento direto via WhatsApp.",
    image: `${eaoliveira}`,
    url: 'https://eaoliveiracorretoradeseguros.com'
  },
  {
    id: 'dg-portal',
    title: "Danielle Galdino Corretora de Imoveis",
    category: 'Site de vendas',
    tags: ['Astro', 'TypeScript', 'Tailwind CSS', 'Playwright'],
    description: "Site focado na venda de imóveis, apresentando diversas opções de imóveis para diferentes necessidades. O projeto visa converter visitantes em clientes através de um design profissional e acolhedor, com agendamento direto via WhatsApp.",
    image: `${dg}`,
    url: 'https://homepage-imobiliaria-dg.vercel.app/'
  },
  {
    id: 'fitness-portal',
    title: "Letice Santana Fitness",
    category: 'Site de vendas',
    tags: ['Astro', 'TypeScript', 'Tailwind CSS', 'Playwright'],
    description: "Site focado na venda de serviços fitness, apresentando diversas opções de serviços para diferentes necessidades. O projeto visa converter visitantes em clientes através de um design moderno, atraente e funcional, com agendamento direto via WhatsApp.",
    image: `${fitness}`,
    url: 'https://homepagepersonal-git-main-gee152s-projects.vercel.app/'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'heron-silveira',
    name: 'Heron Silveira',
    role: 'Psicólogo',
    company: 'Psicologia Clínica',
    comment: 'Gabriel me entregou um site rápido e melhorou meu posicionamento no Google.',
    avatar: heronPessoa
  },
  {
    id: 'danielle-galdinho',
    name: 'Danielle Galdino',
    role: 'Corretora de Imóveis',
    company: 'DG Imóveis',
    comment: 'A Konoha Tech e o Gabriel vêm me orientando no meio digital, tanto na parte tecnológica quanto em anúncios no Meta Ads.',
    avatar: danielleImg
  },
  {
    id: 'ana-carolina',
    name: 'Ana Carolina',
    role: 'Fisioterapeuta',
    company: 'Fisioterapia Pélvica',
    comment: 'Gabriel fez um trabalho muito bom, tanto no meu Instagram quanto no meu site, me dando mais visibilidade no Google.',
    avatar: anaPerfil
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
