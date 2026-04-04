import React from 'react';

const PRINCIPLES = [
  {
    title: 'Precision Engineering',
    text: 'Every facet of your CV is scientifically optimized for modern ATS parsers and elite hiring managers.',
  },
  {
    title: 'Data-Backed Narratives',
    text: 'Translate your background into undeniable, quantified impact.',
  },
  {
    title: 'Strategic Insight',
    text: 'Uncover hidden weaknesses before recruiters do, then close them with clear action steps.',
  },
];

const OUTPUTS = [
  {
    title: 'ATS-Optimized Resume',
    detail: 'Achievement-driven bullets calibrated for graduate recruitment.',
  },
  {
    title: 'Diagnostic Gap Analysis',
    detail: 'Identify critical skill deficiencies and precise remediation steps.',
  },
  {
    title: 'Strategic Upskilling Roadmap',
    detail: 'Curated certification pathways mapped to your target industry.',
  },
  {
    title: 'Persuasive Outreach Copy',
    detail: 'Tailored cover letters and LinkedIn narratives designed to capture executive attention.',
  },
];

const Landing = ({ onStart }) => {
  return (
    <div className="site-shell">
      <header className="app-nav">
        <div className="container app-nav-inner">
          <button type="button" className="brand brand-button" onClick={onStart}>
            <span className="brand-mark" aria-hidden="true" />
            <span>GT Builder</span>
            <span className="badge">Nigeria Edition</span>
          </button>
          <button type="button" className="btn btn-primary" onClick={onStart}>
            Begin Precision Build
          </button>
        </div>
      </header>

      <main className="main-area">
        <section className="hero-stack">
          <span className="kicker">The Intelligent Graduate Career Suite</span>
          <h1 className="hero-title">Elevate your graduate trajectory with precision-crafted applications</h1>
          <p className="hero-copy">
            Turn your potential into a high-performance application suite for Nigeria&apos;s most competitive trainee programs.
          </p>
          <div className="hero-cta-row">
            <button type="button" className="btn btn-primary" onClick={onStart}>
              Engineer My Application
            </button>
            <button type="button" className="btn btn-ghost" onClick={onStart}>
              See How It Works
            </button>
          </div>

          <div className="metric-strip">
            <div className="metric">
              <div className="metric-value">5 Assets</div>
              <div className="metric-label">Generated per run</div>
            </div>
            <div className="metric">
              <div className="metric-value">Under 1 min</div>
              <div className="metric-label">Average processing time</div>
            </div>
            <div className="metric">
              <div className="metric-value">2 Start Modes</div>
              <div className="metric-label">Paste CV or guided wizard</div>
            </div>
            <div className="metric">
              <div className="metric-value">0 Setup</div>
              <div className="metric-label">No mandatory signup</div>
            </div>
          </div>
        </section>

        <section className="marketing-section">
          <div className="section-head">
            <h2>Why this gives you a hiring edge</h2>
            <p>
              Built as a precision career engine: every screen is designed to improve screening performance, recruiter clarity, and interview conversion.
            </p>
          </div>
          <div className="card-grid three">
            {PRINCIPLES.map((item, index) => (
              <article className="card feature-card" key={item.title}>
                <span className="feature-index">Principle {index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="marketing-section card card-panel panel panel-pad">
          <div className="section-head">
            <h2>Your Complete Application Arsenal</h2>
            <p>Everything you need to compete in elite trainee pipelines, generated in one run.</p>
          </div>
          <div className="card-grid">
            {OUTPUTS.map((item) => (
              <article className="card feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="marketing-section split">
          <article className="card feature-card">
            <span className="feature-index">Outcome focus</span>
            <h3>Designed for measurable screening performance</h3>
            <p>
              Every generated section is structured to improve recruiter readability, ATS match confidence, and shortlisting momentum.
            </p>
          </article>

          <article className="card feature-card">
            <span className="feature-index">Immediate deployment</span>
            <h3>Launch your precision build in one step</h3>
            <p>
              Choose optimization or guided build, then generate a pre-calibrated suite built for competitive trainee pipelines.
            </p>
            <button type="button" className="btn btn-primary mt-16" onClick={onStart}>
              Begin Precision Build
            </button>
          </article>
        </section>
      </main>

      <footer className="footer">
        Built for ambitious Nigerian graduates. Optimized for competitive trainee outcomes.
      </footer>
    </div>
  );
};

export default Landing;
