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
      gap: '24px',
    },
    tabs: {
      display: 'flex',
      gap: '8px',
      backgroundColor: 'var(--surface2)',
      padding: '6px',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--border)',
    },
    tab: (isActive) => ({
      flex: '1',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '0.9rem',
      fontWeight: '600',
      backgroundColor: isActive ? 'var(--accent)' : 'transparent',
      color: isActive ? 'white' : 'var(--text-muted)',
      textAlign: 'center',
    }),
    cvBox: {
      backgroundColor: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '24px',
      fontFamily: 'monospace',
      fontSize: '0.9rem',
      lineHeight: '1.6',
      maxHeight: '600px',
      overflowY: 'auto',
      whiteSpace: 'pre-wrap',
      color: 'var(--text)',
    },
    actions: {
      display: 'flex',
      gap: '12px',
    },
    btn: {
      flex: '1',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '0.85rem',
      fontWeight: '600',
      backgroundColor: 'var(--surface2)',
      border: '1px solid var(--border)',
      color: 'var(--text)',
    },
    summaryLine: {
      fontSize: '0.9rem',
      padding: '12px',
      backgroundColor: 'var(--surface2)',
      borderRadius: '8px',
      marginBottom: '16px',
      textAlign: 'center',
      borderLeft: '4px solid var(--accent)',
      color: 'var(--text)',
    },
    gapCard: (sev) => ({
      backgroundColor: 'var(--surface2)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      marginBottom: '16px',
      border: '1px solid var(--border)',
      borderLeft: `6px solid ${sev === 'critical' ? 'var(--red)' : sev === 'important' ? 'var(--yellow)' : 'var(--green)'}`,
    }),
    badge: (sev) => ({
      display: 'inline-block',
      fontSize: '0.7rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      padding: '4px 8px',
      borderRadius: '4px',
      marginBottom: '8px',
      backgroundColor: sev === 'critical' ? 'var(--red-alpha)' : sev === 'important' ? 'var(--yellow-alpha)' : 'var(--green-alpha)',
      color: sev === 'critical' ? 'var(--red)' : sev === 'important' ? 'var(--yellow)' : 'var(--green)',
      border: `1px solid ${sev === 'critical' ? 'var(--red)' : sev === 'important' ? 'var(--yellow)' : 'var(--green)'}`,
    }),
    fixTag: {
      display: 'inline-block',
      marginTop: '12px',
      fontSize: '0.8rem',
      fontWeight: '600',
      padding: '6px 12px',
      backgroundColor: 'var(--bg)',
      borderRadius: '20px',
      color: 'var(--green)',
      border: '1px solid var(--border)',
    },
    certCard: {
      backgroundColor: 'var(--surface2)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      marginBottom: '16px',
      border: '1px solid var(--border)',
      position: 'relative',
    },
    chipRow: {
      display: 'flex',
      gap: '8px',
      margin: '12px 0px 16px',
      flexWrap: 'wrap',
    },
    chip: (colorVar) => ({
      fontSize: '0.75rem',
      fontWeight: '600',
      padding: '4px 10px',
      borderRadius: '6px',
      backgroundColor: 'var(--bg)',
      border: `1px solid var(${colorVar})`,
      color: `var(${colorVar})`,
    }),
    resetBtn: {
      marginTop: '20px',
      padding: '12px',
      color: 'var(--text-muted)',
      fontSize: '0.85rem',
      textDecoration: 'underline',
      alignSelf: 'center',
      backgroundColor: 'transparent',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        <button style={styles.tab(activeTab === 'cv')} onClick={() => setActiveTab('cv')}>📄 Rewritten CV</button>
        <button style={styles.tab(activeTab === 'gaps')} onClick={() => setActiveTab('gaps')}>⚠️ Gaps ({gap_analysis.length})</button>
        <button style={styles.tab(activeTab === 'certs')} onClick={() => setActiveTab('certs')}>🎓 Certs (5)</button>
      </div>

      <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
        {activeTab === 'cv' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <pre style={styles.cvBox}>{rewritten_cv}</pre>
            <div style={styles.actions}>
              <button 
                style={{ ...styles.btn, backgroundColor: copied ? 'var(--green)' : 'var(--surface2)', color: copied ? 'white' : 'var(--text)', borderColor: copied ? 'var(--green)' : 'var(--border)' }} 
                onClick={handleCopy}
              >
                {copied ? '✓ Copied!' : '📋 Copy CV Text'}
              </button>
              <button style={styles.btn} onClick={handleDownload}>⬇ Download as .txt</button>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              💡 Copy this into Word or Google Docs and apply your preferred formatting.
            </p>
          </div>
        )}

        {activeTab === 'gaps' && (
          <div>
            <div style={styles.summaryLine}>
              {criticalCount} critical gaps • {importantCount} important gaps • {niceCount} nice-to-have
            </div>
            {sortedGaps.map((gap, i) => (
              <div key={i} style={styles.gapCard(gap.severity)}>
                <span style={styles.badge(gap.severity)}>
                  {gap.severity === 'critical' ? '🔴 Critical' : gap.severity === 'important' ? '🟡 Important' : '🟢 Nice to Have'}
                </span>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text)' }}>{gap.gap}</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{gap.detail}</p>
                <div style={styles.fixTag}>✅ Fix: {gap.fix}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'certs' && (
          <div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Ranked by priority for your target industry. Start with #1.</p>
            {certifications.map((cert, i) => (
              <div key={i} style={styles.certCard}>
                <h2 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text)' }}>#{i+1} — {cert.name}</h2>
                <div style={styles.chipRow}>
                  <span style={styles.chip('--accent')}>{cert.provider}</span>
                  <span style={styles.chip(cert.cost.toLowerCase().includes('free') ? '--green' : '--yellow')}>{cert.cost}</span>
                  <span style={styles.chip('--text-muted')}>{cert.duration}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{cert.relevance}</p>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none' }}>
                  🔗 Go to course →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <button style={styles.resetBtn} onClick={onReset}>← Start over with new industry</button>
    </div>
  );
};

export default ResultTabs;
