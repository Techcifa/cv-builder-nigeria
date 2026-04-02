import React from 'react';

const CVInput = ({ cvText, setCvText, industry, setIndustry, onSubmit, loading }) => {
  const industries = [
    { id: 'banking', name: 'Banking', icon: '🏦', companies: 'GTBank, Access, Zenith, Stanbic', color: '45, 127, 249' },
    { id: 'fmcg', name: 'FMCG', icon: '🛒', companies: 'Unilever, Nestlé, P&G, Dangote', color: '16, 185, 129' },
    { id: 'consulting', name: 'Consulting', icon: '📊', companies: 'KPMG, Deloitte, PwC, EY', color: '168, 85, 247' },
    { id: 'oilandgas', name: 'Oil & Gas', icon: '⛽', companies: 'Shell, Total, Seplat, Chevron', color: '245, 158, 11' },
  ];

  const isDisabled = cvText.length < 100 || !industry || loading;

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      position: 'relative',
      zIndex: '1',
    },
    label: {
      display: 'block',
      fontSize: '0.75rem',
      fontWeight: '800',
      color: 'var(--text-muted)',
      marginBottom: '16px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
    },
    textareaContainer: {
      position: 'relative',
    },
    textarea: {
      width: '100%',
      minHeight: '320px',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '24px',
      color: 'var(--text)',
      fontSize: '1rem',
      fontFamily: 'inherit',
      resize: 'vertical',
      transition: 'all 0.3s ease',
      lineHeight: '1.6',
    },
    counter: {
      position: 'absolute',
      bottom: '-30px',
      right: '8px',
      fontSize: '0.8rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
    },
    industryCard: (isActive, color) => ({
      backgroundColor: isActive ? `rgba(${color}, 0.15)` : 'rgba(255, 255, 255, 0.03)',
      border: `2px solid ${isActive ? `rgb(${color})` : 'var(--border)'}`,
      padding: '24px',
      borderRadius: 'var(--radius)',
      textAlign: 'left',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: loading ? 'not-allowed' : 'pointer',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: isActive ? `0 0 30px rgba(${color}, 0.2)` : 'none',
    }),
    indIcon: {
      fontSize: '2rem',
      marginBottom: '4px',
    },
    indName: {
      display: 'block',
      fontSize: '1.25rem',
      fontWeight: '800',
      color: 'var(--text)',
      letterSpacing: '-0.5px',
    },
    indCompanies: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
      fontWeight: '500',
      lineHeight: '1.4',
    },
    tipBox: {
      backgroundColor: 'rgba(245, 158, 11, 0.03)',
      border: '1px solid rgba(245, 158, 11, 0.2)',
      padding: '20px 24px',
      borderRadius: 'var(--radius)',
      color: 'var(--yellow)',
      fontSize: '0.9rem',
      lineHeight: '1.6',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
    },
    submitBtn: {
      width: '100%',
      padding: '20px',
      borderRadius: 'var(--radius)',
      fontSize: '1.25rem',
      fontWeight: '900',
      background: isDisabled ? 'var(--surface2)' : 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)',
      color: isDisabled ? 'var(--text-muted)' : 'white',
      opacity: isDisabled ? '0.5' : '1',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transform: isDisabled ? 'none' : 'translateY(0)',
      boxShadow: isDisabled ? 'none' : '0 10px 30px var(--accent-glow)',
      border: 'none',
      letterSpacing: '1px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.textareaContainer}>
        <label style={styles.label}>1. Paste Your Current CV</label>
        <textarea
          style={styles.textarea}
          placeholder="Paste your raw CV text here (no formatting needed)..."
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
          disabled={loading}
        />
        <div style={{ ...styles.counter, color: cvText.length >= 100 ? 'var(--green)' : cvText.length > 0 ? 'var(--yellow)' : 'var(--text-muted)' }}>
          {cvText.length >= 100 ? '✨ Sufficient text length' : `${cvText.length} / 100 characters min`}
        </div>
      </div>

      <div>
        <label style={styles.label}>2. Select Target Industry</label>
        <div style={styles.grid}>
          {industries.map((ind) => (
            <button
              key={ind.id}
              style={styles.industryCard(industry === ind.id, ind.color)}
              onClick={() => !loading && setIndustry(ind.id)}
              disabled={loading}
              type="button"
            >
              <div style={styles.indIcon}>{ind.icon}</div>
              <div>
                <span style={styles.indName}>{ind.name}</span>
                <span style={styles.indCompanies}>{ind.companies}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={styles.tipBox}>
        <span style={{ fontSize: '1.2rem', marginTop: '-2px' }}>💡</span>
        <div>
          <strong>Recruiter Tip:</strong> Focus on achievements rather than duties. Our AI will automatically convert your bullets into the high-performing **CAR (Challenge-Action-Result)** format.
        </div>
      </div>

      <button
        style={styles.submitBtn}
        disabled={isDisabled}
        onClick={onSubmit}
        type="button"
      >
        {loading ? '🚀 Processing...' : 'GENERATE AI CV →'}
      </button>
    </div>
  );
};

export default CVInput;
