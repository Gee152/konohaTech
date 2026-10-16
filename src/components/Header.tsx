import { useState, useEffect, memo } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logoSrc from '../assets/img/logo_konoha_tech_recife.png';
import { Button } from './ui/Button';

interface HeaderProps {
  onOpenBudgetModal: () => void;
}

const NAV_LINKS = [
  { name: 'Problema', href: '#problema' },
  { name: 'Solução', href: '#solucao' },
  { name: 'Benefícios', href: '#beneficios' },
  { name: 'Serviços', href: '#servicos' },
  { name: 'Casos', href: '#portfolio' },
  { name: 'Processo', href: '#processo' },
  { name: 'Depoimentos', href: '#depoimentos' },
  { name: 'FAQ', href: '#faq' },
];

function Header({ onOpenBudgetModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <img
                className="w-5 h-5 text-brand-red group-hover:scale-110 transition-transform duration-300"
                src={logoSrc}
                alt="KonohaTech Logo"
                width={20}
                height={20}
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 rounded-xl bg-brand-red/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Konoha<span className="text-brand-red">Tech</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
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
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenBudgetModal}
                icon={<ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
                className="shadow-[0_0_20px_-3px_rgba(223,37,49,0.4)]"
              >
                Solicitar orçamento
              </Button>
            </div>

            {/* Mobile Actions (Mobile) */}
            <div className="flex lg:hidden items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenBudgetModal}
                className="px-3.5 py-1.5 text-xs shadow-[0_0_15px_-3px_rgba(223,37,49,0.4)]"
              >
                Orçamento
              </Button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
                aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay Drawer */}
      {mobileMenuOpen && (
        <div
          className="absolute top-full inset-x-0 z-50 p-4 mx-4 mt-2 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-white/10 shadow-2xl lg:hidden transition-all duration-200"
        >
          <div className="flex flex-col gap-3 py-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <hr className="border-white/5 my-1" />
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBudgetModal();
              }}
              icon={<ArrowUpRight className="w-4 h-4" />}
              className="w-full rounded-xl justify-center shadow-[0_0_20px_-3px_rgba(223,37,49,0.4)]"
            >
              Solicitar orçamento
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default memo(Header);

