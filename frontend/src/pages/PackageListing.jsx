import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Compass, Moon, ArrowRight, Filter, Search, RotateCcw } from 'lucide-react';
import { api } from '../services/api';

export default function PackageListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialMood = searchParams.get('mood') || 'All';
  const initialMonth = searchParams.get('month') || 'All';
  const initialDest = searchParams.get('destination') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedMood, setSelectedMood] = useState(initialMood);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedDest, setSelectedDest] = useState(initialDest);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('recommended');

  const moods = ['All', 'Romance', 'Wildlife', 'Heritage', 'Family', 'Backwaters', 'Himalaya', 'Adventure', 'Beach'];
  const months = ['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    api.getDestinations().then(setDestinations).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    api.getPackages({
      mood: selectedMood,
      month: selectedMonth,
      destination: selectedDest,
      search: searchTerm
    })
      .then(setPackages)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedMood, selectedMonth, selectedDest, searchTerm]);

  const handleReset = () => {
    setSelectedMood('All');
    setSelectedMonth('All');
    setSelectedDest('All');
    setSearchTerm('');
    setSearchParams({});
  };

  const sortedPackages = [...packages].sort((a, b) => {
    if (sortBy === 'price-low') return a.startingPriceInr - b.startingPriceInr;
    if (sortBy === 'price-high') return b.startingPriceInr - a.startingPriceInr;
    if (sortBy === 'nights') return a.durationNights - b.durationNights;
    return 0; // default / recommended
  });

  return (
    <div className="packages-page section-padding">
      <div className="container">
        {/* Page Header */}
        <div className="packages-header">
          <span className="section-tag">THE COMPLETE REPERTOIRE</span>
          <h1 className="section-heading font-serif">
            Curated Subcontinental <em>Journeys</em>.
          </h1>
          <p className="section-subtext">
            Filter by your desired travel mood, intended departure season, or regional territory to find your tailored journey.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="filters-control-panel">
          <div className="search-row">
            <div className="search-field">
              <Search size={16} className="s-icon" />
              <input
                type="text"
                placeholder="Search by landmark, experience, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={handleReset} className="reset-btn">
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="dropdowns-row">
            <div className="filter-dropdown">
              <label>Travel Mood</label>
              <select value={selectedMood} onChange={(e) => setSelectedMood(e.target.value)}>
                {moods.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <div className="filter-dropdown">
              <label>Season / Month</label>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                {months.map(m => <option key={m} value={m}>{m === 'All' ? 'Any Month' : m}</option>)}
              </select>
            </div>

            <div className="filter-dropdown">
              <label>Destination Territory</label>
              <select value={selectedDest} onChange={(e) => setSelectedDest(e.target.value)}>
                <option value="All">All Territories</option>
                {destinations.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
              </select>
            </div>

            <div className="filter-dropdown">
              <label>Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="recommended">Curator's Recommendation</option>
                <option value="price-low">Tariff: Low to High</option>
                <option value="price-high">Tariff: High to Low</option>
                <option value="nights">Duration (Nights)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="results-status">
          <span>Showing <strong>{sortedPackages.length}</strong> Curated Itineraries</span>
        </div>

        {/* Package Grid */}
        {loading ? (
          <div className="loading-state">Consulting archives...</div>
        ) : sortedPackages.length > 0 ? (
          <div className="packages-catalog-grid">
            {sortedPackages.map((pkg) => (
              <div key={pkg.id} className="catalog-card animate-fade-in">
                <div className="catalog-media">
                  <img src={pkg.heroImage} alt={pkg.name} className="catalog-img" loading="lazy" />
                  <span className="catalog-mood">{pkg.mood}</span>
                  <span className="catalog-nights">
                    <Moon size={12} /> {pkg.durationNights}N / {pkg.durationDays}D
                  </span>
                </div>

                <div className="catalog-body">
                  <span className="catalog-dest">{pkg.destination?.name}</span>
                  <h3 className="catalog-title font-serif">{pkg.name}</h3>
                  <p className="catalog-highlights">{pkg.highlights}</p>

                  <div className="catalog-footer">
                    <div className="catalog-price">
                      <span className="price-lbl">Starting From</span>
                      <span className="price-amt">₹{pkg.startingPriceInr.toLocaleString('en-IN')}</span>
                    </div>

                    <Link to={`/packages/${pkg.slug}`} className="btn-primary catalog-cta">
                      View Itinerary
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-catalog-box">
            <h3 className="font-serif">No departures match your criteria</h3>
            <p>Try clearing filters or requesting a bespoke proposal tailored to your specifications.</p>
            <button onClick={handleReset} className="btn-gold">Reset All Filters</button>
          </div>
        )}
      </div>

      <style>{`
        .packages-page {
          padding-top: 8.5rem;
        }
        .packages-header {
          margin-bottom: 3rem;
        }
        .filters-control-panel {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 2rem;
          border-radius: 2px;
          margin-bottom: 2rem;
          box-shadow: var(--shadow-sm);
        }
        .search-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .search-field {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border: 1px solid var(--border-light);
          padding: 0.65rem 1rem;
          background: var(--bg-primary);
        }
        .search-field input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .s-icon {
          color: var(--accent-gold);
        }
        .reset-btn {
          background: none;
          border: 1px solid var(--border-light);
          padding: 0.65rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          font-size: 0.85rem;
          transition: var(--transition);
        }
        .reset-btn:hover {
          border-color: var(--accent-terracotta);
          color: var(--accent-terracotta);
        }
        .dropdowns-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        .filter-dropdown {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .filter-dropdown label {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 600;
        }
        .filter-dropdown select {
          border: 1px solid var(--border-light);
          padding: 0.65rem 0.85rem;
          background: var(--bg-primary);
          color: var(--text-primary);
          border-radius: 2px;
          outline: none;
          font-size: 0.88rem;
        }
        .results-status {
          margin-bottom: 2rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .packages-catalog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }
        .catalog-card {
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: 2px;
          overflow: hidden;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }
        .catalog-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
          border-color: rgba(195, 154, 52, 0.4);
        }
        .catalog-media {
          position: relative;
          height: 250px;
          overflow: hidden;
        }
        .catalog-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .catalog-card:hover .catalog-img {
          transform: scale(1.05);
        }
        .catalog-mood {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(20, 19, 17, 0.85);
          color: #ffffff;
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          font-weight: 600;
        }
        .catalog-nights {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.95);
          color: var(--text-primary);
          font-size: 0.74rem;
          font-weight: 600;
          padding: 0.3rem 0.7rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .catalog-body {
          padding: 1.85rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .catalog-dest {
          font-size: 0.74rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-gold);
          font-weight: 700;
          margin-bottom: 0.35rem;
        }
        .catalog-title {
          font-size: 1.55rem;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }
        .catalog-highlights {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }
        .catalog-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
        }
        .catalog-price {
          display: flex;
          flex-direction: column;
        }
        .price-lbl {
          font-size: 0.7rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .price-amt {
          font-family: var(--font-serif);
          font-size: 1.4rem;
          font-weight: 600;
        }
        .catalog-cta {
          font-size: 0.78rem;
          padding: 0.65rem 1.15rem;
        }
        .empty-catalog-box {
          background: #ffffff;
          border: 1px dashed var(--border-light);
          padding: 4rem 2rem;
          text-align: center;
        }
        .empty-catalog-box h3 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        .empty-catalog-box p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        @media (max-width: 1024px) {
          .dropdowns-row {
            grid-template-columns: repeat(2, 1fr);
          }
          .packages-catalog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .dropdowns-row {
            grid-template-columns: 1fr;
          }
          .packages-catalog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
