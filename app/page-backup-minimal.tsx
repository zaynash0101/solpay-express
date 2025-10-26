'use client';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1a1a3e 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '2rem',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        fontWeight: 'bold',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        SolPay Express
      </h1>
      
      <p style={{ 
        fontSize: '1.5rem',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        Freelancer Invoice & Payment System on Solana
      </p>

      <p style={{
        fontSize: '1rem',
        opacity: 0.8,
        textAlign: 'center'
      }}>
        Lightning-fast payments • Professional invoicing • Solana Actions (Blinks)
      </p>
      
      <a 
        href="/dashboard"
        style={{
          background: 'linear-gradient(135deg, #9945FF 0%, #14F195 100%)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontSize: '1.25rem',
          fontWeight: '600',
          marginTop: '1rem',
          boxShadow: '0 4px 20px rgba(153, 69, 255, 0.4)',
          transition: 'transform 0.2s',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Launch App →
      </a>
    </div>
  )
}
