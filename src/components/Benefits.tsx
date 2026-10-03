import { memo } from 'react';
import { motion } from 'motion/react';
import { Zap, TrendingUp, Shield, Gauge, MousePointerClick, Star } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

const BENEFITS = [
  {
    title: 'Mais produtividade',
    desc: 'Automatize tarefas repetitivas de forma fluida, elimine o trabalho manual e possibilite que sua equipe foque no que realmente importa.',
    icon: Zap,
  },
  {
    title: 'Escalabilidade',
    desc: 'Arquiteturas projetadas para escalar com elasticidade, permitindo processar de centenas a milhões de requisições sem lentidão.',
    icon: TrendingUp,
  },
  {
    title: 'Segurança',
    desc: 'Blindagem robusta contra ameaças de segurança, integração criptografada com provedores externos e auditorias de vulnerabilidades.',
    icon: Shield,
  },
  {
    title: 'Performance',
    desc: 'Sistemas refinados ao extremo com código modular de baixa latência e carregamentos velozes que agradam clientes e robôs de busca.',
    icon: Gauge,
  },
  {
    title: 'Experiência do usuário',
    desc: 'Interfaces refinadas, intuitivas e estonteantes construídas para aumentar a fidelidade e acelerar suas taxas de conversão diárias.',
    icon: MousePointerClick,
  },
  {
    title: 'Qualidade',
    desc: 'Engenharia de software séria com baterias exaustivas de testes, validações funcionais em múltiplos navegadores e entregas à prova de erros.',
    icon: Star,
  },
];

const BENEFITS_GLOW_COLORS = [
  "bg-brand-red",
  "bg-orange-500",
  "bg-zinc-400"
];

const BENEFITS_BORDER_COLORS = [
  "via-brand-red",
  "via-orange-500",
  "via-zinc-400"
];

function Benefits() {
  return (
    <section id="beneficios" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-zinc-950/20">
      
      {/* Visual background lights */}
      <div className="absolute right-[5%] bottom-[15%] w-[450px] h-[450px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-[5%] top-[10%] w-[450px] h-[450px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title */}
        <SectionHeader
          eyebrow="Vantagens Competitivas"
          title="O que sua empresa ganha trabalhando conosco"
          description="Nossos projetos são estruturados com as melhores práticas de desenvolvimento global. Unimos velocidade mercadológica a um rigor de desenvolvimento incomparável."
        />

        {/* Benefits Grid */}
        <div className="flex overflow-x-auto pb-4 pt-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 no-scrollbar snap-x snap-mandatory">
          {BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            const glowColor = BENEFITS_GLOW_COLORS[idx % BENEFITS_GLOW_COLORS.length];
            const borderColor = BENEFITS_BORDER_COLORS[idx % BENEFITS_BORDER_COLORS.length];

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '80px 0px 0px 0px' }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: Math.min(idx * 0.04, 0.12) }}
                className="w-[84vw] max-w-[340px] shrink-0 md:w-auto snap-start group relative rounded-[32px] p-8 md:p-10 transition-all duration-500 bg-zinc-950/80 border border-white/5 hover:scale-[1.03] shadow-2xl flex flex-col justify-between min-h-[300px] overflow-hidden card-dynamic"
              >
                {/* Glowing Bottom Effects based on the reference image */}
                <div className={`absolute -bottom-[30%] left-0 right-0 h-[70%] ${glowColor} blur-[90px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none z-0`} />
                <div className={`absolute bottom-0 left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-transparent ${borderColor} to-transparent opacity-20 group-hover:opacity-80 transition-opacity duration-700 z-0`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 text-zinc-300 group-hover:text-white transition-colors duration-300 mb-8 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-medium text-xl text-white mb-3 tracking-tight">
                    {benefit.title}
                  </h3>

                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                  <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">Garantia Konoha</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default memo(Benefits);
