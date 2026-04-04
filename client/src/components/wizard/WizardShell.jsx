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
  { label: 'Projects and Leadership' },
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
    target: { industry: '', companies: '', goal: '' },
  });

  const updateSection = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const nextStep = () => setStep((current) => Math.min(current + 1, 6));
  const prevStep = () => setStep((current) => Math.max(current - 1, 1));
  const progress = (step / 6) * 100;

  const canGoNext = () => {
    if (step === 1) return formData.personal.name && formData.personal.email;
    if (step === 2) return formData.education.degree && formData.education.institution;
    if (step === 6) return Boolean(formData.target.industry);
    return true;
  };

  const handleFinish = () => {
    onComplete(formData, formData.target.industry);
  };

  return (
    <div>
      <div className="wizard-progress">
        <div className="wizard-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="wizard-step-label">
        Step <span>{step}</span> of 6 - <span>{STEP_META[step - 1].label}</span>
      </div>

      <div className="wizard-content">
        {step === 1 && <Step1Personal data={formData.personal} update={(field, value) => updateSection('personal', field, value)} />}
        {step === 2 && <Step2Education data={formData.education} update={(field, value) => updateSection('education', field, value)} />}
        {step === 3 && (
          <Step3Experience
            hasExperience={formData.hasExperience}
            experience={formData.experience}
            setHasExperience={(value) => setFormData((prev) => ({ ...prev, hasExperience: value }))}
            setExperience={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
          />
        )}
        {step === 4 && <Step4Skills data={formData.skills} update={(field, value) => updateSection('skills', field, value)} />}
        {step === 5 && <Step5Projects data={formData.projects} update={(field, value) => updateSection('projects', field, value)} />}
        {step === 6 && <Step6Target data={formData.target} update={(field, value) => updateSection('target', field, value)} />}
      </div>

      <div className="wizard-actions">
        <button type="button" className="btn btn-ghost" onClick={step === 1 ? onCancel : prevStep}>
          {step === 1 ? 'Cancel' : 'Back'}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!canGoNext()}
          onClick={step === 6 ? handleFinish : nextStep}
        >
          {step === 6 ? 'Generate Application Suite' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default WizardShell;
