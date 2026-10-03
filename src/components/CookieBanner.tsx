import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, Sliders, ChevronRight } from 'lucide-react';

interface CookieBannerProps {
  isVisible: boolean;
  onAcceptAll: () => void;
  onAcceptEssential: () => void;
  onOpenPreferences: () => void;
  onOpenPrivacyPolicy: () => void;
}

export default function CookieBanner({
  isVisible,
  onAcceptAll,
  onAcceptEssential,
  onOpenPreferences,
  onOpenPrivacyPolicy,
}: CookieBannerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          role="region"
          aria-label="Aviso de Privacidade e Cookies LGPD"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg z-50 pointer-events-auto"
        >
          <div className="bg-[#0c0c0e]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/80 flex flex-col gap-4 text-left">
            {/* Header com ícone de Cookie e Badge de conformidade */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red shrink-0">
                  <Cookie className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    Privacidade e Cookies
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-brand-red/10 text-brand-red border border-brand-red/30">
                      LGPD
                    </span>
                  </h3>
                  <span className="text-[11px] text-zinc-400 block">Lei Federal nº 13.709/2018</span>
                </div>
              </div>
            </div>

            {/* Texto explicativo direto e sem juridiquês */}
            <p className="text-xs text-zinc-300 leading-relaxed">
              Utilizamos cookies estritamente necessários para o funcionamento e, sob sua permissão, cookies analíticos para entender a navegação e refinar nossas soluções. Você tem total autonomia para gerenciar suas escolhas.
            </p>

            {/* Links de navegação e transparência */}
            <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[11px]">
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="text-zinc-400 hover:text-white underline underline-offset-4 transition-colors inline-flex items-center gap-1"
              >
                <span>Ler Política LGPD</span>
                <ChevronRight className="w-3 h-3 text-zinc-500" />
              </button>

              <button
                type="button"
                onClick={onOpenPreferences}
                className="text-zinc-400 hover:text-white underline underline-offset-4 transition-colors inline-flex items-center gap-1"
              >
                <Sliders className="w-3 h-3 text-brand-red" />
                <span>Personalizar preferências</span>
              </button>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-1 border-t border-white/5">
              <button
                type="button"
                onClick={onAcceptEssential}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors text-xs font-medium text-center"
              >
                Apenas Essenciais
              </button>

              <button
                type="button"
                onClick={onAcceptAll}
                className="px-4 py-2 rounded-xl bg-brand-red text-white hover:bg-brand-red/90 transition-all text-xs font-semibold shadow-md shadow-brand-red/25 hover:shadow-brand-red/40 text-center flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Aceitar Todos</span>
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
