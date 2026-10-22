import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Heart, Shield, Sun, Mountain, Compass, Waves, Users, RotateCcw, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';

export default function InteractiveTripFinder() {
  const [selectedMood, setSelectedMood] = useState('Romance');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const moods = [
    { name: 'Romance', icon: Heart, desc: 'Lakeside palaces & candlelit boat dining' },
    { name: 'Wildlife', icon: Shield, desc: 'Bengal tiger tracking & luxury tents' },
    { name: 'Heritage', icon: Compass, desc: 'Imperial living forts & royal stepwells' },
    { name: 'Family', icon: Users, desc: 'Private palace tours & wildlife wonders' },
    { name: 'Backwaters', icon: Waves, desc: 'Cedar kettuvallams & Ayurvedic calm' },
    { name: 'Himalaya', icon: Mountain, desc: 'Alpine pine retreats & monastery dawn' },
    { name: 'Adventure', icon: Mountain, desc: 'High altitude passes & moonscape lakes' },
    { name: 'Beach', icon: Sun, desc: 'Virgin coral reefs & private lagoons' }
  ];

  const months = ['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const monthNames = {
    Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April',
    May: 'May', Jun: 'June', Jul: 'July', Aug: 'August',
    Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December',
    All: 'Any Travel Period'
  };

  useEffect(() => {
    fetchFilteredPackages();
  }, [selectedMood, selectedMonth]);

  const fetchFilteredPackages = async () => {
    setLoading(true);
    try {
      const data = await api.getPackages({
        mood: selectedMood,
        month: selectedMonth
      });
      setPackages(data);
    } catch (err) {
      console.error('Error fetching filtered packages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedMood('Romance');
    setSelectedMonth('All');
  };

  return (
    <section id="trip-finder" className="trip-finder-section section-padding">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="finder-header">
          <span className="section-tag">02 / INTERACTIVE DISCOVERY</span>
          <h2 className="section-heading">
            Begin by <em>mood</em>, then by <em>month</em>.
          </h2>
          <p className="section-subtext">
            No two journeys should ever be alike. Select how you wish to feel, then choose your intended travel season to reveal our tailored subcontinental journeys.
          </p>
        </div>

        {/* Step 1: Mood Selector */}
        <div className="finder-step">
          <div className="step-label-row">
            <span className="step-num">Step 01</span>
            <span className="step-title font-serif">What is the spirit of your journey?</span>
          </div>
          <div className="moods-grid">
            {moods.map((m) => {
              const Icon = m.icon;
              const isSelected = selectedMood === m.name;
              return (
                <button
                  key={m.name}
                  onClick={() => setSelectedMood(m.name)}
                  className={`mood-card ${isSelected ? 'active' : ''}`}
                >
                  <div className="mood-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <h4 className="mood-name font-serif">{m.name}</h4>
                  <p className="mood-desc">{m.desc}</p>
                  <div className="selection-indicator" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Month Selector */}
        <div className="finder-step">
          <div className="step-label-row">
            <span className="step-num">Step 02</span>
            <span className="step-title font-serif">When do you wish to depart?</span>
          </div>
          <div className="months-strip">
            {months.map((mon) => (
              <button
                key={mon}
                onClick={() => setSelectedMonth(mon)}
                className={`month-pill ${selectedMonth === mon ? 'active' : ''}`}
              >
                {mon}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Stats Bar */}
        <div className="filter-summary-bar">
          <div className="summary-left">
            <span className="active-badge">Active Selection</span>
            <div className="criteria-text">
              Mood: <strong>{selectedMood}</strong>
              <span className="criteria-sep">•</span>
              Season: <strong>{monthNames[selectedMonth]}</strong>
            </div>
            <span className="results-count">
              {loading ? 'Consulting archives...' : `${packages.length} Matching Signature Journeys`}
            </span>
          </div>
          <div className="summary-right">
            <button onClick={handleClear} className="clear-btn">
              <RotateCcw size={14} />
              Reset Filters
            </button>
            <Link
              to={`/packages?mood=${encodeURIComponent(selectedMood)}${selectedMonth !== 'All' ? `&month=${encodeURIComponent(selectedMonth)}` : ''}`}
              className="btn-primary"
            >
              See Matching Journeys ({packages.length})
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Live Matching Package Previews */}
        <div className="matching-previews">
          {loading ? (
            <div className="loading-state">Curating tailored itineraries...</div>
          ) : packages.length > 0 ? (
            <div className="previews-grid">
              {packages.slice(0, 3).map((pkg) => (
                <div key={pkg.id} className="preview-card animate-fade-in">
                  <div className="preview-media">
                    <img src={pkg.heroImage} alt={pkg.name} className="preview-img" />
                    <span className="preview-mood-tag">{pkg.mood}</span>
                    <span className="preview-duration">{pkg.durationNights} Nights / {pkg.durationDays} Days</span>
                  </div>
                  <div className="preview-body">
                    <span className="preview-dest">{pkg.destination?.name}</span>
                    <h3 className="preview-name font-serif">{pkg.name}</h3>
                    <p className="preview-highlights">{pkg.highlights}</p>
                    <div className="preview-footer">
                      <div className="price-block">
                        <span className="price-label">Starting From</span>
                        <span className="price-val">₹{pkg.startingPriceInr.toLocaleString('en-IN')}</span>
                      </div>
                      <Link to={`/packages/${pkg.slug}`} className="btn-secondary preview-btn">
                        Discover Journey
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-results-box">
              <h4 className="font-serif">No direct itineraries found for this exact combination</h4>
              <p>Our private travel curators frequently construct custom bespoke departures. Click "Reset Filters" or enquire directly.</p>
              <button onClick={handleClear} className="btn-gold">Reset to All Moods</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .trip-finder-section {
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-light);
        }
        .finder-header {
          margin-bottom: 3.5rem;
        }
        .finder-step {
          margin-bottom: 2.75rem;
        }
        .step-label-row {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .step-num {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent-gold);
        }
        .step-title {
          font-size: 1.55rem;
          color: var(--text-primary);
          font-weight: 400;
        }
        .moods-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        .mood-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 1.75rem 1.5rem;
          border-radius: 2px;
          text-align: left;
          cursor: pointer;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .mood-card:hover {
          border-color: var(--accent-gold);
          transform: translateY(-3px);
          box-shadow: var(--shadow-sm);
        }
        .mood-card.active {
          background: #ffffff;
          border-color: var(--accent-gold);
          box-shadow: 0 10px 30px rgba(195, 154, 52, 0.15);
        }
        .mood-icon-wrap {
          color: var(--accent-gold);
          margin-bottom: 1rem;
        }
        .mood-name {
          font-size: 1.35rem;
          color: var(--text-primary);
          margin-bottom: 0.35rem;
        }
        .mood-desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .selection-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--accent-gold);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .mood-card.active .selection-indicator {
          transform: scaleX(1);
        }
        .months-strip {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }
        .month-pill {
          flex: 1 0 70px;
          background: var(--bg-primary);
          border: 1px solid var(--border-light);
          padding: 0.85rem 1rem;
          font-size: 0.88rem;
          letter-spacing: 0.04em;
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition);
          text-align: center;
          font-weight: 500;
        }
        .month-pill:hover {
          border-color: var(--accent-gold);
        }
        .month-pill.active {
          background: var(--text-primary);
          border-color: var(--text-primary);
          color: #ffffff;
        }
        .filter-summary-bar {
          background: var(--bg-secondary);
          border: 1px solid var(--border-light);
          padding: 1.5rem 2rem;
          border-radius: 2px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 3rem 0;
        }
        .summary-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .active-badge {
          background: var(--accent-gold-subtle);
          color: var(--accent-gold-hover);
          padding: 0.3rem 0.75rem;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 700;
          border-radius: 20px;
        }
        .criteria-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }
        .criteria-text strong {
          color: var(--text-primary);
        }
        .criteria-sep {
          margin: 0 0.5rem;
          color: var(--accent-gold);
        }
        .results-count {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--accent-gold);
          font-style: italic;
        }
        .summary-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .clear-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          cursor: pointer;
          transition: var(--transition);
        }
        .clear-btn:hover {
          color: var(--accent-terracotta);
        }
        .previews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .preview-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 2px;
          overflow: hidden;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }
        .preview-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: rgba(195, 154, 52, 0.4);
        }
        .preview-media {
          position: relative;
          height: 240px;
          overflow: hidden;
        }
        .preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .preview-card:hover .preview-img {
          transform: scale(1.05);
        }
        .preview-mood-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(20, 19, 17, 0.85);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.35rem 0.8rem;
          font-weight: 600;
        }
        .preview-duration {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.95);
          color: var(--text-primary);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.3rem 0.75rem;
        }
        .preview-body {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .preview-dest {
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: var(--accent-gold);
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }
        .preview-name {
          font-size: 1.45rem;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          font-weight: 500;
        }
        .preview-highlights {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        .preview-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
        }
        .price-block {
          display: flex;
          flex-direction: column;
        }
        .price-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .price-val {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .preview-btn {
          font-size: 0.78rem;
          padding: 0.65rem 1.2rem;
        }
        .empty-results-box {
          text-align: center;
          padding: 4rem 2rem;
          background: var(--bg-primary);
          border: 1px dashed var(--border-light);
        }
        .empty-results-box h4 {
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
        }
        .empty-results-box p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        @media (max-width: 1080px) {
          .moods-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .previews-grid {
            grid-template-columns: 1fr;
          }
          .filter-summary-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
        }
        @media (max-width: 640px) {
          .moods-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
