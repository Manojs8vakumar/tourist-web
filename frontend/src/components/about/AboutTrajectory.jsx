import React, { useState, useEffect } from 'react';
import { Compass, Play, RotateCcw } from 'lucide-react';

export default function AboutTrajectory() {
  const [activeLeg, setActiveLeg] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const legsData = [
    {
      id: 0,
      day: 'Day 0',
      title: 'Delhi Departure Hub',
      distance: 350,
      body: 'Private greeting at terminal, route orientation, and departure along the historic Yamuna river corridor.'
    },
    {
      id: 1,
      day: 'Day 2',
      title: 'Trans-Rajasthan Royal Trail',
      distance: 1280,
      body: 'Traversing the ancient Aravali ranges to the amber sun-drenched palaces of Udaipur and Mehrangarh citadel.'
    },
    {
      id: 2,
      day: 'Day 4',
      title: 'Deccan & Western Ghats',
      distance: 2640,
      body: 'Crossing the fertile Deccan plateau into misty spice hills and tranquil backwaters of Vembanad.'
    },
    {
      id: 3,
      day: 'Day 5',
      title: 'Namakkal Monolith Corridor',
      distance: 3840,
      body: 'Ascent to the colossal monolithic Rock Fort and sacred sanctums of Tamil Nadu.'
    }
  ];

  // Auto-cycle through trajectory legs
  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setActiveLeg((prev) => (prev < legsData.length - 1 ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const current = legsData[activeLeg];

  const DELHI = { cx: 240, cy: 160 };
  const RAJASTHAN = { cx: 420, cy: 220 };
  const DECCAN = { cx: 660, cy: 300 };
  const NAMAKKAL = { cx: 960, cy: 380 };

  return (
    <section id="trajectory" className="trajectory-section">
      <div className="trajectory-container">
        {/* Header */}
        <div className="trajectory-header">
          <div>
            <span className="traj-eyebrow font-mono">
              EXPEDITION TRAJECTORY · FLIGHT & RAIL
            </span>
            <h2 className="traj-title font-display">
              3,840 km, drawn in motion.
            </h2>
          </div>
          <div className="traj-counter font-mono">
            <span>Distance traversed:</span>
            <span className="traj-km">{current.distance.toLocaleString()} km</span>
          </div>
        </div>

        {/* Interactive SVG Stage (Constrained to Fit Screen) */}
        <div className="svg-map-wrapper">
          <svg
            viewBox="0 0 1200 500"
            className="trajectory-svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="delhiGlow" cx="50%" cy="50%" r="50%">
                <stop offset="60%" stopColor="#6fb6ff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#6fb6ff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="namakkalGlow" cx="50%" cy="50%" r="50%">
                <stop offset="60%" stopColor="#f2e6c9" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f2e6c9" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="activeFlightGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6fb6ff" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            {/* Subtle Starfield / Grid */}
            <g fill="#ffffff" opacity="0.3">
              {Array.from({ length: 45 }, (_, i) => (
                <circle key={i} cx={(i * 211) % 1200} cy={(i * 131) % 500} r={i % 5 === 0 ? 1.5 : 0.8} />
              ))}
            </g>

            {/* Ghost Lines (Full Route Background) */}
            <path d={`M ${DELHI.cx} ${DELHI.cy} Q 330 140 ${RAJASTHAN.cx} ${RAJASTHAN.cy}`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 6" />
            <path d={`M ${RAJASTHAN.cx} ${RAJASTHAN.cy} Q 540 240 ${DECCAN.cx} ${DECCAN.cy}`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 6" />
            <path d={`M ${DECCAN.cx} ${DECCAN.cy} Q 810 320 ${NAMAKKAL.cx} ${NAMAKKAL.cy}`} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 6" />

            {/* Active Inked Route Legs */}
            <path
              d={`M ${DELHI.cx} ${DELHI.cy} Q 330 140 ${RAJASTHAN.cx} ${RAJASTHAN.cy}`}
              fill="none"
              stroke="#6fb6ff"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={activeLeg >= 1 ? 'inked-path' : ''}
              opacity={activeLeg >= 1 ? 1 : 0.3}
            />
            <path
              d={`M ${RAJASTHAN.cx} ${RAJASTHAN.cy} Q 540 240 ${DECCAN.cx} ${DECCAN.cy}`}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={activeLeg >= 2 ? 'inked-path' : ''}
              opacity={activeLeg >= 2 ? 1 : 0.3}
            />
            <path
              d={`M ${DECCAN.cx} ${DECCAN.cy} Q 810 320 ${NAMAKKAL.cx} ${NAMAKKAL.cy}`}
              fill="none"
              stroke="#f2e6c9"
              strokeWidth="2.5"
              strokeLinecap="round"
              className={activeLeg >= 3 ? 'inked-path' : ''}
              opacity={activeLeg >= 3 ? 1 : 0.3}
            />

            {/* Hub Beacons */}
            <circle cx={DELHI.cx} cy={DELHI.cy} r="40" fill="url(#delhiGlow)" />
            <circle cx={DELHI.cx} cy={DELHI.cy} r="14" fill="#0b1a33" stroke="#6fb6ff" strokeWidth="2" />
            <circle cx={DELHI.cx} cy={DELHI.cy} r="5" fill="#6fb6ff" />

            <circle cx={RAJASTHAN.cx} cy={RAJASTHAN.cy} r="10" fill="#0b1a33" stroke="#6fb6ff" strokeWidth="1.5" />
            <circle cx={DECCAN.cx} cy={DECCAN.cy} r="10" fill="#0b1a33" stroke="#38bdf8" strokeWidth="1.5" />

            <circle cx={NAMAKKAL.cx} cy={NAMAKKAL.cy} r="40" fill="url(#namakkalGlow)" />
            <circle cx={NAMAKKAL.cx} cy={NAMAKKAL.cy} r="14" fill="#1f1809" stroke="#f2e6c9" strokeWidth="2" />
            <circle cx={NAMAKKAL.cx} cy={NAMAKKAL.cy} r="5" fill="#f2e6c9" />

            {/* Station Labels */}
            <g fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="1.5" fill="#8b909b">
              <text x={DELHI.cx} y={DELHI.cy - 24} textAnchor="middle" fill="#ffffff">NEW DELHI (HQ)</text>
              <text x={RAJASTHAN.cx} y={RAJASTHAN.cy + 28} textAnchor="middle">RAJASTHAN CORRIDOR</text>
              <text x={DECCAN.cx} y={DECCAN.cy - 20} textAnchor="middle">DECCAN & WESTERN GHATS</text>
              <text x={NAMAKKAL.cx} y={NAMAKKAL.cy + 34} textAnchor="middle" fill="#f2e6c9">NAMAKKAL ROCK FORT</text>
            </g>
          </svg>
        </div>

        {/* Leg Milestones Controls */}
        <div className="trajectory-legs-panel">
          <div className="legs-grid">
            {legsData.map((leg, i) => (
              <button
                key={leg.id}
                onClick={() => {
                  setActiveLeg(i);
                  setIsAnimating(false);
                }}
                className={`leg-card ${i === activeLeg ? 'active' : ''}`}
              >
                <div className="leg-card-top font-mono">
                  <span>{leg.day}</span>
                  <span className="leg-tag">LEG {i + 1}</span>
                </div>
                <h4 className="leg-card-title font-display">{leg.title}</h4>
                <p className="leg-card-p">{leg.body}</p>
              </button>
            ))}
          </div>

          <div className="traj-playback-bar font-mono">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="playback-btn"
            >
              {isAnimating ? <RotateCcw size={14} /> : <Play size={14} />}
              <span>{isAnimating ? 'Auto-Advancing Corridor' : 'Resume Auto-Play'}</span>
            </button>
            <span className="playback-info">
              Active: {current.day} · {current.title}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .trajectory-section {
          background: #05070c;
          padding: 3rem 0;
          color: #c9ccd3;
          width: 100%;
          max-width: 100vw;
          overflow-x: clip;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .trajectory-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .trajectory-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }
        .traj-eyebrow {
          font-size: 0.72rem;
          color: #6fb6ff;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .traj-title {
          font-size: clamp(1.8rem, 3.6vw, 2.8rem);
          color: #ffffff;
          margin-top: 0.5rem;
        }
        .traj-counter {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: #8b909b;
        }
        .traj-km {
          font-size: 1.8rem;
          color: #ffffff;
          font-weight: 700;
        }
        .svg-map-wrapper {
          width: 100%;
          background: #070d18;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }
        .trajectory-svg {
          width: 100%;
          height: auto;
          max-height: 420px;
          display: block;
        }
        .trajectory-legs-panel {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .legs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
        .leg-card {
          background: #0b0f18;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.25rem;
          border-radius: 8px;
          text-align: left;
          cursor: pointer;
          transition: all 0.25s ease;
          color: inherit;
        }
        .leg-card:hover {
          border-color: rgba(111, 182, 255, 0.4);
          transform: translateY(-2px);
        }
        .leg-card.active {
          border-color: #6fb6ff;
          background: rgba(11, 26, 51, 0.6);
          box-shadow: 0 0 20px rgba(111, 182, 255, 0.2);
        }
        .leg-card-top {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: #6fb6ff;
          margin-bottom: 0.5rem;
        }
        .leg-tag {
          color: #8b909b;
        }
        .leg-card-title {
          font-size: 0.95rem;
          color: #ffffff;
          margin-bottom: 0.35rem;
        }
        .leg-card-p {
          font-size: 0.78rem;
          color: #8b909b;
          line-height: 1.5;
        }
        .traj-playback-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.75rem;
          color: #8b909b;
        }
        .playback-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #ffffff;
          padding: 0.45rem 0.95rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .playback-btn:hover {
          background: #6fb6ff;
          color: #05070c;
        }
        @media (max-width: 900px) {
          .trajectory-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .traj-counter {
            align-items: flex-start;
          }
          .legs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .legs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
