import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';

export default function Footer({ onOpenContactDirect }) {
  const [newsEmail, setNewsEmail] = useState('');
  const [newsName, setNewsName] = useState('');
  const [subStatus, setSubStatus] = useState(null); // 'loading', 'success', 'error'
  const [subMsg, setSubMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsEmail) return;
    setSubStatus('loading');
    try {
      const res = await api.subscribeNewsletter({
        name: newsName || 'Valued Traveller',
        email: newsEmail
      });
      setSubStatus('success');
      setSubMsg(res.message || 'Thank you for subscribing to our private dispatches.');
      setNewsEmail('');
      setNewsName('');
    } catch (err) {
      setSubStatus('error');
      setSubMsg(err.message || 'Subscription failed. Please verify your email.');
    }
  };

  const destinations = [
    { name: 'Rajasthan', path: '/destinations/rajasthan' },
    { name: 'Kashmir', path: '/destinations/kashmir' },
    { name: 'Ladakh', path: '/destinations/ladakh' },
    { name: 'Kerala', path: '/destinations/kerala' },
    { name: 'Himachal Pradesh', path: '/destinations/himachal-pradesh' },
    { name: 'Sikkim & Darjeeling', path: '/destinations/sikkim' },
    { name: 'Madhya Pradesh', path: '/destinations/madhya-pradesh' },
    { name: 'Uttar Pradesh', path: '/destinations/uttar-pradesh' },
    { name: 'Uttarakhand', path: '/destinations/uttarakhand' },
    { name: 'South India', path: '/destinations/south-india' },
    { name: 'Andaman Islands', path: '/destinations/andaman-islands' },
    { name: 'North-East India', path: '/destinations/north-east-india' }
  ];

  return (
    <footer className="site-footer">
      {/* Newsletter Dispatch Bar */}
      <div className="newsletter-strip">
        <div className="container newsletter-content">
          <div className="newsletter-text">
            <span className="section-tag">THE PRIVATE DISPATCH</span>
            <h3 className="newsletter-title font-serif">Curated stories, seasonal invitations & secret hideaways.</h3>
            <p className="newsletter-subtitle">
              Delivered thoughtfully into your inbox once a fortnight. No spam, purely refined travel literature.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <div className="form-inputs">
              <input
                type="text"
                placeholder="Your Full Name"
                value={newsName}
                onChange={(e) => setNewsName(e.target.value)}
                className="news-input"
              />
              <input
                type="email"
                placeholder="Your Email Address *"
                required
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                className="news-input"
              />
            </div>
            <button
              type="submit"
              disabled={subStatus === 'loading'}
              className="btn-gold news-submit"
            >
              {subStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              <ArrowRight size={16} />
            </button>
            {subStatus === 'success' && (
              <p className="news-feedback success">
                <CheckCircle2 size={16} /> {subMsg}
              </p>
            )}
            {subStatus === 'error' && (
              <p className="news-feedback error">{subMsg}</p>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <Compass className="compass-icon" size={28} />
              <div className="brand-text">
                <span className="footer-brand-name">PLAN MY TRIP</span>
                <span className="footer-brand-sub">AGENCY</span>
              </div>
            </Link>
            <p className="footer-tagline">"Every Journey Has a Story."</p>
            <p className="footer-desc">
              A bespoke luxury travel studio devoted to slow, immersive journeys across the Indian subcontinent and beyond. Crafted by private curators, historians and passionate storytellers.
            </p>
            <div className="footer-contact-items">
              <div className="contact-item">
                <MapPin size={16} className="contact-icon" />
                <span>Connaught Place, New Delhi & Namakkal, Tamil Nadu</span>
              </div>
              <a href="tel:+919344683958" className="contact-item contact-item-link" title="Call Manoj Sivakumar">
                <Phone size={16} className="contact-icon" />
                <span>+91 93446 83958 (Manoj Sivakumar)</span>
              </a>
              <a href="mailto:manojsivakumar2004@gmail.com" className="contact-item contact-item-link" title="Email Manoj Sivakumar">
                <Mail size={16} className="contact-icon" />
                <span>manojsivakumar2004@gmail.com</span>
              </a>
              <div style={{ marginTop: '0.65rem' }}>
                <button
                  type="button"
                  onClick={onOpenContactDirect}
                  className="footer-direct-pill"
                >
                  <Phone size={13} />
                  <span>Direct Contact (+91 93446 83958)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Destinations Column */}
          <div className="footer-col">
            <h4 className="footer-heading">India Destinations</h4>
            <div className="footer-dest-grid">
              {destinations.map((d) => (
                <Link key={d.name} to={d.path} className="footer-link">
                  {d.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Experiences & Stays</h4>
            <ul className="footer-links-list">
              <li><Link to="/packages?mood=Romance" className="footer-link">Romantic Escapes</Link></li>
              <li><Link to="/packages?mood=Heritage" className="footer-link">Palaces & Living Forts</Link></li>
              <li><Link to="/packages?mood=Wildlife" className="footer-link">Royal Bengal Tiger Safaris</Link></li>
              <li><Link to="/packages?mood=Backwaters" className="footer-link">Private Kettuvallam Cruises</Link></li>
              <li><Link to="/packages?mood=Himalaya" className="footer-link">High Alpine Sanctuaries</Link></li>
              <li><Link to="/accommodations" className="footer-link">Palace Hotels of India</Link></li>
              <li><Link to="/journal" className="footer-link">The Travel Journal</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-col">
            <h4 className="footer-heading">The Agency</h4>
            <ul className="footer-links-list">
              <li><Link to="/about" className="footer-link">Our Philosophy & Curators</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Concierge</Link></li>
              <li><Link to="/login" className="footer-link">Traveller Sign In</Link></li>
              <li><Link to="/admin" className="footer-link">Curator Portal (Admin)</Link></li>
              <li><a href="#enquiry" className="footer-link">Request Bespoke Proposal</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Plan My Trip Agency Pvt. Ltd. All rights reserved. Demonstration content for editorial showcase.
          </p>
          <div className="legal-links">
            <Link to="/about" className="legal-link">Privacy Policy</Link>
            <Link to="/about" className="legal-link">Terms & Conditions</Link>
            <Link to="/contact" className="legal-link">Guest Protection</Link>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--bg-dark);
          color: #e5e0d8;
          padding-top: 0;
          font-size: 0.92rem;
        }
        .newsletter-strip {
          background-color: #1a1815;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 4.5rem 0;
        }
        .newsletter-content {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        .newsletter-title {
          font-size: 2rem;
          color: #fbf9f5;
          margin-bottom: 0.75rem;
          font-weight: 300;
        }
        .newsletter-subtitle {
          color: #a8a095;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .form-inputs {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .news-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 0.85rem 1.1rem;
          font-size: 0.9rem;
          outline: none;
          transition: var(--transition);
        }
        .news-input:focus {
          border-color: var(--accent-gold);
          background: rgba(255, 255, 255, 0.09);
        }
        .news-submit {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .news-feedback {
          margin-top: 0.75rem;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .news-feedback.success {
          color: #6ee7b7;
        }
        .news-feedback.error {
          color: #fca5a5;
        }
        .footer-main {
          padding-top: 5rem;
          padding-bottom: 3rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1.2fr 1fr 1fr;
          gap: 3.5rem;
          margin-bottom: 4rem;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          color: #fbf9f5;
          margin-bottom: 1.25rem;
        }
        .footer-brand-name {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          letter-spacing: 0.12em;
          line-height: 1;
          display: block;
        }
        .footer-brand-sub {
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          color: var(--accent-gold);
          font-weight: 600;
          display: block;
          margin-top: 2px;
        }
        .footer-tagline {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-style: italic;
          color: var(--accent-gold);
          margin-bottom: 1rem;
        }
        .footer-desc {
          color: #a39c90;
          font-size: 0.88rem;
          line-height: 1.7;
          margin-bottom: 1.75rem;
        }
        .footer-contact-items {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.86rem;
          color: #c4bcb0;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }
        .contact-item-link {
          text-decoration: none;
          color: #c4bcb0;
          transition: all 0.2s ease;
        }
        .contact-item-link:hover {
          color: #60a5fa;
          padding-left: 2px;
        }
        .footer-direct-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #1d4ed8;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.45rem 0.85rem;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .footer-direct-pill:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
        }
        .contact-icon {
          color: var(--accent-gold);
          flex-shrink: 0;
        }
        .footer-heading {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: #ffffff;
          margin-bottom: 1.5rem;
          letter-spacing: 0.04em;
          font-weight: 400;
        }
        .footer-dest-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem 1rem;
        }
        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .footer-link {
          color: #a8a095;
          font-size: 0.88rem;
          transition: var(--transition);
        }
        .footer-link:hover {
          color: var(--accent-gold);
          padding-left: 4px;
        }
        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
          color: #7d766b;
        }
        .legal-links {
          display: flex;
          gap: 1.75rem;
        }
        .legal-link {
          color: #7d766b;
        }
        .legal-link:hover {
          color: #e5e0d8;
        }
        @media (max-width: 1024px) {
          .newsletter-content {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }
        @media (max-width: 640px) {
          .form-inputs {
            flex-direction: column;
          }
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
