import React from 'react';
import { parseCV, formatHtmlLine } from './CVParser';

const TemplateClassic = ({ cvText }) => {
  const { name, contact, sections } = parseCV(cvText);

  return (
    <div style={{
      padding: '36px 48px',
      backgroundColor: 'white',
      color: '#000000',
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: '11pt',
      lineHeight: '1.4',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Centered Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22pt', fontWeight: 'bold', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '1px' }}>{name}</h1>
        <div style={{ fontSize: '10.5pt', color: '#333333' }}>
          {contact}
        </div>
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sections.map((sec, i) => (
          <div key={i}>
            <h2 style={{ 
              fontSize: '12pt', 
              fontWeight: 'bold', 
              textTransform: 'uppercase', 
              borderBottom: '1px solid #000000', 
              paddingBottom: '2px', 
              marginBottom: '8px',
              marginTop: '0'
            }}>
              {sec.title}
            </h2>
            <div style={{ paddingLeft: '4px' }}>
              {sec.content.map((line, j) => (
                <div key={j} dangerouslySetInnerHTML={{ __html: formatHtmlLine(line).replace('--accent-color', '#000000') }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateClassic;
