import React from 'react';

const Step5Projects = ({ data, update }) => {
  return (
    <div className="step-content">
      <h2 className="mb-16">Projects & Leadership</h2>
      <div className="form-group">
        <label className="form-label">Final Year Project / Major Research</label>
        <textarea 
          className="input-like" 
          style={{ minHeight: '100px' }} 
          placeholder="Title and brief impact..." 
          value={data.finalProject} 
          onChange={e => update('finalProject', e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label className="form-label">Volunteer or Leadership Roles</label>
        <textarea 
          className="input-like" 
          style={{ minHeight: '80px' }} 
          placeholder="e.g. President of Economics Student Association..." 
          value={data.leadership} 
          onChange={e => update('leadership', e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label className="form-label">Existing Certifications (Optional)</label>
        <input 
          className="input-like" 
          placeholder="e.g. ICAN Skills, HSE Level 1" 
          value={data.certs} 
          onChange={e => update('certs', e.target.value)} 
        />
      </div>
    </div>
  );
};

export default Step5Projects;
