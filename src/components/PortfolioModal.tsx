import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Globe } from 'lucide-react';
import { PORTFOLIO } from '../data';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PortfolioModal({ isOpen, onClose }: PortfolioModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fecha com a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentProject = PORTFOLIO[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PORTFOLIO.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PORTFOLIO.length) % PORTFOLIO.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        
        {/* Backdrop escurecido com blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Container do Modal no estilo do Print 2 (Ergonomia Mobile-First) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-[420px] rounded-3xl bg-[#090d14] border border-white/10 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Botão de Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full text-zinc-400 hover:text-white bg-black/40 backdrop-blur-sm border border-white/10 transition-colors active:scale-95"
            aria-label="Fechar modal de portfólio"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Barra de destaque superior e Cabeçalho */}
          <div className="pt-6 pb-2 px-6 text-center">
            {/* Linha de acento vermelha (estilo Print 2) */}
            <div className="w-10 h-1 bg-[#df2531] rounded-full mx-auto mb-3" />
            
            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight uppercase">
              Nossos Clientes
            </h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-[320px] mx-auto leading-relaxed">
              Alguns dos nossos projetos.
            </p>
          </div>

          {/* Área do Card com visual do Print 2 */}
          <div className="px-4 py-2 flex-grow overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl bg-[#0f141f] border border-white/10 overflow-hidden flex flex-col shadow-xl"
              >
                {/* Imagem Ampliada do Mockup do Site com Badges (Ocupando o espaço do texto) */}
                <div className="relative h-64 sm:h-72 w-full bg-zinc-950 overflow-hidden">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
                  />
                  
                  {/* Badge de Destaque no topo-esquerdo (estilo Print 2) */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#df2531] text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg">
                    {currentIndex === 0 ? 'Mais Acessado' : currentProject.category}
                  </div>

                  {/* Ícone flutuante no canto inferior direito */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#df2531] shadow-md">
                    <Globe className="w-4 h-4" />
                  </div>
                </div>

                {/* Linha com Nome do Site e Botão de Ação */}
                <div className="p-4 flex flex-col gap-3">
                  
                  {/* Nome do Site (onde ficava o React • Node.js) */}
                  <div className="flex items-center justify-between text-xs py-0.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-[#df2531] shrink-0" />
                      <span className="font-display font-bold text-sm text-white tracking-tight truncate">
                        {currentProject.title}
                      </span>
                    </div>
                    <span className="text-emerald-400 font-mono font-semibold uppercase text-[10px] shrink-0 ml-2">
                      Online
                    </span>
                  </div>

                  {/* Botão de Ação: Analisar Agora */}
                  {currentProject.url && (
                    <a
                      href={currentProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-xl bg-zinc-800 hover:bg-[#df2531] text-white text-center font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-95 group cursor-pointer"
                    >
                      <span>Analisar Agora</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Paginação inferior com Dots e Setas de Navegação (estilo Print 2) */}
          <div className="p-4 flex items-center justify-between border-t border-white/5">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors active:scale-90"
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots de navegação */}
            <div className="flex items-center gap-2">
              {PORTFOLIO.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-6 h-1.5 bg-[#df2531]'
                      : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Ir para projeto ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors active:scale-90"
              aria-label="Próximo projeto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
