const INDUSTRY_CONTEXT = {
  banking: {
    label: 'Banking & Financial Services',
    companies: 'GTBank, Access Bank, Zenith Bank, UBA, Stanbic IBTC',
    tone: 'professional, commercially aware, and numerically confident',
    hook: 'passion for financial services and driving economic growth in Nigeria',
  },
  fmcg: {
    label: 'FMCG & Consumer Goods',
    companies: 'Unilever Nigeria, Nestlé Nigeria, PZ Cussons, Procter & Gamble',
    tone: 'energetic, consumer-focused, and commercially savvy',
    hook: 'passion for building brands that touch everyday Nigerian lives',
  },
  consulting: {
    label: 'Consulting & Professional Services',
    companies: 'KPMG Nigeria, Deloitte Nigeria, PwC Nigeria, EY Nigeria',
    tone: 'structured, analytical, and intellectually rigorous',
    hook: 'passion for solving complex business problems with structured thinking',
  },
  oilandgas: {
    label: 'Oil & Gas / Energy',
    companies: 'Shell Nigeria, TotalEnergies Nigeria, Seplat Energy, Chevron Nigeria',
    tone: 'technically grounded, safety-conscious, and operationally aware',
    hook: 'passion for contributing to Nigeria\'s energy sector and sustainable development',
  },
};

function coverLetterPrompt(cvText, industry, targetCompany) {
  const ind = INDUSTRY_CONTEXT[industry] || INDUSTRY_CONTEXT.banking;
  const company = targetCompany || `a leading ${ind.label} company in Nigeria`;

  return `
You are an expert Nigerian recruitment consultant who writes compelling, tailored cover letters for graduate trainee applications.

Using the CV below, write a professional cover letter for a Graduate Trainee application at ${company} in the ${ind.label} sector in Nigeria.

CV:
"""
${cvText}
"""

The cover letter must:
- Be exactly 4 paragraphs, no more, no less
- Paragraph 1: Strong opening hook — express genuine ${ind.hook}. Name the company specifically. State the role being applied for (Graduate Trainee Programme).
- Paragraph 2: Connect 2-3 specific achievements or experiences from the CV to what ${company} needs. Use concrete details. Avoid generic statements.
- Paragraph 3: Show knowledge of the industry in Nigeria — mention a real challenge or opportunity in the ${ind.label} sector and how the candidate's skills position them to contribute.
- Paragraph 4: Confident, professional close. Express enthusiasm. Request an interview. Thank the reader.
- Tone: ${ind.tone}
- Length: 280-350 words total
- No clichés: do not use "I am writing to express my interest", "I believe I would be a great fit", or "team player"
- Address it to "Dear Hiring Manager" if no specific name is known

Return your response as a valid JSON object with exactly this structure:
{
  "cover_letter": "the full cover letter as a plain text string with paragraph breaks using \\n\\n",
  "target_company": "${company}",
  "word_count": estimated word count as a number
}

Return ONLY the JSON object. No markdown fences. No preamble.
`;
}

module.exports = coverLetterPrompt;
