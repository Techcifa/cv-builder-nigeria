import React from 'react';

const TEMPLATES = [
  { id: 'modern', name: 'Modern', desc: '2-column layout with sidebar. Clean and contemporary.' },
  { id: 'classic', name: 'Classic', desc: 'Single column, serif typography. Traditional and ATS-safe.' },
  { id: 'executive', name: 'Executive', desc: 'Full-width header, structured sections. Bold and authoritative.' }
];

const TemplatePicker = ({ activeTemplate, onSelect }) => {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'white', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>1. Choose Template</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {TEMPLATES.map(t => (
          <div
            key={t.id}
            onClick={() => onSelect(t.id)}
            style={{
              backgroundColor: activeTemplate === t.id ? 'var(--accent-alpha)' : 'var(--surface)',
              border: `2px solid ${activeTemplate === t.id ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 'var(--radius)',
              padding: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: activeTemplate === t.id ? '0 8px 20px var(--accent-glow)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', color: activeTemplate === t.id ? 'var(--accent-light)' : 'white' }}>{t.name}</span>
              {activeTemplate === t.id && <span style={{ fontSize: '1.2rem' }}>✨</span>}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePicker;
