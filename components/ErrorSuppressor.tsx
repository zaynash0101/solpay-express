'use client';

import { useEffect } from 'react';

export function ErrorSuppressor() {
  useEffect(() => {
    // Suppress Chrome extension errors and wallet errors
    const errorHandler = (event: ErrorEvent) => {
      if (
        event.message?.includes('property descriptor') ||
        event.message?.includes('chrome-extension') ||
        event.message?.includes('MetaMask') ||
        event.message?.includes('Failed to connect') ||
        event.filename?.includes('chrome-extension')
      ) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      if (
        event.reason?.message?.includes('property descriptor') ||
        event.reason?.message?.includes('chrome-extension') ||
        event.reason?.message?.includes('MetaMask') ||
        event.reason?.message?.includes('Failed to connect')
      ) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', rejectionHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', rejectionHandler);
    };
  }, []);

  return null;
}
