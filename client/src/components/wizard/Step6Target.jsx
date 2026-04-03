import React from 'react';

const INDUSTRIES = [
  { id: 'banking', name: 'Banking', icon: '🏦' },
  { id: 'fmcg', name: 'FMCG', icon: '🛒' },
  { id: 'consulting', name: 'Consulting', icon: '📊' },
  { id: 'oilandgas', name: 'Oil & Gas', icon: '⛽' },
];

const Step6Target = ({ data, update }) => {
  return (
    <div className="step-content">
      <h2 style={{ marginBottom: '24px' }}>Target Industry</h2>
      <div className="responsive-grid" style={{ marginBottom: '32px' }}>
        {INDUSTRIES.map(ind => (
          <button 
            key={ind.id} 
            className="chip-label" 
            style={{ 
              height: '80px', 
              fontSize: '1.1rem',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px',
              background: data.industry === ind.id ? 'var(--accent-alpha)' : 'rgba(255,255,255,0.03)',
              borderColor: data.industry === ind.id ? 'var(--accent)' : 'var(--border)',
              color: data.industry === ind.id ? 'white' : 'var(--text-muted)'
            }}
            onClick={() => update('industry', ind.id)}
          >
            <span>{ind.icon}</span> {ind.name}
          </button>
        ))}
      </div>
      <div className="form-group">
        <label className="form-label">Dream Companies (Optional)</label>
        <input 
          className="form-input" 
          placeholder="e.g. GTBank, Shell, KPMG" 
          value={data.companies} 
          onChange={e => update('companies', e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label className="form-label">One-Sentence Career Goal (Optional)</label>
        <input 
          className="form-input" 
          placeholder="e.g. To become a frontier analyst in the Nigerian banking sector." 
          value={data.goal} 
          onChange={e => update('goal', e.target.value)} 
        />
      </div>
    </div>
  );
};

export default Step6Target;
