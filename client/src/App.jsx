import React, { Suspense, lazy, useState } from 'react';
import CVInput from './components/CVInput';
import WizardShell from './components/wizard/WizardShell';
import FlowSelector from './components/FlowSelector';
import { supabase } from './lib/supabase';

const Landing = lazy(() => import('./pages/Landing'));
const ResultTabs = lazy(() => import('./components/ResultTabs'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AuthModal = lazy(() => import('./components/AuthModal'));

const App = () => {
  const [flow, setFlow] = useState('marketing');
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

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
      if (!response.ok) throw new Error(data.error || 'Failed to generate package.');

      const mergedData = { ...data, industry: targetIndustry };

      if (user) {
        supabase
          .from('cv_results')
          .insert([{ user_id: user.id, data: mergedData }])
          .then(({ error: saveError }) => {
            if (saveError) console.error('Auto-save failed', saveError);
          });
      }

      setResult(mergedData);
      setIndustry(targetIndustry);
      setFlow('results');
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('quota')) {
        setError('API limits reached. Please retry in about 60 seconds.');
      } else {
        setError(err.message || 'Unexpected error. Check connection and try again.');
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

  const loadingFallback = (
    <div className="loader panel">
      <div className="spinner" />
      <p className="loader-title">Loading interface...</p>
    </div>
  );

  if (flow === 'marketing') {
    return (
      <Suspense fallback={loadingFallback}>
        <Landing onStart={() => setFlow('landing')} />
      </Suspense>
    );
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loader panel">
          <div className="spinner" />
          <p className="loader-title">Generating your career package...</p>
          <p className="muted mt-8">
            This usually takes less than a minute.
          </p>
        </div>
      );
    }

    if (flow === 'dashboard') {
      return (
        <Suspense fallback={loadingFallback}>
          <Dashboard
            user={user}
            onBack={() => setFlow('landing')}
            onViewCV={(cvData) => {
              setResult(cvData);
              setIndustry(cvData.industry);
              setFlow('results');
            }}
          />
        </Suspense>
      );
    }

    if (flow === 'landing') {
      return (
        <section>
          <header className="hero-stack hero-stack-compact">
            <span className="kicker">Choose Start Mode</span>
            <h1 className="hero-title hero-title-compact">
              Select how you want to begin.
            </h1>
            <p className="hero-copy">
              Start with your current CV draft or use the guided six-step builder for a complete profile from scratch.
            </p>
          </header>
          <FlowSelector onSelect={setFlow} />
        </section>
      );
    }

    if (flow === 'paste') {
      return (
        <section className="builder-pane">
          <CVInput
            cvText={cvText}
            setCvText={setCvText}
            industry={industry}
            setIndustry={setIndustry}
            onSubmit={() => handleGenerate(cvText, industry)}
            loading={loading}
          />
        </section>
      );
    }

    if (flow === 'wizard') {
      return (
        <section className="builder-pane">
          <WizardShell
            onComplete={(assembledText, selectedIndustry) => handleGenerate(assembledText, selectedIndustry)}
            onCancel={() => setFlow('landing')}
          />
        </section>
      );
    }

    if (flow === 'results') {
      return (
        <section className="builder-pane">
          <Suspense fallback={loadingFallback}>
            <ResultTabs data={{ ...result, industry }} onReset={handleReset} />
          </Suspense>
        </section>
      );
    }

    return null;
  };

  return (
    <div className="site-shell">
      <header className="app-nav">
        <div className="container app-nav-inner">
          <button
            type="button"
            className="brand brand-button"
            onClick={() => setFlow('marketing')}
          >
            <span className="brand-mark" aria-hidden="true" />
            <span>GT Builder</span>
            <span className="badge">Nigeria Edition</span>
          </button>

          <div className="nav-actions">
            {user ? (
              <button type="button" className="btn btn-ghost" onClick={() => setFlow('dashboard')}>
                My Packages
              </button>
            ) : (
              <button type="button" className="btn btn-ghost" onClick={() => setIsAuthOpen(true)}>
                Log In
              </button>
            )}

            {flow !== 'marketing' && flow !== 'landing' && (
              <button type="button" className="btn" onClick={() => setFlow('landing')}>
                {flow === 'results' ? 'Start Over' : 'Back'}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="main-area">
        {error ? <div className="error-banner">{error}</div> : null}
        {renderContent()}
      </main>

      {flow !== 'results' ? (
        <footer className="footer">
          Built for Nigerian graduates. Powered by DeepSeek V3.{' '}
          <a href="https://github.com/Techcifa/cv-builder-nigeria" target="_blank" rel="noopener noreferrer">
            Source code
          </a>
          .
        </footer>
      ) : null}

      <Suspense fallback={null}>
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </Suspense>
    </div>
  );
};

export default App;
