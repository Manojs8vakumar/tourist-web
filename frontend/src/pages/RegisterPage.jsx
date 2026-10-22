import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.register(formData);
      localStorage.setItem('pmt_user', JSON.stringify(res));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page section-padding">
      <div className="container auth-container">
        <div className="auth-card">
          <span className="section-tag">JOIN PLAN MY TRIP AGENCY</span>
          <h1 className="auth-title font-serif">Create Account</h1>
          <p className="auth-sub">Register to save bespoke itineraries, review quotations, and track active passages.</p>

          {error && (
            <div className="auth-alert error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="auth-form">
            <div className="auth-field">
              <label>Full Legal Name *</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="e.g. Manoj Sivakumar"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="auth-field">
              <label>Username *</label>
              <input
                type="text"
                name="username"
                required
                placeholder="e.g. manoj29"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="auth-field">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="e.g. manojsivakumar2004@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="auth-field">
              <label>Phone / WhatsApp</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 93446 83958"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="auth-field">
              <label>Private Password *</label>
              <input
                type="password"
                name="password"
                required
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-gold auth-btn">
              {loading ? 'Creating Account...' : 'Complete Registration'}
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="auth-footer-nav">
            <span>Already have an account?</span>
            <Link to="/login" className="auth-link">Sign In Here</Link>
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
          gap: 1.1rem;
          margin-bottom: 2rem;
        }
        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .auth-field label {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .auth-field input {
          border: 1px solid var(--border-light);
          padding: 0.75rem 0.95rem;
          font-size: 0.9rem;
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
      `}</style>
    </div>
  );
}
