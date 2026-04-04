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

const CVInput = ({ cvText, setCvText, industry, setIndustry, onSubmit, loading }) => {
  const isDisabled = cvText.trim().length < 100 || !industry || loading;

  const getStatusTone = () => {
    if (cvText.trim().length >= 100) return 'success';
    if (cvText.trim().length > 0) return 'warn';
    return '';
  };

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <section>
        <div className="section-label">Step 1 - Paste CV Content</div>
        <textarea
          className="input-like"
          placeholder="Paste your CV text here. Formatting is optional; content quality matters most."
          value={cvText}
          onChange={(event) => setCvText(event.target.value)}
          disabled={loading}
        />
        <div className={`status-row ${getStatusTone()}`}>
          {cvText.trim().length >= 100
            ? 'Great. You have enough detail for quality output.'
            : `${cvText.trim().length}/100 minimum characters`}
        </div>
      </section>

      <section>
        <div className="section-label">Step 2 - Choose Target Industry</div>
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
        Recruiter tip: outcomes matter more than duties. The generated CV rewrites bullets into clear
        challenge-action-result statements where possible.
      </section>

      <button type="button" className="btn btn-primary" disabled={isDisabled} onClick={onSubmit}>
        {loading ? 'Generating application suite...' : 'Generate Application Suite'}
      </button>
    </div>
  );
};

export default CVInput;
