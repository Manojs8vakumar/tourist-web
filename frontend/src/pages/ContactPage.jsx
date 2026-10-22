import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Sparkles, Send, UserCheck, ShieldCheck } from 'lucide-react';
import BeginJourneySection from '../components/sections/BeginJourneySection';

export default function ContactPage({ onOpenContactDirect }) {
  const curators = [
    {
      name: 'Manoj Sivakumar',
      title: 'Principal Curator & Founder',
      phone: '+91 93446 83958',
      telHref: 'tel:+919344683958',
      waHref: 'https://wa.me/919344683958?text=Hello%20Manoj%2C%20I%20would%20like%20to%20plan%20a%20luxury%20custom%20tour%20in%20India%20with%20Plan%20My%20Trip%20Agency.',
      email: 'manojsivakumar2004@gmail.com',
      mailHref: 'mailto:manojsivakumar2004@gmail.com?subject=Luxury%20Trip%20Inquiry%20-%20Plan%20My%20Trip%20Agency',
      regions: 'All India & Royal Heritage • Namakkal & Tamil Nadu Corridor',
      status: 'Available Now for Calls & WhatsApp',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Ananya Roy',
      title: 'Senior Himalayan & Wildlife Expeditions Curator',
      phone: '+91 93446 83958',
      telHref: 'tel:+919344683958',
      waHref: 'https://wa.me/919344683958?text=Hi%20Ananya%2C%20I%20am%20interested%20in%20Himalayan%20and%20wildlife%20journeys.',
      email: 'himalayas@planmytrip.agency',
      mailHref: 'mailto:himalayas@planmytrip.agency',
      regions: 'Ladakh, Kashmir, Himachal & Madhya Pradesh Safaris',
      status: 'In Atelier • Quick Reply',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Vikramaditya Rathore',
      title: 'Heritage Palaces & Royal Charters Specialist',
      phone: '+91 93446 83958',
      telHref: 'tel:+919344683958',
      waHref: 'https://wa.me/919344683958?text=Hi%20Vikramaditya%2C%20I%20would%20like%20to%20reserve%20a%20palace%20heritage%20journey.',
      email: 'palaces@planmytrip.agency',
      mailHref: 'mailto:palaces@planmytrip.agency',
      regions: 'Rajasthan, Udaipur, Jodhpur & Royal Trains',
      status: 'On Duty • Available for Consultations',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="contact-page section-padding">
      <div className="container">
        {/* Header */}
        <div className="contact-header text-center">
          <span className="section-tag">DIRECT TRAVEL CONTACT</span>
          <h1 className="section-heading font-serif">
            Direct Line to <em>Our Team</em>.
          </h1>
          <p className="section-subtext" style={{ maxWidth: '720px', margin: '0 auto' }}>
            Skip the automated queues. Connect directly with our personal journey designers via phone, 
            WhatsApp, or email for instant itinerary advice, luxury bookings, and custom quotes.
          </p>
        </div>

        {/* Dedicated Human Contact Persons Showcase */}
        <div className="curators-section">
          <div className="curators-banner">
            <div className="curators-banner-badge">
              <span className="live-dot" /> LIVE DIRECT LINE ON CALL
            </div>
            <h2 className="curators-banner-title font-serif">
              Click to Connect Instantly
            </h2>
            <p className="curators-banner-sub">
              Your message or call is delivered straight to their verified personal mobile device.
            </p>
          </div>

          <div className="curators-grid">
            {curators.map((c, i) => (
              <div key={i} className="curator-direct-card">
                <div className="curator-card-top">
                  <img src={c.avatar} alt={c.name} className="curator-avatar" />
                  <div className="curator-identity">
                    <span className="curator-status-pill">
                      <span className="status-ping" />
                      {c.status}
                    </span>
                    <h3 className="curator-name font-serif">{c.name}</h3>
                    <p className="curator-role">{c.title}</p>
                    <p className="curator-region">{c.regions}</p>
                  </div>
                </div>

                <div className="curator-contact-links">
                  {/* WhatsApp Direct */}
                  <a
                    href={c.waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="direct-action-btn wa-btn"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp Manoj / Curator</span>
                  </a>

                  {/* Direct Phone Call */}
                  <a
                    href={c.telHref}
                    className="direct-action-btn phone-btn"
                  >
                    <Phone size={16} />
                    <span>Call Directly: {c.phone}</span>
                  </a>

                  {/* Direct Email */}
                  <a
                    href={c.mailHref}
                    className="direct-action-btn email-btn"
                  >
                    <Mail size={16} />
                    <span>Send Confidential Email</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Regional Ateliers */}
        <div className="offices-header">
          <span className="section-tag">PHYSICAL ATELIERS & REGIONAL DESKS</span>
          <h2 className="font-serif section-subheading">Our Global Desks</h2>
        </div>

        <div className="offices-grid">
          <div className="office-card">
            <span className="office-flag">INDIA HEADQUARTERS</span>
            <h3 className="font-serif office-city">New Delhi</h3>
            <p className="office-address">
              42 Barakhamba Road, Connaught Place<br />
              New Delhi, 110001, India
            </p>
            <div className="office-contact">
              <a href="tel:+919344683958" className="c-row-link">
                <Phone size={14} className="c-icon" />
                <span>+91 93446 83958 / 011-4982-0000</span>
              </a>
              <a href="mailto:manojsivakumar2004@gmail.com" className="c-row-link">
                <Mail size={14} className="c-icon" />
                <span>delhi@planmytrip.agency</span>
              </a>
              <div className="c-row">
                <Clock size={14} className="c-icon" />
                <span>Mon – Sat • 09:30 to 19:30 IST</span>
              </div>
            </div>
          </div>

          <div className="office-card">
            <span className="office-flag">SOUTHERN SANCTUARY DESK</span>
            <h3 className="font-serif office-city">Namakkal & Tamil Nadu</h3>
            <p className="office-address">
              Rock Fort Corridor Desk, Namakkal Main Road<br />
              Tamil Nadu, 637001, India
            </p>
            <div className="office-contact">
              <a href="tel:+919344683958" className="c-row-link highlight-row">
                <Phone size={14} className="c-icon" />
                <span>+91 93446 83958 (Manoj Sivakumar)</span>
              </a>
              <a href="mailto:manojsivakumar2004@gmail.com" className="c-row-link">
                <Mail size={14} className="c-icon" />
                <span>manojsivakumar2004@gmail.com</span>
              </a>
              <div className="c-row">
                <Clock size={14} className="c-icon" />
                <span>24/7 Dedicated Client Hotlines</span>
              </div>
            </div>
          </div>

          <div className="office-card">
            <span className="office-flag">UNITED KINGDOM DESK</span>
            <h3 className="font-serif office-city">London (Mayfair)</h3>
            <p className="office-address">
              18 Berkeley Square, Mayfair<br />
              London, W1J 6DA, United Kingdom
            </p>
            <div className="office-contact">
              <a href="tel:+442079460912" className="c-row-link">
                <Phone size={14} className="c-icon" />
                <span>+44 20 7946 0912</span>
              </a>
              <a href="mailto:london@planmytrip.agency" className="c-row-link">
                <Mail size={14} className="c-icon" />
                <span>london@planmytrip.agency</span>
              </a>
              <div className="c-row">
                <Clock size={14} className="c-icon" />
                <span>Mon – Fri • 09:00 to 17:30 GMT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inline Enquiry Section */}
      <BeginJourneySection />

      <style>{`
        .contact-page {
          padding-top: 8.5rem;
          background: #f8fafc;
        }
        .contact-header {
          margin-bottom: 3.5rem;
        }
        .curators-section {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 2.5rem;
          margin-bottom: 4rem;
          box-shadow: 0 10px 30px rgba(10, 25, 47, 0.05);
        }
        .curators-banner {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .curators-banner-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #dbeafe;
          color: #1e40af;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.35rem 0.85rem;
          border-radius: 20px;
          letter-spacing: 0.08em;
          margin-bottom: 0.75rem;
        }
        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2563eb;
          box-shadow: 0 0 8px #2563eb;
        }
        .curators-banner-title {
          font-size: 2rem;
          color: #0a192f;
          margin-bottom: 0.5rem;
        }
        .curators-banner-sub {
          font-size: 0.95rem;
          color: #64748b;
        }
        .curators-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
        .curator-direct-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
        }
        .curator-direct-card:hover {
          border-color: #2563eb;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.12);
          background: #ffffff;
        }
        .curator-card-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .curator-avatar {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #2563eb;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
          margin-bottom: 1rem;
        }
        .curator-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #ecfdf5;
          color: #065f46;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          margin-bottom: 0.5rem;
        }
        .status-ping {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
        }
        .curator-name {
          font-size: 1.35rem;
          color: #0a192f;
          margin-bottom: 0.25rem;
        }
        .curator-role {
          font-size: 0.8rem;
          color: #2563eb;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .curator-region {
          font-size: 0.8rem;
          color: #64748b;
          line-height: 1.4;
        }
        .curator-contact-links {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .direct-action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.7rem 1rem;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .wa-btn {
          background: #25d366;
          color: #ffffff;
        }
        .wa-btn:hover {
          background: #1eb857;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.35);
        }
        .phone-btn {
          background: #1e3a8a;
          color: #ffffff;
        }
        .phone-btn:hover {
          background: #1d4ed8;
          box-shadow: 0 4px 12px rgba(30, 58, 138, 0.35);
        }
        .email-btn {
          background: #ffffff;
          color: #334155;
          border: 1px solid #cbd5e1;
        }
        .email-btn:hover {
          background: #f1f5f9;
          color: #0a192f;
          border-color: #94a3b8;
        }
        .offices-header {
          margin-bottom: 2rem;
        }
        .offices-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .office-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 2.25rem;
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        .office-card:hover {
          border-color: #2563eb;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(10, 25, 47, 0.08);
        }
        .office-flag {
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #2563eb;
          font-weight: 700;
          display: block;
          margin-bottom: 0.65rem;
        }
        .office-city {
          font-size: 1.6rem;
          color: #0a192f;
          margin-bottom: 0.65rem;
        }
        .office-address {
          font-size: 0.88rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          min-height: 44px;
        }
        .office-contact {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          border-top: 1px solid #e2e8f0;
          padding-top: 1.25rem;
          font-size: 0.85rem;
        }
        .c-row, .c-row-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #475569;
          text-decoration: none;
        }
        .c-row-link:hover {
          color: #2563eb;
        }
        .highlight-row {
          color: #1e3a8a;
          font-weight: 700;
        }
        .c-icon {
          color: #2563eb;
          flex-shrink: 0;
        }
        @media (max-width: 1024px) {
          .curators-grid, .offices-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
