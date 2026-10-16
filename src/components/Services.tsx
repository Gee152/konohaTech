import { memo } from 'react';
import { SERVICES } from '../data';
import { Layout, Sparkles, TrendingUp, Layers, Check, LucideIcon } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { Card, CardTitle, CardDescription } from './ui/Card';

const serviceIcons: Record<string, LucideIcon> = {
  Layout,
  Sparkles,
  TrendingUp,
};

const SERVICES_GLOW_COLORS = ["bg-brand-red", "bg-orange-500", "bg-zinc-400"];
const SERVICES_BORDER_COLORS = ["via-brand-red", "via-orange-500", "via-zinc-400"];

function Services() {
  return (
    <section id="servicos" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-[#09090b]/50">
      
      {/* Background neon orb */}
      <div className="absolute left-[30%] top-[40%] w-[500px] h-[500px] rounded-full bg-brand-red/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title */}
        <SectionHeader
          eyebrow="Nossos Serviços"
          title="Engenharia de ponta para impulsionar seu pipeline digital"
          description="Explorada ao extremo, nossa especialidade é moldar tecnologia em ferramentas escaláveis que geram economia, eficiência e resultados exponenciais para sua marca."
        />

        {/* Services Grid (Product Style) with mobile horizontal swipe & desktop 3-col balance */}
        <div className="mobile-carousel pb-4 pt-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 gap-6 md:gap-8 no-scrollbar snap-x snap-mandatory scroll-reveal-up">
          {SERVICES.map((serv, idx) => {
            // Dynamically resolve icon
            const IconComponent = serviceIcons[serv.iconName] || Layers;
            const glowColor = SERVICES_GLOW_COLORS[idx % SERVICES_GLOW_COLORS.length];
            const borderColor = SERVICES_BORDER_COLORS[idx % SERVICES_BORDER_COLORS.length];
            
            return (
              <Card
                key={serv.id}
                variant="interactive"
                isSnapItem
                snapBreakpoint="md"
                glowColor={glowColor}
                borderColor={borderColor}
                className="p-6 sm:p-8 md:p-9 min-h-[400px] flex flex-col justify-between"
              >
                <div>
                  {/* Standalone Icon in rounded box matching standard design system */}
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-900 border border-white/10 text-zinc-300 group-hover:text-white transition-colors duration-300 mb-6 shadow-inner">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-brand-red group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <CardTitle className="mb-3 font-medium text-lg sm:text-xl text-white">
                    {serv.title}
                  </CardTitle>

                  <CardDescription className="mb-6 text-zinc-400 text-sm leading-relaxed">
                    {serv.description}
                  </CardDescription>

                  <hr className="border-white/5 my-5" />

                  {/* Feature Lists */}
                  <div className="space-y-3 mb-6">
                    <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block mb-1">Incluso na solução</span>
                    {serv.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                        <span className="text-zinc-300 text-xs sm:text-sm leading-tight">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer matching standard */}
                <div className="pt-5 mt-auto border-t border-white/5 flex items-center justify-between text-zinc-600 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase">
                  <span>Solução Konoha</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red/60 animate-pulse" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Mobile Swipe Cue */}
        <div className="flex md:hidden items-center justify-center gap-1.5 pt-2 text-zinc-500 font-mono text-[10px]">
          <span>← deslize os serviços especializados →</span>
        </div>

      </div>
    </section>
  );
}

export default memo(Services);
