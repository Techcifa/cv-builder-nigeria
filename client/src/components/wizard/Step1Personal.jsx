import React from 'react';

const Step1Personal = ({ data, update }) => {
  return (
    <div className="step-content">
      <h2 style={{ marginBottom: '24px' }}>Personal Information</h2>
      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input 
          className="form-input" 
          placeholder="e.g. Chinedu Okafor" 
          value={data.name} 
          onChange={e => update('name', e.target.value)} 
        />
      </div>
      <div className="responsive-grid">
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            className="form-input" 
            placeholder="name@email.com" 
            value={data.email} 
            onChange={e => update('email', e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input 
            className="form-input" 
            placeholder="+234..." 
            value={data.phone} 
            onChange={e => update('phone', e.target.value)} 
          />
        </div>
      </div>
      <div className="responsive-grid">
        <div className="form-group">
          <label className="form-label">City</label>
          <input 
            className="form-input" 
            placeholder="e.g. Lagos" 
            value={data.city} 
            onChange={e => update('city', e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label className="form-label">LinkedIn URL (Optional)</label>
          <input 
            className="form-input" 
            placeholder="linkedin.com/in/..." 
            value={data.linkedin} 
            onChange={e => update('linkedin', e.target.value)} 
          />
        </div>
      </div>
    </div>
  );
};

export default Step1Personal;
