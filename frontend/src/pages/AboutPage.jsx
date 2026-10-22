import React, { useEffect, useState } from 'react';
import AboutHeroStage from '../components/about/AboutHeroStage';
import AboutExpeditionLog from '../components/about/AboutExpeditionLog';
import AboutTrajectory from '../components/about/AboutTrajectory';
import AboutMissions from '../components/about/AboutMissions';
import AboutReserve from '../components/about/AboutReserve';
import ThreeTravelGlobe from '../components/ThreeTravelGlobe';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { startScroll } from '../lib/scroll';
import { Globe2 } from 'lucide-react';

export default function AboutPage({ onOpenEnquiry }) {
  const reduced = useReducedMotion();
  const [selectedMission, setSelectedMission] = useState('Sovereign Grand Tour');

  useEffect(() => {
    // Start at top of page
    window.scrollTo(0, 0);
    const cleanup = startScroll(reduced);
    return cleanup;
  }, [reduced]);

  return (
    <div className="about-page-root">
      {/* 1. Six-Layer Parallax Hero Stage (Fits 100% of Viewport) */}
      <AboutHeroStage />

      {/* 2. Expedition Log: Interactive Milestone Showcase & Reel */}
      <AboutExpeditionLog />

      {/* 3. Trajectory: 3,840 km Subcontinental Flight Corridor */}
      <AboutTrajectory />

      {/* 4. Expedition Classes with Concentric Orbit Rings */}
      <AboutMissions onSelectMission={(name) => setSelectedMission(name)} />

      {/* 5. 3D WebGL Spatial Earth & Subcontinent Globe */}
      <section className="globe-spatial-section">
        <div className="globe-inner-box">
          <div className="globe-text-center">
            <span className="globe-badge font-mono">
              <Globe2 size={15} /> 3D SPATIAL ORBIT & FLIGHT CORRIDORS
            </span>
            <h2 className="globe-title font-display">
              The Subcontinental Hub
            </h2>
            <p className="globe-desc font-sans">
              Interact directly in 3D dimensions. Drag to rotate the globe 360°, inspect the New Delhi headquarters and Namakkal founder desk, and trace glowing route corridors.
            </p>
          </div>

          <ThreeTravelGlobe />
        </div>
      </section>

      {/* 6. Waitlist Manifest with Ticking Countdown Window */}
      <AboutReserve selectedMission={selectedMission} onOpenEnquiry={onOpenEnquiry} />

      <style>{`
        .about-page-root {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          background: #05070c;
          color: #c9ccd3;
          box-sizing: border-box;
          position: relative;
        }
        .globe-spatial-section {
          position: relative;
          background: #05070c;
          padding: 5rem 1.5rem;
          width: 100%;
          max-width: 100vw;
          overflow-x: clip;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .globe-inner-box {
          max-width: 1280px;
          margin: 0 auto;
        }
        .globe-text-center {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .globe-badge {
          font-size: 0.72rem;
          color: #6fb6ff;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        .globe-title {
          font-size: clamp(1.8rem, 3.6vw, 2.8rem);
          color: #ffffff;
          margin-top: 0.65rem;
          line-height: 1.2;
        }
        .globe-desc {
          font-size: 0.95rem;
          color: #8b909b;
          max-width: 680px;
          margin: 0.75rem auto 0;
          line-height: 1.65;
        }
      `}</style>
    </div>
  );
}
