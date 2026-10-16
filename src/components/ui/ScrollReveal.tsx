import React, { forwardRef, memo } from 'react';
import { cn } from '../../lib/utils';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: 75 | 100 | 150 | 200 | 250 | 300 | 350 | 400 | 500 | number;
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

const directionClasses: Record<NonNullable<ScrollRevealProps['direction']>, string> = {
  up: 'scroll-reveal-up',
  down: 'scroll-reveal-down',
  left: 'scroll-reveal-left',
  right: 'scroll-reveal-right',
  fade: 'scroll-reveal',
};

const standardDelays = new Set([75, 100, 150, 200, 250, 300, 350, 400, 500]);

export const ScrollReveal = memo(
  forwardRef<HTMLDivElement, ScrollRevealProps>(
    (
      {
        direction = 'up',
        delay = 0,
        as: Component = 'div',
        className,
        style,
        children,
        ...props
      },
      ref
    ) => {
      const delayClass = delay && standardDelays.has(delay) ? `delay-${delay}` : '';
      const customStyle =
        delay && !standardDelays.has(delay)
          ? { ...style, transitionDelay: `${delay}ms` }
          : style;

      return (
        <Component
          ref={ref}
          className={cn(
            directionClasses[direction],
            delayClass,
            className
          )}
          style={customStyle}
          {...props}
        >
          {children}
        </Component>
      );
    }
  )
);

ScrollReveal.displayName = 'ScrollReveal';

export default ScrollReveal;
