import React, { useState } from 'react';

const ResultTabs = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState('cv');
  const [copied, setCopied] = useState(false);

  const { rewritten_cv, gap_analysis, certifications, industry } = data;

  const handleCopy = () => {
    navigator.clipboard.writeText(rewritten_cv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([rewritten_cv], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `GT_CV_${industry.toUpperCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const criticalCount = gap_analysis.filter(g => g.severity === 'critical').length;
  const importantCount = gap_analysis.filter(g => g.severity === 'important').length;
  const niceCount = gap_analysis.filter(g => g.severity === 'nice-to-have').length;

  const sortedGaps = [...gap_analysis].sort((a, b) => {
    const order = { critical: 0, important: 1, 'nice-to-have': 2 };
    return order[a.severity] - order[b.severity];
  });

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
      gap: '12px',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      padding: '8px',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border)',
    },
    tab: (isActive) => ({
      flex: '1',
      padding: '14px',
      borderRadius: '12px',
      fontSize: '0.9rem',
      fontWeight: '800',
      backgroundColor: isActive ? 'var(--accent)' : 'transparent',
      color: isActive ? 'white' : 'var(--text-muted)',
      textAlign: 'center',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isActive ? '0 8px 20px var(--accent-glow)' : 'none',
    }),
    cvContainer: {
      position: 'relative',
    },
    cvBox: {
      backgroundColor: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '32px',
      fontFamily: '"Fira Code", "Courier New", monospace',
      fontSize: '0.95rem',
      lineHeight: '1.7',
      maxHeight: '650px',
      overflowY: 'auto',
      whiteSpace: 'pre-wrap',
      color: 'var(--text)',
      boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
    },
    actions: {
      display: 'flex',
      gap: '16px',
      marginTop: '24px',
    },
    btn: {
      flex: '1',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '0.95rem',
      fontWeight: '700',
      backgroundColor: 'var(--surface2)',
      border: '1px solid var(--border)',
      color: 'var(--text)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    },
    summaryLine: {
      fontSize: '1rem',
      fontWeight: '600',
      padding: '16px 24px',
      backgroundColor: 'rgba(99, 102, 241, 0.05)',
      borderRadius: 'var(--radius)',
      marginBottom: '24px',
      textAlign: 'center',
      border: '1px solid var(--accent-glow)',
      color: 'var(--accent-light)',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
    },
    gapCard: (sev) => ({
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      borderRadius: 'var(--radius)',
      padding: '28px',
      marginBottom: '20px',
      border: '1px solid var(--border)',
      borderLeft: `6px solid ${sev === 'critical' ? 'var(--red)' : sev === 'important' ? 'var(--yellow)' : 'var(--green)'}`,
      transition: 'transform 0.3s ease',
      cursor: 'default',
    }),
    badge: (sev) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.7rem',
      fontWeight: '900',
      textTransform: 'uppercase',
      padding: '6px 12px',
      borderRadius: '6px',
      marginBottom: '16px',
      backgroundColor: sev === 'critical' ? 'var(--red-alpha)' : sev === 'important' ? 'var(--yellow-alpha)' : 'var(--green-alpha)',
      color: sev === 'critical' ? 'var(--red)' : sev === 'important' ? 'var(--yellow)' : 'var(--green)',
      border: `1px solid ${sev === 'critical' ? 'rgba(239, 68, 68, 0.3)' : sev === 'important' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
      letterSpacing: '1px',
    }),
    fixTag: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '20px',
      fontSize: '0.85rem',
      fontWeight: '700',
      padding: '8px 16px',
      backgroundColor: 'rgba(16, 185, 129, 0.05)',
      borderRadius: '12px',
      color: 'var(--green)',
      border: '1px solid rgba(16, 185, 129, 0.2)',
    },
    certCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      borderRadius: 'var(--radius)',
      padding: '32px',
      marginBottom: '20px',
      border: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    },
    chipRow: {
      display: 'flex',
      gap: '12px',
      margin: '20px 0',
      flexWrap: 'wrap',
    },
    chip: (colorVar) => ({
      fontSize: '0.8rem',
      fontWeight: '700',
      padding: '6px 14px',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      border: `1px solid var(${colorVar})`,
      color: `var(${colorVar})`,
      boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
    }),
    resetBtn: {
      marginTop: '32px',
      padding: '12px 24px',
      color: 'var(--text-muted)',
      fontSize: '0.9rem',
      fontWeight: '600',
      backgroundColor: 'transparent',
      border: '1px solid transparent',
      borderRadius: '30px',
      alignSelf: 'center',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        <button style={styles.tab(activeTab === 'cv')} onClick={() => setActiveTab('cv')}>
          <span style={{ marginRight: '8px' }}>📄</span> Original Rewrite
        </button>
        <button style={styles.tab(activeTab === 'gaps')} onClick={() => setActiveTab('gaps')}>
          <span style={{ marginRight: '8px' }}>⚠️</span> Gap Analysis
        </button>
        <button style={styles.tab(activeTab === 'certs')} onClick={() => setActiveTab('certs')}>
          <span style={{ marginRight: '8px' }}>🎓</span> certifications
        </button>
      </div>

      <div style={{ animation: 'fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        {activeTab === 'cv' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={styles.cvContainer}>
              <pre style={styles.cvBox}>{rewritten_cv}</pre>
            </div>
            <div style={styles.actions}>
              <button 
                style={{ ...styles.btn, backgroundColor: copied ? 'var(--green)' : 'var(--surface2)', color: copied ? 'white' : 'var(--text)', borderColor: copied ? 'var(--green)' : 'var(--border)' }} 
                onClick={handleCopy}
              >
                {copied ? '✓ COPIED TO CLIPBOARD' : '📋 COPY REWRITTEN CV'}
              </button>
              <button style={styles.btn} onClick={handleDownload}>
                <span>⬇</span> DOWNLOAD .TXT
              </button>
            </div>
          </div>
        )}

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
                  {gap.severity === 'critical' ? 'Critical Weakness' : gap.severity === 'important' ? 'Priority Gap' : 'Growth Area'}
                </span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '12px', color: 'white', letterSpacing: '-0.5px' }}>{gap.gap}</h2>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{gap.detail}</p>
                <div style={styles.fixTag}>
                  <span style={{ fontSize: '1.1rem' }}>🚀</span>
                  <strong>ACTION PLAN:</strong> {gap.fix}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certs' && (
          <div>
            <div style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '8px' }}>Your Certification Roadmap</h2>
              <p style={{ color: 'var(--text-muted)' }}>Top 5 recommended courses to boost your employability in {industry.toUpperCase()}.</p>
            </div>
            {certifications.map((cert, i) => (
              <div key={i} style={styles.certCard}>
                <div style={{ position: 'absolute', top: '24px', right: '32px', fontSize: '3rem', fontWeight: '900', color: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }}>
                  0{i+1}
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'white', maxWidth: '80%' }}>{cert.name}</h2>
                <div style={styles.chipRow}>
                  <span style={styles.chip('--accent-light')}>{cert.provider}</span>
                  <span style={styles.chip(cert.cost.toLowerCase().includes('free') ? '--green' : '--yellow')}>{cert.cost}</span>
                  <span style={styles.chip('--text-muted')}>{cert.duration}</span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>{cert.relevance}</p>
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--accent-light)', 
                    fontWeight: '800', 
                    fontSize: '0.95rem', 
                    textDecoration: 'none',
                    padding: '8px 0',
                    borderBottom: '2px solid var(--accent-glow)'
                  }}
                >
                  ENROLL NOW <span>→</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <button style={styles.resetBtn} onClick={onReset}>
        <span>↺</span> START OVER WITH A DIFFERENT INDUSTRY
      </button>
    </div>
  );
};

export default ResultTabs;
