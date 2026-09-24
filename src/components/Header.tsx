import { useState, useEffect } from 'react';
import {
  AlertCircle,
  Lightbulb,
  ShieldCheck,
  Cpu,
  Briefcase,
  Workflow,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { CircularCommandMenu, CommandItem } from '@/components/ui/circular-command-menu';
import logoSrc from '../assets/img/8987bd130641623.6184473f5678a.png';

interface HeaderProps {
  onOpenBudgetModal: () => void;
}

export default function Header({ onOpenBudgetModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Problema', href: '#problema' },
    { name: 'Solução', href: '#solucao' },
    { name: 'Benefícios', href: '#beneficios' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Casos', href: '#portfolio' },
    { name: 'Processo', href: '#processo' },
    { name: 'Depoimentos', href: '#depoimentos' },
  ];

  // Itens do Circular Command Menu respeitando a identidade visual e os nomes como tooltips
  const commandMenuItems: CommandItem[] = [
    {
      id: 'problema',
      label: 'Problema',
      icon: <AlertCircle className="w-5 h-5 text-red-400" />,
      shortcut: '1',
      onClick: () => scrollToSection('#problema'),
    },
    {
      id: 'solucao',
      label: 'Solução',
      icon: <Lightbulb className="w-5 h-5 text-amber-400" />,
      shortcut: '2',
      onClick: () => scrollToSection('#solucao'),
    },
    {
      id: 'beneficios',
      label: 'Benefícios',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      shortcut: '3',
      onClick: () => scrollToSection('#beneficios'),
    },
    {
      id: 'servicos',
      label: 'Serviços',
      icon: <Cpu className="w-5 h-5 text-cyan-400" />,
      shortcut: '4',
      onClick: () => scrollToSection('#servicos'),
    },
    {
      id: 'portfolio',
      label: 'Casos Reais',
      icon: <Briefcase className="w-5 h-5 text-purple-400" />,
      shortcut: '5',
      onClick: () => scrollToSection('#portfolio'),
    },
    {
      id: 'processo',
      label: 'Metodologia',
      icon: <Workflow className="w-5 h-5 text-orange-400" />,
      shortcut: '6',
      onClick: () => scrollToSection('#processo'),
    },
    {
      id: 'depoimentos',
      label: 'Depoimentos',
      icon: <MessageSquare className="w-5 h-5 text-blue-400" />,
      shortcut: '7',
      onClick: () => scrollToSection('#depoimentos'),
    },
    {
      id: 'orcamento',
      label: 'Solicitar Orçamento',
      icon: <Sparkles className="w-5 h-5 text-[#df2531]" />,
      shortcut: '8',
      onClick: onOpenBudgetModal,
    },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-dark-bg/85 backdrop-blur-md border-b border-white/5 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-brand-red/10 border border-brand-red/30 group-hover:border-brand-red/60 transition-all duration-300">
              <img className="w-5 h-5 text-brand-red group-hover:scale-110 transition-transform duration-300" src={logoSrc} alt="Logo" />
              <div className="absolute inset-0 rounded-xl bg-brand-red/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Konoha<span className="text-brand-red">Tech</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions & Menu Buttons */}
          <div className="flex items-center gap-3">
            {/* CTA Button (Desktop) */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={onOpenBudgetModal}
                className="relative px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-brand-red hover:bg-brand-red-hover transition-all duration-200 shadow-[0_0_20px_-3px_rgba(223,37,49,0.4)] group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-1">
                  Solicitar orçamento
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-red-500 to-brand-red transition-transform duration-300 -z-10" />
              </button>
            </div>

            {/* Circular Command Menu integrado: acessível em Desktop e Mobile */}
            <CircularCommandMenu
              items={commandMenuItems}
              centerOnOpen={true}
              radius={130}
              triggerClassName="h-10 w-10 sm:h-11 sm:w-11"
              aria-label="Abrir menu de comando circular"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
