import React from 'react';

const INDUSTRIES = [
  { id: 'banking', name: 'Banking', tag: 'Finance' },
  { id: 'fmcg', name: 'FMCG', tag: 'Consumer' },
  { id: 'consulting', name: 'Consulting', tag: 'Advisory' },
  { id: 'oilandgas', name: 'Oil & Gas', tag: 'Energy' },
];

const Step6Target = ({ data, update }) => {
  return (
    <div className="step-content">
      <h2 className="mb-16">Target Industry</h2>
      <div className="industry-grid mt-16">
        {INDUSTRIES.map((industryOption) => (
          <button
            key={industryOption.id}
            type="button"
            className={`industry-card ${data.industry === industryOption.id ? 'active' : ''}`}
            onClick={() => update('industry', industryOption.id)}
          >
            <strong>{industryOption.name}</strong>
            <div className="industry-meta">{industryOption.tag}</div>
          </button>
        ))}
      </div>
      <div className="form-group mt-16">
        <label className="form-label">Dream Companies (Optional)</label>
        <input
          className="input-like"
          placeholder="e.g. GTBank, Shell, KPMG"
          value={data.companies}
          onChange={(event) => update('companies', event.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">One-Sentence Career Goal (Optional)</label>
        <input
          className="input-like"
          placeholder="e.g. To become a frontier analyst in the Nigerian banking sector."
          value={data.goal}
          onChange={(event) => update('goal', event.target.value)}
        />
      </div>
    </div>
  );
};

export default Step6Target;
