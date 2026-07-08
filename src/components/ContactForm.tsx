import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Send, Check, Sparkles, ArrowRight, ChevronRight, MessageSquare, Clock, Briefcase, LucideClosedCaption, X } from 'lucide-react'
import { DATA } from '../data';

interface ContactFormProps {
  isBudgetModalOpen: boolean;
  onCloseBudgetModal: () => void;
  onOpenBudgetModal: () => void;
}

export default function ContactForm({ isBudgetModalOpen, onCloseBudgetModal, onOpenBudgetModal }: ContactFormProps) {

  // Standard contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Dynamic budget wizard state inside modal
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [projectScale, setProjectScale] = useState<'pequeno' | 'medio' | 'grande'>('medio');
  const [wizardName, setWizardName] = useState('');
  const [wizardEmail, setWizardEmail] = useState('');
  const [wizardPhone, setWizardPhone] = useState('');
  const [wizardMessage, setWizardMessage] = useState('');
  const [wizardSubmitted, setWizardSubmitted] = useState(false);

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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      // Clear fields
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1200);
  };

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

    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
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
    <>
      {/* FINAL CHAMADA PARA AÇÃO (CTA) */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-red-950 via-[#120204] to-zinc-950 border-t border-brand-red/35">

        {/* Background mesh grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(223,37,49,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(223,37,49,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute left-[30%] top-[-50%] w-[600px] h-[600px] rounded-full bg-brand-red/10 blur-[130px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Tag */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/20 border border-brand-red/40 text-xs text-white font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-red animate-pulse" />
              Impulsione sua operação
            </span>

            {/* Title */}
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-[-0.04em] text-white max-w-3xl mx-auto leading-tight">
              Pronto para tirar sua ideia do papel?
            </h2>

            {/* Subtext */}
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Vamos construir juntos uma solução sob medida de altíssima performance para acelerar as vendas e otimizar o fluxo de crescimento do seu negócio.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
              <button
                onClick={onOpenBudgetModal}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition-all font-display duration-200 shadow-2xl active:scale-[0.98] cursor-pointer"
              >
                Solicitar orçamento
              </button>
              <a
                href={`https://api.whatsapp.com/send?phone=${DATA[0]?.socialMedia?.whatsapp}&text=Ol%C3%A1%20Konoha%20Tech!%20Gostaria%20de%20conversar%20sobre%20um%20projeto.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold glass-panel border border-white/10 hover:border-white/20 text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2 duration-200 active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4 text-brand-red shrink-0" />
                Falar no WhatsApp
              </a>
            </div>

            {/* Live stats */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-red" />
                Retorno comercial em até 2 horas
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-700 hidden sm:block" />
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-brand-red" />
                Consultoria técnica cortesia inicial
              </span>
            </div>

          </motion.div>
        </div>
      </section>

      {/* CONTATO INTEGRAL COM FORMULÁRIO */}
      <section id="contato" className="relative py-24 lg:py-32 overflow-hidden bg-[#09090b] border-t border-white/5">

        {/* Soft background glow */}
        <div className="absolute right-[5%] bottom-[10%] w-[350px] h-[350px] rounded-full bg-brand-red/5 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-16 items-start">

            {/* Left Column: Coordinates & Information */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="font-mono text-xs text-brand-red font-semibold tracking-[0.05em] uppercase mb-3 block">
                  Meios de Contato
                </span>
                <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-[-0.04em] mb-6">
                  Vamos criar algo lendário. Estamos prontos para ouvir.
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  Tem uma ideia de sistema ou precisa automatizar seus fluxos corporativos? Envie-nos uma mensagem e descubra como a Konoha Tech impulsionará seus lucros operacionais.
                </p>
              </div>

              {/* Information Row Items */}
              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-brand-red shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-semibold text-sm text-zinc-300">Telefone / WhatsApp</h5>
                    <p className="text-zinc-500 text-sm">+55 (11) 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-brand-red shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-semibold text-sm text-zinc-300">E-mail Comercial</h5>
                    <p className="text-zinc-500 text-sm hover:text-white transition-colors">{DATA[0].email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-brand-red shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-semibold text-sm text-zinc-300">Escritório Central</h5>
                    <p className="text-zinc-500 text-sm">Av. Marucio de Nassau, 130 - Iputiga - Recife, PE</p>
                  </div>
                </div>
              </div>

              {/* Response Time Guarantee */}
              <div className="p-4 rounded-xl bg-[#df2531]/5 border border-[#df2531]/10 text-xs text-zinc-400 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-brand-red animate-ping shrink-0" />
                <span>Nossa taxa média de resposta comercial é de apenas 45 minutos.</span>
              </div>
            </div>

            {/* Right Column: Physical Contact Form */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/5 relative">

                {/* Visual Glow Header */}
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-zinc-950 px-4 py-1.5 rounded-full border border-white/10 font-mono text-[10px] text-zinc-500">
                  Formulário Exclusivo
                </div>

                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleContactSubmit}
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="user-name" className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block">Seu Nome *</label>
                          <input
                            type="text"
                            id="user-name"
                            required
                            placeholder="Ex: Gabriel Victor"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/5 focus:border-brand-red/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-0 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="user-phone" className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block">Celular / WhatsApp</label>
                          <input
                            type="text"
                            id="user-phone"
                            placeholder="Ex: (11) 99999-9999"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-zinc-900 border border-white/5 focus:border-brand-red/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-0 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="user-email" className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block">E-mail Corporativo *</label>
                        <input
                          type="email"
                          id="user-email"
                          required
                          placeholder="contatokonohatech@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-zinc-900 border border-white/5 focus:border-brand-red/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-0 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="user-message" className="text-xs text-zinc-400 font-semibold uppercase tracking-wider block">Descreva seu projeto ou gargalo *</label>
                        <textarea
                          id="user-message"
                          required
                          rows={4}
                          placeholder="Quais sistemas ou processos manuais sua empresa gostaria de automatizar/desenvolver?"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-zinc-900 border border-white/5 focus:border-brand-red/50 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-0 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={formLoading}
                        className={`w-full py-4 rounded-xl text-center font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${formLoading
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-brand-red hover:bg-brand-red-hover text-white sm:hover:scale-[1.01] duration-150'
                          }`}
                      >
                        {formLoading ? 'Enviando dados...' : 'Enviar mensagem comercial'}
                        <Send className="w-4 h-4" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl">
                        <Check className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-display font-medium text-2xl text-white">Contato Recebido!</h4>
                        <p className="text-zinc-400 text-sm max-w-sm mx-auto leading-relaxed">
                          Sua mensagem foi enviada com sucesso para nossa engenharia comercial. Retornaremos em menos de 45 minutos.
                        </p>
                      </div>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="text-xs text-brand-red uppercase font-bold tracking-widest hover:underline cursor-pointer"
                      >
                        Enviar outro formulário
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLID BUDGET CALCULATOR WIZARD MODAL */}
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
    </>
  );
}
