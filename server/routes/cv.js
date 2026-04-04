const express = require('express');
const router  = express.Router();

const bankingPrompt    = require('../prompts/banking');
const fmcgPrompt       = require('../prompts/fmcg');
const consultingPrompt = require('../prompts/consulting');
const oilAndGasPrompt  = require('../prompts/oilandgas');
const wizardBuilder    = require('../prompts/wizardBuilder');

const PROMPT_MAP = {
  banking:    bankingPrompt,
  fmcg:       fmcgPrompt,
  consulting: consultingPrompt,
  oilandgas:  oilAndGasPrompt,
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const REQUEST_TIMEOUT_MS = 45000;

async function safeJson(response) {
  try {
    return await response.json();
  } catch (_error) {
    return null;
  }
}

async function callDeepSeek(prompt, isRetry = false) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let response;

  try {
    response = await fetch('https://api.deepseek.com/chat/completions', {
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
      signal: controller.signal,
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      const timeoutError = new Error('DeepSeek request timed out.');
      timeoutError.status = 504;
      throw timeoutError;
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

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
    const err = await safeJson(response);
    const message = err?.error?.message || 'DeepSeek request failed';
    const error   = new Error(message);
    error.status  = response.status;
    throw error;
  }

  const data = await safeJson(response);
  if (!data?.choices?.[0]?.message?.content) {
    const malformedError = new Error('DeepSeek returned an unexpected response payload.');
    malformedError.status = 502;
    throw malformedError;
  }

  return data.choices[0].message.content;
}

router.post('/generate', async (req, res) => {
  const { cvText, industry } = req.body;

  const isStructured = typeof cvText === 'object' && cvText !== null;

  if (!isStructured && (!cvText || typeof cvText !== 'string' || cvText.trim().length < 100)) {
    return res.status(400).json({ error: 'Please paste your full CV text (minimum 100 characters).' });
  }
  if (!industry || (!PROMPT_MAP[industry] && !isStructured)) {
    return res.status(400).json({ error: 'Invalid industry selected.' });
  }
  if (!process.env.DEEPSEEK_API_KEY) {
    return res.status(500).json({ error: 'Server misconfiguration: DEEPSEEK_API_KEY not set.' });
  }

  try {
    const prompt = isStructured 
      ? wizardBuilder(cvText)
      : PROMPT_MAP[industry](cvText.trim());
    
    const rawText = await callDeepSeek(prompt);

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (parseErr) {
      console.error('JSON parse error:', rawText);
      return res.status(500).json({ error: 'AI returned malformed output. Please try again.' });
    }

    if (!parsed.rewritten_cv || !Array.isArray(parsed.gap_analysis) || !Array.isArray(parsed.certifications) || !parsed.cover_letter || !parsed.linkedin_bio) {
      return res.status(500).json({ error: 'AI response was missing expected fields. Please try again.' });
    }

    return res.json({
      rewritten_cv:   parsed.rewritten_cv,
      gap_analysis:   parsed.gap_analysis,
      certifications: parsed.certifications,
      cover_letter:   parsed.cover_letter,
      linkedin_bio:   parsed.linkedin_bio,
      industry,
    });

  } catch (err) {
    console.error('DeepSeek API error:', err);
    if (err.status === 429) {
      return res.status(429).json({ error: 'API quota exceeded. Please wait a moment and try again.' });
    }
    if (err.status === 504) {
      return res.status(504).json({ error: 'AI service timed out. Please try again.' });
    }
    return res.status(500).json({ error: 'Failed to contact AI service. Please try again.' });
  }
});

module.exports = router;
