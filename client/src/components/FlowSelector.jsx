import React from 'react';

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
    },
    choiceTitle: {
      fontSize: '1.5rem',
      fontWeight: '800',
      color: 'white',
    },
    choiceDesc: {
      fontSize: '0.95rem',
      color: 'var(--text-muted)',
      lineHeight: '1.5',
    }
  };

  return (
    <div className="responsive-grid" style={{ gap: '32px' }}>
      <div 
        style={styles.choiceCard} 
        onClick={() => onSelect('paste')}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 10px 40px var(--accent-glow)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'; }}
      >
        <div style={{ fontSize: '3.rem' }}>📋</div>
        <h3 style={styles.choiceTitle}>I have a CV</h3>
        <p style={styles.choiceDesc}>Paste your existing draft and let AI optimize it for Nigerian top-tier roles instantly.</p>
        <button className="chip-label" style={{ color: 'var(--accent-light)', borderColor: 'var(--accent)', pointerEvents: 'none' }}>Optimization Flow →</button>
      </div>

      <div 
        style={styles.choiceCard} 
        onClick={() => onSelect('wizard')}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent2)'; e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(168, 85, 247, 0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'; }}
      >
        <div style={{ fontSize: '3rem' }}>✨</div>
        <h3 style={styles.choiceTitle}>Build from Scratch</h3>
        <p style={styles.choiceDesc}>No draft? No problem. Follow our guided 6-step wizard specifically for Nigerian graduates.</p>
        <button className="chip-label" style={{ color: 'var(--accent2-light)', borderColor: 'var(--accent2)', pointerEvents: 'none' }}>Guided Build →</button>
      </div>
    </div>
  );
};

export default FlowSelector;
