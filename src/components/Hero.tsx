import { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import gabrielImg from '../assets/img/gabriel.webp';

interface SlowCounterProps {
  target: number;
  duration?: number;
}

const PRESENTATION_PHRASES = [
  "Olá! Sou Gabriel Campos, fundador e desenvolvedor de software na KonohaTech.",
  "Arquiteto plataformas web modernas, sistemas de alta performance e automações com IA.",
  "Transformo ideias em soluções digitais velozes, escaláveis e com foco em conversão.",
  "Engenharia de precisão e código limpo para acelerar o crescimento da sua empresa.",
];

function TypewriterPresentation() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Efeito simulador de digitação em velocidade realista
  useEffect(() => {
    const currentPhrase = PRESENTATION_PHRASES[phraseIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Digitando caractere por caractere (~36ms por tecla)
      if (displayedText.length < currentPhrase.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 36);
      } else {
        // Pausa para leitura confortável
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2800);
      }
    } else {
      // Apagando rapidamente (~18ms por caractere)
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
        }, 18);
      } else {
        // Avança para a próxima frase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PRESENTATION_PHRASES.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, phraseIndex]);

  return (
    <div className="rounded-2xl bg-black/85 backdrop-blur-xl border border-white/10 p-3 sm:p-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.85)] border-t-white/20 transition-all">
      {/* Header bar com status e indicadores de etapa */}
      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="font-mono text-[11px] font-semibold text-white tracking-wide">
            Gabriel Campos
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500">•</span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-400">
            Fundador & Tech Lead
          </span>
        </div>

        {/* Indicadores visuais de etapa da apresentação */}
        <div className="flex items-center gap-1" aria-hidden="true">
          {PRESENTATION_PHRASES.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === phraseIndex ? 'w-3.5 bg-brand-red' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Linha do terminal simulando digitação */}
      <div className="min-h-[46px] sm:min-h-[50px] flex items-start">
        <p className="text-xs sm:text-[13px] text-zinc-200 leading-snug font-normal select-none" aria-live="polite">
          <span className="text-brand-red font-mono font-bold mr-1.5 select-none">{'>'}</span>
          <span>{displayedText}</span>
          <span
            className="inline-block w-1.5 h-3.5 sm:h-4 bg-brand-red ml-1 align-middle rounded-[1px] animate-cursor-blink"
            aria-hidden="true"
          />
        </p>
      </div>
    </div>
  );
}

function SlowCounter({ target, duration = 3400 }: SlowCounterProps) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const countRef = useRef(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const timeRatio = Math.min(elapsed / duration, 1);

      // Curva suave de atenuação (soft ease-out)
      const ease = 1 - Math.pow(1 - timeRatio, 1.6);
      const nextVal = Math.round(target * ease);

      if (nextVal !== countRef.current) {
        countRef.current = nextVal;
        setCount(nextVal);
      }

      if (timeRatio < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
        setIsFinished(true);
      }
    };

    const timer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 150);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration]);

  return (
    <span className={`metric-counter ${isFinished ? 'counter-finished' : ''}`}>
      {count}
    </span>
  );
}

interface HeroProps {
  onOpenBudgetModal: () => void;
}

function Hero({ onOpenBudgetModal }: HeroProps) {

  return (
    <section id="hero" className="relative pt-16 pb-6 sm:pt-24 sm:pb-12 lg:min-h-screen lg:pt-36 lg:pb-24 flex flex-col justify-center overflow-hidden">
      
      {/* Background radial highlight & floating shapes */}
      <div className="absolute inset-x-0 top-1/4 -z-10 flex justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-brand-red/10 blur-[80px] glow-red" />
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Copy & Call-To-Action: Abaixo da bio e foto no mobile (order-2 lg:order-1) */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-6 text-left order-2 lg:order-1">
            
            {/* Tag/Badge de Destaque */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="hidden sm:inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
              </span>
            </motion.div>

            {/* Title - Mais compacto no mobile */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="font-display font-extrabold text-[28px] xs:text-[30px] sm:text-5xl lg:text-[58px] tracking-tight text-white leading-[1.1]"
            >
              Transformamos ideias {' '}
              <span className="text-brand-red">
                em soluções
              </span>{' '}
               digitais!
            </motion.h1>

            {/* Subtitle - Mais compacto no mobile */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut', delay: 0.04 }}
              className="text-zinc-200 text-xs sm:text-base lg:text-lg max-w-xl leading-relaxed"
            >
              Crio sites e sistemas web e desenvolvo estratégias de marketing digital para empresas de todo o Brasil
            </motion.p>

            {/* Micro proof figures / Contagem */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, ease: 'easeOut', delay: 0.08 }}
              className="flex items-center justify-between sm:justify-start gap-2.5 sm:gap-8 mt-1.5 sm:mt-4 border-t border-white/5 pt-2.5 sm:pt-4"
            >
              <div>
                <p className="font-display font-bold text-lg sm:text-2xl text-white">
                  <SlowCounter target={45} duration={3400} />%
                </p>
                <p className="text-[9px] sm:text-xs text-zinc-300 sm:text-white leading-tight">Mais produtividade operacional</p>
              </div>
              <div className="w-px h-6 sm:h-8 bg-white/10" />
              <div>
                <p className="font-display font-bold text-lg sm:text-2xl text-white">
                  <SlowCounter target={100} duration={3600} />%
                </p>
                <p className="text-[9px] sm:text-xs text-zinc-300 sm:text-white leading-tight">Entregas no prazo acordado</p>
              </div>
              <div className="w-px h-6 sm:h-8 bg-white/10" />
              <div>
                <p className="font-display font-bold text-lg sm:text-2xl text-white">
                  <SlowCounter target={12} duration={2800} />+
                </p>
                <p className="text-[9px] sm:text-xs text-zinc-300 sm:text-white leading-tight">Tecnologias dominadas</p>
              </div>
            </motion.div>

            {/* Buttons: Abaixo da contagem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-row items-center gap-2 sm:gap-4 mt-2 sm:mt-4"
            >
              <button
                onClick={onOpenBudgetModal}
                className="flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold bg-brand-red text-white hover:bg-brand-red-hover transition-all text-center glow-red hover:scale-[1.02] active:scale-[0.98] duration-200 whitespace-nowrap"
              >
                Solicitar orçamento
              </button>
              <a
                href="#portfolio"
                className="flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex items-center justify-center gap-1 duration-200 whitespace-nowrap"
              >
                Conhecer projetos
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 shrink-0" />
              </a>
            </motion.div>
          </div>

          {/* Gabriel Campos Portrait with Typewriter Presentation: Acima do texto no mobile (order-1 lg:order-2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative w-full flex justify-center order-1 lg:order-2"
          >
            {/* Ambient subtle warm glow behind card */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-red/20 via-amber-500/15 to-transparent rounded-[2.5rem] blur-3xl -z-10 opacity-70" />

            {/* Portrait Frame with Transparent Background & Print 2 Red Shadow - Bio no tamanho original do step anterior */}
            <div className="relative rounded-[2rem] sm:rounded-3xl border border-white/10 shadow-2xl shadow-black/80 overflow-hidden w-full max-w-[420px] sm:max-w-[450px] aspect-[4/4.8] sm:aspect-[4/4.7] bg-black/40 backdrop-blur-md group">
              
              {/* Atmospheric glowing red ambient halo matching Print 2 */}
              <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-[#df2531]/30 blur-3xl pointer-events-none z-0" />
              <div className="absolute top-[10%] -right-[10%] w-60 h-60 rounded-full bg-orange-600/20 blur-3xl pointer-events-none z-0" />

              {/* 2. DUPLICATED IMAGE: Perfectly aligned subtle silhouette shadow directly behind portrait */}
              <div className="absolute inset-0 z-[1] pointer-events-none flex items-end justify-center opacity-25 filter blur-[4px]">
                <img
                  src={gabrielImg}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover object-top filter sepia-[1] saturate-[8] hue-rotate-[320deg] brightness-[0.9] drop-shadow-[0_0_25px_rgba(223,37,49,0.8)]"
                />
              </div>


              {/* FOREGROUND: Gabriel Portrait Image with background removed */}
              <div className="relative z-[2] w-full h-full flex items-end justify-center">
                <img
                  src={gabrielImg}
                  alt="Gabriel Campos - Fundador & Desenvolvedor de Software na KonohaTech"
                  width={420}
                  height={500}
                  decoding="async"
                  className="w-full h-full object-cover object-top filter brightness-[1.03] contrast-[1.04]"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              {/* Subtle bottom vignette to blend shirt and crossed arms smoothly */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-[3] pointer-events-none" />

              {/* Typewriter Presentation Overlay directly in front of the image (restaurado) */}
              <div className="absolute bottom-3.5 sm:bottom-4 inset-x-3.5 sm:inset-x-4 z-20">
                <TypewriterPresentation />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator with micro-animation (visível apenas em desktop) */}
      <div className="hidden lg:flex absolute bottom-6 inset-x-0 justify-center pointer-events-none">
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

export default memo(Hero);
