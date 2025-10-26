'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Shield, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '@/components/wallet/WalletButton';

export function HeroWithAssets() {
  const router = useRouter();
  const { connected } = useWallet();

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div 
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
                borderRadius: '8px'
              }}
            />
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>SolPay Express</span>
          </div>
          
          <WalletButton />
        </div>
      </nav>

      {/* HERO SECTION */}
      <section 
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '5rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        
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
        <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 2rem', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
              maxWidth: '800px',
              margin: '0 auto 3rem',
              lineHeight: 1.6
            }}
          >
            Instant USDC payments for Pakistani freelancers and businesses.
            <br />
            No borders. No delays. Just pure speed.
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
          </motion.div>

          {/* Stats Grid */}
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
              { emoji: '📈', label: 'Transactions', value: '127K+', color: '#14F195' },
              { emoji: '💰', label: 'Volume', value: '$2.4M', color: '#00D4FF' },
              { emoji: '👥', label: 'Users', value: '8.3K', color: '#9945FF' },
              { emoji: '⚡', label: 'Avg Speed', value: '1.8s', color: '#14F195' }
            ].map((stat, i) => (
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
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.emoji}</div>
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
            ))}
          </motion.div>

        </div>
      </section>

      {/* FEATURES SECTION */}
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
                icon: <Zap style={{ width: '40px', height: '40px', color: 'white' }} />,
                title: 'Lightning Fast',
                description: 'Transactions confirm in under 2 seconds. No more waiting days for payments.',
                gradient: 'linear-gradient(135deg, #9945FF 0%, #FF6B9D 100%)'
              },
              {
                icon: <Shield style={{ width: '40px', height: '40px', color: 'white' }} />,
                title: 'Battle-Tested Security',
                description: 'Built on Solana\'s proven blockchain. Your transactions are secure and transparent.',
                gradient: 'linear-gradient(135deg, #00D4FF 0%, #0099FF 100%)'
              },
              {
                icon: <DollarSign style={{ width: '40px', height: '40px', color: 'white' }} />,
                title: 'Minimal Fees',
                description: 'Pay less than $0.01 per transaction. Save 5-10% compared to traditional methods.',
                gradient: 'linear-gradient(135deg, #14F195 0%, #00C853 100%)'
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
                    width: '64px',
                    height: '64px',
                    borderRadius: '1rem',
                    background: feature.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    transition: 'transform 0.3s'
                  }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
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
