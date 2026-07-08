import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="depoimentos" className="relative py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-[#09090b]">
    {/* Background glow shadow */}
      <div className="absolute left-[5%] top-[10%] w-[450px] h-[450px] rounded-full bg-brand-red/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    {/* Title */}
        <div className="max-w-3xl mb-16 lg:mb-24 text-left">
          <span className="font-mono text-xs text-brand-red font-semibold tracking-[0.05em] uppercase mb-3 block">
            Satisfação Comprovada
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.04em] text-white leading-tight mb-6">
            Quem trabalha com a Konoha Tech recomenda
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Parcerias duradouras construídas com confiança técnica, entregas exemplares dentro do cronograma e suporte de alta disponibilidade.
          </p>
        </div>

    {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => { 
            const glowColors = [
              "bg-brand-red",
              "bg-orange-500",
              "bg-zinc-400"
            ]
            const borderColors = [
              "via-brand-red",
              "via-orange-500",
              "via-zinc-400"
            ];
            
            const glowColor = glowColors[idx % glowColors.length];
            const borderColor = borderColors[idx % borderColors.length];
            
            return (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`group relative rounded-2xl p-8 glass-panel border border-white/5 hover:border-brand-red/25 transition-all duration-300 flex flex-col justify-between`}>
    {/* Outer light glow behind the card on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-brand-red/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

    {/* Glowing Bottom Effects based on the reference image */}
              <div className={`absolute -bottom-[30%] left-0 right-0 h-[70%] ${glowColor} blur-[90px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none z-0`} />
              <div className={`absolute bottom-0 left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-transparent ${borderColor} to-transparent opacity-20 group-hover:opacity-80 transition-opacity duration-700 z-0`} />

              <div>
    {/* Upper quote icon decorative accent */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-600 group-hover:text-brand-red transition-colors">
                    <Quote className="w-5 h-5 shrink-0" />
                  </div>
    {/* Decorative micro star scoring */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-brand-red text-sm">★</span>
                    ))}
                  </div>
                </div>

    {/* Client Quote Comment */}
                <p className="text-zinc-300 italic text-sm sm:text-base leading-relaxed mb-8">
                  "{testimonial.comment}"
                </p>
              </div>

    {/* Client Profile Section */}
              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-brand-red/40 transition-colors shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white tracking-tight">
                    {testimonial.name}
                  </h4>
                  <p className="text-zinc-500 text-xs font-mono">
                    {testimonial.role} — <span className="text-zinc-400 font-sans font-medium">{testimonial.company}</span>
                  </p>
                </div>
              </div>  
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
