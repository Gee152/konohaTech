import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Lock, Mail, ExternalLink, FileText } from 'lucide-react';
import { DATA } from '../data';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-policy-title"
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
            className="relative w-full max-w-3xl max-h-[85vh] bg-[#0c0c0e] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 border-b border-white/5 bg-zinc-900/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="privacy-policy-title" className="font-display font-bold text-lg sm:text-xl text-white">
                    Política de Privacidade e LGPD
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Conformidade rigorosa com a Lei Federal nº 13.709/2018 (Lei Geral de Proteção de Dados)
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar política de privacidade"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-sm text-zinc-300 leading-relaxed custom-scrollbar">
              {/* Resumo executivo */}
              <div className="p-4 rounded-xl bg-brand-red/5 border border-brand-red/20 flex items-start gap-3 text-xs sm:text-sm">
                <Lock className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <p className="text-zinc-200">
                  Na <strong>KonohaTech</strong>, a privacidade e a segurança das suas informações são tratadas como pilares fundamentais de engenharia. Não comercializamos dados pessoais sob hipótese alguma e coletamos estritamente o necessário para orçamentos e prestação de serviços.
                </p>
              </div>

              {/* 1. Controlador */}
              <section className="space-y-2">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                  1. Identificação do Controlador
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400">
                  A <strong>KonohaTech</strong>, inscrita no CNPJ sob o nº <strong>45.109.825/0001-92</strong>, com sede em Recife, PE, é a entidade controladora responsável pelas decisões referentes ao tratamento dos dados pessoais coletados nesta plataforma.
                </p>
              </section>

              {/* 2. Dados Coletados */}
              <section className="space-y-2">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                  2. Dados Coletados e Finalidades
                </h4>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-zinc-400">
                  <li>
                    <strong className="text-zinc-200">Dados de Contato Comercial:</strong> Nome, endereço de e-mail, telefone/WhatsApp e escopo do projeto, informados voluntariamente no nosso formulário de estimativa de orçamento. <em>Finalidade:</em> Retorno comercial direto, elaboração de propostas sob medida e formalização de parcerias de desenvolvimento.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Dados de Navegação e Dispositivo:</strong> Endereço IP anonimizado, resolução de tela, navegador e tempo de permanência. <em>Finalidade:</em> Monitoramento de integridade e estabilidade técnica contra ameaças cibernéticas.
                  </li>
                  <li>
                    <strong className="text-zinc-200">Preferências de Cookies:</strong> Status de aceitação das categorias de cookies para respeitar a sua autonomia.
                  </li>
                </ul>
              </section>

              {/* 3. Bases Legais */}
              <section className="space-y-2">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                  3. Bases Legais de Tratamento (Art. 7º da LGPD)
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Todo tratamento é fundamentado exclusivamente em uma das seguintes hipóteses legais:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/5">
                    <span className="text-[11px] font-mono text-brand-red uppercase block">Art. 7º, I</span>
                    <strong className="text-xs text-white block mt-0.5">Consentimento</strong>
                    <span className="text-[11px] text-zinc-500">Autorização voluntária para cookies analíticos e contatos.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/5">
                    <span className="text-[11px] font-mono text-brand-red uppercase block">Art. 7º, V</span>
                    <strong className="text-xs text-white block mt-0.5">Pré-Contrato</strong>
                    <span className="text-[11px] text-zinc-500">Elaboração de escopos e orçamentos solicitados por você.</span>
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/5">
                    <span className="text-[11px] font-mono text-brand-red uppercase block">Art. 7º, IX</span>
                    <strong className="text-xs text-white block mt-0.5">Legítimo Interesse</strong>
                    <span className="text-[11px] text-zinc-500">Prevenção a fraudes e garantia de disponibilidade técnica.</span>
                  </div>
                </div>
              </section>

              {/* 4. Direitos do Titular */}
              <section className="space-y-2">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                  4. Seus Direitos (Art. 18 da LGPD)
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Como titular dos dados, você pode a qualquer momento e sem custos solicitar:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400">
                  <li className="flex items-center gap-2 bg-zinc-900/40 p-2.5 rounded-lg border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    Confirmação da existência de tratamento
                  </li>
                  <li className="flex items-center gap-2 bg-zinc-900/40 p-2.5 rounded-lg border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    Acesso facilitado aos seus dados
                  </li>
                  <li className="flex items-center gap-2 bg-zinc-900/40 p-2.5 rounded-lg border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    Correção de dados incompletos ou inexatos
                  </li>
                  <li className="flex items-center gap-2 bg-zinc-900/40 p-2.5 rounded-lg border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    Eliminação dos dados tratados com consentimento
                  </li>
                  <li className="flex items-center gap-2 bg-zinc-900/40 p-2.5 rounded-lg border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    Portabilidade dos dados
                  </li>
                  <li className="flex items-center gap-2 bg-zinc-900/40 p-2.5 rounded-lg border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    Revogação simples do consentimento
                  </li>
                </ul>
              </section>

              {/* 5. Segurança da Informação */}
              <section className="space-y-2">
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                  5. Segurança e Retenção
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Adotamos padrões de criptografia de ponta a ponta (TLS 1.3), princípios de <em>Security by Design</em> e servidores com controle de acesso rigoroso. Seus dados cadastrais são retidos apenas pelo tempo necessário para cumprir as finalidades descritas ou exigências legais.
                </p>
              </section>

              {/* 6. Encarregado de Dados (DPO) */}
              <section className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 space-y-2">
                <h4 className="font-semibold text-white flex items-center gap-2 text-xs sm:text-sm">
                  <Mail className="w-4 h-4 text-brand-red" />
                  Canal Oficial de Atendimento e DPO
                </h4>
                <p className="text-xs text-zinc-400">
                  Para exercer seus direitos de titular ou tirar qualquer dúvida técnica ou jurídica, envie um e-mail para o nosso Encarregado de Proteção de Dados:
                </p>
                <div className="pt-1">
                  <a
                    href={`mailto:${DATA[0]?.email || 'contatokonohatech@gmail.com'}?subject=Privacidade%20e%20LGPD%20-%20KonohaTech`}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-red hover:underline"
                  >
                    <span>{DATA[0]?.email || 'contatokonohatech@gmail.com'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </section>

              <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-white/5">
                Última atualização: Outubro de 2026 • Versão 2.1 LGPD Compliant
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-white/5 bg-zinc-900/40 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-brand-red text-white hover:bg-brand-red/90 transition-colors text-xs sm:text-sm font-semibold shadow-lg shadow-brand-red/20"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
