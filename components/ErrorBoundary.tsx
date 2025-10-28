'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0A0B0F] p-4">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Oops! Something went wrong
              </h2>
              <p className="text-gray-400 mb-2">
                We encountered an unexpected error. This might be due to:
              </p>
              <ul className="text-sm text-gray-500 mb-6 text-left list-disc list-inside">
                <li>Network connectivity issues</li>
                <li>Wallet connection problems</li>
                <li>Browser compatibility</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-[#9945FF] text-white rounded-xl hover:bg-[#8839EE] transition-colors font-semibold"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-[#151619] text-white rounded-xl hover:bg-[#1C1D21] border border-[#27282D] hover:border-[#9945FF] transition-all font-semibold"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
