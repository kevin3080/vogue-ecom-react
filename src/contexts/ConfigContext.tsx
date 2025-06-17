
import React, { createContext, useContext } from 'react';
import { AppConfig } from '../types';

const ConfigContext = createContext<AppConfig | undefined>(undefined);

export const useConfig = (): AppConfig => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

interface ConfigProviderProps {
  children: React.ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const config: AppConfig = {
    currency: 'USD',
    language: 'en',
    shippingCost: 10,
    taxRate: 0.08
  };

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};
