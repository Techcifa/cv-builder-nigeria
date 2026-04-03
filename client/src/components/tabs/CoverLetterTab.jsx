import React, { useState } from 'react';

const CoverLetterTab = ({ content, industry }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '900', marginBottom: '8px' }}>Nigerian {industry.toUpperCase()} Cover Letter</h2>
        <p style={{ color: 'var(--text-muted)' }}>Custom-tailored for Nigerian Graduate Trainee applications.</p>
      </div>
      
      <div style={{ 
        backgroundColor: 'var(--bg)', 
        border: '1px solid var(--border)', 
        borderRadius: 'var(--radius)', 
        padding: '32px',
        fontFamily: 'inherit',
        fontSize: '1rem',
        lineHeight: '1.7',
        whiteSpace: 'pre-wrap',
        color: 'var(--text)',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3)',
        maxHeight: '500px',
        overflowY: 'auto'
      }}>
        {content}
      </div>

      <button 
        onClick={handleCopy}
        style={{ 
          marginTop: '24px',
          width: '100%',
          padding: '16px',
          borderRadius: '12px',
          backgroundColor: copied ? 'var(--green)' : 'var(--surface2)',
          color: 'white',
          fontWeight: '700',
          border: '1px solid var(--border)'
        }}
      >
        {copied ? '✓ COPIED TO CLIPBOARD' : '📋 COPY COVER LETTER'}
      </button>
    </div>
  );
};

export default CoverLetterTab;
