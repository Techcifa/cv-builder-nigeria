import React from 'react';

const Step3Experience = ({ hasExperience, experience, setHasExperience, setExperience }) => {
  const addExp = () => {
    setExperience([...experience, { role: '', org: '', dates: '', bullets: '' }]);
  };

  const updateExp = (index, field, value) => {
    const newExp = [...experience];
    newExp[index][field] = value;
    setExperience(newExp);
  };

  return (
    <div className="step-content">
      <div className="row-between mb-16">
        <h2>Work Experience</h2>
        <button 
          type="button"
          className="chip-label" 
          style={{ background: hasExperience ? 'transparent' : 'rgba(255, 111, 126, 0.14)' }} 
          onClick={() => setHasExperience(!hasExperience)}
        >
          {hasExperience ? 'Skip (No Experience)' : 'I have experience'}
        </button>
      </div>

      {hasExperience ? (
        <div>
          {experience.map((exp, i) => (
            <div key={i} className="card mb-16">
              <div className="responsive-grid">
                <div className="form-group">
                  <label className="form-label">Role Title</label>
                  <input 
                    className="input-like" 
                    placeholder="e.g. Intern" 
                    value={exp.role} 
                    onChange={e => updateExp(i, 'role', e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Organization</label>
                  <input 
                    className="input-like" 
                    placeholder="e.g. KPMG Nigeria" 
                    value={exp.org} 
                    onChange={e => updateExp(i, 'org', e.target.value)} 
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input
                  className="input-like"
                  placeholder="e.g. Jun 2023 - Aug 2023"
                  value={exp.dates}
                  onChange={e => updateExp(i, 'dates', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Key Highlights (1-2 sentences)</label>
                <textarea 
                  className="input-like" 
                  style={{ minHeight: '80px' }} 
                  value={exp.bullets} 
                  onChange={e => updateExp(i, 'bullets', e.target.value)} 
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-ghost" onClick={addExp}>+ Add Another Experience</button>
        </div>
      ) : (
        <div className="info-banner">
          <p style={{ color: 'var(--accent)', fontWeight: '600' }}>No problem! Our AI specializes in highlighting academic projects and leadership for fresh graduates.</p>
        </div>
      )}
    </div>
  );
};

export default Step3Experience;

