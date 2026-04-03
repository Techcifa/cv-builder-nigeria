import React, { useState } from 'react';
import Landing from './pages/Landing';
import CVInput from './components/CVInput';
import WizardShell from './components/wizard/WizardShell';
import ResultTabs from './components/ResultTabs';
import FlowSelector from './components/FlowSelector';
import AuthModal from './components/AuthModal';
import Dashboard from './pages/Dashboard';
import { supabase } from './lib/supabase';

const App = () => {
  const [flow, setFlow] = useState('marketing'); // 'marketing', 'landing', 'paste', 'wizard', 'results'
  const [cvText, setCvText] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleGenerate = async (inputText, targetIndustry) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/cv/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText: inputText, industry: targetIndustry }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate CV.');
      }

      const mergedData = { ...data, industry: targetIndustry };

      if (user) {
        supabase.from('cv_results').insert([{ user_id: user.id, data: mergedData }])
          .then(({ error: saveError }) => { if (saveError) console.error("Auto-save failed", saveError) });
      }

      setResult(mergedData);
      setIndustry(targetIndustry);
      setFlow('results');
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

  const handleReset = () => {
    setFlow('landing');
    setResult(null);
    setError('');
  };

  // Marketing page — no chrome wrapper
  if (flow === 'marketing') {
    return <Landing onStart={() => setFlow('landing')} />;
  }

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
      backgroundColor: 'rgba(5, 6, 8, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: '1000',
    },
    logo: {
      fontSize: '1.2rem',
      fontWeight: '800',
      letterSpacing: '-0.5px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
    },
    badge: {
      background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
      color: 'white',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '0.68rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
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
      display: flow === 'results' ? 'none' : 'block',
      animation: 'fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    heroTag: {
      display: 'inline-block',
      padding: '6px 16px',
      borderRadius: '30px',
      backgroundColor: 'var(--accent-alpha)',
      color: 'var(--accent-light)',
      fontSize: '0.8rem',
      fontWeight: '600',
      marginBottom: '20px',
      border: '1px solid var(--accent-glow)',
    },
    headline: {
      fontSize: 'var(--hero-size)',
      fontWeight: '900',
      lineHeight: '1.1',
      marginBottom: '20px',
      letterSpacing: '-2px',
      background: 'linear-gradient(to bottom right, #fff 30%, #64748b 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subheadline: {
      fontSize: '1.1rem',
      color: 'var(--text-muted)',
      maxWidth: '600px',
      margin: '0 auto 36px',
      lineHeight: '1.6',
    },
    mainCard: {
      backgroundColor: 'var(--surface)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--main-padding)',
      border: '1px solid var(--border)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      position: 'relative',
      overflow: 'hidden',
      animation: 'fadeIn 0.5s ease-out',
    },
    cardDecoration: {
      position: 'absolute',
      top: '0', right: '0',
      width: '300px', height: '300px',
      background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
      zIndex: '0', pointerEvents: 'none',
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
      width: '64px', height: '64px',
      border: '3px solid rgba(255,255,255,0.05)',
      borderTopColor: 'var(--accent)',
      borderRadius: '50%',
      animation: 'spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
    },
    errorBanner: {
      backgroundColor: 'var(--red-alpha)',
      border: '1px solid rgba(239,68,68,0.3)',
      borderRadius: 'var(--radius)',
      padding: '16px 20px',
      color: 'var(--red)',
      fontSize: '0.95rem',
      fontWeight: '600',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={styles.loaderContainer}>
          <div style={styles.spinner} />
          <div style={{ color: 'var(--text)', fontSize: '1.1rem', fontWeight: '700' }}>Building your career suite...</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>AI is crafting all 5 assets — this takes ~30 seconds</div>
        </div>
      );
    }

    if (flow === 'dashboard') {
      return (
        <Dashboard 
          user={user} 
          onBack={() => setFlow('landing')} 
          onViewCV={(cvData) => {
            setResult(cvData);
            setIndustry(cvData.industry);
            setFlow('results');
          }}
        />
      );
    }

    if (flow === 'landing') {
      return (
        <>
          <header style={styles.hero}>
            <div style={styles.heroTag}>✨ AI-Powered • Nigeria-Specific • Free</div>
            <h1 style={styles.headline}>Choose How to Start</h1>
            <p style={styles.subheadline}>Have an existing CV or starting fresh? Either way, we'll generate a complete career package for Nigerian GT roles.</p>
          </header>
          <FlowSelector onSelect={setFlow} />
        </>
      );
    }

    if (flow === 'paste') {
      return (
        <div style={styles.mainCard}>
          <div style={styles.cardDecoration} />
          <CVInput
            cvText={cvText}
            setCvText={setCvText}
            industry={industry}
            setIndustry={setIndustry}
            onSubmit={() => handleGenerate(cvText, industry)}
            loading={loading}
          />
        </div>
      );
    }

    if (flow === 'wizard') {
      return (
        <div style={styles.mainCard}>
          <div style={styles.cardDecoration} />
          <WizardShell
            onComplete={(assembledText, ind) => handleGenerate(assembledText, ind)}
            onCancel={() => setFlow('landing')}
          />
        </div>
      );
    }

    if (flow === 'results') {
      return (
        <ResultTabs
          data={{ ...result, industry }}
          onReset={handleReset}
        />
      );
    }

    return null;
  };

  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => setFlow('marketing')}>
          <span style={{ fontSize: '1.6rem' }}>🎯</span>
          <span style={{ background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>GT BUILDER</span>
          <span style={styles.badge}>Nigeria Edition</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {user ? (
            <button
              onClick={() => { setFlow('dashboard'); setResult(null); }}
              style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border)' }}
            >
              My CVs
            </button>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border)' }}
            >
              Log In
            </button>
          )}
          {flow !== 'marketing' && flow !== 'landing' && (
            <button
              onClick={() => setFlow('landing')}
              style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border)' }}
            >
              {flow === 'results' ? '↺ Start Over' : '← Back'}
            </button>
          )}
        </div>
      </nav>

      <main style={styles.main}>
        {error && (
          <div style={styles.errorBanner}>
            <span role="img" aria-label="warning" style={{ fontSize: '1.2rem' }}>⚠️</span> {error}
          </div>
        )}
        {renderContent()}
      </main>

      {flow !== 'results' && (
        <footer style={{ padding: '32px 24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', borderTop: '1px solid var(--border)' }}>
          Built for Nigerian Graduates • Powered by DeepSeek V3 •{' '}
          <a href="https://github.com/Techcifa/cv-builder-nigeria" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-light)', textDecoration: 'none' }}>
            GitHub →
          </a>
        </footer>
      )}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
};

export default App;
