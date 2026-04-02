import React from 'react';

const CVInput = ({ cvText, setCvText, industry, setIndustry, onSubmit, loading }) => {
  const industries = [
    { id: 'banking', name: 'Banking & Financial Services', icon: '🏦', companies: 'GTBank, Access, Zenith, Stanbic' },
    { id: 'fmcg', name: 'FMCG & Consumer Goods', icon: '🛒', companies: 'Unilever, Nestlé, P&G, Dangote' },
    { id: 'consulting', name: 'Consulting & Professional Svcs', icon: '📊', companies: 'KPMG, Deloitte, PwC, EY' },
    { id: 'oilandgas', name: 'Oil & Gas / Energy', icon: '⛽', companies: 'Shell, TotalEnergies, Seplat, Chevron' },
  ];

  const isDisabled = cvText.length < 100 || !industry || loading;

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
    },
    label: {
      display: 'block',
      fontSize: '0.9rem',
      fontWeight: '600',
      color: 'var(--text-muted)',
      marginBottom: '12px',
    },
    textareaContainer: {
      position: 'relative',
    },
    textarea: {
      width: '100%',
      minHeight: '260px',
      backgroundColor: 'var(--surface2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      color: 'var(--text)',
      fontSize: '1rem',
      fontFamily: 'inherit',
      resize: 'vertical',
      transition: 'border-color 0.2s',
    },
    counter: {
      position: 'absolute',
      bottom: '-28px',
      right: '4px',
      fontSize: '0.8rem',
      color: cvText.length >= 100 ? 'var(--green)' : cvText.length > 0 ? 'var(--yellow)' : 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
    },
    industryCard: (isActive) => ({
      backgroundColor: isActive ? 'var(--accent-alpha)' : 'var(--surface2)',
      border: `2px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
      padding: '16px',
      borderRadius: 'var(--radius)',
      textAlign: 'left',
      transition: 'all 0.2s',
      cursor: loading ? 'not-allowed' : 'pointer',
      width: '100%',
    }),
    indName: {
      display: 'block',
      fontSize: '1.1rem',
      fontWeight: '700',
      marginBottom: '4px',
      color: 'var(--text)',
    },
    indCompanies: {
      fontSize: '0.75rem',
      color: 'var(--text-muted)',
    },
    tipBox: {
      backgroundColor: 'rgba(245, 158, 11, 0.05)',
      border: '1px dashed var(--yellow)',
      padding: '16px',
      borderRadius: 'var(--radius)',
      color: 'var(--yellow)',
      fontSize: '0.85rem',
      lineHeight: '1.4',
    },
    submitBtn: {
      width: '100%',
      padding: '18px',
      borderRadius: 'var(--radius)',
      fontSize: '1.1rem',
      fontWeight: '700',
      background: isDisabled ? 'var(--surface2)' : 'linear-gradient(135deg, var(--accent), var(--accent2))',
      color: isDisabled ? 'var(--text-muted)' : 'white',
      opacity: isDisabled ? '0.5' : '1',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      boxShadow: isDisabled ? 'none' : '0px 4px 15px rgba(0,0,0,0.3)',
      border: isDisabled ? '1px solid var(--border)' : 'none',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.textareaContainer}>
        <label style={styles.label}>PASTE RAW CV TEXT</label>
        <textarea
          style={styles.textarea}
          placeholder="Paste your CV here... (e.g. from Word or LinkedIn)"
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
          disabled={loading}
        />
        <div style={styles.counter}>
          {cvText.length >= 100 ? (
            <span style={{ color: 'var(--green)' }}>✅ Ready to process</span>
          ) : (
            <span>{cvText.length} / 100 characters minimum</span>
          )}
        </div>
      </div>

      <div>
        <label style={styles.label}>TARGET INDUSTRY</label>
        <div style={styles.grid}>
          {industries.map((ind) => (
            <button
              key={ind.id}
              style={styles.industryCard(industry === ind.id)}
              onClick={() => !loading && setIndustry(ind.id)}
              disabled={loading}
              type="button"
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{ind.icon}</div>
              <span style={styles.indName}>{ind.name}</span>
              <span style={styles.indCompanies}>{ind.companies}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={styles.tipBox}>
        💡 <strong>Tip:</strong> For best results, paste your CV as plain text. Remove tables and fancy formatting before pasting to help the AI parse your experience correctly.
      </div>

      <button
        style={styles.submitBtn}
        disabled={isDisabled}
        onClick={onSubmit}
        type="button"
      >
        {loading ? '⏳ Analysing your CV…' : '✨ Rewrite My CV →'}
      </button>
    </div>
  );
};

export default CVInput;
