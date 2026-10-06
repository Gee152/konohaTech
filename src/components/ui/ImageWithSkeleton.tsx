import React, { useState, ImgHTMLAttributes } from 'react';
import Skeleton from './Skeleton';

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  skeletonClassName?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'auto' | 'sync';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export default function ImageWithSkeleton({
  src,
  alt,
  className = '',
  containerClassName = '',
  skeletonClassName = '',
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!isLoaded && !hasError && (
        <Skeleton
          className={`absolute inset-0 w-full h-full z-10 ${skeletonClassName}`}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-300 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
}
