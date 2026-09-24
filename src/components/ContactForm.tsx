import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, ChevronRight, X } from 'lucide-react';
import { DATA } from '../data';

interface ContactFormProps {
  isBudgetModalOpen: boolean;
  onCloseBudgetModal: () => void;
  onOpenBudgetModal: () => void;
}

export default function ContactForm({ isBudgetModalOpen, onCloseBudgetModal, onOpenBudgetModal }: ContactFormProps) {
  // Dynamic budget wizard state inside modal
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [projectScale, setProjectScale] = useState<'pequeno' | 'medio' | 'grande'>('medio');
  const [wizardName, setWizardName] = useState('');
  const [wizardEmail, setWizardEmail] = useState('');
  const [wizardPhone, setWizardPhone] = useState('');
  const [wizardMessage, setWizardMessage] = useState('');
  const [wizardSubmitted, setWizardSubmitted] = useState(false);
  const [wizardLoading, setWizardLoading] = useState(false);

  // Services list mapping for budget picker
  const budgetServices = [
    { id: 'web', name: 'Desenvolvimento Web', baseVal: 4500 },
    { id: 'api', name: 'APIs e Back-end', baseVal: 6000 },
    { id: 'automation', name: 'Automações de Processo', baseVal: 3500 },
    { id: 'ai', name: 'Inteligência Artificial', baseVal: 7500 },
    { id: 'qa', name: 'QA e Testes Automatizados', baseVal: 4000 }
  ];

  // Toggle multi-select services in wizard
  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  // Calculate simulated budget price range
  const calculateEstimate = () => {
    if (selectedServices.length === 0) return { min: 0, max: 0 };

    // Sum of base values of chosen services
    let baseSum = selectedServices.reduce((sum, serviceId) => {
      const match = budgetServices.find(b => b.id === serviceId);
      return sum + (match?.baseVal || 0);
    }, 0);

    // Apply scale multiplier
    let multiplier = 1;
    if (projectScale === 'pequeno') multiplier = 0.85;
    if (projectScale === 'grande') multiplier = 1.6;

    const finalBase = baseSum * multiplier;
    return {
      min: Math.round(finalBase * 0.9),
      max: Math.round(finalBase * 1.15)
    };
  };

  const currentEstimate = calculateEstimate();

  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wizardName || !wizardEmail || !wizardPhone) {
      alert('Preencha as informações de contato para receber o orçamento.');
      return;
    }

    const serviceNames = selectedServices
      .map(id => budgetServices.find(s => s.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const scaleLabel =
      projectScale === 'pequeno' ? 'Pequena Empresa (MVP)' :
        projectScale === 'grande' ? 'Corporativo (SLA 100%)' :
          'Empresa em Escala';

    const message = [
      `*Novo Pedido de Orçamento - Konoha Tech*`,
      ``,
      `*Nome:* ${wizardName}`,
      `*WhatsApp:* ${wizardPhone}`,
      `*E-mail:* ${wizardEmail}`,
      `*Serviços:* ${serviceNames || 'Nenhum selecionado'}`,
      `*Porte:* ${scaleLabel}`,
      `*Estimativa:* R$ ${currentEstimate.min.toLocaleString('pt-BR')} - R$ ${currentEstimate.max.toLocaleString('pt-BR')}`,
      `*Obs:* ${wizardMessage || 'Sem observações'}`,
    ].join('\n');

    const phone = DATA[0]?.socialMedia?.whatsapp || '558187772234';
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

    setWizardLoading(true);
    setTimeout(() => {
      setWizardLoading(false);
      setWizardSubmitted(true);
      window.open(url, '_blank');
    }, 500);
  };

  const resetWizard = () => {
    setWizardStep(1);
    setSelectedServices([]);
    setProjectScale('medio');
    setWizardName('');
    setWizardEmail('');
    setWizardPhone('');
    setWizardMessage('');
    setWizardSubmitted(false);
    onCloseBudgetModal();
  };

  return (
    <AnimatePresence>
      {isBudgetModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop Filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetWizard}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Estimator Container Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl rounded-3xl glass-panel border border-brand-red/20 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col bg-[#0c0c0e]"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.01]">
                <div>
                  <span className="font-mono text-[70%] text-brand-red font-bold uppercase tracking-wider block mt-4">
                    Cálculo Inteligente de Orçamento
                  </span>
                  <h3 className="font-display font-bold text[70%] text-white">
                    Estime o escopo do seu projeto
                  </h3>
                </div>
                <button
                  onClick={resetWizard}
                  className="p-2 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                <X />
                </button>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-zinc-900 w-full">
                <div
                  className="h-full bg-brand-red transition-all duration-300"
                  style={{ width: `${(wizardStep / 3) * 100}%` }}
                />
              </div>

              {/* Content body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
                <AnimatePresence mode="wait">
                  {/* STEP 1: SERVICES SELECTOR */}
                  {wizardStep === 1 && !wizardSubmitted && (
                    <motion.div
                      key="wizard-step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="font-display font-semibold text-lg text-white mb-1">Quais soluções você precisa estimar?</h4>
                        <p className="text-xs text-zinc-500">Selecione uma ou mais competências para modelar seu ecossistema técnico.</p>
                      </div>

                      <div className="space-y-3">
                        {budgetServices.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => toggleService(service.id)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${selectedServices.includes(service.id)
                                ? 'bg-brand-red/10 border-brand-red/50 text-white'
                                : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:border-white/15'
                              }`}
                          >
                            <span className="text-sm font-semibold">{service.name}</span>
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${selectedServices.includes(service.id)
                                ? 'bg-brand-red border-brand-red text-white'
                                : 'border-zinc-700 bg-zinc-950'
                              }`}>
                              {selectedServices.includes(service.id) && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Warning if no items select */}
                      {selectedServices.length === 0 && (
                        <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 text-orange-400 text-xs">
                          Selecione pelo menos uma solução acima para prosseguir para o cálculo técnico.
                        </div>
                      )}

                      <div className="pt-4 flex justify-between">
                        <button
                          onClick={resetWizard}
                          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-500 hover:text-white"
                        >
                          Cancelar
                        </button>
                        <button
                          disabled={selectedServices.length === 0}
                          onClick={() => setWizardStep(2)}
                          className={`px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1 cursor-pointer ${selectedServices.length === 0
                              ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                              : 'bg-brand-red text-white hover:bg-brand-red-hover'
                            }`}
                        >
                          Próxima etapa
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: PROJECT SCALE & PRE-ESTIMATE VIEW */}
                  {wizardStep === 2 && !wizardSubmitted && (
                    <motion.div
                      key="wizard-step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="font-display font-semibold text-lg text-white mb-1">Qual o estágio operacional atual do projeto?</h4>
                        <p className="text-xs text-zinc-500">Isso ajuda a dimensionar a robustez de servidores, bancos e arquitetura.</p>
                      </div>

                      {/* Scale selection Grid */}
                      <div className="grid grid-cols-3 gap-4">
                        <div
                          onClick={() => setProjectScale('pequeno')}
                          className={`p-3 rounded-2xl border cursor-pointer text-center space-y-2 transition-all ${projectScale === 'pequeno'
                              ? 'bg-brand-red/10 border-brand-red/45 text-white shadow-xl'
                              : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:border-white/10'
                            }`}
                        >
                          <span className="block font-semibold text-xs uppercase tracking-wide">Iniciando meu negocio</span>
                          <span className="block text-[10px] text-zinc-500">Validação / MVP</span>
                        </div>
                        <div
                          onClick={() => setProjectScale('medio')}
                          className={`py-3 rounded-2xl border cursor-pointer text-center space-y-2 transition-all ${projectScale === 'medio'
                              ? 'bg-brand-red/10 border-brand-red/45 text-white shadow-xl'
                              : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:border-white/10'
                            }`}
                        >
                          <span className="block font-semibold text-xs uppercase tracking-wide">Pequena Empresa</span>
                          <span className="block text-[10px] text-zinc-500">Sistemas Consolidados</span>
                        </div>
                        <div
                          onClick={() => setProjectScale('grande')}
                          className={`py-4 rounded-2xl border cursor-pointer text-center space-y-2 transition-all ${projectScale === 'grande'
                              ? 'bg-brand-red/10 border-brand-red/45 text-white shadow-xl'
                              : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:border-white/10'
                            }`}
                        >
                          <span className="block font-semibold text-xs uppercase tracking-wide">Empresa em Escala</span>
                          <span className="block text-[10px] text-zinc-500">SLA 100% / Multi-tenant</span>
                        </div>
                      </div>

                      {/* CALCULATOR GRAPH BLOCK */}
                      <div className="p-6 rounded-2xl bg-brand-red/[0.02] border border-brand-red/20 text-center space-y-3 mt-4">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">Estimativa Operacional Referencial</span>

                        <div className="font-display font-bold text-3xl text-white">
                          R$ {currentEstimate.min.toLocaleString('pt-BR')} <span className="text-zinc-500 text-lg font-sans font-medium">a</span> R$ {currentEstimate.max.toLocaleString('pt-BR')}
                        </div>

                        <p className="text-[11px] text-zinc-400 max-w-sm mx-auto leading-relaxed">
                          Esta faixa estima custos brutos de arquitetura com base no escopo e escala selecionados. Um escopo refinado final é fornecido sob reuniões técnicas.
                        </p>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          onClick={() => setWizardStep(1)}
                          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-500 hover:text-white"
                        >
                          Voltar
                        </button>
                        <button
                          onClick={() => setWizardStep(3)}
                          className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-brand-red hover:bg-brand-red-hover text-white flex items-center gap-1 cursor-pointer"
                        >
                          Prosseguir
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: CONTACT FORM SECURE CAPTURE */}
                  {wizardStep === 3 && !wizardSubmitted && (
                    <motion.form
                      key="wizard-step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleWizardSubmit}
                      className="space-y-5"
                    >
                      <div>
                        <h4 className="font-display font-semibold text-lg text-white mb-1">Inscreva-se para selar sua proposta</h4>
                        <p className="text-xs text-zinc-500">Nosso engenheiro-chefe herfará este painel estimador para acelerar nosso alinhamento técnico.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label htmlFor="wizard-contact-name" className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide">Seu Nome comercial *</label>
                            <input
                              type="text"
                              id="wizard-contact-name"
                              required
                              placeholder="Ex: Gabriel Victor"
                              value={wizardName}
                              onChange={(e) => setWizardName(e.target.value)}
                              className="w-full bg-zinc-900 border border-white/5 focus:border-brand-red/50 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-0"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label htmlFor="wizard-contact-phone" className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide">WhatsApp de Contato *</label>
                            <input
                              type="text"
                              id="wizard-contact-phone"
                              required
                              placeholder="(11) 99999-9999"
                              value={wizardPhone}
                              onChange={(e) => setWizardPhone(e.target.value)}
                              className="w-full bg-zinc-900 border border-white/5 focus:border-brand-red/50 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-0"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="wizard-contact-email" className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide">E-mail Corporativo de Trabalho *</label>
                          <input
                            type="email"
                            id="wizard-contact-email"
                            required
                            placeholder="gabriel@empresa.com"
                            value={wizardEmail}
                            onChange={(e) => setWizardEmail(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/5 focus:border-brand-red/50 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-0"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="wizard-contact-msg" className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide">Observações Adicionais (Opcional)</label>
                          <textarea
                            id="wizard-contact-msg"
                            rows={2}
                            placeholder="Adicione prazos ou integrações adicionais se desejar..."
                            value={wizardMessage}
                            onChange={(e) => setWizardMessage(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/5 focus:border-brand-red/50 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-0 resize-none"
                          />
                        </div>
                      </div>

                      {/* Submit display range */}
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs text-zinc-400">
                        <span>Estimativa de orçamento:</span>
                        <span className="font-mono text-white font-semibold">R$ {currentEstimate.min.toLocaleString('pt-BR')} - R$ {currentEstimate.max.toLocaleString('pt-BR')}</span>
                      </div>

                      <div className="pt-4 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setWizardStep(2)}
                          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-500 hover:text-white"
                        >
                          Voltar
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-brand-red hover:bg-brand-red-hover text-white flex items-center gap-1 cursor-pointer shadow-lg hover:glow-red"
                        >
                          Solicitar Orçamento Final
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {/* WIZARD SUBMITTED SUCCESS STATE */}
                  {wizardSubmitted && (
                    <motion.div
                      key="wizard-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
                        <Check className="w-8 h-8" />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-display font-medium text-2xl text-white">Proposta Pré-Aprovada!</h4>
                        <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
                          Seu sumário de R$ {currentEstimate.min.toLocaleString('pt-BR')} - R$ {currentEstimate.max.toLocaleString('pt-BR')} foi registrado na nossa esteira.
                        </p>
                        <p className="text-xs text-zinc-500">
                          Nosso engenheiro comercial entrará em contato via WhatsApp nas próximas 2 horas.
                        </p>
                      </div>

                      <button
                        onClick={resetWizard}
                        className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-zinc-900 border border-white/5 text-white hover:bg-zinc-800 transition-colors"
                      >
                        Concluir estimador
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  );
}
