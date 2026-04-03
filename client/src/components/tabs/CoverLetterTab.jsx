import React, { useState } from 'react';

const CoverLetterTab = ({ content, industry }) => {
  const [copied, setCopied] = useState(false);

  const displayIndustry = industry ? industry.toUpperCase() : 'GT';

  const handleCopy = () => {
    navigator.clipboard.writeText(content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '900', marginBottom: '8px' }}>
          Nigerian {displayIndustry} Cover Letter
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Custom-tailored for Nigerian Graduate Trainee applications.</p>
      </div>
      
      <div style={{ 
        backgroundColor: 'var(--bg)', 
        border: '1px solid var(--border)', 
        borderRadius: 'var(--radius)', 
        padding: '32px',
        fontFamily: 'inherit',
        fontSize: '1rem',
        lineHeight: '1.8',
        whiteSpace: 'pre-wrap',
        color: 'var(--text)',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.3)',
        maxHeight: '520px',
        overflowY: 'auto'
      }}>
        {content || 'Cover letter not available.'}
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
          border: `1px solid ${copied ? 'var(--green)' : 'var(--border)'}`,
          transition: 'all 0.3s ease',
        }}
      >
        {copied ? '✓ COPIED TO CLIPBOARD' : '📋 COPY COVER LETTER'}
      </button>
    </div>
  );
};

export default CoverLetterTab;
