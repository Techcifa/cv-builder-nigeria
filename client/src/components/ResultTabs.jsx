import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import CoverLetterTab from './tabs/CoverLetterTab';
import LinkedInTab from './tabs/LinkedInTab';

const ResultTabs = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState('cv');
  const [copied, setCopied] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const { rewritten_cv, gap_analysis, certifications, cover_letter, linkedin_bio, industry } = data;

  const handleCopy = () => {
    navigator.clipboard.writeText(rewritten_cv || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      const element = document.getElementById('cv-pdf-template');
      const opt = {
        margin:       [12, 12, 12, 12],
        filename:     `GT_CV_${(industry || 'EXPERT').toUpperCase()}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      await html2pdf().set(opt).from(element).save();
    } catch (e) {
      console.error('PDF generation failed:', e);
    } finally {
      setPdfLoading(false);
    }
  };

  // Build a formatted HTML string for the PDF template
  const buildPdfHtml = () => {
    if (!rewritten_cv) return '';
    const lines = rewritten_cv.split('\n');
    return lines.map(line => {
      const sectionMatch = line.match(/^===\s*(.*?)\s*===$/);
      if (sectionMatch) {
        return `<h2 style="font-size:13pt;font-weight:900;color:#1f2937;border-bottom:2px solid #e5e7eb;margin:22px 0 10px 0;padding-bottom:4px;text-transform:uppercase;letter-spacing:1px;">${sectionMatch[1]}</h2>`;
      }
      if (line.startsWith('- ')) {
        return `<div style="display:flex;gap:8px;margin:4px 0;"><span style="color:#6366f1;flex-shrink:0;">▪</span><span>${line.slice(2)}</span></div>`;
      }
      if (line.trim() === '') return '<br/>';
      return `<p style="margin:3px 0;">${line}</p>`;
    }).join('');
  };

  const criticalCount = gap_analysis.filter(g => g.severity === 'critical').length;
  const importantCount = gap_analysis.filter(g => g.severity === 'important').length;
  const niceCount = gap_analysis.filter(g => g.severity === 'nice-to-have').length;

  const sortedGaps = [...gap_analysis].sort((a, b) => {
    const order = { critical: 0, important: 1, 'nice-to-have': 2 };
    return order[a.severity] - order[b.severity];
  });

  const TAB_CONFIG = [
    { id: 'cv',       icon: '📄', label: 'CV',          labelFull: 'CV Rewrite' },
    { id: 'gaps',     icon: '⚠️', label: 'Gaps',        labelFull: 'Gap Analysis' },
    { id: 'certs',    icon: '🎓', label: 'Certs',       labelFull: 'Certifications' },
    { id: 'cover',    icon: '📝', label: 'Cover',       labelFull: 'Cover Letter' },
    { id: 'linkedin', icon: '💼', label: 'LinkedIn',    labelFull: 'LinkedIn Bio' },
  ];

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      position: 'relative',
      zIndex: '1',
    },
    tabs: {
      display: 'flex',
      gap: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      padding: '6px',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border)',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    },
    tab: (isActive) => ({
      flex: '1 0 auto',
      minWidth: '80px',
      padding: '10px 14px',
      borderRadius: '10px',
      fontSize: '0.8rem',
      fontWeight: '800',
      backgroundColor: isActive ? 'var(--accent)' : 'transparent',
      color: isActive ? 'white' : 'var(--text-muted)',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isActive ? '0 8px 20px var(--accent-glow)' : 'none',
      whiteSpace: 'nowrap',
    }),
    cvBox: {
      backgroundColor: 'var(--bg)',
      border: '1px solid var(--border)',
      borderLeft: '4px solid var(--accent)',
      borderRadius: 'var(--radius)',
      padding: '28px',
      fontFamily: '"Fira Code", "Courier New", monospace',
      fontSize: '0.9rem',
      lineHeight: '1.7',
      maxHeight: '600px',
      overflowY: 'auto',
      whiteSpace: 'pre-wrap',
      color: 'var(--text)',
      boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
    },
    actions: {
      display: 'flex',
      gap: '12px',
      marginTop: '20px',
      flexWrap: 'wrap',
    },
    btn: {
      flex: '1 1 140px',
      padding: '14px 16px',
      borderRadius: '12px',
      fontSize: '0.9rem',
      fontWeight: '700',
      backgroundColor: 'var(--surface2)',
      border: '1px solid var(--border)',
      color: 'var(--text)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
    },
    summaryLine: {
      fontSize: '0.9rem',
      fontWeight: '600',
      padding: '14px 20px',
      backgroundColor: 'rgba(99, 102, 241, 0.05)',
      borderRadius: 'var(--radius)',
      marginBottom: '24px',
      textAlign: 'center',
      border: '1px solid var(--accent-glow)',
      color: 'var(--accent-light)',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '16px',
    },
    gapCard: (sev) => ({
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      marginBottom: '16px',
      border: '1px solid var(--border)',
      borderLeft: `6px solid ${sev === 'critical' ? 'var(--red)' : sev === 'important' ? 'var(--yellow)' : 'var(--green)'}`,
      transition: 'transform 0.3s ease',
    }),
    badge: (sev) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.7rem',
      fontWeight: '900',
      textTransform: 'uppercase',
      padding: '5px 10px',
      borderRadius: '6px',
      marginBottom: '14px',
      backgroundColor: sev === 'critical' ? 'var(--red-alpha)' : sev === 'important' ? 'var(--yellow-alpha)' : 'var(--green-alpha)',
      color: sev === 'critical' ? 'var(--red)' : sev === 'important' ? 'var(--yellow)' : 'var(--green)',
      border: `1px solid ${sev === 'critical' ? 'rgba(239,68,68,0.3)' : sev === 'important' ? 'rgba(245,158,11,0.3)' : 'rgba(16,185,129,0.3)'}`,
      letterSpacing: '1px',
    }),
    fixTag: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: '8px',
      marginTop: '16px',
      fontSize: '0.85rem',
      fontWeight: '700',
      padding: '10px 16px',
      backgroundColor: 'rgba(16, 185, 129, 0.05)',
      borderRadius: '12px',
      color: 'var(--green)',
      border: '1px solid rgba(16, 185, 129, 0.2)',
      lineHeight: '1.5',
    },
    certCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      borderRadius: 'var(--radius)',
      padding: '28px',
      marginBottom: '16px',
      border: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    },
    chipRow: {
      display: 'flex',
      gap: '10px',
      margin: '16px 0',
      flexWrap: 'wrap',
    },
    chip: (colorVar) => ({
      fontSize: '0.78rem',
      fontWeight: '700',
      padding: '5px 12px',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      border: `1px solid var(${colorVar})`,
      color: `var(${colorVar})`,
    }),
    resetBtn: {
      marginTop: '24px',
      padding: '12px 28px',
      color: 'var(--text-muted)',
      fontSize: '0.9rem',
      fontWeight: '600',
      backgroundColor: 'transparent',
      border: '1px solid var(--border)',
      borderRadius: '30px',
      alignSelf: 'center',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
    }
  };

  return (
    <div style={styles.container}>
      {/* Tab Navigation */}
      <div style={styles.tabs} role="tablist">
        {TAB_CONFIG.map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === t.id}
            style={styles.tab(activeTab === t.id)}
            onClick={() => setActiveTab(t.id)}
          >
            <span style={{ marginRight: '6px' }}>{t.icon}</span>
            <span className="tab-label-full">{t.labelFull}</span>
            <span className="tab-label-short">{t.label}</span>
          </button>
        ))}
      </div>

      <div style={{ animation: 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        {/* CV Tab */}
        {activeTab === 'cv' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <pre style={styles.cvBox}>{rewritten_cv}</pre>
            <div style={styles.actions}>
              <button 
                style={{ ...styles.btn, backgroundColor: copied ? 'var(--green)' : 'var(--surface2)', color: 'white', borderColor: copied ? 'var(--green)' : 'var(--border)' }} 
                onClick={handleCopy}
              >
                {copied ? '✓ COPIED' : '📋 COPY CV'}
              </button>
              <button
                style={{ ...styles.btn, backgroundColor: pdfLoading ? 'var(--surface2)' : 'var(--accent)', color: 'white', borderColor: 'var(--accent-glow)', opacity: pdfLoading ? 0.7 : 1 }}
                onClick={handleDownloadPDF}
                disabled={pdfLoading}
              >
                {pdfLoading ? '⏳ Generating...' : '⬇ DOWNLOAD PDF ⚡'}
              </button>
            </div>
          </div>
        )}

        {/* Gap Analysis Tab */}
        {activeTab === 'gaps' && (
          <div>
            <div style={styles.summaryLine}>
              <span>🔴 {criticalCount} Critical</span>
              <span>🟡 {importantCount} Important</span>
              <span>🟢 {niceCount} Nice to have</span>
            </div>
            {sortedGaps.map((gap, i) => (
              <div key={i} style={styles.gapCard(gap.severity)}>
                <span style={styles.badge(gap.severity)}>
                  {gap.severity === 'critical' ? '⚠ Critical Weakness' : gap.severity === 'important' ? '↑ Priority Gap' : '◎ Growth Area'}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '10px', color: 'white', letterSpacing: '-0.5px' }}>{gap.gap}</h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{gap.detail}</p>
                <div style={styles.fixTag}>
                  <span style={{ flexShrink: 0 }}>🚀</span>
                  <span><strong>ACTION:</strong> {gap.fix}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certs' && (
          <div>
            <div style={{ marginBottom: '28px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '900', marginBottom: '6px' }}>Your Certification Roadmap</h2>
              <p style={{ color: 'var(--text-muted)' }}>Top 5 recommendations to boost your {(industry || '').toUpperCase()} employability.</p>
            </div>
            {certifications.map((cert, i) => (
              <div key={i} style={styles.certCard}>
                <div style={{ position: 'absolute', top: '20px', right: '24px', fontSize: '2.5rem', fontWeight: '900', color: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'white', maxWidth: '85%' }}>{cert.name}</h3>
                <div style={styles.chipRow}>
                  <span style={styles.chip('--accent-light')}>{cert.provider}</span>
                  <span style={styles.chip(cert.cost?.toLowerCase().includes('free') ? '--green' : '--yellow')}>{cert.cost}</span>
                  <span style={styles.chip('--text-muted')}>{cert.duration}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.6' }}>{cert.relevance}</p>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--accent-light)',
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    borderBottom: '2px solid var(--accent-glow)',
                    paddingBottom: '2px',
                  }}
                >
                  ENROLL NOW →
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'cover' && (
          <CoverLetterTab content={cover_letter} industry={industry} />
        )}

        {activeTab === 'linkedin' && (
          <LinkedInTab content={linkedin_bio} />
        )}
      </div>

      <button
        style={styles.resetBtn}
        onClick={onReset}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent-light)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
      >
        <span>↺</span> START OVER
      </button>

      {/* PDF Template — positioned offscreen so html2canvas can render it */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '794px' }}>
        <div
          id="cv-pdf-template"
          style={{
            padding: '40px 44px',
            backgroundColor: 'white',
            color: '#1a202c',
            fontFamily: 'Georgia, "Times New Roman", serif',
            lineHeight: '1.6',
            fontSize: '10.5pt',
            width: '794px',
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: '4px solid #6366f1', paddingBottom: '18px', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '22pt', fontWeight: '900', color: '#111827', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'system-ui, sans-serif' }}>
              {rewritten_cv?.split('\n')[0]?.replace(/^NAME:\s*/i, '') || 'Candidate Name'}
            </h1>
            <p style={{ fontSize: '9.5pt', color: '#6b7280', margin: '0', fontFamily: 'system-ui, sans-serif' }}>
              {rewritten_cv?.split('\n')[1]?.replace(/^CONTACT:\s*/i, '') || ''}
            </p>
          </div>
          {/* Body */}
          <div
            style={{ color: '#374151', fontFamily: 'system-ui, sans-serif', fontSize: '10pt' }}
            dangerouslySetInnerHTML={{ __html: buildPdfHtml() }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultTabs;
