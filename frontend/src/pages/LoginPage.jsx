import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.login({ username, password });
      localStorage.setItem('pmt_user', JSON.stringify(res));
      if (res.role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (userType) => {
    if (userType === 'admin') {
      setUsername('admin');
      setPassword('Admin@123');
    } else {
      setUsername('guest');
      setPassword('Guest@123');
    }
  };

  return (
    <div className="auth-page section-padding">
      <div className="container auth-container">
        <div className="auth-card">
          <span className="section-tag">SIGN IN TO PLAN MY TRIP</span>
          <h1 className="auth-title font-serif">Welcome Back</h1>
          <p className="auth-sub">Access your private travel dossiers, curated proposals, and preferences.</p>

          {error && (
            <div className="auth-alert error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="auth-field">
              <label>Username or Email Address</label>
              <input
                type="text"
                required
                placeholder="e.g. admin or guest"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label>Private Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-gold auth-btn">
              {loading ? 'Authenticating...' : 'Sign In'}
              <ArrowRight size={15} />
            </button>
          </form>

          {/* 1-Click Quick Demo Credentials */}
          <div className="demo-credentials-box">
            <span className="demo-head">TESTING QUICK SHORTCUTS</span>
            <div className="demo-btns">
              <button
                type="button"
                onClick={() => handleFillDemo('customer')}
                className="demo-btn"
              >
                Fill Demo Customer (guest / Guest@123)
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="demo-btn admin"
              >
                Fill Demo Curator Admin (admin / Admin@123)
              </button>
            </div>
          </div>

          <div className="auth-footer-nav">
            <span>Do not have an account yet?</span>
            <Link to="/register" className="auth-link">Register for Private Access</Link>
          </div>
        </div>
      </div>

      <style>{`
        .auth-page {
          padding-top: 8.5rem;
          min-height: 80vh;
          display: flex;
          align-items: center;
        }
        .auth-container {
          max-width: 520px;
        }
        .auth-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 3.5rem 3rem;
          border-radius: 2px;
          box-shadow: var(--shadow-md);
        }
        .auth-title {
          font-size: 2.4rem;
          margin: 0.35rem 0 0.5rem;
        }
        .auth-sub {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          line-height: 1.5;
        }
        .auth-alert {
          padding: 0.75rem 1rem;
          border-radius: 2px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }
        .auth-alert.error {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .auth-field label {
          font-size: 0.74rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .auth-field input {
          border: 1px solid var(--border-light);
          padding: 0.8rem 1rem;
          font-size: 0.92rem;
          background: var(--bg-primary);
          color: var(--text-primary);
          outline: none;
          transition: var(--transition);
        }
        .auth-field input:focus {
          border-color: var(--accent-gold);
          background: #ffffff;
        }
        .auth-btn {
          width: 100%;
          justify-content: center;
          padding: 0.95rem;
          margin-top: 0.5rem;
        }
        .demo-credentials-box {
          background: var(--bg-primary);
          border: 1px dashed var(--accent-gold);
          padding: 1.25rem;
          border-radius: 2px;
          margin-bottom: 2rem;
        }
        .demo-head {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          font-weight: 700;
          display: block;
          margin-bottom: 0.65rem;
          text-align: center;
        }
        .demo-btns {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .demo-btn {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 0.55rem 0.85rem;
          font-size: 0.78rem;
          cursor: pointer;
          color: var(--text-primary);
          transition: var(--transition);
          text-align: center;
        }
        .demo-btn:hover {
          border-color: var(--accent-gold);
          background: var(--accent-gold-subtle);
        }
        .demo-btn.admin {
          border-color: rgba(195, 154, 52, 0.4);
          font-weight: 600;
        }
        .auth-footer-nav {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .auth-link {
          color: var(--accent-gold);
          font-weight: 600;
        }
        .auth-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
