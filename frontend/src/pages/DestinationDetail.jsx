import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Calendar, 
  Compass, 
  ArrowRight, 
  MapPin, 
  CheckCircle, 
  Moon, 
  CloudSun, 
  Wind, 
  Droplets, 
  Sparkles, 
  Bot, 
  Navigation, 
  Phone, 
  MessageSquare,
  Thermometer,
  ShieldCheck
} from 'lucide-react';
import { api } from '../services/api';
import BeginJourneySection from '../components/sections/BeginJourneySection';
import FamousPlacesSection from '../components/FamousPlacesSection';
import VisualDayByDayPlan from '../components/VisualDayByDayPlan';
import AIChatbotModal from '../components/AIChatbotModal';
import { fetchLiveDestinationWeather } from '../services/weatherService';
import { 
  DESTINATION_COORDINATES, 
  calculateHaversineDistance, 
  POPULAR_ORIGIN_CITIES, 
  requestUserLocation 
} from '../services/locationService';

export default function DestinationDetail({ onOpenEnquiry }) {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [packages, setPackages] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time Live Weather state
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Location Awareness state
  const [userLocation, setUserLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('pmt_user_location');
      return saved ? JSON.parse(saved) : POPULAR_ORIGIN_CITIES[0];
    } catch (e) {
      return POPULAR_ORIGIN_CITIES[0];
    }
  });
  const [isDetectingLoc, setIsDetectingLoc] = useState(false);
  const [locStatusMsg, setLocStatusMsg] = useState('');

  // AI Chatbot Modal state
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    api.getDestinationBySlug(slug)
      .then(dest => {
        setDestination(dest);
        return Promise.all([
          api.getPackagesByDestination(slug),
          api.getAccommodationsByDestination(slug)
        ]);
      })
      .then(([pkgs, accs]) => {
        setPackages(pkgs);
        setAccommodations(accs);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  // Fetch real-time weather
  useEffect(() => {
    if (!destination) return;
    setWeatherLoading(true);
    const coords = DESTINATION_COORDINATES[slug] || { lat: 26.9124, lon: 75.7873 };

    fetchLiveDestinationWeather(coords.lat, coords.lon, destination.name)
      .then(data => setWeather(data))
      .catch(console.error)
      .finally(() => setWeatherLoading(false));
  }, [destination, slug]);

  const handleDetectLocation = async () => {
    setIsDetectingLoc(true);
    setLocStatusMsg('Detecting device GPS coordinates...');
    const res = await requestUserLocation();
    setIsDetectingLoc(false);
    if (res.status === 'granted' || res.location) {
      setUserLocation(res.location);
      try {
        localStorage.setItem('pmt_user_location', JSON.stringify(res.location));
      } catch (e) {}
      setLocStatusMsg('Location updated successfully!');
      setTimeout(() => setLocStatusMsg(''), 3000);
    }
  };

  const handleSelectOriginCity = (e) => {
    const selected = POPULAR_ORIGIN_CITIES.find(c => c.name === e.target.value);
    if (selected) {
      setUserLocation(selected);
      try {
        localStorage.setItem('pmt_user_location', JSON.stringify(selected));
      } catch (err) {}
    }
  };

  if (loading) {
    return (
      <div className="dest-loading-screen">
        <span className="font-serif">Consulting provincial archives...</span>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container dest-not-found section-padding">
        <h2 className="font-serif">Destination Not Found</h2>
        <p>The province you are seeking is not currently in our active directory.</p>
        <Link to="/destinations/india" className="btn-gold">Return to India Destinations</Link>
      </div>
    );
  }

  // Calculate live Haversine distance
  const targetCoords = DESTINATION_COORDINATES[slug] || { lat: 26.9124, lon: 75.7873 };
  const distanceKm = userLocation
    ? calculateHaversineDistance(userLocation.lat, userLocation.lon, targetCoords.lat, targetCoords.lon)
    : 1450;

  return (
    <div className="destination-detail-page">
      {/* Cinematic Hero */}
      <section className="dest-hero">
        <div className="dest-hero-bg">
          <img src={destination.heroImage} alt={destination.name} className="dest-hero-img" />
          <div className="dest-hero-overlay" />
        </div>

        <div className="container dest-hero-content">
          <nav className="dest-breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/destinations/india">India</Link>
            <ChevronRight size={14} />
            <span className="active">{destination.name}</span>
          </nav>

          <div className="dest-badge-row">
            <span className="dest-category-pill">{destination.regionCategory}</span>
            <span className="dest-distance-pill">
              <Navigation size={13} /> {distanceKm.toLocaleString('en-IN')} km from {userLocation?.name?.split(',')[0] || 'Origin'}
            </span>
          </div>

          <h1 className="dest-title font-serif">{destination.name}</h1>
          <p className="dest-hero-tagline font-serif">"{destination.tagline}"</p>

          <div className="dest-meta-strip">
            <div className="meta-item">
              <Calendar size={16} className="meta-icon" />
              <div>
                <span className="meta-label">Optimal Season</span>
                <span className="meta-val">{destination.bestTimeToVisit}</span>
              </div>
            </div>

            <div className="meta-item">
              <Compass size={16} className="meta-icon" />
              <div>
                <span className="meta-label">Curated Itineraries</span>
                <span className="meta-val">{packages.length} Private Packages</span>
              </div>
            </div>

            {weather && (
              <div className="meta-item weather-meta-item">
                <CloudSun size={18} className="meta-icon text-sky" />
                <div>
                  <span className="meta-label">Live Weather</span>
                  <span className="meta-val">{weather.temp}°C · {weather.condition}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setIsAIChatOpen(true)}
              className="btn-ai-consult"
            >
              <Bot size={16} /> Ask Gemini AI
            </button>

            <button
              onClick={() => onOpenEnquiry(destination.name)}
              className="btn-gold dest-enquire-btn"
            >
              Curate Journey
            </button>
          </div>
        </div>
      </section>

      {/* Real-time Location Awareness & Weather Briefing Strip */}
      <section className="dest-briefing-strip">
        <div className="container">
          <div className="briefing-grid">
            {/* Origin & Transit Calculator Tile */}
            <div className="briefing-tile origin-tile">
              <div className="tile-header">
                <Navigation size={16} className="tile-accent-icon" />
                <span className="tile-title font-mono">ORIGIN & TRANSIT DISTANCE</span>
              </div>
              <div className="origin-selector-row">
                <label className="origin-label">Your Starting City:</label>
                <select
                  value={userLocation?.name || POPULAR_ORIGIN_CITIES[0].name}
                  onChange={handleSelectOriginCity}
                  className="origin-city-select"
                >
                  {POPULAR_ORIGIN_CITIES.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleDetectLocation}
                  disabled={isDetectingLoc}
                  className="detect-btn-inline"
                  title="Detect GPS from browser"
                >
                  <MapPin size={13} /> {isDetectingLoc ? 'Detecting...' : 'Detect GPS'}
                </button>
              </div>
              {locStatusMsg && <p className="status-msg-inline font-mono">{locStatusMsg}</p>}
              <div className="distance-readout">
                <span className="dist-num">{distanceKm.toLocaleString('en-IN')} km</span>
                <span className="dist-sub">
                  Calculated transit corridor from {userLocation?.name || 'Namakkal'} to {destination.name}.
                </span>
              </div>
            </div>

            {/* Real-time Meteorological Forecast & AI Advisory Tile */}
            <div className="briefing-tile weather-tile">
              <div className="tile-header">
                <CloudSun size={16} className="tile-accent-icon" />
                <span className="tile-title font-mono">REAL-TIME WEATHER & PACKING ADVISORY</span>
                <span className="source-tag font-mono">{weather?.source || 'Open-Meteo Live'}</span>
              </div>

              {weatherLoading ? (
                <div className="weather-skeleton">Fetching live meteorological satellite feed...</div>
              ) : weather ? (
                <div className="weather-content-box">
                  <div className="weather-stats-row">
                    <div className="temp-cluster">
                      <span className="temp-big">{weather.temp}°C</span>
                      <div className="temp-sub-meta">
                        <span className="feels-like">Feels like {weather.feelsLike}°C</span>
                        <span className="condition-txt">{weather.condition}</span>
                      </div>
                    </div>
                    <div className="env-metrics">
                      <div className="env-item">
                        <Droplets size={14} />
                        <span>Humidity: {weather.humidity}%</span>
                      </div>
                      <div className="env-item">
                        <Wind size={14} />
                        <span>Wind: {weather.windSpeed} km/h</span>
                      </div>
                    </div>
                  </div>
                  <div className="ai-advisory-pill">
                    <Sparkles size={14} className="sparkle-icon" />
                    <p className="advisory-text"><strong>AI Clothing Advisory:</strong> {weather.advisory}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Overview Section */}
      <section className="dest-editorial-section section-padding">
        <div className="container">
          <div className="editorial-grid">
            <div className="editorial-main">
              <span className="section-tag">PROVINCIAL ETHOS</span>
              <h2 className="section-heading">
                The living soul of <em>{destination.name}</em>.
              </h2>
              <p className="editorial-text">{destination.description}</p>

              <div className="dest-highlights-block">
                <h4 className="font-serif hl-heading">Iconic Heritage & Natural Monuments</h4>
                <div className="highlights-chips">
                  {destination.highlights && destination.highlights.split(',').map((hl, i) => (
                    <span key={i} className="hl-chip">
                      <CheckCircle size={14} className="hl-icon" />
                      {hl.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="editorial-side">
              <div className="fast-facts-card">
                <h4 className="font-serif facts-title">Provincial At-A-Glance</h4>
                <ul className="facts-list">
                  <li><strong>Category:</strong> {destination.regionCategory}</li>
                  <li><strong>Best Months:</strong> {destination.bestMonths}</li>
                  <li><strong>Active Packages:</strong> {packages.length} Itineraries</li>
                  <li><strong>Travel Pace:</strong> Unhurried Private Chauffeur</li>
                  <li><strong>Lead Curator:</strong> Manoj Sivakumar (+91 93446 83958)</li>
                </ul>
                <button
                  onClick={() => onOpenEnquiry(destination.name)}
                  className="btn-primary facts-btn"
                >
                  Request Bespoke Quotation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Famous Places: Notable attractions properly presented (not bare list of names) */}
      <FamousPlacesSection
        destinationSlug={slug}
        destinationName={destination.name}
      />

      {/* Structured Visual Day-by-Day Itinerary Planner Component */}
      <section className="visual-planner-wrapper section-padding">
        <div className="container">
          <div className="planner-intro-header">
            <span className="section-tag font-mono">
              <Sparkles size={14} /> AI ITINERARY GENERATOR
            </span>
            <h2 className="section-heading">
              Plan Your Journey to <em>{destination.name}</em>
            </h2>
            <p className="planner-subtext">
              Generate a real, readable day-by-day itinerary with exact morning, afternoon, and evening milestones—never an unreadable block of chat text.
            </p>
          </div>

          <VisualDayByDayPlan
            initialDestination={destination.name}
            onOpenEnquiry={onOpenEnquiry}
          />
        </div>
      </section>

      {/* Matching Tour Packages */}
      <section className="dest-packages-section section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">CURATED EXPEDITIONS</span>
            <h2 className="section-heading">Signature Journeys in <em>{destination.name}</em></h2>
            <p className="section-subtext">Each itinerary can be customized to match your exact departure date and private interests.</p>
          </div>

          <div className="dest-pkgs-grid">
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <div key={pkg.id} className="pkg-card">
                  <div className="pkg-media">
                    <img src={pkg.heroImage} alt={pkg.name} className="pkg-img" />
                    <span className="pkg-nights">
                      <Moon size={12} /> {pkg.durationNights} Nights / {pkg.durationDays} Days
                    </span>
                  </div>
                  <div className="pkg-body">
                    <span className="pkg-mood">{pkg.mood}</span>
                    <h3 className="pkg-name font-serif">{pkg.name}</h3>
                    <p className="pkg-desc">{pkg.highlights}</p>
                    <div className="pkg-footer">
                      <div className="pkg-price">
                        <span>From</span>
                        <strong>₹{pkg.startingPriceInr.toLocaleString('en-IN')}</strong>
                      </div>
                      <Link to={`/packages/${pkg.slug}`} className="btn-secondary">
                        View Itinerary
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-pkgs-box">
                <p>Custom departures are actively curated upon request for {destination.name}.</p>
                <button onClick={() => onOpenEnquiry(destination.name)} className="btn-gold">
                  Request Custom Itinerary
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Accommodations in this Destination */}
      {accommodations.length > 0 && (
        <section className="dest-accs-section section-padding">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">WHERE TO STAY</span>
              <h2 className="section-heading">Storied Sanctuaries in <em>{destination.name}</em></h2>
            </div>
            <div className="dest-accs-grid">
              {accommodations.map((acc) => (
                <div key={acc.id} className="acc-mini-card">
                  <img src={acc.image} alt={acc.name} className="acc-mini-img" />
                  <div className="acc-mini-body">
                    <span className="acc-type">{acc.accommodationType}</span>
                    <h4 className="font-serif acc-name">{acc.name}</h4>
                    <p className="acc-desc">{acc.description}</p>
                    <button
                      onClick={() => onOpenEnquiry(`${acc.name} (${destination.name})`)}
                      className="btn-secondary acc-enquire-btn"
                    >
                      Enquire for Stay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inline Enquiry Pre-filled */}
      <BeginJourneySection defaultDestination={destination.name} />

      {/* Conversational Gemini AI Chatbot Modal */}
      <AIChatbotModal
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        initialDestination={destination.name}
      />

      <style>{`
        .dest-hero {
          position: relative;
          min-height: 70vh;
          display: flex;
          align-items: flex-end;
          padding-top: 8rem;
          padding-bottom: 4rem;
          color: #ffffff;
        }
        .dest-hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 1;
        }
        .dest-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.6);
        }
        .dest-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10, 25, 47, 0.95) 0%, rgba(10, 25, 47, 0.35) 70%);
        }
        .dest-hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
        }
        .dest-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #cbd5e1;
          margin-bottom: 1.5rem;
        }
        .dest-breadcrumb a {
          color: #94a3b8;
        }
        .dest-breadcrumb .active {
          color: #38bdf8;
          font-weight: 600;
        }
        .dest-badge-row {
          display: flex;
          gap: 0.85rem;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
        }
        .dest-category-pill {
          display: inline-block;
          background: rgba(37, 99, 235, 0.25);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38bdf8;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          font-weight: 600;
        }
        .dest-distance-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(15, 23, 42, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #e2e8f0;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
        }
        .dest-title {
          font-size: clamp(3.2rem, 7vw, 5.5rem);
          line-height: 1.05;
          margin-bottom: 0.75rem;
        }
        .dest-hero-tagline {
          font-size: 1.35rem;
          color: #38bdf8;
          font-style: italic;
          margin-bottom: 2.5rem;
          max-width: 780px;
        }
        .dest-meta-strip {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          flex-wrap: wrap;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 1.25rem 2rem;
          border-radius: 6px;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .meta-icon {
          color: #38bdf8;
        }
        .meta-label {
          display: block;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94a3b8;
        }
        .meta-val {
          font-size: 0.95rem;
          font-weight: 600;
        }
        .btn-ai-consult {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.4);
          color: #38bdf8;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.75rem 1.25rem;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
        }
        .btn-ai-consult:hover {
          background: #38bdf8;
          color: #0f172a;
        }
        .dest-enquire-btn {
          margin-left: auto;
        }

        /* Briefing Strip (Transit & Weather) */
        .dest-briefing-strip {
          background: #0b1528;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 2.5rem 0;
          color: #cbd5e1;
        }
        .briefing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .briefing-tile {
          background: #0f203c;
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: 6px;
          padding: 1.75rem;
        }
        .tile-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .tile-accent-icon {
          color: #38bdf8;
        }
        .tile-title {
          font-size: 0.74rem;
          letter-spacing: 0.15em;
          color: #94a3b8;
        }
        .source-tag {
          margin-left: auto;
          font-size: 0.68rem;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
          padding: 0.2rem 0.5rem;
          border-radius: 3px;
        }
        .origin-selector-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 0.85rem;
        }
        .origin-label {
          font-size: 0.84rem;
          color: #94a3b8;
        }
        .origin-city-select {
          background: #070d19;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 0.45rem 0.75rem;
          border-radius: 4px;
          font-size: 0.85rem;
        }
        .detect-btn-inline {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(37, 99, 235, 0.25);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #38bdf8;
          padding: 0.45rem 0.75rem;
          border-radius: 4px;
          font-size: 0.78rem;
          cursor: pointer;
        }
        .status-msg-inline {
          font-size: 0.74rem;
          color: #4ade80;
          margin-bottom: 0.5rem;
        }
        .distance-readout {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 1rem;
        }
        .dist-num {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: #38bdf8;
        }
        .dist-sub {
          font-size: 0.82rem;
          color: #94a3b8;
        }
        .weather-content-box {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .weather-stats-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .temp-cluster {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .temp-big {
          font-family: var(--font-serif);
          font-size: 2.5rem;
          font-weight: 700;
          color: #ffffff;
        }
        .feels-like {
          display: block;
          font-size: 0.74rem;
          color: #94a3b8;
        }
        .condition-txt {
          display: block;
          font-size: 0.88rem;
          color: #38bdf8;
          font-weight: 600;
        }
        .env-metrics {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          font-size: 0.82rem;
          color: #94a3b8;
        }
        .env-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }
        .ai-advisory-pill {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          background: rgba(37, 99, 235, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 0.75rem 1rem;
          border-radius: 4px;
        }
        .sparkle-icon {
          color: #38bdf8;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .advisory-text {
          font-size: 0.82rem;
          color: #e2e8f0;
          line-height: 1.5;
        }
        .advisory-text strong {
          color: #38bdf8;
        }

        /* Editorial Section */
        .dest-editorial-section {
          background: #ffffff;
        }
        .editorial-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 4rem;
        }
        .editorial-text {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.85;
          margin-bottom: 2.5rem;
          font-weight: 300;
        }
        .dest-highlights-block {
          background: #f8fafc;
          border: 1px solid var(--border-light);
          padding: 2rem;
          border-radius: 6px;
        }
        .hl-heading {
          font-size: 1.35rem;
          margin-bottom: 1.25rem;
        }
        .highlights-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        .hl-chip {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 0.5rem 0.9rem;
          font-size: 0.85rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.45rem;
          border-radius: 20px;
        }
        .hl-icon {
          color: #2563eb;
        }
        .fast-facts-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 2.5rem;
          border-radius: 6px;
          box-shadow: var(--shadow-sm);
        }
        .facts-title {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 0.75rem;
        }
        .facts-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-size: 0.92rem;
          margin-bottom: 2rem;
        }
        .facts-btn {
          width: 100%;
          justify-content: center;
        }

        /* Visual Planner Wrapper */
        .visual-planner-wrapper {
          background: #080f1d;
          color: #ffffff;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .planner-intro-header {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 3.5rem;
        }
        .planner-subtext {
          font-size: 1.05rem;
          color: #94a3b8;
          line-height: 1.7;
          margin-top: 0.85rem;
        }

        /* Packages Section */
        .dest-packages-section {
          background: #ffffff;
        }
        .dest-pkgs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .pkg-card {
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          overflow: hidden;
          transition: var(--transition);
        }
        .pkg-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: #2563eb;
        }
        .pkg-media {
          position: relative;
          height: 220px;
        }
        .pkg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .pkg-nights {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.95);
          color: var(--text-primary);
          padding: 0.3rem 0.65rem;
          font-size: 0.74rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          border-radius: 4px;
        }
        .pkg-body {
          padding: 1.75rem;
        }
        .pkg-mood {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2563eb;
          font-weight: 700;
        }
        .pkg-name {
          font-size: 1.45rem;
          margin: 0.35rem 0 0.75rem;
        }
        .pkg-desc {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .pkg-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid #e2e8f0;
        }
        .pkg-price span {
          display: block;
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .pkg-price strong {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: #0f172a;
        }

        /* Accommodations Section */
        .dest-accs-section {
          background: #f8fafc;
        }
        .dest-accs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        .acc-mini-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          display: grid;
          grid-template-columns: 180px 1fr;
          overflow: hidden;
        }
        .acc-mini-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .acc-mini-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .acc-type {
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2563eb;
          font-weight: 700;
        }
        .acc-name {
          font-size: 1.3rem;
          margin: 0.25rem 0 0.5rem;
        }
        .acc-desc {
          font-size: 0.84rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        @media (max-width: 1024px) {
          .briefing-grid {
            grid-template-columns: 1fr;
          }
          .editorial-grid {
            grid-template-columns: 1fr;
          }
          .dest-pkgs-grid {
            grid-template-columns: 1fr;
          }
          .dest-accs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}