import React, { memo, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'interactive' | 'subtle';
  isSnapItem?: boolean;
  snapBreakpoint?: 'sm' | 'md' | 'lg';
  glowColor?: string;
  borderColor?: string;
}

const variantStyles: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-[#121214]/40 border-white/5 hover:border-brand-red/30',
  glass: 'bg-white/[0.03] backdrop-blur-xl border-white/10 hover:border-brand-red/40 hover:bg-white/[0.05]',
  interactive: 'bg-zinc-950/80 border-white/5 hover:border-brand-red/30 card-dynamic shadow-2xl',
  subtle: 'bg-zinc-900/30 border-white/5 hover:border-white/10',
};

const snapBreakpointMap: Record<NonNullable<CardProps['snapBreakpoint']>, string> = {
  sm: 'sm:w-auto',
  md: 'md:w-auto',
  lg: 'lg:w-auto',
};

export const Card = memo(
  forwardRef<HTMLDivElement, CardProps>(
    (
      {
        variant = 'default',
        isSnapItem = false,
        snapBreakpoint = 'sm',
        glowColor,
        borderColor,
        className,
        children,
        ...props
      },
      ref
    ) => {
      const snapClasses = isSnapItem
        ? cn(
            'w-[82vw] max-w-[310px] shrink-0 snap-start select-none touch-pan-x carousel-card',
            snapBreakpointMap[snapBreakpoint]
          )
        : '';

      return (
        <div
          ref={ref}
          className={cn(
            'group relative rounded-2xl md:rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden',
            variantStyles[variant],
            snapClasses,
            className
          )}
          {...props}
        >
          {/* Optional bottom atmospheric glow on hover */}
          {glowColor && (
            <div
              className={cn(
                'absolute -bottom-[30%] left-0 right-0 h-[70%] blur-[90px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none z-0',
                glowColor
              )}
            />
          )}

          {/* Optional bottom gradient border accent on hover */}
          {borderColor && (
            <div
              className={cn(
                'absolute bottom-0 left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-transparent to-transparent opacity-20 group-hover:opacity-80 transition-opacity duration-700 z-0',
                borderColor
              )}
            />
          )}

          <div className="relative z-10 flex flex-col h-full justify-between">
            {children}
          </div>
        </div>
      );
    }
  )
);

Card.displayName = 'Card';

export const CardHeader = memo<React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }) => {
    return (
      <div className={cn('flex flex-col space-y-2', className)} {...props}>
        {children}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = memo<React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }) => {
    return (
      <h3
        className={cn(
          'font-display font-semibold text-xl text-white tracking-tight leading-snug',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = memo<React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }) => {
    return (
      <p
        className={cn('text-zinc-400 text-sm leading-relaxed', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
CardDescription.displayName = 'CardDescription';

export const CardContent = memo<React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }) => {
    return (
      <div className={cn('p-6 md:p-8 flex-1', className)} {...props}>
        {children}
      </div>
    );
  }
);
CardContent.displayName = 'CardContent';

export const CardFooter = memo<React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }) => {
    return (
      <div
        className={cn(
          'px-6 py-4 md:px-8 md:py-5 border-t border-white/5 flex items-center justify-between',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'CardFooter';

export default Card;
