import { memo } from 'react';
import { SERVICES } from '../data';
import { Layout, Sparkles, TrendingUp, Layers, Check, LucideIcon } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

const serviceIcons: Record<string, LucideIcon> = {
  Layout,
  Sparkles,
  TrendingUp,
};

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

        {/* Services Grid (Product Style) */}
        <div className="flex overflow-x-auto pb-4 pt-1 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 no-scrollbar snap-x snap-mandatory">
          {SERVICES.map((serv, idx) => {
            // Dynamically resolve icon
            const IconComponent = serviceIcons[serv.iconName] || Layers;
            
            return (
              <div
                key={serv.id}
                className="w-[84vw] max-w-[340px] shrink-0 md:w-auto snap-start group relative rounded-2xl p-8 bg-[#121214]/40 border border-white/5 hover:border-brand-red/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Service Title with Icon directly alongside */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-brand-red/15 group-hover:border-brand-red/40 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-white tracking-tight leading-snug">
                      {serv.title}
                    </h3>
                  </div>

                  {/* Small description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {serv.description}
                  </p>

                  <hr className="border-white/5 my-5" />

                  {/* Feature Lists */}
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase block mb-1">Incluso na solução</span>
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
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default memo(Services);
