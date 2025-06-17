
import React from 'react';
import { cn } from '../../../lib/utils';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
