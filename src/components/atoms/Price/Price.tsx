
import React from 'react';
import { cn } from '../../../lib/utils';

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
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg font-semibold'
  };

  const formatPrice = (price: number) => {
    return `${currency}${price.toFixed(2)}`;
  };

  return (
    <span
      className={cn(
        'text-gray-900 dark:text-gray-100',
        sizeClasses[size],
        strikethrough && 'line-through text-gray-500 dark:text-gray-400',
        className
      )}
    >
      {formatPrice(amount)}
    </span>
  );
};
