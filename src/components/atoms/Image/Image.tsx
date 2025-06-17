
import React, { useState } from 'react';
import { cn } from '../../../lib/utils';
import styles from './Image.module.scss';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  fallback = '/placeholder.svg',
  aspectRatio,
  className,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageSrc(fallback);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn(
      styles.container,
      aspectRatio && styles[`container--${aspectRatio}`]
    )}>
      {isLoading && (
        <div className={styles.loading} />
      )}
      <img
        src={imageSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={cn(
          styles.image,
          isLoading ? styles['image--loading'] : styles['image--loaded'],
          className
        )}
        {...props}
      />
    </div>
  );
};
