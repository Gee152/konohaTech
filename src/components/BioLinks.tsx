import { useState, useTransition, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  Sparkles,
  Briefcase,
  Code2,
  Workflow,
  Instagram,
  Linkedin,
  Share2,
  Globe,
  Check,
  ChevronRight,
  ArrowUpRight,
  LucideIcon
} from 'lucide-react';
import { profileConfig, bioLinksData } from '../data';
import { BioLinkItem } from '../types';
import PortfolioModal from './PortfolioModal';
import { CircularCommandMenu, CommandItem } from '@/components/ui/circular-command-menu';

interface BioLinksProps {
  onNavigateToLanding: (targetAnchorId?: string) => void;
  onOpenBudgetModal: () => void;
}

// Mapeamento seguro de ícones Lucide
const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  Sparkles,
  Briefcase,
  Code2,
  Workflow,
  Instagram,
  Linkedin,
};

export default function BioLinks({ onNavigateToLanding, onOpenBudgetModal }: BioLinksProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'circular' | 'list'>('circular');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  // Manipulador do compartilhamento nativo com fallback para clipboard
  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareData = {
      title: `${profileConfig.name} — Links Oficiais`,
      text: profileConfig.tagline,
      url: shareUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        // Se o usuário cancelou o share sheet, não dispara erro
        if ((error as Error)?.name === 'AbortError') return;
      }
    }

    // Fallback: cópia para a área de transferência
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast('Link copiado para a área de transferência!');
      } catch {
        showToast('Não foi possível copiar o link.');
      }
    }
  };

  const showToast = (message: string) => {
    startTransition(() => {
      setToastMessage(message);
    });
    setTimeout(() => {
      startTransition(() => {
        setToastMessage(null);
      });
    }, 2800);
  };

  // Tratamento de cliques nos Action Cards
  const handleCardClick = (link: BioLinkItem) => {
    if (link.id === 'portfolio-cases') {
      setIsPortfolioModalOpen(true);
      return;
    }

    switch (link.type) {
      case 'whatsapp': {
        const phone = profileConfig.whatsappNumber;
        const text = encodeURIComponent(link.whatsappMessage || 'Olá! Gostaria de mais informações.');
        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        break;
      }
      case 'modal': {
        onOpenBudgetModal();
        break;
      }
      case 'anchor': {
        onNavigateToLanding(link.targetAnchorId);
        break;
      }
      case 'external': {
        if (link.url) {
          window.open(link.url, '_blank', 'noopener,noreferrer');
        }
        break;
      }
    }
  };

  // Ação rápida para o banner de urgência
  const handleUrgencyClick = () => {
    const phone = profileConfig.whatsappNumber;
    const text = encodeURIComponent(profileConfig.urgencyBanner.whatsappMessage);
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Itens mapeados dos botões de escolha para o Circular Command Menu (memoizado para performance instantânea)
  const choiceCommandItems: CommandItem[] = useMemo(() => {
    return bioLinksData.map((link, idx) => {
      const IconComponent = iconMap[link.icon] || Globe;
      return {
        id: link.id,
        label: link.title,
        shortcut: `${idx + 1}`,
        icon: <IconComponent className="w-5 h-5 text-white" />,
        onClick: () => handleCardClick(link),
      };
    });
  }, []);

  return (
    <div className="relative min-h-screen text-zinc-100 font-sans selection:bg-[#df2531]/30 selection:text-white pb-16 pt-4 px-4 sm:px-6">
      
      {/* Toast Feedback de Compartilhamento / Ações */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-5 inset-x-4 max-w-xs mx-auto z-50 py-3 px-4 rounded-xl glass-panel-red border border-[#df2531]/40 shadow-2xl flex items-center justify-center gap-2.5 text-center text-xs font-medium text-white"
          >
            <Check className="w-4 h-4 text-[#df2531] shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Container Central Mobile-First (Largura ótima 440px) */}
      <div className="max-w-[440px] w-full mx-auto flex flex-col gap-1">

        {/* 1. Top Action Bar: Site Completo & Compartilhar */}
        <header className="flex items-center justify-between pt-2">
          <button
            onClick={() => onNavigateToLanding()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel hover:bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-all active:scale-95"
            aria-label="Acessar o site completo da KonohaTech"
          >
            <Globe className="w-3.5 h-3.5 text-[#df2531]" />
            <span>Acessar Site Completo</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-full glass-panel hover:bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all active:scale-95"
            aria-label="Compartilhar este perfil"
            title="Compartilhar"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </header>

        {/* 2. Profile Header / Identidade Visual */}
        <div className="flex flex-col items-center text-center pt-2">
          
          {/* Avatar com neon ring e glow red */}
          <div className="relative group mb-4">
            <div className="relative flex items-center justify-center w-24 h-24 rounded-2xl bg-[#df2531]/10 border-2 border-[#df2531]/40 shadow-[0_0_25px_rgba(223,37,49,0.3)]">
              <img
                src={profileConfig.avatarSrc}
                alt={profileConfig.name}
                className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            
            {/* Status Online Indicator */}
            <div 
              className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-[#050505] border border-white/10 flex items-center gap-1.5 shadow-lg"
              title="Operação ativa e recebendo projetos"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-semibold">Online</span>
            </div>
          </div>

          {/* Nome Semântico */}
          <h1 className="font-display font-bold text-2xl tracking-tight text-white flex items-center justify-center gap-1.5">
            <span>Konoha</span>
            <span className="text-[#df2531]">Tech</span>
          </h1>

          {/* Handle clicável para Instagram */}
          <a
            href={profileConfig.handleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 font-mono text-xs text-zinc-400 hover:text-[#df2531] transition-colors inline-flex items-center gap-1"
          >
            {profileConfig.handle}
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>

          {/* Mini-bio de impacto */}
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xs leading-relaxed">
            {profileConfig.tagline}
          </p>

          {/* Badges de Localização e Atuação */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="px-2.5 py-1 rounded-md glass-panel text-[10px] font-mono text-zinc-400 border border-white/5">
              {profileConfig.location}
            </span>
          </div>
        </div>


        {/* 4. Menu de Escolhas com Circular Command Menu */}
        <main className="w-full">
          {/* Seletor de Modo de Exibição */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#df2531] shadow-[0_0_8px_#df2531]" />
              <span className="font-display font-bold text-xs uppercase tracking-wider text-zinc-300">
                Menu de Escolhas
              </span>
            </div>

            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5 text-[11px] font-mono">
              <button
                onClick={() => setViewMode('circular')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === 'circular'
                    ? 'bg-[#df2531] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Circular
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#df2531] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Lista
              </button>
            </div>
          </div>

          {viewMode === 'circular' ? (
            /* Modo 1: Circular Command Menu em Destaque (Sem o card/box) */
            <div className="relative w-full min-h-[290px] py-10 flex items-center justify-center">
              <CircularCommandMenu
                items={choiceCommandItems}
                defaultOpen={false}
                isOpen={isMenuOpen}
                onOpenChange={(open) => {
                  setIsMenuOpen(open);
                  if (!open) {
                    setSelectedChoiceIndex(null);
                  }
                }}
                radius={95}
                showBackdrop={false}
                showFloatingTooltips={false}
                twoStepClick={true}
                activeIndex={selectedChoiceIndex !== null ? selectedChoiceIndex : -1}
                onActiveIndexChange={(idx) => setSelectedChoiceIndex(idx)}
                triggerClassName="h-16 w-16 bg-[#df2531] hover:bg-[#b81c26] text-white shadow-[0_0_30px_rgba(223,37,49,0.55)] border-2 border-white/20 active:scale-95"
              />
            </div>
          ) : (
            /* Modo 2: Visualização em lista clássica */
            <div className="flex flex-col gap-3">
              {bioLinksData.map((link, index) => {
                const IconComponent = iconMap[link.icon] || Globe;
                const isHighlight = Boolean(link.highlight);

                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => handleCardClick(link)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-200 group relative flex items-center justify-between gap-3 min-h-[56px] active:scale-[0.98] ${
                      isHighlight
                        ? 'glass-panel-red border-2 border-[#df2531]/60 shadow-[0_0_25px_rgba(223,37,49,0.18)] hover:border-[#df2531]'
                        : 'glass-panel border border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                    aria-label={link.title}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                          isHighlight
                            ? 'bg-[#df2531] text-white shadow-[0_0_15px_rgba(223,37,49,0.5)]'
                            : 'bg-white/5 text-zinc-300 border border-white/10 group-hover:text-white'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-semibold text-sm text-white tracking-tight truncate">
                            {link.title}
                          </span>
                          {link.badge && (
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-medium whitespace-nowrap shrink-0 ${
                                link.badgeColor || 'bg-white/10 text-zinc-300'
                              }`}
                            >
                              {link.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-zinc-400 truncate mt-0.5">
                          {link.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all">
                      {link.type === 'external' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </main>

        {/* Lista de Ações e Botões abaixo do Menu */}
        <div className="w-full flex flex-col gap-3 mt-4 mb-4">
          {/* 1º Botão da Lista: Card de Ação do Evento Selecionado (quando menu aberto e evento clicado) */}
          <AnimatePresence mode="wait">
            {viewMode === 'circular' && isMenuOpen && selectedChoiceIndex !== null && bioLinksData[selectedChoiceIndex] && (
              <motion.div
                key={bioLinksData[selectedChoiceIndex].id}
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleCardClick(bioLinksData[selectedChoiceIndex])}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl glass-panel-red border border-[#df2531]/40 shadow-xl cursor-pointer hover:border-[#df2531] transition-all group"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#df2531] shrink-0 animate-pulse shadow-[0_0_8px_#df2531]" />
                  <div className="flex flex-col min-w-0 text-left">
                    <span className="font-display font-bold text-xs sm:text-sm text-white tracking-tight">
                      {bioLinksData[selectedChoiceIndex].title}
                    </span>
                    <span className="text-[11px] text-zinc-400 truncate mt-0.5">
                      Clique novamente no botão ou aqui para acessar
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#df2531] group-hover:bg-[#b81c26] text-white text-xs font-bold shadow-md transition-all active:scale-95">
                  <span>Acessar</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2º Botão da Lista (Print 2): Banner de Urgência & Escassez de Squads (Garantir Vaga) */}
          {profileConfig.urgencyBanner.enabled && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-3.5 rounded-2xl glass-panel-red border border-[#df2531]/30 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#df2531] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#df2531]"></span>
                    </span>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#df2531]">
                      {profileConfig.urgencyBanner.title}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 mt-1">
                    {profileConfig.urgencyBanner.subtitle}
                  </p>
                </div>

                <button
                  onClick={handleUrgencyClick}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-[#df2531] hover:bg-[#b81c26] text-white text-[11px] font-semibold transition-all shadow-[0_0_12px_rgba(223,37,49,0.4)] active:scale-95"
                >
                  {profileConfig.urgencyBanner.ctaText}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* 5. Footer & Metadados */}
        <footer className="flex flex-col items-center text-center gap-3 pt-4 border-t border-white/5">
          <p className="font-mono text-[10px] text-zinc-600">
            © {new Date().getFullYear()} KonohaTech • CNPJ: 45.109.825/0001-92
          </p>
        </footer>
      </div>

      {/* Modal de Casos Reais & Portfólio (Estilo Print 2) */}
      <PortfolioModal
        isOpen={isPortfolioModalOpen}
        onClose={() => setIsPortfolioModalOpen(false)}
      />
    </div>
  );
}
