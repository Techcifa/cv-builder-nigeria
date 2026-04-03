import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMsg(null);

    try {
      if (isLogin) {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        onClose();
      } else {
        const { error: authError } = await supabase.auth.signUp({ email, password });
        if (authError) throw authError;
        setMsg('Check your email for the confirmation link!');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(5, 6, 8, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        animation: 'fadeIn 0.3s ease'
      }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '20px', fontSize: '1.5rem', color: 'var(--text-muted)' }}
        >
          &times;
        </button>

        <h2 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '8px', color: 'white' }}>
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '0.9rem' }}>
          {isLogin ? 'Log in to view your saved CVs and cover letters.' : 'Sign up to automatically save your generated CVs.'}
        </p>

        {error && <div style={{ backgroundColor: 'var(--red-alpha)', color: 'var(--red)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid rgba(239,68,68,0.3)' }}>{error}</div>}
        {msg && <div style={{ backgroundColor: 'var(--green-alpha)', color: 'var(--green)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid rgba(16,185,129,0.3)' }}>{msg}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-input" 
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-input" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: 'white', padding: '14px', borderRadius: '10px',
              fontSize: '1rem', fontWeight: '800', marginTop: '10px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(null); setMsg(null); }}
            style={{ color: 'var(--accent-light)', fontWeight: '700', background: 'none' }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
