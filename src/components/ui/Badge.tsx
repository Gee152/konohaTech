import React, { memo } from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'red' | 'glow' | 'success' | 'outline';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

const variantStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-white/5 border-white/10 text-zinc-300',
  red: 'bg-brand-red/10 border-brand-red/30 text-brand-red',
  glow: 'bg-brand-red text-white shadow-[0_0_12px_rgba(223,37,49,0.5)] border-transparent',
  success: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  outline: 'border-white/10 text-zinc-400 bg-transparent',
};

const sizeStyles: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'px-2 py-0.5 text-[10px] tracking-wider',
  md: 'px-3 py-1 text-xs tracking-wide',
};

export const Badge = memo<BadgeProps>(({
  variant = 'default',
  size = 'md',
  pulse = false,
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono font-medium rounded-full border uppercase select-none transition-all duration-200',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-current" />
        </span>
      )}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
