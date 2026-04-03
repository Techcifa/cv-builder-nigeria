import React, { useState } from 'react';

const LinkedInTab = ({ content }) => {
  const [copied, setCopied] = useState('');

  const isStructured = typeof content === 'object' && content !== null && content.headline;
  const headline = isStructured ? content.headline : '';
  const about = isStructured ? content.about : content;
  const skills = isStructured ? content.skills : [];

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text || '');
    setCopied(type);
    setTimeout(() => setCopied(''), 1800);
  };

  return (
    <div className="stack-14">
      {isStructured ? (
        <section className="result-card">
          <div className="row-between">
            <h3 className="item-title">Professional Headline</h3>
            <button type="button" className="btn" onClick={() => handleCopy(headline, 'headline')}>
              {copied === 'headline' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <p>{headline}</p>
        </section>
      ) : null}

      <section className="result-card">
        <div className="row-between">
          <h3 className="item-title">LinkedIn About Section</h3>
          <button type="button" className="btn" onClick={() => handleCopy(about, 'about')}>
            {copied === 'about' ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div className="result-rich-text mt-10">
          {about || 'LinkedIn summary not available.'}
        </div>
      </section>

      {isStructured && skills.length > 0 ? (
        <section className="result-card">
          <h3 className="item-title mb-10">Recommended Skills</h3>
          <div className="cert-chip-row">
            {skills.map((skill, index) => (
              <span key={`${skill}-${index}`} className="cert-chip">
                {skill}
              </span>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default LinkedInTab;
