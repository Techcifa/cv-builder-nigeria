const INDUSTRY_CONTEXT = {
  banking: {
    label: 'Banking & Financial Services',
    companies: 'GTBank, Access Bank, Zenith Bank, UBA, Stanbic IBTC',
    keywords: 'cross-functional collaboration, analytical thinking, stakeholder engagement, process improvement, data-driven, regulatory compliance, financial literacy, attention to detail, client relationship management',
    tracks: 'retail banking, credit analysis, operations, risk and compliance',
    tone: 'professional, commercially aware, and numerically confident',
    hook: 'passion for financial services and driving economic growth in Nigeria',
    topic: 'Fintech disruption or financial inclusion',
    indKeywords: 'Financial Analysis | Regulatory Compliance | Stakeholder Engagement | Data-Driven Thinking'
  },
  fmcg: {
    label: 'FMCG & Consumer Goods',
    companies: 'Unilever Nigeria, Nestlé Nigeria, PZ Cussons, Procter & Gamble, Dangote Group',
    keywords: 'consumer insights, brand management, supply chain awareness, cross-functional collaboration, commercial awareness, market development, go-to-market strategy, analytical thinking, stakeholder engagement',
    tracks: 'sales, marketing, supply chain, brand management',
    tone: 'energetic, consumer-focused, and commercially savvy',
    hook: 'passion for building brands that touch everyday Nigerian lives',
    topic: 'supply chain localization or consumer spending shifts',
    indKeywords: 'Consumer Insights | Brand Awareness | Commercial Acumen | Cross-functional Collaboration'
  },
  consulting: {
    label: 'Consulting & Professional Services',
    companies: 'KPMG Nigeria, Deloitte Nigeria, PwC Nigeria, EY Nigeria, Andersen Nigeria',
    keywords: 'problem-solving, structured thinking, analytical thinking, client engagement, stakeholder management, data analysis, insights-driven, quantitative reasoning, cross-functional collaboration, process improvement',
    tracks: 'audit, tax, advisory, management consulting',
    tone: 'structured, analytical, and intellectually rigorous',
    hook: 'passion for solving complex business problems with structured thinking',
    topic: 'digital transformation or institutional reform',
    indKeywords: 'Structured Thinking | Problem Solving | Data Analysis | Client Engagement'
  },
  oilandgas: {
    label: 'Oil & Gas / Energy',
    companies: 'Shell Nigeria, TotalEnergies Nigeria, Seplat Energy, Chevron Nigeria, NNPCL',
    keywords: 'HSE awareness, process compliance, analytical thinking, cross-functional collaboration, stakeholder engagement, data-driven decision making, technical documentation, operational excellence, regulatory compliance, project management',
    tracks: 'HSE, operations, technical services, commercial functions',
    tone: 'technically grounded, safety-conscious, and operationally aware',
    hook: 'passion for contributing to Nigeria\'s energy sector and sustainable development',
    topic: 'energy transition or local content optimization',
    indKeywords: 'Operational Excellence | HSE Awareness | Technical Documentation | Process Compliance'
  },
};

function wizardPrompt(formData) {
  const ind = INDUSTRY_CONTEXT[formData.target?.industry] || INDUSTRY_CONTEXT.banking;

  // ── Build a readable profile block from form data ──────────────────────
  const experienceBlock = formData.hasExperience && formData.experience && formData.experience.length > 0
    ? formData.experience.map((exp, i) => `
Experience ${i + 1}:
  Role: ${exp.role || 'Not specified'}
  Organisation: ${exp.org || 'Not specified'}
  Duration: ${exp.dates || '?'}
  Key responsibilities: ${exp.bullets || 'Not specified'}
`).join('\n')
    : 'No formal work experience provided.';

  const skillsBlock = [
    formData.skills?.technical ? `Technical: ${formData.skills.technical}` : '',
    formData.skills?.soft?.length ? `Soft: ${formData.skills.soft.join(', ')}` : '',
  ].filter(Boolean).join('\n');

  const languagesBlock = formData.skills?.languages ? formData.skills.languages : 'English';

  const profileBlock = `
CANDIDATE PROFILE:
==================
Name: ${formData.personal?.name || ''}
Email: ${formData.personal?.email || ''}
Phone: ${formData.personal?.phone || ''}
Location: ${formData.personal?.city || 'Nigeria'}
LinkedIn: ${formData.personal?.linkedin || 'Not provided'}

EDUCATION:
Degree: ${formData.education?.degree || ''}
Institution: ${formData.education?.institution || ''}
Graduation Year: ${formData.education?.year || ''}
Grade/Class: ${formData.education?.grade || 'Not specified'}
Relevant Coursework: ${formData.education?.courses?.join(', ') || 'Not specified'}
Academic Achievements: ${formData.education?.achievements || 'None specified'}

WORK EXPERIENCE:
${experienceBlock}

SKILLS:
${skillsBlock || 'Not specified'}

LANGUAGES: ${languagesBlock}

PROJECTS & RESEARCH:
Final Year Project / Research: ${formData.projects?.finalProject || 'None specified'}
Leadership / Volunteering: ${formData.projects?.leadership || 'None specified'}
Existing Certifications: ${formData.projects?.certs || 'None'}

CAREER GOAL: ${formData.target?.goal || 'To secure a graduate trainee role'}
Dream Companies: ${formData.target?.companies || ind.companies}
`;

  return `
You are an expert Nigerian recruitment consultant specialising in graduate trainee (GT) roles at ${ind.label} companies such as ${ind.companies}.

A graduate has filled out a profile form to build their CV from scratch. Using ONLY the information provided below, create a professional, ATS-optimised CV tailored specifically for Nigerian ${ind.label} GT applications.

${profileBlock}

TARGET INDUSTRY: ${ind.label}
ATS KEYWORDS TO INJECT NATURALLY: ${ind.keywords}
TARGET TRACKS: ${ind.tracks}

Return your response as a valid JSON object with exactly these FIVE keys:

{
  "rewritten_cv": "The full CV as a plain text string. Structure in this order: === PROFILE SUMMARY === → === EDUCATION === → === CORE COMPETENCIES === → === PROFESSIONAL EXPERIENCE === (skip if no experience, or write 'No formal experience' gracefully) → === PROJECTS & RESEARCH === → === LEADERSHIP & VOLUNTEERING === → === CERTIFICATIONS === → === LANGUAGES === → === REFEREES ===. Use - for bullets. Write all experience bullets in CAR format (Challenge → Action → Result). If experience is thin, expand strongly on education, projects, research, leadership, and transferable skills. Write a powerful 3-4 line profile summary that honestly positions this candidate for ${ind.label} GT roles. Inject ATS keywords naturally. Add 'References available upon request' at the end.",

  "gap_analysis": [
    {
      "severity": "critical | important | nice-to-have",
      "gap": "short gap name",
      "detail": "why this gap matters for ${ind.label} GT applications in Nigeria",
      "fix": "specific actionable fix with realistic timeline"
    }
  ],

  "certifications": [
    {
      "name": "certification name",
      "provider": "platform or institution",
      "cost": "Free | Paid - amount",
      "duration": "time to complete",
      "relevance": "why this helps for ${ind.label} GT in Nigeria",
      "link": "direct URL"
    }
  ],

  "cover_letter": "A high-impact, professional cover letter tailored for a Nigerian ${ind.label} Graduate Trainee role. Exactly 4 paragraphs, 280-350 words. Paragraph 1: Strong hook expressing ${ind.hook}. Name a specific company (e.g. ${ind.companies.split(',')[0].trim()}). Paragraph 2: Connect 2-3 specific achievements from the CV. Paragraph 3: Discuss a real Nigerian ${ind.label} sector challenge (e.g. ${ind.topic}). Paragraph 4: Confident close. Tone: ${ind.tone}. No clichés.",

  "linkedin_bio": {
     "headline": "Punchy headline under 220 chars. Format: [Role target] | [Key strength] | [Degree] | [University].",
     "about": "3 short paragraphs, 180-220 words total. Lead with credentials, follow with CV achievements, end with industry passion and CTA. End with keywords: ${ind.indKeywords}",
     "skills": ["List of exactly 10 LinkedIn skill tags relevant to ${ind.label} GT in Nigeria."]
  }
}

Rules:
- Return ONLY the JSON object. No markdown fences. No preamble.
- If a field was left blank, handle it gracefully — do not write \"Not specified\" in the CV output.
- gap_analysis must have 4-8 items ordered by severity.
- certifications must have exactly 5 items ordered by priority.
- Be brutally honest in gap_analysis but constructive in tone.
- All advice must be specific to the Nigerian job market.
`;
}

module.exports = wizardPrompt;
