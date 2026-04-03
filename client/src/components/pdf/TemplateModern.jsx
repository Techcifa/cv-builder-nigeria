import React from 'react';
import { parseCV, formatHtmlLine } from './CVParser';

const TemplateModern = ({ cvText }) => {
  const { name, contact, sections } = parseCV(cvText);
  
  // Split sections into sidebar vs main based on typical CV structure
  const sidebarTitles = ['CORE COMPETENCIES', 'SKILLS', 'EDUCATION', 'CERTIFICATIONS', 'LANGUAGES'];
  
  const sidebarData = sections.filter(s => sidebarTitles.some(t => s.title.toUpperCase().includes(t)));
  const mainData = sections.filter(s => !sidebarTitles.some(t => s.title.toUpperCase().includes(t)));

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      backgroundColor: 'white',
      color: '#1e293b',
      fontFamily: '"Inter", system-ui, sans-serif',
      fontSize: '10pt',
      lineHeight: '1.5',
      boxSizing: 'border-box'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '32%',
        backgroundColor: '#f8fafc',
        borderRight: '1px solid #e2e8f0',
        padding: '30px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        {/* Name in Sidebar for "Modern" approach */}
        <div>
          <h1 style={{ fontSize: '24pt', fontWeight: '900', color: '#0f172a', lineHeight: '1.1', textTransform: 'uppercase', marginBottom: '12px' }}>{name}</h1>
          <div style={{ fontSize: '9pt', color: '#64748b', lineHeight: '1.6' }} dangerouslySetInnerHTML={{ __html: contact.replace(/\|/g, '<br/>') }} />
        </div>

        {sidebarData.map((sec, i) => (
          <div key={i}>
            <h2 style={{ fontSize: '11pt', fontWeight: '800', color: '#6366f1', textTransform: 'uppercase', borderBottom: '2px solid #e0e7ff', paddingBottom: '4px', marginBottom: '10px' }}>{sec.title}</h2>
            <div style={{ fontSize: '9.5pt', color: '#334155' }}>
              {sec.content.map((line, j) => (
                <div key={j} dangerouslySetInnerHTML={{ __html: formatHtmlLine(line).replace('--accent-color', '#6366f1') }} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{
        width: '68%',
        padding: '30px 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {mainData.map((sec, i) => (
          <div key={i}>
            <h2 style={{ fontSize: '13pt', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', paddingBottom: '4px', marginBottom: '12px', letterSpacing: '0.5px' }}>{sec.title}</h2>
            <div style={{ fontSize: '10pt', color: '#334155' }}>
              {sec.content.map((line, j) => (
                <div key={j} dangerouslySetInnerHTML={{ __html: formatHtmlLine(line).replace('--accent-color', '#6366f1') }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateModern;
