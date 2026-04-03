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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Work Experience</h2>
        <button 
          className="chip-label" 
          style={{ background: hasExperience ? 'transparent' : 'var(--red-alpha)' }} 
          onClick={() => setHasExperience(!hasExperience)}
        >
          {hasExperience ? 'Skip (No Experience)' : 'I have experience'}
        </button>
      </div>

      {hasExperience ? (
        <div>
          {experience.map((exp, i) => (
            <div key={i} style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: '20px' }}>
              <div className="responsive-grid">
                <div className="form-group">
                  <label className="form-label">Role Title</label>
                  <input 
                    className="form-input" 
                    placeholder="e.g. Intern" 
                    value={exp.role} 
                    onChange={e => updateExp(i, 'role', e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Organization</label>
                  <input 
                    className="form-input" 
                    placeholder="e.g. KPMG Nigeria" 
                    value={exp.org} 
                    onChange={e => updateExp(i, 'org', e.target.value)} 
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Key Highlights (1-2 sentences)</label>
                <textarea 
                  className="form-input" 
                  style={{ minHeight: '80px' }} 
                  value={exp.bullets} 
                  onChange={e => updateExp(i, 'bullets', e.target.value)} 
                />
              </div>
            </div>
          ))}
          <button style={{ color: 'var(--accent-light)', fontWeight: '700' }} onClick={addExp}>+ Add Another Experience</button>
        </div>
      ) : (
        <div style={{ background: 'var(--accent-alpha)', padding: '24px', borderRadius: '12px', border: '1px solid var(--accent-glow)' }}>
          <p style={{ color: 'var(--accent-light)', fontWeight: '600' }}>No problem! Our AI specializes in highlighting academic projects and leadership for fresh graduates.</p>
        </div>
      )}
    </div>
  );
};

export default Step3Experience;
