import React from 'react';

const CHOICES = [
  {
    id: 'paste',
    title: 'Optimize Existing CV',
    text: 'Paste your current draft and generate a sharper, role-aligned application suite in one run.',
    chip: 'Fast Track',
    bestFor: 'Best for: users with a CV draft',
    pace: 'Time: about 3-5 minutes',
  },
  {
    id: 'wizard',
    title: 'Guided CV Builder',
    text: 'Answer six focused steps and we assemble your profile even if you are starting from scratch.',
    chip: 'Structured Track',
    bestFor: 'Best for: first draft creation',
    pace: 'Time: about 6-10 minutes',
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
