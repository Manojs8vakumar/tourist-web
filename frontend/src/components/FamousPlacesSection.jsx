import React from 'react';
import { MapPin, Clock, Sparkles, Compass, CheckCircle2, Info } from 'lucide-react';
import { getFamousPlacesForDestination } from '../services/famousPlacesData';

export default function FamousPlacesSection({ destinationSlug, destinationName = 'Destination' }) {
  const places = getFamousPlacesForDestination(destinationSlug);

  return (
    <section className="famous-places-section">
      <div className="container">
        <div className="section-header-row">
          <div>
            <span className="section-tag">
              <Sparkles size={14} /> NOTABLE HERITAGE & ATTRACTIONS
            </span>
            <h2 className="section-heading font-serif">
              Famous Places in <em>{destinationName}</em>
            </h2>
          </div>
          <p className="places-intro-sub">
            Curated historical monuments, sacred sanctums, and living heritage landmarks — presented with historical context, optimal hours, and visitor guidance.
          </p>
        </div>

        <div className="famous-places-grid">
          {places.map((place) => (
            <div key={place.id} className="famous-place-card">
              <div className="place-img-wrapper">
                <img src={place.image} alt={place.name} className="place-img" />
                <span className="place-badge font-mono">{place.tag}</span>
              </div>

              <div className="place-card-body">
                <h3 className="place-name font-serif">{place.name}</h3>
                <p className="place-desc">{place.description}</p>

                <div className="place-why-box">
                  <span className="why-label font-mono">
                    <Sparkles size={13} /> WHY VISIT
                  </span>
                  <p className="why-text">{place.whyVisit}</p>
                </div>

                <div className="place-meta-grid">
                  <div className="meta-tile">
                    <Clock size={13} className="tile-icon" />
                    <div>
                      <span className="tile-label font-mono">OPTIMAL TIME</span>
                      <span className="tile-val">{place.idealTime}</span>
                    </div>
                  </div>

                  <div className="meta-tile">
                    <Compass size={13} className="tile-icon" />
                    <div>
                      <span className="tile-label font-mono">DURATION</span>
                      <span className="tile-val">{place.duration}</span>
                    </div>
                  </div>
                </div>

                {place.tips && (
                  <div className="place-tip-footer">
                    <Info size={13} className="tip-icon" />
                    <span>{place.tips}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .famous-places-section {
          padding: 5rem 0;
          background: #ffffff;
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
        }
        .section-header-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2.5rem;
          align-items: flex-end;
          margin-bottom: 3.5rem;
        }
        .places-intro-sub {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.7;
        }
        .famous-places-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .famous-place-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.04);
        }
        .famous-place-card:hover {
          transform: translateY(-4px);
          border-color: #2563eb;
          box-shadow: 0 16px 35px rgba(37, 99, 235, 0.12);
        }
        .place-img-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
          background: #0f172a;
        }
        .place-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .famous-place-card:hover .place-img {
          transform: scale(1.05);
        }
        .place-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(15, 23, 42, 0.85);
          color: #38bdf8;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.3rem 0.7rem;
          border-radius: 4px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(56, 189, 248, 0.3);
        }
        .place-card-body {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .place-name {
          font-size: 1.4rem;
          color: #0a192f;
          margin-bottom: 0.65rem;
          line-height: 1.25;
        }
        .place-desc {
          font-size: 0.88rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }
        .place-why-box {
          background: #eff6ff;
          border-left: 3px solid #2563eb;
          padding: 0.85rem 1rem;
          border-radius: 0 8px 8px 0;
          margin-bottom: 1.25rem;
        }
        .why-label {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.65rem;
          color: #1d4ed8;
          font-weight: 800;
          letter-spacing: 0.1em;
          margin-bottom: 0.25rem;
        }
        .why-text {
          font-size: 0.82rem;
          color: #1e3a8a;
          line-height: 1.5;
        }
        .place-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          border-top: 1px solid #e2e8f0;
          padding-top: 1rem;
          margin-top: auto;
          margin-bottom: 0.85rem;
        }
        .meta-tile {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .tile-icon {
          color: #2563eb;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .tile-label {
          font-size: 0.62rem;
          color: #94a3b8;
          letter-spacing: 0.08em;
          display: block;
        }
        .tile-val {
          font-size: 0.78rem;
          color: #0f172a;
          font-weight: 600;
          line-height: 1.3;
        }
        .place-tip-footer {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.75rem;
          color: #64748b;
          background: #f1f5f9;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
        }
        .tip-icon {
          color: #2563eb;
          flex-shrink: 0;
        }
        @media (max-width: 1080px) {
          .famous-places-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .section-header-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
        @media (max-width: 680px) {
          .famous-places-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
