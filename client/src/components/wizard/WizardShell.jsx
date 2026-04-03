import React, { useState } from 'react';
import Step1Personal from './Step1Personal';
import Step2Education from './Step2Education';
import Step3Experience from './Step3Experience';
import Step4Skills from './Step4Skills';
import Step5Projects from './Step5Projects';
import Step6Target from './Step6Target';

const WizardShell = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personal: { name: '', email: '', phone: '', city: '', linkedin: '' },
    education: { degree: '', institution: '', year: '', grade: '', courses: [], achievements: '' },
    hasExperience: true,
    experience: [{ role: '', org: '', dates: '', bullets: '' }],
    skills: { technical: '', soft: [], languages: '' },
    projects: { finalProject: '', leadership: '', certs: '' },
    target: { industry: '', companies: '', goal: '' }
  });

  const updateSection = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 6));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const assembleCV = (f) => {
    let parts = [];
    parts.push(`NAME: ${f.personal.name}`);
    parts.push(`CONTACT: ${f.personal.email} | ${f.personal.phone} | ${f.personal.city} ${f.personal.linkedin ? '| ' + f.personal.linkedin : ''}`);
    parts.push(`\nEDUCATION:\n${f.education.degree} from ${f.education.institution} (${f.education.year}).`);
    if (f.education.courses.length > 0) parts.push(`Relevant Courses: ${f.education.courses.join(', ')}`);
    
    if (f.hasExperience && f.experience.length > 0) {
      parts.push(`\nEXPERIENCE:`);
      f.experience.forEach(exp => {
        parts.push(`- ${exp.role} at ${exp.org} (${exp.dates})\n  Highlights: ${exp.bullets}`);
      });
    }

    parts.push(`\nSKILLS:\nTechnical: ${f.skills.technical}\nSoft: ${f.skills.soft.join(', ')}\nLanguages: ${f.skills.languages}`);
    parts.push(`\nPROJECTS & EXTRAS:\nFinal project: ${f.projects.finalProject}\nLeadership/Volunteer: ${f.projects.leadership}\nCerts: ${f.projects.certs}`);
    parts.push(`\nCAREER GOAL: ${f.target.goal}`);

    return parts.join('\n');
  };

  const handleFinish = () => {
    onComplete(formData, formData.target.industry);
  };

  const progress = (step / 6) * 100;

  const canGoNext = () => {
    if (step === 1) return formData.personal.name && formData.personal.email;
    if (step === 2) return formData.education.degree && formData.education.institution;
    if (step === 6) return formData.target.industry;
    return true;
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className="wizard-progress">
        <div className="wizard-progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div style={{ minHeight: '400px' }}>
        {step === 1 && <Step1Personal data={formData.personal} update={(f, v) => updateSection('personal', f, v)} />}
        {step === 2 && <Step2Education data={formData.education} update={(f, v) => updateSection('education', f, v)} />}
        {step === 3 && <Step3Experience 
          hasExperience={formData.hasExperience} 
          experience={formData.experience}
          setHasExperience={v => setFormData(p => ({ ...p, hasExperience: v }))}
          setExperience={v => setFormData(p => ({ ...p, experience: v }))}
        />}
        {step === 4 && <Step4Skills data={formData.skills} update={(f, v) => updateSection('skills', f, v)} />}
        {step === 5 && <Step5Projects data={formData.projects} update={(f, v) => updateSection('projects', f, v)} />}
        {step === 6 && <Step6Target data={formData.target} update={(f, v) => updateSection('target', f, v)} />}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
        <button className="chip-label" onClick={step === 1 ? onCancel : prevStep}>
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        <button 
          className="submit-btn" 
          style={{ 
            background: step === 6 ? 'linear-gradient(135deg, var(--accent), var(--accent2))' : 'var(--accent)',
            padding: '12px 32px',
            borderRadius: '8px',
            color: 'white',
            opacity: canGoNext() ? 1 : 0.5,
            cursor: canGoNext() ? 'pointer' : 'not-allowed'
          }}
          onClick={step === 6 ? handleFinish : nextStep}
          disabled={!canGoNext()}
        >
          {step === 6 ? 'GENERATE AI CV⚡' : 'Next Step →'}
        </button>
      </div>
    </div>
  );
};

export default WizardShell;
