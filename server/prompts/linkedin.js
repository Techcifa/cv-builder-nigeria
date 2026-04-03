const INDUSTRY_CONTEXT = {
  banking:    { label: 'Banking & Financial Services', keywords: 'Financial Analysis | Regulatory Compliance | Stakeholder Engagement | Data-Driven Thinking' },
  fmcg:       { label: 'FMCG & Consumer Goods',        keywords: 'Consumer Insights | Brand Awareness | Commercial Acumen | Cross-functional Collaboration' },
  consulting: { label: 'Consulting & Professional Services', keywords: 'Structured Thinking | Problem Solving | Data Analysis | Client Engagement' },
  oilandgas:  { label: 'Oil & Gas / Energy',            keywords: 'Operational Excellence | HSE Awareness | Technical Documentation | Process Compliance' },
};

function linkedinPrompt(cvText, industry) {
  const ind = INDUSTRY_CONTEXT[industry] || INDUSTRY_CONTEXT.banking;

  return `
You are an expert LinkedIn profile writer specialising in helping Nigerian graduates land graduate trainee roles at top companies.

Using the CV below, write three LinkedIn profile elements optimised for ${ind.label} GT roles in Nigeria.

CV:
"""
${cvText}
"""

Return your response as a valid JSON object with exactly this structure:

{
  "headline": "A punchy LinkedIn headline under 220 characters. Format: [Role target] | [Key strength] | [Degree] | [University] | Seeking GT Opportunities. Example: Graduate Trainee Candidate | Anatomy & Research Background | B.Sc. University of Ilorin | Open to Banking & Finance Roles. Make it specific, not generic.",

  "about": "The LinkedIn About section. 3 short paragraphs, 180-220 words total. Paragraph 1: Who they are and what they bring (lead with strongest credential). Paragraph 2: 2-3 specific achievements with context — what they did and the result. Reference the CV. Paragraph 3: What they are looking for, which industries/companies/roles, and a call to action (connect, message, etc.). Tone: confident, human, first-person, not robotic. No buzzword stuffing. No 'I am a passionate and hardworking individual.' End with relevant keywords for ATS: ${ind.keywords}",

  "skills": ["list of exactly 10 LinkedIn skill tags relevant to ${ind.label} GT roles in Nigeria, ordered by relevance. Use exact LinkedIn skill names where possible."]
}

Return ONLY the JSON object. No markdown fences. No preamble.
`;
}

module.exports = linkedinPrompt;
