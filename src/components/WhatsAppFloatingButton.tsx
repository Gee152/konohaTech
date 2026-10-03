import React, { memo } from 'react';
import { motion } from 'motion/react';
import WhatsAppIcon from './ui/WhatsAppIcon';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { DATA } from '../data';

interface WhatsAppFloatingButtonProps {
  phone?: string;
  message?: string;
  className?: string;
}

const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = memo(({
  phone = DATA[0]?.socialMedia?.whatsapp || '558187772234',
  message = 'Olá KonohaTech! Gostaria de conversar sobre um projeto de software ou solução digital.',
  className = '',
}) => {
  const whatsappUrl = getWhatsAppUrl(phone, message);

  return (
    <motion.aside
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 ${className}`}
      aria-label="Atendimento via WhatsApp"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Iniciar conversa no WhatsApp com a KonohaTech"
        className="group relative flex items-center justify-center cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] rounded-full"
      >
        {/* Glow de fundo sutil com pulso */}
        <span 
          className="absolute -inset-1 rounded-full bg-emerald-500/30 blur-md group-hover:bg-emerald-500/50 transition-all duration-300 animate-pulse pointer-events-none" 
          aria-hidden="true"
        />

        {/* Tooltip elegante em Desktop com status de atendimento */}
        <div
          role="tooltip"
          className="absolute right-full mr-3.5 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-white/10 text-zinc-100 text-xs font-medium shadow-2xl opacity-0 translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Fale Conosco no WhatsApp</span>
          {/* Seta indicadora para a direita */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-solid border-l-zinc-950/90 border-l-4 border-y-transparent border-y-4 border-r-0" />
        </div>

        {/* Botão circular principal */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-300/30 group-hover:scale-105 active:scale-95 group-hover:shadow-emerald-500/40 transition-all duration-300">
          <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-sm" />

          {/* Badge de status Online */}
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5 sm:h-4 sm:w-4" title="Atendimento Online">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-[#050505]" />
          </span>
        </div>
      </a>
    </motion.aside>
  );
});

WhatsAppFloatingButton.displayName = 'WhatsAppFloatingButton';

export default WhatsAppFloatingButton;
