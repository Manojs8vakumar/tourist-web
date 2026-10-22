import React, { useEffect, useState } from 'react';
import { MessageSquare, Phone, Send, CheckCircle2 } from 'lucide-react';

function useCountdown(targetIso) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const ms = Math.max(0, new Date(targetIso).getTime() - now);
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60
  };
}

export default function AboutReserve({ selectedMission = 'Sovereign Grand Tour', onOpenEnquiry }) {
  const [currentMission, setCurrentMission] = useState(selectedMission);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const t = useCountdown('2031-07-20T20:17:00Z');

  useEffect(() => {
    if (selectedMission) setCurrentMission(selectedMission);
  }, [selectedMission]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setStatus('invalid');
      return;
    }
    window.open(
      `https://wa.me/919344683958?text=Hello%20Manoj%2C%20I%20have%20submitted%20my%20manifest%20entry%20for%20the%20${encodeURIComponent(currentMission)}.%0AName%3A%20${encodeURIComponent(name)}%0AEmail%3A%20${encodeURIComponent(email)}`,
      '_blank'
    );
    setStatus('sent');
    if (onOpenEnquiry) {
      onOpenEnquiry(currentMission);
    }
  };

  const units = [
    ['Days', t.d],
    ['Hrs', t.h],
    ['Min', t.m],
    ['Sec', t.s]
  ];

  return (
    <section id="reserve" className="reserve-manifest-section">
      <div className="reserve-container">
        <div className="reserve-grid">
          {/* Left Column: Info & Countdown */}
          <div className="reserve-info-col">
            <span className="reserve-eyebrow font-mono">
              RESERVE · MANIFEST
            </span>
            <h2 className="reserve-title font-display">
              Put your name on the manifest.
            </h2>
            <p className="reserve-lead">
              No payment, no commitment. Curated personally by lead concierge Manoj Sivakumar (+91 93446 83958). We will write when your private window opens.
            </p>

            <div className="countdown-box">
              <span className="countdown-label font-mono">NEXT PRIVATE SEASONAL WINDOW</span>
              <div className="countdown-row">
                {units.map(([label, v]) => (
                  <div key={label} className="countdown-card">
                    <span className="countdown-val font-display">{String(v).padStart(2, '0')}</span>
                    <span className="countdown-unit font-mono">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="reserve-form-col">
            <form onSubmit={onSubmit} className="manifest-form">
              <div className="form-field">
                <label className="field-label font-mono">FULL NAME</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setStatus('idle');
                  }}
                  placeholder="As it should appear on the manifest"
                  className="field-input"
                />
              </div>

              <div className="form-field">
                <label className="field-label font-mono">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus('idle');
                  }}
                  placeholder="you@domain.com"
                  className="field-input"
                />
              </div>

              <div className="form-field">
                <label className="field-label font-mono">EXPEDITION CLASS</label>
                <select
                  value={currentMission}
                  onChange={(e) => setCurrentMission(e.target.value)}
                  className="field-input field-select"
                >
                  <option value="Subcontinental Passage">
                    Subcontinental Passage — 6 days
                  </option>
                  <option value="Sovereign Grand Tour">
                    Sovereign Grand Tour — 10 days (Featured)
                  </option>
                  <option value="Deep Heritage Resident">
                    Deep Heritage Resident — 28 days
                  </option>
                </select>
              </div>

              <button type="submit" className="manifest-submit-btn font-mono">
                ADD ME TO THE MANIFEST
              </button>

              {status === 'invalid' && (
                <p className="status-msg error">
                  Please provide both your name and a valid email address.
                </p>
              )}
              {status === 'sent' && (
                <p className="status-msg success">
                  <CheckCircle2 size={16} /> Added to manifest. WhatsApp concierge connection initiated!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .reserve-manifest-section {
          background: #05070c;
          padding: 5rem 0 6rem;
          color: #c9ccd3;
          width: 100%;
          max-width: 100vw;
          overflow-x: clip;
          position: relative;
        }
        .reserve-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .reserve-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 4rem;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 4rem;
        }
        .reserve-eyebrow {
          font-size: 0.72rem;
          color: #6fb6ff;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .reserve-title {
          font-size: clamp(2rem, 3.8vw, 3rem);
          color: #ffffff;
          margin-top: 0.5rem;
          line-height: 1.2;
        }
        .reserve-lead {
          font-size: 0.95rem;
          color: #8b909b;
          line-height: 1.7;
          margin-top: 1rem;
          max-width: 480px;
        }
        .countdown-box {
          margin-top: 2.5rem;
        }
        .countdown-label {
          font-size: 0.7rem;
          color: #8b909b;
          letter-spacing: 0.14em;
          display: block;
          margin-bottom: 0.75rem;
        }
        .countdown-row {
          display: flex;
          gap: 0.75rem;
        }
        .countdown-card {
          background: #0b0f18;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 8px;
          padding: 0.85rem 1.2rem;
          text-align: center;
          min-width: 72px;
        }
        .countdown-val {
          font-size: 1.8rem;
          color: #ffffff;
          font-weight: 700;
          display: block;
          line-height: 1.1;
        }
        .countdown-unit {
          font-size: 0.65rem;
          color: #8b909b;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 0.25rem;
          display: block;
        }
        .manifest-form {
          background: #0b0f18;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .field-label {
          font-size: 0.68rem;
          color: #8b909b;
          letter-spacing: 0.12em;
        }
        .field-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          padding: 0.85rem 1rem;
          color: #ffffff;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s ease;
        }
        .field-input:focus {
          border-color: #6fb6ff;
          background: rgba(255, 255, 255, 0.08);
        }
        .field-select {
          cursor: pointer;
        }
        .field-select option {
          background: #0b0f18;
          color: #ffffff;
        }
        .manifest-submit-btn {
          background: #ffffff;
          color: #05070c;
          border: none;
          padding: 1rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 0.5rem;
        }
        .manifest-submit-btn:hover {
          background: #6fb6ff;
        }
        .status-msg {
          font-size: 0.82rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .status-msg.error {
          color: #f87171;
        }
        .status-msg.success {
          color: #4ade80;
        }
        @media (max-width: 900px) {
          .reserve-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .manifest-form {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
