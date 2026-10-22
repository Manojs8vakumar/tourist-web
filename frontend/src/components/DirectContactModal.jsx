import React from 'react';
import { X, Phone, MessageSquare, Mail, MapPin, User, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DirectContactModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const curators = [
    {
      name: 'Manoj Sivakumar',
      role: 'Lead Subcontinental Curator & Director',
      specialty: 'Tamil Nadu Heritage, South India Temples, Bespoke 3-7 Day Route Optimization',
      location: 'Namakkal & Chennai, Tamil Nadu',
      phone: '+91 93446 83958',
      email: 'manojsivakumar2004@gmail.com',
      whatsappUrl: 'https://wa.me/919344683958?text=Hello%20Manoj,%20I%20would%20like%20to%20plan%20a%20custom%20tour%20with%20Plan%20My%20Trip%20Agency.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      badge: 'DIRECT CONTACT LEAD'
    },
    {
      name: 'Devika Ranawat',
      role: 'Senior Heritage & Palace Specialist',
      specialty: 'Rajasthan Royal Living Forts, Lake Pichola Charters, Vintage Car Routes',
      location: 'Jaipur & Udaipur, Rajasthan',
      phone: '+91 98111 22334',
      email: 'devika@planmytrip.agency',
      whatsappUrl: 'https://wa.me/919344683958?text=Hello%20Devika,%20I%20would%20like%20to%20plan%20a%20Rajasthan%20Palace%20itinerary.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      badge: 'PALACE & HERITAGE'
    },
    {
      name: 'Arjun Mathur',
      role: 'Head of Wildlife & High Alpine Expeditions',
      specialty: 'Bandhavgarh & Kanha Tiger Safaris, Ladakh High Mountain Passes, Kashmir Houseboats',
      location: 'New Delhi & Leh, Ladakh',
      phone: '+91 98222 33445',
      email: 'arjun@planmytrip.agency',
      whatsappUrl: 'https://wa.me/919344683958?text=Hello%20Arjun,%20I%20am%20interested%20in%20a%20wildlife%20safari%20or%20mountain%20expedition.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      badge: 'WILDLIFE & ALPS'
    }
  ];

  return (
    <div className="contact-modal-overlay animate-fade-in" onClick={onClose}>
      <div className="contact-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="c-modal-close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        <div className="c-modal-header">
          <span className="section-tag">DIRECT CONTACT PERSONS</span>
          <h2 className="c-modal-title font-serif">Speak Directly with Our Travel Team</h2>
          <p className="c-modal-sub">
            Click any direct link below to start an instant WhatsApp conversation or initiate a phone call with your personal journey planner.
          </p>
        </div>

        <div className="curators-cards-list">
          {curators.map((c) => (
            <div key={c.name} className="curator-item-card">
              <div className="c-profile-col">
                <img src={c.avatar} alt={c.name} className="c-avatar" />
                <span className="c-badge">{c.badge}</span>
              </div>

              <div className="c-info-col">
                <div className="c-name-row">
                  <h3 className="c-name font-serif">{c.name}</h3>
                  <span className="c-role">{c.role}</span>
                </div>

                <p className="c-specialty">🎯 <strong>Specialty:</strong> {c.specialty}</p>

                <div className="c-loc-row">
                  <MapPin size={13} className="c-pin" />
                  <span>{c.location}</span>
                </div>

                {/* Direct Action Links */}
                <div className="c-direct-actions">
                  <a
                    href={c.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="direct-link whatsapp"
                  >
                    <MessageSquare size={16} />
                    <span>WhatsApp Direct</span>
                  </a>

                  <a
                    href={`tel:${c.phone.replace(/[^0-9+]/g, '')}`}
                    className="direct-link phone"
                  >
                    <Phone size={16} />
                    <span>Call {c.phone}</span>
                  </a>

                  <a
                    href={`mailto:${c.email}?subject=Trip%20Planning%20Inquiry`}
                    className="direct-link email"
                  >
                    <Mail size={16} />
                    <span>Email Direct</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="c-modal-footer">
          <p>⚡ All contact lines are active daily <strong>09:00 to 20:30 IST</strong>. Direct WhatsApp messages typically answered in under 15 minutes.</p>
        </div>
      </div>

      <style>{`
        .contact-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 25, 47, 0.82);
          backdrop-filter: blur(10px);
          z-index: 2200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          overflow-y: auto;
        }
        .contact-modal-card {
          background: #ffffff;
          width: 100%;
          max-width: 860px;
          border-radius: 6px;
          border: 1px solid var(--border-blue);
          box-shadow: 0 25px 60px rgba(10, 25, 47, 0.35);
          position: relative;
          padding: 3rem;
          max-height: 92vh;
          overflow-y: auto;
        }
        .c-modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: var(--transition);
        }
        .c-modal-close:hover {
          color: var(--text-primary);
        }
        .c-modal-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .c-modal-title {
          font-size: 2.4rem;
          color: var(--text-primary);
          margin: 0.35rem 0 0.5rem;
        }
        .c-modal-sub {
          font-size: 0.95rem;
          color: var(--text-secondary);
          max-width: 620px;
          margin: 0 auto;
        }
        .curators-cards-list {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          margin-bottom: 2rem;
        }
        .curator-item-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 1.75rem;
          border-radius: 4px;
          display: grid;
          grid-template-columns: 140px 1fr;
          gap: 2rem;
          align-items: center;
          transition: var(--transition);
        }
        .curator-item-card:hover {
          border-color: var(--accent-blue);
          box-shadow: var(--shadow-sm);
        }
        .c-profile-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .c-avatar {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--accent-blue);
          margin-bottom: 0.5rem;
        }
        .c-badge {
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #ffffff;
          background: var(--accent-blue-gradient);
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          font-weight: 700;
        }
        .c-info-col {
          display: flex;
          flex-direction: column;
        }
        .c-name-row {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 0.35rem;
        }
        .c-name {
          font-size: 1.6rem;
          color: var(--text-primary);
        }
        .c-role {
          font-size: 0.8rem;
          color: var(--accent-blue);
          font-weight: 600;
        }
        .c-specialty {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 0.5rem;
        }
        .c-loc-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 1.25rem;
        }
        .c-pin {
          color: var(--accent-blue);
        }
        .c-direct-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .direct-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.15rem;
          border-radius: 4px;
          font-size: 0.82rem;
          font-weight: 600;
          transition: var(--transition);
        }
        .direct-link.whatsapp {
          background: #25d366;
          color: #ffffff;
        }
        .direct-link.whatsapp:hover {
          background: #1eb954;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);
        }
        .direct-link.phone {
          background: var(--accent-blue);
          color: #ffffff;
        }
        .direct-link.phone:hover {
          background: var(--accent-blue-dark);
          transform: translateY(-2px);
          box-shadow: var(--accent-blue-glow);
        }
        .direct-link.email {
          background: #ffffff;
          border: 1px solid var(--border-light);
          color: var(--text-primary);
        }
        .direct-link.email:hover {
          border-color: var(--accent-blue);
          color: var(--accent-blue);
        }
        .c-modal-footer {
          border-top: 1px solid var(--border-light);
          padding-top: 1.25rem;
          text-align: center;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        @media (max-width: 720px) {
          .curator-item-card {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .c-name-row {
            justify-content: center;
          }
          .c-loc-row {
            justify-content: center;
          }
          .c-direct-actions {
            justify-content: center;
          }
          .contact-modal-card {
            padding: 2rem 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
