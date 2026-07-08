import { motion } from 'motion/react';
import { Zap, TrendingUp, Shield, Gauge, MousePointerClick, Star } from 'lucide-react';

export default function Benefits() {
  const benefits = [
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

  return (
    <section id="beneficios" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-zinc-950/20">
      
      {/* Visual background lights */}
      <div className="absolute right-[5%] bottom-[15%] w-[450px] h-[450px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-[5%] top-[10%] w-[450px] h-[450px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title */}
        <div className="max-w-3xl mb-16 lg:mb-22 text-left">
          <span className="font-mono text-xs text-brand-red font-semibold tracking-[0.05em] uppercase mb-3 block">
            Vantagens Competitivas
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.04em] text-white leading-tight mb-6">
            O que sua empresa ganha trabalhando conosco
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Nossos projetos são estruturados com as melhores práticas de desenvolvimento global. Unimos velocidade mercadológica a um rigor de desenvolvimento incomparável.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            
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
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative rounded-[32px] p-8 md:p-10 transition-all duration-500 bg-zinc-950/80 border border-white/5 hover:scale-[1.03] shadow-2xl flex flex-col justify-between min-h-[300px] overflow-hidden"
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
