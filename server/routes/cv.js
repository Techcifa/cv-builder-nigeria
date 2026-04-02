const express = require('express');
const router = express.Router();

const bankingPrompt    = require('../prompts/banking');
const fmcgPrompt       = require('../prompts/fmcg');
const consultingPrompt = require('../prompts/consulting');
const oilAndGasPrompt  = require('../prompts/oilandgas');

const PROMPT_MAP = {
  banking:   bankingPrompt,
  fmcg:      fmcgPrompt,
  consulting: consultingPrompt,
  oilandgas: oilAndGasPrompt,
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function callGemini(prompt, isRetry = false) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 8192 }
    })
  });

  if (response.status === 429) {
    if (isRetry) {
      // Already retried once — give up and surface the error
      const error = new Error('Rate limit exceeded after retry.');
      error.status = 429;
      throw error;
    }
    console.log('Rate limited — waiting 20 seconds before retry...');
    await wait(20000);
    return callGemini(prompt, true); // retry once, with flag set
  }

  if (!response.ok) {
    const err = await response.json();
    const message = err.error?.message || 'Gemini request failed';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

router.post('/generate', async (req, res) => {
  const { cvText, industry } = req.body;

  // Validation
  if (!cvText || typeof cvText !== 'string' || cvText.trim().length < 100) {
    return res.status(400).json({ error: 'Please paste your full CV text (minimum 100 characters).' });
  }
  if (!industry || !PROMPT_MAP[industry]) {
    return res.status(400).json({ error: 'Invalid industry selected.' });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Server misconfiguration: GEMINI_API_KEY not set.' });
  }

  try {
    const prompt = PROMPT_MAP[industry](cvText.trim());
    const rawText = await callGemini(prompt);

    // Strip markdown fences if Gemini wraps response in them
    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('JSON parse error. Raw output:\n', rawText);
      return res.status(500).json({ error: 'AI returned malformed output. Please try again.' });
    }

    if (!parsed.rewritten_cv || !Array.isArray(parsed.gap_analysis) || !Array.isArray(parsed.certifications)) {
      return res.status(500).json({ error: 'AI response was missing expected fields. Please try again.' });
    }

    return res.json({
      rewritten_cv:   parsed.rewritten_cv,
      gap_analysis:   parsed.gap_analysis,
      certifications: parsed.certifications,
      industry,
    });

  } catch (err) {
    console.error('Gemini API error:', err);
    if (err.status === 429) {
      return res.status(429).json({ error: 'API quota exceeded. Please wait a minute and try again.' });
    }
    return res.status(500).json({ error: 'Failed to contact AI service. Please try again.' });
  }
});

module.exports = router;
