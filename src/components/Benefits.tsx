import { memo } from 'react';
import { Zap, TrendingUp, Shield, Gauge, MousePointerClick, Star } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { Card, CardTitle, CardDescription } from './ui/Card';

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

        {/* Benefits Grid with mobile horizontal swipe */}
        <div className="mobile-carousel pb-4 pt-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 no-scrollbar snap-x snap-mandatory scroll-reveal-up">
          {BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            const glowColor = BENEFITS_GLOW_COLORS[idx % BENEFITS_GLOW_COLORS.length];
            const borderColor = BENEFITS_BORDER_COLORS[idx % BENEFITS_BORDER_COLORS.length];

            return (
              <Card
                key={benefit.title}
                variant="interactive"
                isSnapItem
                snapBreakpoint="md"
                glowColor={glowColor}
                borderColor={borderColor}
                className="p-6 sm:p-8 md:p-10 min-h-[260px] sm:min-h-[300px]"
              >
                <div>
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-900 border border-white/10 text-zinc-300 group-hover:text-white transition-colors duration-300 mb-6 sm:mb-8 shadow-inner">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <CardTitle className="mb-3 font-medium text-lg sm:text-xl">
                    {benefit.title}
                  </CardTitle>

                  <CardDescription>
                    {benefit.desc}
                  </CardDescription>
                </div>

                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase">Garantia Konoha</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-all" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-2 text-zinc-500 font-mono text-[10px]">
          <span>← deslize as 6 vantagens competitivas →</span>
        </div>

      </div>
    </section>
  );
}

export default memo(Benefits);
