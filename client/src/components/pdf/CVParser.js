export const parseCV = (rawText) => {
  if (!rawText) return { name: '', contact: '', sections: [] };

  const lines = rawText.split('\n');
  const name = lines[0]?.replace(/^(NAME|Name):\s*/i, '').replace(/\*\*/g, '').trim() || 'Candidate Name';
  const contact = lines[1]?.replace(/^(CONTACT|Contact|Contact Info):\s*/i, '').replace(/\*\*/g, '').trim() || '';

  const sections = [];
  let currentSection = null;

  for (let i = 2; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line && !currentSection) continue;

    const sectionMatch = line.match(/^===\s*(.*?)\s*===$/);
    if (sectionMatch) {
      if (currentSection) sections.push(currentSection);
      currentSection = { title: sectionMatch[1], content: [] };
    } else if (currentSection) {
      currentSection.content.push(line);
    }
  }

  if (currentSection) sections.push(currentSection);
  return { name, contact, sections };
};

const escapeHtml = (text) =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const formatHtmlLine = (line) => {
  let html = escapeHtml(line);

  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  if (html.startsWith('- ')) {
    return `<div style="display:flex; gap:8px; margin:4px 0;"><span style="color:var(--accent-color, #6366f1); flex-shrink:0;">&bull;</span><span>${html.slice(2)}</span></div>`;
  }

  if (!html.trim()) return '<div style="height: 6px;"></div>';
  return `<div style="margin:3px 0;">${html}</div>`;
};
