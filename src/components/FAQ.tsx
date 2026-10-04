import { useState, memo } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
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
    id: 'servicos',
    category: 'Soluções & Escopo',
    question: 'Quais serviços a KonohaTech desenvolve?',
    answer: 'A KonohaTech é especializada em desenvolvimento de Web Apps e landing pages de alta performance, construção de APIs REST e microsserviços, automações de processos de negócios integradas com inteligência artificial e consultoria técnica de arquitetura de software.',
  },
  {
    id: 'diferenciais',
    category: 'Engenharia & Performance',
    question: 'Por que escolher a KonohaTech em vez de agências tradicionais ou templates prontos?',
    answer: 'Desenvolvemos código puro e arquitetura sob medida sem templates engessados ou construtores lentos. Nossas soluções entregam notas máximas no Google Lighthouse (Core Web Vitals), carregamento sub-segundo, segurança blindada e designs modernos projetados para máxima conversão.',
  },
  {
    id: 'localizacao-cnpj',
    category: 'Institucional & Segurança',
    question: 'Onde a KonohaTech está sediada e qual seu CNPJ?',
    answer: 'A KonohaTech está sediada em Recife, Pernambuco (Brasil), com atendimento global remoto, sob o CNPJ oficial 45.109.825/0001-92. Emitimos nota fiscal e formalizamos contratos de confidencialidade (NDA) para todos os projetos.',
  },
  {
    id: 'orcamento',
    category: 'Comercial & Prazos',
    question: 'Como solicitar um orçamento ou proposta comercial?',
    answer: 'Você pode solicitar um orçamento através do simulador de escopo presente na página inicial ou contatar diretamente nossa equipe pelo WhatsApp corporativo +55 (81) 98777-2234 ou e-mail contatokonohatech@gmail.com.',
  },
  {
    id: 'stack',
    category: 'Stack Técnica',
    question: 'Quais tecnologias a KonohaTech domina?',
    answer: 'A stack principal inclui React 19, TypeScript, Next.js, Vite, Tailwind CSS v4, Node.js, PostgreSQL, Docker, Playwright, Vitest e modelos avançados de IA (OpenAI, Claude, Gemini).',
  },
];

interface FAQProps {
  onOpenBudgetModal?: () => void;
}

function FAQ({ onOpenBudgetModal }: FAQProps) {
  // Abre o primeiro item por padrão para visualização imediata
  const [openId, setOpenId] = useState<string | null>('servicos');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const whatsappUrl = getWhatsAppUrl(
    DATA[0]?.socialMedia?.whatsapp,
    'Olá KonohaTech! Li o FAQ no site e gostaria de tirar uma dúvida específica sobre meu projeto.'
  );

  return (
    <section id="faq" className="relative py-20 sm:py-24 lg:py-32 overflow-hidden border-t border-white/5 bg-[#050505]">
      {/* Background glow orb */}
      <div className="absolute right-[10%] top-[20%] w-[450px] h-[450px] rounded-full bg-brand-red/5 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Tire Suas Dúvidas"
          title="Perguntas frequentes sobre nossa engenharia"
          description="Transparência total em processos, tecnologias adotadas, prazos e modalidades de contratação para o seu negócio."
        />

        {/* Accordion List */}
        <div className="mt-8 sm:mt-12 space-y-3.5">
          {FAQ_ITEMS.map((item, index) => {
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
                  className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/50"
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
              Sua dúvida não está listada aqui?
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Fale diretamente com Gabriel Campos (Fundador & Tech Lead) para uma análise técnica personalizada.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onOpenBudgetModal && (
              <button
                type="button"
                onClick={onOpenBudgetModal}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all text-center"
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
              Conversar no WhatsApp
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FAQ);
