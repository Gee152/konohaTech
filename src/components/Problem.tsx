import { memo } from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Clock, AlertTriangle, BatteryLow, ArrowDownRight } from 'lucide-react';

import SectionHeader from './ui/SectionHeader';

const PROBLEMS = [
  {
    title: 'Processos manuais',
    slug: 'gargalo-01.processos',
    status: 'Gargalo',
    tabLabel: 'Diagnóstico de Processos',
    description: 'Tempo precioso da sua equipe desperdiçado repetindo tarefas repetitivas que poderiam ser automatizadas em minutos.',
    icon: ClipboardList,
    delay: 0.1,
    metric1: { label: 'Desperdício', value: '~35h/mês' },
    metric2: { label: 'Risco Humano', value: 'Crítico' },
  },
  {
    title: 'Falta de automação',
    slug: 'gargalo-02.automacao',
    status: 'Falha de Fluxo',
    tabLabel: 'Integração de Dados',
    description: 'Sistemas que não se conversam, obrigando transferência manual de planilhas e aumentando o risco de falhas graves.',
    icon: Clock,
    delay: 0.2,
    metric1: { label: 'Retrabalho', value: '+40%' },
    metric2: { label: 'Sincronização', value: '0% Manual' },
  },
  {
    title: 'Sistemas desatualizados',
    slug: 'gargalo-03.sistemas',
    status: 'Vulnerável',
    tabLabel: 'Infraestrutura Legada',
    description: 'Softwares lentos que travam a operação, geram gargalos de produtividade e deixam dados vulneráveis.',
    icon: AlertTriangle,
    delay: 0.3,
    metric1: { label: 'Latência', value: '> 8.5s' },
    metric2: { label: 'Segurança', value: 'Em Risco' },
  },
  {
    title: 'Baixa produtividade',
    slug: 'gargalo-04.produtividade',
    status: 'Estagnado',
    tabLabel: 'Capacidade de Escala',
    description: 'Dificuldade de escalar faturamento devido à dependência extrema de esforço humano para tarefas operacionais básicas.',
    icon: BatteryLow,
    delay: 0.4,
    metric1: { label: 'Lucro Perdido', value: 'Até 30%' },
    metric2: { label: 'Escalabilidade', value: 'Bloqueada' },
  },
];

function Problem() {
  return (
    <section id="problema" className="relative pt-8 pb-16 sm:py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-zinc-950/20 backdrop-blur-[2px]">
      
      {/* Background glow shadow */}
      <div className="absolute right-[10%] top-[30%] w-[380px] h-[380px] rounded-full bg-brand-red/10 blur-[120px] pointer-events-none" />
      <div className="absolute left-[5%] bottom-[20%] w-[300px] h-[300px] rounded-full bg-orange-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title */}
        <SectionHeader
          eyebrow="O Grande Gargalo"
          title="Sua empresa está perdendo oportunidades por falta de tecnologia?"
          description="Muitas empresas ainda dependem de processos manuais, sistemas antigos e ferramentas desconectadas, resultando em perda de tempo, retrabalho e extrema dificuldade de crescimento escalável."
        />

        {/* Problem Cards list Grid replicating Print 1 structure */}
        <div className="flex overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 no-scrollbar snap-x snap-mandatory">
          {PROBLEMS.map((prob) => {
            const IconComponent = prob.icon;
            return (
              <motion.div
                key={prob.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '80px 0px 0px 0px' }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: Math.min(prob.delay, 0.1) }}
                className="w-[88vw] max-w-[340px] shrink-0 sm:w-auto snap-start group relative rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl bg-white/[0.03] hover:border-brand-red/40 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Card Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    {/* Icon with frosted red glass structure */}
                    <div className="w-11 h-11 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red mb-3.5 group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <h3 className="font-display font-semibold text-lg text-white mb-2 tracking-tight">
                      {prob.title}
                    </h3>
                    
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                      {prob.description}
                    </p>
                  </div>

                  {/* Subcard Telemetry Block (EXACT replica of Print 1's Acessos Ativos / Tempo de Resposta) */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
                      <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-mono">{prob.metric1.label}</span>
                      <span className="font-mono text-xs sm:text-sm text-white font-semibold">{prob.metric1.value}</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl">
                      <span className="block text-[9px] text-zinc-500 uppercase tracking-wider font-mono">{prob.metric2.label}</span>
                      <span className="font-mono text-xs sm:text-sm text-red-400 font-semibold">{prob.metric2.value}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default memo(Problem);
