import React, { forwardRef, memo } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-brand-red text-white hover:bg-brand-red-hover glow-red border border-transparent shadow-[0_0_20px_rgba(223,37,49,0.3)] hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]',
  outline:
    'border border-brand-red/40 text-white hover:bg-brand-red/10 hover:border-brand-red/70 active:scale-[0.98]',
  ghost:
    'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent active:scale-[0.98]',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm',
  lg: 'px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold',
};

export const Button = memo(
  forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (
      {
        variant = 'primary',
        size = 'md',
        href,
        target,
        rel,
        fullWidth = false,
        icon,
        iconPosition = 'right',
        className,
        children,
        disabled,
        ...props
      },
      ref
    ) => {
      const baseClasses = cn(
        'inline-flex items-center justify-center gap-1.5 font-semibold rounded-full select-none cursor-pointer text-center whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-50',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        className
      );

      const content = (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      );

      if (href) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target={target}
            rel={target === '_blank' && !rel ? 'noopener noreferrer' : rel}
            className={baseClasses}
            role="button"
          >
            {content}
          </a>
        );
      }

      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          disabled={disabled}
          className={baseClasses}
          {...props}
        >
          {content}
        </button>
      );
    }
  )
);

Button.displayName = 'Button';

export default Button;
