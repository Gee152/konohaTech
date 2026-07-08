import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data';
import { Check, Clipboard, Calendar, Hammer, HelpCircle, Send } from 'lucide-react';

export default function Process() {
  // Simple helper to fetch representative step icons
  const getStepIcon = (num: number) => {
    switch (num) {
      case 1:
        return <Clipboard className="w-5 h-5 text-brand-red" />;
      case 2:
        return <Calendar className="w-5 h-5 text-brand-red" />;
      case 3:
        return <Hammer className="w-5 h-5 text-brand-red" />;
      case 4:
        return <HelpCircle className="w-5 h-5 text-brand-red" />;
      case 5:
        return <Send className="w-5 h-5 text-brand-red" />;
      default:
        return <Check className="w-5 h-5 text-brand-red" />;
    }
  };

  return (
    <section id="processo" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-zinc-950/40">
      
      {/* Decorative side lights */}
      <div className="absolute right-[-10%] top-[40%] w-[380px] h-[380px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title */}
        <div className="max-w-3xl mb-16 lg:mb-24 text-left">
          <span className="font-mono text-xs text-brand-red font-semibold tracking-[0.05em] uppercase mb-3 block">
            Fluxo de Entrega Estável
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.04em] text-white leading-tight mb-6">
            Como funciona nosso processo de ponta a ponta
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Eliminamos surpresas ou atrasos desagradáveis. Nosso método de engajamento é totalmente transparente, ágil, baseado em marcos definidos e relatórios semanais.
          </p>
        </div>

        {/* Horizontal & Vertical Timeline combination */}
        <div className="relative">
          {/* Neon connecting pipe background indicator */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-px bg-gradient-to-r from-zinc-800 via-brand-red/40 to-zinc-800 -z-10" />

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-6 relative">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col items-start lg:items-center text-left lg:text-center p-6 bg-white/[0.01] hover:bg-white/[0.03] rounded-2xl border border-white/5 transition-all duration-300"
              >
                {/* Step badge overlay */}
                <div className="absolute top-4 right-4 font-mono font-bold text-xs text-brand-red/30 group-hover:text-brand-red transition-all">
                  E{step.stepNumber}
                </div>

                {/* Circular indicator node */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#121214] border border-white/10 group-hover:border-brand-red/50 text-white flex items-center justify-center mb-6 shadow-xl group-hover:scale-105 transition-all duration-300">
                  {getStepIcon(step.stepNumber)}
                  
                  {/* Outer circle halo indicator */}
                  <div className="absolute -inset-1 rounded-full border border-brand-red/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 -z-10" />
                </div>

                {/* Step labels */}
                <h3 className="font-display font-semibold text-lg text-white mb-2.5 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>

                {/* Mini mobile step divider pipe */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="w-px h-8 bg-zinc-800 absolute top-full left-[43px] translate-y-2 lg:hidden -z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
