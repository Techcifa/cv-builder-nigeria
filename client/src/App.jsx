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
      backgroundColor: 'var(--bg)',
    },
    nav: {
      position: 'sticky',
      top: '0px',
      backgroundColor: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: '100',
    },
    logo: {
      fontSize: '1.25rem',
      fontWeight: '700',
      letterSpacing: '-0.5px',
      color: 'var(--text)',
    },
    badge: {
      backgroundColor: 'var(--surface2)',
      color: 'var(--accent)',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      border: '1px solid var(--accent)',
    },
    main: {
      flex: '1',
      maxWidth: '900px',
      width: '100%',
      margin: '0 auto',
      padding: '40px 20px',
    },
    hero: {
      textAlign: 'center',
      marginBottom: '60px',
      display: result ? 'none' : 'block',
    },
    headline: {
      fontSize: '3.5rem',
      fontWeight: '800',
      lineHeight: '1.1',
      marginBottom: '16px',
      background: 'linear-gradient(to right, var(--text), var(--text-muted))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subheadline: {
      fontSize: '1.25rem',
      color: 'var(--text-muted)',
      marginBottom: '40px',
      maxWidth: '600px',
      margin: '0 auto 40px',
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '20px',
    },
    statItem: {
      backgroundColor: 'var(--surface)',
      padding: '16px',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border)',
    },
    statVal: {
      display: 'block',
      fontSize: '1.5rem',
      fontWeight: '700',
      color: 'var(--green)',
      marginBottom: '4px',
    },
    statLabel: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
      fontWeight: '500',
    },
    errorBanner: {
      backgroundColor: 'var(--red-alpha)',
      border: '1px solid var(--red)',
      color: 'var(--red)',
      padding: '12px 20px',
      borderRadius: 'var(--radius)',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontWeight: '500',
    },
    mainCard: {
      backgroundColor: 'var(--surface)',
      borderRadius: '16px',
      padding: '32px',
      border: '1px solid var(--border)',
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
    },
    loaderContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '80px 0px',
      gap: '20px',
    },
    spinner: {
      width: '48px',
      height: '48px',
      border: '4px solid var(--surface2)',
      borderTopColor: 'var(--accent)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }
  };

  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <div style={styles.logo}>🎯 GT CV Builder</div>
        <div style={styles.badge}>Nigeria Edition</div>
      </nav>

      <main style={styles.main}>
        <section style={styles.hero}>
          <h1 style={styles.headline}>Land Your Nigerian Graduate Trainee Role</h1>
          <p style={styles.subheadline}>Get industry-specific ATS optimisation, gap analysis, and a certification roadmap in seconds.</p>
          
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <span style={styles.statVal}>4 / Target</span>
              <span style={styles.statLabel}>Industries</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statVal}>ATS / Opt</span>
              <span style={styles.statLabel}>Output</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statVal}>CAR / Fmt</span>
              <span style={styles.statLabel}>Bullets</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statVal}>Free / No</span>
              <span style={styles.statLabel}>Sign-Up</span>
            </div>
          </div>
        </section>

        {error && (
          <div style={styles.errorBanner}>
            <span role="img" aria-label="warning">⚠️</span> {error}
          </div>
        )}

        <div style={styles.mainCard}>
          {loading ? (
            <div style={styles.loaderContainer}>
              <div style={styles.spinner} />
              <div style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Analysing your CV and research patterns...</div>
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
      </main>
    </div>
  );
};

export default App;
