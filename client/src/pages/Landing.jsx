import React from 'react';

const PRINCIPLES = [
  {
    title: 'Single-path clarity',
    text: 'Each section answers one question: what this does, how fast it works, and what action to take next.',
  },
  {
    title: 'Proof over hype',
    text: 'Short evidence blocks and concrete outputs reduce hesitation before users share their CV.',
  },
  {
    title: 'Calm technical polish',
    text: 'Dark neutral surfaces, restrained glow, and balanced spacing create focus without visual noise.',
  },
];

const OUTPUTS = [
  {
    title: 'CV Rewrite',
    detail: 'Achievement-led bullets aligned to ATS parsing and graduate hiring language.',
  },
  {
    title: 'Gap Analysis',
    detail: 'Critical, important, and optional gaps with practical improvement actions.',
  },
  {
    title: 'Certification Roadmap',
    detail: 'Provider, cost, and duration recommendations matched to your chosen track.',
  },
  {
    title: 'Cover Letter + LinkedIn',
    detail: 'Application letter and profile copy tuned for Nigerian graduate programs.',
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
            Start Building
          </button>
        </div>
      </header>

      <main className="main-area">
        <section className="hero-stack">
          <span className="kicker">AI Career Suite</span>
          <h1 className="hero-title">Build stronger graduate applications in one focused workflow.</h1>
          <p className="hero-copy">
            GT Builder transforms your existing draft or profile data into a complete job-application package for competitive Nigerian graduate trainee roles.
          </p>
          <div className="hero-cta-row">
            <button type="button" className="btn btn-primary" onClick={onStart}>
              Build My Package
            </button>
            <button type="button" className="btn btn-ghost" onClick={onStart}>
              View Product Flow
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
            <h2>Design approach behind the experience</h2>
            <p>
              The product is built to feel direct, trustworthy, and data-aware. Instead of decorative complexity, it emphasizes clear copy, structured hierarchy, and deliberate calls to action.
            </p>
          </div>
          <div className="card-grid three">
            {PRINCIPLES.map((item, index) => (
              <article className="feature-card" key={item.title}>
                <span className="feature-index">Principle {index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="marketing-section panel panel-pad">
          <div className="section-head">
            <h2>What users receive after each generation</h2>
            <p>Everything is designed to move a graduate from raw profile data to application-ready outputs with minimal back-and-forth.</p>
          </div>
          <div className="card-grid">
            {OUTPUTS.map((item) => (
              <article className="feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="marketing-section split">
          <article className="feature-card">
            <span className="feature-index">Emotional tone</span>
            <h3>Calm confidence with technical credibility</h3>
            <p>
              The interface communicates momentum without pressure. It feels modern and premium while staying transparent about what happens to user input and how outputs are structured.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-index">Primary action</span>
            <h3>Start with your preferred path</h3>
            <p>
              Users can immediately choose between optimizing an existing CV and completing a guided profile flow, reducing friction at the first decision point.
            </p>
            <button type="button" className="btn btn-primary mt-16" onClick={onStart}>
              Enter Builder
            </button>
          </article>
        </section>
      </main>

      <footer className="footer">
        Built for Nigerian Graduates. Structured for real graduate trainee application flows.
      </footer>
    </div>
  );
};

export default Landing;
