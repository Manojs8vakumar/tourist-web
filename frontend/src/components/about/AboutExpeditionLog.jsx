import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';

export default function AboutExpeditionLog() {
  const [activeIdx, setActiveIdx] = useState(0);

  const logEntries = [
    {
      tag: 'T−0 · LAUNCH',
      title: 'Arrival & Launch',
      body: 'Nine hours of flight, then fragrant saffron chai and the grand Mughal ramparts of Old Delhi.',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80',
      location: 'New Delhi Hub · 28.61°N'
    },
    {
      tag: 'DAY 2 · HERITAGE',
      title: 'Royal Living Forts',
      body: 'Sandstone citadels bathed in amber twilight. Your hand on the cool carved marble balustrade of Udaipur.',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
      location: 'Rajasthan Corridor · 26.91°N'
    },
    {
      tag: 'DAY 4 · DAWN',
      title: 'Taj Mahal Dawn',
      body: 'Exclusive dawn entrance before gates open. River mists dissolving across the marble reflection pools.',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
      location: 'Agra Sanctuary · 27.17°N'
    },
    {
      tag: 'DAY 5 · MONOLITH',
      title: 'Namakkal Monolith',
      body: 'Ancient rock fortress carved from a single colossal stone, temple bells echoing across Tamil Nadu.',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
      location: 'Namakkal Rock Fort · 11.21°N'
    }
  ];

  return (
    <section id="log" className="expedition-log-section">
      <div className="log-container">
        {/* Section Header */}
        <div className="log-header-row">
          <div>
            <span className="log-eyebrow font-mono">
              EXPEDITION LOG · SUB-CONTINENT
            </span>
            <h2 className="log-title font-display">
              The first journey that leaves an indelible mark.
            </h2>
          </div>
          <p className="log-lead-text">
            Four days in the royal desert, a week in living palace citadels, and one view nobody has ever forgotten. This is the passage, frame by frame.
          </p>
        </div>

        {/* Interactive Reel Stage */}
        <div className="log-reel-wrapper">
          <div className="log-active-showcase">
            <div className="showcase-img-box">
              <img
                src={logEntries[activeIdx].image}
                alt={logEntries[activeIdx].title}
                className="showcase-img"
              />
              <span className="showcase-tag font-mono">
                {logEntries[activeIdx].tag}
              </span>
              <span className="showcase-coord font-mono">
                {logEntries[activeIdx].location}
              </span>
            </div>

            <div className="showcase-meta">
              <div className="showcase-count font-mono">
                0{activeIdx + 1} <span className="dim">/ 0{logEntries.length}</span>
              </div>
              <h3 className="showcase-heading font-display">
                {logEntries[activeIdx].title}
              </h3>
              <p className="showcase-p">
                {logEntries[activeIdx].body}
              </p>

              {/* Navigation Controls */}
              <div className="reel-nav-buttons">
                <button
                  onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : logEntries.length - 1))}
                  className="reel-btn"
                  title="Previous Milestone"
                  aria-label="Previous"
                >
                  <ArrowLeft size={16} />
                </button>
                <div className="reel-indicators">
                  {logEntries.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`reel-dot ${i === activeIdx ? 'active' : ''}`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveIdx((prev) => (prev < logEntries.length - 1 ? prev + 1 : 0))}
                  className="reel-btn"
                  title="Next Milestone"
                  aria-label="Next"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="log-thumb-strip">
            {logEntries.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`log-thumb-card ${idx === activeIdx ? 'active' : ''}`}
              >
                <img src={item.image} alt={item.title} className="thumb-img" />
                <div className="thumb-overlay">
                  <span className="thumb-tag font-mono">{item.tag}</span>
                  <h4 className="thumb-title font-display">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .expedition-log-section {
          background: #05070c;
          padding: 3rem 0;
          color: #c9ccd3;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          width: 100%;
          max-width: 100vw;
          overflow-x: clip;
        }
        .log-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .log-header-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2.5rem;
          align-items: flex-end;
          margin-bottom: 1.75rem;
        }
        .log-eyebrow {
          color: #6fb6ff;
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .log-title {
          font-size: clamp(1.8rem, 3.6vw, 2.8rem);
          color: #ffffff;
          margin-top: 0.5rem;
          line-height: 1.2;
        }
        .log-lead-text {
          font-size: 1rem;
          color: #8b909b;
          line-height: 1.7;
        }
        .log-reel-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .log-active-showcase {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 2.5rem;
          background: #0b0f18;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }
        .showcase-img-box {
          position: relative;
          height: 380px;
          background: #000000;
        }
        .showcase-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .showcase-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(5, 7, 12, 0.85);
          color: #ffffff;
          font-size: 0.65rem;
          letter-spacing: 0.14em;
          padding: 0.35rem 0.75rem;
          border-radius: 4px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .showcase-coord {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(5, 7, 12, 0.85);
          color: #6fb6ff;
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          padding: 0.3rem 0.7rem;
          border-radius: 4px;
          backdrop-filter: blur(8px);
        }
        .showcase-meta {
          padding: 2.5rem 2rem 2.5rem 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .showcase-count {
          color: #6fb6ff;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .showcase-count .dim {
          color: #8b909b;
          font-weight: 400;
        }
        .showcase-heading {
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          color: #ffffff;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .showcase-p {
          font-size: 0.95rem;
          color: #c9ccd3;
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .reel-nav-buttons {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .reel-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .reel-btn:hover {
          background: #6fb6ff;
          color: #05070c;
          border-color: #6fb6ff;
        }
        .reel-indicators {
          display: flex;
          gap: 0.5rem;
        }
        .reel-dot {
          width: 24px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .reel-dot.active {
          width: 38px;
          background: #6fb6ff;
        }
        .log-thumb-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .log-thumb-card {
          position: relative;
          height: 110px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.25s ease;
        }
        .log-thumb-card:hover {
          border-color: rgba(111, 182, 255, 0.6);
          transform: translateY(-2px);
        }
        .log-thumb-card.active {
          border-color: #6fb6ff;
          box-shadow: 0 0 15px rgba(111, 182, 255, 0.4);
        }
        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .thumb-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(5, 7, 12, 0.9) 0%, rgba(5, 7, 12, 0.3) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0.65rem 0.85rem;
        }
        .thumb-tag {
          font-size: 0.6rem;
          color: #6fb6ff;
          letter-spacing: 0.1em;
        }
        .thumb-title {
          font-size: 0.82rem;
          color: #ffffff;
          margin-top: 2px;
        }
        @media (max-width: 900px) {
          .log-header-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .log-active-showcase {
            grid-template-columns: 1fr;
          }
          .showcase-meta {
            padding: 1.5rem;
          }
          .log-thumb-strip {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
