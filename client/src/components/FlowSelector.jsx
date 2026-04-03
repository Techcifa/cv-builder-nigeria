import React from 'react';

const CHOICES = [
  {
    id: 'paste',
    title: 'Optimize an existing CV',
    text: 'Paste your current draft and generate a stronger, role-aligned package in one run.',
    chip: 'Optimization Track',
  },
  {
    id: 'wizard',
    title: 'Build from guided prompts',
    text: 'Answer six short steps and we assemble a complete profile even if you have no draft CV yet.',
    chip: 'Guided Builder',
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
          <span className="flow-chip">{choice.chip}</span>
        </button>
      ))}
    </section>
  );
};

export default FlowSelector;
