import React, { Suspense, lazy, useMemo, useState } from 'react';
import CVInput from './components/CVInput';
import WizardShell from './components/wizard/WizardShell';
import FlowSelector from './components/FlowSelector';
import { isSupabaseConfigured, supabase } from './lib/supabase';

const ResultTabs = lazy(() => import('./components/ResultTabs'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AuthModal = lazy(() => import('./components/AuthModal'));

const JOURNEY = ['Home', 'Build', 'Results'];

const App = () => {
  const [stage, setStage] = useState('home');
  const [mode, setMode] = useState('');
  const [cvText, setCvText] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [lastRequest, setLastRequest] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  React.useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

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

  const stageIndex = useMemo(() => {
    if (stage === 'home') return 0;
    if (stage === 'builder') return 1;
    if (stage === 'results') return 2;
    return 0;
  }, [stage]);

  const startBuilder = (selectedMode) => {
    setMode(selectedMode);
    setError('');
    setStage('builder');
  };

  const handleGenerate = async (inputText, targetIndustry) => {
    const requestPayload = { inputText, targetIndustry };
    setLastRequest(requestPayload);
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/cv/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText: inputText, industry: targetIndustry }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate application suite.');

      const mergedData = { ...data, industry: targetIndustry };

      if (user && isSupabaseConfigured) {
        supabase
          .from('cv_results')
          .insert([{ user_id: user.id, data: mergedData }])
          .then(({ error: saveError }) => {
            if (saveError) console.error('Auto-save failed', saveError);
          });
      }

      setResult(mergedData);
      setIndustry(targetIndustry);
      setStage('results');
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('quota')) {
        setError('API limit reached. Retry in about 60 seconds.');
      } else {
        setError(err.message || 'Unexpected error. Check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMode('');
    setResult(null);
    setError('');
    setLoading(false);
    setStage('home');
  };

  const retryLastRequest = () => {
    if (!lastRequest || loading) return;
    handleGenerate(lastRequest.inputText, lastRequest.targetIndustry);
  };

  const loadingFallback = (
    <div className="loader panel">
      <div className="spinner" />
      <p className="loader-title">Loading interface...</p>
    </div>
  );

  const renderHome = () => (
    <section className="stack-16">
      <header className="hero-stack app-hero fade-in">
        <span className="kicker">One Clear Workflow</span>
        <h1 className="hero-title hero-title-compact">Build a premium application suite without the UI noise.</h1>
        <p className="hero-copy">
          Choose your start mode once, generate once, and leave with a polished CV, gap roadmap, certifications,
          cover letter, and LinkedIn copy.
        </p>
      </header>

      <div className="journey-strip panel panel-pad fade-in fade-in-delay-1">
        <h2 className="section-title">How it works</h2>
        <div className="journey-points">
          <div className="journey-point">
            <strong>1. Choose input mode</strong>
            <p className="muted">Paste a draft CV or use guided questions.</p>
          </div>
          <div className="journey-point">
            <strong>2. Generate suite</strong>
            <p className="muted">AI produces all core application assets in one run.</p>
          </div>
          <div className="journey-point">
            <strong>3. Export and improve</strong>
            <p className="muted">Download PDF, copy text, and close top hiring gaps.</p>
          </div>
        </div>
      </div>

      <section className="panel panel-pad fade-in fade-in-delay-2">
        <div className="section-head">
          <h2>Pick your start mode</h2>
          <p>No repeated pages. No dead ends. You can switch modes anytime before generating.</p>
        </div>
        <FlowSelector onSelect={startBuilder} />
      </section>
    </section>
  );

  const renderBuilder = () => (
    <section className="builder-pane fade-in">
      <div className="builder-toolbar">
        <div className="mode-switch" role="tablist" aria-label="Builder mode">
          <button
            type="button"
            className={`mode-pill ${mode === 'paste' ? 'active' : ''}`}
            onClick={() => startBuilder('paste')}
            aria-selected={mode === 'paste'}
          >
            CV Optimization
          </button>
          <button
            type="button"
            className={`mode-pill ${mode === 'wizard' ? 'active' : ''}`}
            onClick={() => startBuilder('wizard')}
            aria-selected={mode === 'wizard'}
          >
            Guided Builder
          </button>
        </div>
        <button type="button" className="btn btn-ghost" onClick={handleReset}>
          Back to Home
        </button>
      </div>

      {loading ? (
        <div className="loader panel">
          <div className="spinner" />
          <p className="loader-title">Generating your application suite...</p>
          <p className="muted mt-8">Usually under one minute.</p>
        </div>
      ) : mode === 'paste' ? (
        <CVInput
          cvText={cvText}
          setCvText={setCvText}
          industry={industry}
          setIndustry={setIndustry}
          onSubmit={() => handleGenerate(cvText, industry)}
          loading={loading}
        />
      ) : (
        <WizardShell
          onComplete={(assembledData, selectedIndustry) => handleGenerate(assembledData, selectedIndustry)}
          onCancel={handleReset}
        />
      )}
    </section>
  );

  const renderContent = () => {
    if (stage === 'dashboard') {
      return (
        <Suspense fallback={loadingFallback}>
          <Dashboard
            user={user}
            onBack={handleReset}
            onViewCV={(cvData) => {
              setResult(cvData);
              setIndustry(cvData?.industry || '');
              setStage('results');
            }}
          />
        </Suspense>
      );
    }

    if (stage === 'home') return renderHome();
    if (stage === 'builder') return renderBuilder();

    if (stage === 'results') {
      return (
        <section className="builder-pane fade-in">
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
          <button type="button" className="brand brand-button" onClick={handleReset}>
            <span className="brand-mark" aria-hidden="true" />
            <span>GT Builder</span>
            <span className="badge">Nigeria Edition</span>
          </button>

          <div className="nav-actions">
            {isSupabaseConfigured && user ? (
              <button type="button" className="btn btn-ghost" onClick={() => setStage('dashboard')}>
                My Suites
              </button>
            ) : isSupabaseConfigured ? (
              <button type="button" className="btn btn-ghost" onClick={() => setIsAuthOpen(true)}>
                Log In
              </button>
            ) : null}

            {stage !== 'home' ? (
              <button type="button" className="btn" onClick={handleReset}>
                New Suite
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <main className="main-area">
        {stage !== 'dashboard' ? (
          <div className="stage-track" aria-label="Workflow progress">
            {JOURNEY.map((label, index) => (
              <div
                key={label}
                className={`stage-pill ${index <= stageIndex ? 'active' : ''} ${index < stageIndex ? 'done' : ''}`}
              >
                <span className="stage-index">{index + 1}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        ) : null}

        {error ? (
          <div className="error-banner row-between">
            <span>{error}</span>
            {lastRequest ? (
              <button type="button" className="btn btn-ghost" onClick={retryLastRequest}>
                Retry
              </button>
            ) : null}
          </div>
        ) : null}

        {renderContent()}
      </main>

      <footer className="footer">
        Built for Nigerian graduates. Clear workflow. Premium outcomes.
      </footer>

      {isSupabaseConfigured ? (
        <Suspense fallback={null}>
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </Suspense>
      ) : null}
    </div>
  );
};

export default App;
