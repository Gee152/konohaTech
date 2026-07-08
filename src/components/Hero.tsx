import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code2, Play, CheckCircle2, Terminal, BarChart2, Cpu, Sparkles, Database } from 'lucide-react';

interface HeroProps {
  onOpenBudgetModal: () => void;
}

export default function Hero({ onOpenBudgetModal }: HeroProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'code' | 'automation'>('analytics');

  return (
    <section className="relative min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-28 flex flex-col justify-center overflow-hidden">
      
      {/* Background radial highlight & floating shapes */}
      <div className="absolute inset-x-0 top-1/4 -z-10 flex justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-brand-red/10 blur-[80px] glow-red" />
      </div>

      {/* Floating high-tech minimalist elements in background */}
      <div className="absolute top-[12%] left-[10%] hidden xl:block animate-float pointer-events-none">
        <div className="glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3 border-brand-red/20 shadow-[0_0_20px_rgba(223,37,49,0.05)]">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-mono text-[10px] tracking-wide text-zinc-400">Deploy: Successful</span>
        </div>
      </div>

      <div className="absolute top-[12%] right-[10%] hidden xl:block animate-float pointer-events-none">
        <div className="glass-panel-red p-3 rounded-2xl flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-red" />
          <span className="font-sans text-[11px] text-zinc-300">Inteligência Artificial Ativa</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: Copy & Call-To-Action */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Tag/Badge de Destaque */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
              </span>
              <span className="text-xs font-semibold tracking-[0.05em] text-brand-red uppercase">
                Will of Fire — Tecnologia na Velocidade da Luz
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[58px] tracking-[-0.04em] text-white leading-[1.05]"
            >
              Transformamos ideias em{' '}
              <span className="text-brand-red">
                soluções digitais
              </span>{' '}
              de alta performance.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed"
            >
              Sites, sistemas, automações e soluções inteligentes desenvolvidas sob medida para empresas que desejam expandir margens e crescer através de inovação e engenharia pura.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-2"
            >
              <button
                onClick={onOpenBudgetModal}
                className="px-8 py-4 rounded-full text-sm font-semibold bg-brand-red text-white hover:bg-brand-red-hover transition-all text-center glow-red hover:scale-[1.02] active:scale-[0.98] duration-200"
              >
                Solicitar orçamento
              </button>
              <a
                href="#portfolio"
                className="px-8 py-4 rounded-full text-sm font-semibold bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex items-center justify-center gap-1 duration-200"
              >
                Conhecer projetos
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </motion.div>

            {/* Micro proof figures */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-8 mt-5 border-t border-white/5 pt-6"
            >
              <div>
                <p className="font-display font-bold text-2xl text-white">45%</p>
                <p className="text-xs text-zinc-500">Mais produtividade operacional</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="font-display font-bold text-2xl text-white">100%</p>
                <p className="text-xs text-zinc-500">Entregas no prazo acordado</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <p className="font-display font-bold text-2xl text-white">12+</p>
                <p className="text-xs text-zinc-500">Tecnologias de ponta dominadas</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Premium Tech Preview Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative w-full"
          >
            {/* Outer shadow glow */}
            <div className="absolute inset-0 bg-brand-red/10 rounded-3xl blur-2xl -z-10" />

            {/* Interactive Futuristic Card mockup */}
            <div className="glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Header inside mockup */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="font-mono text-[11px] text-zinc-500 ml-2">konoha-platform-core</span>
                </div>
                <div className="flex items-center gap-1 bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-mono text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Ativo
                </div>
              </div>

              {/* Showcase switcher buttons */}
              <div className="grid grid-cols-3 border-b border-white/5 bg-white/[0.01]">
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`flex items-center justify-center gap-1.5 py-3 text-xs font-medium cursor-pointer transition-colors ${
                    activeTab === 'analytics'
                      ? 'text-white border-b border-brand-red bg-brand-red/5'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <BarChart2 className="w-3.5 h-3.5" />
                  Painel
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center justify-center gap-1.5 py-3 text-xs font-medium cursor-pointer transition-colors ${
                    activeTab === 'code'
                      ? 'text-white border-b border-brand-red bg-brand-red/5'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Código
                </button>
                <button
                  onClick={() => setActiveTab('automation')}
                  className={`flex items-center justify-center gap-1.5 py-3 text-xs font-medium cursor-pointer transition-colors ${
                    activeTab === 'automation'
                      ? 'text-white border-b border-brand-red bg-brand-red/5'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  Fluxos
                </button>
              </div>

              {/* Dynamic panel content */}
              <div className="p-6 min-h-[300px] flex flex-col justify-between">
                
                {activeTab === 'analytics' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400 font-medium">Faturamento Mensal</span>
                      <span className="text-xs text-emerald-400 font-medium font-mono">+12.4%</span>
                    </div>
                    {/* Glowing graph illustration using CSS borders and flex */}
                    <div className="h-28 flex items-end gap-2 border-b border-white/10 pb-2 relative">
                      <div className="absolute inset-0 flex flex-col justify-between opacity-30 pointer-events-none">
                        <div className="border-b border-white/5 w-full h-px" />
                        <div className="border-b border-white/5 w-full h-px" />
                        <div className="border-b border-white/5 w-full h-px" />
                      </div>
                      <div className="w-full bg-[#df2531]/10 border border-brand-red/30 rounded-t h-[40%] hover:bg-[#df2531]/20 transition-all duration-300 relative group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-800 text-[9px] text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">R$40k</div>
                      </div>
                      <div className="w-full bg-[#df2531]/10 border border-brand-red/30 rounded-t h-[65%] hover:bg-[#df2531]/20 transition-all duration-300 relative group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-800 text-[9px] text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">R$65k</div>
                      </div>
                      <div className="w-full bg-brand-red/20 border border-brand-red/60 rounded-t h-[50%] hover:bg-brand-red/30 transition-all duration-300 relative group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-800 text-[9px] text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">R$50k</div>
                      </div>
                      <div className="w-full bg-[#df2531]/10 border border-brand-red/30 rounded-t h-[80%] hover:bg-[#df2531]/20 transition-all duration-300 relative group">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-800 text-[9px] text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">R$80k</div>
                      </div>
                      <div className="w-full bg-brand-red/40 border border-brand-red rounded-t h-[95%] hover:bg-brand-red/50 transition-all duration-300 relative group glow-red">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-brand-red text-[9px] text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">R$95k</div>
                      </div>
                    </div>
                    {/* Small stats row */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                        <span className="block text-[10px] text-zinc-500 uppercase tracking-wider">Acessos Ativos</span>
                        <span className="font-mono text-base text-white font-semibold">1,429/s</span>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                        <span className="block text-[10px] text-zinc-500 uppercase tracking-wider">Tempo de Resposta</span>
                        <span className="font-mono text-base text-zinc-300 font-semibold">24ms</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'code' && (
                  <div className="font-mono text-xs text-zinc-300 space-y-2">
                    <div className="flex items-center gap-2 mb-3 bg-white/[0.03] p-1.5 rounded-lg w-max px-3 border border-white/5 text-[10px] text-zinc-400">
                      <Database className="w-3.5 h-3.5 text-brand-red" />
                      <span>database-service.ts</span>
                    </div>
                    <div className="text-zinc-500">1 <span className="text-purple-400">import</span> &#123; <span className="text-blue-300">getDatabase</span> &#125; <span className="text-purple-400">from</span> <span className="text-green-300">"@konoha-tech/db"</span>;</div>
                    <div className="text-zinc-500">2 </div>
                    <div className="text-zinc-500">3 <span className="text-purple-400">export async function</span> <span className="text-yellow-300">bootstrapService</span>() &#123;</div>
                    <div className="text-zinc-500">4   <span className="text-purple-400">const</span> db = <span className="text-purple-400">await</span> <span className="text-yellow-300">getDatabase</span>();</div>
                    <div className="text-zinc-500">5   <span className="text-purple-400">const</span> health = <span className="text-purple-400">await</span> db.<span className="text-yellow-300">checkUptime</span>();</div>
                    <div className="text-zinc-500">6 </div>
                    <div className="text-zinc-500">7   <span className="text-purple-400">if</span> (!health.isSafe) &#123;</div>
                    <div className="text-zinc-500">8     <span className="text-purple-400">throw new</span> <span className="text-red-400">DatabaseBootError</span>(<span className="text-teal-300">"Check connection"</span>);</div>
                    <div className="text-zinc-500">9   &#125;</div>
                    <div className="text-zinc-500">10  <span className="text-zinc-400">// Otimizado para 0ms latency</span></div>
                    <div className="text-zinc-500">11  <span className="text-purple-400">return</span> db.<span className="text-yellow-300">streamRealtimeLogs</span>();</div>
                    <div className="text-zinc-500">12 &#125;</div>
                  </div>
                )}

                {activeTab === 'automation' && (
                  <div className="space-y-4">
                    <span className="text-xs text-zinc-400 font-medium block">Automação de Lead para CRM e Slack</span>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 p-2.5 rounded-xl">
                        <div className="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 text-xs font-semibold">1</div>
                        <div className="text-[11px]">
                          <p className="text-white font-medium">Novo Contato Recebido</p>
                          <p className="text-zinc-500 font-mono">Gatilhos: Webhook API de Orçamento</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="w-0.5 h-4 bg-zinc-800" />
                      </div>

                      <div className="flex items-center gap-3 bg-brand-red/10 border border-brand-red/20 p-2.5 rounded-xl">
                        <div className="w-7 h-7 rounded-lg bg-brand-red/20 flex items-center justify-center text-brand-red text-xs font-semibold">2</div>
                        <div className="text-[11px]">
                          <p className="text-white font-medium">Integração IA de Qualificação</p>
                          <p className="text-zinc-500 font-mono">Processamento de escopo por Gemini AI</p>
                        </div>
                        <Sparkles className="w-3.5 h-3.5 text-brand-red ml-auto animate-pulse" />
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="w-0.5 h-4 bg-zinc-800" />
                      </div>

                      <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 p-2.5 rounded-xl">
                        <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-semibold">3</div>
                        <div className="text-[11px]">
                          <p className="text-white font-medium">Sincronização CRM & Notificação</p>
                          <p className="text-zinc-500 font-mono">Enviando painel de negócios no Slack</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer in Mockup */}
                <div className="border-t border-white/5 pt-4 flex items-center justify-between text-[10px] text-zinc-500 font-mono mt-3">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Bancos de dados online
                  </span>
                  <span>SSL Criptografado</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator with micro-animation */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none">
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">Rolar para descobrir</span>
          <div className="w-5 h-8 rounded-full border border-zinc-700 flex justify-center p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
