import React, { useState } from 'react';

const ASSETS = [
  { icon: '📄', label: 'Rewritten CV', desc: 'ATS-optimised, industry-specific rewrite in CAR bullet format.', color: 'var(--accent)' },
  { icon: '⚠️', label: 'Gap Analysis', desc: 'Honest, brutally specific gaps with actionable fix timelines.', color: 'var(--red)' },
  { icon: '🎓', label: 'Certifications', desc: '5 prioritised cert recommendations with direct enrolment links.', color: 'var(--yellow)' },
  { icon: '📝', label: 'Cover Letter', desc: '4-paragraph, no-cliché letter tailored for your exact target company.', color: 'var(--green)' },
  { icon: '💼', label: 'LinkedIn Suite', desc: 'Headline, About section, and 10 skill tags — ready to paste.', color: '#0a66c2' },
];

const STEPS = [
  { n: '01', icon: '🧭', title: 'Choose Your Path', desc: 'Paste your existing CV draft, or build one from scratch using our guided 6-step wizard.' },
  { n: '02', icon: '🤖', title: 'AI Generates Your Suite', desc: 'DeepSeek V3 analyses your profile against real Nigerian GT role requirements and generates 5 assets instantly.' },
  { n: '03', icon: '🚀', title: 'Apply with Confidence', desc: 'Download your PDF, copy your cover letter, and update your LinkedIn — all in one place.' },
];

const COMPANIES = [
  { sector: 'Banking', names: 'GTBank · Access · Zenith · UBA · Stanbic', color: '45, 127, 249' },
  { sector: 'FMCG', names: 'Unilever · Nestlé · P&G · Dangote · PZ Cussons', color: '16, 185, 129' },
  { sector: 'Consulting', names: 'KPMG · Deloitte · PwC · EY · Andersen', color: '168, 85, 247' },
  { sector: 'Oil & Gas', names: 'Shell · TotalEnergies · Seplat · Chevron · NNPCL', color: '245, 158, 11' },
];

const FAQS = [
  { q: 'Is it free?', a: 'Yes — completely free to use. No signup required. Just paste or build and generate.' },
  { q: 'How long does it take?', a: 'Under 60 seconds. The AI generates all 5 career assets in a single request.' },
  { q: 'Is my data safe?', a: 'Your CV text is sent securely to the AI model for one-time processing. We do not store your data.' },
  { q: 'What industries are supported?', a: 'Banking & Finance, FMCG, Consulting, and Oil & Gas — the four most competitive Nigerian GT sectors.' },
  { q: 'Can I use it without a CV?', a: 'Yes! Our guided 6-step wizard helps you build a profile from scratch in about 3 minutes.' },
  { q: 'What is a Graduate Trainee programme?', a: 'GT programmes are structured entry-level schemes at top Nigerian companies. They are highly competitive and CV-quality is the first filter.' },
];

const Landing = ({ onStart }) => {
  const [activeAsset, setActiveAsset] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ── NAV ───────────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: 'rgba(5, 6, 8, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        padding: '14px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.6rem' }}>🎯</span>
          <span style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '-0.5px' }}>GT BUILDER</span>
          <span style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            color: 'white', padding: '3px 9px', borderRadius: '20px',
            fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px',
          }}>Nigeria Edition</span>
        </div>
        <button
          onClick={onStart}
          style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            color: 'white', padding: '10px 24px', borderRadius: '30px',
            fontSize: '0.9rem', fontWeight: '700',
            boxShadow: '0 4px 16px var(--accent-glow)',
          }}
        >
          Start Free →
        </button>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section style={{
        textAlign: 'center',
        padding: 'clamp(60px, 10vw, 120px) 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow blobs */}
        <div style={{ position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', borderRadius: '30px',
          backgroundColor: 'var(--accent-alpha)', border: '1px solid var(--accent-glow)',
          color: 'var(--accent-light)', fontSize: '0.85rem', fontWeight: '600',
          marginBottom: '32px',
          animation: 'fadeIn 0.6s ease',
        }}>
          <span>✨</span> Free AI Career Suite for Nigerian Graduates
        </div>

        <h1 style={{
          fontSize: 'clamp(2.4rem, 6vw, 5rem)',
          fontWeight: '900',
          lineHeight: '1.05',
          letterSpacing: '-2px',
          marginBottom: '28px',
          background: 'linear-gradient(to bottom right, #fff 30%, #64748b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'fadeIn 0.7s ease',
        }}>
          Land Your Dream<br />Graduate Trainee Role.
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          color: 'var(--text-muted)',
          maxWidth: '580px',
          margin: '0 auto 48px',
          lineHeight: '1.7',
          animation: 'fadeIn 0.8s ease',
        }}>
          GT Builder uses AI to turn your raw experience into a complete career package — optimised for Nigeria's most competitive graduate programmes.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', animation: 'fadeIn 0.9s ease' }}>
          <button
            onClick={onStart}
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)',
              color: 'white', padding: '18px 40px', borderRadius: '14px',
              fontSize: '1.1rem', fontWeight: '900',
              boxShadow: '0 12px 40px var(--accent-glow)',
              letterSpacing: '0.5px',
            }}
          >
            Build My Career Suite →
          </button>
          <button
            onClick={onStart}
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--text-muted)', padding: '18px 32px', borderRadius: '14px',
              fontSize: '1rem', fontWeight: '700',
              border: '1px solid var(--border)',
            }}
          >
            See How It Works ↓
          </button>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 'clamp(20px, 5vw, 60px)',
          flexWrap: 'wrap',
          marginTop: '64px',
          padding: '24px 32px',
          backgroundColor: 'rgba(255,255,255,0.02)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          maxWidth: '700px',
          margin: '64px auto 0',
        }}>
          {[['5', 'Career Assets'], ['< 60s', 'Generation Time'], ['4', 'GT Industries'], ['Free', 'No Sign-up']].map(([val, lbl]) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--accent-light)', letterSpacing: '-1px' }}>{val}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>{lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>The Process</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '900', letterSpacing: '-1px' }}>From zero to fully packaged — in 3 steps.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px 28px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '20px', right: '24px', fontSize: '3.5rem', fontWeight: '900', color: 'rgba(255,255,255,0.03)' }}>{s.n}</div>
              <div style={{ fontSize: '2.2rem', marginBottom: '20px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '12px', color: 'white' }}>{s.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5-ASSET SHOWCASE ──────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px', backgroundColor: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>What You Get</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '900', letterSpacing: '-1px' }}>One click. Five career assets.</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '1.05rem' }}>Everything you need to apply, packaged in a single AI generation.</p>
          </div>

          {/* Asset selector tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {ASSETS.map((a, i) => (
              <button
                key={i}
                onClick={() => setActiveAsset(i)}
                style={{
                  padding: '10px 20px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '700',
                  backgroundColor: activeAsset === i ? a.color : 'var(--surface)',
                  color: activeAsset === i ? 'white' : 'var(--text-muted)',
                  border: `1px solid ${activeAsset === i ? a.color : 'var(--border)'}`,
                  transition: 'all 0.3s ease',
                  boxShadow: activeAsset === i ? `0 4px 20px ${a.color}33` : 'none',
                }}
              >
                {a.icon} {a.label}
              </button>
            ))}
          </div>

          {/* Active asset detail */}
          <div style={{
            backgroundColor: 'var(--surface)',
            border: `1px solid ${ASSETS[activeAsset].color}40`,
            borderLeft: `4px solid ${ASSETS[activeAsset].color}`,
            borderRadius: 'var(--radius-lg)',
            padding: '40px',
            animation: 'fadeIn 0.4s ease',
            minHeight: '160px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{ASSETS[activeAsset].icon}</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px', color: 'white' }}>{ASSETS[activeAsset].label}</h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '500px' }}>{ASSETS[activeAsset].desc}</p>
          </div>
        </div>
      </section>

      {/* ── TARGET COMPANIES ──────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Who It's For</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: '900', letterSpacing: '-1px' }}>Built for Nigeria's top-tier GT applications.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {COMPANIES.map((c) => (
            <div key={c.sector} style={{
              backgroundColor: `rgba(${c.color}, 0.05)`,
              border: `1px solid rgba(${c.color}, 0.2)`,
              borderRadius: 'var(--radius)',
              padding: '28px',
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '900', color: `rgb(${c.color})`, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>{c.sector}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.8', fontWeight: '500' }}>{c.names}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) 24px', backgroundColor: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '900', letterSpacing: '-1px' }}>Frequently Asked</h2>
          </div>

          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid var(--border)',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%', textAlign: 'left', padding: '22px 4px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  color: 'var(--text)', fontSize: '1rem', fontWeight: '700',
                  gap: '16px',
                }}
              >
                <span>{faq.q}</span>
                <span style={{ color: 'var(--accent-light)', fontSize: '1.3rem', flexShrink: 0, transition: 'transform 0.3s ease', transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 4px 22px', color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem', animation: 'fadeIn 0.3s ease' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) 24px', textAlign: 'center' }}>
        <div style={{
          maxWidth: '640px', margin: '0 auto',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'clamp(40px, 6vw, 72px)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>🚀</div>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: '900', letterSpacing: '-1px', marginBottom: '16px' }}>
            Your GT career package awaits.
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '36px', lineHeight: '1.7' }}>
            No sign-up. No payment. Just your CV and 60 seconds.
          </p>
          <button
            onClick={onStart}
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)',
              color: 'white', padding: '18px 48px', borderRadius: '14px',
              fontSize: '1.1rem', fontWeight: '900',
              boxShadow: '0 12px 40px var(--accent-glow)',
            }}
          >
            Start for Free — No Sign-up →
          </button>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 40px',
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-between', alignItems: 'center',
        gap: '16px',
        color: 'var(--text-muted)', fontSize: '0.85rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🎯</span>
          <strong style={{ color: 'var(--text)' }}>GT BUILDER</strong>
          <span>— Made for Nigerian Graduates</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <span>Powered by DeepSeek V3</span>
          <a
            href="https://github.com/Techcifa/cv-builder-nigeria"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent-light)', textDecoration: 'none', fontWeight: '600' }}
          >
            GitHub →
          </a>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
