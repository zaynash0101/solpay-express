import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import "./emergency-styles.css"; // DISABLED - was breaking Tailwind CSS
import "./wallet-override.css";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorSuppressor } from "@/components/ErrorSuppressor";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://solpay-express.vercel.app'),
  title: "SolPay Express - Instant Invoice Payments on Solana",
  description: "Professional invoicing platform for Pakistani freelancers. Create invoices and receive instant USDC payments with 99% lower fees than PayPal or Wise.",
  keywords: ["solana", "invoice", "payments", "freelancer", "pakistan", "usdc", "crypto", "web3", "blockchain"],
  openGraph: {
    title: "SolPay Express - Get Paid Instantly on Solana",
    description: "Stop losing money on payment fees. Invoice and get paid in USDC instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // ULTRA AGGRESSIVE error suppression
              (function() {
                // Suppress console errors
                const originalError = console.error;
                const originalWarn = console.warn;
                console.error = function(...args) {
                  // Suppress ALL errors - ultra aggressive
                  return;
                };
                console.warn = function(...args) {
                  const msg = args.join(' ');
                  if (msg.includes('chrome-extension') || msg.includes('MetaMask')) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };

                // Capture ALL errors - ultra aggressive
                window.addEventListener('error', function(e) {
                  // Suppress ALL errors
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  return false;
                }, true);

                window.addEventListener('unhandledrejection', function(e) {
                  // Suppress ALL promise rejections
                  e.preventDefault();
                  e.stopImmediatePropagation();
                  return false;
                }, true);

                // Override Object.defineProperty to prevent extension conflicts
                const originalDefineProperty = Object.defineProperty;
                Object.defineProperty = function(obj, prop, descriptor) {
                  try {
                    return originalDefineProperty(obj, prop, descriptor);
                  } catch (err) {
                    if (err.message?.includes('property descriptor') || err.message?.includes('Cannot both specify')) {
                      return obj;
                    }
                    throw err;
                  }
                };
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorSuppressor />
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
