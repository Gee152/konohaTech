import { motion } from 'motion/react';
import { SERVICES } from '../data';
import * as LucideIcons from 'lucide-react';

export default function Services() {
  return (
    <section id="servicos" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-[#09090b]">
      
      {/* Background neon orb */}
      <div className="absolute left-[30%] top-[40%] w-[500px] h-[500px] rounded-full bg-brand-red/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Title */}
        <div className="max-w-3xl mb-16 lg:mb-24 text-left">
          <span className="font-mono text-xs text-brand-red font-semibold tracking-[0.05em] uppercase mb-3 block">
            Nossos Serviços
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.04em] text-white leading-tight mb-6">
            Engenharia de ponta para impulsionar seu pipeline digital
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Explorada ao extremo, nossa especialidade é moldar tecnologia em ferramentas escaláveis que geram economia, eficiência e resultados exponenciais para sua marca.
          </p>
        </div>

        {/* Services Grid (Product Style) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((serv, idx) => {
            // Dynamically resolve icon
            const IconComponent = (LucideIcons as any)[serv.iconName] || LucideIcons.Layers;
            
            return (
              <motion.div
                key={serv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative rounded-2xl p-8 bg-[#121214]/40 border border-white/5 hover:border-brand-red/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top: Icon & Action arrow */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-brand-red/5 border border-brand-red/10 text-brand-red flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {/* Visual product index */}
                    <span className="font-mono text-[10px] text-zinc-600 font-semibold uppercase">
                      Serviço 0{idx + 1}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display font-semibold text-xl text-white mb-3 tracking-tight">
                    {serv.title}
                  </h3>

                  {/* Small description */}
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {serv.description}
                  </p>

                  <hr className="border-white/5 my-5" />

                  {/* Feature Lists */}
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase block mb-1">Incluso na solução</span>
                    {serv.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5">
                        <LucideIcons.Check className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                        <span className="text-zinc-300 text-xs sm:text-sm leading-tight">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

{/*                 <div className="mt-8 pt-4">
                  <span className="inline-flex items-center gap-1 text-xs text-brand-red font-medium group-hover:underline cursor-pointer">
                    Saiba mais sobre {serv.title}
                    <LucideIcons.ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>  */}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
