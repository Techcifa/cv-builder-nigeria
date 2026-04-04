import React from 'react';

const TEMPLATES = [
  { id: 'modern', name: 'Modern', desc: 'Two-column layout with compact sidebar.' },
  { id: 'classic', name: 'Classic', desc: 'Single-column format with conservative structure.' },
  { id: 'executive', name: 'Executive', desc: 'Bold hierarchy for leadership-focused positioning.' },
];

const TemplatePicker = ({ activeTemplate, onSelect }) => {
  return (
    <section className="stack-12">
      <h3 className="template-heading">Choose PDF template</h3>
      <div className="card-grid">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            type="button"
            className={`template-card ${activeTemplate === template.id ? 'active' : ''}`}
            onClick={() => onSelect(template.id)}
            aria-pressed={activeTemplate === template.id}
          >
            <strong>{template.name}</strong>
            <span className="muted">{template.desc}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TemplatePicker;
