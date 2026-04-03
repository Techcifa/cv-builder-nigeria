import React from 'react';
import { parseCV, formatHtmlLine } from './CVParser';

const TemplateExecutive = ({ cvText }) => {
  const { name, contact, sections } = parseCV(cvText);

  return (
    <div style={{
      padding: '0',
      backgroundColor: 'white',
      color: '#1f2937',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontSize: '10pt',
      lineHeight: '1.5',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Full Width Bold Header */}
      <div style={{ 
        backgroundColor: '#1f2937', 
        color: 'white', 
        padding: '30px 48px',
        textAlign: 'left'
      }}>
        <h1 style={{ fontSize: '26pt', fontWeight: '800', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '1px' }}>{name}</h1>
        <div style={{ fontSize: '10pt', color: '#9ca3af', fontWeight: '500' }}>
          {contact}
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '30px 48px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {sections.map((sec, i) => (
          <div key={i} style={{ display: 'flex', gap: '24px' }}>
            {/* Left aligned section header */}
            <div style={{ width: '25%', flexShrink: 0 }}>
              <h2 style={{ 
                fontSize: '11pt', 
                fontWeight: '800', 
                color: '#111827',
                textTransform: 'uppercase', 
                margin: '0',
                paddingTop: '2px'
              }}>
                {sec.title}
              </h2>
            </div>
            
            {/* Right aligned section body */}
            <div style={{ width: '75%' }}>
              <div style={{ fontSize: '10pt', color: '#374151' }}>
                {sec.content.map((line, j) => (
                  <div key={j} dangerouslySetInnerHTML={{ __html: formatHtmlLine(line).replace('--accent-color', '#1f2937') }} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateExecutive;
