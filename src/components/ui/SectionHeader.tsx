import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  badgeStyle?: 'text' | 'pill';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  badgeStyle = 'text',
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`max-w-3xl ${
        isCenter ? 'mx-auto text-center' : 'text-left'
      } mb-8 sm:mb-16 lg:mb-20 ${className}`}
    >
      {badgeStyle === 'pill' ? (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/30 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
          <span className="font-mono text-xs text-brand-red font-semibold tracking-wider uppercase">
            {eyebrow}
          </span>
        </div>
      ) : (
        <span className="font-mono text-xs text-brand-red font-semibold tracking-[0.05em] uppercase mb-3 block">
          {eyebrow}
        </span>
      )}

      <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.04em] text-white leading-tight mb-6">
        {title}
      </h2>

      {description && (
        <p className="text-white/90 text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
