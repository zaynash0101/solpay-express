'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  DollarSign,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCustomWalletModal } from '@/hooks/useCustomWalletModal';

export function HeroWithAssets() {
  const router = useRouter();
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useCustomWalletModal();
  const [scrollY, setScrollY] = useState(0);

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
                color: 'white',
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
                className="glass-button"
                style={{
                  background: 'rgba(255, 255, 255, 0.05) !important',
                  backdropFilter: 'blur(10px) !important',
                  border: '1px solid rgba(255, 255, 255, 0.1) !important',
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
                  className="glass-button"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05) !important',
                    backdropFilter: 'blur(10px) !important',
                    border: '1px solid rgba(255, 255, 255, 0.1) !important',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    boxShadow: '0 4px 12px rgba(153, 69, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(153, 69, 255, 0.4)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(153, 69, 255, 0.2)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Dashboard
                </button>
                
                <button
                  onClick={() => disconnect()}
                  className="glass-button"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05) !important',
                    backdropFilter: 'blur(10px) !important',
                    border: '1px solid rgba(255, 255, 255, 0.1) !important',
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
                    fontFamily: 'inherit',
                    boxShadow: '0 4px 12px rgba(153, 69, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(153, 69, 255, 0.4)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(153, 69, 255, 0.2)';
                    e.currentTarget.style.transform = 'scale(1)';
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
          
          {/* Animated 3D Coin */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <motion.div
              animate={{
                rotateY: [0, 360],
                y: [0, -20, 0]
              }}
              transition={{
                rotateY: { duration: 4, repeat: Infinity, ease: 'linear' },
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }}
              style={{
                width: '120px',
                height: '120px',
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: 'url(/solana-coin.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  filter: 'drop-shadow(0 0 40px rgba(153, 69, 255, 0.6))'
                }}
              />
            </motion.div>
          </motion.div>


          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 bg-clip-text text-transparent"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: 1.2
            }}
          >
            Get Paid Instantly.<br />Keep More Money.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '3rem',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              lineHeight: 1.6
            }}
          >
            Professional invoicing with instant Solana payments.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
              onClick={() => router.push('/demo')}
              className="glass-button"
              style={{
                background: 'rgba(255, 255, 255, 0.05) !important',
                backdropFilter: 'blur(10px) !important',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.1) !important',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 10px 40px rgba(153, 69, 255, 0.2)',
                transition: 'all 0.3s',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(153, 69, 255, 0.4)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(153, 69, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Try Live Demo →
            </button>
            
            <a
              href="https://github.com/zaynash0101/solpay-express"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button"
              style={{
                background: 'rgba(255, 255, 255, 0.05) !important',
                backdropFilter: 'blur(10px) !important',
                padding: '1rem 2rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.1) !important',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 10px 40px rgba(153, 69, 255, 0.2)',
                transition: 'all 0.3s',
                transform: 'scale(1)',
                fontFamily: 'inherit',
                textDecoration: 'none',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(153, 69, 255, 0.4)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(153, 69, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              View on GitHub
            </a>
          </motion.div>

          {/* Stats Grid - SVG Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
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
                value: '< $0.01', 
                label: 'Per Transaction', 
                description: '99% cheaper than PayPal or Wise'
              },
              { 
                value: '< 2 sec', 
                label: 'Payment Speed', 
                description: '1000x faster than bank transfers'
              },
              { 
                value: '0%', 
                label: 'International Fees', 
                description: 'No borders, no conversion fees'
              }
            ].map((stat, i) => {
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
                  <div 
                    style={{
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      color: '#FFFFFF',
                      marginBottom: '0.5rem',
                      textAlign: 'center'
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ 
                    color: '#FFFFFF', 
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    textAlign: 'center'
                  }}>
                    {stat.label}
                  </div>
                  <div style={{ 
                    color: 'rgba(255, 255, 255, 0.6)', 
                    fontSize: '0.875rem',
                    textAlign: 'center'
                  }}>
                    {stat.description}
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* FEATURES SECTION - Leonardo AI Icons */}
      <section style={{ padding: '6rem 0', position: 'relative', zIndex: 1, background: 'rgba(255, 255, 255, 0.02)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          
          <h2 
            className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 bg-clip-text text-transparent"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '1rem'
            }}
          >
            Complete Business Tool, Not Just Payments
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            maxWidth: '800px',
            margin: '0 auto 4rem',
            lineHeight: 1.6
          }}>
            Invoice creation • Client management • Payment tracking • PDF export • Payment links
          </p>

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
                description: 'Payments confirm in under 2 seconds.',
                glowColor: 'rgba(153, 69, 255, 0.6)',
                glowColorHover: 'rgba(153, 69, 255, 0.9)'
              },
              {
                iconImage: '/icons/security.png',
                title: 'Secure & Transparent',
                description: 'Built on Solana blockchain.',
                glowColor: 'rgba(0, 212, 255, 0.6)',
                glowColorHover: 'rgba(0, 212, 255, 0.9)'
              },
              {
                iconImage: '/icons/low-fee.png',
                title: 'Minimal Fees',
                description: 'Less than $0.01 per transaction.',
                glowColor: 'rgba(20, 241, 149, 0.6)',
                glowColorHover: 'rgba(20, 241, 149, 0.9)'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  textAlign: 'center'
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
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
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
                <h3 
                  className="bg-gradient-to-r from-purple-300 to-purple-600 bg-clip-text text-transparent"
                  style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6, textAlign: 'center' }}>
                  {feature.description}
                </p>
              </motion.div>
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
              className="bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600 bg-clip-text text-transparent"
              style={{
                fontSize: 'clamp(1.875rem, 4vw, 3rem)',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}
            >
              Ready to Get Paid Instantly?
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '2rem' }}>
              Join thousands of freelancers saving 5-10% on every payment
            </p>
            <button
              onClick={handleLaunchApp}
              className="glass-button"
              style={{
                background: 'rgba(255, 255, 255, 0.02) !important',
                backdropFilter: 'blur(10px) !important',
                padding: '1.5rem 3rem',
                fontSize: '1.125rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.15) !important',
                color: 'white',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 20px 60px rgba(153, 69, 255, 0.2)',
                transition: 'all 0.3s',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = '0 25px 70px rgba(153, 69, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(153, 69, 255, 0.2)';
              }}
            >
              Start Now - It&apos;s Free
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
