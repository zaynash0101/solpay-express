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
    throw new Error('useCustomWalletModal must be used within WalletModalProvider');
  }
  return context;
}
