import logoSrc from '../assets/img/8987bd130641623.6184473f5678a.png'

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#09090b] border-t border-white/5 pt-16 pb-8 overflow-hidden">

      {/* Absolute linear dark-red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#df2531]/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 md:grid-cols-12 gap-12 text-left mb-12">

        {/* Brand column */}
        <div className="md:col-span-5 space-y-4">
          <a href="#" className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#df2531]/10 border border-brand-red/30">
              <img className="w-5 h-5 text-brand-red group-hover:scale-110 transition-transform duration-300" src={logoSrc} alt="Logo" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white">
              Konoha<span className="text-brand-red">Tech</span>
            </span>
          </a>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-sm leading-relaxed">
            Desenvolvemos tecnologia de estado da arte para estruturar, otimizar e escalar operações de empresas modernas de ponta. Código puro, entregas blindadas.
          </p>
        </div>

        {/* Directory Links */}
        <div className="md:col-span-3 space-y-4">
          <h5 className="font-semibold text-xs uppercase tracking-wider text-white">Navegação</h5>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-500 font-medium">
            <li><a href="#problema" className="hover:text-brand-red transition-colors">O Problema</a></li>
            <li><a href="#solucao" className="hover:text-brand-red transition-colors">A Solução</a></li>
            <li><a href="#beneficios" className="hover:text-brand-red transition-colors">Benefícios</a></li>
            <li><a href="#servicos" className="hover:text-brand-red transition-colors">Serviços</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="md:col-span-2 space-y-4">
          <h5 className="font-semibold text-xs uppercase tracking-wider text-white">Projetos</h5>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-500 font-medium">
            <li><a href="#portfolio" className="hover:text-brand-red transition-colors">Casos de Sucesso</a></li>
            <li><a href="#processo" className="hover:text-brand-red transition-colors">Processo de Trabalho</a></li>
            <li><a href="#depoimentos" className="hover:text-brand-red transition-colors">Depoimentos</a></li>
            <li><a href="#contato" className="hover:text-brand-red transition-colors">Contato Comercial</a></li>
          </ul>
        </div>

        {/* Legal Column 
        <div className="md:col-span-2 space-y-4">
          <h5 className="font-semibold text-xs uppercase tracking-wider text-white">Legal</h5>
          <ul className="space-y-2 text-xs sm:text-sm text-zinc-500 font-medium">
            <li><a href="#" className="hover:text-brand-red transition-colors">Políticas de Privacidade</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">Termos de Uso de Serviço</a></li>
            <li><a href="#" className="hover:text-brand-red transition-colors">Cookies de Navegação</a></li>
          </ul>
        </div>*/}
      </div>

      {/* Copy License bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-zinc-600 font-mono">
        <div>
          <span>© {currentYear} Konoha Tech. Todos os direitos reservados. CNPJ: 45.109.825/0001-92</span>
        </div>
        <div>
          <span>Recife, PE — Brasil</span>
        </div>
      </div>
    </footer>
  );
}
