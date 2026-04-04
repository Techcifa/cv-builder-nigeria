import React, { useState } from 'react';

const COURSES = ['Financial Accounting', 'Corporate Finance', 'Strategic Management', 'Marketing Essentials', 'Business Ethics', 'Data Analytics', 'Project Management', 'Economics', 'Supply Chain', 'Public Relations'];
const SOFT_SKILLS = ['Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Time Management', 'Critical Thinking', 'Adaptability', 'Emotional Intelligence'];
const INDUSTRIES = [
  { id: 'banking', name: 'Banking', icon: '🏦' },
  { id: 'fmcg', name: 'FMCG', icon: '🛒' },
  { id: 'consulting', name: 'Consulting', icon: '📊' },
  { id: 'oilandgas', name: 'Oil & Gas', icon: '⛽' },
];

const CVWizard = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    personal: { name: '', email: '', phone: '', city: '', linkedin: '' },
    // Step 2
    education: { degree: '', institution: '', year: '', grade: '', courses: [], achievements: '' },
    // Step 3
    hasExperience: true,
    experience: [{ role: '', org: '', dates: '', bullets: '' }],
    // Step 4
    skills: { technical: '', soft: [], languages: '' },
    // Step 5
    projects: { finalProject: '', leadership: '', certs: '' },
    // Step 6
    target: { industry: '', companies: '', goal: '' }
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 6));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const updateNested = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const addExp = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { role: '', org: '', dates: '', bullets: '' }]
    }));
  };

  const updateExp = (index, field, value) => {
    const newExp = [...formData.experience];
    newExp[index][field] = value;
    setFormData(prev => ({ ...prev, experience: newExp }));
  };

  const toggleChip = (category, field, item) => {
    const current = formData[category][field];
    const next = current.includes(item) 
      ? current.filter(i => i !== item)
      : [...current, item];
    updateNested(category, field, next);
  };

  const handleFinish = () => {
    // Assemble the wizard and complete
    const cvString = assembleCV(formData);
    onComplete(cvString, formData.target.industry);
  };

  const assembleCV = (f) => {
    let parts = [];
    parts.push(`NAME: ${f.personal.name}`);
    parts.push(`CONTACT: ${f.personal.email} | ${f.personal.phone} | ${f.personal.city} ${f.personal.linkedin ? '| ' + f.personal.linkedin : ''}`);
    parts.push(`\nEDUCATION:\n${f.education.degree} from ${f.education.institution} (${f.education.year}). Grade: ${f.education.grade}.`);
    if (f.education.courses.length > 0) parts.push(`Relevant Courses: ${f.education.courses.join(', ')}`);
    if (f.education.achievements) parts.push(`Academic Achievements: ${f.education.achievements}`);
    
    if (f.hasExperience && f.experience.length > 0) {
      parts.push(`\nEXPERIENCE:`);
      f.experience.forEach(exp => {
        parts.push(`- ${exp.role} at ${exp.org} (${exp.dates})\n  Highlights: ${exp.bullets}`);
      });
    } else {
      parts.push(`\nEXPERIENCE: No professional experience yet (entry-level/graduate trainee focus).`);
    }

    parts.push(`\nSKILLS:\nTechnical: ${f.skills.technical}\nSoft: ${f.skills.soft.join(', ')}\nLanguages: ${f.skills.languages}`);
    parts.push(`\nPROJECTS & EXTRAS:\nFinal project: ${f.projects.finalProject}\nLeadership/Volunteer: ${f.projects.leadership}\nPrevious Certs: ${f.projects.certs}`);
    parts.push(`\nCAREER GOAL: ${f.target.goal}`);
    if (f.target.companies) parts.push(`TARGET COMPANIES: ${f.target.companies}`);

    return parts.join('\n');
  };

  const renderStep = () => {
    switch(step) {
      case 1: return (
        <div className="step-content">
          <h2 style={{ marginBottom: '24px' }}>Personal Information</h2>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" placeholder="e.g. Chinedu Okafor" value={formData.personal.name} onChange={e => updateNested('personal', 'name', e.target.value)} />
          </div>
          <div className="responsive-grid">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" placeholder="name@email.com" value={formData.personal.email} onChange={e => updateNested('personal', 'email', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" placeholder="+234..." value={formData.personal.phone} onChange={e => updateNested('personal', 'phone', e.target.value)} />
            </div>
          </div>
          <div className="responsive-grid">
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" placeholder="e.g. Lagos" value={formData.personal.city} onChange={e => updateNested('personal', 'city', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">LinkedIn URL (Optional)</label>
              <input className="form-input" placeholder="linkedin.com/in/..." value={formData.personal.linkedin} onChange={e => updateNested('personal', 'linkedin', e.target.value)} />
            </div>
          </div>
        </div>
      );
      case 2: return (
        <div className="step-content">
          <h2 style={{ marginBottom: '24px' }}>Education Background</h2>
          <div className="responsive-grid">
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Degree & Major</label>
              <input className="form-input" placeholder="e.g. B.Sc. Economics" value={formData.education.degree} onChange={e => updateNested('education', 'degree', e.target.value)} />
            </div>
          </div>
          <div className="responsive-grid">
            <div className="form-group">
              <label className="form-label">Institution</label>
              <input className="form-input" placeholder="e.g. University of Lagos" value={formData.education.institution} onChange={e => updateNested('education', 'institution', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Graduation Year</label>
              <input className="form-input" placeholder="e.g. 2024" value={formData.education.year} onChange={e => updateNested('education', 'year', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Relevant Coursework</label>
            <div className="chip-grid">
              {COURSES.map(c => (
                <div key={c}>
                  <input id={c} type="checkbox" className="chip-checkbox" checked={formData.education.courses.includes(c)} onChange={() => toggleChip('education', 'courses', c)} />
                  <label htmlFor={c} className="chip-label">{c}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      case 3: return (
        <div className="step-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2>Work Experience</h2>
            <button type="button" className="chip-label" style={{ background: formData.hasExperience ? 'transparent' : 'rgba(255, 111, 126, 0.14)' }} onClick={() => setFormData(p => ({ ...p, hasExperience: !p.hasExperience }))}>
              {formData.hasExperience ? 'Skip (No Experience)' : 'I have experience'}
            </button>
          </div>
          {formData.hasExperience ? (
            <div>
              {formData.experience.map((exp, i) => (
                <div key={i} style={{ padding: '20px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: '20px' }}>
                  <div className="responsive-grid">
                    <div className="form-group">
                      <label className="form-label">Role Title</label>
                      <input className="form-input" placeholder="e.g. Intern" value={exp.role} onChange={e => updateExp(i, 'role', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Organization</label>
                      <input className="form-input" placeholder="e.g. KPMG Nigeria" value={exp.org} onChange={e => updateExp(i, 'org', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Key Highlights (1-2 sentences)</label>
                    <textarea className="form-input" style={{ minHeight: '80px' }} value={exp.bullets} onChange={e => updateExp(i, 'bullets', e.target.value)} />
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-ghost" onClick={addExp}>+ Add Another Experience</button>
            </div>
          ) : (
            <div className="info-banner">
              No problem! Our AI specializes in highlighting academic projects and leadership for fresh graduates.
            </div>
          )}
        </div>
      );
      case 4: return (
        <div className="step-content">
          <h2 style={{ marginBottom: '24px' }}>Skills & Tools</h2>
          <div className="form-group">
            <label className="form-label">Technical Skills & Software</label>
            <input className="form-input" placeholder="e.g. Excel, Python, Bloomberg Terminal, SQL" value={formData.skills.technical} onChange={e => updateNested('skills', 'technical', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Soft Skills</label>
            <div className="chip-grid">
              {SOFT_SKILLS.map(s => (
                <div key={s}>
                  <input id={s} type="checkbox" className="chip-checkbox" checked={formData.skills.soft.includes(s)} onChange={() => toggleChip('skills', 'soft', s)} />
                  <label htmlFor={s} className="chip-label">{s}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Languages & Proficiency</label>
            <input className="form-input" placeholder="e.g. English (Fluent), Yoruba (Native), French (Basic)" value={formData.skills.languages} onChange={e => updateNested('skills', 'languages', e.target.value)} />
          </div>
        </div>
      );
      case 5: return (
        <div className="step-content">
          <h2 style={{ marginBottom: '24px' }}>Projects & Leadership</h2>
          <div className="form-group">
            <label className="form-label">Final Year Project / Major Research</label>
            <textarea className="form-input" style={{ minHeight: '100px' }} placeholder="Title and brief impact..." value={formData.projects.finalProject} onChange={e => updateNested('projects', 'finalProject', e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Volunteer or Leadership Roles</label>
            <textarea className="form-input" style={{ minHeight: '80px' }} placeholder="e.g. President of Economics Student Association..." value={formData.projects.leadership} onChange={e => updateNested('projects', 'leadership', e.target.value)} />
          </div>
        </div>
      );
      case 6: return (
        <div className="step-content">
          <h2 style={{ marginBottom: '24px' }}>Target Industry</h2>
          <div className="responsive-grid" style={{ marginBottom: '32px' }}>
            {INDUSTRIES.map(ind => (
              <button
                type="button"
                key={ind.id} 
                className="chip-label" 
                style={{ 
                  height: '80px', 
                  fontSize: '1.1rem',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '12px',
                  background: formData.target.industry === ind.id ? 'rgba(52, 215, 255, 0.18)' : 'rgba(255,255,255,0.03)',
                  borderColor: formData.target.industry === ind.id ? 'var(--accent)' : 'var(--border)',
                  color: formData.target.industry === ind.id ? 'white' : 'var(--text-1)'
                }}
                onClick={() => updateNested('target', 'industry', ind.id)}
              >
                <span>{ind.icon}</span> {ind.name}
              </button>
            ))}
          </div>
          <div className="form-group">
            <label className="form-label">One-Sentence Career Goal (Optional)</label>
            <input className="form-input" placeholder="e.g. To become a frontier analyst in the Nigerian banking sector." value={formData.target.goal} onChange={e => updateNested('target', 'goal', e.target.value)} />
          </div>
        </div>
      );
      default: return null;
    }
  };

  const progress = (step / 6) * 100;

  const canGoNext = () => {
    if (step === 1) return formData.personal.name && formData.personal.email;
    if (step === 2) return formData.education.degree && formData.education.institution;
    if (step === 6) return formData.target.industry;
    return true;
  };

  return (
    <div style={{ position: 'relative', zIndex: '10' }}>
      <div className="wizard-progress">
        <div className="wizard-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div style={{ minHeight: '450px' }}>
        {renderStep()}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={step === 1 ? onCancel : prevStep}
        >
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        
        {step < 6 ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={nextStep}
            disabled={!canGoNext()}
          >
            Next Step
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleFinish}
            disabled={!canGoNext()}
          >
            Finalize Resume
          </button>
        )}
      </div>
    </div>
  );
};

export default CVWizard;
