
import React from 'react';
import { cn } from '../../../lib/utils';
import styles from './Price.module.scss';

export interface PriceProps {
  amount: number;
  currency?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  strikethrough?: boolean;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  currency = '$',
  className,
  size = 'md',
  strikethrough = false
}) => {
  const formatPrice = (price: number) => {
    return `${currency}${price.toFixed(2)}`;
  };

  return (
    <span
      className={cn(
        styles.price,
        styles[`price--${size}`],
        strikethrough && styles['price--strikethrough'],
        className
      )}
    >
      {formatPrice(amount)}
    </span>
  );
};
