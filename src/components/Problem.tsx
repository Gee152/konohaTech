import { motion } from 'motion/react';
import { ClipboardList, Clock, AlertTriangle, BatteryLow, ArrowDownRight } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      title: 'Processos manuais',
      description: 'Tempo precioso da sua equipe desperdiçado repetindo tarefas repetitivas que poderiam ser automatizadas em minutos.',
      icon: ClipboardList,
      delay: 0.1,
    },
    {
      title: 'Falta de automação',
      description: 'Sistemas que não se conversam, obrigando transferência manual de planilhas e aumentando o risco de falhas graves.',
      icon: Clock,
      delay: 0.2,
    },
    {
      title: 'Sistemas desatualizados',
      description: 'Softwares lentos que travam a operação, geram gargalos de produtividade e deixam dados vulneráveis.',
      icon: AlertTriangle,
      delay: 0.3,
    },
    {
      title: 'Baixa produtividade',
      description: 'Dificuldade de escalar faturamento devido à dependência extrema de esforço humano para tarefas operacionais básicas.',
      icon: BatteryLow,
      delay: 0.4,
    },
  ];

  return (
    <section id="problema" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-zinc-950/40">
      
      {/* Background glow shadow */}
      <div className="absolute right-[10%] top-[30%] w-[350px] h-[350px] rounded-full bg-brand-red/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-16 lg:mb-20 text-left">
          <span className="font-mono text-xs text-brand-red font-semibold tracking-[0.05em] uppercase mb-3 block">
            O Grande Gargalo
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.04em] text-white leading-tight mb-6">
            Sua empresa está perdendo oportunidades por falta de tecnologia?
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Muitas empresas ainda dependem de processos manuais, sistemas antigos e ferramentas desconectadas, resultando em perda de tempo, retrabalho e extrema dificuldade de crescimento escalável.
          </p>
        </div>

        {/* Problem Cards list Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((prob) => {
            const IconComponent = prob.icon;
            return (
              <motion.div
                key={prob.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: prob.delay }}
                className="group relative rounded-2xl p-6 transition-all duration-300 bg-brand-red/[0.015] border border-brand-red/10 hover:border-brand-red/35 hover:bg-brand-red/[0.04] flex flex-col justify-between min-h-[220px]"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-brand-red/5 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 -z-10 pointer-events-none" />

                <div>
                  {/* Icon with beautiful glass red structure */}
                  <div className="w-12 h-12 rounded-xl bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red mb-5 group-hover:scale-115 transition-transform duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="font-display font-semibold text-lg text-white mb-2 tracking-tight">
                    {prob.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                    {prob.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">Impacto Operacional</span>
                  <ArrowDownRight className="w-4 h-4 text-brand-red" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
