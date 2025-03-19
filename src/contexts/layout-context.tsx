"use client";

import { createContext, useContext, ReactNode, useState } from 'react';

interface LayoutConfig {
  showHeader?: boolean;
  showSidebar?: boolean;
  showFooter?: boolean;
}

interface LayoutContextType {
  config: LayoutConfig;
  setConfig: (config: LayoutConfig) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  config: {
    showHeader: true,
    showSidebar: true,
    showFooter: true,
  },
  setConfig: () => {},
});

export const useLayout = () => useContext(LayoutContext);

interface LayoutProviderProps {
  config?: LayoutConfig;
  children: ReactNode;
}

export function LayoutProvider({ config, children }: LayoutProviderProps) {
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    showHeader: true,
    showSidebar: true,
    showFooter: true,
    ...config
  });

  return (
    <LayoutContext.Provider value={{
      config: layoutConfig,
      setConfig: setLayoutConfig
    }}>
      {children}
    </LayoutContext.Provider>
  );
} 