'use client';

import { motion } from 'framer-motion';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: { container: 'h-8', icon: 'w-8 h-8', text: 'text-lg' },
  md: { container: 'h-10', icon: 'w-10 h-10', text: 'text-xl' },
  lg: { container: 'h-12', icon: 'w-12 h-12', text: 'text-2xl' },
  xl: { container: 'h-16', icon: 'w-16 h-16', text: 'text-3xl' }
};

export function Logo({ 
  size = 'md', 
  variant = 'full',
  animated = true,
  className = '' 
}: LogoProps) {
  const sizes = sizeClasses[size];

  // Icon Component
  const LogoIcon = () => (
    <motion.div
      className={`${sizes.icon} relative flex items-center justify-center`}
      animate={animated ? {
        rotate: [0, 360],
      } : {}}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {/* Outer Ring */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'drop-shadow(0 0 8px rgba(153, 69, 255, 0.6))' }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient1)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 5"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9945FF" />
            <stop offset="100%" stopColor="#14F195" />
          </linearGradient>
        </defs>
      </svg>

      {/* Inner Lightning Bolt */}
      <motion.svg
        viewBox="0 0 24 24"
        className="w-1/2 h-1/2 relative z-10"
        fill="none"
        animate={animated ? {
          scale: [1, 1.1, 1],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path
          d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
          fill="url(#gradient2)"
          stroke="url(#gradient2)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14F195" />
            <stop offset="100%" stopColor="#9945FF" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-green-500/20 rounded-full blur-xl" />
    </motion.div>
  );

  // Text Component
  const LogoText = () => (
    <motion.span
      className={`${sizes.text} font-bold bg-gradient-to-r from-[#9945FF] via-[#00D4FF] to-[#14F195] bg-clip-text text-transparent`}
      style={{
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        letterSpacing: '-0.02em'
      }}
      animate={animated ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      SolPay Express
    </motion.span>
  );

  return (
    <div className={`flex items-center gap-3 ${sizes.container} ${className}`}>
      {(variant === 'full' || variant === 'icon') && <LogoIcon />}
      {(variant === 'full' || variant === 'text') && <LogoText />}
    </div>
  );
}

// Compact Logo for small spaces
export function LogoCompact({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-green-500 p-0.5">
        <div className="w-full h-full bg-[#0F0F23] rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path
              d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
              fill="url(#gradientCompact)"
              stroke="url(#gradientCompact)"
              strokeWidth="1.5"
            />
            <defs>
              <linearGradient id="gradientCompact" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#14F195" />
                <stop offset="100%" stopColor="#9945FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <span className="text-lg font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
        SolPay
      </span>
    </div>
  );
}

// Favicon/App Icon version
export function LogoIcon({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background Circle */}
        <circle cx="50" cy="50" r="48" fill="url(#bgGradient)" />
        
        {/* Lightning Bolt */}
        <path
          d="M55 20L30 55h20l-5 25 30-35H50l5-25z"
          fill="white"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9945FF" />
            <stop offset="100%" stopColor="#14F195" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
