import React, { useState } from 'react';
import CVInput from './components/CVInput';
import ResultTabs from './components/ResultTabs';

const App = () => {
  const [cvText, setCvText] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (cvText.length < 100 || !industry || loading) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/cv/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText, industry }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate CV.');
      }

      setResult(data);
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('quota')) {
        setError('API limits reached. Please try again in 60 seconds.');
      } else {
        setError(err.message || 'An unexpected error occurred. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    app: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'transparent',
    },
    nav: {
      position: 'sticky',
      top: '0px',
      backgroundColor: 'rgba(5, 6, 8, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: '1000',
    },
    logo: {
      fontSize: '1.4rem',
      fontWeight: '800',
      letterSpacing: '-1px',
      background: 'linear-gradient(135deg, #fff 0%, var(--text-muted) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    badge: {
      background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
      color: 'white',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '0.7rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      boxShadow: '0 0 15px var(--accent-glow)',
    },
    main: {
      flex: '1',
      maxWidth: '1000px',
      width: '100%',
      margin: '0 auto',
      padding: 'var(--main-padding)',
    },
    hero: {
      textAlign: 'center',
      marginBottom: 'var(--hero-margin)',
      display: result ? 'none' : 'block',
      animation: 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    heroTag: {
      display: 'inline-block',
      padding: '6px 16px',
      borderRadius: '30px',
      backgroundColor: 'var(--accent-alpha)',
      color: 'var(--accent-light)',
      fontSize: '0.85rem',
      fontWeight: '600',
      marginBottom: '24px',
      border: '1px solid var(--border)',
    },
    headline: {
      fontSize: 'var(--hero-size)',
      fontWeight: '900',
      lineHeight: '1.1',
      marginBottom: '24px',
      letterSpacing: '-2px',
      background: 'linear-gradient(to bottom right, #fff 30%, #64748b 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subheadline: {
      fontSize: '1.25rem',
      color: 'var(--text-muted)',
      marginBottom: '48px',
      maxWidth: '650px',
      margin: '0 auto 48px',
      lineHeight: '1.6',
    },
    stats: {
      display: 'flex',
      justifyContent: 'center',
      gap: '40px',
      flexWrap: 'wrap',
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    statVal: {
      fontSize: '1.8rem',
      fontWeight: '800',
      color: 'var(--text)',
      marginBottom: '4px',
    },
    statLabel: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: '600',
    },
    errorBanner: {
      backgroundColor: 'var(--red-alpha)',
      border: '1px solid var(--red)',
      color: 'var(--red)',
      padding: '16px 24px',
      borderRadius: 'var(--radius)',
      marginBottom: '32px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontWeight: '600',
      animation: 'fadeIn 0.3s ease-out',
    },
    mainCard: {
      backgroundColor: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--main-padding)',
      border: '1px solid var(--border)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      position: 'relative',
      overflow: 'hidden',
    },
    cardDecoration: {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
      zIndex: '0',
      pointerEvents: 'none',
    },
    loaderContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '100px 0',
      gap: '24px',
      position: 'relative',
      zIndex: '1',
    },
    spinner: {
      width: '64px',
      height: '64px',
      border: '3px solid rgba(255,255,255,0.05)',
      borderTopColor: 'var(--accent)',
      borderRadius: '50%',
      animation: 'spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
    }
  };

  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <span style={{ fontSize: '1.8rem' }}>🎯</span>
          <span>GT BUILDER</span>
        </div>
        <div style={styles.badge}>Nigeria Edition</div>
      </nav>

      <main style={styles.main}>
        <section style={styles.hero}>
          <div style={styles.heroTag}>Powered by DeepSeek-V3</div>
          <h1 style={styles.headline}>Rewrite Your Future.</h1>
          <p style={styles.subheadline}>Transform your raw experience into a high-impact, industry-optimized CV tailored for Nigeria's top Graduate Trainee roles.</p>
          
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <span style={styles.statVal}>4</span>
              <span style={styles.statLabel}>Industries</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statVal}>ATS+</span>
              <span style={styles.statLabel}>Optimized</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statVal}>100%</span>
              <span style={styles.statLabel}>Nigerian Focus</span>
            </div>
          </div>
        </section>

        {error && (
          <div style={styles.errorBanner}>
            <span role="img" aria-label="warning" style={{ fontSize: '1.2rem' }}>⚠️</span> {error}
          </div>
        )}

        <div style={styles.mainCard}>
          <div style={styles.cardDecoration} />
          <div style={{ position: 'relative', zIndex: '1' }}>
            {loading ? (
              <div style={styles.loaderContainer}>
                <div style={styles.spinner} />
                <div style={{ color: 'var(--text)', fontSize: '1.1rem', fontWeight: '600' }}>Crafting your professional profile...</div>
                <div style={{ color: 'var(--text-muted)' }}>This takes about 10-15 seconds</div>
              </div>
            ) : result ? (
              <ResultTabs data={{ ...result, industry }} onReset={() => setResult(null)} />
            ) : (
              <CVInput 
                cvText={cvText} 
                setCvText={setCvText}
                industry={industry}
                setIndustry={setIndustry}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </div>
        </div>
      </main>
      
      <footer style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        Built for Nigerian Graduates • Processed securely with DeepSeek AI
      </footer>
    </div>
  );
};

export default App;
