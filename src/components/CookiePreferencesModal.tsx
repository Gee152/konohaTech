import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sliders, ShieldCheck, Check, Info } from 'lucide-react';
import { CookieConsentPreferences } from '../types';

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    prefs: Partial<Pick<CookieConsentPreferences, 'analytics' | 'marketing'>>,
    status: 'all' | 'essential' | 'custom'
  ) => void;
  currentPreferences?: CookieConsentPreferences | null;
}

export default function CookiePreferencesModal({
  isOpen,
  onClose,
  onSave,
  currentPreferences,
}: CookiePreferencesModalProps) {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnalytics(Boolean(currentPreferences?.analytics));
      setMarketing(Boolean(currentPreferences?.marketing));
    }
  }, [isOpen, currentPreferences]);

  const handleSaveCustom = () => {
    onSave({ analytics, marketing }, 'custom');
    onClose();
  };

  const handleAcceptAll = () => {
    onSave({ analytics: true, marketing: true }, 'all');
    onClose();
  };

  const handleRejectAll = () => {
    onSave({ analytics: false, marketing: false }, 'essential');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#0c0c0e] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-white/5 bg-zinc-900/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="cookie-preferences-title" className="font-display font-bold text-lg sm:text-xl text-white">
                    Preferências de Cookies
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Gerencie seu consentimento e autonomia conforme o Art. 8º da LGPD
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar preferências de cookies"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar text-sm">
              <p className="text-xs sm:text-sm text-zinc-300">
                Respeitamos o seu controle sobre os seus dados. Selecione abaixo quais categorias de cookies você autoriza a KonohaTech a utilizar durante a sua navegação.
              </p>

              {/* Categoria 1: Essenciais */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="font-semibold text-white text-sm">Cookies Estritamente Necessários</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Sempre Ativos
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Essenciais para o funcionamento básico, proteção contra requisições forjadas (CSRF), navegação responsiva e para salvar seu próprio termo de consentimento. Não podem ser desativados.
                </p>
              </div>

              {/* Categoria 2: Analytics */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-brand-red" />
                    <span className="font-semibold text-white text-sm">Cookies de Métricas e Desempenho</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                      aria-label="Ativar cookies de métricas e desempenho"
                    />
                    <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
                  </label>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Coletam dados anônimos agregados sobre visitas, tempo de resposta e fluxo de telas para nos ajudar a refinar a performance e velocidade das nossas aplicações web.
                </p>
              </div>

              {/* Categoria 3: Marketing */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-brand-red" />
                    <span className="font-semibold text-white text-sm">Cookies de Marketing & Conversão</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketing}
                      onChange={(e) => setMarketing(e.target.checked)}
                      className="sr-only peer"
                      aria-label="Ativar cookies de marketing e conversão"
                    />
                    <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-red"></div>
                  </label>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Permitem avaliar a eficácia de nossas campanhas de atração de clientes para serviços de engenharia de software e personalizar ofertas comerciais futuras.
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-white/5 bg-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRejectAll}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors text-xs font-medium text-center"
              >
                Rejeitar Opcionais
              </button>
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors text-xs font-semibold text-center"
                >
                  Salvar Preferências
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-brand-red text-white hover:bg-brand-red/90 transition-colors text-xs font-semibold shadow-lg shadow-brand-red/20 text-center"
                >
                  Aceitar Todos
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
