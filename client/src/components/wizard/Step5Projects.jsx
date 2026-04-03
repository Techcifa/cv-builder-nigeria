import React from 'react';

const Step5Projects = ({ data, update }) => {
  return (
    <div className="step-content">
      <h2 style={{ marginBottom: '24px' }}>Projects & Leadership</h2>
      <div className="form-group">
        <label className="form-label">Final Year Project / Major Research</label>
        <textarea 
          className="form-input" 
          style={{ minHeight: '100px' }} 
          placeholder="Title and brief impact..." 
          value={data.finalProject} 
          onChange={e => update('finalProject', e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label className="form-label">Volunteer or Leadership Roles</label>
        <textarea 
          className="form-input" 
          style={{ minHeight: '80px' }} 
          placeholder="e.g. President of Economics Student Association..." 
          value={data.leadership} 
          onChange={e => update('leadership', e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label className="form-label">Existing Certifications (Optional)</label>
        <input 
          className="form-input" 
          placeholder="e.g. ICAN Skills, HSE Level 1" 
          value={data.certs} 
          onChange={e => update('certs', e.target.value)} 
        />
      </div>
    </div>
  );
};

export default Step5Projects;
