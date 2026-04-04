import React, { Suspense, lazy, useMemo, useState } from 'react';
import CVInput from './components/CVInput';
import WizardShell from './components/wizard/WizardShell';
import FlowSelector from './components/FlowSelector';
import { isSupabaseConfigured, supabase } from './lib/supabase';

const ResultTabs = lazy(() => import('./components/ResultTabs'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const AuthModal = lazy(() => import('./components/AuthModal'));

const CREATE_STEPS = ['Home', 'Build', 'Results'];
const NAV_ITEMS = [
  { id: 'create', label: 'Create', short: 'Create', icon: '+' },
  { id: 'suites', label: 'My Suites', short: 'Suites', icon: '≡' },
  { id: 'templates', label: 'Templates', short: 'Tmplt', icon: '◻' },
  { id: 'settings', label: 'Settings', short: 'Config', icon: '⚙' },
];
const APP_STATE_KEY = 'gt_builder_app_state_v2';
const LOADING_STAGES = [
  'Analyzing input quality...',
  'Generating calibrated CV...',
  'Scoring improvement opportunities...',
  'Preparing final application assets...',
];

const App = () => {
  const readStoredAppState = () => {
    try {
      const raw = window.localStorage.getItem(APP_STATE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_error) {
      return null;
    }
  };

  const storedAppState = readStoredAppState();

  const [workspace, setWorkspace] = useState(storedAppState?.workspace || 'create');
  const [createStage, setCreateStage] = useState(storedAppState?.createStage || 'home');
  const [mode, setMode] = useState(storedAppState?.mode || '');
  const [cvText, setCvText] = useState(storedAppState?.cvText || '');
  const [industry, setIndustry] = useState(storedAppState?.industry || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [lastRequest, setLastRequest] = useState(storedAppState?.lastRequest || null);
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [systemFeedback, setSystemFeedback] = useState(null);
  const [loadingStage, setLoadingStage] = useState(LOADING_STAGES[0]);

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

  React.useEffect(() => {
    const stateForStorage = {
      workspace,
      createStage: createStage === 'results' ? 'builder' : createStage,
      mode,
      cvText,
      industry,
      lastRequest,
    };
    window.localStorage.setItem(APP_STATE_KEY, JSON.stringify(stateForStorage));
  }, [workspace, createStage, mode, cvText, industry, lastRequest]);

  React.useEffect(() => {
    if (!loading) return undefined;
    let index = 0;
    setLoadingStage(LOADING_STAGES[index]);
    const timer = setInterval(() => {
      index = (index + 1) % LOADING_STAGES.length;
      setLoadingStage(LOADING_STAGES[index]);
    }, 1100);
    return () => clearInterval(timer);
  }, [loading]);

  const createStageIndex = useMemo(() => {
    if (createStage === 'home') return 0;
    if (createStage === 'builder') return 1;
    if (createStage === 'results') return 2;
    return 0;
  }, [createStage]);

  const activeNavLabel = NAV_ITEMS.find((item) => item.id === workspace)?.label || 'Create';
  const activeWorkspaceKicker = useMemo(() => {
    if (workspace === 'create') {
      if (createStage === 'home') return 'Workspace Overview';
      if (createStage === 'builder') return 'Application Builder';
      return 'Results Studio';
    }
    if (workspace === 'suites') return 'Career Portfolio';
    if (workspace === 'templates') return 'Template Library';
    return 'System Controls';
  }, [workspace, createStage]);
  const criticalGapCount = Array.isArray(result?.gap_analysis)
    ? result.gap_analysis.filter((item) => item.severity === 'critical').length
    : 0;
  const importantGapCount = Array.isArray(result?.gap_analysis)
    ? result.gap_analysis.filter((item) => item.severity === 'important').length
    : 0;
  const priorityFixCount = criticalGapCount + importantGapCount;

  const progressIntelligence = useMemo(() => {
    if (createStage === 'results') {
      const completion = 100;
      let qualityLabel = 'Strong';
      let qualityTone = 'good';
      let qualityScore = 84;
      if (criticalGapCount >= 2) {
        qualityLabel = 'Needs attention';
        qualityTone = 'attention';
        qualityScore = 62;
      } else if (criticalGapCount === 1 || importantGapCount >= 4) {
        qualityLabel = 'Moderate';
        qualityTone = 'aware';
        qualityScore = 72;
      }
      const insight = priorityFixCount > 0
        ? `${priorityFixCount} high-impact improvement${priorityFixCount > 1 ? 's' : ''} remaining.`
        : 'Ready to finalize and export.';
      return { completion, qualityLabel, qualityTone, qualityScore, insight };
    }

    if (createStage === 'home') {
      return {
        completion: 18,
        qualityLabel: 'Not started',
        qualityTone: 'attention',
        qualityScore: 0,
        insight: 'Select a mode to start role calibration.',
      };
    }

    if (mode === 'paste') {
      const textScore = Math.min(70, Math.floor((cvText.trim().length / 220) * 70));
      const industryScore = industry ? 20 : 0;
      const completion = Math.min(90, 30 + textScore + industryScore);
      const qualityScore = Math.min(88, Math.floor((textScore * 0.85) + industryScore));
      let qualityLabel = 'Needs attention';
      let qualityTone = 'attention';
      if (qualityScore >= 70) {
        qualityLabel = 'Strong';
        qualityTone = 'good';
      } else if (qualityScore >= 45) {
        qualityLabel = 'Moderate';
        qualityTone = 'aware';
      }
      const insight = cvText.trim().length < 120
        ? 'Add quantified outcomes to improve impact strength.'
        : !industry
        ? 'Define one target industry for stronger alignment.'
        : `You are ${completion}% there. Generate to benchmark quality.`;
      return { completion, qualityLabel, qualityTone, qualityScore, insight };
    }

    return {
      completion: 56,
      qualityLabel: 'Building',
      qualityTone: 'aware',
      qualityScore: 54,
      insight: 'Intelligence Brief: quantified outcomes improve shortlist probability.',
    };
  }, [createStage, mode, cvText, industry, criticalGapCount, importantGapCount, priorityFixCount]);

  React.useEffect(() => {
    if (!systemFeedback) return undefined;
    const timeout = setTimeout(() => setSystemFeedback(null), 3200);
    return () => clearTimeout(timeout);
  }, [systemFeedback]);

  const resetCreateFlow = () => {
    setMode('');
    setResult(null);
    setError('');
    setLoading(false);
    setCvText('');
    setIndustry('');
    setLastRequest(null);
    setCreateStage('home');
    setWorkspace('create');
    setSystemFeedback(null);
    window.localStorage.removeItem(APP_STATE_KEY);
    window.localStorage.removeItem('gt_builder_wizard_draft_v1');
  };

  const startBuilder = (selectedMode) => {
    setMode(selectedMode);
    setError('');
    setCreateStage('builder');
    setWorkspace('create');
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
      if (!response.ok) throw new Error(data.error || 'Generation failed. Unable to produce calibrated outputs.');

      const mergedData = { ...data, industry: targetIndustry };
      const mergedPriorityFixCount = Array.isArray(mergedData.gap_analysis)
        ? mergedData.gap_analysis.filter((item) => item.severity === 'critical' || item.severity === 'important').length
        : 0;

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
      setCreateStage('results');
      setWorkspace('create');
      setSystemFeedback({
        tone: 'good',
        message:
          mergedPriorityFixCount > 0
            ? `CV generated successfully. ${mergedPriorityFixCount} high-impact issues identified.`
            : 'CV generated successfully.',
      });
    } catch (err) {
      if (err.message && err.message.toLowerCase().includes('quota')) {
        setError('Rate limit reached. Retry in approximately 60 seconds.');
      } else {
        setError(err.message || 'Generation failed. Check your connection and retry.');
      }
    } finally {
      setLoading(false);
    }
  };

  const retryLastRequest = () => {
    if (!lastRequest || loading) return;
    handleGenerate(lastRequest.inputText, lastRequest.targetIndustry);
  };

  const handleSignOut = async () => {
    if (!isSupabaseConfigured || isSigningOut) return;

    setIsSigningOut(true);
    setError('');

    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      setUser(null);
      resetCreateFlow();
      setSystemFeedback({ tone: 'good', message: 'You have signed out.' });
    } catch (err) {
      setError(err.message || 'Sign-out failed. Retry.');
    } finally {
      setIsSigningOut(false);
    }
  };

  const loadingFallback = (
    <div className="loader card card-panel panel">
      <div className="spinner" />
      <p className="loader-title">Loading interface...</p>
    </div>
  );

  const renderCreateHome = () => (
    <section className="stack-16">
      <header className="hero-stack app-hero fade-in">
        <span className="kicker">Precision Workflow</span>
        <h1 className="hero-title hero-title-compact">Engineer high-performance graduate applications with precision.</h1>
        <p className="hero-copy">
          Choose your input path, generate calibrated assets, and deploy an application suite built for competitive trainee pipelines.
        </p>
      </header>

      <div className="journey-strip card card-panel panel panel-pad fade-in fade-in-delay-1">
        <h2 className="section-title">How the system drives outcomes</h2>
        <div className="journey-points">
          <div className="journey-point">
            <strong>1. Select your input path</strong>
            <p className="muted">Use an existing CV or build from guided intelligence prompts.</p>
          </div>
          <div className="journey-point">
            <strong>2. Generate calibrated assets</strong>
            <p className="muted">The engine produces CV, diagnostics, upskilling pathways, and outreach copy.</p>
          </div>
          <div className="journey-point">
            <strong>3. Deploy and refine</strong>
            <p className="muted">Export immediately and resolve high-impact weaknesses with guided actions.</p>
          </div>
        </div>
      </div>

      <section className="card card-panel panel panel-pad fade-in fade-in-delay-2">
        <div className="section-head">
          <h2>Choose a starting mode</h2>
          <p>One continuous workspace. Switch modes anytime before generation.</p>
        </div>
        <FlowSelector onSelect={startBuilder} />
      </section>
    </section>
  );

  const renderCreateBuilder = () => (
    <section className="builder-pane fade-in">
      <div className="builder-toolbar">
        <div className="mode-switch" role="tablist" aria-label="Builder mode">
          <button
            type="button"
            className={`mode-pill ${mode === 'paste' ? 'active' : ''}`}
            onClick={() => startBuilder('paste')}
            aria-selected={mode === 'paste'}
          >
            Optimize Existing CV
          </button>
          <button
            type="button"
            className={`mode-pill ${mode === 'wizard' ? 'active' : ''}`}
            onClick={() => startBuilder('wizard')}
            aria-selected={mode === 'wizard'}
          >
            Guided Build
          </button>
        </div>
        <button type="button" className="btn btn-ghost" onClick={resetCreateFlow}>
          Reset Workspace
        </button>
      </div>

      {loading ? (
        <div className="loader card card-panel panel">
          <div className="spinner" />
          <p className="loader-title">Generating your calibrated application suite...</p>
          <p className="muted mt-8">Usually completes in under 60 seconds.</p>
        </div>
      ) : mode === 'paste' ? (
        <CVInput
          cvText={cvText}
          setCvText={setCvText}
          industry={industry}
          setIndustry={setIndustry}
          onSubmit={() => handleGenerate(cvText, industry)}
          loading={loading}
          qualityHint={progressIntelligence.insight}
        />
      ) : (
        <WizardShell
          onComplete={(assembledData, selectedIndustry) => handleGenerate(assembledData, selectedIndustry)}
          onCancel={resetCreateFlow}
          qualityHint={progressIntelligence.insight}
        />
      )}
    </section>
  );

  const renderCreateWorkspace = () => {
    if (createStage === 'home') return renderCreateHome();
    if (createStage === 'builder') return renderCreateBuilder();
    return (
      <section className="builder-pane fade-in">
        <Suspense fallback={loadingFallback}>
          <ResultTabs
            data={{ ...result, industry }}
            onReset={resetCreateFlow}
            onRegenerate={() => {
              if (!lastRequest || loading) return;
              handleGenerate(lastRequest.inputText, lastRequest.targetIndustry);
            }}
          />
        </Suspense>
      </section>
    );
  };

  const renderSuitesWorkspace = () => {
    if (!user) {
      return (
        <section className="card card-panel panel panel-pad stack-12 fade-in">
          <h2 className="section-title">Sign in to access your career portfolio</h2>
          <p className="muted">
            Your pre-calibrated suites are synced for rapid reuse and continuous refinement.
          </p>
          <div className="row-between">
            <button type="button" className="btn btn-primary" onClick={() => setIsAuthOpen(true)}>
              Sign In
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => setWorkspace('create')}>
              Return to Create
            </button>
          </div>
        </section>
      );
    }

    return (
      <Suspense fallback={loadingFallback}>
        <Dashboard
          user={user}
          onBack={resetCreateFlow}
          onViewCV={(cvData) => {
            setResult(cvData);
            setIndustry(cvData?.industry || '');
            setCreateStage('results');
            setWorkspace('create');
          }}
        />
      </Suspense>
    );
  };

  const renderTemplatesWorkspace = () => (
    <section className="card card-panel panel panel-pad stack-14 fade-in">
      <header className="section-head">
        <h2>Templates</h2>
        <p>Compare delivery formats and set the structure best aligned to your target pipeline.</p>
      </header>
      <div className="card-grid">
        <article className="card feature-card">
          <span className="feature-index">Ready</span>
          <h3>Modern</h3>
          <p>Balanced, recruitment-friendly structure with contemporary hierarchy.</p>
        </article>
        <article className="card feature-card">
          <span className="feature-index">Ready</span>
          <h3>Classic</h3>
          <p>Traditional single-column format for conservative hiring pipelines.</p>
        </article>
        <article className="card feature-card">
          <span className="feature-index">Ready</span>
          <h3>Executive</h3>
          <p>High-contrast, leadership-forward presentation for senior trajectories.</p>
        </article>
      </div>
    </section>
  );

  const renderSettingsWorkspace = () => (
    <section className="card card-panel panel panel-pad stack-14 fade-in">
      <header className="section-head">
        <h2>Settings</h2>
        <p>Manage account, workflow, and generation defaults.</p>
      </header>
      <div className="settings-grid">
        <article className="card feature-card">
          <h3>Default start mode</h3>
          <p className="muted">Set your preferred starting path for future suite generation.</p>
        </article>
        <article className="card feature-card">
          <h3>Output defaults</h3>
          <p className="muted">Keep preferred industry and template selections persistent across sessions.</p>
        </article>
      </div>
    </section>
  );

  const renderWorkspaceContent = () => {
    if (workspace === 'create') return renderCreateWorkspace();
    if (workspace === 'suites') return renderSuitesWorkspace();
    if (workspace === 'templates') return renderTemplatesWorkspace();
    return renderSettingsWorkspace();
  };

  return (
    <div className="site-shell">
      <div className="workspace-layout">
        <aside className="workspace-sidebar">
          <button type="button" className="workspace-brand" onClick={resetCreateFlow}>
            <span className="brand-mark" aria-hidden="true" />
            <span>GT Builder</span>
          </button>
          <p className="sidebar-tagline">Precision Career Workspace</p>
          <nav className="workspace-nav" aria-label="Primary navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`workspace-nav-item ${workspace === item.id ? 'active' : ''}`}
                onClick={() => setWorkspace(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="workspace-main">
          <header className="workspace-topbar">
            <div className="workspace-title-group">
              <span className="workspace-kicker">{activeWorkspaceKicker}</span>
              <h1 className="workspace-title">{activeNavLabel}</h1>
            </div>
            <div className="workspace-utility">
              {isSupabaseConfigured && user ? (
                <>
                  <span className="user-pill">{user.email}</span>
                  <button type="button" className="btn btn-ghost" onClick={handleSignOut} disabled={isSigningOut}>
                    {isSigningOut ? 'Signing out...' : 'Sign Out'}
                  </button>
                </>
              ) : isSupabaseConfigured ? (
                <button type="button" className="btn btn-ghost" onClick={() => setIsAuthOpen(true)}>
                  Sign In
                </button>
              ) : (
                <span className="user-pill">Account sync unavailable</span>
              )}
            </div>
          </header>

          <main className="workspace-content">
            {workspace === 'create' && createStage !== 'home' ? (
              <div className="progress-intel-wrap">
                <div className="progress-intel">
                  <div className="progress-intel-top">
                    <strong>Completion: {progressIntelligence.completion}%</strong>
                    <span className={`quality-chip ${progressIntelligence.qualityTone}`}>
                      Quality: {progressIntelligence.qualityLabel}
                    </span>
                  </div>
                  <div className="progress-meter" aria-hidden="true">
                    <div className="progress-meter-fill" style={{ width: `${progressIntelligence.completion}%` }} />
                  </div>
                  <p className="progress-intel-copy">{progressIntelligence.insight}</p>
                </div>
                <div className="stage-track" aria-label="Create workflow progress">
                  {CREATE_STEPS.map((label, index) => (
                    <div
                      key={label}
                      className={`stage-pill ${index <= createStageIndex ? 'active' : ''} ${index < createStageIndex ? 'done' : ''}`}
                    >
                      <span className="stage-index">{index + 1}</span>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {error ? (
              <div className="error-banner row-between">
                <span>{error}</span>
                {lastRequest ? (
                  <button type="button" className="btn btn-ghost" onClick={retryLastRequest}>
                    Retry Generation
                  </button>
                ) : null}
              </div>
            ) : null}

            {systemFeedback ? (
              <div className={`success-banner ${systemFeedback.tone === 'attention' ? 'attention' : ''}`}>
                {systemFeedback.message}
              </div>
            ) : null}

            <div className="workspace-pane" key={`${workspace}-${createStage}`}>
              {renderWorkspaceContent()}
            </div>
          </main>
        </div>
      </div>

      <nav className="mobile-dock" aria-label="Mobile navigation">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`mobile-dock-item ${workspace === item.id ? 'active' : ''}`}
            onClick={() => setWorkspace(item.id)}
            aria-current={workspace === item.id ? 'page' : undefined}
          >
            <span className="dock-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.short}</span>
          </button>
        ))}
      </nav>

      {isSupabaseConfigured ? (
        <Suspense fallback={null}>
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </Suspense>
      ) : null}
    </div>
  );
};

export default App;
