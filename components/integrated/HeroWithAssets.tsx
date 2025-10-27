'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Shield, 
  DollarSign,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export function HeroWithAssets() {
  const router = useRouter();
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [scrollY, setScrollY] = useState(0);

  // Debug logging
  useEffect(() => {
    console.log('🎯 HeroWithAssets mounted');
    console.log('📁 Checking assets...');
    
    const assets = [
      '/solana-coin.png',
      '/icons/speed.png',
      '/icons/security.png',
      '/icons/low-fee.png'
    ];
    
    assets.forEach(asset => {
      const img = new Image();
      img.onload = () => console.log(`✅ Loaded: ${asset}`);
      img.onerror = () => console.error(`❌ Failed: ${asset}`);
      img.src = asset;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLaunchApp = () => {
    if (connected) {
      router.push('/dashboard');
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0F0F23 0%, #1a1a3e 100%)',
        backgroundImage: `
          linear-gradient(135deg, #0F0F23 0%, #1a1a3e 100%),
          url(/patterns/grid-bg.jpg)
        `,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover, 512px 512px',
        backgroundPosition: 'center, center',
        backgroundAttachment: 'fixed, fixed',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
    >
      
      {/* NAVIGATION BAR */}
      <nav 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(15, 15, 35, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1rem 0'
        }}
      >
        <div 
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              cursor: 'pointer'
            }}
            onClick={() => router.push('/')}
          >
            <img
              src="/logo.png"
              alt="SolPay Express"
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 12px rgba(153, 69, 255, 0.4))'
              }}
            />
            <span 
              style={{ 
                fontSize: '1.5rem', 
                fontWeight: '800',
                background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em'
              }}
            >
              SolPay
            </span>
          </div>
          
          {/* Wallet Button - Complete New Design */}
          <div>
            {!connected ? (
              <button
                onClick={() => setVisible(true)}
                style={{
                  background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(153, 69, 255, 0.3)',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(153, 69, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(153, 69, 255, 0.3)';
                }}
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Connect Wallet
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => router.push('/dashboard')}
                  style={{
                    background: 'rgba(20, 241, 149, 0.1)',
                    border: '1px solid rgba(20, 241, 149, 0.3)',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    color: '#14F195',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(20, 241, 149, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(20, 241, 149, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(20, 241, 149, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(20, 241, 149, 0.3)';
                  }}
                >
                  Dashboard
                </button>
                
                <button
                  onClick={() => disconnect()}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#14F195',
                      boxShadow: '0 0 8px rgba(20, 241, 149, 0.6)'
                    }}
                  />
                  {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section 
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '8rem',
          paddingBottom: '4rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        
        {/* Hero Background Image with Parallax */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(/hero-bg.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.2,
              transform: `translateY(${scrollY * 0.3}px)`
            }}
          />
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(15,15,35,0.6) 50%, #0F0F23 100%)'
            }}
          />
        </div>

        {/* Animated Background Blobs */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: '25%',
              left: '25%',
              width: '384px',
              height: '384px',
              background: 'rgba(153, 69, 255, 0.3)',
              borderRadius: '50%',
              filter: 'blur(80px)'
            }}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              bottom: '25%',
              right: '25%',
              width: '384px',
              height: '384px',
              background: 'rgba(20, 241, 149, 0.3)',
              borderRadius: '50%',
              filter: 'blur(80px)'
            }}
          />
        </div>

        {/* Content */}
        <div style={{ 
          maxWidth: '1200px', 
          width: '100%', 
          margin: '0 auto', 
          padding: '0 2rem', 
          textAlign: 'center', 
          position: 'relative', 
          zIndex: 10,
          minHeight: '500px'
        }}>
          
          {/* Animated 3D Coin - CSS Animation (RESTORED ORIGINAL) */}
          <div
            style={{
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'center',
              perspective: '1000px'
            }}
          >
            <div
              className="rotating-coin"
              style={{
                width: '120px',
                height: '120px',
                position: 'relative'
              }}
            >
              <img
                src="/solana-coin.png"
                alt="Solana Coin"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 40px rgba(153, 69, 255, 0.6))'
                }}
                onError={(e) => {
                  console.error('❌ Failed to load: /solana-coin.png');
                  console.log('Trying alternative path...');
                  e.currentTarget.src = '/public/solana-coin.png';
                }}
              />
            </div>
          </div>

          {/* Main Headline - SIMPLE VERSION */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: 1.2,
              color: 'white'
            }}
          >
            Send Money at the{' '}
            <span 
              style={{
                background: 'linear-gradient(90deg, #9945FF 0%, #00D4FF 50%, #14F195 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block'
              }}
            >
              Speed of Solana
            </span>
          </h1>

          {/* Subheadline - SIMPLE VERSION */}
          <p
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '3rem',
              maxWidth: '800px',
              margin: '0 auto 3rem',
              lineHeight: 1.6
            }}
          >
            Instant USDC payments for Pakistani freelancers and businesses.
            <br />
            No borders. No delays. Just pure speed.
          </p>

          {/* CTA Buttons - SIMPLE VERSION */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '4rem'
            }}
          >
            <button
              onClick={handleLaunchApp}
              style={{
                background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
                padding: '1.25rem 2.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 10px 40px rgba(153, 69, 255, 0.5)',
                transition: 'all 0.3s',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(153, 69, 255, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(153, 69, 255, 0.5)';
              }}
            >
              <Sparkles style={{ width: '20px', height: '20px' }} />
              {connected ? 'Go to Dashboard' : 'Launch App'}
              <ArrowRight style={{ width: '20px', height: '20px' }} />
            </button>
            
            <button
              style={{
                padding: '1.25rem 2.5rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                border: '2px solid #9945FF',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(153, 69, 255, 0.1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Watch Demo
            </button>
          </div>

          {/* Stats Grid - SVG Icons - SIMPLE VERSION */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}
          >
            {[
              { 
                Icon: TrendingUp, 
                label: 'Transactions', 
                value: '127K+', 
                color: '#14F195' 
              },
              { 
                Icon: DollarSign, 
                label: 'Volume', 
                value: '$2.4M', 
                color: '#00D4FF' 
              },
              { 
                Icon: Users, 
                label: 'Users', 
                value: '8.3K', 
                color: '#9945FF' 
              },
              { 
                Icon: Activity, 
                label: 'Avg Speed', 
                value: '1.8s', 
                color: '#14F195' 
              }
            ].map((stat, i) => {
              const IconComponent = stat.Icon;
              return (
                <div
                  key={i}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    padding: '1.5rem',
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(153, 69, 255, 0.3)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <IconComponent 
                    style={{ 
                      width: '2rem', 
                      height: '2rem', 
                      color: stat.color, 
                      marginBottom: '0.5rem',
                      display: 'block',
                      margin: '0 auto 0.5rem'
                    }} 
                  />
                  <div 
                    style={{
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      background: `linear-gradient(135deg, #9945FF 0%, ${stat.color} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* INVOICE MOCKUP SHOWCASE */}
      <section style={{ padding: '6rem 0', position: 'relative', zIndex: 1, background: 'rgba(255, 255, 255, 0.01)' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: 'bold',
                marginBottom: '1rem',
                background: 'linear-gradient(90deg, #c084fc 0%, #f472b6 50%, #4ade80 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              See SolPay Express in Action
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(156, 163, 175, 1)' }}>
              Professional invoice creation with instant Solana payments
            </p>
          </div>

          {/* Image Showcase Container */}
          <div style={{ position: 'relative' }}>
            {/* Glassmorphism container with glow effect */}
            <div 
              style={{
                position: 'relative',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                boxShadow: '0 0 80px rgba(153, 69, 255, 0.4)',
                background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.2) 0%, transparent 50%, rgba(20, 83, 45, 0.2) 100%)',
                backdropFilter: 'blur(8px)',
                padding: '2rem',
                transition: 'all 0.5s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 120px rgba(153, 69, 255, 0.6)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 80px rgba(153, 69, 255, 0.4)';
                e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
              }}
            >
              
              {/* Animated gradient background */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, transparent 50%, rgba(34, 197, 94, 0.1) 100%)',
                  opacity: 0.5,
                  pointerEvents: 'none',
                  transition: 'opacity 0.5s ease'
                }}
              />
              
              {/* The actual mockup image */}
              <div style={{ position: 'relative', zIndex: 10 }}>
                <motion.img
                  src="/leonardo-invoice-mockup.png"
                  alt="SolPay Express Invoice Dashboard - Professional invoice creation with Solana payment integration"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    display: 'block'
                  }}
                  onError={(e) => {
                    console.error('Failed to load invoice mockup');
                  }}
                />
              </div>

              {/* Corner accent decorations */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '8rem',
                  height: '8rem',
                  background: 'rgba(168, 85, 247, 0.2)',
                  filter: 'blur(60px)',
                  borderRadius: '50%',
                  pointerEvents: 'none'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '8rem',
                  height: '8rem',
                  background: 'rgba(34, 197, 94, 0.2)',
                  filter: 'blur(60px)',
                  borderRadius: '50%',
                  pointerEvents: 'none'
                }}
              />
            </div>

            {/* Floating badge/label */}
            <div 
              style={{
                position: 'absolute',
                top: '-1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '0.5rem 1.5rem',
                background: 'linear-gradient(90deg, #9333ea 0%, #ec4899 100%)',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                color: 'white'
              }}
            >
              ✨ Powered by Solana
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Leonardo AI Icons */}
      <section style={{ padding: '6rem 0', position: 'relative', zIndex: 1, background: 'rgba(255, 255, 255, 0.02)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          
          <h2 
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '4rem',
              color: 'white'
            }}
          >
            Why Choose{' '}
            <span 
              style={{
                background: 'linear-gradient(90deg, #9945FF 0%, #14F195 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline-block'
              }}
            >
              SolPay Express
            </span>
          </h2>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}
          >
            {[
              {
                iconImage: '/icons/speed.png',
                title: 'Lightning Fast',
                description: 'Transactions confirm in under 2 seconds. No more waiting days for payments.',
                glowColor: 'rgba(153, 69, 255, 0.6)',
                glowColorHover: 'rgba(153, 69, 255, 0.9)'
              },
              {
                iconImage: '/icons/security.png',
                title: 'Battle-Tested Security',
                description: 'Built on Solana\'s proven blockchain. Your transactions are secure and transparent.',
                glowColor: 'rgba(0, 212, 255, 0.6)',
                glowColorHover: 'rgba(0, 212, 255, 0.9)'
              },
              {
                iconImage: '/icons/low-fee.png',
                title: 'Minimal Fees',
                description: 'Pay less than $0.01 per transaction. Save 5-10% compared to traditional methods.',
                glowColor: 'rgba(20, 241, 149, 0.6)',
                glowColorHover: 'rgba(20, 241, 149, 0.9)'
              }
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(153, 69, 255, 0.3)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {/* Icon - No background container, just the icon with glow */}
                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '2rem'
                  }}
                >
                  <img
                    src={feature.iconImage}
                    alt={feature.title}
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'contain',
                      filter: `drop-shadow(0 0 25px ${feature.glowColor})`,
                      transition: 'all 0.3s ease',
                      opacity: 1
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = `drop-shadow(0 0 40px ${feature.glowColorHover})`;
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = `drop-shadow(0 0 25px ${feature.glowColor})`;
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onLoad={() => {
                      console.log(`✅ Successfully loaded: ${feature.iconImage}`);
                    }}
                    onError={(e) => {
                      console.error(`❌ Failed to load icon: ${feature.iconImage}`);
                      console.log('Image element:', e.currentTarget);
                      console.log('Attempted path:', feature.iconImage);
                      // Don't hide - keep trying
                      e.currentTarget.style.border = '2px solid red';
                    }}
                  />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '6rem 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem' }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(153, 69, 255, 0.3)',
              borderRadius: '1.5rem',
              padding: '3rem',
              textAlign: 'center'
            }}
          >
            <h2 
              style={{
                fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: 'white'
              }}
            >
              Ready to Get Paid{' '}
              <span 
                style={{
                  background: 'linear-gradient(90deg, #9945FF 0%, #14F195 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block'
                }}
              >
                Instantly
              </span>
              ?
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '2rem' }}>
              Join thousands of freelancers saving 5-10% on every payment
            </p>
            <button
              onClick={handleLaunchApp}
              style={{
                background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
                padding: '1.5rem 3rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 20px 60px rgba(153, 69, 255, 0.6)',
                transition: 'all 0.3s',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 25px 70px rgba(153, 69, 255, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(153, 69, 255, 0.6)';
              }}
            >
              <Sparkles style={{ width: '24px', height: '24px' }} />
              Start Now - It&apos;s Free
              <ArrowRight style={{ width: '24px', height: '24px' }} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
