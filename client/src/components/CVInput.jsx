import React from 'react';

const INDUSTRIES = [
  {
    id: 'banking',
    name: 'Banking',
    companies: 'GTBank, Access, Zenith, Stanbic',
  },
  {
    id: 'fmcg',
    name: 'FMCG',
    companies: 'Unilever, Nestle, P&G, Dangote',
  },
  {
    id: 'consulting',
    name: 'Consulting',
    companies: 'KPMG, Deloitte, PwC, EY',
  },
  {
    id: 'oilandgas',
    name: 'Oil & Gas',
    companies: 'Shell, TotalEnergies, Seplat, Chevron',
  },
];

const CVInput = ({ cvText, setCvText, industry, setIndustry, onSubmit, loading, qualityHint }) => {
  const isDisabled = cvText.trim().length < 100 || !industry || loading;

  const getStatusTone = () => {
    if (cvText.trim().length >= 100) return 'success';
    if (cvText.trim().length > 0) return 'warn';
    return '';
  };

  return (
    <div className="form-stack">
      <section>
        <div className="section-label">Step 1: Paste CV Content</div>
        <textarea
          className="form-input"
          placeholder="Paste your current CV content. Formatting is optional; measurable outcomes are prioritized."
          value={cvText}
          onChange={(event) => setCvText(event.target.value)}
          disabled={loading}
        />
        <div className={`status-row ${getStatusTone()}`}>
          {cvText.trim().length >= 100
            ? 'Input quality is sufficient for generation.'
            : `Input length: ${cvText.trim().length}/100 minimum`}
        </div>
        <div className="insight-line">
          {cvText.trim().length < 120
            ? 'Intelligence Brief: stronger action verbs increase perceived impact.'
            : 'Intelligence Brief: quantified outcomes improve shortlist probability.'}
        </div>
      </section>

      <section>
        <div className="section-label">Step 2: Select Target Industry</div>
        <div className="industry-grid">
          {INDUSTRIES.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`industry-card ${industry === option.id ? 'active' : ''}`}
              onClick={() => !loading && setIndustry(option.id)}
              disabled={loading}
            >
              <strong>{option.name}</strong>
              <div className="industry-meta">{option.companies}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="info-banner">
        Intelligence Brief: outcome-led bullets outperform responsibility lists in screening stages.
      </section>

      {qualityHint ? <div className="insight-line">{qualityHint}</div> : null}

      <button type="button" className="btn btn-primary" disabled={isDisabled} onClick={onSubmit}>
        {loading ? 'Generating CV...' : 'Generate CV'}
      </button>
    </div>
  );
};

export default CVInput;
