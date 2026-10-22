import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, ArrowRight, Sparkles, Check, Star } from 'lucide-react';
import { api } from '../../services/api';

export default function WhereToStay({ onOpenEnquiry }) {
  const [accommodations, setAccommodations] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAccommodations()
      .then(data => setAccommodations(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const types = ['All', 'Palace Hotel', 'Boutique Resort', 'Backwater Stay', 'Nature Lodge', 'Private Villa'];

  const filtered = selectedType === 'All'
    ? accommodations
    : accommodations.filter(a => a.accommodationType === selectedType);

  return (
    <section id="where-to-stay" className="where-to-stay-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="stay-header">
          <div className="stay-title-block">
            <span className="section-tag">06 / LUXURY SANCTUARIES</span>
            <h2 className="section-heading">
              Exceptional places <em>to stay</em>.
            </h2>
          </div>
          <p className="section-subtext">
            From the 250-year-old floating white marble of Udaipur to private thatched villas hidden deep within the mangrove canopies of the Andamans. We partner with India’s most storied luxury sanctuaries.
          </p>
        </div>

        {/* Property Type Filter Chips */}
        <div className="type-filter-strip">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`type-chip ${selectedType === t ? 'active' : ''}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Disclaimer Bar */}
        <div className="stay-demo-notice">
          <Sparkles size={14} className="notice-icon" />
          <span>Curated Demonstration Accommodation Showcase • Partner properties subject to private availability inquiry</span>
        </div>

        {/* Accommodation Cards Grid */}
        {loading ? (
          <div className="loading-msg">Consulting hotel partners...</div>
        ) : (
          <div className="accommodations-grid">
            {filtered.map((acc) => (
              <div key={acc.id} className="stay-card animate-fade-in">
                <div className="stay-media">
                  <img
                    src={acc.image}
                    alt={acc.name}
                    className="stay-img"
                    loading="lazy"
                  />
                  <span className="stay-type-badge">{acc.accommodationType}</span>
                  <span className="stay-price-category">{acc.priceCategory}</span>
                </div>

                <div className="stay-body">
                  <div className="stay-location">
                    <MapPin size={13} className="loc-icon" />
                    <span>{acc.destinationName || acc.locationDetails}</span>
                  </div>

                  <h3 className="stay-name font-serif">{acc.name}</h3>
                  <p className="stay-desc">{acc.description}</p>

                  <div className="amenities-row">
                    {acc.amenities && acc.amenities.split(',').slice(0, 3).map((amenity, i) => (
                      <span key={i} className="amenity-pill">
                        <Check size={11} className="check-icon" /> {amenity.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="stay-footer">
                    <button
                      onClick={() => onOpenEnquiry(acc.name)}
                      className="btn-secondary stay-btn"
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

        {/* Link to dedicated accommodations page */}
        <div className="stay-all-cta">
          <Link to="/accommodations" className="btn-primary">
            Explore All 20+ Heritage Accommodations
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <style>{`
        .where-to-stay-section {
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-light);
        }
        .stay-header {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: flex-end;
          margin-bottom: 3rem;
        }
        .type-filter-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .type-chip {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 0.65rem 1.4rem;
          font-size: 0.85rem;
          border-radius: 2px;
          cursor: pointer;
          color: var(--text-secondary);
          transition: var(--transition);
        }
        .type-chip:hover {
          border-color: var(--accent-gold);
        }
        .type-chip.active {
          background: var(--text-primary);
          border-color: var(--text-primary);
          color: #ffffff;
        }
        .stay-demo-notice {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.78rem;
          margin-bottom: 3rem;
        }
        .accommodations-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .stay-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 2px;
          overflow: hidden;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }
        .stay-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: rgba(195, 154, 52, 0.45);
        }
        .stay-media {
          position: relative;
          height: 230px;
          overflow: hidden;
        }
        .stay-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .stay-card:hover .stay-img {
          transform: scale(1.05);
        }
        .stay-type-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(20, 19, 17, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.35rem 0.75rem;
          font-weight: 600;
        }
        .stay-price-category {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.95);
          color: var(--accent-gold-hover);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0.3rem 0.7rem;
        }
        .stay-body {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .stay-location {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }
        .loc-icon {
          color: var(--accent-gold);
        }
        .stay-name {
          font-size: 1.4rem;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          font-weight: 500;
          line-height: 1.25;
        }
        .stay-desc {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .amenities-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        .amenity-pill {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 0.25rem 0.55rem;
          font-size: 0.7rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }
        .check-icon {
          color: var(--accent-gold);
        }
        .stay-footer {
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }
        .stay-btn {
          width: 100%;
          justify-content: center;
          font-size: 0.8rem;
          padding: 0.7rem 1rem;
        }
        .stay-all-cta {
          margin-top: 3.5rem;
          text-align: center;
        }
        @media (max-width: 1200px) {
          .accommodations-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .stay-header {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .accommodations-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
