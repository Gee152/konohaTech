import { useState, memo } from 'react';
import { ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { DATA } from '../data';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'consultoria-solucoes',
    category: 'Consultoria & Crescimento',
    question: 'Como a KonohaTech pode ajudar minha empresa a vender mais pela internet?',
    answer: 'Atuamos como uma consultoria digital completa. Desenvolvemos sites e landing pages modernas e ultrarrápidas, integradas com gestão de tráfego pago (anúncios no Google e Meta) e automações inteligentes. Cuidamos desde a criação da sua estrutura digital até a atração contínua de clientes qualificados prontos para comprar.',
  },
  {
    id: 'trafego-pago',
    category: 'Gestão de Tráfego & Vendas',
    question: 'A KonohaTech também cuida dos anúncios e da captação de clientes?',
    answer: 'Sim! Conectamos o desenvolvimento do seu site a estratégias de tráfego pago no Google Ads e Meta Ads (Instagram e Facebook). Dessa forma, sua empresa não ganha apenas uma página bonita, mas um verdadeiro canal de aquisição de clientes que gera mensagens e orçamentos todos os dias.',
  },
  {
    id: 'diferenciais',
    category: 'Diferenciais & Atendimento',
    question: 'Qual é o diferencial da consultoria da KonohaTech frente a agências tradicionais?',
    answer: 'Não usamos modelos prontos e engessados nem promessas vazias. Oferecemos um acompanhamento próximo e consultivo, unindo visual premium, páginas que carregam instantaneamente no celular e campanhas de anúncios com foco direto em retorno sobre o investimento (ROI).',
  },
  {
    id: 'orcamento-processo',
    category: 'Contratação & Prazos',
    question: 'Como funciona o processo de orçamento e início de um projeto?',
    answer: 'É simples e direto: você nos chama no WhatsApp ou utiliza nosso simulador na página inicial. Fazemos um diagnóstico do seu momento comercial, apresentamos uma proposta transparente com prazos definidos e formalizamos tudo com contrato seguro e nota fiscal.',
  },
  {
    id: 'atendimento-localizacao',
    category: 'Atendimento & Confiança',
    question: 'Onde a empresa está localizada e como é feito o suporte?',
    answer: 'Nossa base fica em Recife-PE, sob o CNPJ oficial 45.109.825/0001-92, e atendemos clientes em todo o Brasil. O contato é direto e ágil via WhatsApp corporativo, com reuniões de alinhamento e suporte contínuo para o seu crescimento.',
  },
];

interface FAQProps {
  onOpenBudgetModal?: () => void;
}

function FAQ({ onOpenBudgetModal }: FAQProps) {
  // Abre o primeiro item por padrão para visualização imediata
  const [openId, setOpenId] = useState<string | null>('consultoria-solucoes');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const whatsappUrl = getWhatsAppUrl(
    DATA[0]?.socialMedia?.whatsapp,
    'Olá KonohaTech! Li o FAQ no site e gostaria de agendar uma conversa sobre consultoria digital e tráfego pago para minha empresa.'
  );

  return (
    <section id="faq" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-[#050505]">
      {/* Background glow orb */}
      <div className="absolute right-[10%] top-[20%] w-[450px] h-[450px] rounded-full bg-brand-red/5 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Consultoria & Resultados"
          title="Perguntas frequentes sobre nossa consultoria digital"
          description="Descubra como unimos criação de sites de alta conversão, gestão de tráfego pago e automações para acelerar as vendas da sua empresa."
        />

        {/* Accordion List */}
        <div className="mt-8 sm:mt-12 space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#121214]/80 border-brand-red/40 shadow-[0_8px_30px_rgba(223,37,49,0.12)]'
                    : 'bg-[#0d0d0f]/50 border-white/5 hover:border-white/15'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-brand-red/90 block">
                      {item.category}
                    </span>
                    <h3 className="font-display font-semibold text-base sm:text-lg text-white group-hover:text-zinc-100 transition-colors">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? 'bg-brand-red/20 border-brand-red/50 text-white rotate-180'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 group-hover:text-white group-hover:border-white/20'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    className="px-5 sm:px-6 pb-6 pt-1 text-zinc-300 text-xs sm:text-sm leading-relaxed border-t border-white/5"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Bar pós-FAQ */}
        <div className="mt-10 sm:mt-14 rounded-2xl bg-gradient-to-r from-[#121214] via-[#1a1214] to-[#121214] border border-brand-red/20 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-white text-base sm:text-lg flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-brand-red" />
              Quer entender qual a melhor estratégia para sua empresa?
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Fale diretamente com nosso especialista para um diagnóstico digital gratuito do seu negócio.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onOpenBudgetModal && (
              <button
                type="button"
                onClick={onOpenBudgetModal}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all text-center cursor-pointer"
              >
                Simular Projeto
              </button>
            )}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-red hover:bg-[#c41d28] text-white text-xs font-semibold shadow-md shadow-brand-red/30 transition-all flex items-center justify-center gap-2"
            >
              Falar no WhatsApp
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FAQ);
