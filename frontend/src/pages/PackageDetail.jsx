import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Moon, Calendar, Check, X as XIcon, MapPin, Compass, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { api } from '../services/api';
import BeginJourneySection from '../components/sections/BeginJourneySection';

export default function PackageDetail({ onOpenEnquiry }) {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    api.getPackageBySlug(slug)
      .then(data => {
        setPkg(data);
        if (data.itineraries && data.itineraries.length > 0) {
          setActiveDay(data.itineraries[0].dayNumber);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pkg-loading section-padding text-center">
        <span className="font-serif">Retrieving journey dossier...</span>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="container pkg-not-found section-padding text-center">
        <h2 className="font-serif">Journey Dossier Not Found</h2>
        <Link to="/packages" className="btn-gold">Return to Tour Packages</Link>
      </div>
    );
  }

  return (
    <div className="package-detail-page">
      {/* Cinematic Hero */}
      <section className="pkg-hero">
        <div className="pkg-hero-bg">
          <img src={pkg.heroImage} alt={pkg.name} className="pkg-hero-img" />
          <div className="pkg-hero-overlay" />
        </div>

        <div className="container pkg-hero-content">
          <nav className="pkg-breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/packages">Tour Packages</Link>
            <ChevronRight size={14} />
            <span className="active">{pkg.name}</span>
          </nav>

          <div className="pkg-badge-row">
            <span className="pkg-num-badge">No. {pkg.packageNumber || '01'}</span>
            <span className="pkg-mood-badge">{pkg.mood}</span>
            <span className="pkg-duration-badge">
              <Moon size={13} /> {pkg.durationNights} Nights / {pkg.durationDays} Days
            </span>
          </div>

          <h1 className="pkg-hero-title font-serif">{pkg.name}</h1>
          <p className="pkg-hero-highlights">{pkg.highlights}</p>

          <div className="pkg-hero-bar">
            <div className="bar-item">
              <span className="b-label">Territory</span>
              <span className="b-val">{pkg.destination?.name}</span>
            </div>
            <div className="bar-item">
              <span className="b-label">Travel Style</span>
              <span className="b-val">{pkg.travelStyle || 'Bespoke Luxury'}</span>
            </div>
            <div className="bar-item">
              <span className="b-label">Tariff From</span>
              <span className="b-val price">₹{pkg.startingPriceInr.toLocaleString('en-IN')} / guest</span>
            </div>
            <button
              onClick={() => onOpenEnquiry(pkg.name)}
              className="btn-gold pkg-hero-btn"
            >
              Enquire For This Journey
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container pkg-main-layout section-padding">
        <div className="pkg-left-col">
          {/* Overview */}
          <div className="overview-block">
            <span className="section-tag">JOURNEY PHILOSOPHY</span>
            <h2 className="section-heading">Overview of the <em>Expedition</em></h2>
            <p className="overview-text">{pkg.overview}</p>
          </div>

          {/* Day by Day Itinerary */}
          <div className="itinerary-block">
            <div className="itin-header">
              <div>
                <span className="section-tag">DAY-BY-DAY PASSAGE</span>
                <h2 className="section-heading">The Detailed <em>Itinerary</em></h2>
              </div>
              <span className="itin-days-count">{pkg.itineraries?.length || 0} Curated Days</span>
            </div>

            <div className="timeline-container">
              {pkg.itineraries && pkg.itineraries.map((day) => (
                <div
                  key={day.dayNumber}
                  className={`timeline-day-card ${activeDay === day.dayNumber ? 'active' : ''}`}
                  onClick={() => setActiveDay(day.dayNumber)}
                >
                  <div className="day-number-col">
                    <span className="day-badge">Day 0{day.dayNumber}</span>
                    <div className="timeline-line" />
                  </div>

                  <div className="day-content-col">
                    <h3 className="day-title font-serif">{day.title}</h3>
                    <p className="day-desc">{day.description}</p>

                    <div className="day-logistics-bar">
                      {day.accommodationName && (
                        <div className="logistic-item">
                          <MapPin size={14} className="l-icon" />
                          <span>Stay: <strong>{day.accommodationName}</strong></span>
                        </div>
                      )}
                      {day.mealPlan && (
                        <div className="logistic-item">
                          <Compass size={14} className="l-icon" />
                          <span>Meals: <strong>{day.mealPlan}</strong></span>
                        </div>
                      )}
                    </div>

                    {day.activityHighlights && (
                      <div className="day-highlights-tag">
                        ✨ Highlights: {day.activityHighlights}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="inclusions-exclusions-grid">
            <div className="inc-box">
              <h4 className="font-serif inc-title">
                <Check size={18} className="check-gold" /> Included in Your Passage
              </h4>
              <ul className="inc-list">
                {pkg.inclusions ? pkg.inclusions.split(',').map((item, i) => (
                  <li key={i}>{item.trim()}</li>
                )) : (
                  <>
                    <li>Dedicated private air-conditioned vehicle & chauffeur</li>
                    <li>Heritage luxury palace & boutique resort accommodations</li>
                    <li>All breakfasts and curated multi-course evening dinners</li>
                    <li>VIP archaeologist & resident naturalist guiding</li>
                  </>
                )}
              </ul>
            </div>

            <div className="exc-box">
              <h4 className="font-serif exc-title">
                <XIcon size={18} className="x-slate" /> Excluded from Passage
              </h4>
              <ul className="exc-list">
                {pkg.exclusions ? pkg.exclusions.split(',').map((item, i) => (
                  <li key={i}>{item.trim()}</li>
                )) : (
                  <>
                    <li>International airfare to/from India</li>
                    <li>Personal purchases, rare antique souvenirs</li>
                    <li>Personal travel medical insurance</li>
                    <li>Optional helicopter / hot air balloon transfers</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar */}
        <aside className="pkg-sidebar-col">
          <div className="sticky-booking-card">
            <span className="card-tag">TAILORED PRIVATE EXPEDITION</span>
            <div className="tariff-headline">
              <span className="from-txt">Tariff starting from</span>
              <span className="tariff-sum font-serif">₹{pkg.startingPriceInr.toLocaleString('en-IN')}</span>
              <span className="per-pax">per guest (double occupancy)</span>
            </div>

            <div className="sidebar-specs">
              <div className="spec">
                <span>Duration:</span>
                <strong>{pkg.durationNights} Nights / {pkg.durationDays} Days</strong>
              </div>
              <div className="spec">
                <span>Territory:</span>
                <strong>{pkg.destination?.name}</strong>
              </div>
              <div className="spec">
                <span>Best Months:</span>
                <strong>{pkg.bestMonths}</strong>
              </div>
              <div className="spec">
                <span>Logistics:</span>
                <strong>Private Chauffeur & Guides</strong>
              </div>
            </div>

            <button
              onClick={() => onOpenEnquiry(pkg.name)}
              className="btn-gold sidebar-cta-btn"
            >
              Enquire For This Itinerary
              <ArrowRight size={15} />
            </button>

            <p className="sidebar-note">
              🔒 No deposit required for initial consultation. Our curators adjust every day to your exact dates.
            </p>
          </div>
        </aside>
      </div>

      {/* Inline Pre-filled Enquiry Section */}
      <BeginJourneySection defaultDestination={`${pkg.name} (${pkg.destination?.name})`} />

      <style>{`
        .pkg-hero {
          position: relative;
          min-height: 65vh;
          display: flex;
          align-items: flex-end;
          padding-top: 8rem;
          padding-bottom: 4rem;
          color: #ffffff;
        }
        .pkg-hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 1;
        }
        .pkg-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.55);
        }
        .pkg-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20, 19, 17, 0.95) 0%, rgba(20, 19, 17, 0.25) 70%);
        }
        .pkg-hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
        }
        .pkg-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #c4bcb0;
          margin-bottom: 1.5rem;
        }
        .pkg-breadcrumb a {
          color: #d1c8bc;
        }
        .pkg-breadcrumb .active {
          color: var(--accent-gold);
          font-weight: 600;
        }
        .pkg-badge-row {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .pkg-num-badge {
          background: #141311;
          color: var(--accent-gold);
          font-family: var(--font-serif);
          font-size: 0.85rem;
          padding: 0.3rem 0.75rem;
          border: 1px solid rgba(195, 154, 52, 0.3);
        }
        .pkg-mood-badge {
          background: rgba(20, 19, 17, 0.85);
          color: #ffffff;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.3rem 0.75rem;
        }
        .pkg-duration-badge {
          background: rgba(255, 255, 255, 0.95);
          color: var(--text-primary);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .pkg-hero-title {
          font-size: clamp(3rem, 6vw, 5rem);
          margin-bottom: 0.75rem;
          line-height: 1.05;
        }
        .pkg-hero-highlights {
          font-size: 1.15rem;
          color: #e2dbcf;
          max-width: 800px;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        .pkg-hero-bar {
          display: flex;
          align-items: center;
          gap: 3rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 1.5rem 2rem;
          border-radius: 2px;
          flex-wrap: wrap;
        }
        .b-label {
          display: block;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #b5ada2;
        }
        .b-val {
          font-size: 1rem;
          font-weight: 600;
        }
        .b-val.price {
          color: var(--accent-gold);
          font-family: var(--font-serif);
          font-size: 1.35rem;
        }
        .pkg-hero-btn {
          margin-left: auto;
        }
        .pkg-main-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 4.5rem;
          align-items: start;
        }
        .overview-block {
          margin-bottom: 4rem;
        }
        .overview-text {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.85;
          font-weight: 300;
        }
        .itin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
        }
        .itin-days-count {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: var(--accent-gold);
        }
        .timeline-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .timeline-day-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 2.25rem;
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 2rem;
          cursor: pointer;
          transition: var(--transition);
        }
        .timeline-day-card:hover,
        .timeline-day-card.active {
          border-color: var(--accent-gold);
          box-shadow: var(--shadow-sm);
        }
        .day-number-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .day-badge {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 0.35rem 0.75rem;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-gold);
          font-weight: 700;
        }
        .timeline-line {
          width: 1px;
          height: 100%;
          background: var(--border-light);
          margin-left: 20px;
          margin-top: 1rem;
        }
        .day-title {
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }
        .day-desc {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }
        .day-logistics-bar {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding: 0.75rem 0;
          border-top: 1px solid var(--border-light);
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .logistic-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .logistic-item strong {
          color: var(--text-primary);
        }
        .l-icon {
          color: var(--accent-gold);
        }
        .day-highlights-tag {
          margin-top: 0.75rem;
          font-size: 0.8rem;
          color: var(--accent-gold-hover);
          font-style: italic;
        }
        .inclusions-exclusions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }
        .inc-box, .exc-box {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 2.25rem;
        }
        .inc-title, .exc-title {
          font-size: 1.4rem;
          margin-bottom: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .check-gold {
          color: var(--accent-gold);
        }
        .x-slate {
          color: #94a3b8;
        }
        .inc-list, .exc-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .inc-list li::before {
          content: "•";
          color: var(--accent-gold);
          font-weight: bold;
          margin-right: 8px;
        }
        .exc-list li::before {
          content: "—";
          color: #94a3b8;
          margin-right: 8px;
        }
        .sticky-booking-card {
          position: sticky;
          top: 6.5rem;
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 2.5rem;
          box-shadow: var(--shadow-md);
        }
        .card-tag {
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-gold);
          font-weight: 700;
          display: block;
          margin-bottom: 0.75rem;
        }
        .tariff-headline {
          display: flex;
          flex-direction: column;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-light);
        }
        .from-txt {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .tariff-sum {
          font-size: 2.6rem;
          color: var(--text-primary);
          font-weight: 600;
          line-height: 1.1;
        }
        .per-pax {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .sidebar-specs {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2rem;
          font-size: 0.88rem;
        }
        .spec {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px dashed var(--border-light);
          padding-bottom: 0.4rem;
        }
        .spec span {
          color: var(--text-muted);
        }
        .spec strong {
          color: var(--text-primary);
        }
        .sidebar-cta-btn {
          width: 100%;
          justify-content: center;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .sidebar-note {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-align: center;
          line-height: 1.5;
        }
        @media (max-width: 1024px) {
          .pkg-main-layout {
            grid-template-columns: 1fr;
          }
          .sticky-booking-card {
            position: static;
          }
        }
        @media (max-width: 640px) {
          .timeline-day-card {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .inclusions-exclusions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
