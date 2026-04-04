import React, { useMemo, useState } from 'react';
import CoverLetterTab from './tabs/CoverLetterTab';
import LinkedInTab from './tabs/LinkedInTab';
import TemplatePicker from './pdf/TemplatePicker';
import TemplateModern from './pdf/TemplateModern';
import TemplateClassic from './pdf/TemplateClassic';
import TemplateExecutive from './pdf/TemplateExecutive';

const TAB_CONFIG = [
  { id: 'cv', label: 'CV' },
  { id: 'gaps', label: 'Gaps' },
  { id: 'certs', label: 'Certifications' },
  { id: 'cover', label: 'Cover' },
  { id: 'linkedin', label: 'LinkedIn' },
];

const ResultTabs = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState('cv');
  const [copied, setCopied] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [actionError, setActionError] = useState('');

  const rewrittenCV = typeof data?.rewritten_cv === 'string' ? data.rewritten_cv : '';
  const gapAnalysis = Array.isArray(data?.gap_analysis) ? data.gap_analysis : [];
  const certifications = Array.isArray(data?.certifications) ? data.certifications : [];
  const coverLetter = data?.cover_letter ?? '';
  const linkedInBio = data?.linkedin_bio ?? '';
  const industry = data?.industry ?? '';

  const criticalCount = useMemo(() => gapAnalysis.filter((item) => item.severity === 'critical').length, [gapAnalysis]);
  const importantCount = useMemo(() => gapAnalysis.filter((item) => item.severity === 'important').length, [gapAnalysis]);
  const niceCount = useMemo(() => gapAnalysis.filter((item) => item.severity === 'nice-to-have').length, [gapAnalysis]);

  const sortedGaps = useMemo(() => {
    const order = { critical: 0, important: 1, 'nice-to-have': 2 };
    return [...gapAnalysis].sort((a, b) => (order[a.severity] ?? 99) - (order[b.severity] ?? 99));
  }, [gapAnalysis]);

  const handleTabKeyDown = (event, currentIndex) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const nextIndex =
      event.key === 'ArrowRight'
        ? (currentIndex + 1) % TAB_CONFIG.length
        : (currentIndex - 1 + TAB_CONFIG.length) % TAB_CONFIG.length;
    const nextTabId = TAB_CONFIG[nextIndex].id;
    setActiveTab(nextTabId);
    document.getElementById(`tab-${nextTabId}`)?.focus();
  };

  const copyText = async (text, onSuccess) => {
    try {
      if (!navigator?.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(text || '');
      setActionError('');
      onSuccess?.();
    } catch (_error) {
      setActionError('Copy failed in this browser context. Select and copy the text manually.');
    }
  };

  const handleCopy = async () => {
    await copyText(rewrittenCV, () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const handleDownloadPDF = async () => {
    setActionError('');
    setPdfLoading(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('cv-pdf-template');
      if (!element) throw new Error('PDF template not found');
      const opt = {
        margin: [12, 12, 12, 12],
        filename: `GT_CV_${(industry || 'EXPERT').toUpperCase()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('PDF generation failed:', error);
      setActionError('PDF generation failed. Please try again.');
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="result-shell">
      <div className="result-tabs" role="tablist" aria-label="Result sections">
        {TAB_CONFIG.map((tab, index) => (
          // roving behavior for left/right keys
          <button
            key={tab.id}
            type="button"
            role="tab"
            className={`result-tab ${activeTab === tab.id ? 'active' : ''}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {actionError ? <div className="error-banner">{actionError}</div> : null}

      <section className="result-panel" role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {activeTab === 'cv' ? (
          <div className="stack-16">
            <TemplatePicker activeTemplate={activeTemplate} onSelect={setActiveTemplate} />
            <pre className="result-code">{rewrittenCV || 'CV rewrite not available.'}</pre>
            <div className="result-actions">
              <button type="button" className="btn" onClick={handleCopy}>
                {copied ? 'Copied' : 'Copy CV'}
              </button>
              <button type="button" className="btn btn-primary" onClick={handleDownloadPDF} disabled={pdfLoading}>
                {pdfLoading ? 'Generating PDF...' : 'Download PDF'}
              </button>
            </div>
          </div>
        ) : null}

        {activeTab === 'gaps' ? (
          <div className="stack-14">
            <div className="result-summary">
              <span>{criticalCount} Critical</span>
              <span>{importantCount} Important</span>
              <span>{niceCount} Nice-to-have</span>
            </div>
            {sortedGaps.map((gap, index) => (
              <article key={`${gap.gap}-${index}`} className={`gap-card ${gap.severity}`}>
                <span className="gap-badge">
                  {gap.severity === 'critical'
                    ? 'Critical'
                    : gap.severity === 'important'
                    ? 'Important'
                    : 'Nice-to-have'}
                </span>
                <h3>{gap.gap}</h3>
                <p className="muted">{gap.detail}</p>
                <div className="gap-fix">
                  <strong>Action:</strong> {gap.fix}
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {activeTab === 'certs' ? (
          <div className="stack-12">
            <header className="stack-6">
              <h3 className="section-title">Certification Roadmap</h3>
              <p className="muted">Recommendations to improve {industry || 'your'} hiring readiness.</p>
            </header>
            {certifications.length === 0 ? <p className="muted">No certifications available.</p> : null}
            {certifications.map((cert, index) => (
              <article key={`${cert.name}-${index}`} className="cert-card">
                <div className="row-between align-start gap-10">
                  <h4 className="item-title">{cert.name}</h4>
                  <span className="muted text-2xs">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="cert-chip-row">
                  <span className="cert-chip">{cert.provider}</span>
                  <span className="cert-chip">{cert.cost}</span>
                  <span className="cert-chip">{cert.duration}</span>
                </div>
                <p className="muted">{cert.relevance}</p>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                  Visit course
                </a>
              </article>
            ))}
          </div>
        ) : null}

        {activeTab === 'cover' ? <CoverLetterTab content={coverLetter} industry={industry} onCopy={copyText} /> : null}
        {activeTab === 'linkedin' ? <LinkedInTab content={linkedInBio} onCopy={copyText} /> : null}
      </section>

      <button type="button" className="btn btn-ghost center-self" onClick={onReset}>
        Create Another Package
      </button>

      <div className="pdf-offscreen">
        <div id="cv-pdf-template" className="pdf-width">
          {activeTemplate === 'modern' ? <TemplateModern cvText={rewrittenCV} /> : null}
          {activeTemplate === 'classic' ? <TemplateClassic cvText={rewrittenCV} /> : null}
          {activeTemplate === 'executive' ? <TemplateExecutive cvText={rewrittenCV} /> : null}
        </div>
      </div>
    </div>
  );
};

export default ResultTabs;
