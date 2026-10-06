import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'rounded' | 'text';
  shimmer?: boolean;
}

export function Skeleton({
  className,
  variant = 'rounded',
  shimmer = true,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    rectangular: 'rounded-none',
    circular: 'rounded-full',
    rounded: 'rounded-xl',
    text: 'rounded-md h-4 w-full',
  };

  return (
    <div
      className={cn(
        'bg-zinc-800/50 border border-white/5 bg-gradient-to-r from-zinc-800/40 via-zinc-700/30 to-zinc-800/40',
        shimmer && 'animate-shimmer',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

export default Skeleton;
