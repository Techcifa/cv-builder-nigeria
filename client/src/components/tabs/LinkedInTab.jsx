import React, { useState } from 'react';

const LinkedInTab = ({ content }) => {
  const [copied, setCopied] = useState(''); // 'headline', 'about'

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const isStructured = typeof content === 'object' && content !== null && content.headline;
  const headline = isStructured ? content.headline : '';
  const about = isStructured ? content.about : content;
  const skills = isStructured ? content.skills : [];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {isStructured && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0a66c2' }}>Professional Headline</h3>
            <button 
              onClick={() => handleCopy(headline, 'headline')}
              style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', backgroundColor: copied === 'headline' ? 'var(--green)' : 'rgba(10, 102, 194, 0.1)', color: copied === 'headline' ? 'white' : '#0a66c2', border: 'none', cursor: 'pointer' }}
            >
              {copied === 'headline' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div style={{ 
            backgroundColor: 'var(--surface2)', 
            padding: '16px 24px', 
            borderRadius: '12px', 
            border: '1px solid var(--border)',
            fontSize: '1.05rem',
            lineHeight: '1.4'
          }}>
            {headline}
          </div>
        </div>
      )}

      <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0a66c2' }}>LinkedIn "About" Section</h3>
        <button 
          onClick={() => handleCopy(about, 'about')}
          style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', backgroundColor: copied === 'about' ? 'var(--green)' : 'rgba(10, 102, 194, 0.1)', color: copied === 'about' ? 'white' : '#0a66c2', border: 'none', cursor: 'pointer' }}
        >
          {copied === 'about' ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div style={{ 
        backgroundColor: 'rgba(10, 102, 194, 0.05)', 
        border: '1px solid rgba(10, 102, 194, 0.2)', 
        borderRadius: 'var(--radius)', 
        padding: '32px',
        color: 'var(--text)',
        lineHeight: '1.7',
        fontSize: '1.05rem',
        fontStyle: 'italic',
        position: 'relative',
        whiteSpace: 'pre-wrap'
      }}>
        <div style={{ position: 'absolute', top: '10px', right: '20px', color: '#0a66c2', fontWeight: '900', opacity: '0.2', fontSize: '2rem' }}>in</div>
        {about}
      </div>

      {isStructured && skills.length > 0 && (
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0a66c2', marginBottom: '16px' }}>10 Recommended LinkedIn Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ 
                padding: '6px 14px', 
                borderRadius: '30px', 
                backgroundColor: 'var(--surface2)', 
                border: '1px solid var(--border)',
                fontSize: '0.9rem',
                color: 'var(--text-muted)'
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default LinkedInTab;
