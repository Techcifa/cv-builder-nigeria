import React from 'react';

const STEP_LABELS = ['Personal Info', 'Education', 'Experience', 'Skills', 'Projects', 'Target Role'];

const FlowSelector = ({ onSelect }) => {
  const styles = {
    choiceCard: {
      padding: '48px 32px',
      borderRadius: 'var(--radius-lg)',
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--border)',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      outline: 'none',
    },
    choiceTitle: {
      fontSize: '1.5rem',
      fontWeight: '800',
      color: 'white',
    },
    choiceDesc: {
      fontSize: '0.95rem',
      color: 'var(--text-muted)',
      lineHeight: '1.6',
    }
  };

  const handleKeyDown = (e, flow) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(flow);
    }
  };

  return (
    <div className="responsive-grid" style={{ gap: '32px' }}>
      <div 
        style={styles.choiceCard}
        role="button"
        tabIndex={0}
        aria-label="I have a CV — Optimization flow"
        onClick={() => onSelect('paste')}
        onKeyDown={(e) => handleKeyDown(e, 'paste')}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 10px 40px var(--accent-glow)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'; }}
        onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-glow)'; }}
        onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'; }}
      >
        <div style={{ fontSize: '3rem' }}>📋</div>
        <h3 style={styles.choiceTitle}>I have a CV</h3>
        <p style={styles.choiceDesc}>Paste your existing draft and let AI optimize it for Nigerian top-tier roles instantly.</p>
        <span className="chip-label" style={{ color: 'var(--accent-light)', borderColor: 'var(--accent)', pointerEvents: 'none' }}>Optimization Flow →</span>
      </div>

      <div 
        style={styles.choiceCard}
        role="button"
        tabIndex={0}
        aria-label="Build from Scratch — Guided wizard"
        onClick={() => onSelect('wizard')}
        onKeyDown={(e) => handleKeyDown(e, 'wizard')}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent2)'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(168, 85, 247, 0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'; }}
        onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent2)'; e.currentTarget.style.boxShadow = '0 0 0 4px rgba(168, 85, 247, 0.2)'; }}
        onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'; }}
      >
        <div style={{ fontSize: '3rem' }}>✨</div>
        <h3 style={styles.choiceTitle}>Build from Scratch</h3>
        <p style={styles.choiceDesc}>No draft? No problem. Follow our guided 6-step wizard specifically for Nigerian graduates.</p>
        <span className="chip-label" style={{ color: 'var(--accent2-light)', borderColor: 'var(--accent2)', pointerEvents: 'none' }}>Guided Build →</span>
      </div>
    </div>
  );
};

export default FlowSelector;
