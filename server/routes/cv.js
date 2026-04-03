const express = require('express');
const router  = express.Router();

const bankingPrompt    = require('../prompts/banking');
const fmcgPrompt       = require('../prompts/fmcg');
const consultingPrompt = require('../prompts/consulting');
const oilAndGasPrompt  = require('../prompts/oilandgas');

const PROMPT_MAP = {
  banking:    bankingPrompt,
  fmcg:       fmcgPrompt,
  consulting: consultingPrompt,
  oilandgas:  oilAndGasPrompt,
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function callDeepSeek(prompt, isRetry = false) {
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model:           'deepseek-chat',
      messages: [
        {
          role:    'system',
          content: 'You are an expert Nigerian recruitment consultant. Always respond with valid JSON only. No markdown fences. No preamble. No explanation outside the JSON object.',
        },
        {
          role:    'user',
          content: prompt,
        },
      ],
      temperature:     0.7,
      max_tokens:      8192,
      response_format: { type: 'json_object' },
    }),
  });

  if (response.status === 429) {
    if (isRetry) {
      const error = new Error('Rate limit exceeded after retry.');
      error.status = 429;
      throw error;
    }
    console.log('Rate limited — waiting 20 seconds before retry...');
    await wait(20000);
    return callDeepSeek(prompt, true);
  }

  if (!response.ok) {
    const err     = await response.json();
    const message = err.error?.message || 'DeepSeek request failed';
    const error   = new Error(message);
    error.status  = response.status;
    throw error;
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

router.post('/generate', async (req, res) => {
  const { cvText, industry } = req.body;

  if (!cvText || typeof cvText !== 'string' || cvText.trim().length < 100) {
    return res.status(400).json({ error: 'Please paste your full CV text (minimum 100 characters).' });
  }
  if (!industry || !PROMPT_MAP[industry]) {
    return res.status(400).json({ error: 'Invalid industry selected.' });
  }
  if (!process.env.DEEPSEEK_API_KEY) {
    return res.status(500).json({ error: 'Server misconfiguration: DEEPSEEK_API_KEY not set.' });
  }

  try {
    const prompt  = PROMPT_MAP[industry](cvText.trim());
    const rawText = await callDeepSeek(prompt);

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (parseErr) {
      console.error('JSON parse error:', rawText);
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
    console.error('DeepSeek API error:', err);
    if (err.status === 429) {
      return res.status(429).json({ error: 'API quota exceeded. Please wait a moment and try again.' });
    }
    return res.status(500).json({ error: 'Failed to contact AI service. Please try again.' });
  }
});

module.exports = router;
