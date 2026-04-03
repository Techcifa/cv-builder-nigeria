import React, { useState } from 'react';
import Step1Personal from './Step1Personal';
import Step2Education from './Step2Education';
import Step3Experience from './Step3Experience';
import Step4Skills from './Step4Skills';
import Step5Projects from './Step5Projects';
import Step6Target from './Step6Target';

const STEP_META = [
  { label: 'Personal Info' },
  { label: 'Education' },
  { label: 'Experience' },
  { label: 'Skills' },
  { label: 'Projects & Leadership' },
  { label: 'Target Role' },
];

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

  const handleFinish = () => {
    onComplete(formData, formData.target.industry);
  };

  const progress = (step / 6) * 100;

  const canGoNext = () => {
    if (step === 1) return formData.personal.name && formData.personal.email;
    if (step === 2) return formData.education.degree && formData.education.institution;
    if (step === 6) return !!formData.target.industry;
    return true;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canGoNext() && step < 6) {
      e.preventDefault();
      nextStep();
    }
  };

  return (
    <div style={{ position: 'relative' }} onKeyDown={handleKeyDown}>
      {/* Progress Bar */}
      <div className="wizard-progress">
        <div className="wizard-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="wizard-step-label">
        Step <span>{step}</span> of 6 — <span>{STEP_META[step - 1].label}</span>
      </div>

      {/* Step Content */}
      <div style={{ minHeight: '380px' }}>
        {step === 1 && <Step1Personal data={formData.personal} update={(f, v) => updateSection('personal', f, v)} />}
        {step === 2 && <Step2Education data={formData.education} update={(f, v) => updateSection('education', f, v)} />}
        {step === 3 && (
          <Step3Experience
            hasExperience={formData.hasExperience}
            experience={formData.experience}
            setHasExperience={v => setFormData(p => ({ ...p, hasExperience: v }))}
            setExperience={v => setFormData(p => ({ ...p, experience: v }))}
          />
        )}
        {step === 4 && <Step4Skills data={formData.skills} update={(f, v) => updateSection('skills', f, v)} />}
        {step === 5 && <Step5Projects data={formData.projects} update={(f, v) => updateSection('projects', f, v)} />}
        {step === 6 && <Step6Target data={formData.target} update={(f, v) => updateSection('target', f, v)} />}
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '40px',
        paddingTop: '28px',
        borderTop: '1px solid var(--border)',
        gap: '16px',
        flexWrap: 'wrap',
      }}>
        <button
          className="chip-label"
          onClick={step === 1 ? onCancel : prevStep}
          style={{ minWidth: '90px', textAlign: 'center' }}
        >
          {step === 1 ? '← Cancel' : '← Back'}
        </button>
        <button
          style={{
            background: step === 6
              ? 'linear-gradient(135deg, var(--accent), var(--accent2))'
              : 'var(--accent)',
            padding: '13px 36px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '800',
            fontSize: '0.95rem',
            opacity: canGoNext() ? 1 : 0.4,
            cursor: canGoNext() ? 'pointer' : 'not-allowed',
            boxShadow: canGoNext() ? '0 8px 24px var(--accent-glow)' : 'none',
            transition: 'all 0.3s ease',
            flex: '1',
            maxWidth: '280px',
          }}
          onClick={step === 6 ? handleFinish : nextStep}
          disabled={!canGoNext()}
        >
          {step === 6 ? '⚡ GENERATE AI CV' : 'Next Step →'}
        </button>
      </div>
    </div>
  );
};

export default WizardShell;
