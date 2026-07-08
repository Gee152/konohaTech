import { motion } from 'motion/react';
import { Compass, Layers, Code, ShieldCheck, Rocket, ChevronRight } from 'lucide-react';

export default function Solution() {
  const steps = [
    {
      label: 'Planejamento',
      icon: Compass,
      desc: 'Mapeamento de escopo, arquitetura técnica e análise estratégica.',
      color: 'from-zinc-500 to-zinc-400'
    },
    {
      label: 'Design',
      icon: Layers,
      desc: 'Criação de interfaces premium exclusivas focadas em usabilidade (UX/UI).',
      color: 'from-zinc-400 to-red-500'
    },
    {
      label: 'Desenvolvimento',
      icon: Code,
      desc: 'Programação impecável em TypeScript com código modular, rápido e escalonável.',
      color: 'from-red-500 to-brand-red'
    },
    {
      label: 'Testes',
      icon: ShieldCheck,
      desc: 'Asseguração completa de ponta a ponta com testes unitários e funcionais.',
      color: 'from-brand-red to-red-400'
    },
    {
      label: 'Entrega',
      icon: Rocket,
      desc: 'Lançamento suave em ambientes de alta disponibilidade com suporte ativo.',
      color: 'from-red-400 to-white'
    }
  ];

  return (
    <section id="solucao" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-[#09090b]">
      
      {/* Background radial soft light */}
      <div className="absolute left-[8%] bottom-[5%] w-[400px] h-[400px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title */}
        <div className="max-w-3xl text-left mb-16 lg:mb-20">
          <span className="font-mono text-xs text-brand-red font-semibold tracking-[0.05em] uppercase mb-3 block">
            A Solução Definitiva
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.04em] text-white leading-tight mb-6">
            A Konoha Tech desenvolve soluções que impulsionam resultados.
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Criamos aplicações modernas, automações robustas e sistemas personalizados de alta engenharia, transformando dores operacionais complexas em experiências de software extremamente simples, rápidas e eficientes.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Connecting Base Line for Desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-zinc-800 via-brand-red/50 to-zinc-800 -z-10" />

          {/* Grid for Steps */}
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-6 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              
              // Varied glow colors adhering to the project palette
              const glowColors = [
                "bg-brand-red",
                "bg-orange-500",
                "bg-zinc-400",
                "bg-brand-red",
                "bg-orange-500"
              ];
              const borderColors = [
                "via-brand-red",
                "via-orange-500",
                "via-zinc-400",
                "via-brand-red",
                "via-orange-500"
              ];
              
              const glowColor = glowColors[idx % glowColors.length];
              const borderColor = borderColors[idx % borderColors.length];

              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group flex flex-col items-start lg:items-center text-left lg:text-center p-6 lg:p-4 rounded-2xl bg-zinc-950/80 border border-white/5 hover:scale-[1.03] transition-all duration-500 relative overflow-hidden"
                >
                  {/* Glowing Bottom Effects based on the reference image */}
                  <div className={`absolute -bottom-[40%] left-0 right-0 h-[80%] ${glowColor} blur-[70px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none z-0`} />
                  <div className={`absolute bottom-0 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent ${borderColor} to-transparent opacity-20 group-hover:opacity-80 transition-opacity duration-700 z-0`} />

                  <div className="relative z-10 w-full flex flex-col items-start lg:items-center">
                    {/* Step counter */}
                    <span className="absolute top-0 right-0 lg:static lg:mb-4 font-mono text-[10px] text-zinc-600 font-bold transition-colors">
                      0{idx + 1}
                    </span>

                    {/* Icon Node */}
                    <div className="relative mb-5 flex items-center justify-center w-20 h-20 rounded-2xl bg-zinc-900 border border-white/10 transition-colors duration-300 shadow-xl">
                      <Icon className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Label / Title */}
                    <h3 className="font-display font-bold text-lg text-white mb-2 tracking-tight flex items-center gap-1 w-full lg:justify-center">
                      {step.label}
                      {idx < steps.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-zinc-600 translate-x-0 transition-all lg:hidden" />
                      )}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xs">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
