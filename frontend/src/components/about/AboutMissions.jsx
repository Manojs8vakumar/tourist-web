import React from 'react';
import { scrollToHash } from '../../lib/scroll';

export default function AboutMissions({ onSelectMission }) {
  const missionItems = [
    {
      name: 'Subcontinental Passage',
      days: 6,
      lines: [
        'Two royal palace stays',
        'Private dawn Taj Mahal charter',
        'Old Delhi culinary walks',
        'Chauffeured luxury transit'
      ],
      cta: 'Join the Passage list',
      featured: false
    },
    {
      name: 'Sovereign Grand Tour',
      days: 10,
      lines: [
        'Four nights at Lake Palace & Mehrangarh',
        'Private Vembanad Lake cruise',
        'Namakkal Rock Fort VIP access',
        '24/7 Curator Manoj dedicated line'
      ],
      cta: 'Join the Sovereign list',
      featured: true
    },
    {
      name: 'Deep Heritage Resident',
      days: 28,
      lines: [
        'Full month across all 28 states',
        'Himalayan high alpine expedition',
        'Aristocratic host private dinners',
        'Private chartered logistics'
      ],
      cta: 'Join the Resident list',
      featured: false
    }
  ];

  const handleSelect = (e, name) => {
    e.preventDefault();
    onSelectMission?.(name);
    scrollToHash('#reserve');
  };

  return (
    <section id="missions" className="missions-section">
      <div className="missions-container">
        <div className="missions-header">
          <div>
            <span className="missions-eyebrow font-mono">
              EXPEDITION CLASSES · CURATED PASSAGES
            </span>
            <h2 className="missions-title font-display">
              Three ways to travel India.
            </h2>
          </div>
          <p className="missions-note font-mono">
            Bespoke itineraries · Durations illustrative
          </p>
        </div>

        <div className="missions-grid">
          {missionItems.map((m) => (
            <div
              key={m.name}
              className={`mission-card ${m.featured ? 'featured' : ''}`}
            >
              {/* Concentric Orbit Rings in Corner */}
              <svg
                aria-hidden="true"
                viewBox="0 0 200 200"
                className="mission-rings-svg"
              >
                {Array.from({ length: Math.ceil(m.days / 7) }, (_, k) => (
                  <ellipse
                    key={k}
                    cx="100"
                    cy="100"
                    rx={38 + k * 18}
                    ry={16 + k * 8}
                    fill="none"
                    stroke="currentColor"
                    transform={`rotate(${-20 + k * 14} 100 100)`}
                  />
                ))}
                <circle cx="100" cy="100" r="8" fill="currentColor" />
              </svg>

              {m.featured && (
                <span className="featured-badge font-mono">
                  Most Requested
                </span>
              )}

              <h3 className="mission-name font-display">
                {m.name}
              </h3>

              <div className="mission-days-row">
                <span className="mission-days-num font-display">{m.days}</span>
                <span className="mission-days-label font-mono">days</span>
              </div>

              <ul className="mission-lines-list">
                {m.lines.map((l) => (
                  <li key={l} className="mission-line-item">
                    <span className="line-dot" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#reserve"
                onClick={(e) => handleSelect(e, m.name)}
                className={`mission-cta-btn font-mono ${m.featured ? 'btn-featured' : ''}`}
              >
                {m.cta}
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .missions-section {
          background: #05070c;
          padding: 5rem 0 6rem;
          color: #c9ccd3;
          width: 100%;
          max-width: 100vw;
          overflow-x: clip;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .missions-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .missions-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
          margin-bottom: 3.5rem;
        }
        .missions-eyebrow {
          font-size: 0.72rem;
          color: #6fb6ff;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .missions-title {
          font-size: clamp(2rem, 3.8vw, 3rem);
          color: #ffffff;
          margin-top: 0.5rem;
          line-height: 1.2;
        }
        .missions-note {
          font-size: 0.75rem;
          color: #8b909b;
          text-transform: uppercase;
        }
        .missions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
        }
        .mission-card {
          position: relative;
          background: #0b0f18;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .mission-card:hover {
          transform: translateY(-4px);
          border-color: rgba(111, 182, 255, 0.4);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
        }
        .mission-card.featured {
          background: #0d1627;
          border: 1.5px solid #38bdf8;
          box-shadow: 0 20px 50px rgba(56, 189, 248, 0.15);
        }
        .mission-rings-svg {
          position: absolute;
          top: -2.5rem;
          right: -2.5rem;
          width: 180px;
          height: 180px;
          color: rgba(255, 255, 255, 0.08);
          pointer-events: none;
          transition: transform 1.2s ease;
        }
        .mission-card:hover .mission-rings-svg {
          transform: rotate(45deg);
        }
        .featured-badge {
          display: inline-block;
          align-self: flex-start;
          background: #38bdf8;
          color: #05070c;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          margin-bottom: 1.25rem;
        }
        .mission-name {
          font-size: 1.25rem;
          color: #ffffff;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }
        .mission-days-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }
        .mission-days-num {
          font-size: 3.5rem;
          line-height: 1;
          color: #ffffff;
          font-weight: 700;
        }
        .mission-days-label {
          font-size: 0.75rem;
          color: #8b909b;
          text-transform: uppercase;
        }
        .mission-lines-list {
          list-style: none;
          padding: 1.5rem 0 0;
          margin: 0 0 2.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .mission-line-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.9rem;
          color: #c9ccd3;
        }
        .line-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #38bdf8;
          flex-shrink: 0;
        }
        .mission-cta-btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 0.9rem;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.2s ease;
        }
        .mission-cta-btn:hover {
          background: #ffffff;
          color: #05070c;
        }
        .btn-featured {
          background: #38bdf8;
          color: #05070c;
          border-color: #38bdf8;
        }
        .btn-featured:hover {
          background: #ffffff;
          color: #05070c;
          border-color: #ffffff;
        }
        @media (max-width: 960px) {
          .missions-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .missions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
