import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./emergency-styles.css";
import "./wallet-override.css";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SolPay Express - Lightning Fast Solana Payments",
  description: "Instant USDC and SOL payments for Pakistani freelancers and businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ErrorBoundary>
          <WalletProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  borderRadius: '12px',
                },
                success: {
                  iconTheme: {
                    primary: '#14F195',
                    secondary: '#0F0F23',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#0F0F23',
                  },
                },
              }}
            />
          </WalletProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
