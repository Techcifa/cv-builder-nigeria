import React, { useState } from 'react';

const CoverLetterTab = ({ content, industry, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const displayIndustry = industry ? industry.toUpperCase() : 'GT';

  const handleCopy = async () => {
    await onCopy(content || '', () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="stack-14">
      <header className="stack-6">
        <h3 className="section-title">Nigerian {displayIndustry} Cover Letter</h3>
        <p className="muted">Tailored for graduate trainee applications and role fit.</p>
      </header>

      <div className="result-rich-text">{content || 'Cover letter not available.'}</div>

      <button type="button" className="btn" onClick={handleCopy}>
        {copied ? 'Copied' : 'Copy Cover Letter'}
      </button>
    </div>
  );
};

export default CoverLetterTab;
