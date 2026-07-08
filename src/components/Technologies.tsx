import { motion } from 'motion/react';
import { TECH_BADGES } from '../data';
import { Code, Database, Server, Settings, CheckCircle2 } from 'lucide-react';

export default function Technologies() {
  // Map tech types to icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return <Code className="w-3.5 h-3.5 text-brand-red" />;
      case 'database':
        return <Database className="w-3.5 h-3.5 text-blue-400" />;
      case 'backend':
        return <Server className="w-3.5 h-3.5 text-pink-400" />;
      case 'devops':
        return <Settings className="w-3.5 h-3.5 text-amber-400" />;
      case 'testing':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Code className="w-3.5 h-3.5 text-brand-red" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden border-t border-white/5 bg-[#09090b]">
      
      {/* Background decoration */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-brand-red/[0.02] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        
        {/* Title */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-mono text-xs text-brand-red font-semibold tracking-[0.05em] uppercase mb-3 block">
            Nossa Caixa de Ferramentas
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-[-0.04em] text-white leading-tight mb-4">
            Tecnologias que utilizamos
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Selecionamos as ferramentas mais rápidas, seguras e modernas do planeta para dar vida às suas ideias com escalabilidade blindada.
          </p>
        </div>

        {/* Badges Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto"
        >
          {TECH_BADGES.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{ scale: 1.05, borderColor: '#df2531' }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-zinc-950/60 border border-white/5 hover:bg-brand-red/[0.03] transition-colors duration-300 shadow-xl cursor-default group"
            >
              {getCategoryIcon(tech.category)}
              <span className="font-display font-semibold text-zinc-200 group-hover:text-white transition-colors text-sm">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Legend */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-12 text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            <span>Frontend / Compiladores</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            <span>Backend</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>Bancos de dados</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>DevOps / CI-CD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>QA / Testes automatizados</span>
          </div>
        </div>

      </div>
    </section>
  );
}
