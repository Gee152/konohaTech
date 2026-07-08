import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DATA, PORTFOLIO } from '../data';
import { PortfolioProject } from '../types';
import { X, ExternalLink, Cpu, ShieldCheck, Zap, Layers, BarChart } from 'lucide-react';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  // Simulated Case Metrics to populate the details modal with realistic data
  const projectMetrics: Record<string, { uptime: string; latency?: string; conversion?: string; speed?: string; highlights: string[], url?: string }> = {
    'apex-inventory': {
      uptime: '99.99%',
      speed: '+340% de processamento',
      highlights: [
        'Modelagem inteligente de demanda com IA integrada para reposições',
        'Sincronização instantânea com estoques físicos via RFDI / REST Webhooks',
        'Dashboards analíticos avançados para gestores regionais',
        'Alertas automatizados em tempo real no Telegram e Slack'
      ],
      url:'https://heronpsicologo.com'
    },
    'chrono-flow': {
      uptime: '99.98%',
      latency: '< 12ms por lote',
      conversion: '-94% de tempo operacional',
      highlights: [
        'Conexão segura com gateways bancários e APIs nacionais de tributos',
        'Algoritmos customizados de reconciliação de dados em memória',
        'Painel administrativo para auditoria e log de falhas em tempo real',
        'Rotinas resilientes de retentava com tratamento de exceções robusto'
      ],
      url: "https://gee152.github.io/LDA_fisioterapeuta_Ana_Carolina/"
    },
    'elysium-portal': {
      uptime: '100% Core Web Vitals',
      speed: '0.4s Primeira Renderização',
      conversion: '+42% em captação de leads',
      highlights: [
        'Construído em Astro para eliminação completa de JS não utilizado',
        'Otimização avançada de Assets e entrega super-rápida via CDN global',
        'Acessibilidade nota 100 comprovada pelo Google Lighthouse',
        'Formulários interativos inteligentes integrados com RD Station e ActiveCampaign'
      ],
      url: 'https://eaoliveiracorretoradeseguros.com'
    }
  };

  return (
    <section id="portfolio" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-zinc-950/40">
      
      {/* Background radial effects */}
      <div className="absolute right-[10%] bottom-[30%] w-[400px] h-[400px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title */}
        <div className="max-w-3xl mb-16 lg:mb-24 text-left">
          <span className="font-mono text-xs text-brand-red font-semibold tracking-[0.05em] uppercase mb-3 block">
            Cases de Sucesso
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.04em] text-white leading-tight mb-6">
            Projetos que transformam negócios
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Conheça algumas soluções de ponta desenvolvidas pela Konoha Tech. Arquitetura impecável, design envolvente e foco total em conversão e usabilidade.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO.map((project, idx) => {
            // Varied glow colors adhering to the project palette
            const glowColors = [
              "bg-brand-red",
              "bg-orange-500",
              "bg-zinc-400"
            ];
            const borderColors = [
              "via-brand-red",
              "via-orange-500",
              "via-zinc-400"
            ];
            
            const glowColor = glowColors[idx % glowColors.length];
            const borderColor = borderColors[idx % borderColors.length];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
              >
                {/* Outer Wrapper for Hover Scale & Glow */}
                <div className="relative rounded-2xl overflow-hidden glass-panel border border-white/5 transition-all duration-500 group-hover:scale-[1.03] flex flex-col h-full bg-[#121214]/80 shadow-xl">
                  
                  {/* Glowing Bottom Effects based on the reference image */}
                  <div className={`absolute -bottom-[30%] left-0 right-0 h-[70%] ${glowColor} blur-[90px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none z-0`} />
                  <div className={`absolute bottom-0 left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-transparent ${borderColor} to-transparent opacity-20 group-hover:opacity-80 transition-opacity duration-700 z-0`} />
                  
                  {/* Image Showcase */}
                  <div className="relative aspect-video w-full overflow-hidden border-b border-white/5 z-10">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Subtle dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    
                    {/* Category Pill */}
                    <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-950/80 text-white border border-white/10">
                      {project.category}
                    </span>
                  </div>

                  {/* Info block */}
                  <div className="p-6 flex flex-col justify-between flex-grow z-10">
                    <div>
                      {/* Project Title */}
                      <h3 className="font-display font-bold text-xl text-white mb-2 leading-tight group-hover:text-white transition-colors">
                        {project.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Technology tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span key={tag} className="font-mono text-[10px] bg-white/5 px-2.5 py-1 rounded-lg text-zinc-300 border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-1.5"
                      >
                        Ver detalhes do projeto
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* PORTFOLIO CASE STUDY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop filter blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl rounded-3xl glass-panel border border-white/10 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col bg-[#0c0c0e]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.01]">
                <div>
                  <span className="font-mono text-[10px] text-brand-red font-bold uppercase tracking-wider block mb-1">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label="Fecar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-8">
                {/* Visual Banner */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/5">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e]/95 via-transparent" />
                </div>

                {/* Extended description of metrics */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                    <span className="block text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-1">Disponibilidade</span>
                    <span className="font-display font-bold text-lg text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                      {projectMetrics[selectedProject.id]?.uptime || '99.99%'}
                    </span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                    <span className="block text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-1">Performance alcançada</span>
                    <span className="font-display font-bold text-lg text-brand-red flex items-center gap-1.5">
                      <Zap className="w-5 h-5 text-brand-red" />
                      {projectMetrics[selectedProject.id]?.speed || 'Alta Performance'}
                    </span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                    <span className="block text-[10px] text-zinc-500 font-mono uppercase tracking-wider mb-1">Indicador operacional</span>
                    <span className="font-display font-bold text-lg text-white flex items-center gap-1.5">
                      <Layers className="w-5 h-5 text-zinc-400" />
                      {projectMetrics[selectedProject.id]?.latency || projectMetrics[selectedProject.id]?.conversion || 'Processos ágeis'}
                    </span>
                  </div>
                </div>

                {/* Specific features created */}
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-lg text-white flex items-center gap-2">
                    <BarChart className="w-5 h-5 text-brand-red" />
                    Destaques da Implementação Técnica
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    A Konoha Tech arquitetou o projeto utilizando o estado da arte do ecossistema de software livre moderno. Focamos no desenvolvimento de componentes com zero perdas operacionais.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 pl-3">
                    {projectMetrics[selectedProject.id]?.highlights.map((highlight, index) => (
                      <li key={index} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies List */}
                <div className="inline-block">
                  <span className="block text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-2">Pilha tecnológica ativa</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="font-mono text-xs px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-white/5 text-zinc-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-white/5 bg-white/[0.01] flex items-center justify-end gap-3">
                
                <a
                  href={selectedProject.url} target='_blank'
                  onClick={() => setSelectedProject(null)}
                  className="px-2 py-2.5 rounded-xl text-xs font-semibold bg-brand-red hover:bg-brand-red-hover text-white transition-all shadow-[0_0_15px_-3px_rgba(223,37,49,0.3)] hover:glow-red max-[375px]:text-[5%]"
                >
                  Acesse o projeto
                </a>
                <a
                  href={`https://api.whatsapp.com/send?phone=${DATA[0]?.socialMedia?.whatsapp}&text=Ol%C3%A1%20Konoha%20Tech!%20Gostaria%20de%20conversar%20sobre%20um%20projeto.`}
                  target="_blank"
                  onClick={() => setSelectedProject(null)}
                  className="px-2 py-2.5 rounded-xl text-xs font-semibold bg-brand-red hover:bg-brand-red-hover text-white transition-all shadow-[0_0_15px_-3px_rgba(223,37,49,0.3)] hover:glow-red max-[375px]:px-2 max-[375px]:py-1.5 max-[375px]:text-[5%]"
                >
                  Quero uma solução parecida
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
