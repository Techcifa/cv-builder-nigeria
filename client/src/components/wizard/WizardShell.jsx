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

const STEP_INSIGHTS = [
  'Intelligence Brief: Recruiters prioritize candidates with verifiable contact channels and active professional footprints.',
  'Intelligence Brief: Role-aligned coursework improves ATS match quality.',
  'Intelligence Brief: Quantified outcomes outperform task-only bullets.',
  'Intelligence Brief: Include technical tools screening systems are built to detect.',
  'Intelligence Brief: Projects can offset limited formal experience when execution is clear.',
  'Intelligence Brief: One target industry improves calibration quality.',
];
const WIZARD_DRAFT_KEY = 'gt_builder_wizard_draft_v1';

const WizardShell = ({ onComplete, onCancel, qualityHint }) => {
  const readStoredDraft = () => {
    try {
      const raw = window.localStorage.getItem(WIZARD_DRAFT_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_error) {
      return null;
    }
  };

  const defaultData = {
    personal: { name: '', email: '', phone: '', city: '', linkedin: '' },
    education: { degree: '', institution: '', year: '', grade: '', courses: [], achievements: '' },
    hasExperience: true,
    experience: [{ role: '', org: '', dates: '', bullets: '' }],
    skills: { technical: '', soft: [], languages: '' },
    projects: { finalProject: '', leadership: '', certs: '' },
    target: { industry: '', companies: '', goal: '' },
  };
  const storedDraft = readStoredDraft();

  const [step, setStep] = useState(storedDraft?.step || 1);
  const [formData, setFormData] = useState(storedDraft?.formData || defaultData);

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
    window.localStorage.removeItem(WIZARD_DRAFT_KEY);
    onComplete(formData, formData.target.industry);
  };

  React.useEffect(() => {
    const draft = { step, formData };
    window.localStorage.setItem(WIZARD_DRAFT_KEY, JSON.stringify(draft));
  }, [step, formData]);

  return (
    <div>
      <div className="wizard-progress">
        <div className="wizard-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="wizard-step-label">
        Step <span>{step}</span> of 6: <span>{STEP_META[step - 1].label}</span>
      </div>
      <div className="insight-line">{STEP_INSIGHTS[step - 1]}</div>
      {qualityHint ? <div className="insight-line mt-8">{qualityHint}</div> : null}

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
          {step === 1 ? 'Exit Builder' : 'Back'}
        </button>
        <button
          type="button"
          className="btn btn-primary"
          disabled={!canGoNext()}
          onClick={step === 6 ? handleFinish : nextStep}
        >
          {step === 6 ? 'Finalize Resume' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default WizardShell;
