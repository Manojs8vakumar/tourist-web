import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Compass, 
  Sparkles, 
  MapPin, 
  Shield, 
  Star, 
  MessageSquare, 
  Phone, 
  Bot, 
  Sun, 
  Globe2,
  Calendar,
  CloudSun
} from 'lucide-react';
import AboutHeroStage from '../components/about/AboutHeroStage';
import AboutExpeditionLog from '../components/about/AboutExpeditionLog';
import AboutTrajectory from '../components/about/AboutTrajectory';
import ThreeTravelGlobe from '../components/ThreeTravelGlobe';
import LocationDetectorBanner from '../components/LocationDetectorBanner';
import AITripPlanner from '../components/AITripPlanner';
import VisualDayByDayPlan from '../components/VisualDayByDayPlan';
import LiveWeatherWidget from '../components/LiveWeatherWidget';
import AllIndiaStatesDirectory from '../components/AllIndiaStatesDirectory';
import SignatureJourneys from '../components/sections/SignatureJourneys';
import CustomerStories from '../components/sections/CustomerStories';
import BeginJourneySection from '../components/sections/BeginJourneySection';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { startScroll } from '../lib/scroll';
import { POPULAR_ORIGIN_CITIES } from '../services/locationService';

export default function Home({ onOpenEnquiry, onOpenContactDirect }) {
  const reduced = useReducedMotion();
  const [selectedAIState, setSelectedAIState] = useState('Rajasthan (Jaipur, Udaipur, Jodhpur)');
  const [userLocation, setUserLocation] = useState(POPULAR_ORIGIN_CITIES[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = startScroll(reduced);
    return cleanup;
  }, [reduced]);

  const handleLocationChange = (loc) => {
    setUserLocation(loc);
    try {
      localStorage.setItem('pmt_user_location', JSON.stringify(loc));
    } catch (e) {}
  };

  const handleSelectStateForAI = (stateName) => {
    setSelectedAIState(stateName);
    const el = document.getElementById('ai-trip-planner-hub');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page-root">
      {/* 1. Six-Layer 3D Parallax Earthrise & Taj Mahal Hero Stage */}
      <AboutHeroStage />

      {/* 2. Real-Time Location Awareness Bar */}
      <LocationDetectorBanner
        userLocation={userLocation}
        onLocationChange={handleLocationChange}
      />

      {/* 3. 3D WebGL Interactive Globe with Glowing Flight Corridors */}
      <section className="globe-spatial-section">
        <div className="container">
          <div className="globe-header-text">
            <span className="section-tag-3d font-mono">
              <Globe2 size={15} /> 01 / 3D SPATIAL ORBIT & FLIGHT CORRIDORS
            </span>
            <h2 className="globe-heading font-display">
              Subcontinental Coordinates in <em>Real Dimensions</em>
            </h2>
            <p className="globe-sub-desc font-sans">
              Drag to rotate 360°, inspect the New Delhi departure hub, trace glowing corridors to Rajasthan, Varanasi, Kerala, and founder desk at Namakkal, Tamil Nadu.
            </p>
          </div>

          <ThreeTravelGlobe />
        </div>
      </section>

      {/* 4. Subcontinental Flight Trajectory (3,840 km inking corridor) */}
      <AboutTrajectory />

      {/* 5. Expedition Log: Interactive Milestone Showcase & Reel */}
      <AboutExpeditionLog />

      {/* 6. Real-Time AI Trip Planner Agent & Visual Day-by-Day Timeline */}
      <section id="ai-trip-planner-hub" className="ai-planner-showcase-section">
        <div className="container">
          <div className="ai-planner-header">
            <span className="section-tag-3d font-mono">
              <Bot size={15} /> 02 / REAL-TIME AI CONCIERGE & VISUAL ITINERARIES
            </span>
            <h2 className="section-title-dark font-serif">
              Craft Your Itinerary with <em>Google Gemini AI</em>
            </h2>
            <p className="section-desc-dark">
              Select 3, 4, 5, or 7 days, configure your exact budget in INR, and watch our AI synthesize a structured morning-afternoon-evening schedule—complete with 1-click WhatsApp booking to Manoj Sivakumar.
            </p>
          </div>

          {/* Visual Day-by-Day Plan Component */}
          <VisualDayByDayPlan
            initialDestination="Rajasthan"
            onOpenEnquiry={onOpenEnquiry}
          />

          <div style={{ marginTop: '3.5rem' }}>
            <AITripPlanner
              initialDest={selectedAIState}
              onOpenEnquiry={onOpenEnquiry}
            />
          </div>
        </div>
      </section>

      {/* 7. Live Weather Forecasts & AI Clothing Advisories */}
      <LiveWeatherWidget />

      {/* 8. Comprehensive All India States & Tourist Spots Directory */}
      <AllIndiaStatesDirectory onSelectStateForAI={handleSelectStateForAI} />

      {/* 9. Signature Journeys Collection */}
      <SignatureJourneys />

      {/* 10. Customer Stories & Testimonials */}
      <CustomerStories />

      {/* 11. Begin a Journey Form */}
      <BeginJourneySection />

      <style>{`
        .home-page-root {
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
          padding: 2.75rem 1.5rem;
          width: 100%;
          max-width: 100vw;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .globe-header-text {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 1.75rem;
        }

        .section-tag-3d {
          font-size: 0.72rem;
          color: #38bdf8;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 0.35rem 0.85rem;
          border-radius: 20px;
        }

        .globe-heading {
          font-size: clamp(2rem, 4vw, 3rem);
          color: #ffffff;
          margin-top: 0.75rem;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .globe-heading em {
          color: #38bdf8;
          font-style: italic;
        }

        .globe-sub-desc {
          font-size: 1rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-top: 0.75rem;
        }

        .ai-planner-showcase-section {
          background: #080f1d;
          padding: 3.5rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .ai-planner-header {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 2rem;
        }

        .section-title-dark {
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          color: #ffffff;
          margin-top: 0.75rem;
          line-height: 1.15;
        }

        .section-title-dark em {
          color: #38bdf8;
          font-style: italic;
        }

        .section-desc-dark {
          font-size: 1rem;
          color: #94a3b8;
          line-height: 1.65;
          margin-top: 0.75rem;
        }

        @media (max-width: 768px) {
          .globe-spatial-section,
          .ai-planner-showcase-section {
            padding: 3.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}