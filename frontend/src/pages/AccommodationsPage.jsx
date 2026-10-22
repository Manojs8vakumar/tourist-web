import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Check, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import BeginJourneySection from '../components/sections/BeginJourneySection';

export default function AccommodationsPage({ onOpenEnquiry }) {
  const [accommodations, setAccommodations] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getAccommodations()
      .then(setAccommodations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const types = ['All', 'Palace Hotel', 'Boutique Resort', 'Backwater Stay', 'Nature Lodge', 'Private Villa'];

  const filtered = selectedType === 'All'
    ? accommodations
    : accommodations.filter(a => a.accommodationType === selectedType);

  return (
    <div className="accommodations-page section-padding">
      <div className="container">
        {/* Header */}
        <div className="acc-page-header">
          <span className="section-tag">THE HOSPITALITY ATLAS</span>
          <h1 className="section-heading font-serif">
            Exceptional Places <em>to Stay</em>.
          </h1>
          <p className="section-subtext">
            From imperial Rajasthan palaces with peacocks wandering the gardens to remote high-altitude luxury camps under Himalayan skies.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="acc-filter-strip">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`acc-filter-pill ${selectedType === t ? 'active' : ''}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="loading-state">Loading hotel directory...</div>
        ) : (
          <div className="acc-full-grid">
            {filtered.map(item => (
              <div key={item.id} className="acc-full-card animate-fade-in">
                <div className="acc-full-media">
                  <img src={item.image} alt={item.name} className="acc-full-img" />
                  <span className="acc-full-badge">{item.accommodationType}</span>
                  <span className="acc-full-cat">{item.priceCategory}</span>
                </div>

                <div className="acc-full-body">
                  <div className="acc-loc">
                    <MapPin size={14} className="pin" />
                    <span>{item.destinationName || item.locationDetails}</span>
                  </div>

                  <h3 className="acc-full-name font-serif">{item.name}</h3>
                  <p className="acc-full-desc">{item.description}</p>

                  <div className="acc-amenities-wrap">
                    {item.amenities && item.amenities.split(',').map((am, i) => (
                      <span key={i} className="am-pill">
                        <Check size={12} className="am-chk" /> {am.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="acc-full-footer">
                    <button
                      onClick={() => onOpenEnquiry(item.name)}
                      className="btn-gold acc-book-btn"
                    >
                      Enquire for Stay
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BeginJourneySection />

      <style>{`
        .accommodations-page {
          padding-top: 8.5rem;
        }
        .acc-page-header {
          margin-bottom: 2.5rem;
        }
        .acc-filter-strip {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 3.5rem;
        }
        .acc-filter-pill {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 0.65rem 1.4rem;
          font-size: 0.85rem;
          cursor: pointer;
          color: var(--text-secondary);
          transition: var(--transition);
        }
        .acc-filter-pill:hover {
          border-color: var(--accent-gold);
        }
        .acc-filter-pill.active {
          background: var(--text-primary);
          border-color: var(--text-primary);
          color: #ffffff;
        }
        .acc-full-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }
        .acc-full-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 2px;
          overflow: hidden;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }
        .acc-full-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: rgba(195, 154, 52, 0.4);
        }
        .acc-full-media {
          position: relative;
          height: 250px;
          overflow: hidden;
        }
        .acc-full-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .acc-full-card:hover .acc-full-img {
          transform: scale(1.06);
        }
        .acc-full-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(20, 19, 17, 0.85);
          color: #ffffff;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          font-weight: 600;
        }
        .acc-full-cat {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.95);
          color: var(--accent-gold-hover);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.3rem 0.7rem;
        }
        .acc-full-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .acc-loc {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 0.4rem;
        }
        .pin {
          color: var(--accent-gold);
        }
        .acc-full-name {
          font-size: 1.55rem;
          margin-bottom: 0.75rem;
        }
        .acc-full-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        .acc-amenities-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 1.75rem;
        }
        .am-pill {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 0.25rem 0.55rem;
          font-size: 0.72rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .am-chk {
          color: var(--accent-gold);
        }
        .acc-full-footer {
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
        }
        .acc-book-btn {
          width: 100%;
          justify-content: center;
          font-size: 0.82rem;
        }
        @media (max-width: 1080px) {
          .acc-full-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .acc-full-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
