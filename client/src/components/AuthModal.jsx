import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        setMsg('Check your email for the confirmation link.');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="auth-close" onClick={onClose} aria-label="Close authentication dialog">
          x
        </button>

        <h2 id="auth-title" className="auth-title">
          {isLogin ? 'Welcome back' : 'Create an account'}
        </h2>
        <p className="auth-subtitle">
          {isLogin
            ? 'Log in to access your saved CV packages.'
            : 'Sign up to save generated career packages automatically.'}
        </p>

        {error ? <div className="auth-note auth-note-error">{error}</div> : null}
        {msg ? <div className="auth-note auth-note-success">{msg}</div> : null}

        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label className="form-label" htmlFor="auth-email">
              Email Address
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-input"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-input"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-switch">
          <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
          <button
            type="button"
            className="auth-switch-button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
              setMsg(null);
            }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
