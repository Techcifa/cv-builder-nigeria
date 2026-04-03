import React from 'react';

const COURSES = ['Financial Accounting', 'Corporate Finance', 'Strategic Management', 'Marketing Essentials', 'Business Ethics', 'Data Analytics', 'Project Management', 'Economics', 'Supply Chain', 'Public Relations'];

const Step2Education = ({ data, update }) => {
  const toggleCourse = (course) => {
    const next = data.courses.includes(course)
      ? data.courses.filter(c => c !== course)
      : [...data.courses, course];
    update('courses', next);
  };

  return (
    <div className="step-content">
      <h2 style={{ marginBottom: '24px' }}>Education Background</h2>
      <div className="form-group">
        <label className="form-label">Degree & Major</label>
        <input 
          className="form-input" 
          placeholder="e.g. B.Sc. Economics" 
          value={data.degree} 
          onChange={e => update('degree', e.target.value)} 
        />
      </div>
      <div className="responsive-grid">
        <div className="form-group">
          <label className="form-label">Institution</label>
          <input 
            className="form-input" 
            placeholder="e.g. University of Lagos" 
            value={data.institution} 
            onChange={e => update('institution', e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Graduation Year</label>
          <input 
            className="form-input" 
            placeholder="e.g. 2024" 
            value={data.year} 
            onChange={e => update('year', e.target.value)} 
          />
        </div>
      </div>
      <div className="responsive-grid">
        <div className="form-group">
          <label className="form-label">Grade / Class</label>
          <input 
            className="form-input" 
            placeholder="e.g. First Class or 2.1" 
            value={data.grade} 
            onChange={e => update('grade', e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Academic Achievements</label>
          <input 
            className="form-input" 
            placeholder="e.g. Deans List, Best Student..." 
            value={data.achievements} 
            onChange={e => update('achievements', e.target.value)} 
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Relevant Coursework</label>
        <div className="chip-grid">
          {COURSES.map(c => (
            <div key={c}>
              <input 
                id={c} 
                type="checkbox" 
                className="chip-checkbox" 
                checked={data.courses.includes(c)} 
                onChange={() => toggleCourse(c)} 
              />
              <label htmlFor={c} className="chip-label">{c}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step2Education;
