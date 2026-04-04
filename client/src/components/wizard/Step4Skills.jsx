import React from 'react';

const SOFT_SKILLS = ['Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Time Management', 'Critical Thinking', 'Adaptability', 'Emotional Intelligence'];

const Step4Skills = ({ data, update }) => {
  const toggleSoft = (skill) => {
    const next = data.soft.includes(skill)
      ? data.soft.filter(s => s !== skill)
      : [...data.soft, skill];
    update('soft', next);
  };

  return (
    <div className="step-content">
      <h2 className="mb-16">Skills & Tools</h2>
      <div className="form-group">
        <label className="form-label">Technical Skills & Software</label>
        <input 
          className="input-like" 
          placeholder="e.g. Excel, Python, Bloomberg Terminal, SQL" 
          value={data.technical} 
          onChange={e => update('technical', e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label className="form-label">Soft Skills</label>
        <div className="chip-grid">
          {SOFT_SKILLS.map((skill, index) => {
            const skillId = `soft-skill-${index}`;
            return (
            <div key={skill}>
              <input 
                id={skillId}
                type="checkbox" 
                className="chip-checkbox" 
                checked={data.soft.includes(skill)}
                onChange={() => toggleSoft(skill)}
              />
              <label htmlFor={skillId} className="chip-label">{skill}</label>
            </div>
          );
          })}
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Languages & Proficiency</label>
        <input 
          className="input-like" 
          placeholder="e.g. English (Fluent), Yoruba (Native)" 
          value={data.languages} 
          onChange={e => update('languages', e.target.value)} 
        />
      </div>
    </div>
  );
};

export default Step4Skills;
