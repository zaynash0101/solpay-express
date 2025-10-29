'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletModalContextType {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const WalletModalContext = createContext<WalletModalContextType | undefined>(undefined);

export function WalletModalProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  return (
    <WalletModalContext.Provider value={{ visible, setVisible }}>
      {children}
    </WalletModalContext.Provider>
  );
}

export function useCustomWalletModal() {
  const context = useContext(WalletModalContext);
  if (!context) {
    // Return a safe default instead of throwing
    console.warn('useCustomWalletModal: WalletModalProvider not found, using fallback');
    return {
      visible: false,
      setVisible: () => console.warn('WalletModalProvider not available')
    };
  }
  return context;
}
