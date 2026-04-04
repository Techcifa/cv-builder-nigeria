import React from 'react';

const CHOICES = [
  {
    id: 'paste',
    title: 'CV Optimization',
    text: 'Refine an existing CV into a role-aligned application suite.',
    chip: 'Optimization',
    bestFor: 'Best for: existing CVs',
    pace: 'Estimated time: 3-5 min',
  },
  {
    id: 'wizard',
    title: 'Guided Build',
    text: 'Build a complete CV from structured prompts.',
    chip: 'Structured',
    bestFor: 'Best for: first-time drafts',
    pace: 'Estimated time: 6-10 min',
  },
];

const FlowSelector = ({ onSelect }) => {
  const handleKeyDown = (event, flow) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(flow);
    }
  };

  return (
    <section className="flow-grid" aria-label="Start options">
      {CHOICES.map((choice) => (
        <button
          key={choice.id}
          type="button"
          className="flow-choice"
          onClick={() => onSelect(choice.id)}
          onKeyDown={(event) => handleKeyDown(event, choice.id)}
        >
          <h3 className="flow-choice-title">{choice.title}</h3>
          <p>{choice.text}</p>
          <div className="flow-meta muted text-xs">
            <span>{choice.bestFor}</span>
            <span>{choice.pace}</span>
          </div>
          <span className="flow-chip">{choice.chip}</span>
        </button>
      ))}
    </section>
  );
};

export default FlowSelector;
