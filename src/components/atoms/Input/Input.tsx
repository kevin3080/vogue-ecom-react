
import React from 'react';
import { cn } from '../../../lib/utils';
import styles from './Input.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={styles.container}>
      {label && (
        <label 
          htmlFor={inputId}
          className={styles.label}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          styles.input,
          error && styles['input--error'],
          className
        )}
        {...props}
      />
      {error && (
        <p className={styles.error}>{error}</p>
      )}
    </div>
  );
};
