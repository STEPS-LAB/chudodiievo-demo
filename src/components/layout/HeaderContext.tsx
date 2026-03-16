'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type HeaderVariant = 'light' | 'dark';

interface HeaderContextType {
  variant: HeaderVariant;
  setVariant: (variant: HeaderVariant) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export function HeaderProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<HeaderVariant>('light');

  useEffect(() => {
    // Reset to light on route change (default behavior)
    setVariant('light');
  }, []);

  return (
    <HeaderContext.Provider value={{ variant, setVariant }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
}
