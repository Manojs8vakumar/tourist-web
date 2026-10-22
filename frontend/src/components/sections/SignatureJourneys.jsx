import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Moon, Sparkles, Compass, Star } from 'lucide-react';
import { api } from '../../services/api';

export default function SignatureJourneys() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSignaturePackages()
      .then(data => setPackages(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="signatures" className="signature-journeys-section section-padding">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="signatures-header">
          <div className="signatures-title-area">
            <span className="section-tag">04 / THE SIGNATURE COLLECTION</span>
            <h2 className="section-heading">
              Extraordinary journeys, <em>thoughtfully designed</em>.
            </h2>
          </div>
          <p className="section-subtext">
            Our private flagship itineraries represent the purest expression of luxury subcontinental exploration. Each departure includes dedicated private chauffeurs, palace heritage stays, and rare cultural access.
          </p>
        </div>

        {/* Demo Content Badge */}
        <div className="demo-notice-bar">
          <Sparkles size={14} className="notice-icon" />
          <span>Curated Demonstration Portfolio • Real-time database synchronization via Spring Boot & MySQL</span>
        </div>

        {/* Editorial Tour Cards Grid */}
        {loading ? (
          <div className="signatures-loading">Retrieving signature archives...</div>
        ) : (
          <div className="signatures-grid">
            {packages.map((pkg) => (
              <div key={pkg.id} className="signature-card">
                {/* Media Container with Package Number Badge */}
                <div className="sig-media">
                  <img
                    src={pkg.heroImage}
                    alt={pkg.name}
                    className="sig-img"
                    loading="lazy"
                  />
                  <div className="sig-overlay" />
                  <span className="sig-number-badge">
                    No. {pkg.packageNumber || '01'}
                  </span>
                  <div className="sig-nights-badge">
                    <Moon size={13} />
                    <span>{pkg.durationNights} Nights / {pkg.durationDays} Days</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="sig-body">
                  <div className="sig-dest-row">
                    <span className="sig-dest">{pkg.destination?.name}</span>
                    <span className="sig-mood-tag">{pkg.mood}</span>
                  </div>

                  <h3 className="sig-title font-serif">{pkg.name}</h3>

                  <p className="sig-overview">
                    {pkg.overview}
                  </p>

                  <div className="sig-highlights-box">
                    <span className="sig-hl-title">Itinerary Highlights:</span>
                    <p className="sig-hl-text">{pkg.highlights}</p>
                  </div>

                  <div className="sig-footer">
                    <div className="sig-pricing">
                      <span className="price-label">Starting Tariff</span>
                      <div className="price-amount">
                        <span className="currency">₹</span>
                        <span className="val">{pkg.startingPriceInr.toLocaleString('en-IN')}</span>
                        <span className="per-guest">/ person</span>
                      </div>
                    </div>

                    <Link to={`/packages/${pkg.slug}`} className="btn-primary sig-cta">
                      Discover Journey
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Explorer Link */}
        <div className="signatures-bottom-cta">
          <Link to="/packages" className="btn-secondary">
            View All Curated Packages ({packages.length}+)
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      <style>{`
        .signature-journeys-section {
          background-color: var(--bg-card);
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        .signatures-header {
          margin-bottom: 2rem;
        }
        .demo-notice-bar {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: var(--accent-gold-subtle);
          color: var(--accent-gold-hover);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.78rem;
          font-weight: 500;
          margin-bottom: 3rem;
        }
        .signatures-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }
        .signature-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 2px;
          overflow: hidden;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }
        .signature-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(195, 154, 52, 0.5);
        }
        .sig-media {
          position: relative;
          height: 270px;
          overflow: hidden;
        }
        .sig-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .signature-card:hover .sig-img {
          transform: scale(1.06);
        }
        .sig-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20, 19, 17, 0.45) 0%, transparent 60%);
        }
        .sig-number-badge {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          background: #141311;
          color: var(--accent-gold);
          font-family: var(--font-serif);
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 0.35rem 0.85rem;
          border: 1px solid rgba(195, 154, 52, 0.3);
        }
        .sig-nights-badge {
          position: absolute;
          bottom: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.95);
          color: var(--text-primary);
          font-size: 0.76rem;
          font-weight: 600;
          padding: 0.35rem 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .sig-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .sig-dest-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .sig-dest {
          font-size: 0.75rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-gold);
          font-weight: 700;
        }
        .sig-mood-tag {
          font-size: 0.72rem;
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
        }
        .sig-title {
          font-size: 1.65rem;
          color: var(--text-primary);
          margin-bottom: 0.85rem;
          font-weight: 500;
          line-height: 1.2;
        }
        .sig-overview {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .sig-highlights-box {
          background: var(--bg-primary);
          padding: 1rem 1.25rem;
          border-left: 2px solid var(--accent-gold);
          margin-bottom: 1.75rem;
          flex: 1;
        }
        .sig-hl-title {
          display: block;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .sig-hl-text {
          font-size: 0.82rem;
          color: var(--text-primary);
          line-height: 1.5;
        }
        .sig-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
        }
        .sig-pricing {
          display: flex;
          flex-direction: column;
        }
        .price-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .price-amount {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }
        .price-amount .currency {
          font-size: 1rem;
          color: var(--text-primary);
          font-weight: 500;
        }
        .price-amount .val {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .price-amount .per-guest {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-left: 3px;
        }
        .sig-cta {
          font-size: 0.78rem;
          padding: 0.75rem 1.25rem;
        }
        .signatures-bottom-cta {
          margin-top: 3.5rem;
          text-align: center;
        }
        @media (max-width: 1080px) {
          .signatures-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 720px) {
          .signatures-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
